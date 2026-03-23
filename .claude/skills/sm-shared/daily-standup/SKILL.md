---
name: daily-standup
description: >
  Runs a quick structured daily standup. Reads sprint state, reports progress,
  identifies blockers, and plans the session. Use at the start of each work
  session.
user-invocable: true
allowed-tools: Read, Grep, Glob, AskUserQuestion
---

# Daily Standup

Quick sprint status check at session start.

## Inputs

- Current sprint data (`docs/framework/sprint-current.md`)

## Process

### 1. Read Sprint State

Read `docs/framework/sprint-current.md` and extract:
- Stories in progress
- Stories completed
- Stories pending
- Current burndown

### 2. Present Status

```markdown
## Standup: Sprint [N] — Day [N]/[N]

### Completed
- [story title] ([N] pts) ✓

### In Progress
- [story title] ([N] pts) — [current phase: test/implement/review]

### Pending
- [story title] ([N] pts)

### Burndown
- Completed: [N] / [N] points ([N]%)
- On track: [YES / AT RISK / BEHIND]
```

### 3. Check for Blockers

Ask the human:
- "Is anything blocking progress?"
- "Any concerns about the current stories?"

### 4. Plan Session

Ask:
- "What do you want to focus on today?"

Based on response, suggest the relevant skill:
- Starting a new story → `story-to-tests`
- Continuing implementation → `implement-feature`
- Bug fix needed → `fix-bug`
- Review needed → `review-code`
- PR ready → `create-pr`

### 5. Output

```markdown
## Session Plan
- Focus: [story or task]
- Next skill: [suggested skill]
- Sprint health: [on track / at risk]
```
