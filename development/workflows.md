# Development Workflows

How the 4 Dev agents collaborate to transform stories into tested, merged code.

---

## Workflow 1: Full Story Implementation

The complete pipeline from PO-approved story to merged PR.
Use for every new feature or user story entering the sprint.

```
┌─────────────────────────────────────────────────────────────────┐
│                     PO-APPROVED STORY                           │
│         Gate 1 passed: AC in Given/When/Then, estimated         │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  1. ARCHITECT (if needed)                                       │
│     Skills: architecture-decision                               │
│                                                                 │
│     Input:  Story + AC + existing codebase                      │
│     Does:   evaluates design impact, produces ADR if needed     │
│     Output: Implementation guidance or ADR                      │
│                                                                 │
│     → Skip if story is straightforward and patterns exist       │
└──────────────────────────┬──────────────────────────────────────┘
                           │ Implementation guidance
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  2. TEST WRITER                                                 │
│     Skills: write-tests, run-tests, coverage-check              │
│                                                                 │
│     Input:  Story with AC + implementation guidance              │
│     Does:   maps each AC scenario to test(s), writes tests      │
│     Output: Failing tests (red) + AC-to-test mapping            │
│                                                                 │
│     → All tests MUST fail (red state confirmed)                 │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  GATE 2: TESTS READY                                            │
│  Validated by: Test Writer + Human review                       │
│                                                                 │
│  ✓ Every AC scenario has at least one test                      │
│  ✓ All tests fail (red state)                                   │
│  ✓ Test names describe behavior (should...when...)              │
│  ✓ Coverage target defined                                      │
│                                                                 │
│  PASS → Implementer can begin                                   │
│  FAIL → Test Writer revises                                     │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  3. IMPLEMENTER                                                 │
│     Skills: implement-feature                                   │
│                                                                 │
│     Input:  Failing tests + implementation guidance              │
│     Does:   writes minimum code per test, refactors when green  │
│     Output: All tests passing (green) + clean code              │
│                                                                 │
│     → Run tests after EVERY change                              │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  4. CODE REVIEWER                                               │
│     Skills: review-code, lint-check                             │
│                                                                 │
│     Input:  Implementation diff + tests + story                 │
│     Does:   quality, security, standards review                 │
│     Output: Review Report (PASS / NEEDS WORK / FAIL)            │
│                                                                 │
│     → NEEDS WORK routes back to Implementer with specific fixes │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  GATE 3: CODE READY                                             │
│  Validated by: Code Reviewer                                    │
│                                                                 │
│  ✓ All tests pass (green)                                       │
│  ✓ Lint clean (0 errors, 0 warnings)                            │
│  ✓ Type check clean (0 errors)                                  │
│  ✓ Coverage >= target                                           │
│  ✓ No TODOs without issue link                                  │
│  ✓ No hardcoded secrets                                         │
│                                                                 │
│  PASS → PR creation                                             │
│  FAIL → routes back to Implementer                              │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  PR CREATION (create-pr skill)                                  │
│                                                                 │
│  ✓ Branch from main, conventional commit title                  │
│  ✓ PR < 300 lines, single responsibility                        │
│  ✓ PR body: what, why, test evidence                            │
│  ✓ Labels and milestone applied                                 │
│                                                                 │
│  → Moves to Gate 4 (SM validates)                               │
└─────────────────────────────────────────────────────────────────┘
```

---

## Workflow 2: TDD Cycle (single function/module)

Quick path for implementing a single function or module.

```
  Failing test exists
        │
        ▼
  IMPLEMENTER
  ├── Read the failing test
  ├── Write minimum code to pass it
  ├── Run tests → green?
  │   ├── No → adjust implementation
  │   └── Yes → refactor
  ├── Run tests after refactor → still green?
  │   ├── No → undo last refactor step
  │   └── Yes → done
  └── Repeat for next failing test
```

---

## Workflow 3: Bug Fix Pipeline

Every bug fix starts with a reproducing test.

```
  Bug report (issue or description)
        │
        ▼
  TEST WRITER
  ├── Understand the bug
  ├── Write test that reproduces it (must fail)
  └── Confirm red state
        │
        ▼
  IMPLEMENTER (fix-bug skill)
  ├── Write minimum fix
  ├── Run reproducing test → green?
  ├── Run full test suite → no regressions?
  └── Done
        │
        ▼
  CODE REVIEWER → Gate 3 → PR
```

---

## Workflow 4: Code Review

Standalone code review for any implementation.

```
  Code ready for review
        │
        ▼
  CODE REVIEWER (review-code skill)
  ├── Run automated checks (lint, typecheck, tests)
  ├── Structural review (SOLID, DRY, separation of concerns)
  ├── Security review (OWASP simplified)
  ├── Performance review (N+1, unnecessary computation)
  ├── Test quality review (meaningful assertions)
  └── Produce Review Report
        │
        ├── PASS → proceed to PR
        ├── NEEDS WORK → specific fixes, back to Implementer
        └── FAIL → fundamental issues, may need Architect
```

---

## Workflow 5: Architecture Decision

When a technical decision needs evaluation.

```
  Technical question or trade-off
        │
        ▼
  ARCHITECT (architecture-decision skill)
  ├── Analyze existing codebase patterns
  ├── Research options if needed (WebSearch)
  ├── Evaluate trade-offs (complexity, performance, maintainability)
  ├── Produce ADR (Architecture Decision Record)
  └── Present to human for approval
        │
        ├── Approved → guides Implementer
        └── Rejected → revise with human feedback
```

---

## Agent Routing Rules

When an agent encounters something outside its scope:

| Agent | Encountering | Routes To |
|-------|-------------|-----------|
| Test Writer | AC is untestable or ambiguous | PO (critique-spec) |
| Test Writer | Test framework not configured | Architect |
| Test Writer | Needs architectural context | Architect |
| Implementer | Tests seem wrong | Test Writer |
| Implementer | Design decision needed | Architect |
| Implementer | Can't pass tests with simple code | Architect |
| Code Reviewer | Architectural concern | Architect |
| Code Reviewer | Security vulnerability (P0) | Human (escalate immediately) |
| Code Reviewer | Test quality is poor | Test Writer |
| Architect | Scope might change | PO (Product Strategist) |
| Architect | Multiple viable approaches | Human (present with recommendation) |
| Any agent | AC missing or unclear | PO (User Advocate) |
| Any agent | Subjective decision | Human (escalate) |

---

## Artifact Flow Summary

```
PO System                    Dev System
─────────                    ──────────
Story + AC ─────────────────→ (input to Test Writer)
                              │
                              Tests (red) ──→ Gate 2
                              │
                              Implementation (green) ──→ Gate 3
                              │
                              PR ──→ Gate 4 (SM validates)
                              │
                              ▼
                           Merged to main
```

Each phase produces a verifiable artifact. Gates are checkpoints between phases — work cannot move forward without passing.
