---
name: fix-bug
description: >
  Bug fix pipeline: write a reproducing test first, then fix with minimum code.
  Ensures the bug is caught by the test suite going forward. Use for any bug
  report or regression.
user-invocable: true
allowed-tools: Read, Grep, Glob, Bash, Write, Edit, AskUserQuestion
---

# Fix Bug

Fix a bug using the TDD approach: reproduce first, then fix.

## Inputs

- Bug description (issue link, error message, or human description)
- Reproduction steps (if available)

## Process

### 1. Understand the Bug

Gather information:
- What is the expected behavior?
- What is the actual behavior?
- Under what conditions does it occur?
- Can the human reproduce it consistently?

If unclear, ask the human for more details.

### 2. Locate the Code

Find the relevant code:
1. `Grep` for error messages, function names, or keywords from the bug report
2. Read the identified files to understand the current behavior
3. Form a hypothesis about the root cause

### 3. Write Reproducing Test

Write a test that demonstrates the bug:

```
1. Set up the conditions described in the bug report
2. Perform the action that triggers the bug
3. Assert the EXPECTED (correct) behavior
4. Run the test — it MUST FAIL (proving the bug exists)
```

If the test passes, either:
- The bug has already been fixed
- The test doesn't reproduce the exact condition (revise it)

### 4. Fix the Bug

Write the minimum code change to make the test pass:

```
1. Modify only what's necessary to fix the root cause
2. Run the reproducing test → must pass (green)
3. Run the FULL test suite → no regressions
```

### 5. Verify No Regressions

```bash
npm test    # Full test suite must pass
npm run lint
npx tsc --noEmit
```

### 6. Output: Bug Fix Summary

```markdown
# Bug Fix: [brief description]

## Root Cause
[What was wrong and why it caused the bug]

## Reproducing Test
- File: [test file path]
- Test: [test name]

## Fix Applied
| File | Change |
|------|--------|
| [path] | [what was changed] |

## Regression Check
- Full test suite: [N] passed, 0 failed
- Lint: CLEAN
- Type check: CLEAN

## Ready for: Code Review
```
