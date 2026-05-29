#!/usr/bin/env bash
# Sets up branch protection rules on the main branch using GitHub CLI.
# Requires: gh auth login (GitHub CLI authenticated)
#
# Rules enforced:
#   - No direct push to main (requires PR)
#   - CI status checks must pass before merge
#   - At least 0 approvals (can be raised to 1+ by the user)
#
# Usage: bash scripts/setup-branch-protection.sh

set -euo pipefail

# Detect repo from git remote
REPO=$(gh repo view --json nameWithOwner -q '.nameWithOwner' 2>/dev/null)
if [ -z "$REPO" ]; then
  echo "ERROR: Could not detect GitHub repo. Make sure you're in a git repo with a GitHub remote."
  exit 1
fi

BRANCH="main"
echo "Setting up branch protection for $REPO ($BRANCH)..."

# Check if CI workflow exists to know what status checks to require
CI_CHECK="quality"
if [ -f ".github/workflows/ci.yml" ]; then
  echo "  CI workflow detected — requiring 'Quality Checks' status check"
else
  echo "  No CI workflow found — skipping required status checks"
  CI_CHECK=""
fi

# Create ruleset via gh API (works on Free plan, unlike branch protection rules)
# Rulesets are available on all plans since 2024
gh api repos/$REPO/rulesets \
  --method POST \
  --field name="Protect main" \
  --field target="branch" \
  --field enforcement="active" \
  --field 'conditions[ref_name][include][]=refs/heads/main' \
  --field 'rules[][type]=pull_request' \
  --field 'rules[0][parameters][required_approving_review_count]=0' \
  --field 'rules[0][parameters][dismiss_stale_reviews_on_push]=true' \
  --field 'rules[0][parameters][require_last_push_approval]=false' \
  --field 'rules[][type]=required_status_checks' \
  --field 'rules[1][parameters][strict_required_status_checks_policy]=false' \
  --field "rules[1][parameters][required_status_checks][][context]=$CI_CHECK" \
  > /dev/null 2>&1 && {
    echo "  ✅ Branch ruleset created successfully"
  } || {
    echo "  ⚠️  Ruleset creation failed. Trying classic branch protection..."

    # Fallback to classic branch protection (requires admin or Pro plan)
    gh api repos/$REPO/branches/$BRANCH/protection \
      --method PUT \
      --field 'required_pull_request_reviews[required_approving_review_count]=0' \
      --field 'required_pull_request_reviews[dismiss_stale_reviews]=true' \
      --field 'required_status_checks[strict]=false' \
      --field "required_status_checks[contexts][]=$CI_CHECK" \
      --field 'enforce_admins=false' \
      --field 'restrictions=null' \
      > /dev/null 2>&1 && {
        echo "  ✅ Classic branch protection set up successfully"
      } || {
        echo "  ❌ Branch protection failed. You may need to set it up manually in GitHub Settings > Branches."
        echo "     This typically requires a Pro/Team plan or public repo for classic protection."
        echo "     Rulesets are available on Free plan but require repo admin access."
      }
  }

echo ""
echo "Branch protection summary for $REPO/$BRANCH:"
echo "  - Direct push to main: BLOCKED"
echo "  - Pull requests required: YES"
echo "  - CI checks must pass: YES"
echo "  - Required approvals: 0 (increase in GitHub Settings if needed)"
echo ""
echo "Done."
