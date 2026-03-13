# Shared / Transversal Layers

Cross-cutting concerns that apply to all three systems.

## Traceability

Structured logging of every agent action for audit and debugging.

- **What:** system, agent, action, input, output, timestamp, result
- **Where:** markdown logs (git-tracked) + Supabase (queryable)
- **Why:** identify which part of the system fails, improve over time

## Metrics

Collection and reporting of KPIs across all systems.

- **Storage:** markdown (per sprint) + Supabase (historical)
- **Dashboards:** defined when Development system builds the DB schema
- **Review:** every sprint retrospective

## Human-in-the-Loop

Escalation framework for subjective decisions.

- Agents escalate when no objective criterion exists
- Human decisions are captured with context
- Repeated patterns (3+ occurrences) are converted to automated rules
- Goal: minimize human intervention over time by learning from decisions

## Status: Phase 5 (planned)
