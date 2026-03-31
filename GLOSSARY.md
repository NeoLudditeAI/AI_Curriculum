# GLOSSARY.md — Canonical Term Definitions

All modules must use these definitions consistently. When a term is first introduced in a module, it should link back here.

Last updated: 2026-03-21

---

## Models & Intelligence

| Term | Definition | First Introduced | Related Terms |
|------|-----------|------------------|---------------|
| **Context window** | The maximum amount of text (measured in tokens) that a model can process in a single interaction. As of March 2026, ranges from 128K to 1M+ tokens depending on model. | Module 01 | Token, Compaction |
| **Embedding** | A dense vector representation of text (or other content) produced by a model, used for similarity search in RAG pipelines. Major providers: OpenAI (text-embedding-3), Google (multimodal, Preview). Anthropic does not offer an embeddings API. | Module 02 | RAG, Vector database |
| **Extended thinking** | Anthropic's reasoning mode where Claude models allocate additional compute to multi-step reasoning before generating a response. Visible as a "thinking" block in the output. | Module 01 | Reasoning modes, Chain-of-thought |
| **Fine-tuning** | The process of further training a pre-trained model on task-specific data to improve performance on a narrow domain. Available from OpenAI (GPT-4o, LoRA adapters), Google (Gemini 2.5 Flash SFT), and Azure. Not offered by Anthropic. LoRA (Low-Rank Adaptation) is a parameter-efficient fine-tuning technique. | Module 09 | Token, Batch API |
| **Mixture-of-Experts (MoE)** | A model architecture where multiple specialized sub-networks ("experts") are trained, and a gating mechanism routes each input to the most relevant experts. Used by Mistral 3 (675B) and DeepSeek-R1 (671B). Enables larger total parameter counts with lower per-inference compute. | Module 01 | Token, Context window |
| **Reasoning modes** | Model configurations that trade speed for depth of analysis. Includes Anthropic's extended thinking, OpenAI's o-series reasoning, and Google's Deep Think. | Module 01 | Extended thinking, Chain-of-thought |
| **Token** | The fundamental unit of text processing for LLMs. Roughly 3/4 of a word in English. Pricing, context windows, and rate limits are all measured in tokens. | Module 01 | Context window |

## Context Engineering

| Term | Definition | First Introduced | Related Terms |
|------|-----------|------------------|---------------|
| **Claude Memory** | Anthropic's cross-session memory system (GA, all plans, March 2026). Processes conversations asynchronously (~24-hour cycle) to extract facts -- profession, preferences, project context -- into a structured profile loaded into future conversations. Also referred to as "Chat Memory" in some Anthropic documentation. | Module 02 | Compaction, Context engineering |
| **Compaction** | The process of summarizing or truncating conversation history when context window limits are approached. What survives compaction varies by platform. | Module 02 | Context window, Claude Memory |
| **Context engineering** | The emerging discipline of deliberately designing and managing what information is available in an AI system's context window to maximize output quality. Encompasses prompt design, memory management, RAG, and compaction strategies. | Module 02 | Context window, Prompt caching, RAG |
| **Prompt caching** | A cost-optimization technique where frequently reused prompt prefixes are cached server-side, reducing token processing costs on subsequent requests. Anthropic offers 90% discount with three cache durations (5-minute, 1-hour, persistent). Google offers 90% discount with per-hour storage fees. OpenAI offers 50% automatic caching. | Module 02 | Context engineering, Token, Batch API |
| **RAG (Retrieval-Augmented Generation)** | A pattern where relevant documents are retrieved from an external knowledge base and injected into the model's context to ground its responses in specific data. | Module 02 | Context engineering, Vector database, Embedding |
| **Vector database** | A specialized database optimized for storing and querying high-dimensional vector embeddings. Used in RAG pipelines for similarity search. Common implementations: Pinecone, Weaviate, Chroma, pgvector. | Module 02 | RAG, Embedding |

## Agents

| Term | Definition | First Introduced | Related Terms |
|------|-----------|------------------|---------------|
| **Agent** | An AI system that can autonomously plan, execute multi-step tasks, use tools, and act on behalf of a user with varying degrees of supervision. | Module 03 | Subagent, Multi-agent orchestration, Tool use |
| **Agent SDK** | A software development kit for building custom agent systems. Major implementations: Anthropic Agent SDK, OpenAI Agents SDK, Google Agent Development Kit (ADK). | Module 04 | Agent, Multi-agent orchestration |
| **Claude Code** | Anthropic's terminal-based agentic coding assistant (GA). Uses Opus 4.6 with a 1M-token context window, a three-phase agentic loop (Gather Context, Take Action, Verify Work), and MCP integration. Included with Pro, Max, Team, and Enterprise plans. | Module 03 | Agent, Cowork, MCP |
| **Codex (OpenAI)** | OpenAI's cloud-based software engineering agent, powered by codex-1 (an o3 variant). Runs tasks in air-gapped cloud sandboxes without internet access. Supports parallel task execution, Skills, and Automations (event-driven triggers). | Module 03 | Agent, Skills |
| **Computer use** | The ability of an AI model to interact with a computer's GUI via screenshots, mouse clicks, and keyboard input. Supported by Claude (all current models, GA), GPT-5.4 (native), and Google Project Mariner (Preview). Distinct from tool use / function calling. | Module 03 | Agent, Tool use, Cowork |
| **Cowork** | Anthropic's desktop automation agent (Research Preview). Operates the user's computer via screenshot-based computer use in an isolated VM. Supports MCP connectors, scheduled tasks, and sub-agent coordination. | Module 03 | Claude Code, Agent, Computer use |
| **Deep Research** | A multi-step autonomous research capability offered by ChatGPT and Gemini that searches, reads, and synthesizes information from multiple web sources to produce analyst-grade reports. | Module 03 | Agent, Tool use |
| **Firecracker MicroVM** | A lightweight virtual machine technology (developed by AWS) that boots in ~125ms with <5 MiB overhead, providing hardware-level isolation for agent sandboxing. | Module 03 | Agent, gVisor |
| **Guardrails** | Input and output validators that run on agent interactions, checking that inputs are well-formed and outputs do not contain prohibited content before they are acted upon. First-class primitive in OpenAI's Agents SDK; implemented via hooks/lifecycle callbacks in Anthropic's Agent SDK. | Module 04 | Agent, Agent SDK, Tracing |
| **gVisor** | Google's application-level kernel that intercepts system calls and re-implements them in a user-space sandbox, providing defense-in-depth beyond standard container isolation. Used in Google Cloud's container infrastructure. | Module 03 | Firecracker MicroVM, Agent |
| **Handoff** | A multi-agent orchestration pattern where one agent transfers its full conversation state to another agent. First-class primitive in OpenAI's Agents SDK. | Module 04 | Agent, Multi-agent orchestration, Subagent |
| **LATS (Language Agent Tree Search)** | An advanced agent planning strategy that combines tree search with Monte Carlo evaluation. The agent explores multiple solution paths, backtracks from dead ends, and selects the most promising branches. Improves task completion by 22.1 percentage points over basic ReAct on HumanEval. | Module 03 | ReAct, Agent |
| **Multi-agent orchestration** | Architectural pattern where multiple specialized agents coordinate to complete complex tasks. Includes patterns like delegation, parallel execution, and summary propagation. | Module 04 | Agent, Subagent, Agent SDK |
| **Project Mariner** | Google's desktop-focused browser automation agent (Preview) targeting complex professional workflows in Chrome and Google Workspace. 83.5% on WebVoyager, supports up to 10 parallel browser streams and "Teach & Repeat" workflow learning. | Module 03 | Agent, Computer use |
| **ReAct** | Reasoning + Acting pattern for agent systems, where the agent interleaves reasoning about the current state with taking actions and observing results. The foundational architecture used by Claude Code, OpenClaw, and most production agent systems. First formalized by Yao et al. (ICLR 2023). | Module 03 | Agent, LATS, Tool use |
| **Router pattern** | A multi-agent orchestration pattern where a lightweight agent or classifier examines each incoming request and dispatches it to the appropriate specialist agent. Used by Copilot Studio's generative orchestration. | Module 04 | Multi-agent orchestration, Agent |
| **Subagent** | An agent spawned by a parent agent to handle a specific subtask. Runs in its own context window; only a structured summary returns to the parent. | Module 04 | Agent, Multi-agent orchestration, Context isolation |
| **Tool use** | The ability of an AI model to invoke external functions or APIs during response generation, extending its capabilities beyond text generation. Also called "function calling." | Module 03 | Agent, MCP, Structured outputs |
| **Tracing** | Built-in observability for agent execution that logs every agent call, tool invocation, and handoff with timing and token usage, creating a full execution trace. First-class primitive in OpenAI's Agents SDK; available via hooks in Anthropic's Agent SDK and dashboards in Google's Vertex AI. | Module 04 | Agent SDK, Guardrails |

## Protocols & Integration

| Term | Definition | First Introduced | Related Terms |
|------|-----------|------------------|---------------|
| **MCP (Model Context Protocol)** | An open protocol (originated by Anthropic, now under Linux Foundation's Agentic AI Foundation) that standardizes how AI applications connect to external data sources and tools. Uses JSON-RPC 2.0 over STDIO (local) or Streamable HTTP (remote) with OAuth 2.1 authorization. | Module 06 | MCP server, MCP client, Tool use |
| **MCP server** | A lightweight program that exposes specific capabilities (data access, tool execution) to AI applications via the Model Context Protocol. As of March 2026, 19,700+ servers in the registry. | Module 06 | MCP, MCP client |

## Platforms & Products

| Term | Definition | First Introduced | Related Terms |
|------|-----------|------------------|---------------|
| **Agent 365** | Microsoft's enterprise agent governance platform providing agent registry, identity management (via Entra ID), compliance (via Purview), and security monitoring (via Defender). GA May 1, 2026, at $15/user/month or bundled in M365 E7 ($99/user/month). | Module 04 | Agent, Multi-agent orchestration, Copilot Studio |
| **AI Builder** | Microsoft's AI capabilities module within Power Automate, providing document processing, sentiment analysis, and entity extraction. Credits transitioning from bundled to consumption-based pricing (bundled credits ending November 2026). | Module 07 | Copilot Studio, Power Automate |
| **AI Chips** | Google's pre-built tool integrations for Google services (Calendar, Maps, Gmail, Drive) within Gemini. First-party only -- no third-party authoring. | Module 07 | Gemini Nano, Skills |
| **AICore** | Google's Android system service providing on-device AI capabilities via Gemini Nano. Available on Pixel 8+ devices. Developers access it through ML Kit GenAI APIs for summarization, proofreading, Smart Reply, and Call Notes. | Module 10 | Gemini Nano, Private Cloud Compute |
| **Batch API** | An asynchronous API endpoint offered by major providers (Anthropic, OpenAI, Google) that processes requests within 24 hours at a 50% discount on token costs. Ideal for non-real-time workloads. | Module 09 | Token, Prompt caching |
| **C2PA** | Coalition for Content Provenance and Authenticity -- an open standard for content credentials that embeds provenance metadata into media files. Supported by Adobe, Microsoft, Google, and others. No major AI generation platform embeds C2PA credentials by default as of March 2026. | Module 10 | Constitutional AI |
| **ClawHub** | The skills registry for the OpenClaw open agent platform. Analogous to an app store for agent capabilities. Hosts 13,700+ skills as of February 2026. Known security concerns (12-20% malicious skill rate). | Module 05 | OpenClaw, Skills |
| **Constitutional AI (CAI)** | Anthropic's approach to AI safety where behavioral principles are embedded into model training, enabling the model to self-correct against a defined constitution of rules. | Module 10 | Extended thinking |
| **Copilot Studio** | Microsoft's low-code/no-code platform for building custom AI agents targeting business analysts and citizen developers. Features 1,400+ connectors, generative orchestration, MCP client support (GA), and computer-using agents (GA February 2026). Governed by Agent 365. | Module 04 | Agent 365, Work IQ |
| **Firebase Genkit** | Google's full-stack AI application framework for JavaScript/TypeScript and Go (Python in alpha). Provides abstractions for model interaction, retrieval, indexing, and agent orchestration. | Module 09 | Agent SDK |
| **Gemini Nano** | Google's on-device AI model designed for inference with no server connection required. Powers Android features including Smart Reply, Call Notes, and TalkBack image descriptions. Processing is entirely local -- no data leaves the device. Available on Pixel 8+ via the AICore system service. | Module 01 | AICore, Embedding |
| **GPT Store** | OpenAI's marketplace for Custom GPTs, hosting 3M+ created GPTs (~159K publicly active) as of March 2026. Includes creator revenue sharing (introduced mid-2025). Enterprise customers can curate private stores. | Module 07 | Skills, Codex |
| **NemoClaw** | NVIDIA's enterprise-hardened distribution of OpenClaw, adding the OpenShell sandbox for skill isolation and a privacy router for policy-based LLM inference routing. Early preview as of March 2026. | Module 05 | OpenClaw, ClawHub |
| **OpenClaw** | An open-source agent platform (MIT license, 163K+ GitHub stars) providing a Gateway, channel-based communication, and the Pi Agent Runtime for building and running AI agents locally or self-hosted. Supports any LLM provider. | Module 05 | ClawHub, NemoClaw, Gateway (OpenClaw) |
| **Gateway (OpenClaw)** | OpenClaw's central message router -- a Node.js process on port 18789 that multiplexes WebSocket and HTTP connections between user-facing channels and the Pi Agent Runtime. Single entry point for all agent interactions. | Module 05 | OpenClaw, Pi Agent Runtime |
| **Pi Agent Runtime** | OpenClaw's cognitive core, embedded via the `pi-coding-agent` SDK. Manages the full agent lifecycle through the `AgentSession` abstraction with 30+ specialized modules. Implements a ReAct pattern with two-phase verification. | Module 05 | OpenClaw, Gateway (OpenClaw), ReAct |
| **Private Cloud Compute (PCC)** | Apple's privacy-preserving cloud inference infrastructure using custom Apple Silicon servers. Data is processed but never retained, with cryptographic guarantees that Apple itself cannot access user data. Used when on-device Apple Intelligence tasks exceed local model capacity. | Module 10 | AICore, Gemini Nano |
| **Provisioned Throughput Units (PTUs)** | Azure OpenAI's reserved compute capacity with hourly billing, providing guaranteed throughput for latency-sensitive production workloads. An alternative to pay-per-token pricing for high-volume applications. | Module 09 | Batch API, Token |
| **Skills** | Reusable, packaged capabilities that extend an agent's functionality. Implementations vary: Claude Skills (prompt-based markdown), OpenClaw/ClawHub Skills (code-based JS/TS), Codex Skills (instruction + script bundles). | Module 07 | Agent, ClawHub, Plugins |
| **Work IQ** | Microsoft's organizational intelligence layer that contextualizes Copilot responses using Microsoft Graph data (emails, files, meetings, org structure). Announced at Wave 3, March 9, 2026. | Module 04 | Agent 365, Copilot Studio |
| **Zapier Central** | Zapier's AI-powered automation builder that lets users describe workflows in natural language and generates Zaps automatically. Part of Zapier's broader AI evolution alongside Zapier Agents and Canvas. | Module 07 | MCP, Skills |

---

*Terms are grouped by domain and alphabetized within groups. Definitions should be updated as the landscape evolves.*
