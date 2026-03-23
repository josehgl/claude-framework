---
name: story-to-tests
description: >
  Bridge between PO and Dev systems. Takes a PO-approved story (Gate 1 passed),
  validates it, extracts AC scenarios, and initiates the test-writing pipeline.
  Use to start development on a sprint-ready story.
user-invocable: true
allowed-tools: Read, Grep, Glob, Bash, Write, AskUserQuestion
---

# Story to Tests

Bridge PO output to Dev input: validate a story and start the test pipeline.

## Inputs

- Story source: file path, GitHub issue number, or pasted content
- Project must have test framework configured

## Process

### 1. Read the Story

Locate and read the story:
- File: `Read [path]`
- GitHub issue: `gh issue view [number]`
- Pasted: use content directly

### 2. Validate Gate 1 (Spec Ready)

Check every Gate 1 criterion:

| # | Criterion | Status |
|---|-----------|--------|
| 1 | AC in Given/When/Then format | [YES/NO] |
| 2 | Happy path scenario exists | [YES/NO] |
| 3 | At least 1 error/edge case scenario | [YES/NO] |
| 4 | No ambiguous terms | [YES/NO] |
| 5 | Each scenario independently testable | [YES/NO] |
| 6 | Story estimated | [YES/NO] |

If ANY criterion fails:
- Report which criteria failed
- Suggest routing back to PO (critique-spec)
- Ask the human if they want to proceed anyway or fix first

### 3. Extract AC Scenarios

Parse all Given/When/Then scenarios into a structured list:

```markdown
## Extracted Scenarios

| # | Name | Type | Given | When | Then |
|---|------|------|-------|------|------|
| 1 | [name] | Happy path | [context] | [action] | [outcome] |
| 2 | [name] | Edge case | [context] | [action] | [outcome] |
```

### 4. Initiate Test Writing

Pass the extracted scenarios to the write-tests process:

1. Detect project test framework
2. Map each scenario to test(s)
3. Write test files
4. Verify red state
5. Produce test plan

### 5. Output: Pipeline Status

```markdown
# Dev Pipeline: [story title]

## Gate 1 Validation: [PASS / FAIL]
[Gate 1 checklist]

## AC Scenarios Extracted: [N]
- Happy path: [N]
- Edge cases: [N]
- Error cases: [N]

## Tests Written: [N]
## Red State: [CONFIRMED / ISSUE]

## Gate 2 Readiness: [READY / NOT READY]
[If not ready, explain what's missing]

## Next Step
- Gate 2 READY → proceed to implementation (implement-feature)
- Gate 2 NOT READY → [specific action needed]
```
