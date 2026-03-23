---
name: detect-stack
description: >
  Detects the project technology stack: language, framework, test runner, linter,
  type checker, database, and package manager. Use during framework installation
  or when stack-specific behavior is needed.
user-invocable: true
allowed-tools: Read, Grep, Glob, Bash, AskUserQuestion
---

# Detect Stack

Identify the project's technology stack automatically.

## Inputs

- Project root directory (default: current directory)

## Process

### 1. Language Detection

Check for configuration files:

| File | Language |
|------|----------|
| `package.json` | JavaScript/TypeScript |
| `tsconfig.json` | TypeScript |
| `pyproject.toml`, `requirements.txt`, `setup.py` | Python |
| `go.mod` | Go |
| `Cargo.toml` | Rust |
| `pom.xml`, `build.gradle` | Java/Kotlin |

### 2. Framework Detection

| Indicator | Framework |
|-----------|-----------|
| `next.config.*` | Next.js |
| `nuxt.config.*` | Nuxt |
| `svelte.config.*` | SvelteKit |
| `astro.config.*` | Astro |
| `angular.json` | Angular |
| `fastapi` in dependencies | FastAPI |
| `django` in dependencies | Django |
| `flask` in dependencies | Flask |
| `gin` or `fiber` in go.mod | Gin/Fiber |

### 3. Test Runner Detection

| Indicator | Test Runner |
|-----------|------------|
| `vitest` in devDependencies | Vitest |
| `jest` in devDependencies | Jest |
| `mocha` in devDependencies | Mocha |
| `pytest` in dependencies | Pytest |
| `go.mod` present | Go testing |
| `cargo.toml` present | Cargo test |

### 4. Linter & Type Checker

| Indicator | Tool |
|-----------|------|
| `.eslintrc.*`, `eslint.config.*` | ESLint |
| `biome.json` | Biome |
| `ruff` in pyproject.toml | Ruff |
| `.golangci.yml` | golangci-lint |
| `tsconfig.json` | TypeScript compiler |
| `mypy` in pyproject.toml | mypy |

### 5. Database Detection

| Indicator | Database |
|-----------|----------|
| `@supabase/supabase-js` | Supabase |
| `prisma` in dependencies | Prisma (various DBs) |
| `drizzle-orm` | Drizzle |
| `sqlalchemy` | SQLAlchemy |
| `mongoose` | MongoDB |

### 6. Package Manager

| Indicator | Manager |
|-----------|---------|
| `pnpm-lock.yaml` | pnpm |
| `yarn.lock` | Yarn |
| `bun.lockb` | Bun |
| `package-lock.json` | npm |
| `poetry.lock` | Poetry |
| `uv.lock` | uv |

### 7. Output: Stack Profile

```markdown
## Stack Profile

| Component | Detected |
|-----------|----------|
| Language | [language] |
| Framework | [framework or "none"] |
| Test Runner | [runner] |
| Linter | [linter] |
| Type Checker | [checker] |
| Database | [db or "none detected"] |
| Package Manager | [manager] |
| CI/CD | [GitHub Actions / other / none] |

## Test Command: `[detected command]`
## Lint Command: `[detected command]`
## Type Check Command: `[detected command]`
## Build Command: `[detected command]`
```
