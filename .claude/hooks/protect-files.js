#!/usr/bin/env node
// PreToolUse hook: blocks edits to protected files
// Reads JSON from stdin with tool_input.file_path

const path = require('path');

let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => { input += chunk; });
process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input);
    const filePath = data?.tool_input?.file_path || data?.tool_input?.path || '';

    if (!filePath) process.exit(0);

    const basename = path.basename(filePath);
    const normalized = filePath.replace(/\\/g, '/');

    // Block .env files
    if (basename.startsWith('.env')) {
      process.stderr.write(`BLOCKED: Cannot edit environment files (${basename}). These contain secrets.\n`);
      process.exit(2);
    }

    // Block lock files
    const lockFiles = ['package-lock.json', 'pnpm-lock.yaml', 'yarn.lock', 'bun.lockb'];
    if (basename.endsWith('.lock') || lockFiles.includes(basename)) {
      process.stderr.write(`BLOCKED: Cannot edit lock files (${basename}). Use package manager commands instead.\n`);
      process.exit(2);
    }

    // Block .git directory
    if (normalized.includes('/.git/') || normalized.includes('\\.git\\')) {
      process.stderr.write('BLOCKED: Cannot edit .git internals.\n');
      process.exit(2);
    }

    // Block system-generated sprint records
    if (normalized.includes('/docs/framework/sprints/')) {
      process.stderr.write('BLOCKED: Sprint records are system-generated. Use record-metrics skill.\n');
      process.exit(2);
    }

    process.exit(0);
  } catch {
    process.exit(0);
  }
});
