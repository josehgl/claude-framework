---
name: write-tests
description: >
  Maps acceptance criteria scenarios to executable tests. Detects project test
  framework, writes tests following existing conventions, and confirms all tests
  fail (red state). Use when a story enters the sprint and needs tests.
user-invocable: true
allowed-tools: Read, Grep, Glob, Bash, Write, AskUserQuestion
---

# Write Tests

Create executable tests from acceptance criteria scenarios.

## Inputs

- Story with AC in Given/When/Then format (file path, GitHub issue, or pasted content)
- Project must have a test framework configured

## Process

### 1. Parse AC Scenarios

Read the story and extract every Given/When/Then scenario:

```markdown
| # | Scenario Name | Type |
|---|--------------|------|
| 1 | [name] | Happy path |
| 2 | [name] | Edge case |
| 3 | [name] | Error case |
```

If no AC found, stop and ask the human for the story.

### 2. Detect Test Framework

Scan the project for test configuration:

1. `Glob **/package.json` → check for vitest, jest, mocha
2. `Glob **/pyproject.toml **/setup.cfg **/pytest.ini` → check for pytest
3. `Glob **/go.mod` → Go testing
4. `Glob **/*.test.* **/*.spec.* **/test_* **/*_test.*` → find existing patterns

If no test framework detected, ask the human what to use.

### 3. Study Existing Tests

Find and read 2-3 existing test files to learn:
- Import patterns
- Describe/it grouping style
- Assertion library usage
- Mock/stub patterns
- File naming convention
- Directory structure (co-located vs separate)

### 4. Map AC to Tests

For each scenario, determine:

| AC Scenario | Test Name | Layer | File |
|------------|-----------|-------|------|
| [scenario] | should [behavior] when [condition] | unit/integration | [path] |

Rules:
- One test per AC scenario minimum
- Happy path → unit or integration
- Edge cases → unit (fast feedback)
- Error cases → unit with error assertions
- Cross-system flows → integration

### 5. Write Test Files

Write tests matching existing project conventions. Each test:
- Has arrange/act/assert structure
- Has a descriptive name: `should [expected] when [condition]`
- Is independent (no shared mutable state)
- Uses appropriate test doubles (stubs for data, mocks for side effects)
- Includes a comment linking to the AC scenario: `// AC: [scenario name]`

### 6. Verify Red State

Run the test suite:

```bash
npm test    # or pytest, go test ./..., etc.
```

Every new test MUST fail. If a test passes:
- Check if the feature already exists
- Check if the assertion is trivially true
- Fix or flag to the human

### 7. Output: Test Plan

Present the complete mapping:

```markdown
# Test Plan: [story title]

## AC-to-Test Mapping
| # | AC Scenario | Test | File:Line | Status |
|---|------------|------|-----------|--------|
| 1 | [name] | should [x] when [y] | [file:line] | RED |

## Red State Confirmation
- Command: `[test command]`
- New tests: [N] (all failing)
- Existing tests: [N] (all passing)

## Gate 2 Readiness: [READY / NOT READY]
```

Ask the human: "Are these tests covering everything you expect? Should I add any scenarios?"
