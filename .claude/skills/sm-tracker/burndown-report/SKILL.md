---
name: burndown-report
description: >
  Produces a burndown report for the current sprint. Shows completed vs remaining
  points and projects completion likelihood. Use mid-sprint for tracking.
user-invocable: true
allowed-tools: Read, Grep, Glob, AskUserQuestion
---

# Burndown Report

Show sprint progress and project completion.

## Inputs

- Current sprint data (`docs/framework/sprint-current.md`)

## Process

### 1. Read Sprint Data

Extract from sprint-current.md:
- Total committed points
- Completed points per story
- Sprint start and end dates
- Days elapsed vs remaining

### 2. Calculate Burndown

```
Ideal burndown: committed_points * (remaining_days / total_days)
Actual remaining: committed_points - completed_points
Variance: actual_remaining - ideal_remaining
```

### 3. Output

```markdown
## Burndown: Sprint [N]

### Progress
- Committed: [N] points
- Completed: [N] points ([N]%)
- Remaining: [N] points
- Days elapsed: [N] / [N]

### Trajectory
- Ideal remaining: [N] points
- Actual remaining: [N] points
- Variance: [+/-N] points ([ahead/behind] schedule)

### Stories
| Story | Points | Status |
|-------|--------|--------|
| [title] | [N] | [done/in-progress/pending] |

### Assessment
[ON TRACK / AT RISK / BEHIND]
[Brief explanation of why]
```
