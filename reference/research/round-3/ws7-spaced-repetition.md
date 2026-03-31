# WS7: Spaced Repetition and Long-Term Retention

**Workstream:** WS7 -- Review Checkpoints, Concept Callbacks, Cumulative Assessments, Study Schedule, Capstone Experience
**Author:** Learning Architect
**Date:** 2026-03-21
**Status:** Complete
**Depends on:** WS1 (Course Architecture), WS2a/WS2b (Module Designs), WS3 (Assessment System), pedagogy-deep-research.md (Sections 1, 2, 5)

---

## Evidence Base

Distributed study dramatically improves long-term retention compared to massed review [pedagogy-deep-research.md, Section 5; Dunlosky et al., 2013]. Cumulative testing -- questions mixing old and new material -- exploits the spacing effect: students with cumulative assessments learn more and avoid procrastination [pedagogy-deep-research.md, Section 5]. Conceptual callbacks -- strategically referencing earlier ideas in new contexts -- act as spaced retrieval cues, and research suggests even untested material benefits from integrating such retrieval [pedagogy-deep-research.md, Section 5]. However, self-paced learners do not naturally space their study. This workstream makes spacing intentional and structural.

The seven spiral concepts from WS1 Section 1.4 provide the conceptual backbone. The Module Designers' prior knowledge activation sections (WS2a/WS2b) and WS3's cross-module synthesis quizzes provide the assessment infrastructure. This document connects them into a unified retention system.

---

## 8.1 Review Checkpoint Map

Every review moment in the curriculum serves one of three functions: activating prerequisite knowledge before new content (warm-up), integrating knowledge across modules at Part boundaries (synthesis), or reinforcing spiral concepts within module body text (callback). None of these are optional or decorative -- each is placed at a point where the spacing effect research predicts retrieval practice will strengthen long-term retention.

### Module-Start Warm-Up Questions

Each module opens with 2-3 warm-up questions targeting prerequisite concepts from earlier modules. These are coordinated with the Module Designers' Prior Knowledge Activation sections (WS2a Section "Prior Knowledge Activation" per module, WS2b Section X.3 per module) and implement the pedagogy research recommendation to "begin each new module with a few warm-up questions covering key points from prior modules" [pedagogy-deep-research.md, Section 5].

| Module (Learning Order) | Warm-Up Questions | Source Modules | Spiral Concepts Activated | WS2 Reference |
|---|---|---|---|---|
| M00 (1st) | None -- entry point. Activates personal experience instead: "Which AI tools do you use daily?" | N/A | N/A | WS2a, M00 Prior Knowledge Activation |
| M01 (2nd) | (1) "Which company is a marketplace, not a model maker?" [Microsoft] (2) "Name two providers with 1M-token context." (3) "What did M00 say about OpenAI's model churn?" | M00 | Platform Comparison | WS2a, M01 Prior Knowledge Activation |
| M02 (3rd) | (1) "From M01, what is the per-token input cost for Opus 4.6? For GPT-5.4 Nano?" (2) "Recall the three prompt cache durations." (3) "How does data residency relate to where context is processed?" | M00, M01 | Model Selection/Cost, Context Management | WS2a, M02 Prior Knowledge Activation |
| M03 (4th) | (1) "M01 introduced model selection as the most consequential daily decision. Why does it matter even more for agents?" (2) "Name the four coding tool architectures from M00." (3) "How might extended thinking affect an agent's planning step?" | M00, M01 | Model Selection/Cost, Platform Comparison | WS2a, M03 Prior Knowledge Activation |
| M06 (5th) | (1) "What is the difference between function calling and tool use?" [M03] (2) "In gather-act-verify, which phase does tool invocation serve?" [M03] (3) "Why do agents need external connections?" [M03] | M03 | Gather-Act-Verify, MCP as Protocol | WS2b, M06 Prior Knowledge Activation |
| M04 (6th) | (1) "Describe the gather-act-verify loop in one sentence." [M03] (2) "Name the four agent failure modes." [M03] (3) "Haiku costs $1/MTok vs. Opus at $5/MTok. For 20 parallel research agents, which model and why?" [M01] | M01, M03 | Gather-Act-Verify, Model Selection/Cost | WS2a, M04 Prior Knowledge Activation |
| M05 (7th) | (1) "What agent architecture pattern does Claude Code use?" [M03 -- ReAct/gather-act-verify] (2) "Name one security mechanism for agent sandboxing." [M03] (3) "What is MCP's core value proposition?" [M06] | M03, M06 | Gather-Act-Verify, Security/Safety, MCP as Protocol | WS2a, M05 Prior Knowledge Activation |
| M07 (8th) | (1) "What does an agent's 'act' phase require to execute actions in external systems?" [M03] (2) "How does an MCP server expose its capabilities to an AI client?" [M06] | M03, M06 | Gather-Act-Verify, MCP as Protocol | WS2b, M07 Prior Knowledge Activation |
| M09 (9th) | (1) "Name the three Anthropic cache durations and their discount levels." [M01/M02] (2) "How does MCP differ from function calling at the API level?" [M03/M06] (3) "What is the difference between explicit and automatic prompt caching?" [M02] | M01, M02, M03, M06 | Model Selection/Cost, MCP as Protocol, Context Management | WS2b, M09 Prior Knowledge Activation |
| M08 (10th) | (1) "Which model leads SWE-bench Verified?" [M01] (2) "Name the three prompt caching discount levels across Anthropic, Google, and OpenAI." [M02/M09] (3) "Name one advantage and one limitation of MCP vs. native connectors." [M06] | M01, M02, M06, M09 | Model Selection/Cost, MCP as Protocol, Platform Comparison | WS2b, M08 Prior Knowledge Activation |
| M10 (11th) | (1) "Which models are designed for on-device inference?" [M01] (2) "What is the gather-act-verify loop's governance challenge in enterprise?" [M03/M04] (3) "How does OpenClaw's security posture differ from closed platforms?" [M05] | M01, M03, M04, M05 | Gather-Act-Verify, Security/Safety, Open vs. Closed | WS2b, M10 Prior Knowledge Activation |

**Design rule:** Warm-up questions are retrieval-focused (recall from memory, not look-up), brief (30-60 seconds total), and provide immediate links to the originating section if the learner cannot answer. They use the WS0 `concept-check` widget variant.

### Part Boundary Integration Exercises

At each Part boundary, a standalone synthesis quiz (WS3, Type 4) serves as a cumulative integration exercise. These are coordinated with WS3's cross-module synthesis quiz specifications.

| Boundary | Placement | WS3 Quiz | Modules Tested | Time | Primary Spacing Function |
|---|---|---|---|---|---|
| Part 1 --> Part 2 | After M02, before M03 | Part 1 Synthesis (10-15 Qs) | M00, M01, M02 | 15-25 min | Tests landscape + models + context as an integrated knowledge base. Spacing interval: 0-3 sessions from initial study. |
| Part 2 --> Part 3 | After M05, before M07 | Part 2 Synthesis (10-15 Qs) | M03, M06, M04, M05 + Part 1 callbacks | 15-25 min | Tests agent architectures + MCP + orchestration + open ecosystem. Includes 3-4 questions that require Part 1 recall (models, context). Spacing interval: 1-4 sessions from Part 1 study. |
| Part 3 --> Part 4 | After M09, before M08 | Part 3 Synthesis (10-15 Qs) | M07, M09 + Parts 1-2 callbacks | 15-25 min | Tests skills + APIs. Includes 4-5 questions requiring Parts 1-2 recall. Spacing interval: 2-6 sessions from Part 1, 1-3 from Part 2. |
| Course End | After M10 | Course Capstone (15 Qs + concept map + capstone exercise) | All M00-M10 | 25-35 min | Full cumulative synthesis. Tests all 7 spiral concepts at their deepest treatment. Includes concept-mapping exercise spanning 5+ concepts. |

**Design rule:** Every synthesis quiz includes at least 30% "callback" questions testing material from earlier Parts, not just the current Part's modules. This cumulative testing structure is the primary mechanism for exploiting the spacing effect at the macro level.

### In-Body Callback Locations

Within module body text, explicit callbacks to earlier modules serve as retrieval cues. These are specified in WS1 Section 1.4's spiral sequencing plan and annotated in the Module Designers' section-by-section designs. The complete callback inventory follows.

**Part 1 Modules (M00, M01, M02) -- Minimal callbacks** (little prior material):
- M01 opening: "Module 00 introduced the four ecosystems. Here we compare them at the model level." [SPIRAL: Platform Comparison]
- M02, Token Economics: "The model pricing tables in Module 01 showed the per-token rates. Here we see why raw price is misleading -- caching can reduce effective cost by 90%." [SPIRAL: Model Selection/Cost]

**Part 2 Modules (M03, M06, M04, M05) -- Heavy callbacks** to Part 1:
- M03, Tool Use: "MCP was introduced in Module 00 as a key battleground. Here we see why: it separates an agent with a handful of tools from one that connects to arbitrary services." [SPIRAL: MCP as Protocol]
- M03, Context: "Module 02 covered context engineering as a discipline. Agents are the practitioners." [SPIRAL: Context Management]
- M06 opening: "Module 03 introduced MCP as the production-scale evolution of function calling. This module explains how it works." [SPIRAL: MCP as Protocol]
- M06, Platform Adoption: "We have compared the platforms on models (M01), context (M02), and agents (M03). Now we compare their MCP integration depth." [SPIRAL: Platform Comparison]
- M06, Security: "MCP's OAuth 2.1 authorization layer is the protocol-level answer to the tool access safety concerns raised in Module 03." [SPIRAL: Security/Safety]
- M04, Agent Loop: "Each subagent runs the same gather-act-verify loop introduced in Module 03. The difference is that the parent's 'act' is delegation." [SPIRAL: Gather-Act-Verify]
- M04, Model Selection: "The single-model selection framework from Module 01 becomes a multi-model allocation problem." [SPIRAL: Model Selection/Cost]
- M04, Context Isolation: "Module 03's sandboxing protects a single agent. In multi-agent systems, context isolation serves a similar purpose at the orchestration level." [SPIRAL: Security/Safety]
- M04, Summary Propagation: "Each subagent gets its own context window (M02). Summary propagation is a form of lossy context compression." [SPIRAL: Context Management]
- M05 opening: "Module 00 introduced the open-source layer. Module 01 showed the open-weight models. Here we examine the agent framework that ties them together." [SPIRAL: Open vs. Closed]
- M05, Pi Agent Runtime: "OpenClaw's Pi Agent Runtime implements the same ReAct pattern as Claude Code (Module 03), but adds a two-phase verification step." [SPIRAL: Gather-Act-Verify]
- M05, Channels: "OpenClaw's channel architecture is conceptually parallel to MCP (Module 06), but operates at the user-interaction layer." [SPIRAL: MCP as Protocol]
- M05, Security: "The safety models in Module 03 assume a platform vendor as gatekeeper. OpenClaw has no such gatekeeper." [SPIRAL: Security/Safety]
- M05, Memory: "OpenClaw's SOUL.md/MEMORY.md approach is the philosophical opposite of the cloud memory systems in Module 02." [SPIRAL: Context Management]

**Part 3 Modules (M07, M09) -- Callbacks to Parts 1-2:**
- M07, Skills: "Skills extend the 'act' phase of the agent loop from Module 03." [SPIRAL: Gather-Act-Verify]
- M07, Claude Plugins: "Claude Skills can compose with MCP servers (Module 06) for external tool access." [SPIRAL: MCP as Protocol]
- M07, OpenClaw Skills: "The safety models in Module 03 assume a platform vendor as gatekeeper. OpenClaw has no such gatekeeper -- which is why ClawHub's security landscape is so challenging." [SPIRAL: Security/Safety]
- M09, API architectures: "Each API handles MCP differently. Anthropic built it. OpenAI added Beta support. Google maps it to extensions." [SPIRAL: MCP as Protocol]
- M09, Pricing: "Module 01 introduced model pricing. Module 02 showed how caching reshapes it. Here we see the full implementation." [SPIRAL: Model Selection/Cost]

**Part 4 Modules (M08, M10) -- Callbacks to all prior Parts:**
- M08 opening: "Throughout the curriculum, we have compared the big four across models (M01), context (M02), agents (M03), orchestration (M04), and integration (M06). This module synthesizes all of it." [SPIRAL: Platform Comparison]
- M08, Pricing: "Every pricing tier reflects the model lineups from Module 01 and the cost optimization strategies from Module 02 and Module 09." [SPIRAL: Model Selection/Cost]
- M08, Memory: "The memory architectures here implement the context persistence strategies introduced in Module 02." [SPIRAL: Context Management]
- M10, Governance: "Modules 03-07 showed safety as a technical problem. Here we see it as an organizational and regulatory problem." [SPIRAL: Security/Safety]
- M10, Agent Governance: "Enterprise governance adds a layer around the gather-act-verify loop from Module 03: logging, permission gates, and audit trails." [SPIRAL: Gather-Act-Verify]
- M10, On-Device AI: "On-device AI inverts the context engineering problem from Module 02." [SPIRAL: Context Management]
- M10, Open vs. Closed: "Modules 05 and 06 showed the technical relationship between open and closed ecosystems. Here we examine the strategic and economic dynamics." [SPIRAL: Open vs. Closed]
- M10, MCP trajectory: "MCP is the rare protocol adopted by both closed platforms and open-source frameworks." [SPIRAL: MCP as Protocol]

**Total in-body callbacks:** 30 explicit callback statements across 11 modules. Average: 2.7 per module. Range: 1 (M00, M01) to 5 (M04, M05). Each callback is a sentence or two -- brief enough to reinforce without interrupting flow.

---

## 8.2 Concept Callback Matrix

This matrix maps the 7 spiral concepts from WS1 Section 1.4 across all 11 modules. For each cell where a concept appears, the matrix specifies: the type of treatment, how depth increases from prior appearances, and the specific callback text or cross-reference that links them.

**Legend:**
- **I** = First introduced (primary treatment)
- **D** = Deepened (concept revisited at greater depth)
- **S** = Synthesized (capstone treatment integrating prior appearances)
- **M** = Mentioned (surface reference, not developed)
- **.** = Not present

### Master Matrix

| Concept | M00 | M01 | M02 | M03 | M06 | M04 | M05 | M07 | M09 | M08 | M10 |
|---------|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
| 1. Model Selection / Cost | . | **I** | D | D | . | D | . | . | D | **S** | . |
| 2. Gather-Act-Verify | . | . | . | **I** | . | D | D | D | . | . | D |
| 3. MCP as Protocol | M | . | . | D | **I** | . | D | D | D | . | S |
| 4. Security / Safety | . | . | . | **I** | D | D | D | D | . | . | **S** |
| 5. Context Management | . | M | **I** | D | . | D | D | . | . | . | D |
| 6. Platform Comparison | **I** | D | D | D | D | D | . | . | D | **S** | . |
| 7. Open vs. Closed | M | D | . | . | D | . | **I** | . | . | . | **S** |

Note: Module order follows the learning sequence (WS1), not numerical order. M06 appears before M04 in the learning path.

### Per-Concept Deepening Trajectories

#### Concept 1: Model Selection and Cost-Capability Tradeoffs

| Module | Treatment | Depth Level | What Changes From Prior Appearance | Callback/Cross-Reference |
|--------|-----------|-------------|-----------------------------------|--------------------------|
| M01 | **I** | Framework introduction | N/A -- first appearance. Introduces task-type-to-model-tier mapping, all four providers' pricing tables. | None needed -- origin point. |
| M02 | D | Cost is not just price | Adds caching dimension: same model at 10% cost with prompt caching. Raw per-token price from M01 is misleading. | "The model pricing tables in Module 01 showed the per-token rates. Here we see why raw price is misleading -- caching can reduce effective cost by 90%." |
| M03 | D | Agents choose autonomously | Agents make model selection decisions autonomously (Claude Code uses Opus 4.6; subagents might use Haiku). Adds agent-specific dimension. | "Module 01's model selection framework assumed a human choosing a model. Agents make this choice autonomously, and the stakes are different." |
| M04 | D | Multi-model allocation | Different agents use different models based on role. Adds orchestration dimension: model selection as architectural decision. Dedicated "Strategic Model Selection" section. | "The single-model selection framework from Module 01 becomes a multi-model allocation problem in multi-agent systems." |
| M09 | D | Implementation details | Full pricing tables with caching tiers, batch discounts, model tiering at the API level. Adds developer implementation dimension. | "Module 01 introduced model pricing. Module 02 showed how caching reshapes it. Here we see the full implementation: cache tiers, batch APIs, and the economics at scale." |
| M08 | **S** | Consumer synthesis | Consumer pricing (subscription tiers) mapped against capability differences. Synthesizes all prior dimensions into a decision framework. | "Every pricing tier in this comparison reflects the model lineups from Module 01 and the cost optimization strategies from Module 02 and Module 09." |

#### Concept 2: The Gather-Act-Verify Loop (Agent Architecture)

| Module | Treatment | Depth Level | What Changes From Prior Appearance | Callback/Cross-Reference |
|--------|-----------|-------------|-----------------------------------|--------------------------|
| M03 | **I** | Canonical five-step loop | N/A -- first appearance. Introduces gather, plan, act, verify, loop. Establishes verification as non-negotiable. | None needed -- origin point. |
| M04 | D | Multi-agent coordination | Each agent runs its own loop. Parent's "act" is delegation; parent's "verify" is synthesis of subagent results. Adds coordination dimension. | "Each subagent runs the same gather-act-verify loop introduced in Module 03. The difference is that the parent's 'act' is delegation, not direct action." |
| M05 | D | Open-source implementation | OpenClaw implements the same ReAct pattern with a two-phase verification step. Adds open-source governance dimension. | "OpenClaw's Pi Agent Runtime implements the same ReAct pattern as Claude Code (Module 03), but adds a two-phase verification step." |
| M07 | D | Extensibility | Skills extend the "act" phase by giving agents reusable capability definitions. The loop's action vocabulary is not fixed. | "Skills extend the 'act' phase of the agent loop from Module 03 -- they define new actions the agent can take." |
| M10 | D | Governance overlay | Enterprise governance adds "monitor and audit" layer around the loop. Adds enterprise control dimension. | "Enterprise governance adds a layer around the gather-act-verify loop from Module 03: logging, permission gates, and audit trails." |

#### Concept 3: MCP as Universal Protocol

| Module | Treatment | Depth Level | What Changes From Prior Appearance | Callback/Cross-Reference |
|--------|-----------|-------------|-----------------------------------|--------------------------|
| M00 | M | Named as battleground | Surface mention in competitive landscape. | None needed -- brief mention. |
| M03 | D | Function calling vs. MCP | Distinguishes function calling (simple, inline) from MCP (standardized, external). MCP is "the production-scale evolution." | "MCP was introduced in Module 00 as a key battleground. Here we see why." |
| M06 | **I** | Full protocol treatment | Protocol architecture (JSON-RPC 2.0, transports, OAuth 2.1), core primitives, platform adoption, building servers. Primary treatment. | "Module 03 introduced MCP as the production-scale evolution of function calling. This module explains how it works." |
| M05 | D | Open ecosystem relationship | How OpenClaw's channels relate to MCP at user-interaction vs. tool layer. | "OpenClaw's channel architecture is conceptually parallel to MCP (Module 06), but operates at the user-interaction layer." |
| M07 | D | Skills integration | Skills build on MCP servers for external tool access; Claude Skills + MCP connector integrations. | "Claude Skills can compose with MCP servers (Module 06) for external tool access." |
| M09 | D | API-level support | Each API's MCP support: Anthropic native, OpenAI Beta, Google via extensions. | "Each API handles MCP differently. Anthropic built it. OpenAI added Beta support. Google maps it to extensions. The protocol details are in Module 06." |
| M10 | S | Ecosystem trajectory | MCP as bridge between open and closed ecosystems. Future trajectory synthesis. | "MCP is the rare protocol adopted by both closed platforms and open-source frameworks." |

#### Concept 4: Security and Safety Models

| Module | Treatment | Depth Level | What Changes From Prior Appearance | Callback/Cross-Reference |
|--------|-----------|-------------|-----------------------------------|--------------------------|
| M03 | **I** | Technical foundations | OS-level sandboxing, permission systems, human-in-the-loop patterns. Three isolation strategies. | None needed -- origin point. |
| M06 | D | Protocol authorization | MCP's OAuth 2.1 authorization layer. Security of connecting agents to external services. | "MCP's OAuth 2.1 authorization layer is the protocol-level answer to the tool access safety concerns raised in Module 03." |
| M04 | D | Multi-agent isolation | Context isolation as defense; subagent failures contained within their context. Blast radius containment. | "Module 03's sandboxing protects a single agent. In multi-agent systems, context isolation serves a similar purpose at the orchestration level." |
| M05 | D | Open-source governance gap | 12-20% malicious skill rate, ClawHavoc/ClawJacked. Security without centralized gatekeeping. | "The safety models in Module 03 assume a platform vendor as gatekeeper. OpenClaw has no such gatekeeper." |
| M07 | D | Skills security spectrum | OWASP #1 risk, system prompt extraction, security comparison across five skills platforms. | "The safety models in Module 03 assume a platform vendor as gatekeeper. OpenClaw has no such gatekeeper -- which is why ClawHub's security landscape is so challenging." |
| M10 | **S** | Organizational and regulatory | Agent 365 governance controls, EU AI Act compliance, responsible deployment. Safety as organizational/regulatory problem. | "Modules 03-07 showed safety as a technical problem (sandboxing, isolation, authorization). Here we see it as an organizational and regulatory problem." |

#### Concept 5: Context Management Across Scales

| Module | Treatment | Depth Level | What Changes From Prior Appearance | Callback/Cross-Reference |
|--------|-----------|-------------|-----------------------------------|--------------------------|
| M01 | M | Raw data | Context window sizes in model tables. No conceptual treatment. | None needed -- data point. |
| M02 | **I** | Full discipline | Context as engineering discipline: windows, caching, memory, RAG, compaction. Primary treatment. | None needed -- origin point. |
| M03 | D | Agent context | Agents must manage context across multi-step tasks. Three-phase loop as context management strategy. | "Module 02 covered context engineering as a discipline. Agents are the practitioners." |
| M04 | D | Multi-agent compression | Each agent has its own context window. Summary propagation as lossy context compression. "Lost in the middle" referenced. | "Each subagent gets its own context window (M02). Summary propagation is a form of lossy context compression." |
| M05 | D | Alternative persistence | OpenClaw's file-based memory (SOUL.md, MEMORY.md) -- radically different context persistence strategy. | "OpenClaw's SOUL.md/MEMORY.md approach is the philosophical opposite of the cloud memory systems in Module 02." |
| M10 | D | On-device constraints | On-device models have severely constrained context. The on-device/cloud split as context engineering problem. | "On-device AI inverts the context engineering problem from Module 02: instead of managing a 1M-token window, you're working with 2-3B parameters on constrained hardware." |

#### Concept 6: Platform Comparison (The Big Four)

| Module | Treatment | Depth Level | What Changes From Prior Appearance | Callback/Cross-Reference |
|--------|-----------|-------------|-----------------------------------|--------------------------|
| M00 | **I** | Landscape map | Valuation, revenue, users, flagship model, strategic center. Initial comparison. | None needed -- origin point. |
| M01 | D | Model-level comparison | Model pricing, context, capabilities, benchmarks. | "Module 00 introduced the four ecosystems. Here we compare them at the model level." |
| M02 | D | Context-level comparison | Per-provider caching and memory system tables. | Implicit -- tables structured by provider. |
| M03 | D | Agent-level comparison | Single-agent capabilities, sandboxing, benchmarks. | "We have compared the platforms on models (M01) and context (M02). Now we compare their agent implementations." |
| M06 | D | Integration-level comparison | MCP adoption matrix -- who supports what, at what maturity level. | "We have compared the platforms on models (M01), context (M02), and agents (M03). Now we compare their MCP integration depth." |
| M04 | D | Orchestration-level comparison | Agent SDK vs. Agents SDK vs. ADK vs. Copilot Studio. | Implicit -- framework comparison table. |
| M09 | D | Developer-level comparison | APIs, SDKs, pricing economics. Developer-facing comparison. | Implicit -- API comparison tables. |
| M08 | **S** | Comprehensive consumer synthesis | All dimensions integrated into consumer-facing comparison. Capstone comparison. | "Throughout the curriculum, we have compared the big four across models (M01), context (M02), agents (M03), orchestration (M04), and integration (M06). This module synthesizes all of it." |

#### Concept 7: Open vs. Closed Ecosystem Dynamics

| Module | Treatment | Depth Level | What Changes From Prior Appearance | Callback/Cross-Reference |
|--------|-----------|-------------|-----------------------------------|--------------------------|
| M00 | M | Open-source layer introduced | Names OpenClaw, Ollama, LM Studio. Surface-level tradeoffs. | None needed -- brief introduction. |
| M01 | D | Open-weight models | Specific model capabilities and licensing (Llama, Gemma, Mistral). | Implicit -- open-weight model section. |
| M06 | D | Protocol bridge | MCP as bridge between open and closed ecosystems. | "MCP is the rare protocol adopted by both closed platforms and open-source frameworks." |
| M05 | **I** | Full open ecosystem treatment | OpenClaw architecture, ClawHub, security, local-first philosophy, NemoClaw. Primary treatment. | "Module 00 introduced the open-source layer. Module 01 showed the open-weight models. Here we examine the agent framework that ties them together." |
| M10 | **S** | Strategic and economic synthesis | Full competitive dynamic, ecosystem economics, revenue vs. usage, trajectory. | "Modules 05 and 06 showed the technical relationship between open and closed ecosystems. Here we examine the strategic and economic dynamics shaping their future." |

---

## 8.3 Cumulative Assessment Designs

Three milestone assessments at Part boundaries, plus one Course Capstone. These coordinate with WS3's cross-module synthesis quiz specifications (Section 5.1, Type 4) while specifying the knowledge-synthesis requirements and scenario frames in detail.

### Assessment 1: Part 1 Synthesis -- "The Landscape in Your Head"

**Placement:** After M02 (Context Engineering), before M03 (Single-Agent Systems)
**Modules covered:** M00, M01, M02
**Estimated time:** 15-20 minutes
**Spiral concepts tested:** Model Selection/Cost (at M02 depth), Context Management (at M02 depth), Platform Comparison (at M02 depth)

**Scenario frame:**

> A mid-size SaaS company (200 employees, 40 developers) currently uses no AI tools. The CTO has allocated $8,000/month for AI and wants to see a proposal covering: (1) which platforms to evaluate, (2) which models to use for their top three use cases (code review, customer email drafting, internal knowledge search), and (3) how to manage context and cost efficiently.

**Knowledge that must be synthesized:**
- Platform ecosystem knowledge (M00): Which platforms offer what. Strategic positioning. Enterprise vs. consumer plays.
- Model selection (M01): Model lineups, pricing, capability tiers. Matching models to task types.
- Context engineering (M02): Prompt caching for repeated system prompts. RAG vs. direct injection for the knowledge base. Memory systems for ongoing customer context.
- Cost optimization (M01 + M02): The full cost stack -- model selection, caching, batching.

**Question composition (12 questions):**
- 3 factual recall questions (1 from each module)
- 3 application questions requiring single-module knowledge
- 3 scenario-based decisions requiring 2-module synthesis (e.g., M01 model data + M02 caching strategy)
- 2 compare-your-answer questions requiring 3-module synthesis
- 1 concept-mapping exercise: "Map the relationships between model selection, context window size, prompt caching, and cost. Show how a decision in one area constrains the others."

**Expected complexity:** Moderate. The learner has studied only three modules. The scenario is realistic but contained.

---

### Assessment 2: Part 2 Synthesis -- "How Agents Work"

**Placement:** After M05 (OpenClaw), before M07 (Skills, Plugins & Automation)
**Modules covered:** M03, M06, M04, M05 (plus Part 1 callbacks)
**Estimated time:** 20-25 minutes
**Spiral concepts tested:** Gather-Act-Verify (at M05 depth), MCP as Protocol (at M05 depth), Security/Safety (at M05 depth), Context Management (at M04 depth), Model Selection/Cost (at M04 depth)

**Scenario frame:**

> Your company needs an AI system that monitors three data sources (GitHub issues, Zendesk tickets, internal Slack channels), triages incoming items, and routes them to the appropriate team. Some items need automated responses (simple FAQ answers). Others need human review. The system must handle 500 items/day across all channels. You must decide: single agent or multi-agent? Which platform(s)? What safety model?

**Knowledge that must be synthesized:**
- Agent architecture (M03): Gather-act-verify for each processing step. Tool use for reading GitHub/Zendesk/Slack. Safety model for automated responses.
- MCP integration (M06): MCP servers for GitHub, Zendesk, Slack. Transport selection (STDIO vs. Streamable HTTP for cloud services). Protocol-level authorization.
- Multi-agent orchestration (M04): Whether to decompose into specialized agents (triager, responder, escalator). Orchestration pattern selection. Model allocation (cheap models for triage, stronger for response generation).
- Open vs. closed (M05): Could OpenClaw handle this? What are the tradeoffs vs. closed platforms?
- Part 1 callbacks: Model selection and cost (M01), context management for multi-step workflows (M02).

**Question composition (13 questions):**
- 2 factual recall from Part 2 modules
- 3 application questions requiring single-module knowledge
- 3 scenario-based decisions requiring 2-module synthesis within Part 2
- 3 questions requiring Part 1 + Part 2 integration (e.g., "Calculate the daily cost of this system using M01 pricing + M04 model allocation + M02 caching")
- 1 compare-your-answer requiring full Part 2 synthesis
- 1 concept-mapping exercise: "Map how a single incoming Zendesk ticket flows through the system: which agent(s), which tools (MCP servers), which verification steps, and what safety gates."

**Expected complexity:** Moderate to challenging. Multi-module synthesis required. The scenario forces decisions across agent architecture, integration, and orchestration.

---

### Assessment 3: Part 3 Synthesis -- "Building With These Platforms"

**Placement:** After M09 (Developer Platforms & APIs), before M08 (Consumer AI Comparison)
**Modules covered:** M07, M09 (plus Parts 1-2 callbacks)
**Estimated time:** 15-20 minutes
**Spiral concepts tested:** Model Selection/Cost (at M09 depth), MCP as Protocol (at M09 depth), Gather-Act-Verify (at M07 depth), Security/Safety (at M07 depth)

**Scenario frame:**

> You are building a developer productivity platform that lets engineering teams create custom AI workflows. Teams can define skills (reusable agent capabilities), schedule automated tasks (daily code reviews, weekly security scans), and trigger event-driven actions (PR-created, deploy-completed). You need to choose which underlying APIs to use, how to price your platform, and how to handle the security implications of running user-defined skills.

**Knowledge that must be synthesized:**
- Skills architecture (M07): Which skills system model to adopt. Security implications of code-executing vs. instruction-only skills. Scheduled vs. event-driven patterns.
- API architecture (M09): Which provider API to build on. Pricing economics at scale. Structured outputs for workflow orchestration.
- Part 2 callbacks: MCP as the integration protocol (M06). Agent architecture for the underlying execution (M03). Multi-agent patterns for complex workflows (M04).
- Part 1 callbacks: Model tiering for cost management (M01). Caching strategy for repeated skill invocations (M02).

**Question composition (11 questions):**
- 2 factual recall from Part 3 modules
- 2 application questions requiring single-module knowledge
- 2 scenario-based decisions within Part 3
- 3 questions requiring Parts 1-2 + Part 3 integration
- 1 compare-your-answer requiring full Parts 1-3 synthesis
- 1 worked-example completion (guided stage): partial API pricing calculation with missing steps

**Expected complexity:** Moderate to challenging. Cumulative -- requires integrating knowledge from 7+ modules.

---

### Assessment 4: Course Capstone -- "The Full Picture"

**Placement:** After M10 (Frontier Topics) -- the final assessment
**Modules covered:** All M00-M10
**Estimated time:** 25-35 minutes (quiz) + 15-20 minutes (capstone exercise) = 40-55 minutes total
**Spiral concepts tested:** All 7 at their deepest treatment

This is coordinated with WS3's Course Capstone specification and WS2b's M10 Closing Synthesis. Together, they form the terminal assessment experience:

1. M10's module assessment (12 questions, 8 cumulative) -- embedded in the module
2. Course Capstone synthesis quiz (15 questions) -- standalone page
3. Capstone experience (see Section 8.5 below) -- standalone page

**Scenario frame for the quiz:**

> The AI landscape is about to shift. Google I/O 2026 is in two months. Three companies are making strategic bets: one on consumer multimodal, one on enterprise governance, one on open-source agent frameworks. Using everything you have learned across all 11 modules, analyze these bets.

**Question composition (15 questions):**
- 2 factual recall spanning early and late modules
- 4 scenario-based decisions, each requiring 3+ module synthesis
- 3 compare-your-answer questions requiring cross-Part integration
- 3 self-explanation prompts testing spiral concepts at synthesis depth
- 1 concept-mapping exercise: "Select 5 concepts from across the curriculum and map their relationships. Include at least one concept from each Part."
- 2 forward-looking analysis questions requiring M10 + prior module synthesis

**Expected complexity:** Challenging. This is the highest-order assessment in the curriculum. Every question requires multi-module reasoning.

---

## 8.4 Recommended Study Schedule

This schedule implements spaced practice research recommendations: "suggest a recommended schedule... aim to spend at least 3 days between modules" [pedagogy-deep-research.md, Section 5]. It accounts for the Module Designers' estimated completion times (WS2a/WS2b) and the synthesis quiz durations (WS3).

### Session Design Principles

1. **Session length target: 60-90 minutes.** Cognitive science research on sustained attention suggests diminishing returns beyond 90 minutes of focused study. Modules over 90 minutes (M02 at ~96 min) are split across two sessions.
2. **Spacing interval: 1-3 days between sessions within a Part; 3-7 days between Parts.** Within-Part spacing allows consolidation of closely related material. Between-Part spacing exploits the spacing effect for long-term retention and provides time for the synthesis quiz review.
3. **Every session begins with retrieval.** Either a module's built-in warm-up questions (for the first module in a session) or a brief self-test on the previous session's material (2-3 minutes).
4. **Synthesis quizzes are their own sessions.** They are not appended to the previous module's session -- spacing between the last module and its synthesis quiz improves retrieval practice value.

### The 14-Session Schedule

| Session | Day | Duration | Content | Spacing from Prior |
|---------|-----|----------|---------|-------------------|
| **Part 1: The Terrain** | | | | |
| 1 | Day 1 | ~65 min | M00: Landscape Overview (full) | -- |
| 2 | Day 3 | ~71 min | M01: Models & Intelligence Tiers (full) | 2 days |
| 3 | Day 5 | ~50 min | M02: Context Engineering -- Session A (Context Windows + Caching + Memory) | 2 days |
| 4 | Day 7 | ~60 min | M02: Context Engineering -- Session B (RAG + Compaction + Discipline + Module Assessment) | 2 days |
| 5 | Day 10 | ~20 min | **Part 1 Synthesis Quiz** | 3 days |
| **Part 2: Agent Systems** | | | | |
| 6 | Day 12 | ~67 min | M03: Single-Agent Systems (full) | 2 days |
| 7 | Day 14 | ~58 min | M06: MCP & the Integration Layer (full, excluding closing synthesis) | 2 days |
| 8 | Day 17 | ~75 min | M04: Multi-Agent Orchestration (full) | 3 days |
| 9 | Day 19 | ~65 min | M05: OpenClaw & Open Agent Ecosystem (full) | 2 days |
| 10 | Day 22 | ~25 min | **Part 2 Synthesis Quiz** | 3 days |
| **Part 3: Building & Automating** | | | | |
| 11 | Day 24 | ~47 min | M07: Skills, Plugins & Automation (full) | 2 days |
| 12 | Day 27 | ~55 min | M09: Developer Platforms & APIs (full) | 3 days |
| 13 | Day 30 | ~20 min | **Part 3 Synthesis Quiz** | 3 days |
| **Part 4: Synthesis & Horizon** | | | | |
| 14a | Day 33 | ~51 min | M08: Consumer AI Comparison (full) | 3 days |
| 14b | Day 36 | ~65 min | M10: Frontier Topics (full) | 3 days |
| 15 | Day 39 | ~50 min | **Course Capstone** (quiz + capstone exercise) | 3 days |

**Total elapsed time:** ~39 days (5.5 weeks)
**Total study time:** ~14.5 hours (including all modules, exercises, and synthesis quizzes)
**Average session:** ~58 minutes

### Spacing Rationale

| Spacing Type | Interval | Rationale |
|---|---|---|
| Within-Part (between modules) | 2-3 days | Closely related material benefits from moderate spacing. Short enough to maintain conceptual continuity; long enough for sleep-dependent memory consolidation. |
| Between Parts (synthesis quiz to next Part) | 2-3 days | Synthesis quiz provides active retrieval of the completed Part's material. The gap before the next Part creates interleaving with non-curriculum activity. |
| Module to its synthesis quiz | 3 days | The quiz is more effective as retrieval practice when the material is not immediately fresh. A 3-day gap tests recall, not recognition. |
| M02 split sessions | 2 days | M02 (96 min) exceeds the 90-minute attention ceiling. Splitting at the caching/memory boundary (WS2a's recommended pause point at 36 min) creates natural thematic breaks. Session A covers "what context costs"; Session B covers "how to build with context." |

### Alternative Pacing Options

**Intensive track (3 weeks):** Reduce all spacing to 1 day between sessions, 2 days between Parts. Total: ~21 days. Risk: reduced long-term retention. Appropriate if the learner has an immediate professional need and plans to revisit.

**Extended track (8 weeks):** Increase spacing to 3-4 days within Parts, 5-7 days between Parts. Add a "review session" before each Part where the learner re-scans Key Takeaways from the prior Part. Total: ~56 days. Benefit: stronger long-term retention. Appropriate for learners studying alongside other commitments.

**Non-linear study:** Learners who already have deep expertise in specific areas (e.g., a developer who already knows API architectures well) can skip M09 and treat M08 as a standalone synthesis exercise. The prerequisite map in WS1 Section 1.2 identifies which modules can be skipped without breaking comprehension. However, spiral concept callbacks will reference skipped material, so the learner should scan the Key Takeaways of skipped modules at minimum.

### Visual Study Calendar

For the recommended 14-session schedule, a visual calendar should be presented on the curriculum landing page. Specification for the Visual Strategist:

```
Week 1:  [M00] --- [M01] --- [M02a]
Week 2:  [M02b] --- --- [P1 Quiz]
Week 3:  [M03] --- [M06] ---
Week 4:  --- [M04] --- [M05]
Week 5:  --- [P2 Quiz] --- [M07]
Week 6:  --- --- [M09]
Week 7:  [P3 Quiz] --- --- [M08]
Week 8:  --- [M10] --- --- [Capstone]
```

Each cell shows: module abbreviation, estimated time, and a progress indicator (completed/current/upcoming). The calendar should be interactive (click to navigate) but also printable as a static reference.

---

## 8.5 Capstone Experience

The capstone is the final assessment experience in the curriculum, following M10's module assessment and the Course Capstone synthesis quiz. It is a single, multi-step scenario that requires knowledge from every Part and tests all 7 spiral concepts. This coordinates with WS2b's M10 Closing Synthesis (the healthcare capstone scenario) while extending it into a broader self-assessment and reflection structure.

### Scenario: AI Transformation Advisory

> You are hired as an independent AI strategy consultant by a 300-person European financial services firm. They face the following situation:
>
> **Current state:** They use ChatGPT Business ($30/user/month) for 100 employees. Their 30-person engineering team uses GitHub Copilot. They have no other AI infrastructure. Monthly AI spend: $3,600. Annual: $43,200.
>
> **Desired state:** The CEO wants an AI strategy that addresses five needs:
>
> 1. **Client-facing financial analysis chatbot** that answers questions about market data, portfolio performance, and regulatory requirements. Must handle sensitive client financial data. Subject to EU financial services regulations.
>
> 2. **Internal document automation** for compliance reports, client correspondence, and board meeting summaries. Must integrate with their Microsoft 365 environment. 200 documents/week.
>
> 3. **Code development acceleration** for their engineering team building a fintech platform. They need code review, architecture guidance, and automated testing. Codebase: 500K lines across 12 repositories.
>
> 4. **Regulatory monitoring agent** that watches for new financial regulations, analyzes impact on existing products, and drafts compliance update recommendations for the legal team. New regulations published ~2-3 times per month.
>
> 5. **Enterprise AI governance** -- the board requires full audit trails, access controls, and EU AI Act compliance for all AI deployments.
>
> **Constraints:** Total annual AI budget: 150,000 EUR. No more than three platform subscriptions. All client data must remain within EU data centers. Engineering team strongly prefers terminal-based tools.

### Step Structure (Progressive Complexity)

The capstone is divided into five steps, each drawing on different Parts of the curriculum. Each step builds on the prior step's output.

**Step 1: Platform and Model Selection (Parts 1 + 4)**
Using M00 (platform landscape), M01 (model selection), and M08 (consumer comparison):
- Which platform(s) should the firm adopt? Why?
- For each of the five needs, which model tier is appropriate?
- Calculate approximate monthly API and subscription costs.

*Spiral concepts tested: Model Selection/Cost, Platform Comparison*

**Step 2: Context Architecture (Part 1)**
Using M02 (context engineering):
- For the financial analysis chatbot: RAG or direct context injection? Design the architecture.
- For document automation: What goes in each context layer (identity, knowledge, memory, task)?
- For the codebase: How do you manage context across 500K lines and 12 repositories?
- Design the caching strategy for repeated financial queries.

*Spiral concepts tested: Context Management*

**Step 3: Agent and Integration Architecture (Part 2)**
Using M03 (single agents), M06 (MCP), M04 (multi-agent), and M05 (open-source consideration):
- For the regulatory monitoring agent: Single-agent or multi-agent? What is the safety model?
- Which MCP servers are needed? What transports? What authorization?
- Design the gather-act-verify loop for the regulatory agent.
- Should any component use open-source (OpenClaw)? Why or why not?

*Spiral concepts tested: Gather-Act-Verify, MCP as Protocol, Security/Safety, Open vs. Closed*

**Step 4: Skills, Automation, and API Implementation (Part 3)**
Using M07 (skills/automation) and M09 (APIs):
- How is the regulatory monitoring triggered? Scheduled or event-driven?
- Which skills system for the document automation templates?
- Which API architecture for the chatbot's backend? Pricing optimization?
- Design the end-to-end workflow for a single document automation task.

*Spiral concepts tested: Model Selection/Cost (implementation depth), MCP as Protocol (API depth)*

**Step 5: Governance and Future-Proofing (Part 4)**
Using M10 (frontier topics) and synthesizing all prior steps:
- How do you meet EU AI Act requirements? What governance platform?
- Which upcoming events (Google I/O, Build, WWDC) could affect this strategy?
- What is the firm's exposure if OpenAI deprecates a model they depend on?
- Write a one-paragraph executive summary of the full strategy for the board.

*Spiral concepts tested: Security/Safety (governance depth), Open vs. Closed (strategic depth)*

### Self-Assessment Rubric

After completing all five steps, the learner evaluates their own work against the following rubric. Each criterion maps to specific curriculum knowledge.

| Criterion | Exceeds Expectations | Meets Expectations | Needs Review |
|---|---|---|---|
| **Platform selection** is justified with specific data | Names specific models, cites pricing from M01/M09, explains strategic fit per M00/M08 | Names platforms and general rationale | Generic "use Claude" without data |
| **Cost analysis** is concrete and accurate | Calculates monthly cost per use case using M01 pricing + M02 caching + M09 batch discounts | Provides reasonable estimates with some calculation | No cost figures or wildly inaccurate estimates |
| **Context architecture** addresses the right problems | Specifies RAG vs. injection with decision rationale per M02 framework, designs context layers, plans caching | Addresses context strategy for at least 2 of 5 needs | Ignores context management or uses only "put everything in the context window" |
| **Agent design** includes safety model | Specifies gather-act-verify per M03, identifies failure modes per M03, designs HITL gates | Designs agent architecture with some safety consideration | No safety model or agents without verification |
| **MCP integration** is architecturally specific | Names specific MCP servers, selects transports with rationale, addresses OAuth per M06 | Mentions MCP as the integration approach | No integration strategy or "just use API calls" |
| **Governance** meets regulatory requirements | Specifies Agent 365 or equivalent per M10, addresses EU AI Act per M10, includes audit trails | Acknowledges governance need with some specifics | No governance plan |
| **Multi-platform coherence** -- all five needs work together | All five needs share infrastructure, cost is under budget, platforms integrate via MCP/connectors | Most needs addressed but some gaps in integration | Each need designed in isolation |

### Expert Reference Answer

A detailed expert answer is provided after the learner completes all five steps and reviews the rubric. The expert answer should:
- Walk through each step with specific choices, calculations, and rationale
- Show one strong configuration and one alternative, noting tradeoffs
- Explicitly cite which module's knowledge informs each decision
- Include a budget breakdown table showing the full 150,000 EUR/year allocation
- Include an architecture diagram showing how the five needs interconnect

The expert answer for this capstone draws heavily from WS2b's M10 healthcare capstone scenario structure but adapts it to the financial services domain and extends it to cover all five steps. The expert answer document is a separate deliverable for the Round 4 content authoring team.

### Reflection Prompts

After reviewing the expert answer, the learner encounters four reflection prompts (WS0 Self-Explanation Prompt component). These are not assessed -- they serve as metacognitive consolidation.

1. **Gaps identified:** "Which step was hardest for you? Go back to the relevant module's Key Takeaways section and re-read them. Does the content make more sense now than it did on first reading?"

2. **Integration insight:** "The five needs in this scenario are interconnected -- the regulatory agent's output feeds the document automation system, the chatbot uses the same knowledge base as the compliance reports. Did you design them as an integrated system or as five separate solutions? What would change if you integrated them more tightly?"

3. **Uncertainty tolerance:** "Several parts of this scenario have no single correct answer (which platform, which orchestration pattern, whether to use OpenClaw). How confident are you in your choices? What additional information would increase your confidence?"

4. **Transfer preparation:** "Think of a real organization you know -- your employer, a client, a friend's company. How would you adapt this strategy for them? What would change and what would stay the same?"

---

## Implementation Notes for Downstream Workstreams

### For WS2 Module Designers (already complete -- validation)
- Verify that every module's Prior Knowledge Activation section matches the warm-up questions in Section 8.1. The table above reflects the Module Designers' current specifications; any discrepancies should be resolved in favor of the Module Designers' more detailed per-module designs.
- The in-body callbacks in Section 8.1 match WS1 Section 1.4's explicit callbacks. Module Designers have already integrated these into their section annotations.

### For WS3 Assessment Designer (already complete -- validation)
- The cumulative assessments in Section 8.3 extend WS3's cross-module synthesis quiz specifications with detailed scenario frames and question composition. WS3 specifies the quiz architecture (10-15 questions, standalone HTML pages, types); this document specifies the content design (scenarios, synthesis requirements, concept coverage).
- The Course Capstone quiz (Section 8.3, Assessment 4) is a separate assessment from the capstone experience (Section 8.5). The quiz is a 15-question synthesis assessment; the capstone is a multi-step open-ended scenario. Both appear after M10.

### For WS4 Visual Strategist
- Section 8.4 specifies a visual study calendar for the curriculum landing page. Render as interactive SVG with clickable session blocks, progress tracking, and a printable static version.
- The Concept Callback Matrix (Section 8.2) can be rendered as a heat map visualization alongside WS1's spiral summary matrix. The two are structurally identical but this document adds the deepening trajectory descriptions.

### For WS5 Engagement Specialist
- The capstone reflection prompts (Section 8.5) are engagement touchpoints. The "Transfer preparation" prompt (prompt 4) is particularly important for motivation -- it connects curriculum knowledge to the learner's real professional context.
- The study calendar (Section 8.4) can be enhanced with optional email/notification reminders at session boundaries for learners who opt in.

### For Round 4 Production Team
- The capstone expert answer (Section 8.5) must be authored as a separate multi-page document with architecture diagrams, budget tables, and module cross-references. Estimate 3-4 hours of authoring time.
- The visual study calendar requires JavaScript for progress tracking (localStorage) and interactive navigation. Specification in Section 8.4.

---

## Evidence Citations

| Claim | Source | Key Finding |
|---|---|---|
| Distributed study improves long-term retention | pedagogy-deep-research.md, Section 5; Dunlosky et al. (2013) | "Spacing and interleaving practice over time is strongly supported by cognitive psychology." |
| Cumulative testing exploits spacing effect | pedagogy-deep-research.md, Section 5 | "Students with cumulative assessments learn more and avoid procrastination." |
| Conceptual callbacks act as spaced retrieval | pedagogy-deep-research.md, Section 5 | "Strategically referring back to earlier ideas... act like spaced retrieval." |
| Retrieval benefits untested material too | pedagogy-deep-research.md, Section 5; Dunlosky et al. (2013) | "Research suggests integrating such retrieval benefits untested material too." |
| Self-paced learners need intentional spacing | pedagogy-deep-research.md, Section 5 | "Spacing must be managed intentionally: self-paced learners may not naturally space their studying." |
| Session length ceiling ~90 minutes | pedagogy-deep-research.md, Section 1 (sustained attention research) | Long modules should be split; attention degrades beyond 90 minutes. |
| Concept maps as retrieval practice | pedagogy-deep-research.md, Section 1; concept-mapping meta-analysis | "Concept maps should be used as retrieval practice (after exposure) rather than first-exposure content." |
| Worked-example fading across curriculum | pedagogy-deep-research.md, Section 2; 4C/ID framework | Progressive fading "helps transition novices into independent problem solving." |
| Advance organizers improve retention | pedagogy-deep-research.md, Section 1; Ausubel | "Graphic organizers can serve as effective advance organizers that prime key concepts." |
