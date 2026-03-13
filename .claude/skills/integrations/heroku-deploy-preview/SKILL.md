---
name: heroku-deploy-preview
description: >
  Deploys the application to Heroku for stakeholder review. Manages staging
  deployments, checks build status, and provides the preview URL. Use before
  sprint reviews or when stakeholders need to see progress.
user-invocable: true
allowed-tools: Read, Grep, Glob, Bash, AskUserQuestion
---

# Deploy Preview to Heroku

Deploy the current state to staging for stakeholder review.

## Inputs

- Target environment (staging by default)
- Branch to deploy (current branch by default)
- Heroku app name (detect from git remotes or ask)

## Process

### 1. Detect Heroku App

```bash
# Check if heroku remote exists
git remote -v | grep heroku

# Or check Heroku CLI
heroku apps --json
```

If no Heroku app is configured, ask:
- "What's the Heroku app name for staging?"
- "Should I create a new Heroku app?"

### 2. Pre-Deploy Checks

Before deploying, verify:

```bash
# Check current branch and status
git status
git log --oneline -3

# Run tests locally if available
# (check package.json or Procfile for test command)
```

Ask for confirmation: "Ready to deploy branch `[branch]` to `[app-name]`. Proceed?"

### 3. Deploy

```bash
# Push to Heroku
git push heroku [branch]:main

# Or if using a pipeline with a specific staging app
heroku pipelines:promote --app [staging-app]
```

### 4. Monitor Build

```bash
# Watch build output
heroku builds:info --app [app-name]

# Check for build errors
heroku logs --app [app-name] --num 50
```

If build fails:
- Show the error log
- Identify the failing step
- Suggest fixes

### 5. Verify Deployment

```bash
# Check app status
heroku ps --app [app-name]

# Get the app URL
heroku apps:info --app [app-name] --json
```

Visit the app URL to verify it's running.

### 6. Post-Deploy

```bash
# Run any pending migrations if needed
heroku run --app [app-name] -- [migration command]

# Check environment variables are set
heroku config --app [app-name]
```

### 7. Report

```markdown
## Deployment Complete

| Field | Value |
|-------|-------|
| **App** | [app-name] |
| **URL** | [https://app-name.herokuapp.com] |
| **Branch** | [branch] |
| **Commit** | [sha] — [message] |
| **Status** | Running |
| **Deployed at** | [timestamp] |

### What's New
[List of changes since last deployment — from git log]

### Known Issues
[Any issues to be aware of]

### Review Checklist
- [ ] App is accessible at the URL
- [ ] Key flows are working
- [ ] No errors in logs
```

Ask: "Deployment complete! Want me to share this URL in a GitHub Discussion or Issue comment?"

### 8. Rollback (if needed)

If something goes wrong:

```bash
# Rollback to previous release
heroku rollback --app [app-name]

# Or deploy a specific version
heroku releases --app [app-name]
heroku rollback v[N] --app [app-name]
```

Always ask before rolling back: "The deployment seems to have issues. Want me to rollback to the previous version?"
