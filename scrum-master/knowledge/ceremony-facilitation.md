# Ceremony Facilitation — Reference

How to run Scrum ceremonies effectively in an AI-assisted development context.

---

## Adapting Ceremonies for Claude Code

Traditional Scrum assumes a co-located team. With Claude as a development partner,
ceremonies adapt to a human-AI collaboration model:

- **Human** is the decision-maker and stakeholder
- **Claude** facilitates, tracks, and executes
- Ceremonies are **async-first** — triggered by workflow, not calendar
- **Data replaces meetings** — metrics provide the standup context

---

## Sprint Planning

**Trigger**: end of previous sprint or project start
**Duration**: ~15 minutes of human interaction

### Structure

1. **Review velocity** (Claude presents data)
   - Average velocity, trend, last 3 sprints
   - Available capacity for next sprint

2. **Review backlog** (Claude presents, human decides)
   - Top stories by priority
   - DoR validation for each candidate
   - Stories not meeting DoR are flagged, not included

3. **Negotiate scope** (human decides)
   - Claude proposes stories that fit within velocity
   - Human adjusts (add, remove, reorder)
   - Claude warns if scope exceeds capacity

4. **Define sprint goal** (human states, Claude records)
   - One clear sentence describing the sprint's purpose
   - Everything in the sprint should contribute to this goal

5. **Record** (Claude writes)
   - Update sprint-current.md with agreed scope

---

## Daily Standup

**Trigger**: start of each work session
**Duration**: ~2 minutes

### Structure

1. **Completed since last session** (Claude reads from state)
2. **In progress** (Claude reads from state)
3. **Blocked** (Claude identifies, human decides resolution)
4. **Plan for this session** (human states)

The standup is a quick sync, not a problem-solving session.
If a blocker needs discussion, note it and address it separately.

---

## Sprint Review

**Trigger**: sprint end, before retrospective
**Duration**: ~10 minutes

### Structure

1. **Demo completed work** (human reviews, Claude presents)
   - For each "done" story: show what was built
   - Validate against original AC

2. **PO acceptance** (human decides)
   - Accept: story meets AC, marks as done
   - Reject: story doesn't meet AC, returns to backlog

3. **Metrics snapshot** (Claude presents)
   - Stories completed vs committed
   - Velocity this sprint
   - Any noteworthy metrics

---

## Retrospective

**Trigger**: after sprint review
**Duration**: ~10 minutes

### Structure

1. **Data presentation** (Claude presents)
   - Sprint metrics with health indicators
   - Comparison to previous sprints
   - Previous retro action item status

2. **Reflection** (human responds)
   - Keep / Stop / Try format (default)
   - Ground in data, not just feelings

3. **Action items** (human decides, Claude records)
   - 1-2 specific experiments for next sprint
   - Each with owner, due date, success criteria

4. **Config updates** (Claude suggests, human approves)
   - Adjust targets if needed
   - Add/modify hooks if needed

---

## Anti-patterns to Avoid

| Anti-pattern | Fix |
|-------------|-----|
| Skipping ceremonies because "everything is fine" | Ceremonies catch issues before they grow |
| Using standup for problem-solving | Note blockers, solve them separately |
| Not tracking retro actions | First topic of every retro: previous actions |
| Changing too much at once | 1-2 experiments per sprint maximum |
| Planning without data | Always base on velocity, never on optimism |
| Skipping review when stories are "obviously done" | DoD validation is mandatory |
