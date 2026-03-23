---
name: status
description: >
  Quick dashboard showing current sprint, active stories, recent gate results,
  and framework health. Use when starting a session, checking progress, or
  needing context about where the project stands.
user-invocable: true
allowed-tools: Read, Glob, Grep, Bash
---

# /status — Framework Status Dashboard

## Inputs

No inputs required. Reads state from framework files automatically.

## Process

### 1. Read Sprint State

Check if state files exist:
```
docs/framework/sprint-current.md
docs/framework/backlog.md
docs/framework/velocity.md
```

If no state files exist, report: "Framework not initialized. Run `/init-state` first."

### 2. Extract Current Sprint

From `sprint-current.md`:
- Sprint number and dates
- Sprint goal
- Stories: list with status (todo/in-progress/done)
- Points committed vs completed

### 3. Check Recent Gate Activity

Search for recent gate validation results:
```bash
# Find recent gate logs in docs/framework/
grep -r "Gate.*PASS\|Gate.*FAIL" docs/framework/ --include="*.md" -l
```

### 4. Quick Health Metrics

If velocity data exists:
- Current velocity vs average
- Completion rate trend
- Any anomalies flagged

### 5. Produce Dashboard

```markdown
# 📊 Framework Status

## Sprint [N]: [goal]
📅 [start] → [end] | Day [X] of [Y]

### Stories
| # | Story | Points | Status | Gate |
|---|-------|--------|--------|------|
| 1 | [title] | [pts] | 🔴 Todo | — |
| 2 | [title] | [pts] | 🟡 In Progress | Gate 2 ✅ |
| 3 | [title] | [pts] | 🟢 Done | Gate 4 ✅ |

### Progress
- Committed: [N] pts | Completed: [N] pts | Remaining: [N] pts
- Velocity (avg): [N] pts/sprint

### Health
- [✅/⚠️/🔴] Velocity: [status]
- [✅/⚠️/🔴] Completion rate: [N]%
- [✅/⚠️/🔴] Blocked items: [N]

### Next Action
[What should happen next based on current state]
```

## Output

A concise, scannable dashboard that gives full context in 10 seconds. If state files are missing or incomplete, clearly indicate what's missing rather than guessing.
