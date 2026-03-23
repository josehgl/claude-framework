#!/bin/bash
# PostToolUse hook: validates code quality after file edits
# Runs lint and type check on edited files, provides feedback
# Only triggers on source code files, not configs or docs

set -euo pipefail

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // .tool_input.path // ""')

if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# Only check source code files
case "$FILE_PATH" in
  *.ts|*.tsx|*.js|*.jsx|*.py|*.go|*.rs)
    ;;
  *)
    exit 0
    ;;
esac

# Skip test files from gate3 (they're gate2 domain)
case "$FILE_PATH" in
  *.test.*|*.spec.*|test_*|*_test.*)
    exit 0
    ;;
esac

ERRORS=""

# Try to run linter if available
if [ -f "package.json" ]; then
  if grep -q '"lint"' package.json 2>/dev/null; then
    LINT_OUTPUT=$(npm run lint -- --quiet 2>&1) || true
    if echo "$LINT_OUTPUT" | grep -qi "error"; then
      ERRORS="$ERRORS\nLint issues found. Run 'npm run lint' to see details."
    fi
  fi
elif [ -f "pyproject.toml" ]; then
  if command -v ruff &>/dev/null; then
    LINT_OUTPUT=$(ruff check "$FILE_PATH" 2>&1) || true
    if [ -n "$LINT_OUTPUT" ]; then
      ERRORS="$ERRORS\nRuff issues in $FILE_PATH"
    fi
  fi
fi

# Check for hardcoded secrets (basic patterns)
if grep -nEi "(password|secret|api_key|apikey|token)\s*[:=]\s*['\"][^'\"]{8,}" "$FILE_PATH" 2>/dev/null; then
  ERRORS="$ERRORS\nWARNING: Possible hardcoded secret detected in $FILE_PATH"
fi

# Check for TODOs without issue links
if grep -n "TODO" "$FILE_PATH" 2>/dev/null | grep -v "#[0-9]" | grep -v "https://" >/dev/null 2>&1; then
  ERRORS="$ERRORS\nTODO without issue link found in $FILE_PATH. Add a #issue-number reference."
fi

if [ -n "$ERRORS" ]; then
  echo -e "Gate 3 checks:$ERRORS" >&2
fi

# Don't block — just provide feedback
exit 0
