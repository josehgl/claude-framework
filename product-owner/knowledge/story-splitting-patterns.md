# Story Splitting Patterns — Reference

## SPIDR Framework

Five strategies for splitting large stories. Try them in order.

### S — Spike

**When**: You don't know enough to estimate or build.

Split into:
1. **Spike** (timeboxed research): answer a specific question
2. **Story** (implementation): build with the knowledge gained

```
BEFORE: "Implement AI-powered search" (? points)
AFTER:
  Spike: "Evaluate 3 search approaches and recommend one" (2 pts, 2 days max)
  Story: "Implement search using [chosen approach]" (5 pts)
```

Rules for spikes:
- Always timeboxed (1-3 days max)
- Output is a decision or recommendation, not code
- Spike is done when the question is answered, even if the answer is "we can't do this"

### P — Path (workflow)

**When**: Multiple user paths through the same feature.

Split by each distinct path:
- Happy path first
- Then alternate success paths
- Then error paths

```
BEFORE: "User can pay for order"
AFTER:
  "User pays with saved credit card" (3 pts)
  "User pays with new credit card" (5 pts)
  "User pays with PayPal" (3 pts)
```

### I — Interface

**When**: Same logic, different surfaces.

Split by interface or platform:
- Web, mobile, API, email, CLI
- Admin view vs user view
- Embedded vs standalone

```
BEFORE: "User receives notifications"
AFTER:
  "User sees in-app notification badge" (3 pts)
  "User receives email notification" (3 pts)
  "User receives push notification" (5 pts)
```

### D — Data

**When**: Different data types or complexity levels.

Split by data variation:
- Simple data first, complex later
- One format first, then others
- Core fields first, optional fields later

```
BEFORE: "Import contacts from any source"
AFTER:
  "Import contacts from CSV" (3 pts)
  "Import contacts from Google Contacts API" (5 pts)
  "Import contacts from vCard" (3 pts)
```

### R — Rule (business rules)

**When**: Multiple business rules add complexity.

Split by rule complexity:
- Basic rules first
- Edge cases and exceptions later
- Regulatory requirements separately

```
BEFORE: "Calculate shipping cost"
AFTER:
  "Calculate flat-rate domestic shipping" (2 pts)
  "Calculate weight-based shipping" (3 pts)
  "Apply free shipping for orders over $50" (2 pts)
  "Calculate international shipping with duties" (5 pts)
```

## INVEST Validation

Every split story must pass:

| Letter | Criterion | Test |
|--------|-----------|------|
| **I** | Independent | Can be built without other split stories? |
| **N** | Negotiable | Scope can be adjusted in discussion? |
| **V** | Valuable | Delivers user value on its own? |
| **E** | Estimable | Team can give a point estimate? |
| **S** | Small | Fits in one sprint? (1-5 pts ideal) |
| **T** | Testable | Can write Given/When/Then for it? |

**Most common failure**: not independently **Valuable**. "Build the backend" and "Build the frontend" are not independently valuable — neither delivers user value alone.

## Better Vertical Slicing

Instead of splitting by layer (frontend/backend/database), split by thin vertical slices:

```
BAD (horizontal):
  "Build the API for user profiles" (no user value alone)
  "Build the UI for user profiles" (no user value alone)

GOOD (vertical):
  "User can view their profile name and email" (thin end-to-end)
  "User can update their profile name" (thin end-to-end)
  "User can upload a profile photo" (thin end-to-end)
```

Each vertical slice touches all layers but delivers complete user value.

## When NOT to Split

- Story is already 1-3 points
- Splitting would create stories that aren't independently valuable
- The complexity is inherent and can't be decomposed (rare — challenge this assumption)
