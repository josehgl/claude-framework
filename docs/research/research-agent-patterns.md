# Patrones Multi-Agente y Orchestration

## Claude Agent SDK

- Framework oficial de Anthropic para construir agentes autonomos
- Claude Code esta CONSTRUIDO sobre el Agent SDK
- Disponible en Python y JavaScript/Node.js (@anthropic-ai/claude-agent-sdk)
- Diseño core: "Give your agents a computer"

## Patrones de orquestacion probados

### Pattern 1: Plan → Implement → Verify
- Plan agent: investiga contexto sin hacer cambios (read-only)
- Implement: ejecuta el plan con herramientas completas
- Verify: tests automaticos + revision en contexto fresco
- **Mas efectivo para:** tareas complejas multi-archivo

### Pattern 2: Writer / Reviewer
- Writer: implementa la feature
- Reviewer: revisa en sesion separada con contexto fresco
- **Mas efectivo para:** code quality, catching bugs

### Pattern 3: Test-First Parallel
- Agent 1: escribe tests basados en spec
- Agent 2: implementa hasta que tests pasen
- **Mas efectivo para:** TDD con Claude

### Pattern 4: Specialist Swarm
- Research agent: investiga codebase
- Epic planner: descompone scope en epicas
- Story coordinator: crea stories con acceptance criteria
- Code agent: implementa
- Review agent: revisa
- **Mas efectivo para:** proyectos grandes, flujo end-to-end

### Pattern 5: Worktree Isolation
- Cada agente trabaja en un git worktree separado
- Previene conflictos de contexto
- Permite ejecucion paralela real
- Merge limpio de vuelta a main
- **Usado por:** /batch skill (5-30 unidades paralelas)

## Custom Subagents — Formato

Archivo en .claude/agents/nombre.md:
```yaml
---
name: security-reviewer
description: Reviews code for security vulnerabilities
tools: Read, Grep, Glob, Bash
model: opus
---

[System prompt en markdown]
```

## Herramientas de orchestration (comunidad)

- **Ruflo**: plataforma enterprise multi-agente con swarm intelligence
- **CCPM**: project management con GitHub Issues + worktrees
- **Multiclaude**: orchestrador donde agente primario descompone tareas
- **Claude Command Suite**: 216+ slash commands, 12 skills, 54 agentes

## Metricas relevantes

- Claude genera 1.75x mas errores logicos que humanos
- 65% mejor consistencia estilistica cuando se muestran ejemplos modelo
- 45% de devs frustrados con "almost right but not quite"
- 66% gastan mas tiempo debuggeando codigo AI que escribiendolo manualmente
- Hybrid deterministic+probabilistic: 80%+ reduccion de esfuerzo manual

## Tendencias 2026

1. Multi-agent teams pasando de experimental a produccion
2. Especializacion de agentes: cada uno con rol definido
3. MCP como estandar de industria para integracion AI-tools
4. Context engineering como disciplina (no solo "prompt engineering")
5. Plan mode como practica estandar, no opcional
6. Skills > prompts para conocimiento reutilizable
7. Hooks como capa de enforcement determinista
8. Docker-first sandboxing para autonomia segura
