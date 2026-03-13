---
name: journey-mapping
description: >
  Maps a user journey for a specific workflow, identifying stages, actions,
  emotions, pain points, and opportunities. Use before designing features
  or when understanding the current user experience.
user-invocable: true
allowed-tools: Read, Grep, Glob, AskUserQuestion
---

# Journey Mapping

Map the end-to-end user experience for a specific workflow.

## Inputs

Required:
- Which persona is taking this journey
- Which workflow or task to map
- Whether to map the current state (as-is) or desired state (to-be)

Check for existing:
- Personas (from persona-builder)
- Epic briefs (from product-discovery)
- Any existing journey maps in the project

## Process

### 1. Define the Journey Scope

Ask the human:
- "What task or workflow should we map?"
- "Where does it start? (the trigger)"
- "Where does it end? (the success state)"
- "Are we mapping the current experience or the ideal one?"

Default to **current state (as-is)** — understand reality before designing the future.

### 2. Walk Through the Journey

Guide the human through each stage. For each step ask:
- "What does [persona] do next?"
- "What are they thinking at this point?"
- "How are they feeling?" (frustrated, confident, confused, anxious)
- "Where does friction happen?"
- "What could go wrong here?"

### 3. Produce the Journey Map

```markdown
# Journey Map: [task name]

**Persona**: [name]
**Type**: As-Is / To-Be
**Scope**: From [trigger] to [end state]

## Journey

| Stage | Action | Thinking | Feeling | Pain Point | Opportunity |
|-------|--------|----------|---------|------------|-------------|
| Trigger | [what starts the journey] | [internal thought] | [emotion] | [friction if any] | [how we could help] |
| Step 1 | [what they do] | [thought] | [emotion] | [pain] | [opportunity] |
| Step 2 | [what they do] | [thought] | [emotion] | [pain] | [opportunity] |
| Step 3 | [what they do] | [thought] | [emotion] | [pain] | [opportunity] |
| Outcome | [end state] | [thought] | [emotion] | [pain] | [opportunity] |

## Emotional Arc
[Describe the overall emotional trajectory — where are the highs and lows?]

## Critical Moments
1. **[Moment]**: [Why this is make-or-break for the experience]
2. **[Moment]**: [Why this matters]

## Top Pain Points (prioritized)
1. [Pain point] — Stage: [stage], Severity: High/Med/Low
2. [Pain point] — Stage: [stage], Severity: High/Med/Low
3. [Pain point] — Stage: [stage], Severity: High/Med/Low

## Opportunities Summary
1. [Opportunity] — addresses pain point [#]
2. [Opportunity] — addresses pain point [#]

## Assumptions & Gaps
- ASSUMPTION: [something we believe but haven't verified]
- GAP: [missing information about user behavior]
```

### 4. Validate

Ask the human:
- "Does this journey feel accurate?"
- "Am I missing any steps?"
- "Which pain point is the most critical to address?"
- "Are the emotions right — is this how users actually feel?"

### 5. Connect to Backlog

Identify which stories or epics could address the top pain points.
If stories don't exist yet, recommend creating them.
