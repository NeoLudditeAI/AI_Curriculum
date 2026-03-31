# Part 1 Capstone Expert Answer: The Technology Audit

## Scenario

An organization uses: ChatGPT Team (15 users, marketing), Claude Pro (8 users, engineering), GitHub Copilot (8 devs), Gemini via Workspace (40 users, mostly unused), Midjourney (3 users, design). Monthly spend approximately $2,800. CTO wants consolidation.

## Expert Answer

**Current cost breakdown:**
- ChatGPT Business (renamed from Team): 15 users x $30/month = $450
- Claude Pro: 8 users x $20/month = $160
- GitHub Copilot: 8 devs x $10/month = $80
- Gemini via Workspace: likely bundled with existing Workspace licenses (AI add-on varies)
- Midjourney: 3 users x $30/month (Standard) = $90
- **Estimated total: ~$780-1,000/month** (the $2,800 figure likely includes Workspace AI add-ons across 40 users at ~$30-45/user)

**Recommended consolidation strategy:**

The CTO should **not** consolidate to a single platform. Module 00's ecosystem analysis shows that no single provider dominates across all dimensions. Instead, consolidate to **two primary platforms plus one specialist tool**:

1. **Keep Claude (upgrade to Claude Team at $25/seat for engineering).** Module 01 establishes that Claude Opus 4.6 leads on code quality and complex reasoning -- exactly what the engineering team needs. Claude Code's 54% enterprise coding agent market share is evidence of this. At $25/seat for 8 engineers = $200/month. This replaces both Claude Pro and GitHub Copilot -- Claude Code provides superior agentic coding capabilities within the subscription, making Copilot's IDE-integrated approach redundant for this team. **Savings: $80/month (eliminating Copilot).**

2. **Consolidate marketing onto ChatGPT Business.** The marketing team's needs -- content generation, image creation (GPT Image 1.5), voice (Advanced Voice Mode) -- align with OpenAI's consumer-scale and creative breadth strategy. ChatGPT Business at $30/user x 15 = $450/month. This stays the same.

3. **Eliminate the Workspace AI add-on for most of the 40 users.** Module 02's context engineering principles tell us that unused AI tools waste budget. If only a handful of the 40 Workspace users actively use Gemini, downgrade most seats to standard Workspace. Keep Gemini access only for users who demonstrate active use. If the AI add-on costs $30/user/month across 40 users, reducing to 10 active users saves **$900/month**.

4. **Keep Midjourney for design.** At $90/month for 3 users, this is the cheapest line item and provides the highest artistic quality for image generation (Module 01). No platform substitute matches Midjourney's aesthetic quality.

**Projected monthly spend after consolidation:** Claude Team ($200) + ChatGPT Business ($450) + Gemini AI for 10 active users (~$300) + Midjourney ($90) = **~$1,040/month** -- a roughly 63% reduction from $2,800.

**Context engineering advantage:** Claude Team includes Projects with persistent context and custom instructions. The engineering team can create shared projects with coding standards, architecture documentation, and codebase context that persist across sessions -- implementing the Identity and Knowledge layers described in Module 02. With prompt caching on the API side, the team can further optimize costs for any automated workflows. ChatGPT's chat history reference gives the marketing team continuity across campaigns without explicit setup.

The key insight from Module 00's market structure analysis: the consumer pricing convergence at $20-30/seat means the consolidation opportunity is not in switching providers for cheaper per-seat pricing, but in **eliminating unused seats** (the 30 idle Gemini users) and **collapsing redundant tools** (GitHub Copilot when Claude Code covers the same need at higher capability).
