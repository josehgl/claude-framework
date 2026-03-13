---
name: persona-builder
description: >
  Creates or updates user personas from available data, user interviews, or
  collaborative discovery with the human. Use during product discovery,
  before designing features, or when user context is missing from stories.
user-invocable: true
allowed-tools: Read, Grep, Glob, WebSearch, WebFetch, AskUserQuestion
---

# Persona Builder

Create a research-backed persona through structured conversation with the human.

## Inputs

Check what's available:
- Existing personas in the project (search `docs/`, `personas/`, `product-owner/`)
- Epic briefs or JTBD analysis (from Product Strategist)
- Analytics or user data (if accessible)
- The human's direct knowledge of users

## Process

### 1. Interview the Human

Ask these questions, adapting based on answers:

**Demographics & Context:**
- Who is the primary user we're building for?
- What is their job title or role?
- What's their technical skill level? (novice / intermediate / expert)
- What environment do they work in? (team size, tools, pace)

**Goals & Motivations:**
- What are they trying to achieve with our product?
- What does success look like for them personally?
- What motivates them beyond the functional task?

**Frustrations & Pain Points:**
- What frustrates them most about the current process?
- Where do they waste time or effort?
- What have they tried that didn't work?

**Behavior & Workflows:**
- Walk me through their typical workflow related to our product
- What tools do they currently use?
- How often do they encounter this problem?

**Validation:**
- Is this based on real user observation or assumption?
- How many users match this profile (roughly)?

### 2. Synthesize Persona

```markdown
# Persona: [Name]

## Profile
- **Role**: [job title or function]
- **Context**: [environment, team size, industry]
- **Technical level**: [novice / intermediate / expert]
- **Frequency of use**: [daily / weekly / occasional]

## Goals
- **Primary**: [main objective]
- **Secondary**: [supporting goals]

## Frustrations
1. [Pain point] — *[evidence: observed / reported / assumed]*
2. [Pain point] — *[evidence]*
3. [Pain point] — *[evidence]*

## Current Workflow
1. [Step] — *[tool/method used]*
2. [Step] — *[where friction occurs]*
3. [Step] — *[workaround if any]*

## Quote
"[A sentence that captures their mindset — written from their voice]"

## Behavioral Triggers
- Uses our product when: [specific trigger]
- Abandons when: [frustration threshold]
- Delighted when: [positive surprise]

## Validation Status
- [ ] Based on real user data / interviews
- [ ] Reviewed by human with domain knowledge
- [ ] Covers < 3 personas total for this product
```

### 3. Quality Check

Verify the persona against anti-patterns:

| Anti-Pattern | Check |
|-------------|-------|
| Fantasy persona | Is every frustration backed by evidence? |
| Too generic | Could this describe anyone? (bad) or a specific segment? (good) |
| Too many personas | Are we over 3 primary personas? |
| No frustrations | Does it have real, specific pain points? |
| Static | Is there a plan to update as we learn more? |

### 4. Connect to Product

Link the persona to existing artifacts:
- Which epic briefs reference this user segment?
- Which JTBD maps to this persona?
- What stories will this persona inform?

Ask: "Does this persona feel real? Would you recognize this person?"
