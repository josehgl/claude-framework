#!/usr/bin/env node
// PreToolUse hook: enforces skill prerequisites
// Blocks skill execution if required artifacts are missing
// Reads the skill's SKILL.md frontmatter for `requires` declarations
// and checks that each artifact file exists in the project

const fs = require('fs');
const path = require('path');

let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => { input += chunk; });
process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input);
    const toolName = data?.tool_name || '';

    // Only intercept Skill tool calls
    if (toolName !== 'Skill') process.exit(0);

    const skillName = data?.tool_input?.skill || '';
    if (!skillName) process.exit(0);

    // Strip namespace prefix if present (e.g., "anthropic-skills:pdf" -> skip)
    // Only check framework PO/SM/Dev skills
    if (skillName.includes(':')) process.exit(0);

    const projectDir = process.env.CLAUDE_PROJECT_DIR || process.cwd();
    const claudeDir = path.join(projectDir, '.claude', 'skills');

    // Find the SKILL.md file for this skill name
    // Skills are organized as: .claude/skills/{group}/{skill-name}/SKILL.md
    const skillFile = findSkillFile(claudeDir, skillName);
    if (!skillFile) process.exit(0); // Unknown skill — let it pass

    // Parse frontmatter
    const content = fs.readFileSync(skillFile, 'utf8');
    const requires = parseRequires(content);
    if (requires.length === 0) process.exit(0); // No prerequisites

    // Check each required artifact
    const missing = [];
    for (const req of requires) {
      const artifactPath = path.join(projectDir, req.artifact);
      if (!fs.existsSync(artifactPath)) {
        missing.push(req);
      }
    }

    if (missing.length === 0) process.exit(0); // All prerequisites met

    // Block execution with clear message
    const lines = [
      `BLOCKED: Skill "${skillName}" has unmet prerequisites:`,
      '',
    ];
    for (const req of missing) {
      lines.push(`  ✗ Missing: ${req.artifact}`);
      lines.push(`    Reason: ${req.reason}`);
      lines.push('');
    }
    lines.push('Complete the prerequisite steps before running this skill.');

    process.stderr.write(lines.join('\n') + '\n');
    process.exit(2);
  } catch (err) {
    // On error, don't block — fail open
    process.exit(0);
  }
});

/**
 * Recursively find a SKILL.md whose frontmatter `name` matches the skill name
 */
function findSkillFile(skillsDir, skillName) {
  if (!fs.existsSync(skillsDir)) return null;

  // First try direct path match: skills/*/{skillName}/SKILL.md
  try {
    const groups = fs.readdirSync(skillsDir);
    for (const group of groups) {
      const candidate = path.join(skillsDir, group, skillName, 'SKILL.md');
      if (fs.existsSync(candidate)) return candidate;
    }
  } catch {
    // Fall through to frontmatter scan
  }

  // Fallback: scan all SKILL.md files for matching `name:` in frontmatter
  try {
    return scanForSkillName(skillsDir, skillName);
  } catch {
    return null;
  }
}

function scanForSkillName(dir, skillName) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const result = scanForSkillName(fullPath, skillName);
      if (result) return result;
    } else if (entry.name === 'SKILL.md') {
      const content = fs.readFileSync(fullPath, 'utf8').replace(/\r\n/g, '\n');
      const nameMatch = content.match(/^name:\s*(.+)$/m);
      if (nameMatch && nameMatch[1].trim() === skillName) {
        return fullPath;
      }
    }
  }
  return null;
}

/**
 * Parse `requires` from YAML frontmatter
 * Supports:
 *   requires:
 *     - artifact: "path/to/file"
 *       reason: "why it's needed"
 */
function parseRequires(content) {
  // Normalize line endings (Windows CRLF → LF)
  const normalized = content.replace(/\r\n/g, '\n');

  // Extract frontmatter between --- delimiters
  const fmMatch = normalized.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) return [];

  const fm = fmMatch[1];
  const requires = [];

  // Find the requires: block
  const reqStart = fm.indexOf('requires:');
  if (reqStart === -1) return [];

  // Parse each - artifact: / reason: pair
  const lines = fm.slice(reqStart).split('\n').slice(1);
  let current = null;

  for (const line of lines) {
    const trimmed = line.trim();

    // Stop if we hit a new top-level key (not indented under requires)
    if (line.match(/^\S/) && !line.startsWith(' ') && !line.startsWith('-')) break;

    const artifactMatch = trimmed.match(/^-?\s*artifact:\s*"?([^"]+)"?/);
    if (artifactMatch) {
      if (current) requires.push(current);
      current = { artifact: artifactMatch[1].trim(), reason: '' };
      continue;
    }

    const reasonMatch = trimmed.match(/^reason:\s*"?([^"]+)"?/);
    if (reasonMatch && current) {
      current.reason = reasonMatch[1].trim();
    }
  }

  if (current) requires.push(current);
  return requires;
}
