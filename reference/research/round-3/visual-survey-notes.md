# Visual Survey Notes: All 11 Modules

Visual Strategist analysis for Round 3 Pedagogical Design.
Identifies visual opportunities, progressive disclosure candidates, and interactive element placements across the curriculum.

---

## Module 00: Landscape Overview (~4,000 words)

### Architecture Diagrams
- **Ecosystem map (high priority):** Four-quadrant map placing Anthropic, OpenAI, Google, Microsoft by strategic center of gravity (enterprise autonomy, consumer scale, ubiquitous integration, enterprise workflow). Specialized tools, coding tools, and open-source as satellite clusters. This is the foundational orientation diagram for the entire curriculum.
- **Revenue/valuation bubble chart:** Valuations ($380B, $730B, $3.71T, ~$3T) with annualized AI revenue as bubble size. Conveys the capital asymmetry immediately.

### Comparison Visualizations
- **Platform Comparison at a Glance (line 65-76):** Existing table is dense (7 columns x 10 rows). Convert to an interactive card-based comparison where learners select 2-3 platforms to compare side-by-side. Progressive disclosure: show top-line metrics first, expand for detail.
- **Coding Tools Comparison (line 122-129):** Architecture type as a visual axis (IDE-integrated -> IDE fork -> terminal agent -> cloud agent). Position tools along this spectrum with key metrics.

### Flowcharts
- **Market dynamics flow:** Consumer web traffic share shift (87% -> 68% for ChatGPT; 5.4% -> 18.2% for Gemini). Animated or staged timeline showing market share migration 2025-2026.

### Progressive Disclosure
- **Specialized Tools section (lines 80-101):** Each tool (Perplexity, Notion, Otter.ai, Zapier, Make, Midjourney, ElevenLabs) as an expandable card with logo, one-line summary visible; full description on expand.
- **Open-Source section (lines 133-177):** Model families as expandable cards with parameter counts and key stats.

### Concept Maps
- **Key Battlegrounds (lines 219-241):** Five battlefronts as a concept map with bidirectional connections (e.g., "Agentic Autonomy" connects to "Enterprise Governance" connects to "Integration Standard"). Each node links to the deep-dive module.

---

## Module 01: Models & Intelligence Tiers (~4,500 words)

### Architecture Diagrams
- **Reasoning modes architecture comparison (high priority):** Three-panel diagram showing Anthropic (serial chain-of-thought), OpenAI (separate RL-trained models), Google (parallel hypothesis evaluation). Visual must show the structural difference, not just describe it.
- **Model tier spectrum:** Visual showing budget -> mid -> flagship for each provider, with pricing and key capability markers along the axis.

### Comparison Visualizations
- **Flagship Model Comparison (line 300-313):** Interactive comparison widget. Learners select models and see a radar/spider chart across dimensions (context, cost, reasoning, multimodal, computer use). More engaging than static table.
- **Budget Model Comparison (line 314-326):** Same treatment as flagship but with cost-per-task emphasis.
- **Multimodal Input/Output matrices (lines 270-287):** Presence/absence grid with color coding (green = GA, yellow = Beta/Preview, red = None). Must use icon + text, never color alone.

### Timelines
- **Model release timeline (high priority):** Horizontal timeline showing major model releases across all four providers over 12 months (Mar 2025 - Mar 2026). Conveys the velocity visually -- OpenAI's 5 generations in 12 months becomes self-evident.
- **Deprecation timeline:** GPT-4o retired Feb 2026, GPT-5.1 retired Mar 2026, DALL-E 2/3 sunset May 2026. Visual urgency.

### Progressive Disclosure
- **Cost Optimization section (lines 46-53):** Start with the summary ("cache hits cost 10%, batch is 50% off"). Expand for worked examples with actual dollar amounts.
- **Legacy models note (line 44):** Collapsible "Legacy Models" section -- not hidden, but visually de-emphasized.
- **CoT Anti-Pattern (lines 246-248):** Callout box with warning icon. This is a high-value practical insight that should visually stand out.

### Concept Maps
- **Model Selection Framework (lines 330-363):** Decision tree flowchart: "What do you need?" -> task type branches -> recommended model(s). Interactive: click a task type, highlight the path.

---

## Module 02: Context Engineering (~5,800 words)

### Architecture Diagrams
- **Context window layers diagram (high priority):** Concentric rings or stacked layers showing Identity -> Knowledge -> Memory -> Task -> Conversation. Labeled with persistence characteristics (permanent, per-session, cross-session, ephemeral). Core conceptual diagram for understanding context engineering.
- **RAG pipeline diagram:** Three-stage flow: Indexing (split -> embed -> store) -> Retrieval (query -> embed -> search -> rank) -> Generation (inject -> generate). With Advanced RAG variant showing pre/post-retrieval processing.
- **Compaction process diagram:** Before/after visualization of what a context window looks like pre- and post-compaction. Show system prompt surviving, recent turns surviving, older turns summarized/dropped.

### Comparison Visualizations
- **Context window convergence table (line 22-27):** Visual timeline showing when each provider reached 1M tokens. Simple but effective.
- **Memory Systems Comparison (lines 152-160):** Existing table is excellent. Enhance with a visual showing data flow -- where data enters, how it's processed, what persists. Four parallel tracks (Claude, ChatGPT, Gemini, Recall).
- **Prompt caching comparison (lines 74-78):** Three-column visual with cost flow diagrams showing how cache economics differ (Anthropic: no storage fee; Google: hourly storage; OpenAI: automatic/50%).
- **Vector Database Options (lines 207-214):** Decision matrix with deployment model on one axis, feature richness on another.
- **Chunking Strategies (lines 222-228):** Visual showing the same document chunked five different ways. Side-by-side comparison makes the tradeoffs tangible.

### Flowcharts
- **RAG Decision Framework (lines 240-248):** Decision tree: "How large is your knowledge base?" -> "How often does it update?" -> recommended approach. Directly actionable.
- **Cost Optimization Stack (lines 379-387):** Waterfall chart showing cumulative savings: model selection -> caching -> RAG -> batching -> prompt optimization. Each step shows percentage saved and running total.

### Progressive Disclosure
- **Token count benchmarks (lines 37-45):** Start with "A million tokens = ~750K words." Expand for specific content type examples.
- **Performance Degradation (lines 48-58):** Accuracy degradation curves as expandable detail under the key "60-70% reliable range" guidance.
- **RAG Failure Modes (lines 253-259):** Each failure mode as a collapsible card with problem/mitigation pattern.
- **Cost Comparison: RAG vs. Context Injection (lines 269-277):** Interactive calculator where learner inputs knowledge base size and query volume, sees cost comparison. High engagement value.

---

## Module 03: Single-Agent Systems (~3,800 words)

### Architecture Diagrams
- **Gather-Act-Verify loop (high priority):** Circular flow diagram showing the five steps (Gather -> Plan -> Act -> Verify -> Loop). Annotate with which platforms implement each step and how.
- **Planning strategies comparison:** Three diagrams side-by-side: ReAct (linear), Tree-of-Thoughts (branching tree), LATS (tree with backtracking). Shows structural difference.
- **Sandboxing spectrum:** Docker (weakest) -> gVisor (moderate) -> Firecracker MicroVM (strongest). Visual showing isolation layers and attack surface.

### Comparison Visualizations
- **Single-Agent Systems table (lines 172-183):** Large comparison table (10 agents x 8 columns). Convert to a filterable interactive: "Show me agents that support MCP" or "Show me GA agents only."
- **Safety models comparison:** Matrix showing HITL, RBAC, Default-Deny, Guardrails across all platforms. Checkmark/cross with annotation.

### Flowcharts
- **Function calling vs. MCP decision:** When to use simple function calling vs. when to use MCP. Two-path decision diagram.
- **Failure mode cascade:** Visual showing how a hallucinated file path leads to cascading errors. Illustrates why verification matters.

### Progressive Disclosure
- **Agent platform deep-dives (lines 58-166):** Each agent (Claude Code, Cowork, Claude in Chrome, ChatGPT Agent, Codex, Jules, etc.) as an expandable section. Show name + status + one-line description; expand for full details. This section is currently a wall of text that would benefit greatly from chunking.
- **Cost analysis (line 256):** The $1,200/hr Opus 4.6 cost at max rate limits is a high-impact data point. Callout box with calculation breakdown.

---

## Module 04: Multi-Agent Orchestration (~4,900 words)

### Architecture Diagrams
- **Five orchestration patterns (high priority):** Five diagrams, one per pattern:
  1. Hierarchical (tree structure, parent-child arrows)
  2. Handoff (sequential chain with full context transfer)
  3. Peer-to-Peer (mesh network with bidirectional arrows)
  4. Competitive (parallel paths converging to selection)
  5. Router (hub-and-spoke with lightweight center)
- **Subagents vs. Agent Teams:** Split diagram comparing communication topology (parent-child only vs. any-to-any).
- **Context isolation diagram:** Shows what information flows between parent and child agents, what's lost at the summary boundary.

### Comparison Visualizations
- **Framework Comparison (lines 197-209):** Dense table (5 frameworks x 10 dimensions). Convert to selectable comparison cards where learners pick 2-3 frameworks to compare.
- **Role-to-Tier Mapping (lines 261-268):** Visual mapping agent roles (Router, Researcher, Writer, Synthesizer, Reviewer, Guardrail) to model tiers with cost indicators.

### Flowcharts
- **Fan-Out/Fan-In pattern:** Visual showing parent spawning N subagents, parallel execution, collection, synthesis. Labeled with cost implications.
- **Progressive escalation pattern:** Cheap model -> quality check -> pass/fail -> escalate to flagship. Decision loop.
- **When to use multi-agent (decision tree):** "Does the task fit in one context window?" -> "Do you need parallelism?" -> "Do subtasks need different tools?" -> single vs. multi recommendation.

### Progressive Disclosure
- **Case Study: This Curriculum's Round 1 (lines 283-293):** Expandable section. The meta-example (this curriculum used 56+ agents) is powerful but detail-heavy.
- **Agent 365 governance details (lines 178-191):** Registry, Identity, Compliance, Monitoring as four expandable pillars.

### Concept Maps
- **Enterprise governance gap:** Visual showing Agent 365 covering the Microsoft ecosystem, with dotted-line gaps for Claude, OpenAI, Google, OpenClaw. Makes the fragmentation concrete.

---

## Module 05: OpenClaw & Open Agent Ecosystem (~3,600 words)

### Architecture Diagrams
- **OpenClaw architecture stack (high priority):** Three-layer diagram: Channels (web, Slack, Discord, Teams, SMS) -> Gateway (port 18789, message router) -> Pi Agent Runtime (ReAct loop, skills, memory). Label attack surfaces.
- **Memory system diagram:** File hierarchy: SOUL.md + MEMORY.md + daily notes. Show hybrid BM25 + vector search.
- **NemoClaw architecture:** Standard OpenClaw + OpenShell sandbox layer + Privacy Router. Show how NemoClaw wraps and hardens the base system.

### Comparison Visualizations
- **OpenClaw vs. Closed Platforms (lines 223-233):** Existing table. Enhance with a spectrum visualization: data sovereignty (fully local -> fully cloud), security (user-managed -> platform-managed), customization (unlimited -> constrained).
- **Malicious skill rate estimates (lines 114-123):** Bar chart showing Koi (11.9%), Bitdefender (~20%), Snyk (36.82%), cross-platform (46.8%) with annotations explaining methodological differences. Visual makes the variance and its reasons immediately clear.

### Timelines
- **ClawHavoc timeline:** January discovery -> February mitigations -> March current state. Events along a timeline with key milestones.
- **Governance transition timeline:** Founder departure (Feb 14) -> Foundation announcement -> Current state.

### Progressive Disclosure
- **Security section (lines 93-144):** This is the highest-stakes content in the module. Structure as: summary callout (12-20% malicious rate) always visible; ClawHavoc details, ClawJacked details, mitigation details as expandable subsections.
- **Deployment options (lines 69-79):** Three cards (Local, Docker, Cloud) with recommendation badge on Docker.

---

## Module 06: MCP & the Integration Layer (~4,300 words)

### Architecture Diagrams
- **MCP client-server architecture (high priority):** Diagram showing M clients (Claude, ChatGPT, Gemini, Copilot, OpenClaw) connecting to N servers (GitHub, Slack, Notion, databases...) through the protocol layer. Visually demonstrates the M+N benefit.
- **Protocol handshake sequence:** Initialize -> Server responds -> Initialized notification -> tools/list -> ready. Sequence diagram format.
- **Transport layer comparison:** STDIO (local, subprocess) vs. Streamable HTTP (remote, network). Two parallel diagrams showing the communication topology.
- **Three primitives diagram:** Tools (model-controlled), Resources (app-controlled), Prompts (user-selected). Show who controls invocation.

### Comparison Visualizations
- **Platform Adoption Matrix (lines 136-142):** Heat map showing adoption depth: dark green (native/foundational) -> light green (GA) -> yellow (Beta) -> gray (none). Across client/server/status dimensions.
- **Zapier MCP architecture (lines 296-308):** Flow diagram: AI Client -> MCP -> Zapier MCP Server -> Zapier connectors -> 8,000+ apps. Shows the multiplier effect.

### Flowcharts
- **MCP server building workflow (lines 262-268):** Six-step developer workflow as a process diagram with decision points.
- **Integration strategy decision tree:** "Does an official MCP server exist?" -> "Is it a high-frequency integration?" -> native connector vs. MCP vs. Zapier bridge.

### Code Visualization
- **TypeScript server example (lines 234-257):** Code block with annotated callouts highlighting: server declaration, tool registration, schema definition, handler function, transport setup. Color-coded by concept, not syntax.

### Progressive Disclosure
- **Registry ecosystem (lines 194-215):** Official Registry as primary content; third-party directories as expandable detail.
- **Common Pitfalls (lines 282-286):** Five pitfalls as expandable warning cards.
- **Specialized Tool MCP Adoption (lines 338-351):** Tool cards with MCP status badges.

---

## Module 07: Skills, Plugins & Automation (~3,800 words)

### Architecture Diagrams
- **Skills architecture comparison (high priority):** Five parallel columns showing how skills work in each platform: Claude (markdown file -> filesystem scan -> context injection), OpenAI (system prompt + Actions -> GPT Store), OpenClaw (JS/TS code -> ClawHub registry -> runtime execution), Google (AI Chips + Extensions), Microsoft (visual builder -> Power Platform). The architectural differences become visible.
- **Automation platform architecture:** Three parallel flows showing Zapier (linear Zap), Make (graph-based scenario), Power Automate (cloud + desktop + Teams flows).

### Comparison Visualizations
- **Skills Architecture Comparison (lines 110-119):** Dense table. Convert to interactive comparison where learner picks 2-3 platforms.
- **Automation Platform Comparison (lines 237-248):** Spider/radar chart across dimensions (integrations, cost, governance, MCP support, AI features). Each platform as an overlay.

### Timelines
- **Scheduled tasks rollout:** Timeline showing when each platform shipped scheduling (late 2025 - early 2026). Demonstrates convergence.

### Progressive Disclosure
- **Claude Skills deep-dive (lines 28-43):** Three scopes (Personal, Project, Distributed) as expandable cards.
- **Custom GPTs (lines 45-57):** GPT Store stats as expandable detail.
- **Event-driven patterns (lines 172-181):** Three native patterns (Codex events, Power Automate webhooks, MCP-mediated) as expandable sections. This is forward-looking content that benefits from modular presentation.
- **Automation platform details:** Each platform (Zapier, Make, Power Automate) as a tabbed section or expandable card.

---

## Module 08: Consumer AI Comparison (~3,900 words)

### Comparison Visualizations (this module is almost entirely comparison)
- **Core Capability Matrix (lines 28-43):** The central table. Convert to an interactive feature comparison tool: checkboxes to select features, platforms highlight/dim based on coverage. This is the highest-value interactive component in the entire curriculum.
- **Reasoning Modes Compared (lines 66-74):** Side-by-side cards with key metrics.
- **Coding Agent Capabilities (lines 82-91):** Interactive comparison with SWE-bench scores as the primary metric.
- **Image Generation (lines 102-109):** Gallery-style comparison with sample output descriptions.
- **Voice and Audio (lines 115-122):** Feature matrix with status indicators.
- **Memory and Personalization (lines 132-138):** Four-track timeline showing memory processing model for each platform.
- **Pricing Analysis tables (lines 164-198):** Interactive pricing calculator: "I need [capabilities] for [team size]. What will it cost?" Highest practical value for the audience.
- **Market Share Trajectory (lines 222-226):** Animated line chart showing share shift over 12 months. ChatGPT declining, Gemini surging, others stable.

### Progressive Disclosure
- **Benchmark section (lines 52-62):** Summary insight ("Claude leads coding, Gemini leads broad knowledge, o4-mini leads math") always visible. Full benchmark table expandable.
- **User Sentiment section (lines 229-237):** Each platform's sentiment as an expandable card with pull quotes.
- **Strategic Differentiators (lines 242-275):** Each platform's moat/blind spot as paired cards.

### Decision Framework
- **Decision Framework table (lines 283-295):** Convert to an interactive quiz: "What do you need most?" -> scored recommendation. High engagement, directly actionable.

---

## Module 09: Developer Platforms & APIs (~4,100 words)

### Architecture Diagrams
- **Four API architectures (high priority):** Side-by-side diagrams showing:
  - Anthropic: Request -> explicit content blocks -> developer manages tool loop
  - OpenAI: Request -> built-in agentic loop for native tools -> auto-execution
  - Google: Request -> native multimodal -> consistent SSE
  - Azure: OpenAI API -> Azure infrastructure wrapper
- **Structured outputs flow:** Schema definition -> model generation -> guaranteed conformance. Show the constraint enforcement.

### Comparison Visualizations
- **SDK Ecosystem table (lines 104-114):** Matrix with official/community/none indicators. Heat map style.
- **Cost Optimization Levers (lines 132-164):** Waterfall chart: model selection -> caching -> batching -> retrieval scope. Cumulative savings visualization.
- **Provider Cost Comparison (lines 170-176):** Three workload scenarios with bar charts per provider. Makes the 30-50% Google advantage visual.
- **Structured Outputs comparison (lines 188-194):** Feature matrix with guarantee levels.
- **Fine-Tuning and Customization (lines 218-224):** Availability matrix (offered/not offered) across providers.

### Flowcharts
- **Platform Selection Framework (lines 274-302):** Decision tree: requirements -> platform recommendation. Four terminal nodes, each with rationale.

### Code Visualization
- **API request/response examples:** Annotated code blocks showing the structural differences between Messages API (content blocks), Responses API (agentic loop), and Gemini API (multimodal input).

### Progressive Disclosure
- **Speech and Audio (lines 242-248):** Expandable section -- relevant for voice-app developers, skippable for others.
- **Image and Video Generation (lines 252-258):** Same treatment.
- **Azure OpenAI details (lines 82-97):** Enterprise-specific; expandable for non-Azure users.

---

## Module 10: Frontier Topics (~4,400 words)

### Architecture Diagrams
- **Tiered inference architecture (high priority):** On-device (Nano, Apple Intelligence) -> Cloud (frontier models) with decision routing. Shows the emerging split.
- **Enterprise governance stack:** Agent 365 four pillars (Registry, Identity, Compliance, Monitoring) as a layered architecture diagram.

### Comparison Visualizations
- **On-Device comparison (lines 47-51):** Three-column comparison (Google Nano, Apple Intelligence, Qualcomm). Simple but useful.
- **Multimodal Generation Comparison (lines 81-88):** Category-by-leader table. Convert to visual with sample output thumbnails or descriptions.
- **Enterprise Governance Comparison (lines 127-137):** The comprehensive governance table. Critical reference -- convert to interactive comparison with filter by capability.
- **Event Impact Matrix (lines 243-247):** Calendar visualization with module impact indicators.

### Timelines
- **Upcoming events timeline (high priority):** May-June 2026 calendar view: Google I/O (May 19-20), MS Build (June 2-3), WWDC (June 8-12). With expected announcements and affected modules.
- **EU AI Act compliance timeline:** August 2026 full applicability, with preparatory milestones.

### Progressive Disclosure
- **On-device platform deep-dives (lines 27-53):** Each platform (Google, Apple, Qualcomm) as an expandable section.
- **Video generation details (lines 64-69):** Sora 2 Disney partnership and Veo 3.1 spatial audio as expandable detail under summary.
- **Gartner predictions (line 141):** 40% adoption + 40% cancellation as a highlighted callout with expandable analysis.

### Concept Maps
- **Curriculum synthesis map:** All 10 prior modules as nodes with the frontier topics as connecting threads (on-device extends M01/M02, governance extends M03/M04, open-vs-closed extends M05/M06). This is the capstone visual for the entire curriculum.

---

## Cross-Module Visual Opportunities

### Curriculum-Wide
1. **Interactive curriculum map:** All 11 modules as nodes with dependency arrows. Click a node to navigate. Serves as advance organizer (Ausubel) and navigation aid. Update dynamically as learner completes modules.
2. **Progress tracker:** Per-module completion with quiz/checkpoint gates. Uses localStorage for persistence.
3. **Glossary hover tooltips:** Terms from GLOSSARY.md show definition on hover anywhere in the curriculum. Reduces context-switching.
4. **Cross-reference link previews:** Hovering over a cross-module link shows a preview snippet. Reduces need to navigate away.

### Recurring Visual Patterns
1. **Volatility warning callouts:** Standardized visual treatment (icon + border + text). Appears in every module. Must be visually distinct from informational callouts.
2. **Platform comparison cards:** Reusable component across M00, M01, M03, M04, M06, M07, M08, M09. Same interaction pattern everywhere.
3. **Decision frameworks:** Interactive decision trees in M01, M02, M04, M08, M09. Consistent visual language.
4. **Code examples:** Annotated code blocks in M06, M09. Same annotation style.
5. **Expandable sections:** Used in every module for progressive disclosure. Consistent expand/collapse behavior.
6. **Timeline visualizations:** Used in M01 (model releases), M05 (security timeline), M07 (scheduling rollout), M10 (upcoming events). Consistent format.

### Progressive Disclosure Priority
Modules with the most content that benefits from progressive disclosure (ordered by need):
1. **M03 (Single Agents):** 10 agents described sequentially -- expandable cards essential
2. **M08 (Consumer Comparison):** Every section is a comparison table -- interactive filtering essential
3. **M02 (Context Engineering):** RAG section is dense and deep -- layered reveal essential
4. **M07 (Skills/Plugins):** Five platform descriptions + three automation platforms -- tabbed or expandable essential
5. **M01 (Models):** Model lineup tables across four providers -- interactive comparison essential

### Word Count vs. Visual Break Points
Pedagogy research recommends breaks every ~800-1,000 words. Module word counts and recommended visual break points:
- M00: ~4,000 words -> 4-5 visual breaks needed
- M01: ~4,500 words -> 4-5 visual breaks
- M02: ~5,800 words -> 6-7 visual breaks (longest module)
- M03: ~3,800 words -> 4 visual breaks
- M04: ~4,900 words -> 5-6 visual breaks
- M05: ~3,600 words -> 4 visual breaks
- M06: ~4,300 words -> 4-5 visual breaks
- M07: ~3,800 words -> 4 visual breaks
- M08: ~3,900 words -> 4 visual breaks
- M09: ~4,100 words -> 4-5 visual breaks
- M10: ~4,400 words -> 4-5 visual breaks
