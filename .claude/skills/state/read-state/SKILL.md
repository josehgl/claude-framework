---
name: read-state
description: >
  Reads current framework state from project files. Returns sprint status,
  velocity, backlog summary, and configuration. Use at session start or when
  context is needed.
user-invocable: true
allowed-tools: Read, Grep, Glob
---

# Read State

Read and summarize the current framework state.

## Inputs

- Project root directory (default: current directory)

## Process

### 1. Check State Exists

Look for `docs/framework/config.md`. If not found, report that the framework is not initialized and suggest running `init-state`.

### 2. Read All State Files

Read in order:
1. `docs/framework/config.md` — project configuration
2. `docs/framework/sprint-current.md` — active sprint
3. `docs/framework/velocity.md` — velocity history
4. `docs/framework/backlog.md` — story backlog

### 3. Output: State Summary

```markdown
## Framework State

### Project: [name]
- Stack: [stack]
- Sprint length: [N] weeks
- Coverage target: [N]%

### Current Sprint: [N] — [goal]
- Period: [start] → [end]
- Committed: [N] points
- Completed: [N] points
- Remaining: [N] points
- Stories: [N] total ([N] done, [N] in-progress, [N] pending)

### Velocity
- Average: [N] points/sprint
- Last 3 sprints: [N], [N], [N]
- Trend: [improving / stable / declining]

### Backlog
- Total stories: [N]
- Ready (Gate 1 passed): [N]
- Draft: [N]
- Estimated: [N] points total

### Active Stories
| Story | Points | Status |
|-------|--------|--------|
| [title] | [N] | [status] |
```
