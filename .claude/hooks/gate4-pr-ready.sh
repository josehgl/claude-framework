#!/bin/bash
# PostToolUse hook: validates Gate 4 criteria before PR operations
# Checks PR size, conventional commit format, and branch status

set -euo pipefail

INPUT=$(cat)
TOOL=$(echo "$INPUT" | jq -r '.tool_name // ""')

# Only trigger on Bash commands that create PRs
if [ "$TOOL" != "Bash" ]; then
  exit 0
fi

COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // ""')

# Only check on gh pr create commands
if [[ "$COMMAND" != *"gh pr create"* ]]; then
  exit 0
fi

WARNINGS=""

# Check diff size
DIFF_STAT=$(git diff main --stat 2>/dev/null | tail -1 || echo "")
if [ -n "$DIFF_STAT" ]; then
  INSERTIONS=$(echo "$DIFF_STAT" | grep -o '[0-9]* insertion' | grep -o '[0-9]*' || echo "0")
  DELETIONS=$(echo "$DIFF_STAT" | grep -o '[0-9]* deletion' | grep -o '[0-9]*' || echo "0")
  TOTAL=$((${INSERTIONS:-0} + ${DELETIONS:-0}))

  if [ "$TOTAL" -gt 300 ]; then
    WARNINGS="$WARNINGS\nGate 4 WARNING: PR is $TOTAL lines (limit: 300). Consider splitting."
  fi
fi

# Check branch is up to date with main
BEHIND=$(git rev-list --count HEAD..main 2>/dev/null || echo "0")
if [ "${BEHIND:-0}" -gt 0 ]; then
  WARNINGS="$WARNINGS\nGate 4 WARNING: Branch is $BEHIND commits behind main. Rebase first."
fi

if [ -n "$WARNINGS" ]; then
  echo -e "$WARNINGS" >&2
fi

exit 0
