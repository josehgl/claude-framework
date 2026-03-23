#!/bin/bash
# PreToolUse hook: blocks edits to protected files
# Reads JSON from stdin with tool_input.file_path

set -euo pipefail

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // .tool_input.path // ""')

if [ -z "$FILE_PATH" ]; then
  exit 0
fi

BASENAME=$(basename "$FILE_PATH")
DIRNAME=$(dirname "$FILE_PATH")

# Block .env files
if [[ "$BASENAME" == .env* ]]; then
  echo "BLOCKED: Cannot edit environment files ($BASENAME). These contain secrets." >&2
  exit 2
fi

# Block lock files (unless explicitly intended)
if [[ "$BASENAME" == *.lock || "$BASENAME" == "package-lock.json" || "$BASENAME" == "pnpm-lock.yaml" || "$BASENAME" == "yarn.lock" || "$BASENAME" == "bun.lockb" ]]; then
  echo "BLOCKED: Cannot edit lock files ($BASENAME). Use package manager commands instead." >&2
  exit 2
fi

# Block .git directory
if [[ "$FILE_PATH" == */.git/* || "$FILE_PATH" == *\\.git\\* ]]; then
  echo "BLOCKED: Cannot edit .git internals." >&2
  exit 2
fi

# Block system-generated metrics
if [[ "$FILE_PATH" == */docs/framework/sprints/* ]]; then
  echo "BLOCKED: Sprint records are system-generated. Use record-metrics skill." >&2
  exit 2
fi

exit 0
