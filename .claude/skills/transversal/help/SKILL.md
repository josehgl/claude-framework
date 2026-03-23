---
name: help
description: >
  Lists all available skills organized by system (PO, Dev, SM, Transversal).
  Use when unsure which skill to use, onboarding to the framework, or wanting
  to see the full capability map.
user-invocable: true
allowed-tools: Read, Glob
---

# /help — Framework Skills Directory

## Inputs

No inputs required. Scans `.claude/skills/` and `.claude/agents/` automatically.

## Process

### 1. Scan All Skills

```bash
# Find all SKILL.md files
Glob .claude/skills/**/SKILL.md
```

### 2. Extract Metadata

For each skill, read the frontmatter to get:
- `name` — the slash command
- `description` — what it does
- `user-invocable` — whether the user can call it directly

### 3. Organize by System

Group skills into their system based on directory path:
- `po-*` → Product Owner system
- `dev-*` → Development system
- `sm-*` → Scrum Master system
- `state/` → State Management
- `transversal/` → Available to all agents
- `installer/` → Framework Management
- `integrations/` → External Integrations

### 4. Produce Directory

```markdown
# 🗂️ Framework Skills Directory

## 🎯 Product Owner (PO)

### Strategist
| Skill | Description |
|-------|-------------|
| `/product-discovery` | Validate product ideas with JTBD |
| `/impact-mapping` | Map stakeholder value |
| `/competitive-scan` | Market research and competitive analysis |

### UX Researcher
| Skill | Description |
|-------|-------------|
| `/persona-builder` | Create user personas from data |
| `/journey-mapping` | Map end-to-end user workflows |
| `/empathy-mapping` | Understand user emotions and motivations |

### Domain Expert
| Skill | Description |
|-------|-------------|
| `/glossary-manager` | Maintain domain terminology |
| `/rule-catalog` | Document business rules |
| `/edge-case-storm` | Systematic edge case discovery |

### User Advocate
| Skill | Description |
|-------|-------------|
| `/write-story` | Create user stories with AC |
| `/critique-spec` | Review AC quality |
| `/story-splitter` | Decompose large stories |

### Shared PO
| Skill | Description |
|-------|-------------|
| `/backlog-health-check` | Audit backlog quality |
| `/sprint-planning-prep` | Prepare stories for sprint |

---

## 🛠️ Development (Dev)

### Architect
| Skill | Description |
|-------|-------------|
| `/architecture-decision` | Produce ADRs for trade-offs |

### Test Writer
| Skill | Description |
|-------|-------------|
| `/write-tests` | Map AC scenarios to tests |
| `/run-tests` | Execute test suite |
| `/coverage-check` | Analyze coverage |

### Implementer
| Skill | Description |
|-------|-------------|
| `/implement-feature` | TDD green phase |
| `/fix-bug` | Reproduce with test, then fix |

### Code Reviewer
| Skill | Description |
|-------|-------------|
| `/review-code` | Structured code review |
| `/lint-check` | Run linter and type checker |

### Shared Dev
| Skill | Description |
|-------|-------------|
| `/create-pr` | Create atomic PR |
| `/detect-stack` | Identify project stack |
| `/estimate-story` | Estimate story points |
| `/story-to-tests` | Map AC to test plan |
| `/verify` | Full verification pipeline |

---

## 📋 Scrum Master (SM)

### Sprint Planner
| Skill | Description |
|-------|-------------|
| `/plan-sprint` | Facilitate sprint planning |
| `/close-sprint` | Close sprint and archive |

### Gate Enforcer
| Skill | Description |
|-------|-------------|
| `/validate-gate` | Validate quality gate (1-4) |
| `/validate-dod` | Validate Definition of Done |

### Retro Facilitator
| Skill | Description |
|-------|-------------|
| `/run-retrospective` | Facilitate retrospective |

### Velocity Tracker
| Skill | Description |
|-------|-------------|
| `/burndown-report` | Sprint burndown |
| `/velocity-report` | Velocity trends |

### Shared SM
| Skill | Description |
|-------|-------------|
| `/daily-standup` | Run daily standup |

---

## 🔄 Transversal (all agents)

| Skill | Description |
|-------|-------------|
| `/status` | Quick dashboard of current sprint and progress |
| `/help` | This directory |
| `/read-state` | Read current framework state |
| `/init-state` | Initialize framework state files |
| `/update-sprint` | Update sprint state |
| `/record-metrics` | Collect and archive metrics |

---

## 🔧 Framework Management

| Skill | Description |
|-------|-------------|
| `/framework` | Install framework into a project |
| `/framework-audit` | Validate framework file integrity |

---

## 🔌 Integrations

| Skill | Description |
|-------|-------------|
| `/github-create-issues` | Create GitHub Issues from stories |
| `/github-publish-discovery` | Publish discovery to Discussions |
| `/figma-review-design` | Review Figma designs against AC |
| `/supabase-init-metrics` | Initialize Supabase metrics tables |
| `/supabase-log-sprint` | Log sprint data to Supabase |
| `/heroku-deploy-preview` | Deploy preview environment |
```

## Output

A complete, organized directory of all framework capabilities. Always scan the actual filesystem rather than hardcoding — new skills added by the user should appear automatically.
