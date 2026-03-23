---
name: init-state
description: >
  Initializes the framework state directory in a project. Creates sprint tracking,
  backlog, velocity history, and configuration files. Use during framework
  installation or to reset project state.
user-invocable: true
allowed-tools: Read, Grep, Glob, Bash, Write, AskUserQuestion
---

# Initialize State

Set up the framework state directory for a project.

## Inputs

- Project root directory
- Stack profile (from detect-stack, or ask human)
- Sprint length preference (default: 2 weeks)
- Coverage target (default: 80%)

## Process

### 1. Check Existing State

Look for `docs/framework/config.md`:
- If exists: warn human that re-initializing will reset state
- If not: proceed

### 2. Create Directory Structure

```
docs/
└── framework/
    ├── config.md           ← project configuration
    ├── backlog.md          ← story backlog
    ├── sprint-current.md   ← active sprint
    ├── velocity.md         ← velocity history
    └── sprints/            ← archived sprint records
```

### 3. Write config.md

```markdown
# Framework Configuration

## Project
- **Name**: [project name]
- **Stack**: [from detect-stack]
- **Repository**: [from git remote]

## Sprint Settings
- **Length**: [N] weeks
- **Points scale**: Fibonacci (1, 2, 3, 5, 8, 13)

## Quality Targets
- **Test coverage (business logic)**: [N]%
- **Lint errors**: 0
- **Type errors**: 0
- **PR size limit**: 300 lines

## Commands
- **Test**: [detected command]
- **Lint**: [detected command]
- **Type check**: [detected command]
- **Build**: [detected command]

## Initialized
- **Date**: [today]
- **Framework version**: 1.0.0
```

### 4. Write backlog.md

```markdown
# Backlog

Stories ordered by priority. Top = highest priority.

| # | Story | Points | Status | Gate 1 | Sprint |
|---|-------|--------|--------|--------|--------|

## Legend
- Status: draft | ready | in-progress | done | rejected
- Gate 1: pending | passed | failed
```

### 5. Write sprint-current.md

```markdown
# Sprint 0 — Setup

## Goal
Project initialization and framework setup.

## Period
[start date] → [end date]

## Stories

| # | Story | Points | Status | Assignee |
|---|-------|--------|--------|----------|

## Burndown
- Committed: 0 points
- Completed: 0 points
- Remaining: 0 points

## Notes
Initial sprint. Framework installed.
```

### 6. Write velocity.md

```markdown
# Velocity History

| Sprint | Committed | Completed | Velocity | Notes |
|--------|-----------|-----------|----------|-------|
| 0 | 0 | 0 | 0 | Setup sprint |

## Average Velocity: 0
## Trend: N/A (insufficient data)
```

### 7. Output

```markdown
## State Initialized

- Config: docs/framework/config.md
- Backlog: docs/framework/backlog.md
- Sprint: docs/framework/sprint-current.md (Sprint 0)
- Velocity: docs/framework/velocity.md

Framework state is ready. Use `read-state` to view current state.
```
