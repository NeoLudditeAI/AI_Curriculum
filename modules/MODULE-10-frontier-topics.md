# Module 10: Frontier Topics

**Last updated:** 2026-03-21
**Status:** COMPLETE
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

The models covered in [Module 01](MODULE-01-models-and-intelligence.md) run in data centers, but a parallel track is pushing inference onto phones, laptops, and wearables. The motivation is straightforward: latency under 20ms (vs. 200-500ms for cloud round-trips), offline availability, and privacy guarantees that no server-side architecture can match. User surveys consistently show strong preference for on-device processing -- a 2026 Malwarebytes survey found 90% of respondents do not trust AI with their data, and multiple studies report that users frequently decline cloud AI features they would otherwise use when on-device alternatives are unavailable [1].

### Google: Gemini Nano and AICore

Google's approach embeds Gemini Nano directly into Android via the AICore system service, available on Pixel 8 and later devices. Developers access it through ML Kit GenAI APIs, which expose capabilities including summarization, proofreading, Smart Reply, and Call Notes [2]. This is not a toy demo -- Call Notes, which transcribes and summarizes phone calls entirely on-device, shipped as a default feature on Pixel 9 and newer.

The strategic significance is that Google controls the OS, the chipset (Tensor), and the model. This vertical integration mirrors the platform-ecosystem pattern described in [Module 00](MODULE-00-landscape-overview.md), but pushes it all the way down to silicon. No other player has this depth in mobile.

### Apple Intelligence and Private Cloud Compute

Apple's on-device model is a ~3 billion parameter transformer optimized for Apple Silicon, running natively on iPhone 15 Pro and later, all M-series Macs, and recent iPads [3]. For tasks exceeding on-device capacity, Apple routes to Private Cloud Compute (PCC) -- custom Apple Silicon servers where data is processed but never retained, with cryptographic guarantees that Apple itself cannot access user data [3].

The gap in Apple's strategy is conversational AI. Siri's current implementation remains intent-based, not LLM-powered. The widely reported "LLM Siri" initiative aims to ship a true LLM-powered Siri, expected to debut at WWDC 2026 [3]. A notable January 2026 partnership with Google will integrate Gemini into Apple's foundation models for specific tasks, with Apple reportedly paying ~$1B/year for access to a custom 1.2T parameter Gemini model — an acknowledgment that Apple's in-house models lag behind in general-purpose reasoning [3].

### Qualcomm: The Hardware Enabler

Qualcomm's role is less visible to consumers but structurally important. The Snapdragon Wear Elite platform, announced at MWC 2026, supports models up to 2 billion parameters on a wearable form factor — the first wearable chip with a dedicated Hexagon NPU [4]. The Snapdragon X2 Plus, shown at CES 2026, delivers 80 TOPS of NPU performance for laptops [4]. These chips define the ceiling for what on-device models can do -- and that ceiling is rising fast enough that models in the Gemini Nano and Apple Intelligence class will have significantly more headroom by late 2026.

### On-Device vs. Cloud: The Emerging Split

The practical implication, building on the context engineering principles in [Module 02](MODULE-02-context-engineering.md), is a tiered inference architecture: on-device for latency-sensitive, privacy-critical, or offline tasks; cloud for complex reasoning, large context windows, and tasks requiring the frontier models discussed in [Module 01](MODULE-01-models-and-intelligence.md). The engineering challenge is making this split invisible to users. Apple's PCC is the most ambitious attempt at this seamless handoff; Google's AICore is the most developer-accessible.

| Platform | On-Device Model | Parameters | Key Hardware | Latency | Developer Access |
|----------|----------------|------------|--------------|---------|-----------------|
| Google | Gemini Nano | Not disclosed | Tensor G3+ (Pixel 8+) | <20ms | ML Kit GenAI APIs |
| Apple | Apple Foundation Model | ~3B | A17 Pro+, M-series | <20ms | On-device only (no public API) |
| Qualcomm | OEM-dependent | Up to 2B | Snapdragon Wear Elite, X2 Plus | Varies by model | Qualcomm AI Engine SDK |

Early data suggests on-device AI features see significantly higher adoption than equivalent cloud features when users are given the choice [1], suggesting that privacy and latency are not niche concerns but primary drivers of AI product adoption.

---

## Multimodal Generation: From Text to Everything

> **Volatility warning:** Multimodal generation capabilities, pricing, and content policies are changing monthly. Licensing deals (e.g., Disney-Sora) are creating new categories that did not exist six months ago.

[Module 01](MODULE-01-models-and-intelligence.md) covered multimodal *understanding* -- models that can see images, hear audio, and process video. This section covers the other direction: models that *generate* rich media. The AI video generator market alone is estimated at $850M-$1.8B in 2026 (depending on scope definition), with the broader AI video market reaching approximately $3.4B [5]. Growth rates exceed 35% year-over-year across all segments.

### Video Generation

**OpenAI Sora 2** reached general availability and generates videos up to 25 seconds in length. The headline development is commercial licensing: Disney made a $1 billion equity investment in OpenAI alongside a three-year licensing agreement granting Sora access to 200+ animated, masked, and creature characters from Disney, Marvel, Pixar, and Star Wars — though talent likenesses remain excluded [6]. This is the first major instance of AI video generation operating within traditional IP frameworks rather than around them, and it sets a template that other studios are likely to follow.

**Google Veo 3.1** (GA since January 13, 2026) generates video at 720p, 1080p, and 4K resolution in clips up to 8 seconds [7]. Its unique differentiator is native 3D spatial audio generation — producing three distinct audio layers (dialogue with lip-sync, contextual effects, ambient background) — a capability no other video model matches as of March 2026. Veo sits within the broader Google Flow creative studio (launched February 2026), which merges the previously separate Whisk, ImageFX, and Veo tools into the first unified image-to-video-to-audio pipeline [7].

The quality threshold has been crossed: studies show 95%+ of viewers cannot reliably distinguish AI-generated video from traditionally produced footage in controlled settings [5]. This has obvious implications for content creation, advertising, and media -- but also for trust and verification, a theme that intersects with the safety discussion below.

### Image Generation

**Midjourney V7** shipped with significantly improved prompt fidelity and fewer anatomical errors compared to V6 [8]. The V8 Alpha, released March 17, 2026, is 4-5x faster at generation with dramatically improved text rendering, and complex multi-element compositions that were partially ignored in V7 now render with noticeably higher fidelity [8]. Midjourney remains the quality leader for still image generation, though Google's ImageFX (within Flow) and OpenAI's GPT Image 1.5 are competitive for many use cases.

### Audio and Voice

**ElevenLabs v3** supports 70+ languages with emotionally intelligent conversational voice synthesis [9]. Key capabilities include Speech-to-Speech (real-time voice transformation) and Eleven Music (text-to-music generation) [9]. The voice synthesis market is particularly relevant to the agent systems discussed in [Module 03](MODULE-03-single-agent-systems.md) and [Module 04](MODULE-04-multi-agent-orchestration.md) -- agents that can speak naturally open up phone-based and real-time interaction patterns that text-only agents cannot address.

### Multimodal Generation Comparison

| Capability | Leading Platform | Status (Mar 2026) | Key Differentiator |
|-----------|-----------------|-------------------|-------------------|
| Video (long-form) | Sora 2 (OpenAI) | GA | 25-sec max, Disney $1B investment + licensing |
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

### Enterprise Governance Comparison

| Capability | Microsoft (Agent 365) | Anthropic | OpenAI | Google | OpenClaw |
|-----------|----------------------|-----------|--------|--------|----------|
| **Agent registry** | Centralized catalog (GA May 2026) [10] | None | None | None | None |
| **Real-time monitoring** | Defender integration [10] | API usage dashboards | Admin dashboard | Vertex AI monitoring | None |
| **Identity management** | Entra ID (full IAM) [10] | API keys only | Project-scoped keys, SSO | IAM / service accounts | OS-level permissions |
| **Compliance / audit** | Purview (DLP, retention, barriers) [10] | Audit logs (API) | Enterprise audit logs | Cloud Audit Logs | None |
| **Data governance** | Information barriers, DLP policies [10] | None | None | Vertex AI data governance | None |
| **Content filtering** | Azure AI Content Safety | Constitutional AI guardrails [F1] | Moderation API, guardrails [F2] | Safety filters [F3] | None (user-managed) |
| **Human oversight controls** | Plan approval gates [F4] | Agent SDK hooks [F1] | Guardrails primitive [F2] | Vertex AI threat detection [F3] | None |
| **EU AI Act readiness** | Readiness tooling included [10] | Not announced | Not announced | Not announced | N/A |
| **Pricing** | $15/user/month (standalone) [10] | Included in API pricing | Enterprise tier | Vertex AI pricing | Free (no governance) |

The table makes concrete what the prose above describes: Microsoft is the only platform with a purpose-built, comprehensive governance product. Other platforms offer individual capabilities (content filtering, audit logs) but lack the integrated registry-identity-compliance-monitoring stack that enterprise deployments require.

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
- **Tool supply chain:** MCP servers ([Module 06](MODULE-06-mcp-integration-layer.md)) and ClawHub skills ([Module 05](MODULE-05-openclaw-and-open-agents.md)) introduce third-party code into agent execution paths. The 12-20% malicious skill rate on ClawHub [20] demonstrates that tool ecosystems are already active attack surfaces.

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

The Model Context Protocol ([Module 06](MODULE-06-mcp-integration-layer.md)) is emerging as the connective tissue between open and closed ecosystems. With 19,700+ servers in the registry and 97 million+ monthly SDK downloads [14], MCP provides a universal integration layer that works regardless of which model -- open or closed -- is behind the client. Anthropic's donation of MCP to the Linux Foundation's Agentic AI Foundation [21] was a deliberate move to cement this neutrality. For builders, this means that investments in MCP servers and tooling are hedge-compatible: they work with Claude, ChatGPT, Gemini, and open-source models alike.

### Geopolitical Dimensions

The open-vs-closed question is acquiring geopolitical weight. An estimated 35% of countries are expected to be locked into regional AI platform dependencies by 2027 [16]. China's open-source strategy (particularly through Alibaba's Qwen family and DeepSeek) is both a competitive weapon and a soft-power tool, providing AI capabilities to regions and organizations that cannot or will not depend on US-based closed platforms. The EU AI Act's transparency requirements also tilt toward open models, which can more easily demonstrate compliance through inspectable weights and training procedures.

---

## What to Watch: Upcoming Events

Three events in the next 90 days are likely to reshape significant parts of this curriculum. The predictions below are based on pre-event reporting, developer previews, analyst expectations, and credible leaks as of March 2026. Actual announcements may differ significantly -- treat these as informed speculation, not confirmed information.

### Google I/O 2026 (May 19-20)

Expected announcements (based on public reporting and Google previews) [17]:
- **Next-generation Gemini models** -- likely Gemini 3.5 or a new architecture, potentially extending the context window beyond 2M tokens
- **Android 17** -- deeper on-device AI integration, expanded AICore capabilities
- **Project Astra AR glasses** -- consumer hardware with real-time multimodal AI, bridging the on-device and cloud split
- **Agentic Chrome** -- browser-native agent capabilities, directly competing with Anthropic's computer use and OpenAI's Operator

Curriculum impact: Likely updates to [Module 01](MODULE-01-models-and-intelligence.md) (models), [Module 03](MODULE-03-single-agent-systems.md) (agents), and [Module 08](MODULE-08-consumer-ai-comparison.md) (comparison tables).

### Microsoft Build 2026 (June 2-3, San Francisco)

Expected announcements (based on public reporting and Microsoft previews) [18]:
- **Copilot stack evolution** -- deeper Copilot Studio integration with Agent 365 governance
- **Azure OpenAI updates** -- new model deployments, potentially GPT-5 Azure availability
- **Enterprise governance tooling** -- expanded Agent 365 capabilities post-GA

Curriculum impact: Likely updates to [Module 04](MODULE-04-multi-agent-orchestration.md) (orchestration) and [Module 09](MODULE-09-developer-platforms-apis.md) (APIs).

### WWDC 2026 (June 8-12)

Expected announcements (based on public reporting and Apple previews) [19]:
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

1. **On-device AI is a privacy and latency play, not a performance play.** Cloud models will remain more capable, but on-device features see significantly higher adoption when users have the choice, driven by privacy preferences.

2. **Multimodal generation has crossed the quality threshold.** AI-generated video is indistinguishable from traditional footage in controlled tests. The broader AI video market has reached approximately $3.4B.

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

1. On-device AI user preference and adoption statistics. Malwarebytes pulse survey (Jan-Feb 2026, 1,235 respondents): 90% do not trust AI with their data. Specific on-device adoption multipliers from secondary aggregation. [PARTIALLY VERIFIED] — W50 in SOURCES.md
2. Google AICore and ML Kit GenAI APIs documentation. https://developer.android.com/ai — W51 in SOURCES.md
3. Apple Intelligence and Private Cloud Compute. Apple ML Research tech reports; Apple-Google Gemini partnership (January 12, 2026). — W52 in SOURCES.md
4. Qualcomm Snapdragon Wear Elite (MWC 2026) and X2 Plus (CES 2026) announcements. — W53 in SOURCES.md
5. AI video generation market statistics. Grand View Research AI Video Generator Market Report. Market size varies by scope: $850M-$1.8B for video generators specifically; ~$3.4B for broader AI video market. — W54 in SOURCES.md
6. OpenAI Sora 2 and Disney partnership. Disney $1B equity investment confirmed. — W55 in SOURCES.md
7. Google Veo 3.1 and Flow creative studio. GA January 13, 2026. — W56 in SOURCES.md
8. Midjourney V7 and V8 Alpha (March 17, 2026). 4-5x speed improvement confirmed. — W57 in SOURCES.md
9. ElevenLabs v3 capabilities. 70+ languages, emotional voice synthesis confirmed. — W58 in SOURCES.md
10. Microsoft Agent 365 GA announcement. May 1, 2026, $15/user/month confirmed. — W59 in SOURCES.md
11. EU AI Act timeline and requirements. Fully applicable August 2, 2026 for high-risk AI systems. — W60 in SOURCES.md
12. Gartner predictions on agentic AI. (a) 40% of enterprise apps will feature AI agents by 2026. (b) 40%+ of agentic AI projects canceled by 2027. — W61 in SOURCES.md
13. Open vs. closed model performance, cost, and market share data. 17.5pp gap to near-zero, 87% cost savings, 96%/80% revenue/usage split all confirmed. — W62 in SOURCES.md
14. MCP registry and SDK download statistics. — W73 in SOURCES.md
15. Goldman Sachs AI capex estimate ($527B). — W63 in SOURCES.md
16. Gartner prediction: 35% of countries locked into regional AI platforms by 2027. — W63b in SOURCES.md
17. Google I/O 2026 confirmed: May 19-20, Mountain View. — W64 in SOURCES.md
18. Microsoft Build 2026 confirmed: June 2-3, San Francisco. — W65 in SOURCES.md
19. WWDC 2026 expected: June 8-12. Not officially announced by Apple as of March 21, 2026; dates based on 9to5Mac, MacRumors, Macworld reporting. — W66 in SOURCES.md
20. OpenClaw/ClawHub Malicious Skills Audit (Snyk). 12-20% malicious skill rate. — W25 in SOURCES.md
21. Anthropic donates MCP to Linux Foundation Agentic AI Foundation. — W30 in SOURCES.md

**Foundation profiles cited as [F1]-[F4]:**
- [F1] Anthropic/Claude Ecosystem Profile (reference/profiles/anthropic-claude.md), March 18, 2026
- [F2] OpenAI/ChatGPT Ecosystem Profile (reference/profiles/openai-chatgpt.md), March 18, 2026
- [F3] Google/Gemini Ecosystem Profile (reference/profiles/google-gemini.md), March 18, 2026
- [F4] Microsoft/Copilot Ecosystem Profile (reference/profiles/microsoft-copilot.md), March 18, 2026
