# Mejores Practicas Claude Code (Oficial + Comunidad)

## Principio #1: CLAUDE.md es el artefacto mas importante

- Tratarlo como codigo: revisar cuando algo falla, podar regularmente, testear cambios
- MAX 50-100 lineas (800 tokens). Cada token cuesta inferencia
- Incluir SOLO lo que Claude no puede deducir del codigo
- Usar @imports para modularizar secciones detalladas
- NO incluir: convenciones estandar del lenguaje, documentacion API detallada, info que cambia frecuentemente

**Insight comunidad:** Un CLAUDE.md de 300 lineas es contraproducente. Claude ignora reglas importantes cuando hay demasiado ruido.

## Principio #2: Hooks > Instrucciones para enforcement

- Las instrucciones en CLAUDE.md son "advisory" — Claude puede ignorarlas
- Los hooks son DETERMINISTICOS — se ejecutan siempre
- Regla: si algo DEBE ocurrir (formateo, lint, bloquear .env), usar hooks
- Si algo es "preferible" (estilo de codigo, patrones), usar CLAUDE.md

**Pattern recomendado:**
- PostToolUse(Edit|Write) en *.ts/*.tsx → prettier + eslint
- PreToolUse(Edit|Write) en .env*|*.lock → BLOCK (exit 2)
- Pre-commit: tests + typecheck + lint

## Principio #3: TDD es el patron mas fuerte para coding agenticoz

- Claude genera 1.75x mas errores logicos que codigo humano
- Sin tests, la unica verificacion es el juicio de Claude (degrada con el contexto)
- Tests crean un "oraculo externo" que mantiene precision incluso cuando el contexto se llena
- Patron: escribir tests primero → Claude implementa hasta que pasen → refactor

**Insight comunidad:** "Give Claude a way to verify its work" es LA practica de mayor impacto.

## Principio #4: Especificar QUE, no COMO

- Sobre-especificar el HOW produce peores resultados
- Claude conoce mejores idioms, APIs mas nuevas, patrones mas eficientes
- Comprimir contexto: 5M tokens de codebase → 2K palabras de spec = mejor output
- Describir restricciones y outcomes, no implementacion

## Principio #5: Gestion agresiva del contexto

- /clear entre tareas no relacionadas
- Sesiones de 30-45 min > sesiones de 2h (2-3 compactaciones diluyen calidad)
- Investigacion SIEMPRE delegada a subagentes (preservar contexto principal)
- Si Claude es corregido >2 veces en lo mismo → /clear y reescribir prompt
- Monitorear /context regularmente

## Principio #6: Plan Mode para todo lo no-trivial

- Reduce tokens 40-60% en tareas multi-archivo
- Workflow: Plan mode → iterar plan → auto-accept edits
- Usar para cualquier tarea que toque 5+ archivos
- Skill de Boris Cherny (creador de Claude Code): siempre empezar en Plan mode

## Principio #7: Skills para conocimiento, MCP para herramientas

- Skills: conocimiento procesal (COMO hacer algo) — <500 lineas, carga on-demand
- MCP: conectividad con tools externos (QUE herramientas usar)
- Un MCP de 30 tools consume ~55K tokens solo en schemas
- Tool Search mitiga esto pero aun asi: CLI tools + SKILL.md > MCP servers cuando sea posible

## Principio #8: Subagentes para preservar contexto

- Cada subagente tiene 200K tokens propios
- 2-3 en paralelo efectivamente triplican el contexto disponible
- Pattern Writer/Reviewer: uno escribe, otro revisa con contexto fresco
- Pattern Test-first: uno escribe tests, otro implementa

## Principio #9: Quality gates son enforced, no sugeridos

- Doble proteccion: Claude Code hooks + Git hooks
- Pre-commit: lint + types + tests (husky o prek para gestion)
- PreToolUse: seguridad (bloquear archivos sensibles)
- PostToolUse: formateo automatico
- Zero warnings policy al momento de commit

## Principio #10: Automatizar el bootstrap

- Herramientas existentes: cc-bootstrap, claude-bootstrap, claude-starter-kit
- Workflow: Describir → Scaffold → Lock conventions con CLAUDE.md
- /init genera CLAUDE.md inicial pero es basico — necesita refinamiento
- Repos de referencia:
  - github.com/alinaqi/claude-bootstrap (security-first, spec-driven)
  - github.com/serpro69/claude-starter-kit (template repo)
  - github.com/ChrisWiles/claude-code-showcase (configuracion completa)
  - github.com/FlorianBruniaux/claude-code-ultimate-guide (templates production-ready)

## Anti-patrones a evitar

1. **Kitchen sink session** — mezclar tareas no relacionadas en una sesion
2. **CLAUDE.md sobredimensionado** — >100 lineas = Claude ignora reglas
3. **Corregir >2 veces** — mejor /clear y reescribir prompt
4. **Trust-then-verify gap** — no dar forma de verificar el trabajo
5. **Exploracion infinita** — pedir "investigar" sin scope
6. **--dangerously-skip-permissions en host** — siempre usar containers
7. **MCP servers excesivos** — consumen contexto masivamente
