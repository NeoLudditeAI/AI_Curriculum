# OpenAI / ChatGPT — Comprehensive Ecosystem Profile

**Date:** March 18, 2026
**Source:** Ecosystem research, March 18, 2026
**Status:** COMPLETE — Verified via extensive web research

---

## 1. Executive Summary

OpenAI is the largest and most well-funded AI company in the world, valued at $730 billion after a record $110 billion raise in February 2026. ChatGPT remains the most-used AI consumer product with 900M+ weekly active users and 50M+ paying consumer subscribers, though market share has declined from ~60% to under 45% amid user backlash over model churn and over-alignment. The ecosystem has expanded aggressively: GPT-5.4 (with a 1M-token context window) launched March 5, 2026, with Mini and Nano variants dropping March 17. Consumer products now include ChatGPT Agent (formerly Operator) for autonomous web browsing, Sora 2 for video generation with Disney character licensing, Codex as a full cloud-based coding agent with desktop apps, and Deep Research with MCP integration. The single most important development: OpenAI is shipping at an unprecedented pace — GPT-5 through GPT-5.4 all landed within roughly 12 months — but this velocity is creating upgrade fatigue and breaking user workflows, with 1.5M+ subscription cancellations in March 2026 alone.

---

## 2. Company & Ecosystem Overview

### Company Profile
- **Company:** OpenAI, Inc. (transitioned from nonprofit to for-profit structure)
- **Headquarters:** San Francisco, California
- **Founded:** December 2015
- **CEO:** Sam Altman
- **Key Leadership:** Brad Lightcap (COO/President), Mark Chen (SVP Research)
- **Valuation:** $730B pre-money (Feb 2026); previously ~$300B (early 2025), $157B (Oct 2024)
- **Latest Funding:** $110B round (Feb 2026) — Amazon $50B, Nvidia $30B, SoftBank $30B. Total raised: $168B across 11 rounds from 68 investors
- **Revenue:** ~$25B annualized (Feb 2026), up from ~$20B end-2025. Projecting $280B by 2030
- **Users:** 900M+ weekly active users; 50M+ consumer subscribers; 9M+ paying business users (up from 5M in Aug 2025)
- **Market Position:** Dominant consumer AI brand but losing share to Claude, Gemini, and others

### Complete Product Map

| Category | Products | Status |
|----------|----------|--------|
| **Consumer AI** | ChatGPT (Web, Mac, Windows, iOS, Android), ChatGPT Go, Advanced Voice Mode | GA |
| **Agentic Tools** | ChatGPT Agent (Operator), Deep Research, Canvas, Scheduled Tasks, Projects | GA |
| **Creative Tools** | GPT Image 1.5 (replaces DALL-E), Sora 2 (video, iOS/Android app) | GA |
| **Developer Platform** | Responses API, Agents SDK, Chat Completions API, Fine-tuning, Embeddings, Batch API | GA |
| **Coding** | Codex (cloud agent + macOS/Windows desktop app) | GA |
| **Speech/Audio** | Whisper, gpt-4o-transcribe, gpt-4o-mini-tts, tts-1/tts-1-hd, Realtime API (gpt-realtime) | GA |
| **Enterprise** | ChatGPT Business (renamed from Team), ChatGPT Enterprise, ChatGPT Edu | GA |
| **Marketplace** | Custom GPTs, GPT Store | GA |
| **Integrations** | Apps/Connectors directory (Outlook, Gmail, Google Drive, Canva, Notion, GitHub, etc.) | GA |
| **Infrastructure** | Azure OpenAI Service (via Microsoft), Stargate compute initiative | GA / Announced |
| **Hardware** | Smart speaker ($200-300), smart glasses, smart lamp | Announced (2027+) |

### Business Model
Consumer subscriptions (Free/Go/Plus/Pro), business subscriptions (Business/Enterprise/Edu), API per-token pricing, and strategic partnerships (Microsoft, Apple Intelligence, Disney). Consumer and enterprise projected to contribute roughly equally by 2030. Ad-supported tiers (Free and Go) being tested in 2026.

---

## 3. Core AI Models & Capabilities

### Full Model Lineup (as of March 18, 2026)

| Model | Type | Context Window | Key Strengths | API Pricing (Input/Output per 1M tokens) | Status |
|-------|------|---------------|---------------|------------------------------------------|--------|
| **GPT-5.4** | Flagship foundation | 1M tokens (API) | Native computer use, strongest coding/reasoning | ~$2.50 / ~$10+ | GA (Mar 5, 2026) |
| **GPT-5.4 Thinking** | Reasoning variant | 1M tokens | Complex multi-step reasoning | Higher than base | GA |
| **GPT-5.4 Pro** | Max-compute variant | 1M tokens | Hardest problems, max reasoning | Premium | GA (Pro plan) |
| **GPT-5.4 Mini** | Efficient small | — | 2x faster than 5.4, strong coding/reasoning | $0.75 / $4.50 | GA (Mar 17, 2026) |
| **GPT-5.4 Nano** | Smallest/cheapest | — | Production scale, cost-optimized | $0.20 / $1.25 | GA (Mar 17, 2026) |
| **GPT-5.3** | Previous flagship | — | General purpose | — | GA |
| **GPT-5.3 Codex** | Code-specialized | — | Software engineering | $3.00 / $15.00 | GA |
| **GPT-5.2** | Prior flagship | 400K / 128K output | Vision, long context, multimodal | $1.75 / $14.00 | GA |
| **GPT-5.2 Instant** | Fast variant | 400K tokens | Quick responses | Lower | GA |
| **GPT-5.2 Thinking** | Reasoning variant | 400K tokens | Best-in-class vision, chart reasoning | Higher | GA |
| **GPT-4o Mini** | Legacy efficient | 128K tokens | Mature, very cheap | $0.15 / $0.60 | GA (legacy) |
| **o3** | Reasoning | — | Multi-step reasoning, ARC-AGI breakthrough | — | GA (Apr 2025) |
| **o3-mini** | Efficient reasoning | — | Fast reasoning | — | GA (Jan 2025) |
| **o3-pro** | Max reasoning compute | — | Most capable reasoning model | $150.00 / — | GA (Jun 2025) |
| **o4-mini** | Reasoning (efficient) | — | Math, coding, visual tasks | — | GA (Apr 2025) |
| **GPT Image 1.5** | Image generation | — | 4x faster, superior text rendering | — | GA (Dec 2025) |
| **gpt-4o-transcribe** | Speech-to-text | — | Lower error than Whisper | — | GA |
| **gpt-4o-mini-transcribe** | STT (efficient) | — | Best results, recommended | — | GA |
| **gpt-4o-transcribe-diarize** | STT + speaker ID | — | Speaker diarization | — | GA |
| **gpt-realtime** | Speech-to-speech | — | Natural voice, tool calling | — | GA (Aug 2025) |
| **gpt-4o-mini-tts** | Text-to-speech | — | Controllable tone/style via prompt | — | GA |
| **tts-1 / tts-1-hd** | Text-to-speech | — | Standard/HD quality, 13 voices | — | GA |
| **Whisper-1** | Speech-to-text | — | 99+ languages, 680K hours training | $0.006/min | GA |

**Retired Models (no longer available):** GPT-5.1 (all variants retired Mar 11, 2026), GPT-4o (retired Feb 13, 2026), DALL-E 2 & 3 (deprecated, support ends May 12, 2026)

### Model Selection Guide
- **Best overall:** GPT-5.4 Thinking — reasoning + vision + computer use + tools
- **Best value:** GPT-5.4 Mini — strong performance, 2x faster, $0.75/M input
- **Cost-optimized production:** GPT-5.4 Nano at $0.20/M input (300x cheaper than o3-pro)
- **Hardest problems:** o3-pro ($150/M) or GPT-5.4 Pro
- **Fast coding agent:** GPT-5.3 Codex
- **Legacy budget:** GPT-4o Mini at $0.15/M input

### Key Technical Notes
- GPT-5.4 has 1M-token context in API — OpenAI's largest ever, competitive with Gemini
- GPT-5.2 introduced 400K context with 128K output (5x GPT-4)
- GPT-5.4 is first general-purpose model with native computer-use capabilities
- Response compaction endpoint for long-running workflows exceeding context
- Batch API: 50% cost reduction with 24-hour async processing
- Fine-tuning available for select models; LoRA adapters supported

---

## 4. Consumer Products — Exhaustive Feature Inventory

### ChatGPT (Core Product)

**Platforms:** Web (chatgpt.com), macOS (native), Windows (native), iOS, Android
**Pricing:** Free / Go ($8/mo) / Plus ($20/mo) / Pro ($200/mo)

#### Chat & Conversation
- Multi-turn conversation with full model selection (GA)
- Model selector: GPT-5.3 Instant, GPT-5.4 Thinking, GPT-5.4 Pro per conversation (GA)
- Temporary Chat mode — no memory read/write (GA)
- Conversation branching/editing and regeneration (GA)
- Shared conversation links (GA)
- Interactive visual learning modules for educational topics (GA — 2026)

#### Document Handling
- Upload up to 20 files simultaneously (increased from 10 in early 2026) (GA)
- Supported: PDF, DOCX, XLSX, CSV, TXT, code files, images (PNG, JPG, GIF, WEBP)
- Code Interpreter for data analysis on uploaded files (GA)
- Pro plan supports significantly larger files and longer conversation histories (GA)

#### Image Generation & Editing
- GPT-4o native image generation — default for all paid users (GA)
- GPT Image 1.5 via API — 4x faster, superior text rendering in images (GA)
- DALL-E 3 accessible via dedicated GPT (Deprecated — support ends May 12, 2026)
- In-conversation image editing and iteration (GA)
- Text rendering in generated images significantly improved over DALL-E era (GA)

#### Video Generation (Sora 2)
- Dedicated iOS and Android app (GA — Sep 2025)
- Up to 25-second video generation — longest single-generation among major models (GA)
- Synchronized dialogue and sound effects (GA)
- "Characters" feature: insert yourself into scenes via short video/audio recording (GA)
- Disney partnership: 200+ Disney, Marvel, Pixar, Star Wars characters (GA — early 2026)
- Available only to Plus ($20/mo) and Pro ($200/mo) subscribers (GA)
- Free and low-cost access scaled back (GA)

#### Audio / Voice
- **Advanced Voice Mode:** Real-time conversations, <3s response time, emotional expression (GA — all users)
- Hours/day for Free users; near-unlimited for Plus+ (GA)
- 9+ built-in voices (alloy, ash, ballad, coral, echo, fable, onyx, nova, sage, shimmer, verse, marin, cedar) (GA)
- Screen sharing during voice conversations (GA)
- Live transcripts of voice discussions (GA)
- Hybrid mode: voice + text + visual widgets (weather, maps) in conversation (GA)
- Interrupt AI mid-sentence naturally (GA)

#### Code Generation & Execution
- Code Interpreter: Python sandbox, file I/O, chart generation, data manipulation (GA)
- Canvas for code: side-by-side editor with inline suggestions, debugging, commenting (GA)
- Language porting: JavaScript, TypeScript, Python, Java, C++, PHP (GA)
- Codex: dedicated cloud coding agent (see Section 5) (GA)

#### Web Browsing & Search
- Real-time web search integrated into chat with source citations (GA)
- Native search — no longer dependent on Bing plugin (GA)

#### ChatGPT Agent (formerly Operator)
- Autonomous web navigation: click, scroll, type, manage logins on real websites (GA)
- Activated via "agent mode" in composer (GA — Jul 2025)
- On-screen narration of what agent is doing (GA)
- Combines Operator + Deep Research + conversational intelligence (GA)
- **Usage limits:** Pro: 400 messages/month; Plus/Business: 40/month + credit-based flex (GA)
- **Regional:** Not yet available in EEA/Switzerland (Limitation)

#### Deep Research
- Autonomous multi-source research producing analyst-grade reports (GA)
- GPT-5.2-based model with improved steering (updated Feb 2026) (GA)
- Connect to MCP servers and apps for additional data sources (GA — Feb 2026)
- Restrict searches to trusted/specific sites (GA — Feb 2026)
- Real-time progress tracking; interrupt to refine mid-research (GA — Feb 2026)
- **Limits:** Pro: 250/month; Plus/Business/Enterprise/Edu: 25/month; Free: 5/month
- Lightweight fallback version activates after limit reached (GA)

#### Memory & Personalization
- **Saved memories:** Persistent facts, preferences, goals across conversations (GA)
- **Chat history reference:** Draws on all past conversations for context (GA — Apr 2025)
- Auto-organization: prioritizes relevant memories, backgrounds less-used ones (GA)
- User controls: toggle saved memories and chat history independently (GA)
- Temporary Chat: fully ephemeral — no memory read or write (GA)
- Longer memory and context on Go tier and above (GA)

#### Projects & Workspaces
- Group chats, files, and custom instructions per project (GA)
- Unlimited projects (GA)
- Add sources from connected apps: Slack channels, Google Drive folders, links (GA)
- Project-level custom instructions for consistent context (GA)
- **Shared Projects:** Collaborative with shared context — Business/Enterprise/Edu (GA); Free/Go/Plus/Pro (Coming Soon)
- Task insights: aggregated work patterns and conversation topics (GA — Mar 2026)
- Analytics viewer role for designated workspace members (GA — Mar 2026)

#### Canvas (Writing & Code Editor)
- Side-by-side editing workspace within ChatGPT (GA)
- Highlight sections for targeted AI focus (GA)
- Writing shortcuts: adjust length, reading level, tone (GA)
- Code shortcuts: debug, add comments, add logs, fix bugs, port language (GA)
- Version history with restore (GA)
- **Platforms:** Web, Windows, macOS (GA); iOS/Android (Coming Soon)

#### Scheduled Tasks
- Schedule prompts to run automatically at set intervals (GA — Jan 2026)
- Recurring: daily, weekly, custom schedules (GA)
- ChatGPT proactively reaches out with results (GA)
- **Limits:** 10 active tasks maximum (Limitation)
- **Platforms:** iOS, Android, macOS only — no Windows or web (Limitation)
- Available to Plus and Pro subscribers (GA)

---

## 5. Specialized Tools & Sub-Products

### Codex (Software Engineering Agent)
- **Status:** GA
- **Pricing:** Included with Pro; available to Plus/Business users
- **Powered by:** codex-1 (o3 variant fine-tuned via RL on real-world coding tasks)
- **Cloud capabilities:** Writes features, fixes bugs, answers codebase questions, proposes PRs — works in parallel
- **Desktop App:** macOS (GA), Windows (GA — Mar 4, 2026)
  - Separate agent threads organized by projects
  - Built-in worktree support: multiple agents on same repo without conflicts
  - Skills: bundle instructions, resources, scripts for non-code tasks
  - Automations: cloud-based triggers for continuous background operation
  - Custom reasoning levels, theming, templates

### Sora 2 (Video Generation)
- **Status:** GA (Sep 2025 — iOS; Nov 2025 — Android)
- **Pricing:** Requires Plus ($20/mo) or Pro ($200/mo); free/Go tier locked out
- **Capabilities:** Text-to-video up to 25 seconds, synchronized dialogue/SFX, character insertion via selfie recording, Disney/Marvel/Pixar/Star Wars character licensing (200+)
- **Plans announced:** Integration directly into ChatGPT (Mar 2026 report)

### Custom GPTs & GPT Store
- **Status:** GA
- **Key developments 2026:**
  - GPT-5.2 transformed GPTs from chatbots to "agentic mini-apps" with multi-step autonomous workflows (GA)
  - Creators can choose from full model lineup: GPT-4o, o3, o4-mini, and newer (GA)
  - Enable Web Search, Canvas, Image Generation, Code Interpreter per GPT (GA)
  - Connect to third-party APIs via OpenAPI spec (GA)
  - Enterprise: private store section with admin-controlled sharing scope (GA)
  - Revenue sharing: most individual creators earn $100-500/month (soft ceiling)

### ChatGPT Go
- **Status:** GA (launched India Aug 2025; global including US by early 2026)
- **Price:** $8/month
- **Includes:** GPT-5.2 Instant with 10x Free limits, file uploads, image creation, longer memory/context
- **Excludes:** Deep Research, Sora 2, advanced data analysis, latest models
- **Notable:** Ad-supported — OpenAI testing ads in Free and Go tiers in US

### ChatGPT Edu
- **Status:** GA
- **Pricing:** Custom institutional pricing
- **Features:** GPT-4o/5.x access for students/faculty, custom GPTs for courses, data privacy controls, admin console

### Hardware (In Development)
- **Smart speaker:** AI-powered, camera-equipped, $200-300, 200+ person team
- **Smart glasses:** Possibly 2028+
- **Smart lamp:** Early concept
- **Status:** Announced — no products shipping before 2027

---

## 6. Developer & API Platform

### API Architecture
- **Base URL:** api.openai.com
- **Authentication:** API key (project-scoped or user-scoped)
- **Primary API:** Responses API (replaces both Chat Completions and Assistants)
- **Legacy:** Chat Completions API (still supported); Assistants API (deprecated Aug 2025, sunset Aug 2026)

### Responses API (Primary — GA)
- Combines Chat Completions simplicity with Assistants stateful power
- Built-in tools: web search, file search, code interpreter, computer use, remote MCP
- Agentic loop: model calls multiple tools within single API request automatically
- 40-80% improved cache utilization vs Chat Completions
- Streaming via server-sent events

### Agents SDK (Open Source — GA)
- **Languages:** Python (GA), Node.js (GA)
- **Repository:** github.com/openai/openai-agents-python
- Multi-agent orchestration with intelligent handoffs between agents
- Works with both Responses API and Chat Completions API
- **Provider-agnostic:** supports non-OpenAI models via Chat Completions-compatible endpoints
- Successor to experimental Swarm framework
- Guardrails framework for input/output validation
- Tracing and observability built in

### SDKs
- **Official:** Python (`openai`), Node.js/TypeScript
- **Community:** Go, Ruby, Java, C#/.NET, Rust, Swift, PHP

### Function Calling & Structured Outputs
- Function calling with JSON Schema definitions; parallel function calling (GA)
- **Structured Outputs:** Guaranteed schema adherence with `strict: true` — superior to JSON Mode (GA)
- JSON Mode (legacy): valid JSON without schema guarantee (GA)
- Native SDK support: Pydantic (Python), Zod (TypeScript) (GA)

### Additional API Features
- **Streaming:** SSE for real-time token delivery (GA)
- **Batch API:** 50% cost reduction, 24-hour async (GA)
- **Embeddings:** text-embedding-3-large, text-embedding-3-small (GA)
- **Fine-tuning:** Select models; LoRA adapters; reinforcement fine-tuning (GA)
- **Image generation:** GPT Image 1.5 API (GA)
- **Speech-to-text:** gpt-4o-transcribe, gpt-4o-mini-transcribe, gpt-4o-transcribe-diarize, whisper-1 (GA)
- **Text-to-speech:** gpt-4o-mini-tts (prompt-controllable), tts-1, tts-1-hd; 13 voices (GA)
- **Realtime API:** gpt-realtime for speech-to-speech streaming via WebSocket (GA — Aug 2025)
- **Computer Use:** Native in GPT-5.4 API (GA)
- **Moderation:** Free content safety endpoint (GA)
- **Evals:** OpenAI Evals framework for model testing (GA)

### Rate Limits
Tiered system (Tier 1-5) based on account age and spend. Higher tiers get higher RPM/TPM. Enterprise customers get custom limits.

---

## 7. Integration & Connectivity Ecosystem

### 7a. MCP (Model Context Protocol) — CRITICAL

**MCP Client Support:**
- ChatGPT supports MCP servers via Developer Mode: Settings > Connectors > Advanced (Beta)
- Full read AND write actions — update Jira, trigger workflows, write to databases (Beta)
- Deep Research connects to MCP servers for additional data sources (GA — Feb 2026)
- OpenAI labels write capabilities as "powerful but dangerous" — emphasizes testing and prompt injection risk
- MCP Apps extension: tools return interactive UI (dashboards, forms, visualizations) rendered in-chat (GA — Jan 2026)

**Agents SDK + MCP:**
- Responses API has built-in remote MCP tool support (GA)
- Agents SDK supports MCP server connections natively (GA)

**MCP Server:**
- OpenAI publishes documentation for building MCP servers compatible with their platform

**Assessment:** OpenAI adopted MCP after Anthropic originated it. Implementation is functional but positioned as a developer/advanced feature — not a first-class user experience. Deep Research's MCP integration (Feb 2026) is the most accessible implementation. Overall, MCP support is less deeply integrated than in Claude's ecosystem, where MCP is the primary connectivity paradigm.

### 7b. Native Integrations (Apps/Connectors)

Rebranded from "Connectors" to "Apps" in December 2025. Includes both interactive-UI apps and data search/reference connectors.

| App | Read | Write | Availability |
|-----|------|-------|-------------|
| **Microsoft Outlook** | Email search | Draft emails | Business+ |
| **Microsoft Teams** | Channel search | — | Business+ |
| **Gmail** | Email search | Compose | Plus+ |
| **Google Calendar** | View | Create meetings | Plus+ |
| **Google Drive** | File search | — | Plus+ |
| **Google Docs** | — | Create documents | Plus+ |
| **Google Sheets** | — | Create spreadsheets | Plus+ |
| **SharePoint** | Document search | — | Business+ |
| **Dropbox** | File search | — | Plus+ |
| **Box** | File search | — | Business+ |
| **GitHub** | Repo/issue search | — | Business+ |
| **Linear** | Project data | — | Business+ |
| **HubSpot** | CRM data | — | Business+ |
| **Canva** | Search, design | Design creation | Business+ |
| **Notion** | Search, reference | — | Business+ |
| **Figma** | Design access | — | Business+ |
| **Slack** | Channel search | — | Business+ |
| **Booking.com** | Travel search | — | Business+ |
| **Coursera** | Course access | — | Business+ |
| **Expedia** | Travel search | — | Business+ |
| **Spotify** | Music | — | Business+ |
| **Zillow** | Real estate | — | Business+ |

**Write actions (new 2026):** Outlook email drafting, Google Docs/Sheets creation, Google Calendar meeting setup — significant expansion beyond read-only.

**Note:** OpenAI does not publish a fixed list. The in-app App Directory is the authoritative, frequently updated source.

### 7c. Automation Platforms

| Platform | Integration | Details |
|----------|-------------|---------|
| **Zapier** | Full | Triggers/actions for ChatGPT API; 250+ AI templates; Custom GPT Actions can call Zapier webhooks |
| **Make** | Via API | OpenAI API module; visual workflow builder with branching |
| **n8n** | Via API | Open-source; OpenAI node |
| **Power Automate** | Connector | Azure OpenAI + direct OpenAI connector |
| **IFTTT** | Limited | Basic triggers/actions |
| **Pipedream** | Via API | Developer-oriented |

### 7d. Browser Extensions & Plugins
- ChatGPT desktop apps (Mac/Windows) provide system-wide availability (GA)
- ChatGPT for Microsoft 365 connector in marketplace (GA)
- Apple Intelligence integration: ChatGPT accessible via Siri and system-wide writing tools on iOS/macOS (GA)
- No official first-party Chrome browser extension
- Legacy plugin system deprecated in favor of Custom GPTs with Actions and Apps

---

## 8. Agentic & Automation Capabilities

### Autonomous Agents
- **ChatGPT Agent (Operator):** Fully autonomous web browsing — clicks, scrolls, types, manages logins on real websites. Activated via "agent mode" in composer. (GA — Jul 2025)
- **Deep Research:** Autonomous multi-hour research across hundreds of sources producing structured reports (GA)
- **Codex:** Autonomous software engineering — writes code, runs tests, proposes PRs, works on many tasks in parallel (GA)

### Computer Use / Browser Control
- GPT-5.4 is OpenAI's first model with native computer-use capabilities (GA — API)
- ChatGPT Agent browses the web autonomously in consumer product (GA)
- Codex operates in sandboxed cloud environments with file system access (GA)
- No consumer-facing full desktop control (unlike Claude's computer use)

### Multi-Agent Systems
- **Agents SDK:** Open-source framework for multi-agent orchestration with handoffs, guardrails, tracing (GA)
- **Codex:** Runs multiple agents in parallel on same codebase with worktree isolation (GA)
- Successor to experimental Swarm framework

### Agent Monitoring & Safety
- On-screen narration during ChatGPT Agent web tasks (GA)
- Human-in-the-loop: agent pauses for sensitive actions (payments, passwords) (GA)
- MCP write actions flagged as high-risk; developer acknowledgment required (GA)
- Enterprise admin controls: disable specific agentic features per user group (GA)
- Agents SDK: built-in guardrails for input/output validation (GA)

### Scheduled / Recurring Tasks
- Up to 10 active scheduled tasks on Plus/Pro (GA — Jan 2026)
- Daily, weekly, custom intervals (GA)
- Proactive push notifications with results (GA)
- **Limitations:** Only iOS, Android, macOS — no web or Windows support
- Supported by all ChatGPT models except Pro models (GA)

### Event-Driven Triggers
- Codex automations support cloud-based event triggers (GA)
- Zapier/Make for event-driven workflows via API (GA)
- No native event triggers in ChatGPT consumer product (Limitation)

### Custom Workflows
- Custom GPTs: reusable multi-step workflows with instructions + tools + external APIs (GA)
- Codex Skills: bundle instructions, resources, scripts for repeatable tasks (GA)
- Projects: persistent context + custom instructions for ongoing work (GA)

---

## 9. Pricing Deep Dive

### Consumer Plans

| Tier | Monthly | Annual | Key Inclusions | Key Exclusions |
|------|---------|--------|----------------|----------------|
| **Free** | $0 | — | GPT-5.2 Instant (limited), 5 Deep Research/mo, basic image gen, voice mode (hours/day) | No agent mode, no Sora, limited uploads, no Canvas, no scheduled tasks |
| **Go** | $8 | — | 10x Free limits, GPT-5.2 Instant, longer memory/context, file uploads, image creation | No Deep Research, no Sora 2, no advanced analysis; **ads planned** |
| **Plus** | $20 | — | GPT-5.4 Thinking, 25 Deep Research/mo, 40 agent msgs/mo, Sora 2, Canvas, Projects, Tasks, image gen, near-unlimited voice | No Pro models, lower context/file limits |
| **Pro** | $200 | — | Unlimited GPT-5.2 Pro + GPT-5.4 Pro, 250 Deep Research/mo, 400 agent msgs/mo, Sora 2 Pro, Codex, priority access, largest context/files, faster under load | Cost |

### Business & Enterprise Plans

| Tier | Per User/Mo | Billing | Min Users | Key Inclusions | Key Exclusions |
|------|------------|---------|-----------|----------------|----------------|
| **Business** (fka Team) | $25 (annual) / $30 (monthly) | Both | 2 | GPT-5.4 Thinking, shared workspace, admin console, SAML SSO, MFA, apps/connectors with admin control, projects, unified billing, data not trained on | No SCIM, no Compliance API, no IP allowlisting |
| **Enterprise** | ~$45-75 custom | Annual | 150 | All Business + SCIM provisioning, Compliance API (audit log), IP allowlisting, custom RBAC roles, analytics dashboard, admin model access controls, priority support | Requires sales engagement |
| **Edu** | Custom | Annual | Institutional | Similar to Enterprise with educational features | — |

### API Pricing (Key Models)

| Model | Input (per 1M tokens) | Output (per 1M tokens) | Notes |
|-------|----------------------|------------------------|-------|
| GPT-5.4 | ~$2.50 | ~$10+ | Flagship |
| GPT-5.4 Mini | $0.75 | $4.50 | Best value |
| GPT-5.4 Nano | $0.20 | $1.25 | Cheapest |
| GPT-5.2 | $1.75 | $14.00 | Prior gen |
| GPT-5.3 Codex | $3.00 | $15.00 | Coding |
| GPT-4o Mini | $0.15 | $0.60 | Legacy budget |
| o3-pro | $150.00 | — | Max reasoning |
| Whisper | $0.006/min | — | STT |
| Batch API | 50% of standard | 50% of standard | 24hr async |

### Notable Pricing Developments (2026)
- ChatGPT Go ($8/mo) launched as bridge between Free and Plus
- Ads being tested in Free and Go tiers
- Nonprofits: up to 75% discount on Business/Enterprise
- Flexible credit-based overages for Business/Enterprise agentic usage
- Team renamed to Business (Aug 2025), same pricing

---

## 10. Competitive Position

### Head-to-Head Comparison

| Dimension | OpenAI/ChatGPT | Claude (Anthropic) | Gemini (Google) | Copilot (Microsoft) |
|-----------|---------------|-------------------|-----------------|---------------------|
| **Model Quality** | Leading (GPT-5.4, o3) — fastest iteration | Strong (Opus 4) | Competitive (Gemini 2.5 Pro) | Depends on underlying model |
| **Consumer UX** | Broadest feature set | Cleaner for long-form/reasoning | Deep Google integration | Office-native but narrow |
| **Developer Platform** | Most mature, largest ecosystem | Growing rapidly (MCP-native) | Strong (Vertex AI) | Azure-centric |
| **Integrations** | Growing App Directory + MCP (developer) | MCP-first (native) | Google Workspace native | M365 native |
| **Pricing** | Widest range ($0-$200) | Simpler tiers | Bundled with Google One | Bundled with M365 |
| **Agentic** | Most advanced (Agent, Codex, Deep Research) | Cowork, Agent Teams, Claude Code | Astra (limited) | Copilot Studio agents |
| **Innovation Speed** | Highest (5 model gens in 12 months) | High | High | Moderate |
| **Video Gen** | Sora 2 (GA, dedicated app, Disney) | None | Veo | None |
| **Voice** | Best-in-class (Advanced Voice Mode) | Basic | Conversational | Basic |

### Unique Differentiators
- **Sora 2:** Only major platform with GA consumer video generation + Disney character licensing
- **Codex desktop app:** Dedicated coding agent with parallel execution, worktrees, automations
- **ChatGPT Agent:** Most mature consumer-facing autonomous web browsing
- **Scale:** 900M+ weekly users, 50M+ subscribers — largest AI user base and GPT marketplace
- **Model breadth:** Widest range from Nano ($0.20/M) to o3-pro ($150/M)
- **GPT-5.4 1M context:** Largest context window OpenAI has ever offered
- **Apple Intelligence:** Only AI integrated system-wide into iOS/macOS via Siri
- **Advanced Voice Mode:** Arguably best real-time voice AI in production

### Known Weaknesses & Gaps
- **User sentiment declining:** Market share from ~60% to <45%; 1.5M+ cancellations in Mar 2026; #Keep4o movement on Reddit/X
- **Model churn fatigue:** 5 model generations in ~12 months creates confusion and breaks workflows
- **Over-alignment:** GPT-5.2+ models criticized as excessively cautious, refusing reasonable requests
- **MCP not first-class:** Added retroactively; less elegant than Anthropic's MCP-native design
- **Pricing complexity:** 6 consumer/business tiers + API tiers is confusing
- **Scheduled tasks limits:** Only 10 tasks, only on mobile/macOS — no web
- **Regional gaps:** Agent mode unavailable in EEA/Switzerland
- **GPT Store quality:** Discovery problem; many low-effort GPTs

### User Sentiment (2025-2026)
- **G2/Capterra:** Generally 4.5+/5; praised for versatility, fast responses, coding/writing
- **Reddit:** Increasingly polarized. Active backlash communities (r/ChatGPTcomplaints). #Keep4o protest; "I literally hate 5.2" sentiment widespread. 1.5M cancellations cited
- **Power users:** Many migrating to Claude for writing/reasoning; retaining ChatGPT for breadth, voice, video
- **Developers:** Positive on Responses API and Agents SDK; negative on rapid deprecation cycles (Assistants API sunset)
- **Overall:** Still the default AI for most users, but no longer the clear quality leader — competitors closing gap while OpenAI creates self-inflicted churn through aggressive model retirement

---

## Key Resources

- [ChatGPT Pricing](https://chatgpt.com/pricing/)
- [OpenAI API Pricing](https://openai.com/api/pricing/)
- [OpenAI API Documentation](https://developers.openai.com/api/docs/)
- [ChatGPT Release Notes](https://help.openai.com/en/articles/6825453-chatgpt-release-notes)
- [OpenAI Agents SDK](https://github.com/openai/openai-agents-python)
- [Codex](https://openai.com/codex/)
- [Sora 2](https://openai.com/index/sora-2/)
- [OpenAI Newsroom](https://openai.com/news/product-releases/)
- [Apps in ChatGPT](https://help.openai.com/en/articles/11487775-connectors-in-chatgpt)
- [GPT-5.4 Announcement](https://openai.com/index/introducing-gpt-5-4/)
- [GPT-5.2 Details](https://developers.openai.com/api/docs/models/gpt-5.2)
- [Deep Research](https://openai.com/index/introducing-deep-research/)
- [ChatGPT Agent (Operator)](https://openai.com/index/introducing-chatgpt-agent/)

---

*Report produced March 18, 2026 via extensive web research. OpenAI ships features weekly; verify current status at openai.com and the ChatGPT release notes.*

---

**Cleaned for AI Frontier Curriculum project. Business-specific application content removed. All platform intelligence retained.**
