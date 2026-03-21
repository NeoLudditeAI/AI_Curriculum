# CURRICULUM.md — AI Frontier Curriculum

Master index and single source of truth for module status.

Last updated: 2026-03-20

---

## Modules

| # | Title | Status | Last Updated | Word Count | Key Topics |
|---|-------|--------|--------------|------------|------------|
| 00 | [Landscape Overview](modules/MODULE-00-landscape-overview.md) | PLANNED | — | — | Major AI ecosystems (Anthropic, OpenAI, Google, Microsoft); specialized tools; coding tools; open-source/self-hosted; market structure; key battlegrounds |
| 01 | [Models & Intelligence Tiers](modules/MODULE-01-models-and-intelligence.md) | PLANNED | — | — | Model lineups across providers; context windows; pricing; benchmarks; reasoning modes (extended thinking, CoT, Deep Think, o-series); multimodal capabilities; model selection strategy |
| 02 | [Context Engineering](modules/MODULE-02-context-engineering.md) | PLANNED | — | — | Context windows (sizes, pricing, limits); prompt caching; memory systems (Claude Memory, ChatGPT Saved Memories, Gemini Personal Intelligence); RAG patterns; context compaction; context engineering as discipline |
| 03 | [Single-Agent Systems](modules/MODULE-03-single-agent-systems.md) | PLANNED | — | — | Claude Code, Codex, Jules, ChatGPT Agent, Cowork, computer use, browser automation; agent architecture (gather-act-verify); tool use; sandboxing; safety models |
| 04 | [Multi-Agent Orchestration](modules/MODULE-04-multi-agent-orchestration.md) | PLANNED | — | — | Agent Teams, Agent SDK, OpenAI Agents SDK, Google ADK, Copilot Studio; delegation patterns; context isolation; summary propagation; Agent 365; permissions; monitoring |
| 05 | [OpenClaw & Open Agent Ecosystem](modules/MODULE-05-openclaw-and-open-agents.md) | PLANNED | — | — | OpenClaw architecture (Gateway, channels, Pi Agent Runtime); ClawHub skills registry; security concerns; local-first philosophy; NemoClaw (NVIDIA); relation to MCP and big platforms |
| 06 | [MCP & the Integration Layer](modules/MODULE-06-mcp-integration-layer.md) | PLANNED | — | — | MCP protocol; server/client architecture; registry; adoption across platforms; building/consuming servers; Zapier MCP; native integrations |
| 07 | [Skills, Plugins & Automation](modules/MODULE-07-skills-plugins-automation.md) | PLANNED | — | — | Skills architecture (Claude Skills, OpenClaw Skills, Codex Skills); plugin systems; marketplaces; scheduled tasks; event-driven triggers; Zapier, Make, Power Automate |
| 08 | [Consumer AI Comparison](modules/MODULE-08-consumer-ai-comparison.md) | PLANNED | — | — | Feature-by-feature comparison (Claude, ChatGPT, Gemini, Copilot); pricing analysis (free through enterprise); user sentiment; strengths/weaknesses; unique differentiators |
| 09 | [Developer Platforms & APIs](modules/MODULE-09-developer-platforms-apis.md) | PLANNED | — | — | API architectures (Anthropic Messages, OpenAI Responses, Gemini); SDKs; pricing economics; structured outputs; function calling; tool use; fine-tuning |
| 10 | [Frontier Topics](modules/MODULE-10-frontier-topics.md) | PLANNED | — | — | On-device AI; multimodal generation; enterprise agent governance; safety and alignment; open vs. closed ecosystems; upcoming events (Google I/O 2026, WWDC 2026) |

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

## Module lifecycle states

```
PLANNED → RESEARCHING → DRAFTING → IN REVIEW → REVISION → COMPLETE
```
