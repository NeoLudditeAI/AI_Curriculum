# Anthropic / Claude — Comprehensive Ecosystem Profile

**Date:** March 18, 2026
**Source:** Ecosystem research, March 18, 2026
**Status:** Complete

---

## 1. Executive Summary

Anthropic's Claude ecosystem has evolved from a single chatbot into a full-stack AI platform encompassing consumer apps, developer APIs, agentic automation tools, and an ambitious integration layer (MCP). As of March 2026, Anthropic is valued at $380 billion following a $30B Series G, with $14B in annualized revenue driven primarily by enterprise customers. The single most important development is the convergence of Cowork, Claude Code, MCP, Skills, Plugins, and Scheduled Tasks into a unified autonomous agent platform — Claude can now operate your desktop, browse the web, read/write local files, connect to 50+ external services, and run tasks on a schedule without human initiation. This positions Claude not just as a chat assistant but as an autonomous digital worker.

---

## 2. Company & Ecosystem Overview

### Company Profile
- **Name:** Anthropic, PBC
- **Headquarters:** San Francisco, CA (offices in New York, London, Tokyo, Bengaluru)
- **Founded:** 2021
- **CEO:** Dario Amodei
- **President:** Daniela Amodei
- **Funding:** $30B Series G (closed February 12, 2026), led by GIC and Coatue. Second-largest venture deal of all time.
- **Valuation:** $380B post-money (March 2026)
- **Revenue:** ~$14B annualized (up from ~$10B in 2025)
- **Employees:** ~1,500+
- **Customer mix:** ~80% enterprise

### Complete Product Map

| Product | Category | Status |
|---------|----------|--------|
| Claude.ai (web) | Consumer AI chat | GA |
| Claude Desktop (Mac/Windows) | Desktop AI assistant | GA |
| Claude Mobile (iOS/Android) | Mobile AI assistant | GA |
| Claude Cowork | Agentic desktop automation | Research Preview |
| Claude Code | Terminal-based agentic coding | GA |
| Claude in Chrome | Browser automation agent | Beta |
| Claude for Excel | Spreadsheet AI add-in | GA (updated March 2026) |
| Claude for PowerPoint | Presentation AI add-in | Research Preview (Feb 2026) |
| Claude Agent SDK (Python/TypeScript) | Developer agent framework | GA |
| Agent Teams | Multi-agent orchestration | Experimental |
| Claude API / Developer Platform | API access to all models | GA |
| MCP (Model Context Protocol) | Open integration standard | GA |
| MCP Registry | Server discovery directory | GA |
| Skills | Reusable custom workflows | GA |
| Plugins | Bundled skills + connectors | GA (marketplace launched Feb 2026) |
| Scheduled Tasks | Automated recurring workflows | GA (Cowork) |
| Artifacts | Interactive document creation | GA |
| Projects | Collaborative workspaces | GA |
| Claude Code Security | Vulnerability scanning | GA |
| Remote Control | Mobile access to Code sessions | Research Preview |
| Claude Partner Network | Enterprise partner program | GA (launched 2026) |
| Compliance API | Enterprise audit/governance | GA |
| Analytics API | Enterprise usage metrics | GA |

### Business Model
- **Consumer subscriptions:** Free, Pro ($20/mo), Max ($100–$200/mo)
- **Business subscriptions:** Team ($25/seat/mo), Enterprise (custom)
- **API usage:** Pay-per-token across all models
- **Web search API:** $10/1,000 searches
- **Claude Partner Network:** $100M commitment for partner training and certification

---

## 3. Core AI Models & Capabilities

### Full Model Lineup (March 2026)

| Model | Released | Context Window | Max Output | Input $/MTok | Output $/MTok | Key Strengths |
|-------|----------|---------------|------------|-------------|--------------|---------------|
| **Claude Opus 4.6** | Feb 5, 2026 | 1M tokens | 128K tokens | $5 | $25 | Deep reasoning, long-horizon tasks, coding, multi-step work |
| **Claude Sonnet 4.6** | Feb 17, 2026 | 1M tokens (beta) | 128K tokens | $3 | $15 | Near-Opus performance, improved computer use, excellent instruction following |
| **Claude Haiku 4.5** | Oct 15, 2025 | 200K tokens | 64K tokens | $1 | $5 | Fastest, near-Sonnet-4 performance, 3x cheaper |
| Claude Sonnet 4.5 | Legacy | 200K tokens | 128K tokens | $3 | $15 | Balanced performance |
| Claude Opus 4.5 | Legacy | 200K tokens | 128K tokens | $5 | $25 | Previous flagship |
| Claude Opus 4.1 | Legacy | 200K tokens | 128K tokens | $15 | $75 | Deprecated pricing tier |

### Key Model Features
- **Extended thinking:** Available on Opus 4.6, Sonnet 4.6, and Haiku 4.5 (GA)
- **1M token context:** GA for Opus 4.6 and Sonnet 4.6 at standard pricing (no long-context premium as of March 14, 2026)
- **Multimodal:** Text + image input on all models; PDF processing; no native audio/video input on API
- **Computer use:** Supported on all current models; Sonnet 4.6 has "dramatically improved" computer use capabilities
- **Context awareness:** Haiku 4.5+ can track remaining context window mid-conversation

### Pricing Efficiency Features
- **Prompt caching:** Cache hits cost 10% of standard input price
- **Batch API:** 50% discount on input and output tokens for async processing
- **Code execution:** Free when used with web search or web fetch tools

### Benchmark Highlights
- Opus 4.6: Top-tier on complex reasoning and coding benchmarks
- Sonnet 4.6: Closes gap with Opus significantly; near-Opus on coding, document comprehension, office tasks
- Haiku 4.5: 73.3% SWE-bench Verified (surpasses Sonnet 4); 50.7% computer-use benchmark (vs. 42.2% for Sonnet 4)

---

## 4. Consumer Products — Exhaustive Feature Inventory

### Claude.ai (Web App)

**Platform:** Web browser (all major browsers)
**Pricing:** Free (limited), Pro ($20/mo), Max ($100–$200/mo)

**Chat / Conversation:**
- Multi-turn conversation with full model lineup (GA)
- Extended thinking for complex reasoning (GA)
- 1M token context window on Opus 4.6 / Sonnet 4.6 (GA)
- In-line custom charts, diagrams, and visualizations (GA, March 2026)
- Voice input via push-to-talk (GA)
- 5 voice options for text-to-speech output (GA)

**Document Handling:**
- Upload: PDF, DOCX, XLSX, PPTX, TXT, CSV, images (GA)
- Create: .docx, .pptx, .xlsx, .pdf files — downloadable or save to Google Drive (GA, free for all users since Feb 11, 2026)
- Max file size: 30MB upload/download
- Working Excel formulas, charts, financial models (GA)

**Image Generation & Editing:**
- Image understanding and analysis (GA)
- No native image generation (relies on third-party integrations)

**Code Generation & Execution:**
- Sandboxed code execution environment (GA)
- Python, JavaScript, and other languages in sandbox
- Claude Code for terminal-based development (GA, included with Max)

**Web Browsing & Search:**
- Built-in web search in conversation (GA)
- Dynamic filtering of search results via code execution (GA, March 2026)

**Data Analysis & Visualization:**
- Upload CSV/Excel for analysis (GA)
- Chart and visualization generation inline (GA, March 2026)
- Working formulas in generated spreadsheets (GA)

**Memory & Personalization:**
- Chat Memory: Automatically processes conversations every ~24 hours, stores profession, language preferences, recurring context (GA, all plans, March 2026)
- Memory profile loaded into every future conversation
- Per-project context via Projects (GA)

**Collaboration:**
- Projects: Shared workspaces with custom instructions, file uploads, team access (GA)
- Artifact sharing via public link (no Claude account needed) (GA)
- Team plan shared workspace (GA)

**File Creation Capabilities:**
- Excel (.xlsx) with working formulas and charts (GA)
- PowerPoint (.pptx) presentations (GA)
- Word (.docx) documents (GA)
- PDF files (GA)
- HTML, React apps, SVG, Mermaid diagrams via Artifacts (GA)

### Claude Desktop App (Mac & Windows)

**Platforms:** macOS, Windows (Windows launched Feb 10, 2026 with full feature parity)
**Pricing:** Free with Claude account; Cowork requires paid plan

**All web app features plus:**
- Quick entry / dock access for instant queries (GA)
- Desktop extensions for local tool/file connectivity (GA)
- MCP server connections for local integrations (GA)
- Cowork mode for agentic desktop automation (Research Preview, paid plans only)
- Scheduled Tasks (GA, via Cowork)
- Skills and Plugins (GA)
- Local file access without upload (GA, via Cowork)

### Claude Mobile (iOS & Android)

**Platforms:** iOS, Android (full feature parity)
**Pricing:** Free with Claude account

**Features:**
- Full chat with all models (GA)
- Voice mode with 5 voice options and push-to-talk (GA)
- Vision / camera input (GA)
- Artifacts creation and viewing (GA)
- File creation and editing (GA, paid plans)
- Health data analytics — activity patterns, workout trends, sleep quality (GA, Pro/Max)
- Device integration — draft calendar events, find locations, manage reminders (GA, iOS)
- Remote Control for Claude Code sessions (Research Preview, Max plan)
- Cross-device sync of conversations, projects, memory (GA)

---

## 5. Specialized Tools & Sub-Products

### Cowork (Research Preview)
- **Purpose:** Agentic desktop automation — Claude operates your computer to complete multi-step knowledge work
- **Status:** Research Preview (paid plans: Pro, Max, Team, Enterprise)
- **Architecture:** Runs in isolated VM on local machine; uses same agentic architecture as Claude Code
- **Key Capabilities:**
  - Direct local file access — read/write without manual upload/download (GA)
  - Multi-step task execution with planning and progress updates (GA)
  - Sub-agent coordination for parallel workstreams (GA)
  - Global and folder-specific instructions for personalized behavior (GA)
  - MCP connector access to 50+ external services (GA)
  - Paired with Claude in Chrome for browser-based tasks (GA)
  - Scheduled Tasks for automated recurring workflows (GA)
  - Skills and Plugins for extensibility (GA)
- **Limitations:** Runs locally (computer must be awake); Research Preview stability; one active session at a time

### Claude Code (GA)
- **Purpose:** Terminal-based agentic coding assistant
- **Status:** GA; included with Pro, Max, Team, Enterprise plans
- **Key Capabilities:**
  - Read entire codebases; execute multi-file operations (GA)
  - Push-to-talk voice mode via `/voice` command (GA, March 2026)
  - Recurring tasks with `/loop` command (GA)
  - 1M token context window with Opus 4.6 default (GA)
  - Agent Teams — orchestrate multiple Claude Code sessions (Experimental)
  - Remote Control — continue sessions from browser/mobile (Research Preview)
  - Session Memory — automatic cross-session context persistence (GA)
  - CLAUDE.md files for persistent project instructions (GA)
  - Skills via SKILL.md files (GA)
  - MCP server connections (GA)
  - Sandboxing with OS-level filesystem and network isolation (GA)
  - Claude Code Security — vulnerability scanning and patch suggestions (GA)
  - Claude Code on the web at claude.ai/code (GA)

### Agent SDK (GA)
- **Purpose:** Build custom agents powered by Claude Code's architecture
- **Status:** GA (released September 2025, renamed from Claude Code SDK)
- **Languages:** Python and TypeScript
- **Architecture:** Three-phase agentic loop: Gather Context → Take Action → Verify Work → Repeat
- **Built-in tools:** File reading, command execution, code editing
- **Use cases:** Finance automation, research agents, support agents, enterprise workflows

### Agent Teams (Experimental)
- **Purpose:** Multi-agent orchestration in Claude Code
- **Status:** Experimental (disabled by default; enable via `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS`)
- **Architecture:** One lead session coordinates; teammates work independently in own context windows; direct inter-agent communication (unlike subagents)
- **Best for:** Parallel research, new feature development, debugging with competing hypotheses, cross-layer coordination (frontend/backend/tests)

### Claude in Chrome (Beta)
- **Purpose:** Browser automation agent
- **Status:** Beta (all paid plans; Pro limited to Haiku 4.5; Max/Team/Enterprise can choose model)
- **Key Capabilities:**
  - Navigate, click, fill forms in browser (GA)
  - Workflow recording — teach Claude by doing, then it repeats (GA)
  - Scheduled browser tasks (GA)
  - Multi-tab management — drag tabs into Claude's tab group (GA)
  - Pre-approval planning — approve plan, then hands-off execution (GA)
  - Integration with Cowork and Claude Desktop (GA)

### Claude for Excel (GA)
- **Purpose:** AI spreadsheet assistant as Microsoft add-in
- **Status:** GA (updated March 2026 with Opus 4.6 and new editing tools)
- **Key Capabilities:**
  - Read complex multi-tab workbooks (GA)
  - Cell-level citations when explaining calculations (GA)
  - Update assumptions while preserving formula dependencies (GA)
  - Agent Mode inside Excel (GA)
  - Reusable Skills (including prebuilt financial services skills: DCF, LBO, investment banking) (GA)
  - Cross-app shared context with PowerPoint (GA, March 2026)
  - LLM gateway support: Amazon Bedrock, Vertex AI, Microsoft Foundry (GA, March 2026)

### Claude for PowerPoint (Research Preview)
- **Purpose:** AI presentation assistant as Microsoft add-in
- **Status:** Research Preview (launched Feb 5, 2026)
- **Key Capabilities:**
  - Create and edit presentations from natural language (Research Preview)
  - Pull data from Excel into slides (GA, March 2026)
  - Shared context with Excel add-in (GA, March 2026)
  - Reusable Skills for presentation workflows (GA)

### Artifacts (GA)
- **Purpose:** Interactive document/app creation within Claude conversations
- **Status:** GA (free for all users)
- **Supported formats:** HTML, React apps, SVG, Mermaid diagrams, code snippets, markdown
- **Key Capabilities:**
  - Persistent storage across sessions — up to 20MB per artifact (GA)
  - Direct API calls from artifacts (GA)
  - MCP integrations within artifacts (GA)
  - Shareable via public link (no Claude account needed) (GA)
  - Artifact Catalog for discovery (GA)

### Projects (GA)
- **Purpose:** Collaborative workspaces with persistent context
- **Status:** GA (free for all users as of 2026)
- **Key Capabilities:**
  - Custom instructions per project (GA)
  - File uploads for background context (GA)
  - Team collaboration (Team/Enterprise plans) (GA)
  - Per-project Claude customization (GA)

### Claude Code Security (GA)
- **Purpose:** Automated vulnerability scanning and patch generation
- **Status:** GA
- **Capabilities:** Scans codebases for security vulnerabilities; suggests targeted patches for human review

### Remote Control (Research Preview)
- **Purpose:** Access Claude Code sessions from any device
- **Status:** Research Preview (Pro and Max plans)
- **Architecture:** Local session makes outbound HTTPS only; end-to-end encrypted; Anthropic does not see code
- **Limitations:** One session at a time; computer must be running and awake

---

## 6. Developer & API Platform

### API Access
- **Base URL:** api.anthropic.com
- **Models available:** Opus 4.6, Sonnet 4.6, Haiku 4.5 (plus legacy models)
- **Authentication:** API key
- **Also available via:** Amazon Bedrock, Google Vertex AI, Microsoft Foundry

### Token Pricing (March 2026)

| Model | Input ($/MTok) | Output ($/MTok) | Cache Hit ($/MTok) | Batch Input | Batch Output |
|-------|----------------|-----------------|---------------------|-------------|-------------|
| Opus 4.6 | $5.00 | $25.00 | $0.50 | $2.50 | $12.50 |
| Sonnet 4.6 | $3.00 | $15.00 | $0.30 | $1.50 | $7.50 |
| Haiku 4.5 | $1.00 | $5.00 | $0.10 | $0.50 | $2.50 |

### Developer Features
- **Tool use / function calling:** GA — define tools with JSON schemas; Claude decides when to call them
- **Structured outputs:** Public Beta — enforce JSON schema conformance on responses; `strict: true` for guaranteed schema validation
- **Web search tool:** GA — `web_search_20260209`; $10/1,000 searches; dynamic filtering with code execution
- **Web fetch tool:** GA — `web_fetch_20260209`; fetch and process web pages
- **Code execution tool:** GA — sandboxed Bash environment; free when paired with web search/fetch
- **Streaming:** GA — server-sent events for real-time token streaming
- **Batch API:** GA — `/v1/messages/batches`; 50% token discount for async processing
- **Prompt caching:** GA — cache hits at 10% of input cost
- **Extended thinking:** GA — models reason step-by-step before responding
- **Vision:** GA — image input alongside text
- **PDF processing:** GA — native PDF understanding
- **Embeddings:** Not offered natively (use third-party providers)
- **Vector search:** Not offered natively

### SDKs
- Python (`anthropic` package) (GA)
- TypeScript/Node.js (`@anthropic-ai/sdk`) (GA)
- Agent SDK — Python (`claude-agent-sdk-python`) and TypeScript (`claude-agent-sdk-typescript`) (GA)

### Rate Limits
Vary by plan tier and model. Enterprise and high-volume API customers get custom rate limits. Standard tiers have per-minute token and request limits documented in API docs.

---

## 7. Integration & Connectivity Ecosystem

### 7a. MCP (Model Context Protocol) — CRITICAL

MCP is Anthropic's open integration standard, functioning as a universal protocol for connecting AI assistants to external tools and data sources. It has become the de facto standard adopted across the industry.

**Claude as MCP Client:**
- Claude Desktop, Cowork, and Claude Code all connect to MCP servers (GA)
- Multiple simultaneous server connections supported
- Configuration via `claude_desktop_config.json` or project settings

**Official Reference MCP Servers:**
| Server | Purpose |
|--------|---------|
| Filesystem | Secure local file read/write operations |
| Git | Repository management tools |
| GitHub | Issues, PRs, code search, workflow management |
| Fetch | Web content fetching and processing |
| Memory | Knowledge graph-based persistent memory |
| Sequential Thinking | Dynamic problem-solving framework |
| Time | Time and timezone utilities |
| Everything | Reference/test server |
| Playwright | Browser automation and web scraping |
| PostgreSQL | Database exploration and querying |

**MCP Registry:**
- Official registry at `registry.modelcontextprotocol.io` (GA)
- Functions as root authority verifying namespaces and enforcing uniqueness
- Intentionally minimal — canonical metadata; leaves UX to third-party directories

**Community MCP Ecosystem:**
- 1,200+ MCP servers available across community directories
- Key directories: mcp.so, Smithery, mcpservers.org, awesome-mcp-servers (GitHub)
- Major platforms with MCP servers: Airtable, Notion, Slack, Google Drive, Gmail, GitHub, Figma, Asana, Salesforce, Canva, and many more
- Rube: MCP server connecting to 500+ apps via unified interface

**MCP Adoption by Other AI Platforms:**
MCP has been adopted beyond Anthropic — supported by OpenAI, Google, Cursor, Windsurf, and other AI tools as a shared standard.

### 7b. Native Integrations (Connectors Directory)

As of February 2026, Claude's Connectors Directory includes 50+ integrations:

**Productivity & Communication:**
- Google Workspace (Gmail, Calendar, Drive, Docs, Sheets) (GA)
- Slack (full two-way; DMs, AI assistant panel, @mentions, Interactive Apps) (GA, Jan 2026)
- Notion (search, create pages, manage databases via MCP) (GA)
- Asana (task management integration) (GA)
- Box (cloud storage) (GA)

**Design:**
- Canva (AI-powered design assistance) (GA)
- Figma (design file access via MCP) (GA)

**Development:**
- GitHub (repos, issues, PRs, code search) (GA)
- Jira (project management) (GA)

**Finance:**
- QuickBooks (via MCP/Zapier connectors)

**CRM:**
- Salesforce (enterprise integration) (GA)

**Storage:**
- Google Drive (native connector) (GA)
- Local filesystem (via Cowork/MCP) (GA)

**Microsoft Office:**
- Excel (native add-in) (GA)
- PowerPoint (native add-in) (Research Preview)
- Outlook (via MCP server — email MCP server supports Outlook, Gmail, Yahoo, and others)

### 7c. Automation Platforms

**Zapier:**
- Full integration with Opus 4.6 and Sonnet 4.6 available (GA)
- Zapier MCP: Bridges Claude to 500+ apps; currently in beta, free on all Zapier plans
- Triggers and actions: send messages to Claude, generate content, summarize, integrate across apps

**Make (Integromat):**
- Anthropic Claude module available (GA)
- Visual workflow builder with Claude integration

**n8n:**
- Batch processing templates with Claude API available
- Community nodes for Anthropic integration

**Power Automate:** Limited; primarily through API calls
**IFTTT:** Not natively supported
**Pipedream:** API integration available

### 7d. Browser Extensions & Plugins

- **Claude in Chrome:** Full browser automation agent (Beta) — navigate, click, fill forms, record workflows, scheduled tasks, multi-tab management
- **Claude for Chrome sidebar:** Side panel for browsing assistance
- **Firefox/Safari/Edge:** Not available as dedicated extensions

---

## 8. Agentic & Automation Capabilities

### Autonomous Agents
- **Cowork:** Operates desktop autonomously — plans work, executes multi-step tasks, loops user in on progress (Research Preview)
- **Claude Code:** Autonomous terminal agent — reads codebases, executes operations, makes architectural decisions (GA)
- **Claude in Chrome:** Autonomous browser agent — navigates, fills forms, completes web workflows (Beta)

### Computer Use / Browser Control
- All current models support computer use (GA via API; integrated in Cowork and Chrome)
- Sonnet 4.6 has "dramatically improved" computer use — operating software, navigating browsers, filling forms
- Haiku 4.5 scores 50.7% on computer-use benchmarks (best in lineup)

### Multi-Agent Systems
- **Agent Teams:** Multiple Claude Code sessions collaborating with direct inter-agent communication (Experimental)
- **Sub-agents:** Single-session child agents within Cowork for parallel workstreams (GA)
- **Agent SDK:** Build custom multi-agent systems in Python/TypeScript (GA)

### Agent Monitoring & Safety
- Pre-approval planning in Chrome — approve plan, then hands-off execution (GA)
- Sandboxing with OS-level filesystem and network isolation (GA)
- Human-in-the-loop by default; configurable autonomy levels

### Scheduled / Recurring Tasks
- Available via Cowork in Claude Desktop (GA)
- Schedule: hourly, daily, weekly, or custom intervals
- Each run gets fresh session with full access to files, MCP servers, skills, connectors, plugins
- **Limitation:** Computer must be running and awake; if it sleeps, scheduled task misses
- Examples: daily email digest, weekly project status, automated report generation

### Event-Driven Triggers
- Via Zapier/Make integrations (new email, file change, etc.)
- Claude in Chrome can watch for browser events
- MCP servers can provide event-based data

### Custom Workflows / Skills
- **Skills:** Reusable workflows defined in markdown (SKILL.md); invoke with `/skill-name`
- **Plugins:** Bundles of skills + connectors + sub-agents; installable from Plugin Marketplace (launched Feb 2026)
- **Enterprise plugins:** Private marketplace, admin-controlled installation, auto-install for new team members
- **Organization-wide management:** Team and Enterprise plans can manage skills centrally
- **Agent Skills open standard:** Skills designed to work across AI platforms

### File System Access
- Full local file read/write via Cowork (GA)
- Filesystem MCP server for structured file operations (GA)
- Claude Code: Full access to project directory and configurable paths (GA)

### Remote Machine Control
- Remote Control: Access Claude Code sessions from browser/mobile while execution stays local (Research Preview)
- No direct remote desktop/VM control of other machines (possible via API + computer use tool)

---

## 9. Pricing Deep Dive

### Consumer & Business Plans

| Tier | Monthly | Annual | Users | Key Inclusions | Key Exclusions |
|------|---------|--------|-------|----------------|----------------|
| **Free** | $0 | $0 | 1 | Basic chat, ~30-100 msgs/day, Artifacts, Projects, file creation, Sonnet 4.6 | No Opus, no Cowork, no Claude Code, limited usage |
| **Pro** | $20 | $240/yr | 1 | All models, 5x Free usage, Claude Code, Cowork, Claude in Chrome (Haiku only), Google Workspace connectors, file creation | No priority access, lower limits, Chrome limited to Haiku |
| **Max 5x** | $100 | N/A (monthly only) | 1 | 25x Free capacity, all Pro features, priority access, early features, Claude in Chrome (all models), Claude for PowerPoint | — |
| **Max 20x** | $200 | N/A (monthly only) | 1 | 100x Free capacity, all Max 5x features, priority during peak, Remote Control | — |
| **Team** | $25/seat | ~$300/seat/yr | 5+ min | All Pro features, shared workspace, admin controls, higher limits, Claude Code with admin visibility | Requires 5+ seats minimum |
| **Enterprise** | Custom | Custom | Custom | Everything in Team + 400K+ context, SCIM, audit logs, Compliance API, Analytics API, private plugin marketplace, custom rate limits, dedicated support | Contact sales |

### API Pricing

| Item | Price |
|------|-------|
| Opus 4.6 input | $5.00/MTok |
| Opus 4.6 output | $25.00/MTok |
| Sonnet 4.6 input | $3.00/MTok |
| Sonnet 4.6 output | $15.00/MTok |
| Haiku 4.5 input | $1.00/MTok |
| Haiku 4.5 output | $5.00/MTok |
| Prompt cache hit | 10% of input price |
| Batch API | 50% discount on all tokens |
| Web search | $10/1,000 searches |
| Code execution | Free with web search/fetch |

---

## 10. Competitive Position

### Head-to-Head Comparison

| Dimension | Claude | ChatGPT | Gemini | Copilot |
|-----------|--------|---------|--------|---------|
| **Writing quality** | Best in class — wins blind tests consistently | Strong but more formulaic | Consistent second place | Adequate, enterprise-focused |
| **Coding** | Top tier — 78% Reddit preference; strongest long-context | Strong with GPT-4.5 | Competitive with Gemini 2.5 | GitHub Copilot dominates IDE |
| **Reasoning** | Opus 4.6 leads on complex tasks | o3 competitive on math/logic | Gemini 2.5 Pro strong | Relies on OpenAI models |
| **Agentic capabilities** | Most advanced — Cowork + Code + Chrome + Agent Teams | Operator for web tasks | Project Astra early | Copilot Studio for enterprise |
| **Integrations** | MCP ecosystem (1,200+ servers); 50+ native connectors | Plugin ecosystem; GPT Store | Deep Google Workspace native | Deep Microsoft 365 native |
| **Enterprise** | Strong — Compliance API, SCIM, audit logs | Enterprise tier available | Vertex AI enterprise | M365 Copilot entrenched |
| **Pricing (Pro)** | $20/mo | $20/mo | $20/mo | $30/user/mo (M365 Copilot) |
| **Hallucination rate** | Lowest — most likely to admit uncertainty | Moderate | Moderate | Varies by underlying model |

### Unique Differentiators (Only Claude Offers)
1. **MCP as open standard** — Claude created and champions the integration protocol now adopted industry-wide
2. **Cowork desktop agent** — No competitor offers a full desktop VM agent with local file access, scheduled tasks, and plugin marketplace
3. **Claude Code + Agent Teams** — Terminal-based agentic coding with multi-agent orchestration
4. **Skills + Plugins architecture** — Reusable, shareable, enterprise-manageable workflow bundles
5. **Cross-app Office add-ins** — Shared context between Excel and PowerPoint with reusable Skills
6. **Constitutional AI safety approach** — Unique safety methodology; lowest hallucination rates

### Known Weaknesses & Gaps
- **No native image generation** — Must use third-party tools (Canva, Midjourney) unlike ChatGPT (DALL-E) or Gemini (Imagen)
- **No native video generation** — ChatGPT has Sora; Gemini has Veo
- **No native audio generation** — No music or audio creation tools
- **No native embeddings API** — Must use third-party for vector search
- **Cowork still Research Preview** — Stability concerns for production use
- **Agent Teams experimental** — Not production-ready
- **No browser extension beyond Chrome** — Firefox, Safari, Edge users underserved
- **Scheduled Tasks require awake computer** — No cloud-based scheduling option
- **Team plan requires 5 seats minimum** — Bad fit for 2–4 person teams

### User Sentiment (2025–2026)
- **Reddit consensus:** Claude wins coding (78% preference) and writing; ChatGPT wins general research
- **Developer community:** Claude Code widely praised; Agent SDK adoption growing rapidly
- **Enterprise:** Strong adoption — 80% of Anthropic revenue from enterprise
- **Complaints:** Usage limits on Pro feel restrictive; Cowork preview can be "flaky"; scheduled tasks unreliable when machine sleeps

---

_Cleaned for AI Frontier Curriculum project. Business-specific application content removed. All platform intelligence retained._
