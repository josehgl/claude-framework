---
name: empathy-mapping
description: >
  Quick empathy mapping exercise: captures what a persona thinks, feels, says,
  and does in a specific situation. Use for rapid user understanding when a full
  journey map is overkill, or to enrich an existing persona.
user-invocable: true
allowed-tools: Read, Grep, Glob, AskUserQuestion
---

# Empathy Mapping

Build a quick empathy map to deepen understanding of a persona in a specific context.

## Inputs

- Which persona (existing or describe on the fly)
- Which situation or scenario to explore

## Process

### 1. Set the Scene

Ask: "Picture [persona] in the moment when [situation]. Let's explore what's happening for them."

### 2. Four Quadrants

Guide the human through each quadrant:

**THINKS** — What's going on in their head?
- What are their concerns?
- What occupies their thoughts?
- What are they weighing or deciding?

**FEELS** — What emotions are present?
- Frustrated? Anxious? Confident? Overwhelmed?
- What's driving that emotion?
- What would change how they feel?

**SAYS** — What would they actually say out loud?
- To colleagues, to themselves, to support?
- Exact words or phrases they'd use
- What they complain about

**DOES** — What observable actions do they take?
- Specific behaviors and workarounds
- Tools they reach for
- Habits (good and bad)

### 3. Produce Empathy Map

```markdown
# Empathy Map: [Persona] — [Situation]

## Context
[One sentence describing the specific moment we're exploring]

## THINKS
- [thought 1]
- [thought 2]
- [thought 3]

## FEELS
- [emotion 1] — because [reason]
- [emotion 2] — because [reason]

## SAYS
- "[quote 1]"
- "[quote 2]"
- "[quote 3]"

## DOES
- [action 1]
- [action 2]
- [action 3]

## Key Insight
[The single most important thing we learned about this persona in this situation]

## Design Implication
[What this means for our product — one specific recommendation]
```

### 4. Validate

Ask: "Does this feel true to the real users you know?"

Flag any quadrant where the human says "I'm guessing" as an assumption to validate.

### 5. Update Persona

If this reveals new insights, suggest updating the persona file with:
- New frustrations discovered
- Behavioral triggers identified
- Quotes to add to the persona
