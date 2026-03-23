---
name: validate-dod
description: >
  Validates Definition of Done for a specific story. Checks all DoD criteria
  from the methodology. Use during sprint review before accepting stories.
user-invocable: true
allowed-tools: Read, Grep, Glob, Bash, AskUserQuestion
---

# Validate DoD

Check if a story meets the Definition of Done.

## Inputs

- Story reference (title, file, or issue number)

## Process

### 1. Gather Evidence

For the story, check each DoD criterion:

```bash
# Tests pass
npm test

# Coverage
npm test -- --coverage

# Lint
npm run lint

# Type check
npx tsc --noEmit

# PR merged
gh pr list --state merged --search "[story title]"
```

### 2. DoD Checklist

| # | Criterion | Status | Evidence |
|---|-----------|--------|----------|
| 1 | All AC scenarios pass | [PASS/FAIL] | Test results |
| 2 | Code reviewed and approved | [PASS/FAIL] | PR review status |
| 3 | Test coverage >= 80% (business logic) | [PASS/FAIL] | Coverage report |
| 4 | Lint clean (0 errors) | [PASS/FAIL] | Lint output |
| 5 | Type check clean (0 errors) | [PASS/FAIL] | Typecheck output |
| 6 | PR merged to main | [PASS/FAIL] | PR status |
| 7 | No regressions introduced | [PASS/FAIL] | Full test suite |
| 8 | PO accepted in sprint review | [PASS/FAIL] | Human confirms |

### 3. Output

```markdown
## DoD Validation: [story title]

| # | Criterion | Status | Evidence |
|---|-----------|--------|----------|

**DoD: [MET / NOT MET]**

[If NOT MET: list failed criteria and required actions]
```

If DoD not met, story cannot be marked as complete.
