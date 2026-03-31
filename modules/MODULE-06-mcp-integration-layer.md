# Module 06: MCP & the Integration Layer

**Module:** 06
**Title:** MCP & the Integration Layer
**Last Updated:** 2026-03-20
**Status:** COMPLETE
**Word Count Target:** 4,000-5,000

---

## Executive Summary

The Model Context Protocol (MCP) is an open standard that defines how AI applications connect to external tools and data sources. Created by Anthropic in November 2024 and donated to the Linux Foundation's Agentic AI Foundation in December 2025, MCP has become the de facto integration protocol across the AI industry -- adopted by Anthropic, OpenAI, Google, Microsoft, and dozens of specialized tools within roughly a year of its launch [1][2]. This module covers MCP's protocol architecture, its client-server model, the growing registry ecosystem, platform-by-platform adoption status, practical guidance for building and consuming MCP servers, and the role of universal bridges like Zapier MCP in extending reach to thousands of applications.

---

## Prerequisites

- [Module 00: Landscape Overview](MODULE-00-landscape-overview.md) -- for the competitive context and platform ecosystem map
- [Module 03: Single-Agent Systems](MODULE-03-single-agent-systems.md) -- for understanding how agents use tools (MCP is the plumbing that delivers those tools)

---

## 1. What MCP Is and Why It Exists

### The Problem MCP Solves

Before MCP, every AI application that needed to connect to an external service required a bespoke integration. If you wanted Claude to read your GitHub issues, query your database, and check your calendar, each connection demanded its own custom code -- different authentication flows, different data formats, different error handling. Multiply this across dozens of AI clients and hundreds of services, and you get an M x N integration matrix that scales poorly.

MCP collapses this to M + N. A service implements one MCP server; an AI client implements one MCP client. Any client can connect to any server. The protocol handles capability discovery, message formatting, authentication, and transport -- the same way HTTP standardized web communication or LSP (Language Server Protocol) standardized IDE-to-language-tool communication [1].

### Origins and Governance

Anthropic published the MCP specification in November 2024 as an open protocol. The initial reception was cautious -- another vendor-originated standard -- but adoption accelerated rapidly through 2025 as OpenAI, Google, and Microsoft each announced support. In December 2025, Anthropic donated MCP to the Linux Foundation's newly created Agentic AI Foundation, placing governance under a vendor-neutral body [2]. This move addressed the legitimate concern that a protocol owned by one AI company would be shaped to favor that company's products.

As of March 2026, MCP is maintained as an open specification with contributions from multiple organizations. The protocol versioning and specification process operates through the Foundation, though Anthropic remains the largest single contributor to the reference implementations.

---

## 2. Protocol Architecture

### Wire Protocol: JSON-RPC 2.0

MCP communicates using JSON-RPC 2.0, a lightweight remote procedure call protocol. Every message is a JSON object with a `jsonrpc` field set to `"2.0"`. There are three message types [1]:

- **Requests** carry a unique `id`, a `method` name, and optional `params`. The sender expects a response.
- **Responses** carry the same `id` as the request, plus either a `result` or an `error` object.
- **Notifications** have a `method` and optional `params` but no `id` -- they are fire-and-forget messages that expect no response.

The unique ID tracking on requests enables multiplexing: a client can fire multiple requests concurrently and match responses as they arrive. This is critical for agentic workloads where a model might invoke several tools in parallel.

### Transport Layers

MCP defines two active transport mechanisms and one deprecated one [1]:

| Transport | Use Case | How It Works | Status |
|-----------|----------|-------------|--------|
| **STDIO** | Local servers | Client spawns server as a child process; communication flows over stdin/stdout | GA, recommended for local |
| **Streamable HTTP** | Remote servers | Client sends HTTP POST requests; server can respond with single JSON or upgrade to SSE stream | GA, recommended for remote |
| **SSE (Server-Sent Events)** | Remote servers (legacy) | Separate SSE endpoint for server-to-client, HTTP POST for client-to-server | Deprecated, replaced by Streamable HTTP |

**STDIO** is the simplest model. The MCP client launches the server binary as a subprocess. Messages flow over standard I/O pipes -- no networking, no ports, no TLS configuration. This is how most local MCP servers work: Claude Desktop or Claude Code spawns a process like `npx @modelcontextprotocol/server-filesystem /path/to/allowed/dir` and communicates directly over pipes. The isolation boundary is the OS process.

**Streamable HTTP** is the modern remote transport. The client sends a JSON-RPC request as an HTTP POST to the server's MCP endpoint. The server can reply with a single JSON response (for simple request/response) or upgrade to a Server-Sent Events stream for long-running operations or server-initiated notifications. This replaces the older SSE transport, which required clients to manage two separate connections (one for receiving, one for sending).

### Persistent Connections and Capability Discovery

Unlike REST APIs, MCP maintains persistent, stateful connections. When a client connects, the protocol performs a capability negotiation handshake:

1. **Initialize** -- Client sends `initialize` with its supported protocol version and capabilities.
2. **Server responds** -- Server replies with its own protocol version, capabilities, and server info.
3. **Initialized notification** -- Client sends `notifications/initialized` to confirm the session is active.

After initialization, the client can discover available tools, resources, and prompts by calling `tools/list`, `resources/list`, and `prompts/list`. If the server's capabilities change during the session (e.g., new tools become available), the server sends a notification and the client can re-fetch the relevant list [1].

This auto-discovery model means a client never needs hardcoded knowledge of what a server offers. Connect to it, ask what it can do, and present those capabilities to the model.

### Security: OAuth 2.1 Authorization

For remote MCP servers, the specification recommends OAuth 2.1 for authorization [1]. The flow works as follows:

1. Client discovers the server's authorization metadata via a well-known endpoint.
2. Client obtains an access token through standard OAuth 2.1 flows (authorization code with PKCE for interactive clients, client credentials for machine-to-machine).
3. Client includes the access token in subsequent HTTP requests.
4. Server validates the token and applies scope-based permissions.

The specification also defines **Protected Resource Metadata** -- a mechanism for servers to advertise their authorization requirements so clients can automatically determine how to authenticate. This is optional but recommended for any server exposed over a network.

For STDIO (local) servers, transport-level security is typically unnecessary since communication stays within the local machine's process boundary. Access control relies on OS-level permissions and the filesystem sandbox.

---

## 3. Core Primitives

MCP defines three primitive types that servers can expose [1]:

### Tools (Model-Controlled)

Tools are functions the AI model can invoke. They are the most common primitive -- when people say "MCP server," they usually mean a server that exposes tools. Each tool has a name, a description (used by the model to decide when to invoke it), and a JSON Schema defining its input parameters.

Example: a GitHub MCP server exposes tools like `create_issue`, `search_code`, `list_pull_requests`. The model reads the tool descriptions, decides which to call based on the user's request, constructs the input parameters, and interprets the result.

Tools are **model-controlled** -- the AI model decides when and how to call them based on the conversation context. The human user sets up which MCP servers are connected, but the model autonomously selects which tools to invoke.

### Resources (Application-Controlled)

Resources are data sources that the client application (not the model) decides when to access. They use URI-based addressing (`resource://database/users/schema`, `file:///path/to/doc.md`) and provide structured data to the application.

The key distinction from tools: the application controls resource access based on its own logic, not model decisions. A client might pre-load certain resources into context when the user opens a project, or offer a resource browser UI.

### Prompts (Reusable Templates)

Prompts are parameterized message templates that servers can expose. They provide reusable interaction patterns -- a server might offer a `code_review` prompt that takes a `language` parameter and returns a structured review template. Prompts are selected by the user (typically via a slash command or menu), not autonomously by the model.

### How the Primitives Work Together

In practice, most MCP servers expose primarily tools. Resources and prompts see less adoption but solve real problems. A typical agentic workflow:

1. User connects Claude to a project management MCP server.
2. Claude discovers 12 tools (create task, update status, query backlog, etc.) via `tools/list`.
3. User asks "What's blocking the release?"
4. Claude autonomously calls `query_backlog` with a filter for blocked items, reads the results, and synthesizes an answer.
5. User says "Move all the P1 bugs to In Progress."
6. Claude calls `update_status` for each matching item.

The model handles tool selection and invocation; the human handles which servers are connected and can set permission boundaries on what actions are allowed.

---

## 4. Platform Adoption

MCP adoption is nearly universal among major AI platforms as of March 2026, but depth of integration varies significantly.

### Adoption Matrix

| Platform | MCP Client | MCP Server | Status | Integration Depth |
|----------|-----------|------------|--------|-------------------|
| **Anthropic Claude** | Claude Desktop, Cowork, Claude Code | -- | GA | Native/foundational -- MCP is the primary connectivity paradigm |
| **OpenAI ChatGPT** | ChatGPT (Developer Mode), Deep Research, Agents SDK | -- | Beta (ChatGPT), GA (SDK) | Functional but positioned as developer/advanced feature |
| **Google Gemini** | Gemini CLI, ADK, Antigravity IDE | Maps, Workspace, Cloud Services | GA | All-in -- managed MCP servers for Google services |
| **Microsoft Copilot** | Copilot Studio, GitHub Copilot | Dynamics 365, Azure, Azure Functions hosting | GA | Strong enterprise adoption with governance focus |
| **OpenClaw** | Gateway | -- | GA | Supports MCP servers as tools within agent workflows |

### Anthropic Claude: MCP-Native

Claude's relationship to MCP is foundational -- Anthropic created the protocol and built its entire connectivity architecture around it [F1]. Claude Desktop, Cowork, and Claude Code all function as MCP clients. Configuration is via `claude_desktop_config.json` (Desktop/Cowork) or project settings (Code). Multiple simultaneous server connections are supported.

Anthropic publishes official reference MCP servers for common use cases: Filesystem (local file operations), Git, GitHub, Fetch (web content), Memory (knowledge graph persistence), PostgreSQL, Playwright (browser automation), and others [F1]. The Connectors Directory lists 50+ native integrations, most built on MCP.

Claude's MCP integration is the deepest of any platform. MCP servers are accessible from chat, Cowork agentic sessions, Claude Code development sessions, scheduled tasks, and artifacts. This is not a bolt-on feature -- it is how Claude connects to the world.

### OpenAI ChatGPT: Retroactive Adoption

OpenAI adopted MCP after Anthropic originated it. ChatGPT supports MCP servers via Developer Mode (Settings > Connectors > Advanced), currently in Beta [F2]. The implementation supports full read and write actions -- update Jira tickets, trigger workflows, write to databases -- but OpenAI labels write capabilities as "powerful but dangerous" and emphasizes testing for prompt injection risks.

The most accessible MCP integration is through Deep Research, which connects to MCP servers for additional data sources during its multi-source research workflow (GA since February 2026) [F2]. The Agents SDK and Responses API support MCP natively (GA), with built-in remote MCP as a tool type.

MCP Apps is a notable OpenAI-specific extension: MCP tools can return interactive UI components (dashboards, forms, visualizations) that render directly in the ChatGPT interface (GA since January 2026) [F2].

**Assessment:** MCP support is functional but less deeply woven into the product than in Claude's ecosystem. It reads as an adopted standard rather than a native architecture.

### Google Gemini: Managed MCP Servers

Google has committed to MCP aggressively, particularly on the server side [F3]. The Gemini CLI, Agent Development Kit (ADK), and Antigravity IDE all support MCP connections as clients. More significantly, Google is rolling out **managed MCP servers** for its own services -- enterprise-ready, globally consistent endpoints:

- **Google Maps MCP** (GA) -- places, weather, routing
- **Google Workspace MCP** (GA) -- Docs, Chat, Calendar, Drive
- **Cloud Services MCP** (announced, rolling out) -- Cloud Run, Cloud Storage, AlloyDB, Cloud SQL, Spanner, Looker, Pub/Sub, Dataplex

Google is the largest cloud provider to commit to managed, remote MCP servers [F3]. For users of any MCP client (including Claude), Google's managed servers are directly connectable -- a significant interoperability win that demonstrates the M + N benefit of standardization.

### Microsoft Copilot: Enterprise MCP

Microsoft is one of the strongest enterprise MCP adopters [F4]. The implementation spans multiple products:

**As MCP Client:**
- Copilot Studio agents connect to external MCP servers (GA)
- GitHub Copilot in VS Code connects to MCP servers with auto-approve support for trusted servers (GA)

**As MCP Server:**
- Dynamics 365 ERP data exposed via MCP (Public Preview)
- Azure resource management exposed via MCP (GA), built into Visual Studio 2026
- Azure Functions can host MCP servers in .NET, Java, JavaScript, Python, TypeScript (GA)

**As MCP Host:**
- Azure Functions provides serverless MCP server hosting -- deploy your MCP server to Azure and it scales automatically

Microsoft has published security and governance guidelines for MCP, including identity-secure agentic workflows and audit trails [F4]. Notable gap: no official Microsoft 365 / Outlook / Graph MCP server yet, though community servers exist.

---

## 5. The MCP Registry Ecosystem

### The Official Registry

The MCP Registry at `registry.modelcontextprotocol.io` functions as a root authority for MCP server metadata [3]. It verifies namespaces, enforces uniqueness, and stores canonical metadata. The registry is intentionally minimal -- it provides the authoritative record of what servers exist and who publishes them, but leaves discovery UX, ratings, and curation to third-party directories.

As of March 2026, the registry indexes **19,729+ production-ready servers** [3]. This number has grown roughly 16x from the ~1,200 servers cataloged in community directories in mid-2025 [F1], reflecting explosive ecosystem growth.

### Third-Party Directories

Several community directories provide richer discovery experiences on top of the registry:

| Directory | URL | Focus |
|-----------|-----|-------|
| **mcp.so** | mcp.so | Largest community directory; search, categories, ratings |
| **Smithery** | smithery.ai | Curated directory with installation guides |
| **mcpservers.org** | mcpservers.org | Community-maintained catalog |
| **awesome-mcp-servers** | GitHub | Curated awesome-list format |

### Official vs. Community Servers

A critical distinction for production use: **official** MCP servers are published and maintained by the service provider (Anthropic's reference servers, Google's managed servers, Notion's hosted server, Zapier's MCP server). **Community** servers are built by third parties and vary in quality, maintenance, and security posture.

For services where an official MCP server exists, prefer it. For services without one, evaluate community servers carefully -- check maintenance activity, star count, and whether the server handles authentication securely.

---

## 6. Building MCP Servers

### Official SDKs

MCP provides official SDKs in two languages [4]:

- **TypeScript** -- `@modelcontextprotocol/sdk` (npm)
- **Python** -- `mcp` (PyPI)

Both SDKs handle the protocol layer (JSON-RPC serialization, transport management, capability negotiation) so developers can focus on implementing tools, resources, and prompts.

### Anatomy of a Simple MCP Server (TypeScript)

A minimal MCP server that exposes a single tool:

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new McpServer({
  name: "weather",
  version: "1.0.0",
});

server.tool(
  "get_forecast",
  "Get weather forecast for a city",
  { city: { type: "string", description: "City name" } },
  async ({ city }) => {
    const data = await fetchWeatherAPI(city);
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
```

This server: declares itself as "weather" v1.0.0, registers one tool (`get_forecast`) with a schema and handler, and listens on STDIO. When a client connects, it discovers the `get_forecast` tool and can invoke it by passing a city name.

### Development Workflow

1. **Define your tools.** Identify what operations the server should expose. Write clear descriptions -- the model uses these to decide when to invoke each tool.
2. **Choose a transport.** STDIO for local development and local-only servers. Streamable HTTP for servers that will be accessed remotely.
3. **Implement handlers.** Each tool handler receives validated input and returns structured content (text, images, or embedded resources).
4. **Test locally.** Connect your server to Claude Desktop or Claude Code using the STDIO transport. The MCP Inspector (`@modelcontextprotocol/inspector`) provides a debugging UI.
5. **Add authentication** (for remote servers). Implement OAuth 2.1 if the server accesses user-specific data or performs privileged operations.
6. **Publish.** Register with the MCP Registry for discoverability. For internal/enterprise servers, deploy to your hosting infrastructure.

### Hosting Options

| Option | Best For | Complexity |
|--------|----------|-----------|
| **Local STDIO** | Personal tools, development | Low -- just run the binary |
| **Azure Functions** | Enterprise, serverless, auto-scaling | Medium -- Microsoft provides MCP hosting templates |
| **Docker container** | Self-hosted, consistent environments | Medium |
| **Cloud Run / Lambda** | Serverless remote servers | Medium |
| **Managed (Google)** | Google services specifically | Low -- Google hosts and maintains |

### Common Pitfalls

- **Vague tool descriptions.** The model selects tools based on their descriptions. "Manage tasks" is useless; "Create a new task in the project backlog with title, priority, and assignee" is actionable.
- **Overly broad tool surface.** A server that exposes 50 tools overwhelms the model's tool selection. Group related operations and keep the tool count manageable (under 15-20 per server is a good target).
- **Missing error handling.** Return structured error messages the model can interpret. A raw stack trace is not useful; "Task not found: ID 12345 does not exist in project X" gives the model enough context to recover or inform the user.
- **Ignoring rate limits.** If your server wraps an external API, implement rate limiting and backoff. Models can be aggressive tool callers.
- **Security surface.** Any MCP server that performs write operations (create records, send emails, delete data) is a potential vector for prompt injection attacks. Validate inputs, implement confirmation flows for destructive operations, and log all actions.

---

## 7. Zapier MCP: The Universal Bridge

### Why Zapier MCP Matters

For the thousands of applications that will never build their own MCP server, Zapier MCP provides a universal bridge. Zapier connects to 8,000+ applications. Its MCP server exposes 30,000+ actions across those applications to any MCP client [F5].

The architecture:

```
AI Client (Claude, ChatGPT, etc.)
    |
    | (MCP protocol)
    v
Zapier MCP Server
    |
    | (Zapier's internal connectors)
    v
8,000+ apps (Gmail, Slack, Salesforce, QuickBooks, Notion, etc.)
```

This means Claude can send an email via Gmail, create a Salesforce record, update a Notion database, and post to Slack -- all through a single MCP connection to Zapier, without any of those services needing their own MCP server.

### Pricing and Quotas

One MCP tool call to Zapier consumes **2 tasks** from your Zapier plan quota [F5]. This matters at scale:

| Zapier Plan | Monthly Cost | Tasks/Month | MCP Calls/Month |
|-------------|-------------|-------------|-----------------|
| Free | $0 | 100 | 50 |
| Professional | $19.99/mo (annual) | 750 | 375 |
| Team | $103.50/mo | 2,000 | 1,000 |
| Enterprise | Custom | Custom | Custom |

For light usage (a few dozen MCP calls per day), the Professional plan suffices. For agentic workflows that make frequent tool calls, the 2x task multiplier can burn through quotas quickly. Monitor usage and consider whether a direct MCP server (for high-volume integrations) is more cost-effective than routing through Zapier.

### Make as Alternative Bridge

Make (formerly Integromat) offers a similar universal bridge capability with its own MCP server (GA), available in both local and cloud-hosted versions [F5]. Make's unique advantage is **bidirectional MCP support** -- it acts as both an MCP server (controllable by Claude) and an MCP client (can connect to other MCP servers within its workflows).

Make is significantly cheaper per operation: roughly $10.59/month for 10,000 operations versus Zapier's $19.99 for 750 tasks [F5]. However, Zapier has broader app coverage (8,000 vs. 3,000) and a simpler integration experience.

> **Volatility warning:** The universal bridge space is evolving rapidly. Rube (500+ apps via unified MCP interface) and similar aggregators are emerging. The economics and capabilities of these bridges will shift significantly through 2026.

---

## 8. Specialized Tool MCP Adoption

Beyond the major platforms, MCP adoption among specialized tools is accelerating [F5]:

| Tool | MCP Server | Status | Key Capabilities |
|------|-----------|--------|-----------------|
| **Otter.ai** | Official | GA | Search/analyze meeting transcripts across all time periods |
| **Notion** | Official (hosted) | GA | Full CRUD on pages, databases, blocks; search across workspace |
| **ElevenLabs** | Official | GA | Text-to-speech, voice cloning, transcription, sound effects; also supports inbound MCP |
| **Make** | Official (local + cloud) | GA | Scenario execution and management; also functions as MCP client |
| **Zapier** | Official | GA | 30,000+ actions across 8,000+ apps |
| **Perplexity** | Community only | Unofficial | Web search via Claude; no official server |
| **Midjourney** | Community only | Unofficial | Image generation; unreliable (no official API) |
| **Cursor** | MCP client | GA | Connects to any MCP server for enhanced coding context |
| **Windsurf** | MCP client | GA | Connects to any MCP server |

Notion's implementation is notable: its hosted MCP server at `https://mcp.notion.com/sse` provides full read/write access to your workspace -- pages, databases, blocks, properties, comments -- making Notion one of the most deeply MCP-integrated productivity tools [F5].

ElevenLabs demonstrates bidirectional MCP: its server exposes audio capabilities to Claude, and its Conversational AI agents can connect to external MCP servers to access data sources during conversations [F5].

---

## 9. MCP vs. Native Integrations

MCP is not the only way AI platforms connect to external services. Each major platform also maintains its own native integration ecosystem:

| Integration Type | Strengths | Weaknesses |
|-----------------|-----------|-----------|
| **MCP** | Universal (any client, any server), open standard, community ecosystem, auto-discovery | Requires server implementation, newer/less mature, security model still evolving |
| **Native connectors** (Claude Connectors, ChatGPT Apps, Copilot connectors) | Tighter UX integration, vendor-vetted quality, simpler setup | Vendor lock-in, limited to what the platform offers, slower to expand |
| **Automation platforms** (Zapier, Make, Power Automate) | Massive app coverage, visual workflow design, scheduling | Added cost, latency, task quotas, another dependency |

In practice, these approaches coexist. A typical advanced setup might use:

- **Native connectors** for core, high-frequency integrations (Google Workspace, Slack)
- **MCP servers** for developer tools and specialized services (GitHub, databases, custom APIs)
- **Zapier MCP** as the catch-all for everything else

The trend favors MCP as the default integration pattern, with native connectors reserved for cases where deeper platform integration (pre-configured UX, admin-managed setup, enterprise compliance) justifies the vendor-specific approach.

---

## Key Takeaways

1. **MCP collapses integration complexity from M x N to M + N.** Any MCP client can connect to any MCP server -- services implement once, AI clients consume universally.

2. **The protocol is JSON-RPC 2.0 over STDIO (local) or Streamable HTTP (remote).** Persistent connections, capability auto-discovery, and OAuth 2.1 authorization are core design decisions.

3. **Three primitives: Tools (model-controlled), Resources (app-controlled), Prompts (user-selected).** Tools dominate real-world usage.

4. **All four major platforms support MCP**, but at different depths. Claude is MCP-native (deepest). Google is investing heavily in managed servers. Microsoft focuses on enterprise hosting and governance. OpenAI's adoption is functional but not foundational.

5. **The registry indexes 19,729+ servers** as of March 2026 -- roughly 16x growth from mid-2025. Third-party directories (mcp.so, Smithery) provide richer discovery.

6. **Building an MCP server is straightforward** with the official TypeScript or Python SDKs. The main challenge is designing good tool descriptions and handling security for write operations.

7. **Zapier MCP bridges to 8,000+ apps** that lack their own MCP servers, at a cost of 2 Zapier tasks per MCP call. Make offers a cheaper alternative with bidirectional MCP support.

8. **MCP and native connectors coexist.** MCP is becoming the default, but native integrations retain advantages for core platform-specific workflows.

9. **Security is the frontier challenge.** Write-capable MCP servers are prompt injection surfaces. OAuth 2.1, input validation, and action logging are non-negotiable for production deployments.

10. **MCP's governance under the Linux Foundation** (since December 2025) addresses vendor neutrality concerns and positions the protocol as a durable industry standard rather than a single-vendor initiative.

---

## Cross-References

- [Module 00: Landscape Overview](MODULE-00-landscape-overview.md) -- competitive context for MCP adoption across ecosystems
- [Module 02: Context Engineering](MODULE-02-context-engineering.md) -- context windows and caching strategies that MCP-delivered context interacts with
- [Module 03: Single-Agent Systems](MODULE-03-single-agent-systems.md) -- how agents use tools; MCP is the transport layer for tool delivery
- [Module 04: Multi-Agent Orchestration](MODULE-04-multi-agent-orchestration.md) -- MCP's role in multi-agent systems where agents share tool access
- [Module 05: OpenClaw & Open Agent Ecosystem](MODULE-05-openclaw-and-open-agents.md) -- OpenClaw's MCP integration as tools within its Gateway
- [Module 07: Skills, Plugins & Automation](MODULE-07-skills-plugins-automation.md) -- how MCP servers compose into higher-level skills and plugins
- [Module 08: Consumer AI Comparison](MODULE-08-consumer-ai-comparison.md) -- MCP as a differentiator in the consumer platform comparison
- [Module 09: Developer Platforms & APIs](MODULE-09-developer-platforms-apis.md) -- MCP alongside native APIs in the developer tooling landscape
- [Module 10: Frontier Topics](MODULE-10-frontier-topics.md) -- MCP as the ecosystem bridge between open and closed platforms

---

## Sources

| # | Source | URL | Date |
|---|--------|-----|------|
| [1] | MCP Specification (modelcontextprotocol.io) | https://modelcontextprotocol.io/specification | 2026-03-20 |
| [2] | Anthropic donates MCP to Linux Foundation Agentic AI Foundation | https://www.anthropic.com/news/mcp-linux-foundation | 2026-03-20 |
| [3] | MCP Registry | https://registry.modelcontextprotocol.io | 2026-03-20 |
| [4] | MCP SDKs -- TypeScript and Python | https://modelcontextprotocol.io/sdks | 2026-03-20 |
| [F1] | Anthropic/Claude Ecosystem Profile | reference/profiles/anthropic-claude.md | 2026-03-18 |
| [F2] | OpenAI/ChatGPT Ecosystem Profile | reference/profiles/openai-chatgpt.md | 2026-03-18 |
| [F3] | Google/Gemini Ecosystem Profile | reference/profiles/google-gemini.md | 2026-03-18 |
| [F4] | Microsoft/Copilot Ecosystem Profile | reference/profiles/microsoft-copilot.md | 2026-03-18 |
| [F5] | Specialized Tools Profile | reference/profiles/specialized-tools.md | 2026-03-18 |
