# Google / Gemini Ecosystem Profile

**Source:** Ecosystem research, March 18, 2026

---

## 1. Executive Summary

Google's AI ecosystem is the broadest in the industry, spanning consumer products, enterprise platforms, developer tools, on-device AI, creative studios, and search infrastructure — all unified under the Gemini model family. As of March 2026, Google has shipped Gemini 3 and 3.1 models, consolidated its creative tools into Flow (merging Whisk, ImageFX, and video generation), launched the Antigravity agentic IDE (built on the Windsurf acquisition), introduced Chrome Auto Browse for autonomous web tasks, and expanded MCP support across Google Cloud services. The single most important thing to know: Google is the only AI provider with a model running at every layer — cloud, browser, on-device, and inside the world's most-used productivity suite — giving it unmatched integration surface area.

---

## 2. Company & Ecosystem Overview

- **Company:** Alphabet Inc. / Google (Mountain View, CA, founded 1998)
- **Key AI leadership:** Sundar Pichai (CEO, Alphabet), Demis Hassabis (CEO, Google DeepMind), Jeff Dean (Chief Scientist)
- **Mission:** Organize the world's information and make it universally accessible and useful
- **Business model:** Advertising (Google Search, YouTube), cloud services (Google Cloud), subscriptions (Google AI Pro/Ultra, Workspace, YouTube Premium, Google One), hardware (Pixel, Nest)
- **Market position:** Dominant in search, email, browser, mobile OS (Android), cloud (#3 behind AWS/Azure). Gemini competes directly with OpenAI and Anthropic across all tiers.

### Complete Product Map

| Category | Products |
|----------|----------|
| **Models** | Gemini 3.1 Pro, Gemini 3 Flash, Gemini 3.1 Flash-Lite, Gemini 2.5 Pro, Gemini 2.5 Flash, Gemini 2.5 Flash-Lite, Gemma 3 (open-source), Gemini Nano (on-device) |
| **Consumer AI** | Gemini App (web/mobile), Gemini Live (voice), Gemini in Chrome, AI Mode in Search, AI Overviews |
| **Creative** | Flow (unified: video/image/audio), Veo 3.1 (video), Imagen 4 / Nano Banana Pro (image), MusicFX / MusicFX DJ |
| **Productivity** | Gemini in Workspace (Gmail, Docs, Sheets, Slides, Meet, Drive, Calendar), NotebookLM / NotebookLM Plus / Ultra |
| **Developer** | Google AI Studio, Gemini API, Gemini CLI, Gemini Code Assist, Antigravity IDE, Jules (coding agent), Firebase Genkit, Agent Development Kit (ADK) |
| **Enterprise** | Vertex AI, Vertex AI Agent Builder, Agent Engine, Google Cloud AI services |
| **Research / Labs** | Project Astra (universal agent), Project Mariner (browser automation), Project Genie (interactive worlds), Deep Think |
| **On-device** | Gemini Nano, Android AI features (Circle to Search, Call Notes, Smart Reply, Live Translate, TalkBack descriptions) |
| **Hardware** | Pixel phones, Tensor TPU chips, Project Astra AR glasses (prototype) |

---

## 3. Core AI Models & Capabilities

### Full Model Lineup (March 2026)

| Model | Status | Context Window | Strengths | Multimodal |
|-------|--------|---------------|-----------|------------|
| **Gemini 3.1 Pro** | Preview | 200K+ tokens | Flagship reasoning, complex problem-solving, agentic tasks | Text, image, audio, video in; text, image, audio out |
| **Gemini 3 Flash** | GA | 1M tokens | Frontier intelligence built for speed; 3x faster than 2.5 Pro | Text, image, audio, video in; text, image, audio out |
| **Gemini 3.1 Flash-Lite** | Preview | Standard | Most cost-effective; classification, translation, routing | Text, image, video in; text out |
| **Gemini 2.5 Pro** | GA | 1M tokens | Complex reasoning, advanced code generation | Text, image, audio, video in; text, image, audio out |
| **Gemini 2.5 Flash** | GA | 1M tokens | Speed/cost optimized; 20-30% fewer tokens | Text, image, audio, video in; text, image, audio out |
| **Gemini 2.5 Flash-Lite** | GA | Standard | Budget tier, high throughput | Text, image in; text out |
| **Deep Think 3.1** | Preview | 192K tokens | Enhanced reasoning — considers multiple hypotheses; math/coding | Text in; text out |
| **Gemma 3** | GA (open-source) | 128K tokens | 1B–27B params; runs on single GPU; 140+ languages | Text, image in (4B+ models); text out |
| **Gemini Nano** | GA (on-device) | Limited | On-device inference; privacy-preserving; offline capable | Text, image in; text out |

### Key Technical Capabilities

- **Native audio output:** Multi-speaker text-to-speech, emotional expression understanding, 24+ languages (GA)
- **Computer use:** Project Mariner capabilities being brought into Gemini API — screen understanding, click/fill actions (Preview)
- **Agentic Vision:** Gemini 3 Flash turns image understanding into active, tool-using workflows rather than static analysis (GA)
- **Thought summaries:** Organized transparency into model reasoning for auditability (GA)
- **Security:** Gemini 2.5/3 family has significantly increased protection against indirect prompt injection during tool use (GA)
- **Fine-tuning:** Supervised Fine-Tuning (SFT) available for Gemini 2.5 Flash on Vertex AI (GA)

---

## 4. Consumer Products — Exhaustive Feature Inventory

### Gemini App (Web + Mobile)

**Platforms:** Web (gemini.google.com), Android, iOS
**Pricing:** Free / AI Plus / AI Pro ($19.99/mo) / AI Ultra ($249.99/mo)

#### Feature Inventory

| Category | Features | Availability |
|----------|----------|-------------|
| **Chat** | Multi-turn conversation, Gems (custom personas), Personal Intelligence (learns from past chats), canvas for long-form editing | GA |
| **Document handling** | Upload PDFs, images, spreadsheets; analyze and summarize; generate formatted docs | GA |
| **Image generation** | Powered by Imagen 4 and Nano Banana Pro; up to 1,000 images/day (Ultra) | GA |
| **Video generation** | Veo 3.1 with native audio, character consistency via reference images, scene extension to 60s+ | GA |
| **Audio / Voice** | Gemini Live — real-time voice conversation, interrupt mid-sentence, camera sharing, 24+ languages, emotional understanding | GA |
| **Code** | Code generation, explanation, debugging; Canvas mode for iterative coding | GA |
| **Data analysis** | Upload CSVs/spreadsheets, generate charts and visualizations | GA |
| **Web search** | Grounded in Google Search; AI Mode for multi-step research queries | GA |
| **Screen automation** | On-device screen understanding and action execution (5–120 requests/day by tier) | Preview |
| **Deep Research** | Autonomous multi-step research agent; produces structured reports with citations (5–120 reports/day by tier) | GA |
| **Music generation** | MusicFX integration; up to 100 tracks/day (Ultra) | GA |
| **Memory** | Personal context from past chats; Personal Intelligence feature | GA |
| **Collaboration** | Shared Gems, shared conversations | GA |
| **File creation** | Text documents, code files, presentations (via Workspace integration) | GA |

### Gemini Live (Real-Time Voice)

- Natural conversational voice assistant with interruption support
- Camera sharing for visual context (point and ask)
- Live translation across 30 languages
- Multi-speaker native audio output
- Emotional expression understanding
- **Status:** GA on Android/iOS; rolling out to Gemini for Home (40% faster response times as of March 2026)

### Gemini in Chrome

- **Side panel AI:** Persistent Gemini panel for summarization, Q&A, drafting while browsing
- **Auto Browse:** Agentic browser automation — navigates websites, fills forms, compares prices, completes purchases autonomously (Preview, US, Pro/Ultra subscribers)
- **Connected Apps:** Gmail, Calendar, YouTube, Maps, Google Shopping, Google Flights accessible from Chrome panel
- **Page summarization and Q&A** against current page content
- **Tab management** with AI assistance
- **Status:** Side panel GA; Auto Browse in Preview (US, Pro/Ultra)

### NotebookLM

**Unique product for source-grounded AI research and knowledge management.**

| Feature | Description | Status |
|---------|-------------|--------|
| **Source grounding** | Upload up to 100–600 sources per notebook (by tier); all responses cite specific sources | GA |
| **Audio Overviews** | AI-generated podcast-style discussions; formats: Deep Dive, The Brief, The Critique, The Debate; adjustable length | GA |
| **Deep Research** | Agentic researcher that browses live web to fill gaps in uploaded sources | GA |
| **Mind maps** | Auto-generated visual knowledge maps from sources | GA |
| **Slide decks** | Generate presentations from notebook content | GA |
| **Chat** | Source-grounded Q&A with inline citations | GA |
| **Sharing** | Shared organizational notebooks (Enterprise) | GA |

**Tiers:**
- Free: 50 sources/notebook, 20 audio overviews/day, 5 Deep Research reports/month
- Pro: 300 sources/notebook, 20 audio overviews/day, 500 notebooks
- Ultra: 600 sources/notebook, 200 audio overviews/day, 5,000 chats/day

### Flow (Unified Creative Studio)

Google merged Flow, Whisk, and ImageFX into a single creative workspace (February 2026).

- **Video:** Veo 3.1 — text-to-video, image-to-video, native audio/dialogue, character consistency, scene extension
- **Image:** Nano Banana Pro — high-fidelity generation with excellent text rendering; free image generation
- **Remix/Collage:** Whisk capabilities for visual mood boards and remixing
- **Animation:** Whisk Animate (Pro/Ultra)
- **Credits:** 200 (Plus) / 1,000 (Pro) / 12,500 (Ultra) monthly AI credits
- **Status:** GA; Whisk fully migrating to Flow by April 30, 2026

### Google Search AI Features

- **AI Overviews:** Trigger on ~50% of queries; Gemini 2.0+ powered; surged 58% YoY
- **AI Mode:** Experimental — complex multi-step queries with concurrent "query fan-out" research
- **Search Live:** Camera-based real-time visual Q&A powered by Project Astra
- **Status:** AI Overviews GA globally; AI Mode Preview (US)

---

## 5. Specialized Tools & Sub-Products

### Jules (AI Coding Agent)
- **Purpose:** Autonomous asynchronous coding agent for bug fixes, test writing, code optimization
- **Status:** GA (exited beta August 2025)
- **Model:** Gemini 3 Flash (upgraded from 2.5 Pro)
- **Features:** GitHub integration, audio changelogs, multi-file changes, concurrent tasks, proactive performance optimization detection, Jules Tools CLI, Jules API
- **Pricing:** Included in AI Pro (5x limits) and Ultra (20x limits); free tier available

### Antigravity IDE
- **Purpose:** Agent-first integrated development environment (built on Windsurf acquisition, $2.4B)
- **Status:** Public Preview (free for individuals)
- **Features:** Editor View (AI-powered completions/inline commands) + Manager Surface (spawn/orchestrate multiple agents), SWE-bench score 76.2%
- **Model support:** Gemini 3 Pro, Claude Sonnet 4.5, GPT-OSS
- **Platforms:** macOS, Windows, Linux

### Gemini Code Assist
- **Purpose:** AI coding assistant for IDEs
- **Status:** GA
- **Editions:** Free, Standard, Enterprise
- **Features:** Code completions, full function generation, unit test generation, debugging, Agent Mode (autonomous multi-file tasks), Finish Changes, Outlines
- **IDE support:** VS Code, JetBrains, Android Studio

### Gemini CLI
- **Purpose:** Open-source AI agent in the terminal
- **Status:** GA
- **Features:** ReAct loop, MCP server support, extensible with community/partner extensions (Figma, Shopify, Stripe, Elastic, Dynatrace, etc.)
- **Limits:** 60 requests/min, 1,000 requests/day (free)

### Project Astra (Universal AI Agent)
- **Status:** Research prototype / Preview
- **Capabilities:** Real-time multimodal understanding (video + audio + text), natural conversation, calls Google apps (Search, Maps, Lens)
- **Integrations:** Powering Search Live, expected AR glasses demo at Google I/O 2026 (May 19-20)

### Project Mariner (Browser Automation Agent)
- **Status:** Preview (Ultra subscribers)
- **Capabilities:** Desktop-focused agent for complex professional workflows in Chrome and Workspace

### Project Genie (Interactive Worlds)
- **Status:** Preview (Ultra subscribers)
- **Capabilities:** Generate interactive environments/worlds

### MusicFX / MusicFX DJ
- **Status:** GA (US, NZ, Kenya, Australia)
- **Capabilities:** Text-to-music generation (up to 70 seconds), music loops, MusicFX DJ interactive jam sessions
- **Model:** MusicLM (improved)

### Gemini Nano (On-Device AI)
- **Status:** GA on Pixel devices and select Android phones
- **Capabilities:** Smart Reply (Gboard), Pixel Screenshots (content extraction), TalkBack image descriptions, Call Notes (call summarization), proofreading, summarization, image description
- **Developer access:** ML Kit GenAI APIs, AI Edge SDK, Prompt API
- **Privacy:** All processing local; no server calls; AICore isolates requests

### Android AI Features
- **Circle to Search:** Visual search by circling on-screen content (GA)
- **Live Translate:** Real-time translation across 30 languages (GA)
- **Call Screening:** AI answers unknown calls (GA, Pixel)
- **Gemini assistant:** Replaces Google Assistant on supported devices (GA)

---

## 6. Developer & API Platform

### Gemini API

| Feature | Details | Status |
|---------|---------|--------|
| **Models available** | Gemini 3.1 Pro, 3 Flash, 3.1 Flash-Lite, 2.5 Pro, 2.5 Flash, 2.5 Flash-Lite, Deep Think 3.1, Imagen 4, Veo 3.1, embedding models | GA/Preview |
| **Free tier** | Yes — limited rate limits; data used to improve products | GA |
| **Function calling** | Full tool use / function calling | GA |
| **Structured output** | JSON mode, schema enforcement | GA |
| **Streaming** | Real-time streaming responses | GA |
| **Batch processing** | 50% cost discount, up to 24hr latency | GA |
| **Embeddings** | Text, image, audio, video embedding | Preview |
| **Context caching** | 90% cheaper cached reads; $1–$4.50/M tokens/hour storage | GA |
| **Grounding** | Google Search and Google Maps grounding; 1,500 RPD free | GA |
| **Live API** | Real-time bidirectional audio/video streaming | GA |
| **Code execution** | Server-side code execution sandbox | GA |
| **Image generation** | Imagen 4 (Fast/Standard/Ultra) and Gemini 2.5 Flash Image | GA |
| **Video generation** | Veo 3.1 and Veo 3.1 Fast | Preview |
| **TTS** | Flash TTS and Pro TTS native audio output | GA |

### API Pricing (Per 1M Tokens)

| Model | Input | Output | Cached Input | Batch Input |
|-------|-------|--------|-------------|-------------|
| Gemini 3.1 Pro | $2.00–$4.00 | $12.00–$18.00 | $0.20–$0.40 | $1.00–$2.00 |
| Gemini 3 Flash | $0.50 | $3.00 | $0.05 | $0.25 |
| Gemini 3.1 Flash-Lite | $0.25 | $1.50 | N/A | $0.125 |
| Gemini 2.5 Pro | $1.25–$2.50 | $10.00–$15.00 | Discounted | $0.625–$1.25 |
| Gemini 2.5 Flash | $0.30 | $2.50 | Discounted | $0.15 |
| Gemini 2.5 Flash-Lite | $0.10 | $0.40 | N/A | $0.05 |

**Other API costs:**
- Imagen 4: $0.02–$0.06 per image
- Veo 3.1: $0.15–$0.60 per second of video
- Google Search grounding: $35/1,000 prompts (after free tier)

### SDKs & Frameworks

| Tool | Languages/Platforms | Purpose |
|------|-------------------|---------|
| **Gemini API SDKs** | Python, JavaScript, Go, Dart, Swift, Kotlin | API access |
| **Firebase Genkit** | JavaScript/TypeScript, Go, Python (Alpha) | Full-stack AI app framework |
| **Agent Development Kit (ADK)** | Python (Java coming) | Multi-agent systems |
| **Gemini CLI** | Terminal (Node.js) | Open-source AI agent in terminal |
| **Antigravity IDE** | macOS, Windows, Linux | Agentic development environment |
| **Google AI Studio** | Web | Prototyping, testing, prompt engineering, vibe coding |

---

## 7. Integration & Connectivity Ecosystem

### 7a. MCP (Model Context Protocol)

**Google has gone all-in on MCP.** Key developments:

| Aspect | Status | Details |
|--------|--------|---------|
| **MCP client (Gemini CLI)** | GA | Full MCP server support; extensible with any MCP server |
| **MCP client (ADK)** | GA | Native MCP support for plug-and-play data source connections |
| **MCP client (Antigravity)** | GA | MCP server integration in IDE |
| **Managed MCP servers** | Rolling out | Enterprise-ready, globally-consistent endpoints for Google services |
| **Google Maps MCP** | GA | Places, weather, routing via MCP |
| **Google Workspace MCP** | GA | Docs, Chat, Calendar, Drive via MCP server |
| **Cloud services MCP** | Announced | Cloud Run, Cloud Storage, Resource Manager, AlloyDB, Cloud SQL, Spanner, Looker, Pub/Sub, Dataplex — rolling out in coming months |

**Assessment:** Google is the largest cloud provider to commit to managed, remote MCP servers. For a Claude-centric architecture, Google's MCP servers (especially Workspace and Maps) are directly connectable to Claude via MCP. This is a significant interoperability win.

### 7b. Native Integrations

| Category | Integrations |
|----------|-------------|
| **Google ecosystem** | Gmail, Docs, Sheets, Slides, Drive, Meet, Calendar, Chat, Maps, Search, YouTube, Photos, Home, Chrome |
| **Developer** | GitHub (Jules), VS Code, JetBrains, Android Studio |
| **Enterprise connectors** | 100+ connectors via Apigee (ERP, procurement, HR) |
| **Partner extensions** | Figma, Shopify, Stripe, Elastic, Dynatrace, Postman, Harness, Snyk |

### 7c. Automation Platforms

| Platform | Support |
|----------|---------|
| **Zapier** | Gemini API actions/triggers available; Google Workspace triggers widely supported |
| **Make** | Google Workspace modules available; Gemini API via HTTP module |
| **Power Automate** | Limited direct; Google Workspace connectors available |
| **n8n** | Gemini API node available |

### 7d. Browser Extensions & Plugins

- **Gemini in Chrome:** Built-in side panel with Auto Browse, Connected Apps (GA/Preview)
- **Gemini CLI extensions:** Marketplace of partner and community-built extensions
- **No standalone Firefox/Safari/Edge extensions** — Chrome is the focal point

---

## 8. Agentic & Automation Capabilities

| Capability | Status | Details |
|-----------|--------|---------|
| **Autonomous agents** | GA/Preview | Deep Research (multi-step web research), Auto Browse (multi-step web tasks), Jules (multi-step coding) |
| **Computer use / browser control** | Preview | Project Mariner — Chrome/Workspace automation; Auto Browse — form filling, shopping, comparison; Screen automation on mobile |
| **Multi-agent systems** | GA | Agent Development Kit (ADK) — orchestrate multiple specialized agents; Antigravity Manager Surface — spawn/observe multiple agents |
| **Agent monitoring** | GA | ADK Web dashboard — visual trace of reasoning/tool calls; Vertex AI Agent Engine Threat Detection (Preview) |
| **Scheduled tasks** | Limited | No native Gemini app scheduling; available via Vertex AI Agent Engine or Cloud Scheduler + API |
| **Event-driven triggers** | GA | Via Vertex AI, Cloud Functions, Pub/Sub; not native in consumer app |
| **Custom workflows** | GA | Gems (custom personas), ADK agents, Jules automation workflows |
| **File system access** | GA | Gemini CLI has local file system access; Antigravity has full project access |
| **Remote machine control** | Preview | Project Mariner (browser); Vertex AI Agent Engine for cloud workloads |

---

## 9. Pricing Deep Dive

### Consumer Plans (US, March 2026)

| Tier | Monthly | Key Inclusions | Key Exclusions |
|------|---------|----------------|----------------|
| **Free** | $0 | Gemini 3 Flash, basic Pro access (daily limits), 5 Deep Research/month, 20 images/day, 5 screen automations/day, 32K context | No Workspace AI, no Auto Browse, no video gen, no NotebookLM Plus |
| **AI Plus** | Not publicly priced | 128K context, 12 Deep Research/day, 50 images/day, 2 Veo Fast videos/day, 200 AI Credits, NotebookLM (200 notebooks) | No Workspace AI, limited Auto Browse |
| **AI Pro** | $19.99/mo | 1M context, 20 Deep Research/day, 100 images/day, Workspace AI (Gmail, Docs, Sheets, Slides, Drive), Chrome Auto Browse, NotebookLM Pro, Jules 5x, 2TB storage, 1,000 AI Credits | No Deep Think, no Project Mariner, no YouTube Premium |
| **AI Ultra** | $249.99/mo | Deep Think 3.1, 120 Deep Research/day, 1,000 images/day, 5 Veo 3.1 videos/day, Project Mariner, Gemini Agent (200/day), NotebookLM Ultra, Jules 20x, 30TB storage, YouTube Premium, 12,500 AI Credits | — |

### Workspace Plans (Business)

| Plan | Monthly/User | Gemini Features |
|------|-------------|----------------|
| **Business Starter** | $7.20 | Limited Gemini in Workspace |
| **Business Standard** | $14.40 | NotebookLM Plus, Gemini in Workspace apps |
| **Business Plus** | $18 | Full Gemini in Workspace |
| **Enterprise** | Custom | NotebookLM Enterprise (5x limits), advanced compliance |

### API Pricing
See Section 6 for complete per-token pricing table. Notable: free tier available (with data training caveat), context caching reduces costs up to 90%, batch mode saves 50%.

---

## 10. Competitive Position

### Head-to-Head Comparison

| Dimension | vs. OpenAI/ChatGPT | vs. Anthropic/Claude | vs. Microsoft/Copilot |
|-----------|-------------------|---------------------|----------------------|
| **Model quality** | Gemini 3 Pro competitive with GPT-5 on reasoning; Flash models offer best speed/cost ratio | Claude leads on nuanced writing and safety; Gemini leads on multimodal breadth | Copilot uses OpenAI models; Gemini has native models |
| **Integration surface** | Google has broader native integration (Search, Chrome, Android, Workspace) | Claude has deeper MCP ecosystem; Gemini catching up with managed MCP servers | Microsoft has deeper Office integration; Google has broader consumer reach |
| **Developer platform** | Both offer strong APIs; Google's free tier is more generous | Claude Code competes with Gemini CLI; Antigravity vs Windsurf (ironic — same DNA) | GitHub Copilot competes with Gemini Code Assist |
| **Agentic** | Both have browser agents (Auto Browse vs Operator); Google has more on-device agentic features | Claude's computer use is more mature; Google has more browser-native agentic features | Copilot Studio for enterprise agents; Google ADK is more developer-friendly |
| **Pricing** | Gemini Pro ($19.99) vs ChatGPT Plus ($20); Ultra ($249.99) vs Pro ($200) | Gemini Pro ($19.99) vs Claude Pro ($20); similar value | Copilot Pro ($20) is app-only; M365 Copilot ($30/user) for Workspace equivalent |

### Unique Differentiators (Only Google)
1. **On-device AI (Nano)** — No competitor has a model running locally on billions of Android devices
2. **Search integration** — AI Overviews on ~50% of queries; AI Mode for research; no other AI owns a search engine
3. **NotebookLM Audio Overviews** — No competitor generates podcast-style discussions from documents
4. **Flow creative studio** — Unified image/video/audio generation workspace; only Google merges all three
5. **Chrome Auto Browse** — Native browser agent in the world's most-used browser
6. **Free tier generosity** — Gemini 3 Flash access, Deep Research, image generation, and basic video all free

### Known Weaknesses
- **Writing quality:** Reddit consensus is ChatGPT leads for creative writing; Claude leads for nuanced, professional prose; Gemini is strongest for factual/research tasks
- **Workspace depth:** Gemini in Workspace has improved significantly in early 2026 but many users still consider Microsoft Copilot's Office integration deeper
- **Consumer trust:** Google's history of killing products (Stadia, Inbox, etc.) creates adoption hesitancy
- **Privacy perception:** Free tier data is used for training; enterprise requires paid tiers for data protection

### User Sentiment (2025–2026)
- **Reddit:** "Gemini wins on utility, not creativity." Best for factual Q&A, STEM, research, Google Workspace users. ChatGPT preferred for writing and general creativity.
- **G2/Capterra:** Strong reviews for enterprise Workspace integration; mixed reviews for standalone chatbot experience
- **General consensus:** Google built the best integrated productivity tool, not the best chatbot

---

*Report produced March 18, 2026. All features verified via web research. Availability labels reflect status as of publication date.*

*Cleaned for AI Frontier Curriculum project. ACD-specific application content removed. All platform intelligence retained.*

Sources:
- [Google Gemini API Models](https://ai.google.dev/gemini-api/docs/models)
- [Gemini API Pricing](https://ai.google.dev/gemini-api/docs/pricing)
- [Gemini 2.5 Flash and Pro capabilities](https://cloud.google.com/blog/products/ai-machine-learning/expanding-gemini-2-5-flash-and-pro-capabilities)
- [Gemini 3 announcement](https://blog.google/products/gemini/gemini-3/)
- [Gemini 3 Flash](https://blog.google/products-and-platforms/products/gemini/gemini-3-flash/)
- [Gemini 3.1 Flash-Lite](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-flash-lite/)
- [Google AI Pro/Ultra features (March 2026)](https://9to5google.com/2026/03/17/google-ai-pro-ultra-features/)
- [Chrome Auto Browse](https://blog.google/products-and-platforms/products/chrome/gemini-3-auto-browse/)
- [Chrome Auto Browse Help](https://support.google.com/chrome/answer/16821166?hl=en)
- [NotebookLM Audio Overviews](https://blog.google/technology/ai/notebooklm-audio-overviews/)
- [NotebookLM Plans](https://notebooklm.google/plans)
- [Google MCP announcement](https://cloud.google.com/blog/products/ai-machine-learning/announcing-official-mcp-support-for-google-services)
- [Gemini CLI GitHub](https://github.com/google-gemini/gemini-cli)
- [Agent Development Kit docs](https://google.github.io/adk-docs/)
- [Jules coding agent](https://jules.google.com/)
- [Jules proactive features](https://blog.google/innovation-and-ai/technology/developers-tools/jules-proactive-updates/)
- [Antigravity IDE](https://developers.googleblog.com/build-with-google-antigravity-our-new-agentic-development-platform/)
- [Gemini Code Assist](https://codeassist.google/)
- [Veo 3.1 announcement](https://developers.googleblog.com/introducing-veo-3-1-and-new-creative-capabilities-in-the-gemini-api/)
- [Flow creative studio update](https://blog.google/innovation-and-ai/models-and-research/google-labs/flow-updates-february-2026/)
- [Gemini in Workspace (March 2026)](https://blog.google/products-and-platforms/products/workspace/gemini-workspace-updates-march-2026/)
- [Gemma 3](https://deepmind.google/models/gemma/gemma-3/)
- [Gemini Nano Android](https://developer.android.com/ai/gemini-nano)
- [Project Astra](https://deepmind.google/models/project-astra/)
- [Vertex AI Agent Builder](https://cloud.google.com/products/agent-builder)
- [Google AI Overviews in Search](https://blog.google/products-and-platforms/products/search/ai-mode-search/)
- [Firebase Genkit](https://genkit.dev/)
- [Imagen models](https://deepmind.google/models/imagen/)
