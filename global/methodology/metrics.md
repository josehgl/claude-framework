# Metrics & KPIs

Objective metrics that govern agent behavior and measure system health.
Metrics are collected in markdown (human-readable, git-tracked) and Supabase (queryable, dashboards).

---

## Product Owner Metrics

| KPI | Formula | Target | Frequency |
|-----|---------|--------|-----------|
| AC Coverage | Stories with AC / Total stories | 100% | Per sprint |
| Spec Clarity | Stories passing Gate 1 on first attempt / Total | > 80% | Per sprint |
| Backlog Health | Stories meeting DoR / Total backlog | > 60% | Weekly |
| Story Rejection Rate | Stories rejected in sprint review / Completed | < 20% | Per sprint |
| Scope Change Rate | Stories added/removed mid-sprint / Sprint scope | < 10% | Per sprint |

**PO health indicator:** If Spec Clarity drops below 60%, PO agents need recalibration.

---

## Scrum Master Metrics

| KPI | Formula | Target | Frequency |
|-----|---------|--------|-----------|
| Sprint Velocity | Story points completed / Sprint | Stable ±20% | Per sprint |
| DoD Compliance | Stories meeting full DoD / Completed stories | 100% | Per sprint |
| Cycle Time | Average time from "in progress" to "done" | Decreasing | Per sprint |
| Blocked Items | Stories blocked > 1 day / Active stories | < 10% | Daily |
| Sprint Completion | Completed / Planned story points | > 80% | Per sprint |
| Ceremony Completion | Ceremonies held / Ceremonies planned | 100% | Per sprint |

**SM health indicator:** If Sprint Completion is consistently below 70%, either estimation or capacity planning needs fixing.

---

## Development Metrics

| KPI | Formula | Target | Frequency |
|-----|---------|--------|-----------|
| Test Coverage | Lines covered / Total lines (business logic) | > 80% | Per PR |
| Lint Errors | Count of lint errors at PR time | 0 | Per PR |
| Type Errors | Count of type check errors at PR time | 0 | Per PR |
| PR Size | Lines changed per PR (excluding generated) | < 300 | Per PR |
| PR Merge Time | Time from PR open to merge | < 1 day | Per PR |
| Test Pass Rate | Tests passing / Total tests | 100% | Per PR |
| Regression Rate | Existing tests broken by new code / Total PRs | < 5% | Per sprint |
| Build Success Rate | Successful builds / Total builds | > 95% | Per sprint |

**Dev health indicator:** If Regression Rate exceeds 10%, code-reviewer agent needs stricter rules.

---

## Cross-System Metrics

| KPI | Formula | Target | Frequency |
|-----|---------|--------|-----------|
| Throughput | Stories delivered per sprint | Increasing | Per sprint |
| Lead Time | Time from story creation to done | Decreasing | Per sprint |
| Defect Rate | Bugs found post-merge / Stories delivered | < 10% | Per sprint |
| Rework Rate | Stories requiring rework / Stories delivered | < 15% | Per sprint |
| Gate Pass Rate | First-time gate passes / Total gate attempts | > 75% | Per sprint |

---

## Metric Collection

### Markdown (git-tracked, human-readable)

Location: `docs/metrics/` in each project

```
docs/metrics/
├── sprint-01.md          # Sprint summary with all KPIs
├── sprint-02.md
└── summary.md            # Running totals and trends
```

Sprint file format:
```markdown
# Sprint 1 — [dates]

## Product Owner
| KPI | Value | Target | Status |
|-----|-------|--------|--------|
| AC Coverage | 95% | 100% | WARN |
...

## Scrum Master
...

## Development
...

## Actions
- [Action from metrics review]
```

### Supabase (queryable, dashboards)

Tables:
- `framework_sprints` — sprint metadata
- `framework_metrics` — KPI values per sprint per system
- `framework_gate_logs` — every gate pass/fail with details
- `framework_agent_logs` — agent actions for traceability

Schema defined when Development system is built (Phase 3).

---

## Metric-Driven Decisions

### Automatic Actions (agent-triggered)

| Condition | Action |
|-----------|--------|
| Test coverage < 80% on PR | Block PR merge |
| Lint errors > 0 | Block PR merge |
| PR > 300 lines | Warn, suggest decomposition |
| Sprint velocity deviation > 30% | SM flags for retrospective |
| Gate fail rate > 30% | Flag system for review |

### Human Escalation

| Condition | Escalation |
|-----------|-----------|
| Story rejection rate > 30% | "PO specs may need review — want to adjust AC process?" |
| Sprint completion < 60% for 2 sprints | "Capacity or estimation may be off — want to recalibrate?" |
| Rework rate > 25% | "Quality issue detected — want to tighten quality gates?" |

Human decisions are captured and converted to rules when pattern repeats 3+ times.

---

## Benchmarks

Initial benchmarks are defined by human in the first sprint. After 3 sprints, benchmarks are recalibrated based on actual data. The framework never assumes — it measures.

**Setting a benchmark:**
1. Run first sprint with default targets
2. Measure actual performance
3. Human reviews and adjusts targets
4. New targets become the standard
5. Revisit every 3 sprints
