---
name: record-metrics
description: >
  Records metrics at end of sprint. Collects KPIs from all three systems,
  writes sprint archive, and updates velocity history. Use during sprint closure.
user-invocable: true
allowed-tools: Read, Grep, Glob, Bash, Write, AskUserQuestion
---

# Record Metrics

Collect and archive sprint metrics across all systems.

## Inputs

- Sprint number (auto-detect from sprint-current.md)
- Human input for subjective metrics

## Process

### 1. Collect PO Metrics

From backlog and sprint data:

| KPI | Value | Target | Health |
|-----|-------|--------|--------|
| AC Coverage | [%] stories with AC | 100% | [OK/WARN/CRIT] |
| Spec Clarity (Gate 1 first-pass) | [%] | > 80% | [OK/WARN/CRIT] |
| Backlog Health (DoR met) | [%] | > 60% | [OK/WARN/CRIT] |
| Story Rejection Rate | [%] | < 20% | [OK/WARN/CRIT] |
| Scope Change Rate | [%] | < 10% | [OK/WARN/CRIT] |

### 2. Collect Dev Metrics

From automated tools:

```bash
# Test coverage
npm test -- --coverage

# Lint errors
npm run lint 2>&1 | grep -c "error" || echo "0"

# PR sizes (from git log)
gh pr list --state merged --json additions,deletions
```

| KPI | Value | Target | Health |
|-----|-------|--------|--------|
| Test Coverage | [%] | > 80% | [OK/WARN/CRIT] |
| Lint Errors | [N] | 0 | [OK/WARN/CRIT] |
| Type Errors | [N] | 0 | [OK/WARN/CRIT] |
| Avg PR Size | [N] lines | < 300 | [OK/WARN/CRIT] |
| Regression Rate | [%] | < 5% | [OK/WARN/CRIT] |

### 3. Collect SM Metrics

From sprint data:

| KPI | Value | Target | Health |
|-----|-------|--------|--------|
| Velocity | [N] pts | stable ±20% | [OK/WARN/CRIT] |
| DoD Compliance | [%] | 100% | [OK/WARN/CRIT] |
| Sprint Completion | [%] | > 80% | [OK/WARN/CRIT] |
| Blocked Items | [%] | < 10% | [OK/WARN/CRIT] |

### 4. Write Sprint Archive

Save to `docs/framework/sprints/sprint-[N].md`:

```markdown
# Sprint [N] — [goal]

## Period: [start] → [end]

## Results
- Committed: [N] points
- Completed: [N] points
- Velocity: [N]
- Completion: [%]

## Stories
| Story | Points | Status | Gate |
|-------|--------|--------|------|

## Metrics
[All three metric tables from above]

## Health Summary
- Critical: [list or "none"]
- Warnings: [list or "none"]
- All green: [list]
```

### 5. Update Velocity

Append new row to `docs/framework/velocity.md` and recalculate average.

### 6. Alert on Critical Metrics

If any KPI is in CRIT state, flag to human with specific recommendations.
