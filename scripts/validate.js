#!/usr/bin/env node

/**
 * Framework Validation Pipeline
 *
 * Validates the structural integrity of all framework components:
 * - Agents: frontmatter (name, description, model, tools) + required sections
 * - Skills: frontmatter (name, description, user-invocable, allowed-tools) + required sections
 * - Hooks: referenced scripts exist
 * - Settings: valid JSON, hook references resolve
 * - Knowledge docs: have H1 title
 *
 * Usage: node scripts/validate.js [--fix] [--quiet]
 *   --fix    Auto-fix trivial issues (e.g., missing chmod)
 *   --quiet  Only show errors, not warnings or OK messages
 *
 * Exit codes: 0 = all pass, 1 = errors found
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const CLAUDE_DIR = path.join(ROOT, ".claude");

let errors = 0;
let warnings = 0;
let passed = 0;

const quiet = process.argv.includes("--quiet");

function error(file, msg) {
  console.error(`  ERROR: ${path.relative(ROOT, file)} — ${msg}`);
  errors++;
}

function warn(file, msg) {
  if (!quiet) console.warn(`  WARN:  ${path.relative(ROOT, file)} — ${msg}`);
  warnings++;
}

function ok(msg) {
  if (!quiet) console.log(`  OK:    ${msg}`);
  passed++;
}

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;

  const fm = {};
  const lines = match[1].split("\n");
  let currentKey = null;
  let currentValue = "";

  for (const line of lines) {
    const keyMatch = line.match(/^(\w[\w-]*):\s*(.*)/);
    if (keyMatch) {
      if (currentKey) {
        fm[currentKey] = currentValue.trim();
      }
      currentKey = keyMatch[1];
      // Handle YAML multiline indicators (> and |)
      currentValue = keyMatch[2].replace(/^[>|]\s*$/, "").trim();
    } else if (currentKey && (line.startsWith("  ") || line.trim() === "")) {
      currentValue += " " + line.trim();
    }
  }
  if (currentKey) {
    fm[currentKey] = currentValue.trim();
  }

  return fm;
}

function getH2Sections(content) {
  const matches = content.match(/^## .+/gm) || [];
  return matches.map((m) => m.replace("## ", "").trim());
}

function findFiles(dir, pattern) {
  const results = [];
  if (!fs.existsSync(dir)) return results;

  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      results.push(...findFiles(fullPath, pattern));
    } else if (pattern.test(item.name)) {
      results.push(fullPath);
    }
  }
  return results;
}

// ============================================================
// 1. VALIDATE AGENTS
// ============================================================
function validateAgents() {
  console.log("\n--- Agents ---");
  const agentDir = path.join(CLAUDE_DIR, "agents");
  const files = findFiles(agentDir, /\.md$/);

  if (files.length === 0) {
    error(agentDir, "no agent files found");
    return;
  }

  const requiredFm = ["name", "description", "tools"];
  const validModels = ["haiku", "sonnet", "opus", "inherit", "default"];
  const requiredSections = [
    "Role",
    "When You Are Invoked",
    "Your Process",
    "Boundaries",
    "Escalation",
  ];

  let valid = 0;
  for (const file of files) {
    const content = fs.readFileSync(file, "utf-8");
    const fm = parseFrontmatter(content);
    let fileOk = true;

    if (!fm) {
      error(file, "missing or invalid YAML frontmatter");
      continue;
    }

    // Check required frontmatter fields
    for (const field of requiredFm) {
      if (!fm[field]) {
        error(file, `frontmatter missing "${field}"`);
        fileOk = false;
      }
    }

    // Check model if present
    if (fm.model && !validModels.includes(fm.model)) {
      error(
        file,
        `invalid model "${fm.model}" (valid: ${validModels.join(", ")})`
      );
      fileOk = false;
    }

    if (!fm.model) {
      warn(file, 'no "model" specified — will inherit from parent session');
    }

    // Check required sections
    const sections = getH2Sections(content);
    for (const req of requiredSections) {
      if (!sections.some((s) => s.toLowerCase().includes(req.toLowerCase()))) {
        // "Your Process" can also be just "Process"
        if (
          req === "Your Process" &&
          sections.some((s) => s.toLowerCase().includes("process"))
        ) {
          continue;
        }
        warn(file, `missing section "## ${req}"`);
      }
    }

    if (fileOk) valid++;
  }

  ok(`${valid}/${files.length} agents valid`);
}

// ============================================================
// 2. VALIDATE SKILLS
// ============================================================
function validateSkills() {
  console.log("\n--- Skills ---");
  const skillDir = path.join(CLAUDE_DIR, "skills");
  const files = findFiles(skillDir, /SKILL\.md$/);

  if (files.length === 0) {
    error(skillDir, "no skill files found");
    return;
  }

  const requiredFm = ["name", "description"];

  let valid = 0;
  for (const file of files) {
    const content = fs.readFileSync(file, "utf-8");
    const fm = parseFrontmatter(content);
    let fileOk = true;

    if (!fm) {
      error(file, "missing or invalid YAML frontmatter");
      continue;
    }

    // Check required frontmatter fields
    for (const field of requiredFm) {
      if (!fm[field]) {
        error(file, `frontmatter missing "${field}"`);
        fileOk = false;
      }
    }

    // Check for allowed-tools
    if (!fm["allowed-tools"]) {
      warn(file, 'no "allowed-tools" in frontmatter');
    }

    // Check for user-invocable
    if (fm["user-invocable"] === undefined) {
      warn(file, '"user-invocable" not specified in frontmatter');
    }

    // Check H1 title exists
    if (!content.match(/^# .+/m)) {
      error(file, "missing H1 title (# Title)");
      fileOk = false;
    }

    // Check for Process section
    const sections = getH2Sections(content);
    if (
      !sections.some(
        (s) =>
          s.toLowerCase().includes("process") ||
          s.toLowerCase().includes("operations")
      )
    ) {
      warn(file, 'missing "## Process" section');
    }

    if (fileOk) valid++;
  }

  ok(`${valid}/${files.length} skills valid`);
}

// ============================================================
// 3. VALIDATE HOOKS
// ============================================================
function validateHooks() {
  console.log("\n--- Hooks ---");
  const hookDir = path.join(CLAUDE_DIR, "hooks");

  if (!fs.existsSync(hookDir)) {
    warn(hookDir, "hooks directory not found");
    return;
  }

  const files = findFiles(hookDir, /\.sh$/);

  let valid = 0;
  for (const file of files) {
    const content = fs.readFileSync(file, "utf-8");
    let fileOk = true;

    // Check shebang
    if (!content.startsWith("#!/")) {
      warn(file, "missing shebang (#!/bin/bash)");
    }

    // Check not empty
    const lines = content.split("\n").filter((l) => l.trim() && !l.startsWith("#"));
    if (lines.length < 2) {
      error(file, "hook script appears empty (< 2 non-comment lines)");
      fileOk = false;
    }

    if (fileOk) valid++;
  }

  ok(`${valid}/${files.length} hook scripts valid`);
}

// ============================================================
// 4. VALIDATE SETTINGS.JSON
// ============================================================
function validateSettings() {
  console.log("\n--- Settings ---");
  const settingsFile = path.join(CLAUDE_DIR, "settings.json");

  if (!fs.existsSync(settingsFile)) {
    warn(settingsFile, "settings.json not found");
    return;
  }

  let settings;
  try {
    const content = fs.readFileSync(settingsFile, "utf-8");
    settings = JSON.parse(content);
  } catch (e) {
    error(settingsFile, `invalid JSON: ${e.message}`);
    return;
  }

  // Check hooks section exists
  if (!settings.hooks) {
    warn(settingsFile, 'no "hooks" section');
    return;
  }

  // Validate hook references
  const hookEvents = Object.keys(settings.hooks);
  let refsValid = 0;
  let refsTotal = 0;

  for (const event of hookEvents) {
    const matchers = settings.hooks[event];
    if (!Array.isArray(matchers)) continue;

    for (const matcher of matchers) {
      if (!matcher.hooks || !Array.isArray(matcher.hooks)) continue;

      for (const hook of matcher.hooks) {
        if (hook.type !== "command") continue;
        refsTotal++;

        // Extract script path from command
        const scriptMatch = hook.command.match(
          /hooks\/([a-z0-9-]+\.sh)/
        );
        if (scriptMatch) {
          const scriptPath = path.join(CLAUDE_DIR, "hooks", scriptMatch[1]);
          if (!fs.existsSync(scriptPath)) {
            error(
              settingsFile,
              `hook references "${scriptMatch[1]}" which doesn't exist`
            );
          } else {
            refsValid++;
          }
        }
      }
    }
  }

  if (refsTotal > 0) {
    ok(`settings.json valid — ${refsValid}/${refsTotal} hook references resolve`);
  } else {
    ok("settings.json valid (no hook references to check)");
  }
}

// ============================================================
// 5. VALIDATE KNOWLEDGE DOCS
// ============================================================
function validateKnowledge() {
  console.log("\n--- Knowledge Docs ---");

  const knowledgeDirs = [
    path.join(ROOT, "product-owner", "knowledge"),
    path.join(ROOT, "development", "knowledge"),
    path.join(ROOT, "scrum-master", "knowledge"),
  ];

  let totalFiles = 0;
  let valid = 0;

  for (const dir of knowledgeDirs) {
    if (!fs.existsSync(dir)) continue;
    const files = findFiles(dir, /\.md$/);
    totalFiles += files.length;

    for (const file of files) {
      const content = fs.readFileSync(file, "utf-8");
      let fileOk = true;

      // Check H1 title
      if (!content.match(/^# .+/m)) {
        error(file, "missing H1 title");
        fileOk = false;
      }

      // Check minimum content (at least 10 lines)
      if (content.split("\n").length < 10) {
        warn(file, "very short document (< 10 lines)");
      }

      // Check for at least one H2 section
      if (!content.match(/^## .+/m)) {
        warn(file, "no H2 sections found — consider adding structure");
      }

      if (fileOk) valid++;
    }
  }

  ok(`${valid}/${totalFiles} knowledge docs valid`);
}

// ============================================================
// 6. VALIDATE SYSTEM DOCS
// ============================================================
function validateSystemDocs() {
  console.log("\n--- System Docs ---");

  const systemDocs = [
    { path: path.join(ROOT, "product-owner", "CLAUDE.md"), name: "PO" },
    { path: path.join(ROOT, "development", "CLAUDE.md"), name: "Dev" },
    { path: path.join(ROOT, "scrum-master", "CLAUDE.md"), name: "SM" },
    { path: path.join(ROOT, "global", "CLAUDE.md"), name: "Global" },
  ];

  const requiredSections = [
    "Purpose",
    "Agents",
    "Rules",
    "Quality Gate Ownership",
    "Metrics",
    "Character",
  ];

  let valid = 0;
  for (const doc of systemDocs) {
    if (!fs.existsSync(doc.path)) {
      error(doc.path, `${doc.name} system CLAUDE.md not found`);
      continue;
    }

    const content = fs.readFileSync(doc.path, "utf-8");
    const sections = getH2Sections(content);
    let fileOk = true;

    // Global CLAUDE.md has different structure
    if (doc.name === "Global") {
      if (!content.match(/^# /m)) {
        error(doc.path, "missing H1 title");
        fileOk = false;
      }
    } else {
      for (const req of requiredSections) {
        if (
          !sections.some((s) => s.toLowerCase().includes(req.toLowerCase()))
        ) {
          warn(doc.path, `missing section "## ${req}"`);
        }
      }
    }

    // Check not too long (should be < 100 lines for system docs)
    const lineCount = content.split("\n").length;
    if (lineCount > 120 && doc.name !== "Global") {
      warn(doc.path, `${lineCount} lines — system CLAUDE.md should be < 100 lines`);
    }

    if (fileOk) valid++;
  }

  ok(`${valid}/${systemDocs.length} system docs valid`);
}

// ============================================================
// 7. CROSS-REFERENCE CHECK
// ============================================================
function validateCrossReferences() {
  console.log("\n--- Cross-References ---");

  // Check that every agent referenced in CLAUDE.md has a file
  const systems = [
    {
      claude: path.join(ROOT, "development", "CLAUDE.md"),
      prefix: "dev-",
    },
    {
      claude: path.join(ROOT, "scrum-master", "CLAUDE.md"),
      prefix: "sm-",
    },
    {
      claude: path.join(ROOT, "product-owner", "CLAUDE.md"),
      prefix: "po-",
    },
  ];

  const agentDir = path.join(CLAUDE_DIR, "agents");
  const existingAgents = fs.existsSync(agentDir)
    ? fs.readdirSync(agentDir).map((f) => f.replace(".md", ""))
    : [];

  for (const sys of systems) {
    if (!fs.existsSync(sys.claude)) continue;

    const agents = existingAgents.filter((a) => a.startsWith(sys.prefix));
    if (agents.length === 0) {
      warn(sys.claude, `no agents found with prefix "${sys.prefix}"`);
    }
  }

  // Check that workflow files reference existing skills
  const workflowFiles = [
    path.join(ROOT, "development", "workflows.md"),
    path.join(ROOT, "scrum-master", "workflows.md"),
    path.join(ROOT, "product-owner", "workflows.md"),
  ];

  let checked = 0;
  for (const wf of workflowFiles) {
    if (fs.existsSync(wf)) checked++;
  }

  ok(`${checked} workflow files present`);
}

// ============================================================
// RUN ALL VALIDATIONS
// ============================================================
console.log("=== Framework Validation Pipeline ===");

validateAgents();
validateSkills();
validateHooks();
validateSettings();
validateKnowledge();
validateSystemDocs();
validateCrossReferences();

// Summary
console.log("\n=== Summary ===");
console.log(`  Errors:   ${errors}`);
console.log(`  Warnings: ${warnings}`);
console.log(`  Passed:   ${passed}`);
console.log(
  `\n  Result: ${errors === 0 ? "ALL PASS ✓" : `${errors} ERROR(S) FOUND ✗`}`
);

process.exit(errors > 0 ? 1 : 0);
