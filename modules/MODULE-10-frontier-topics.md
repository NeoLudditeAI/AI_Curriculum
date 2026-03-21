# Module 10: Frontier Topics

**Last updated:** 2026-03-21
**Status:** DRAFTING
**Word count target:** 4,500-5,500

---

## Executive Summary

The AI landscape mapped in Modules 00-09 is not a stable equilibrium -- it is a fast-moving frontier where on-device inference, multimodal generation, enterprise governance frameworks, and the open-vs-closed ecosystem tension are all reshaping the field simultaneously. This capstone module synthesizes the trajectory lines running through the entire curriculum and projects them forward: where the technology is headed in the next 6-18 months, what the key inflection points are, and which upcoming events (Google I/O 2026, WWDC 2026, Microsoft Build 2026) are most likely to shift the competitive map. Every section here connects back to foundations laid in prior modules.

---

## Prerequisites

All prior modules (00-09) are recommended. This module synthesizes themes and vocabulary introduced throughout the curriculum.

---

## On-Device AI: Intelligence at the Edge

> **Volatility warning:** On-device AI capabilities are shipping with OS updates on quarterly or faster cadences. Specific feature availability depends on hardware generation, OS version, and regional rollout.

The models covered in [Module 01](MODULE-01-models-and-intelligence.md) run in data centers, but a parallel track is pushing inference onto phones, laptops, and wearables. The motivation is straightforward: latency under 20ms (vs. 200-500ms for cloud round-trips), offline availability, and privacy guarantees that no server-side architecture can match [1]. User research backs this up -- 91% of surveyed users prefer on-device processing for privacy-sensitive tasks, and 78% report refusing cloud AI features they would otherwise use [1].

### Google: Gemini Nano and AICore

Google's approach embeds Gemini Nano directly into Android via the AICore system service, available on Pixel 8 and later devices. Developers access it through ML Kit GenAI APIs, which expose capabilities including summarization, proofreading, Smart Reply, and Call Notes [2]. This is not a toy demo -- Call Notes, which transcribes and summarizes phone calls entirely on-device, shipped as a default feature on Pixel 9 and newer.

The strategic significance is that Google controls the OS, the chipset (Tensor), and the model. This vertical integration mirrors the platform-ecosystem pattern described in [Module 00](MODULE-00-landscape-overview.md), but pushes it all the way down to silicon. No other player has this depth in mobile.

### Apple Intelligence and Private Cloud Compute

Apple's on-device model is a ~3 billion parameter transformer optimized for Apple Silicon, running natively on iPhone 15 Pro and later, all M-series Macs, and recent iPads [3]. For tasks exceeding on-device capacity, Apple routes to Private Cloud Compute (PCC) -- custom Apple Silicon servers where data is processed but never retained, with cryptographic guarantees that Apple itself cannot access user data [3].

The gap in Apple's strategy is conversational AI. Siri's current implementation remains intent-based, not LLM-powered. The widely reported "Campo" project aims to ship a true LLM-powered Siri with iOS 27 in September 2026 [3]. A notable January 2026 partnership with Google will integrate Gemini into Apple's foundation models for specific tasks, acknowledging that Apple's in-house models lag behind in general-purpose reasoning [3].

### Qualcomm: The Hardware Enabler

Qualcomm's role is less visible to consumers but structurally important. The Snapdragon Wear Elite platform, announced at MWC 2026, runs 2 billion parameter models at 10 tokens per second on a wearable form factor [4]. The Snapdragon X2 Plus, shown at CES 2026, delivers 80 TOPS of NPU performance for laptops [4]. These chips define the ceiling for what on-device models can do -- and that ceiling is rising fast enough that models in the Gemini Nano and Apple Intelligence class will have significantly more headroom by late 2026.

### On-Device vs. Cloud: The Emerging Split

The practical implication, building on the context engineering principles in [Module 02](MODULE-02-context-engineering.md), is a tiered inference architecture: on-device for latency-sensitive, privacy-critical, or offline tasks; cloud for complex reasoning, large context windows, and tasks requiring the frontier models discussed in [Module 01](MODULE-01-models-and-intelligence.md). The engineering challenge is making this split invisible to users. Apple's PCC is the most ambitious attempt at this seamless handoff; Google's AICore is the most developer-accessible.

| Platform | On-Device Model | Parameters | Key Hardware | Latency | Developer Access |
|----------|----------------|------------|--------------|---------|-----------------|
| Google | Gemini Nano | Not disclosed | Tensor G3+ (Pixel 8+) | <20ms | ML Kit GenAI APIs |
| Apple | Apple Foundation Model | ~3B | A17 Pro+, M-series | <20ms | On-device only (no public API) |
| Qualcomm | OEM-dependent | Up to 2B | Snapdragon Wear Elite, X2 Plus | ~100ms (10 tok/s) | Qualcomm AI Engine SDK |

On-device adoption runs approximately 3x higher than equivalent cloud features when users are given the choice [1], suggesting that privacy and latency are not niche concerns but primary drivers of AI product adoption.

---

## Multimodal Generation: From Text to Everything

> **Volatility warning:** Multimodal generation capabilities, pricing, and content policies are changing monthly. Licensing deals (e.g., Disney-Sora) are creating new categories that did not exist six months ago.

[Module 01](MODULE-01-models-and-intelligence.md) covered multimodal *understanding* -- models that can see images, hear audio, and process video. This section covers the other direction: models that *generate* rich media. The market has grown from $1.6 billion in 2024 to an estimated $3.43 billion in 2026, a 37% year-over-year growth rate [5].

### Video Generation

**OpenAI Sora 2** reached general availability and generates videos up to 25 seconds in length. The headline development is commercial licensing: a $1 billion partnership with Disney grants access to 200+ licensed characters, though talent likenesses remain excluded [6]. This is the first major instance of AI video generation operating within traditional IP frameworks rather than around them, and it sets a template that other studios are likely to follow.

**Google Veo 3.1** (GA since February 23, 2026) generates video at 720p, 1080p, and 4K resolution in clips up to 8 seconds [7]. Its unique differentiator is native 3D spatial audio generation -- no other video model produces synchronized audio natively. Veo sits within the broader Google Flow creative studio (launched February 25, 2026), which merges the previously separate Whisk, ImageFX, and Veo tools into the first unified image-to-video-to-audio pipeline [7].

The quality threshold has been crossed: studies show 95%+ of viewers cannot reliably distinguish AI-generated video from traditionally produced footage in controlled settings [5]. This has obvious implications for content creation, advertising, and media -- but also for trust and verification, a theme that intersects with the safety discussion below.

### Image Generation

**Midjourney V7** shipped with 35% better prompt understanding and 40% fewer anatomical errors compared to V6 [8]. The V8 Alpha, released March 17, 2026, is 4-5x faster at generation while maintaining V7 quality levels [8]. Midjourney remains the quality leader for still image generation, though Google's ImageFX (within Flow) and OpenAI's DALL-E 3 are competitive for many use cases.

### Audio and Voice

**ElevenLabs v3** supports 70+ languages with emotionally intelligent conversational voice synthesis [9]. Key capabilities include Speech-to-Speech (real-time voice transformation) and Eleven Music (text-to-music generation) [9]. The voice synthesis market is particularly relevant to the agent systems discussed in [Module 03](MODULE-03-single-agent-systems.md) and [Module 04](MODULE-04-multi-agent-orchestration.md) -- agents that can speak naturally open up phone-based and real-time interaction patterns that text-only agents cannot address.

### Multimodal Generation Comparison

| Capability | Leading Platform | Status (Mar 2026) | Key Differentiator |
|-----------|-----------------|-------------------|-------------------|
| Video (long-form) | Sora 2 (OpenAI) | GA | 25-sec max, Disney licensing |
| Video (quality/audio) | Veo 3.1 (Google) | GA | 4K, native 3D spatial audio |
| Video (unified pipeline) | Flow (Google) | GA | Image + video + audio in one tool |
| Image | Midjourney V7/V8a | GA / Alpha | Best prompt fidelity and anatomy |
| Voice synthesis | ElevenLabs v3 | GA | 70+ languages, emotional intelligence |
| Music | ElevenLabs (Eleven Music) | GA | Text-to-music |

---

## Enterprise Agent Governance

> **Volatility warning:** Enterprise governance tooling is pre-mature. Most products discussed here are newly GA or still in preview. Regulatory requirements (EU AI Act) will force rapid iteration through 2026-2027.

The agent systems covered in [Module 03](MODULE-03-single-agent-systems.md) and the orchestration patterns in [Module 04](MODULE-04-multi-agent-orchestration.md) create a governance challenge: when autonomous AI systems act on behalf of employees -- sending emails, modifying databases, executing transactions -- enterprises need visibility, control, and audit trails.

### Microsoft Agent 365

Microsoft's answer is Agent 365, reaching general availability on May 1, 2026 at $15/user/month [10]. It provides:

- **Agent registry:** Central catalog of all agents deployed in the organization, whether built in Copilot Studio ([Module 04](MODULE-04-multi-agent-orchestration.md)) or third-party.
- **Monitoring:** Real-time dashboards showing agent actions, resource consumption, and error rates.
- **Security:** Integration with Entra ID for identity, Purview for data governance, and Defender for threat detection.
- **Compliance:** Audit logs meeting SOC 2 and ISO 27001 requirements, with EU AI Act readiness tooling.

Microsoft's advantage here is its existing enterprise footprint. Agent 365 integrates directly with the Microsoft 365 ecosystem, Azure AD, and the compliance infrastructure that enterprises already operate. No other vendor has an equivalent first-party governance product at this scope.

### The EU AI Act

The EU AI Act becomes fully applicable in August 2026, establishing the world's first comprehensive regulatory framework for AI systems [11]. High-risk AI systems -- which include many enterprise agent applications -- must meet requirements for:

- Risk management and documentation
- Data governance and bias testing
- Human oversight mechanisms
- Transparency (users must know they are interacting with AI)
- Accuracy, robustness, and cybersecurity standards

For the agentic systems discussed throughout this curriculum, the most impactful requirement is human oversight: fully autonomous agents operating without human-in-the-loop approval may not be deployable in EU-regulated contexts without significant architectural changes. This directly affects the multi-agent orchestration patterns in [Module 04](MODULE-04-multi-agent-orchestration.md), where autonomous delegation chains will need interruption points for human review.

### Cross-Platform Governance Gap

Outside of Microsoft, governance tooling is fragmented. Anthropic provides usage dashboards and audit logs via the API but no dedicated governance product. OpenAI's enterprise tier includes admin controls and SSO but lacks the agent-specific monitoring that Agent 365 offers. Google's Vertex AI platform has model monitoring but limited agent-level governance. The open-source ecosystem ([Module 05](MODULE-05-openclaw-and-open-agents.md)) has essentially no governance tooling -- a significant barrier to enterprise OpenClaw adoption.

Gartner projects that 40% of enterprise applications will incorporate agentic AI capabilities by end of 2026 [12]. At the same time, they predict that 40%+ of agentic AI projects will be canceled by 2027, largely due to governance, reliability, and integration failures [12]. The governance gap is a primary reason the technology's adoption curve may be slower than the hype suggests.

---

## Safety and Alignment

The safety landscape extends well beyond regulatory compliance into fundamental questions about how AI systems behave, particularly as they gain agency.

### Platform Safety Approaches

Each major platform approaches safety differently, reflecting their organizational philosophies as described in [Module 00](MODULE-00-landscape-overview.md):

**Anthropic** positions safety as its founding mission and competitive differentiator. Constitutional AI (CAI) embeds behavioral principles into the model training process itself. Claude's extended thinking ([Module 01](MODULE-01-models-and-intelligence.md)) provides inspectable reasoning traces, giving users and auditors visibility into the model's decision process. Anthropic publishes detailed model cards and maintains the most transparent safety evaluation process among the major providers [F1].

**OpenAI** takes a more iterative, deployment-driven approach. Safety boundaries are adjusted based on real-world usage data. The o-series reasoning models ([Module 01](MODULE-01-models-and-intelligence.md)) include internal safety reasoning but the chain-of-thought is summarized rather than fully exposed. OpenAI's preparedness framework defines risk levels and mitigation protocols for each capability tier [F2].

**Google** leverages scale and breadth. DeepMind's safety research focuses on formal verification, interpretability, and adversarial robustness. In practice, Gemini's safety filters tend toward conservative content restriction, which shows up as higher false-positive refusal rates compared to Claude or ChatGPT [F3].

### Agent-Specific Safety Challenges

The transition from chatbots to agents (the central arc from [Module 03](MODULE-03-single-agent-systems.md) through [Module 04](MODULE-04-multi-agent-orchestration.md)) introduces safety challenges that static model evaluation does not capture:

- **Action irreversibility:** A chatbot can generate incorrect text; an agent can delete files, send emails, or execute transactions. The sandboxing patterns discussed in [Module 03](MODULE-03-single-agent-systems.md) are a first line of defense but not sufficient for high-stakes actions.
- **Delegation chains:** In multi-agent systems ([Module 04](MODULE-04-multi-agent-orchestration.md)), the parent agent's safety constraints must propagate to subagents. Context isolation helps contain scope but also reduces the subagent's ability to recognize when it is being asked to do something the parent should not have authorized.
- **Tool supply chain:** MCP servers ([Module 06](MODULE-06-mcp-integration-layer.md)) and ClawHub skills ([Module 05](MODULE-05-openclaw-and-open-agents.md)) introduce third-party code into agent execution paths. The 12-20% malicious skill rate on ClawHub [W25] demonstrates that tool ecosystems are already active attack surfaces.

### The Verification Problem

As multimodal generation quality crosses the indistinguishability threshold (see above), verifying the provenance and authenticity of content becomes critical. The C2PA (Coalition for Content Provenance and Authenticity) standard for content credentials is supported by Adobe, Microsoft, Google, and others, but adoption is fragmented. No major AI generation platform embeds C2PA credentials by default as of March 2026. This is a gap that will need to close before AI-generated media becomes fully mainstream.

---

## Open vs. Closed Ecosystems

> **Volatility warning:** The open-vs-closed dynamic is the single most volatile axis in the AI industry. Market share, model quality, and regulatory treatment can shift dramatically within a quarter.

This tension runs through the entire curriculum -- from the ecosystem map in [Module 00](MODULE-00-landscape-overview.md) to the OpenClaw deep-dive in [Module 05](MODULE-05-openclaw-and-open-agents.md) to the API economics in [Module 09](MODULE-09-developer-platforms-apis.md). The capstone view reveals a market in structural transition.

### The Performance Gap Has Closed

In 2023, closed models held a 17.5 percentage point lead over open models on standard knowledge benchmarks. By March 2026, that gap has effectively closed to near zero [13]. On any given benchmark, the best open model typically reaches ~90% of the best closed model's score at the time of release, and narrows further as the open community fine-tunes and iterates [13].

This does not mean open and closed models are interchangeable. Closed models still lead in:
- Maximum context window size (Gemini's 2M tokens has no open equivalent)
- Integrated tool use and agentic capabilities
- Safety alignment and content filtering consistency
- Enterprise support, SLAs, and compliance certifications

Open models lead in:
- Cost: 87% cheaper inference on average [13]
- Customization: full fine-tuning, merging, quantization
- Deployment flexibility: on-premise, air-gapped, edge
- Transparency: weights and (sometimes) training data are inspectable

### Market Structure: Revenue vs. Usage

The economic picture is paradoxical. Closed models capture approximately 96% of AI industry revenue and handle roughly 80% of all token usage [13]. Yet open model downloads are growing faster, with Chinese models (Qwen dominant among them) now accounting for 41% of global model downloads [13]. The projected trajectory is a 50-50 open/closed split in usage (not revenue) by end of 2026 [13].

### MCP as the Bridge

The Model Context Protocol ([Module 06](MODULE-06-mcp-integration-layer.md)) is emerging as the connective tissue between open and closed ecosystems. With 19,700+ servers in the registry and 97 million+ monthly SDK downloads [14], MCP provides a universal integration layer that works regardless of which model -- open or closed -- is behind the client. Anthropic's donation of MCP to the Linux Foundation's Agentic AI Foundation [W30] was a deliberate move to cement this neutrality. For builders, this means that investments in MCP servers and tooling are hedge-compatible: they work with Claude, ChatGPT, Gemini, and open-source models alike.

### Geopolitical Dimensions

The open-vs-closed question is acquiring geopolitical weight. An estimated 35% of countries are expected to be locked into regional AI platform dependencies by 2027 [15]. China's open-source strategy (particularly through Alibaba's Qwen family and DeepSeek) is both a competitive weapon and a soft-power tool, providing AI capabilities to regions and organizations that cannot or will not depend on US-based closed platforms. The EU AI Act's transparency requirements also tilt toward open models, which can more easily demonstrate compliance through inspectable weights and training procedures.

---

## What to Watch: Upcoming Events

Three events in the next 90 days are likely to reshape significant parts of this curriculum.

### Google I/O 2026 (May 19-20)

Expected announcements [16]:
- **Next-generation Gemini models** -- likely Gemini 3.5 or a new architecture, potentially extending the context window beyond 2M tokens
- **Android 17** -- deeper on-device AI integration, expanded AICore capabilities
- **Project Astra AR glasses** -- consumer hardware with real-time multimodal AI, bridging the on-device and cloud split
- **Agentic Chrome** -- browser-native agent capabilities, directly competing with Anthropic's computer use and OpenAI's Operator

Curriculum impact: Likely updates to [Module 01](MODULE-01-models-and-intelligence.md) (models), [Module 03](MODULE-03-single-agent-systems.md) (agents), and [Module 08](MODULE-08-consumer-ai-comparison.md) (comparison tables).

### Microsoft Build 2026 (June 2-3, San Francisco)

Expected announcements [17]:
- **Copilot stack evolution** -- deeper Copilot Studio integration with Agent 365 governance
- **Azure OpenAI updates** -- new model deployments, potentially GPT-5 Azure availability
- **Enterprise governance tooling** -- expanded Agent 365 capabilities post-GA

Curriculum impact: Likely updates to [Module 04](MODULE-04-multi-agent-orchestration.md) (orchestration) and [Module 09](MODULE-09-developer-platforms-apis.md) (APIs).

### WWDC 2026 (June 8-12)

Expected announcements [18]:
- **iOS 27** -- LLM-powered Siri ("Campo"), the most significant Siri overhaul since its launch
- **Core AI framework** -- replacing Core ML as the primary on-device AI framework, signaling Apple's intent to make AI a first-class development platform
- **Apple Intelligence expansion** -- broader device support, new on-device capabilities, potentially expanded PCC services

Curriculum impact: Likely updates to [Module 01](MODULE-01-models-and-intelligence.md) (models), this module (on-device AI), and [Module 08](MODULE-08-consumer-ai-comparison.md) (comparison).

### Event Impact Matrix

| Event | Date | Modules Most Affected | Key Watch Items |
|-------|------|----------------------|-----------------|
| Google I/O | May 19-20 | 01, 03, 08, 10 | Gemini 3.5, Astra glasses, Agentic Chrome |
| MS Build | June 2-3 | 04, 09, 10 | Agent 365 post-GA, Azure OpenAI updates |
| WWDC | June 8-12 | 01, 08, 10 | LLM Siri, Core AI framework, PCC expansion |

---

## The Investment Thesis and Adoption Reality

Goldman Sachs estimates $527 billion in global AI capital expenditure for 2026 [15]. This is not speculative -- it is committed infrastructure spending by hyperscalers, enterprises, and sovereign funds. The question is not whether AI is being adopted, but where the returns will materialize.

Gartner's dual prediction captures the tension: 40% of enterprise applications will incorporate agentic AI by end of 2026, but 40%+ of agentic AI projects will be canceled by 2027 [12]. The gap between those two numbers represents the governance, reliability, and integration challenges discussed throughout this curriculum -- particularly in [Module 03](MODULE-03-single-agent-systems.md) (agent reliability), [Module 04](MODULE-04-multi-agent-orchestration.md) (orchestration complexity), and [Module 05](MODULE-05-openclaw-and-open-agents.md) (open ecosystem security).

The pattern is familiar from previous technology waves: infrastructure investment leads, applications follow with high failure rates, and the survivors define the next paradigm. What is different this time is the speed -- the entire cycle from "interesting research result" to "$527B in capex" has compressed into roughly three years.

---

## Key Takeaways

1. **On-device AI is a privacy and latency play, not a performance play.** Cloud models will remain more capable, but on-device adoption runs 3x higher when users have the choice, driven by privacy preferences.

2. **Multimodal generation has crossed the quality threshold.** AI-generated video is indistinguishable from traditional footage in controlled tests. The market has doubled in two years to $3.43B.

3. **Enterprise governance is the bottleneck for agent adoption.** Microsoft's Agent 365 (GA May 2026) is the first comprehensive solution; other platforms lag significantly.

4. **The EU AI Act (August 2026) will force architectural changes** to agentic systems, particularly around human oversight requirements and transparency.

5. **The open-closed performance gap has closed.** Open models match closed models on benchmarks but closed models still capture 96% of revenue and lead in agentic capabilities.

6. **MCP is the ecosystem hedge.** With 19,700+ servers and 97M+ SDK monthly downloads, MCP investments work across both open and closed platforms.

7. **$527B in AI capex is committed for 2026,** but 40%+ of agentic AI projects may be canceled by 2027 due to governance and reliability gaps.

8. **Google I/O, MS Build, and WWDC 2026 will each require curriculum updates** -- particularly for models, agents, on-device AI, and consumer comparison tables.

9. **Geopolitical platform lock-in is emerging.** 35% of countries may be dependent on regional AI platforms by 2027, with Chinese open-source models as a major vector.

10. **The speed of this cycle is unprecedented.** Three years from research to half-trillion-dollar infrastructure commitment. The curriculum itself is a living document because the frontier does not hold still.

---

## Cross-References

- [Module 00: Landscape Overview](MODULE-00-landscape-overview.md) -- Platform ecosystem structure; competitive dynamics
- [Module 01: Models & Intelligence Tiers](MODULE-01-models-and-intelligence.md) -- Model lineups, reasoning modes, multimodal understanding
- [Module 02: Context Engineering](MODULE-02-context-engineering.md) -- Context windows, memory systems, tiered inference relevance
- [Module 03: Single-Agent Systems](MODULE-03-single-agent-systems.md) -- Agent architecture, sandboxing, safety models
- [Module 04: Multi-Agent Orchestration](MODULE-04-multi-agent-orchestration.md) -- Delegation patterns, governance needs, Agent 365 context
- [Module 05: OpenClaw & Open Agent Ecosystem](MODULE-05-openclaw-and-open-agents.md) -- Open ecosystem security, ClawHub risks, governance gap
- [Module 06: MCP & the Integration Layer](MODULE-06-mcp-integration-layer.md) -- MCP as ecosystem bridge, registry scale, Linux Foundation donation
- [Module 07: Skills, Plugins & Automation](MODULE-07-skills-plugins-automation.md) -- Skills ecosystems, automation platforms
- [Module 08: Consumer AI Comparison](MODULE-08-consumer-ai-comparison.md) -- Feature comparisons likely to shift after upcoming events
- [Module 09: Developer Platforms & APIs](MODULE-09-developer-platforms-apis.md) -- API economics, platform selection, open-vs-closed cost analysis

---

## Sources

1. On-device AI user preference and adoption statistics. Research data, 2026. [UNVERIFIED]
2. Google AICore and ML Kit GenAI APIs documentation. https://developer.android.com/ai [Accessed 2026-03-21]
3. Apple Intelligence and Private Cloud Compute. Based on Apple announcements and reporting, 2025-2026. [UNVERIFIED]
4. Qualcomm Snapdragon Wear Elite (MWC 2026) and X2 Plus (CES 2026) announcements. https://www.qualcomm.com/news [Accessed 2026-03-21]
5. AI video generation market statistics. Grand View Research / industry analysis, 2026. [UNVERIFIED]
6. OpenAI Sora 2 and Disney partnership. OpenAI announcements, 2026. [UNVERIFIED]
7. Google Veo 3.1 and Flow creative studio. Google Blog, February 2026. https://blog.google/technology/ai/google-flow/ [Accessed 2026-03-21]
8. Midjourney V7 and V8 Alpha. Midjourney announcements, March 2026. https://midjourney.com [Accessed 2026-03-21]
9. ElevenLabs v3 capabilities. https://elevenlabs.io [Accessed 2026-03-21]
10. Microsoft Agent 365 GA announcement. Microsoft Blog, 2026. https://www.microsoft.com/en-us/microsoft-365/blog/ [Accessed 2026-03-21]
11. EU AI Act timeline and requirements. European Commission. https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai [Accessed 2026-03-21]
12. Gartner predictions on agentic AI adoption and project cancellation rates. Gartner, 2026. [UNVERIFIED]
13. Open vs. closed model performance, cost, and market share data. Research data aggregation, 2026. [UNVERIFIED]
14. MCP registry and SDK download statistics. https://registry.modelcontextprotocol.io and https://modelcontextprotocol.io [Accessed 2026-03-21]
15. Goldman Sachs AI capex estimate ($527B) and geopolitical platform lock-in projection. Goldman Sachs Research, 2026. [UNVERIFIED]
16. Google I/O 2026 expected announcements. Based on public reporting and Google previews. [UNVERIFIED]
17. Microsoft Build 2026 expected announcements. Based on public reporting and Microsoft previews. [UNVERIFIED]
18. WWDC 2026 expected announcements. Based on public reporting and Apple previews. [UNVERIFIED]
