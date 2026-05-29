---
name: plan-sprint
description: >
  Facilitates sprint planning. Reads velocity, proposes scope from backlog,
  validates DoR, and records the sprint plan. Use at the start of each sprint.
user-invocable: true
allowed-tools: Read, Grep, Glob, Bash, Write, Edit, AskUserQuestion
requires:
  - artifact: "docs/product-owner/discovery/user-stories.md"
    reason: "Cannot plan a sprint without stories"
  - artifact: "docs/product-owner/discovery/gate1-validation.md"
    reason: "Stories must pass Gate 1 before entering a sprint"
---

# Plan Sprint

Facilitate data-driven sprint planning.

## Inputs

- Backlog with prioritized stories (`docs/framework/backlog.md`)
- Velocity history (`docs/framework/velocity.md`)

## Process

### 1. Read Velocity

Read `docs/framework/velocity.md` and calculate:
- Average velocity (last 3-5 sprints)
- Trend (improving / stable / declining)
- Recommended capacity (average - 10% buffer)

If < 3 sprints of data, use conservative estimate.

### 2. Review Backlog

Read `docs/framework/backlog.md`, filter for stories with status `ready`:
- Sorted by priority (top = highest)
- Show estimates

### 3. Validate DoR

For each candidate story, check:

| Criterion | Status |
|-----------|--------|
| User story written | [YES/NO] |
| AC in Given/When/Then | [YES/NO] |
| Estimated in story points | [YES/NO] |
| Dependencies identified | [YES/NO] |
| PO approved | [YES/NO] |

Stories failing DoR cannot enter the sprint.

### 4. Propose Scope

Select stories from top of backlog until capacity reached:

```markdown
## Proposed Sprint [N]

**Goal**: [ask human]
**Capacity**: [N] points (average velocity: [N], buffer: 10%)

| # | Story | Points | DoR |
|---|-------|--------|-----|
| 1 | [title] | [N] | PASS |
| 2 | [title] | [N] | PASS |
| Total | | [N] | |

**Utilization**: [N]% of capacity
```

### 5. Human Approval

Ask:
- "Does this sprint goal capture what matters most?"
- "Should we add, remove, or reorder any stories?"
- "Any concerns about this scope?"

### 6. Record Sprint

Write approved plan to `docs/framework/sprint-current.md`.
Update backlog story statuses to `in-progress`.
