---
name: critique-spec
description: >
  Reviews acceptance criteria for quality, testability, and completeness.
  Checks against the AC quality checklist and common anti-patterns. Use when
  reviewing existing stories or validating Gate 1 readiness.
user-invocable: true
allowed-tools: Read, Grep, Glob, AskUserQuestion
---

# Critique Spec

Review a story's acceptance criteria and produce an actionable quality report.

## Inputs

- The story file or text to review
- The project glossary (if exists, search `docs/glossary.md`)
- The business rules catalog (if exists, search `docs/business-rules.md`)

## Process

### 1. Structural Check

Verify each scenario has proper Given/When/Then:

| Check | What to Look For |
|-------|-----------------|
| Format | Every scenario uses Given/When/Then (not "should" or prose) |
| Given completeness | Initial state is fully described — no implicit context |
| When singularity | Exactly one action per When — no compound actions |
| Then observability | Outcome can be verified by a test assertion |
| Independence | Scenario doesn't depend on another scenario running first |

### 2. Language Quality

Scan for problematic words and patterns:

**Ambiguous words** (flag every occurrence):
- quickly, slowly, properly, correctly, appropriately
- relevant, reasonable, suitable, adequate
- user-friendly, intuitive, seamless, smooth
- various, several, some, many, few
- etc., and so on, and more

**Implementation leaks** (flag every occurrence):
- database, table, column, SQL, query
- API, endpoint, REST, GraphQL, HTTP
- component, service, controller, model
- Redux, state, store, context
- cache, queue, worker, cron

**Vague outcomes**:
- "works correctly" → specify what "correct" looks like
- "is updated" → specify what changes and how to verify
- "error is shown" → specify the error message or type
- "is validated" → specify the validation rules

### 3. Completeness Check

| Check | Status |
|-------|--------|
| At least 1 happy path scenario | YES / NO |
| At least 1 error scenario | YES / NO |
| At least 1 edge case scenario | YES / NO / N/A |
| Out of scope defined | YES / NO |
| All domain terms in glossary | YES / NO / N/A |
| Business rules referenced where applicable | YES / NO / N/A |
| Story estimated | YES / NO |

### 4. Anti-Pattern Detection

Check for common AC anti-patterns:

| Anti-Pattern | Example | Severity |
|-------------|---------|----------|
| Vague outcome | "Then it works" | CRITICAL |
| Missing context | "When user clicks X" (no Given) | CRITICAL |
| Compound action | "When user fills and submits" | HIGH |
| Implementation detail | "Then save to PostgreSQL" | HIGH |
| Missing error case | Only happy path | HIGH |
| Untestable criterion | "Then UX feels smooth" | HIGH |
| Over-specified | "Then button is blue, 14px, Helvetica" | MEDIUM |
| Duplicate scenario | Two scenarios testing same thing | MEDIUM |
| Missing boundary | No min/max/empty scenarios | MEDIUM |

### 5. Produce Review Report

```markdown
# Spec Review: [Story Name]

## Overall: PASS / NEEDS WORK / FAIL

## Structural Issues
| # | Scenario | Issue | Severity | Suggested Fix |
|---|----------|-------|----------|---------------|
| 1 | [scenario] | [issue] | [sev] | [fix] |

## Language Issues
| # | Location | Problematic Text | Issue | Suggested Fix |
|---|----------|------------------|-------|---------------|
| 1 | [scenario, line] | "[text]" | Ambiguous | "[replacement]" |

## Completeness
| Check | Status | Note |
|-------|--------|------|
| Happy path | [status] | |
| Error scenarios | [status] | [missing cases] |
| Edge cases | [status] | [missing cases] |
| Out of scope | [status] | |
| Glossary compliance | [status] | [undefined terms] |
| Estimation | [status] | |

## Anti-Patterns Found
- [anti-pattern]: [where] — [how to fix]

## Gate 1 Readiness
| Criterion | Status |
|-----------|--------|
| All AC in Given/When/Then | PASS / FAIL |
| Happy path exists | PASS / FAIL |
| Error/edge case exists | PASS / FAIL |
| No ambiguous terms | PASS / FAIL |
| Each scenario testable | PASS / FAIL |
| Story estimated | PASS / FAIL |
| PO approved | PENDING |

**Verdict**: [Ready for Gate 1 / Needs [N] fixes first]
```

### 6. Suggest Fixes

For every issue found, provide a concrete fix — not just "make it better":
- Bad: "Then is too vague"
- Good: "Replace 'Then the form is validated' with 'Then an error message \"Email is required\" is displayed below the email field'"
