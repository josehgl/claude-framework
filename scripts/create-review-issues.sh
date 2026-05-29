#!/usr/bin/env bash
# Creates GitHub issues from a code review findings file.
# Called by the dev-code-reviewer agent after producing a review report.
#
# Input: a findings file (one JSON object per line) at .claude/.code-review-findings.json
# Format per line:
#   {"title": "...", "severity": "critical|improvement|nitpick", "file": "...", "description": "...", "suggestion": "..."}
#
# Behavior:
#   - critical → creates issue with labels: bug, code-review, priority:high
#   - improvement → creates issue with labels: tech-debt, code-review
#   - nitpick → skipped (not worth an issue)
#
# Usage: bash scripts/create-review-issues.sh

set -euo pipefail

FINDINGS_FILE=".claude/.code-review-findings.json"

if [ ! -f "$FINDINGS_FILE" ]; then
  echo "No findings file found at $FINDINGS_FILE — nothing to create."
  exit 0
fi

# Ensure gh is available
if ! command -v gh &> /dev/null; then
  echo "ERROR: GitHub CLI (gh) is required. Install it from https://cli.github.com"
  exit 1
fi

CREATED=0
SKIPPED=0

while IFS= read -r line; do
  # Skip empty lines
  [ -z "$line" ] && continue

  SEVERITY=$(echo "$line" | jq -r '.severity // "nitpick"')
  TITLE=$(echo "$line" | jq -r '.title')
  FILE=$(echo "$line" | jq -r '.file // "unknown"')
  DESCRIPTION=$(echo "$line" | jq -r '.description')
  SUGGESTION=$(echo "$line" | jq -r '.suggestion // "No suggestion provided"')

  # Skip nitpicks
  if [ "$SEVERITY" = "nitpick" ]; then
    SKIPPED=$((SKIPPED + 1))
    continue
  fi

  # Determine labels
  if [ "$SEVERITY" = "critical" ]; then
    LABELS="bug,code-review,priority:high"
  else
    LABELS="tech-debt,code-review"
  fi

  # Create the issue
  BODY=$(cat <<EOF
## Code Review Finding

**Severity:** $SEVERITY
**File:** \`$FILE\`

### Description
$DESCRIPTION

### Suggested Fix
$SUGGESTION

---
*Auto-created by dev-code-reviewer agent*
EOF
)

  gh issue create \
    --title "[Code Review] $TITLE" \
    --body "$BODY" \
    --label "$LABELS" \
    > /dev/null 2>&1 && {
      echo "  ✅ Created issue: [Code Review] $TITLE ($SEVERITY)"
      CREATED=$((CREATED + 1))
    } || {
      echo "  ⚠️  Failed to create issue: $TITLE (labels may not exist yet)"
      # Try without labels
      gh issue create \
        --title "[Code Review] $TITLE" \
        --body "$BODY" \
        > /dev/null 2>&1 && {
          echo "  ✅ Created issue without labels: [Code Review] $TITLE"
          CREATED=$((CREATED + 1))
        } || {
          echo "  ❌ Failed to create issue: $TITLE"
        }
    }

done < "$FINDINGS_FILE"

# Clean up findings file after processing
rm -f "$FINDINGS_FILE"

echo ""
echo "Review issues: $CREATED created, $SKIPPED skipped (nitpicks)"
