---
name: figma-review-design
description: >
  Reviews Figma designs against user stories and acceptance criteria. Checks
  that designs cover all scenarios, respect domain rules, and match persona needs.
  Use before development starts on a UI story.
user-invocable: true
allowed-tools: Read, Grep, Glob, WebFetch, AskUserQuestion
---

# Review Figma Design

Compare a Figma design against its corresponding story and AC.

## Inputs

- Figma file/frame URL or reference
- The corresponding user story with AC
- Persona(s) relevant to this design
- Any design system / component library reference

## Process

### 1. Gather Context

Collect:
- The user story and all its AC scenarios
- The persona this design serves
- Relevant business rules from the domain expert
- Edge cases identified for this story

### 2. Access the Design

Request the Figma link from the human. Use the Figma MCP to access design details if available, or ask the human to describe/screenshot the design.

If Figma MCP is available:
- Fetch the file/frame metadata
- Get component details, text content, and structure

If Figma MCP is NOT available:
- Ask the human to share a screenshot or describe the key screens
- Work from the description

### 3. Check AC Coverage

For each AC scenario, verify the design addresses it:

```markdown
## AC Coverage Check

| Scenario | Design Covers It? | Notes |
|----------|--------------------|-------|
| [happy path scenario] | YES / NO / PARTIAL | [what's shown/missing] |
| [edge case scenario] | YES / NO / PARTIAL | [what's shown/missing] |
| [error scenario] | YES / NO / PARTIAL | [what's shown/missing] |
```

Common gaps:
- Error states not designed (form validation, empty states, 404)
- Loading states missing
- Edge cases not considered (long text, missing data, many items)

### 4. Check Persona Fit

Evaluate against the persona:

| Check | Assessment |
|-------|-----------|
| Matches technical level | Does the UI complexity suit [novice/intermediate/expert]? |
| Addresses primary goal | Is the main action prominent and easy to find? |
| Addresses frustrations | Does the design avoid known pain points? |
| Workflow alignment | Does the flow match the persona's mental model? |

### 5. Check Design Quality

| Check | Status | Notes |
|-------|--------|-------|
| Empty states | Designed? | What shows when there's no data? |
| Loading states | Designed? | What shows during async operations? |
| Error states | Designed? | Form errors, API errors, permission errors |
| Responsive | Considered? | Mobile, tablet, desktop variants |
| Accessibility | Considered? | Contrast, font size, interactive targets |
| Consistency | With design system? | Using established components? |
| Copy/Text | Final? | Real text vs lorem ipsum? |

### 6. Produce Review

```markdown
# Design Review: [Story Name]

## Design: [Figma link or reference]
## Story: [story reference]

## Overall: APPROVED / NEEDS CHANGES / BLOCKED

## AC Coverage
| Scenario | Covered | Gap |
|----------|---------|-----|
| [scenario] | [status] | [gap if any] |

## Persona Fit: [Good / Needs Work]
- [Assessment details]

## Missing States
- [ ] [Missing state 1 — e.g., empty state for list]
- [ ] [Missing state 2 — e.g., error state for form]

## Recommendations
1. [Specific, actionable recommendation]
2. [Specific, actionable recommendation]

## Questions for Designer
- [Question about design intent or missing information]

## Verdict
[Ready for development / Needs [N] changes before dev can start]
```

### 7. Follow Up

If changes are needed:
- Ask the human to update the Figma design
- Offer to re-review after changes
- When approved, note the approval in the GitHub Issue
