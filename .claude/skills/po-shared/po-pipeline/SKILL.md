---
name: po-pipeline
description: >
  Orchestrates the full Product Owner pipeline from discovery to sprint planning.
  Enforces the correct sequence: discovery → personas → journey → glossary → rules →
  edge cases → stories → Gate 1 → issues → sprint plan. Checks artifact existence
  at each step and blocks advancement if prerequisites are missing. Use at project
  kickoff or when starting a new epic.
user-invocable: true
allowed-tools: Read, Grep, Glob, AskUserQuestion
---

# PO Pipeline Orchestrator

Enforce the full Product Owner pipeline sequence. This skill does NOT execute the steps — it **controls the sequence** by checking what's done and instructing what to do next.

## Pipeline Steps

| Step | Skill to Execute | Output Artifact | Verification |
|------|-----------------|-----------------|--------------|
| 1 | `product-discovery` | `docs/product-owner/discovery/epic-brief.md` | File exists and contains "## Job to Be Done" |
| 2 | `persona-builder` | `docs/product-owner/discovery/personas.md` | File exists and contains "## Persona" |
| 3 | `journey-mapping` | `docs/product-owner/discovery/user-journey.md` | File exists and contains "## Journey" |
| 4 | `glossary-manager` | `docs/glossary.md` | File exists and contains at least 1 "### " term definition |
| 5 | `rule-catalog` | `docs/business-rules.md` | File exists and contains at least 1 "## Rule: BR-" entry |
| 6 | `edge-case-storm` | `docs/product-owner/discovery/edge-cases.md` | File exists and contains "## " section headers |
| 7 | `write-story` | `docs/product-owner/discovery/user-stories.md` | File exists and contains at least 1 "#### S" story header |
| 8 | `critique-spec` | `docs/product-owner/discovery/gate1-validation.md` | File exists and contains "PASS" or "CONDITIONALLY PASSED" |
| 9 | PO (human) approval | gate1-validation.md updated | Contains "PO approved" or human confirms in chat |
| 10 | `github-create-issues` | GitHub issues exist | `gh issue list` returns issues for ALL stories (Sprint 1 AND backlog) |
| 11 | `plan-sprint` | `docs/framework/sprint-current.md` | File exists and contains "## Sprint Backlog" |

## Process

### 1. Check Current State

Read the project directory and determine which steps are complete:

```
For each step in the pipeline:
  1. Check if the output artifact exists at the expected path
  2. Verify the artifact has the expected content marker
  3. Mark the step as: DONE, INCOMPLETE, or NOT STARTED
```

### 2. Report Status

Present the pipeline status to the human:

```markdown
## PO Pipeline Status

| # | Step | Skill | Status | Artifact |
|---|------|-------|--------|----------|
| 1 | Product Discovery | product-discovery | ✅ DONE | epic-brief.md |
| 2 | Personas | persona-builder | ✅ DONE | personas.md |
| 3 | User Journey | journey-mapping | ✅ DONE | user-journey.md |
| 4 | Glossary | glossary-manager | ❌ NOT STARTED | glossary.md |
| 5 | Business Rules | rule-catalog | ❌ NOT STARTED | business-rules.md |
| ... | ... | ... | ... | ... |

**Next step: Step 4 — Run `/glossary-manager`**
```

### 3. Instruct Next Action

Based on the status:

- If ALL steps are DONE → report "Pipeline complete. Ready for development."
- If the NEXT step is NOT STARTED → instruct: "Run `/[skill-name]` to proceed."
- If a step is INCOMPLETE (artifact exists but fails verification) → instruct: "Step [N] is incomplete. The artifact exists but [specific issue]. Fix it before proceeding."
- If a step is DONE but a LATER step is also done (steps were skipped) → **FLAG AS ERROR**: "Steps were executed out of order. Step [N] was skipped. You must complete it before the results of step [M] are valid. Run `/[skill-name]` for the missing step, then re-run steps [M+] to incorporate its output."

### 4. Block Out-of-Order Execution

This is the critical enforcement rule:

**If any step N is NOT DONE, all steps > N are considered INVALID even if their artifacts exist.**

This means:
- If glossary (step 4) is missing but stories (step 7) exist → stories are INVALID because they were written without glossary compliance
- The orchestrator must flag this and instruct: "Stories exist but were written before the glossary. Re-run `/write-story` after completing the glossary."

### 5. Verify Issue Completeness

For step 10 (github-create-issues), the verification is:

```bash
# Count stories in user-stories.md
# Count issues in GitHub
# They must match — ALL stories become issues, not just the current sprint
```

If the count doesn't match:
- Report: "Found [X] stories but only [Y] GitHub issues. [Z] stories are missing issues."
- Instruct: "Run `/github-create-issues` to create the missing issues."

### 6. Loop

After each skill execution, the human should re-run `/po-pipeline` to:
1. Verify the step completed correctly
2. Get the next instruction

This creates a **check-advance-check** loop that prevents skipping.

## Rules

1. **Never skip steps.** Even if the human says "I already know the domain", the glossary and rules must be produced.
2. **Never advance past a failed step.** If a step's artifact is incomplete, fix it first.
3. **Out-of-order artifacts are invalid.** Flag them and require re-execution.
4. **ALL stories become issues.** Not just the current sprint — the entire backlog.
5. **Human approval is a gate.** Step 9 cannot be automated — the human must explicitly approve.

## When to Re-run the Pipeline

- After completing any skill in the pipeline → re-run to get next step
- When unsure of pipeline status → re-run to get a report
- After modifying any artifact → re-run to verify integrity
- At session start → re-run to understand where we left off
