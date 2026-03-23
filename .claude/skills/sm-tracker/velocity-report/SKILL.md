---
name: velocity-report
description: >
  Produces a velocity trend report across sprints. Shows trend, deviation, and
  forecast. Use for capacity planning and health monitoring.
user-invocable: true
allowed-tools: Read, Grep, Glob, AskUserQuestion
---

# Velocity Report

Analyze velocity trends and forecast capacity.

## Inputs

- Velocity history (`docs/framework/velocity.md`)

## Process

### 1. Read History

Parse all sprint velocity data.

### 2. Calculate Trends

- Average velocity (all sprints)
- Average velocity (last 3 sprints)
- Trend: improving / stable / declining
- Standard deviation
- Variance from average (current sprint)

### 3. Output

```markdown
## Velocity Report

### History
| Sprint | Committed | Completed | Velocity | Deviation |
|--------|-----------|-----------|----------|-----------|
| [N] | [N] | [N] | [N] | [+/-N]% from avg |

### Summary
- Average velocity (all): [N] points
- Average velocity (last 3): [N] points
- Trend: [improving / stable / declining]
- Stability: [stable / unstable] (±[N]% deviation)

### Forecast
- Next sprint capacity (conservative): [N] points
- Next sprint capacity (normal): [N] points

### Health
- Velocity within ±20% target: [YES/NO]
- Trend direction: [good/concerning]
- Recommendation: [any adjustments needed]
```
