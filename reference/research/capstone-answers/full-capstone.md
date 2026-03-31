# Full Capstone Expert Answer: European Healthcare Company AI Strategy

**Modules synthesized:** All 11 (M00-M10)
**Scenario:** European healthcare company, 500 employees, 3 countries, GDPR + health data regulations, $50K/year budget

---

## Scenario

A European healthcare company (500 employees across 3 EU countries) needs to deploy AI across four domains: clinical documentation, patient scheduling, research literature review, and internal knowledge management. They are subject to GDPR, national health data regulations, and the EU AI Act (fully applicable August 2026). Budget: $50,000/year for AI tools and API costs.

## Expert Answer

### 1. Platform Selection (Modules 00, 08, 09)

The regulatory constraints narrow the platform field immediately. GDPR and health data regulations require data residency guarantees, audit trails, and the ability to demonstrate compliance -- capabilities that eliminate most consumer-tier products and all open-source options without substantial in-house governance work.

**Primary platform: Azure OpenAI Service.** Azure provides HIPAA BAA eligibility, EU data residency (deploy in West Europe or North Europe regions), virtual network isolation via private endpoints, and Azure Active Directory integration for identity management. The 15-40% overhead over direct OpenAI pricing (Module 09) is justified by compliance infrastructure that would cost far more to build independently. Microsoft Foundry gives access to 11,000+ models including OpenAI and Anthropic models through a single compliance-certified platform.

**Secondary platform: Anthropic Messages API (via Amazon Bedrock EU region).** For the research literature review use case, Claude Opus 4.6's reasoning quality is measurably superior (Module 01). Accessing Anthropic via Bedrock provides AWS compliance controls, EU data residency, and avoids direct API key management. Prompt caching at 90% discount (Module 09) is critical for the repeated system prompts in research workflows.

**Rejected: Google Gemini.** While cost-competitive (Module 09), Google's free-tier data-use policy (data may improve Google products) is incompatible with health data. Vertex AI's enterprise tier resolves this but adds complexity without a compelling advantage over Azure for this use case. **Rejected: OpenClaw/self-hosted.** Module 05 documents the governance gap (no enterprise governance tooling) and security risks (12-20% malicious skill rate). Healthcare regulatory environments cannot accept these risks.

### 2. Model Selection Per Use Case (Modules 01, 09)

Model selection is the single largest cost lever (Module 09: 60-90% savings from choosing the right tier).

| Use Case | Model | Rationale | Est. Monthly Cost |
|----------|-------|-----------|------------------|
| Clinical documentation | GPT-5.4 Mini via Azure | Structured summarization of clinical notes; mid-tier sufficient; low-latency requirement | ~$800 |
| Patient scheduling | GPT-5.4 Nano via Azure | Simple intent classification and slot-filling; budget tier handles this well; batch-eligible for non-urgent scheduling | ~$200 |
| Research literature review | Claude Opus 4.6 via Bedrock | Complex reasoning across long documents; 1M token context for multi-paper synthesis; quality is paramount | ~$1,500 |
| Internal knowledge management | Claude Sonnet 4.6 via Bedrock | RAG queries against internal knowledge base; mid-tier balances quality and cost; prompt caching on stable system prompts | ~$600 |

**Total estimated API costs: ~$3,100/month ($37,200/year)**, leaving $12,800/year for tooling, infrastructure, and governance.

### 3. Agent Architecture (Modules 03, 04)

Not every use case needs agents. The gather-act-verify loop (Module 03) adds complexity and cost that is only justified when tasks require multi-step autonomous action.

**Clinical documentation: No agent needed.** This is a single-turn summarization task. A well-designed prompt with structured output (Module 09) handles it. The model receives clinical notes, produces a structured summary, and a clinician reviews it. Human-in-the-loop is inherent.

**Patient scheduling: No agent needed.** Intent classification and slot-filling are stateless tasks. A function-calling flow (Module 09) routes scheduling requests to the calendar system. No autonomous action.

**Research literature review: Single agent with tool use.** The research assistant needs to: search the internal knowledge base, retrieve relevant papers, summarize across documents, and draft sections of reports. This is a single-agent workflow (Module 03) with MCP tools for knowledge base access. The agent operates in a supervised mode -- all output goes to a researcher for review before any action.

**Internal knowledge management: No agent needed.** Standard RAG pattern (Module 02). User queries the knowledge base, the system retrieves relevant chunks, the model synthesizes an answer with citations. No autonomous action required.

**Compliance workflow (bonus -- the scenario implies regulatory monitoring):** If the company monitors regulatory changes, this warrants a multi-agent system (Module 04). A lead agent monitors for new documents (event-driven trigger via Power Automate). A researcher subagent analyzes the document against internal policies. A writer subagent drafts update recommendations. All output routes through a human review gate before any policy changes are made -- this satisfies the EU AI Act's human oversight requirement for high-risk systems.

### 4. Integration Strategy (Modules 06, 07)

**MCP servers (Module 06):** Two custom MCP servers are needed:
- **Internal knowledge base server** (STDIO transport, local deployment). Exposes the company's document repository as MCP resources and a search tool. STDIO because it runs on the same infrastructure as the AI application -- no network exposure of health data.
- **Clinical documentation system server** (Streamable HTTP with OAuth 2.1). Connects the documentation summarization workflow to the EHR (Electronic Health Record) system. OAuth 2.1 because it involves cross-system authentication with the EHR vendor's API.

**Automation (Module 07):** Power Automate for event-driven triggers (regulatory document monitoring, scheduled report generation). Power Automate integrates natively with the Microsoft ecosystem and provides audit trails that satisfy compliance requirements. Cost: ~$15/user/month for the 10 users who need automation access = $150/month ($1,800/year).

**Zapier MCP is not recommended** for this use case. While Zapier bridges 8,000+ apps (Module 07), health data should not traverse Zapier's infrastructure. Keep all integration paths within compliance-certified platforms.

### 5. Governance Framework (Module 10)

**Agent 365** ($15/user/month) provides:
- Centralized agent registry for all deployed AI workflows
- Real-time monitoring via Microsoft Defender integration
- Entra ID (Azure AD) for identity management across all 3 countries
- Microsoft Purview for data loss prevention and information barriers (critical for patient data)
- EU AI Act readiness tooling (compliance becomes mandatory August 2026)

Deploy Agent 365 for the 50 employees who interact with AI systems: $750/month ($9,000/year).

**EU AI Act compliance architecture:**
- Clinical documentation and patient scheduling are likely high-risk AI systems under the Act (healthcare domain). They require: risk documentation, human oversight mechanisms (clinician review for all AI outputs), transparency (patients must know they interact with AI), and accuracy monitoring.
- Human-in-the-loop gates are already architecturally present (clinician reviews summaries, staff confirms scheduling suggestions). The governance layer formalizes and audits these gates.

### 6. Cost Optimization (Modules 02, 09)

Four optimization levers applied:

1. **Model tiering** (applied above): Budget models for scheduling, mid-tier for documentation and knowledge management, flagship only for research. Savings: ~60% vs. using flagship for everything.
2. **Prompt caching** (Module 09): The research assistant and knowledge management system both use stable system prompts (instructions, formatting rules, citation requirements). Anthropic's 90% cache discount applies. Azure OpenAI's automatic 50% caching applies to the documentation and scheduling workflows. Estimated additional savings: ~25%.
3. **Batch processing** (Module 09): Patient scheduling requests that are not time-critical (e.g., next-day appointment optimization) can be batched for 50% discount. Research summarization jobs run overnight as batch. Estimated additional savings: ~15% on eligible workloads.
4. **RAG scope reduction** (Module 02): For knowledge management queries, reduce retrieval from 20 chunks to 5 highly relevant chunks. This cuts input token costs by 75% for that workload.

### 7. Budget Summary

| Line Item | Monthly | Annual |
|-----------|---------|--------|
| Azure OpenAI API (clinical docs + scheduling) | $1,000 | $12,000 |
| Anthropic via Bedrock (research + knowledge mgmt) | $2,100 | $25,200 |
| Agent 365 (50 users) | $750 | $9,000 |
| Power Automate (10 users) | $150 | $1,800 |
| MCP server hosting (Azure, minimal compute) | $100 | $1,200 |
| **Total** | **$4,100** | **$49,200** |

Within the $50,000/year budget with $800 contingency.

### 8. Frontier Considerations (Module 10)

**On-device AI:** For patient-facing kiosks or tablets in waiting rooms, on-device models (Gemini Nano via Android tablets) could handle scheduling queries with zero data leaving the device. This is a privacy-optimal solution for the most sensitive interaction point. However, Apple's lack of a public on-device API rules out iOS tablets for this purpose.

**Post-WWDC assessment:** If Apple ships LLM Siri with healthcare-relevant capabilities at WWDC 2026, reassess the patient-facing interaction layer. Apple's Private Cloud Compute model (data processed but never retained, cryptographic guarantees) could be compelling for health data.

**Post-Google I/O assessment:** If Google announces Agentic Chrome or expanded Gemini capabilities, reassess whether Gemini's cost advantage justifies adding a third platform for specific workloads.

**Regulatory monitoring:** The EU AI Act becomes fully applicable in August 2026. The governance architecture (Agent 365 + human oversight gates) is designed for compliance from day one. Monitor for national implementation differences across the 3 EU countries.