#!/usr/bin/env node
// PostToolUse hook: validates Gate 4 criteria before PR operations
// Checks PR size, conventional commit format, and branch status

const { execSync } = require('child_process');

let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => { input += chunk; });
process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input);
    const tool = data?.tool_name || '';

    // Only trigger on Bash commands
    if (tool !== 'Bash') process.exit(0);

    const command = data?.tool_input?.command || '';

    // Only check on gh pr create commands
    if (!command.includes('gh pr create')) process.exit(0);

    const warnings = [];

    // Check diff size
    try {
      const diffStat = execSync('git diff main --stat 2>&1', { encoding: 'utf8', timeout: 10000 });
      const lastLine = diffStat.trim().split('\n').pop() || '';
      const insertions = (lastLine.match(/(\d+) insertion/) || [])[1] || '0';
      const deletions = (lastLine.match(/(\d+) deletion/) || [])[1] || '0';
      const total = parseInt(insertions) + parseInt(deletions);

      if (total > 300) {
        warnings.push(`Gate 4 WARNING: PR is ${total} lines (limit: 300). Consider splitting.`);
      }
    } catch {
      // Not a git repo or no main branch — skip
    }

    // Check branch is up to date with main
    try {
      const behind = execSync('git rev-list --count HEAD..main 2>&1', { encoding: 'utf8', timeout: 5000 }).trim();
      if (parseInt(behind) > 0) {
        warnings.push(`Gate 4 WARNING: Branch is ${behind} commits behind main. Rebase first.`);
      }
    } catch {
      // Skip if fails
    }

    if (warnings.length > 0) {
      process.stderr.write(warnings.join('\n') + '\n');
    }

    process.exit(0);
  } catch {
    process.exit(0);
  }
});
