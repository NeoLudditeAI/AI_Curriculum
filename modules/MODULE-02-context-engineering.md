# Module 02: Context Engineering

**Last updated:** 2026-03-20
**Status:** DRAFTING
**Word count target:** 4,000-5,000
**Prerequisites:** [Module 00: Landscape Overview](MODULE-00-landscape-overview.md), [Module 01: Models & Intelligence Tiers](MODULE-01-models-and-intelligence.md)

---

## Executive Summary

The quality of any AI system's output is bounded not by the model's raw intelligence but by what information is available in its context window at the moment of generation. Context engineering -- the deliberate design of what goes into that window, how long it persists, and how it is managed as conversations grow -- has emerged as the defining practical discipline for anyone building with or heavily using LLMs. This module covers context windows and their real-world limits, prompt caching and cost optimization, the four major memory architectures shipping in March 2026, retrieval-augmented generation (RAG) patterns, compaction behavior across platforms, and the principles that tie these mechanisms into a coherent practice.

---

## Context Windows: Sizes, Pricing, and Practical Limits

### The 1M-Token Convergence

As of March 2026, every major provider offers at least one model with a million-token context window [F1][F2][F3]:

| Provider | Model(s) at 1M Tokens | GA / Preview | Long-Context Surcharge |
|----------|----------------------|-------------|----------------------|
| Anthropic | Opus 4.6, Sonnet 4.6 | GA | None (removed March 14, 2026) [F1] |
| OpenAI | GPT-5.4, GPT-5.4 Thinking, GPT-5.4 Pro | GA | None reported [F2] |
| Google | Gemini 2.5 Pro, Gemini 2.5 Flash, Gemini 3 Flash | GA | None [F3] |
| Microsoft | GPT-4.1 / 4.1 mini (via Azure) | GA | Azure markup applies [F4] |

A million tokens is roughly 750,000 English words -- the equivalent of ten full-length novels or an entire medium-sized codebase. Six months ago, 1M context was a premium feature with surcharges; it is now table stakes at standard per-token rates.

Not every model reaches 1M. Anthropic's Haiku 4.5 caps at 200K tokens. OpenAI's GPT-5.4 Mini and Nano offer approximately 400K tokens. Google's Gemini 3.1 Flash-Lite and Deep Think 3.1 stay at 192-200K [F1][F2][F3]. The pattern is clear: flagship models get the largest windows; budget models trade context size for speed and cost.

### What a Million Tokens Actually Buys

Token counts are not intuitive. Some practical benchmarks:

| Content Type | Approximate Token Count | Fits in 1M Window? |
|-------------|------------------------|-------------------|
| A 300-page novel (~90,000 words) | ~120K tokens | Yes (8x over) |
| Complete React codebase (medium app) | ~200-400K tokens | Yes |
| 100-page legal contract | ~40K tokens | Yes (25x over) |
| Full Wikipedia article (long) | ~15-30K tokens | Yes |
| 10 hours of meeting transcripts | ~300-500K tokens | Yes, but tight |
| Entire company knowledge base | 2-50M tokens | No -- needs RAG |

Non-English text consumes 2-3x more tokens than English due to tokenizer design. Chinese, Japanese, Korean, and Arabic are particularly expensive. A document that fits comfortably in English may overflow the window when translated [1].

### Performance Degradation: The Effective Window Is Smaller Than the Advertised Window

Advertising a 1M-token context window does not mean models perform equally well across that entire range. Research and practical experience reveal consistent patterns:

**Lost-in-the-middle.** Models attend more strongly to information at the beginning and end of the context, with weaker recall for content in the middle third. This effect, first documented in 2023, persists in current models though it has diminished with each generation [2].

**Accuracy degradation curves.** Most models begin showing measurable accuracy loss once the context is 40-60% full. The degradation is task-dependent: factual retrieval suffers earliest, while summarization and code understanding remain more robust at high fill rates [2].

**Anthropic's advantage.** Anthropic has published claims that Claude maintains less than 5% accuracy loss across its full 200K range (the previous standard window), and internal testing on the 1M window suggests similar robustness through at least 500K tokens. Independent benchmarks (RULER, Needle-in-a-Haystack) confirm Claude's context utilization is the strongest among major providers [F1][2].

> **Practical guidance:** Treat 60-70% of the advertised window as the reliable operating range for precision-critical tasks. For summarization or broad analysis, you can push higher. For factual retrieval from a specific passage buried in a large context, keep total context leaner or use positional strategies (place critical information at the beginning or end).

### Token Economics

Context window size directly affects cost because input tokens are billed per use. Sending 500K tokens of context with every API call at Opus 4.6 pricing ($5/MTok input) costs $2.50 per request before the model generates a single output token. At 100 requests per day, that is $250/day in input costs alone.

This economic pressure drives three optimization strategies covered in the following sections: prompt caching (reduce the per-token cost of repeated context), RAG (send only relevant context instead of everything), and compaction (automatically condense history to stay within limits).

---

## Prompt Caching: Paying Less for Repeated Context

Prompt caching allows frequently reused prompt prefixes -- system instructions, reference documents, few-shot examples -- to be cached server-side so that subsequent requests pay a fraction of the standard input price.

### Implementation Across Providers

| Provider | Cache Hit Discount | Cache Write Cost | Cache Durations | Min Cacheable Size | Status |
|----------|-------------------|-----------------|----------------|-------------------|--------|
| Anthropic | 90% (10% of base input price) | 25% premium on first write | 5-minute, 1-hour, persistent | 1,024 tokens (Haiku); 2,048 tokens (Sonnet/Opus) | GA [F1] |
| Google | 90% (10% of base input price) | Standard input price | Configurable TTL; $1.00-$4.50/MTok/hour storage | Varies by model | GA [F3] |
| OpenAI | 50% discount | No additional write cost | Automatic; typically ~5-10 minutes | Automatic (no explicit API) | GA [F2] |

Anthropic's implementation is the most granular. Three cache duration tiers let developers match caching strategy to usage patterns [F1]:

- **5-minute cache:** Default. Suitable for interactive conversations where the same system prompt is reused across rapid exchanges.
- **1-hour cache:** For batch processing jobs or longer workflows where the same reference documents are consulted repeatedly.
- **Persistent cache:** For system prompts and reference materials that rarely change. Survives across sessions.

Google's context caching charges per-hour storage fees, making it better suited for high-throughput applications where the cache is heavily reused within a short window [F3].

OpenAI's caching is largely automatic and opaque -- the Responses API achieves 40-80% improved cache utilization over the older Chat Completions API, but developers have less direct control over cache behavior [F2].

### Cost Impact Example

Consider an application that sends a 50,000-token system prompt with every request using Claude Sonnet 4.6:

| Scenario | Input Cost per Request (50K system prompt + 2K user message) | Daily Cost (500 requests) |
|----------|-------------------------------------------------------------|--------------------------|
| No caching | $0.156 | $78.00 |
| With caching (90% hit rate on system prompt) | $0.021 | $10.50 |
| Savings | | **$67.50/day (86%)** |

For high-volume applications, prompt caching is not optional -- it is the single largest cost lever available.

### Batch API: The Other Cost Lever

All three major providers offer batch processing APIs with 50% discounts on both input and output tokens in exchange for asynchronous processing (typically within 24 hours) [F1][F2][F3]. Batch processing is ideal for evaluation pipelines, content generation at scale, and any workload where latency is not critical.

Combining prompt caching with batch processing can reduce effective costs by 90-95% compared to naive real-time API usage.

---

## Memory Systems: How Platforms Remember You

Memory systems extend context beyond a single conversation. Each major platform has shipped a distinct architecture for persistent personalization, and the differences are substantial.

### Claude Memory (Anthropic)

- **Status:** GA (all plans, March 2026) [F1]
- **Architecture:** Asynchronous processing. Claude reviews conversations approximately every 24 hours and extracts relevant facts -- profession, language preferences, recurring project context, communication style. These are stored as a structured memory profile loaded into every future conversation.
- **User control:** Users can view, edit, and delete individual memories. Memory can be toggled off entirely.
- **Scope:** Per-user. Projects provide per-project persistent context via custom instructions and uploaded files, complementing the personal memory system.
- **Privacy model:** Memory processing happens on Anthropic's servers. Enterprise plans offer additional controls.
- **Practical character:** Passive and cumulative. Claude never asks "should I remember this?" -- it silently builds a profile over time. The delay (up to 24 hours) means corrections or new context may not appear in memory until the next processing cycle.

### ChatGPT Saved Memories (OpenAI)

- **Status:** GA (all plans) [F2]
- **Architecture:** Dual-layer system. **Saved Memories** are explicit facts (user-stated or model-inferred) stored persistently. **Chat History Reference** (GA since April 2025) allows ChatGPT to draw on all past conversations for contextual recall, not just explicitly saved items.
- **User control:** Users can view and delete individual saved memories. Chat history reference and saved memories can be toggled independently. Temporary Chat mode disables all memory read/write for a single conversation.
- **Scope:** Per-user globally. Projects add per-project context with custom instructions and source files.
- **Privacy model:** Memories are stored server-side. Enterprise/Business plans offer admin controls over memory features.
- **Practical character:** More aggressive than Claude's memory. ChatGPT actively infers and saves memories during conversation. The chat history reference layer adds a second dimension -- even things not explicitly memorized can influence future responses if they appeared in a past conversation [F2].

### Gemini Personal Intelligence (Google)

- **Status:** GA [F3]
- **Architecture:** Learns from past Gemini conversations to build a personal context model. Integrated with Gems (custom personas) that can be configured with specific personality and knowledge.
- **User control:** Personal Intelligence can be managed through Gemini settings.
- **Scope:** Per-user across Gemini surfaces (app, Chrome, Workspace).
- **Unique angle:** Google's integration surface is the broadest. Personal Intelligence can draw context from Gmail, Calendar, Drive, and other Google services (with permission), giving it a richer data substrate than competitors who are limited to chat history.
- **Privacy model:** Free tier data may be used for training. Paid tiers (AI Pro, AI Ultra) and Workspace plans offer data protection guarantees [F3].
- **Practical character:** The most context-rich system by potential, but its effectiveness depends on how deeply the user is embedded in the Google ecosystem. For a Google Workspace power user, it can be remarkably personalized. For someone who uses Google only for Gemini chat, it behaves similarly to competitors.

### Microsoft Recall

- **Status:** GA (Copilot+ PCs only; controversial) [F4]
- **Architecture:** Fundamentally different approach. Recall captures screen snapshots every few seconds, indexes them locally using on-device AI, and makes this visual history searchable. It is not a conversation memory system -- it is a screen memory system.
- **Scope:** Everything visible on screen, across all applications.
- **Privacy model:** All processing is local (on-device). Data is encrypted and requires Windows Hello authentication. Recall 2.0 (shipped January 2026 with Windows 12) added a "Privacy-First" rebuild gated by specific hardware requirements.
- **Practical character:** Recall is the most ambitious memory system conceptually -- total recall of everything you see on your computer -- but also the most controversial. Privacy backlash has been severe. Microsoft has explored dropping the Recall name entirely due to reputational damage. Its utility for AI-assisted work is real (search your visual history for "that chart I saw last Tuesday") but adoption remains limited by trust concerns [F4].

### Comparison Table

| Dimension | Claude Memory | ChatGPT Saved Memories | Gemini Personal Intelligence | Microsoft Recall |
|-----------|-------------|----------------------|----------------------------|-----------------|
| **Type** | Extracted facts from conversations | Explicit + inferred facts + full chat history recall | Learned personal context + Google service data | Screen snapshot indexing |
| **Processing** | Async (~24hr cycle) | Real-time during conversation | Continuous | Continuous (every few seconds) |
| **Data sources** | Conversations only | Conversations + chat history | Conversations + Google services (Gmail, Calendar, Drive) | Entire screen content |
| **Granularity** | Structured profile | Individual memory items + fuzzy history | Personal context model | Visual snapshots (searchable) |
| **User control** | View/edit/delete/toggle | View/delete/toggle (memories and history separately) | Settings-based | On/off, app exclusions, auto-delete |
| **Offline** | No | No | No | Yes (on-device) |
| **Privacy concern** | Low-moderate | Moderate | Moderate-high (Google data access) | High (screen capture) |

---

## RAG: Retrieval-Augmented Generation

When the information a model needs exceeds what fits in a context window -- or when you want to ground responses in a specific, authoritative knowledge base -- RAG is the standard architectural pattern.

### How RAG Works

The RAG pipeline has three stages:

1. **Indexing.** Documents are split into chunks (typically 256-1,024 tokens), each chunk is converted to a vector embedding, and embeddings are stored in a vector database (Pinecone, Weaviate, Chroma, pgvector, etc.).

2. **Retrieval.** When a user query arrives, it is converted to an embedding and compared against the indexed chunks using cosine similarity or similar distance metrics. The top-k most relevant chunks are retrieved (typically 3-10 chunks).

3. **Generation.** Retrieved chunks are injected into the model's context alongside the user query. The model generates a response grounded in the retrieved content.

### RAG vs. Large Context Windows

The 1M-token context window has changed the RAG calculus. Previously, RAG was necessary for any knowledge base larger than 8-32K tokens. Now, many use cases that required RAG can be handled by simply loading documents into the context window.

| Factor | Large Context Window | RAG |
|--------|---------------------|-----|
| **Setup complexity** | None -- just paste documents | Significant -- chunking, embedding, vector DB, retrieval tuning |
| **Cost per query** | High (paying for all tokens every time) | Lower (only retrieved chunks enter context) |
| **Accuracy** | Model sees full document; no retrieval errors | Retrieval can miss relevant chunks or return irrelevant ones |
| **Freshness** | Documents must be included each time (or cached) | Index can be updated independently |
| **Scale** | Limited to context window (750K words max) | Scales to millions of documents |
| **Best for** | Small-to-medium knowledge bases (<500K tokens); tasks requiring cross-document reasoning | Large knowledge bases; high-volume query workloads; frequently updated content |

> **Practical guidance:** If your knowledge base fits in 30-40% of the context window and query volume is low, skip RAG and use direct context injection with prompt caching. If the knowledge base exceeds 500K tokens, query volume is high, or the content updates frequently, invest in RAG. Many production systems use a hybrid: RAG for retrieval with a generous context window for the retrieved content plus conversation history.

### Chunking Strategies

How documents are split into chunks significantly affects retrieval quality:

- **Fixed-size chunking** (e.g., 512 tokens per chunk): Simple but can split sentences or ideas mid-thought.
- **Semantic chunking:** Split at paragraph or section boundaries. Better coherence but variable chunk sizes.
- **Recursive chunking:** Try to split at paragraph boundaries; fall back to sentence boundaries; fall back to token count. The most common production approach.
- **Parent-child chunking:** Index small chunks for precise retrieval but return the larger parent chunk (or full section) to the model. Balances retrieval precision with generation context.

### Embedding Models

Anthropic does not offer a native embeddings API [F1]. Google offers text, image, audio, and video embedding via the Gemini API (Preview) [F3]. OpenAI offers text-embedding-3-large and text-embedding-3-small (GA), which remain the most widely used embedding models in production [F2]. For Anthropic-centric architectures, third-party embedding providers (OpenAI, Cohere, Voyage AI) are the standard choice.

### Platform-Integrated RAG

Several platforms have built RAG-like capabilities into their products, eliminating the need for custom infrastructure:

- **ChatGPT Projects:** Upload files as persistent context for a project. ChatGPT performs internal retrieval against uploaded sources [F2].
- **Claude Projects:** Upload files and set custom instructions per project. Claude accesses these as background context [F1].
- **Google NotebookLM:** Purpose-built for source-grounded research. Upload up to 600 sources per notebook (Ultra tier); all responses cite specific sources. This is the most sophisticated consumer-facing RAG product available [F3].
- **Microsoft Copilot (M365):** Grounded in Microsoft Graph -- emails, files, meetings, chats. The Work IQ layer adds organizational intelligence on top [F4].

---

## Compaction: What Happens When Context Fills Up

Every conversation eventually approaches the context window limit. Compaction is the process of summarizing or truncating conversation history to make room for new content while preserving the most important information.

### How Compaction Works

When a conversation nears the context limit, the platform applies one or more strategies:

1. **Summarization:** Older conversation turns are summarized into a condensed representation. The summary replaces the full text, freeing tokens.
2. **Truncation:** The oldest turns are dropped entirely, keeping only the most recent exchanges.
3. **Hybrid:** Summarize older turns, keep recent turns verbatim, and preserve system instructions untouched.

Most implementations use the hybrid approach. System prompts and instructions are always preserved. Recent conversation turns are kept verbatim. Older history is progressively summarized or dropped.

### What Survives Compaction

This matters enormously for agent systems and long-running workflows:

| Content Type | Survives Compaction? | Notes |
|-------------|---------------------|-------|
| System prompt / instructions | Always | Reloaded fresh after compaction |
| Most recent turns (last 5-10) | Usually | Kept verbatim |
| User preferences / memory | Yes (external) | Stored outside context window |
| Detailed early conversation | No | Summarized or dropped |
| Specific numbers, dates, URLs from early turns | Often lost | Summaries rarely preserve exact values |
| Research results, web search output | No | Too verbose; summarized aggressively |
| Tool call results from early turns | Partially | Key outcomes may survive; details lost |

### OpenAI's Response Compaction Endpoint

OpenAI offers a dedicated response compaction endpoint for long-running agentic workflows that exceed context limits. Rather than relying on automatic truncation, developers can explicitly trigger compaction and control what information is preserved [F2]. This is particularly useful for multi-step agent pipelines where specific intermediate results must survive across many turns.

### Implications for Practitioners

**Write important things down.** If a fact, decision, or intermediate result matters beyond the current exchange, persist it to an external store -- a file, a database, a memory system. Do not rely on it surviving compaction in a long conversation.

**Front-load critical context.** System prompts and instructions survive compaction. Place essential context, rules, and reference data in the system prompt rather than in early user messages.

**Design for compaction.** In agent architectures, structure workflows so that each step produces a self-contained summary of its results. When compaction occurs, the summary is sufficient to continue work without access to the full step-by-step history.

---

## Context Engineering as a Discipline

The term "context engineering" has gained traction in 2025-2026 as practitioners recognized that the bottleneck in most AI systems is not model capability but context design. As Andrej Karpathy and others have argued, the quality of an LLM's output is a function of the information available in its context window at generation time -- and curating that information is an engineering discipline, not an afterthought [3].

### The Core Principles

**1. Context is the product.** The model is a fixed function (for a given generation). The only variable the practitioner controls is what goes into the context window. Improving output quality means improving context quality.

**2. Every token has a cost -- in money and in attention.** Tokens cost money (input pricing). They also cost model attention: adding irrelevant context dilutes the model's focus on relevant content. The best context is the minimum sufficient context for the task.

**3. Context has layers.** A well-engineered context window has a deliberate structure:

| Layer | Content | Persistence | Example |
|-------|---------|-------------|---------|
| **Identity** | System prompt, persona, rules | Permanent (survives compaction) | "You are a curriculum writer. Follow these standards..." |
| **Knowledge** | Reference documents, RAG results | Per-session or cached | Product documentation, style guides |
| **Memory** | User preferences, past decisions | Cross-session (via memory system) | "User prefers concise responses; works in Python" |
| **Task** | Current instructions, goals | Per-task | "Write Module 02 covering context engineering" |
| **Conversation** | Recent exchanges | Ephemeral (subject to compaction) | The last 10 messages |

**4. Design for compaction from the start.** Assume anything not in the identity or memory layers will eventually be lost. Structure information so that critical content lives in durable layers.

**5. Use the right persistence mechanism for each type of information.** Not everything belongs in the context window:

| Information Type | Best Persistence Mechanism | Why |
|-----------------|---------------------------|-----|
| Project rules and standards | System prompt / instruction files | Survives compaction; loaded every session |
| User preferences | Platform memory system | Cross-session; managed automatically |
| Reference documents (<500K tokens) | Direct context injection with caching | Full fidelity; cost-effective with caching |
| Large knowledge bases | RAG pipeline | Scales beyond context limits |
| Intermediate results in workflows | External files / database | Survives compaction; auditable |
| Conversation history | Context window (ephemeral) | Accept that it compacts |

### Context Engineering in Practice: Claude Code as Case Study

Claude Code -- Anthropic's terminal-based agentic coding tool -- implements several context engineering patterns that illustrate the discipline [F1]:

- **CLAUDE.md files:** Persistent project instructions loaded into every session. These form the identity layer and survive compaction because they are read from disk, not from conversation history.
- **Session Memory:** Automatic cross-session context persistence. Key decisions and context from one session are available in the next.
- **Progressive disclosure:** Claude Code reads files on demand rather than loading an entire codebase into context. It uses Glob/Grep to locate relevant sections, then reads only what is needed. This minimizes token usage while maintaining the ability to access any file.
- **Subagent context isolation:** When Claude Code delegates to a subagent, the subagent runs in its own context window. Only a structured summary returns to the parent. This prevents context pollution and keeps the parent's window lean.
- **Auto-compaction:** At ~95% context capacity, Claude Code triggers compaction. CLAUDE.md is reloaded fresh; a summary of recent work is preserved; verbose intermediate results are discarded.

These patterns are not specific to coding tools. Any system that manages long-running AI interactions -- customer support bots, research agents, automation pipelines -- benefits from the same architectural principles.

### The Cost Optimization Stack

Context engineering and cost optimization are inseparable. The full optimization stack, from highest to lowest impact:

1. **Model selection** (60-80% savings): Use the cheapest model that meets quality requirements. Haiku 4.5 at $1/$5 per MTok vs. Opus 4.6 at $5/$25 is a 5x difference. GPT-5.4 Nano at $0.20/$1.25 vs. GPT-5.4 at $2.50/$10 is a 10x difference.
2. **Prompt caching** (up to 90% savings on cached content): Cache system prompts and reference documents.
3. **RAG / selective retrieval** (variable, often 50-80% savings): Send only relevant chunks instead of entire documents.
4. **Batch processing** (50% savings): Use batch APIs for non-real-time workloads.
5. **Prompt optimization** (20-50% savings): Remove redundant instructions, compress examples, eliminate filler.

Applied together, these techniques can reduce API costs by 95% or more compared to naive implementations -- often the difference between a viable product and an economically unsustainable one.

---

## Key Takeaways

1. **Context windows have converged at 1M tokens** across Anthropic, OpenAI, and Google flagship models, at standard pricing with no surcharge. This was a premium feature six months ago.

2. **The effective context window is smaller than the advertised window.** Performance degrades at 40-60% capacity for precision tasks. Plan for 60-70% as your reliable operating range.

3. **Prompt caching is the highest-leverage cost optimization.** Anthropic and Google offer 90% savings on cache hits; OpenAI offers 50%. Three cache durations at Anthropic (5-minute, 1-hour, persistent) enable fine-grained control.

4. **Memory systems differ fundamentally in architecture.** Claude uses asynchronous fact extraction; ChatGPT combines explicit memories with full chat history recall; Gemini leverages the broader Google ecosystem; Microsoft Recall captures screen content. Choose based on your ecosystem and privacy requirements.

5. **RAG remains essential for large knowledge bases** but is increasingly optional for smaller ones that fit within context windows. The decision boundary is roughly 500K tokens of source material.

6. **Compaction is inevitable in long conversations.** Design for it: persist important information externally, front-load critical context in system prompts, and produce self-contained summaries at each workflow step.

7. **Context engineering is the discipline of curating what enters the context window.** It encompasses prompt design, memory management, RAG architecture, caching strategy, and compaction planning -- and it is the single highest-leverage skill for AI practitioners.

8. **Cost optimization and context engineering are the same discipline.** Every token in the window costs money and model attention. The minimum sufficient context is both the cheapest and the highest-quality approach.

---

## Cross-References

- [Module 00: Landscape Overview](MODULE-00-landscape-overview.md) -- Market context for the platforms discussed here
- [Module 01: Models & Intelligence Tiers](MODULE-01-models-and-intelligence.md) -- Model-specific context window sizes, pricing, and capability details
- [Module 03: Single-Agent Systems](MODULE-03-single-agent-systems.md) -- How agents manage context in autonomous workflows
- [Module 04: Multi-Agent Orchestration](MODULE-04-multi-agent-orchestration.md) -- Context isolation and summary propagation in multi-agent systems
- [Module 06: MCP & the Integration Layer](MODULE-06-mcp-integration-layer.md) -- MCP as a context-providing mechanism
- [Module 09: Developer Platforms & APIs](MODULE-09-developer-platforms-apis.md) -- API-level implementation of caching, batching, and structured outputs

---

## Sources

[1] Anthropic, "Token Counting and Multilingual Considerations," Anthropic Documentation, https://docs.anthropic.com/en/docs/build-with-claude/token-counting, accessed 2026-03-20.

[2] Nelson Liu et al., "Lost in the Middle: How Language Models Use Long Contexts," *Transactions of the Association for Computational Linguistics*, 2024. https://arxiv.org/abs/2307.03172, accessed 2026-03-20.

[3] Andrej Karpathy, "Context Engineering" (discussion of context as the primary lever for LLM quality), various public talks and posts, 2025-2026.

[F1] Anthropic/Claude Ecosystem Profile, reference/profiles/anthropic-claude.md, accessed 2026-03-18.

[F2] OpenAI/ChatGPT Ecosystem Profile, reference/profiles/openai-chatgpt.md, accessed 2026-03-18.

[F3] Google/Gemini Ecosystem Profile, reference/profiles/google-gemini.md, accessed 2026-03-18.

[F4] Microsoft/Copilot Ecosystem Profile, reference/profiles/microsoft-copilot.md, accessed 2026-03-18.
