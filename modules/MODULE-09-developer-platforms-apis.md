# Module 09: Developer Platforms & APIs

**Last updated:** 2026-03-20
**Status:** DRAFTING
**Word count target:** 4,000-5,000
**Prerequisites:** [Module 00: Landscape Overview](MODULE-00-landscape-overview.md), [Module 01: Models & Intelligence Tiers](MODULE-01-models-and-intelligence.md)

---

## Executive Summary

The four major AI providers -- Anthropic, OpenAI, Google, and Microsoft -- each expose their models through developer APIs with fundamentally different architectural philosophies. Anthropic's Messages API is explicit and content-block-oriented. OpenAI's Responses API is agentic-loop-native with automatic multi-tool orchestration. Google's Gemini API is natively multimodal with the most generous free tier. Microsoft's Azure OpenAI wraps OpenAI's models with enterprise infrastructure and governance. This module dissects the API architectures, SDK ecosystems, pricing economics, structured output capabilities, and customization options that determine which platform is optimal for a given development scenario.

---

## API Architectures

The four APIs are not interchangeable wrappers around similar models. Each encodes a different opinion about how developers should interact with AI, and those opinions have material consequences for application architecture, cost, and capability.

### Anthropic Messages API

**Base URL:** `api.anthropic.com`
**Authentication:** API key
**Also available via:** Amazon Bedrock, Google Vertex AI, Microsoft Foundry

Anthropic's Messages API is the most explicit of the four. Every response is a sequence of typed content blocks -- `text`, `thinking`, `tool_use`, `tool_result` -- that the developer parses individually. This explicitness is a design choice: when Claude reasons via extended thinking, the thinking block is a separate, inspectable object in the response, not interleaved with the output text. When Claude decides to call a tool, the `tool_use` block contains the tool name and arguments; the developer executes the tool and sends back a `tool_result` block in the next request [F1].

Key architectural characteristics:

- **Synchronous request/response** with explicit content blocks. No built-in agentic loop -- the developer controls the tool-use cycle.
- **Server-sent events (SSE) streaming** with typed events (`content_block_start`, `content_block_delta`, `content_block_stop`), enabling granular UI rendering.
- **Token usage reported upfront** in the response metadata, including input tokens, output tokens, and cache read/write tokens.
- **Fine-grained prompt caching** via `cache_control` markers on message content. Cache hits cost 10% of the standard input price -- the steepest discount in the industry [F1].
- **Native web search tool** (`web_search_20260209`) available as a built-in tool at $10 per 1,000 searches. Code execution tool is free when paired with web search or web fetch [F1].
- **Batch API** at `/v1/messages/batches` for 50% token discount with async 24-hour processing [F1].

The Messages API does not have a built-in agentic loop. If you want Claude to call multiple tools in sequence, your application must implement the loop: send a request, receive `tool_use` blocks, execute the tools, send results back, repeat until Claude returns only text. This is more work than OpenAI's Responses API but gives developers complete control over execution flow, error handling, and intermediate state.

### OpenAI Responses API

**Base URL:** `api.openai.com`
**Authentication:** API key (project-scoped or user-scoped)
**Primary API:** Responses API (replaces both Chat Completions and Assistants)

OpenAI's Responses API, launched as the primary API in 2025, is designed around an agentic loop. When a model decides to use tools, the API can automatically execute built-in tools (web search, file search, code interpreter, computer use) and continue the conversation without the developer making additional API calls. This is fundamentally different from Anthropic's approach: the API itself manages tool execution for built-in tools, reducing the developer's orchestration burden [F2].

Key architectural characteristics:

- **Built-in agentic loop** for built-in tools. The model calls tools, the API executes them, and the response includes the final output after all tool calls complete. For custom function calls, the developer still manages the loop.
- **Parallel function calling** -- the model can invoke multiple custom functions simultaneously in a single response.
- **Remote MCP support (Beta)** -- the Responses API can connect to remote MCP servers natively, treating them as tool sources [F2].
- **40-80% improved cache utilization** compared to the legacy Chat Completions API, thanks to architectural optimizations in how conversation state is managed [F2].
- **Computer use** is native in GPT-5.4 via the API [F2].
- **SSE streaming** for real-time token delivery.

The Chat Completions API remains supported for backward compatibility, but the Assistants API -- which provided stateful, server-side conversation management -- was deprecated in August 2025 and is sunsetting in August 2026. Developers on Assistants should migrate to the Responses API [F2].

> **Volatility warning:** OpenAI's rapid API evolution (Chat Completions -> Assistants -> Responses in under two years) has created migration fatigue among developers. Evaluate the stability commitment of any API surface before deep integration.

### Google Gemini API

**Base URL:** `generativelanguage.googleapis.com` (via Google AI Studio) or Vertex AI endpoints
**Authentication:** API key (AI Studio) or OAuth/Service Account (Vertex AI)

The Gemini API's defining characteristic is native multimodality. Unlike Anthropic and OpenAI, where image input is bolted onto a text-first API, Gemini treats text, image, audio, and video as equally first-class input types within a single, consistent SSE structure. You can pass a video file alongside a text prompt and receive a response that reasons across both modalities [F3].

Key architectural characteristics:

- **Native multimodal input** -- text, image, audio, and video in a single request. Image, audio, and text output (audio output GA; image output on select models) [F3].
- **Consistent SSE streaming** across all content types.
- **Context caching** with a 90% discount on cached input tokens, but with per-hour storage fees ($1.00-$4.50 per million tokens per hour depending on model). This storage cost is unique to Google and changes the caching economics for infrequently accessed content [F3].
- **Batch processing** at 50% discount with up to 24-hour latency [F3].
- **Google Search grounding** -- the model can ground responses in live Google Search results, with 1,500 requests per day free and $35/1,000 prompts beyond that [F3].
- **Generous free tier** -- rate-limited access to production models with no credit card required. Data from free-tier usage may be used to improve Google products [F3].
- **Code execution sandbox** -- server-side Python execution for data analysis and computation [F3].
- **Live API** -- real-time bidirectional audio/video streaming for conversational applications [F3].

Google AI Studio provides a web-based prototyping environment where developers can test prompts, compare model outputs, and export code -- a convenience layer that neither Anthropic nor OpenAI matches at the same level of integration.

### Azure OpenAI Service

**Base URL:** `<resource-name>.openai.azure.com`
**Authentication:** Azure Active Directory (AAD), Managed Identity, or API key

Azure OpenAI is not a separate API -- it is OpenAI's API wrapped in Azure's enterprise infrastructure. The token-level pricing is identical to OpenAI direct, but total cost typically runs 15-40% higher due to Azure support plans, data transfer, storage, virtual network infrastructure, and the overhead of Azure resource management [F4].

Key architectural characteristics:

- **Azure Active Directory and Managed Identity authentication** -- eliminating API key management for Azure-native applications.
- **Virtual Network (VNet) and private endpoint support** -- models can be accessed without traversing the public internet.
- **Built-in content filtering** beyond OpenAI's standard moderation, with configurable severity thresholds.
- **Regional data residency** -- deploy models in specific Azure regions for data sovereignty compliance.
- **Provisioned Throughput Units (PTUs)** -- reserved compute capacity with hourly billing, providing guaranteed throughput for latency-sensitive production workloads [F4].
- **Microsoft Foundry** (formerly Azure AI Studio) provides access to 11,000+ models from OpenAI, Anthropic, Meta, Mistral, DeepSeek, and others, with serverless pay-as-you-go or managed compute deployment options [F4].

Azure OpenAI makes sense when you already run on Azure, need enterprise compliance controls (HIPAA, FedRAMP, SOC 2), or require private networking. If none of those apply, the overhead is pure cost with no capability gain.

---

## SDK Ecosystem

SDK breadth and quality vary significantly across providers. OpenAI has the widest official coverage, Google the broadest language support, and Anthropic the most focused.

| Feature | Anthropic | OpenAI | Google | Azure OpenAI |
|---------|-----------|--------|--------|-------------|
| **Python** | `anthropic` (GA) | `openai` (GA) | `google-genai` (GA) | `openai` + Azure config (GA) |
| **TypeScript/Node.js** | `@anthropic-ai/sdk` (GA) | `openai` (GA) | `@google/genai` (GA) | `openai` + Azure config (GA) |
| **Go** | Community | `openai-go` (GA) | `google-genai` (GA) | Via `openai-go` |
| **Java** | Community | `openai-java` (GA) | Via Firebase Genkit | `openai-java` (GA) |
| **.NET/C#** | Community | `openai-dotnet` (GA) | Community | `Azure.AI.OpenAI` (GA) |
| **Swift** | Community | Community | `google-genai` (GA) | Community |
| **Kotlin** | Community | Community | `google-genai` (GA) | Community |
| **Dart** | Community | Community | `google-genai` (GA) | Community |
| **Agent SDK** | Python, TypeScript (GA) | Python, Node.js (GA) | Python (ADK) (GA) | Via OpenAI SDK |

Anthropic's SDK strategy is deliberately narrow: official support for Python and TypeScript, with an Agent SDK for building agentic applications. This reflects a philosophy of depth over breadth -- the official SDKs are well-maintained and feature-complete, but teams working in Go, Java, or .NET must rely on community packages or raw HTTP [F1].

OpenAI's SDK ecosystem is the most mature, with official packages across Python, TypeScript, Go, Java, and .NET. The `openai` Python and TypeScript packages have native support for Pydantic (Python) and Zod (TypeScript) schema validation, making structured output workflows seamless [F2].

Google's SDK support is the broadest, covering Python, Node.js, Go, Swift, Kotlin, and Dart -- reflecting Google's need to support Android (Kotlin), iOS (Swift), and Flutter (Dart) development. Firebase Genkit provides a full-stack AI application framework for JavaScript/TypeScript and Go, with Python in alpha [F3].

Azure OpenAI uses OpenAI's SDKs with Azure-specific configuration (endpoint URL, authentication). The .NET SDK (`Azure.AI.OpenAI`) is the exception -- it is Azure-native and tightly integrated with the Azure SDK ecosystem [F4].

---

## Pricing Economics

Model pricing is covered comprehensively in [Module 01](MODULE-01-models-and-intelligence.md). This section focuses on the cost optimization levers that matter at production scale: caching, batching, model tiering, and the economic crossover points between providers.

### Cost Optimization Levers

**1. Model selection (60-80% savings)**

The single largest cost lever. Choosing Haiku 4.5 over Opus 4.6 for a classification task reduces input costs by 80% (from $5 to $1 per MTok) and output costs by 80% (from $25 to $5 per MTok). Similarly, GPT-5.4 Nano ($0.20/$1.25) versus GPT-5.4 ($2.50/$10+) saves approximately 88-92% on token costs. Every API call that uses a flagship model should be justified by task complexity [F1][F2].

**2. Prompt caching**

All three direct providers offer prompt caching, but the economics differ materially:

| Provider | Cache Hit Discount | Storage Cost | Cache Duration | Mechanism |
|----------|-------------------|-------------|---------------|-----------|
| Anthropic | 90% (cache hits cost 10% of input) | None | ~5 minutes (auto-eviction) | Explicit `cache_control` markers |
| Google | 90% (cached reads) | $1.00-$4.50/MTok/hour | Developer-controlled TTL | Explicit caching API |
| OpenAI | 50% (automatic) | None | Automatic | Automatic prefix matching |

Anthropic's caching is the most aggressive discount (90%) with no storage fees, but requires explicit cache breakpoints and has a short TTL. Google matches the 90% read discount but charges per-hour storage fees, which can erode savings for infrequently accessed caches. OpenAI's caching is automatic -- no developer effort -- but only offers a 50% discount [F1][F2][F3].

**Practical implication:** For applications with stable system prompts or repeated document context, Anthropic's caching delivers the best economics. For variable workloads where cache management overhead is undesirable, OpenAI's automatic caching is simplest. Google's model works best for high-frequency access patterns where the per-hour storage cost is amortized across many requests.

**3. Batch processing (50% savings)**

All three providers offer batch APIs with approximately 50% discount on token costs, accepting up to 24-hour latency:

| Provider | Batch Discount | Max Latency | Endpoint |
|----------|---------------|-------------|----------|
| Anthropic | 50% input + output | 24 hours | `/v1/messages/batches` |
| OpenAI | 50% input + output | 24 hours | Batch API |
| Google | 50% input + output | 24 hours | Batch API |

Batch processing is ideal for offline workloads: document classification, content moderation pipelines, bulk summarization, embedding generation, and evaluation runs. At scale, combining batch processing with model tiering can reduce costs by 90%+ compared to synchronous flagship model calls [F1][F2][F3].

**4. Retrieval scope limits**

For RAG-heavy applications, the amount of context retrieved per query directly impacts cost. Reducing retrieval from 20 chunks to 5 chunks saves 75% on input token costs. This is an architectural decision that compounds with every other optimization.

### Provider Cost Comparison (Representative Workloads)

For a concrete comparison, consider three common workloads priced at each provider's best-fit model:

| Workload | Anthropic | OpenAI | Google |
|----------|-----------|--------|--------|
| **Simple classification** (100 input, 10 output tokens per call, 1M calls) | Haiku 4.5: $0.15 | GPT-5.4 Nano: $0.03 | Gemini 3.1 Flash-Lite: $0.04 |
| **Code generation** (2K input, 1K output, 10K calls) | Sonnet 4.6: $0.21 | GPT-5.4 Mini: $0.06 | Gemini 3 Flash: $0.04 |
| **Complex reasoning** (10K input, 4K output, 1K calls) | Opus 4.6: $0.15 | GPT-5.4: $0.065 | Gemini 2.5 Pro: $0.05 |

These figures use standard (non-cached, non-batched) pricing. Actual costs vary significantly with caching patterns, batch eligibility, and output length variability. At every tier, Google offers the lowest raw token prices, followed by OpenAI, then Anthropic. But raw price is not the only variable -- output quality, reliability, and task-specific performance determine the true cost-per-useful-output.

> **Volatility warning:** Token pricing changes frequently. GPT-5.4's exact pricing is marked as approximate (~$2.50/$10+) in OpenAI's documentation and may shift. Always verify against official pricing pages before making procurement decisions.

---

## Structured Outputs and Function Calling

Structured outputs -- the ability to constrain model responses to a specific JSON schema -- and function calling -- the ability for models to invoke developer-defined tools -- are foundational for production applications. All four APIs support both, but with meaningful differences in guarantees and developer experience.

### Structured Outputs

| Feature | Anthropic | OpenAI | Google |
|---------|-----------|--------|--------|
| **JSON mode** | Via tool use with schema | JSON Mode (legacy) | JSON mode |
| **Schema enforcement** | Public Beta (`strict: true` on tool schemas) | GA (`strict: true` in Structured Outputs) | GA (schema enforcement in `response_schema`) |
| **Schema validation** | Guaranteed conformance in strict mode | Guaranteed conformance in strict mode | Guaranteed conformance |
| **Native SDK types** | Manual schema definition | Pydantic (Python), Zod (TypeScript) | Manual schema definition |

OpenAI's structured outputs are the most mature: `strict: true` guarantees that every response conforms to the provided JSON schema, and the Python/TypeScript SDKs integrate natively with Pydantic and Zod for type-safe schema definition. This eliminates the need for post-hoc parsing and validation [F2].

Anthropic achieves structured output primarily through tool use -- you define a tool whose input schema matches your desired output format, and Claude "calls" the tool with conformant JSON. The `strict: true` option (Public Beta) adds guaranteed schema validation. This is functionally equivalent but conceptually different: you are using the tool-use mechanism as a structured output mechanism [F1].

Google's Gemini API supports `response_schema` for direct schema enforcement on responses, similar to OpenAI's approach [F3].

### Function Calling

All providers support function calling with JSON Schema definitions, but the execution models differ:

- **Anthropic:** Single-turn tool use. Claude returns `tool_use` content blocks; the developer executes and returns `tool_result`. Multiple tools can be called per turn, but the developer manages the loop [F1].
- **OpenAI:** Parallel function calling (GA). The model can invoke multiple functions simultaneously. Built-in tools (web search, code interpreter) are executed server-side by the API. Custom functions require developer execution [F2].
- **Google:** Function calling with automatic function execution available. Similar to OpenAI, Google can execute some built-in tools (Google Search grounding, code execution) server-side [F3].
- **Azure OpenAI:** Mirrors OpenAI's function calling capabilities exactly [F4].

For complex agentic applications, OpenAI's Agents SDK, Anthropic's Agent SDK, and Google's Agent Development Kit (ADK) provide higher-level abstractions over raw function calling -- handling tool execution loops, error recovery, and multi-agent handoffs. These are covered in [Module 04: Multi-Agent Orchestration](MODULE-04-multi-agent-orchestration.md).

---

## Fine-Tuning and Customization

The providers diverge sharply on fine-tuning availability. This is one of the clearest differentiators in the developer platform comparison.

| Capability | Anthropic | OpenAI | Google | Azure OpenAI |
|-----------|-----------|--------|--------|-------------|
| **Fine-tuning** | Not publicly available | GA (GPT-4o, GPT-4o-mini; LoRA adapters; reinforcement fine-tuning) | GA (Gemini 2.5 Flash via Vertex AI SFT) | GA (GPT-4o, GPT-4o-mini) |
| **Embeddings API** | Not offered | GA (`text-embedding-3-large`, `text-embedding-3-small`) | Preview (text, image, audio, video) | GA (same as OpenAI) |
| **System prompts** | GA (rich system prompt support) | GA | GA | GA |
| **Custom personas** | Via system prompts + Skills | Custom GPTs, Codex Skills | Gems | Copilot Studio agents |
| **RAG support** | Via context window + MCP | Built-in file search in Responses API | Context caching + Google Search grounding | Azure AI Search integration |

**Anthropic** has no publicly available fine-tuning. Their position is that prompt engineering, system prompts, and retrieval-augmented generation cover most customization needs. For applications that genuinely require fine-tuning -- domain-specific terminology, specialized output formats, behavioral alignment -- this is a hard limitation that may rule out Anthropic's API [F1].

**OpenAI** has the most mature fine-tuning platform: supervised fine-tuning for GPT-4o and GPT-4o-mini, LoRA adapters for parameter-efficient training, and reinforcement fine-tuning for aligning models to specific evaluation criteria. Fine-tuned models are accessed via the same API at customized pricing [F2].

**Google** offers supervised fine-tuning for Gemini 2.5 Flash on Vertex AI, plus the open-source Gemma 3 family (1B-27B parameters) that can be fine-tuned locally without any API dependency [F3].

**Embeddings** follow a similar pattern. OpenAI's `text-embedding-3-large` and `text-embedding-3-small` are the industry standard for vector search applications. Google offers multimodal embeddings (text, image, audio, video) in Preview. Anthropic does not offer embeddings at all -- developers using Claude for generation typically pair it with OpenAI or open-source embeddings (e.g., from Sentence Transformers or Cohere) for retrieval [F1][F2][F3].

---

## Additional API Capabilities

Beyond the core text generation APIs, each platform offers specialized capabilities that may drive platform selection for specific use cases.

### Speech and Audio

| Capability | Anthropic | OpenAI | Google |
|-----------|-----------|--------|--------|
| **Speech-to-text** | Not offered | GA (gpt-4o-transcribe, whisper-1, diarization) | GA (via Gemini multimodal input) |
| **Text-to-speech** | Not offered | GA (gpt-4o-mini-tts, tts-1/tts-1-hd; 13 voices; prompt-controllable tone) | GA (Flash TTS, Pro TTS; 24+ languages; multi-speaker) |
| **Real-time voice** | Not offered | GA (gpt-realtime via WebSocket) | GA (Live API; bidirectional audio/video) |

OpenAI and Google both offer comprehensive speech APIs. Anthropic offers none -- voice applications built on Claude require third-party speech services (e.g., ElevenLabs, which has an MCP server for direct integration) [F1][F2][F3].

### Image and Video Generation

| Capability | Anthropic | OpenAI | Google |
|-----------|-----------|--------|--------|
| **Image generation** | Not offered | GA (GPT Image 1.5) | GA (Imagen 4 via API) |
| **Video generation** | Not offered | GA (Sora 2 via API, consumer only) | Preview (Veo 3.1 via API) |
| **Image understanding** | GA (vision on all models) | GA (GPT-5.4 vision) | GA (native multimodal) |

Anthropic's API is text-and-image-input only. It does not generate images, video, or audio. For applications requiring multimodal generation, OpenAI and Google are the only first-party options among the major providers [F1][F2][F3].

### Content Safety and Moderation

| Feature | Anthropic | OpenAI | Google | Azure OpenAI |
|---------|-----------|--------|--------|-------------|
| **Built-in safety** | Constitutional AI approach; lowest hallucination rates | Moderation endpoint (free) | Safety settings per request | Configurable content filtering with severity thresholds |
| **Moderation API** | Not offered as standalone | GA (free endpoint) | Via Vertex AI | Azure Content Safety service |
| **Configurable filters** | Not offered | Limited | Per-request safety settings | Category-level severity thresholds |

Azure OpenAI's configurable content filtering is the most granular, allowing enterprise customers to tune safety thresholds by category (hate, violence, sexual, self-harm) at different severity levels. This is particularly relevant for healthcare, legal, and creative applications where default filters may be too restrictive [F4].

---

## Platform Selection Framework

Choosing a developer platform is a function of requirements, not absolute quality. Use these decision criteria:

**Choose Anthropic when:**
- Writing quality and nuanced reasoning are primary requirements
- You need the steepest prompt caching discount (90%) for repetitive workloads
- MCP-native architecture is your integration strategy
- Fine-tuning and embeddings are not required
- Your SDK needs are Python or TypeScript

**Choose OpenAI when:**
- You need the broadest API surface (text, speech, image, video, embeddings, fine-tuning)
- Structured outputs with Pydantic/Zod integration are important
- You want automatic caching with zero developer effort
- SDK support across Go, Java, .NET matters
- The Agents SDK's multi-agent handoff pattern fits your architecture

**Choose Google when:**
- Native multimodal input (video, audio alongside text) is required
- You need Google Search grounding for factual accuracy
- Budget-tier pricing (Flash-Lite, free tier) is critical
- Your application targets Android/iOS/Flutter (Swift, Kotlin, Dart SDKs)
- Context caching economics favor your access pattern (high-frequency, long-TTL)

**Choose Azure OpenAI when:**
- Enterprise compliance (HIPAA, FedRAMP, SOC 2) is non-negotiable
- Private networking (VNet, private endpoints) is required
- You need model diversity from a single platform (11,000+ models via Foundry)
- Azure Active Directory integration is your identity strategy
- Provisioned throughput with guaranteed latency is needed

---

## Key Takeaways

1. **Anthropic's Messages API** is the most explicit and developer-controlled, with the best caching economics (90% discount, no storage fees) but the narrowest capability surface (no speech, image generation, embeddings, or fine-tuning).

2. **OpenAI's Responses API** is the most capable single API, with built-in agentic loops, parallel function calling, structured outputs, fine-tuning, embeddings, speech, and image generation -- but its rapid evolution (three API paradigms in two years) creates migration risk.

3. **Google's Gemini API** is the most cost-effective at every tier and the only one with native multimodal input (video and audio alongside text), plus the most generous free tier for prototyping.

4. **Azure OpenAI** adds enterprise infrastructure to OpenAI's models at a 15-40% premium -- justified only when compliance, private networking, or Azure ecosystem integration is required.

5. **Prompt caching** varies dramatically: Anthropic (90% discount, explicit), Google (90% discount + storage fees), OpenAI (50% discount, automatic). Choose based on workload pattern.

6. **Batch processing** offers 50% savings on all three direct platforms. Any offline workload not using batch mode is overpaying.

7. **Model selection** is the single largest cost lever -- 60-90% savings by choosing the right tier. Use flagship models only when task complexity demands it.

8. **Fine-tuning** is only available from OpenAI (most mature), Google (Gemini 2.5 Flash SFT), and Azure. Anthropic does not offer it.

9. **Structured outputs** are production-ready on all platforms, but OpenAI's Pydantic/Zod integration and strict schema guarantee make it the smoothest developer experience.

10. **SDK breadth** favors Google (7 languages) and OpenAI (5 languages, plus community). Anthropic's official SDK support is limited to Python and TypeScript.

---

## Cross-References

- [Module 00: Landscape Overview](MODULE-00-landscape-overview.md) -- Platform ecosystem context and market positioning
- [Module 01: Models & Intelligence Tiers](MODULE-01-models-and-intelligence.md) -- Comprehensive model lineup, pricing tables, and benchmark comparisons
- [Module 02: Context Engineering](MODULE-02-context-engineering.md) -- Prompt caching strategies and context window management in depth
- [Module 03: Single-Agent Systems](MODULE-03-single-agent-systems.md) -- How these APIs power individual agent architectures
- [Module 04: Multi-Agent Orchestration](MODULE-04-multi-agent-orchestration.md) -- Agent SDKs (Anthropic, OpenAI, Google ADK) built on these APIs
- [Module 06: MCP & the Integration Layer](MODULE-06-mcp-integration-layer.md) -- MCP server/client integration across all platforms
- [Module 08: Consumer AI Comparison](MODULE-08-consumer-ai-comparison.md) -- Consumer-facing pricing and feature comparison

---

## Sources

| # | Source | Details |
|---|--------|---------|
| [F1] | Anthropic/Claude Ecosystem Profile | reference/profiles/anthropic-claude.md, March 18, 2026 |
| [F2] | OpenAI/ChatGPT Ecosystem Profile | reference/profiles/openai-chatgpt.md, March 18, 2026 |
| [F3] | Google/Gemini Ecosystem Profile | reference/profiles/google-gemini.md, March 18, 2026 |
| [F4] | Microsoft/Copilot Ecosystem Profile | reference/profiles/microsoft-copilot.md, March 18, 2026 |
| [1] | Anthropic API Documentation | https://docs.anthropic.com/en/docs |
| [2] | OpenAI API Documentation | https://developers.openai.com/api/docs/ |
| [3] | OpenAI Responses API | https://developers.openai.com/docs/guides/responses-vs-chat-completions |
| [4] | Google Gemini API Documentation | https://ai.google.dev/gemini-api/docs |
| [5] | Google Gemini API Pricing | https://ai.google.dev/gemini-api/docs/pricing |
| [6] | Azure OpenAI Service Documentation | https://learn.microsoft.com/en-us/azure/ai-services/openai/ |
| [7] | OpenAI API Pricing | https://openai.com/api/pricing/ |
| [8] | Anthropic API Pricing | https://docs.anthropic.com/en/docs/about-claude/models |
| [9] | OpenAI Agents SDK | https://github.com/openai/openai-agents-python |
| [10] | Google Agent Development Kit | https://google.github.io/adk-docs/ |
| [11] | Microsoft Foundry Documentation | https://learn.microsoft.com/en-us/azure/ai-studio/ |
