#!/usr/bin/env node

/**
 * Claude Framework Installer
 *
 * Installs the Scrum + TDD methodology framework into a target project.
 *
 * Usage:
 *   node install.js                  # Install in current directory
 *   node install.js /path/to/project # Install in specified directory
 *   node install.js --dry-run        # Show what would be copied
 *   node install.js --minimal        # Only .claude/ (no docs)
 *   node install.js --force          # Overwrite existing files
 */

const fs = require("fs");
const path = require("path");

// ============================================================
// CONFIG
// ============================================================

const FRAMEWORK_ROOT = __dirname;

// What to copy — relative to framework root
const COPY_MAP = {
  // Core: always copied
  core: [
    { src: ".claude/agents", dest: ".claude/agents" },
    { src: ".claude/skills", dest: ".claude/skills" },
    { src: ".claude/hooks", dest: ".claude/hooks" },
    { src: ".claude/settings.json", dest: ".claude/settings.json" },
  ],

  // Docs: methodology, knowledge, system CLAUDE.md files
  docs: [
    { src: "global", dest: "docs/global" },
    { src: "product-owner", dest: "docs/product-owner" },
    { src: "development", dest: "docs/development" },
    { src: "scrum-master", dest: "docs/scrum-master" },
    { src: "shared", dest: "docs/shared" },
  ],

  // CLAUDE.md: adapted for target project
  entry: [{ src: "CLAUDE.md", dest: "CLAUDE.md" }],
};

// ============================================================
// HELPERS
// ============================================================

function copyRecursive(src, dest, options) {
  const stats = fs.statSync(src);

  if (stats.isDirectory()) {
    if (!options.dryRun) {
      fs.mkdirSync(dest, { recursive: true });
    }

    const items = fs.readdirSync(src);
    for (const item of items) {
      // Skip .git, node_modules, __pycache__
      if ([".git", "node_modules", "__pycache__"].includes(item)) continue;

      copyRecursive(path.join(src, item), path.join(dest, item), options);
    }
  } else {
    // Check if destination exists
    if (fs.existsSync(dest) && !options.force) {
      if (!options.dryRun) {
        options.skipped.push(dest);
        return;
      }
    }

    if (options.dryRun) {
      options.wouldCopy.push({ from: src, to: dest });
    } else {
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.copyFileSync(src, dest);
      options.copied.push(dest);
    }
  }
}

function detectStack(targetDir) {
  const stack = {
    language: "unknown",
    framework: "unknown",
    testFramework: "unknown",
    packageManager: "unknown",
  };

  // Node.js / TypeScript
  if (fs.existsSync(path.join(targetDir, "package.json"))) {
    try {
      const pkg = JSON.parse(
        fs.readFileSync(path.join(targetDir, "package.json"), "utf8")
      );
      const allDeps = {
        ...pkg.dependencies,
        ...pkg.devDependencies,
      };

      stack.language = allDeps["typescript"] ? "TypeScript" : "JavaScript";

      // Framework detection
      if (allDeps["next"]) stack.framework = "Next.js";
      else if (allDeps["react"]) stack.framework = "React";
      else if (allDeps["vue"]) stack.framework = "Vue";
      else if (allDeps["svelte"] || allDeps["@sveltejs/kit"])
        stack.framework = "Svelte";
      else if (allDeps["express"]) stack.framework = "Express";
      else if (allDeps["fastify"]) stack.framework = "Fastify";
      else if (allDeps["hono"]) stack.framework = "Hono";

      // Test framework
      if (allDeps["vitest"]) stack.testFramework = "Vitest";
      else if (allDeps["jest"]) stack.testFramework = "Jest";
      else if (allDeps["mocha"]) stack.testFramework = "Mocha";

      // Package manager
      if (fs.existsSync(path.join(targetDir, "pnpm-lock.yaml")))
        stack.packageManager = "pnpm";
      else if (fs.existsSync(path.join(targetDir, "yarn.lock")))
        stack.packageManager = "yarn";
      else if (fs.existsSync(path.join(targetDir, "bun.lockb")))
        stack.packageManager = "bun";
      else stack.packageManager = "npm";
    } catch {
      stack.language = "JavaScript";
    }
  }

  // Python
  else if (
    fs.existsSync(path.join(targetDir, "pyproject.toml")) ||
    fs.existsSync(path.join(targetDir, "requirements.txt"))
  ) {
    stack.language = "Python";
    stack.packageManager = fs.existsSync(path.join(targetDir, "pyproject.toml"))
      ? "poetry/pip"
      : "pip";

    try {
      const pyproject = fs.readFileSync(
        path.join(targetDir, "pyproject.toml"),
        "utf8"
      );
      if (pyproject.includes("django")) stack.framework = "Django";
      else if (pyproject.includes("fastapi")) stack.framework = "FastAPI";
      else if (pyproject.includes("flask")) stack.framework = "Flask";

      if (pyproject.includes("pytest")) stack.testFramework = "pytest";
    } catch {
      // No pyproject.toml
    }
  }

  // Go
  else if (fs.existsSync(path.join(targetDir, "go.mod"))) {
    stack.language = "Go";
    stack.testFramework = "go test";
    stack.packageManager = "go modules";
  }

  // Rust
  else if (fs.existsSync(path.join(targetDir, "Cargo.toml"))) {
    stack.language = "Rust";
    stack.testFramework = "cargo test";
    stack.packageManager = "cargo";
  }

  return stack;
}

function generateCLAUDEmd(targetDir, stack) {
  const projectName = path.basename(targetDir);

  return `# ${projectName}

## Framework

This project uses **Claude Framework** (Scrum + TDD methodology).

### Pipeline

Every feature follows: **Spec → Test → Code → PR → Merge**

| Gate | Name | Key Criteria |
|------|------|-------------|
| G1 | Spec Ready | AC in Given/When/Then, estimated, PO approved |
| G2 | Tests Ready | Every AC has a failing test (red state) |
| G3 | Code Ready | All tests pass, lint clean, no secrets |
| G4 | PR Ready | PR < 300 lines, conventional commit |

### Quick Start

| Need | Command |
|------|---------|
| See current status | \`/status\` |
| List all skills | \`/help\` |
| Start a new sprint | \`/plan-sprint\` |
| Write a user story | \`/write-story\` |
| Write tests from AC | \`/write-tests\` |
| Implement a feature | \`/implement-feature\` |
| Create a PR | \`/create-pr\` |

### Stack

- **Language**: ${stack.language}
- **Framework**: ${stack.framework}
- **Tests**: ${stack.testFramework}
- **Package Manager**: ${stack.packageManager}

### Key Rules

1. **TDD is mandatory** — never write implementation without a failing test first
2. **Gates are non-negotiable** — hooks enforce them automatically
3. **Human decides** — agents propose, human approves

### Docs

- Methodology: \`docs/global/methodology/\`
- Product Owner: \`docs/product-owner/\`
- Development: \`docs/development/\`
- Scrum Master: \`docs/scrum-master/\`
`;
}

function initStateFiles(targetDir, dryRun) {
  const frameworkDir = path.join(targetDir, "docs", "framework");
  const files = {
    "sprint-current.md": `# Sprint: Not Started

No sprint active. Run \`/plan-sprint\` to begin.
`,
    "backlog.md": `# Product Backlog

No stories yet. Run \`/write-story\` to create your first story.

| # | Story | Points | Priority | Status |
|---|-------|--------|----------|--------|
`,
    "velocity.md": `# Velocity History

No sprints completed yet.

| Sprint | Committed | Completed | Rate |
|--------|-----------|-----------|------|
`,
  };

  if (dryRun) return Object.keys(files).length;

  fs.mkdirSync(frameworkDir, { recursive: true });
  fs.mkdirSync(path.join(frameworkDir, "sprints"), { recursive: true });

  let created = 0;
  for (const [filename, content] of Object.entries(files)) {
    const filePath = path.join(frameworkDir, filename);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, content);
      created++;
    }
  }
  return created;
}

// ============================================================
// MAIN
// ============================================================

function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const minimal = args.includes("--minimal");
  const force = args.includes("--force");
  const help = args.includes("--help") || args.includes("-h");

  if (help) {
    console.log(`
Claude Framework Installer

Usage:
  node install.js [target-dir] [options]

Options:
  --dry-run    Show what would be copied without copying
  --minimal    Only install .claude/ (no docs)
  --force      Overwrite existing files
  --help       Show this help

Examples:
  node install.js                    # Install in current directory
  node install.js ../my-project      # Install in another project
  node install.js --dry-run          # Preview what would happen
`);
    process.exit(0);
  }

  // Target directory: first non-flag arg, or cwd
  const targetDir = path.resolve(
    args.find((a) => !a.startsWith("--")) || process.cwd()
  );

  // Don't install into the framework repo itself
  if (path.resolve(targetDir) === path.resolve(FRAMEWORK_ROOT)) {
    console.error(
      "ERROR: Cannot install framework into itself. Specify a target project directory."
    );
    console.error("  Usage: node install.js /path/to/your/project");
    process.exit(1);
  }

  // Check target exists
  if (!fs.existsSync(targetDir)) {
    console.error(`ERROR: Target directory does not exist: ${targetDir}`);
    process.exit(1);
  }

  console.log("=== Claude Framework Installer ===\n");
  console.log(`  Framework: ${FRAMEWORK_ROOT}`);
  console.log(`  Target:    ${targetDir}`);
  console.log(`  Mode:      ${dryRun ? "DRY RUN" : force ? "FORCE" : "SAFE"}`);
  console.log(`  Scope:     ${minimal ? "MINIMAL (.claude/ only)" : "FULL"}`);

  // Detect stack
  const stack = detectStack(targetDir);
  console.log(
    `\n  Stack detected: ${stack.language} / ${stack.framework} / ${stack.testFramework}`
  );

  // Build copy list
  const groups = ["core", "entry"];
  if (!minimal) groups.push("docs");

  const options = {
    dryRun,
    force,
    copied: [],
    skipped: [],
    wouldCopy: [],
  };

  console.log("\n--- Copying files ---\n");

  for (const group of groups) {
    const items = COPY_MAP[group];
    for (const item of items) {
      const srcPath = path.join(FRAMEWORK_ROOT, item.src);
      const destPath = path.join(targetDir, item.dest);

      if (!fs.existsSync(srcPath)) {
        console.log(`  SKIP: ${item.src} (not found in framework)`);
        continue;
      }

      // For CLAUDE.md, generate a project-specific version
      if (item.src === "CLAUDE.md") {
        if (dryRun) {
          options.wouldCopy.push({
            from: "CLAUDE.md (generated)",
            to: destPath,
          });
        } else if (!fs.existsSync(destPath) || force) {
          const content = generateCLAUDEmd(targetDir, stack);
          fs.writeFileSync(destPath, content);
          options.copied.push(destPath);
        } else {
          options.skipped.push(destPath);
        }
        continue;
      }

      copyRecursive(srcPath, destPath, options);
    }
  }

  // Init state files
  console.log("\n--- State files ---\n");
  if (dryRun) {
    const count = initStateFiles(targetDir, true);
    console.log(`  Would create ${count} state files in docs/framework/`);
  } else {
    const created = initStateFiles(targetDir, false);
    console.log(`  Created ${created} state files in docs/framework/`);
  }

  // Summary
  console.log("\n=== Summary ===\n");

  if (dryRun) {
    console.log(`  Would copy: ${options.wouldCopy.length} files`);
    if (options.wouldCopy.length <= 20) {
      for (const f of options.wouldCopy) {
        console.log(`    ${path.relative(targetDir, f.to)}`);
      }
    }
    console.log("\n  Run without --dry-run to install.");
  } else {
    console.log(`  Copied:  ${options.copied.length} files`);
    console.log(`  Skipped: ${options.skipped.length} files (already exist)`);

    if (options.skipped.length > 0 && !force) {
      console.log(
        "\n  TIP: Use --force to overwrite existing files."
      );
    }

    console.log(`\n  ✓ Framework installed in ${targetDir}`);
    console.log("\n  Next steps:");
    console.log("    1. Open Claude Code in your project");
    console.log("    2. Run /status to verify the framework is loaded");
    console.log("    3. Run /plan-sprint to start your first sprint");
    console.log("    4. Run /write-story to create your first user story");
  }
}

main();
