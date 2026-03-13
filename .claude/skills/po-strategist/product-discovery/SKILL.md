---
name: product-discovery
description: >
  Runs a full product discovery session: problem validation, JTBD analysis, user
  segment definition, and epic brief generation. Use at project kickoff, when
  exploring a new product area, or when pivoting direction.
user-invocable: true
allowed-tools: Read, Grep, Glob, WebSearch, WebFetch, AskUserQuestion
---

# Product Discovery

Guide a structured discovery session to validate the problem and produce an epic brief.

## Inputs

Ask the human for whatever is available:
- Product idea or feature description (even vague is OK)
- Target users (if known)
- Existing research, competitors, or references
- Any constraints (budget, timeline, technology)

If the human has very little, that's fine — discovery is designed for ambiguity.

## Process

### Phase 1: Problem Space (diverge)

Interview the human with these questions. Adapt based on answers — skip what's already clear, dig deeper into what's vague.

**Who:**
- Who has this problem? Be as specific as possible (role, context, frequency).
- Are there multiple user segments? Which is primary?

**What:**
- What is the pain or frustration today?
- What triggers this pain? (specific moment, not general)
- How severe is it? (annoying vs blocking vs costly)

**Current behavior:**
- How do users solve this today? (workarounds, manual processes, competing tools)
- What's wrong with the current solution?
- What have they tried that didn't work?

**Why now:**
- Why solve this now? What changed?
- What's the cost of NOT solving it?

### Phase 2: JTBD Framing (converge)

From the interview, formulate the core job:

```
When [situation/trigger],
I want to [motivation/action],
so I can [expected outcome/benefit].
```

Validate with human: "Does this capture the core job?"

Then identify:
- **Functional job**: the practical task to accomplish
- **Emotional job**: how the user wants to feel
- **Social job**: how the user wants to be perceived (if applicable)

### Phase 3: Strategic Assessment

Evaluate:

| Dimension | Assessment |
|-----------|-----------|
| Problem severity | Low / Medium / High / Critical |
| User segment size | Niche / Growing / Large / Mass |
| Current alternatives | None / Weak / Strong / Entrenched |
| Build complexity (gut feel) | Simple / Moderate / Complex / Uncertain |
| Strategic alignment | Core / Supporting / Exploratory |

### Phase 4: Epic Brief Output

Produce the structured brief:

```markdown
# Epic: [name]

## Job to Be Done
When [situation], I want to [motivation], so I can [outcome].

## User Segment
[Who has this problem — specific role, context, frequency]

## Problem Evidence
- [Pain point 1 — from interview]
- [Pain point 2 — from interview]

## Current Workarounds
- [How users solve this today]
- [What's wrong with current approach]

## Success Criteria
- [Measurable outcome 1]
- [Measurable outcome 2]

## Risk Assessment
- Build risk: [feasibility concerns]
- Market risk: [demand validation status]
- Scope risk: [creep potential]

## Priority Signal
[Core / Supporting / Exploratory] — [one-line justification]

## Next Steps
- [ ] Validate with [specific action]
- [ ] Build personas for [segment]
- [ ] Map user journey for [workflow]
```

### Phase 5: Identify Gaps

Explicitly list what's still unknown:
- Unvalidated assumptions (mark as "ASSUMPTION: ...")
- Missing data points
- Decisions deferred to later

Ask human: "Which of these gaps should we address before moving forward?"
