# CURRICULUM.md — AI Frontier Curriculum

Master index and single source of truth for module status.

Last updated: 2026-03-21

---

## Modules

| # | Title | Status | Last Updated | Word Count | Key Topics |
|---|-------|--------|--------------|------------|------------|
| 00 | [Landscape Overview](modules/MODULE-00-landscape-overview.md) | COMPLETE | 2026-03-20 | ~4,800 | Major AI ecosystems (Anthropic, OpenAI, Google, Microsoft); specialized tools; coding tools; open-source/self-hosted; market structure; key battlegrounds |
| 01 | [Models & Intelligence Tiers](modules/MODULE-01-models-and-intelligence.md) | COMPLETE | 2026-03-20 | ~5,400 | Model lineups across providers; context windows; pricing; benchmarks; reasoning modes (extended thinking, CoT, Deep Think, o-series); multimodal capabilities; model selection strategy |
| 02 | [Context Engineering](modules/MODULE-02-context-engineering.md) | COMPLETE | 2026-03-21 | ~4,300 | Context windows (sizes, pricing, limits); prompt caching; memory systems (Claude Memory, ChatGPT Saved Memories, Gemini Personal Intelligence); RAG patterns; context compaction; context engineering as discipline |
| 03 | [Single-Agent Systems](modules/MODULE-03-single-agent-systems.md) | COMPLETE | 2026-03-21 | ~3,800 | Claude Code, Codex, Jules, ChatGPT Agent, Cowork, computer use, browser automation; agent architecture (gather-act-verify); tool use; sandboxing; safety models |
| 04 | [Multi-Agent Orchestration](modules/MODULE-04-multi-agent-orchestration.md) | COMPLETE | 2026-03-21 | ~3,800 | Agent Teams, Agent SDK, OpenAI Agents SDK, Google ADK, Copilot Studio; delegation patterns; context isolation; summary propagation; Agent 365; permissions; monitoring |
| 05 | [OpenClaw & Open Agent Ecosystem](modules/MODULE-05-openclaw-and-open-agents.md) | COMPLETE | 2026-03-21 | ~3,600 | OpenClaw architecture (Gateway, channels, Pi Agent Runtime); ClawHub skills registry; security concerns (ClawHavoc, ClawJacked); local-first philosophy; NemoClaw (NVIDIA); relation to MCP and big platforms |
| 06 | [MCP & the Integration Layer](modules/MODULE-06-mcp-integration-layer.md) | COMPLETE | 2026-03-21 | ~4,300 | MCP protocol (JSON-RPC 2.0, transports, OAuth 2.1); server/client architecture; core primitives (tools, resources, prompts); registry (19,729+ servers); platform adoption matrix; building servers; Zapier MCP; native integrations |
| 07 | [Skills, Plugins & Automation](modules/MODULE-07-skills-plugins-automation.md) | COMPLETE | 2026-03-21 | ~3,200 | Skills architecture (Claude Skills, OpenClaw Skills, Codex Skills); plugin systems; marketplaces; scheduled tasks; event-driven triggers; Zapier, Make, Power Automate |
| 08 | [Consumer AI Comparison](modules/MODULE-08-consumer-ai-comparison.md) | COMPLETE | 2026-03-21 | ~3,800 | Feature-by-feature comparison (Claude, ChatGPT, Gemini, Copilot); pricing analysis (free through enterprise); user sentiment; strengths/weaknesses; unique differentiators |
| 09 | [Developer Platforms & APIs](modules/MODULE-09-developer-platforms-apis.md) | COMPLETE | 2026-03-21 | ~4,100 | API architectures (Anthropic Messages, OpenAI Responses, Gemini, Azure OpenAI); SDKs across languages; pricing economics (caching, batching, model tiering); structured outputs; function calling; fine-tuning; platform selection framework |
| 10 | [Frontier Topics](modules/MODULE-10-frontier-topics.md) | COMPLETE | 2026-03-21 | ~3,800 | On-device AI (Gemini Nano, Apple Intelligence, Qualcomm); multimodal generation (Sora 2, Veo 3.1, Flow, Midjourney, ElevenLabs); enterprise agent governance (Agent 365, EU AI Act); safety and alignment; open vs. closed ecosystems; upcoming events (Google I/O, Build, WWDC 2026) |

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
