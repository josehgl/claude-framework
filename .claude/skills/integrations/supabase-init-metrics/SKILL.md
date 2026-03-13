---
name: supabase-init-metrics
description: >
  Initializes the framework metrics schema in Supabase. Creates tables for
  sprint tracking, KPI metrics, quality gate logs, and agent traceability.
  Use once when bootstrapping a new project.
user-invocable: true
allowed-tools: Read, Grep, Glob, Bash, AskUserQuestion
---

# Initialize Framework Metrics in Supabase

Create the database schema for framework metrics and traceability.

## Inputs

- Supabase project ID (ask the human or detect from project config)
- Confirmation before applying migrations

## Process

### 1. Identify Supabase Project

Ask: "Which Supabase project should I use for framework metrics?"

List available projects if needed (use `list_projects` MCP tool).

### 2. Check Existing Schema

Verify if tables already exist to avoid duplicates:
- Check for `framework_sprints` table
- If it exists, ask: "Framework tables already exist. Skip or recreate?"

### 3. Apply Migration

Apply the following migration using the Supabase MCP `apply_migration` tool:

```sql
-- Framework metrics schema
-- Tracks sprint performance, KPIs, quality gates, and agent actions

-- Sprint metadata
CREATE TABLE framework_sprints (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  sprint_number INT NOT NULL UNIQUE,
  goal TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  planned_points INT,
  completed_points INT,
  velocity NUMERIC(5,1),
  status TEXT NOT NULL DEFAULT 'planned' CHECK (status IN ('planned', 'active', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- KPI metrics per sprint per system
CREATE TABLE framework_metrics (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  sprint_id BIGINT NOT NULL REFERENCES framework_sprints(id) ON DELETE CASCADE,
  system TEXT NOT NULL CHECK (system IN ('po', 'sm', 'dev', 'cross')),
  kpi_name TEXT NOT NULL,
  kpi_value NUMERIC(10,2) NOT NULL,
  target_value NUMERIC(10,2),
  status TEXT NOT NULL DEFAULT 'ok' CHECK (status IN ('ok', 'warn', 'fail')),
  notes TEXT,
  measured_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (sprint_id, system, kpi_name)
);

-- Quality gate pass/fail logs
CREATE TABLE framework_gate_logs (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  sprint_id BIGINT REFERENCES framework_sprints(id) ON DELETE SET NULL,
  gate_number INT NOT NULL CHECK (gate_number BETWEEN 1 AND 4),
  story_ref TEXT NOT NULL,
  result TEXT NOT NULL CHECK (result IN ('pass', 'fail')),
  criteria_results JSONB NOT NULL DEFAULT '{}',
  failed_criteria TEXT[],
  reviewer TEXT,
  notes TEXT,
  evaluated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Agent action traceability
CREATE TABLE framework_agent_logs (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  system TEXT NOT NULL CHECK (system IN ('po', 'sm', 'dev')),
  agent_name TEXT NOT NULL,
  action TEXT NOT NULL,
  input_summary TEXT,
  output_summary TEXT,
  result TEXT NOT NULL CHECK (result IN ('success', 'failure', 'escalated')),
  duration_ms INT,
  session_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX idx_metrics_sprint ON framework_metrics(sprint_id);
CREATE INDEX idx_metrics_system ON framework_metrics(system);
CREATE INDEX idx_gate_logs_sprint ON framework_gate_logs(sprint_id);
CREATE INDEX idx_gate_logs_story ON framework_gate_logs(story_ref);
CREATE INDEX idx_agent_logs_system ON framework_agent_logs(system);
CREATE INDEX idx_agent_logs_agent ON framework_agent_logs(agent_name);
CREATE INDEX idx_agent_logs_created ON framework_agent_logs(created_at);

-- Enable RLS (policies added per project)
ALTER TABLE framework_sprints ENABLE ROW LEVEL SECURITY;
ALTER TABLE framework_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE framework_gate_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE framework_agent_logs ENABLE ROW LEVEL SECURITY;
```

### 4. Verify

After migration, verify tables were created:
- List tables in public schema
- Confirm all 4 tables exist with correct columns

### 5. Report

```markdown
## Framework Metrics Initialized

| Table | Purpose | Status |
|-------|---------|--------|
| framework_sprints | Sprint metadata and velocity | Created |
| framework_metrics | KPI values per sprint/system | Created |
| framework_gate_logs | Quality gate pass/fail records | Created |
| framework_agent_logs | Agent action traceability | Created |

Project: [project name] ([project id])

Note: RLS is enabled but no policies are set yet. Add policies based on
your project's auth requirements.
```

### 6. Remind About RLS

Warn: "RLS is enabled on all tables but no policies exist yet. You'll need to add appropriate policies when you set up authentication. Run the Supabase security advisors to check."
