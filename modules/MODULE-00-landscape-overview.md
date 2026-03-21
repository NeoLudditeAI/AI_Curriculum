# Module 00: Landscape Overview

**Last updated:** 2026-03-20
**Status:** IN REVIEW
**Word count target:** 4,000-5,000

---

## Executive Summary

The AI industry in March 2026 is a $375-390 billion market dominated by four platform ecosystems -- Anthropic, OpenAI, Google, and Microsoft -- each backed by hundreds of billions in capital and pursuing distinct strategic visions. Beneath these giants, a layer of specialized tools (Perplexity, Midjourney, ElevenLabs), AI coding assistants (Cursor, Windsurf/Antigravity, Claude Code, Codex), and open-source frameworks (OpenClaw, Ollama, Llama, Gemma) create a rich and competitive landscape. This module maps the terrain: who the players are, what they build, how the market is structured, and where the critical battles are being fought.

---

## Prerequisites

None -- this is the recommended starting point for the curriculum.

---

## The Four Platform Ecosystems

The AI industry has consolidated around four vertically integrated platform ecosystems. Each combines foundational models, consumer products, developer APIs, enterprise offerings, and agentic capabilities -- but with markedly different strategic centers of gravity.

### Anthropic / Claude

Anthropic is the youngest of the four but has established itself as the quality and safety leader, particularly in enterprise and developer markets. Founded in 2021 by former OpenAI researchers, the company closed a $30B Series G in February 2026 (led by GIC and Coatue), reaching a $380B valuation [F1]. Annualized revenue stands at roughly $14B, with approximately 80% derived from enterprise customers [F1].

Anthropic's product strategy is converging on autonomous agency. Claude Cowork (Research Preview) operates directly on the user's desktop, browsing the web, reading and writing local files, and executing multi-step tasks. Claude Code, the terminal-based agentic coding tool, reached $1B ARR within six months of launch and has accelerated to an estimated ~$2.5B ARR by March 2026 [UNVERIFIED], commanding an estimated 54% of the enterprise coding agent market [1a]. The Claude Agent SDK (Python/TypeScript) and experimental Agent Teams feature extend this into multi-agent orchestration. MCP (Model Context Protocol), which Anthropic originated, is now the de facto standard for connecting AI systems to external tools and data sources.

**Strategic center of gravity:** Enterprise autonomy -- Claude as a trusted digital worker that acts, not just answers.

### OpenAI / ChatGPT

OpenAI remains the largest player by every financial metric. Its February 2026 funding round raised $110B (from Amazon, NVIDIA, and SoftBank), valuing the company at $730B [F2]. ChatGPT has over 900 million weekly active users and 50 million paying consumer subscribers [F2]. Annualized revenue is approximately $25B [F2].

OpenAI's product breadth is unmatched: ChatGPT spans chat, vision, voice, agents, and creative generation. GPT-5.4, launched March 5, 2026, pushed the context window to 1M tokens, with Mini and Nano variants following on March 17 [F2]. The product portfolio includes ChatGPT Agent (autonomous web browsing, formerly Operator), Codex (cloud-based coding agent with desktop apps), Sora 2 (video generation with Disney character licensing), and Deep Research with MCP integration [F2].

However, OpenAI's shipping velocity has created friction. Rapid model churn from GPT-5 through GPT-5.4 within roughly 12 months has caused upgrade fatigue, with reports of 1.5 million subscription cancellations in March 2026 alone [F2]. Consumer web traffic share (per Similarweb) has declined from 87.2% to 68% even as absolute user counts grew [1a]. Mobile app market share tells a different story -- ChatGPT holds under 45% on mobile (per Apptopia), meaning the market is considerably less concentrated outside desktop web [F2].

**Strategic center of gravity:** Consumer scale and creative breadth -- be the default AI for everyone, for everything.

### Google / Gemini

Google is the only provider with models running at every layer of the computing stack: cloud (Gemini 3.1 Pro, currently in Preview), browser (Gemini in Chrome), on-device (Gemini Nano on Android/Pixel), and embedded inside the world's most-used productivity suite (Workspace) [F3]. Alphabet's market cap exceeds $3.71 trillion, and the company plans $175-185B in AI-related capital expenditure for 2026 [1e]. The Gemini API handles 85 billion monthly requests [1e].

Google's product sprawl is both its strength and its challenge. The portfolio includes the Gemini App (consumer chat), Flow (unified creative studio merging Whisk, ImageFX, and video generation), Antigravity (agentic IDE built on the $2.4B Windsurf acquisition), Jules (coding agent), NotebookLM, Chrome Auto Browse, and a deep enterprise stack through Vertex AI [F3]. The Agent Development Kit (ADK) is Google's answer to Anthropic's Agent SDK and OpenAI's Agents SDK.

Google's unique asset is distribution. Android, Chrome, Gmail, Google Docs, Google Search -- Gemini can reach billions of users through surfaces they already use daily, without requiring them to adopt a new product.

**Strategic center of gravity:** Ubiquitous integration -- AI woven into every Google surface and device.

### Microsoft / Copilot

Microsoft takes a fundamentally different approach: rather than building a standalone AI platform, it embeds AI into the enterprise software stack that already runs most of the world's businesses. With a market cap around $3 trillion, Microsoft generates over $13B in AI annual revenue run rate [F4].

The March 9, 2026 "Wave 3" announcement marked a strategic inflection. Microsoft introduced Copilot Cowork (built with Anthropic, Research Preview), which executes long-running autonomous tasks across Outlook, Word, Excel, PowerPoint, and Teams. Agent 365, the governance control plane for enterprise agents, reaches GA on May 1, 2026, priced at $15/user/month. The new E7 Frontier Suite bundles everything at $99/user/month [F4].

Microsoft's AI ecosystem is uniquely layered. At the model level, Azure OpenAI Service provides enterprise access to OpenAI's models. At the developer level, Copilot Studio offers low-code agent building with 1,400+ connectors. At the infrastructure level, Microsoft Foundry (formerly Azure AI Studio) catalogs 11,000+ models [F4]. MCP support is now GA in both Copilot Studio and Azure Functions.

**Strategic center of gravity:** Enterprise workflow -- AI that meets workers inside the tools they already use.

### Platform Comparison at a Glance

| Dimension | Anthropic/Claude | OpenAI/ChatGPT | Google/Gemini | Microsoft/Copilot |
|-----------|-----------------|-----------------|---------------|-------------------|
| **Valuation / Market Cap** | $380B | $730B | $3.71T (Alphabet) | ~$3T |
| **Annualized AI Revenue** | ~$14B | ~$25B | Not broken out | $13B+ run rate |
| **Consumer Users** | ~2% web share | 900M+ WAU, 68% web share | 18.2% web share (fastest growing) | Embedded in M365 base |
| **Enterprise Position** | ~40% enterprise LLM spend | 9M+ business users | #3 cloud (Vertex AI) | Dominant enterprise suite |
| **Flagship Model** | Claude Opus 4.6 | GPT-5.4 | Gemini 3.1 Pro (Preview) | Azure OpenAI (GPT-5.4) |
| **Max Context Window** | 1M tokens | 1M tokens | 1M tokens (Flash) | Via Azure OpenAI |
| **Agentic Product** | Cowork (Preview) | ChatGPT Agent (GA) | Chrome Auto Browse | Copilot Cowork (Preview) |
| **Coding Tool** | Claude Code | Codex | Antigravity / Jules | GitHub Copilot |
| **Agent Framework** | Agent SDK + Agent Teams | Agents SDK | ADK + Agent Engine | Copilot Studio |
| **Unique Asset** | Safety reputation, MCP origin | Scale, creative tools (Sora) | Distribution (Android/Chrome/Workspace) | Enterprise footprint (M365) |

---

## Specialized Tools

Beyond the four platforms, a constellation of focused tools occupies niches that the platforms either cannot or choose not to fill.

### AI-Native Productivity

**Perplexity** has carved out the AI-powered research space, combining web search with LLM synthesis to deliver sourced, cited answers. Unlike ChatGPT or Gemini's chat interfaces, Perplexity is purpose-built for information retrieval with transparency about where claims come from.

**Notion AI** integrates directly into Notion's workspace, offering AI-powered writing, summarization, and Q&A grounded in the user's own documents and databases. Its value is contextual: it knows your workspace.

**Otter.ai** dominates AI meeting intelligence with OtterPilot, an autonomous agent that joins virtual meetings, transcribes, identifies speakers, and distributes summaries. Its MCP server integration means Claude can now directly search and analyze meeting transcripts [F5].

### Automation Platforms

**Zapier** connects 8,000+ apps through automated workflows (Zaps) and has become strategically significant as a universal MCP bridge -- its MCP server lets Claude trigger workflows across thousands of services that lack native MCP support [F5]. **Make** (formerly Integromat) offers a similar capability with a more visual, developer-friendly interface and its own MCP server [F5].

### Creative AI

**Midjourney** remains the quality leader in AI image generation, valued for its distinctive aesthetic and community-driven development on Discord. **ElevenLabs** leads in voice synthesis and cloning, with both consumer and API offerings. Both now offer MCP servers, enabling integration into agentic workflows [F5].

> **Volatility warning:** The specialized tools space moves fast. MCP adoption is expanding weekly, and the boundary between "specialized tool" and "platform feature" blurs as the big four absorb capabilities that were once only available from independents.

---

## AI Coding Tools

AI-assisted coding has become one of the most commercially significant AI application categories, with the market reaching an estimated $12.8B in 2026 [2a]. Seventy-three percent of engineering teams now use AI coding tools daily, up from 41% in 2025 [2b].

### Architectural Approaches

The coding tools landscape has fragmented into four distinct architectural types:

**IDE-integrated assistants** add AI capabilities to existing editors. GitHub Copilot is the market leader here with 20 million+ users (4.7 million paid), offering code completion, chat, and agent capabilities across VS Code, JetBrains, and other editors [2a][F4].

**IDE forks** take an existing editor (typically VS Code) and rebuild it around AI. **Cursor** leads this category with 360,000+ paying users and a reputation for the best AI-native editing experience [2a]. **Windsurf** was acquired by Google for $2.4B in July 2025 and relaunched as **Antigravity**, though the transition has been rocky -- the Antigravity IDE remains in Preview with reported stability issues [2a][F3].

**Terminal agents** operate entirely in the command line, executing multi-step coding tasks autonomously. **Claude Code** defines this category, leveraging Claude's 1M-token context window to reason about entire codebases. Its trajectory from $1B ARR within six months to an estimated ~$2.5B ARR by March 2026 [UNVERIFIED] demonstrates the commercial demand for autonomous coding agents [1a][F1].

**Cloud agents** run coding tasks asynchronously in cloud sandboxes. OpenAI's **Codex** (1.6 million+ weekly users, with macOS and Windows desktop apps) and Google's **Jules** both operate this way, accepting tasks and returning completed code without requiring the developer to watch in real time [2a][F2][F3].

### Coding Tools Comparison

| Tool | Architecture | Users / Adoption | Best For | Price (Individual) |
|------|-------------|-----------------|----------|-------------------|
| **GitHub Copilot** | IDE-integrated | 20M+ users, 4.7M paid | Budget-conscious teams, broad IDE support | $10/mo (Individual) |
| **Cursor** | IDE fork (VS Code) | 360K+ paying | Best AI-native IDE experience | $20/mo (Pro) |
| **Antigravity** | IDE fork (Windsurf) | In Preview | Google ecosystem integration | TBD (Preview) |
| **Claude Code** | Terminal agent | ~$2.5B ARR [UNVERIFIED] | Complex architecture, large codebases | Usage-based (via API) |
| **Codex** | Cloud agent | 1.6M+ weekly | Async workflows, batch tasks | Included in ChatGPT Pro ($200/mo) |
| **Jules** | Cloud agent | Preview | Google ecosystem, async tasks | Preview (pricing TBD) |

---

## Open-Source and Self-Hosted AI

The open-source AI ecosystem has matured from a curiosity into a production-ready alternative to closed platforms, driven by competitive open-weight models, efficient local inference tools, and the OpenClaw agent framework.

### Open-Weight Models

The term "open-weight" distinguishes models that release trained weights (allowing local inference and fine-tuning) from models that also release training data and methodology (truly open-source). The major families:

**Llama 3.3** (Meta, 70B parameters) remains the most widely deployed open-weight model, balancing capability with reasonable hardware requirements [3].

**Gemma 3** (Google, 270M-27B parameters, Apache 2.0 license) is notable for running the full range from mobile to single-GPU deployment, supporting 140+ languages and multimodal input at the 4B+ parameter sizes [F3].

**Mistral 3** spans 3B to 675B parameters (the latter a Mixture-of-Experts architecture). Mistral occupies a distinctive position as a European AI lab with strong multilingual capabilities [3].

**Qwen 3.5** (Alibaba) pushes context windows to 800K tokens in the open-weight space, though adoption outside China remains limited [3].

**DeepSeek-R1** (671B parameters, Mixture-of-Experts, MIT license) is notable for both its reasoning capabilities and its pricing transparency at $2.19 per million tokens -- substantially cheaper than comparable closed models [3].

### Local Inference Infrastructure

Running models locally requires an inference stack. The ecosystem has settled around several tools:

**Ollama** (95,000+ GitHub stars) is the dominant CLI-first tool for running open-weight models locally. It abstracts away model management, quantization, and hardware optimization behind simple commands [3]. **LM Studio** provides a GUI alternative for users who prefer a visual interface.

At the engine level, **llama.cpp** (C/C++) provides the foundational inference engine that Ollama and many other tools build upon. For production serving, **vLLM** (~12,500 tokens/second on H100) and **SGLang** (~16,200 tokens/second on H100, currently the fastest) handle high-throughput deployments [3].

### OpenClaw: The Open Agent Framework

OpenClaw is an MIT-licensed agent framework with 163,000+ GitHub stars that provides a Gateway, channel-based communication, and the Pi Agent Runtime for building and running AI agents locally or self-hosted [3a][F5]. ClawHub, its skills registry, hosts 13,700+ skills (as of February 2026) -- but a January-February 2026 malware campaign (ClawHavoc) exposed serious security concerns, with estimates of 12-20% malicious skills on the registry [3b]. See [Module 05](modules/MODULE-05-openclaw-and-open-agents.md) for the full security analysis. Microsoft now recommends running OpenClaw in isolated environments [3b].

Two significant governance developments occurred in early 2026: OpenClaw's founder joined OpenAI on February 14, 2026, and the project is transitioning to an open-source foundation to ensure community stewardship [3a]. Separately, NVIDIA launched NemoClaw (early preview, March 16, 2026), an enterprise-hardened distribution with the OpenShell sandbox for secure execution [3c].

For a deep dive into OpenClaw architecture and the open agent ecosystem, see [Module 05](MODULE-05-openclaw-and-open-agents.md).

### Open vs. Closed: The Tradeoffs

| Dimension | Open-Weight / Self-Hosted | Closed Platform APIs |
|-----------|--------------------------|---------------------|
| **Cost** | 70-90% savings at scale after hardware investment | Pay-per-token, predictable but ongoing |
| **Performance** | Near parity on knowledge/coding tasks; gap on frontier reasoning | Frontier capability (Opus 4.6, GPT-5.4) |
| **Privacy** | Data never leaves your infrastructure | Data sent to provider (with enterprise controls) |
| **Customization** | Full fine-tuning, quantization, architecture modification | Limited to API parameters + fine-tuning where offered |
| **Maintenance** | You own the stack: updates, security, hardware | Provider handles everything |
| **Latency** | Can be lower (no network round-trip) | Network-dependent; varies by provider and tier |
| **Ecosystem** | Growing but fragmented tooling | Polished, integrated, well-documented |

---

## Market Structure

### By the Numbers

The AI industry in 2026 is defined by extraordinary capital concentration:

| Metric | Value | Source |
|--------|-------|--------|
| Total AI market size (2026) | $375-390B | [1c] |
| Projected market size (2033) | $2.5-3.5T | [1c] |
| Combined infrastructure capex (Microsoft, Meta, Alphabet, Amazon) | ~$610B in 2026 | [1d] |
| OpenAI valuation | $730B | [F2] |
| Anthropic valuation | $380B | [F1] |
| Google AI-related capex planned | $175-185B | [1e] |
| AI coding tools market | $12.8B | [2a] |

### Consumer Market Dynamics

The consumer AI market is an oligopoly trending toward duopoly -- at least on the web. By web traffic share (Similarweb data), ChatGPT and Gemini together command 86.2% [1a]. ChatGPT's web share has fallen from 87.2% to 68%, while Gemini has surged from 5.4% to 18.2% [1a]. However, mobile app market share (Apptopia data) paints a less concentrated picture: ChatGPT holds under 45% on mobile, with competitors capturing a larger share of the growing mobile AI user base [F2]. Claude holds roughly 2% of the consumer web market but captures approximately 40% of enterprise LLM spend -- a deliberate strategic choice to prioritize enterprise reliability and safety over consumer viral growth [1a][F1].

Consumer pricing has converged. Claude Pro, ChatGPT Plus, and Copilot Pro all price at $19.99-$20/month. Google matches with Gemini Pro at similar price points. The premium tier shows more variation: OpenAI's ChatGPT Pro costs $200/month; Anthropic, Google, and Microsoft have no direct equivalent at that price point (though Microsoft's E7 Frontier Suite at $99/user/month targets enterprise buyers).

### Enterprise Market Dynamics

Enterprise pricing is more differentiated:

| Product | Price | Includes |
|---------|-------|----------|
| Claude Team | $25/seat/month | Claude.ai team features, higher usage limits |
| ChatGPT Business | $30/user/month | Renamed from Team; admin controls, no training on data |
| Microsoft 365 Copilot | $30/user/month | AI across M365 apps (requires base M365 license) |
| Agent 365 | $15/user/month add-on | Agent governance, registry, monitoring (GA May 1, 2026) |
| Microsoft E7 Frontier Suite | $99/user/month | Full Copilot + Agent 365 + frontier model access |

The enterprise market is where Anthropic punches above its consumer weight. Claude Code's 54% share of enterprise coding agent spend [1a] and Claude's estimated 40% of enterprise LLM spend [1a] demonstrate that enterprises are making different choices than consumers -- prioritizing reliability, safety posture, and code quality over brand recognition and feature breadth.

---

## Key Battlegrounds

Five competitive fronts will define the AI landscape through 2026 and into 2027.

### 1. Agentic Autonomy

Every major platform has shipped or announced an autonomous agent product: Claude Cowork, ChatGPT Agent, Chrome Auto Browse, and Microsoft Copilot Cowork. The question is no longer whether AI will act autonomously but how much autonomy users and enterprises will trust it with. The differences are in scope (desktop vs. browser vs. enterprise apps), supervision model (always-on vs. checkpoint-based), and safety architecture. See [Module 03](MODULE-03-single-agent-systems.md) for deep analysis.

### 2. The Integration Standard

MCP (Model Context Protocol) has emerged as the leading standard for connecting AI systems to external tools, with adoption across all four major platforms plus dozens of specialized tools [F1][F3][F4][F5]. But MCP's dominance is not assured -- platform-native integrations (OpenAI's Apps/Connectors directory, Microsoft's 1,400+ Copilot Studio connectors) compete as alternatives, and the tension between open protocol and proprietary lock-in remains unresolved. See [Module 06](MODULE-06-mcp-integration-layer.md).

### 3. Coding Agent Dominance

The $12.8B coding tools market is the highest-revenue AI application category outside of general chat. The architectural battle between IDE-integrated (GitHub Copilot), IDE-fork (Cursor, Antigravity), terminal-agent (Claude Code), and cloud-agent (Codex, Jules) approaches is unresolved. Claude Code's rapid revenue growth suggests terminal agents may be the future for complex work, but GitHub Copilot's 20M-user base provides enormous inertia. Google's $2.4B Windsurf acquisition signals that the big platforms see coding as a must-win category.

### 4. Open vs. Closed Ecosystems

Open-weight models have closed the performance gap on many tasks, and the local inference stack (Ollama, vLLM, SGLang) is production-ready. OpenClaw's 163K GitHub stars demonstrate demand for open agent infrastructure. But security concerns (ClawHub's malicious skill problem), governance uncertainty (OpenClaw's founder joining OpenAI), and the sheer engineering velocity of closed platforms create real obstacles. The outcome will likely be coexistence: open for cost-sensitive, privacy-critical, and customization-heavy use cases; closed for frontier capabilities and managed simplicity. See [Module 05](MODULE-05-openclaw-and-open-agents.md).

### 5. Enterprise Governance

As agents gain autonomy, enterprises need controls: who can deploy agents, what data they can access, what actions they can take, and how to audit their behavior. Microsoft is furthest ahead with Agent 365 (GA May 1, 2026), providing a centralized governance plane for agent deployment across M365 [F4]. Anthropic and OpenAI have enterprise admin consoles but lack equivalent dedicated governance products. This will become a critical differentiator as agent deployment scales. See [Module 04](MODULE-04-multi-agent-orchestration.md).

---

## Key Takeaways

1. **Four ecosystems, four strategies.** Anthropic leads in enterprise trust and developer tools. OpenAI leads in consumer scale and creative breadth. Google leads in distribution surface area. Microsoft leads in enterprise workflow integration.

2. **The consumer market is an oligopoly.** ChatGPT + Gemini = 86.2% of consumer web traffic share (mobile is less concentrated, with ChatGPT under 45%). Claude's 2% consumer share belies its 40% enterprise LLM spend -- different markets, different dynamics.

3. **Pricing has converged at the consumer tier** ($20/month) but remains highly differentiated in enterprise, where bundling, add-ons, and per-seat pricing create complex total-cost-of-ownership calculations.

4. **Agents are the new battleground.** Every platform has shipped autonomous agent capabilities in some form. The competition is now about scope, trust, and governance.

5. **MCP is winning the integration standards war** but faces ongoing competition from proprietary connector ecosystems.

6. **AI coding tools are a $12.8B market** with four competing architectural approaches and no clear winner. Claude Code's explosive growth and GitHub Copilot's installed base are the two forces to watch.

7. **Open-weight models have reached production quality** for many use cases, with 70-90% cost savings over API-based approaches. But security and governance challenges in the open ecosystem remain unsolved.

8. **Capital concentration is extreme.** The four platforms plus Meta are collectively spending over $610B on AI infrastructure in 2026. This creates barriers to entry that no startup can match on hardware alone.

9. **The market is $375-390B today and projected to reach $2.5-3.5T by 2033.** Growth this fast means the landscape will look materially different in 12 months.

10. **Enterprise governance is an emerging differentiator.** Microsoft's Agent 365 is the first dedicated governance product; others will follow as agent autonomy increases.

---

## Cross-References

- [Module 01: Models & Intelligence Tiers](MODULE-01-models-and-intelligence.md) -- Detailed model comparisons, context windows, reasoning modes, pricing
- [Module 02: Context Engineering](MODULE-02-context-engineering.md) -- How context windows, memory, and caching work in practice
- [Module 03: Single-Agent Systems](MODULE-03-single-agent-systems.md) -- Deep dive into agent architecture across all platforms
- [Module 04: Multi-Agent Orchestration](MODULE-04-multi-agent-orchestration.md) -- Agent SDKs, Agent Teams, enterprise governance
- [Module 05: OpenClaw & Open Agent Ecosystem](MODULE-05-openclaw-and-open-agents.md) -- OpenClaw architecture, ClawHub, NemoClaw, open vs. closed
- [Module 06: MCP & the Integration Layer](MODULE-06-mcp-integration-layer.md) -- MCP protocol deep dive, adoption, building servers
- [Module 08: Consumer AI Comparison](MODULE-08-consumer-ai-comparison.md) -- Feature-by-feature comparison of the big four
- [Module 09: Developer Platforms & APIs](MODULE-09-developer-platforms-apis.md) -- API architectures, pricing economics, SDKs

---

## Sources

| # | Title | Date | Notes |
|---|-------|------|-------|
| [F1] | Anthropic/Claude Ecosystem Profile | 2026-03-18 | Foundation profile; reference/profiles/anthropic-claude.md |
| [F2] | OpenAI/ChatGPT Ecosystem Profile | 2026-03-18 | Foundation profile; reference/profiles/openai-chatgpt.md |
| [F3] | Google/Gemini Ecosystem Profile | 2026-03-18 | Foundation profile; reference/profiles/google-gemini.md |
| [F4] | Microsoft/Copilot Ecosystem Profile | 2026-03-18 | Foundation profile; reference/profiles/microsoft-copilot.md |
| [F5] | Specialized Tools Ecosystem Profile | 2026-03-18 | Foundation profile; reference/profiles/specialized-tools.md |
| [1a] | AI Chatbot Market Share 2026 (Vertu/Similarweb) | 2026-03-20 | Web traffic share data; ChatGPT, Gemini, Claude consumer share |
| [1b] | ChatGPT Market Share Decline (Fortune) | 2026-03-20 | ChatGPT app share slip, competitor gains |
| [1c] | AI Market Size Analysis (Grand View Research) | 2026-03-20 | $375-390B market size, $2.5-3.5T 2033 projection |
| [1d] | Big Tech Cloud & AI Infrastructure (Computer Weekly) | 2026-03-20 | Combined infrastructure capex ~$610B |
| [1e] | Alphabet Q4 2025 Earnings / CEO Letter | 2026-03-20 | Google $175-185B capex, 85B monthly API requests |
| [2a] | AI Coding Assistant Statistics (Panto.ai) | 2026-03-20 | $12.8B market size, tool adoption stats, user counts |
| [2b] | Developer Survey 2026: 73% Daily AI Usage (Claude5.ai) | 2026-03-20 | 73% daily usage stat, up from 41% in 2025 |
| [3] | Open-Source & Self-Hosted AI Research (R00-D) | 2026-03-20 | Open-weight model data (Llama, Mistral, Qwen, DeepSeek, Ollama, vLLM, SGLang) |
| [3a] | OpenClaw GitHub Repository | 2026-03-20 | OpenClaw architecture, star count, governance |
| [3b] | Running OpenClaw Safely (Microsoft Security Blog) | 2026-02-19 | OpenClaw security concerns, isolation recommendations |
| [3c] | NVIDIA NemoClaw | 2026-03-16 | Enterprise-hardened OpenClaw distribution, OpenShell sandbox |
