---
name: coverage-check
description: >
  Checks test coverage against project targets and identifies gaps. Use after
  implementation to verify coverage meets Gate 3 requirements.
user-invocable: true
allowed-tools: Read, Grep, Glob, Bash, AskUserQuestion
---

# Coverage Check

Analyze test coverage and identify gaps.

## Inputs

- Coverage target (default: 80% for business logic)
- Scope: full project or specific directories

## Process

### 1. Run Coverage Tool

Detect and run the appropriate coverage command:

```bash
# JavaScript/TypeScript (vitest)
npx vitest run --coverage

# JavaScript/TypeScript (jest)
npx jest --coverage

# Python
pytest --cov=src --cov-report=term-missing

# Go
go test ./... -coverprofile=coverage.out && go tool cover -func=coverage.out
```

### 2. Parse Coverage Report

Extract per-file coverage:

| File | Lines | Branches | Functions | Uncovered Lines |
|------|-------|----------|-----------|----------------|
| [path] | [%] | [%] | [%] | [line numbers] |

### 3. Identify Critical Gaps

Prioritize uncovered code by type:
1. **Business logic** (services, domain) — must be > 80%
2. **API handlers** — should be > 70%
3. **Utilities** — should be > 90%
4. **UI components** — should be > 60%

### 4. Suggest Tests

For each critical gap:

```markdown
## Coverage Gaps

| # | File | Current | Target | Uncovered Logic |
|---|------|---------|--------|----------------|
| 1 | [path] | [%] | [%] | [description of uncovered code] |

### Suggested Tests
- [test name] — covers [uncovered logic description]
```

### 5. Gate 3 Coverage Verdict

```markdown
## Coverage Status: [MEETS TARGET / BELOW TARGET]
- Business logic: [%] (target: 80%)
- Overall: [%]
- Files below target: [N]
```
