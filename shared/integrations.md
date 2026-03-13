# Core Integrations

Four external tools are required for every project using this framework.
These are non-negotiable — the framework assumes their availability.

## 1. GitHub

**Purpose**: Source of truth for code, tasks, and product discussions.
**Access**: `gh` CLI (always available via Bash tool)

| Feature | Used For | By System |
|---------|----------|-----------|
| **Discussions** | Product ideas, discovery artifacts, long-form context, decision records | PO |
| **Issues** | Sprint tasks, bugs, concrete work items with AC | PO, SM, Dev |
| **Pull Requests** | Code review, merge workflow | Dev, SM |
| **Labels** | Story status, system, priority, sprint | All |
| **Milestones** | Sprint boundaries | SM |
| **Projects (boards)** | Sprint board, kanban view | SM |

### Label Convention

```
type/epic, type/story, type/bug, type/spike, type/task
system/po, system/sm, system/dev
priority/critical, priority/high, priority/medium, priority/low
status/draft, status/ready, status/in-progress, status/review, status/done
sprint/N (where N is the sprint number)
```

### Discussion Categories

| Category | Purpose |
|----------|---------|
| Product Discovery | Epic briefs, JTBD, personas, journeys |
| Architecture Decisions | ADRs, technical trade-offs |
| Retrospectives | Sprint retros, process improvements |
| General | Everything else |

---

## 2. Supabase

**Purpose**: Persistent data — framework metrics, traceability logs, project-specific data.
**Access**: Supabase MCP (apply_migration, execute_sql, list_tables, etc.)

| Feature | Used For | By System |
|---------|----------|-----------|
| **Migrations** | Schema management, DDL changes | Dev |
| **Tables** | Framework metrics, agent logs, business data | All |
| **RLS** | Row-level security policies | Dev |
| **Edge Functions** | Serverless API endpoints | Dev |
| **Auth** | User authentication | Dev |

### Framework Tables (created by `supabase-init-metrics` skill)

```
framework_sprints      — sprint metadata (number, dates, velocity, goal)
framework_metrics      — KPI values per sprint per system
framework_gate_logs    — every quality gate pass/fail with evidence
framework_agent_logs   — agent action traceability
```

---

## 3. Heroku

**Purpose**: Deployment platform — staging, production, preview environments.
**Access**: `heroku` CLI (via Bash tool) or Heroku MCP if available

| Feature | Used For | By System |
|---------|----------|-----------|
| **Apps** | Staging and production environments | Dev |
| **Review Apps** | PR preview deployments | Dev, PO |
| **Pipeline** | Staging → Production promotion | Dev, SM |
| **Config Vars** | Environment configuration | Dev |
| **Logs** | Runtime debugging | Dev |

### App Naming Convention

```
[project]-staging    — staging environment
[project]-prod       — production environment
[project]-pr-[N]     — review app for PR #N (auto-created)
```

---

## 4. Figma

**Purpose**: Design source of truth — UI designs, prototypes, design tokens.
**Access**: Figma MCP or Figma API via Bash/WebFetch

| Feature | Used For | By System |
|---------|----------|-----------|
| **Files** | UI designs, component library | PO (review), Dev (implement) |
| **Prototypes** | Interactive flows for validation | PO |
| **Comments** | Design feedback | PO |
| **Dev Mode** | CSS, measurements, assets | Dev |
| **Design Tokens** | Colors, typography, spacing | Dev |

### Figma Project Structure

```
[Project Name]/
├── Design System      — shared components, tokens
├── Pages/             — one page per epic or feature
│   ├── [Epic Name]    — screens for this epic
│   └── ...
└── Prototypes/        — interactive flows
```

---

## Integration Skills

Available in `.claude/skills/integrations/`:

| Skill | Integration | Purpose |
|-------|-------------|---------|
| `github-publish-discovery` | GitHub | Publish PO artifacts as Discussions |
| `github-create-issues` | GitHub | Convert stories to Issues with labels |
| `supabase-init-metrics` | Supabase | Create framework metrics schema |
| `supabase-log-sprint` | Supabase | Record sprint KPIs |
| `figma-review-design` | Figma | Review designs against AC |
| `heroku-deploy-preview` | Heroku | Deploy for stakeholder review |

---

## Setup Checklist

When bootstrapping a new project:

- [ ] GitHub repo created with Discussion categories
- [ ] Labels and milestones created (see convention above)
- [ ] Supabase project created with framework tables (`supabase-init-metrics`)
- [ ] Heroku pipeline configured (staging + production)
- [ ] Figma project created with folder structure
- [ ] All MCPs/CLIs accessible from Claude Code session
