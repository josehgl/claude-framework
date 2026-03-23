#!/bin/bash
# PreToolUse hook: reminds about TDD when editing source files
# Checks if tests exist for the file being edited
# Provides guidance, does not block (blocking is too rigid for all contexts)

set -euo pipefail

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // .tool_input.path // ""')

if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# Only check source code files (not tests, configs, docs)
case "$FILE_PATH" in
  *.test.*|*.spec.*|test_*|*_test.*|*.md|*.json|*.yaml|*.yml|*.toml|*.lock|*.css|*.scss|*.html)
    exit 0
    ;;
  *.ts|*.tsx|*.js|*.jsx|*.py|*.go|*.rs)
    ;;
  *)
    exit 0
    ;;
esac

# Derive expected test file paths
BASENAME=$(basename "$FILE_PATH")
DIRNAME=$(dirname "$FILE_PATH")
NAME_NO_EXT="${BASENAME%.*}"
EXT="${BASENAME##*.}"

# Check common test file patterns
TEST_EXISTS=false
for PATTERN in \
  "${DIRNAME}/${NAME_NO_EXT}.test.${EXT}" \
  "${DIRNAME}/${NAME_NO_EXT}.spec.${EXT}" \
  "${DIRNAME}/__tests__/${NAME_NO_EXT}.test.${EXT}" \
  "${DIRNAME}/../tests/test_${NAME_NO_EXT}.py" \
  "${DIRNAME}/${NAME_NO_EXT}_test.go"; do
  if [ -f "$PATTERN" ]; then
    TEST_EXISTS=true
    break
  fi
done

if [ "$TEST_EXISTS" = false ]; then
  echo "TDD reminder: No test file found for $BASENAME. Consider writing tests first (Gate 2)." >&2
fi

# Never block — just remind
exit 0
