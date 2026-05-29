---
name: init-repo
description: >
  Initializes version control as the FIRST step of any project: git init,
  a sensible .gitignore, an initial bootstrap commit, then creates a private
  GitHub repo via the gh CLI and pushes/syncs it. Idempotent and safe to
  re-run. Run this before any other framework work on a new project.
user-invocable: true
allowed-tools: Bash, Read, Write, Edit, AskUserQuestion
---

# /init-repo — Initialize Git + GitHub (Step 0)

This is the FIRST thing to do on any new project, **before** writing stories,
tests, or code. It guarantees every project is under version control and
synced to a GitHub remote from the very beginning.

## Prerequisites

- `git` installed (`git --version`).
- `gh` CLI installed and authenticated (`gh auth status`).
  If not authenticated, STOP and ask the user to run `gh auth login`.

## Process

### 1. Check current state (idempotent)

- `git rev-parse --is-inside-work-tree` — if it already returns `true`, skip `git init`.
- `git remote -v` — if `origin` already points to a GitHub repo, report the URL and **STOP** (nothing to do).

### 2. Resolve repo identity

- **Repo name** = current folder name, unless the user specifies another.
- **Owner** = authenticated gh user (`gh api user -q .login`), unless the user
  asks for an organization.
- **Visibility** = **private** by default. Only ask the user if they hint otherwise.

### 3. Create .gitignore

If no `.gitignore` exists, create one with sensible defaults for the stack
(node_modules, build output, env files, OS junk, framework backup/marker files).
Never ignore `docs/` or `.claude/` skills/hooks/settings. Always ignore:
`node_modules/`, `dist/`, `build/`, `coverage/`, `.env*`, `*.log`, `.DS_Store`,
`*.bak`, `*.bak/`, `.claude/.code-review-passed`, `.claude/.code-review-findings.json`.

### 4. git init + initial commit

```bash
git init -b main
git add -A
git commit -m "chore: bootstrap project with Claude Framework"
```

NOTE: the `pre-commit-gate` hook bypasses Gate 3 when there is no `package.json`
yet (pre-code phase), so this initial commit is allowed even with no tests.

### 5. Create GitHub repo + push (sync)

```bash
gh repo create <owner>/<name> --private --source=. --remote=origin --push
```

This creates the remote repo, wires `origin`, and pushes `main` in one step.

### 6. Verify sync

```bash
git remote -v
git status -sb           # should show "## main...origin/main"
gh repo view <owner>/<name> --json name,visibility,url
```

### 7. Output summary

```markdown
## Repository Initialized

- Repo: <owner>/<name>  (private)
- Default branch: main
- Remote: origin → <url>
- Local ↔ remote: synced

### Next Step
Continue framework bootstrap (`/framework`) or write the first story
(`/write-story`). Branch protection / CI come later via `/github-setup`.
```
