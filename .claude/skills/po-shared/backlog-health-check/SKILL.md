---
name: backlog-health-check
description: >
  Audits the product backlog for health issues: stories without AC, missing epics,
  unestimated items, stale stories, and DoR compliance. Use before sprint planning
  or as a periodic backlog hygiene check.
user-invocable: true
allowed-tools: Read, Grep, Glob, AskUserQuestion
---

# Backlog Health Check

Audit the product backlog and produce a health report.

## Process

### 1. Locate Backlog Artifacts

Search the project for story files, epic briefs, and backlog documents:
- Look in `docs/`, `backlog/`, `stories/`, `.github/issues`, or similar
- Also check any linked project management tool if MCP is available

### 2. Check Each Story Against DoR

For every story found, verify:

| # | Check | Status |
|---|-------|--------|
| 1 | Has a parent epic | YES / NO / MISSING |
| 2 | Has acceptance criteria in Given/When/Then | YES / NO / PARTIAL |
| 3 | Has at least 1 happy path + 1 error scenario | YES / NO |
| 4 | Is estimated (story points) | YES / NO |
| 5 | Has a defined persona | YES / NO |
| 6 | All domain terms in glossary | YES / NO / N/A |
| 7 | Has "Out of Scope" defined | YES / NO |

### 3. Identify Backlog Smells

Flag these problems:
- **Orphan stories**: no parent epic
- **Zombie stories**: not updated in > 2 sprints, still "planned"
- **Giant stories**: estimated > 8 points (suggest splitting)
- **Vague stories**: AC missing or not in Given/When/Then
- **Duplicate intent**: two stories solving the same job

### 4. Produce Health Report

```markdown
# Backlog Health Report — [date]

## Summary
- Total stories: [n]
- DoR compliant: [n] ([%])
- Needs attention: [n]

## Issues Found

### Critical (blocks sprint planning)
- [ ] [Story X]: missing AC
- [ ] [Story Y]: no epic parent

### Warning (should fix soon)
- [ ] [Story Z]: estimated at 13 points — consider splitting
- [ ] [Story W]: not updated in 3 sprints — still relevant?

### Metrics
| KPI | Value | Target | Status |
|-----|-------|--------|--------|
| AC Coverage | [%] | 100% | [OK/WARN/FAIL] |
| Backlog Health (DoR met) | [%] | > 60% | [OK/WARN/FAIL] |

## Recommended Actions
1. [Specific action]
2. [Specific action]
```

### 5. Ask Human for Decisions

For items that require judgment:
- Zombie stories: "Should we remove [story] from the backlog?"
- Priority conflicts: "These stories overlap — which takes priority?"
- Scope questions: "Is [story] still relevant to the current vision?"

Never delete or deprioritize without human confirmation.
