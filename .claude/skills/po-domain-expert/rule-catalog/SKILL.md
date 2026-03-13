---
name: rule-catalog
description: >
  Documents and validates business rules with the human. Captures rules in a
  structured format with triggers, constraints, exceptions, and examples.
  Use when domain logic is complex or implicit rules need to be made explicit.
user-invocable: true
allowed-tools: Read, Grep, Glob, AskUserQuestion, Edit, Write
---

# Rule Catalog

Document business rules as a structured catalog that specs and tests can reference.

## Catalog Location

The rule catalog lives at `docs/business-rules.md` in the project root. Create it if it doesn't exist.

## Operations

### 1. Discover Rules

Rules hide in many places. Look for them in:
- Conversations with the human ("oh, but in that case...")
- Existing code (conditionals, validations, error messages)
- Domain documentation or regulations
- Edge cases that reveal implicit constraints

Ask the human:
- "What rules govern [this process]?"
- "What's NOT allowed?"
- "Are there exceptions to this rule?"
- "Where does this rule come from?" (regulation, business decision, convention)

### 2. Document Each Rule

```markdown
## Rule: [BR-NNN] [Short Name]

**Statement**: [The rule in clear, precise language]

**Trigger**: [When does this rule apply? What activates it?]

**Constraint**: [What does it prevent, enforce, or require?]

**Exceptions**:
- [Exception 1 — when the rule doesn't apply]
- None (if no exceptions)

**Source**: [Who/what defined this rule? Human name, regulation, policy]

**Examples**:
- VALID: [scenario where rule is satisfied]
- INVALID: [scenario where rule is violated]
- EXCEPTION: [scenario where exception applies] (if applicable)

**Related Rules**: [BR-NNN, BR-NNN] (if rules interact)

**Status**: Active / Deprecated / Under Review
```

Rules for writing rules:
- Number them sequentially (BR-001, BR-002, etc.)
- One rule per entry — compound rules get split
- Every rule needs at least one VALID and one INVALID example
- Source is mandatory — never write "assumed"
- If the human isn't sure about a rule, mark status as "Under Review"

### 3. Validate Rules

Check for:

| Check | What to Look For |
|-------|-----------------|
| Conflicts | Do any two rules contradict each other? |
| Gaps | Are there scenarios no rule covers? |
| Ambiguity | Could the rule be interpreted two ways? |
| Completeness | Does every rule have examples? |
| Currency | Are any rules outdated? |

When conflicts are found:
1. Present both rules with the conflicting scenario
2. Ask the human which takes precedence
3. Document the resolution as a new rule or exception

### 4. Link Rules to Stories

When rules are referenced in AC:
- Use the rule ID: "Given BR-007 applies..."
- Ensure the referenced rule exists in the catalog
- Flag stories that reference undefined rules

### 5. Audit Report

```markdown
# Rule Catalog Audit — [date]

## Summary
- Total rules: [N]
- Active: [N] | Deprecated: [N] | Under Review: [N]

## Issues
| Issue | Rule(s) | Action Needed |
|-------|---------|---------------|
| Conflict | BR-003 vs BR-017 | Human to resolve |
| Missing example | BR-012 | Add INVALID example |
| No source | BR-008 | Confirm with human |

## Coverage
- Stories referencing rules: [N/total]
- Rules not referenced by any story: [list]
```
