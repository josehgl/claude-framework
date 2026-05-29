#!/usr/bin/env node
// PreToolUse hook: BLOCKS git commit unless Gate 3 criteria are met
// Triggered on Bash commands containing "git commit"
//
// Checks:
// 1. All tests pass (npm test)
// 2. ESLint clean (0 errors)
// 3. TypeScript compiles (npx tsc --noEmit)
// 4. Code review was run (marker file exists)
//
// Exit code 2 = BLOCK the commit

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => { input += chunk; });
process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input);
    const command = data?.tool_input?.command || '';

    // Only intercept git commit commands
    if (!command.match(/git\s+commit/)) {
      process.exit(0);
    }

    // Allow --amend and merge commits through (they don't need re-review)
    if (command.includes('--allow-empty') || command.includes('merge')) {
      process.exit(0);
    }

    const projectDir = process.env.CLAUDE_PROJECT_DIR || process.cwd();

    // Pre-code phase: with no package.json there is no code to test/lint/typecheck.
    // Allow the commit (e.g. the initial bootstrap commit created by init-repo,
    // which is always the FIRST step of a project, before any code exists).
    if (!fs.existsSync(path.join(projectDir, 'package.json'))) {
      process.exit(0);
    }

    const errors = [];

    // ── Check 1: Tests pass ──
    try {
      execSync('npm test 2>&1', {
        encoding: 'utf8',
        timeout: 60000,
        cwd: projectDir,
        stdio: 'pipe',
      });
    } catch (e) {
      errors.push('TESTS FAILING: All tests must pass before committing. Run "npm test" to see failures.');
    }

    // ── Check 2: ESLint clean ──
    try {
      const lintOutput = execSync('npx eslint src/ 2>&1', {
        encoding: 'utf8',
        timeout: 30000,
        cwd: projectDir,
        stdio: 'pipe',
      });
      // Check for errors (not warnings)
      if (/\d+ error/.test(lintOutput)) {
        errors.push('LINT ERRORS: ESLint found errors. Run "npx eslint src/" to fix them.');
      }
    } catch (e) {
      const output = (e.stdout || '') + (e.stderr || '');
      if (/\d+ error/.test(output)) {
        errors.push('LINT ERRORS: ESLint found errors. Run "npx eslint src/" to fix them.');
      }
    }

    // ── Check 3: TypeScript compiles ──
    try {
      execSync('npx tsc --noEmit 2>&1', {
        encoding: 'utf8',
        timeout: 30000,
        cwd: projectDir,
        stdio: 'pipe',
      });
    } catch (e) {
      errors.push('TYPE ERRORS: TypeScript compilation failed. Run "npx tsc --noEmit" to see errors.');
    }

    // ── Check 4: Code review marker ──
    const markerPath = path.join(projectDir, '.claude', '.code-review-passed');
    if (!fs.existsSync(markerPath)) {
      errors.push(
        'CODE REVIEW REQUIRED: Run the dev-code-reviewer agent or /simplify before committing.\n' +
        '  The code review creates a marker file when it passes.\n' +
        '  This ensures every commit has been reviewed for quality.'
      );
    } else {
      // Check marker is recent (within last 30 minutes)
      const stat = fs.statSync(markerPath);
      const ageMinutes = (Date.now() - stat.mtimeMs) / 60000;
      if (ageMinutes > 30) {
        errors.push(
          'CODE REVIEW STALE: The last code review was ' + Math.round(ageMinutes) +
          ' minutes ago. Run code review again to get a fresh approval.'
        );
      }
      // Clean up marker after check (one-time use per commit)
      try { fs.unlinkSync(markerPath); } catch {}
    }

    if (errors.length > 0) {
      process.stderr.write(
        'BLOCKED: git commit failed Gate 3 checks:\n\n' +
        errors.map((e, i) => `  ${i + 1}. ${e}`).join('\n\n') +
        '\n\nFix all issues above, then retry the commit.\n'
      );
      process.exit(2);
    }

    // All checks passed
    process.exit(0);
  } catch (e) {
    // On unexpected error, don't block (fail open)
    process.stderr.write(`pre-commit-gate: unexpected error: ${e.message}\n`);
    process.exit(0);
  }
});
