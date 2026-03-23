---
name: update-sprint
description: >
  Updates sprint state: start/complete stories, close/start sprints. Maintains
  sprint-current.md and velocity.md. Use during sprint execution.
user-invocable: true
allowed-tools: Read, Grep, Glob, Write, Edit, AskUserQuestion
---

# Update Sprint

Modify sprint state based on development progress.

## Inputs

- Action: `start-story`, `complete-story`, `close-sprint`, `start-sprint`
- Story reference (for story actions)
- Sprint number (for sprint actions)

## Process

### Action: start-story

1. Read `docs/framework/sprint-current.md`
2. Find the story in the sprint table
3. Change status from `pending` to `in-progress`
4. Save the file

### Action: complete-story

1. Read `docs/framework/sprint-current.md`
2. Find the story in the sprint table
3. Change status to `done`
4. Update burndown (completed += story points, remaining -= story points)
5. Save the file
6. Also update `docs/framework/backlog.md` status to `done`

### Action: close-sprint

1. Read `docs/framework/sprint-current.md`
2. Calculate final metrics:
   - Committed points
   - Completed points
   - Velocity (completed / committed * 100)
   - Stories done vs total
3. Archive: copy to `docs/framework/sprints/sprint-[N].md`
4. Update `docs/framework/velocity.md` with new data row
5. Recalculate average velocity
6. Report sprint summary to human

### Action: start-sprint

1. Ask human for:
   - Sprint goal
   - Sprint number (auto-increment from velocity.md)
   - Start/end dates
2. Read `docs/framework/backlog.md` for ready stories
3. Suggest stories based on velocity and priority
4. Human approves sprint scope
5. Write new `docs/framework/sprint-current.md`
6. Update backlog stories status to `in-progress`

## Output

```markdown
## Sprint Update: [action]

[Action-specific summary]

### Current Sprint Status
- Sprint: [N]
- Stories: [N] done / [N] total
- Points: [N] completed / [N] committed
```
