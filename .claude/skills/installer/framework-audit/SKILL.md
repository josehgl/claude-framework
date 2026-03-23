---
name: framework-audit
description: >
  Health check for existing framework installations. Verifies hooks, state files,
  agents, and skills are properly configured. Use to diagnose framework issues.
user-invocable: true
allowed-tools: Read, Grep, Glob, Bash, AskUserQuestion
---

# Framework Audit

Check the health of an existing framework installation.

## Inputs

- Project root directory (default: current directory)

## Process

### 1. Check Core Files

| File | Status |
|------|--------|
| `docs/framework/config.md` | [EXISTS/MISSING] |
| `docs/framework/backlog.md` | [EXISTS/MISSING] |
| `docs/framework/sprint-current.md` | [EXISTS/MISSING] |
| `docs/framework/velocity.md` | [EXISTS/MISSING] |
| `.claude/settings.json` | [EXISTS/MISSING] |

### 2. Check Hooks

Read `.claude/settings.json` and verify:

| Hook | Type | Configured |
|------|------|-----------|
| protect-files | PreToolUse | [YES/NO] |
| gate2-test-ready | PreToolUse | [YES/NO] |
| gate3-code-ready | PostToolUse | [YES/NO] |

### 3. Check Tool Detection

```bash
# Test runner works
npm test --help 2>/dev/null && echo "OK" || echo "MISSING"

# Linter works
npm run lint --help 2>/dev/null && echo "OK" || echo "MISSING"
```

### 4. Check State Consistency

- Sprint number in sprint-current.md matches velocity.md
- Backlog stories referenced in sprint exist in backlog.md
- Velocity data has no gaps

### 5. Output: Health Report

```markdown
## Framework Health Report

### Overall: [HEALTHY / NEEDS ATTENTION / BROKEN]

### Core Files
| File | Status | Issue |
|------|--------|-------|
| [path] | [OK/MISSING/CORRUPT] | [description] |

### Hooks
| Hook | Status | Issue |
|------|--------|-------|
| [name] | [OK/MISSING/ERROR] | [description] |

### Tools
| Tool | Status | Command |
|------|--------|---------|
| Test runner | [OK/MISSING] | [command] |
| Linter | [OK/MISSING] | [command] |
| Type checker | [OK/MISSING] | [command] |

### State Consistency
- Sprint tracking: [OK/ISSUE]
- Velocity history: [OK/ISSUE]
- Backlog integrity: [OK/ISSUE]

### Remediation
1. [Fix suggestion for each issue found]
```
