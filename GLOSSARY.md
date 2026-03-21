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

*New terms should be added as modules are written. Definitions should be updated if understanding evolves.*
