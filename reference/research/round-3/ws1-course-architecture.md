# WS1: Course Architecture

**Workstream:** WS1 -- Learning Sequence, Prerequisites, Course Map, and Spiral Sequencing
**Author:** Learning Architect
**Date:** 2026-03-21
**Status:** Complete
**Depends on:** All 11 modules (M00-M10), pedagogy-deep-research.md, CURRICULUM.md

---

## 1.1 Learning Sequence and Module Groupings

### Recommended Learning Order

The learning sequence **departs from the M00-M10 numerical order** in three significant ways, all justified by pedagogical evidence and the actual dependency structure of the content.

**Key reordering decisions:**

1. **M09 (Developer APIs) moves from Batch 2/3 to Part 3** (after agents). Rationale: M09's API architectures, pricing economics, and structured output patterns are far more meaningful after the learner understands what agents do with these APIs (M03, M04). The CURRICULUM.md dependency graph lists M09 as requiring only M01, but conceptual prerequisites extend to M03 (tool use, function calling) and M06 (MCP as integration protocol). Learners who study APIs before understanding agent tool use lack the "why" behind design decisions like built-in agentic loops vs. explicit tool-use cycles.

2. **M05 (OpenClaw) moves to after M03 and M06, not parallel with them.** The CURRICULUM.md marks M05 as independent after M00, but the module itself references the gather-act-verify loop (M03), MCP protocol (M06), memory systems (M02), and skills architecture (M07). Teaching it after M03 and M06 means the learner already has the agent architecture and integration protocol vocabulary.

3. **M08 (Consumer Comparison) becomes the penultimate module, not a Batch 3 peer.** M08 synthesizes material from M00-M03 explicitly (listed prerequisites) but also implicitly draws on M06 (MCP adoption matrix), M07 (skills/plugins), and M09 (pricing). Placing it late transforms it from a standalone comparison into a synthesis exercise where the learner applies accumulated knowledge.

### The Four-Part Structure

Research on instructional design frameworks supports grouping modules into thematic units with clear transition points. Merrill's First Principles and 4C/ID both advocate for progressive complexity within coherent problem domains [pedagogy-deep-research.md, Section 6]. The broad-to-narrow-to-broad pattern ("spiral approach") maps naturally to four parts.

---

#### Part 1: The Terrain (Orientation)
*Goal: Build the mental map. Learner understands who the players are, what models power them, and how context -- the fundamental constraint -- works.*

| Sequence | Module | Estimated Study Time | Transition Rationale |
|----------|--------|---------------------|---------------------|
| 1 | **M00: Landscape Overview** | 25-30 min | Entry point. No prerequisites. Establishes the four-ecosystem framework, specialized tools, coding tools, and open-source layer. Every subsequent module references this map. |
| 2 | **M01: Models & Intelligence Tiers** | 35-40 min | Directly builds on M00's platform introductions. Adds the technical layer: model names, pricing, reasoning modes, multimodal capabilities. Introduces "model selection" as a recurring decision framework. |
| 3 | **M02: Context Engineering** | 40-45 min | Deepest module in the curriculum (5,800 words). Requires M01's model pricing and context window data. Introduces context windows, caching, memory systems, RAG, and compaction -- concepts referenced by nearly every subsequent module. |

**Part 1 transition:** The learner now has the vocabulary (platforms, models, context) to understand *how agents use these capabilities*. The transition from Part 1 to Part 2 is the shift from "what exists" to "how it works."

**Advance organizer for Part 2:** Before starting Part 2, present a bridge statement: "You now know the landscape, the models, and how context works. The next four modules show how these capabilities are assembled into autonomous systems that act in the world -- from single agents to multi-agent teams, from proprietary platforms to the open-source ecosystem."

---

#### Part 2: Agent Systems (Core Machinery)
*Goal: Understand how agents work, how they coordinate, how they connect to external services, and how the open-source ecosystem offers an alternative architecture.*

| Sequence | Module | Estimated Study Time | Transition Rationale |
|----------|--------|---------------------|---------------------|
| 4 | **M03: Single-Agent Systems** | 30-35 min | The foundational agent module. Introduces gather-act-verify, tool use, function calling vs. MCP, sandboxing, and safety models. Every agent topic downstream builds on this. |
| 5 | **M06: MCP & the Integration Layer** | 35-40 min | M03 introduces tool use and names MCP as the production-scale evolution of function calling. M06 immediately deepens this: protocol architecture, primitives, platform adoption, building servers. This ordering follows the 4C/ID principle of presenting supportive information immediately after the whole-task context that motivates it [pedagogy-deep-research.md, Section 6]. |
| 6 | **M04: Multi-Agent Orchestration** | 35-40 min | Requires M03 (single-agent architecture) as explicit prerequisite. Extends gather-act-verify into delegation patterns, context isolation, and framework comparison. Benefits from M06 knowledge (agents use MCP to access tools). |
| 7 | **M05: OpenClaw & Open Agent Ecosystem** | 25-30 min | Now the learner has the full closed-platform agent picture (M03, M04) and the integration protocol (M06). OpenClaw can be understood as an alternative implementation of the same patterns: ReAct loop, MCP compatibility, skills registry, memory system. The contrast with closed platforms becomes meaningful. |

**Part 2 transition:** The learner understands agent architectures from single to multi-agent, from closed to open, and the protocol layer that connects them. The transition to Part 3 shifts from "how agents work" to "how to build with them and make them work for you."

---

#### Part 3: Building and Automating (Applied Knowledge)
*Goal: Move from understanding to application. Skills, automation, APIs, and the economics of building with these platforms.*

| Sequence | Module | Estimated Study Time | Transition Rationale |
|----------|--------|---------------------|---------------------|
| 8 | **M07: Skills, Plugins & Automation** | 30-35 min | Requires M03 (agents that consume skills) and M06 (MCP, which skills build upon). Extends the practical layer: how to extend agents with reusable capabilities, marketplace dynamics, scheduled and event-driven patterns. |
| 9 | **M09: Developer Platforms & APIs** | 30-35 min | The developer's implementation module. API architectures, SDKs, pricing economics, structured outputs, fine-tuning. With agent and MCP context from Part 2, the learner understands *why* Anthropic's explicit content-block API differs from OpenAI's built-in agentic loop -- these design choices reflect the agent architectures studied earlier. |

**Part 3 transition:** The learner can now build with these platforms. The final part synthesizes everything into comparative analysis and forward-looking assessment.

---

#### Part 4: Synthesis and Horizon (Integration)
*Goal: Synthesize all prior knowledge into cross-platform comparison and forward projection. This is the "zoom out" in the broad-narrow-broad spiral.*

| Sequence | Module | Estimated Study Time | Transition Rationale |
|----------|--------|---------------------|---------------------|
| 10 | **M08: Consumer AI Comparison** | 30-35 min | Synthesizes M00-M03 (explicit prerequisites) plus implicit knowledge from M06-M09. The comparison tables, pricing analysis, and decision framework reward the learner who has studied individual platforms in depth. Placed here, it becomes a retrieval practice exercise: "How does what I learned about Claude's reasoning in M01 compare to what I learned about ChatGPT's agent in M03?" |
| 11 | **M10: Frontier Topics** | 30-35 min | Capstone. Requires all prior modules. Synthesizes trajectory lines from the entire curriculum. The learner evaluates on-device AI, multimodal generation, enterprise governance, and open-vs-closed dynamics using the full analytical toolkit developed across Parts 1-3. |

---

### Total Estimated Study Time

| Part | Modules | Est. Time | Cumulative |
|------|---------|-----------|------------|
| Part 1: The Terrain | M00, M01, M02 | 100-115 min | ~2 hours |
| Part 2: Agent Systems | M03, M06, M04, M05 | 125-145 min | ~4 hours |
| Part 3: Building & Automating | M07, M09 | 60-70 min | ~5 hours |
| Part 4: Synthesis & Horizon | M08, M10 | 60-70 min | ~6 hours |

Recommended spacing: complete one Part per study session, with at least one day between Parts. Within a Part, modules can be studied consecutively. This aligns with spaced practice research showing distributed study dramatically improves retention [pedagogy-deep-research.md, Section 5].

---

## 1.2 Prerequisite Map (Per-Module)

For each module, the following lists the **specific concepts and sections** the learner must understand before starting -- not just module numbers.

### M00: Landscape Overview
**Prerequisites:** None. This is the entry point.
**Assumed background:** The learner should have daily experience using at least one major AI platform (Claude, ChatGPT, Gemini, or Copilot). They should understand what a language model is at a user level -- this curriculum is not an ML primer.

### M01: Models & Intelligence Tiers
**Prerequisites from M00:**
- The four platform ecosystems framework (M00, "The Four Platform Ecosystems") -- understanding who Anthropic, OpenAI, Google, and Microsoft are and their strategic positioning
- Awareness of the specialized tools and coding tools layers (M00, "Specialized Tools" and "AI Coding Tools") -- these platforms use the models M01 catalogs
- The concept of "key battlegrounds" (M00, "Key Battlegrounds") -- model quality and pricing are central battlegrounds

### M02: Context Engineering
**Prerequisites from M00:**
- Platform ecosystem framework (M00, "The Four Platform Ecosystems") -- needed to track which provider offers which context feature
**Prerequisites from M01:**
- Context window sizes and pricing per model (M01, "Anthropic: The Claude Model Family" through "Microsoft: The Model Marketplace" -- specifically the model tables listing context windows and per-token pricing)
- Understanding of the three-tier model lineup pattern (Opus/Sonnet/Haiku, GPT-5.4/Mini/Nano, Pro/Flash/Flash-Lite) -- because context window size, caching discounts, and memory features differ by tier
- Token concept (M01, implicitly throughout) -- M02 discusses token economics extensively

### M03: Single-Agent Systems
**Prerequisites from M00:**
- Platform ecosystem framework (M00, "The Four Platform Ecosystems") -- for identifying which agents belong to which platform
- AI coding tools overview (M00, "AI Coding Tools") -- Claude Code, Codex, Jules, etc. are introduced there and analyzed in depth here
**Prerequisites from M01:**
- Model selection framework (M01, "Model Selection Framework") -- agents choose which model to use; understanding capability tiers matters for understanding why Claude Code uses Opus 4.6 while research subagents might use Haiku
- Extended thinking / reasoning modes (M01, "Reasoning Modes Compared") -- agents leverage these for planning steps

### M06: MCP & the Integration Layer
**Prerequisites from M00:**
- Platform ecosystem framework (M00) -- to understand the adoption matrix
**Prerequisites from M03:**
- Tool use: function calling concept (M03, "Tool Use: Function Calling and MCP") -- M03 introduces tool use as the dividing line between chatbots and agents, and names MCP as the production-scale evolution. M06 deepens this.
- The gather-act-verify loop (M03, "The Gather-Act-Verify Loop") -- MCP enables the "act" step by providing tools
- Understanding of why agents need external connections (M03, agent platform descriptions -- each agent's capabilities are partly defined by what tools it can access)

### M04: Multi-Agent Orchestration
**Prerequisites from M00:**
- Platform ecosystem framework (M00) -- for platform context
**Prerequisites from M01:**
- Model tiers and pricing (M01, model tables) -- multi-agent systems assign different models to different roles based on cost/capability tradeoffs. M04's "Strategic Model Selection" section directly references M01's model data.
**Prerequisites from M03 (critical):**
- The gather-act-verify loop (M03, "How Agents Work: The Core Architecture") -- every agent in a multi-agent system runs this loop; M04 extends it to delegation and coordination
- Tool use and MCP (M03, "Tool Use: Function Calling and MCP") -- subagents use tools
- Sandboxing and safety models (M03, "Sandboxing and Isolation" and "Safety Models") -- multi-agent systems inherit and extend these concerns
- Failure modes (M03, "Failure Modes and Practical Limits") -- multi-agent systems compound single-agent failure modes

### M05: OpenClaw & Open Agent Ecosystem
**Prerequisites from M00:**
- Open-source and self-hosted AI overview (M00, "Open-Source and Self-Hosted AI") -- introduces OpenClaw, Ollama, LM Studio
**Prerequisites from M03:**
- Agent architecture patterns (M03, "How Agents Work: The Core Architecture") -- OpenClaw implements the same ReAct pattern
- Safety and sandboxing concepts (M03, "Sandboxing and Isolation") -- essential context for understanding OpenClaw's security challenges
**Prerequisites from M06 (recommended):**
- MCP protocol basics (M06, "What MCP Is and Why It Exists" and "Protocol Architecture") -- OpenClaw's relationship to MCP is a key architectural comparison point. The module explicitly cross-references M06.

### M07: Skills, Plugins & Automation
**Prerequisites from M03:**
- Agent capabilities and platform landscape (M03, "The Agents: Platform by Platform") -- skills extend agent capabilities
- Claude Code's SKILL.md mechanism (M03 introduces Claude Code; M07 details its skills system)
**Prerequisites from M06:**
- MCP protocol and server concept (M06, "Protocol Architecture" and "Core Primitives") -- skills often build on MCP servers. The module states this dependency explicitly.
- MCP registry ecosystem (M06, "The MCP Registry Ecosystem") -- plugin marketplaces are conceptually parallel

### M09: Developer Platforms & APIs
**Prerequisites from M01:**
- Model lineups and pricing across all providers (M01, all provider sections) -- M09's pricing tables build on M01's model data
- Context window sizes (M01, model tables) -- API pricing is per-token, and M09 discusses cost optimization strategies
**Prerequisites from M03 (strongly recommended):**
- Tool use and function calling (M03, "Tool Use: Function Calling and MCP") -- M09's API architecture section explains how each API handles function calling differently
- The difference between explicit tool-use cycles and built-in agentic loops (M03 introduces this contrast; M09 makes it concrete at the API level)
**Prerequisites from M06 (recommended):**
- MCP protocol basics (M06) -- M09 discusses MCP integration in each API's capabilities

### M08: Consumer AI Comparison
**Prerequisites from M00:**
- All four platform ecosystem profiles (M00, "The Four Platform Ecosystems") -- M08 compares them systematically
**Prerequisites from M01:**
- Model lineups, benchmarks, and reasoning modes (M01, all sections) -- M08's benchmark comparison table requires understanding what these benchmarks measure
- Multimodal capabilities (M01, "Multimodal Capabilities") -- M08's capability matrix includes multimodal features
**Prerequisites from M02:**
- Memory systems (M02, "Memory Systems: How Platforms Remember You") -- M08 compares memory features across platforms
- Context windows (M02, "Context Windows") -- referenced in pricing and capability comparisons
**Prerequisites from M03:**
- Agent capabilities (M03, "The Agents: Platform by Platform") -- M08 includes agent comparison rows

### M10: Frontier Topics
**Prerequisites:** All prior modules (M00-M09) recommended. Specific critical prerequisites:
- Model landscape and on-device models (M01) -- M10 extends to Gemini Nano, Apple Intelligence
- Context engineering principles (M02) -- M10 discusses the on-device vs. cloud inference split as a context engineering problem
- Agent architecture and governance (M03, M04) -- M10 extends to enterprise agent governance
- OpenClaw ecosystem dynamics (M05) -- M10's open-vs-closed analysis builds directly on M05
- MCP as universal protocol (M06) -- M10 discusses MCP's trajectory
- Consumer and developer platform landscape (M08, M09) -- M10 projects these competitive dynamics forward

---

## 1.3 Visual Course Map Specification

### Purpose and Evidence Base

The course map serves as an **advance organizer** (Ausubel): a visual overview that primes the learner's schema before they encounter detailed content. Meta-analyses confirm that concept maps and graphic organizers increase retention and transfer versus text-only study [pedagogy-deep-research.md, Section 1]. The map should be presented on the curriculum landing page and accessible from every module via a persistent navigation element.

### Node Design

Each module is represented as a **node** with the following visual properties:

| Property | Specification |
|----------|--------------|
| Shape | Rounded rectangle (consistent across all nodes) |
| Size | Proportional to word count (M02 at 5,800 words is largest; M05 at 3,600 is smallest) |
| Color fill | By Part grouping (see below) |
| Border | 2px solid, darker shade of fill color |
| Label | Module number + short title (e.g., "M00 Landscape") |
| Subtitle | One-line description (e.g., "Who the players are") |
| Status indicator | Small icon: checkmark (completed), current (pulsing dot), locked (lock -- prerequisites not met) |

### Color Coding by Part

All color encodings are paired with text labels and icons (per anti-pattern #3: color-only encoding).

| Part | Color (hex) | Text label | Icon |
|------|-------------|------------|------|
| Part 1: The Terrain | `#E8F4FD` (light blue) | "FOUNDATIONS" | Compass icon |
| Part 2: Agent Systems | `#FFF3E0` (light amber) | "AGENTS" | Gear icon |
| Part 3: Building & Automating | `#E8F5E9` (light green) | "BUILDING" | Wrench icon |
| Part 4: Synthesis & Horizon | `#F3E5F5` (light purple) | "SYNTHESIS" | Telescope icon |

### Edge Design

Edges represent prerequisite relationships. Two types:

| Edge Type | Visual | Meaning |
|-----------|--------|---------|
| **Required prerequisite** | Solid arrow, 2px, dark gray (`#424242`) | Must complete source before starting target |
| **Recommended prerequisite** | Dashed arrow, 1px, medium gray (`#9E9E9E`) | Enhances understanding but not strictly required |

### Edge Map (Complete)

Required prerequisite arrows:
- M00 --> M01
- M01 --> M02
- M00 + M01 --> M03
- M03 --> M06
- M03 --> M04
- M06 --> M04 (recommended)
- M00 + M03 --> M05
- M06 --> M05 (recommended)
- M03 + M06 --> M07
- M01 + M03 --> M09
- M06 --> M09 (recommended)
- M00 + M01 + M02 + M03 --> M08
- All (M00-M09) --> M10 (recommended; M00-M04 required)

### Interactive Behavior

| Interaction | Behavior |
|-------------|----------|
| **Hover on node** | Tooltip shows: module title, estimated study time, completion status, and first 2 sentences of executive summary |
| **Click on node** | Navigates to that module's HTML page |
| **Hover on edge** | Tooltip shows the specific prerequisite concept (e.g., "Requires: gather-act-verify loop from M03") |
| **Part grouping** | Nodes within the same Part are enclosed in a labeled bounding box with the Part's background color |
| **Progress overlay** | Completed modules show a checkmark badge. The current module has a subtle animated border. Modules whose prerequisites are not yet met show a lock icon (but remain clickable -- self-study learners should not be blocked). |
| **Responsive** | On mobile (<768px), the map collapses to a vertical list view with indentation showing prerequisite depth |

### Layout Specification

The map uses a **top-to-bottom flow** layout with four horizontal lanes (one per Part):

```
[Part 1 lane: M00 --> M01 --> M02]
        |         |
        v         v
[Part 2 lane: M03 --> M06 --> M04]
        |      |
        v      v
       M05    M07

[Part 3 lane: M07 --- M09]

[Part 4 lane: M08 --- M10]
```

The primary reading flow is left-to-right within each lane, top-to-bottom between lanes. Cross-lane prerequisite arrows (e.g., M01 --> M03) connect vertically.

### Implementation Notes for Visual Strategist

- Render as SVG for resolution independence and DOM accessibility
- Use `<title>` and `<desc>` elements in SVG for screen reader accessibility
- JavaScript event listeners for hover/click behavior
- Store module metadata (title, summary, prerequisites, status) in a JSON data structure; render the map from data, not hardcoded SVG
- Use `aria-label` on all interactive elements
- Provide a text-only alternative below the map: a numbered list of all modules with their prerequisites listed as text

---

## 1.4 Spiral Sequencing Plan

### Evidence Base

Spiral sequencing -- revisiting core concepts across multiple modules at increasing depth -- is supported by both cognitive science (spaced retrieval strengthens long-term memory) and instructional design theory (Bruner's spiral curriculum, 4C/ID's progressive complexity). The pedagogy research notes: "revisit core ideas in multiple modules... explicitly link them. This spaced recall will help cement connections across topics" [pedagogy-deep-research.md, Section 1]. Cumulative testing across old and new material further exploits the spacing effect [pedagogy-deep-research.md, Section 5].

### Core Spiral Concepts

Seven concepts recur across three or more modules at increasing depth. For each, the plan specifies: first introduction, subsequent appearances, how depth increases, and what explicit callbacks should link them.

---

#### Spiral 1: Model Selection and Cost-Capability Tradeoffs

**First appearance:** M01, "Model Selection Framework" (Section at line 330)
- Introduces the framework: task type --> model tier --> cost implications
- Covers all four providers' model lineups with pricing tables

**Recurrence 1:** M02, "Token Economics" and "Prompt Caching"
- Deepens: cost is not just per-token price but depends on context window usage, caching strategy, and batch processing
- Adds the caching dimension: same model at 10% cost with prompt caching

**Recurrence 2:** M03, agent platform descriptions
- Deepens: agents make model selection decisions autonomously (Claude Code uses Opus 4.6; subagents might use Haiku)
- Adds the agent-specific dimension: model choice affects agent capability, not just cost

**Recurrence 3:** M04, "Strategic Model Selection in Multi-Agent Systems" (dedicated section)
- Deepens: in multi-agent systems, different agents use different models based on their role (researcher = fast/cheap, writer = strong, reviewer = balanced)
- Adds the orchestration dimension: model selection as an architectural decision

**Recurrence 4:** M09, "Pricing Economics"
- Deepens: full pricing tables with caching tiers, batch discounts, and model tiering at the API level
- Adds the developer implementation dimension: how to actually optimize costs in production

**Recurrence 5:** M08, "Pricing Analysis"
- Synthesizes: consumer pricing (subscription tiers) mapped against capability differences
- Adds the consumer evaluation dimension: value-for-money across platforms

**Explicit callbacks to insert:**
- M02: "The model pricing tables in Module 01 showed the per-token rates. Here we see why raw price is misleading -- caching can reduce effective cost by 90%."
- M03: "Module 01's model selection framework assumed a human choosing a model. Agents make this choice autonomously, and the stakes are different."
- M04: "The single-model selection framework from Module 01 becomes a multi-model allocation problem in multi-agent systems."
- M09: "Module 01 introduced model pricing. Module 02 showed how caching reshapes it. Here we see the full implementation: cache tiers, batch APIs, and the economics at scale."
- M08: "Every pricing tier in this comparison reflects the model lineups from Module 01 and the cost optimization strategies from Module 02 and Module 09."

---

#### Spiral 2: The Gather-Act-Verify Loop (Agent Architecture)

**First appearance:** M03, "How Agents Work: The Core Architecture"
- Introduces the canonical five-step loop: gather, plan, act, verify, loop
- Establishes that verification is not optional

**Recurrence 1:** M04, "Why Multi-Agent?" and "Orchestration Patterns"
- Deepens: each agent in a multi-agent system runs its own gather-act-verify loop, but the parent agent's "act" step is delegation, and its "verify" step is synthesis of subagent results
- Adds the coordination dimension: how multiple loops interact

**Recurrence 2:** M05, "Pi Agent Runtime"
- Deepens: OpenClaw implements the same ReAct pattern with a two-phase verification step
- Adds the open-source dimension: the same architecture in a different governance model

**Recurrence 3:** M07, "Skills Architecture"
- Deepens: skills extend the "act" phase of the loop by giving agents reusable capability definitions
- Adds the extensibility dimension: the loop's action vocabulary is not fixed

**Recurrence 4:** M10, "Enterprise Agent Governance"
- Deepens: governance frameworks add a "monitor and audit" layer around the loop
- Adds the enterprise control dimension: who watches the watchers?

**Explicit callbacks to insert:**
- M04: "Each subagent runs the same gather-act-verify loop introduced in Module 03. The difference is that the parent's 'act' is delegation, not direct action."
- M05: "OpenClaw's Pi Agent Runtime implements the same ReAct pattern as Claude Code (Module 03), but adds a two-phase verification step."
- M07: "Skills extend the 'act' phase of the agent loop from Module 03 -- they define new actions the agent can take."
- M10: "Enterprise governance adds a layer *around* the gather-act-verify loop from Module 03: logging, permission gates, and audit trails."

---

#### Spiral 3: MCP as Universal Protocol

**First appearance:** M00, "Key Battlegrounds" (mentioned as a battleground)
- Names MCP as a key integration standard

**Recurrence 1:** M03, "Tool Use: Function Calling and MCP"
- Deepens: distinguishes function calling (simple, inline) from MCP (standardized, external). Establishes MCP as "the production-scale evolution."

**Recurrence 2:** M06, full module
- Deepens: protocol architecture (JSON-RPC 2.0, transports, OAuth 2.1), core primitives, platform adoption, building servers, registry ecosystem
- This is the primary treatment

**Recurrence 3:** M05, "OpenClaw and the Platform Ecosystem"
- Deepens: how OpenClaw's channels relate to MCP at the user-interaction layer vs. tool layer

**Recurrence 4:** M07, "Skills Architecture"
- Deepens: skills build on MCP servers for external tool access; Claude Skills + MCP connector integrations

**Recurrence 5:** M09, API architectures
- Deepens: each API's MCP support (Anthropic native, OpenAI Beta, Google via extensions)

**Recurrence 6:** M10, "Open vs. Closed Ecosystems"
- Synthesizes: MCP's trajectory as a unifying protocol across the open/closed divide

**Explicit callbacks to insert:**
- M03: "MCP was introduced in Module 00 as a key battleground. Here we see why: it is what separates an agent with a handful of tools from one that connects to arbitrary services."
- M06 opening: "Module 03 introduced MCP as the production-scale evolution of function calling. This module explains how it works."
- M05: "OpenClaw's channel architecture is conceptually parallel to MCP (Module 06), but operates at the user-interaction layer rather than the tool layer."
- M07: "Claude Skills can compose with MCP servers (Module 06) for external tool access -- the skill defines the intent; the MCP server provides the capability."
- M09: "Each API handles MCP differently. Anthropic built it. OpenAI added Beta support. Google maps it to extensions. The protocol details are in Module 06."

---

#### Spiral 4: Security and Safety Models

**First appearance:** M03, "Sandboxing and Isolation" and "Safety Models"
- Introduces OS-level sandboxing, permission systems, human-in-the-loop patterns

**Recurrence 1:** M04, "Context Isolation and Summary Propagation"
- Deepens: in multi-agent systems, isolation becomes a defense mechanism -- subagent failures are contained within their context
- Adds the multi-agent dimension: blast radius and error containment

**Recurrence 2:** M05, "ClawHub: The Skills Registry" (security concerns)
- Deepens: 12-20% malicious skill rate, ClawHavoc/ClawJacked vulnerabilities, the governance gap
- Adds the open-source dimension: security in the absence of centralized gatekeeping

**Recurrence 3:** M06, "Protocol Architecture" (OAuth 2.1 authorization)
- Deepens: MCP's authorization layer, the security implications of connecting agents to arbitrary external services

**Recurrence 4:** M07, "Skills Architecture" (prompt injection, IP extraction)
- Deepens: OWASP #1 risk for LLM applications, system prompt extraction from Custom GPTs

**Recurrence 5:** M10, "Enterprise Agent Governance" and "Safety and Alignment"
- Synthesizes: Agent 365 governance controls, EU AI Act compliance, responsible deployment principles

**Explicit callbacks to insert:**
- M04: "Module 03's sandboxing protects a single agent. In multi-agent systems, context isolation serves a similar purpose at the orchestration level."
- M05: "The safety models in Module 03 assume a platform vendor as gatekeeper. OpenClaw has no such gatekeeper -- which is why ClawHub's security landscape is so challenging."
- M06: "MCP's OAuth 2.1 authorization layer (new in 2026) is the protocol-level answer to the tool access safety concerns raised in Module 03."
- M10: "Modules 03-07 showed safety as a technical problem (sandboxing, isolation, authorization). Here we see it as an organizational and regulatory problem."

---

#### Spiral 5: Context Management Across Scales

**First appearance:** M01, context window sizes in model tables
- Raw data: which models have which context windows

**Recurrence 1:** M02, full module
- Deepens: context as an engineering discipline -- windows, caching, memory, RAG, compaction
- This is the primary treatment

**Recurrence 2:** M03, agent context management
- Deepens: agents must manage context across multi-step tasks. Claude Code's three-phase loop is a context management strategy.

**Recurrence 3:** M04, "Context Isolation and Summary Propagation"
- Deepens: in multi-agent systems, each agent has its own context window. The parent-child summary pattern is a context compression strategy.
- Connects back: "the 'lost in the middle' effect documented in Module 02" (explicit cross-reference in M04 text)

**Recurrence 4:** M05, "Memory System" (SOUL.md, MEMORY.md)
- Deepens: OpenClaw's file-based memory is a radically different context persistence strategy vs. cloud platforms

**Recurrence 5:** M10, "On-Device AI"
- Deepens: on-device models have severely constrained context (Gemini Nano's parameters, not token window, are the limit). The on-device vs. cloud split is framed as a context engineering problem.

**Explicit callbacks to insert:**
- M03: "Module 02 covered context engineering as a discipline. Agents are the practitioners -- they must manage context across multi-step tasks within the constraints Module 02 described."
- M04: "Each subagent gets its own context window (Module 02). Summary propagation is a form of lossy context compression -- the multi-agent equivalent of the compaction behavior in Module 02."
- M05: "OpenClaw's SOUL.md/MEMORY.md approach (file-based, user-editable) is the philosophical opposite of the cloud memory systems in Module 02. Different context persistence strategy, same underlying problem."
- M10: "On-device AI inverts the context engineering problem from Module 02: instead of managing a 1M-token window, you're working within models with 2-3B parameters on constrained hardware."

---

#### Spiral 6: Platform Comparison (The Big Four)

**First appearance:** M00, "Platform Comparison at a Glance" table
- Initial comparison: valuation, revenue, users, flagship model, strategic center of gravity

**Recurrence 1:** M01, "Head-to-Head Model Comparison"
- Deepens: model-level comparison (pricing, context, capabilities, benchmarks)

**Recurrence 2:** M02, per-provider comparison tables (caching, memory systems)
- Deepens: context-level comparison across platforms

**Recurrence 3:** M03, "Comparison: Single-Agent Systems at a Glance"
- Deepens: agent-level comparison (capabilities, sandboxing, benchmarks)

**Recurrence 4:** M04, "Framework Comparison"
- Deepens: orchestration framework comparison (Agent SDK vs. Agents SDK vs. ADK vs. Copilot Studio)

**Recurrence 5:** M06, "Platform Adoption" matrix
- Deepens: MCP adoption comparison (who supports what, at what maturity level)

**Recurrence 6:** M08, full module
- Synthesizes: comprehensive consumer comparison across all dimensions
- This is the capstone comparison

**Recurrence 7:** M09, "Platform Selection Framework"
- Synthesizes: developer-facing comparison focused on APIs, SDKs, and pricing

**Explicit callbacks to insert:**
- M01: "Module 00 introduced the four ecosystems. Here we compare them at the model level -- the technical substrate everything else builds on."
- M03: "We have compared the platforms on models (Module 01) and context (Module 02). Now we compare their agent implementations."
- M08 opening: "Throughout the curriculum, we have compared the big four across models (M01), context (M02), agents (M03), orchestration (M04), and integration (M06). This module synthesizes all of it into a consumer-facing comparison."

---

#### Spiral 7: Open vs. Closed Ecosystem Dynamics

**First appearance:** M00, "Open-Source and Self-Hosted AI" section
- Introduces the open-source layer: OpenClaw, Ollama, LM Studio, open-weight models

**Recurrence 1:** M01, open-weight models (Llama, Gemma, Mistral)
- Deepens: specific model capabilities and licensing of open-weight alternatives

**Recurrence 2:** M05, full module
- Deepens: OpenClaw as the primary open alternative to closed-platform agents
- This is the primary treatment for open-source agents

**Recurrence 3:** M06, "MCP vs. Native Integrations"
- Deepens: MCP as a bridge between open and closed ecosystems

**Recurrence 4:** M10, "Open vs. Closed Ecosystems" (dedicated section)
- Synthesizes: the full competitive dynamic, ecosystem economics, and trajectory

**Explicit callbacks to insert:**
- M05 opening: "Module 00 introduced the open-source layer. Module 01 showed the open-weight models that power it. Here we examine the agent framework that ties them together."
- M06: "MCP is the rare protocol adopted by both closed platforms (Anthropic, OpenAI, Google) and open-source frameworks (OpenClaw). Module 05 showed OpenClaw's architecture; this module shows the protocol they share."
- M10: "Modules 05 and 06 showed the technical relationship between open and closed ecosystems. Here we examine the strategic and economic dynamics shaping their future."

---

### Spiral Summary Matrix

| Concept | M00 | M01 | M02 | M03 | M04 | M05 | M06 | M07 | M08 | M09 | M10 |
|---------|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
| Model Selection / Cost | . | **I** | D | D | D | . | . | . | S | D | . |
| Gather-Act-Verify | . | . | . | **I** | D | D | . | D | . | . | D |
| MCP as Protocol | M | . | . | D | . | D | **I** | D | . | D | S |
| Security / Safety | . | . | . | **I** | D | D | D | D | . | . | S |
| Context Management | . | M | **I** | D | D | D | . | . | . | . | D |
| Platform Comparison | **I** | D | D | D | D | . | D | . | **S** | D | . |
| Open vs. Closed | M | D | . | . | . | **I** | D | . | . | . | **S** |

**Legend:** **I** = First introduced (primary), **D** = Deepened, **S** = Synthesized (capstone), **M** = Mentioned (surface-level), **.** = Not present

---

## Implementation Notes for Downstream Workstreams

### For WS2 (Module Designers)
- Use the prerequisite map in Section 1.2 to design each module's "You Should Know" gate (a brief prereq checklist with links to specific sections)
- Each module should open with a bridge paragraph connecting back to the prior module in the learning sequence and forward to what comes next
- Insert the explicit callbacks from Section 1.4 at the specified points in each module

### For WS3 (Assessment Designer)
- Review checkpoint questions at Part transitions should be cumulative, testing concepts from all prior Parts
- Spiral concepts are prime candidates for spaced retrieval questions: test a concept first where it is introduced, then again 2-3 modules later at the deeper level
- The spiral summary matrix identifies which concepts to test in which modules

### For WS4 (Visual Strategist)
- Section 1.3 provides the full specification for the course map
- The spiral summary matrix can be rendered as a second visual: a concept-by-module heat map showing where each spiral concept appears

### For WS5 (Engagement Specialist)
- Part transition pages are natural places for curiosity hooks and motivating questions
- The spiral callbacks ("As you saw in Module 03...") serve double duty as engagement anchors and spaced retrieval cues

### For WS7 (Spaced Repetition -- my second task)
- This document's spiral plan provides the concept recurrence map that WS7 will operationalize into specific retrieval practice items
- The spiral summary matrix defines the spacing schedule: where each concept first appears and where it should be tested again

---

## Evidence Citations

All recommendations in this document cite the following sections of `reference/research/pedagogy-deep-research.md`:

| Claim | Source Section | Key Finding |
|-------|--------------|-------------|
| Scaffolding effect size g~0.87 | Section 1 | Meta-analyses show explicit scaffolding substantially improves outcomes in online higher ed |
| Concept maps as advance organizers | Section 1 | Meta-analysis found concept/knowledge maps increased retention and transfer vs. text-only |
| Novices need guided instruction | Section 1 | Unguided discovery approaches are less effective until learner has high prior knowledge (Kirschner et al., 2006) |
| Expertise-reversal effect | Section 1 | Structured guidance should be removed as learners advance, not extended to experts |
| Spiral sequencing and spaced recall | Section 1 | Revisiting core ideas in multiple modules with explicit links cements connections |
| Progressive complexity (4C/ID) | Section 6 | Arranges learning tasks of whole-task practice with supportive and procedural info |
| Merrill's First Principles | Section 6 | Problem-centered learning: engage, activate, demonstrate, practice, integrate |
| Backward Design | Section 6 | Align goals, assessments, and activities |
| Distributed practice improves retention | Section 5 | Spacing study sessions dramatically improves long-term retention |
| Cumulative testing exploits spacing | Section 5 | Questions covering old and new material together improve learning |
| Broad-to-narrow-to-broad spiral | Section 6 | Start with context, dive into details, zoom out to integration |
