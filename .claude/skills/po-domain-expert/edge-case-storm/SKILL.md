---
name: edge-case-storm
description: >
  Systematic edge case discovery for a user story. Walks through boundary,
  state, time, concurrency, and integration categories to find scenarios
  the happy path misses. Use when writing or reviewing AC.
user-invocable: true
allowed-tools: Read, Grep, Glob, AskUserQuestion
---

# Edge Case Storm

Systematically discover edge cases for a story using structured categories.

## Inputs

- The user story or feature description
- Existing AC (if any)
- Relevant business rules (from rule-catalog or Domain Expert)

## Process

### 1. Understand the Story

Read the story and its AC. Identify:
- The core entity being acted upon
- The main action/operation
- The expected inputs and outputs
- The actors involved

### 2. Walk Through Each Category

For each category, generate potential edge cases. Not all categories apply to every story — skip those that don't.

#### Boundary Values
- What happens at zero? At one? At maximum?
- Empty string vs null vs whitespace?
- Minimum and maximum length/size?
- Just below and just above limits?
- Negative numbers where only positive expected?

#### State Transitions
- Entity doesn't exist yet?
- Entity already exists (duplicate)?
- Entity is in a deleted/archived/disabled state?
- Entity is in a transitional state (processing, pending)?
- State change already happened (idempotency)?

#### Permissions & Access
- User not authenticated?
- User authenticated but not authorized?
- User's permissions change mid-operation?
- Admin vs regular user behavior differences?
- Shared resource with different access levels?

#### Time & Scheduling
- Midnight, end of month, end of year?
- Timezone differences (UTC vs local)?
- Daylight Saving Time transitions?
- Expired tokens, sessions, or deadlines?
- Race condition: same action at the same millisecond?

#### Concurrency
- Two users editing the same entity simultaneously?
- Request submitted twice (double-click, retry)?
- Background job and user action on same data?
- Optimistic locking conflict?

#### Integration & External Dependencies
- External service is down or unreachable?
- External service responds slowly (timeout)?
- External service returns unexpected data format?
- Webhook/callback arrives out of order?
- Partial success (2 of 3 operations succeed)?

#### Data Quality
- Unicode characters, emojis, RTL text?
- Very long input (10x expected)?
- Special characters (quotes, slashes, HTML)?
- Malicious input (XSS, SQL injection patterns)?
- File upload: wrong format, too large, corrupted?

### 3. Prioritize

Rate each discovered edge case:

| Priority | Criteria |
|----------|---------|
| **Must have** | Could cause data loss, security issue, or crash |
| **Should have** | Visible user-facing error or bad experience |
| **Could have** | Minor inconvenience, cosmetic issue |

### 4. Produce Edge Case Report

```markdown
# Edge Cases: [Story Name]

## Story Summary
[One-line description of the story]

## Edge Cases Found

### Must Have (include in AC)
| # | Category | Scenario | Expected Behavior |
|---|----------|----------|-------------------|
| 1 | [category] | [what happens] | [what should happen] |
| 2 | [category] | [what happens] | [what should happen] |

### Should Have (include if scope allows)
| # | Category | Scenario | Expected Behavior |
|---|----------|----------|-------------------|
| 3 | [category] | [what happens] | [what should happen] |

### Could Have (defer to future)
| # | Category | Scenario | Expected Behavior |
|---|----------|----------|-------------------|
| 4 | [category] | [what happens] | [what should happen] |

## Categories Not Applicable
- [Category]: [why it doesn't apply to this story]

## Questions for Human
- [Any edge case where the expected behavior is unclear]
```

### 5. Feed Into AC

For "Must Have" edge cases, suggest Given/When/Then scenarios:

```gherkin
Scenario: [edge case description]
  Given [the specific context that creates the edge case]
  When [the action that triggers it]
  Then [the expected handling]
```

Ask the User Advocate agent or the human to incorporate these into the story's AC.
