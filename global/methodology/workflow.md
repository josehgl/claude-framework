# Spec → Test → Code → PR Workflow

The core development pipeline. Every unit of work — from a bug fix to a full feature — follows these four phases sequentially. No phase can be skipped.

## Phase 1: Spec

**Owner:** Product Owner system
**Output:** Acceptance criteria in Given/When/Then format

### Rules

- Every user story MUST have acceptance criteria before entering a sprint
- AC must be written in Given/When/Then (Gherkin) syntax
- AC must be testable — if you can't write a test for it, rewrite the AC
- AC must be unambiguous — two people reading it reach the same conclusion
- AC must be independent — no implicit dependencies on other stories
- Edge cases and error scenarios MUST be explicitly listed

### Format

```gherkin
Feature: [Story title]

  Scenario: [Happy path]
    Given [initial context]
    When [action taken]
    Then [expected outcome]

  Scenario: [Edge case]
    Given [context]
    When [action]
    Then [expected outcome]

  Scenario: [Error case]
    Given [context]
    When [invalid action]
    Then [error handling]
```

### Quality Gate: Spec Review

Before moving to Test phase:
- [ ] All AC written in Given/When/Then
- [ ] Happy path, edge cases, and error cases covered
- [ ] No ambiguous terms (define any domain-specific language)
- [ ] Testable — each scenario maps to at least one test
- [ ] Accepted by PO

---

## Phase 2: Test

**Owner:** Development system (test-writer agent)
**Input:** Acceptance criteria from Phase 1
**Output:** Failing tests (red) that validate each AC

### Rules

- Tests are written BEFORE any implementation code (ATDD)
- Each AC scenario maps to at least one test
- Tests MUST fail when first written (red state) — this proves the test is meaningful
- Test names describe the behavior being tested, not the implementation
- Tests are the executable specification — they ARE the documentation

### Mapping: AC → Tests

```
Scenario: User logs in with valid credentials
→ test: "should redirect to dashboard when credentials are valid"

Scenario: User logs in with wrong password
→ test: "should show error message when password is incorrect"

Scenario: User logs in with unverified email
→ test: "should show verification prompt when email not verified"
```

### Test Layers

| Layer | What to test | Tool |
|-------|-------------|------|
| Unit | Pure functions, utilities, hooks | Vitest / Pytest |
| Integration | Component interactions, API routes, DB queries | Vitest + mocks / Pytest |
| E2E | Full user flows against running app | Playwright |

### Quality Gate: Test Review

Before moving to Code phase:
- [ ] Every AC scenario has at least one test
- [ ] All tests fail (red) — no implementation exists yet
- [ ] Test names are descriptive and behavior-focused
- [ ] Test coverage target defined (default: 80% business logic)
- [ ] Approved by code-reviewer agent

---

## Phase 3: Code

**Owner:** Development system (dev agents)
**Input:** Failing tests from Phase 2
**Output:** Minimum implementation that makes all tests pass (green)

### Rules

- Write the MINIMUM code to make tests pass — nothing more
- Follow Red → Green → Refactor cycle (see @global/methodology/tdd.md)
- After green: refactor for clarity, DRY, SOLID — but tests must stay green
- No code without a corresponding test
- No "I'll add tests later" — if it's not tested, it doesn't exist

### Quality Gate: Code Review

Before moving to PR phase:
- [ ] All tests pass (green)
- [ ] Lint clean (zero errors, zero warnings)
- [ ] Type check clean (zero errors)
- [ ] Test coverage meets target (default: 80%)
- [ ] No TODO comments without linked issue
- [ ] No hardcoded secrets, credentials, or environment values
- [ ] Approved by code-reviewer agent

---

## Phase 4: PR

**Owner:** Development system + Scrum Master validation
**Input:** Passing code from Phase 3
**Output:** Merged PR to main

### Rules

- One PR per unit of work (single responsibility)
- PR title follows conventional commits: `type(scope): description`
- PR body includes: what changed, why, link to story, test evidence
- Max 300 lines changed (excluding generated files)
- If larger, decompose into smaller PRs
- Branch from main, merge to main (trunk-based)
- Branch naming: `feat/short-name`, `fix/short-name`, `refactor/short-name`
- Delete branch after merge

### PR Template

```markdown
## What
[Brief description of the change]

## Why
[Link to user story / epic]

## Test Evidence
- [ ] All acceptance tests pass
- [ ] Unit test coverage: X%
- [ ] Lint + typecheck clean

## Checklist
- [ ] Single responsibility (one concern per PR)
- [ ] <300 lines changed
- [ ] No secrets or credentials
- [ ] Conventional commit message
```

### Quality Gate: PR Merge

Before merging:
- [ ] All CI checks pass (tests, lint, typecheck)
- [ ] Code review approved
- [ ] PR size within limits (<300 lines)
- [ ] Conventional commit message
- [ ] Branch is up to date with main
- [ ] SM validates against sprint goals

---

## Pipeline Summary

```
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│  SPEC   │───→│  TEST   │───→│  CODE   │───→│   PR    │
│         │    │         │    │         │    │         │
│ AC in   │    │ Failing │    │ Minimum │    │ Atomic  │
│ Gherkin │    │ tests   │    │ impl.   │    │ merge   │
│         │    │ (red)   │    │ (green) │    │ to main │
└─────────┘    └─────────┘    └─────────┘    └─────────┘
   PO             Dev            Dev          Dev + SM
  review        review          review        review
```

Each arrow is a quality gate. If the gate fails, go back — never forward.
