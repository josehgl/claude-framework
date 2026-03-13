# Bootstrappers Existentes — Analisis Comparativo

## Los mas relevantes para nosotros

### 1. claude-bootstrap (alinaqi) — El mas sofisticado
- Multi-agent team (Team Lead, Quality, Security, Code Review, Merger, Feature agents)
- TDD obligatorio con structural task dependencies
- Genera: .claude/skills/, _project_specs/, .github/workflows/, CLAUDE.md, hooks
- Indices de codigo: TOPOLOGY.md, CONTRACTS.md, DEPENDENCY_GRAPH.md
- Simplicity constraints: 20 lineas/funcion, 3 params max, 200 lineas/archivo, 80% coverage
- **PRO:** Security-first, workspace-aware, iterativo
- **CON:** Muy opinionado, curva de aprendizaje alta
- **Iterativo:** SI — captura learnings y evoluciona config
- Repo: github.com/alinaqi/claude-bootstrap

### 2. Self-Improving Claude Code (Christopher Allen) — El mas innovador
- ~1400 tokens seed prompt en CLAUDE.md
- File-based state persistence (learnings.md)
- Graduated emergence: el sistema evoluciona naturalmente con uso
- Triage estructurado: apply now / capture / dismiss
- **PRO:** Minima complejidad inicial, se auto-mejora
- **CON:** Lento (mejora significativa en sesion ~8), requiere paciencia
- **Iterativo:** SI — explicitamente diseñado para evolucion entre sesiones
- Gist: gist.github.com/ChristopherA/fd2985551e765a86f4fbb24080263a2f

### 3. levnikolaevich/claude-code-skills — Pipeline SDLC completo
- 116 skills organizados en 5 plugins primarios:
  1. agile-workflow: descomposicion de scope, stories, tasks
  2. documentation-pipeline: docs auto-generados
  3. codebase-audit-suite: auditorias de seguridad, calidad, tests
  4. project-bootstrap: scaffold nuevos proyectos
  5. optimization-suite: performance, dependencies, modernizacion
- Orchestrator-Worker pattern (L0-L3 hierarchy)
- **PRO:** Full SDLC coverage, produccion-ready, sin dependencias externas
- **CON:** Complejo, muy Agile-opinionado
- **Iterativo:** SI — audit + optimization pipeline continuo

### 4. cc-bootstrap (vinodismyname) — CLI tool
- LLM-powered CLI Python, Jinja2 templates
- Integra Smithery Registry para auto-discovery de MCP servers
- Genera: CLAUDE.md, .claude/commands/, .mcp.json, settings.json, ACTION_PLAN.md
- **PRO:** Facil de usar, interactivo
- **CON:** Snapshots estaticos, no iterativo
- Repo: github.com/vinodismyname/ClaudeCodeBootstrap

### 5. claude-starter-kit (serpro69) — Template repo
- Template repo con configs pre-configuradas
- Chain-of-Verification (CoVe) prompting
- GitHub Actions para sincronizar con upstream
- **PRO:** Team-focused, compartible via git
- **CON:** Asume estructura monolitica
- Repo: github.com/serpro69/claude-starter-kit

## Colecciones de skills mas maduras

| Repo | Escala | Patron clave |
|------|--------|-------------|
| alirezarezvani/claude-skills | 180+ skills | 3-tier: agents + personas + skills. 4400+ stars |
| wshobson/agents | 112 agents, 146 skills | 72 plugins focalizados, progressive disclosure |
| 0xfurai/claude-code-subagents | 100+ subagents | 14 categorias de dominio |
| qdhenry/Claude-Command-Suite | 216+ commands | Namespace architecture, 54 AI agents |

## GAP CRITICO identificado

NINGUNO de los tools existentes soporta verdaderamente:
- Definicion de producto DINAMICA que evoluciona con el desarrollo
- Re-ejecucion para actualizar configs a medida que el proyecto madura
- CLAUDE.md, skills, stories como DOCUMENTOS VIVOS
- Entrevista como conversacion CONTINUA, no one-shot

## Patrones mas valiosos a incorporar

1. **Hub-and-Spoke** (levnikolaevich): orchestrator puro + specialists aislados
2. **Self-Improving** (Christopher Allen): seed minimal que evoluciona
3. **Progressive Disclosure** (wshobson): metadata → instructions → resources on-demand
4. **Living Context** (claude-md-improver): skills que validan y actualizan configs
5. **Structural Enforcement** (claude-bootstrap): simplicity constraints via hooks
6. **Multi-model strategy**: Opus para critical, Sonnet para tasks, Haiku para ops
