---
name: implement-feature
description: >
  TDD implementation cycle: takes failing tests and produces minimum code to pass
  them, then refactors. Use after Gate 2 passes and tests are in red state.
  Follows strict Red-Green-Refactor discipline.
user-invocable: true
allowed-tools: Read, Grep, Glob, Bash, Write, Edit, AskUserQuestion
---

# Implement Feature

Execute the Green and Refactor phases of TDD.

## Inputs

- Failing test files (from write-tests)
- Story reference (for context)
- Architecture guidance (from Architect, if any)

## Process

### 1. Understand Tests

Read ALL failing tests before writing any code:

1. List every failing test and what it expects
2. Identify which modules/files need to be created or modified
3. Check for existing code that can be reused (`Grep`, `Glob`)
4. Determine implementation order (simplest test first)

### 2. Green Phase — One Test at a Time

For each failing test, from simplest to most complex:

```
1. Read the test assertion
2. Write the MINIMUM code to pass it
3. Run the full test suite: `npm test` / `pytest` / `go test`
4. Verify: target test passes, no other tests broke
5. Move to next failing test
```

**Rules:**
- Hard-coded values are acceptable if only one test exists for that case
- Never write code that no test exercises
- Never implement multiple tests at once
- If a passing test breaks, fix it before continuing

### 3. Refactor Phase — Green to Green

Once all tests pass, improve the code:

1. **DRY**: Extract duplicated logic into shared functions
2. **Names**: Rename for clarity — could a stranger understand this?
3. **Decompose**: Break functions > 20 lines into smaller ones
4. **Constants**: Replace magic numbers with named constants
5. **Simplify**: Remove unnecessary complexity

After EACH refactoring step:
```bash
npm test    # Must still pass
```

If any test fails → undo immediately.

### 4. Final Verification

```bash
# Full test suite
npm test

# Lint
npm run lint

# Type check
npx tsc --noEmit
```

### 5. Output: Implementation Summary

```markdown
# Implementation: [story title]

## Files Changed
| File | Action | Lines |
|------|--------|-------|
| [path] | Created / Modified | +[N] -[N] |

## Test Results
- Total: [N] | Passed: [N] | Failed: 0
- Coverage: [N]%

## Lint: [CLEAN / N issues]
## Type Check: [CLEAN / N errors]

## Refactoring Applied
1. [what and why]
2. [what and why]

## Ready for: Code Review
```
