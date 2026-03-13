# Inventario Completo de Features de Claude Code (Marzo 2026)

## 1. CLAUDE.md — Memoria persistente del proyecto

**Que es:** Archivo markdown que Claude lee automaticamente al inicio de cada conversacion.
**Jerarquia:** Home (~/.claude/CLAUDE.md) > Proyecto (./CLAUDE.md) > Subdirectorios (cargados on-demand)
**Recomendacion oficial:** 50-100 lineas max. Cada linea debe pasar el test: "sin esto, Claude cometeria errores?"
**Soporte @imports:** Puedes referenciar archivos externos con @path/to/file para modularizar.
**Impacto:** Reduce alucinaciones un 40% y acelera comprension del contexto.
**Fuente:** https://code.claude.com/docs/en/best-practices

## 2. Skills — Conocimiento procesal reutilizable

**Que es:** Archivos SKILL.md con frontmatter YAML + instrucciones markdown.
**Ubicacion:** ~/.claude/skills/ (personal), .claude/skills/ (proyecto), plugins
**Frontmatter clave:**
- name: identificador/slash-command (lowercase, hyphens, max 64 chars)
- description: cuando usarla (Claude usa esto para auto-invocar)
- disable-model-invocation: true = solo manual via /nombre
- user-invocable: false = solo Claude puede invocar (conocimiento background)
- allowed-tools: herramientas sin pedir permiso cuando skill activa
- context: fork = ejecutar en subagente aislado
- agent: tipo de subagente cuando context: fork

**Sistema de carga progresiva:**
1. Metadata (~100 palabras) — siempre cargada
2. SKILL.md body (<500 lineas ideal) — cuando skill se activa
3. Recursos bundled (references/) — cargados on-demand

**Substituciones dinamicas:** $ARGUMENTS, $N, ${CLAUDE_SESSION_ID}, ${CLAUDE_SKILL_DIR}
**Inyeccion de contexto dinamico:** !`comando shell` — ejecuta comando y reemplaza con output
**Fuente:** https://code.claude.com/docs/en/skills

## 3. Hooks — Automatizacion determinista

**Que es:** Comandos shell que se ejecutan automaticamente en puntos del ciclo de vida.
**Diferencia critica vs CLAUDE.md:** Los hooks se EJECUTAN SIEMPRE, las instrucciones en CLAUDE.md son "advisory".

**Tipos de hooks:**
- PreToolUse — antes de que Claude ejecute una accion (puede bloquear con exit code 2)
- PostToolUse — despues de una accion (formateo, lint, tests)
- SessionStart / SessionEnd
- WorktreeCreate / WorktreeRemove
- InstructionsLoaded
- PermissionRequest
- Notification / Stop

**Configuracion:** En .claude/settings.json bajo clave "hooks"
**Matchers:** Filtran que herramientas activan el hook (tool, args.pattern)
**IO:** Reciben JSON via stdin, devuelven exit code (0=ok, 1=error, 2=block)
**Fuente:** https://code.claude.com/docs/en/hooks

## 4. Subagentes — Contexto paralelo aislado

**Que es:** Instancias Claude especializadas con contexto propio (200K tokens cada una).
**Tipos built-in:**
- Explore: solo lectura, investigacion
- Plan: analisis y planificacion
- general-purpose: capacidades completas

**Subagentes custom:** Archivos en .claude/agents/ con frontmatter YAML
**Campos:** name, description, tools, model + body markdown como system prompt
**Cuando usarlos:**
- Preservar contexto (investigacion fuera del hilo principal)
- Codebases grandes (2-3 en paralelo duplican contexto disponible)
- Restricciones (agentes read-only para exploracion)
- Trabajo paralelo
**Fuente:** https://code.claude.com/docs/en/sub-agents

## 5. Agent Teams — Equipos multi-agente (experimental)

**Que es:** Multiples sesiones Claude coordinandose como equipo.
**Arquitectura:** Team lead coordina + teammates trabajan independientemente
**Comunicacion:** Mensajeria directa agente-a-agente
**Limitacion:** Solo util para ~5% de tareas; experimental y costoso
**Activacion:** CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
**Fuente:** https://code.claude.com/docs/en/agent-teams

## 6. MCP Servers — Integracion con herramientas externas

**Que es:** Protocolo abierto para conectar Claude con herramientas externas.
**Tipos:** HTTP (remoto), stdio (local), Docker (containerizado)
**Configuracion:** .claude/settings.json (equipo) vs ~/.claude.json (credenciales personales)
**Tool Search:** Carga dinamica on-demand cuando las definiciones exceden 10% del contexto
**Fuente:** https://code.claude.com/docs/en/mcp

## 7. Settings — Modelo de permisos

**Jerarquia:** Managed > Local (.claude/settings.local.json) > Project (.claude/settings.json) > User (~/.claude/settings.json)
**Evaluacion:** Deny > Ask > Allow (primer match gana)
**Sintaxis:** ToolName, ToolName(*), ToolName(filter), ToolName(/path/**)
**settings.json:** Equipo (versionado en git)
**settings.local.json:** Personal (gitignored automaticamente)
**Fuente:** https://code.claude.com/docs/en/settings

## 8. Launch.json — Servidores de desarrollo

**Que es:** Config para servidores de preview que Claude puede iniciar/monitorear.
**Ubicacion:** .claude/launch.json
**Campos:** name, runtimeExecutable, runtimeArgs, port
**Auto-deteccion:** Claude detecta automaticamente para setups comunes
**Fuente:** https://code.claude.com/docs/en/configure-preview

## 9. Plan Mode — Investigacion antes de ejecucion

**Que es:** Modo read-only donde Claude analiza sin hacer cambios.
**Impacto:** Reduce consumo de tokens 40-60% en refactoring multi-archivo
**Atajos:** Ctrl+G (abrir plan en editor), Ctrl+O (verbose), Alt+T (thinking)
**Fuente:** https://code.claude.com/docs/en/common-workflows

## 10. Contexto — Gestion de ventana

**Tamano:** 200K tokens (~150K palabras)
**Degradacion:** Empieza a perder precision al 70%, alucinaciones al 85%, erratico al 90%+
**Compactacion auto:** Se activa al ~83.5% (167K tokens), buffer de 33K
**Estrategias:** /clear entre tareas, /compact manual, subagentes para investigacion
**Fuente:** https://code.claude.com/docs/en/best-practices

## 11. Checkpointing & Rewind

**Que es:** Tracking automatico de ediciones y estado de conversacion.
**Uso:** Esc+Esc o /rewind
**Opciones:** Restaurar codigo+conversacion, solo conversacion, solo codigo, resumir desde aqui
**Fuente:** https://code.claude.com/docs/en/checkpointing

## 12. Plugins

**Que es:** Bundles de skills + agents + hooks + MCP servers pre-empaquetados.
**Marketplace:** Oficial de Anthropic (87+ plugins)
**Instalacion:** /plugin
**Fuente:** https://code.claude.com/docs/en/discover-plugins

## 13. Non-Interactive / CI-CD

**Uso:** claude -p "prompt" --output-format json --allowedTools "Read,Grep"
**Formatos:** plain text, JSON, streaming JSON
**Fuente:** https://code.claude.com/docs/en/best-practices

## 14. Skills built-in destacadas
- /batch: orquesta cambios masivos paralelos (5-30 unidades, usa worktrees)
- /loop interval prompt: ejecuta prompt repetidamente
- /simplify: revisa y mejora cambios recientes
- /debug: troubleshoot sesion actual
