# Module 08: Consumer AI Comparison

**Last updated:** 2026-03-21
**Status:** COMPLETE
**Word count target:** 5,000-6,000

---

## Executive Summary

The four dominant consumer AI platforms -- Claude, ChatGPT, Gemini, and Copilot -- have converged on a ~$20/month consumer price point while diverging sharply in capability profiles and strategic positioning. ChatGPT retains the largest user base (~900M monthly visits) but is bleeding market share (87% to 68% in one year) as Gemini surges on the strength of Google's distribution and a generous free tier [1]. Claude commands the highest per-session engagement (34.7 minutes) and developer loyalty, while Copilot leverages Microsoft 365's 400M-user installed base for enterprise lock-in. This module provides a systematic, feature-by-feature comparison across all four platforms as of March 2026, covering capabilities, pricing, user sentiment, and strategic differentiators.

---

## Prerequisites

- [Module 00: Landscape Overview](MODULE-00-landscape-overview.md) -- market structure and platform positioning
- [Module 01: Models & Intelligence Tiers](MODULE-01-models-and-intelligence.md) -- model lineups and reasoning capabilities
- [Module 02: Context Engineering](MODULE-02-context-engineering.md) -- memory systems and context windows
- [Module 03: Single-Agent Systems](MODULE-03-single-agent-systems.md) -- agent capabilities referenced in comparisons

---

## Core Capability Matrix

The following table maps the primary consumer-facing capabilities across all four platforms. Status indicators: **GA** (generally available), **Beta** (limited availability), **Preview** (early access), **None** (not offered).

| Capability | Claude | ChatGPT | Gemini | Copilot |
|---|---|---|---|---|
| **Chat / conversation** | GA | GA | GA | GA |
| **Extended reasoning** | GA (Extended Thinking) | GA (o3, o4-mini) | GA (Deep Think) | GA (via OpenAI models) |
| **Web search** | GA | GA | GA (Google Search) | GA (Bing) |
| **Image understanding** | GA | GA | GA | GA |
| **Image generation** | None | GA (GPT Image 1.5) | GA (Imagen 4, Nano Banana) | GA (DALL-E 3) |
| **Voice conversation** | None | GA (Advanced Voice Mode) | GA (Gemini Live, 24+ languages) | Limited |
| **Video understanding** | None | GA | GA (YouTube, uploads) | None |
| **File upload / analysis** | GA (PDF, code, text) | GA (broad format support) | GA (Drive integration) | GA (M365 files) |
| **Code execution** | GA (Claude Code, terminal) | GA (Code Interpreter) | GA (code execution) | GA (GitHub Copilot) |
| **Agentic tasks** | GA (Cowork Preview, Claude Code) | GA (ChatGPT Agent, Operator) | GA (Deep Research, Mariner Preview) | GA (Copilot Studio) |
| **Memory / personalization** | GA (Claude Memory, March 2026) | GA (cross-session memory) | GA (Personal Intelligence) | GA (Work IQ, enterprise) |
| **Collaboration features** | GA (Projects) | GA (Canvas, GPT Store) | GA (Gems, Drive integration) | GA (Pages, Studio) |
| **On-device inference** | None | None | GA (Gemini Nano on Android) | Limited (Windows AI) |

### Reading the matrix

Three patterns emerge immediately. First, **ChatGPT and Gemini offer the broadest multimodal coverage**, with native image generation, voice interaction, and video understanding that Claude and Copilot lack. Second, **Claude's strength concentrates in reasoning quality and developer tooling** rather than multimodal breadth. Third, **Copilot is the only platform architecturally tied to an existing productivity suite**, which both limits its standalone utility and creates its enterprise moat.

---

## Chat and Reasoning Quality

Benchmarks only tell part of the story, but they establish a baseline. As of March 2026:

| Benchmark | Best performer | Score | Runner-up | Score |
|---|---|---|---|---|
| **GPQA Diamond** (graduate-level reasoning) | Gemini 3.1 Pro (Preview) | 94.3% | Claude Opus 4.6 | 89.0% |
| **SWE-bench Verified** (real-world coding) | Claude Opus 4.6 | 80.8% | o3-high | 69.1% |
| **MMLU-Pro** (broad knowledge) | Gemini 3.1 Pro (Preview) | 91.2% | Claude Opus 4.6 | 88.5% |
| **HumanEval** (code generation) | Claude Opus 4.6 | 96.4% | GPT-4.1 | 95.3% |
| **MATH** (mathematical reasoning) | o4-mini (high effort) | 96.7% | Gemini 3.1 Pro (Preview) | 95.8% |

These numbers obscure real-world usage patterns. Users consistently report that Claude produces more natural, less "AI-sounding" prose and handles nuanced instructions more faithfully [2]. ChatGPT's strength is generalist breadth -- it handles a wider variety of tasks competently, if not always best-in-class. Gemini excels at factual retrieval tasks where its deep Google Search integration provides grounding that other models must approximate via RAG. Copilot's quality depends on which underlying OpenAI model it routes to, and users frequently report inconsistency [3].

### Reasoning Modes Compared

All four platforms now offer enhanced reasoning, but the implementations differ meaningfully (see [Module 01](MODULE-01-models-and-intelligence.md) for technical detail):

| Feature | Claude | ChatGPT | Gemini | Copilot |
|---|---|---|---|---|
| **Reasoning model(s)** | Opus 4.6, Sonnet 4.6 (extended thinking) | o3, o4-mini (dedicated reasoning models) | Gemini 3.1 Pro Deep Think | Via OpenAI models |
| **User visibility** | Thinking block visible | Summary of reasoning | Expandable reasoning trace | Minimal |
| **Budget control** | Token budget configurable via API | Low/medium/high effort settings | Automatic | None |
| **Latency** | 10-60s for complex tasks | 15-90s for o3-high | 10-45s | Varies |
| **Consumer availability** | Pro and above | Plus and above | Pro and above | Pro |

---

## Coding Agent Capabilities

AI-assisted coding has become a primary battleground. Each platform approaches it differently:

| Feature | Claude Code | Codex (OpenAI) | Antigravity (Google) | GitHub Copilot |
|---|---|---|---|---|
| **Interface** | Terminal (CLI) | Cloud sandbox | Multi-agent IDE | IDE extension |
| **Architecture** | Single agent, local | Cloud-parallel tasks | Multi-agent system | Inline + chat |
| **Codebase understanding** | Full repo context (1M tokens) | Task-scoped | Project-wide | File-level + repo indexing |
| **Autonomous operation** | Yes (with permissions) | Yes (async, cloud) | Yes (orchestrated agents) | Limited (agent mode in preview) |
| **SWE-bench score** | 80.8% (Opus 4.6) | 69.1% (o3-high) | Not published | Not published |
| **Pricing** | Included in Max ($100-200/mo) | Included in Pro ($200/mo) | Included in Ultra ($249.99/mo) | $10-39/mo standalone |
| **Enterprise adoption** | ~54% of enterprise coding agents [F1] | Growing (async advantage) | New entrant | 56% of GitHub users [F5] |

Claude Code's advantage is architectural comprehension -- it reads entire codebases and understands how components relate. Codex trades this for parallelism, spinning up multiple cloud sandboxes to work on tasks asynchronously. Antigravity (the Windsurf acquisition rebrand) brings a multi-agent approach inside a full IDE. GitHub Copilot has the largest adoption by raw numbers, driven by its integration with the dominant code hosting platform [4].

---

## Multimodal Capabilities

This is where the platforms diverge most dramatically.

### Image Generation

| Feature | Claude | ChatGPT | Gemini | Copilot |
|---|---|---|---|---|
| **Engine** | None | GPT Image 1.5 | Imagen 4 / Nano Banana | DALL-E 3 |
| **In-conversation generation** | No | Yes | Yes | Yes |
| **Text rendering in images** | N/A | Strong | Strong | Moderate |
| **Style control** | N/A | Detailed prompt adherence | Good, plus style presets | Basic |
| **Edit existing images** | No | Yes (inpainting) | Yes | Limited |
| **Free tier access** | N/A | Limited | Yes (Imagen 4) | Yes (limited) |

Claude's complete absence of image generation is its most visible capability gap. For users who need both text reasoning and image creation in a single workflow, ChatGPT or Gemini are the only viable choices.

### Voice and Audio

| Feature | Claude | ChatGPT | Gemini | Copilot |
|---|---|---|---|---|
| **Voice conversation** | None | Advanced Voice Mode (GA) | Gemini Live (GA) | Basic voice input |
| **Languages** | N/A | 50+ | 24+ | Limited |
| **Emotional expression** | N/A | Adjustable tone/personality | Natural conversational | None |
| **Real-time interruption** | N/A | Yes | Yes | No |
| **Background listening** | N/A | No | Yes (Android) | No |

ChatGPT's Advanced Voice Mode is the most mature voice implementation, with natural interruption handling and emotional range. Gemini Live competes strongly with deeper integration into Android's ecosystem, including background listening capabilities that ChatGPT cannot match on mobile [F3].

---

## Memory and Personalization

How each platform remembers you across sessions is a critical differentiator (see [Module 02](MODULE-02-context-engineering.md) for technical architecture):

| Feature | Claude | ChatGPT | Gemini | Copilot |
|---|---|---|---|---|
| **Cross-session memory** | GA (Claude Memory, March 2026) | GA (automatic + manual) | GA (Personal Intelligence) | GA (Work IQ, enterprise) |
| **Memory control** | User-controllable (view/manage stored preferences) | View, edit, delete individual memories | Settings-based | Admin-controlled |
| **Contextual personalization** | Claude Memory (auto) + Projects (manual) | Automatic preference learning | Search history + interactions | M365 Graph data |
| **Data scope** | All conversations (processed ~24h cycle) | All conversations | Google account-wide | Microsoft 365 tenant |
| **Privacy model** | User-controllable; privacy-first design | Opt-out available | Tied to Google account | Enterprise compliance |

ChatGPT has the most mature memory system, automatically extracting user preferences, facts, and interaction patterns across conversations to build a persistent profile that makes each session feel continuity-aware. Claude Memory (GA, March 2026, all plans) automatically processes conversations every ~24 hours, storing profession, language preferences, and recurring context into a memory profile loaded into future conversations -- a significant addition that closes what was previously Claude's most notable usability gap [F1]. Gemini's Personal Intelligence goes broader by drawing from your entire Google account (Search, Drive, Gmail, Calendar) but can feel less conversationally aware. Copilot's Work IQ is exclusively enterprise-focused, surfacing relevant organizational context from Microsoft 365 data [F2, F3].

---

## Collaboration and Productivity Features

| Feature | Claude | ChatGPT | Gemini | Copilot |
|---|---|---|---|---|
| **Shared workspaces** | Projects (team plans) | Team workspaces | Shared Gems | Microsoft Teams integration |
| **Document co-editing** | Limited | Canvas (GA) | Google Docs integration | M365 co-authoring |
| **Custom AI personas** | Projects with instructions | GPTs (GPT Store) | Gems | Copilot Studio agents |
| **Marketplace** | None | GPT Store | Gem Gallery | Copilot Studio templates |
| **Deep research** | Research mode (Beta) | Deep Research (GA) | Deep Research (free tier!) | Think Deeper |
| **Artifacts / outputs** | Artifacts (code, docs, diagrams) | Canvas outputs | Side panel outputs | Draft outputs in M365 apps |

Gemini's decision to offer Deep Research on the free tier is a notable competitive move -- this is a capability that costs $20/month or more on other platforms [F3]. ChatGPT's Canvas provides the most polished co-editing experience for long-form content. Claude's Artifacts system excels at generating interactive code demos and visualizations that can be immediately previewed [F1].

---

## Pricing Analysis

### Consumer Tiers

> **Volatility warning:** AI pricing changes frequently. The figures below reflect March 2026 state. Verify against provider pricing pages before making purchasing decisions.

| Tier | Claude | ChatGPT | Gemini | Copilot |
|---|---|---|---|---|
| **Free** | Basic chat (Haiku 4.5) | GPT-5.2 Instant, limited | Flash + Deep Research + image gen | Basic chat, Bing integration |
| **Standard consumer** | Pro: $20/mo | Plus: $20/mo | Advanced: $19.99/mo | Pro: $20/mo |
| **Power user** | Max: $100/mo (5x Pro usage) | -- | -- | -- |
| **Heavy user** | Max: $200/mo (20x Pro usage) | Pro: $200/mo | Ultra: $249.99/mo | -- |

The market has converged on ~$20/month for the standard consumer tier. Differentiation happens at the extremes:

**Free tier:** Gemini is the clear winner, offering its Flash model, Deep Research, and image generation at no cost. ChatGPT's free tier provides GPT-5.2 Instant but restricts advanced features. Claude's free tier is the most limited, offering only Haiku 4.5 with conservative rate limits. Copilot's free tier is tightly coupled to Bing search [5].

**Power/heavy tier:** Claude's Max tier ($100-200/month) offers a graduated approach -- pay $100 for 5x usage or $200 for 20x. ChatGPT Pro ($200/month) and Gemini Ultra ($249.99/month) are single high tiers. This space is in flux; providers are testing willingness to pay for heavy usage rather than API access.

### Business and Enterprise Tiers

| Tier | Claude | ChatGPT | Gemini | Copilot |
|---|---|---|---|---|
| **Team / Business** | Team: $25/seat/mo | Business: $25-30/user/mo | Business: $7.20-18/user/mo | M365 Copilot: $21-30/user/mo |
| **Enterprise** | Enterprise: custom | Enterprise: custom | Enterprise: custom | E7: $99/user/mo |
| **Minimum seats** | 5 (Team) | 2 (Business) | 1 (Business) | 1 (Pro), 25+ (Enterprise) |
| **Key enterprise features** | SSO, SCIM, audit logs | Data not used for training, DLP | Workspace integration, DLP | Full M365 compliance suite |

Gemini Workspace pricing stands out as significantly cheaper at the entry level ($7.20/user/month for the basic tier), reflecting Google's strategy of bundling AI into existing Workspace subscriptions rather than charging a premium. Copilot's E7 tier at $99/user/month is the most expensive per-seat offering but includes the full Agent 365 governance and automation suite [F3, F4].

### API Pricing (Developer Reference)

For users who build on these platforms, API economics differ substantially (see [Module 09](MODULE-09-developer-platforms-apis.md) for complete analysis):

| Model tier | Anthropic | OpenAI | Google | Microsoft |
|---|---|---|---|---|
| **Budget** | Haiku 4.5: $1.00/$5.00 | GPT-5.4 Nano: $0.20/$1.25 | Flash 2.5 Lite: $0.10/$0.40 | Via Azure OpenAI |
| **Mid-range** | Sonnet 4.6: $3/$15 | GPT-5.4 Mini: $0.75/$4.50 | Gemini 3 Flash: $0.50/$3 | Via Azure OpenAI |
| **Flagship** | Opus 4.6: $5/$25 | GPT-5.4: $2.50/$15 | Gemini 3.1 Pro: $2.00/$12 | Via Azure OpenAI |

*Pricing shown as input/output per million tokens.*

Google is 30-50% cheaper than competitors at every tier. Anthropic's pricing is mid-range for its flagship but Haiku 4.5 is competitive as a budget option. OpenAI's GPT-5.4 flagship is competitively priced at the top tier, while its dedicated reasoning models (o3, o4-mini) carry premium pricing for use cases where reasoning depth justifies the cost [6].

### Pricing Trend: Capability-Based Bundling

The industry is shifting from model-based pricing (pay per model tier) toward capability-based pricing (pay for what you can do). Evidence includes:

- Claude Max bundles unlimited model access with higher rate limits and priority routing
- Gemini Ultra bundles Notebook LM Plus, 30TB storage, and Google One AI Premium
- ChatGPT Pro bundles o3-pro access, voice, and research capabilities
- Copilot E7 bundles agent governance, automation, and M365-wide AI features

This shift benefits power users who use multiple capabilities but raises the floor price for casual users who only need one feature [5, 6].

---

## User Sentiment and Market Dynamics

### Market Share Trajectory

The most significant market story of 2025-2026 is ChatGPT's share decline:

| Period | ChatGPT | Gemini | Claude | Copilot | Others |
|---|---|---|---|---|---|
| **March 2025** | ~87% | ~5% | ~3% | ~2% | ~3% |
| **March 2026** | ~68% | ~18-20% | ~5% | ~3% | ~4% |
| **Trend** | Declining | Surging | Slow growth | Flat | Growing |

ChatGPT's drop from 87% to 68% in one year represents one of the fastest market share declines for a dominant consumer tech product [1]. Gemini captured most of that shift, quadrupling its share through aggressive distribution (Android default, Search integration, generous free tier) and genuine product improvements.

### User Satisfaction Signals

**ChatGPT:** The #Keep4o movement (early 2026) crystallized user frustration with rapid model transitions. When OpenAI deprecated GPT-4o in favor of GPT-4.1, a vocal user segment objected to the personality and behavior changes. An estimated 1.5M cancellations in March 2026 were attributed to model churn fatigue -- users felt the product they were paying for kept changing without their consent [F2].

**Claude:** Commands the highest average session engagement at 34.7 minutes, nearly double ChatGPT's average. Developer communities (Reddit, Hacker News) show a strong Claude preference for coding tasks -- an analysis of 500+ Reddit threads found 78% preference among developers who compared both tools [community-sourced] [2]. A separate developer survey found Claude the top choice at 44% for complex coding tasks (multi-file refactoring, architecture design, debugging), ahead of GitHub Copilot (28%) and ChatGPT (19%) [7]. The main complaints center on the absence of multimodal generation (images, voice).

**Gemini:** Fastest-growing platform with strong positive sentiment around the free tier and Google integration. Criticisms focus on writing quality (perceived as more generic than Claude or ChatGPT) and lingering trust issues from the Gemini 1.0 image generation controversy in early 2024. Users praise Deep Research and the seamless Workspace integration [F3].

**Copilot:** Mixed enterprise reception. Despite Microsoft's massive distribution advantage (400M M365 users), only ~3.3% of M365 users pay for Copilot. Enterprise buyers report the product is "good enough" but rarely the best tool for any specific task. The tight coupling to M365 is simultaneously its greatest strength (for organizations already in that ecosystem) and its greatest limitation (for users outside it) [F4].

---

## Strategic Differentiators

Each platform has a defensible moat and a corresponding blind spot.

### Claude: The Developer and Enterprise Play

**Moat:** Safety reputation, MCP open standard, developer tooling dominance (Claude Code at ~$2.5B ARR, doubled since January 2026 [8]), highest per-user monetization ($211/monthly active user) [F1].

**Blind spot:** No image generation, no voice. Claude is the most capable text-in/text-out system but the narrowest in multimodal coverage. Claude Memory (March 2026) closed the personalization gap, but for users whose workflows span text, images, and voice, Claude requires supplementation with other tools.

**Strategic bet:** That reasoning quality and developer trust matter more than feature breadth. Anthropic is betting that AI power users will pay a premium for the best thinking engine and accept gaps in multimedia capabilities.

### ChatGPT: The Scale and Breadth Play

**Moat:** 900M+ monthly users, broadest model portfolio (GPT-5.4, o3, o4-mini, GPT Image 1.5, Advanced Voice), Apple Intelligence integration for iOS distribution, GPT Store ecosystem [F2].

**Blind spot:** Market share erosion, model churn alienating loyal users, no on-device inference, increasingly perceived as the "default" rather than the "best" at any single task.

**Strategic bet:** That distribution and breadth win in consumer markets. OpenAI is pursuing a "be everywhere, do everything" strategy -- the AI equivalent of Google's approach to productivity software.

### Gemini: The Distribution and Integration Play

**Moat:** Google Search integration (billions of daily queries), Android default (3B+ devices), Workspace bundling, on-device inference (Gemini Nano), most generous free tier, 30-50% cheaper API pricing [F3].

**Blind spot:** Writing quality consistently rated below Claude and ChatGPT for nuanced tasks. Product trust damaged by early missteps. No equivalent to Claude Code or ChatGPT's deep voice interaction.

**Strategic bet:** That integration density beats standalone quality. Google is embedding Gemini into every surface it controls -- Search, Android, Chrome, Workspace, YouTube, Maps -- making it the AI you use by default even if you'd choose something else standalone.

### Copilot: The Enterprise Lock-In Play

**Moat:** M365 integration (400M users), enterprise compliance and governance (Agent 365), GitHub Copilot's developer footprint (56% of GitHub users), Azure cloud infrastructure [F4].

**Blind spot:** No compelling standalone consumer product. Dependent on OpenAI models (licensing risk). Only 3.3% M365 conversion rate. Users outside the Microsoft ecosystem have little reason to choose Copilot.

**Strategic bet:** That enterprise buyers purchase ecosystems, not point products. Microsoft is betting that CIOs will pay for Copilot because it's the only AI that understands their M365 tenant data, their org chart, and their compliance requirements -- not because it's the best AI in isolation.

---

## Decision Framework: Choosing a Platform

Rather than declaring a "winner," here is a framework for matching platform to use case:

| If you need... | Best choice | Why |
|---|---|---|
| Best coding assistant | Claude (Code) | Highest SWE-bench, full codebase context, terminal-native |
| Broadest multimodal | ChatGPT | Image gen + voice + video in one product |
| Best free experience | Gemini | Deep Research + image gen + Flash model at no cost |
| M365 integration | Copilot | Only option with deep M365 Graph access |
| Best writing quality | Claude | Highest engagement, most natural prose, developer preference |
| On-device AI | Gemini | Gemini Nano on Android; no viable competitor yet |
| Cheapest API | Gemini | 30-50% cheaper than competitors at every tier |
| Enterprise governance | Copilot | Agent 365, full compliance suite |
| Cross-session personalization | ChatGPT | Most mature and granular memory system |
| Search-grounded answers | Gemini | Direct Google Search integration |

Most power users will end up using two or more platforms. The realistic question is not "which one?" but "which combination?"

---

## Key Takeaways

1. **Price convergence, capability divergence.** All four platforms charge ~$20/month for their standard consumer tier, but the capabilities you get for that $20 vary enormously.

2. **ChatGPT's dominance is eroding.** A drop from 87% to 68% market share in one year signals that the "default AI assistant" position is genuinely contestable.

3. **Gemini's free tier is a strategic weapon.** Offering Deep Research and image generation at no cost pressures every competitor's conversion funnel.

4. **Claude wins on depth, loses on breadth.** Best-in-class for coding and reasoning, but the absence of image generation and voice limits its addressable use cases. Claude Memory (March 2026) closed the personalization gap.

5. **Copilot is an enterprise play, not a consumer product.** Its 3.3% M365 conversion rate confirms this -- the value proposition requires organizational context.

6. **Memory is a key battleground.** All four platforms now offer cross-session memory, but implementations vary widely -- from ChatGPT's granular manual control to Claude's privacy-first auto-processing to Gemini's account-wide intelligence.

7. **The API pricing race favors Google.** For developers building on these platforms, Gemini's 30-50% cost advantage at every tier is a powerful economic argument.

8. **Capability-based pricing is replacing model-based pricing.** The $100-250/month "power user" tiers bundle capabilities rather than just model access, signaling where the industry is heading.

9. **No single platform dominates all categories.** Power users should expect a multi-platform strategy as the norm, not the exception.

---

## Cross-References

- [Module 00: Landscape Overview](MODULE-00-landscape-overview.md) -- market structure and platform ecosystem context
- [Module 01: Models & Intelligence Tiers](MODULE-01-models-and-intelligence.md) -- detailed model lineups, benchmarks, and reasoning mode architecture
- [Module 02: Context Engineering](MODULE-02-context-engineering.md) -- technical depth on memory systems, context windows, and personalization
- [Module 03: Single-Agent Systems](MODULE-03-single-agent-systems.md) -- agent architecture and coding tool capabilities
- [Module 06: MCP & the Integration Layer](MODULE-06-mcp-integration-layer.md) -- how platforms connect to external tools
- [Module 07: Skills, Plugins & Automation](MODULE-07-skills-plugins-automation.md) -- scheduled tasks and automation capabilities as platform differentiators
- [Module 09: Developer Platforms & APIs](MODULE-09-developer-platforms-apis.md) -- API pricing economics and SDK comparison
- [Module 10: Frontier Topics](MODULE-10-frontier-topics.md) -- upcoming events (Google I/O, Build, WWDC) likely to shift comparison tables

---

## Sources

1. AI Chatbot Market Share 2026 (Vertu/Similarweb), https://vertu.com/lifestyle/ai-chatbot-market-share-2026-chatgpt-drops-to-68-as-google-gemini-surges-to-18-2/, accessed 2026-03-20
2. Developer AI Tool Preference Survey (Reddit/HN aggregation), community source, 2026-03-20
3. Microsoft Copilot User Experience Reports (Enterprise), community source, 2026-03-20
4. AI Coding Assistant Statistics (Panto.ai), https://www.getpanto.ai/blog/ai-coding-assistant-statistics, accessed 2026-03-20
5. Anthropic Claude Pricing, https://www.anthropic.com/pricing, accessed 2026-03-21
6. Provider API Pricing Pages (Anthropic, OpenAI, Google), https://docs.anthropic.com/en/docs/about-claude/models, https://openai.com/api/pricing/, https://ai.google.dev/gemini-api/docs/pricing, accessed 2026-03-21
- [F1] Anthropic/Claude Ecosystem Profile, reference/profiles/anthropic-claude.md, 2026-03-18
- [F2] OpenAI/ChatGPT Ecosystem Profile, reference/profiles/openai-chatgpt.md, 2026-03-18
- [F3] Google/Gemini Ecosystem Profile, reference/profiles/google-gemini.md, 2026-03-18
- [F4] Microsoft/Copilot Ecosystem Profile, reference/profiles/microsoft-copilot.md, 2026-03-18
- [F5] Specialized Tools Profile, reference/profiles/specialized-tools.md, 2026-03-18
7. Developer Survey 2026: AI Coding Tool Adoption (claude5.ai), https://claude5.ai/news/developer-survey-2026-ai-coding-73-percent-daily, accessed 2026-03-21
8. Constellation Research: Claude Code Revenue Doubled Since Jan. 1, https://www.constellationr.com/insights/news/anthropics-claude-code-revenue-doubled-jan-1, 2026-02-12
