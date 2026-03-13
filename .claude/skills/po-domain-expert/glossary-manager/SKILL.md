---
name: glossary-manager
description: >
  Manages the domain glossary: adds new terms, audits stories for undefined terms,
  and ensures consistent language across all specs. Use when writing specifications,
  onboarding to a new domain, or when ambiguous terms are found in stories.
user-invocable: true
allowed-tools: Read, Grep, Glob, AskUserQuestion, Edit, Write
---

# Glossary Manager

Maintain a single source of truth for domain terminology.

## Glossary Location

The glossary lives at `docs/glossary.md` in the project root. Create it if it doesn't exist.

## Operations

### 1. Add Term

When a new domain term appears:

Ask the human:
- "What does [term] mean in this context?"
- "Can you give a concrete example?"
- "Are there synonyms we should redirect?"

Add to glossary:

```markdown
### [Term]
**Definition**: [precise, unambiguous definition]
**Example**: [concrete scenario showing the term in use]
**Synonyms**: [other words that mean the same thing — redirect to this entry]
**Source**: [who defined this — human name, document, regulation]
**Added**: [date]
```

Rules:
- One definition per term — no "it depends" without explicit conditions
- If a term has different meanings in different contexts, create separate entries with qualifiers
- Every entry needs an example — definitions without examples are incomplete

### 2. Audit Stories for Undefined Terms

Scan story files and AC for terms that:
- Are not in the glossary
- Are used inconsistently (same concept, different words)
- Are ambiguous ("quickly", "properly", "appropriate", "relevant")

Produce an audit report:

```markdown
# Glossary Audit — [date]

## Undefined Terms Found
| Term | Found In | Context | Action Needed |
|------|----------|---------|---------------|
| [term] | [story file] | [surrounding text] | Define / Clarify |

## Inconsistent Usage
| Concept | Variations Found | Recommended Standard |
|---------|-----------------|---------------------|
| [concept] | [word1, word2, word3] | [pick one] |

## Ambiguous Terms
| Term | Found In | Why Ambiguous | Suggested Replacement |
|------|----------|--------------|----------------------|
| "quickly" | [file] | No measurable criteria | "within 2 seconds" |
```

### 3. Review Glossary Health

Check the glossary itself for:
- Entries without examples
- Entries without a source
- Circular definitions (A defines B, B defines A)
- Stale entries (term no longer used in codebase)

### 4. Onboard to New Domain

When starting work in an unfamiliar domain:

1. Ask the human for key domain concepts
2. Search project docs for domain-specific language
3. Build initial glossary from findings
4. Review with human: "Did I capture the key terms?"
5. Flag terms that need expert clarification
