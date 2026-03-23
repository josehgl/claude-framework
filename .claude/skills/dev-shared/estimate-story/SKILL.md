---
name: estimate-story
description: >
  Estimates a user story in Fibonacci story points based on complexity analysis.
  Considers AC count, integration depth, and historical velocity. Use during
  sprint planning or when a story needs sizing.
user-invocable: true
allowed-tools: Read, Grep, Glob, AskUserQuestion
---

# Estimate Story

Estimate a story in story points (Fibonacci scale).

## Inputs

- Story with acceptance criteria
- Optional: project velocity history (from `docs/framework/velocity.md`)
- Optional: similar completed stories for comparison

## Process

### 1. Complexity Analysis

Assess each factor:

| Factor | Low (1-2) | Medium (3-5) | High (8-13) |
|--------|-----------|-------------|-------------|
| AC scenarios | 1-3 | 4-6 | 7+ |
| Files to change | 1-2 | 3-5 | 6+ |
| New code vs modification | Modification only | Mix | Mostly new |
| External integrations | None | 1 | 2+ |
| Data model changes | None | Add fields | New tables/schemas |
| UI complexity | None or minor | New component | New page/flow |
| Domain complexity | Well-understood | Some unknowns | Many unknowns |

### 2. Fibonacci Mapping

| Points | Meaning |
|--------|---------|
| 1 | Trivial: one file, one function, no risk |
| 2 | Simple: few files, clear approach, low risk |
| 3 | Moderate: several files, some decisions, some risk |
| 5 | Complex: multiple modules, design decisions, moderate risk |
| 8 | Very complex: significant effort, integration, high risk |
| 13 | Epic-sized: consider splitting before attempting |

### 3. Splitting Check

If estimate > 8 points:
- Suggest using story-splitter (SPIDR patterns)
- Identify which AC scenarios can be separated
- Ask the human if splitting makes sense

### 4. Output

```markdown
## Estimation: [story title]

| Factor | Assessment |
|--------|-----------|
| AC scenarios | [N] |
| Files affected | ~[N] |
| Code type | [new / modification / mix] |
| Integrations | [list or none] |
| Data model | [no change / add fields / new entities] |
| Unknowns | [list or none] |

**Estimate: [N] story points**

**Rationale**: [1-2 sentences explaining the estimate]

[If > 8: "Consider splitting this story. See story-splitter skill."]
```

Ask the human: "Does this estimate feel right?"
