# Git Flow: Trunk-Based + GitHub Flow

## Strategy: Trunk-Based Development

`main` is always deployable. All work branches from main and merges back to main quickly.

```
main ─────●─────●─────●─────●─────●─────→
           \   /       \   /       \   /
            feat/       fix/        feat/
            login       auth-bug    dashboard
            (1-2 days)  (hours)     (1-2 days)
```

**No long-lived branches.** If a branch lives more than 3 days, it's too big — decompose it.

---

## Branch Naming

```
feat/short-description    — New feature
fix/short-description     — Bug fix
refactor/short-description — Code improvement, no behavior change
docs/short-description    — Documentation only
test/short-description    — Test additions/improvements
chore/short-description   — Tooling, config, dependencies
```

Rules:
- Lowercase, hyphens (no underscores, no spaces)
- Max 50 characters
- Descriptive but concise: `feat/user-login`, not `feat/add-user-login-page-with-form-validation`

---

## Commit Convention: Conventional Commits

```
type(scope): imperative description

[optional body: explain WHY, not WHAT]

[optional footer: breaking changes, issue references]
```

### Types

| Type | When |
|------|------|
| `feat` | New feature (visible to user) |
| `fix` | Bug fix |
| `refactor` | Code change, no behavior change |
| `test` | Adding or fixing tests |
| `docs` | Documentation only |
| `style` | Formatting, no logic change |
| `chore` | Build, deps, config |
| `perf` | Performance improvement |

### Rules

- Subject line: imperative mood, lowercase, no period, max 72 chars
- Body: explain the WHY, wrap at 80 chars
- One logical change per commit
- Each commit should leave the codebase in a working state

### Examples

```
feat(auth): add email verification flow

Users now receive a verification email on signup.
Unverified users cannot access the dashboard.

Closes #42
```

```
fix(api): handle null response from external service

The Telegram API occasionally returns null for channel metadata.
Added null check with graceful fallback to cached data.
```

---

## PR Workflow (GitHub Flow)

### Creating a PR

1. Branch from main: `git checkout -b feat/feature-name`
2. Implement following Spec → Test → Code
3. Push branch: `git push -u origin feat/feature-name`
4. Create PR with template (see @global/methodology/workflow.md)

### PR Rules

- **Single responsibility:** One concern per PR
- **Size limit:** <300 lines changed (excluding generated/lock files)
- **Title:** Follows conventional commit format
- **Body:** Includes what, why, test evidence, story link
- **Review required:** At least code-reviewer agent approval
- **CI must pass:** Tests, lint, typecheck all green
- **Up to date:** Rebased on latest main before merge

### Merging

- **Squash merge** for feature branches (clean history)
- **Merge commit** only for release branches (preserve history)
- **Delete branch** after merge (always)
- **No force push** to main (never)

### If PR is Too Large

Decompose into smaller PRs that can each be merged independently:

```
feat/user-auth (too big, 800 lines)
  → feat/user-auth-schema (DB + types, 100 lines)
  → feat/user-auth-api (API routes, 150 lines)
  → feat/user-auth-ui (Frontend components, 200 lines)
  → feat/user-auth-tests (E2E tests, 100 lines)
```

Each sub-PR is merged independently. Each leaves main in a working state.

---

## Protected Branch Rules (main)

- No direct commits to main
- PR required for all changes
- CI must pass before merge
- At least one review approval
- Branch must be up to date with main
- Squash merge enforced
