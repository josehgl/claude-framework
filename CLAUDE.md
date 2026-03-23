# Claude Framework

This project is a **Scrum + TDD methodology plugin** for Claude Code. It provides agents, skills, hooks, and knowledge docs that enforce a disciplined development process.

## How This Framework Works

When installed in a target project, it provides:
- **12 agents** across 3 systems (PO, Dev, SM) that specialize in different roles
- **49 skills** invocable as slash commands for specific tasks
- **5 hooks** that enforce quality gates and TDD discipline automatically
- **16 knowledge docs** with methodology, patterns, and guides

## The Pipeline

Every feature follows this pipeline — no exceptions:

```
Spec → Test → Code → PR → Merge
 G1      G2     G3    G4
```

- **Gate 1 (Spec Ready)**: AC in Given/When/Then, estimated, PO approved
- **Gate 2 (Tests Ready)**: Every AC has a failing test (red state)
- **Gate 3 (Code Ready)**: All tests pass, lint clean, no secrets, no orphan TODOs
- **Gate 4 (PR Ready)**: PR < 300 lines, conventional commit, branch up to date

## Systems and Agents

### Product Owner (PO)
Owns WHAT to build and WHY.
- `po-product-strategist` (opus) — JTBD, epics, market validation
- `po-ux-researcher` (sonnet) — personas, journeys, empathy maps
- `po-domain-expert` (sonnet) — business rules, glossary, edge cases
- `po-user-advocate` (sonnet) — user stories, AC quality, Gate 1

### Development (Dev)
Owns HOW to build it.
- `dev-architect` (opus) — ADRs, design decisions, patterns
- `dev-test-writer` (sonnet) — failing tests from AC, Gate 2
- `dev-implementer` (sonnet) — TDD green+refactor, minimum code
- `dev-code-reviewer` (sonnet) — code review, security scan, Gate 3

### Scrum Master (SM)
Owns the PROCESS.
- `sm-sprint-planner` (sonnet) — sprint planning/closure, capacity
- `sm-gate-enforcer` (sonnet) — validates gates 1-4, zero exceptions
- `sm-retro-facilitator` (sonnet) — retrospectives, action items
- `sm-velocity-tracker` (haiku) — metrics, burndown, anomalies

## Quick Start Skills

| Need | Skill |
|------|-------|
| See current status | `/status` |
| List all skills | `/help` |
| Start a new sprint | `/plan-sprint` |
| Write a user story | `/write-story` |
| Write tests from AC | `/write-tests` |
| Implement a feature | `/implement-feature` |
| Review code | `/review-code` |
| Create a PR | `/create-pr` |
| Validate a gate | `/validate-gate` |
| Audit framework health | `/framework-audit` |

## Key Rules

1. **TDD is mandatory**: never write implementation without a failing test first
2. **Gates are non-negotiable**: hooks enforce them automatically
3. **Agents stay in their lane**: each agent has scoped skills, listed in their Available Skills section
4. **Human decides**: agents propose, human approves — especially for scope, priority, and subjective quality
5. **State is persistent**: use `/init-state` to set up, `/status` to check, `/update-sprint` to modify

## File Structure

```
.claude/
├── agents/          # 12 agent definitions (PO, Dev, SM)
├── skills/          # 49 skills organized by agent/system
│   ├── dev-*/       # Development skills
│   ├── po-*/        # Product Owner skills
│   ├── sm-*/        # Scrum Master skills
│   ├── state/       # State management (read, write, init)
│   ├── transversal/ # Cross-system (status, help)
│   ├── installer/   # Framework management
│   └── integrations/# External tools (GitHub, Supabase, etc.)
├── hooks/           # 5 automated hooks (gates, TDD, protection)
└── settings.json    # Hook configuration

docs/
├── methodology/     # Scrum, TDD, quality gates, metrics
├── product-owner/   # PO knowledge docs
├── development/     # Dev knowledge docs
├── scrum-master/    # SM knowledge docs
└── framework/       # Sprint state, velocity, backlog (runtime)
```

## Installing in a Project

Run `/framework` in the target project to install. The installer detects the stack and copies the appropriate files.
