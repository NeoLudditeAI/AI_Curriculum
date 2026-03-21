# Module 01: Models & Intelligence Tiers

**Last updated:** 2026-03-20
**Status:** DRAFTING
**Word count target:** 5,000-6,000
**Prerequisites:** [Module 00: Landscape Overview](MODULE-00-landscape-overview.md)

---

## Executive Summary

Every AI platform covered in this curriculum is ultimately powered by large language models, and the choice of which model to use -- for what task, at what cost, with what tradeoffs -- is the single most consequential decision a practitioner makes daily. This module catalogs every production model across the four major platforms (Anthropic, OpenAI, Google, Microsoft) as of March 2026, compares them on context windows, pricing, and capabilities, examines the three major reasoning paradigms (extended thinking, o-series reasoning, Deep Think), surveys multimodal input and output capabilities, and provides a concrete model selection framework for common task categories.

---

## The Model Landscape in March 2026

The frontier model market has undergone a year of unprecedented velocity. OpenAI shipped five model generations (GPT-5 through GPT-5.4) in roughly twelve months. Anthropic released Opus 4.6 and Sonnet 4.6 within two weeks of each other in February 2026. Google launched the Gemini 3 family with Flash and 3.1 Pro variants. The result is a market where last quarter's flagship is this quarter's legacy model, and pricing has dropped dramatically -- in some cases by 80% or more within months of launch.

> **Volatility warning:** Model lineups, pricing, and availability change frequently. All data in this module reflects the state as of March 20, 2026. Verify pricing against official documentation before making procurement decisions.

Three structural trends define the current landscape:

1. **Context windows have converged at 1M tokens.** Anthropic (Opus 4.6, Sonnet 4.6), OpenAI (GPT-5.4), and Google (Gemini 2.5 Pro, 2.5 Flash, 3 Flash) all offer million-token context at GA pricing. This was a premium feature six months ago; it is now table stakes.

2. **Reasoning modes have become standard.** Every major provider now offers some form of extended reasoning: Anthropic's extended thinking, OpenAI's o-series models, and Google's Deep Think. These trade latency and cost for substantially improved performance on complex tasks.

3. **The cost floor keeps dropping.** Budget models like GPT-5.4 Nano ($0.20/$1.25 per MTok), Gemini 3.1 Flash-Lite ($0.25/$1.50 per MTok), and Haiku 4.5 ($1/$5 per MTok) make sophisticated AI accessible at production scale for cents per thousand queries.

---

## Anthropic: The Claude Model Family

Anthropic maintains a three-tier model lineup -- Opus (flagship), Sonnet (balanced), and Haiku (fast/cheap) -- with version numbers that track a shared generation. The current generation is 4.6 for the top two tiers.

### Current Production Models

| Model | Released | Context Window | Max Output | Input $/MTok | Output $/MTok | Key Strengths |
|-------|----------|---------------|------------|-------------|--------------|---------------|
| **Opus 4.6** | Feb 5, 2026 | 1M tokens | 128K tokens | $5.00 | $25.00 | Deep reasoning, long-horizon coding, multi-step agentic work |
| **Sonnet 4.6** | Feb 17, 2026 | 1M tokens | 128K tokens | $3.00 | $15.00 | Near-Opus performance, dramatically improved computer use, strong instruction following |
| **Haiku 4.5** | Oct 15, 2025 | 200K tokens | 64K tokens | $1.00 | $5.00 | Fastest model, near-Sonnet-4 performance, 73.3% SWE-bench Verified |

**Legacy models** still available but not recommended for new work: Sonnet 4.5 ($3/$15, 200K context), Opus 4.5 ($5/$25, 200K context), and Opus 4.1 ($15/$75, 200K context -- deprecated pricing tier) [F1].

### Cost Optimization

Anthropic offers two major cost reduction mechanisms:

- **Prompt caching:** Cache hits cost 10% of the standard input price. Three cache durations are available: 5-minute, 1-hour, and persistent. For applications with repeated system prompts or reference documents, this can reduce effective input costs by 90% [F1].
- **Batch API:** 50% discount on both input and output tokens for asynchronous processing. Suitable for bulk analysis, content generation, and evaluation pipelines [F1].

**Fast mode** (beta) is available for Opus 4.6 only at $30/$150 per MTok -- a 6x premium over standard pricing for faster output. For prompts exceeding 200K input tokens, fast mode pricing increases to $60/$225 per MTok. This is the same model, not a separate model; it trades cost for reduced latency [W5].

### Key Technical Notes

- **1M context at standard pricing:** As of March 14, 2026, both Opus 4.6 and Sonnet 4.6 offer 1M-token context windows at standard per-token rates with no long-context surcharge [F1].
- **Extended thinking:** Available on all current models (Opus 4.6, Sonnet 4.6, Haiku 4.5) at GA. Thinking tokens are billed as output tokens [F1].
- **Multimodal input:** Text and image input on all models; native PDF processing. No native audio or video input via API [F1].
- **Computer use:** Supported on all current models. Sonnet 4.6 has "dramatically improved" computer use capabilities [F1].
- **Context awareness:** Haiku 4.5 and above can track remaining context window mid-conversation [F1].

### Benchmark Highlights

- Opus 4.6: Top-tier on complex reasoning and coding benchmarks
- Sonnet 4.6: Closes the gap with Opus significantly; near-Opus on coding, document comprehension, and office tasks
- Haiku 4.5: 73.3% SWE-bench Verified (surpasses Sonnet 4); 50.7% on computer-use benchmarks (best in Anthropic's lineup) [F1]

---

## OpenAI: The GPT and o-Series Families

OpenAI maintains two distinct model families: GPT (general-purpose foundation models) and o-series (dedicated reasoning models). The current flagship is GPT-5.4, released March 5, 2026. OpenAI's model churn is the highest in the industry -- GPT-4o was retired February 13, 2026, and GPT-5.1 was retired March 11, 2026 [F2].

> **Volatility warning:** OpenAI deprecates models aggressively. GPT-4o, once the flagship, is no longer available. Plan for model migration as part of any OpenAI integration.

### Current GPT Models

| Model | Released | Context | Input $/MTok | Output $/MTok | Key Strengths |
|-------|----------|---------|-------------|--------------|---------------|
| **GPT-5.4** | Mar 5, 2026 | 1M tokens | ~$2.50 | ~$10+ | Native computer use, strongest coding/reasoning |
| **GPT-5.4 Mini** | Mar 17, 2026 | 400K tokens | $0.75 | $4.50 | 2x faster than 5.4, strong coding |
| **GPT-5.4 Nano** | Mar 17, 2026 | 400K tokens | $0.20 | $1.25 | Cheapest current-gen model |
| **GPT-5.3 Codex** | — | — | $3.00 | $15.00 | Optimized for software engineering |
| **GPT-5.2** | — | 400K (128K out) | $1.75 | $14.00 | Prior flagship, mature |
| **GPT-4o Mini** | Legacy | 128K tokens | $0.15 | $0.60 | Cheapest available model |

### Reasoning Models (o-Series)

The o-series is a separate model family trained with reinforcement learning specifically for multi-step reasoning. These are not GPT variants -- they have different architectures and training methodologies.

| Model | Input $/MTok | Output $/MTok | Key Strengths |
|-------|-------------|--------------|---------------|
| **o3** | $2.00 | $8.00 | General reasoning (80% cheaper than launch price) |
| **o3-pro** | $20.00 | $80.00 | Maximum reasoning compute, hardest problems |
| **o4-mini** | — | — | Efficient reasoning; AIME 2025 99.5% pass@1 [W8] |

**GPT-5.4 Thinking** is a reasoning variant of GPT-5.4 (not an o-series model) that brings chain-of-thought reasoning to the GPT architecture. It is available as a model selector option in ChatGPT and via the API [F2].

### Additional Model Categories

**Image generation:** GPT Image 1.5 (GA, December 2025) replaces DALL-E 3 (deprecated, support ends May 12, 2026). 4x faster generation with superior text rendering in images [F2].

**Audio and speech:**
- **gpt-4o-transcribe** / **gpt-4o-mini-transcribe**: Speech-to-text with lower error rates than Whisper
- **gpt-4o-transcribe-diarize**: Speech-to-text with speaker identification
- **gpt-realtime**: Speech-to-speech streaming via WebSocket, sub-3-second latency
- **gpt-4o-mini-tts**: Prompt-controllable text-to-speech
- **tts-1** / **tts-1-hd**: Standard and HD quality TTS with 13 voice options
- **Whisper-1**: $0.006/minute, 99+ language support [F2]

### Cost Optimization

- **Batch API:** 50% cost reduction with 24-hour asynchronous processing [F2].
- **Response compaction:** An endpoint for long-running workflows that exceed context, reducing token usage [F2].
- Fine-tuning available for select models with LoRA adapter support [F2].

### Retired Models

GPT-5.1 (all variants): retired March 11, 2026. GPT-4o: retired February 13, 2026. DALL-E 2 and DALL-E 3: deprecated, support ends May 12, 2026 [F2].

---

## Google: The Gemini and Gemma Families

Google's model lineup is the broadest, spanning cloud models (Gemini), open-source models (Gemma), and on-device models (Gemini Nano). Google is also the only provider with a native reasoning mode (Deep Think) built into its standard model family rather than offered as a separate model or feature.

### Current Gemini Models

| Model | Status | Context Window | Input $/MTok | Output $/MTok | Key Strengths |
|-------|--------|---------------|-------------|--------------|---------------|
| **Gemini 3.1 Pro** | Preview | 200K+ tokens | $2.00-$4.00 | $12.00-$18.00 | Flagship reasoning, 2x reasoning improvement over prior gen |
| **Gemini 3 Flash** | GA | 1M tokens | $0.50 | $3.00 | 3x faster than 2.5 Pro, frontier intelligence |
| **Gemini 3.1 Flash-Lite** | Preview | 1M tokens | $0.25 | $1.50 | Most cost-efficient model in Google's lineup |
| **Gemini 2.5 Pro** | GA | 1M tokens | $1.25-$2.50 | $10.00-$15.00 | Complex reasoning, advanced code generation |
| **Gemini 2.5 Flash** | GA | 1M tokens | $0.30 | $2.50 | Speed/cost optimized, 20-30% fewer tokens |
| **Gemini 2.5 Flash-Lite** | GA | Standard | $0.10 | $0.40 | Budget tier, high throughput |
| **Gemini 3 Deep Think** (reasoning mode) | Preview | 192K tokens | — | — | ARC-AGI-2 84.6%, Humanity's Last Exam 48.4%, Codeforces Elo 3455 |

> **Volatility warning:** Google's pricing uses a two-tier structure where rates differ based on whether input exceeds a threshold (typically 200K tokens). The prices above show the range.

### Context Caching

Google's context caching offers the same 90% discount on cached reads as Anthropic (both charge 10% of standard input price for cache hits). The key difference is the cache eviction model: Anthropic uses time-based expiration (5-minute, 1-hour, or persistent durations) with no ongoing storage fee, while Google charges $1-$4.50 per million tokens per hour for cache storage. For short-lived caches, Anthropic's model is simpler; for long-lived reference documents, Google's explicit storage pricing may be more predictable [F3].

**Batch processing:** 50% discount, matching Anthropic and OpenAI [F3].

### Gemma 3 (Open-Source)

Gemma 3 is Google's open-source model family released under the Apache 2.0 license:

- **Sizes:** 270M, 1B, 4B, 12B, 27B parameters
- **Multimodal:** Image input supported on 4B+ models
- **Context:** 128K tokens on 4B+ models
- **Languages:** 140+ languages
- **Deployment:** Runs on a single GPU; suitable for on-device, edge, and self-hosted deployment [F3]

### Gemini Nano (On-Device)

Gemini Nano is the only major provider's model designed for on-device inference with no server connection required. It powers Android features including Smart Reply, Call Notes, Pixel Screenshots, and TalkBack image descriptions. Processing is entirely local -- no data leaves the device [F3].

---

## Microsoft: The Model Marketplace

Microsoft does not train frontier LLMs. Instead, it operates **Microsoft Foundry** (formerly Azure AI Studio), a marketplace of 11,000+ models from 11+ publishers including OpenAI, Anthropic, Meta, Mistral, DeepSeek, and Microsoft's own Phi family [F4].

### Notable Models Available Through Foundry

| Model | Provider | Key Specs |
|-------|----------|-----------|
| GPT-5.2, GPT-4o, o1/o3 | OpenAI | Full OpenAI lineup via Azure |
| Claude Opus 4.6, Sonnet 4.6 | Anthropic | Added March 2026 (Wave 3) |
| Llama models | Meta | Open-weight, commercially indemnified (Jan 2026) |
| Mistral models | Mistral AI | European alternative |
| DeepSeek models | DeepSeek | Cost-efficient reasoning, commercially indemnified (Jan 2026) |

### Microsoft's Own Models: Phi Family

Microsoft's Phi models target edge and mobile deployment where full-scale frontier models are impractical:

- **Phi-4:** 14B parameters, strong complex reasoning
- **Phi-4-multimodal:** 5.6B parameters, handles speech, vision, and text
- **Phi-4-Reasoning-Vision-15B:** Released March 4, 2026, combining visual reasoning with language [F4]

### Work IQ Intelligence Layer

Announced at Wave 3 (March 9, 2026), Work IQ is an organizational intelligence layer that uses Microsoft Graph data -- emails, files, meetings, messages, and company structure -- to contextualize Copilot responses. This is not a model per se, but it represents Microsoft's approach to enterprise-specific intelligence: the model itself is generic, but the context surrounding it is deeply organizational [F4].

---

## Reasoning Modes Compared

The most significant capability development of 2025-2026 is the emergence of explicit reasoning modes -- mechanisms that trade latency and cost for substantially improved performance on complex problems. The three major implementations take fundamentally different architectural approaches.

### Anthropic: Extended Thinking

Extended thinking is not a separate model. It is a mode available on all current Claude models (Opus 4.6, Sonnet 4.6, Haiku 4.5) where the model allocates additional serial compute to reason through problems before generating a response [F1].

**How it works:** The model produces a "thinking" block of internal reasoning (visible to the user) before the final response. This uses serial test-time compute -- the model reasons step by step through a single chain of thought.

**Configuration:**
- Effort levels: Low, Medium, High (default), Max
- Thinking tokens are billed as output tokens ($5-$25/MTok for Opus, $3-$15/MTok for Sonnet)
- No separate model endpoint; enabled via API parameter [F1]

**Experimental:** Parallel thinking, where multiple independent thought processes run concurrently, is available as an experimental feature [F1].

**Performance characteristic:** Logarithmic improvement -- doubling compute produces diminishing but measurable gains. Best for problems that benefit from systematic exploration of solution space (coding, math, analysis) rather than problems requiring creative leaps.

### OpenAI: o-Series Reasoning

The o-series (o3, o3-pro, o4-mini) are dedicated reasoning models -- architecturally distinct from the GPT family, trained with reinforcement learning specifically for multi-step reasoning [F2].

**How it works:** Unlike extended thinking (which is the same model thinking longer), o-series models are purpose-built reasoners. They decompose problems, explore solution paths, and self-verify. The reasoning process is not fully visible to the user.

**Configuration:**
- Reasoning effort: Low, Medium, High
- o3: $2/$8 per MTok (after an 80% price drop from launch)
- o3-pro: $20/$80 per MTok -- maximum reasoning compute
- o4-mini: Optimized for math, coding, and visual tasks [F2]

**Key benchmarks:**
- o4-mini: AIME 2025 99.5% pass@1 [W8]
- o3-pro: Highest scores on hardest reasoning benchmarks across providers [F2]

**GPT-5.4 Thinking** is a hybrid: a GPT-family model with reasoning capabilities grafted on, available as a model selector option. It is not an o-series model but offers some of the same benefits at GPT-5.4 pricing [F2].

### Google: Gemini 3 Deep Think

Gemini 3 Deep Think is a reasoning mode within the Gemini 3 family -- not a separate model. Like Anthropic's extended thinking, it activates additional compute on the base Gemini 3 model [F3].

**How it works:** Deep Think uses parallel hypothesis evaluation -- it constructs multiple candidate approaches simultaneously, evaluates them, and verifies the best one. This is architecturally distinct from both Anthropic's serial chain-of-thought and OpenAI's RL-trained reasoning [F3].

**Current implementation:**
- Gemini 3 Deep Think (Preview): Available only on the AI Ultra tier ($249.99/month consumer subscription)
- 192K context window (smaller than standard Gemini context)
- Not yet available via API for general developers [F3]

**Benchmark highlights:**
- ARC-AGI-2: 84.6% (the highest published score on this benchmark)
- Humanity's Last Exam: 48.4%
- Codeforces Elo: 3455
- IMO gold-medal level mathematical reasoning [W7]

### The CoT Anti-Pattern

Research from Wharton's GAIL lab found that adding chain-of-thought prompts ("think step by step") to models that already reason internally adds 20-80% latency for only 2.9-3.1% improvement [W6]. When using extended thinking, o-series models, or Deep Think, do not layer additional CoT prompting on top -- the model is already reasoning; prompting it to reason again is redundant and wasteful.

### Reasoning Modes Summary

| Dimension | Anthropic Extended Thinking | OpenAI o-Series | Google Deep Think |
|-----------|---------------------------|----------------|-------------------|
| Architecture | Same model, serial CoT | Separate RL-trained models | Same model, parallel hypothesis |
| Visibility | Thinking block visible | Partially visible | Thought summaries |
| Effort control | Low/Medium/High/Max | Low/Medium/High | Not configurable |
| Pricing | Thinking tokens as output | Dedicated model pricing | AI Ultra subscription only |
| Availability | All current Claude models (GA) | Dedicated models (GA) | Gemini 3 Deep Think (Preview) |
| Best benchmark | Top-tier coding, reasoning | o4-mini: AIME 99.5% | ARC-AGI-2: 84.6% |
| Consumer access | Pro plan ($20/mo) | Plus plan ($20/mo) | Ultra plan ($249.99/mo) |

---

## Multimodal Capabilities

Multimodal support -- the ability to process and generate content across text, image, audio, and video -- varies significantly across providers.

### Input Modalities

| Modality | Anthropic (Claude) | OpenAI (GPT) | Google (Gemini) | Notes |
|----------|-------------------|-------------|-----------------|-------|
| Text | All models | All models | All models | Universal |
| Images | All models | All models | All models | Universal |
| PDF | Native processing | Via Code Interpreter | Native | Claude and Gemini handle PDFs natively |
| Audio | No native API audio | gpt-4o-transcribe, Realtime API, Whisper | Native audio input | Claude lacks audio input via API |
| Video | No | GPT-5.4, GPT-5.2 | Gemini 3 Flash, 2.5 Pro | Google has broadest video support |

### Output Modalities

| Modality | Anthropic (Claude) | OpenAI (GPT) | Google (Gemini) | Specialized Tools |
|----------|-------------------|-------------|-----------------|-------------------|
| Text | All models | All models | All models | — |
| Images | None | GPT Image 1.5 | Imagen 4, Nano Banana Pro | Midjourney v7 (highest artistic quality) |
| Video | None | Sora 2 (25 sec, Disney licensing) | Veo 3.1 (8 sec, native audio) | — |
| Voice/TTS | 5 voice options in consumer app | Advanced Voice Mode (<3s latency), 13 API voices | Gemini Live (24+ languages), native multi-speaker TTS | ElevenLabs (most realistic cloning) |
| Music | None | None | MusicFX / MusicFX DJ | — |

### Multimodal Gap Analysis

**Anthropic's gap is notable:** Claude has no native image generation, no video generation, no audio generation, and no audio input via API. In the consumer app, Claude offers basic TTS with 5 voice options, but this is far behind OpenAI's Advanced Voice Mode and Google's Gemini Live. For multimodal output, Claude users must integrate with third-party tools: Midjourney or Canva for images, ElevenLabs for voice synthesis [F1].

**OpenAI leads on voice:** Advanced Voice Mode delivers sub-3-second response times with emotional expression across 9+ voices. The Realtime API enables developers to build voice-first applications with tool calling during voice conversations [F2].

**Google leads on breadth:** Gemini is the only platform with native support for image generation, video generation, music generation, and multi-speaker TTS all in a single ecosystem. The Flow creative studio (merging Whisk, ImageFX, and Veo) provides a unified interface for all creative modalities [F3].

---

## Head-to-Head Model Comparison

### Flagship Model Comparison (March 2026)

| Dimension | Claude Opus 4.6 | GPT-5.4 | Gemini 3.1 Pro | Notes |
|-----------|-----------------|---------|----------------|-------|
| Context window | 1M tokens | 1M tokens | 200K+ tokens | Opus and GPT-5.4 lead on context |
| Max output | 128K tokens | — | — | Opus has the highest confirmed max output |
| Input cost | $5.00/MTok | ~$2.50/MTok | $2.00-$4.00/MTok | GPT-5.4 cheapest flagship |
| Output cost | $25.00/MTok | ~$10+/MTok | $12.00-$18.00/MTok | GPT-5.4 cheapest flagship |
| Reasoning mode | Extended thinking (GA) | Thinking variant (GA) | Gemini 3 Deep Think (Preview) | All available |
| Computer use | All models (GA) | GPT-5.4 native (GA) | Project Mariner (Preview) | Claude most mature |
| Image input | Yes | Yes | Yes | Universal |
| Audio input | No (API) | Yes | Yes | Claude lacks |
| Image generation | No | GPT Image 1.5 | Imagen 4 | Claude lacks |

### Budget Model Comparison (March 2026)

| Dimension | Haiku 4.5 | GPT-5.4 Nano | Gemini 3.1 Flash-Lite | GPT-4o Mini |
|-----------|-----------|--------------|----------------------|-------------|
| Input cost | $1.00/MTok | $0.20/MTok | $0.25/MTok | $0.15/MTok |
| Output cost | $5.00/MTok | $1.25/MTok | $1.50/MTok | $0.60/MTok |
| Context | 200K | 400K | 1M | 128K |
| Best for | Fast coding, triage | Production scale | Classification, routing | Legacy budget |
| SWE-bench | 73.3% | — | — | — |

> **Volatility warning:** GPT-4o Mini is a legacy model. Given OpenAI's aggressive deprecation history (GPT-4o itself was retired February 2026), GPT-4o Mini could be deprecated with limited notice. Do not build new integrations against it.

At the budget tier, **GPT-4o Mini ($0.15/$0.60)** remains the cheapest option for simple tasks, but it is a legacy model on borrowed time. For current-generation budget work, **GPT-5.4 Nano ($0.20/$1.25)** and **Gemini 3.1 Flash-Lite ($0.25/$1.50)** offer dramatically better capabilities at similar price points.

---

## Model Selection Framework

Choosing the right model is a function of four variables: task complexity, required modalities, latency requirements, and cost constraints. The following framework maps common task categories to recommended models.

### By Task Type

| Task Category | Recommended Model(s) | Rationale |
|--------------|----------------------|-----------|
| Complex reasoning + coding | Claude Opus 4.6 | Top-tier reasoning, 1M context, 128K output, best code quality |
| Vision-heavy + reasoning | GPT-5.4 Thinking or Gemini 2.5 Pro | Both support native image + video input with reasoning |
| Fast classification / routing | GPT-5.4 Nano ($0.20/MTok) or Gemini 3.1 Flash-Lite ($0.25/MTok) | Cheapest current-gen models |
| Long document analysis | Claude Opus 4.6 or Gemini 3 Flash | Both offer 1M context; Gemini is cheaper |
| Video understanding | Gemini 3 Flash | Broadest video input support at 1M context |
| Audio/voice applications | GPT-5.4 + Realtime API, or Gemini + ElevenLabs | OpenAI has best native voice; ElevenLabs for highest quality synthesis |
| Image generation | GPT Image 1.5 (best instruction adherence) or Midjourney v7 (best artistic quality) | Claude and Google differ; Midjourney leads artistically |
| Video generation | Sora 2 (longest clips, Disney content) or Veo 3.1 (native audio) | Depends on use case |
| Budget bulk processing | GPT-5.4 Nano + Batch API or Gemini 3.1 Flash-Lite + Batch | 50% batch discount on already-cheap models |
| Enterprise multi-model | Microsoft Foundry | Access to 11,000+ models with commercial indemnification |
| On-device / offline | Gemini Nano (Android) or Gemma 3 (self-hosted) | Only options for fully local inference |
| Maximum reasoning (hardest problems) | o3-pro ($20/$80/MTok) or Gemini 3 Deep Think | Highest compute allocation for reasoning |

### By Cost Sensitivity

For cost-sensitive applications, the effective cost depends heavily on caching and batching strategies:

| Optimization | Anthropic | OpenAI | Google |
|-------------|-----------|--------|--------|
| Cache hit discount | 90% off input | — | 90% off input |
| Batch discount | 50% off all tokens | 50% off all tokens | 50% off all tokens |
| Cheapest model | Haiku 4.5: $1/$5 | GPT-4o Mini: $0.15/$0.60 | Flash-Lite 2.5: $0.10/$0.40 |
| Best value flagship | Sonnet 4.6: $3/$15 | GPT-5.4: ~$2.50/~$10 | Gemini 3 Flash: $0.50/$3 |
| Free tier | No | No | Yes (rate-limited, data used for training) |

Google's **Gemini 2.5 Flash-Lite at $0.10/$0.40 per MTok** is the absolute cheapest current-generation model across all providers. Google also offers the only free API tier, though with the caveat that data may be used for model improvement [F3].

---

## Key Takeaways

1. **Context windows have converged at 1M tokens** across Anthropic, OpenAI, and Google. This removes context length as a differentiator for most workloads and shifts the competitive axis to reasoning quality and multimodal capabilities.

2. **Three reasoning paradigms exist**, each architecturally distinct: Anthropic's serial extended thinking (same model, more compute), OpenAI's RL-trained o-series (separate specialized models), and Google's parallel Deep Think (same model, multiple hypothesis paths). All improve performance on complex tasks; none should be combined with additional CoT prompting.

3. **Claude Opus 4.6 leads on code and reasoning quality** but lacks multimodal output. GPT-5.4 offers the broadest single-model capability (text + vision + audio + computer use). Gemini leads on multimodal breadth and cost efficiency.

4. **Budget models are now remarkably capable.** GPT-5.4 Nano at $0.20/MTok input and Gemini 3.1 Flash-Lite at $0.25/MTok input can handle tasks that required flagship models a year ago.

5. **OpenAI's deprecation velocity is a real risk.** Five model generations in twelve months means any integration built on a specific model may need migration within 3-6 months. Plan for model portability.

6. **Microsoft is a marketplace, not a model maker.** Foundry's 11,000+ model catalog with commercial indemnification makes it the enterprise procurement layer, but Microsoft itself builds only small Phi models for edge deployment.

7. **Google is the only provider with models at every layer** -- cloud (Gemini), browser (Chrome), on-device (Nano), and open-source (Gemma) -- giving it unmatched surface area for integration.

8. **Prompt caching is a must-use optimization.** Both Anthropic and Google offer 90% discounts on cached reads. For applications with stable system prompts or reference documents, this alone can reduce costs by an order of magnitude.

9. **The multimodal gap matters.** Claude's lack of native audio input, image generation, and video generation means practitioners need a multi-tool strategy for full coverage. See [Module 08](MODULE-08-consumer-ai-comparison.md) for feature-by-feature comparison.

10. **Model selection is situational, not tribal.** No single provider dominates across all dimensions. The optimal strategy for most practitioners is to use 2-3 providers, routing tasks to the model best suited for each specific need.

---

## Cross-References

- [Module 00: Landscape Overview](MODULE-00-landscape-overview.md) -- Platform ecosystem context and market structure
- [Module 02: Context Engineering](MODULE-02-context-engineering.md) -- Deep dive into context windows, caching, and memory systems
- [Module 03: Single-Agent Systems](MODULE-03-single-agent-systems.md) -- How these models power agentic applications
- [Module 08: Consumer AI Comparison](MODULE-08-consumer-ai-comparison.md) -- Feature-by-feature platform comparison including pricing tiers
- [Module 09: Developer Platforms & APIs](MODULE-09-developer-platforms-apis.md) -- API architectures, SDKs, and developer economics

---

## Sources

| # | Source | Location/URL | Date |
|---|--------|-------------|------|
| F1 | Anthropic/Claude Ecosystem Profile | reference/profiles/anthropic-claude.md | 2026-03-18 |
| F2 | OpenAI/ChatGPT Ecosystem Profile | reference/profiles/openai-chatgpt.md | 2026-03-18 |
| F3 | Google/Gemini Ecosystem Profile | reference/profiles/google-gemini.md | 2026-03-18 |
| F4 | Microsoft/Copilot Ecosystem Profile | reference/profiles/microsoft-copilot.md | 2026-03-18 |
| F5 | Specialized Tools Profile | reference/profiles/specialized-tools.md | 2026-03-18 |
| W5 | Anthropic Fast Mode Documentation | https://platform.claude.com/docs/en/build-with-claude/fast-mode | 2026-03-20 |
| W6 | Chain-of-Thought Prompting on Reasoning Models (Wharton GAIL) | https://gail.wharton.upenn.edu/research-and-insights/tech-report-chain-of-thought/ | 2026-03-20 |
| W7 | Gemini 3 Deep Think Announcement (Google Blog) | https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-deep-think/ | 2026-03-20 |
| W8 | Introducing o3 and o4-mini (OpenAI) | https://openai.com/index/introducing-o3-and-o4-mini/ | 2026-03-20 |
