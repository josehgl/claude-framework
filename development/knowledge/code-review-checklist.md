# Code Review Checklist — Reference

Comprehensive checklist for the Code Reviewer agent. Used during Gate 3 validation.

---

## 1. Security (OWASP Simplified)

| # | Check | How to Verify |
|---|-------|--------------|
| 1.1 | No hardcoded secrets | `grep -r "password\|secret\|api_key\|token" --include='*.{ts,js,py,go}'` |
| 1.2 | No SQL injection | Look for string concatenation in queries |
| 1.3 | No XSS | Ensure user input is escaped before rendering in HTML |
| 1.4 | Input validation at boundaries | Check API endpoints validate input (types, length, format) |
| 1.5 | Authentication checks present | Protected routes check auth before processing |
| 1.6 | Authorization checks present | Operations verify user has permission |
| 1.7 | No sensitive data in logs | Error logs don't include passwords, tokens, PII |
| 1.8 | No sensitive data in URLs | Query params don't contain secrets or PII |
| 1.9 | Dependencies are pinned | Lock files updated, no floating versions |
| 1.10 | No `eval()` or dynamic code execution | Grep for eval, exec, Function() |

---

## 2. Performance

| # | Check | How to Verify |
|---|-------|--------------|
| 2.1 | No N+1 queries | No DB calls inside loops |
| 2.2 | Pagination for collections | Endpoints returning lists have limit/offset |
| 2.3 | No unnecessary computation | No recalculation of values that could be cached |
| 2.4 | Async where appropriate | I/O operations are non-blocking |
| 2.5 | No memory leaks | Event listeners cleaned up, subscriptions unsubscribed |
| 2.6 | Efficient data structures | Using Map/Set instead of array.find() in hot paths |
| 2.7 | No unnecessary re-renders | React: memo, useMemo, useCallback where measurably needed |

---

## 3. Maintainability

| # | Check | How to Verify |
|---|-------|--------------|
| 3.1 | Functions < 20 lines | Long functions decomposed |
| 3.2 | Nesting < 3 levels | Deep nesting extracted to named functions |
| 3.3 | No magic numbers | Constants extracted with descriptive names |
| 3.4 | Names describe intent | Could a stranger understand this without comments? |
| 3.5 | No dead code | No commented-out code, unused imports, unreachable branches |
| 3.6 | Single responsibility | Each function/class does one thing |
| 3.7 | Low coupling | Modules depend on interfaces, not implementations |
| 3.8 | No duplication | Shared logic extracted (but only when used 3+ times) |
| 3.9 | Error handling is explicit | Errors caught and handled, not swallowed silently |
| 3.10 | Edge cases handled | Null checks, empty arrays, boundary values |

---

## 4. Test Quality

| # | Check | How to Verify |
|---|-------|--------------|
| 4.1 | Assertions are meaningful | `expect(x).toBe(42)` not just `expect(x).toBeTruthy()` |
| 4.2 | Tests verify behavior | Assert on outputs and side effects, not internal calls |
| 4.3 | Test names are descriptive | `should...when...` pattern |
| 4.4 | Tests are independent | No shared mutable state, no test ordering |
| 4.5 | Edge cases tested | Boundary values, empty inputs, error conditions |
| 4.6 | No implementation coupling | Tests don't break when refactoring internals |
| 4.7 | Test data is clear | Using factories, not opaque fixtures |
| 4.8 | Coverage meets target | Business logic > 80%, overall > 70% |

---

## 5. Git & PR Hygiene

| # | Check | How to Verify |
|---|-------|--------------|
| 5.1 | PR < 300 lines | `git diff --stat` |
| 5.2 | Single responsibility | PR does one thing |
| 5.3 | Conventional commit title | `feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:` |
| 5.4 | No unrelated changes | No formatting-only diffs, no drive-by refactors |
| 5.5 | Branch up to date with main | No merge conflicts |
| 5.6 | No TODO without issue link | `grep -r "TODO" --include='*.{ts,js,py,go}'` |

---

## Review Severity Levels

| Level | Definition | Action |
|-------|-----------|--------|
| **Critical** | Security vulnerability, data loss risk, crash | Must fix before merge |
| **Improvement** | Performance issue, maintainability concern, missing validation | Should fix before merge |
| **Nitpick** | Style preference, alternative approach, minor naming | Optional, author decides |

---

## Review Report Template

```markdown
## Verdict: [PASS / NEEDS WORK / FAIL]

### Critical Issues
[List or "None found"]

### Improvements
[List or "None found"]

### Nitpicks
[List or "None found"]

### Positive Highlights
[What was done well — always include at least one]
```
