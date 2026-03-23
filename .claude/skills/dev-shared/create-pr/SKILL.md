---
name: create-pr
description: >
  Creates an atomic PR with conventional commit title, size validation, and PR
  template. Verifies Gate 3 passed before creating. Use after code review passes.
user-invocable: true
allowed-tools: Read, Grep, Glob, Bash, AskUserQuestion
---

# Create PR

Create a PR following framework conventions.

## Inputs

- Story reference (title, issue number)
- Target branch (default: main)
- Gate 3 must have passed

## Process

### 1. Pre-flight Checks

Verify before creating PR:

```bash
# Tests pass
npm test

# Lint clean
npm run lint

# Type check clean
npx tsc --noEmit

# Check diff size
git diff main --stat | tail -1
```

If diff > 300 lines, warn the human and suggest splitting.

### 2. Create Branch

Branch naming convention: `[type]/[short-description]`

Types: `feat/`, `fix/`, `refactor/`, `test/`, `docs/`, `chore/`

```bash
git checkout -b feat/[story-slug]
```

### 3. Stage and Commit

Conventional commit format: `type(scope): description`

```bash
git add [specific files]
git commit -m "feat(scope): description

Refs #[issue-number]"
```

Rules:
- Stage specific files, not `git add .`
- No `.env`, credentials, or lock files (unless intended)
- Commit message references the GitHub issue

### 4. Push and Create PR

```bash
git push -u origin feat/[story-slug]

gh pr create \
  --title "feat(scope): description" \
  --body "$(cat <<'EOF'
## What
[Brief description of what this PR does]

## Why
[Link to story/issue and business context]

## Test Evidence
- All tests pass ([N] total)
- Coverage: [N]%
- Lint: clean
- Type check: clean

## Gate 3: PASSED
[Date and reviewer]

## Checklist
- [ ] Tests pass
- [ ] Lint clean
- [ ] Type check clean
- [ ] Coverage meets target
- [ ] PR < 300 lines
- [ ] Conventional commit title
EOF
)"
```

### 5. Add Labels

```bash
gh pr edit [number] --add-label "[type]"
```

### 6. Output

```markdown
## PR Created

- **URL**: [PR URL]
- **Title**: [conventional commit title]
- **Size**: +[N] -[N] lines
- **Branch**: [branch name]
- **Target**: main
- **Labels**: [labels]
- **Issue**: #[number]

## Next Step: Gate 4 validation (SM system)
```
