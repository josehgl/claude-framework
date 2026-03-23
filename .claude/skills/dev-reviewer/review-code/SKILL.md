---
name: review-code
description: >
  Structured code review producing an actionable report with PASS/NEEDS WORK/FAIL
  verdict. Validates Gate 3 criteria. Use after implementation is complete and
  tests pass.
user-invocable: true
allowed-tools: Read, Grep, Glob, Bash, AskUserQuestion
---

# Review Code

Produce a structured code review with Gate 3 validation.

## Inputs

- Files to review (changed files from implementation, or specific file list)
- Story reference (for context on expected behavior)

## Process

### 1. Identify Scope

Determine what was changed:
- If a PR exists: `gh pr diff`
- If no PR: `git diff main` or compare against previous state
- List all changed files

### 2. Run Automated Checks

```bash
# Tests
npm test    # or pytest, go test

# Lint
npm run lint

# Type check
npx tsc --noEmit

# Coverage
npm test -- --coverage
```

Record all results before manual review.

### 3. Manual Review

For each changed file, check against @development/knowledge/code-review-checklist.md:

**Security** (critical):
- No hardcoded secrets
- No injection vulnerabilities
- Input validation at boundaries
- Auth/authz checks present

**Performance**:
- No N+1 queries
- Async where appropriate
- No unnecessary computation

**Maintainability**:
- Functions < 20 lines
- Clear naming
- No magic numbers
- No dead code

**Test Quality**:
- Meaningful assertions
- Behavior-focused tests
- Edge cases covered

### 4. Gate 3 Validation

```markdown
## Gate 3: Code Ready

| # | Criterion | Status | Evidence |
|---|-----------|--------|----------|
| 1 | All tests pass | [PASS/FAIL] | [N] passed, [N] failed |
| 2 | Lint clean | [PASS/FAIL] | [N] errors, [N] warnings |
| 3 | Type check clean | [PASS/FAIL] | [N] errors |
| 4 | Coverage >= target | [PASS/FAIL] | [N]% (target: [N]%) |
| 5 | No TODOs without issue | [PASS/FAIL] | [grep results] |
| 6 | No hardcoded secrets | [PASS/FAIL] | [scan results] |

**Gate 3: [PASS / FAIL]**
```

### 5. Output: Review Report

```markdown
# Code Review: [story title]

## Verdict: [PASS / NEEDS WORK / FAIL]

## Automated Checks
| Check | Status | Detail |
|-------|--------|--------|
| Tests | [PASS/FAIL] | [N] passed, [N] failed |
| Lint | [PASS/FAIL] | [N] errors |
| Type Check | [PASS/FAIL] | [N] errors |
| Coverage | [N]% | Target: [N]% |

## Issues Found

### Critical (must fix)
| # | File:Line | Issue | Fix |
|---|-----------|-------|-----|

### Improvement (should fix)
| # | File:Line | Issue | Fix |
|---|-----------|-------|-----|

### Nitpick (optional)
| # | File:Line | Issue | Fix |
|---|-----------|-------|-----|

## Positive Highlights
- [What was done well]

## Gate 3: [PASS / FAIL]

## Next Step
- PASS → create-pr
- NEEDS WORK → Implementer addresses critical + improvement issues
- FAIL → route to Architect for redesign
```
