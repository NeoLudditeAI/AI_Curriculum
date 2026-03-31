# CURRICULUM.md — AI Frontier Curriculum

Master index and single source of truth for module status.

Last updated: 2026-03-22 (Round 8 complete; all production rounds finished)

---

## Modules

| # | Title | Status | Last Updated | Word Count | Key Topics |
|---|-------|--------|--------------|------------|------------|
| 00 | [Landscape Overview](modules/MODULE-00-landscape-overview.md) | COMPLETE (R2) | 2026-03-21 | ~4,000 | Major AI ecosystems (Anthropic, OpenAI, Google, Microsoft); specialized tools; coding tools; open-source/self-hosted; market structure; key battlegrounds |
| 01 | [Models & Intelligence Tiers](modules/MODULE-01-models-and-intelligence.md) | COMPLETE (R2) | 2026-03-21 | ~4,500 | Model lineups across providers; context windows; pricing; benchmarks; reasoning modes (extended thinking, CoT, Deep Think, o-series); multimodal capabilities; model selection strategy |
| 02 | [Context Engineering](modules/MODULE-02-context-engineering.md) | COMPLETE (R2) | 2026-03-21 | ~5,800 | Context windows (sizes, pricing, limits); prompt caching; memory systems (Claude Memory); RAG patterns (architectural patterns, vector DBs, chunking, decision framework); context compaction; context engineering as discipline |
| 03 | [Single-Agent Systems](modules/MODULE-03-single-agent-systems.md) | COMPLETE (R2) | 2026-03-21 | ~3,800 | Claude Code, Codex, Jules, ChatGPT Agent, Cowork, computer use, browser automation; agent architecture (gather-act-verify); tool use; sandboxing; safety models; cost analysis |
| 04 | [Multi-Agent Orchestration](modules/MODULE-04-multi-agent-orchestration.md) | COMPLETE (R2) | 2026-03-21 | ~4,900 | Agent Teams, Agent SDK, OpenAI Agents SDK, Google ADK, Copilot Studio; delegation patterns; context isolation; summary propagation; Agent 365; strategic model selection in multi-agent systems |
| 05 | [OpenClaw & Open Agent Ecosystem](modules/MODULE-05-openclaw-and-open-agents.md) | COMPLETE (R2) | 2026-03-21 | ~3,600 | OpenClaw architecture (Gateway, channels, Pi Agent Runtime); ClawHub skills registry (13,700+); security concerns (ClawHavoc, ClawJacked); local-first philosophy; NemoClaw (NVIDIA); 250K+ GitHub stars |
| 06 | [MCP & the Integration Layer](modules/MODULE-06-mcp-integration-layer.md) | COMPLETE (R2) | 2026-03-21 | ~4,300 | MCP protocol (JSON-RPC 2.0, transports, OAuth 2.1); server/client architecture; core primitives (tools, resources, prompts); registry (19,700+ servers); platform adoption matrix; building servers; Zapier MCP; native integrations |
| 07 | [Skills, Plugins & Automation](modules/MODULE-07-skills-plugins-automation.md) | COMPLETE (R2) | 2026-03-21 | ~3,800 | Skills architecture (Claude Skills, OpenClaw Skills, Codex Skills); plugin systems; marketplaces; scheduled tasks (practical depth); event-driven triggers (Codex, Power Automate, MCP); Zapier, Make, Power Automate |
| 08 | [Consumer AI Comparison](modules/MODULE-08-consumer-ai-comparison.md) | COMPLETE (R2) | 2026-03-21 | ~3,900 | Feature-by-feature comparison (Claude, ChatGPT, Gemini, Copilot); corrected pricing analysis (free through enterprise); developer sentiment (community-sourced); strengths/weaknesses; unique differentiators |
| 09 | [Developer Platforms & APIs](modules/MODULE-09-developer-platforms-apis.md) | COMPLETE (R2) | 2026-03-21 | ~4,100 | API architectures (Anthropic Messages, OpenAI Responses, Gemini, Azure OpenAI); SDKs across languages; pricing economics (caching with 3 Anthropic tiers, batching, model tiering); structured outputs; function calling; fine-tuning; platform selection framework |
| 10 | [Frontier Topics](modules/MODULE-10-frontier-topics.md) | COMPLETE (R2) | 2026-03-21 | ~4,400 | On-device AI (Gemini Nano, Apple Intelligence, Qualcomm); multimodal generation (Sora 2, Veo 3.1, Flow, Midjourney, ElevenLabs); enterprise agent governance comparison table (Agent 365, EU AI Act); safety and alignment; open vs. closed ecosystems; upcoming events with speculation caveats |

---

## Module dependency graph

```
Module 00 (Landscape) ──────────────┐
Module 01 (Models) ─────────────────┤── Foundation (build first)
                                    │
Module 02 (Context Engineering) ────┤
Module 03 (Single Agents) ──────────┤── Core (build in parallel after foundation)
Module 06 (MCP) ────────────────────┤
                                    │
Module 04 (Multi-Agent) ────────────┤── Requires Module 03
Module 05 (OpenClaw) ───────────────┤── Independent (can build anytime after 00)
Module 07 (Skills/Plugins) ─────────┤── Requires Modules 03, 06
                                    │
Module 08 (Consumer Comparison) ────┤── Requires Modules 00-03 at minimum
Module 09 (Developer APIs) ─────────┤── Requires Module 01
Module 10 (Frontier Topics) ────────┘── Build last (synthesizes everything)
```

## Execution batches

1. **Batch 1 (foundation):** Module 00, Module 01 — in parallel
2. **Batch 2 (core):** Modules 02, 03, 05, 06, 09 — in parallel
3. **Batch 3 (dependent):** Modules 04, 07, 08 — in parallel
4. **Batch 4 (capstone):** Module 10 — after all others
5. **Synthesis pass:** Full curriculum review via synthesizer agent

## Pedagogical design (Round 3 — COMPLETE)

Round 3 produced a comprehensive pedagogical design document (`reference/research/PEDAGOGICAL-DESIGN.md`) specifying how to transform the 11 modules into an interactive learning experience. Key outputs:

- **Learning sequence:** M00, M01, M02, M03, M06, M04, M05, M07, M09, M08, M10 (reordered from numerical)
- **4-Part structure:** The Terrain (M00-M02), Agent Systems (M03, M06, M04, M05), Building & Automating (M07, M09), Synthesis & Horizon (M08, M10)
- **9 workstream files** in `reference/research/round-3/` (~81,400 words of design specifications)
- **Citation standardization** applied to M00, M07, M10 (deferred from Round 2)
- **Round 4 ready:** Design specs cover components, layout, assessment, visuals, engagement, accessibility, and spaced repetition

## Production roadmap (Rounds 4–8)

Production is decomposed into five focused rounds, each building on the previous (see DECISION_LOG.md for the Round 6-8 decomposition rationale):

| Round | Name | Scope | Status |
|-------|------|-------|--------|
| 4 | Foundation Build | Build pipeline, CSS design system, page templates, navigation, M00 proof-of-concept | **COMPLETE** |
| 5 | Component Build | 9 interactive JS components, localStorage integration, dark mode toggle, annotation injector upgrade | **COMPLETE** |
| 6 | Annotation Authoring | 11 YAML annotation files (337 entries), engagement content, 5 capstone expert answers | **COMPLETE** |
| 7 | Diagrams & Visual Production | Client-side Mermaid.js/Chart.js infrastructure, 21 HIGH-priority diagrams (15 Mermaid, 3 decision trees, 2 charts, 1 recommendation quiz), 4 new JS files, _diagrams.css | **COMPLETE** |
| 8 | Assembly & QA | Full 11-module build, cross-browser testing, accessibility audit (WCAG 2.2 AA), conditional script loading, single-HTML export (1.31 MB) | **COMPLETE** |

See `CURRENT_CYCLE.md` for detailed scope and `DECISION_LOG.md` for the decomposition rationale.

## Module lifecycle states

```
PLANNED → RESEARCHING → DRAFTING → IN REVIEW → REVISION → COMPLETE
```
