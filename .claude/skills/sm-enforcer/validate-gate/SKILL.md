---
name: validate-gate
description: >
  Validates any quality gate (1-4) with full criteria check. Runs automated
  checks for objective criteria, flags subjective ones for human review.
  Use when work reaches a gate boundary.
user-invocable: true
allowed-tools: Read, Grep, Glob, Bash, AskUserQuestion
---

# Validate Gate

Run a full quality gate validation.

## Inputs

- Gate number (1, 2, 3, or 4)
- Story or PR reference

## Process

### Gate 1: Spec Ready

| # | Criterion | Type | Check |
|---|-----------|------|-------|
| 1 | AC in Given/When/Then | Objective | Parse story for format |
| 2 | Happy path exists | Objective | Count non-error scenarios |
| 3 | Error/edge case exists | Objective | Count error scenarios |
| 4 | No ambiguous terms | Subjective | Human review |
| 5 | Each scenario testable | Objective | Each has When + Then |
| 6 | Story estimated | Objective | Points present |
| 7 | PO approved | Subjective | Human confirms |

### Gate 2: Tests Ready

| # | Criterion | Type | Check |
|---|-----------|------|-------|
| 1 | Every AC has test(s) | Objective | Count mapping |
| 2 | All tests fail (red) | Objective | Run tests, exit ≠ 0 |
| 3 | Test names behavioral | Objective | Match `should...when` |
| 4 | Tests independent | Subjective | Review for shared state |
| 5 | Coverage target defined | Objective | Config check |

### Gate 3: Code Ready

| # | Criterion | Type | Check |
|---|-----------|------|-------|
| 1 | All tests pass | Objective | `npm test` exit = 0 |
| 2 | Lint clean | Objective | `npm run lint` |
| 3 | Type check clean | Objective | `npx tsc --noEmit` |
| 4 | Coverage >= target | Objective | Coverage report |
| 5 | No TODOs without issue | Objective | `grep TODO` |
| 6 | No hardcoded secrets | Objective | Pattern scan |

### Gate 4: PR Ready

| # | Criterion | Type | Check |
|---|-----------|------|-------|
| 1 | CI passes | Objective | `gh pr checks` |
| 2 | PR < 300 lines | Objective | `gh pr diff --stat` |
| 3 | Conventional commit title | Objective | Parse title |
| 4 | PR body complete | Subjective | Human review |
| 5 | Branch up to date | Objective | `git status` |
| 6 | Review approval | Subjective | Human approves |

## Output

```markdown
## Gate [N] Validation: [story/PR title]

| # | Criterion | Status | Evidence |
|---|-----------|--------|----------|

**Result: [PASS / FAIL / PENDING HUMAN REVIEW]**

[Routing instructions if FAIL]
```
