# PROJECT-DESCRIPTION.md

## Project identity

**Name:** AI Frontier Curriculum
**Type:** Living educational knowledge base
**Owner:** Ryan (self-study; technically sophisticated AI power user)
**Started:** 2026-03-20
**Platform:** Claude Code with multi-agent orchestration

---

## Purpose

Build a thorough, continuously-updated curriculum covering the bleeding edge of LLMs, consumer AI tools, agentic systems, and the surrounding ecosystem as of March 2026 and beyond.

This is a self-study resource designed for someone who already uses these tools daily and wants to develop deep, structured expertise — not surface-level overviews, but the kind of understanding that lets you make informed architectural decisions, evaluate new tools against existing ones, and teach others.

---

## Scope

### In scope

The curriculum covers these domains, roughly in this order:

**The landscape (who, what, where)**
- Major AI platform ecosystems: Anthropic/Claude, OpenAI/ChatGPT, Google/Gemini, Microsoft/Copilot
- Specialized tools: Perplexity, Notion, Otter.ai, Zapier, Make, Midjourney, ElevenLabs
- AI coding tools: Claude Code, Cursor, Windsurf, GitHub Copilot, Codex, Jules, Antigravity
- Open-source/self-hosted: OpenClaw, Ollama, LM Studio, open-weight models (Llama, Gemma, Mistral)

**Models and intelligence (how they think)**
- Model lineups across all major providers (names, context windows, pricing, benchmarks)
- Reasoning modes: extended thinking, chain-of-thought, Deep Think, o-series reasoning
- Multimodal capabilities: vision, audio, video, image generation
- Model selection strategy: when to use which model for what task

**Context management and engineering (how they remember)**
- Context windows: sizes, pricing, practical limits
- Prompt caching and cost optimization
- Memory systems: Claude Memory, ChatGPT Saved Memories, Gemini Personal Intelligence
- RAG patterns and vector search
- Context compaction and what survives it
- The emerging discipline of "context engineering" as a practice

**Agents (how they act)**
- Single-agent systems: Claude Code, Codex, Jules, ChatGPT Agent, Cowork, computer use, browser automation
- Agent architecture: the gather→act→verify loop, tool use, sandboxing, safety
- Subagents: delegation patterns, context isolation, summary propagation
- Multi-agent orchestration: Agent Teams, Agent SDK, OpenAI Agents SDK, Google ADK, Copilot Studio
- Agent governance: Agent 365, permissions, monitoring, enterprise controls

**OpenClaw and the open agent ecosystem**
- OpenClaw architecture: Gateway, channels, Pi Agent Runtime
- ClawHub skills registry: ecosystem, security concerns (12-20% malicious rate), best practices
- The local-first / self-hosted philosophy vs. cloud platforms
- NemoClaw (NVIDIA) and the enterprise play
- How OpenClaw relates to MCP, Claude Code, and the big-platform agent ecosystems

**The integration layer (how they connect)**
- MCP (Model Context Protocol): the protocol, server/client architecture, the registry
- MCP adoption across all platforms (Claude, ChatGPT, Gemini, Copilot, OpenClaw)
- Building and consuming MCP servers
- Zapier MCP as universal bridge
- Native integrations and connectors directories

**Workflow automation (how they work for you)**
- Skills architecture across platforms (Claude Skills, OpenClaw Skills, Codex Skills)
- Plugin systems and marketplaces
- Scheduled tasks and event-driven triggers
- Automation platforms: Zapier, Make, Power Automate

**Consumer AI product comparison (how they compare)**
- Feature-by-feature comparison across Claude, ChatGPT, Gemini, Copilot
- Pricing analysis at all tiers (free, consumer, business, enterprise, API)
- User sentiment and real-world experience (Reddit, communities)
- Strengths, weaknesses, and unique differentiators per platform

**Developer platforms and APIs (how to build with them)**
- API architectures: Anthropic Messages API, OpenAI Responses API, Gemini API
- SDKs across languages
- Pricing economics: token costs, caching, batching
- Structured outputs, function calling, tool use
- Fine-tuning and customization options

**Frontier topics (where it's all going)**
- On-device AI (Gemini Nano, Apple Intelligence, Qualcomm)
- Multimodal generation (Sora, Veo, Flow, Midjourney)
- Enterprise agent governance and compliance
- Safety, alignment, and responsible deployment
- Open vs. closed ecosystem dynamics
- What to watch for at Google I/O 2026, WWDC 2026, and beyond

### Out of scope

- Fundamental ML/DL theory (attention mechanisms, transformer architecture, training methodology)
- Academic research papers (unless they directly inform a product or capability)
- Crypto/blockchain AI projects
- Robotics and embodied AI
- Historical AI (pre-2024) except as brief context for how we got here
- Original business-specific application content from uploaded profiles is stripped

---

## Foundation materials

Five comprehensive ecosystem research profiles were gathered on March 18, 2026. These are the primary baseline:

| Profile                  | Covers                                                                    | Words (approx.) |
| ------------------------ | ------------------------------------------------------------------------- | --------------- |
| anthropic-claude         | Anthropic company, Claude models, consumer products, Cowork, Code, MCP, Agent SDK, pricing | ~8,000          |
| openai-chatgpt           | OpenAI company, GPT models, ChatGPT, Agent/Operator, Codex, Sora, Deep Research, pricing    | ~7,000          |
| google-gemini            | Google/DeepMind, Gemini models, consumer products, Flow, Jules, Antigravity, ADK, pricing    | ~6,500          |
| microsoft-copilot        | Microsoft, Copilot across M365, Copilot Studio, Agent 365, GitHub Copilot, Azure AI, pricing | ~8,500          |
| specialized-tools        | Otter.ai, Notion, Perplexity, Zapier, Make, Midjourney, ElevenLabs, AI coding tools          | ~7,500          |

These profiles were originally written with business-specific application sections. Those sections have been **stripped** in the cleaned reference versions in `reference/profiles/`. The raw intelligence (features, pricing, capabilities, competitive analysis) is retained.

---

## Module plan

| #  | Title                              | Primary sources                           | Key questions to answer                                                                                     |
| -- | ---------------------------------- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| 00 | Landscape Overview                 | All profiles + web research               | Who are the major players? How is the market structured? What are the key battlegrounds?                    |
| 01 | Models & Intelligence Tiers        | All profiles (model sections)             | What models exist? How do they compare? When should you use which one? What do reasoning modes actually do? |
| 02 | Context Engineering                | Claude/ChatGPT profiles + web research    | How do context windows work in practice? What is "context engineering"? How do memory systems differ?       |
| 03 | Single-Agent Systems               | All profiles (agent sections)             | What can agents do today? How do they work architecturally? What are the safety models?                     |
| 04 | Multi-Agent Orchestration          | Claude/OpenAI/Google profiles + web       | How do agent teams work? What are the orchestration patterns? When is multi-agent worth it?                 |
| 05 | OpenClaw & Open Agent Ecosystem    | OpenClaw GitHub + web research            | What is OpenClaw? How does it work? What's ClawHub? How does it fit against the big platforms?              |
| 06 | MCP & the Integration Layer        | All profiles (MCP sections) + web         | What is MCP? How does it work? Who supports it? How do you build/consume servers?                           |
| 07 | Skills, Plugins & Automation       | Claude/OpenClaw profiles + web            | How do skills work across platforms? What are the plugin ecosystems? How does scheduling work?              |
| 08 | Consumer AI Comparison             | All profiles (comparison sections)        | Feature-by-feature, how do the big four compare? Pricing? Strengths/weaknesses?                             |
| 09 | Developer Platforms & APIs         | All profiles (API sections)               | How do the APIs differ? Pricing economics? SDK coverage? Structured outputs?                                |
| 10 | Frontier Topics                    | Web research (primary)                    | What's coming next? On-device AI? Multimodal gen? Enterprise governance? Open vs. closed?                   |

---

## Multi-agent execution strategy

This curriculum is built using Claude Code's multi-agent capabilities. The lead agent orchestrates; specialized subagents do the heavy lifting.

### Recommended parallel workflows

**Research phase (per module):**
Deploy 2-4 researcher subagents in parallel, each assigned a different subtopic within the module. They return structured research briefs. Lead agent synthesizes and hands off to writer.

**Writing phase:**
One writer subagent per module. Multiple modules can be written in parallel if their research is complete and they don't heavily cross-reference each other.

**Review phase:**
Reviewer subagent per module. Can run in parallel across completed drafts.

**Synthesis phase (periodic):**
Synthesizer subagent reviews the curriculum holistically after a batch of modules is complete. Identifies gaps, overlaps, broken references, and glossary drift.

### Module dependency graph

Some modules can be built fully in parallel; others have soft dependencies:

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

### Execution order recommendation

1. **Batch 1 (foundation):** Module 00, Module 01 — in parallel
2. **Batch 2 (core):** Modules 02, 03, 05, 06, 09 — in parallel
3. **Batch 3 (dependent):** Modules 04, 07, 08 — in parallel (after batch 2 dependencies met)
4. **Batch 4 (capstone):** Module 10 — after all others
5. **Synthesis pass:** Full curriculum review via synthesizer agent

---

## Quality standards

- **Accuracy over speed.** A module with fewer topics but verified facts is better than comprehensive but unverified.
- **Concrete over abstract.** Model names, not "their flagship model." Pricing in dollars, not "competitive pricing." Feature names, not "various capabilities."
- **Current as of March 2026.** All information should reflect the state of the world right now. Historical context is fine when it illuminates the present.
- **Sourced.** Every non-obvious factual claim must trace to a source in SOURCES.md.
- **Self-consistent.** The curriculum must not contradict itself across modules. GLOSSARY.md and cross-references enforce this.

---

## Format and deliverables

### Primary format: living markdown

Every module exists as a markdown file in `modules/`. These are the source of truth. They are updated as the landscape evolves.

### Derivative deliverables (generated from modules)

- **HTML interactive guides:** For modules with comparison tables or interactive elements
- **Slide decks (.pptx):** For modules that could be presented/taught
- **Ecosystem diagrams (.svg, .mermaid):** Visual maps of relationships between platforms, tools, and protocols
- **Comparison tables (standalone):** Extracted from modules for quick reference
- **Full curriculum export (single HTML):** Combined view of all modules for offline reading

Deliverables are always generated from current module content, never edited independently.

---

_PROJECT-DESCRIPTION.md — Created 2026-03-20. This file takes precedence over AGENT-INIT.md on all project-specific decisions._
