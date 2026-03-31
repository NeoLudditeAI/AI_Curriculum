# Part 3 Capstone Expert Answer: The Automation Build

**Scenario:** A five-developer team needs a multi-provider AI integration layer for their SaaS product. Requirements: automate internal workflows with skills and scheduled tasks, choose the right APIs for different workloads (real-time chat, batch document processing, code generation), optimize costs under a $2,000/month API budget, and build reusable automation that a single developer can maintain at 20% time.

---

## API Architecture Choices

The team's three workloads -- real-time chat, batch document processing, and code generation -- have fundamentally different requirements, and no single provider optimizes for all three.

**Real-time chat (customer-facing):** Anthropic Messages API. The explicit content-block architecture gives the team full control over the tool-use cycle -- critical when the chat agent needs to call internal APIs before responding. Server-sent events with typed events (`content_block_start`, `content_block_delta`, `content_block_stop`) enable granular UI rendering. The developer manages the agentic loop explicitly, which is more code than OpenAI's built-in loop but provides complete control over error handling and intermediate state. Use Sonnet 4.6 ($3/$15 per MTok) for most conversations; escalate to Opus 4.6 only for complex multi-step reasoning.

**Batch document processing (internal):** Google Gemini API. Batch processing at 50% discount with up to 24-hour latency, combined with Gemini's native multimodal input (text, image, audio, video in a single request), makes it the strongest choice for processing mixed-format documents. Gemini 2.5 Flash offers the best cost-per-token at $0.15/$0.60 per MTok with a 1M token context window. The generous free tier (rate-limited access, no credit card) covers prototyping. Context caching provides a 90% discount on cached input tokens, but unlike Anthropic's zero-storage-fee caching, Google charges $1.00-$4.50 per million tokens per hour for cache storage -- so only cache templates and system prompts that are accessed frequently enough to justify the storage cost.

**Code generation (developer tooling):** OpenAI Responses API with GPT-5.4. The built-in agentic loop means the API automatically executes code interpreter calls and continues without additional API requests -- reducing orchestration code for the code generation pipeline. Parallel function calling lets the model invoke linting, testing, and formatting tools simultaneously in a single response. The 50% prompt caching discount is automatic (no explicit `cache_control` markers like Anthropic's), simplifying implementation at the cost of less granular cache control.

## SDK Selection

**Primary language (Python):** All three providers have mature Python SDKs. Use `anthropic` (official), `openai` (official), and `google-genai` (official). All support async, streaming, and structured outputs. Pin SDK versions in `requirements.txt` to avoid breaking changes -- OpenAI's rapid API evolution (Chat Completions to Assistants to Responses in under two years) means major SDK updates can be disruptive.

**Secondary language (TypeScript for frontend):** Anthropic and OpenAI have official TypeScript SDKs. Google's TypeScript SDK is available via `@google/genai`. For the real-time chat frontend, Anthropic's TypeScript SDK with SSE streaming provides the tightest integration.

**Abstraction layer:** Do not use a multi-provider abstraction library (LiteLLM, etc.) for production. The APIs have meaningfully different architectures -- Anthropic's explicit content blocks vs. OpenAI's agentic loop vs. Gemini's multimodal-native input -- and abstraction layers hide the provider-specific optimizations that save money. Instead, build a thin routing layer that dispatches workloads to the appropriate provider's native SDK based on task type.

## Pricing Optimization

Under the $2,000/month budget, cost optimization is the largest engineering lever.

**Model tiering (60-90% savings):** Route simple classification and extraction tasks to the cheapest tier: Haiku 4.5 ($1/$5 per MTok) or Gemini 2.5 Flash ($0.15/$0.60 per MTok). Reserve Sonnet 4.6 and GPT-5.4 for tasks requiring nuanced generation. Never use Opus 4.6 ($15/$75 per MTok) for anything that Sonnet can handle -- a 5x cost difference for marginal quality improvement on routine tasks.

**Prompt caching:** Anthropic's three-tier caching is the most aggressive: 90% discount on cache reads, with cache write costs at 25% above standard input. For the chat workload, cache the system prompt and tool definitions in every request -- at 200+ conversations/day, this saves hundreds of dollars monthly. Google's caching saves 90% on reads but charges per-hour storage -- only cost-effective for content accessed multiple times per hour. OpenAI's 50% automatic caching requires no code changes but delivers smaller savings.

**Batch processing:** Use Anthropic's Batch API (`/v1/messages/batches`) and Google's batch endpoint for any workload that can tolerate 24-hour latency. Both offer 50% token discounts. The document processing pipeline should default to batch mode, with real-time fallback only for urgent documents.

**Structured outputs:** All three platforms support JSON schema enforcement. Anthropic uses `tool_use` blocks for structured extraction. OpenAI offers `response_format: { type: "json_schema" }` with strict schema guarantees (Pydantic/Zod integration). Gemini uses `response_mime_type` with JSON schema. Use structured outputs for all data extraction tasks -- they eliminate parsing failures and retry costs.

| Provider | Workload | Model | Monthly Est. |
|----------|----------|-------|-------------|
| Anthropic | Real-time chat (Sonnet 4.6, cached) | Sonnet 4.6 | ~$600 |
| Google | Batch docs (Flash, batch mode) | Gemini 2.5 Flash | ~$200 |
| OpenAI | Code gen (GPT-5.4, cached) | GPT-5.4 | ~$500 |
| Anthropic | Classification/routing (Haiku) | Haiku 4.5 | ~$100 |
| **Total** | | | **~$1,400** |

Budget headroom of ~$600/month allows for traffic spikes, experimentation with Opus for complex cases, and gradual feature expansion.

## Skills and Automation

**Claude Skills for workflow conventions:** Create project-level Claude Skills (`SKILL.md` files) that encode team standards. One skill for code review conventions (naming, testing requirements, PR structure). One skill for document processing rules (field extraction templates, validation criteria, output formats). Skills are markdown files -- version-controlled, auditable, zero infrastructure. When conventions change, update the skill file; every subsequent agent invocation inherits the new rules.

**Scheduled tasks via Cowork:** Configure two Cowork scheduled tasks for automated maintenance:

1. **Daily (8:00 AM):** Run batch document processing for overnight uploads. Query the document queue, dispatch to Gemini batch API, post results summary to Slack. Monitor for processing failures and flag any documents that exceeded the 24-hour batch window.
2. **Weekly (Friday 4:00 PM):** Generate API usage and cost report across all three providers. Compare actual spend against the $2,000 budget. Flag any workload where cost-per-task increased (model version change, cache miss spike, traffic growth). Post to the team's engineering channel.

Note: Cowork scheduled tasks lack retry mechanisms. For the daily batch job, build idempotent processing so a manual re-trigger after a transient API failure does not reprocess already-completed documents.

**Event-driven triggers:** Use Codex's event-driven task model for code generation workflows tied to GitHub events (PR opened, issue labeled). Power Automate can bridge non-API events (email receipt, SharePoint upload) into the document processing pipeline if the team uses Microsoft 365. As covered in Part 2, MCP servers (GitHub, Postgres, etc.) provide the integration layer that these automation workflows consume.

## Maintenance Model

At 20% time for one developer, the maintenance priorities are:

1. **Cost monitoring (weekly):** Review the automated Friday cost report. Investigate any provider where cost-per-task drifted upward. The most common causes: cache miss rates increasing (prompt or system message changed), model version auto-upgrade (OpenAI's default behavior), or traffic growth exceeding batch-mode capacity.
2. **SDK updates (monthly):** Check for breaking changes in all three provider SDKs. OpenAI's rapid API evolution is the highest risk -- the Assistants API deprecation (August 2025, sunsetting August 2026) demonstrates that entire API surfaces can be retired. Pin versions and test upgrades in staging.
3. **Skills updates (as needed):** When team conventions change, update the relevant skill file. This is a one-line PR, not an infrastructure change.
4. **Provider evaluation (quarterly):** Re-evaluate the provider-to-workload mapping. Pricing changes, new model releases, and capability additions (e.g., if Anthropic adds fine-tuning or Gemini improves code generation quality) may shift the optimal allocation.
