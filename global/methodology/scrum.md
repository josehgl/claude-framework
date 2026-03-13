# Scrum Methodology

## Sprint Structure

- **Sprint length:** 1-2 weeks (defined per project)
- **Sprint goal:** One clear objective per sprint, derived from PO priorities
- **Capacity:** Estimated in story points (Fibonacci: 1, 2, 3, 5, 8, 13)

## Ceremonies

### Sprint Planning

**When:** Start of each sprint
**Who:** PO + SM + Dev agents
**Duration:** Timeboxed to 1 hour equivalent
**Output:**
- Sprint goal agreed
- Stories selected from backlog (prioritized by PO)
- Stories decomposed into tasks (by Dev)
- Each story meets Definition of Ready

### Daily Standup

**When:** Start of each work session
**Who:** SM checks in with active agents
**Format:**
- What was completed since last session?
- What is being worked on now?
- Any impediments?
**SM tracks:** velocity, blocked items, burndown

### Sprint Review

**When:** End of sprint
**Who:** PO + SM + Dev
**Output:**
- Demo of completed work
- PO accepts or rejects each story against AC
- Rejected stories return to backlog with feedback
- Accepted stories marked as Done

### Sprint Retrospective

**When:** After sprint review
**Who:** All systems
**Output:**
- What went well? (keep doing)
- What didn't work? (stop doing)
- What to try next? (experiment)
- Action items captured and tracked

---

## Definition of Ready (DoR)

A story is ready for sprint ONLY when:

- [ ] User story written (As a... I want... So that...)
- [ ] Acceptance criteria in Given/When/Then format
- [ ] All AC are testable and unambiguous
- [ ] Story is estimated (story points)
- [ ] Dependencies identified and resolved
- [ ] Edge cases and error scenarios documented
- [ ] PO has approved the story

**If a story doesn't meet DoR, it cannot enter a sprint.**

---

## Definition of Done (DoD)

A story is Done ONLY when ALL of these are true:

- [ ] All acceptance criteria pass (tests green)
- [ ] Code reviewed and approved
- [ ] Test coverage meets target (default: 80% business logic)
- [ ] Lint clean (zero errors, zero warnings)
- [ ] Type check clean (zero errors)
- [ ] PR merged to main
- [ ] No regressions (existing tests still pass)
- [ ] Documentation updated (if public API changed)
- [ ] PO has accepted the story in sprint review

**If any item fails, the story is NOT Done. Period.**

---

## Backlog Management

### Priority Levels

| Priority | Meaning | SLA |
|----------|---------|-----|
| P0 — Critical | Blocks everything, production down | Immediate |
| P1 — High | Sprint goal at risk | This sprint |
| P2 — Medium | Important, not urgent | Next sprint |
| P3 — Low | Nice to have | Backlog |

### Backlog Grooming

- PO maintains and prioritizes the backlog
- Stories are refined until they meet DoR
- Large stories are decomposed into smaller ones (max 8 story points)
- Stories older than 3 sprints without prioritization are candidates for removal

---

## Roles in Scrum Context

| Role | System | Responsibility |
|------|--------|---------------|
| Product Owner | PO system | Prioritize backlog, write AC, accept/reject stories |
| Scrum Master | SM system | Enforce process, track velocity, remove impediments |
| Development Team | Dev system | Estimate, implement, test, deliver |

The SM enforces the process. The PO decides what to build. Dev decides how to build it.
No role can override another's domain.
