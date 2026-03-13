# Product Owner Workflows

How the 4 PO agents collaborate to transform ideas into sprint-ready stories.

---

## Workflow 1: Full Discovery → Sprint-Ready Stories

The complete pipeline from vague idea to stories ready for Gate 1.
Use at project kickoff or when exploring a new product area.

```
┌─────────────────────────────────────────────────────────────────┐
│                        HUMAN INPUT                              │
│              "I want to build [vague idea]"                     │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  1. PRODUCT STRATEGIST                                          │
│     Skills: product-discovery, impact-mapping, competitive-scan │
│                                                                 │
│     Input:  vague idea from human                               │
│     Does:   JTBD analysis, strategic assessment, prioritization │
│     Output: Epic Brief (job, segment, risks, success criteria)  │
│                                                                 │
│     → Publishes to GitHub Discussion (github-publish-discovery) │
└──────────────────────────┬──────────────────────────────────────┘
                           │ Epic Brief
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  2. UX RESEARCHER                                               │
│     Skills: persona-builder, journey-mapping, empathy-mapping   │
│                                                                 │
│     Input:  Epic Brief (user segment, pain points)              │
│     Does:   builds persona, maps user journey, identifies pains │
│     Output: Persona + Journey Map + prioritized pain points     │
│                                                                 │
│     → Publishes to GitHub Discussion (github-publish-discovery) │
└──────────────────────────┬──────────────────────────────────────┘
                           │ Persona + Journey + Pain Points
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  3. DOMAIN EXPERT                                               │
│     Skills: glossary-manager, rule-catalog, edge-case-storm     │
│                                                                 │
│     Input:  Epic Brief + Persona + Journey                      │
│     Does:   extracts business rules, defines terms, finds edges │
│     Output: Glossary entries + Rule catalog + Edge cases         │
│                                                                 │
│     → Updates docs/glossary.md and docs/business-rules.md       │
└──────────────────────────┬──────────────────────────────────────┘
                           │ Rules + Glossary + Edge Cases
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  4. USER ADVOCATE                                               │
│     Skills: write-story, critique-spec, story-splitter          │
│                                                                 │
│     Input:  ALL previous outputs                                │
│     Does:   writes stories with AC, self-reviews, splits if big │
│     Output: Sprint-ready stories with Given/When/Then AC        │
│                                                                 │
│     → Creates GitHub Issues (github-create-issues)              │
│     → Stories ready for Gate 1 validation                       │
└──────────────────────────┬──────────────────────────────────────┘
                           │ Stories with AC
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  GATE 1: SPEC READY                                             │
│  Validated by: User Advocate (critique-spec) + Human approval   │
│                                                                 │
│  All criteria must pass:                                        │
│  ✓ AC in Given/When/Then                                        │
│  ✓ Happy path + error/edge scenarios                            │
│  ✓ No ambiguous terms                                           │
│  ✓ Each scenario testable                                       │
│  ✓ Story estimated                                              │
│  ✓ PO (human) approved                                          │
│                                                                 │
│  PASS → stories move to Development (Test phase)                │
│  FAIL → routes back to responsible agent                        │
└─────────────────────────────────────────────────────────────────┘
```

### When to Run the Full Pipeline

- New project kickoff
- New epic or product area
- Major pivot or strategic change

### Shortcuts

Not every story needs the full pipeline:
- **Known domain, new feature**: skip Strategist, start at Researcher
- **Small bug fix**: skip to User Advocate (write-story only)
- **Well-understood story**: skip to User Advocate, use Domain Expert for edge cases

---

## Workflow 2: Story Writing (single story)

Quick path for writing one story when context already exists.

```
Human describes feature
        │
        ▼
  USER ADVOCATE (write-story)
  ├── Reads: existing persona, epic brief, business rules
  ├── Asks human for clarification if needed
  ├── Writes story + AC
  └── Self-reviews with critique-spec
        │
        ├── Story too big? → story-splitter → repeat
        ├── Domain unclear? → DOMAIN EXPERT (edge-case-storm)
        └── AC complete? → Gate 1 validation
```

---

## Workflow 3: Spec Review (existing stories)

Review and improve existing stories before sprint planning.

```
  backlog-health-check (find stories needing work)
        │
        ▼
  For each story needing work:
  ├── critique-spec → identify issues
  ├── Route to responsible agent:
  │   ├── Vague AC → USER ADVOCATE rewrites
  │   ├── Missing edge cases → DOMAIN EXPERT (edge-case-storm)
  │   ├── No persona context → UX RESEARCHER (persona-builder)
  │   └── No epic alignment → PRODUCT STRATEGIST review
  └── Re-validate with critique-spec
        │
        ▼
  sprint-planning-prep (propose sprint scope)
```

---

## Workflow 4: Design Review

When Figma designs are ready, validate against specs.

```
  Designer completes Figma screens
        │
        ▼
  figma-review-design
  ├── Checks: AC coverage, persona fit, states, accessibility
  ├── APPROVED → Dev can implement
  ├── NEEDS CHANGES → back to designer with specific feedback
  └── BLOCKED → missing AC or persona → route to PO agents
```

---

## Workflow 5: Sprint Ceremony Support

### Sprint Planning

```
  sprint-planning-prep
  ├── Verify DoR for candidate stories
  ├── Propose sprint scope based on velocity
  ├── Human approves sprint content
  └── github-create-issues (if stories aren't Issues yet)
```

### Sprint Review

```
  Human demos completed work
        │
        ▼
  PRODUCT STRATEGIST
  ├── Does completed work align with epic's JTBD?
  ├── Are success criteria being met?
  └── Should we adjust direction?
        │
        ▼
  supabase-log-sprint (record metrics)
```

### Backlog Refinement

```
  backlog-health-check (audit current backlog)
        │
        ▼
  Fix issues found:
  ├── Missing AC → USER ADVOCATE
  ├── Undefined terms → DOMAIN EXPERT
  ├── Stale stories → ask human to remove or update
  └── New ideas → PRODUCT STRATEGIST (product-discovery)
```

---

## Agent Routing Rules

When an agent encounters something outside its scope:

| Agent | Encountering | Routes To |
|-------|-------------|-----------|
| Strategist | Needs user detail | UX Researcher |
| Strategist | Needs domain rules | Domain Expert |
| Researcher | Needs strategic alignment | Product Strategist |
| Researcher | Needs domain vocabulary | Domain Expert |
| Domain Expert | Needs user context | UX Researcher |
| Domain Expert | Scope might change | Product Strategist |
| User Advocate | No persona for story | UX Researcher |
| User Advocate | Missing business rules | Domain Expert |
| User Advocate | Story doesn't fit an epic | Product Strategist |
| Any agent | Subjective decision | Human (escalate) |

---

## Artifact Flow Summary

```
Product Strategist    UX Researcher       Domain Expert       User Advocate
─────────────────    ──────────────       ─────────────       ─────────────
Epic Brief ──────────→ (input)
                     Persona ─────────────→ (input)
                     Journey Map ─────────→ (input)
                                          Glossary ───────────→ (input)
                                          Rules ─────────────→ (input)
                                          Edge Cases ────────→ (input)
                                                              Stories + AC
                                                                  │
                                                                  ▼
                                                              Gate 1
                                                                  │
                                                                  ▼
                                                            → Development
```

Each agent's output feeds the next. All artifacts are published to GitHub (Discussions or Issues) for team visibility.
