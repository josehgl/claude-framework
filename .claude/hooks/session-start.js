#!/usr/bin/env node
// SessionStart hook: injects framework state into Claude's context
// Outputs current sprint and velocity to stdout for context injection

const fs = require('fs');
const path = require('path');

const sprintFile = path.join(process.cwd(), 'docs', 'framework', 'sprint-current.md');
const velocityFile = path.join(process.cwd(), 'docs', 'framework', 'velocity.md');

if (fs.existsSync(sprintFile)) {
  console.log('=== FRAMEWORK STATE ===');
  console.log('');

  // Current sprint summary (first 20 lines)
  try {
    const content = fs.readFileSync(sprintFile, 'utf8');
    const lines = content.split('\n').slice(0, 20);
    console.log(lines.join('\n'));
    console.log('');
  } catch {
    // Skip if unreadable
  }

  // Recent velocity (last 5 lines)
  if (fs.existsSync(velocityFile)) {
    try {
      const content = fs.readFileSync(velocityFile, 'utf8');
      const lines = content.split('\n');
      console.log('--- Velocity ---');
      console.log(lines.slice(-5).join('\n'));
    } catch {
      // Skip if unreadable
    }
  }

  console.log('');
  console.log('=== END FRAMEWORK STATE ===');
}
