#!/bin/bash
# SessionStart hook: injects framework state into Claude's context
# Outputs current sprint and velocity to stdout for context injection

if [ -f "docs/framework/sprint-current.md" ]; then
  echo "=== FRAMEWORK STATE ==="
  echo ""

  # Current sprint summary
  head -20 docs/framework/sprint-current.md
  echo ""

  # Recent velocity
  if [ -f "docs/framework/velocity.md" ]; then
    echo "--- Velocity ---"
    tail -5 docs/framework/velocity.md
  fi

  echo ""
  echo "=== END FRAMEWORK STATE ==="
fi
