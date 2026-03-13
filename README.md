# Claude Development Framework

A complete development framework for Claude Code that mirrors a real software team.

## Three Systems

| System | Role | Character |
|--------|------|-----------|
| **Product Owner** | Define WHAT to build, prioritize, critique, redefine | Flexible, iterative, strategic |
| **Scrum Master** | Control HOW we work, milestones, deadlines, quality | Inflexible, procedural, enforcement |
| **Development** | Code, test, deploy | Executor, technical |

## Core Methodology

- **Scrum** for project management
- **Spec → Test → Code → PR** as the development workflow (ATDD + TDD + GitHub Flow)
- **Trunk-based development** with small atomic PRs

## Structure

```
global/          — Methodology & defaults inherited by all systems
product-owner/   — Product discovery, definition & evolution engine
scrum-master/    — Process enforcement & tracking engine
development/     — Technical execution engine
shared/          — Transversal layers (metrics, traceability, HITL)
installer/       — Skill to link framework to new projects
```

## Usage

1. Clone this repo
2. Link `global/` to `~/.claude/` for project-wide inheritance
3. Use `/framework` skill to initialize a new project
4. PO, SM, and Dev systems activate as needed

## Principles

- Hooks enforce, CLAUDE.md guides
- Objective metrics govern agent behavior
- Human resolves subjective, agents handle objective
- Each system is independent with own agents, skills, hooks, MCPs
- Progressive disclosure: metadata → instructions → resources on-demand
