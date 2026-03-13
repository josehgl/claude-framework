# INVEST Criteria — Reference

## The Six Criteria

Every user story should satisfy all six INVEST criteria before entering a sprint.

### I — Independent

The story can be developed, tested, and deployed without depending on another story being done first.

**Test**: "Can we deliver this story if we drop all other stories from the sprint?"

| Good | Bad |
|------|-----|
| "User can register with email" | "Build registration API" (needs frontend to be valuable) |
| Self-contained end-to-end | Depends on another story to deliver value |

**When dependencies exist**: document them explicitly and try to reorder or merge.

### N — Negotiable

The story describes the WHAT, not the HOW. Implementation details are negotiated during development.

**Test**: "Could the team implement this in a completely different way and still satisfy the AC?"

| Good | Bad |
|------|-----|
| "User can search for products by name" | "Implement ElasticSearch for product search" |
| Describes desired behavior | Prescribes implementation |

**PO specifies the outcome. Dev chooses the approach.**

### V — Valuable

The story delivers value to a user or stakeholder. Not to the dev team, not to the codebase.

**Test**: "Would a user notice or care if we shipped this?"

| Good | Bad |
|------|-----|
| "User can reset their forgotten password" | "Set up database migrations" |
| "Admin can view monthly revenue report" | "Refactor the utils folder" |

**If it's not valuable to a user**: it's a task, not a story. Tasks are fine but don't pretend they're stories.

### E — Estimable

The team can estimate the effort with reasonable confidence.

**Test**: "Can the team give a story point estimate without major caveats?"

If not estimable:
- Story is too vague → add detail or split
- Unknown technology → create a spike first
- Too large to estimate → split into smaller stories

### S — Small

The story fits comfortably in a sprint. Ideally 1-5 story points.

| Size | Action |
|------|--------|
| 1-3 points | Ideal |
| 5 points | Acceptable |
| 8 points | Consider splitting |
| 13+ points | Must split |

**Use the story-splitter skill** with SPIDR patterns when stories are too large.

### T — Testable

You can write acceptance criteria that prove the story is done.

**Test**: "Can I write a Given/When/Then scenario for this?"

| Good | Bad |
|------|-----|
| "Then the confirmation email is sent within 5 minutes" | "Then the email system is reliable" |
| "Then the page loads in under 2 seconds" | "Then performance is good" |

**If it's not testable**: the requirement is too vague. Ask "how would we know this is done?"

## Quick Checklist

Use this when reviewing any story:

```
[ ] Independent — can be delivered alone
[ ] Negotiable — describes what, not how
[ ] Valuable    — a user would care
[ ] Estimable   — team can size it
[ ] Small       — fits in a sprint (≤ 5 pts ideal)
[ ] Testable    — can write Given/When/Then
```

## Common Failure Patterns

| Pattern | INVEST Violation | Fix |
|---------|-----------------|-----|
| "Build the API" | Not Valuable, Not Independent | Vertical slice instead |
| "Make it fast" | Not Testable, Not Estimable | Define measurable criteria |
| "As a developer, I want to refactor..." | Not Valuable (to user) | Reframe as user benefit or track as task |
| 40-point epic | Not Small, Not Estimable | Split with SPIDR |
| "Implement using Redis" | Not Negotiable | Remove implementation detail |
