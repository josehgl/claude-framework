---
name: supabase-log-sprint
description: >
  Records sprint metrics to Supabase after a sprint ends. Collects KPIs from
  all systems, calculates health indicators, and logs them for trend analysis.
  Use at the end of each sprint or during retrospective.
user-invocable: true
allowed-tools: Read, Grep, Glob, Bash, AskUserQuestion
---

# Log Sprint Metrics to Supabase

Record sprint KPIs to Supabase for tracking and trend analysis.

## Inputs

- Sprint number
- Supabase project ID
- Sprint dates (start, end)
- Sprint goal
- Metrics from each system (collect from human or project docs)

## Process

### 1. Gather Sprint Data

Ask the human for each category. Use existing data where possible (GitHub Issues, PR stats, etc.).

**Sprint metadata:**
- Sprint number, start date, end date
- Sprint goal (one sentence)
- Planned story points, completed story points

**Product Owner metrics:**

| KPI | How to Measure |
|-----|---------------|
| AC Coverage | Count Issues with AC / Total story Issues |
| Spec Clarity | Stories passing Gate 1 first try / Total |
| Backlog Health | Issues meeting DoR / Total backlog |
| Story Rejection Rate | Stories rejected / Completed |
| Scope Change Rate | Stories added or removed mid-sprint / Sprint scope |

**Scrum Master metrics:**

| KPI | How to Measure |
|-----|---------------|
| Velocity | Completed story points |
| DoD Compliance | Stories meeting full DoD / Completed |
| Cycle Time | Average days from in-progress to done |
| Blocked Items | Stories blocked > 1 day / Active |
| Sprint Completion | Completed / Planned points |

**Development metrics:**

| KPI | How to Measure |
|-----|---------------|
| Test Coverage | From CI reports |
| PR Size (avg) | From GitHub PR stats |
| PR Merge Time (avg) | From GitHub PR stats |
| Regression Rate | Broken tests from new code / Total PRs |
| Build Success Rate | Successful builds / Total |

### 2. Calculate Health Status

For each metric, determine status:
- **ok**: meets or exceeds target
- **warn**: within 20% of target
- **fail**: more than 20% below target

### 3. Insert Sprint Record

Using Supabase MCP `execute_sql`:

```sql
INSERT INTO framework_sprints (sprint_number, goal, start_date, end_date, planned_points, completed_points, velocity, status)
VALUES ([N], '[goal]', '[start]', '[end]', [planned], [completed], [velocity], 'completed')
RETURNING id;
```

### 4. Insert Metrics

For each KPI collected:

```sql
INSERT INTO framework_metrics (sprint_id, system, kpi_name, kpi_value, target_value, status)
VALUES
  ([sprint_id], 'po', 'ac_coverage', [value], 100, '[status]'),
  ([sprint_id], 'po', 'spec_clarity', [value], 80, '[status]'),
  -- ... all metrics
;
```

### 5. Generate Sprint Report

Produce a markdown summary AND store in Supabase:

```markdown
# Sprint [N] Report — [start] to [end]

## Goal: [sprint goal]
**Result**: [achieved / partially achieved / not achieved]

## Velocity
- Planned: [N] pts | Completed: [N] pts | Completion: [%]
- Previous sprint: [N] pts | Trend: [up/down/stable]

## Product Owner
| KPI | Value | Target | Status |
|-----|-------|--------|--------|
| AC Coverage | [%] | 100% | [OK/WARN/FAIL] |
| Spec Clarity | [%] | 80% | [OK/WARN/FAIL] |
| Backlog Health | [%] | 60% | [OK/WARN/FAIL] |

## Scrum Master
| KPI | Value | Target | Status |
|-----|-------|--------|--------|
| DoD Compliance | [%] | 100% | [OK/WARN/FAIL] |
| Sprint Completion | [%] | 80% | [OK/WARN/FAIL] |
| Avg Cycle Time | [days] | decreasing | [OK/WARN/FAIL] |

## Development
| KPI | Value | Target | Status |
|-----|-------|--------|--------|
| Test Coverage | [%] | 80% | [OK/WARN/FAIL] |
| Avg PR Size | [lines] | <300 | [OK/WARN/FAIL] |
| Regression Rate | [%] | <5% | [OK/WARN/FAIL] |

## Health Indicators
- PO: [healthy / needs attention / critical]
- SM: [healthy / needs attention / critical]
- Dev: [healthy / needs attention / critical]

## Actions
- [Action items identified from metrics]
```

### 6. Alert on Health Issues

If any system shows critical health:
- PO: Spec Clarity < 60% → "PO agents may need recalibration"
- SM: Sprint Completion < 60% for 2+ sprints → "Estimation or capacity issue"
- Dev: Regression Rate > 10% → "Code review needs stricter rules"

Ask the human: "These health issues were flagged. Want to address any in the next sprint?"
