# Claude Development Framework — Global Master

## Philosophy

This framework operates as three independent systems: Product Owner, Scrum Master, and Development.
Each system has its own agents, skills, hooks, and metrics. They collaborate but never bypass each other.

## Core Workflow: Spec → Test → Code → PR

Every piece of work follows this pipeline. No exceptions.

1. **Spec**: Acceptance criteria written in Given/When/Then. Must be testable and unambiguous.
2. **Test**: Tests written FROM the AC BEFORE any implementation code. Tests must fail (red).
3. **Code**: Minimum implementation to make tests pass (green). Then refactor.
4. **PR**: Atomic, single-responsibility. <300 lines changed. Trunk-based merge to main.

See @global/methodology/workflow.md for the full pipeline specification.

## Methodology

- **Scrum**: sprints, ceremonies, DoD, DoR — see @global/methodology/scrum.md
- **ATDD + TDD**: acceptance-driven then test-driven — see @global/methodology/tdd.md
- **Trunk-based + GitHub Flow**: short branches, fast merges — see @global/methodology/git-flow.md

## Rules

1. **Hooks enforce. CLAUDE.md guides.** If something MUST happen, it's a hook. If it's preferred, it's here.
2. **Objective metrics govern agents.** Every agent is measured by KPIs. See @global/methodology/metrics.md.
3. **Human resolves subjective.** Agents escalate when no objective criterion exists. Decisions become rules.
4. **Quality gates are non-negotiable.** See @global/methodology/quality-gates.md.
5. **Progressive disclosure.** Load only what's needed: metadata → instructions → resources.
6. **Context is precious.** CLAUDE.md <100 lines. Skills <500 lines. Delegate research to subagents.

## Agent Conduct

- Every agent has a name, role, objective, and boundaries
- Agents NEVER act outside their defined scope
- Agents log actions for traceability
- When uncertain, agents escalate to human — never guess

## Systems Reference

| System | Purpose | CLAUDE.md |
|--------|---------|-----------|
| Product Owner | WHAT to build | @product-owner/CLAUDE.md |
| Scrum Master | HOW we work | @scrum-master/CLAUDE.md |
| Development | Execute code | @development/CLAUDE.md |
