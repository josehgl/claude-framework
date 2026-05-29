---
name: github-setup
description: >
  Sets up GitHub CI/CD pipeline and branch protection for a project.
  Creates CI workflow (tests/lint/typecheck), configures branch protection
  on main, and sets up auto-issue creation for code review findings.
  Run this once after installing the framework on a new project.
user-invocable: true
allowed-tools: Read, Grep, Glob, Bash, Write, Edit, AskUserQuestion
requires:
  - artifact: "package.json"
    reason: "Need a project with package.json to configure CI"
---

# GitHub Project Setup

Configure GitHub CI, branch protection, and code review automation for a project.

## Usage

```
/github-setup           — Full setup (CI + branch protection + review issues)
```

## Process

### 1. Verify Prerequisites

Check:
- [ ] Git repo exists with GitHub remote
- [ ] `gh` CLI is authenticated (`gh auth status`)
- [ ] `package.json` exists with test/lint scripts

If any fail, report what's missing and stop.

### 2. Create CI Workflow

Copy `.github/workflows/ci.yml` from the framework to the project.

The CI workflow:
- Triggers on push to main and on PRs to main
- Auto-detects package manager (npm/yarn/pnpm/bun)
- Runs: tests, linter, TypeScript type check
- Reports PASS/FAIL as GitHub status checks

If `.github/workflows/ci.yml` already exists, ask the user before overwriting.

### 3. Set Up Branch Protection

Run `bash scripts/setup-branch-protection.sh` (copied from framework).

This configures:
- No direct push to main (requires PR)
- CI status checks must pass before merge
- Stale reviews dismissed on new push

If it fails (plan limitations), show the user manual instructions.

### 4. Create Review Issue Labels

Create the labels needed for auto-issue creation:

```bash
gh label create "code-review" --color "0E8A16" --description "Finding from code review agent" --force
gh label create "tech-debt" --color "FBCA04" --description "Technical debt to address" --force
gh label create "priority:high" --color "D93F0B" --description "High priority issue" --force
```

### 5. Copy Review Scripts

Ensure these scripts exist in the project:
- `scripts/setup-branch-protection.sh`
- `scripts/create-review-issues.sh`

### 6. Update CLAUDE.md

Add to the project's CLAUDE.md:

```markdown
### CI/CD

- **CI**: GitHub Actions runs tests, lint, typecheck on every PR
- **Branch Protection**: main requires PR + passing CI
- **Code Review Issues**: `dev-code-reviewer` auto-creates GitHub issues for findings
```

### 7. Commit Setup

Stage and commit:
```
ci: configure GitHub Actions CI, branch protection, and review automation
```

### 8. Push and Verify

```bash
git push origin main
```

Then verify:
- CI workflow appears in GitHub Actions tab
- Branch protection is active (try `git push origin main` — should fail after protection)

### 9. Output Summary

```markdown
## GitHub Setup Complete

### CI Pipeline
- Workflow: `.github/workflows/ci.yml`
- Triggers: push to main, PRs to main
- Checks: tests, lint, typecheck

### Branch Protection
- Direct push to main: BLOCKED
- Required: PR + CI passing
- Approvals: 0 (increase in Settings if needed)

### Code Review Automation
- Labels created: code-review, tech-debt, priority:high
- Script: `scripts/create-review-issues.sh`
- Findings file: `.claude/.code-review-findings.json`

### Next Steps
1. CI will run on your next push/PR
2. Code reviewer will auto-create issues on NEEDS WORK/FAIL verdicts
3. Adjust required approvals in GitHub Settings > Branches if desired
```
