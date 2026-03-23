---
name: architecture-decision
description: >
  Produces an Architecture Decision Record (ADR) for technical trade-offs.
  Analyzes existing codebase patterns, evaluates options, and documents the
  decision. Use when a feature needs design guidance.
user-invocable: true
allowed-tools: Read, Grep, Glob, Bash, WebSearch, WebFetch, Write, AskUserQuestion
---

# Architecture Decision

Evaluate a technical trade-off and produce an ADR.

## Inputs

- Decision to make (what technical question needs answering?)
- Context (what feature or problem prompted this?)
- Constraints (performance, compatibility, team expertise, timeline)

## Process

### 1. Understand the Context

Ask the human:
- "What are you trying to achieve?"
- "What constraints matter most? (performance, simplicity, maintainability)"
- "Are there existing patterns in this codebase I should follow?"

### 2. Analyze Existing Patterns

Scan the codebase for relevant patterns:

```bash
# Find similar implementations
Grep "[pattern]" --type=[lang]

# Check project structure
Glob "src/**/*"

# Check dependencies
Read package.json  # or pyproject.toml, go.mod
```

**Critical rule**: never introduce a new pattern if an existing one works.

### 3. Evaluate Options

For each viable approach:

| Criterion | Option A | Option B | Option C |
|-----------|---------|---------|---------|
| Complexity | [low/med/high] | | |
| Performance | [impact] | | |
| Maintainability | [easy/mod/hard] | | |
| Testing | [easy/mod/hard] | | |
| Codebase consistency | [yes/no] | | |
| Migration effort | [none/low/high] | | |
| Team familiarity | [high/med/low] | | |

### 4. Research (if needed)

For unfamiliar patterns or libraries:
- `WebSearch` for best practices and benchmarks
- Check library health (maintenance, downloads, issues)
- Look for known pitfalls

### 5. Produce ADR

```markdown
# ADR: [short decision title]

## Status
Proposed

## Context
[What is the technical challenge? Why does this decision matter?
What are the constraints?]

## Options Considered

### Option A: [name]
[Description, pros, cons]

### Option B: [name]
[Description, pros, cons]

## Decision
[What was chosen and WHY. Be specific.]

## Consequences

### Positive
- [benefit]

### Negative
- [trade-off]

## Implementation Guidance
[Specific instructions for the Implementer:
- What files to create/modify
- What patterns to follow
- What to avoid
- Example code structure if helpful]
```

### 6. Present and Decide

Present the ADR to the human:
- Recommend one option with clear reasoning
- Explain what you'd give up with each alternative
- Ask for approval before the Implementer begins

Save approved ADR to `docs/adr/` directory.
