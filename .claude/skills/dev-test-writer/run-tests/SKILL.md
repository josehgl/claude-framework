---
name: run-tests
description: >
  Runs the project test suite and reports structured results. Detects the test
  runner automatically. Use to verify red/green state during TDD cycle.
user-invocable: true
allowed-tools: Read, Grep, Glob, Bash, AskUserQuestion
---

# Run Tests

Execute the project test suite and report structured results.

## Inputs

- Scope: all (default), changed files only, or specific file/directory
- Optional: test runner command override

## Process

### 1. Detect Test Runner

Check in order:
1. `package.json` scripts: `test`, `test:unit`, `test:integration`
2. `pyproject.toml` or `pytest.ini` → `pytest`
3. `go.mod` → `go test ./...`
4. `Cargo.toml` → `cargo test`
5. `Makefile` → look for test targets

### 2. Run Tests

Execute with verbose output and coverage if available:

```bash
# JavaScript/TypeScript
npm test -- --reporter=verbose

# Python
pytest -v --tb=short

# Go
go test ./... -v

# Rust
cargo test -- --nocapture
```

### 3. Parse Results

Extract from output:
- Total tests
- Passed / Failed / Skipped counts
- Failed test names and error messages
- Coverage percentage (if available)
- Duration

### 4. Output: Test Report

```markdown
## Test Results

| Metric | Value |
|--------|-------|
| Total | [N] |
| Passed | [N] |
| Failed | [N] |
| Skipped | [N] |
| Coverage | [N]% |
| Duration | [N]s |

### Failed Tests
| Test | Error |
|------|-------|
| [test name] | [error message] |

### Status: [ALL GREEN / N FAILURES]
```
