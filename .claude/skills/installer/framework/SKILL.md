---
name: framework
description: >
  Bootstraps a project with the Claude Development Framework. Detects stack,
  interviews user for preferences, configures hooks, and initializes state.
  Use to install the framework on any new or existing project.
user-invocable: true
allowed-tools: Read, Grep, Glob, Bash, Write, Edit, AskUserQuestion
---

# Framework Installer

Install the Claude Development Framework on a project.

## Usage

```
/framework              — Full installation
/framework audit        — Check existing installation health
```

## Process: Full Installation

### 0. Initialize Git + GitHub Repository (always first)

**Before any other step**, ensure the project is under version control and
synced to GitHub. Run the `init-repo` skill (`/init-repo`): `git init -b main`,
a sensible `.gitignore`, an initial `chore: bootstrap` commit, then
`gh repo create --private --source=. --remote=origin --push`. Idempotent — a
no-op if a GitHub `origin` already exists. See @global/methodology/git-flow.md (Step 0).

### 1. Check Existing Installation

Look for `docs/framework/config.md`:
- If exists: "Framework already installed. Run `/framework audit` to check health, or confirm to re-install."
- If not: proceed

### 2. Detect Stack

Run the detect-stack skill process:
- Language, framework, test runner, linter, type checker
- Package manager, database, CI/CD

If stack cannot be auto-detected, ask the human.

### 3. Interview

Ask the human:

1. "What is this project called?"
2. "How long should sprints be?" (default: 2 weeks)
3. "What test coverage target?" (default: 80% for business logic)
4. "Any specific conventions I should know about?"

### 4. Configure Framework Files

Create or update the project's `.claude/` directory:

#### CLAUDE.md (project root)

Create or append framework imports:

```markdown
# [Project Name]

## Framework
This project uses the Claude Development Framework.

See methodology:
- @global/methodology/workflow.md — Spec → Test → Code → PR pipeline
- @global/methodology/quality-gates.md — Quality gate criteria
- @global/methodology/tdd.md — TDD cycle rules
- @global/methodology/scrum.md — Sprint practices
- @global/methodology/git-flow.md — Git conventions

## Systems
- Product Owner: @product-owner/CLAUDE.md
- Development: @development/CLAUDE.md
- Scrum Master: @scrum-master/CLAUDE.md
```

#### Hooks

Copy hook scripts and configure `.claude/settings.json` with:
- PreToolUse: protect-files, gate2-test-ready
- PostToolUse: gate3-code-ready

### 5. Initialize State

Run the init-state skill process:
- Create `docs/framework/` directory
- Write config.md, backlog.md, sprint-current.md, velocity.md

### 6. GitHub CI/CD Setup

If the project has a GitHub remote, run the `github-setup` skill process:
- Create `.github/workflows/ci.yml` (tests, lint, typecheck on every PR)
- Set up branch protection on main (requires PR + CI passing)
- Create code review labels (code-review, tech-debt, priority:high)
- Copy review issue scripts to `scripts/`

This ensures code quality enforcement at the GitHub level, complementing the local hooks.

### 7. Verify Installation

Run a quick health check:
- [ ] `.claude/settings.json` has hooks configured
- [ ] `docs/framework/config.md` exists
- [ ] Test runner detected and working
- [ ] Linter detected and working
- [ ] Git repository initialized

### 7. Output: Installation Summary

```markdown
## Framework Installed

### Project: [name]
### Stack: [language] + [framework]

### Configured
- [x] Hooks: protect-files, gate2-test-ready, gate3-code-ready, pre-commit-gate
- [x] State: docs/framework/ initialized
- [x] Sprint 0: Setup sprint created
- [x] CLAUDE.md: Framework imports added
- [x] GitHub: CI workflow, branch protection, review issue automation

### Commands Detected
- Test: `[command]`
- Lint: `[command]`
- Type check: `[command]`

### Next Steps
1. Use PO skills to write stories (write-story, product-discovery)
2. Use story-to-tests to start the dev pipeline
3. Use plan-sprint when ready for Sprint 1

### Available Skills
**PO**: write-story, critique-spec, story-splitter, product-discovery, persona-builder...
**Dev**: write-tests, implement-feature, fix-bug, review-code, create-pr...
**SM**: plan-sprint, close-sprint, validate-gate, daily-standup...
```
