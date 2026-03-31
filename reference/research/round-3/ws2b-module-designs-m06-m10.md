# WS2b: Module Designs -- M06 through M10

**Workstream:** WS2b -- Module-Level Pedagogical Design (Modules 06-10)
**Author:** Module Designer-B
**Date:** 2026-03-21
**Status:** Complete
**Depends on:** ws1-course-architecture.md, ws0-component-library.md, pedagogy-deep-research.md (Sections 2, 3, 6), all five module source files

---

## Design Principles Applied Across M06-M10

These five modules span Part 2 (M06), Part 3 (M07, M09), and Part 4 (M08, M10) of the course architecture. They share several design challenges:

1. **Table density.** M06, M07, M08, and M09 are comparison-table-heavy modules. Every major table gets a `comparison-table enhancer` with filter dimensions tailored to that table's decision-relevant columns.
2. **Protocol and API content.** M06 and M09 contain technical protocol/API material that benefits from `worked-example fader` sequences. Code examples are annotated, not decorative.
3. **Synthesis load.** M08 and M10 sit in Part 4 (Synthesis & Horizon), meaning they must actively trigger retrieval of concepts from Parts 1-3. Prior knowledge activation and closing synthesis exercises are heavier here than in earlier modules.
4. **Spiral callbacks.** Per ws1-course-architecture.md Section 1.4, explicit callbacks for seven spiral concepts are inserted at designated points. These are marked inline below as `[SPIRAL: name]`.

---

## Module 06: MCP & the Integration Layer

**Position in course:** Part 2, Sequence 5 (after M03: Single-Agent Systems)
**Estimated study time:** 35-40 minutes (including exercises)
**Pause points:** After Section 2 (Protocol Architecture), after Section 6 (Building MCP Servers)

---

### 6.1 Learning Outcomes

By the end of this module, the learner will be able to:

1. **Explain** why MCP collapses integration complexity from M x N to M + N and identify the analogous role of LSP in IDE tooling (Bloom's: Understand).
2. **Analyze** the MCP protocol architecture -- JSON-RPC 2.0, transport layers, capability negotiation, OAuth 2.1 -- and select the appropriate transport for a given deployment scenario (Bloom's: Analyze).
3. **Differentiate** the three MCP primitives (Tools, Resources, Prompts) by their control model (model-controlled vs. application-controlled vs. user-selected) and identify which primitive applies to a given integration need (Bloom's: Analyze).
4. **Evaluate** the MCP adoption depth of each major platform and predict which integration approach (MCP, native connectors, automation bridge) suits a given organizational context (Bloom's: Evaluate).
5. **Design** a minimal MCP server that exposes a tool with proper descriptions, error handling, and transport selection (Bloom's: Create).

---

### 6.2 Opening Hook

**Type:** Problem scenario (Merrill's problem-centered principle)

> You are building a coding assistant that needs to read GitHub issues, query a Postgres database, and check a Google Calendar -- all within the same conversation. Without MCP, each connection demands bespoke code: different authentication, different data formats, different error handling. Three integrations, three custom implementations. Now imagine scaling that to thirty integrations across five AI clients. How would you avoid building 150 custom connectors?

This hook establishes the integration complexity problem that MCP solves, grounding the protocol discussion in a concrete architectural decision the learner can relate to from M03's agent tool-use patterns. It creates a knowledge gap (Loewenstein) that the module fills.

---

### 6.3 Prior Knowledge Activation

**Component:** `concept-check gate`
**Placement:** After opening hook, before Section 1

Three warm-up questions drawing on M03 prerequisites:

1. "What is the difference between function calling and tool use in agentic systems?" (Tests: M03, "Tool Use: Function Calling and MCP")
2. "In the gather-act-verify loop, which phase does tool invocation serve?" (Tests: M03, "How Agents Work: The Core Architecture")
3. "Why do agents need external connections beyond their training data?" (Tests: M03, agent platform descriptions -- the concept that agent capability is partly defined by tool access)

Each item links to the specific M03 section for review. Checkbox state persisted to localStorage.

---

### 6.4 Section-by-Section Annotations

#### Section 1: What MCP Is and Why It Exists (~600 words)

| Placement | Component | Details |
|-----------|-----------|---------|
| After "The Problem MCP Solves" paragraph (M x N explanation) | `concept-check quiz` (1 question) | Q: "If 8 AI clients each need to connect to 12 services, how many integrations are needed without MCP vs. with MCP?" Choices: 96 vs. 20 / 96 vs. 12 / 20 vs. 96 / 12 vs. 20. Correct: 96 vs. 20. Feedback: "Without MCP: 8 x 12 = 96 custom integrations. With MCP: 8 clients + 12 servers = 20 implementations. This is the M + N insight." |
| After "Origins and Governance" subsection | `glossary tooltip` | First-use terms: **MCP**, **Agentic AI Foundation**, **JSON-RPC 2.0** |
| Opening paragraph | `[SPIRAL: MCP as Universal Protocol]` callback | "Module 03 introduced MCP as the production-scale evolution of function calling. This module explains how it works." (per ws1 Section 1.4) |

**Complexity:** Low. Conceptual framing. No protocol details yet.

---

#### Section 2: Protocol Architecture (~1,200 words)

| Placement | Component | Details |
|-----------|-----------|---------|
| After transport table (STDIO / Streamable HTTP / SSE) | `comparison-table enhancer` | Filter dimensions: **Transport type**, **Use case** (local vs. remote), **Status** (GA vs. deprecated). Sticky first column. |
| After "Persistent Connections and Capability Discovery" (4-step handshake) | `worked-example fader` -- stage `full` | **Full worked example:** Trace a complete MCP connection lifecycle. Step 1: Client sends `initialize` with protocol version. Step 2: Server responds with capabilities list. Step 3: Client sends `notifications/initialized`. Step 4: Client calls `tools/list` and receives tool descriptions. Annotated JSON snippets for each step. |
| After OAuth 2.1 subsection | `progressive-disclosure accordion` (variant: `advanced-detail`) | Title: "OAuth 2.1 Token Exchange: Complete Flow." Contains the 4-step OAuth flow with PKCE details and Protected Resource Metadata. Advanced because most learners will use STDIO locally; OAuth is needed only for remote server deployment. |
| End of Section 2 | `concept-check quiz` (2 questions) | Q1: "Which transport would you choose for a server that only your local machine needs to access?" (STDIO). Q2: "What happens during capability negotiation when a server's tools change mid-session?" (Server sends notification; client re-fetches tools/list). Feedback references specific subsections. |

**Complexity:** Medium. Protocol specifics require careful reading; the worked example scaffolds comprehension.

**Pause point:** Natural break after Section 2. Prompt: "This is a good stopping point (~15 minutes in). The next sections cover what MCP delivers (primitives) and who uses it (platform adoption)."

---

#### Section 3: Core Primitives (~800 words)

| Placement | Component | Details |
|-----------|-----------|---------|
| After the three-primitive explanation (Tools/Resources/Prompts) | `self-explanation prompt` | Prompt: "In your own words, explain why Tools are 'model-controlled' while Resources are 'application-controlled.' What practical difference does this make for an MCP server designer?" Expert answer: "Tools let the AI model decide when and how to invoke them based on conversation context -- the developer sets up the server, but the model autonomously selects tools. Resources are fetched by the client application's own logic (e.g., pre-loading project files when a user opens a workspace). The practical difference: tool descriptions must be written for the model to interpret; resource URIs must be designed for the application's retrieval logic." |
| After "How the Primitives Work Together" (6-step workflow) | `worked-example fader` -- stage `partial` | **Completion problem:** The 6-step project-management workflow is presented with steps 2 and 5 blanked. Learner fills in: Step 2 (Claude discovers 12 tools via `tools/list`) and Step 5 (User gives a task, Claude autonomously selects a tool). Reveal shows full annotated sequence. |
| After primitives section | `glossary tooltip` | First-use terms in this module: **MCP Server**, **MCP Client**, **Tools (MCP)**, **Resources (MCP)**, **Prompts (MCP)** |

**Complexity:** Medium. The three-primitive taxonomy is the conceptual core of MCP understanding.

---

#### Section 4: Platform Adoption (~900 words)

| Placement | Component | Details |
|-----------|-----------|---------|
| After the Adoption Matrix table | `comparison-table enhancer` | Filter dimensions: **Platform**, **Role** (client/server/both), **Status** (GA/Beta), **Integration Depth** (descriptive column). Sticky first column. This is the most decision-relevant table in the module -- enhancer lets learners filter by their platform of interest. |
| After each platform subsection (Anthropic, OpenAI, Google, Microsoft, OpenClaw) | `progressive-disclosure accordion` (variant: `supplementary-reference`) | One per platform. Title pattern: "Platform-Specific MCP Configuration Details." Contains the configuration specifics (e.g., `claude_desktop_config.json` paths, ChatGPT Developer Mode settings, Google managed server endpoints). Collapsed by default because the critical learning is the comparative adoption picture, not implementation specifics. |
| After "MCP Apps" paragraph (OpenAI) | `glossary tooltip` | First-use term: **MCP Apps** |
| `[SPIRAL: Platform Comparison]` callback at section opening | Inline text | "We have compared the platforms on models (Module 01), context (Module 02), and agents (Module 03). Now we compare their MCP integration depth -- the protocol that connects agents to the world." |

**Complexity:** Medium. Requires tracking five platforms' adoption postures.

---

#### Section 5: The MCP Registry Ecosystem (~400 words)

| Placement | Component | Details |
|-----------|-----------|---------|
| After "Official vs. Community Servers" | `concept-check quiz` (1 question) | Q: "You need to connect Claude to your company's internal HR system. No official MCP server exists for the HR platform. What should you evaluate before using a community server?" Choices include maintenance activity, star count, authentication handling, and "all of the above." Correct: all of the above. Feedback: "Community servers vary in quality and security. Check maintenance, community trust signals, and especially how authentication is handled for servers that access sensitive data." |

**Complexity:** Low. Registry awareness, not protocol depth.

---

#### Section 6: Building MCP Servers (~900 words)

| Placement | Component | Details |
|-----------|-----------|---------|
| Before the TypeScript code example | `worked-example fader` -- stage `full` | **Full worked example:** The existing TypeScript weather server code, annotated line-by-line. Annotations explain: (1) McpServer constructor and metadata, (2) `server.tool()` registration with schema, (3) handler function with async execution, (4) StdioServerTransport for local use. Each annotation connects back to protocol concepts from Section 2. |
| After the code example | `worked-example fader` -- stage `partial` | **Completion problem:** "Extend the weather server to add a second tool: `get_alerts` that takes a `region` parameter and returns active weather alerts. Fill in the tool registration call." Learner sees the `server.tool(...)` call with blanks for the tool name, description, schema, and handler skeleton. Reveal shows completed code with annotations. |
| After "Common Pitfalls" list | `worked-example fader` -- stage `guided` | **Guided problem:** "Design the tool descriptions for an MCP server that wraps a project management API. The server should support: creating tasks, querying the backlog, and updating task status. Write the tool name, description, and input schema for each." Hints available on request (hint 1: description specificity matters for model selection; hint 2: avoid overly broad tool names). Reveal shows expert-quality descriptions with reasoning for each design choice. |
| After "Development Workflow" 6-step list | `progressive-disclosure accordion` (variant: `worked-example`) | Title: "Complete MCP Server Development Walkthrough." Contains a condensed end-to-end tutorial: init project, define tools, test with MCP Inspector, connect to Claude Desktop. Collapsed because it is supplementary practice material, not the critical learning path. |
| `[SPIRAL: Security/Safety]` callback at "Security surface" pitfall | Inline text | "MCP's OAuth 2.1 authorization layer (new in 2026) is the protocol-level answer to the tool access safety concerns raised in Module 03." |

**Complexity:** High. This is where learners transition from understanding MCP to building with it. The fader sequence scaffolds this transition.

**Pause point:** Natural break after Section 6. Prompt: "You have now seen how to build an MCP server (~25 minutes in). The remaining sections cover ecosystem bridges and integration strategy."

---

#### Section 7: Zapier MCP (~500 words)

| Placement | Component | Details |
|-----------|-----------|---------|
| After the pricing/quotas table | `comparison-table enhancer` | Filter dimensions: **Zapier Plan**, **Monthly Cost**, **MCP Calls/Month**. Simple table but enhancer allows sorting by cost. |
| After "Make as Alternative Bridge" | `concept-check quiz` (1 question) | Q: "At what monthly volume does building a direct MCP server become more cost-effective than routing through Zapier?" This is a reasoning question, not a lookup. Choices frame different break-even scenarios. Feedback walks through the math: at $19.99/mo for 375 MCP calls, if your integration makes >375 calls/month regularly, a direct server eliminates the per-call cost. |

**Complexity:** Low-medium. Cost reasoning, not protocol depth.

---

#### Section 8: Specialized Tool MCP Adoption (~400 words)

| Placement | Component | Details |
|-----------|-----------|---------|
| After the specialized tools table | `comparison-table enhancer` | Filter dimensions: **Tool name**, **MCP Role** (server/client), **Status** (GA/unofficial), **Key Capabilities**. Sticky first column. |

**Complexity:** Low. Reference table; enhancer aids scanability.

---

#### Section 9: MCP vs. Native Integrations (~400 words)

| Placement | Component | Details |
|-----------|-----------|---------|
| After the MCP/Native/Automation comparison table | `comparison-table enhancer` | Filter dimensions: **Integration Type**, filter by **Strengths** or **Weaknesses** column text. |
| After the "typical advanced setup" paragraph | `self-explanation prompt` | Prompt: "You are advising a mid-size company that uses Slack, GitHub, Salesforce, and three internal tools. Which integration approach (MCP, native connectors, Zapier MCP) would you recommend for each, and why?" Expert answer walks through the decision: native for Slack (high-frequency, tight UX), MCP for GitHub (developer tools, official server exists), Zapier for Salesforce and internal tools (no official MCP server, Zapier has connectors). |

**Complexity:** Medium. Requires synthesizing the integration strategy framework.

---

#### Key Takeaways & Module End

| Placement | Component | Details |
|-----------|-----------|---------|
| Before Key Takeaways | `section-review quiz` (4 questions) | Q1: Protocol architecture (transport selection). Q2: Primitives (classify a scenario as Tool, Resource, or Prompt). Q3: Platform adoption (identify which platform treats MCP as foundational vs. adopted). Q4: Integration strategy (MCP vs. native vs. bridge for a given scenario). Moderate feedback with source references. |
| After Key Takeaways | `module-assessment quiz` (10 questions) | Covers all sections. Includes 2 cumulative questions: (1) "How does MCP relate to the function calling mechanism introduced in Module 03?" [SPIRAL: MCP as Universal Protocol]. (2) "A multi-agent system (Module 04) where each agent needs access to different external services -- how does MCP simplify the tool access architecture?" Mix of factual recall, application, and analysis. Full feedback with cross-module links and "review this section" pointers. |

---

### 6.5 Closing Synthesis

**Type:** Whole-task exercise (4C/ID)
**Estimated time:** 10-15 minutes

> **Design Challenge: MCP Integration Plan**
>
> You are the technical lead for a team building a customer support agent. The agent needs to:
> - Read customer tickets from Zendesk
> - Query an internal knowledge base (PostgreSQL)
> - Check order status from Shopify
> - Send follow-up emails via Gmail
>
> For each integration, decide: (a) direct MCP server, (b) existing official/community MCP server from the registry, (c) Zapier MCP bridge, or (d) native connector. Justify each choice based on: server availability, security requirements, expected call volume, and cost.
>
> Then sketch the MCP architecture: which transports (STDIO vs. Streamable HTTP), which authentication flows, and how many MCP connections the agent client will maintain.

**Scaffolding:** Hints available on request. Hint 1: Check the registry for official servers. Hint 2: Think about write operations and security implications. Hint 3: Consider call volume and Zapier's 2-task-per-call cost.

**Expert answer:** Provided after learner attempts. Walks through: PostgreSQL (direct MCP server, STDIO, local); Zendesk (community server if well-maintained, Streamable HTTP with OAuth); Shopify (Zapier bridge -- no official MCP server, moderate volume); Gmail (Zapier bridge or Google managed MCP if available). Architecture diagram shows client with four MCP connections.

---

### 6.6 Estimated Completion Time

| Segment | Time |
|---------|------|
| Opening hook + prior knowledge gate | 3 min |
| Sections 1-2 (What MCP is, Protocol Architecture) | 12 min |
| **Pause point 1** | -- |
| Sections 3-4 (Primitives, Platform Adoption) | 8 min |
| Section 5 (Registry) | 3 min |
| Section 6 (Building Servers -- with worked examples) | 8 min |
| **Pause point 2** | -- |
| Sections 7-9 (Zapier, Specialized Tools, MCP vs. Native) | 5 min |
| Section review + module assessment | 6 min |
| Closing synthesis | 10-15 min |
| **Total** | **55-60 min** (35-40 min reading + 15-20 min exercises) |

---

---

## Module 07: Skills, Plugins & Automation

**Position in course:** Part 3, Sequence 8 (after M06, before M09)
**Estimated study time:** 30-35 minutes (including exercises)
**Pause points:** After Skills Architecture Comparison table, after Scheduled Tasks section

---

### 7.1 Learning Outcomes

By the end of this module, the learner will be able to:

1. **Compare** the skills architectures across five platforms (Claude, OpenAI Custom GPTs, Codex, OpenClaw, Copilot Studio) on dimensions of authoring format, distribution, security, and extensibility (Bloom's: Analyze).
2. **Evaluate** the security tradeoffs of each skills platform and recommend a platform based on a given organization's risk tolerance (Bloom's: Evaluate).
3. **Distinguish** between time-based scheduled tasks and event-driven automation patterns, identifying which platforms support which pattern and the current limitations of each (Bloom's: Analyze).
4. **Select** the appropriate automation platform (Zapier, Make, Power Automate) for a given integration scenario based on breadth, cost, governance, and ecosystem fit (Bloom's: Evaluate).

---

### 7.2 Opening Hook

**Type:** Contrast scenario (Merrill's activation principle)

> Two developers extend their AI agents with a custom capability. Developer A writes a 30-line markdown file, commits it to Git, and her agent picks it up automatically. Developer B writes a JavaScript module, publishes it to a community registry, and discovers three months later that 15% of the skills in that registry contain malicious code. Both are using "skills." The architectures could not be more different. This module maps the spectrum -- from Claude's zero-infrastructure markdown to OpenClaw's powerful-but-dangerous code execution -- and the automation layer that makes agents work without human initiation.

This hook establishes the security-as-dividing-line theme and creates anticipation for the comparative analysis. It activates M03 knowledge (agents that consume skills) and M05 knowledge (ClawHub security) without requiring those modules as formal prerequisites.

---

### 7.3 Prior Knowledge Activation

**Component:** `concept-check gate`
**Placement:** After opening hook, before first section

Two warm-up questions:

1. "What does an agent's 'act' phase (from the gather-act-verify loop) require to execute actions in external systems?" (Tests: M03, "Tool Use: Function Calling and MCP" -- agents need tools/integrations to act)
2. "How does an MCP server expose its capabilities to an AI client?" (Tests: M06, "Core Primitives" and "Capability Discovery" -- tools/list, auto-discovery)

Each links to the relevant M03/M06 section. `[SPIRAL: Gather-Act-Verify]` callback: "Skills extend the 'act' phase of the agent loop from Module 03 -- they define new actions the agent can take."

---

### 7.4 Section-by-Section Annotations

#### Skills Architecture Across Platforms (~2,200 words)

This is the largest section, covering five platform approaches. To prevent wall-of-text fatigue, break annotations target the boundaries between platform descriptions.

| Placement | Component | Details |
|-----------|-----------|---------|
| After Claude Skills subsection | `concept-check quiz` (1 question) | Q: "Why can't a Claude Skill execute code directly?" Choices: (a) Security design -- skills are purely instructional, (b) Anthropic hasn't implemented it yet, (c) Claude Code doesn't support it, (d) Skills only work offline. Correct: (a). Feedback: "Claude Skills are markdown files that shape agent behavior through natural language instructions. All code execution flows through the agent's native capabilities or MCP tools. This is a deliberate design choice prioritizing auditability and safety." |
| After Custom GPTs subsection | `progressive-disclosure accordion` (variant: `supplementary-reference`) | Title: "GPT Store Discovery and Revenue Sharing Details." Contains: the 3M created vs. ~159K active distinction, revenue sharing mechanics, enterprise private store configuration. Collapsed -- supplementary to the core security and architecture comparison. |
| After OpenClaw Skills subsection | `concept-check quiz` (1 question) | Q: "What makes ClawHub's security posture fundamentally different from the Claude Plugins marketplace?" Choices frame the core distinction: unrestricted code execution + no gatekeeping vs. approval process + no code execution. Feedback references M05's security analysis and the 12-20% malicious skill rate. |
| After all five platform descriptions | `self-explanation prompt` | Prompt: "Before looking at the comparison table, rank the five skills platforms from most secure to least secure and explain your reasoning." Expert answer: Copilot Studio (enterprise RBAC + DLP) > Claude Skills (no code execution, sandboxed) > Custom GPTs (API-only, no local access) > Codex Skills (cloud sandbox with script execution) > OpenClaw Skills (unrestricted execution, no code signing). Reasoning explains each ranking position. |
| `[SPIRAL: Security/Safety]` callback at OpenClaw Skills | Inline text | "The safety models in Module 03 assume a platform vendor as gatekeeper. OpenClaw has no such gatekeeper -- which is why ClawHub's security landscape is so challenging (see Module 05 for the full analysis)." |

**Complexity:** Medium-high. Five platforms with distinct architectures.

---

#### Skills Architecture Comparison Table (~table)

| Placement | Component | Details |
|-----------|-----------|---------|
| The comparison table | `comparison-table enhancer` | Filter dimensions: **Platform** (all five), **Dimension** (text filter across Format, Language, Code execution, Discovery, Distribution, Security model, Marketplace size, Best for). This is the module's primary decision-support table. Sticky first column ("Dimension"). Sorting enabled on all columns. |
| After table | `concept-check quiz` (1 question) | Q: "An enterprise with strict compliance requirements needs to extend their AI agents. Which platform's skills system provides the strongest governance controls?" Correct: Copilot Studio (Enterprise RBAC + DLP). Feedback: "Copilot Studio integrates with Azure AD, DLP policies, and Agent 365 monitoring. For regulated industries, governance capabilities are as important as technical flexibility." |

**Complexity:** Low (table interpretation).

**Pause point:** "You have now compared all five skills architectures (~15 minutes in). The next sections cover plugin ecosystems, scheduled automation, and automation platforms."

---

#### Plugin Systems and Marketplaces (~600 words)

| Placement | Component | Details |
|-----------|-----------|---------|
| After all four marketplace descriptions | `progressive-disclosure accordion` (variant: `supplementary-reference`) | Title: "Marketplace Size Context and Growth Rates." Contains marketplace-specific statistics and growth trajectories beyond the in-text figures. Collapsed because the core comparison is architectural, not statistical. |
| `[SPIRAL: MCP as Universal Protocol]` callback at Claude Plugins description | Inline text | "Claude Skills can compose with MCP servers (Module 06) for external tool access -- the skill defines the intent; the MCP server provides the capability." |

**Complexity:** Low-medium.

---

#### Scheduled Tasks and Event-Driven Automation (~1,000 words)

| Placement | Component | Details |
|-----------|-----------|---------|
| After all four platform scheduled task descriptions | `comparison-table enhancer` | *Annotation note:* The module text does not present this as a table, but the annotation file should inject a synthesized comparison table here. Columns: **Platform**, **Mechanism**, **Trigger types** (time-based / event / both), **Limits**, **Key gap**. Filter dimensions: Platform, Trigger type. |
| After "Event-Driven Patterns" subsection | `concept-check quiz` (2 questions) | Q1: "Which platform's coding agent can trigger skills in response to repository events like pull request creation?" Correct: Codex. Q2: "What is the current gap across all platforms for event-driven AI automation?" Correct: No unified event-to-agent routing layer. Feedback explains the fragmentation. |
| After the volatility warning | `progressive-disclosure accordion` (variant: `advanced-detail`) | Title: "MCP-Mediated Event Pattern: Emerging Design." Contains a deeper explanation of the emerging pattern where MCP servers expose event subscription capabilities. Collapsed because this pattern is not yet standardized -- advanced/speculative content. |

**Complexity:** Medium. The scheduled-vs-event distinction is a key analytical distinction.

**Pause point:** "You now understand skills and scheduling (~25 minutes in). The final section compares the three automation platforms."

---

#### Automation Platforms: Zapier, Make, Power Automate (~1,100 words)

| Placement | Component | Details |
|-----------|-----------|---------|
| After all three platform descriptions | `comparison-table enhancer` on the Automation Platform Comparison table | Filter dimensions: **Platform** (Zapier/Make/Power Automate), **Dimension** (text filter). Key filter scenario: typing "MCP" shows MCP support row; typing "governance" highlights the governance row. Sticky first column. |
| After the comparison table | `self-explanation prompt` | Prompt: "A startup with 20 employees uses Slack, GitHub, Google Workspace, HubSpot, and Stripe. They need to automate daily reporting and event-driven notifications. Budget is constrained. Which automation platform would you recommend and why?" Expert answer recommends Make (cost advantage at high volume, bidirectional MCP), with Zapier as fallback if HubSpot/Stripe require connectors Make lacks. Reasoning walks through the decision framework: integration breadth needed, volume, budget, governance requirements. |

**Complexity:** Medium. Decision-making exercise requiring cost/feature tradeoff analysis.

---

#### Key Takeaways & Module End

| Placement | Component | Details |
|-----------|-----------|---------|
| Before Key Takeaways | `section-review quiz` (4 questions) | Q1: Skills security ranking (application question). Q2: Scheduled task platform capabilities (factual recall). Q3: Event-driven pattern identification (analysis). Q4: Automation platform cost comparison (application). Moderate feedback. |
| After Key Takeaways | `module-assessment quiz` (8 questions) | Covers all sections. Includes 2 cumulative questions: (1) "How does MCP (Module 06) relate to Claude Skills?" [SPIRAL: MCP]. (2) "Compare the security model of OpenClaw Skills (Module 05) with the enterprise governance of Copilot Studio -- what does each prioritize?" [SPIRAL: Security/Safety]. Full feedback with cross-module links. |

---

### 7.5 Closing Synthesis

**Type:** Whole-task exercise (4C/ID)
**Estimated time:** 8-12 minutes

> **Scenario: Automation Stack Design**
>
> A marketing team at a 200-person SaaS company wants to automate these workflows:
> 1. **Daily:** AI summarizes key metrics from Google Analytics and posts to Slack.
> 2. **On PR merge:** AI reviews the changelog and drafts release notes for the marketing blog.
> 3. **Weekly:** AI scans customer support tickets (Zendesk) and flags emerging product issues.
> 4. **On demand:** A Claude-based writing assistant that follows the company's brand voice guide.
>
> For each workflow, specify: (a) which skills/plugin system, (b) which automation platform (if needed), (c) scheduled vs. event-driven trigger, and (d) approximate monthly cost.

**Scaffolding:** Hints available. Hint 1: Match trigger type to available platform capabilities. Hint 2: The brand voice guide is a classic Claude Skill use case. Hint 3: PR merge is a repository event -- which platform handles those?

**Expert answer:** (1) Zapier or Make with scheduled trigger -- daily GA query to Slack. (2) Codex Skill with PR-merge event trigger -- native event-driven. (3) Claude Cowork scheduled task or Zapier scheduled trigger -- weekly Zendesk scan. (4) Claude Skill (markdown SKILL.md with brand voice instructions) -- on-demand, no automation platform needed. Cost estimates provided for each option.

---

### 7.6 Estimated Completion Time

| Segment | Time |
|---------|------|
| Opening hook + prior knowledge gate | 2 min |
| Skills Architecture Across Platforms (with quizzes) | 12 min |
| Skills Comparison Table | 3 min |
| **Pause point 1** | -- |
| Plugin Systems and Marketplaces | 3 min |
| Scheduled Tasks and Event-Driven Automation | 6 min |
| **Pause point 2** | -- |
| Automation Platforms (with self-explanation) | 5 min |
| Section review + module assessment | 5 min |
| Closing synthesis | 8-12 min |
| **Total** | **44-48 min** (30-35 min reading + 10-13 min exercises) |

---

---

## Module 08: Consumer AI Comparison

**Position in course:** Part 4, Sequence 10 (penultimate module)
**Estimated study time:** 30-35 minutes (including exercises)
**Pause points:** After Pricing Analysis, after User Sentiment section

**Special design note:** M08 is the most table-dense module in the curriculum (~102 table rows). The `comparison-table enhancer` is the dominant component. Every major comparison table receives an enhancer with filter dimensions specifically chosen to support the decision framework in the closing section.

---

### 8.1 Learning Outcomes

By the end of this module, the learner will be able to:

1. **Compare** the four major consumer AI platforms across capabilities, pricing, multimodal coverage, memory systems, and collaboration features using structured criteria (Bloom's: Analyze).
2. **Evaluate** each platform's strategic moat and blind spot and predict how competitive dynamics might shift after upcoming events (Bloom's: Evaluate).
3. **Apply** the decision framework to match a platform (or platform combination) to a specific user profile and use-case set (Bloom's: Apply).
4. **Synthesize** knowledge from M00-M07 and M09 to assess whether comparison table entries are consistent with the deeper analysis in those modules (Bloom's: Evaluate -- cumulative retrieval).

---

### 8.2 Opening Hook

**Type:** Cumulative retrieval hook (Merrill's activation + spaced retrieval)

> Throughout the curriculum, we have compared the big four across models (M01), context (M02), agents (M03), orchestration (M04), and integration (M06). You already know that Claude leads on SWE-bench, Gemini is cheapest per token, ChatGPT has the broadest multimodal coverage, and Copilot locks into M365. This module synthesizes all of it into a consumer-facing comparison -- but the question is no longer "which is best?" It is: "best for whom, at what, and at what cost?"

This hook serves double duty: it activates prior knowledge from five earlier modules (spaced retrieval) and reframes the comparison from "ranking" to "decision framework" -- preventing the learner from passively scanning tables for a winner.

---

### 8.3 Prior Knowledge Activation

**Component:** `concept-check gate`
**Placement:** After opening hook, before Core Capability Matrix

Three warm-up questions spanning Part 1-3 knowledge:

1. "Which model family currently leads on SWE-bench Verified for coding tasks?" (Tests: M01 benchmark data -- Claude Opus 4.6 at 80.8%)
2. "What are the three prompt caching discount levels across Anthropic, Google, and OpenAI?" (Tests: M02/M09 caching economics -- 90%/90%+storage/50%)
3. "Name one advantage and one limitation of MCP compared to native platform connectors." (Tests: M06, Section 9 -- MCP vs. Native Integrations)

Each links to the originating module section. `[SPIRAL: Platform Comparison]` callback: "Throughout the curriculum, we have compared the big four across models (M01), context (M02), agents (M03), orchestration (M04), and integration (M06). This module synthesizes all of it into a consumer-facing comparison."

---

### 8.4 Section-by-Section Annotations

#### Core Capability Matrix (~500 words + table)

| Placement | Component | Details |
|-----------|-----------|---------|
| The Core Capability Matrix table (12 rows x 5 columns) | `comparison-table enhancer` | Filter dimensions: **Capability** (text filter), **Platform** (column visibility toggle -- learner can hide columns for platforms they are not interested in). Sticky first column ("Capability"). This is the module's anchor table. |
| After "Reading the matrix" analysis | `concept-check quiz` (1 question) | Q: "Which two platforms offer the broadest multimodal coverage (image gen, voice, video understanding)?" Correct: ChatGPT and Gemini. Feedback: "Claude and Copilot each have significant multimodal gaps. Claude lacks image generation and voice. Copilot lacks video understanding and has limited voice." |
| After matrix | `glossary tooltip` | First-use terms in this module: **GA**, **Beta**, **Preview** (as status indicators, referencing GLOSSARY.md definitions) |

**Complexity:** Low. Table reading and pattern identification.

---

#### Chat and Reasoning Quality (~600 words + 2 tables)

| Placement | Component | Details |
|-----------|-----------|---------|
| Benchmark table (5 rows) | `comparison-table enhancer` | Filter dimensions: **Benchmark** (text filter), sort by **Score** columns. |
| Reasoning Modes Compared table | `comparison-table enhancer` | Filter dimensions: **Feature** (text filter), **Platform** column visibility toggle. |
| After the reasoning modes table | `self-explanation prompt` | Prompt: "Why might benchmark scores not accurately predict your day-to-day experience with these platforms? Consider what benchmarks measure vs. what users value." Expert answer discusses the gap between controlled evaluation (benchmarks) and subjective quality (prose naturalness, instruction following, personality), referencing the user sentiment data later in the module. |

**Complexity:** Medium. Requires critical thinking about benchmark limitations.

---

#### Coding Agent Capabilities (~400 words + table)

| Placement | Component | Details |
|-----------|-----------|---------|
| Coding agent comparison table | `comparison-table enhancer` | Filter dimensions: **Feature** (text filter), **Platform** column visibility toggle. Key sortable column: **SWE-bench score**. |
| After table | `concept-check quiz` (1 question) | Q: "What architectural advantage does Claude Code have over Codex for understanding a large existing codebase?" Correct: Full repo context (1M tokens) vs. task-scoped context. Feedback references M03's agent architecture analysis. |

**Complexity:** Low-medium. Connects to M03 agent architecture knowledge.

---

#### Multimodal Capabilities (~600 words + 2 tables)

| Placement | Component | Details |
|-----------|-----------|---------|
| Image Generation table | `comparison-table enhancer` | Filter dimensions: **Feature**, **Platform** column toggle. |
| Voice and Audio table | `comparison-table enhancer` | Filter dimensions: **Feature**, **Platform** column toggle. |
| After both tables | `concept-check quiz` (1 question) | Q: "A content creator needs to generate images, have voice conversations, and write long-form articles in a single workflow. Which platform(s) cover all three?" Correct: Only ChatGPT covers all three natively. Feedback: "No single platform excels at all three. ChatGPT is the only one with image generation + voice + strong text in one product, though Claude produces better text and Gemini has better voice integration on mobile." |

**Complexity:** Low. Applied decision-making using the tables.

---

#### Memory and Personalization (~400 words + table)

| Placement | Component | Details |
|-----------|-----------|---------|
| Memory comparison table | `comparison-table enhancer` | Filter dimensions: **Feature**, **Platform** column toggle. Key distinction highlighted: data scope and privacy model columns. |
| `[SPIRAL: Context Management]` callback | Inline text | "The memory architectures here implement the context persistence strategies introduced in Module 02. Claude Memory's ~24h processing cycle, ChatGPT's per-conversation extraction, and Gemini's account-wide intelligence are three different answers to the same problem: how to make context survive across sessions." |

**Complexity:** Low. Connects to M02 context engineering.

---

#### Pricing Analysis (~800 words + 3 tables)

| Placement | Component | Details |
|-----------|-----------|---------|
| Consumer Tiers table | `comparison-table enhancer` | Filter dimensions: **Tier** (Free/Standard/Power/Heavy), **Platform** column toggle. This is the table most learners will reference for purchasing decisions. |
| Business and Enterprise Tiers table | `comparison-table enhancer` | Filter dimensions: **Tier**, sort by **minimum seats** or price. |
| API Pricing table | `comparison-table enhancer` | Filter dimensions: **Model tier** (Budget/Mid-range/Flagship), sort by input or output price. Cross-reference note: "See Module 09 for complete API pricing analysis including caching and batch discounts." |
| After all pricing tables | `self-explanation prompt` | Prompt: "You are advising a team of 10 that currently pays for ChatGPT Plus ($20/user/month). They primarily use AI for coding and document drafting. Based on the pricing and capability data in this module, would you recommend switching platforms? To which, and why?" Expert answer analyzes: Claude Pro ($20/mo) for coding superiority + Gemini Advanced ($19.99/mo) for free-tier users who only need search -- possibly a multi-platform strategy. Walks through the cost-capability tradeoff. |

**Complexity:** Medium. Pricing analysis requires connecting capability to value.

**Pause point:** "You have now compared capabilities and pricing (~20 minutes in). The remaining sections cover market dynamics and the decision framework."

---

#### User Sentiment and Market Dynamics (~600 words + table)

| Placement | Component | Details |
|-----------|-----------|---------|
| Market Share Trajectory table | `comparison-table enhancer` | Filter dimensions: **Period**, **Platform** columns sortable. |
| After #Keep4o discussion | `progressive-disclosure accordion` (variant: `supplementary-reference`) | Title: "ChatGPT Model Churn: The #Keep4o Movement in Detail." Contains extended discussion of user frustration with rapid model transitions. Collapsed because it is contextual narrative, not core comparison data. |
| After all sentiment sections | `concept-check quiz` (2 questions) | Q1: "ChatGPT's market share dropped from 87% to 68% in one year. Which platform captured most of that shift?" Correct: Gemini. Q2: "Why does Copilot have only a 3.3% conversion rate among M365's 400M users?" Correct: Value proposition requires organizational context; not compelling as a standalone consumer product. |

**Complexity:** Low. Factual recall + reasoning.

**Pause point:** After user sentiment.

---

#### Strategic Differentiators + Decision Framework (~800 words)

| Placement | Component | Details |
|-----------|-----------|---------|
| Decision Framework table ("If you need... Best choice... Why") | `comparison-table enhancer` | Filter dimensions: **Need** (text filter -- learner types their use case). This is the module's most actionable table. Sticky first column. |
| After the decision framework table | `self-explanation prompt` | Prompt: "Based on everything you have learned in this curriculum, describe your own AI platform strategy: which platform(s) would you use for what, and why? Consider your specific use cases, budget, and priorities." Expert answer is explicitly labeled as "one possible answer" and describes a multi-platform strategy (Claude for coding/writing, Gemini for research/free tier, ChatGPT for multimodal needs), reinforcing that no single platform wins all categories. |

**Complexity:** High. Requires synthesizing the entire module (and curriculum) into a personal strategy.

---

#### Key Takeaways & Module End

| Placement | Component | Details |
|-----------|-----------|---------|
| Before Key Takeaways | `section-review quiz` (5 questions) | Q1: Capability gap identification. Q2: Pricing tier comparison. Q3: Market share dynamics. Q4: Strategic moat identification. Q5: Cumulative question testing M01 model knowledge applied to M08 comparison. Moderate feedback. |
| After Key Takeaways | `module-assessment quiz` (10 questions) | Covers all sections. Includes 3 cumulative questions: (1) "How does Anthropic's caching discount (Module 09) affect Claude's cost competitiveness in the API pricing comparison?" [SPIRAL: Model Selection/Cost]. (2) "Which memory system (Module 02) provides the broadest data scope?" [SPIRAL: Context Management]. (3) "How does MCP adoption depth (Module 06) factor into the platform comparison?" [SPIRAL: MCP]. Full feedback with cross-module links. |

---

### 8.5 Closing Synthesis

**Type:** Decision scenario exercise (4C/ID whole-task)
**Estimated time:** 10-12 minutes

> **Scenario: Platform Strategy for a Small Consulting Firm**
>
> A 15-person technology consulting firm needs to select AI platforms for three use cases:
> 1. **Client deliverables:** Long-form technical reports with high writing quality.
> 2. **Internal productivity:** Document collaboration, meeting summaries, email drafting (they use Google Workspace).
> 3. **Developer tooling:** Code review, architecture design, and automated testing for their software practice.
>
> Constraints: Total AI budget is $5,000/month. They want no more than two platform subscriptions to manage. They need enterprise-grade data handling (no training on their data).
>
> Recommend a platform strategy. Specify: which platforms, which tiers, how many seats at each tier, total monthly cost, and what capabilities they sacrifice with this configuration.

**Scaffolding:** Hint 1: Check the business/enterprise tier pricing table. Hint 2: Google Workspace users get natural Gemini integration. Hint 3: "No more than two platforms" means something must be sacrificed.

**Expert answer:** Analyzes the tradeoff space. One strong configuration: Claude Team ($25/seat x 15 = $375/mo) for reports and developer tooling + Gemini Business ($18/seat x 15 = $270/mo) for Workspace integration. Total: $645/mo, well under budget. Sacrifices: no native image generation (use Gemini's free image gen or supplement with Midjourney), no ChatGPT's voice mode. Alternative configuration explored with ChatGPT Business instead of Claude, showing the tradeoff in coding quality.

---

### 8.6 Estimated Completion Time

| Segment | Time |
|---------|------|
| Opening hook + prior knowledge gate | 3 min |
| Core Capability Matrix through Multimodal | 10 min |
| Memory + Pricing Analysis | 8 min |
| **Pause point 1** | -- |
| User Sentiment + Strategic Differentiators | 7 min |
| **Pause point 2** | -- |
| Decision Framework + self-explanation | 5 min |
| Section review + module assessment | 7 min |
| Closing synthesis | 10-12 min |
| **Total** | **50-52 min** (30-35 min reading + 17-20 min exercises) |

---

---

## Module 09: Developer Platforms & APIs

**Position in course:** Part 3, Sequence 9 (after M07, before M08)
**Estimated study time:** 30-35 minutes (including exercises)
**Pause points:** After SDK Ecosystem, after Structured Outputs and Function Calling

---

### 9.1 Learning Outcomes

By the end of this module, the learner will be able to:

1. **Contrast** the four API architectures (Anthropic Messages, OpenAI Responses, Google Gemini, Azure OpenAI) on their execution model, streaming approach, and developer control paradigm (Bloom's: Analyze).
2. **Calculate** the cost impact of prompt caching, batch processing, and model tiering for representative production workloads across all three direct providers (Bloom's: Apply).
3. **Evaluate** the structured output and function calling implementations across platforms and select the approach that best fits a given application's type-safety and orchestration requirements (Bloom's: Evaluate).
4. **Apply** the platform selection framework to recommend a provider (or multi-provider strategy) for a specific development scenario (Bloom's: Apply).

---

### 9.2 Opening Hook

**Type:** Architectural contrast (Merrill's demonstration principle)

> Consider a simple task: you want your AI to search the web, analyze the results, and call an external API with structured output. On Anthropic's Messages API, you build the loop yourself -- send a request, receive a `tool_use` block, execute the tool, send back the result, repeat. On OpenAI's Responses API, the API itself executes built-in tools and returns the final answer with no developer loop needed. Same task, same quality of result, fundamentally different developer experience. This module explains why those architectures differ, what it costs at scale, and how to choose.

This hook grounds the API comparison in a concrete development scenario, immediately demonstrating that API choice is an architectural decision with real consequences -- not just a brand preference.

---

### 9.3 Prior Knowledge Activation

**Component:** `concept-check gate`
**Placement:** After opening hook, before API Architectures section

Three warm-up questions:

1. "What is function calling in the context of AI agents, and how does it differ from MCP?" (Tests: M03, "Tool Use: Function Calling and MCP" -- function calling is inline and model-mediated; MCP is a standardized external protocol)
2. "What are the three model tiers (budget/mid/flagship) and roughly how much does each cost per million input tokens on Anthropic's platform?" (Tests: M01 model pricing tables)
3. "In Module 06, you learned that MCP uses JSON-RPC 2.0 as its wire protocol. Why does that matter for API integration?" (Tests: M06, "Protocol Architecture" -- multiplexing, structured request/response, compatibility with existing tooling)

---

### 9.4 Section-by-Section Annotations

#### API Architectures (~2,000 words, 4 subsections)

| Placement | Component | Details |
|-----------|-----------|---------|
| After Anthropic Messages API description (content blocks explanation) | `worked-example fader` -- stage `full` | **Full worked example:** Trace a multi-turn tool-use conversation on the Messages API. Turn 1: User asks a question. Turn 2: Claude returns a `tool_use` block. Turn 3: Developer executes tool, sends `tool_result`. Turn 4: Claude returns final `text` block. Each turn annotated with the JSON structure showing `content` array with typed blocks. Emphasize: the developer controls the loop. |
| After OpenAI Responses API description (built-in agentic loop) | `worked-example fader` -- stage `partial` | **Completion problem:** Same task as the Anthropic example, but on the Responses API. The request includes a `tools` array with `web_search` and a custom function. The learner fills in: (a) which tools are executed by the API vs. the developer, and (b) how many API calls the developer makes. Reveal: built-in tools auto-execute (1 API call for web search + model response); custom function still requires developer execution (additional call). |
| After Google Gemini API description | `progressive-disclosure accordion` (variant: `advanced-detail`) | Title: "Gemini Context Caching: Storage Cost Economics." Contains the detailed per-hour storage cost analysis ($1.00-$4.50/MTok/hr) and break-even calculations for different access frequencies. Collapsed because caching economics are important but complex -- they benefit from dedicated attention after the core API architecture is understood. |
| After Azure OpenAI description | `concept-check quiz` (2 questions) | Q1: "Which API provides a built-in agentic loop for its native tools, reducing the developer's orchestration burden?" Correct: OpenAI Responses API. Q2: "Why does Azure OpenAI cost an estimated 15-40% more than direct OpenAI API access despite identical token pricing?" Correct: Azure support plans, VNet, data transfer, storage, and resource management overhead. |
| After all four API descriptions | `self-explanation prompt` | Prompt: "Compare the Anthropic and OpenAI approaches to tool execution. Why might a developer prefer the explicit loop (Anthropic) over the automatic loop (OpenAI), even though it requires more code?" Expert answer: Explicit loop gives developers complete control over error handling, intermediate state, retry logic, and tool execution environment. This matters for production systems where failure handling and observability are critical. Automatic loop is simpler but opaque. |
| `[SPIRAL: MCP as Universal Protocol]` callback at OpenAI MCP support mention | Inline text | "Each API handles MCP differently. Anthropic built it. OpenAI added Beta support. Google maps it to extensions. The protocol details are in Module 06." |

**Complexity:** High. Four distinct architectures with significant implementation differences.

**Pause point:** "You now understand the four API architectures (~15 minutes in). The next sections cover SDKs and the economics of building at scale."

---

#### SDK Ecosystem (~500 words + table)

| Placement | Component | Details |
|-----------|-----------|---------|
| SDK comparison table | `comparison-table enhancer` | Filter dimensions: **Language** (text filter -- type "Python" to see all Python SDKs), **Provider** column toggle, **Status** (GA/Community/Not offered). |
| After table | `concept-check quiz` (1 question) | Q: "Your team builds primarily in Go and needs official SDK support. Which providers offer official Go SDKs?" Correct: OpenAI and Google. Feedback: "Anthropic's SDK strategy is deliberately narrow (Python, TypeScript only). Go, Java, and .NET teams must use community packages or raw HTTP for Anthropic integration." |

**Complexity:** Low. Table lookup and interpretation.

---

#### Pricing Economics (~1,200 words + 4 tables)

| Placement | Component | Details |
|-----------|-----------|---------|
| Prompt caching comparison table | `comparison-table enhancer` | Filter dimensions: **Provider**, sort by **Cache Hit Discount** or **Storage Cost**. This is the module's most decision-critical pricing table. |
| Batch processing table | `comparison-table enhancer` | Filter dimensions: **Provider**, sort by discount or latency. |
| Provider Cost Comparison (workloads) table | `comparison-table enhancer` | Filter dimensions: **Workload** (text filter), sort by cost per provider. |
| After caching table | `worked-example fader` -- stage `full` | **Full worked example:** "Your application sends 10,000 API calls per day, each with a 4,000-token system prompt and 2,000 tokens of variable user input. Calculate the monthly cost with and without prompt caching on each provider." Solution shows: (a) Anthropic: cache the system prompt at 90% discount, no storage cost -- monthly savings calculated. (b) Google: 90% discount but $X/hr storage -- break-even at Y calls/hour. (c) OpenAI: automatic 50% discount, no effort -- savings calculated. Final comparison shows Anthropic cheapest for this high-frequency, stable-prompt pattern. |
| After the worked example | `worked-example fader` -- stage `guided` | **Guided problem:** "Your RAG application retrieves 20 document chunks (500 tokens each) per query. You process 50,000 queries per month. Currently using Opus 4.6. Calculate the monthly cost, then optimize: which model tier, caching strategy, and batch eligibility could reduce cost while maintaining quality for this classification-like workload?" Hints available: Hint 1 -- model selection is the biggest lever. Hint 2 -- are all 20 chunks necessary? Hint 3 -- is this latency-sensitive? |
| `[SPIRAL: Model Selection/Cost]` callback at cost comparison opening | Inline text | "Module 01 introduced model pricing. Module 02 showed how caching reshapes it. Here we see the full implementation: cache tiers, batch APIs, and the economics at scale." |

**Complexity:** High. Quantitative analysis with multiple variables.

**Pause point:** "You now understand API pricing and optimization (~25 minutes in). The remaining sections cover structured outputs, fine-tuning, and platform selection."

---

#### Structured Outputs and Function Calling (~700 words + 2 tables)

| Placement | Component | Details |
|-----------|-----------|---------|
| Structured Outputs table | `comparison-table enhancer` | Filter dimensions: **Feature**, **Provider** column toggle. |
| Function Calling section | `worked-example fader` -- stage `partial` | **Completion problem:** "You need an API call that invokes two functions in parallel: `get_weather(city)` and `get_calendar(date)`. On the OpenAI Responses API, both can be invoked in a single response. Write the `tools` array definition for these two functions using JSON Schema." Learner fills in the schema; reveal shows the complete tools array with proper `type`, `description`, `parameters`, and `required` fields. |
| After function calling section | `concept-check quiz` (1 question) | Q: "Anthropic achieves structured output through tool use -- you define a 'tool' whose input schema is your desired output format. What is the advantage of this approach?" Choices: reusability across calls, schema enforcement, backward compatibility with tool-use code. Correct: all of these (it unifies the mechanism for tool calling and structured output). |

**Complexity:** Medium-high. Requires understanding both schema design and API-specific idioms.

---

#### Fine-Tuning and Customization (~600 words + table)

| Placement | Component | Details |
|-----------|-----------|---------|
| Fine-tuning/customization comparison table | `comparison-table enhancer` | Filter dimensions: **Capability** (text filter), **Provider** column toggle. |
| After fine-tuning section | `progressive-disclosure accordion` (variant: `supplementary-reference`) | Title: "When Fine-Tuning Is (and Isn't) Necessary." Contains decision criteria: fine-tune when you need domain-specific terminology, specialized output formats, or behavioral alignment that prompt engineering cannot achieve. Most use cases are better served by RAG + prompt engineering. Collapsed because it is strategic guidance, not API documentation. |

**Complexity:** Low-medium.

---

#### Additional API Capabilities (~500 words + 3 tables)

| Placement | Component | Details |
|-----------|-----------|---------|
| Speech/Audio table | `comparison-table enhancer` | Filter dimensions: **Capability**, **Provider** column toggle. |
| Image/Video Generation table | `comparison-table enhancer` | Filter: **Capability**, **Provider** column toggle. |
| Content Safety table | `comparison-table enhancer` | Filter: **Feature**, **Provider** column toggle. |

**Complexity:** Low. Reference tables for capability mapping.

---

#### Platform Selection Framework + Key Takeaways

| Placement | Component | Details |
|-----------|-----------|---------|
| Platform Selection Framework (4 "Choose X when" blocks) | Render as a structured decision guide, not an accordion | Each block remains fully visible (critical-path content). Add subtle visual differentiation (border color by provider, with text label -- never color alone). |
| Before Key Takeaways | `section-review quiz` (4 questions) | Q1: API architecture (identify which API has built-in agentic loop). Q2: Caching economics (calculate savings for a given pattern). Q3: Structured outputs (identify the platform with Pydantic/Zod integration). Q4: Platform selection (apply framework to a scenario). Moderate feedback. |
| After Key Takeaways | `module-assessment quiz` (10 questions) | Covers all sections. Includes 2 cumulative questions: (1) "How does the explicit tool-use cycle in Anthropic's API relate to the gather-act-verify loop from Module 03?" [SPIRAL: Gather-Act-Verify]. (2) "A multi-agent system (Module 04) assigns different models to different agent roles. Using this module's pricing data, estimate the monthly API cost for a 5-agent system that processes 100,000 messages/month." [SPIRAL: Model Selection/Cost]. Full feedback. |

---

### 9.5 Closing Synthesis

**Type:** Production cost optimization exercise (4C/ID whole-task)
**Estimated time:** 10-12 minutes

> **Scenario: API Cost Optimization Audit**
>
> You are reviewing the AI costs for a SaaS product that uses the Anthropic Messages API. Current monthly bill: $12,000. Their architecture:
> - 500,000 API calls/month
> - Every call uses Opus 4.6
> - 8,000-token system prompt (same across all calls)
> - 2,000-token average user input
> - 1,500-token average output
> - No caching enabled
> - All calls are synchronous (real-time)
> - 60% of calls are simple classification tasks; 30% are summarization; 10% are complex reasoning
>
> Optimize this architecture. Specify: (a) model selection changes, (b) caching strategy, (c) batch eligibility, (d) projected monthly cost after optimization.

**Scaffolding:** Hint 1: Does classification require Opus 4.6? Hint 2: The system prompt is stable across all calls -- what optimization lever does that suggest? Hint 3: Are all calls latency-sensitive?

**Expert answer:** Step-by-step optimization. (1) Model selection: Route 60% to Haiku 4.5 (classification), 30% to Sonnet 4.6 (summarization), 10% remains on Opus 4.6 (complex reasoning). (2) Enable prompt caching on the 8K system prompt: 90% discount on cache hits. (3) Batch the classification calls (not latency-sensitive): 50% additional discount. (4) Final calculation shows ~$1,800/month (85% reduction from $12,000). Each step shows the math.

---

### 9.6 Estimated Completion Time

| Segment | Time |
|---------|------|
| Opening hook + prior knowledge gate | 3 min |
| API Architectures (with worked examples) | 12 min |
| **Pause point 1** | -- |
| SDK Ecosystem | 3 min |
| Pricing Economics (with worked examples) | 10 min |
| **Pause point 2** | -- |
| Structured Outputs + Function Calling | 5 min |
| Fine-Tuning + Additional Capabilities | 4 min |
| Platform Selection + section review + module assessment | 7 min |
| Closing synthesis | 10-12 min |
| **Total** | **54-56 min** (30-35 min reading + 20-22 min exercises) |

---

---

## Module 10: Frontier Topics (Capstone)

**Position in course:** Part 4, Sequence 11 (final module)
**Estimated study time:** 30-35 minutes (including exercises)
**Pause points:** After Multimodal Generation, after Open vs. Closed Ecosystems

**Special design note:** M10 is the capstone module. Its closing synthesis is the curriculum's integrative exercise, requiring the learner to draw on all prior modules. Every section explicitly connects back to earlier modules via spiral callbacks. The assessment quiz is cumulative across the entire curriculum.

---

### 10.1 Learning Outcomes

By the end of this module, the learner will be able to:

1. **Evaluate** the on-device vs. cloud inference split as a context engineering problem and predict which use cases will migrate to edge devices (Bloom's: Evaluate).
2. **Assess** the competitive landscape for multimodal generation (video, image, audio) and identify which platform holds the current advantage in each modality (Bloom's: Analyze).
3. **Analyze** enterprise governance requirements for agentic systems under the EU AI Act and compare Microsoft's Agent 365 with other providers' governance capabilities (Bloom's: Analyze).
4. **Synthesize** the open-vs-closed ecosystem dynamics across the entire curriculum -- performance, cost, security, governance, and geopolitics -- into a coherent strategic assessment (Bloom's: Synthesize).
5. **Integrate** knowledge from all prior modules to evaluate upcoming industry events (Google I/O, Build, WWDC) and predict which curriculum sections will need revision (Bloom's: Evaluate -- capstone integration).

---

### 10.2 Opening Hook

**Type:** Forward-looking challenge (Merrill's problem-centered + knowledge gap)

> Every module in this curriculum has described the state of the field as of March 2026. But by the time you finish reading this sentence, something has changed. Google I/O is 60 days away. WWDC is 80 days away. The EU AI Act becomes enforceable in five months. Goldman Sachs says $527 billion in AI capital expenditure is committed for this year. This module does not tell you what will happen -- it gives you the analytical framework to evaluate what does happen, using every concept you have learned in Modules 00 through 09.

This hook establishes M10's role as both a content module and a capstone that tests the learner's ability to apply the full curriculum. The knowledge gap is forward-looking: the learner has the tools to evaluate the future but has not yet synthesized them.

---

### 10.3 Prior Knowledge Activation

**Component:** `concept-check gate`
**Placement:** After opening hook, before first section
**Note:** As the capstone, this gate is broader than previous modules -- it spans the full curriculum.

Three warm-up questions:

1. "What is the tiered inference architecture, and how do context windows (Module 02) relate to on-device model constraints?" (Tests: M01 model data + M02 context engineering concepts -- on-device models have constrained parameters, not just constrained context windows)
2. "What governance capabilities does Microsoft's Agent 365 provide that no other platform matches?" (Tests: M04 Agent 365 references -- centralized agent registry, Entra ID integration, Purview compliance, EU AI Act readiness tooling)
3. "How does MCP bridge the open and closed ecosystem divide?" (Tests: M06, "MCP vs. Native Integrations" + M05 OpenClaw's MCP support -- MCP works with Claude, ChatGPT, Gemini, and OpenClaw alike)

---

### 10.4 Section-by-Section Annotations

#### On-Device AI: Intelligence at the Edge (~1,000 words)

| Placement | Component | Details |
|-----------|-----------|---------|
| After the on-device vs. cloud comparison table | `comparison-table enhancer` | Filter dimensions: **Platform** (Google/Apple/Qualcomm), sort by **Parameters** or **Latency**. |
| After "On-Device vs. Cloud: The Emerging Split" analysis | `self-explanation prompt` | Prompt: "Module 02 described context engineering as managing what information the model can access. How does on-device AI change the context engineering problem? Consider parameters, context windows, and privacy constraints." Expert answer: "On-device models invert the problem. Instead of managing a 1M-token window (Module 02), you work with models that have 2-3B parameters on constrained hardware. The 'context window' is effectively the model's built-in knowledge plus a small input. Privacy becomes a feature, not a constraint -- data never leaves the device. The engineering challenge shifts from 'what to put in context' to 'what can this small model handle, and when must we escalate to cloud?'" |
| `[SPIRAL: Context Management]` callback after on-device vs. cloud analysis | Inline text | "On-device AI inverts the context engineering problem from Module 02: instead of managing a 1M-token window, you're working within models with 2-3B parameters on constrained hardware." |
| After 90% trust survey statistic | `progressive-disclosure accordion` (variant: `supplementary-reference`) | Title: "On-Device AI Adoption Research Sources." Contains the Malwarebytes survey details and secondary adoption statistics. Collapsed because the supporting research is supplementary to the core technology analysis. |

**Complexity:** Medium. Connects technical constraints to strategic decisions.

---

#### Multimodal Generation: From Text to Everything (~1,200 words)

| Placement | Component | Details |
|-----------|-----------|---------|
| After Video Generation section (Sora 2 + Veo 3.1) | `concept-check quiz` (1 question) | Q: "What is Veo 3.1's unique differentiator compared to Sora 2?" Correct: Native 3D spatial audio generation (three distinct audio layers). Feedback: "Veo 3.1 generates dialogue with lip-sync, contextual effects, and ambient background as separate audio layers -- a capability no other video model matches as of March 2026." |
| After the Multimodal Generation Comparison table | `comparison-table enhancer` | Filter dimensions: **Capability** (video/image/voice/music), **Leading Platform**, **Status** (GA/Alpha/Preview). |
| After "95% indistinguishability" statistic | `self-explanation prompt` | Prompt: "If AI-generated video is indistinguishable from traditional footage in controlled settings, what implications does this have for content trust and verification? Connect this to the safety discussion in Module 03." Expert answer discusses the C2PA standard gap, the intersection with agent safety (agents that generate content need provenance tracking), and the verification problem. |
| `[SPIRAL: Security/Safety]` callback at verification discussion | Inline text | "Modules 03-07 showed safety as a technical problem (sandboxing, isolation, authorization). Here we see it as a content authenticity and societal trust problem." |

**Complexity:** Medium. Connects technical capabilities to broader implications.

**Pause point:** "You have covered on-device AI and multimodal generation (~15 minutes in). The remaining sections address governance, the open-closed dynamic, and future events."

---

#### Enterprise Agent Governance (~1,000 words)

| Placement | Component | Details |
|-----------|-----------|---------|
| Enterprise Governance Comparison table (7 rows x 6 columns) | `comparison-table enhancer` | Filter dimensions: **Capability** (text filter), **Provider** column toggle (Microsoft/Anthropic/OpenAI/Google/OpenClaw). Sticky first column. This is the module's most decision-relevant table for enterprise readers. Filter scenario: typing "compliance" highlights Purview and audit capabilities; typing "identity" shows Entra ID vs. API keys. |
| After "The EU AI Act" subsection | `concept-check quiz` (2 questions) | Q1: "When does the EU AI Act become fully applicable for high-risk AI systems?" Correct: August 2026. Q2: "Which requirement of the EU AI Act most directly impacts the multi-agent delegation patterns from Module 04?" Correct: Human oversight -- autonomous delegation chains need interruption points for human review. Feedback references M04's orchestration patterns. |
| After Gartner "40% adopted / 40% canceled" prediction | `progressive-disclosure accordion` (variant: `advanced-detail`) | Title: "Gartner Agentic AI Predictions: Methodology and Context." Contains deeper analysis of the Gartner predictions, including the specific failure modes (governance, reliability, integration) that drive the 40%+ cancellation rate. Collapsed because it is analytical context, not core content. |
| `[SPIRAL: Security/Safety]` callback at governance section opening | Inline text | "The agent systems covered in Module 03 and the orchestration patterns in Module 04 create a governance challenge: when autonomous AI acts on behalf of employees, enterprises need visibility, control, and audit trails." |
| `[SPIRAL: Gather-Act-Verify]` callback at governance controls | Inline text | "Enterprise governance adds a layer *around* the gather-act-verify loop from Module 03: logging, permission gates, and audit trails." |

**Complexity:** High. Regulatory and governance analysis requires integrating technical and organizational knowledge.

---

#### Safety and Alignment (~600 words)

| Placement | Component | Details |
|-----------|-----------|---------|
| After "Platform Safety Approaches" (Anthropic/OpenAI/Google descriptions) | `concept-check quiz` (1 question) | Q: "What is the fundamental safety challenge that agents introduce beyond what static model evaluation captures?" Correct: Action irreversibility -- agents can delete files, send emails, execute transactions. Feedback: "A chatbot can generate incorrect text. An agent can take irreversible actions in the real world. This is why Module 03's sandboxing patterns and Module 04's context isolation are safety mechanisms, not just architectural conveniences." |
| After "Agent-Specific Safety Challenges" list | `progressive-disclosure accordion` (variant: `advanced-detail`) | Title: "Delegation Chain Safety: Propagating Constraints Through Multi-Agent Systems." Contains a deeper analysis of how parent agent safety constraints must propagate to subagents, referencing M04's context isolation patterns. Collapsed as advanced analytical content. |

**Complexity:** Medium-high. Connects safety across multiple prior modules.

**Pause point:** "You have covered governance and safety (~25 minutes in). The final sections address the open-closed ecosystem dynamics and upcoming events."

---

#### Open vs. Closed Ecosystems (~900 words)

| Placement | Component | Details |
|-----------|-----------|---------|
| After "The Performance Gap Has Closed" section | `concept-check quiz` (1 question) | Q: "Open models have closed the benchmark gap to near zero. Name two dimensions where closed models still hold a clear advantage." Correct: Maximum context window size (Gemini 2M) and integrated agentic capabilities. Feedback: "Benchmark parity does not mean functional parity. Closed models lead in production infrastructure -- context windows, tool use, safety alignment, enterprise support -- while open models lead in cost, customization, and deployment flexibility." |
| After "Market Structure: Revenue vs. Usage" | `self-explanation prompt` | Prompt: "Open models capture only ~4% of AI revenue but are growing faster in downloads and usage. How might this dynamic resolve by 2027? Consider Module 05's analysis of OpenClaw's ecosystem and Module 09's API pricing economics." Expert answer discusses two scenarios: (a) open models capture more revenue as enterprise adoption grows and self-hosted inference improves, or (b) revenue concentration in closed platforms persists because enterprises pay for support, compliance, and managed infrastructure. References M05's governance gap and M09's Azure premium as evidence for scenario (b). |
| `[SPIRAL: Open vs. Closed]` callback at section opening | Inline text | "Modules 05 and 06 showed the technical relationship between open and closed ecosystems. Here we examine the strategic and economic dynamics shaping their future." |

**Complexity:** High. Requires synthesizing M00, M01, M05, M06, M09 perspectives.

---

#### What to Watch: Upcoming Events (~600 words)

| Placement | Component | Details |
|-----------|-----------|---------|
| Event Impact Matrix table | `comparison-table enhancer` | Filter dimensions: **Event**, sort by **Date**, filter by **Modules Most Affected**. |
| After all three event descriptions | `self-explanation prompt` | Prompt: "Pick one upcoming event (Google I/O, MS Build, or WWDC). Based on what you have learned in this curriculum, predict the single most impactful announcement for the AI landscape and explain why it matters." Expert answer provides one prediction per event, each grounded in curriculum knowledge: Google I/O -- Agentic Chrome (connects M03 agents to browser automation); Build -- expanded Agent 365 (addresses the governance gap from this module); WWDC -- LLM Siri (disrupts M08's consumer comparison by adding a fifth major consumer platform). |

**Complexity:** Medium. Forward-looking analysis requiring curriculum synthesis.

---

#### Investment Thesis + Key Takeaways & Module End

| Placement | Component | Details |
|-----------|-----------|---------|
| After "$527B capex / 40% adoption / 40% cancellation" paragraph | `concept-check quiz` (1 question) | Q: "Gartner predicts both 40% enterprise adoption and 40% project cancellation for agentic AI. What does the gap between these two numbers primarily represent?" Correct: Governance, reliability, and integration challenges. Feedback references the full governance comparison table and M03/M04/M05 reliability discussions. |
| Before Key Takeaways | `section-review quiz` (5 questions) | Q1: On-device vs. cloud split (context engineering application). Q2: Multimodal generation leadership (factual recall). Q3: Enterprise governance gap (analysis). Q4: Open vs. closed dynamics (synthesis). Q5: Upcoming events (prediction grounded in curriculum). Moderate feedback. |
| After Key Takeaways | `module-assessment quiz` (12 questions -- larger than standard because this is the capstone) | **Cumulative across the entire curriculum.** Distribution: 4 questions on M10 content, 8 questions requiring cross-module synthesis. Sample cumulative questions: (1) "Trace MCP's journey from Module 00 (mentioned as a battleground) through Module 03 (function calling vs. MCP) to Module 06 (protocol deep-dive) to this module (ecosystem bridge). How has your understanding of MCP deepened at each stage?" [SPIRAL: MCP]. (2) "Using Module 09's pricing data and this module's open-vs-closed analysis, argue for or against a company switching from Claude's API to a self-hosted Llama model." [SPIRAL: Model Selection/Cost + Open vs. Closed]. (3) "Module 03 introduced the gather-act-verify loop. Module 04 extended it to multi-agent systems. This module adds enterprise governance. Diagram the complete lifecycle of an enterprise agent action from initiation to audit." [SPIRAL: Gather-Act-Verify + Security/Safety]. Full feedback with links to all referenced modules. |

---

### 10.5 Closing Synthesis (Capstone Integration)

**Type:** Curriculum-spanning whole-task exercise (4C/ID capstone)
**Estimated time:** 15-20 minutes

> **Capstone Scenario: AI Strategy Recommendation**
>
> You are the AI strategy advisor for a European healthcare company (500 employees, 50 developers). They are subject to the EU AI Act and HIPAA-equivalent regulations. They need to:
>
> 1. **Deploy a patient-facing chatbot** that answers questions about appointment scheduling and medication reminders. It must run with minimal latency and handle patient data with maximum privacy.
> 2. **Build an internal research assistant** that summarizes medical literature, queries an internal knowledge base, and drafts clinical trial reports. Quality of reasoning is critical.
> 3. **Automate compliance workflows** -- when new regulations are published, an agent should analyze the document, identify affected internal policies, and draft update recommendations for human review.
> 4. **Govern all AI deployments** with full audit trails, identity management, and EU AI Act compliance.
>
> Using knowledge from the entire curriculum, design the AI architecture:
>
> - **Models** (M01): Which models for each use case? On-device vs. cloud?
> - **Context engineering** (M02): How do you manage context for the research assistant's large-document summarization?
> - **Agent architecture** (M03, M04): Single-agent or multi-agent for the compliance workflow? What safety models apply?
> - **Integration** (M06): Which MCP servers do you need? STDIO or Streamable HTTP?
> - **Skills and automation** (M07): How are the compliance monitoring workflows triggered?
> - **Platform selection** (M08, M09): Which provider(s)? Consumer product or API?
> - **Governance** (M10): How do you meet EU AI Act requirements? Agent 365 or alternative?
>
> Budget: 30,000 EUR/month total for AI infrastructure and subscriptions.

**Scaffolding (progressive hints, 4C/ID fading):**
- Hint 1: The patient-facing chatbot handles PII. Which deployment model ensures data never leaves the premises? (On-device or private cloud)
- Hint 2: Medical literature summarization requires large context windows. Which providers offer 1M+ tokens?
- Hint 3: The compliance workflow has a clear trigger (new regulation published). Which event-driven patterns from Module 07 apply?
- Hint 4: EU AI Act requires human oversight for high-risk systems. Where do you insert human-in-the-loop gates?
- Hint 5: For governance, only one platform has a purpose-built comprehensive product. Which one?

**Expert answer:** A multi-page model answer covering:
1. **Patient chatbot:** On-device (Gemini Nano via Android tablets in waiting rooms) for scheduling + Private Cloud Compute-style deployment for medication data. Alternatively, Azure OpenAI with VNet for private networking + HIPAA compliance.
2. **Research assistant:** Anthropic Messages API (Opus 4.6 for quality reasoning, Sonnet for summarization) with prompt caching on the system prompt (90% discount). MCP server for the internal knowledge base (STDIO, local). RAG architecture per M02 patterns.
3. **Compliance workflow:** Multi-agent system (M04). Lead agent monitors for new documents (event-driven via Power Automate webhook). Researcher subagent analyzes document. Writer subagent drafts recommendations. All output routes through human review gate before any action is taken (EU AI Act compliance).
4. **MCP servers:** Internal knowledge base (custom, STDIO), regulatory document store (custom, Streamable HTTP with OAuth), calendar system (Google managed MCP or Zapier bridge).
5. **Governance:** Agent 365 ($15/user x 50 developers = $750/mo) for agent registry, monitoring, compliance. Azure OpenAI for private networking. All agents logged via Agent 365 audit trail.
6. **Budget breakdown:** Azure OpenAI API costs (~$8,000/mo estimated), Anthropic API (~$4,000/mo), Agent 365 ($750/mo), MCP server hosting (~$500/mo), Power Automate ($750/mo), contingency. Total: ~$14,000/mo, well under 30,000 EUR budget.

---

### 10.6 Estimated Completion Time

| Segment | Time |
|---------|------|
| Opening hook + prior knowledge gate | 3 min |
| On-Device AI | 6 min |
| Multimodal Generation | 7 min |
| **Pause point 1** | -- |
| Enterprise Agent Governance | 7 min |
| Safety and Alignment | 4 min |
| **Pause point 2** | -- |
| Open vs. Closed Ecosystems | 6 min |
| Upcoming Events + Investment Thesis | 4 min |
| Section review + module assessment (larger, cumulative) | 10 min |
| Closing synthesis (capstone) | 15-20 min |
| **Total** | **62-67 min** (30-35 min reading + 28-32 min exercises) |

---

---

## Cross-Module Component Summary

### Comparison-Table Enhancer Deployment

| Module | Table | Filter Dimensions |
|--------|-------|-------------------|
| M06 | Transport Layers | Transport type, Use case, Status |
| M06 | Platform Adoption Matrix | Platform, Role, Status, Integration Depth |
| M06 | Zapier Pricing | Plan, Cost, MCP Calls |
| M06 | Specialized Tool Adoption | Tool, Role, Status, Capabilities |
| M06 | MCP vs. Native Integrations | Integration Type, Strengths, Weaknesses |
| M07 | Skills Architecture Comparison | Platform, Dimension (text filter) |
| M07 | Automation Platform Comparison | Platform, Dimension (text filter) |
| M08 | Core Capability Matrix | Capability, Platform column toggle |
| M08 | Benchmark table | Benchmark, Score columns sortable |
| M08 | Reasoning Modes | Feature, Platform column toggle |
| M08 | Coding Agent Comparison | Feature, Platform column toggle, SWE-bench sortable |
| M08 | Image Generation | Feature, Platform column toggle |
| M08 | Voice and Audio | Feature, Platform column toggle |
| M08 | Memory Comparison | Feature, Platform column toggle |
| M08 | Consumer Pricing Tiers | Tier, Platform column toggle |
| M08 | Business/Enterprise Tiers | Tier, sortable by seats/price |
| M08 | API Pricing | Model tier, sortable by price |
| M08 | Market Share Trajectory | Period, Platform sortable |
| M08 | Decision Framework | Need (text filter) |
| M09 | SDK Ecosystem | Language, Provider toggle, Status |
| M09 | Prompt Caching Comparison | Provider, sortable by discount/cost |
| M09 | Batch Processing | Provider, sortable |
| M09 | Workload Cost Comparison | Workload, sortable by cost |
| M09 | Structured Outputs | Feature, Provider toggle |
| M09 | Fine-Tuning/Customization | Capability, Provider toggle |
| M09 | Speech/Audio | Capability, Provider toggle |
| M09 | Image/Video | Capability, Provider toggle |
| M09 | Content Safety | Feature, Provider toggle |
| M10 | On-Device Comparison | Platform, sortable by Parameters/Latency |
| M10 | Multimodal Generation | Capability, Platform, Status |
| M10 | Enterprise Governance | Capability, Provider column toggle |
| M10 | Event Impact Matrix | Event, sortable by Date |

**Total:** 32 enhanced tables across 5 modules. M08 accounts for 13 (the most table-dense module).

### Worked-Example Fader Deployment

| Module | Stage | Topic |
|--------|-------|-------|
| M06 | `full` | MCP connection lifecycle (4-step handshake) |
| M06 | `partial` | MCP workflow completion (6-step project management) |
| M06 | `full` | TypeScript MCP server (line-by-line annotation) |
| M06 | `partial` | Extend weather server with second tool |
| M06 | `guided` | Design tool descriptions for PM server |
| M09 | `full` | Anthropic Messages API multi-turn tool-use |
| M09 | `partial` | OpenAI Responses API tool execution comparison |
| M09 | `full` | Prompt caching cost calculation across providers |
| M09 | `guided` | RAG application cost optimization |
| M09 | `partial` | Function calling schema definition |

**Total:** 10 worked-example fader instances. M06 has 5 (protocol-heavy, good fader candidate per task brief). M09 has 5 (API/pricing content). M07, M08, M10 use self-explanation prompts and concept checks instead -- their content is comparative/analytical rather than procedural, making worked examples less appropriate.

### Quiz Distribution

| Module | Concept-Check | Section-Review | Module-Assessment | Total |
|--------|---------------|----------------|-------------------|-------|
| M06 | 5 | 1 (4 Qs) | 1 (10 Qs) | 7 instances, 19 questions |
| M07 | 4 | 1 (4 Qs) | 1 (8 Qs) | 6 instances, 16 questions |
| M08 | 5 | 1 (5 Qs) | 1 (10 Qs) | 7 instances, 20 questions |
| M09 | 4 | 1 (4 Qs) | 1 (10 Qs) | 6 instances, 18 questions |
| M10 | 5 | 1 (5 Qs) | 1 (12 Qs) | 7 instances, 22 questions |
| **Total** | **23** | **5** | **5** | **33 instances, 95 questions** |

M10's module-assessment has 12 questions (vs. standard 8-10) because it is the curriculum capstone with 8 cumulative cross-module questions.

---

## Anti-Pattern Compliance Check

| Anti-Pattern | How Avoided |
|--------------|-------------|
| **Seductive details** | Every quiz, self-explanation prompt, and worked example directly maps to a learning outcome. No decorative elements. Supplementary content is in collapsed accordions, not inline. |
| **Unscaffolded PBL** | All closing synthesis exercises include progressive hints. M06 and M09 use worked-example fader sequences (full -> partial -> guided). M10 capstone has 5 scaffolding hints. |
| **Color-only encoding** | All comparison-table enhancers use text labels and icons alongside any color coding. Decision Framework blocks in M09 use border color paired with provider name text labels. |
| **Quiz without feedback** | Every quiz question specifies explanatory feedback. Module-assessment quizzes include cross-module links and "review this section" pointers. |
| **Hidden content as default** | Critical-path content is never placed in accordions. Only supplementary references, advanced details, and worked examples (which are supplementary to the annotated code in the main text) use progressive-disclosure accordions. |
| **Generic gamification** | No points or badges. Progress tracker frames advancement as "sections explored" and quiz questions answered, not arbitrary scores. |
| **Walls of text** | Pause points at ~800-1,000 word intervals. Concept-check quizzes break long sections. M07's 2,200-word skills section has 3 inline quizzes. |
| **Isolated modules** | Every module opens with prior knowledge activation linking to prerequisites. Spiral callbacks inserted per ws1-course-architecture.md. Closing syntheses in M08 and M10 explicitly draw on multiple prior modules. |
| **Identical treatment** | Advanced content (OAuth flows, caching economics, delegation chain safety) placed in progressive-disclosure accordions for expertise-reversal management. Core path remains streamlined. |
