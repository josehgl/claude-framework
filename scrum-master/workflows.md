# Scrum Master Workflows

How the 4 SM agents collaborate to enforce process and drive improvement.

---

## Workflow 1: Sprint Lifecycle

The complete sprint from planning to retrospective.

```
┌─────────────────────────────────────────────────────────────────┐
│  SPRINT PLANNING                                                │
│  Agent: Sprint Planner                                          │
│  Skills: plan-sprint                                            │
│                                                                 │
│  1. Read velocity history                                       │
│  2. Read backlog (PO-prioritized)                               │
│  3. Validate DoR for candidate stories                          │
│  4. Propose sprint scope based on velocity                      │
│  5. Human approves sprint goal and scope                        │
│  6. Record sprint plan in state                                 │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  SPRINT EXECUTION                                               │
│  Agent: Gate Enforcer + Velocity Tracker                        │
│  Skills: validate-gate, daily-standup, burndown-report          │
│                                                                 │
│  Daily:                                                         │
│  1. Daily standup (progress, blockers, plan)                    │
│  2. Gate validation on demand (as work moves through pipeline)  │
│  3. Burndown tracking                                           │
│  4. Impediment resolution                                       │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  SPRINT REVIEW                                                  │
│  Agent: Gate Enforcer                                           │
│  Skills: validate-dod                                           │
│                                                                 │
│  1. Validate DoD for each completed story                       │
│  2. Human demos completed work                                  │
│  3. PO accepts or rejects stories                               │
│  4. Record results                                              │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  SPRINT RETROSPECTIVE                                           │
│  Agent: Retro Facilitator                                       │
│  Skills: run-retrospective                                      │
│                                                                 │
│  1. Present sprint metrics                                      │
│  2. Facilitate Keep/Stop/Try discussion                         │
│  3. Capture action items                                        │
│  4. Review previous retro actions                               │
│  5. Update framework config if needed                           │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  SPRINT CLOSURE                                                 │
│  Agent: Sprint Planner + Velocity Tracker                       │
│  Skills: close-sprint, record-metrics, velocity-report          │
│                                                                 │
│  1. Archive sprint data                                         │
│  2. Record all metrics                                          │
│  3. Update velocity history                                     │
│  4. Start next sprint planning                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Workflow 2: Gate Enforcement

On-demand validation of any quality gate.

```
  Work reaches a gate boundary
        │
        ▼
  GATE ENFORCER (validate-gate skill)
  ├── Determine which gate (1, 2, 3, or 4)
  ├── Run all objective criteria (automated checks)
  ├── Flag subjective criteria for human review
  ├── Produce gate validation report
  │
  ├── PASS → work moves to next phase
  ├── FAIL → route back to responsible system:
  │   ├── Gate 1 fail → PO system
  │   ├── Gate 2 fail → Test Writer
  │   ├── Gate 3 fail → Implementer
  │   └── Gate 4 fail → Dev system (PR fixes)
  └── Report gate result
```

---

## Workflow 3: Impediment Resolution

When work is blocked.

```
  Blocked item identified (standup or ad-hoc)
        │
        ▼
  Classify impediment:
  ├── Technical blocker → route to Dev Architect
  ├── Missing AC or unclear spec → route to PO
  ├── External dependency → human escalation
  ├── Team conflict → human facilitation
  └── Process confusion → SM clarifies
        │
        ▼
  Track resolution time and report in metrics
```

---

## Workflow 4: Metrics Collection and Reporting

Continuous metrics throughout the sprint.

```
  Metrics collected at multiple points:
  ├── Daily: burndown, blocked items count
  ├── Per story: cycle time (start → done)
  ├── Per gate: pass/fail rate
  ├── End of sprint: velocity, completion, all KPIs
        │
        ▼
  VELOCITY TRACKER
  ├── velocity-report: trends across sprints
  ├── burndown-report: current sprint progress
  └── Alerts: flag anomalies to human
```

---

## Agent Routing Rules

| Agent | Encountering | Routes To |
|-------|-------------|-----------|
| Sprint Planner | Story not ready (DoR failed) | PO (backlog-health-check) |
| Sprint Planner | Velocity data insufficient | Velocity Tracker |
| Gate Enforcer | Gate 1 criteria unclear | PO (critique-spec) |
| Gate Enforcer | Gate 2/3 fail | Dev (Test Writer / Implementer) |
| Gate Enforcer | Subjective criterion | Human |
| Velocity Tracker | Anomaly detected | Human (with data) |
| Retro Facilitator | Action requires config change | SM updates framework config |
| Retro Facilitator | Action requires process change | Human approval first |
| Any agent | Conflict between systems | Human mediates |

---

## Ceremony Schedule

| Ceremony | When | Duration | Participants |
|----------|------|----------|-------------|
| Sprint Planning | Sprint day 1 | ~30 min | PO + SM + Dev |
| Daily Standup | Every work session | ~5 min | SM + Dev |
| Sprint Review | Last day of sprint | ~20 min | PO + SM + Dev |
| Retrospective | After review | ~20 min | All systems |
| Backlog Refinement | Mid-sprint | ~15 min | PO + SM |
