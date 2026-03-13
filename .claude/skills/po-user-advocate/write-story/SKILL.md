---
name: write-story
description: >
  Generates a complete user story with acceptance criteria in Given/When/Then
  format. Takes inputs from other PO agents (epic brief, persona, domain rules,
  edge cases) and produces a sprint-ready story. Use when creating new stories.
user-invocable: true
allowed-tools: Read, Grep, Glob, AskUserQuestion, Write
---

# Write Story

Create a complete, sprint-ready user story with acceptance criteria.

## Inputs

Gather available context:
- Epic brief (from Product Strategist)
- Persona (from UX Researcher)
- Domain rules (from Domain Expert / rule-catalog)
- Edge cases (from edge-case-storm)
- Human's description of the desired behavior

Minimum required: a description of what to build. Everything else enriches quality.

## Process

### 1. Clarify Scope

Ask the human:
- "What should the user be able to do?" (the action)
- "Why does this matter to them?" (the benefit)
- "What persona is this for?" (if personas exist)
- "What should this story NOT cover?" (out of scope)

If the feature is large, suggest splitting before writing AC (see story-splitter skill).

### 2. Write the User Story

```markdown
# Story: [concise title — verb + noun]

## User Story
As a [persona name or role],
I want to [specific action],
so that [measurable or observable benefit].

## Context
- **Epic**: [parent epic name or "standalone"]
- **Persona**: [persona name or link]
- **Business rules**: [relevant rule IDs from catalog, or "none identified"]
```

### 3. Write Acceptance Criteria

Write scenarios in this order:
1. **Happy path** — the main success scenario
2. **Alternate paths** — valid but less common flows
3. **Edge cases** — boundary conditions (from edge-case-storm if available)
4. **Error cases** — invalid inputs, permission failures, system errors

Each scenario:

```gherkin
### Scenario: [descriptive name — what is being tested]
Given [complete initial state — no missing context]
  And [additional context if needed]
When [exactly one action]
Then [observable, testable outcome]
  And [additional outcomes if needed]
```

Quality rules for each line:
- **Given**: complete context — reader knows exactly the starting state
- **When**: single action — if you write "and", consider splitting
- **Then**: observable — can be checked in a test assertion
- No implementation words (database, API, component, endpoint, SQL)
- No ambiguous words (quickly, properly, correctly, appropriate, relevant)
- Domain terms must match glossary

### 4. Define Boundaries

```markdown
## Out of Scope
- [Explicitly what this story does NOT cover]
- [Related work deferred to another story]

## Dependencies
- [Stories that must be completed before this one]
- [External services or decisions needed]

## Estimation
- Story points: [suggest based on complexity, ask human to confirm]
```

### 5. Self-Review

Before presenting to the human, check every scenario against:

| # | Check | Pass? |
|---|-------|-------|
| 1 | Given/When/Then format | |
| 2 | Given has complete context | |
| 3 | When has exactly one action | |
| 4 | Then is observable and testable | |
| 5 | No ambiguous words | |
| 6 | No implementation details | |
| 7 | Scenario is independent | |
| 8 | Domain terms match glossary | |

Also verify:
- [ ] At least 1 happy path
- [ ] At least 1 error/edge case
- [ ] Out of scope defined
- [ ] Story is small enough (< 8 points suggested)

### 6. Present and Iterate

Show the complete story to the human. Ask:
- "Does the user story statement capture the intent?"
- "Are the acceptance criteria complete?"
- "Is anything out of scope that should be in scope (or vice versa)?"
- "Does the estimate feel right?"

Iterate until the human approves. Then the story is ready for Gate 1 validation.
