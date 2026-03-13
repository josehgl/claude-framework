# TDD + ATDD Practices

## Two Levels of Test-Driven Development

### Level 1: ATDD (Acceptance Test-Driven Development)

ATDD works at the **story level**. Acceptance criteria drive acceptance tests.

```
User Story → Acceptance Criteria (Given/When/Then) → Acceptance Tests → Implementation
```

**Who writes what:**
- PO writes acceptance criteria
- Dev (test-writer agent) translates AC into executable tests
- Dev (code agents) implement until tests pass

**ATDD ensures:** We build the RIGHT thing (validates requirements).

### Level 2: TDD (Test-Driven Development)

TDD works at the **function/module level**. Every piece of logic starts with a failing test.

```
Requirement → Write failing test → Write minimum code → Refactor
```

**The Red → Green → Refactor cycle:**

1. **RED:** Write a test that describes the desired behavior. Run it. It MUST fail.
   - If it passes, either the test is wrong or the feature already exists.
2. **GREEN:** Write the minimum code to make the test pass. Nothing more.
   - Resist the urge to write "good" code. Make it work first.
3. **REFACTOR:** With tests green, improve the code (DRY, SOLID, clarity).
   - Run tests after every change. They must stay green.

**TDD ensures:** We build the thing RIGHT (validates implementation).

---

## When to Use Each

| Situation | Approach |
|-----------|----------|
| New user story | ATDD first (acceptance tests from AC), then TDD for internals |
| New utility function | TDD (unit test first) |
| Bug fix | Write test that reproduces the bug (red), fix it (green) |
| Refactoring | Ensure tests exist and pass, then refactor (tests stay green) |
| Spike / exploration | No TDD needed, but spike code is NOT production code |

---

## Test Naming Convention

Tests describe behavior, not implementation:

```
// GOOD — describes behavior
"should return 401 when token is expired"
"should merge arrays without duplicates"
"should redirect to login when session is missing"

// BAD — describes implementation
"test handleAuth function"
"test mergeArrays"
"test redirect"
```

Format: `should [expected behavior] when [condition]`

---

## What to Test Per Layer

### Unit Tests
- Pure functions (transformations, calculations, validations)
- Custom hooks (state changes, side effects)
- Utility modules (parsers, formatters, normalizers)
- **NOT:** UI rendering details, framework internals, third-party libraries

### Integration Tests
- Component interactions (parent-child data flow)
- API route handlers (request → response)
- Database queries (via test DB or mocks)
- **NOT:** External services (mock them)

### E2E Tests
- Critical user flows (login, checkout, data submission)
- Cross-page navigation
- Real browser interactions
- **NOT:** Every edge case (too slow, too brittle)

---

## Coverage Targets

| Code type | Target | Rationale |
|-----------|--------|-----------|
| Business logic (lib/, utils/) | 80% | Core value, must be reliable |
| API routes / Edge Functions | 80% | Contract with frontend |
| UI components | 60% | Behavior tests, not snapshot |
| E2E flows | Critical paths only | Slow, focus on happy paths |
| Generated code / config | 0% | Not our code |

**Coverage is a metric, not a goal.** 80% of meaningful code > 100% of trivial code.

---

## Anti-Patterns

- **Test after:** Writing tests after implementation defeats the purpose. Tests confirm bias, not correctness.
- **Testing implementation:** Testing HOW something works instead of WHAT it does. Tests break on every refactor.
- **God tests:** One test that validates 10 things. Split into focused tests.
- **Flaky tests:** Tests that sometimes pass, sometimes fail. Fix or delete — never ignore.
- **Mock everything:** Over-mocking produces tests that pass but don't reflect reality.
- **Chasing coverage:** Adding meaningless tests to hit a number. Test behavior, not lines.
