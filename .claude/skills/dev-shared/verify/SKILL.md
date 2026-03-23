---
name: verify
description: >
  Runs the full verification pipeline: build, typecheck, lint, tests, security
  scan, and diff review. Produces a consolidated READY/NOT READY report.
  Use before creating a PR or as a final check after implementation.
user-invocable: true
allowed-tools: Read, Grep, Glob, Bash, AskUserQuestion
---

# Verify

Run the complete verification pipeline and produce a consolidated report.

## Inputs

- Scope: full project (default) or changed files only
- Optional: skip specific checks (e.g., skip build if no build step)

## Process

### 1. Detect Stack

Auto-detect project tools (or read from `docs/framework/config.md` if available):

```bash
# Check for build/test/lint commands
Glob "package.json" "pyproject.toml" "go.mod" "Cargo.toml" "Makefile"
```

### 2. Build Check

```bash
# JavaScript/TypeScript
npm run build 2>&1

# Python (if applicable)
python -m py_compile src/**/*.py

# Go
go build ./...

# Rust
cargo build
```

Record: PASS (exit 0) / FAIL (exit non-zero) / SKIP (no build step)

### 3. Type Check

```bash
# TypeScript
npx tsc --noEmit 2>&1

# Python
mypy src/ 2>&1

# Go
go vet ./... 2>&1
```

Record: PASS / FAIL (with error count) / SKIP

### 4. Lint Check

```bash
# JavaScript/TypeScript
npx eslint . --format compact 2>&1

# Python
ruff check . 2>&1

# Go
golangci-lint run 2>&1
```

Record: PASS / FAIL (with error and warning counts) / SKIP

### 5. Test Suite

```bash
# JavaScript/TypeScript
npm test 2>&1

# Python
pytest -v --tb=short 2>&1

# Go
go test ./... -v 2>&1
```

Extract: total, passed, failed, skipped, coverage percentage.
Record: PASS (all green) / FAIL (any failures)

### 6. Security Scan

Scan for common security issues:

```bash
# Hardcoded secrets
grep -rnE "(password|secret|api_key|apikey|token)\s*[:=]\s*['\"][^'\"]{8,}" \
  --include='*.ts' --include='*.js' --include='*.py' --include='*.go' \
  --exclude-dir=node_modules --exclude-dir=.git . 2>/dev/null

# Console.log left in code (JS/TS)
grep -rn "console\.log" --include='*.ts' --include='*.js' \
  --exclude-dir=node_modules --exclude='*.test.*' --exclude='*.spec.*' . 2>/dev/null

# TODO without issue link
grep -rn "TODO" --include='*.ts' --include='*.js' --include='*.py' --include='*.go' \
  --exclude-dir=node_modules . 2>/dev/null | grep -v '#[0-9]' | grep -v 'https://'

# .env files in git
git ls-files | grep -E '\.env($|\.)'
```

Record: PASS (no issues) / WARN (non-critical findings) / FAIL (secrets found)

### 7. Diff Review

```bash
# What changed vs main
git diff main --stat 2>/dev/null || git diff HEAD~1 --stat

# Total lines changed
git diff main --numstat 2>/dev/null || git diff HEAD~1 --numstat
```

Check:
- Total lines changed (warn if > 300)
- Files changed (list them)
- Any untracked files that should be committed

### 8. Output: Verification Report

```markdown
# Verification Report

## Overall: [READY / NOT READY]

| # | Check | Status | Detail |
|---|-------|--------|--------|
| 1 | Build | [PASS/FAIL/SKIP] | [output summary] |
| 2 | Type Check | [PASS/FAIL/SKIP] | [N errors] |
| 3 | Lint | [PASS/FAIL/SKIP] | [N errors, N warnings] |
| 4 | Tests | [PASS/FAIL] | [N passed, N failed, N% coverage] |
| 5 | Security | [PASS/WARN/FAIL] | [findings summary] |
| 6 | Diff Size | [OK/WARN] | [+N -N lines, N files] |

## Failed Checks

### [Check Name]
[Specific errors and how to fix them]

## Warnings

### [Warning Name]
[Details and recommendations]

## Gate 3 Status: [PASS / FAIL]

## Recommendation
- READY → proceed to `create-pr`
- NOT READY → fix [list of failed checks] first
```

### Decision Logic

**READY** when:
- Build: PASS or SKIP
- Type Check: PASS or SKIP
- Lint: PASS (0 errors; warnings are OK)
- Tests: PASS (all green, coverage >= target)
- Security: PASS or WARN (no hardcoded secrets)
- Diff Size: any (warning only, not blocking)

**NOT READY** when:
- Any of: Build FAIL, Type Check FAIL, Lint FAIL (errors), Tests FAIL, Security FAIL
