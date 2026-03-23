---
name: close-sprint
description: >
  Closes a sprint: validates DoD for completed stories, archives sprint data,
  updates velocity, and prepares for next sprint. Use at the end of each sprint.
user-invocable: true
allowed-tools: Read, Grep, Glob, Bash, Write, Edit, AskUserQuestion
---

# Close Sprint

Close the current sprint and archive results.

## Inputs

- Current sprint data (`docs/framework/sprint-current.md`)

## Process

### 1. Validate DoD for Completed Stories

For each story marked as `done`:

| Criterion | Status |
|-----------|--------|
| All AC pass (tests green) | [YES/NO] |
| Code reviewed and approved | [YES/NO] |
| Test coverage >= target | [YES/NO] |
| Lint clean | [YES/NO] |
| Type check clean | [YES/NO] |
| PR merged to main | [YES/NO] |
| No regressions | [YES/NO] |
| PO accepted | [YES/NO] |

Stories failing DoD revert to `in-progress` and return to backlog.

### 2. Calculate Sprint Metrics

```markdown
## Sprint [N] Results

- Committed: [N] points ([N] stories)
- Completed: [N] points ([N] stories)
- Velocity: [N]
- Completion rate: [N]%
- Carry-over: [N] stories ([N] points)
```

### 3. Archive Sprint

Copy sprint data to `docs/framework/sprints/sprint-[N].md` with full metrics.

### 4. Update Velocity

Add new row to `docs/framework/velocity.md`.
Recalculate average velocity.

### 5. Update Backlog

- Completed stories → status `done`
- Carry-over stories → status `ready` (back to backlog top)

### 6. Present Summary

```markdown
## Sprint [N] Closed

### Highlights
- [Top achievement]
- [Notable metric]

### Carry-over
| Story | Points | Reason |
|-------|--------|--------|

### Velocity Trend
[Last 3 sprints comparison]

### Next: Sprint Planning or Retrospective?
```
