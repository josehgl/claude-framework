#!/usr/bin/env node
// Utility: creates the code review marker file
// Called by dev-code-reviewer agent or /simplify skill after a PASS verdict
//
// Usage: node mark-review-passed.js [verdict]
//   verdict: "PASS" creates marker, anything else removes it

const fs = require('fs');
const path = require('path');

const projectDir = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const markerPath = path.join(projectDir, '.claude', '.code-review-passed');
const verdict = (process.argv[2] || 'PASS').toUpperCase();

if (verdict === 'PASS') {
  fs.writeFileSync(markerPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    verdict: 'PASS',
  }));
  console.log('Code review marker created. Commits are now unblocked for 30 minutes.');
} else {
  try { fs.unlinkSync(markerPath); } catch {}
  console.log('Code review marker removed. Commits are blocked until review passes.');
}
