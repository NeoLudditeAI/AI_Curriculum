# Module 07: Skills, Plugins & Automation

**Last updated:** 2026-03-21
**Status:** COMPLETE
**Word count target:** 4,000-5,000

---

## Executive Summary

Every major AI platform has converged on the concept of "skills" -- reusable, packaged instructions that extend what an agent can do -- but their implementations diverge wildly, from filesystem-based markdown files (Claude) to code monorepos with a community registry (OpenClaw) to visual builders with enterprise governance (Copilot Studio). Meanwhile, the automation layer connecting AI to the broader software ecosystem has become a three-way race between Zapier (breadth), Make (cost efficiency), and Power Automate (enterprise depth). This module maps the skills architectures across platforms, compares plugin ecosystems and marketplaces, examines scheduled and event-driven automation patterns, and provides a framework for choosing the right automation stack.

---

## Prerequisites

- [Module 03: Single-Agent Systems](MODULE-03-single-agent-systems.md) -- for understanding the agents that consume skills
- [Module 06: MCP & the Integration Layer](MODULE-06-mcp-integration-layer.md) -- for the protocol layer that skills often build upon

---

## Skills Architecture Across Platforms

A **skill** is a reusable capability definition that tells an agent *what* it can do and *how* to do it. The term is used across platforms, but the underlying mechanics -- authoring format, discovery mechanism, distribution model, and security posture -- vary significantly.

### Claude Skills

Claude's skills system is the most minimalist of the major platforms. A skill is a markdown file named `SKILL.md` with YAML frontmatter that declares the skill's name, description, and trigger conditions. The body contains natural-language instructions the agent follows when the skill is activated [F1].

**Authoring format:** Markdown + YAML frontmatter. No code execution, no API bindings -- skills are purely instructional. They shape the agent's behavior through prompt engineering, not through programmatic interfaces.

**Discovery:** Filesystem-based auto-discovery. Claude Code scans the working directory and parent directories for `SKILL.md` files and loads them into context automatically. This means skills are colocated with the projects they serve [F1].

**Scopes:**

- **Personal skills** -- stored in `~/.claude/skills/`, available across all projects for a single user
- **Project skills** -- stored in the project directory, shared via version control with the team
- **Distributed skills** -- published to the Claude Plugins marketplace (launched February 2026), bundled as skill packs with optional MCP connector integrations [1]

**Strengths:** Zero infrastructure overhead. Version-controllable. Easy to read and audit. Composable with MCP servers for external tool access.

**Limitations:** No code execution within the skill itself -- all logic must flow through the agent's native capabilities or MCP tools. No parameterized inputs beyond what the agent infers from context. No programmatic testing framework.

### Custom GPTs (OpenAI)

OpenAI's equivalent to skills is the Custom GPT system, which bundles a system prompt, optional uploaded documents (for RAG), and API Actions (function calling endpoints) into a shareable agent configuration [F2].

**Authoring format:** Web-based builder (GPT Builder) or API. System prompt defines behavior; uploaded files provide knowledge; Actions define external API integrations via OpenAPI specifications.

**Discovery:** GPT Store marketplace. Enterprise customers can deploy private Custom GPTs visible only within their organization.

**Distribution:** The GPT Store launched in January 2024 and as of March 2026, over 3M Custom GPTs have been created, though approximately 159,000 are publicly listed and active in the store [2]. Revenue sharing for creators was introduced in mid-2025. Enterprise accounts can restrict which GPTs are accessible to their users.

**Strengths:** Rich integration with external APIs via Actions. Built-in RAG over uploaded documents. Large marketplace with network effects.

**Limitations:** No filesystem access. System prompts can be extracted by users through prompt injection techniques -- a persistent and well-documented security concern that OWASP ranks as the #1 risk for LLM applications; OpenAI has acknowledged that prompt injection "is unlikely to ever be fully 'solved'" [6][7]. Actions require an externally hosted API endpoint -- no serverless or in-line code execution within the GPT itself.

### Codex Skills (OpenAI)

Separate from Custom GPTs, OpenAI's Codex agent (the cloud-based coding agent) has its own skills system. Codex Skills are instruction bundles paired with executable scripts that the agent can invoke during autonomous coding sessions [F2].

**Authoring format:** Instruction files + shell scripts. Skills can define setup steps, linting rules, testing commands, and deployment procedures.

**Key feature -- Skill chaining:** Codex supports composing multiple skills sequentially, enabling multi-stage workflows (e.g., "lint, test, build, deploy") from a single invocation.

**Cloud automations:** Codex skills can be triggered by repository events (pull request opened, issue labeled), making them automation primitives for CI/CD-adjacent workflows [F2].

### OpenClaw Skills

OpenClaw takes a code-first approach to skills. Each skill is a JavaScript or TypeScript module in a monorepo structure, registered and distributed through the ClawHub registry [9][13].

**Authoring format:** JS/TS code implementing a defined skill interface, plus a `skill.md` file with metadata and natural-language descriptions. Skills can execute arbitrary code, make network calls, access the filesystem, and interact with the Pi Agent Runtime.

**Distribution:** ClawHub hosts 13,700+ skills as of February 2026 [13] (count reduced from peak after malicious skill removal). Skills are installed via the `claw` CLI and can declare dependencies on other skills.

**Security posture:** This is the critical weakness. The ClawHub registry has a documented 12-20% malicious skill rate, as detailed in the ClawHavoc supply chain attack analysis and Snyk's independent audit [10][12]. Skills can execute arbitrary code with the permissions of the host process. The ClawJacked WebSocket vulnerability demonstrated that even the skill installation process itself could be compromised [11]. See [Module 05: OpenClaw & Open Agent Ecosystem](MODULE-05-openclaw-and-open-agents.md) for the full security analysis.

**Strengths:** Maximum flexibility. Community-driven ecosystem. Can wrap any API or local tool. Self-hosted, no vendor lock-in.

**Limitations:** Security is a serious, unresolved problem. No code signing. Manual review burden. The quality distribution is extremely wide -- top skills are production-grade; many are abandoned or malicious.

### Google: No Dedicated Skills System

Google has not shipped a unified skills framework comparable to Claude Skills or OpenClaw Skills. Instead, Google offers:

- **AI Studio custom apps:** Generate purpose-built applications from natural-language descriptions, but these are standalone apps, not composable agent capabilities [F3].
- **AI Chips:** Pre-built tool integrations for Google services (Calendar, Maps, Gmail, Drive). These function like skills but are first-party only -- no third-party authoring [F3].
- **Gemini Extensions:** Google Workspace add-ons that extend Gemini's capabilities within Docs, Sheets, and other Workspace apps [F3].

The lack of a third-party skills SDK means Google's agent extensibility relies on MCP adoption (see [Module 06](MODULE-06-mcp-integration-layer.md)) and the broader Android/Workspace integration surfaces rather than a dedicated skill registry.

### Copilot Studio

Microsoft's Copilot Studio is the most enterprise-oriented skills platform, providing a visual builder for creating and managing agent capabilities within the Microsoft 365 ecosystem [F4].

**Authoring format:** Visual drag-and-drop builder with code-behind support. Copilot Studio supports three extension mechanisms:

- **Tool Groups:** Curated sets of tools that define an agent's capabilities
- **MCP connections:** Direct integration with MCP servers for external data and actions
- **Plugins:** Power Platform connectors exposed as agent capabilities

**Generative orchestration:** Copilot Studio uses the underlying LLM to dynamically select which tools and plugins to invoke, rather than relying on hard-coded decision trees. This is a significant architectural distinction from traditional workflow builders [F4].

**Governance:** Full audit trail, role-based access control, DLP policies, and integration with Agent 365 for monitoring and compliance. Enterprise customers can control which skills are available to which agents and which users [F4].

---

## Skills Architecture Comparison

| Dimension | Claude Skills | Custom GPTs | Codex Skills | OpenClaw Skills | Copilot Studio |
|-----------|--------------|-------------|--------------|-----------------|----------------|
| **Format** | Markdown + YAML | System prompt + docs + Actions | Instructions + scripts | JS/TS code + skill.md | Visual builder + code |
| **Language** | Natural language | Natural language + OpenAPI | Shell/scripts | JavaScript/TypeScript | Low-code + Power Fx |
| **Code execution** | No (agent-mediated) | No (external API only) | Yes (scripts) | Yes (arbitrary) | Yes (Power Automate) |
| **Discovery** | Filesystem auto-scan | GPT Store search | Project-scoped | ClawHub registry | Power Platform catalog |
| **Distribution** | Git + Plugins marketplace | GPT Store | Git | ClawHub | Power Platform |
| **Security model** | Sandboxed via agent | API-only, no local access | Cloud sandbox | Unrestricted execution | Enterprise RBAC + DLP |
| **Marketplace size** | Growing catalog (Feb 2026) [1] | ~3M+ GPTs created (~159K active) [2] | N/A | 13,700+ skills [13] | 1,400+ connectors [F4] |
| **Best for** | Developer workflows | Consumer/prosumer | CI/CD automation | Power users, self-hosted | Enterprise M365 |

---

## Plugin Systems and Marketplaces

The distinction between "skills" and "plugins" is blurring. In practice, a plugin is a skill bundled with distribution metadata and, optionally, a connector to external services. The marketplace models differ substantially.

### Claude Plugins Marketplace

Launched February 2026, the Claude Plugins marketplace bundles skills with MCP connector integrations [1]. Anthropic also launched the Claude Marketplace in early March 2026, an e-commerce store for enterprise customers featuring Claude-powered services from partners including Snowflake, GitLab, Harvey AI, Rogo, Replit, and Lovable Labs [8]. The focus is on quality over quantity, with an approval process that reviews security, relevance, and compatibility. Plugins are installable via the Claude interface and automatically integrate with the skills auto-discovery system.

### GPT Store

The GPT Store is the largest AI agent marketplace by volume, with over 3M Custom GPTs created as of March 2026, though only approximately 159,000 are publicly listed and active in the store [2]. The sheer volume creates discoverability challenges -- finding high-quality GPTs requires filtering through significant noise. OpenAI introduced creator revenue sharing in mid-2025, creating economic incentives for quality, though most individual creators hit a soft ceiling of $100-500/month [2]. Enterprise customers can curate private stores with approved GPTs only.

### Google Extensions and Add-ons

Google's marketplace strategy routes through the existing Workspace Marketplace and the Chrome Web Store rather than a dedicated AI marketplace. Gemini extensions for Workspace are available as add-ons, and AI Studio-generated apps can be shared via URLs, but there is no centralized AI-specific marketplace comparable to the GPT Store [F3].

### Power Platform Marketplace

Microsoft's approach leverages the existing Power Platform connector ecosystem (1,400+ connectors), which now serves as the foundation for Copilot Studio plugins [F4]. This gives Microsoft a massive head start in enterprise integrations -- connectors for SAP, Salesforce, ServiceNow, and virtually every major enterprise system already exist. The trade-off is complexity: building and certifying Power Platform connectors requires more infrastructure than writing a Claude SKILL.md file.

---

## Scheduled Tasks and Event-Driven Automation

AI agents increasingly operate on schedules or in response to events, without human initiation. This represents a shift from "AI as tool" to "AI as autonomous worker."

### Claude Cowork Scheduled Tasks

Claude Cowork introduced native scheduled tasks via the `/schedule` command. Users can set tasks to run hourly, daily, weekly, or monthly. Scheduled tasks execute in the Cowork environment with full access to the user's configured tools and MCP servers [F1].

**Use cases:** Daily code review summaries, weekly dependency audit reports, monthly project health assessments. Tasks persist across sessions and can be managed via the Cowork interface.

**Practical considerations:** Scheduled tasks consume standard Cowork usage credits -- a scheduled daily summary uses the same compute as an equivalent interactive session. If a scheduled task fails (e.g., an MCP server is unreachable or a tool returns an error), Cowork logs the failure but does not automatically retry. Users must monitor task results and manually re-trigger failed runs. There is no built-in alerting for task failures, which limits reliability for mission-critical workflows [F1].

**Limitations:** Currently limited to Cowork (not available in Claude.ai chat or the API). No conditional triggering -- schedules are purely time-based. No task chaining (each scheduled task is independent). No retry mechanisms.

### ChatGPT Tasks

ChatGPT Tasks reached general availability in early 2026, available to Plus and Pro subscribers. Users can schedule up to 10 active tasks that ChatGPT executes autonomously at specified times [F2].

**Practical considerations:** Tasks run in the same environment as interactive ChatGPT sessions, meaning they have access to web browsing and code interpreter but not to external APIs or custom tools. Each task execution counts against the user's usage limits. Failed tasks produce a notification but do not retry automatically [F2].

**Limitations:** The 10-task cap is restrictive for power users. Tasks cannot trigger other tasks. No webhook or event-based triggers. No access to external tools beyond what ChatGPT natively supports (web browsing, code interpreter, DALL-E). No failure retry.

### Gemini Scheduled Actions

Google introduced Scheduled Actions for Gemini in March 2026, matching ChatGPT's scheduled task capability. Gemini's implementation benefits from deep integration with Google services -- scheduled tasks can interact with Calendar, Gmail, Drive, and other Google Workspace tools natively [F3]. This gives Gemini the broadest first-party service access of any scheduled task system -- a scheduled action can query Gmail, update a spreadsheet in Sheets, and create a Calendar event in a single run, without requiring third-party automation platforms.

### Event-Driven Patterns

True event-driven AI automation -- where an agent responds to a webhook, database change, or system event rather than a time-based schedule -- remains the least mature capability across AI platforms. Most platforms delegate event-driven workflows to the automation platforms discussed below. However, three native event-driven patterns have emerged:

**Codex repository event triggers.** OpenAI's Codex is the most event-driven native AI agent system. Codex Skills can trigger on specific repository events: pull request opened, pull request updated, issue created, issue labeled, and push to a monitored branch [F2]. Configuration is per-skill, with event filters that specify which events activate which skills. This makes Codex a viable CI/CD participant -- a skill can automatically review PRs, run linting, or generate release notes when triggered by repo activity.

**Power Automate webhook triggers.** Microsoft's Power Automate supports HTTP webhook triggers that can invoke flows containing Copilot Studio agent actions [F4]. This enables event-to-agent routing: an external system fires a webhook, Power Automate receives it, routes to the appropriate agent, and the agent executes autonomously. The pattern works for any system that can send HTTP requests -- CRM events, monitoring alerts, form submissions.

**MCP-mediated event patterns.** As MCP adoption grows (see [Module 06](MODULE-06-mcp-integration-layer.md)), a design pattern is emerging where MCP servers expose event subscription capabilities. An agent connects to an MCP server that watches for changes (new database rows, file modifications, message arrivals) and notifies the agent when events occur. This is not yet standardized in the MCP specification but is implemented in several community MCP servers.

The gap across all platforms is a unified event-to-agent routing layer. Today, connecting "when X happens" to "agent Y should respond" requires either platform-specific mechanisms (Codex events, Power Automate webhooks) or third-party automation platforms (Zapier, Make). No AI platform offers a general-purpose event subscription and routing system as a first-class feature.

### Scheduled Tasks Comparison

| Platform | Mechanism | Trigger Types | Limits | Key Gap |
|----------|-----------|---------------|--------|---------|
| **Zapier** | Zap scheduling + Zapier Agents | Time-based (cron-style intervals from 1 min to monthly); webhook; app-event triggers across 8,000+ integrations [3] | Free: 100 tasks/month, 5 Zaps. Professional: 750 tasks/month. Polling interval varies by tier (1-15 min) [3] | No native AI agent reasoning within Zaps -- AI features (Central, Agents) are separate products |
| **Make** | Scenario scheduling | Time-based (intervals from 1 min); webhook; app-event triggers across 3,000+ integrations; bidirectional MCP [4] | Free: 1,000 ops/month, 2 scenarios. Execution time limits per scenario vary by tier [4] | Smaller integration catalog than Zapier; enterprise governance less mature |
| **Power Automate** | Cloud Flows + Desktop Flows | Time-based; webhook/HTTP; data-change triggers; Teams events; button/manual; Agent Flows (Copilot Studio integration) [F4] | $15/user/month (Premium). AI Builder credits transitioning to consumption-based (bundled credits end Nov 2026) [5] | Per-user pricing expensive at scale; RPA desktop flows require separate licensing |
| **Claude Code (cron)** | `/schedule` command in Cowork | Time-based only (hourly, daily, weekly, monthly) [F1] | Consumes standard Cowork usage credits. No task cap documented, but each run uses full session compute [F1] | No conditional triggers, no retry on failure, no task chaining, no alerting. Cowork-only (not available in Claude.ai chat or API) |
| **OpenClaw** | Cron-style scheduling via Pi Agent Runtime; external orchestration | Time-based (system cron); filesystem/webhook watchers via custom skills [W20] | Self-hosted: limited by infrastructure. No built-in rate limiting or quota management | No managed scheduling service -- requires manual cron/systemd setup. No built-in monitoring or failure alerting |

> **Volatility warning:** Scheduled task capabilities are expanding rapidly. All four major platforms have announced or shipped scheduling features within a 6-month window (late 2025 to early 2026). Expect capabilities, limits, and pricing to change frequently.

---

## Automation Platforms: Zapier, Make, and Power Automate

For workflows that span multiple services -- "when X happens in system A, tell the AI to do Y, then update system B" -- dedicated automation platforms remain essential. These platforms serve as the connective tissue between AI agents and the broader software ecosystem.

### Zapier

Zapier is the breadth leader with 8,000+ app integrations [3]. Its AI evolution has been aggressive:

- **Zapier MCP Server:** GA as of early 2026, exposing Zapier's entire integration catalog as MCP tools. Any AI agent that speaks MCP can trigger Zapier automations [3]. See [Module 06](MODULE-06-mcp-integration-layer.md) for MCP integration details.
- **Zapier Central:** An AI-powered automation builder that lets users describe workflows in natural language and generates Zaps automatically.
- **Zapier Agents:** Autonomous AI agents that can monitor conditions and take actions across connected services.
- **Zapier Canvas:** Visual workflow designer for complex multi-step automations.

**Pricing:** Free tier (100 tasks/month, 5 Zaps). Professional starts at $29.99/month (750 tasks/month, unlimited Zaps). Team and Enterprise tiers available [3].

**Best for:** Maximum integration breadth, organizations with diverse SaaS stacks, teams that need AI-triggered automations across many services.

### Make (formerly Integromat)

Make positions itself as the cost-efficient alternative with 3,000+ app integrations and a visual scenario builder that exposes more architectural control than Zapier [4].

- **Bidirectional MCP:** Make supports both consuming MCP servers (calling external tools) and exposing Make scenarios as MCP tools (allowing AI agents to trigger Make workflows) [4].
- **Visual execution model:** Make's scenario builder shows data flow through each module, with built-in error handling, branching, and iteration. This appeals to users who want more control than Zapier's linear Zap model.
- **Cost advantage:** Make's operation-based pricing makes it roughly 10x cheaper than Zapier for high-volume workflows. A scenario that costs $30/month on Zapier might cost $3/month on Make for the same throughput [4].

**Pricing:** Free tier (1,000 ops/month, 2 scenarios). Core starts at $9/month (10,000 ops/month). Pro and Teams tiers available [4].

**Best for:** High-volume automations, teams that need granular workflow control, cost-sensitive organizations.

### Power Automate

Microsoft Power Automate is the enterprise automation incumbent, with 1,400+ connectors and deep integration with the Microsoft 365 ecosystem [F4].

**Flow types:**

- **Cloud Flows:** Event-driven automations triggered by data changes, schedules, or button clicks
- **Desktop Flows:** RPA (Robotic Process Automation) for automating legacy desktop applications
- **Teams Flows:** Automations triggered by and acting within Microsoft Teams
- **Agent Flows:** New flow type (2026) that integrates with Copilot Studio agents, enabling agents to trigger and manage Power Automate workflows [F4]

**AI Builder:** Power Automate includes AI Builder for adding AI capabilities (document processing, sentiment analysis, entity extraction) directly into flows. Note: AI Builder credits are transitioning from bundled to consumption-based pricing, with bundled credits ending November 2026 [5].

**Pricing:** $15/user/month for Power Automate Premium. Process mining and hosted RPA carry additional costs. Enterprise agreements often bundle Power Automate with Microsoft 365 E5 [F4].

**Best for:** Microsoft-centric enterprises, organizations needing RPA alongside AI automation, scenarios requiring enterprise governance and compliance controls.

---

## Automation Platform Comparison

| Dimension | Zapier | Make | Power Automate |
|-----------|--------|------|----------------|
| **Integrations** | 8,000+ apps | 3,000+ apps | 1,400+ connectors |
| **MCP support** | MCP server (GA) | Bidirectional MCP | Via Copilot Studio |
| **AI features** | Central, Agents, Canvas | AI scenario suggestions | AI Builder, Copilot integration |
| **Visual builder** | Linear (Zap editor) | Graph-based (scenario) | Flow designer + desktop recorder |
| **RPA support** | No | No | Yes (Desktop Flows) |
| **Starting price** | $29.99/mo (Professional) | $9/mo (Core) | $15/user/mo (Premium) |
| **Free tier** | 100 tasks/mo, 5 Zaps | 1,000 ops/mo, 2 scenarios | Limited (no premium connectors) |
| **Cost at scale** | Expensive | ~10x cheaper than Zapier | Variable (per-user + consumption) |
| **Governance** | Basic (team roles) | Basic (team roles) | Enterprise (RBAC, DLP, audit) |
| **Best ecosystem** | Multi-SaaS | Multi-SaaS (budget) | Microsoft 365 |

---

## Key Takeaways

1. **Skills are the new plugins.** Every major platform has converged on some form of reusable, packaged agent capability -- but implementations range from simple markdown files (Claude) to full code modules (OpenClaw) to visual builders (Copilot Studio).

2. **Security is the dividing line.** Claude Skills are safe by design (no code execution). OpenClaw Skills are powerful but dangerous (12-20% malicious rate on ClawHub). Copilot Studio provides enterprise governance. The security model should drive platform choice for any production deployment.

3. **Claude's skills approach is the most developer-friendly.** Filesystem-based, version-controllable, zero-infrastructure markdown files that compose with MCP servers. The trade-off is limited power compared to code-based alternatives.

4. **OpenAI has marketplace dominance but fragmented skills.** Custom GPTs and Codex Skills are separate systems with different authoring models, distribution channels, and capabilities. The GPT Store's 3M+ entries create discoverability problems.

5. **Google is betting on platform integration over a skills ecosystem.** No dedicated skills framework -- instead, AI Chips, Extensions, and deep Google service integration. This works well inside Google's ecosystem but limits third-party extensibility.

6. **Microsoft has the strongest enterprise story.** Copilot Studio + Power Platform + Agent 365 provides governance, compliance, and integration breadth that no other platform matches for large organizations.

7. **Scheduled tasks are table stakes.** All four platforms now offer time-based task scheduling. Event-driven automation still requires third-party platforms (Zapier, Make, Power Automate) or Codex's repo-event triggers.

8. **Zapier MCP is the universal bridge.** For any AI agent that supports MCP, Zapier's 8,000+ integrations are accessible as tools -- making it the de facto integration multiplier across the ecosystem.

9. **Make is the cost play.** For high-volume automations, Make is roughly 10x cheaper than Zapier with comparable capabilities and better visual workflow design.

10. **The automation stack is converging.** The line between "AI skill," "plugin," "automation," and "integration" is dissolving. By late 2026, expect these categories to merge further as MCP adoption matures and platforms add native event-driven capabilities.

---

## Cross-References

- [Module 03: Single-Agent Systems](MODULE-03-single-agent-systems.md) -- the agents that consume and execute skills
- [Module 04: Multi-Agent Orchestration](MODULE-04-multi-agent-orchestration.md) -- how orchestration frameworks consume skills across agent teams
- [Module 05: OpenClaw & Open Agent Ecosystem](MODULE-05-openclaw-and-open-agents.md) -- ClawHub security analysis and OpenClaw skill architecture details
- [Module 06: MCP & the Integration Layer](MODULE-06-mcp-integration-layer.md) -- the protocol layer underlying many skills and all MCP-based automation
- [Module 08: Consumer AI Comparison](MODULE-08-consumer-ai-comparison.md) -- scheduled tasks and automation as consumer platform differentiators
- [Module 09: Developer Platforms & APIs](MODULE-09-developer-platforms-apis.md) -- API-level function calling and tool use that skills build upon
- [Module 10: Frontier Topics](MODULE-10-frontier-topics.md) -- enterprise governance implications for skill deployment and automation

---

## Sources

1. Anthropic Expands Claude With Enterprise Plugins and Marketplace (gHacks), February 2026. https://www.ghacks.net/2026/02/25/anthropic-expands-claude-with-enterprise-plugins-and-marketplace/ — see W42 in SOURCES.md (related)
2. GPT Store Statistics and Growth (OpenAI Blog), 2026. https://openai.com/index/gpt-store/ — W43 in SOURCES.md
3. Zapier Platform and MCP Integration, 2026. https://zapier.com/platform — W44 in SOURCES.md
4. Make Platform and Pricing, 2026. https://www.make.com/en/pricing — W45 in SOURCES.md
5. Power Automate AI Builder Credits Transition (Microsoft Learn), 2026. https://learn.microsoft.com/en-us/ai-builder/credit-management — W46 in SOURCES.md
6. OWASP Top 10 for LLM Applications: Prompt Injection. https://owasp.org/www-community/attacks/PromptInjection — W74 in SOURCES.md
7. OpenAI on Prompt Injection Risks (Fortune), December 2025. https://fortune.com/2025/12/23/openai-ai-browser-prompt-injections-cybersecurity-hackers/ — W75 in SOURCES.md
8. Anthropic Launches Claude Marketplace (SiliconANGLE), March 2026. https://siliconangle.com/2026/03/06/anthropic-launches-claude-marketplace-third-party-cloud-services/ — W76 in SOURCES.md
9. OpenClaw GitHub Repository. https://github.com/openclaw/openclaw — W20 in SOURCES.md
10. ClawHavoc Supply Chain Attack Analysis (Koi Security). https://koi.security/blog/clawhavoc-analyzing-supply-chain-attack-clawhub — W21 in SOURCES.md
11. ClawJacked WebSocket Vulnerability. https://www.bleepingcomputer.com/news/security/clawjacked-openclaw-websocket-hijacking-flaw/ — W24 in SOURCES.md
12. OpenClaw/ClawHub Malicious Skills Audit (Snyk). https://snyk.io/blog/openclaw-clawhub-security-malicious-skills/ — W25 in SOURCES.md
13. ClawHub Skills Registry. https://clawhub.dev — W40 in SOURCES.md

**Foundation profiles cited as [F1]-[F4]:**
- [F1] Anthropic/Claude Ecosystem Profile (reference/profiles/anthropic-claude.md), March 18, 2026
- [F2] OpenAI/ChatGPT Ecosystem Profile (reference/profiles/openai-chatgpt.md), March 18, 2026
- [F3] Google/Gemini Ecosystem Profile (reference/profiles/google-gemini.md), March 18, 2026
- [F4] Microsoft/Copilot Ecosystem Profile (reference/profiles/microsoft-copilot.md), March 18, 2026
