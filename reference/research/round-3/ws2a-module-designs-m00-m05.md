# WS2a: Module Designs — M00 through M05

**Workstream:** WS2a — Module-Level Pedagogical Design (Foundation + Core Agent Modules)
**Author:** Module Designer-A
**Date:** 2026-03-21
**Status:** Complete
**Depends on:** WS0 (Component Library), WS1 (Course Architecture), pedagogy-deep-research.md, all 6 module files

---

## Design Principles Applied Across All Six Modules

Before the per-module designs, several cross-cutting decisions:

1. **Spiral callbacks from WS1 are integrated** into the section annotations. Where WS1 specifies an explicit callback (e.g., "Module 02 should reference Module 01's model pricing tables"), the annotation includes it as part of the section's bridge text or concept-check question.

2. **Component density follows a rhythm:** concept-check quiz every ~800-1,000 words of prose, section-review quiz at each H2 boundary, one self-explanation prompt per module in the highest-complexity section, and the module-assessment quiz before Key Takeaways.

3. **Progressive disclosure targets the expertise-reversal effect.** Advanced-detail accordions are used for content that a daily AI user already knows (e.g., "What is a token?") but a less experienced reader in Ryan's circle may need. Critical-path content is never hidden.

4. **Worked-example faders progress across modules, not just within them.** M00 uses full worked examples. M02-M03 introduce partial/completion examples. M04-M05 shift toward guided and independent problems. This mirrors the 4C/ID fading trajectory across the Part 1 to Part 2 transition.

5. **Glossary tooltips** are not annotated per-section below; they are auto-detected at build time (first use per module). The designs below focus on pedagogical components that require intentional placement.

---

## Module 00: Landscape Overview

### Learning Outcomes

1. **Identify** the four major AI platform ecosystems and articulate each one's strategic center of gravity in one sentence.
2. **Compare** the four architectural approaches to AI coding tools (IDE-integrated, IDE-fork, terminal agent, cloud agent) and name a representative product for each.
3. **Evaluate** the tradeoffs between open-weight/self-hosted AI and closed platform APIs across at least four dimensions (cost, performance, privacy, maintenance).
4. **Analyze** the five key competitive battlegrounds shaping the AI landscape and explain why each matters for a practitioner.
5. **Identify** market structure data (valuations, revenue, user counts, market share) for the major players and explain what these numbers reveal about strategic positioning.

### Opening Hook

**Hook text (Merrill's problem-centered principle):**

> You have $500/month in AI budget and a team of five. You need a coding agent, a research assistant, a document automation system, and a way to connect them all. You could go all-in on one platform — or split across three. You could use a $20/month subscription — or self-host everything for the cost of electricity. By the end of this module, you will have the map you need to make this decision: who the players are, what they actually build, where the money flows, and which battles will determine the landscape you are building on.

### Prior Knowledge Activation

M00 is the entry point — no prerequisite modules. Instead, activate the learner's existing experience:

1. "Which AI tools do you use daily? List 3-5. As you read, locate each one in the landscape and note which ecosystem it belongs to." *(Activates existing schema; provides a personal anchor for the four-ecosystem framework.)*
2. "Have you ever switched from one AI tool to another? What drove the switch — capability, cost, or something else?" *(Primes the competitive battlegrounds section.)*
3. "Do you pay for any AI subscriptions? How much per month total?" *(Primes the pricing and market structure sections.)*

### Section-by-Section Annotations

#### H2: The Four Platform Ecosystems (~1,800 words, 4 H3 subsections + comparison table)

**After the Anthropic/Claude subsection (~paragraph 2, after "Strategic center of gravity"):**
- `concept-check quiz` (1 question): "Anthropic's Claude Code has reached over $2.5B ARR. What percentage of the enterprise coding agent market does it command?" Choices: 25%, 40%, 54%, 72%. Correct: 54%. Explanation: "This outsized market share — despite Claude's ~2% consumer web share — illustrates Anthropic's enterprise-first strategy." Complexity: recall.

**After the full four-ecosystem section (after Microsoft subsection, before the comparison table):**
- `self-explanation prompt`: "Before looking at the comparison table below, write one sentence describing each platform's unique strategic advantage — what they have that no competitor can easily replicate." Expert answer: "Anthropic: safety reputation and MCP origin. OpenAI: consumer scale (900M+ WAU) and creative tool breadth. Google: distribution surface (Android, Chrome, Workspace, Search). Microsoft: enterprise workflow integration (M365 installed base)."
- Reinforces: LO #1 (identify strategic centers of gravity). Complexity: application/synthesis.

**After the Platform Comparison at a Glance table:**
- `comparison-table enhancer`: Enable filter and sort. The table has 10 rows and 5 columns — ideal for the enhancer. Highlight capability: learner can filter to see only "Agentic Product" or "Coding Tool" rows for focused comparison.

#### H2: Specialized Tools (~450 words)

**After the full section (after volatility warning):**
- `concept-check quiz` (1 question): "Which specialized tool serves as a 'universal MCP bridge,' connecting Claude to 8,000+ apps?" Choices: Perplexity, Notion AI, Zapier, Make. Correct: Zapier. Explanation: "Zapier's MCP server is strategically significant because it extends Claude's reach to thousands of services that lack native MCP support — making it the bridge between the MCP ecosystem and legacy integrations." Complexity: recall with contextual framing.

#### H2: AI Coding Tools (~900 words, comparison table)

**After the four architectural types paragraph, before the comparison table:**
- `progressive-disclosure accordion` (variant: `worked-example`): "Worked Example: Choosing a Coding Tool." Full worked example walking through a decision: "A solo developer working on a large React codebase needs to refactor authentication across 40 files. They have a Claude Max subscription and a GitHub Copilot license. Which tool architecture is best suited?" Walk through: codebase size (favors 1M-token context), multi-file coordination (favors terminal agent), existing subscriptions (Claude Code included in Max). Conclusion: Claude Code's terminal agent approach. This is the FULL worked example; later modules will use partial/guided variants.

**After the Coding Tools Comparison table:**
- `comparison-table enhancer`: Filter and sort on Architecture, Users/Adoption, Price columns.
- `section-review quiz` (3 questions): (1) "Which coding tool architecture operates entirely in the command line?" [Terminal agent — Claude Code]. (2) "True or False: Antigravity (Google) is generally available as of March 2026." [False — it remains in Preview]. (3) "If you need async batch coding with no developer watching, which architecture is best suited?" [Cloud agent — Codex or Jules]. Complexity: recall + application.

#### H2: Open-Source and Self-Hosted AI (~1,200 words, comparison table)

**After the Open vs. Closed tradeoffs table:**
- `comparison-table enhancer`: Enable filter/sort. Seven dimension rows; learner can sort to prioritize dimensions most relevant to their situation.
- `concept-check quiz` (1 question): "An organization has strict data residency requirements — no data can leave their infrastructure. Which approach must they use?" Choices: Closed Platform API with enterprise controls, Open-weight self-hosted, Either with proper configuration, Neither meets this requirement. Correct: Open-weight self-hosted. Explanation: "Even with enterprise data processing agreements, closed platforms send data to provider infrastructure. Only self-hosted deployment guarantees data never leaves the organization's network." Complexity: application.

**After the OpenClaw subsection:**
- `progressive-disclosure accordion` (variant: `supplementary-reference`): "OpenClaw Security Context." Brief note: "OpenClaw's ClawHub skills registry has experienced serious security incidents, with 12-20% of skills estimated malicious. This is covered in depth in Module 05. For now, note the Docker deployment recommendation and Microsoft's advisory against running OpenClaw on standard workstations." *(Avoids duplicating M05 content while flagging the issue.)*

#### H2: Market Structure (~800 words, tables)

**After the "By the Numbers" table:**
- `concept-check quiz` (1 question): "The combined AI infrastructure capital expenditure of Microsoft, Meta, Alphabet, and Amazon in 2026 is approximately:" Choices: $100B, $300B, $610B, $1T. Correct: ~$610B. Explanation: "This extraordinary capital concentration — more than the GDP of most countries — creates barriers to entry that no startup can match on hardware alone." Complexity: recall with contextual significance.

**After the Enterprise Market Dynamics section:**
- `self-explanation prompt`: "Claude holds only ~2% of consumer web traffic but captures ~40% of enterprise LLM spend. Explain why these numbers are not contradictory." Expert answer: "Consumer web traffic share measures free/low-cost usage where ChatGPT's brand recognition and Gemini's Google distribution dominate. Enterprise LLM spend measures where organizations invest for production work, where Claude's reliability, safety posture, and code quality are valued more than brand. Different markets, different buying criteria, different metrics." Complexity: analysis.

#### H2: Key Battlegrounds (~700 words)

**After the full battlegrounds section:**
- `section-review quiz` (4 questions): (1) "Name the five key battlegrounds." [Agentic autonomy, integration standard, coding agent dominance, open vs. closed, enterprise governance]. (2) "Which protocol has emerged as the leading integration standard?" [MCP]. (3) "Which company's Agent 365 product is the first dedicated enterprise agent governance platform?" [Microsoft]. (4) "The AI coding tools market is estimated at what size in 2026?" [$12.8B]. Complexity: recall + identification.

#### H2: Key Takeaways (not annotated — this is the synthesis section)

No quiz here; the module-assessment quiz follows.

#### Module-Assessment Quiz (after Key Takeaways, before Cross-References)

`module-assessment quiz` (10 questions):
1. Match each platform to its strategic center of gravity: Anthropic, OpenAI, Google, Microsoft. [Enterprise autonomy, Consumer scale, Ubiquitous integration, Enterprise workflow]
2. What is OpenAI's approximate valuation as of March 2026? [$730B]
3. Which coding tool architecture does Claude Code use? [Terminal agent]
4. Name two cost reduction mechanisms available through Anthropic's API. [Prompt caching, Batch API]
5. What percentage of engineering teams use AI coding tools daily in 2026? [73%]
6. True or False: Microsoft trains its own frontier LLMs. [False — Microsoft operates a marketplace via Foundry]
7. What is the primary risk cited for OpenClaw's ClawHub registry? [12-20% malicious skill rate / security concerns]
8. Which company's consumer AI product has the fastest-growing web traffic share? [Google/Gemini — from 5.4% to 18.2%]
9. What is the approximate total AI market size in 2026? [$375-390B]
10. A hospital needs AI that processes patient data without any data leaving their network. Which approach is required? [Open-weight/self-hosted]

Feedback depth: Full — each question includes explanation, source reference, and "review this section" link.

### Closing Synthesis — Whole-Task Exercise

**Exercise: Platform Ecosystem Evaluation**

> You are advising a 50-person software consulting firm that currently uses ChatGPT Business ($30/user/month) for all AI needs. The CTO wants to evaluate whether they should stay single-platform or adopt a multi-platform strategy. The firm's priorities are: (1) coding productivity for their 30 developers, (2) document automation for their 10 project managers, (3) keeping total AI spend under $3,000/month.
>
> Using only the information from this module:
> - Identify which platforms and tools could serve each need.
> - Calculate approximate monthly costs for at least two strategies (single-platform vs. multi-platform).
> - Name the top three tradeoffs the CTO should weigh.
> - Identify which of the five battlegrounds most directly affects this firm's decision.
>
> **Connection forward:** Module 01 will give you the model-level data to refine these cost estimates. Module 03 will show you what these coding agents can actually do. Module 08 will give you the definitive feature-by-feature comparison.

### Estimated Completion Time

| Segment | Activity | Time |
|---------|----------|------|
| Opening + Prior Knowledge Activation | Read hook, answer warm-up questions | 3 min |
| Four Platform Ecosystems | Read + concept check + self-explanation | 12 min |
| Specialized Tools | Read + concept check | 4 min |
| AI Coding Tools | Read + worked example + section review quiz | 10 min |
| Open-Source & Self-Hosted | Read + concept check + accordion | 8 min |
| Market Structure + Battlegrounds | Read + concept check + self-explanation + section review | 10 min |
| Key Takeaways + Module Assessment | Read + 10-question quiz | 8 min |
| Closing Synthesis Exercise | Whole-task problem | 10 min |
| **Total** | | **~65 min** |

**Natural pause points:** After "Four Platform Ecosystems" (25 min mark), after "AI Coding Tools" (39 min mark), after module-assessment quiz (55 min mark — exercise can be deferred).

---

## Module 01: Models & Intelligence Tiers

### Learning Outcomes

1. **Identify** the current production models from all four major providers and their key specifications (context window, pricing, release date).
2. **Compare** the three reasoning paradigms (Anthropic extended thinking, OpenAI o-series, Google Deep Think) on architecture, visibility, pricing, and best use cases.
3. **Evaluate** multimodal capabilities across providers, identifying where each platform leads and where gaps exist.
4. **Apply** the model selection framework to choose appropriate models for at least five common task categories.
5. **Analyze** cost optimization strategies (caching, batching, model tiering) and calculate their impact on a concrete workload.

### Opening Hook

**Hook text:**

> Your company runs 10,000 AI API calls per day. Last month's bill was $45,000. Your CTO asks: "Can we cut this by 80% without losing quality?" The answer is almost certainly yes — but it requires understanding which of the 30+ models across four providers is right for which task, how reasoning modes actually work (and when they waste money), and where caching and batching can slash costs by an order of magnitude. This module gives you the data to answer that question.

### Prior Knowledge Activation

Prerequisites: M00 (The Four Platform Ecosystems).

1. "From Module 00, recall the four platform ecosystems. Which company is a 'marketplace, not a model maker'?" *(Answer: Microsoft. Activates the Foundry concept.)*
2. "Module 00 introduced context windows converging at 1M tokens as a structural trend. Can you name at least two providers that offer 1M-token context?" *(Answer: Anthropic, OpenAI, Google. Primes the convergence discussion.)*
3. "What did Module 00 say about OpenAI's model churn and its effect on consumers?" *(Answer: upgrade fatigue, 1.5M subscription cancellations. Primes the volatility warning.)*

### Section-by-Section Annotations

#### H2: The Model Landscape in March 2026 (~400 words)

**After the three structural trends list:**
- `concept-check quiz` (1 question): "Which of the following is NOT one of the three structural trends defining the current model landscape?" Choices: Context windows converged at 1M tokens, Reasoning modes are standard, Open-source models dominate enterprise, Cost floor keeps dropping. Correct: Open-source models dominate enterprise. Explanation: "While open-weight models have reached production quality (Module 00), the three defining trends are context convergence, reasoning standardization, and plummeting costs." Complexity: recall/distinguish.

#### H2: Anthropic — The Claude Model Family (~900 words, tables)

**After the Current Production Models table:**
- `comparison-table enhancer`: Sort by Input $/MTok, Output $/MTok, Context Window.
- `concept-check quiz` (1 question): "Anthropic offers three prompt cache durations. What are they?" Choices: [1-minute, 5-minute, 10-minute], [5-minute, 1-hour, persistent], [1-hour, 24-hour, permanent], [automatic only]. Correct: 5-minute, 1-hour, persistent. Explanation: "The three tiers let developers match caching strategy to usage patterns. This will become critical in Module 02's cost optimization discussion." Complexity: recall.

#### H2: OpenAI — The GPT and o-Series Families (~1,200 words, multiple tables)

**After the o-Series reasoning models table:**
- `progressive-disclosure accordion` (variant: `advanced-detail`): "Understanding o-series vs. GPT Architecture." Content: "The o-series models are NOT GPT variants. They are architecturally distinct, trained with reinforcement learning specifically for multi-step reasoning. GPT-5.4 Thinking is a hybrid — a GPT-family model with reasoning capabilities, not an o-series model. This distinction matters for pricing, capability expectations, and API endpoint selection."

**After the Retired Models note:**
- `concept-check quiz` (1 question): "GPT-4o was retired on what date?" Choices: January 2026, February 13, 2026, March 5, 2026, Still available. Correct: February 13, 2026. Explanation: "OpenAI's aggressive deprecation means integrations built on specific models may require migration within 3-6 months. This is a real operational risk, not just trivia." Complexity: recall with operational framing.

#### H2: Google — The Gemini and Gemma Families (~800 words, tables)

**After the Gemini Nano subsection:**
- `concept-check quiz` (1 question): "Which major provider is the only one with models designed for on-device inference with no server connection?" Choices: Anthropic, OpenAI, Google, Microsoft. Correct: Google (Gemini Nano). Explanation: "Gemini Nano powers Android features entirely locally — no data leaves the device. This is a unique strategic asset with privacy and latency implications explored in Module 10." Complexity: recall + forward connection.

#### H2: Microsoft — The Model Marketplace (~500 words)

**After the Work IQ paragraph:**
- `self-explanation prompt`: "Microsoft does not train frontier LLMs but operates a marketplace of 11,000+ models. Explain the strategic advantage and disadvantage of this approach compared to training your own models." Expert answer: "Advantage: Model-agnostic flexibility — enterprises can switch between providers (OpenAI, Anthropic, Meta, Mistral) without platform migration, and Microsoft bears no model training cost. Disadvantage: Dependency on external providers for frontier capability — if OpenAI or Anthropic restricts access or raises prices, Microsoft's offering degrades. Microsoft mitigates this with its own Phi models for edge use cases, but these are not frontier-competitive." Complexity: analysis/evaluation.

#### H2: Reasoning Modes Compared (~1,400 words, comparison table)

This is the module's highest-complexity section and deserves the densest annotation.

**Before the section (concept-check gate):**
- `concept-check gate`: "Before You Continue — The next section compares three reasoning paradigms. Ensure you understand: (1) What 'extended thinking' means at a high level [Review: Anthropic subsection above]. (2) That o-series models are architecturally separate from GPT models [Review: OpenAI subsection above]. (3) What Gemini Deep Think is [Review: Google subsection above]."

**After the CoT Anti-Pattern subsection:**
- `concept-check quiz` (1 question): "A developer adds 'think step by step' to a prompt sent to an o3 model. What is the likely result?" Choices: Significant quality improvement, 20-80% more latency for ~3% improvement, Error — o-series does not accept text prompts, No effect. Correct: 20-80% more latency for ~3% improvement. Explanation: "The Wharton GAIL lab found that layering CoT prompting on models that already reason internally is redundant and wasteful. This is a common and expensive anti-pattern." Complexity: application.

**After the Reasoning Modes Summary table:**
- `comparison-table enhancer`: Filter/sort on all columns. This is a 7-row, 4-column table that benefits from highlighting.
- `section-review quiz` (4 questions): (1) "Which reasoning approach uses architecturally separate, RL-trained models?" [OpenAI o-series]. (2) "Which provider makes thinking tokens visible to the user?" [Anthropic — thinking block is visible]. (3) "Gemini 3 Deep Think is currently available to which subscription tier?" [AI Ultra — $249.99/month]. (4) "True or False: You should add 'think step by step' to prompts sent to models with built-in reasoning modes." [False — this is the CoT anti-pattern]. Complexity: recall + application.

#### H2: Multimodal Capabilities (~800 words, tables)

**After the Multimodal Gap Analysis:**
- `concept-check quiz` (1 question): "Which platform has the broadest multimodal OUTPUT capabilities (image + video + music + voice generation in one ecosystem)?" Choices: Anthropic/Claude, OpenAI/ChatGPT, Google/Gemini, Microsoft/Copilot. Correct: Google/Gemini. Explanation: "Google is the only platform with native image generation (Imagen 4), video generation (Veo 3.1), music generation (MusicFX), and multi-speaker TTS — all in one ecosystem via Flow." Complexity: recall/comparison.

#### H2: Head-to-Head Model Comparison (~500 words, tables)

**After both comparison tables (Flagship and Budget):**
- `comparison-table enhancer` on both tables.
- `section-review quiz` (3 questions): (1) "Which flagship model has the cheapest input pricing?" [GPT-5.4 at ~$2.50/MTok]. (2) "Which budget model is a legacy model at risk of deprecation?" [GPT-4o Mini]. (3) "If you need image input AND the cheapest possible budget model, which current-generation model fits?" [GPT-5.4 Nano at $0.20/MTok — though check its image input capability]. Complexity: analysis/application.

#### H2: Model Selection Framework (~800 words, tables)

**After the "By Task Type" table:**
- `worked-example fader` (stage: `full`): "Worked Example: Model Selection for a Customer Support Pipeline." Scenario: A SaaS company handles 5,000 customer queries per day. Each query needs: (1) intent classification, (2) knowledge base retrieval, (3) response generation, (4) quality check. Walk through model selection for each step: classification = GPT-5.4 Nano ($0.20/MTok), retrieval = N/A (vector search), generation = Sonnet 4.6 ($3/$15), quality check = Haiku 4.5 ($1/$5). Calculate daily cost vs. using Opus for everything. Show 85% cost reduction.

**After the "By Cost Sensitivity" table:**
- `comparison-table enhancer`: Filter/sort. Enable highlight rows by provider for focused comparison.

#### Module-Assessment Quiz (after Key Takeaways)

`module-assessment quiz` (10 questions):
1. What is the maximum context window for Claude Opus 4.6? [1M tokens]
2. Name the three prompt cache durations Anthropic offers. [5-minute, 1-hour, persistent]
3. How does Google's Deep Think architecturally differ from Anthropic's extended thinking? [Parallel hypothesis evaluation vs. serial chain-of-thought]
4. Which provider offers the only free API tier? [Google — rate-limited, data may be used for training]
5. What is the cheapest current-generation model across all providers? [Gemini 2.5 Flash-Lite at $0.10/$0.40/MTok]
6. An application sends a 50K-token system prompt 500 times per day with Sonnet 4.6. Approximately how much does prompt caching save daily? [~$67.50/day — from $78 to $10.50]
7. Which provider does NOT offer a native embeddings API? [Anthropic]
8. What benchmark score does Opus 4.6 achieve on SWE-bench Verified? [80.8%]
9. True or False: GPT-5.4 Thinking is an o-series model. [False — it is a GPT-family model with reasoning capabilities]
10. A task requires processing live video input with reasoning. Which model(s) best fit? [Gemini 3 Flash or GPT-5.4 — both support video input]

### Closing Synthesis — Whole-Task Exercise

**Exercise: Model Budget Optimization**

> You manage AI infrastructure for a startup. Current setup: all API calls go to Claude Opus 4.6. Monthly bill: $12,000 (60% input tokens, 40% output tokens). The CEO wants to cut costs to $3,000/month without degrading quality on the tasks that matter most.
>
> Your workload breakdown:
> - 40% of calls: customer query classification (simple routing)
> - 25% of calls: document summarization (moderate complexity)
> - 20% of calls: code review (high complexity, quality-critical)
> - 15% of calls: data extraction from forms (low complexity, high volume)
>
> Design a model allocation strategy using models from ANY provider. For each workload segment: specify the model, calculate the cost reduction, and justify why quality will hold. Then calculate prompt caching savings assuming the system prompt (20K tokens) is identical across all calls.
>
> **Connection forward:** Module 02 will deepen your understanding of how caching, RAG, and context engineering further reduce these costs. Module 04 will show how multi-agent systems apply exactly this kind of role-based model allocation.

### Estimated Completion Time

| Segment | Activity | Time |
|---------|----------|------|
| Opening + Prior Knowledge Activation | Read hook, answer warm-up questions | 3 min |
| Model Landscape + Anthropic + OpenAI | Read + concept checks + accordion | 12 min |
| Google + Microsoft | Read + concept checks + self-explanation | 8 min |
| Reasoning Modes | Gate + read + concept check + section review | 12 min |
| Multimodal + Head-to-Head | Read + concept checks + section review | 8 min |
| Model Selection Framework | Read + worked example + table enhancer | 8 min |
| Key Takeaways + Module Assessment | Read + 10-question quiz | 8 min |
| Closing Synthesis Exercise | Whole-task problem | 12 min |
| **Total** | | **~71 min** |

**Natural pause points:** After "Google + Microsoft" (23 min mark — end of provider survey), after "Reasoning Modes" (35 min mark — good conceptual break), after module-assessment quiz (59 min mark — exercise can be deferred).

---

## Module 02: Context Engineering

### Learning Outcomes

1. **Explain** why context window size, while converging at 1M tokens, does not determine effective usable context, and identify the practical operating range.
2. **Compare** prompt caching implementations across Anthropic, OpenAI, and Google on discount depth, cache durations, and developer control.
3. **Evaluate** the four major memory architectures (Claude Memory, ChatGPT Saved Memories, Gemini Personal Intelligence, Microsoft Recall) and recommend the best fit for a given use case.
4. **Design** a RAG pipeline by selecting appropriate architectural pattern, vector database, chunking strategy, and embedding model for a specified knowledge base.
5. **Apply** context engineering principles to structure a context window with appropriate layers (identity, knowledge, memory, task, conversation) and design for compaction resilience.

### Opening Hook

**Hook text:**

> A developer loads 800,000 tokens into Claude's context window — their entire codebase — and asks it to find a specific bug. The model misses it. They load the same codebase but strategically select only the 50,000 most relevant tokens using a RAG pipeline. The model finds the bug instantly — at 1/16th the cost. The difference is not the model. The model is the same. The difference is context engineering: the discipline of curating what enters the context window, and it is the single highest-leverage skill in AI today.

### Prior Knowledge Activation

Prerequisites: M00 (platform ecosystems), M01 (model pricing, context windows, model tiers).

1. "From Module 01, what is the per-token input cost for Claude Opus 4.6? For GPT-5.4 Nano?" *(Answer: $5/MTok and $0.20/MTok. Primes the token economics section — every token has a dollar cost.)*
2. "Module 01 listed three prompt cache durations for Anthropic. Can you recall them?" *(Answer: 5-minute, 1-hour, persistent. Spaced retrieval from M01; primes the caching deep-dive.)*
3. "Module 00 introduced the concept of 'open vs. closed' tradeoffs. One dimension was 'privacy.' How does data residency relate to where your context is processed?" *(Primes the memory systems and RAG sections where data location matters.)*

### Section-by-Section Annotations

#### H2: Context Windows — Sizes, Pricing, and Practical Limits (~1,800 words)

**After "The 1M-Token Convergence" subsection (after the provider table):**
- `concept-check quiz` (1 question): "Which provider was the first to remove long-context surcharges on their flagship models?" Choices: Anthropic, OpenAI, Google, Microsoft. Correct: Anthropic (March 14, 2026). Explanation: "Anthropic removed surcharges on March 14, 2026, making 1M-token context available at standard per-token rates. This competitive move was quickly matched by others." Complexity: recall with timeline significance.

**After "What a Million Tokens Actually Buys" (after the content-type table):**
- `self-explanation prompt`: "Before reading about performance degradation, explain why a 1M-token window does NOT mean you should always use 1M tokens. Consider both cost and quality." Expert answer: "Two reasons: (1) Cost scales with input tokens — sending 500K tokens of context at Opus 4.6 pricing costs $2.50 per request before any output. At 100 requests/day, that is $250/day in input costs alone. (2) Performance degrades non-linearly — models attend more weakly to content in the middle of large contexts (lost-in-the-middle effect), and accuracy drops once context is 40-60% full. The effective window is smaller than the advertised window." Complexity: analysis. *(Spiral callback: M01 model pricing data applied to context costs.)*

**After "Performance Degradation" subsection (after the practical guidance box):**
- `concept-check quiz` (1 question): "At what percentage of context window capacity do most models begin showing measurable accuracy loss for precision tasks?" Choices: 20-30%, 40-60%, 70-80%, 90-95%. Correct: 40-60%. Explanation: "This is why the practical guidance recommends treating 60-70% as the reliable operating range. The advertised window is a ceiling, not a target." Complexity: recall with practical implication.

**After "Token Economics" subsection:**
- `section-review quiz` (4 questions): (1) "How many English words does 1M tokens approximately represent?" [~750,000]. (2) "Non-English text consumes how many times more tokens?" [2-3x]. (3) "At Opus 4.6 pricing, what is the input cost per request for 500K tokens of context?" [$2.50]. (4) "Name the three optimization strategies driven by token economics." [Prompt caching, RAG, compaction]. Complexity: recall + calculation.

#### H2: Prompt Caching (~1,000 words, tables)

**After the Implementation Across Providers table:**
- `comparison-table enhancer`: Filter/sort. Three providers, 7 dimensions — ideal for provider-focused filtering.

**After the Cost Impact Example table:**
- `worked-example fader` (stage: `full`): "Worked Example: Calculating Cache ROI." Walk through: Application sends 50K-token system prompt + 2K-token user message using Sonnet 4.6, 500 requests/day. Step 1: Calculate no-cache daily cost ($78). Step 2: Calculate with caching at 90% hit rate ($10.50). Step 3: Calculate first-day cache write cost (25% premium on first 50K tokens). Step 4: Calculate break-even point (first day). Step 5: Add batch API for non-real-time requests (additional 50% savings). Final: Combined caching + batching saves 93%.

**After the Batch API subsection:**
- `concept-check quiz` (1 question): "An application has a stable 50K-token system prompt and needs real-time responses. Combining prompt caching (90% hit rate) with batching for background jobs, approximately what cost reduction is achievable?" Choices: 50%, 75%, 90-95%, 99%. Correct: 90-95%. Explanation: "Caching alone saves ~86% on the system prompt. Adding batch processing for non-real-time workloads (50% discount) compounds the savings. Together they reduce costs by 90-95% compared to naive real-time usage." Complexity: synthesis/calculation.

#### H2: Memory Systems (~1,400 words, comparison table)

**Before the section (concept-check gate):**
- `concept-check gate`: "Before You Continue — This section compares four fundamentally different memory architectures. Ensure you understand: (1) The difference between conversation context and persistent memory. (2) That each platform has different privacy models for stored data. Review: Module 01's discussion of free-tier data training policies if needed."

**After the Claude Memory subsection:**
- `concept-check quiz` (1 question): "How often does Claude Memory process conversations to extract facts?" Choices: Real-time, Every hour, Approximately every 24 hours, Weekly. Correct: Approximately every 24 hours. Explanation: "This asynchronous processing means corrections or new context may not appear in memory until the next cycle. This is a practical limitation that affects workflow design." Complexity: recall with practical implication.

**After the full Comparison Table:**
- `comparison-table enhancer`: Filter/sort.
- `section-review quiz` (4 questions): (1) "Which memory system can draw context from Gmail, Calendar, and Drive?" [Gemini Personal Intelligence]. (2) "Microsoft Recall captures what type of data?" [Screen snapshots — not conversation data]. (3) "Which platform's memory system is the most controversial from a privacy perspective?" [Microsoft Recall — privacy backlash]. (4) "True or False: ChatGPT's memory system only remembers explicitly saved items." [False — Chat History Reference also recalls past conversations]. Complexity: recall/comparison.

#### H2: RAG — Retrieval-Augmented Generation (~2,800 words — longest section)

This is the module's most complex section and the primary site for scaffolded depth.

**After "How RAG Works" (three-stage pipeline):**
- `concept-check quiz` (1 question): "In the RAG pipeline, which stage converts user queries into vector embeddings for comparison against indexed chunks?" Choices: Indexing, Retrieval, Generation. Correct: Retrieval. Explanation: "Indexing creates chunk embeddings offline. Retrieval converts the runtime query to an embedding and finds similar chunks. Generation uses the retrieved chunks as context." Complexity: recall/sequence.

**After "Architectural Patterns" (Naive, Advanced, Modular):**
- `progressive-disclosure accordion` (variant: `advanced-detail`): "Deep Dive: Advanced RAG Techniques." Content: Expand on query rewriting, HyDE (hypothetical document embeddings), re-ranking with cross-encoders, and iterative retrieval. These are important for production RAG but may overwhelm a reader seeing RAG for the first time.

**After "RAG vs. Large Context Windows" table:**
- `self-explanation prompt`: "Your knowledge base is 300,000 tokens and receives 50 queries per day. Should you use RAG or direct context injection with caching? Explain your reasoning before checking the expert answer." Expert answer: "At 300K tokens, the knowledge base fits within 30-40% of the 1M-token context window — the practical guidance's recommended zone. With only 50 queries/day, the volume does not justify RAG infrastructure complexity. Use direct context injection with prompt caching: the 300K token knowledge base is cached at 90% discount (Anthropic), reducing the per-query input cost from ~$0.90 to ~$0.12 (Sonnet 4.6). RAG setup cost (vector DB, embedding pipeline, retrieval tuning) is not justified at this scale." Complexity: application/evaluation. *(This directly applies the module's decision framework.)*

**After the Vector Database Options table:**
- `comparison-table enhancer`: Filter/sort on Deployment Model, Hybrid Search, Pricing Model.
- `progressive-disclosure accordion` (variant: `supplementary-reference`): "Emerging Vector Database Landscape." Note about AlloyDB AI, Azure AI Search, Turbopuffer, LanceDB — rapidly consolidating market per the volatility warning.

**After the Chunking Strategies table:**
- `comparison-table enhancer`: Filter/sort.
- `concept-check quiz` (1 question): "A production RAG system indexes technical documentation with code blocks, tables, and headers. Which chunking strategy best preserves structural context?" Choices: Fixed-size, Semantic, Recursive, Document-aware. Correct: Document-aware. Explanation: "Document-aware chunking respects structural elements — code blocks, tables, and headers stay intact. Fixed-size chunking would split a code block in the middle; semantic chunking may produce variable-sized chunks. Document-aware requires format-specific parsers but preserves the structural context that aids retrieval quality." Complexity: application.

**After "When to Use RAG: Decision Framework" table:**
- `section-review quiz` (5 questions): (1) "At approximately what knowledge base size does RAG become the recommended approach over direct context injection?" [500K+ tokens]. (2) "Name two RAG failure modes." [Any two of: retrieval misses, irrelevant retrieval, chunk boundary splits, hallucination over retrieved content, stale index]. (3) "What is the standard token overlap between adjacent chunks?" [10-20%]. (4) "Which Anthropic product is the embedding provider of choice for Anthropic-centric architectures?" [Trick question — Anthropic does NOT offer a native embeddings API; third-party providers like OpenAI or Cohere are used]. (5) "What is 'agentic RAG'?" [The model decides what to search, evaluates results, and may issue refined follow-up queries — giving the model agency over retrieval]. Complexity: recall + application.

#### H2: Compaction (~800 words, table)

**After the "What Survives Compaction" table:**
- `concept-check quiz` (1 question): "System prompts and instructions survive compaction. Specific numbers, dates, and URLs from early conversation turns typically:" Choices: Always survive, Sometimes survive in summaries, Are reliably preserved, Are often lost. Correct: Are often lost. Explanation: "Compaction summaries rarely preserve exact values. This is why the module advises: 'If a fact, decision, or intermediate result matters beyond the current exchange, persist it to an external store.'" Complexity: recall with design implication.

#### H2: Context Engineering as a Discipline (~1,400 words)

**After "The Core Principles" (five principles):**
- `self-explanation prompt`: "Context has five layers: Identity, Knowledge, Memory, Task, Conversation. For a customer support chatbot, give one concrete example of content in each layer." Expert answer: "Identity: 'You are a support agent for Acme Corp. Use these guidelines...' Knowledge: Product documentation loaded via RAG or caching. Memory: 'This customer prefers detailed technical explanations; has a Pro plan.' Task: 'Resolve the customer's billing discrepancy for invoice #4521.' Conversation: The last 10 messages exchanged with the customer." Complexity: application/synthesis.

**After the Claude Code case study:**
- `concept-check quiz` (1 question): "Which Claude Code feature implements the 'Identity layer' of context engineering — persistent project instructions that survive compaction?" Choices: Session Memory, CLAUDE.md files, Progressive disclosure, Auto-compaction. Correct: CLAUDE.md files. Explanation: "CLAUDE.md files are loaded from disk into every session, forming the identity layer. They survive compaction because they are read from disk, not from conversation history." Complexity: application.

**After "The Cost Optimization Stack":**
- `section-review quiz` (3 questions): (1) "Rank the cost optimization stack from highest to lowest impact." [Model selection > prompt caching > RAG/selective retrieval > batch processing > prompt optimization]. (2) "Context engineering and cost optimization are described as what relationship?" [The same discipline — every token costs money and model attention]. (3) "What does 'minimum sufficient context' mean?" [The smallest amount of context that enables the model to complete the task at the required quality — both cheapest and highest-quality]. Complexity: synthesis.

#### Module-Assessment Quiz (after Key Takeaways)

`module-assessment quiz` (12 questions — higher count due to module depth):
1. What is the practical reliable operating range for precision tasks in a 1M-token context window? [60-70%]
2. Calculate: Anthropic prompt cache hit discount is 90%. OpenAI's is ___? [50%]
3. Name the three Anthropic cache durations. [5-minute, 1-hour, persistent]
4. Which memory system processes conversations asynchronously with ~24-hour delay? [Claude Memory]
5. A 200K-token knowledge base queried 500 times daily — which approach is cheaper: context injection with caching, or RAG? [Context injection with caching — $33/day vs. $8.50/day for RAG, but RAG has significant setup cost]
6. What chunking strategy is the most common production choice for general-purpose RAG? [Recursive]
7. True or False: Anthropic offers a native embeddings API. [False]
8. What is the "lost-in-the-middle" effect? [Models attend more strongly to the beginning and end of context, with weaker recall for content in the middle third]
9. Name two content types that survive compaction. [System prompts/instructions, user preferences in external memory]
10. In context engineering, what is the "Identity" layer? [System prompt, persona, rules — permanent, survives compaction]
11. What is agentic RAG? [Model has agency over the retrieval process — decides what to search, evaluates results, issues follow-up queries]
12. The full cost optimization stack applied together can reduce API costs by approximately: [95% or more compared to naive implementation]

### Closing Synthesis — Whole-Task Exercise

**Exercise: Context Architecture Design**

> Design the complete context engineering architecture for the following system:
>
> **System:** An AI-powered legal document review assistant for a 200-lawyer firm.
> **Knowledge base:** 2 million tokens of case law, firm policies, and contract templates. Updated weekly.
> **Query volume:** 800 queries per day, mostly during business hours.
> **Requirements:** High accuracy (legal liability), citations required, data cannot leave firm infrastructure, must handle both simple lookups ("what is our standard NDA clause?") and complex analysis ("compare these two contract sections for conflicting obligations").
>
> For your design, specify:
> 1. RAG vs. context injection decision (with justification).
> 2. Vector database choice (with rationale).
> 3. Chunking strategy.
> 4. Memory system design (what should persist across sessions?).
> 5. Compaction strategy for long review sessions.
> 6. Cost estimate (model selection, caching, batching).
> 7. What goes in each context layer (identity, knowledge, memory, task, conversation)?
>
> **Connection forward:** Module 03 will show how agents automate multi-step workflows that this architecture supports. Module 09 will provide the API-level implementation details for caching and batching.

### Estimated Completion Time

| Segment | Activity | Time |
|---------|----------|------|
| Opening + Prior Knowledge Activation | Read hook, answer warm-up questions | 4 min |
| Context Windows | Read + concept checks + self-explanation + section review | 14 min |
| Prompt Caching | Read + worked example + concept check | 8 min |
| Memory Systems | Gate + read + concept check + section review | 10 min |
| RAG (full section) | Read + concept checks + accordions + self-explanation + section review | 20 min |
| Compaction | Read + concept check | 5 min |
| Context Engineering as Discipline | Read + self-explanation + concept check + section review | 10 min |
| Key Takeaways + Module Assessment | Read + 12-question quiz | 10 min |
| Closing Synthesis Exercise | Whole-task problem | 15 min |
| **Total** | | **~96 min** |

**Natural pause points:** After "Prompt Caching" (26 min mark — strong conceptual break), after "Memory Systems" (36 min mark), after RAG section (56 min mark — recommended break before shifting to compaction/principles), after module-assessment quiz (81 min mark — exercise can be deferred).

**Note:** This is the longest module (~5,800 words of source content). WS1 estimated 40-45 min for reading alone; with activities, 96 min is realistic. Recommend splitting into two sessions for most learners: Session A (context windows + caching + memory = ~36 min), Session B (RAG + compaction + discipline + assessment = ~60 min).

---

## Module 03: Single-Agent Systems

### Learning Outcomes

1. **Explain** the gather-act-verify loop and why the verification step is architecturally non-negotiable.
2. **Compare** the single-agent products across all four platforms (Claude Code, Cowork, ChatGPT Agent, Codex, Jules, etc.) on at least five dimensions.
3. **Evaluate** sandboxing strategies (Docker, gVisor, Firecracker MicroVM) by security strength, performance overhead, and appropriate use cases.
4. **Analyze** agent failure modes (hallucination cascades, context exhaustion, resource exhaustion, silent failures) and design mitigations for each.
5. **Design** a layered safety model for an agent deployment, combining HITL, RBAC, default-deny, and guardrails.

### Opening Hook

**Hook text:**

> On a Friday at 4pm, a developer points Claude Code at a 300-file codebase and says: "Refactor the authentication system to use JWT tokens instead of session cookies." The agent reads the codebase, identifies 47 files that need changes, edits them in coordinated sequence, runs the test suite, fixes the 3 tests it broke, and pushes a clean PR — in 22 minutes. The developer reviews the diff over coffee. This is the reality of single-agent systems in March 2026. But here is the question this module answers: how does it actually work? What happens when the agent hallucinates a file path? What stops it from deleting your database? And why does verification — not generation — determine whether agents succeed or fail?

### Prior Knowledge Activation

Prerequisites: M00 (platform ecosystems, coding tools), M01 (model selection, reasoning modes).

1. "Module 01 introduced model selection as 'the single most consequential decision a practitioner makes daily.' In the context of agents, why might model selection matter even more?" *(Primes: agents make hundreds of model calls per task; cost and capability compound.)*
2. "Module 00 identified four architectural approaches to AI coding tools. Can you recall all four?" *(Answer: IDE-integrated, IDE-fork, terminal agent, cloud agent. This module deep-dives into the terminal and cloud agent approaches.)*
3. "Module 01 described Anthropic's extended thinking as 'logarithmic improvement — doubling compute produces diminishing but measurable gains.' How might this affect an agent's planning step?" *(Primes the planning strategies section — reasoning modes power the plan step.)*

### Section-by-Section Annotations

#### H2: How Agents Work — The Core Architecture (~1,100 words)

**After the five-step Gather-Act-Verify Loop description:**
- `concept-check quiz` (1 question): "In the gather-act-verify loop, what happens if the verification step is removed?" Choices: The agent works faster with no quality loss, The agent produces results but cannot detect its own errors, The agent cannot execute tools, Nothing — verification is optional. Correct: The agent produces results but cannot detect its own errors. Explanation: "Verification catches hallucinated file paths, broken imports, failed tests, and logical errors. Without it, the agent is a 'code generator' not an 'agentic loop.' This is why the module states verification is architecturally non-negotiable." Complexity: comprehension/analysis.

**After the LATS planning strategy:**
- `progressive-disclosure accordion` (variant: `advanced-detail`): "LATS: Language Agent Tree Search in Depth." Content: Monte Carlo evaluation mechanics, the 22.1 percentage point improvement over basic ReAct on HumanEval, why it is computationally expensive, and how it relates to o-series reasoning. *(Advanced because most learners will not need LATS details for practical work.)*

**After the Tool Use subsection (function calling vs. MCP):**
- `concept-check quiz` (1 question): "What is the key difference between function calling and MCP for agent tool use?" Choices: MCP is faster, Function calling supports more tools, MCP externalizes tool definitions into standalone servers discoverable by any MCP-compatible client, There is no practical difference. Correct: MCP externalizes tool definitions into standalone servers. Explanation: "Function calling is for a single agent with a handful of known tools. MCP is for agents that connect to arbitrary external services at runtime. The MCP ecosystem includes 19,700+ servers." Complexity: comprehension/distinction. *(Spiral callback: MCP introduced in M00, deepened here, primary treatment in M06.)*

#### H2: The Agents — Platform by Platform (~2,200 words, 9 agent descriptions)

**After Claude Code description (~paragraph 4, after benchmarks):**
- `concept-check quiz` (1 question): "Claude Code's sandboxing achieved what metric improvement in permission prompts?" Choices: 50% reduction, 74% reduction, 84% reduction, 95% reduction. Correct: 84% reduction. Explanation: "This means the agent can operate more autonomously within its permitted boundaries — the sandbox is tight enough for security but loose enough for productivity." Complexity: recall with design significance.

**After the full agent comparison table:**
- `comparison-table enhancer`: Filter/sort. 10 agents, 8 columns — significant enough for filtering to add real value. Learners can filter by "GA" status, by "MCP Support: Yes," or by domain.
- `section-review quiz` (4 questions): (1) "Which is the only desktop automation agent combining local file access, computer use, MCP, and scheduling?" [Cowork]. (2) "Codex's cloud sandbox has a distinctive security feature — what is it?" [Air-gapped — no internet access]. (3) "Which Google agent takes a GitHub-native, asynchronous, batch-oriented approach?" [Jules]. (4) "True or False: ChatGPT Agent supports MCP." [False]. Complexity: recall/comparison.

#### H2: Sandboxing and Isolation (~800 words)

**After the three isolation strategies (Docker, gVisor, Firecracker):**
- `worked-example fader` (stage: `partial` — completion problem): "Completion Problem: Choosing a Sandboxing Strategy." Scenario: "Your team is building a coding agent that will execute user-submitted code. The code may install packages from npm. You need to balance security with the agent's ability to function. Step 1: Identify the threat model — untrusted code execution with network access needs. Step 2: [BLANK — Fill in: Why is Docker alone insufficient?]. Step 3: Evaluate gVisor vs. Firecracker for this use case. Step 4: [BLANK — Fill in: Which isolation strategy provides the strongest guarantee and why?]." Reveal full solution explaining: Docker is insufficient because container escapes give host access; Firecracker MicroVMs with per-task isolation provide hardware-level separation at ~125ms boot time.

#### H2: Safety Models (~900 words)

**After Multi-Layer Guardrails subsection:**
- `self-explanation prompt`: "Design a layered safety model for a coding agent that will be used by a 50-person engineering team. The agent needs to edit production code, run tests, and push to GitHub. What layers would you implement, and in what order do they activate?" Expert answer: "Layer 1 (Default-deny): Agent starts with zero access; only designated repositories and approved CLI commands are available. Layer 2 (RBAC): Junior developers' agents cannot push to main branch or modify infrastructure code; senior developers' agents have broader scope. Layer 3 (HITL): All production deployments require human approval; test runs are pre-approved. Layer 4 (Guardrails): Input validation rejects prompts requesting credential access or destructive operations; output validation scans generated code for known vulnerability patterns. Layer 5 (Sandboxing): OS-level filesystem and network isolation constraining the agent to designated directories." Complexity: design/synthesis. *(This directly addresses LO #5.)*

#### H2: Failure Modes and Practical Limits (~700 words)

**After the four failure modes:**
- `concept-check quiz` (2 questions): (1) "An agent edits a file that doesn't exist, then creates it with hallucinated content. Which failure mode is this?" [Hallucination cascade]. (2) "At Opus 4.6 output pricing, an uncontrolled agent at maximum rate limits would cost approximately how much per hour?" [$1,200/hour]. Complexity: identification + recall.

**After the full section:**
- `section-review quiz` (4 questions): (1) "Name all four agent failure modes." [Hallucination cascades, context exhaustion, resource exhaustion, silent failures]. (2) "Which failure mode is described as 'the most dangerous'?" [Silent failures — agent reports success with subtly incorrect results]. (3) "What mitigates context exhaustion in Claude Code?" [Auto-compaction — summarizing earlier context]. (4) "What production safeguards should be implemented against resource exhaustion?" [Token budgets, time limits, cost caps]. Complexity: recall + application.

#### Module-Assessment Quiz (after Key Takeaways)

`module-assessment quiz` (10 questions):
1. Name the five steps in the canonical agent loop. [Gather, Plan, Act, Verify, Loop]
2. What distinguishes an agent from a chatbot? [Tool use — the ability to take actions in the world, not just generate text]
3. Which coding agent leads SWE-bench Verified? [Claude Code with Opus 4.6 at 80.8%]
4. Codex's sandbox is air-gapped. What practical limitation does this create? [Cannot install packages not pre-provisioned in the sandbox image]
5. Rank the three isolation strategies from weakest to strongest. [Docker < gVisor < Firecracker MicroVMs]
6. ChatGPT Agent is unavailable in which region? [EEA/Switzerland — regulatory constraints]
7. What is the default safety posture for well-designed agent systems? [Default-deny — zero access, explicit grants required]
8. An agent's test passes, but it tests the wrong thing. Which failure mode? [Silent failure]
9. True or False: Jules requires an interactive terminal session. [False — GitHub-native, asynchronous]
10. MCP support divides agents into two groups. Name one agent from each group. [With MCP: Claude Code, Cowork, Copilot Studio. Without: Codex, Jules, ChatGPT Agent]

### Closing Synthesis — Whole-Task Exercise

**Exercise: Agent Deployment Design**

> Your company wants to deploy an AI agent that will: (1) monitor a GitHub repository for new issues, (2) triage them (bug vs. feature vs. question), (3) for bugs, attempt an automated fix and open a PR, (4) for complex bugs it cannot fix, escalate to the on-call engineer with a diagnostic summary.
>
> Design this agent system:
> - Which agent product(s) would you use, and why?
> - What sandboxing strategy is appropriate?
> - Design the safety model: what requires human approval? What is pre-approved?
> - What failure modes are most likely? Design a mitigation for each.
> - Estimate the monthly cost (assume 50 issues/day, 70% bugs, 30% features/questions).
>
> **Connection forward:** Module 06 will show you how MCP enables this agent to connect to GitHub, Slack, and other services through a standardized protocol. Module 04 will show how multi-agent orchestration could decompose this into specialized agents (triager, fixer, reviewer).

### Estimated Completion Time

| Segment | Activity | Time |
|---------|----------|------|
| Opening + Prior Knowledge Activation | Read hook, answer warm-up questions | 3 min |
| Core Architecture (gather-act-verify) | Read + concept checks + accordion | 8 min |
| Agents Platform by Platform | Read + comparison table + section review | 14 min |
| Sandboxing and Isolation | Read + completion problem | 8 min |
| Safety Models | Read + self-explanation | 7 min |
| Failure Modes | Read + concept checks + section review | 7 min |
| Key Takeaways + Module Assessment | Read + 10-question quiz | 8 min |
| Closing Synthesis Exercise | Whole-task problem | 12 min |
| **Total** | | **~67 min** |

**Natural pause points:** After "Agents Platform by Platform" (25 min mark — natural break after the survey), after "Safety Models" (40 min mark — conceptual shift to failure modes), after module-assessment quiz (55 min mark — exercise can be deferred).

---

## Module 04: Multi-Agent Orchestration

### Learning Outcomes

1. **Explain** the four problems that multi-agent orchestration solves (context saturation, parallelism, specialization, isolation) and identify when each justifies the overhead.
2. **Compare** the five orchestration patterns (hierarchical, handoff, peer-to-peer, competitive, router) on strengths, weaknesses, and representative implementations.
3. **Evaluate** the four platform frameworks (Anthropic Agent SDK/Teams, OpenAI Agents SDK, Google ADK, Copilot Studio) and recommend the appropriate framework for a given use case.
4. **Design** a role-based model allocation strategy for a multi-agent system, matching model tiers to agent roles and calculating cost impact.
5. **Analyze** the summary propagation problem and design structured return formats that preserve critical information across context boundaries.

### Opening Hook

**Hook text:**

> Building this curriculum took 56+ AI agents across four specialized roles. 38 researchers ran in parallel, each investigating a different topic. 12 writers drafted modules simultaneously. 5 reviewers fact-checked in parallel. 1 synthesizer audited everything for cross-module consistency. Total cost: less than what 3 senior Opus calls would have cost — because the researchers used Haiku at $1/MTok input while only the synthesizer needed Opus at $5/MTok. That 5x price difference, multiplied across 38 parallel agents, is why multi-agent orchestration is not just an architectural pattern — it is an economic strategy. This module shows you how it works.

### Prior Knowledge Activation

Prerequisites: M00, M01, M03 (critical — gather-act-verify, tool use, sandboxing, failure modes).

1. "From Module 03, describe the gather-act-verify loop in one sentence." *(Spaced retrieval. Every agent in a multi-agent system runs this loop.)*
2. "Module 03 identified four agent failure modes. Name them." *(Hallucination cascades, context exhaustion, resource exhaustion, silent failures. Multi-agent systems compound these.)*
3. "Module 01 showed Haiku 4.5 at $1/$5/MTok vs. Opus 4.6 at $5/$25/MTok — a 5x cost difference. If you needed 20 parallel agents for simple research tasks, which model would you choose and why?" *(Primes the model selection section — 20 Haiku calls cost ~1 Opus call.)*

### Section-by-Section Annotations

#### H2: Why Multi-Agent? The Case for Decomposition (~500 words)

**After the four problems paragraph (context saturation, parallelism, specialization, isolation):**
- `concept-check quiz` (1 question): "A project requires researching three independent topics simultaneously. Which multi-agent advantage most directly applies?" Choices: Context saturation, Parallelism, Specialization, Isolation. Correct: Parallelism. Explanation: "A single agent is inherently sequential. Independent subtasks benefit from parallel agents that complete work simultaneously." Complexity: application.

#### H2: Orchestration Patterns (~1,200 words, 5 patterns)

**After all five patterns described:**
- `self-explanation prompt`: "Before looking at the framework comparison, match each orchestration pattern to a real-world analogy. For example: Hierarchical = a manager assigning tasks to a team." Expert answer: "Hierarchical = manager delegates and collects reports. Handoff = relay race — baton passes from one runner to the next, each running their leg. Peer-to-peer = team brainstorm — everyone contributes and communicates laterally. Competitive = A/B test — multiple approaches tried, best selected. Router = reception desk — classifies incoming requests and directs to the right specialist." Complexity: comprehension/application. *(Analogies build schema per constructivist theory.)*

**After the section:**
- `section-review quiz` (4 questions): (1) "Which pattern transfers the full conversation state from one agent to another?" [Handoff]. (2) "Which pattern is the most expensive per-task because it runs N parallel attempts?" [Competitive/parallel exploration]. (3) "Agent Teams uses which orchestration pattern?" [Peer-to-peer — direct inter-agent messaging]. (4) "Which pattern does Copilot Studio's generative orchestration implement?" [Router — LLM itself is the router]. Complexity: recall/identification.

#### H2: Platform Frameworks (~2,800 words, comparison table)

**After the Anthropic section (Agent SDK + Agent Teams):**
- `concept-check quiz` (1 question): "What is the key architectural difference between Agent SDK subagents and Agent Teams?" Choices: Different models, Different tools, Subagents communicate only with parent; teammates communicate with each other, No difference. Correct: Communication model — parent-child only vs. any-to-any. Explanation: "This is not a minor distinction. Peer-to-peer communication enables lateral information sharing and self-organization — fundamentally different collaboration dynamics." Complexity: comparison.

**After the full Framework Comparison table:**
- `comparison-table enhancer`: Filter/sort. 10 rows, 6 columns — significant table that benefits from provider filtering and sorting by status or target audience.

**After the comparison table:**
- `worked-example fader` (stage: `partial` — completion problem): "Completion Problem: Choosing an Orchestration Framework." Scenario: "A startup needs to build a customer support system with: (1) a routing agent that classifies incoming requests, (2) a billing specialist agent, (3) a technical support agent, (4) an escalation agent for complex cases. The startup uses OpenAI's GPT models but wants the option to switch providers later. Step 1: The requirement for provider flexibility eliminates which frameworks? [FILL IN]. Step 2: The routing → specialist pattern maps to which orchestration pattern? Step 3: [FILL IN — Which remaining framework best supports this pattern as a first-class primitive?]. Step 4: Design the handoff chain." Reveal full solution: Provider flexibility eliminates Anthropic SDK (Claude-only). Routing pattern = handoff + router. OpenAI Agents SDK with handoffs as first-class primitives is the best fit, plus it is open-source (MIT). *(Spiral callback: M01 provider comparison applied to framework selection.)*

#### H2: Delegation Patterns in Practice (~800 words)

**After all three patterns (fan-out/fan-in, pipeline, specialist router):**
- `concept-check quiz` (1 question): "A data processing workflow has three stages: extract, transform, load. Each stage depends on the output of the previous. Which delegation pattern is appropriate?" Choices: Fan-out/fan-in, Pipeline, Specialist router. Correct: Pipeline. Explanation: "Sequential dependency with context accumulation maps to the pipeline (sequential handoff) pattern. Fan-out/fan-in is for independent parallel subtasks." Complexity: application.

#### H2: Strategic Model Selection in Multi-Agent Systems (~1,400 words, tables)

**After the Role-to-Tier Mapping table:**
- `comparison-table enhancer`: Filter/sort.
- `concept-check quiz` (1 question): "In a multi-agent system, which agent role should use the cheapest possible model?" Choices: Researcher, Writer, Synthesizer, Router/Dispatcher. Correct: Router/Dispatcher. Explanation: "Routers perform simple classification where speed matters most. GPT-5.4 Nano at $0.20/MTok or Gemini Flash-Lite at $0.10/MTok suffice." Complexity: application.

**After the Case Study (this curriculum's Round 1 execution):**
- `self-explanation prompt`: "The case study describes 'progressive escalation' — start with cheaper models and escalate selectively. What metric would you use to decide when escalation is needed?" Expert answer: "Quality failure rate. In Round 1, the team measured editorial issues per module: unverified sources, citation inconsistency, depth gaps. When cheaper models produced too many quality failures that required expensive downstream fixing, Round 2 escalated all agents to Opus 4.6. The decision criterion: is it cheaper to prevent the error upstream (flagship model) or fix it downstream (reviewer + reviser)?" Complexity: evaluation/design.

**After "Cost Optimization Patterns" (progressive escalation, caching, batching):**
- `section-review quiz` (4 questions): (1) "Why is the orchestrator's model selection the most important in a multi-agent system?" [Orchestrator errors cascade through the entire system]. (2) "How does prompt caching reduce costs in fan-out patterns?" [Multiple agents sharing the same system prompt/brief get cached, amortizing input cost across N agents]. (3) "Which optimization gives a flat 50% discount for non-urgent work?" [Batch processing]. (4) "OpenAI's Agents SDK supports which level of provider flexibility?" [Provider-agnostic — any Chat Completions-compatible endpoint]. Complexity: recall + application. *(Spiral callbacks: caching from M02, model pricing from M01.)*

#### H2: Context Isolation and Summary Propagation (~600 words)

**After the summary design best practices:**
- `concept-check quiz` (1 question): "A subagent returns 'I fixed the bug.' Why is this summary insufficient?" Choices: It is too short, It lacks concrete details (file paths, lines changed, tests affected), It does not include the model used, It should include token count. Correct: It lacks concrete details. Explanation: "The module states: concrete details survive compaction and context boundaries better than abstractions. 'Fixed a null pointer exception in auth.py:142' is actionable; 'I fixed the bug' is not." Complexity: application/evaluation.

#### H2: Enterprise Agent Governance (~700 words)

**After Agent 365's four pillars:**
- `concept-check quiz` (1 question): "As of March 2026, how many cross-platform agent governance standards exist?" Choices: One (Agent 365), Two (Agent 365 + an open standard), Several, None. Correct: None. Explanation: "Agent 365 governs only the Microsoft ecosystem. No cross-platform standard exists. Organizations using multiple AI platforms must build governance bridges themselves." Complexity: recall with strategic significance.

#### Module-Assessment Quiz (after Key Takeaways)

`module-assessment quiz` (10 questions):
1. Name the four problems multi-agent orchestration solves. [Context saturation, parallelism, specialization, isolation]
2. Which orchestration pattern transfers full conversation state? [Handoff]
3. Anthropic Agent Teams is at what maturity level? [Experimental]
4. Name the five core primitives of OpenAI's Agents SDK. [Agents, Tools, Handoffs, Guardrails, Tracing]
5. Which framework is provider-agnostic? [OpenAI Agents SDK]
6. Google ADK is open-source under which license? [Apache 2.0]
7. Agent 365 prices at $___/user/month. [$15]
8. What is the recommended summary budget for a subagent return? [5-15% of the subagent's working context]
9. In progressive escalation, when should you switch from a cheap model to a flagship? [When the cheap model's quality failure rate makes downstream fixing more expensive than upstream prevention]
10. A researcher agent needs to run 20 parallel web searches. Which model tier? [Fast/cheap — Haiku 4.5 or GPT-5.4 Nano]

### Closing Synthesis — Whole-Task Exercise

**Exercise: Multi-Agent System Design**

> Design a multi-agent system for automated code review at a company with 200 developers. The system should: (1) automatically review every PR before human review, (2) check for security vulnerabilities, code style violations, and logical errors, (3) provide structured feedback in PR comments, (4) escalate critical security findings to the security team immediately.
>
> Your design should specify:
> - How many agent roles and what each does.
> - Which orchestration pattern(s) you use and why.
> - Model selection per agent role (with pricing rationale from M01).
> - Safety model: what permissions does each agent need? What is off-limits?
> - Summary propagation: what does each agent return to the orchestrator?
> - Governance: how do you track what these agents do and ensure compliance?
> - Estimated monthly cost for 100 PRs/day.
>
> **Connection forward:** Module 06 will show how MCP enables these agents to connect to GitHub, Slack, and security scanning tools. Module 07 will show how skills and plugins make these agent capabilities reusable.

### Estimated Completion Time

| Segment | Activity | Time |
|---------|----------|------|
| Opening + Prior Knowledge Activation | Read hook, answer warm-up questions | 4 min |
| Why Multi-Agent + Orchestration Patterns | Read + concept check + self-explanation + section review | 12 min |
| Platform Frameworks | Read + concept check + comparison table + completion problem | 16 min |
| Delegation Patterns | Read + concept check | 5 min |
| Model Selection | Read + concept check + self-explanation + section review | 12 min |
| Context Isolation + Governance | Read + concept checks | 6 min |
| Key Takeaways + Module Assessment | Read + 10-question quiz | 8 min |
| Closing Synthesis Exercise | Whole-task problem | 12 min |
| **Total** | | **~75 min** |

**Natural pause points:** After "Orchestration Patterns" (16 min mark), after "Platform Frameworks" (32 min mark — strong conceptual break; this is the densest section), after module-assessment quiz (63 min mark — exercise can be deferred).

---

## Module 05: OpenClaw & Open Agent Ecosystem

### Learning Outcomes

1. **Explain** OpenClaw's layered architecture (Gateway, Channels, Pi Agent Runtime, Memory, Heartbeat) and describe the function of each component.
2. **Evaluate** the ClawHub security landscape using quantitative data (malicious skill rates, attack vectors, industry advisories) and recommend appropriate risk mitigations.
3. **Compare** OpenClaw's local-first philosophy against closed-platform approaches on data sovereignty, cost, customization, and maintenance burden.
4. **Analyze** NemoClaw's enterprise additions (OpenShell sandbox, Privacy Router) and assess whether they address the fundamental security gaps.
5. **Identify** the governance implications of OpenClaw's transition to a foundation model and the founder's departure to OpenAI.

### Opening Hook

**Hook text:**

> A healthcare startup needs an AI agent that processes patient data. Their legal team says: "No data can leave our servers. Period." This eliminates Claude, ChatGPT, Gemini, and Copilot — all cloud-managed. But their CTO finds OpenClaw: MIT-licensed, runs locally, uses any LLM (including self-hosted models via Ollama). Problem solved? Not so fast. Before they write a line of code, they need to answer: what happens when 12-20% of skills in the registry are malicious? When Microsoft says the platform is "unsuitable for standard workstations"? When the project's founder just left for OpenAI? This module is the answer sheet.

### Prior Knowledge Activation

Prerequisites: M00 (open-source ecosystem, OpenClaw introduction), M03 (agent architecture, sandboxing, safety).

1. "Module 03 described the gather-act-verify loop as the core agent architecture. How did it describe the ReAct pattern?" *(Answer: Reasoning + Acting — interleaving reasoning and action at each step. OpenClaw implements the same pattern.)*
2. "Module 03 ranked sandboxing strategies from weakest to strongest: Docker < gVisor < Firecracker. Keep this ranking in mind — you will need it to evaluate OpenClaw's security posture." *(Activates prior security knowledge.)*
3. "Module 00 mentioned OpenClaw has 250,000+ GitHub stars and a 12-20% malicious skill rate in its registry. Based on what you learned about agent safety in Module 03, why is that combination particularly dangerous?" *(Primes the security section with cross-module reasoning.)*

### Section-by-Section Annotations

#### H2: OpenClaw Architecture (~1,800 words, 6 subsections)

**After the Gateway subsection:**
- `concept-check quiz` (1 question): "The Gateway listens on port 18789. Why is the single-entry-point design both an advantage and a vulnerability?" Choices: It is only an advantage, It centralizes logging but creates a high-value attack target, It is only a vulnerability, Port 18789 is not standard. Correct: It centralizes logging but creates a high-value attack target. Explanation: "All interactions flow through one point — great for observability, but the ClawJacked vulnerability exploited exactly this choke point for WebSocket hijacking." Complexity: analysis. *(Connects architecture directly to security consequences.)*

**After the Memory System subsection:**
- `self-explanation prompt`: "Compare OpenClaw's file-based memory system (SOUL.md, MEMORY.md) to Claude Memory (Module 02). What does each approach trade off?" Expert answer: "OpenClaw: Fully transparent — every memory file is human-readable and editable. But requires manual management with no automatic curation or summarization. Claude Memory: Opaque — processed asynchronously by Anthropic's servers with ~24-hour delay. But hands-off — the system curates automatically. OpenClaw trades convenience for control and transparency. Claude trades transparency for automation. The right choice depends on whether the user (or organization) has the technical capacity and desire to manage memory manually." Complexity: evaluation/comparison. *(Spiral callback: M02 memory systems.)*

**After the Deployment Options table:**
- `concept-check quiz` (1 question): "Which deployment option is recommended for production use, and why?" Choices: Local (fastest), Docker (network isolation between agent and host), Cloud (always-on), Any — they are equivalent. Correct: Docker. Explanation: "Docker provides a degree of isolation between the agent runtime and the host system — a critical security layer given the ClawHub skill landscape." Complexity: recall with reasoning.

**After the full architecture section:**
- `section-review quiz` (4 questions): (1) "What communication protocol do channels translate into?" [OpenClaw's internal protocol — channels convert platform-specific messages]. (2) "The Pi Agent Runtime implements which reasoning pattern?" [ReAct — Reason-Act-Observe]. (3) "How does OpenClaw's Heartbeat differ from Claude's scheduled tasks?" [Heartbeat runs locally on the host machine; Claude's scheduled tasks are server-side/platform-managed]. (4) "Name the three memory files in OpenClaw's hierarchy." [SOUL.md, MEMORY.md, daily notes]. Complexity: recall/comparison.

#### H2: ClawHub — The Skills Registry (~1,600 words)

**Before the Security Crisis subsection (concept-check gate):**
- `concept-check gate`: "Before You Continue — The next section covers security vulnerabilities. Ensure you understand: (1) What a 'skills registry' does (like an app store for agent capabilities). (2) That skills run INSIDE the agent's process, not in isolation. (3) Module 03's sandboxing strategies and their relative strengths."

**After the ClawHavoc Campaign description:**
- `concept-check quiz` (1 question): "The ClawHavoc campaign planted 1,184 malicious skills. What were the two primary attack vectors?" Choices: [Buffer overflow + SQL injection], [Atomic Stealer malware + ClickFix social engineering], [Phishing + ransomware], [Cross-site scripting + CSRF]. Correct: Atomic Stealer malware + ClickFix 2.0 social engineering. Explanation: "Atomic Stealer exfiltrated credentials, cookies, and SSH keys. ClickFix presented fake error dialogs prompting users to run malicious shell commands. Both exploited ClawHub's lack of vetting." Complexity: recall.

**After the Malicious Skill Rate Estimates table:**
- `comparison-table enhancer`: Filter/sort on Malicious Rate.
- `self-explanation prompt`: "The malicious rate estimates range from 11.9% to 46.8%. Explain why these numbers are not contradictory — what accounts for the variance?" Expert answer: "Methodological scope differs. Koi Security (11.9%) counts only confirmed malware — skills intentionally designed to harm. Bitdefender (~20%) includes suspicious behavioral patterns. Snyk (36.82%) includes unintentional security flaws (vulnerable dependencies). The cross-platform study (46.8%) includes all dependency vulnerabilities. A skill can be vulnerable (bad dependency) without being malicious (intentionally harmful). For practical risk assessment: ~12-20% intentionally malicious, ~37-47% with some security exposure." Complexity: analysis/evaluation.

**After the Mitigations subsection:**
- `concept-check quiz` (1 question): "Are the current ClawHub mitigations (VirusTotal, behavioral analysis, skill removal) sufficient to address the fundamental security risk?" Choices: Yes — they cover all attack vectors, No — skills still run inside the agent process with full host access in non-Docker deployments, Partially — they help with known threats but not novel payloads. Correct: No — the fundamental architectural issue remains. Explanation: "VirusTotal catches known signatures. Behavioral analysis has false positives and negatives. The architectural problem — skills running inside the agent process — is not addressed by registry-level scanning." Complexity: evaluation.

#### H2: The Local-First Philosophy (~600 words)

**After the tradeoff summary:**
- `section-review quiz` (3 questions): (1) "For an organization with strict data residency requirements, what is the primary advantage of OpenClaw over closed platforms?" [Data sovereignty — no data leaves their infrastructure]. (2) "Community estimates suggest what range of cost savings for OpenClaw at scale?" [70-90%]. (3) "What is the key tradeoff a $20/month Claude Pro subscription offers vs. an OpenClaw deployment?" [Claude: working, secure, maintained system. OpenClaw: unlimited customization and data sovereignty, but self-managed security, updates, and infrastructure]. Complexity: recall/evaluation.

#### H2: NemoClaw — The Enterprise Bridge (~600 words)

**After the OpenShell Sandbox and Privacy Router descriptions:**
- `concept-check quiz` (1 question): "NemoClaw's OpenShell addresses the fundamental security gap in standard OpenClaw. What is that gap?" Choices: Lack of encryption, No user authentication, No isolation between skills and the host environment, Poor documentation. Correct: No isolation between skills and the host environment. Explanation: "In standard OpenClaw, skills run inside the agent process with full host access. OpenShell constrains network access, file access, and inference routing — limiting a compromised skill's blast radius to the sandbox." Complexity: analysis. *(Spiral callback: M03 sandboxing concepts applied.)*

**After the NemoClaw section:**
- `progressive-disclosure accordion` (variant: `supplementary-reference`): "NVIDIA's Enterprise AI Strategy." Brief note connecting NemoClaw to NVIDIA's broader play: NeMo, TensorRT, Triton Inference Server. NemoClaw drives GPU hardware demand by making local inference viable for enterprise.

#### H2: OpenClaw and the Platform Ecosystem (~800 words, comparison table)

**After the OpenClaw vs. Closed Agent Platforms table:**
- `comparison-table enhancer`: Filter/sort. 9 rows, 5 columns — useful for dimension-focused comparison.

**After the Governance Transition subsection:**
- `concept-check quiz` (1 question): "Why does the founder's departure to OpenAI make foundation governance more important, not less?" Choices: Foundations are always better, To prevent OpenClaw from becoming OpenAI-aligned, The founder was the only developer, Legal requirements. Correct: To prevent OpenClaw from becoming OpenAI-aligned — plus reducing single-point-of-failure risk. Explanation: "Foundation governance ensures neutrality (not aligned with any one company), sustainability (not dependent on one maintainer), and enterprise confidence (governance structure enterprises require before committing to a dependency)." Complexity: analysis.

#### Module-Assessment Quiz (after Key Takeaways)

`module-assessment quiz` (10 questions):
1. Name the three main components of OpenClaw's architecture. [Gateway, Channels, Pi Agent Runtime]
2. What port does the Gateway listen on? [18789]
3. What was the ClawHavoc campaign? [Coordinated malware campaign that planted 1,184 malicious skills on ClawHub]
4. The conservative estimate of intentionally malicious ClawHub skills is approximately: [12-20%]
5. Which organization said OpenClaw is "unsuitable for standard workstations"? [Microsoft]
6. OpenClaw's memory system uses what approach? [File-based hierarchy: SOUL.md, MEMORY.md, daily notes]
7. NemoClaw adds what two key enterprise layers? [OpenShell sandbox + Privacy Router]
8. True or False: OpenClaw can only use Anthropic's models. [False — supports Anthropic, OpenAI, Google, Ollama, OpenRouter, custom endpoints]
9. The Heartbeat system fires at what interval? [30 minutes]
10. For a healthcare organization with strict data residency requirements, would you recommend OpenClaw or a closed platform? [OpenClaw (self-hosted) — but with Docker deployment, no ClawHub skills (or heavily vetted only), and NemoClaw when GA for enterprise hardening]

### Closing Synthesis — Whole-Task Exercise

**Exercise: Open vs. Closed Platform Decision**

> Your organization is a 100-person financial services firm. Compliance requires: (1) all customer data stays on-premises, (2) complete audit trail of all AI agent actions, (3) ability to customize agent behavior for regulatory-specific workflows, (4) zero tolerance for security incidents that could expose customer financial data.
>
> The CTO is considering three options: (A) Claude Enterprise, (B) standard OpenClaw deployment, (C) NemoClaw (when GA).
>
> For each option, evaluate:
> - Does it meet the data residency requirement?
> - How does it handle audit trails?
> - What security risks does it introduce?
> - What is the approximate monthly cost (for 20 AI-using employees)?
> - What maintenance burden falls on your team?
>
> Make a recommendation with your reasoning. If you recommend OpenClaw or NemoClaw, specify the deployment configuration, which ClawHub skills (if any) you would install, and what additional security measures you would implement.
>
> **Connection forward:** Module 06 will show you how MCP enables OpenClaw (and other agents) to connect to your existing data infrastructure. Module 10 will examine the broader open-vs-closed ecosystem dynamics and where the regulatory landscape is heading.

### Estimated Completion Time

| Segment | Activity | Time |
|---------|----------|------|
| Opening + Prior Knowledge Activation | Read hook, answer warm-up questions | 3 min |
| OpenClaw Architecture | Read + concept check + self-explanation + section review | 14 min |
| ClawHub Security | Gate + read + concept checks + self-explanation | 12 min |
| Local-First Philosophy | Read + section review | 5 min |
| NemoClaw | Read + concept check + accordion | 5 min |
| Platform Ecosystem + Governance | Read + comparison table + concept check | 6 min |
| Key Takeaways + Module Assessment | Read + 10-question quiz | 8 min |
| Closing Synthesis Exercise | Whole-task problem | 12 min |
| **Total** | | **~65 min** |

**Natural pause points:** After "OpenClaw Architecture" (17 min mark — good break before the security section), after "ClawHub Security" (29 min mark — emotionally heavy section, good to pause), after module-assessment quiz (53 min mark — exercise can be deferred).

---

## Cross-Module Design Notes

### Component Usage Summary

| Component | M00 | M01 | M02 | M03 | M04 | M05 |
|-----------|-----|-----|-----|-----|-----|-----|
| `concept-check quiz` | 5 | 7 | 7 | 5 | 5 | 6 |
| `section-review quiz` | 2 | 2 | 4 | 2 | 2 | 2 |
| `module-assessment quiz` | 1 | 1 | 1 | 1 | 1 | 1 |
| `self-explanation prompt` | 2 | 1 | 3 | 1 | 2 | 2 |
| `comparison-table enhancer` | 3 | 4 | 5 | 1 | 2 | 2 |
| `progressive-disclosure accordion` | 2 | 1 | 2 | 1 | 0 | 1 |
| `concept-check gate` | 0 | 1 | 1 | 0 | 0 | 1 |
| `worked-example fader` | 1 (full) | 1 (full) | 1 (full) | 1 (partial) | 1 (partial) | 0 |

**Fading trajectory:** M00-M02 use FULL worked examples. M03-M04 shift to PARTIAL (completion problems). M05 has no worked example (the closing exercise serves as the independent problem). This implements the 4C/ID fading pattern across the six modules.

### Time Budget Summary

| Module | Reading (est.) | Activities | Synthesis Exercise | Total |
|--------|---------------|------------|-------------------|-------|
| M00 | 25-30 min | 25 min | 10 min | ~65 min |
| M01 | 35-40 min | 24 min | 12 min | ~71 min |
| M02 | 40-45 min | 36 min | 15 min | ~96 min |
| M03 | 30-35 min | 25 min | 12 min | ~67 min |
| M04 | 35-40 min | 23 min | 12 min | ~75 min |
| M05 | 25-30 min | 23 min | 12 min | ~65 min |
| **Total (M00-M05)** | | | | **~439 min (~7.3 hours)** |

**Comparison with WS1 estimates:** WS1 estimated ~245 min for reading M00-M05 (Parts 1 + Part 2). Adding activities (~156 min) and exercises (~73 min) brings the total to ~439 min. This is realistic for thorough engagement. WS1's "one Part per study session" recommendation maps to ~4 sessions for these six modules.

### Spiral Concept Integration

Each module's annotations reinforce WS1's seven spiral concepts:

| Spiral Concept | Integration Points in WS2a |
|---------------|---------------------------|
| Model Selection / Cost | M01 worked example, M04 model selection section + self-explanation |
| Gather-Act-Verify | M03 opening concept check, M04 prior knowledge activation, M05 ReAct connection |
| MCP as Protocol | M00 Zapier concept check, M03 function calling vs. MCP quiz, M05 architecture connection |
| Security / Safety | M03 self-explanation on safety layers, M04 governance quiz, M05 entire ClawHub section |
| Context Management | M02 entire module, M04 context isolation quiz |
| Platform Comparison | M00 self-explanation + table enhancers, M01 head-to-head tables, M05 platform comparison |
| Open vs. Closed | M00 tradeoff quiz, M05 entire module + closing exercise |

---

## Evidence Citations

| Design Decision | Pedagogy Source | Section |
|----------------|----------------|---------|
| Concept-check quizzes every ~800-1,000 words | Dunlosky et al., practice testing as high-utility strategy | Section 2 |
| Self-explanation prompts with write-then-reveal | Chi (1994), self-explaining key points boosts understanding | Section 2, 7 |
| Worked-example fading (full to partial to guided) | Sweller et al., worked-example effect with progressive fading | Section 2 |
| Concept-check gates as advisory, not blocking | Pedagogy research on self-check gates | Section 1 |
| Problem-centered opening hooks | Merrill's First Principles, problem-centered learning | Section 6 |
| Prior knowledge activation questions | Ausubel, advance organizers; 4C/ID, prior knowledge activation | Section 1, 6 |
| Progressive disclosure for non-critical-path content | Mayer's segmentation principle; expertise-reversal effect | Section 4, 8 |
| Comparison table enhancers for learning, not just reference | Clark and Mayer; tables support learning when they highlight relationships | Section 4 |
| Natural pause points every ~25-35 min | Cognitive load segmentation; ~15-30 min optimal session chunks | Section 8 |
| Forward connections at module close | Spiral curriculum (Bruner); spaced recall | Section 5 |
