# Installer

The entry point skill (`/framework`) that links the framework to new projects.

## Planned Functionality

1. Detect if project is new or existing
2. Link global methodology to `~/.claude/`
3. Create project-specific `.claude/` overrides
4. Initialize `docs/product-spec.md` through PO system
5. Scaffold project structure through Dev system
6. Set up metrics tracking
7. Run initial quality audit

## Invocation

```
/framework              — Full setup (interview + scaffold)
/framework audit        — Check existing project config
/framework update       — Update framework to latest version
```

## Status: Built incrementally as each system is completed
