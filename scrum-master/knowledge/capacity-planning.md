# Capacity Planning — Reference

How to use velocity data for realistic sprint planning.

---

## Velocity-Based Planning

### Step 1: Calculate Average Velocity

Use the last 3-5 sprints (ignore outliers):

```
Average = sum(completed points) / number of sprints
```

### Step 2: Determine Sprint Capacity

- **Conservative** (< 3 sprints of data): use lowest velocity
- **Normal** (3-5 sprints): use average velocity
- **Confident** (5+ sprints, stable trend): use average ± 10%

### Step 3: Select Stories

Fill the sprint with stories from the top of the backlog until capacity is reached:
- Never exceed capacity by more than 10%
- Leave 10-20% buffer for unplanned work
- Prioritize completing fewer stories over starting many

---

## When to Adjust

| Signal | Action |
|--------|--------|
| Velocity trending up for 3+ sprints | Increase capacity slightly |
| Velocity trending down for 2+ sprints | Investigate root cause before adjusting |
| New team member | Reduce capacity 20% for 2 sprints (onboarding) |
| Major tech debt | Allocate 20% of capacity to remediation |
| First 3 sprints | Use conservative estimates, expect instability |

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Planning to 100% capacity | Always leave buffer (10-20%) |
| Using best-sprint velocity | Use average, not peak |
| Ignoring trend direction | A declining trend needs investigation |
| Committing to stretch goals | Stretch goals are not commitments |
| Planning based on ideal days | Use story points and historical velocity |

---

## Uncertainty Handling

When velocity data is insufficient:

1. **Sprint 1**: commit to 60% of what feels possible
2. **Sprint 2**: adjust based on Sprint 1 actual
3. **Sprint 3**: you now have enough data for an average
4. **Sprint 4+**: velocity-based planning is reliable

Early sprints should be smaller — it's better to finish early than to overcommit.
