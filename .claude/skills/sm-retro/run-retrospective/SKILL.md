---
name: run-retrospective
description: >
  Facilitates a complete sprint retrospective. Presents metrics, reviews previous
  actions, facilitates Keep/Stop/Try, and captures new action items. Use at
  the end of each sprint.
user-invocable: true
allowed-tools: Read, Grep, Glob, Bash, Write, Edit, AskUserQuestion
---

# Run Retrospective

Facilitate a complete sprint retrospective.

## Inputs

- Sprint number (auto-detect from sprint-current.md)
- Sprint metrics (from sprint archive or current data)

## Process

### 1. Present Sprint Data

Read sprint metrics and present:

```markdown
## Sprint [N] Retrospective

### Sprint Results
- Goal: [goal]
- Velocity: [N] points (average: [N])
- Completion: [N]%
- Stories: [N] done / [N] committed
```

Highlight: what's notably better or worse than usual.

### 2. Review Previous Actions

If previous sprint archive exists, check action items:

```markdown
### Previous Retro Actions
| Action | Owner | Status | Impact |
|--------|-------|--------|--------|
| [action] | [who] | [done/dropped] | [observable result] |
```

Ask: "Any thoughts on these before we continue?"

### 3. Facilitate Keep/Stop/Try

Ask the human each question:

**Keep**: "What went well this sprint that we should continue doing?"
**Stop**: "What caused friction or didn't work?"
**Try**: "What one experiment should we run next sprint?"

Record responses.

### 4. Prioritize Experiments

If multiple "Try" items:
- Ask human to pick 1-2 (maximum)
- Each must have clear success criteria

### 5. Capture Action Items

For each experiment:

```markdown
### Action Items
| Action | Owner | Due | Success Criteria |
|--------|-------|-----|-----------------|
| [specific action] | [who] | Sprint [N+1] | [how to measure] |
```

### 6. Update Configuration (if needed)

If actions require config changes, propose them:
- "Should I adjust the coverage target from X to Y?"
- "Should I add a hook for [new rule]?"

Get explicit approval before changing anything.

### 7. Archive

Append retro results to the sprint archive file.

### 8. Output

```markdown
## Retrospective Complete

### Keep
- [item]

### Stop
- [item]

### Try
- [item]

### Action Items
[table from step 5]

### Config Changes
[list or "none"]

Saved to: docs/framework/sprints/sprint-[N].md
```
