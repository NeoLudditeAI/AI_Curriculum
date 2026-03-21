---
paths:
  - 'blog/**'
---

# Blog / process journal standards

## Purpose

Blog posts document the process, decisions, and learnings from each significant work session. They serve as both a human-readable narrative and an exhaustive reference journal for future sessions.

## Format

- **File type:** HTML with inline CSS (no external dependencies)
- **Naming:** `YYYY-MM-DD-slug.html` (e.g., `2026-03-21-building-the-curriculum.html`)
- **Styling:** Responsive, dark/light mode compatible, clean typography
- **Self-contained:** Each post must render correctly when opened directly in a browser

## Content requirements

- Session goals and what was accomplished
- Agent execution stats (researchers, writers, reviewers deployed; how many in parallel)
- Specific problems encountered and how they were resolved
- Lessons learned (both what worked and what to improve)
- Cross-references to relevant modules, decisions, and sources
- Honest about failures — don't sanitize the narrative
- Specific numbers over vague descriptions (word counts, agent counts, timing)

## When to write

- After completing a batch of modules or significant structural change
- After resolving a major issue or making an architectural decision
- After any session that produces learnings worth preserving for future sessions

## Relationship to other files

- Blog posts are derivative content — they document the process, not the curriculum itself
- DECISION_LOG.md records structural decisions; blog posts provide narrative context around those decisions
- CURRENT_CYCLE.md tracks work state; blog posts are the retrospective reflection on that work
