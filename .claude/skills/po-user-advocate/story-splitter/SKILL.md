---
name: story-splitter
description: >
  Splits large user stories into smaller, independently deliverable stories
  using SPIDR patterns. Use when a story is too large (> 8 points), touches
  too many concerns, or can't fit in a sprint.
user-invocable: true
allowed-tools: Read, Grep, Glob, AskUserQuestion
---

# Story Splitter

Split a large story into smaller, independently valuable stories using SPIDR.

## Inputs

- The story to split (file or description)
- Why it needs splitting (too large, too complex, multiple concerns)

## Process

### 1. Assess the Story

Read the story and determine:
- Current estimate (if available)
- Number of scenarios in AC
- Number of distinct concerns or features
- Dependencies between parts

### 2. Apply SPIDR Patterns

Try each splitting strategy. Not all apply — use the one that fits best.

#### S — Spike
**When**: Technical uncertainty is the blocker.
**How**: Split into a research spike + implementation story.

```
BEFORE: "As a user, I want to search products with AI-powered recommendations"
AFTER:
  - Spike: "Research AI recommendation approaches and select one" (1-2 pts)
  - Story: "As a user, I want to search products with [chosen approach]" (5 pts)
```

#### P — Path
**When**: Multiple user paths through the same feature.
**How**: Split by workflow path (happy path first, then alternates).

```
BEFORE: "As a user, I want to check out with various payment methods"
AFTER:
  - "As a user, I want to check out with credit card" (3 pts)
  - "As a user, I want to check out with PayPal" (3 pts)
  - "As a user, I want to check out with bank transfer" (3 pts)
```

#### I — Interface
**When**: Same behavior, different interfaces or platforms.
**How**: Split by interface (web, mobile, API, email).

```
BEFORE: "As a user, I want to receive notifications about order status"
AFTER:
  - "As a user, I want to see order status notifications in-app" (3 pts)
  - "As a user, I want to receive order status notifications by email" (3 pts)
```

#### D — Data
**When**: Different data types or data complexity levels.
**How**: Split by data variation (simple first, complex later).

```
BEFORE: "As a user, I want to import my contacts"
AFTER:
  - "As a user, I want to import contacts from a CSV file" (3 pts)
  - "As a user, I want to import contacts from Google Contacts" (5 pts)
  - "As a user, I want to import contacts from vCard files" (3 pts)
```

#### R — Rule
**When**: Multiple business rules add complexity.
**How**: Split by rule (basic rules first, complex rules later).

```
BEFORE: "As a user, I want the system to calculate shipping costs"
AFTER:
  - "...calculate flat-rate domestic shipping" (2 pts)
  - "...calculate weight-based domestic shipping" (3 pts)
  - "...calculate international shipping with customs" (5 pts)
```

### 3. Validate Each Split Story

Each resulting story must pass INVEST:

| Criterion | Check |
|-----------|-------|
| **I**ndependent | Can be developed and deployed alone? |
| **N**egotiable | Scope can be discussed? |
| **V**aluable | Delivers value to a user on its own? |
| **E**stimable | Team can estimate it? |
| **S**mall | Fits in a sprint? (ideally 1-5 points) |
| **T**estable | Can write AC for it? |

The most common failure: stories that aren't independently **Valuable**. A story that only delivers half a feature is not independently valuable.

### 4. Produce Split Proposal

```markdown
# Story Split: [Original Story Name]

## Original
- **Title**: [original title]
- **Estimate**: [original points]
- **Reason for split**: [too large / too complex / multiple concerns]

## Splitting Strategy: [SPIDR letter — Pattern Name]

## Proposed Stories

### Story 1: [title]
As a [persona], I want to [action], so that [benefit].
- **Estimate**: [points]
- **Value**: [what the user gets from this alone]
- **Dependencies**: none / [story N]

### Story 2: [title]
As a [persona], I want to [action], so that [benefit].
- **Estimate**: [points]
- **Value**: [what the user gets]
- **Dependencies**: [story 1] / none

### Story 3: [title] (if needed)
...

## Delivery Order
1. [Story 1] — delivers [core value]
2. [Story 2] — adds [additional value]
3. [Story 3] — adds [additional value]

## What We Preserved
- Total scope is equivalent to original
- Each story is independently valuable
- AC can be written for each story separately
```

### 5. Get Human Approval

Ask:
- "Does this split make sense?"
- "Is each story independently valuable?"
- "Should we adjust the delivery order?"

After approval, each split story goes through the normal write-story process.
