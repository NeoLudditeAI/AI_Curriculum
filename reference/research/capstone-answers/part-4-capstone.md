# Part 4 Capstone Expert Answer: The Platform Evaluation

**Modules covered:** M08 (Consumer AI Comparison), M10 (Frontier Topics)
**Scenario date:** June 2026 (post-Google I/O, post-MS Build)

---

## Scenario

It is June 2026. Google I/O and Microsoft Build have happened. You need to choose a primary AI platform for the next 12 months. Your shortlist: Claude Max ($100/month), ChatGPT Team ($30/user/month), Gemini Business ($24/user/month). Your team has 5 people.

## Expert Answer

**Feature comparison.** By June 2026, all three platforms have converged on core capabilities -- large context windows, agent-mode features, web search, file analysis, and MCP support. The differentiators are at the edges. Claude Max provides the deepest reasoning quality (Opus 4.6 with extended thinking), the most generous context window for individual power users (1M tokens), and the steepest prompt caching discount (90%) if you also use the API. ChatGPT Team provides the broadest single-platform surface area -- text, image generation (GPT Image 1.5), voice (real-time API), video (Sora 2), and the most mature structured output SDK ecosystem. Gemini Business integrates natively with Google Workspace, provides the most generous free-tier API access for prototyping, and after Google I/O likely offers updated models that push the context and multimodal boundaries further.

**Pricing at scale.** For a 5-person team over 12 months: Claude Max is $500/month ($6,000/year) for individual plans -- there is no team discount, and each user operates independently. ChatGPT Team is $150/month ($1,800/year), with shared workspace features, admin controls, and data not used for training. Gemini Business is $120/month ($1,440/year), with Google Workspace integration and enterprise admin. On raw subscription cost, Gemini wins. On API cost (if you build custom tools), Google and Anthropic offer 90% cache discounts while OpenAI offers 50% automatic. The API economics favor Anthropic for high-frequency stable-prompt patterns and Google for cost-sensitive workloads.

**Governance readiness.** Post-Build, Microsoft's Agent 365 ($15/user/month additional) is the only comprehensive governance product, but it is tied to the Microsoft ecosystem, not to ChatGPT directly. For teams deploying agents in regulated industries, Azure OpenAI plus Agent 365 is the governance leader. Anthropic and Google provide API-level audit logs and enterprise admin controls but lack dedicated agent governance products. If EU AI Act compliance matters (it will by August 2026), Microsoft has a structural advantage.

**Frontier trajectory.** Post-Google I/O, watch for Gemini 3.5 and Agentic Chrome -- these could shift Google from cost leader to capability leader in agentic applications. Post-Build, Azure OpenAI's expanded model access (potentially GPT-5 on Azure) and Agent 365 maturation strengthen Microsoft's enterprise play. Anthropic's trajectory favors quality and developer control -- Claude's extended thinking and MCP ecosystem continue to deepen, but the platform surface area remains narrower.

**Recommendation.** For a 5-person technical team that values reasoning quality and API integration: Claude Max for individual deep work plus Gemini Business for collaborative Workspace integration. Total: $620/month ($7,440/year). This provides the best reasoning model (Opus 4.6) alongside the best cost-optimized API (Gemini Flash) and Workspace integration. If governance is a hard requirement, add Azure OpenAI with Agent 365 for regulated workloads. If you must choose one platform: ChatGPT Team provides the broadest capability surface at a moderate price, minimizing the number of tasks that require a second tool.