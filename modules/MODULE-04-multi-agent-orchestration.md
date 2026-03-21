# Module 04: Multi-Agent Orchestration

**Last updated:** 2026-03-21
**Status:** DRAFTING
**Word count target:** 4,000-5,000
**Prerequisites:** [Module 00: Landscape Overview](MODULE-00-landscape-overview.md), [Module 01: Models & Intelligence Tiers](MODULE-01-models-and-intelligence.md), [Module 03: Single-Agent Systems](MODULE-03-single-agent-systems.md)

---

## Executive Summary

Single agents hit a ceiling when tasks require parallel exploration, competing hypotheses, or cross-domain expertise that cannot fit in one context window. Multi-agent orchestration addresses this by decomposing work across specialized agents that communicate, delegate, and synthesize results. As of March 2026, every major platform offers a framework for building multi-agent systems -- Anthropic's Agent SDK and Agent Teams, OpenAI's Agents SDK, Google's Agent Development Kit (ADK), and Microsoft's Copilot Studio -- but the architectures, abstraction levels, and maturity vary dramatically. This module dissects how each framework works, compares the orchestration patterns they support, and examines the emerging enterprise governance layer that Microsoft is building with Agent 365.

---

## Prerequisites

- [Module 00: Landscape Overview](MODULE-00-landscape-overview.md) -- for ecosystem context and platform positioning
- [Module 01: Models & Intelligence Tiers](MODULE-01-models-and-intelligence.md) -- for understanding which models power agent orchestration
- [Module 03: Single-Agent Systems](MODULE-03-single-agent-systems.md) -- for the gather-act-verify loop, tool use, and safety models that underpin every agent in a multi-agent system

---

## Why Multi-Agent? The Case for Decomposition

A single agent with a 200K-token context window can accomplish remarkable things (see [Module 03](MODULE-03-single-agent-systems.md)). But several classes of problem exceed what one agent can handle efficiently:

**Context saturation.** When a task requires reading and reasoning over more information than fits in one context window -- or when the volume of intermediate reasoning degrades output quality well before the window fills (the "lost in the middle" effect documented in [Module 02](MODULE-02-context-engineering.md)) -- splitting the work across agents with focused, smaller contexts yields better results.

**Parallelism.** A single agent is inherently sequential: it gathers, acts, verifies, repeats. When a project has independent subtasks (research three topics simultaneously, run tests while writing documentation, explore multiple solution approaches), parallel agents complete the work faster.

**Specialization.** Different subtasks may require different system prompts, tool sets, or even different models. A coding agent needs file editing tools and a strong reasoning model; a research agent needs web search and a fast, cheap model. Multi-agent systems let each agent be optimally configured for its task.

**Isolation.** Subagent failures, hallucinations, or security boundary violations are contained within the subagent's context. The parent agent receives a summary, not the full trace, which limits blast radius and simplifies error handling.

The tradeoff is cost and complexity. Every additional agent means additional API calls, context window allocations, and coordination overhead. The decision framework is straightforward: use a single agent when the task fits in one context window with one tool set, and use multiple agents when parallelism, specialization, or isolation justifies the overhead.

---

## Orchestration Patterns

Before examining specific frameworks, it is worth naming the recurring patterns that all of them implement in some combination.

### Hierarchical Delegation (Parent-Child)

The most common pattern. A lead agent receives a task, decomposes it, spawns subagents for each subtask, collects their results, and synthesizes a final output. Communication flows vertically: parent to child and back. Children do not communicate with each other.

**Strengths:** Simple to reason about, clear authority, predictable cost (parent controls spawning).
**Weaknesses:** Bottleneck at the parent, no lateral information sharing between children.
**Example:** Claude Code's subagent model -- a main session spawns focused subagents that return structured summaries [F1].

### Handoff (Sequential Delegation)

An agent transfers its full conversation state to another agent, which picks up where the first left off. Unlike parent-child delegation, the new agent inherits the entire context rather than receiving a scoped brief.

**Strengths:** No information loss at handoff boundaries, natural for pipeline-style workflows.
**Weaknesses:** Context grows monotonically (each agent adds but does not prune), limited parallelism.
**Example:** OpenAI Agents SDK handoffs -- one agent transfers the full conversation to a specialist agent [1].

### Peer-to-Peer (Team)

Multiple agents operate as equals, communicating directly with each other through messaging rather than through a central coordinator. A lead agent may exist for task assignment, but teammates can message each other and self-organize.

**Strengths:** Enables lateral information sharing, supports emergent collaboration patterns, avoids single-point bottleneck.
**Weaknesses:** Harder to predict cost and behavior, coordination overhead scales with team size.
**Example:** Anthropic Agent Teams -- teammates work in their own context windows with direct inter-agent messaging [F1].

### Competitive (Parallel Exploration)

Multiple agents tackle the same problem independently, and the orchestrator selects the best result. This trades compute cost for solution quality -- useful when the problem has multiple valid approaches and it is cheaper to explore them in parallel than to backtrack from a poor choice.

**Strengths:** Finds better solutions for ambiguous problems, naturally parallelizable.
**Weaknesses:** Expensive (N times the cost of a single attempt), requires a reliable selection mechanism.
**Example:** Agent Teams debugging with competing hypotheses -- multiple teammates explore different root causes simultaneously [F1].

### Router (Dynamic Dispatch)

A lightweight agent (or even a classifier) examines each incoming request and routes it to the appropriate specialist agent. The router does not do substantive work itself -- it is a dispatcher.

**Strengths:** Low per-request overhead, clean separation of concerns, easy to add new specialists.
**Weaknesses:** Router errors cascade (wrong specialist = wrong answer), routing logic itself can be complex.
**Example:** Copilot Studio's generative orchestration -- the LLM decides which specialist agent or connector to invoke [F4].

---

## Platform Frameworks

### Anthropic: Agent SDK and Agent Teams

Anthropic offers two distinct multi-agent approaches that map to different orchestration patterns.

#### Agent SDK (GA, September 2025)

The Agent SDK (Python and TypeScript) exposes the same three-phase agentic loop that powers Claude Code -- Gather Context, Take Action, Verify Work -- as a programmable framework [F1]. Key characteristics:

- **Built-in tools:** Read, Write, Edit, Bash, Glob, Grep, WebSearch -- the same tools Claude Code uses internally.
- **Subagent spawning:** A parent agent creates child agents programmatically. Each subagent runs in its own context window. Only a structured summary returns to the parent.
- **Session management:** Persistent sessions with session IDs, enabling long-running multi-turn agent interactions.
- **Hooks:** Lifecycle callbacks that fire before/after tool calls, allowing logging, permission checks, or custom routing logic.
- **MCP integration:** Agents can connect to MCP servers for external tool and data access (see [Module 06](MODULE-06-mcp-integration-layer.md)).
- **Model selection:** Each agent (or subagent) can use a different Claude model, enabling cost optimization -- Haiku for research, Opus for synthesis [F1].

The SDK's subagent model is strictly hierarchical: parent spawns child, child returns result, parent continues. Subagents cannot communicate with each other or with any agent other than their parent.

#### Agent Teams (Experimental)

Agent Teams is a higher-level orchestration layer built on top of Claude Code, currently gated behind an experimental flag (`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS`) [F1].

- **Architecture:** One lead session plus N teammate sessions, each in its own context window.
- **Communication:** Direct inter-teammate messaging -- teammates can send messages to each other, not just to the lead. This is the key difference from subagents.
- **Shared task list:** All teammates share a visible task board with status tracking, enabling coordination without constant messaging.
- **Plan approval gates:** The lead can require approval before teammates execute plans, providing a human-in-the-loop checkpoint.
- **Self-organizing:** Teammates can claim tasks from the shared list without explicit assignment from the lead.

**Subagents vs. Agent Teams:**

| Dimension | Subagents (Agent SDK) | Agent Teams |
|-----------|----------------------|-------------|
| Communication | Parent-child only | Any-to-any (peer-to-peer) |
| Coordination | Synchronous (parent waits) | Asynchronous (teammates work independently) |
| Context isolation | Full (summary returns) | Full (own context windows) |
| Cost model | Lower (focused, short-lived) | Higher (persistent sessions, more tokens) |
| Status | GA | Experimental |
| Best for | Quick focused tasks, deterministic workflows | Parallel exploration, complex multi-faceted projects |

> **Volatility warning:** Agent Teams is experimental and disabled by default. The API surface, communication model, and task management features may change substantially before GA.

### OpenAI: Agents SDK (GA)

OpenAI's Agents SDK (Python GA, Node.js GA) is the production successor to the experimental Swarm framework [F2]. It takes a fundamentally different architectural approach from Anthropic's SDK.

The SDK is built around five primitives [1]:

1. **Agents:** Individual AI entities with a system prompt, tool set, and model configuration.
2. **Tools:** Functions the agent can call, defined via Python functions with type annotations.
3. **Handoffs:** First-class agent-to-agent delegation. When an agent hands off to another agent, the entire conversation history transfers. The receiving agent picks up seamlessly.
4. **Guardrails:** Input and output validators that run on every agent interaction. Guardrails can block, modify, or flag content before it reaches the agent or after the agent responds.
5. **Tracing:** Built-in observability. Every agent call, tool invocation, and handoff is logged with timing and token usage, creating a full execution trace.

Key differentiators:

- **Provider-agnostic:** While optimized for OpenAI's models, the SDK supports any Chat Completions-compatible endpoint, meaning you can plug in open-source models or other providers [1].
- **Handoff-centric:** Handoffs are the primary orchestration mechanism, not subagent spawning. This makes the SDK naturally suited for sequential pipeline workflows and routing patterns.
- **Open source:** The SDK is fully open source (MIT license), unlike Anthropic's Agent SDK which is proprietary [1].
- **Guardrails as first-class citizens:** Guardrails are not an afterthought -- they are one of the five core primitives, reflecting OpenAI's emphasis on safety in multi-agent systems.

The Agents SDK does not natively support peer-to-peer communication between agents. Orchestration is either hierarchical (a coordinator agent dispatches to specialists) or sequential (agent A hands off to agent B hands off to agent C). For parallel execution, the developer must implement it at the application layer.

### Google: Agent Development Kit (ADK)

Google's ADK is a Python-first framework (Java support announced) for building multi-agent systems, tightly integrated with the Vertex AI Agent Engine for deployment and monitoring [F3] [2].

- **Multi-agent patterns:** ADK supports hierarchical delegation, sequential pipelines, and parallel fan-out natively.
- **Vertex AI Agent Engine:** Managed infrastructure for deploying, monitoring, and scaling agent systems in production. Includes threat detection (Preview) and a visual trace dashboard [F3].
- **MCP native:** ADK agents can consume MCP servers as plug-and-play data sources, making Google's growing catalog of managed MCP servers (Workspace, Maps, Cloud services) directly accessible [F3].
- **Antigravity integration:** The Antigravity IDE's Manager Surface can spawn and observe multiple ADK agents simultaneously, providing a GUI for multi-agent orchestration during development [F3].

ADK's positioning differs from both Anthropic and OpenAI: it is less opinionated about orchestration patterns and more focused on providing infrastructure for deployment and monitoring. The framework does not prescribe handoffs or agent teams -- it provides building blocks that developers compose into their own patterns.

### Microsoft: Copilot Studio and Agent 365

Microsoft's multi-agent story is split between a builder platform (Copilot Studio) and a governance layer (Agent 365).

#### Copilot Studio (GA)

Copilot Studio is a low-code/no-code platform for building custom AI agents, targeting business analysts and citizen developers rather than software engineers [F4].

- **Agent types:** Declarative agents (rules-based, deterministic flows) and autonomous agents (LLM-driven, adaptive behavior).
- **Generative orchestration:** The LLM dynamically plans which tools, connectors, and sub-agents to invoke -- a router pattern where the LLM itself is the router [F4].
- **1,400+ connectors:** Pre-built integrations to Dataverse, SharePoint, SQL, Salesforce, ServiceNow, SAP, and more. This is Microsoft's deepest moat: no other platform comes close to this connector breadth [F4].
- **Multi-agent orchestration:** Route tasks between specialized agents, including partner-built agents. Multi-agent Private Preview expected in 2026 [F4].
- **Computer-using agents:** UI automation capabilities for interacting with legacy applications that lack APIs (GA February 2026) [F4].
- **MCP client support:** GA -- Copilot Studio agents can connect to external MCP servers as data and tool sources [F4].
- **Deployment targets:** Teams, websites, Power Apps, standalone apps, or embedded in Microsoft 365 Copilot.

Copilot Studio's multi-agent orchestration is currently the least mature of the four platforms in terms of developer-facing primitives. The emphasis is on enterprise workflow automation rather than flexible agent composition.

#### Agent 365 (GA May 1, 2026)

Agent 365 is the first enterprise-grade agent governance platform -- and as of March 2026, it has no direct competitor [F4].

- **Price:** $15/user/month (standalone) or included in the M365 E7 Frontier Suite ($99/user/month) [F4].
- **Agent Registry:** A centralized catalog of all agents operating in the organization. Tens of millions of agents already registered during preview [F4].
- **Identity management:** Agents receive identities through Entra ID, just like human users. This enables standard enterprise IAM policies (conditional access, MFA, least privilege) to apply to agents [F4].
- **Compliance:** Purview policies apply to agent actions -- data loss prevention, information barriers, retention policies [F4].
- **Security monitoring:** Defender monitors agent behavior in real time, flagging anomalous actions, excessive permissions, or potential data exfiltration [F4].
- **Action auditing:** Every agent action is logged and auditable, creating a compliance trail.

Agent 365 reflects Microsoft's bet that enterprise multi-agent adoption will create a governance problem before it creates a technical one. When an organization has thousands of agents built by hundreds of citizen developers via Copilot Studio, someone needs to answer: which agents exist, what can they access, what are they doing, and are they complying with policy?

> **Volatility warning:** Agent 365 GAs on May 1, 2026. Pre-GA details (pricing, features, scale numbers) are based on preview program information and Microsoft's public announcements as of March 2026 [F4].

---

## Framework Comparison

| Dimension | Anthropic Agent SDK | Anthropic Agent Teams | OpenAI Agents SDK | Google ADK | Copilot Studio |
|-----------|--------------------|-----------------------|-------------------|------------|----------------|
| **Status** | GA (Sep 2025) | Experimental | GA | GA | GA (multi-agent: Private Preview) |
| **Languages** | Python, TypeScript | N/A (Claude Code) | Python, Node.js | Python (Java coming) | Low-code/no-code |
| **Open source** | No | No | Yes (MIT) | Yes | No |
| **Primary pattern** | Hierarchical (parent-child) | Peer-to-peer (team) | Handoff (sequential) | Flexible (all patterns) | Router (generative orchestration) |
| **Agent-to-agent communication** | Parent-child only | Any-to-any | Sequential handoff | Developer-defined | LLM-routed |
| **Built-in tools** | Read, Write, Edit, Bash, Glob, Grep, WebSearch | Same (Claude Code tools) | Developer-defined | Developer-defined | 1,400+ connectors |
| **MCP support** | Yes | Yes | Via tools | Yes (native) | Yes (GA) |
| **Guardrails** | Hooks (lifecycle callbacks) | Plan approval gates | First-class primitive | Vertex AI Threat Detection | Enterprise policies (Agent 365) |
| **Observability** | Custom via hooks | Shared task list | Built-in tracing | Vertex AI dashboard | Agent 365 auditing |
| **Target audience** | Developers | Developers (Claude Code users) | Developers | Developers | Business analysts, citizen developers |
| **Provider lock-in** | Anthropic only | Anthropic only | Provider-agnostic | Google-optimized | Microsoft ecosystem |

---

## Delegation Patterns in Practice

Understanding multi-agent orchestration at the framework level is necessary but not sufficient. The real skill is knowing when and how to decompose work across agents. Three patterns dominate production usage.

### Fan-Out / Fan-In (Parallel Research)

The parent agent identifies N independent subtasks, spawns N subagents simultaneously, waits for all results, then synthesizes a unified output.

**When to use:** Research tasks where subtopics are independent (e.g., "investigate pricing for Anthropic, OpenAI, Google, and Microsoft" -- four parallel researchers). New feature development where frontend, backend, and tests can proceed in parallel.

**Implementation:** In Agent SDK, spawn N subagents with scoped briefs and collect summaries. In Agent Teams, post N tasks to the shared board and let teammates self-assign. In OpenAI Agents SDK, requires application-level parallelism (the SDK itself is sequential).

### Pipeline (Sequential Handoff)

Agent A completes its work and passes the full context to Agent B, which passes to Agent C, and so on. Each agent adds its contribution without losing what came before.

**When to use:** Workflows with natural stages -- research, then draft, then review, then publish. Data processing pipelines where each stage transforms the output of the previous stage.

**Implementation:** OpenAI's handoff primitive makes this first-class. In Anthropic's SDK, this requires the parent to pass each subagent's output as input to the next subagent. ADK supports this as a composition pattern.

### Specialist Router

A lightweight dispatcher examines each request and routes it to the appropriate expert agent. The router does minimal work itself.

**When to use:** Customer support (route billing questions to billing agent, technical questions to tech agent). Any system with a diverse input space and specialized handlers.

**Implementation:** Copilot Studio's generative orchestration does this automatically. In OpenAI Agents SDK, define a triage agent with handoffs to specialists. In Agent SDK, the parent agent acts as router, spawning the appropriate subagent per request.

---

## Context Isolation and Summary Propagation

The central engineering challenge of multi-agent systems is managing information flow between agents. Each agent operates in its own context window, which means:

1. **What a subagent learns does not automatically transfer to its parent.** Only the returned summary propagates. If the summary omits a critical detail, it is lost.
2. **What the parent knows is not automatically available to subagents.** The parent must explicitly include relevant context in the subagent's brief.
3. **Peer agents in a team know only what they are told.** Direct messaging enables lateral sharing, but agents must choose to share.

This creates a **summary propagation problem**: the quality of multi-agent output depends heavily on the quality of inter-agent summaries. A subagent that returns "I fixed the bug" is less useful than one that returns "Fixed a null pointer exception in `auth.py:142` caused by missing session token validation; added a guard clause and updated 3 tests."

Best practices for summary design:

- **Structured return formats:** Define exactly what each subagent must return (findings, decisions, file paths, open questions) rather than relying on free-form summaries.
- **Include what changed:** File paths modified, lines added/removed, tests affected. Concrete details survive compaction and context boundaries better than abstractions.
- **Flag uncertainty explicitly:** Subagents should mark unresolved questions so the parent can decide whether to investigate further or accept the uncertainty.
- **Budget summaries appropriately:** A summary that is too terse loses information; one that is too verbose defeats the purpose of context isolation. Target 5-15% of the subagent's working context as a reasonable summary budget.

For more on how context limits affect multi-agent design, see [Module 02: Context Engineering](MODULE-02-context-engineering.md).

---

## Enterprise Agent Governance

As organizations scale from a handful of hand-built agents to thousands created by citizen developers, governance becomes the binding constraint. Microsoft's Agent 365 is the first purpose-built solution, but the problem is universal.

### The Governance Problem

Consider an enterprise with 5,000 employees, each enabled to create autonomous agents via Copilot Studio. Within months, the organization may have tens of thousands of agents -- each with its own permissions, data access patterns, and behavioral characteristics. Without governance:

- **Shadow agents:** Agents built by individuals that IT does not know about, accessing sensitive data without authorization.
- **Permission creep:** Agents accumulate connector access over time, exceeding what their tasks require.
- **Compliance gaps:** Agents that process personal data, make financial decisions, or interact with customers without audit trails.
- **Behavioral drift:** Agents that worked correctly at creation time but produce incorrect or harmful outputs as their underlying models or data sources change.

### Agent 365's Approach

Agent 365 addresses this with four pillars [F4]:

1. **Registry:** Centralized catalog of all agents. Every agent gets registered, categorized, and tagged with its owner, purpose, and data access scope.
2. **Identity:** Agents receive Entra ID identities. Standard enterprise IAM applies: conditional access policies, multi-factor authentication for sensitive operations, least-privilege access.
3. **Compliance:** Purview policies extend to agent actions. Data loss prevention rules prevent agents from exfiltrating sensitive data. Information barriers prevent agents from crossing organizational boundaries.
4. **Monitoring:** Defender watches agent behavior in real time. Anomaly detection flags agents that access unusual data, execute unexpected actions, or exhibit behavioral patterns inconsistent with their declared purpose.

### Cross-Platform Governance Gap

Agent 365 governs agents within the Microsoft ecosystem. It does not govern Claude Code agents, OpenAI Agents SDK deployments, or ADK agents running on Vertex AI. This creates a fragmented governance landscape for enterprises that use multiple AI platforms -- which, as [Module 00](MODULE-00-landscape-overview.md) documents, is the norm rather than the exception.

No cross-platform agent governance standard exists as of March 2026. Organizations running multi-vendor agent deployments must build governance bridges themselves or accept inconsistent policies across platforms.

---

## Key Takeaways

1. **Multi-agent orchestration solves four problems** that single agents cannot: context saturation, parallelism, specialization, and failure isolation.
2. **Five orchestration patterns recur** across all frameworks: hierarchical delegation, handoff, peer-to-peer teams, competitive exploration, and routing.
3. **Anthropic offers two approaches:** the Agent SDK (GA) for programmatic hierarchical delegation, and Agent Teams (Experimental) for peer-to-peer collaboration with direct inter-agent messaging.
4. **OpenAI's Agents SDK differentiates** through handoffs as a first-class primitive, provider-agnostic design, open-source licensing, and built-in guardrails.
5. **Google's ADK is the most flexible** but least opinionated -- it provides building blocks and infrastructure (Vertex AI Agent Engine) without prescribing patterns.
6. **Copilot Studio targets a different audience** -- business analysts and citizen developers -- with 1,400+ connectors and low-code agent building, but its multi-agent capabilities are the least mature.
7. **Agent 365 is a category-defining product** -- the first enterprise agent governance platform, addressing registry, identity, compliance, and monitoring. No competitor has an equivalent.
8. **Summary propagation quality determines multi-agent output quality.** Structured return formats, concrete details, and explicit uncertainty flags are essential.
9. **The cost-benefit calculus is real:** every additional agent means additional API calls and context allocations. Use multi-agent when parallelism, specialization, or isolation justifies the overhead.
10. **Cross-platform agent governance is an unsolved problem** as of March 2026. Enterprises using multiple AI platforms face fragmented governance.

---

## Cross-References

- [Module 00: Landscape Overview](MODULE-00-landscape-overview.md) -- platform ecosystem context and competitive positioning
- [Module 01: Models & Intelligence Tiers](MODULE-01-models-and-intelligence.md) -- model selection for agents (cost vs. capability tradeoffs)
- [Module 02: Context Engineering](MODULE-02-context-engineering.md) -- context windows, compaction, and the "lost in the middle" effect that motivates context isolation
- [Module 03: Single-Agent Systems](MODULE-03-single-agent-systems.md) -- the gather-act-verify loop, tool use, and safety models that underpin every agent in a multi-agent system
- [Module 06: MCP & the Integration Layer](MODULE-06-mcp-integration-layer.md) -- MCP server integration across all agent frameworks
- [Module 07: Skills, Plugins & Automation](MODULE-07-skills-plugins-automation.md) -- skills architecture that extends agent capabilities
- [Module 09: Developer Platforms & APIs](MODULE-09-developer-platforms-apis.md) -- API details for the underlying model calls that agents make

---

## Sources

| # | Source | URL | Date |
|---|--------|-----|------|
| F1 | Anthropic/Claude Ecosystem Profile | reference/profiles/anthropic-claude.md | 2026-03-18 |
| F2 | OpenAI/ChatGPT Ecosystem Profile | reference/profiles/openai-chatgpt.md | 2026-03-18 |
| F3 | Google/Gemini Ecosystem Profile | reference/profiles/google-gemini.md | 2026-03-18 |
| F4 | Microsoft/Copilot Ecosystem Profile | reference/profiles/microsoft-copilot.md | 2026-03-18 |
| 1 | OpenAI Agents SDK (GitHub) | https://github.com/openai/openai-agents-python | 2026-03-20 |
| 2 | Google Agent Development Kit Documentation | https://google.github.io/adk-docs/ | 2026-03-20 |
