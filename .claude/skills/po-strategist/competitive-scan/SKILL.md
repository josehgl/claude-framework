---
name: competitive-scan
description: >
  Performs a lightweight competitive analysis via web research. Identifies
  key competitors, their strengths/weaknesses, and positioning opportunities.
  Use during discovery or when evaluating feature direction.
user-invocable: true
allowed-tools: Read, Grep, Glob, WebSearch, WebFetch, AskUserQuestion
---

# Competitive Scan

Research the competitive landscape and identify positioning opportunities.

## Inputs

Ask the human:
- What product/feature area to analyze
- Known competitors (if any)
- What specific questions they want answered

## Process

### 1. Identify Competitors

Search for:
- Direct competitors (same problem, same audience)
- Indirect competitors (same problem, different approach)
- Substitutes (different problem framing, overlapping users)

Use web search to find: "[problem domain] tools", "[problem domain] alternatives", "best [category] software"

### 2. Analyze Each Competitor

For each relevant competitor, gather:

| Dimension | What to Find |
|-----------|-------------|
| Core value prop | What do they promise? (from their homepage) |
| Target audience | Who do they serve? |
| Key features | Top 3-5 capabilities |
| Pricing model | Free / Freemium / Paid / Enterprise |
| Strengths | What do users praise? (reviews, testimonials) |
| Weaknesses | What do users complain about? (reviews, forums) |
| Differentiation | What makes them unique? |

Limit to 3-5 competitors maximum. Depth beats breadth.

### 3. Identify Patterns

Look for:
- **Table stakes**: features everyone has (must-have baseline)
- **Differentiators**: features only 1-2 competitors have
- **Gaps**: problems users mention that nobody solves well
- **Trends**: direction the market is moving

### 4. Produce Analysis

```markdown
# Competitive Scan: [domain]

## Landscape Summary
[2-3 sentences on the competitive landscape]

## Competitor Profiles

### [Competitor 1]
- **What they do**: [one line]
- **Target**: [audience]
- **Strengths**: [top 2-3]
- **Weaknesses**: [top 2-3]
- **Pricing**: [model]

### [Competitor 2]
...

## Feature Comparison

| Feature | Us | Comp 1 | Comp 2 | Comp 3 |
|---------|-----|--------|--------|--------|
| [feature] | [?/planned] | [yes/no] | [yes/no] | [yes/no] |

## Opportunities
1. [Gap or weakness we could exploit]
2. [Underserved segment]
3. [Emerging trend we could lead]

## Risks
1. [Strong incumbent advantage]
2. [Market moving in different direction]

## Recommendation
[1-2 sentences on positioning strategy]
```

### 5. Validate with Human

Present findings and ask:
- "Does this match your understanding of the market?"
- "Are there competitors I missed?"
- "Which opportunities resonate most?"

Note: This is a lightweight scan, not deep market research. Flag when deeper analysis is needed.
