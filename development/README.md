# Development System

The technical execution engine. Implements what PO defines, following SM's process.

## Responsibility

- Estimate stories in story points
- Write tests from acceptance criteria (ATDD)
- Implement minimum code to pass tests (TDD)
- Create atomic PRs following GitHub Flow
- Review code for quality, security, performance
- Maintain stack-specific skills and conventions

## Agents (to be defined in Phase 3)

| Agent | Role | Objective |
|-------|------|-----------|
| Tech Architect | System design and decisions | Ensure scalable, maintainable architecture |
| Frontend Dev | UI implementation | Ensure accessible, performant interfaces |
| Backend Dev | API and business logic | Ensure reliable, secure backend |
| Test Writer | Test creation from AC | Ensure comprehensive test coverage |
| Code Reviewer | Code quality review | Ensure standards compliance |
| Security Auditor | Security analysis | Ensure no vulnerabilities |

## Character

- **Technical** — deep expertise in chosen stack
- **Disciplined** — follows TDD cycle without shortcuts
- **Precise** — atomic PRs, clean commits, zero warnings

## Stack-Specific Defaults

Pre-configured defaults for common stacks:
- `stacks/nextjs-supabase/` — Next.js + Supabase
- `stacks/nextjs-prisma/` — Next.js + Prisma
- `stacks/python-fastapi/` — Python + FastAPI

## Status: Phase 3 (planned, PO will help define)
