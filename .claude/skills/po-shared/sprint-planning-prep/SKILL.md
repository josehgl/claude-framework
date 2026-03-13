---
name: sprint-planning-prep
description: >
  Prepares stories for sprint planning: verifies DoR compliance, suggests sprint
  scope based on velocity, and orders stories by priority. Use before sprint
  planning ceremonies.
user-invocable: true
allowed-tools: Read, Grep, Glob, AskUserQuestion
---

# Sprint Planning Prep

Prepare the backlog for sprint planning by validating readiness and suggesting scope.

## Process

### 1. Gather Context

Collect from the human or project docs:
- Sprint duration (default: 2 weeks)
- Team velocity (story points per sprint — ask if unknown)
- Current sprint number
- Any carry-over stories from previous sprint
- Blockers or dependencies to be aware of

### 2. Filter Ready Stories

From the backlog, select stories that meet Definition of Ready:
- [ ] AC in Given/When/Then
- [ ] Happy path + error scenarios
- [ ] Estimated in story points
- [ ] Parent epic identified
- [ ] No unresolved open questions

Stories that don't meet DoR go to a "Needs Work" list.

### 3. Suggest Sprint Scope

Based on velocity, propose a sprint:

```markdown
# Sprint [N] — Planning Proposal

## Velocity Reference
- Last sprint: [X] points completed
- Average (3 sprints): [Y] points
- Suggested capacity: [Z] points (average - 10% buffer)

## Proposed Stories (ordered by priority)

| # | Story | Epic | Points | Rationale |
|---|-------|------|--------|-----------|
| 1 | [story] | [epic] | [pts] | [why this priority] |
| 2 | [story] | [epic] | [pts] | [why this priority] |
| ... | | | | |

**Total: [N] points / [capacity] capacity**

## Carry-Over from Sprint [N-1]
- [story]: [reason it wasn't completed]

## Not Ready (needs work before next sprint)
- [story]: [what's missing]

## Risks
- [dependency or blocker to watch]
```

### 4. Priority Reasoning

When ordering stories, consider:
1. **Value**: does this solve a core job or a supporting one?
2. **Risk**: is there technical uncertainty? (front-load risky items)
3. **Dependencies**: does story B need story A first?
4. **Sprint goal**: do the top stories form a coherent sprint goal?

### 5. Present to Human

Show the proposal and ask:
- "Does this sprint scope look right?"
- "Should we swap any stories in/out?"
- "What's the sprint goal in one sentence?"

The human has final say on sprint content. Never commit to a sprint without approval.
