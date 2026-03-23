#!/usr/bin/env node
// PreToolUse hook: reminds about TDD when editing source files
// Checks if tests exist for the file being edited

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

    const basename = path.basename(filePath);
    const ext = path.extname(filePath).slice(1);

    // Only check source code files
    const sourceExts = ['ts', 'tsx', 'js', 'jsx', 'py', 'go', 'rs'];
    if (!sourceExts.includes(ext)) process.exit(0);

    // Skip test files, configs, docs
    const skipPatterns = ['.test.', '.spec.', 'test_', '_test.'];
    if (skipPatterns.some(p => basename.includes(p))) process.exit(0);

    // Derive expected test file paths
    const dirname = path.dirname(filePath);
    const nameNoExt = path.basename(filePath, path.extname(filePath));

    const testPatterns = [
      path.join(dirname, `${nameNoExt}.test.${ext}`),
      path.join(dirname, `${nameNoExt}.spec.${ext}`),
      path.join(dirname, '__tests__', `${nameNoExt}.test.${ext}`),
      path.join(dirname, '..', 'tests', `test_${nameNoExt}.py`),
      path.join(dirname, `${nameNoExt}_test.go`),
    ];

    const testExists = testPatterns.some(p => {
      try { return fs.existsSync(p); } catch { return false; }
    });

    if (!testExists) {
      process.stderr.write(`TDD reminder: No test file found for ${basename}. Consider writing tests first (Gate 2).\n`);
    }

    // Never block — just remind
    process.exit(0);
  } catch {
    process.exit(0);
  }
});
