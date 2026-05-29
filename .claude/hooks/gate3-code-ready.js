#!/usr/bin/env node
// PostToolUse hook: validates code quality after file edits
// BLOCKS on hardcoded secrets, warns on TODOs and lint issues

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => { input += chunk; });
process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input);
    const filePath = data?.tool_input?.file_path || data?.tool_input?.path || '';

    if (!filePath) process.exit(0);

    const ext = path.extname(filePath).slice(1);
    const basename = path.basename(filePath);

    // Only check source code files
    const sourceExts = ['ts', 'tsx', 'js', 'jsx', 'py', 'go', 'rs'];
    if (!sourceExts.includes(ext)) process.exit(0);

    // Skip test files (they're gate2 domain)
    const testPatterns = ['.test.', '.spec.', 'test_', '_test.'];
    if (testPatterns.some(p => basename.includes(p))) process.exit(0);

    // Skip framework files
    const normalizedPath = filePath.replace(/\/g, '/');
    if (normalizedPath.includes('.claude/')) process.exit(0);

    const blockers = [];
    const warnings = [];

    // Check for hardcoded secrets (basic patterns)
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const secretPattern = /(password|secret|api_key|apikey|token)\s*[:=]\s*['"][^'"]{8,}/i;
      if (secretPattern.test(content)) {
        blockers.push(`Possible hardcoded secret detected in ${basename}`);
      }

      // Check for TODOs without issue links
      const lines = content.split('\n');
      lines.forEach((line, i) => {
        if (line.includes('TODO') && !line.includes('#') && !line.includes('https://')) {
          warnings.push(`TODO without issue link at ${basename}:${i + 1}`);
        }
      });
    } catch {}

    // Try to run linter if available
    try {
      if (fs.existsSync('package.json')) {
        const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        if (pkg.scripts?.lint) {
          const output = execSync('npm run lint -- --quiet 2>&1', { encoding: 'utf8', timeout: 15000 });
          if (/\d+ error/.test(output)) {
            warnings.push("Lint errors found. Run 'npm run lint' to see details.");
          }
        }
      }
    } catch {}

    if (warnings.length > 0) {
      process.stderr.write(`Gate 3 warnings:\n${warnings.join('\n')}\n`);
    }

    if (blockers.length > 0) {
      process.stderr.write(`BLOCKED: ${blockers.join('\n')}\nRemove hardcoded secrets before proceeding.\n`);
      process.exit(2);
    }

    process.exit(0);
  } catch {
    process.exit(0);
  }
});
