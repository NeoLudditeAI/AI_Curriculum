# GLOSSARY.md — Canonical Term Definitions

All modules must use these definitions consistently. When a term is first introduced in a module, it should link back here.

Last updated: 2026-03-20

---

| Term | Definition | First Introduced | Related Terms |
|------|-----------|------------------|---------------|
| **Agent** | An AI system that can autonomously plan, execute multi-step tasks, use tools, and act on behalf of a user with varying degrees of supervision. | Module 03 | Subagent, Multi-agent orchestration, Tool use |
| **Agent SDK** | A software development kit for building custom agent systems. Major implementations: Anthropic Agent SDK, OpenAI Agents SDK, Google Agent Development Kit (ADK). | Module 04 | Agent, Orchestration |
| **ClawHub** | The skills registry for the OpenClaw open agent platform. Analogous to an app store for agent capabilities. Known security concerns (12-20% malicious skill rate as of early 2026). | Module 05 | OpenClaw, Skills |
| **Compaction** | The process of summarizing or truncating conversation history when context window limits are approached. What survives compaction varies by platform. | Module 02 | Context window, Memory |
| **Context engineering** | The emerging discipline of deliberately designing and managing what information is available in an AI system's context window to maximize output quality. Encompasses prompt design, memory management, RAG, and compaction strategies. | Module 02 | Context window, Prompt caching, RAG |
| **Context window** | The maximum amount of text (measured in tokens) that a model can process in a single interaction. As of March 2026, ranges from 128K to 1M+ tokens depending on model. | Module 01 | Token, Compaction |
| **Extended thinking** | Anthropic's reasoning mode where Claude models allocate additional compute to multi-step reasoning before generating a response. Visible as a "thinking" block in the output. | Module 01 | Reasoning modes, Chain-of-thought |
| **MCP (Model Context Protocol)** | An open protocol (originated by Anthropic, now widely adopted) that standardizes how AI applications connect to external data sources and tools. Uses a client-server architecture. | Module 06 | MCP server, MCP client, Tool use |
| **MCP server** | A lightweight program that exposes specific capabilities (data access, tool execution) to AI applications via the Model Context Protocol. | Module 06 | MCP, MCP client |
| **Multi-agent orchestration** | Architectural pattern where multiple specialized agents coordinate to complete complex tasks. Includes patterns like delegation, parallel execution, and summary propagation. | Module 04 | Agent, Subagent, Agent SDK |
| **OpenClaw** | An open-source agent platform providing a Gateway, channel-based communication, and the Pi Agent Runtime for building and running AI agents locally or self-hosted. | Module 05 | ClawHub, NemoClaw |
| **Prompt caching** | A cost-optimization technique where frequently reused prompt prefixes are cached server-side, reducing token processing costs on subsequent requests. Supported by Anthropic, Google, and others. | Module 02 | Context engineering, Token |
| **RAG (Retrieval-Augmented Generation)** | A pattern where relevant documents are retrieved from an external knowledge base and injected into the model's context to ground its responses in specific data. | Module 02 | Context engineering, Vector search |
| **Reasoning modes** | Model configurations that trade speed for depth of analysis. Includes Anthropic's extended thinking, OpenAI's o-series reasoning, and Google's Deep Think. | Module 01 | Extended thinking, Chain-of-thought |
| **Skills** | Reusable, packaged capabilities that extend an agent's functionality. Implementations vary: Claude Skills (prompt-based), OpenClaw/ClawHub Skills (code-based), Codex Skills. | Module 07 | Agent, ClawHub, Plugins |
| **Subagent** | An agent spawned by a parent agent to handle a specific subtask. Runs in its own context window; only a structured summary returns to the parent. | Module 04 | Agent, Multi-agent orchestration, Context isolation |
| **Token** | The fundamental unit of text processing for LLMs. Roughly 3/4 of a word in English. Pricing, context windows, and rate limits are all measured in tokens. | Module 01 | Context window |
| **Tool use** | The ability of an AI model to invoke external functions or APIs during response generation, extending its capabilities beyond text generation. Also called "function calling." | Module 03 | Agent, MCP, Structured outputs |

| **Agent 365** | Microsoft's enterprise agent governance platform providing agent registry, identity management (via Entra ID), compliance (via Purview), and security monitoring (via Defender). GA May 1, 2026, at $15/user/month or bundled in M365 E7 ($99/user/month). | Module 04 | Agent, Multi-agent orchestration, Copilot Studio |
| **Batch API** | An asynchronous API endpoint offered by major providers (Anthropic, OpenAI, Google) that processes requests within 24 hours at a 50% discount on token costs. Ideal for non-real-time workloads. | Module 09 | Token, Prompt caching |
| **Constitutional AI (CAI)** | Anthropic's approach to AI safety where behavioral principles are embedded into model training, enabling the model to self-correct against a defined constitution of rules. | Module 10 | Extended thinking |
| **Deep Research** | A multi-step autonomous research capability offered by ChatGPT and Gemini that searches, reads, and synthesizes information from multiple web sources to produce analyst-grade reports. | Module 03 | Agent, Tool use |
| **Firecracker MicroVM** | A lightweight virtual machine technology (developed by AWS) that boots in ~125ms with <5 MiB overhead, providing hardware-level isolation for agent sandboxing. | Module 03 | Agent, Tool use |
| **Handoff** | A multi-agent orchestration pattern where one agent transfers its full conversation state to another agent. First-class primitive in OpenAI's Agents SDK. | Module 04 | Agent, Multi-agent orchestration, Subagent |
| **NemoClaw** | NVIDIA's enterprise-hardened distribution of OpenClaw, adding the OpenShell sandbox for skill isolation and a privacy router for policy-based LLM inference routing. Early preview as of March 2026. | Module 05 | OpenClaw, ClawHub |
| **Work IQ** | Microsoft's organizational intelligence layer that contextualizes Copilot responses using Microsoft Graph data (emails, files, meetings, org structure). Announced at Wave 3, March 9, 2026. | Module 04 | Agent 365 |

*New terms should be added as modules are written. Definitions should be updated if understanding evolves.*
