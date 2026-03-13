---
name: impact-mapping
description: >
  Creates an impact map connecting business goals to actors, impacts, and
  deliverables. Use when prioritizing features, aligning team on strategy,
  or deciding what NOT to build.
user-invocable: true
allowed-tools: Read, Grep, Glob, AskUserQuestion
---

# Impact Mapping

Build an impact map (Gojko Adzic method) to connect goals to deliverables.

## Inputs

Gather from the human:
- The business goal or product goal (measurable)
- Known user segments / actors
- Existing epic briefs (if available)

## Process

### 1. Define the Goal (center of the map)

The goal must be:
- **Measurable**: has a number or clear success condition
- **Time-bound**: has a deadline or sprint target
- **Not a solution**: "increase retention by 20%" not "build notifications"

Ask: "What does success look like in measurable terms?"

If the human gives a solution ("build X"), ask "What problem does X solve? What metric would improve?"

### 2. Identify Actors (first level)

Who can help us reach the goal or prevent us from reaching it?

Categories:
- **Primary users**: directly use the product
- **Secondary users**: affected by or support primary users
- **Negative actors**: who could prevent success? (competitors, regulations)

Ask: "Who are the key people involved in achieving [goal]?"

### 3. Define Impacts (second level)

For each actor, what behavior change do we need?

Format: "[Actor] should [behavior change]"

Rules:
- Impacts are behavior changes, not features
- Ask "How should [actor]'s behavior change to help reach [goal]?"
- Include negative impacts: "What should [actor] stop doing?"

### 4. Map Deliverables (third level)

For each impact, what could we build to create that behavior change?

Rules:
- List multiple options per impact (we'll prioritize later)
- Deliverables are potential solutions, not commitments
- Include non-software options (process changes, documentation, support)

### 5. Produce the Map

```markdown
# Impact Map: [Goal]

## Goal
[Measurable goal with target and timeframe]

## Map

### Actor: [Actor 1]
**Impact**: [behavior change needed]
- Deliverable: [option A]
- Deliverable: [option B]
- Deliverable: [option C]

**Impact**: [another behavior change]
- Deliverable: [option A]
- Deliverable: [option B]

### Actor: [Actor 2]
**Impact**: [behavior change needed]
- Deliverable: [option A]
- Deliverable: [option B]

## Prioritization

| Deliverable | Impact | Actor | Effort | Confidence | Priority |
|-------------|--------|-------|--------|------------|----------|
| [deliverable] | [impact] | [actor] | S/M/L | High/Med/Low | [1-N] |

## What We're NOT Building (and why)
- [Deliverable X]: [reason — low confidence, high effort, etc.]

## Assumptions to Validate
- [Assumption about actor behavior]
- [Assumption about impact]
```

### 6. Facilitate Decision

Ask the human:
- "Which impacts are most critical to the goal?"
- "Which deliverables have the highest confidence?"
- "What should we explicitly NOT build?"

The map is a thinking tool, not a commitment. It evolves.
