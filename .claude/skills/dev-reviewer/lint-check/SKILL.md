---
name: lint-check
description: >
  Runs linter and type checker, reports results in structured format. Auto-detects
  tooling from project configuration. Use to verify lint/typecheck compliance.
user-invocable: true
allowed-tools: Read, Grep, Glob, Bash, AskUserQuestion
---

# Lint Check

Run linter and type checker, report structured results.

## Inputs

- Scope: all files (default) or changed files only

## Process

### 1. Detect Tools

| Check | Source |
|-------|--------|
| ESLint | `package.json` devDependencies, `.eslintrc.*` |
| Biome | `biome.json` |
| Ruff | `pyproject.toml` `[tool.ruff]`, `ruff.toml` |
| golangci-lint | `.golangci.yml` |
| TypeScript | `tsconfig.json` |
| mypy | `pyproject.toml` `[tool.mypy]`, `mypy.ini` |

### 2. Run Lint

```bash
# JavaScript/TypeScript
npx eslint . --format compact    # or npx biome check

# Python
ruff check .                     # or flake8

# Go
golangci-lint run
```

### 3. Run Type Check

```bash
# TypeScript
npx tsc --noEmit

# Python
mypy src/

# Go
go vet ./...
```

### 4. Output

```markdown
## Lint & Type Check Report

### Lint: [CLEAN / N issues]
| # | File:Line | Rule | Message | Severity |
|---|-----------|------|---------|----------|

### Type Check: [CLEAN / N errors]
| # | File:Line | Error |
|---|-----------|-------|

### Summary
- Lint errors: [N]
- Lint warnings: [N]
- Type errors: [N]
- Gate 3 status: [PASS / FAIL]
```
