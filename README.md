# AI Frontier Curriculum

A comprehensive, living curriculum covering the bleeding edge of LLMs, consumer AI tools, agentic systems, and the surrounding ecosystem as of March 2026.

Built entirely using **Claude Code with multi-agent orchestration** across 8 production rounds, this project is both a learning resource and a demonstration of agentic AI workflows at scale.

## What's Inside

**11 modules (~47,000 words)** covering the full AI landscape:

| # | Module | Topics |
|---|--------|--------|
| 00 | Landscape Overview | Major AI ecosystems, market structure, key battlegrounds |
| 01 | Models & Intelligence Tiers | Model lineups, pricing, benchmarks, reasoning modes, multimodal capabilities |
| 02 | Context Engineering | Context windows, prompt caching, memory systems, RAG patterns |
| 03 | Single-Agent Systems | Claude Code, Codex, Jules, agent architecture, safety models |
| 04 | Multi-Agent Orchestration | Agent Teams, Agent SDK, delegation patterns, context isolation |
| 05 | OpenClaw & Open Agents | OpenClaw architecture, ClawHub, security concerns, local-first philosophy |
| 06 | MCP & Integration Layer | Model Context Protocol, server/client architecture, platform adoption |
| 07 | Skills, Plugins & Automation | Skills architecture, scheduled tasks, Zapier, Make, Power Automate |
| 08 | Consumer AI Comparison | Feature-by-feature comparison of Claude, ChatGPT, Gemini, Copilot |
| 09 | Developer Platforms & APIs | API architectures, SDKs, pricing economics, structured outputs |
| 10 | Frontier Topics | On-device AI, multimodal generation, enterprise governance, safety |

## Interactive HTML Deliverables

The curriculum ships as a fully interactive static site with:

- **9 interactive components** — quizzes, self-explanation prompts, worked-example faders, decision trees, glossary tooltips, progress tracking
- **21 diagrams** — Mermaid.js architecture diagrams, Chart.js visualizations, a recommendation quiz
- **55-term glossary** with inline tooltips on first use
- **Dark mode** with system preference detection
- **WCAG 2.2 AA accessible** — keyboard navigation, ARIA landmarks, contrast-verified
- **Single-file export** — `curriculum-complete.html` (1.31 MB) for offline reading

### Viewing the Curriculum

Open `deliverables/html/index.html` in any browser. No server required — everything works via `file://`.

To build from source:
```bash
cd build && npm install && node build.js
```

Verify the build:
```bash
node build/verify.js  # 25 automated checks
```

## How It Was Built

This project was built across 8 rounds using Claude Code's multi-agent capabilities. Each round deployed teams of 5-10 Opus 4.6 agents working in parallel with specialized roles (researchers, writers, reviewers, engineers).

| Round | Focus | Key Output |
|-------|-------|------------|
| 1 | Initial drafting | 11 modules, 43K words |
| 2 | Source verification & refinement | 83 verified sources, 47K words |
| 3 | Pedagogical design | 81K words of learning science specs |
| 4 | Build pipeline & CSS | Handlebars templates, 7-file design system |
| 5 | Interactive components | 11 JS files, 98.5K of component code |
| 6 | Annotation authoring | 337 YAML annotations, 5 capstone documents |
| 7 | Diagrams & visualizations | 21 diagrams, Mermaid.js/Chart.js infrastructure |
| 8 | Assembly & QA | Accessibility audit, conditional loading, single-file export |

The process is documented in detail in `blog/` — each round has a full session journal.

## Project Structure

```
modules/           Source markdown (one file per module)
deliverables/html/ Built interactive HTML site
build/             Build pipeline (Node.js/Handlebars/Remark)
reference/         Research profiles and pedagogical design specs
blog/              Process journal (HTML, one post per round)
CURRICULUM.md      Module index and status
SOURCES.md         83+ verified sources
GLOSSARY.md        55 canonical term definitions
DECISION_LOG.md    Architectural decisions with rationale
CURRENT_CYCLE.md   Detailed build history
```

## For AI Collaborators

This repo is designed to be worked on with Claude Code. The `.claude/` directory contains:

- **Agent definitions** (`agents/`) — researcher, writer, reviewer, synthesizer roles
- **Scoped rules** (`rules/`) — module writing standards, research standards, blog standards
- **CLAUDE.md** — persistent instructions for any agent session

Start by reading `CURRENT_CYCLE.md` for full project state, then `CURRICULUM.md` for module status.

## Audience

Technically sophisticated self-learners who use AI tools daily and want structured, deep expertise — the kind of understanding that lets you make architectural decisions, evaluate new tools, and teach others.

## License

Educational resource. Content reflects the state of the AI landscape as of March 2026 and will evolve.
