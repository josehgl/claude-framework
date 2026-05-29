#!/usr/bin/env node
// PreToolUse hook: BLOCKS editing source files without tests first (TDD — Gate 2)
// Skips: test files, framework files, configs, docs

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

    // Skip test files
    const testPatterns = ['.test.', '.spec.', 'test_', '_test.'];
    if (testPatterns.some(p => basename.includes(p))) process.exit(0);

    // Skip framework infrastructure files (.claude/, configs, docs)
    const normalizedPath = filePath.replace(/\/g, '/');
    const skipDirs = ['.claude/', 'docs/', 'node_modules/', 'public/'];
    if (skipDirs.some(d => normalizedPath.includes(d))) process.exit(0);

    // Skip config files
    const configPatterns = ['config', '.config', 'next.config', 'vitest.config', 'tsconfig', 'eslint', 'postcss'];
    if (configPatterns.some(p => basename.toLowerCase().includes(p))) process.exit(0);

    // Derive expected test file paths
    const dirname = path.dirname(filePath);
    const nameNoExt = path.basename(filePath, path.extname(filePath));

    const expectedTests = [
      path.join(dirname, `${nameNoExt}.test.${ext}`),
      path.join(dirname, `${nameNoExt}.spec.${ext}`),
      path.join(dirname, '__tests__', `${nameNoExt}.test.${ext}`),
      path.join(dirname, '..', 'tests', `test_${nameNoExt}.py`),
      path.join(dirname, `${nameNoExt}_test.go`),
    ];

    const testExists = expectedTests.some(p => {
      try { return fs.existsSync(p); } catch { return false; }
    });

    if (!testExists) {
      process.stderr.write(`BLOCKED: No test file found for ${basename}. Write tests first (TDD — Gate 2).\nExpected one of:\n${expectedTests.map(p => '  ' + p).join('\n')}\n`);
      process.exit(2);
    }

    process.exit(0);
  } catch {
    process.exit(0);
  }
});
