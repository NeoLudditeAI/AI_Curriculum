# WS4: Visual and Interactive Specifications

**Workstream:** WS4 -- Diagram Inventory, Interaction Design, Progressive Disclosure Map
**Author:** Chronicler (completing Visual Strategist scope)
**Date:** 2026-03-21
**Status:** Complete
**Depends on:** visual-survey-notes.md, ws0-component-library.md, ws1-course-architecture.md, ws2a-module-designs-m00-m05.md, ws2b-module-designs-m06-m10.md, ws6-layout-accessibility.md, pedagogy-deep-research.md (Section 4)

---

## 4.0 Design Principles

All visual and interactive elements in this curriculum follow six principles derived from the pedagogy research and prior workstream decisions.

### P1: Every Visual Serves a Learning Outcome

No decorative diagrams. Each visual is tied to a specific learning outcome from WS2a/WS2b. If a diagram cannot be traced to an LO, it is cut. This follows Clark and Mayer's multimedia learning principle: relevant diagrams build mental models; irrelevant ones add extraneous cognitive load [pedagogy-deep-research.md, Section 4].

### P2: Spatial Contiguity

Every diagram appears within one scroll-length of the text that discusses it. The build pipeline inserts diagrams at annotation-specified anchor points (WS0, Section 2.1). Text explicitly references the figure: "The architecture in Figure X shows..." This avoids split-attention effects [Sweller].

### P3: Multi-Channel Encoding

No color-only encoding. Every color signal is paired with text labels, icons, or patterns (WS6, Section 6.2). Diagram elements use shape + color + label triads. Status indicators use icon + color + text.

### P4: Progressive Complexity

Simple summary first, detail on demand. Follows Mayer's segmentation principle. Complex diagrams show a simplified view by default; interactive expansion reveals layers. This aligns with the expertise-reversal effect: novices see the scaffolded view; experienced readers expand.

### P5: Consistent Visual Language

All diagrams across all 11 modules use the same visual grammar: shapes, colors, arrow styles, label conventions. A learner encountering a rounded rectangle in M03 knows it means the same thing as in M06. This reduces extraneous load from decoding new visual conventions per module.

### P6: Static-First, Interactive-Enhanced

Every diagram must be comprehensible as a static image (for print, screen readers, JS-disabled). Interactivity layers on top via progressive enhancement. The `<noscript>` and `alt` attributes provide full fallback.

---

## 4.1 Visual Grammar: Shared Conventions

All diagrams use a unified visual vocabulary. These conventions are specified once here and applied across all 11 modules.

### Shape Vocabulary

| Shape | Meaning | Example |
|-------|---------|---------|
| Rounded rectangle | Platform, product, or service | "Claude Code," "Codex," "GPT Store" |
| Rectangle (sharp corners) | Architectural component or layer | "Gateway," "Pi Agent Runtime," "OAuth 2.1" |
| Diamond | Decision point | "Does task fit in one context window?" |
| Circle / pill | Data or artifact | "context window," "tool result," "MCP message" |
| Hexagon | Protocol or standard | "MCP," "JSON-RPC 2.0," "REST" |
| Dashed boundary | Logical grouping / boundary | "Anthropic Ecosystem," "Open-Source Layer" |

### Arrow Vocabulary

| Arrow Style | Meaning |
|-------------|---------|
| Solid, single-head | Data flow or control flow (direction of arrow) |
| Solid, double-head | Bidirectional communication |
| Dashed, single-head | Optional / conditional flow |
| Thick solid | Primary / critical path |
| Dotted | Weak coupling or future/planned connection |

### Color Semantics (aligned with WS6 palette)

| Color | Hex (Light) | Diagram Usage |
|-------|-------------|---------------|
| Deep blue | `#1B4D8E` | Anthropic/Claude ecosystem elements |
| Teal | `#0D7377` | OpenAI/ChatGPT ecosystem elements |
| Forest green | `#1B7A3D` | Google/Gemini ecosystem elements |
| Dark amber | `#E65100` | Microsoft/Copilot ecosystem elements |
| Medium gray | `#6B7280` | Neutral / cross-platform elements |
| Near-black | `#1A1A2E` | Labels, text, arrows |

Each ecosystem color is always paired with a text label identifying the platform. Color alone never distinguishes ecosystems.

### Part Grouping Colors (per WS1/WS6)

Diagrams that reference the four-part course structure use the WS6 part colors:
- Part 1 (The Terrain): `#E8F4FD` background, `#90CAF9` border
- Part 2 (Agent Systems): `#FFF3E0` background, `#FFB74D` border
- Part 3 (Building & Automating): `#E8F5E9` background, `#81C784` border
- Part 4 (Synthesis & Horizon): `#F3E5F5` background, `#CE93D8` border

### Figure Numbering

Figures are numbered per-module: `Figure M00-1`, `Figure M01-1`, etc. Cross-module references use this format. The build pipeline auto-generates figure numbers from annotation order.

### Diagram Format

- **Source format:** SVG (hand-authored or generated from Mermaid/D2 source)
- **Delivery format:** Inline SVG in HTML (allows CSS theming for dark mode)
- **Fallback:** `<img>` with descriptive `alt` text for every diagram
- **Max width:** `90ch` (aligns with WS6 full-width component boundary)
- **Responsive:** SVGs use `viewBox` and scale to container width

---

## 4.2 Per-Module Diagram Inventory

Each diagram entry specifies: ID, type, content description, key labels, interaction design, accessibility requirements, and the learning outcome it supports (from WS2a/WS2b).

---

### Module 00: Landscape Overview

**Diagrams: 4 | Interactive components: 2**

#### Figure M00-1: AI Ecosystem Map

| Field | Specification |
|-------|--------------|
| Type | Ecosystem / relationship diagram |
| Content | Four-quadrant map. Quadrants: Enterprise Autonomy (Anthropic), Consumer Scale (OpenAI), Ubiquitous Distribution (Google), Enterprise Workflow (Microsoft). Satellite clusters: Specialized Tools, Coding Tools, Open-Source/Self-Hosted. Connecting lines show cross-ecosystem relationships (e.g., Azure OpenAI bridges Microsoft-OpenAI). |
| Key labels | Company name, strategic center of gravity (one phrase), representative products (2-3 per quadrant), GitHub stars / user counts for satellite clusters |
| Interaction | Hover: shows tooltip with one-line description. Click: navigates to the relevant module (e.g., clicking Anthropic quadrant links to M01 Anthropic section). Serves as both a learning diagram and a navigation aid. |
| Accessibility | Alt text: "Diagram showing four major AI ecosystems arranged by strategic focus: Anthropic (enterprise autonomy), OpenAI (consumer scale), Google (ubiquitous distribution), Microsoft (enterprise workflow), with specialized tools, coding tools, and open-source projects as satellite clusters." Each quadrant and cluster is a focusable region with `aria-label`. |
| Learning rationale | Supports LO #1 (identify four ecosystems and strategic centers). This is the foundational orientation diagram -- the "advance organizer" (Ausubel) for the entire curriculum. [pedagogy-deep-research.md, Section 1] |
| Priority | HIGH -- first diagram learners encounter |

#### Figure M00-2: Revenue and Valuation Bubble Chart

| Field | Specification |
|-------|--------------|
| Type | Bubble chart (static) |
| Content | X-axis: company. Y-axis: valuation ($380B, $730B, ~$3B, $3.71T). Bubble size: annualized AI revenue. Labels on each bubble: company name + valuation + revenue figure. |
| Key labels | Company names, dollar amounts, percentage annotations where relevant |
| Interaction | Static. Tooltip on hover shows exact figures. |
| Accessibility | Alt text describing the capital asymmetry: "Bubble chart comparing AI company valuations and revenues. Microsoft leads at $3.71T valuation, followed by Google at approximately $3T, OpenAI at $730B, and Anthropic at $380B. Bubble sizes represent AI revenue." Data table provided as `<details>` fallback. |
| Learning rationale | Supports LO #5 (market structure data). Makes capital asymmetry immediately visual. |
| Priority | MEDIUM |

#### Figure M00-3: Coding Tools Architecture Spectrum

| Field | Specification |
|-------|--------------|
| Type | Spectrum / positioning diagram |
| Content | Horizontal axis from "IDE-integrated" to "IDE-fork" to "Terminal agent" to "Cloud agent." Each tool positioned along this axis with name and key metric (users, SWE-bench score). |
| Key labels | Tool names, architecture type labels, user counts |
| Interaction | Static with hover tooltips showing full details per tool. |
| Accessibility | Alt text: "Coding tools positioned along an architecture spectrum from IDE-integrated (GitHub Copilot, Cursor) through IDE-fork (Windsurf) to terminal agent (Claude Code) to cloud agent (Codex, Jules)." |
| Learning rationale | Supports LO #2 (compare four coding tool architectures). Visual positioning makes the architectural distinction tangible. |
| Priority | MEDIUM |

#### Figure M00-4: Key Battlegrounds Concept Map

| Field | Specification |
|-------|--------------|
| Type | Concept map |
| Content | Five nodes: Agentic Autonomy, Enterprise Governance, Integration Standard (MCP), Developer Ecosystem, Consumer UX. Bidirectional edges showing tensions (e.g., Agentic Autonomy <-> Enterprise Governance). Each node links to the primary module covering that battleground. |
| Key labels | Battleground names, relationship descriptions on edges, module links |
| Interaction | Click node: navigates to deep-dive module. Hover edge: shows tension description. |
| Accessibility | Each node is a focusable link with `aria-label` describing the battleground and destination module. Edge descriptions available via keyboard-accessible tooltip. |
| Learning rationale | Supports LO #4 (analyze five competitive battlegrounds). Serves as a forward-pointing navigation aid connecting M00 to the rest of the curriculum. |
| Priority | HIGH -- connects the overview to all subsequent modules |

---

### Module 01: Models & Intelligence Tiers

**Diagrams: 4 | Interactive components: 2**

#### Figure M01-1: Reasoning Modes Architecture Comparison

| Field | Specification |
|-------|--------------|
| Type | Three-panel architecture diagram |
| Content | Three side-by-side panels: (1) Anthropic: serial chain-of-thought with extended thinking (linear flow, thinking tokens visible). (2) OpenAI: separate RL-trained reasoning models (two model paths: standard vs. o-series). (3) Google: parallel hypothesis evaluation (branching tree with convergence). |
| Key labels | Provider name, model names (Claude Opus 4.6, o4-mini, Gemini 2.5 Pro), architectural terms (CoT, RL-trained, parallel evaluation), arrows showing data flow |
| Interaction | Static. Each panel has a hover tooltip summarizing the approach in one sentence. |
| Accessibility | Alt text: "Three-panel comparison of reasoning architectures. Anthropic uses serial chain-of-thought with visible thinking tokens. OpenAI trains separate RL-optimized reasoning models. Google evaluates multiple hypotheses in parallel." Each panel is a focusable region. |
| Learning rationale | Supports LO #3 (explain reasoning mode differences). The structural difference is hard to convey in prose alone -- three simultaneous visuals make the contrast immediate. [pedagogy-deep-research.md, Section 4: "systems diagrams showing components and relationships are powerful for technical domains"] |
| Priority | HIGH |

#### Figure M01-2: Model Tier Spectrum

| Field | Specification |
|-------|--------------|
| Type | Multi-track horizontal spectrum |
| Content | Four horizontal tracks (one per provider). Each track shows budget -> mid -> flagship models positioned by cost-per-MTok. Key capability markers (context window size, multimodal support) annotated at each tier. |
| Key labels | Model names, $/MTok pricing, context window sizes, capability badges (vision, audio, code) |
| Interaction | Hover on any model: shows full details card (pricing input/output, context window, key capabilities). |
| Accessibility | Alt text describing the tiering pattern. Full data available as a comparison table in the module text (table enhancer provides equivalent information). |
| Learning rationale | Supports LO #1 (identify model lineups) and LO #5 (model selection strategy). Visual alignment across providers reveals the convergence pattern. |
| Priority | HIGH |

#### Figure M01-3: Model Release Timeline

| Field | Specification |
|-------|--------------|
| Type | Horizontal timeline |
| Content | 12-month timeline (March 2025 - March 2026). Events for all four providers color-coded by ecosystem color (with icon + label, not color alone). Key releases: GPT-4.5, o3/o4 series, Claude Opus 4.6, Gemini 2.5 Pro, etc. Deprecations marked with strikethrough styling. |
| Key labels | Model names, release dates, "Deprecated" tags where applicable |
| Interaction | Hover on event: shows detail card with release context. Scroll/pan if timeline overflows viewport. |
| Accessibility | Alt text summarizing the velocity: "Timeline showing approximately 15 major model releases across four providers in 12 months, with OpenAI releasing five model generations in that period." Full event list as a `<details>` table fallback. |
| Learning rationale | Supports LO #2 (understand release velocity). The visual density of events communicates the pace of change more powerfully than a list. |
| Priority | HIGH |

#### Figure M01-4: Model Selection Decision Tree

| Field | Specification |
|-------|--------------|
| Type | Interactive decision tree / flowchart |
| Content | Root: "What do you need?" Branches by task type (coding, reasoning, creative, multimodal, budget-constrained). Each branch leads to recommended model(s) with rationale. Terminal nodes show model name + pricing + key strength. |
| Key labels | Task type names, model recommendations, cost indicators |
| Interaction | Click a branch to highlight the path. Selected path stays highlighted. Reset button clears selection. This is a guided exploration, not a quiz. |
| Accessibility | Alt text: "Decision tree for model selection. Starting from task type, branches lead to specific model recommendations." Each decision node is keyboard-navigable. Selected path announced via `aria-live`. |
| Learning rationale | Supports LO #5 (model selection strategy). Decision trees are directly actionable -- the learner walks away with a heuristic they can apply immediately. [pedagogy-deep-research.md, Section 6: Merrill's task-centered approach] |
| Priority | HIGH |

---

### Module 02: Context Engineering

**Diagrams: 5 | Interactive components: 2**

#### Figure M02-1: Context Window Layers

| Field | Specification |
|-------|--------------|
| Type | Concentric rings / stacked layers diagram |
| Content | Five layers from innermost (most persistent) to outermost (most ephemeral): Identity (system prompt) -> Knowledge (RAG, files) -> Memory (cross-session) -> Task (current goal) -> Conversation (recent turns). Each layer annotated with persistence characteristic and approximate token budget. |
| Key labels | Layer names, persistence types (permanent, per-session, cross-session, ephemeral), token budget ranges |
| Interaction | Hover on layer: highlights it and shows detail card (what goes in this layer, how it persists, which platforms implement it). |
| Accessibility | Alt text: "Concentric diagram showing five layers of a context window from most persistent (identity/system prompt at center) to most ephemeral (conversation turns at outer ring)." Layer descriptions available as a text list in `<details>` fallback. |
| Learning rationale | Core conceptual model for the entire module. Supports LO #1 (explain context engineering principles). This is the mental model learners should carry forward. |
| Priority | HIGH -- foundational conceptual diagram |

#### Figure M02-2: RAG Pipeline Architecture

| Field | Specification |
|-------|--------------|
| Type | Process flow diagram with branching variant |
| Content | Three-stage horizontal flow: Indexing (document -> split -> embed -> store in vector DB) -> Retrieval (query -> embed -> search -> rank -> filter) -> Generation (retrieved chunks + query -> LLM -> response). Below the basic flow, an "Advanced RAG" branch shows pre-retrieval processing (query rewriting, HyDE) and post-retrieval processing (re-ranking, compression). |
| Key labels | Stage names, operation names, data types at each step, vector DB icon |
| Interaction | Toggle between "Naive RAG" (basic three-stage flow) and "Advanced RAG" (with pre/post-processing branches). Default: Naive RAG visible, Advanced RAG collapsed. This is progressive disclosure applied to a diagram. |
| Accessibility | Alt text: "RAG pipeline in three stages: indexing (split, embed, store), retrieval (query, search, rank), and generation (inject context, generate response). An advanced variant adds query rewriting before retrieval and re-ranking after retrieval." Toggle control has `aria-expanded` state. |
| Learning rationale | Supports LO #4 (RAG patterns). The toggle between naive and advanced aligns with the 4C/ID principle of presenting simple-to-complex within the same visual frame. |
| Priority | HIGH |

#### Figure M02-3: Compaction Process

| Field | Specification |
|-------|--------------|
| Type | Before/after comparison diagram |
| Content | Left panel ("Before Compaction"): full context window showing system prompt, early turns, tool results, recent turns, all labeled with approximate token counts. Right panel ("After Compaction"): same window but early turns replaced by "[Summary]" block, tool results dropped, system prompt and recent turns preserved. Arrows show what survived and what was lost. |
| Key labels | "Survives," "Summarized," "Dropped" labels with corresponding icons (checkmark, compress, X) |
| Interaction | Static with hover details on each section showing token count before/after. |
| Accessibility | Alt text: "Before-and-after comparison of context window compaction. System prompts and recent turns survive. Older conversation turns are summarized. Tool results and verbose outputs are dropped." |
| Learning rationale | Supports understanding of compaction mechanics (LO #5). The before/after visual makes the information loss concrete. |
| Priority | MEDIUM |

#### Figure M02-4: Prompt Caching Cost Comparison

| Field | Specification |
|-------|--------------|
| Type | Three-column cost flow diagram |
| Content | Three parallel tracks (Anthropic, Google, OpenAI). Each track shows: input pricing -> cache storage cost (if any) -> cache hit pricing -> effective cost per cached request. Anthropic: no storage fee, 90% discount on hits. Google: hourly storage charge, dynamic TTL. OpenAI: automatic caching, 50% discount. |
| Key labels | Provider names, dollar amounts per MTok, discount percentages, "No storage fee" / "Hourly charge" callouts |
| Interaction | Static. Hover shows exact pricing per provider. |
| Accessibility | Alt text describing the three caching models and their cost structures. Equivalent data in the module's caching comparison table (table enhancer). |
| Learning rationale | Supports cost optimization understanding. Visual parallel tracks make the structural differences between caching models immediately comparable. |
| Priority | MEDIUM |

#### Figure M02-5: RAG Decision Framework

| Field | Specification |
|-------|--------------|
| Type | Decision tree / flowchart |
| Content | Root: "How should you handle external knowledge?" Decision nodes: knowledge base size (small/large), update frequency (static/dynamic), query volume (low/high), latency requirements. Terminal nodes: "Context injection" / "Naive RAG" / "Advanced RAG" / "Fine-tuning" with one-sentence rationale. |
| Key labels | Decision criteria, threshold values, approach names, rationale summaries |
| Interaction | Click-to-select branch (same pattern as M01-4 decision tree). Highlighted path persists. |
| Accessibility | Keyboard-navigable decision nodes. Path announced via `aria-live`. Alt text: "Decision tree for choosing between context injection, RAG variants, and fine-tuning based on knowledge base size, update frequency, and query volume." |
| Learning rationale | Supports LO #4 (when to use RAG). Directly actionable decision framework. |
| Priority | HIGH |

---

### Module 03: Single-Agent Systems

**Diagrams: 4 | Interactive components: 1**

#### Figure M03-1: Gather-Act-Verify Loop

| Field | Specification |
|-------|--------------|
| Type | Circular flow diagram |
| Content | Five nodes in a circular arrangement: Gather (read files, search, query tools) -> Plan (determine next action) -> Act (execute tool call, write file, run code) -> Verify (check output, validate result) -> Loop (decide: done or continue). Center annotation: "The fundamental agent architecture." Platform callouts at each node showing which platforms implement each step and how. |
| Key labels | Step names, platform-specific implementations (e.g., "Claude Code: Read tool" at Gather), loop decision criteria |
| Interaction | Hover on any step: shows platform-specific detail card. Hover on platform callout: highlights that platform's implementation across all steps. |
| Accessibility | Alt text: "Circular diagram showing the five-step agent architecture: gather information, plan next action, act by executing tools, verify results, then loop or complete." Each step is a focusable region. |
| Learning rationale | Supports LO #1 (explain agent architecture). This is the foundational pattern referenced by M04, M05, and M07. [WS1 spiral concept: "Agent Architecture Loop"] |
| Priority | HIGH -- foundational pattern diagram |

#### Figure M03-2: Planning Strategies Comparison

| Field | Specification |
|-------|--------------|
| Type | Three-panel structural diagram |
| Content | Three side-by-side panels: (1) ReAct: linear sequence of thought-action-observation steps. (2) Tree-of-Thoughts: branching tree with multiple paths evaluated. (3) LATS: tree with backtracking arrows showing self-correction. |
| Key labels | Strategy names, step labels, branching/backtracking annotations |
| Interaction | Static. Each panel has a one-sentence summary tooltip. |
| Accessibility | Alt text: "Three planning strategies compared. ReAct uses a linear thought-action-observation sequence. Tree-of-Thoughts evaluates multiple branching paths. LATS adds backtracking for self-correction." |
| Learning rationale | Supports LO #2 (agent planning and reasoning). Structural differences between strategies are hard to convey in prose; parallel visuals make the distinction immediate. |
| Priority | MEDIUM |

#### Figure M03-3: Sandboxing Spectrum

| Field | Specification |
|-------|--------------|
| Type | Horizontal spectrum / layered diagram |
| Content | Three isolation levels from weakest to strongest: Docker containers (process isolation, shared kernel) -> gVisor (user-space kernel, reduced syscall surface) -> Firecracker MicroVM (hardware-level isolation, minimal attack surface). Each level shows the isolation boundary and what it protects against. |
| Key labels | Technology names, isolation mechanism descriptions, attack surface indicators |
| Interaction | Static with hover details per level. |
| Accessibility | Alt text: "Sandboxing spectrum from weakest to strongest isolation: Docker containers, gVisor user-space kernel, and Firecracker MicroVM hardware isolation." |
| Learning rationale | Supports LO #4 (safety and sandboxing models). The visual spectrum communicates that sandboxing is not binary but a continuum. |
| Priority | MEDIUM |

#### Figure M03-4: Agent Cost Callout

| Field | Specification |
|-------|--------------|
| Type | Callout box (not a diagram -- uses WS0 callout component) |
| Content | "$1,200/hr: The Cost of Unmonitored Agents." Calculation breakdown: Opus 4.6 at $25/MTok output, Tier 4 rate limit ~800K OTPM, sustained maximum throughput = $1,200/hr. Visual: dollar signs scaling upward with a "rate limit guardrail" line showing where throttling caps cost. |
| Key labels | Dollar amounts, rate limit values, "This is why default-deny matters" callout |
| Interaction | Static. The calculation is the value -- no interactivity needed. |
| Accessibility | Alt text: "Cost callout showing that an unmonitored Opus 4.6 agent at maximum Tier 4 rate limits could cost approximately $1,200 per hour." |
| Learning rationale | Supports LO #4 (safety) and reinforces cost awareness from M01. High-impact data point that motivates the safety models discussion. |
| Priority | HIGH -- memorable anchor point |

---

### Module 04: Multi-Agent Orchestration

**Diagrams: 5 | Interactive components: 1**

#### Figure M04-1: Five Orchestration Patterns

| Field | Specification |
|-------|--------------|
| Type | Five-panel pattern gallery |
| Content | Five diagrams, one per orchestration pattern: (1) Hierarchical: tree with parent-child arrows, subagent results flowing up. (2) Handoff: sequential chain, full context passed between agents. (3) Peer-to-Peer: mesh network with bidirectional arrows. (4) Competitive: parallel paths converging to selection/voting. (5) Router: hub-and-spoke with lightweight router at center. |
| Key labels | Pattern name, agent roles, communication direction, context flow annotations ("full context" vs. "summary only") |
| Interaction | Default: all five shown in a 2x3 grid (fifth centered below). Hover on any pattern: dims others, enlarges the selected pattern with detail annotations. Click: shows a full-width detail view with use case examples. |
| Accessibility | Alt text for each pattern. Keyboard: Tab between patterns, Enter to expand. `aria-expanded` on each pattern card. |
| Learning rationale | Supports LO #1 (orchestration patterns). Five patterns shown simultaneously enables comparison -- the learner sees structural differences at a glance rather than reading five sequential descriptions. [pedagogy-deep-research.md, Section 4: "comparison tables and matrices support learning if they highlight relationships or trade-offs"] |
| Priority | HIGH -- core module diagram |

#### Figure M04-2: Subagents vs. Agent Teams Topology

| Field | Specification |
|-------|--------------|
| Type | Split comparison diagram |
| Content | Left: Subagent model (parent-child tree, communication only through parent, summaries returned upward). Right: Agent Teams model (any-to-any mesh, shared context or message passing, direct peer communication). Center annotation highlighting the key tradeoff: isolation vs. coordination. |
| Key labels | "Parent only," "Any-to-any," "Summary boundary," "Direct message," context flow arrows |
| Interaction | Static with hover annotations on key differences. |
| Accessibility | Alt text: "Comparison of subagent topology (parent-child tree with summary returns) versus agent teams topology (any-to-any mesh with direct communication)." |
| Learning rationale | Supports LO #2 (delegation patterns, context isolation). The structural contrast is the core insight. |
| Priority | HIGH |

#### Figure M04-3: Context Isolation Diagram

| Field | Specification |
|-------|--------------|
| Type | Flow diagram with information boundary |
| Content | Parent agent's full context window shown. Arrow to subagent showing "task prompt + relevant subset." Subagent's own context window (tools, reasoning, intermediate results). Return arrow showing "structured summary" -- most of the subagent's context is lost at this boundary. Annotation: "The summary boundary: what the parent never sees." |
| Key labels | "Full context," "Task prompt," "Own context," "Structured summary," "Lost at boundary" |
| Interaction | Static. Hover on "Lost at boundary" shows examples of what gets dropped. |
| Accessibility | Alt text: "Diagram showing context isolation between parent and subagent. Parent sends a task prompt subset. Subagent builds its own context. Only a structured summary returns -- intermediate reasoning is lost." |
| Learning rationale | Supports LO #2 (context isolation). Critical for understanding why multi-agent designs must plan for information loss. |
| Priority | MEDIUM |

#### Figure M04-4: Progressive Escalation Flowchart

| Field | Specification |
|-------|--------------|
| Type | Decision flow diagram |
| Content | Flow: Task arrives -> Route to budget model (Haiku) -> Generate response -> Quality check -> Pass: return result / Fail: escalate to mid-tier (Sonnet) -> Quality check -> Pass / Fail: escalate to flagship (Opus). Cost annotations at each tier showing per-request cost. |
| Key labels | Model names, cost-per-request, quality check criteria, escalation arrows |
| Interaction | Static with hover showing cost calculations at each tier. |
| Accessibility | Alt text: "Progressive escalation flowchart. Tasks start at the cheapest model tier and escalate to more capable models only when quality checks fail." |
| Learning rationale | Supports LO #4 (model selection in multi-agent systems). Directly actionable pattern from M04's "Strategic Model Selection" section. |
| Priority | MEDIUM |

#### Figure M04-5: Multi-Agent Decision Tree

| Field | Specification |
|-------|--------------|
| Type | Interactive decision tree |
| Content | Root: "Should you use multiple agents?" Decision nodes: "Does the task fit in one context window?" -> "Do you need parallelism?" -> "Do subtasks need different tools?" -> "Is there a quality/cost tradeoff?" Terminal nodes: "Single agent sufficient" or "Multi-agent recommended" with pattern suggestion. |
| Key labels | Decision criteria, yes/no branches, pattern recommendations at terminals |
| Interaction | Click-to-select branches (same pattern as M01-4, M02-5). |
| Accessibility | Keyboard-navigable. Path announced via `aria-live`. |
| Learning rationale | Supports LO #3 (when multi-agent is worth it). Directly answers the practical question learners bring to this module. |
| Priority | HIGH |

---

### Module 05: OpenClaw & Open Agent Ecosystem

**Diagrams: 4 | Interactive components: 1**

#### Figure M05-1: OpenClaw Architecture Stack

| Field | Specification |
|-------|--------------|
| Type | Three-layer architecture diagram |
| Content | Top layer: Channels (web, Slack, Discord, Teams, SMS -- each as an icon + label). Middle layer: Gateway (port 18789, message router, channel adapters). Bottom layer: Pi Agent Runtime (ReAct loop, skills engine, memory system). Attack surface annotations on security-sensitive boundaries. |
| Key labels | Layer names, port numbers, component names, security boundary markers (red dashed lines with shield icons) |
| Interaction | Hover on any component: shows detail card. Hover on attack surface marker: shows the specific vulnerability class. |
| Accessibility | Alt text: "Three-layer OpenClaw architecture: channels (web, Slack, Discord, Teams, SMS) connect through the Gateway router to the Pi Agent Runtime, which implements the ReAct loop with skills and memory." Security annotations described in text. |
| Learning rationale | Supports LO #1 (OpenClaw architecture). This is the reference diagram for understanding what OpenClaw actually is beneath the marketing. |
| Priority | HIGH |

#### Figure M05-2: Malicious Skill Rate Comparison

| Field | Specification |
|-------|--------------|
| Type | Bar chart with annotations |
| Content | Four bars: Koi Security (11.9%), Bitdefender (~20%), Snyk (36.82%), Cross-platform analysis (46.8%). Each bar annotated with methodology notes explaining why rates differ (definitions of "malicious," analysis scope, inclusion criteria). |
| Key labels | Organization names, percentage rates, methodology annotations |
| Interaction | Hover on bar: shows full methodology description. This is critical context -- the variance IS the story. |
| Accessibility | Alt text: "Bar chart showing malicious OpenClaw skill rates from four studies, ranging from 11.9% (Koi Security) to 46.8% (cross-platform analysis). Rates vary primarily due to different definitions of 'malicious' across studies." Data table in `<details>` fallback. |
| Learning rationale | Supports LO #3 (security concerns). The visual immediately communicates both the severity and the measurement uncertainty -- both are essential for an informed assessment. |
| Priority | HIGH |

#### Figure M05-3: NemoClaw Architecture

| Field | Specification |
|-------|--------------|
| Type | Layered architecture diagram (extension of M05-1) |
| Content | Standard OpenClaw stack from M05-1, with NemoClaw additions highlighted: OpenShell sandbox layer wrapping the runtime, Privacy Router controlling data flow to LLM providers, NVIDIA NIM microservices as the model backend. Annotations show where NemoClaw adds hardening vs. base OpenClaw. |
| Key labels | "NemoClaw additions" highlighted with border, "OpenShell," "Privacy Router," "NIM," comparison callouts to base OpenClaw |
| Interaction | Toggle between "Base OpenClaw" and "NemoClaw" views. Default: NemoClaw with additions highlighted. Toggle to base: NemoClaw additions fade/disappear. |
| Accessibility | Toggle has `aria-expanded`. Alt text describes both configurations. |
| Learning rationale | Supports LO #4 (NemoClaw enterprise hardening). The toggle makes the delta between base and enterprise instantly visible. |
| Priority | MEDIUM |

#### Figure M05-4: OpenClaw vs. Closed Platforms Spectrum

| Field | Specification |
|-------|--------------|
| Type | Multi-axis spectrum visualization |
| Content | Three horizontal axes: Data Sovereignty (fully local <-> fully cloud), Security Model (user-managed <-> platform-managed), Customization (unlimited <-> constrained). OpenClaw, Claude, ChatGPT, Gemini, Copilot positioned on each axis. |
| Key labels | Platform names, axis labels, position markers |
| Interaction | Hover on platform marker: highlights that platform across all three axes simultaneously. |
| Accessibility | Alt text: "Three-axis comparison positioning OpenClaw, Claude, ChatGPT, Gemini, and Copilot across data sovereignty, security model, and customization dimensions. OpenClaw is the most local, user-managed, and customizable." Data table fallback. |
| Learning rationale | Supports LO #5 (evaluation framework). Multi-axis positioning is more nuanced than a binary open/closed distinction. |
| Priority | MEDIUM |

---

### Module 06: MCP & the Integration Layer

**Diagrams: 5 | Interactive components: 1**

#### Figure M06-1: MCP Client-Server Architecture

| Field | Specification |
|-------|--------------|
| Type | Network architecture diagram |
| Content | Left side: M clients (Claude, ChatGPT, Gemini, Copilot, OpenClaw -- each as rounded rectangle with ecosystem color). Right side: N servers (GitHub, Slack, Notion, databases, file systems -- each as rounded rectangle). Center: MCP protocol layer (hexagon). Lines connecting every client to the protocol layer, and the protocol layer to every server. Annotation: "M + N implementations instead of M x N." |
| Key labels | Client names, server names, "M + N" vs. "M x N" comparison annotation |
| Interaction | Hover on any client: highlights all servers it can reach. Hover on any server: highlights all clients that can connect. This makes the M+N benefit tangible. |
| Accessibility | Alt text: "MCP architecture showing 5 AI clients connecting to multiple servers through a shared protocol layer, requiring M + N implementations instead of M x N custom integrations." |
| Learning rationale | Supports LO #1 (M + N insight). The visual is the single most effective way to communicate MCP's value proposition. |
| Priority | HIGH -- core module diagram |

#### Figure M06-2: Protocol Handshake Sequence

| Field | Specification |
|-------|--------------|
| Type | Sequence diagram |
| Content | Two columns (Client, Server). Message arrows: Client -> Server: `initialize` (protocol version, capabilities). Server -> Client: `initialize response` (server capabilities, supported primitives). Client -> Server: `initialized` notification. Client -> Server: `tools/list`. Server -> Client: tool definitions. Final state: "Ready for tool invocation." |
| Key labels | Message names, JSON-RPC method names, capability negotiation details |
| Interaction | Static. Hover on any message arrow shows the JSON-RPC payload structure. |
| Accessibility | Alt text: "Sequence diagram showing MCP handshake: client sends initialize with capabilities, server responds with its capabilities, client confirms initialization, then requests available tools." |
| Learning rationale | Supports LO #2 (protocol architecture). Sequence diagrams are the standard format for protocol documentation -- matching the convention reduces cognitive load. |
| Priority | MEDIUM |

#### Figure M06-3: Transport Layer Comparison

| Field | Specification |
|-------|--------------|
| Type | Two-panel architecture diagram |
| Content | Left panel: STDIO transport (local). Client process spawns server as subprocess, communication via stdin/stdout pipes. Right panel: Streamable HTTP transport (remote). Client sends HTTP requests to server endpoint, server responds with SSE streams. Both annotated with use case (local tools vs. remote services). |
| Key labels | Transport names, communication mechanisms, use case annotations |
| Interaction | Static. |
| Accessibility | Alt text: "Two MCP transport mechanisms compared. STDIO: local subprocess with stdin/stdout pipes for local tools. Streamable HTTP: network requests with server-sent events for remote services." |
| Learning rationale | Supports LO #2 (transport selection). The parallel structure makes the deployment topology difference clear. |
| Priority | MEDIUM |

#### Figure M06-4: Three Primitives Diagram

| Field | Specification |
|-------|--------------|
| Type | Three-column control model diagram |
| Content | Three columns: Tools (model-controlled -- the AI decides when to invoke), Resources (application-controlled -- the host app exposes data), Prompts (user-selected -- the human chooses templates). Each column shows: who initiates, data flow direction, example use cases. |
| Key labels | Primitive names, control model labels, initiator icons (robot for model, app icon for application, person icon for user) |
| Interaction | Static. Hover shows example for each primitive. |
| Accessibility | Alt text: "MCP's three primitives: Tools are invoked by the AI model, Resources are exposed by the host application, and Prompts are selected by the user. Each has a different control model." |
| Learning rationale | Supports LO #3 (differentiate three primitives by control model). The control model distinction is the key insight -- who initiates is more important than what the primitive does. |
| Priority | HIGH |

#### Figure M06-5: Integration Strategy Decision Tree

| Field | Specification |
|-------|--------------|
| Type | Interactive decision tree |
| Content | Root: "How should you connect this service?" Decision nodes: "Does an official MCP server exist?" -> "Is it high-frequency?" -> "Is it a Zapier-supported service?" Terminal nodes: "Use official MCP server" / "Build custom MCP server" / "Use native connector" / "Use Zapier MCP bridge." |
| Key labels | Decision criteria, terminal recommendations, effort/maintenance annotations |
| Interaction | Click-to-select (same pattern as other decision trees). |
| Accessibility | Keyboard-navigable. Path announced via `aria-live`. |
| Learning rationale | Supports LO #4 (evaluate integration approaches). Actionable heuristic for real-world integration decisions. |
| Priority | MEDIUM |

---

### Module 07: Skills, Plugins & Automation

**Diagrams: 3 | Interactive components: 1**

#### Figure M07-1: Skills Architecture Comparison

| Field | Specification |
|-------|--------------|
| Type | Five-column parallel architecture diagram |
| Content | Five columns, one per platform: Claude (markdown file -> filesystem scan -> context injection), OpenAI (system prompt + Actions -> GPT Store discovery), OpenClaw (JS/TS code -> ClawHub registry -> runtime execution), Google (AI Chips + Extensions -> Gemini integration), Microsoft (visual builder -> Power Platform deployment). Each column shows the skill lifecycle: definition -> discovery -> execution. |
| Key labels | Platform names, technology names, lifecycle stage labels, architectural differences highlighted |
| Interaction | Default: all five visible in compressed form. Click any column to expand it to full width with detail annotations. This is progressive disclosure applied to a comparison. |
| Accessibility | Alt text: "Five-column comparison of skills architectures. Claude uses markdown files, OpenAI uses system prompts with Actions, OpenClaw uses JavaScript code with ClawHub, Google uses AI Chips and Extensions, Microsoft uses visual builders with Power Platform." Each column is keyboard-expandable. |
| Learning rationale | Supports LO #1 (skills architecture across platforms). The architectural differences become visible when shown in parallel -- the lifecycle patterns are structurally distinct in ways that prose struggles to convey. |
| Priority | HIGH |

#### Figure M07-2: Automation Platform Architecture

| Field | Specification |
|-------|--------------|
| Type | Three-panel flow diagram |
| Content | Three parallel flows: Zapier (linear Zap: trigger -> action -> action), Make (graph-based scenario: multiple paths, conditional branching), Power Automate (hybrid: cloud flows + desktop flows + Teams integration). Each annotated with integration count, pricing tier, and AI feature status. |
| Key labels | Platform names, flow structure labels, integration counts (8,000+ / 2,300+ / 1,000+), AI feature badges |
| Interaction | Static with hover details per platform. |
| Accessibility | Alt text: "Three automation platform architectures. Zapier uses linear trigger-action flows with 8,000+ integrations. Make uses graph-based scenarios with conditional branching and 2,300+ integrations. Power Automate combines cloud, desktop, and Teams flows with 1,000+ connectors." |
| Learning rationale | Supports LO #4 (automation platform comparison). The structural differences (linear vs. graph vs. hybrid) are the key differentiators. |
| Priority | MEDIUM |

#### Figure M07-3: Scheduled Tasks Rollout Timeline

| Field | Specification |
|-------|--------------|
| Type | Horizontal timeline |
| Content | Timeline from late 2025 to early 2026 showing when each platform shipped scheduling capabilities. Events: Codex (event-driven), Claude scheduled tasks, Power Automate scheduled flows, etc. Convergence annotation: "All major platforms shipped scheduling within ~6 months." |
| Key labels | Platform names, dates, feature names, convergence annotation |
| Interaction | Static with hover details per event. |
| Accessibility | Alt text: "Timeline showing convergence of scheduled task capabilities across AI platforms from late 2025 to early 2026." |
| Learning rationale | Demonstrates convergence pattern (spiral concept from WS1). The visual shows how platforms converge on the same capability set. |
| Priority | LOW |

---

### Module 08: Consumer AI Comparison

**Diagrams: 2 | Interactive components: 3**

Module 08 is comparison-table-dominant. Its primary visual treatment is through the WS0 `comparison-table enhancer` component applied to existing tables (specified in WS2a/WS2b). The diagrams below are supplementary.

#### Figure M08-1: Market Share Trajectory

| Field | Specification |
|-------|--------------|
| Type | Multi-line chart |
| Content | X-axis: months (Mar 2025 - Mar 2026). Y-axis: web traffic share percentage. Four lines: ChatGPT (declining from ~87% to ~68%), Gemini (rising from ~5.4% to ~18.2%), Claude (stable ~2%), Copilot (stable ~2%). Each line in ecosystem color + distinct line style (solid, dashed, dotted, dash-dot). |
| Key labels | Platform names, percentage values at start and end points, trend annotations |
| Interaction | Hover on any point: shows exact share percentage and date. Lines use both color AND distinct dash patterns (never color alone). |
| Accessibility | Alt text: "Line chart showing AI platform web traffic share from March 2025 to March 2026. ChatGPT declined from 87% to 68%. Gemini rose from 5.4% to 18.2%. Claude and Copilot remained stable at approximately 2% each." Data table in `<details>` fallback. |
| Learning rationale | Supports LO #4 (market dynamics). The trend lines communicate velocity of change -- Gemini's rise and ChatGPT's decline become immediately apparent. |
| Priority | HIGH |

#### Figure M08-2: Platform Decision Framework

| Field | Specification |
|-------|--------------|
| Type | Interactive recommendation quiz |
| Content | 5-6 questions: "What is your primary use case?" (coding, research, creative, enterprise workflow), "What is your budget?" (free, $20/mo, $200/mo, enterprise), "Do you need agentic capabilities?" (yes/no), "Is data privacy a top concern?" (yes/no), "Do you need integration with Microsoft 365?" (yes/no). Scoring matrix maps answers to platform recommendations. |
| Key labels | Question text, choice labels, recommendation text with rationale |
| Interaction | Standard form with radio buttons. Submit button calculates recommendation. Result shows primary recommendation + runner-up with rationale for each. "Try different answers" button resets. Uses WS0 quiz widget (variant: custom -- no correct/incorrect, just recommendation). |
| Accessibility | Standard form accessibility. Result announced via `aria-live`. |
| Learning rationale | Supports LO #5 (platform selection). Transforms a static comparison table into an interactive tool the learner can use for their own decision. Highest engagement value in the curriculum. [pedagogy-deep-research.md, Section 4: interactive widgets engage advanced users] |
| Priority | HIGH |

#### Interactive: Pricing Calculator (M08)

| Field | Specification |
|-------|--------------|
| Type | Interactive calculator |
| Content | Inputs: team size (1/5/20/100), required capabilities (checkboxes: coding agent, research, creative, enterprise workflow), commitment level (monthly/annual). Output: cost comparison table showing total monthly cost per platform at the selected configuration. |
| Key labels | Input labels, platform names, dollar amounts, "Best value" badge on cheapest option meeting requirements |
| Interaction | Inputs update the output table in real time. No submit button -- live calculation. |
| Accessibility | All inputs properly labeled. Output table has `aria-live="polite"` to announce changes. "Best value" indicated by text label, not color alone. |
| Learning rationale | Directly actionable. Learners can input their actual team configuration and get a personalized cost comparison. |
| Priority | HIGH |

---

### Module 09: Developer Platforms & APIs

**Diagrams: 4 | Interactive components: 1**

#### Figure M09-1: Four API Architectures

| Field | Specification |
|-------|--------------|
| Type | Four-panel architecture diagram |
| Content | Four panels: (1) Anthropic Messages API: request with explicit content blocks, developer manages tool-use loop manually. (2) OpenAI Responses API: request with built-in agentic loop, auto-execution of native tools. (3) Google Gemini API: native multimodal input, consistent SSE streaming. (4) Azure OpenAI: OpenAI API surface with Azure infrastructure wrapper (authentication, networking, compliance). |
| Key labels | API names, structural annotations (explicit blocks vs. agentic loop vs. multimodal vs. wrapper), developer responsibility callouts |
| Interaction | Hover on any panel: shows a minimal code snippet illustrating the structural difference (3-5 lines, not full examples). |
| Accessibility | Alt text: "Four API architectures compared. Anthropic uses explicit content blocks with developer-managed tool loops. OpenAI provides a built-in agentic loop. Google offers native multimodal input. Azure wraps OpenAI's API with enterprise infrastructure." |
| Learning rationale | Supports LO #1 (API architecture differences). The structural differences drive every downstream decision (SDK design, cost optimization, tool integration). |
| Priority | HIGH |

#### Figure M09-2: Cost Optimization Waterfall

| Field | Specification |
|-------|--------------|
| Type | Waterfall / cascade chart |
| Content | Horizontal bars showing cumulative cost reduction: Baseline (100%) -> Model selection (-30-50%) -> Prompt caching (-10-90% of remaining) -> Batching (-50% for eligible) -> Retrieval scope optimization (-variable). Each bar annotated with the specific technique and savings range. Final bar shows "Optimized cost" as a percentage of baseline. |
| Key labels | Technique names, savings percentages, cumulative cost line |
| Interaction | Hover on each bar: shows worked example with dollar amounts for a hypothetical 1M-token/day workload. |
| Accessibility | Alt text: "Waterfall chart showing cumulative API cost optimization. Starting from baseline, applying model selection, caching, batching, and retrieval optimization can reduce costs by 60-90%." |
| Learning rationale | Supports LO #3 (pricing economics). The waterfall format shows that optimizations compound -- each layer saves a percentage of what remains, not of the original. [SPIRAL: "Cost Optimization" -- builds on M01 pricing and M02 caching] |
| Priority | HIGH |

#### Figure M09-3: SDK Ecosystem Heat Map

| Field | Specification |
|-------|--------------|
| Type | Matrix heat map |
| Content | Rows: languages (Python, TypeScript, Java, Go, Ruby, .NET, Rust, Swift, Kotlin). Columns: providers (Anthropic, OpenAI, Google, Azure). Cells: Official (dark fill), Community (medium fill), None (empty). |
| Key labels | Language names, provider names, "Official" / "Community" / "None" text labels in each cell |
| Interaction | Static. Hover on cell shows package name and install command. |
| Accessibility | Uses text labels in addition to fill color. Alt text: "SDK availability matrix. Python and TypeScript have official SDKs from all providers. Java, Go, and .NET coverage varies. Rust, Swift, and Kotlin have limited official support." |
| Learning rationale | Supports LO #2 (SDK coverage). Heat map format makes coverage gaps immediately visible -- a learner using Go can instantly see which providers support it officially. |
| Priority | MEDIUM |

#### Figure M09-4: Platform Selection Decision Tree

| Field | Specification |
|-------|--------------|
| Type | Interactive decision tree |
| Content | Root: "What is your primary requirement?" Branches: Maximum coding performance -> Anthropic. Consumer-facing product -> OpenAI. Cost optimization at scale -> Google. Enterprise compliance (Azure/M365) -> Azure OpenAI. Each terminal with 2-3 sentence rationale and link to relevant API documentation. |
| Key labels | Requirement descriptions, platform recommendations, rationale summaries |
| Interaction | Click-to-select (consistent with all other decision trees). |
| Accessibility | Keyboard-navigable. Path announced via `aria-live`. |
| Learning rationale | Supports LO #5 (platform selection framework). Capstone decision tool for the module. |
| Priority | MEDIUM |

---

### Module 10: Frontier Topics

**Diagrams: 4 | Interactive components: 1**

#### Figure M10-1: Tiered Inference Architecture

| Field | Specification |
|-------|--------------|
| Type | Two-tier architecture diagram |
| Content | Top tier: On-device models (Gemini Nano, Apple Intelligence, Qualcomm) running locally on phone/laptop. Bottom tier: Cloud frontier models (Opus 4.6, GPT-4.5, Gemini 2.5 Ultra). Decision router in the middle directing queries by complexity: simple queries stay on-device, complex queries route to cloud. Annotations: latency, cost, and privacy tradeoffs at each tier. |
| Key labels | Model names, device types, "On-device" / "Cloud" labels, router decision criteria, latency/cost annotations |
| Interaction | Hover on router: shows decision criteria examples. Hover on tier: shows tradeoff details. |
| Accessibility | Alt text: "Two-tier inference architecture. On-device models (Gemini Nano, Apple Intelligence) handle simple, latency-sensitive queries locally. Cloud models handle complex queries requiring frontier capabilities. A decision router directs queries based on complexity." |
| Learning rationale | Supports LO #1 (on-device AI landscape). The emerging split between on-device and cloud is the structural story of the next 12 months. [SPIRAL: "On-Device vs. Cloud" -- extends M01 model tiers and M02 context window constraints] |
| Priority | HIGH |

#### Figure M10-2: Enterprise Governance Stack

| Field | Specification |
|-------|--------------|
| Type | Four-pillar layered architecture diagram |
| Content | Four pillars of Agent 365: Registry (agent catalog, versioning), Identity (Entra ID, permission scoping), Compliance (audit logging, boundary enforcement), Monitoring (usage analytics, cost tracking). Each pillar shows the specific technologies and capabilities. Dotted-line gaps for Claude, OpenAI, Google, and OpenClaw governance -- showing fragmentation. |
| Key labels | Pillar names, technology names, "GA May 2026" date, fragmentation gaps labeled "No equivalent" |
| Interaction | Hover on gap: shows what that platform offers instead (if anything). |
| Accessibility | Alt text: "Agent 365 governance architecture with four pillars: Registry, Identity, Compliance, and Monitoring. Dotted outlines show governance gaps in other platforms (Claude, OpenAI, Google, OpenClaw)." |
| Learning rationale | Supports LO #3 (enterprise governance). The gap visualization makes the fragmentation concrete -- Microsoft is the only platform with comprehensive governance as of March 2026. |
| Priority | HIGH |

#### Figure M10-3: Upcoming Events Calendar

| Field | Specification |
|-------|--------------|
| Type | Calendar / timeline visualization |
| Content | May-June 2026 calendar view. Three events: Google I/O (May 19-20), Microsoft Build (June 2-3), WWDC (June 8-12). Each event annotated with expected announcements and affected curriculum modules. Speculation caveats clearly marked. |
| Key labels | Event names, dates, expected announcements (marked as speculation), affected module numbers |
| Interaction | Click event: shows detail card with expected announcements and which modules would need updating. |
| Accessibility | Alt text: "Calendar showing three upcoming events that may affect curriculum content: Google I/O (May 19-20), Microsoft Build (June 2-3), WWDC (June 8-12)." |
| Learning rationale | Supports LO #5 (upcoming events). Connects the static curriculum to the living landscape -- the learner knows what to watch for. |
| Priority | MEDIUM |

#### Figure M10-4: Curriculum Synthesis Map

| Field | Specification |
|-------|--------------|
| Type | Full-curriculum concept map |
| Content | All 11 modules as nodes arranged in the WS1 four-part structure. Frontier topics from M10 drawn as connecting threads across modules: on-device AI connects M01 and M02, governance connects M03 and M04, open-vs-closed connects M05 and M06, multimodal generation connects M01 and M08. Part grouping colors from WS6. |
| Key labels | Module numbers and short titles, frontier topic thread names, part labels |
| Interaction | Click module node: navigates to that module. Hover thread: highlights all connected modules. This serves as both a capstone visual and a navigation aid. |
| Accessibility | Each node is a focusable link. Thread descriptions available via keyboard tooltip. Alt text: "Curriculum synthesis map showing all 11 modules grouped into four parts, with frontier topic threads connecting related modules across parts." |
| Learning rationale | Capstone visual for the entire curriculum. Shows how frontier topics are not isolated predictions but extensions of the patterns studied throughout the course. Serves as a final "advance organizer in reverse" -- the learner sees the full structure of what they have learned. [pedagogy-deep-research.md, Section 1: concept maps as retrieval practice after exposure] |
| Priority | HIGH -- curriculum capstone |

---

## 4.3 Cross-Module Visual Patterns

Six visual patterns recur across multiple modules. Each is specified once here to ensure consistency.

### Pattern 1: Decision Trees

**Used in:** M01-4, M02-5, M04-5, M06-5, M08-2, M09-4 (6 instances)

| Property | Specification |
|----------|--------------|
| Layout | Top-down tree. Root at top, branches flowing downward. |
| Decision nodes | Diamond shape, question text centered. Max 12 words per question. |
| Branch labels | "Yes" / "No" or short criteria on the branch line. |
| Terminal nodes | Rounded rectangle with recommendation + one-sentence rationale. |
| Interaction | Click a decision node to select a branch. Selected path highlighted in accent blue (`#1B4D8E`). Unselected branches dim to 40% opacity. Reset button at bottom. |
| State | Selected path saved to localStorage under `afc.visual.decision-tree.[figure-id]`. |
| Accessibility | Each node is keyboard-focusable. Arrow keys navigate between sibling branches. Enter selects. `aria-live` region announces the selected path's terminal recommendation. |
| Visual consistency | All six decision trees use identical styling, animation (200ms ease-out), and interaction patterns. |

### Pattern 2: Comparison Table Enhancers

**Used in:** M00, M01, M03, M04, M06, M07, M08, M09 (8 modules, 15+ tables)

Specified fully in WS0 Component 3. Key visual additions for WS4:

| Property | Specification |
|----------|--------------|
| Filter dimensions | Each table's annotation file specifies which columns are filterable. Decision-relevant columns are prioritized (e.g., "Status" column for filtering GA vs. Beta vs. Preview). |
| Sort indicators | Ascending/descending arrows in column headers. Current sort announced to screen readers. |
| Row highlighting | Hover highlights the full row. For multi-platform tables, hover highlights the column header simultaneously. |
| Empty state | When filter matches zero rows: "No matching rows. Try adjusting your filter." (not blank). |

### Pattern 3: Architecture Diagrams

**Used in:** M02-1, M03-1, M04-1, M05-1, M06-1, M07-1, M09-1, M10-1 (8 instances)

| Property | Specification |
|----------|--------------|
| Format | SVG with `viewBox` for responsive scaling |
| Shape vocabulary | Per Section 4.1 shared conventions |
| Labels | 14px minimum font size. Labels inside shapes, not floating. |
| Hover behavior | Hovering a component highlights it and dims unrelated components to 40% opacity (200ms transition). Shows a detail tooltip positioned to avoid viewport overflow. |
| Touch behavior | Tap to toggle highlight (no hover on touch devices). Tap elsewhere to reset. |
| Print | `@media print` removes interactive highlights and shows all labels at full opacity. |

### Pattern 4: Timeline Visualizations

**Used in:** M01-3, M05 (ClawHavoc), M07-3, M10-3 (4 instances)

| Property | Specification |
|----------|--------------|
| Layout | Horizontal. Time flows left to right. |
| Event markers | Circle on the timeline axis. Size proportional to event significance (major release = large, minor update = small). |
| Event labels | Above or below the axis (alternating to avoid overlap). Include date and event name. |
| Ecosystem colors | Events colored by ecosystem (with icon + text label, never color alone). |
| Overflow | If timeline exceeds viewport width: horizontal scroll with grab-to-pan. Scroll indicators (fade-out on edges) signal more content. |
| Responsive | Below 768px: timeline rotates to vertical (time flows top to bottom). |

### Pattern 5: Multi-Panel Comparisons

**Used in:** M01-1, M03-2, M04-1, M06-3, M07-2, M09-1 (6 instances)

| Property | Specification |
|----------|--------------|
| Layout | Side-by-side panels in a CSS Grid row. 2-5 panels per comparison. |
| Panel sizing | Equal width by default. Content determines height (panels share the tallest panel's height for visual alignment). |
| Labels | Panel header with platform/approach name. Consistent label positioning across panels. |
| Interaction (where applicable) | Hover dims other panels to 40% opacity, enlarges hovered panel slightly (scale 1.02, 200ms). Click expands to full width (other panels collapse). |
| Responsive | Below 768px: panels stack vertically. Swipe navigation between panels on touch devices. |

### Pattern 6: Callout Boxes

**Used in:** All 11 modules (volatility warnings, key insights, cost callouts)

Three variants, each with a distinct visual treatment:

| Variant | Icon | Border Color | Background | Usage |
|---------|------|-------------|------------|-------|
| `volatility-warning` | Triangle-exclamation | `#E65100` (dark amber) | `#FFF8E1` | Rapidly changing information |
| `key-insight` | Lightbulb | `#1B4D8E` (deep blue) | `#E3F2FD` | High-value practical takeaway |
| `cost-callout` | Dollar-circle | `#1B7A3D` (forest green) | `#E8F5E9` | Pricing data points, cost analysis |

All callouts use icon + border color + background color + text label (four channels, never color alone). Content within the callout is always visible (not collapsed).

---

## 4.4 Progressive Disclosure Map

This map specifies where progressive disclosure is applied across the curriculum, organized by priority. All disclosures use the WS0 Progressive-Disclosure Accordion (Component 2) unless otherwise noted.

### Tier 1: Essential Progressive Disclosure (content is unreadable without it)

| Module | Section | Variant | What is hidden | What remains visible | Rationale |
|--------|---------|---------|---------------|---------------------|-----------|
| M03 | Agent platform deep-dives | `supplementary-reference` | Full description of each of 10 agents | Agent name, status badge, one-line summary | 10 sequential agent descriptions create an unbroken wall of text. Expandable cards are essential for scannability. |
| M08 | All comparison sections | (handled by table enhancer) | Table rows filtered out by user criteria | Rows matching filter | M08 is almost entirely comparison tables. Without filtering, the learner is overwhelmed by data they may not need. |
| M07 | Platform descriptions | `supplementary-reference` | Full details for each of 5 skills platforms + 3 automation platforms | Platform name, architecture type, one-line summary | Same wall-of-text problem as M03. |
| M02 | RAG section | `advanced-detail` | RAG failure modes, advanced architectures, vector DB comparison details | Core RAG pipeline, decision framework, key patterns | At 5,800 words, M02 is the longest module. RAG section alone is ~1,400 words -- layered reveal is essential. |

### Tier 2: Important Progressive Disclosure (significantly improves readability)

| Module | Section | Variant | What is hidden | What remains visible |
|--------|---------|---------|---------------|---------------------|
| M01 | Cost optimization | `worked-example` | Worked examples with dollar amounts | Summary guidance ("cache hits cost 10%") |
| M01 | Legacy models | `supplementary-reference` | Deprecated model details | "Legacy models exist; see details" |
| M04 | Case study (this curriculum) | `worked-example` | Full Round 1 execution narrative | Summary: "56+ agents, 43K words, 4 batches" |
| M04 | Agent 365 governance | `advanced-detail` | Four governance pillars deep-dive | Summary: "Microsoft leads enterprise governance" |
| M05 | Security section | `advanced-detail` | ClawHavoc / ClawJacked details, mitigation specifics | Summary callout: "12-20% malicious skill rate" |
| M05 | Deployment options | `supplementary-reference` | Docker/Cloud deployment guides | Three deployment cards with recommendation badge |
| M06 | Registry ecosystem | `supplementary-reference` | Third-party directories | Official MCP Registry description |
| M06 | Common pitfalls | `advanced-detail` | Detailed pitfall descriptions | Five pitfall names as a summary list |
| M09 | Speech/Audio, Image/Video | `supplementary-reference` | Modality-specific API details | Summary: "Available for voice and visual apps" |
| M10 | On-device deep-dives | `advanced-detail` | Per-platform technical details | Summary comparison table |

### Tier 3: Optional Progressive Disclosure (nice-to-have for clean layout)

| Module | Section | Variant | What is hidden | What remains visible |
|--------|---------|---------|---------------|---------------------|
| M00 | Specialized tools | `supplementary-reference` | Full descriptions per tool | Tool name + one-line summary cards |
| M00 | Open-source models | `supplementary-reference` | Model family details | Family name + parameter count |
| M01 | CoT anti-pattern | (callout box, not accordion) | N/A -- always visible | Warning callout with explanation |
| M02 | Token count benchmarks | `supplementary-reference` | Specific content type examples | "1M tokens = ~750K words" |
| M09 | Azure OpenAI details | `supplementary-reference` | Enterprise-specific Azure details | Summary: "Azure wraps OpenAI API" |
| M10 | Video generation details | `supplementary-reference` | Sora/Veo partnership and feature details | Summary comparison |

---

## 4.5 Diagram Production Pipeline

### Source Formats

| Diagram Type | Source Format | Tool | Rationale |
|-------------|-------------|------|-----------|
| Architecture diagrams | D2 (`.d2`) | D2 compiler | Declarative, version-controllable, supports auto-layout |
| Sequence diagrams | Mermaid (`.mmd`) | Mermaid CLI | Standard for sequence diagrams, wide tooling support |
| Decision trees | Custom JSON + SVG template | Build script | Decision trees need interactive state; custom format needed |
| Timelines | Custom JSON + SVG template | Build script | Timeline layout needs responsive rotation; custom format needed |
| Bubble/bar/line charts | Observable Plot or Chart.js | Build script | Chart libraries handle axes, legends, responsive behavior |
| Concept maps | D2 (`.d2`) | D2 compiler | Graph layout with labeled edges |

### Build Integration

Diagram sources live alongside annotations:

```
build/
  annotations/
    module-00.yaml          # Pedagogical element placement
    module-01.yaml
    ...
  diagrams/
    m00-ecosystem-map.d2    # Diagram source files
    m00-revenue-bubble.json
    m01-reasoning-modes.d2
    m01-model-tiers.d2
    m01-release-timeline.json
    m01-selection-tree.json
    ...
  templates/
    decision-tree.svg       # SVG templates for interactive diagrams
    timeline.svg
```

The build pipeline:
1. Compiles D2/Mermaid sources to SVG
2. Generates interactive SVGs from JSON + templates
3. Inlines SVGs into HTML at annotation-specified positions
4. Applies CSS theme variables for dark mode compatibility
5. Attaches event handlers from `components.js`

### Accessibility Pipeline

Every diagram goes through an accessibility checklist before build:

1. Alt text written (descriptive, not "diagram of..."" -- states what the diagram shows)
2. `<details>` fallback with equivalent data table or text description
3. Color contrast verified (all text labels >= 4.5:1 against background)
4. No color-only encoding (verified against P3 principle)
5. Interactive elements keyboard-reachable
6. `aria-live` regions for state changes
7. `prefers-reduced-motion` respected (no animation if set)

---

## 4.6 Summary Statistics

| Metric | Count |
|--------|-------|
| Total diagrams specified | 40 |
| High priority diagrams | 21 |
| Medium priority diagrams | 15 |
| Low priority diagrams | 4 |
| Interactive decision trees | 6 |
| Interactive components (non-diagram) | 3 (M08 quiz, M08 calculator, M05-3 toggle) |
| Modules with 5+ diagrams | 3 (M02, M04, M06) |
| Modules with 2-4 diagrams | 7 (M00, M01, M03, M05, M07, M09, M10) |
| Modules with 0-1 diagrams | 1 (M08 -- table-enhancer-dominant) |
| Progressive disclosure entries | 24 (Tier 1: 4, Tier 2: 10, Tier 3: 10) |
| Cross-module visual patterns | 6 |
| Diagram source formats | 4 (D2, Mermaid, JSON+template, chart library) |

---

## 4.7 Dependencies and Handoffs

| This document provides | To |
|------------------------|----|
| Per-module diagram specs with placement anchors | Build pipeline (annotation files reference figure IDs) |
| Visual grammar (shapes, colors, arrows) | Diagram production (source files follow these conventions) |
| Progressive disclosure map | WS2a/WS2b annotation files (accordion placements) |
| Interactive component specs | WS0 component library (behavior patterns) |
| Accessibility requirements per diagram | WS6 (compliance verification checklist) |

| This document depends on | From |
|--------------------------|------|
| Component HTML structure, behavior, ARIA patterns | WS0 |
| Learning outcomes per module | WS2a/WS2b |
| Course architecture, four-part structure, spiral concepts | WS1 |
| Color system, typography, layout grid | WS6 |
| Pedagogy evidence for visual design decisions | pedagogy-deep-research.md, Section 4 |
