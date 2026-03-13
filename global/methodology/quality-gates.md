# Quality Gates

Non-negotiable checkpoints between each phase of the Spec → Test → Code → PR workflow.
If a gate fails, the work goes BACK — never forward.

---

## Gate 1: Spec → Test (Spec Ready)

**Enforced by:** Product Owner system
**Validated by:** SM (quality-gate-enforcer agent)

| # | Criterion | Measurable |
|---|-----------|-----------|
| 1 | All AC in Given/When/Then format | Yes — parse for Given/When/Then keywords |
| 2 | Happy path scenario exists | Yes — at least 1 scenario without error |
| 3 | At least 1 error/edge case scenario | Yes — count scenarios with error outcomes |
| 4 | No ambiguous terms (or glossary provided) | Subjective — human review if flagged |
| 5 | Each scenario is independently testable | Yes — 1 scenario = 1+ test mapping |
| 6 | Story estimated in story points | Yes — numeric value present |
| 7 | PO has explicitly approved | Yes — approval flag |

**Pass condition:** ALL items checked. Zero exceptions.

---

## Gate 2: Test → Code (Tests Ready)

**Enforced by:** Development system (test-writer agent)
**Validated by:** SM (quality-gate-enforcer agent)

| # | Criterion | Measurable |
|---|-----------|-----------|
| 1 | Every AC scenario has at least 1 test | Yes — AC count vs test count |
| 2 | All tests fail (red state) | Yes — test runner exit code != 0 |
| 3 | Test names follow convention: "should...when..." | Yes — regex match |
| 4 | No implementation code exists yet | Yes — only test files changed |
| 5 | Test file structure follows project conventions | Yes — path and naming rules |
| 6 | Code-reviewer agent has approved test design | Yes — approval flag |

**Pass condition:** ALL items checked. If tests pass (green) before code, something is wrong.

---

## Gate 3: Code → PR (Code Ready)

**Enforced by:** Development system (dev agents)
**Validated by:** SM (quality-gate-enforcer agent) + hooks

| # | Criterion | Measurable | Enforcement |
|---|-----------|-----------|-------------|
| 1 | All tests pass (green) | Yes — test runner exit code 0 | Hook: PostToolUse |
| 2 | Lint clean (0 errors, 0 warnings) | Yes — linter exit code 0 | Hook: PostToolUse |
| 3 | Type check clean (0 errors) | Yes — tsc/mypy exit code 0 | Hook: PostToolUse |
| 4 | Test coverage >= target | Yes — coverage report | Hook: PostToolUse |
| 5 | No TODO without linked issue | Yes — grep + issue ref check | Hook: PreToolUse |
| 6 | No hardcoded secrets | Yes — secret scanner | Hook: PreToolUse |
| 7 | No files in deny list modified | Yes — path check | Hook: PreToolUse |
| 8 | Code-reviewer agent approved | Yes — approval flag | Manual |

**Pass condition:** Items 1-7 enforced by hooks (deterministic). Item 8 requires review.

---

## Gate 4: PR → Merge (PR Ready)

**Enforced by:** Development + Scrum Master systems
**Validated by:** CI/CD pipeline + SM (dod-validator agent)

| # | Criterion | Measurable | Enforcement |
|---|-----------|-----------|-------------|
| 1 | CI passes (tests + lint + typecheck) | Yes — CI status | GitHub Actions |
| 2 | PR size < 300 lines changed | Yes — diff stat | CI check |
| 3 | Single responsibility | Subjective — reviewer judgment | Code review |
| 4 | Conventional commit title | Yes — regex | CI check |
| 5 | PR body complete (what, why, test evidence) | Yes — template check | CI check |
| 6 | Branch up to date with main | Yes — git status | GitHub setting |
| 7 | At least 1 review approval | Yes — GitHub setting | GitHub setting |
| 8 | No regressions (all existing tests pass) | Yes — CI | GitHub Actions |
| 9 | Story DoD met | Yes — checklist complete | SM validation |

**Pass condition:** ALL items. SM has final say — if DoD is not met, PR does not merge.

---

## Escalation Rules

When a gate item is **subjective** (cannot be measured automatically):

1. Agent flags the item as "needs human review"
2. Agent provides its assessment with evidence
3. Human makes the call
4. Human's decision is recorded
5. If the pattern repeats (same type of decision 3+ times), convert to an objective rule

**Goal:** Minimize subjective gates over time by converting human decisions into automated rules.

---

## Gate Failure Protocol

When a gate fails:

1. **Identify** which specific criterion failed
2. **Log** the failure (system, agent, criterion, evidence)
3. **Route back** to the responsible phase
4. **Fix** the issue at its source (don't patch downstream)
5. **Re-validate** the gate from scratch (no partial passes)

**Never bypass a gate.** If a gate seems wrong, change the gate definition — don't skip it.
