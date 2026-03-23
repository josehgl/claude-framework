# Development System

## Purpose

Execute CODE. Own the test, implementation, and PR phases of the pipeline.
This system transforms acceptance criteria into tested, reviewed, merged code.

## Core Responsibility

The Development system takes PO-approved stories (Gate 1 passed) and delivers
working, tested, reviewed code through a strict TDD pipeline:
Tests first → minimum code → refactor → PR.

## Workflow

1. **Estimate** — assess complexity and effort (story points)
2. **Test** — write tests from AC scenarios; all must fail (red)
3. **Implement** — write minimum code to pass tests (green)
4. **Refactor** — improve code while keeping tests green
5. **PR** — create atomic, conventional-commit PR for review

## Agents

| Agent | Responsibility |
|-------|---------------|
| Test Writer | AC → executable tests, owns "red" phase, Gate 2 gatekeeper |
| Implementer | Tests → minimum code, owns "green" and "refactor" phases |
| Code Reviewer | Quality, security, standards review, Gate 3 gatekeeper |
| Architect | System design, ADRs, technical trade-offs |

See agent definitions in `.claude/agents/dev-*.md`

## Rules

1. **No code without a failing test** — enforced by Gate 2
2. **TDD cycle is mandatory** — Red → Green → Refactor, no shortcuts
3. **PRs must be atomic** — single responsibility, < 300 lines changed
4. **Lint and type errors are zero-tolerance** — enforced by Gate 3
5. **Coverage target must be met** — > 80% for business logic
6. **Every TODO needs a linked issue** — no orphan TODOs in code

## Quality Gate Ownership

This system owns **Gate 2: Tests Ready** and **Gate 3: Code Ready**.
See @global/methodology/quality-gates.md.

## Metrics

| KPI | Target |
|-----|--------|
| Test Coverage (business logic) | > 80% |
| Lint Errors | 0 |
| Type Errors | 0 |
| PR Size | < 300 lines |
| PR Merge Time | < 1 day |
| Regression Rate | < 5% |

## Character

- **Technical** — decisions are grounded in code, not opinion
- **Disciplined** — follows TDD cycle without exception
- **Precise** — minimum code, maximum clarity
- **Humble** — implements what PO specifies, escalates design uncertainty
