# ROUND 2 — Curriculum Refinement: Team Leader Prompt

**Document type:** Agent Team Leader prompt — to be provided as the initial instruction when creating the Round 2 Agent Team in Claude Code.

**Created:** 2026-03-21
**Author:** Ryan + Claude (pre-session planning)
**Preceding work:** Round 1 completed all 11 modules to COMPLETE status (43,079 words, 38 researcher agents, 12+ writer agents, 5 reviewer agents, 1 synthesizer pass). See `CURRENT_CYCLE.md` and `blog/2026-03-21-building-the-curriculum.html` for full Round 1 documentation.

---

## Your mission

You are the Team Leader for **Round 2: Curriculum Refinement** of the AI Frontier Curriculum project. Round 1 produced 11 complete module drafts covering the bleeding edge of LLMs, agentic systems, consumer AI tools, and the surrounding ecosystem as of March 2026. Your job is to take this raw, well-researched material and refine it into a polished, deeply authoritative knowledge base — the kind of resource that a technically sophisticated reader would trust as their primary reference.

**You are NOT starting from scratch.** The foundation is solid. Your role is to sharpen, deepen, verify, harmonize, and elevate — not to rewrite.

---

## Critical rules

### 1. NEVER modify Round 1 module files

The files in `modules/` are Round 1 artifacts. **Do not edit them. Do not overwrite them. Do not delete them.**

At the start of this round:
1. Create `modules/round-1-archive/` directory
2. Copy every `MODULE-*.md` file from `modules/` into `modules/round-1-archive/`
3. Only THEN begin work on the files in `modules/` — which are now the Round 2 working copies

This preserves a clean diff between rounds and ensures Round 1 work is never lost.

### 2. Read before acting

Before spawning any teammates or beginning work, read these files in order:
1. `PROJECT-DESCRIPTION.md` — What we're building and why
2. `AGENT-INIT.md` — Operational directives, agent definitions, context engineering rules
3. `CURRICULUM.md` — Master index and module status
4. `CURRENT_CYCLE.md` — Round 1 completion state, open questions, known issues
5. `GLOSSARY.md` — Canonical definitions
6. `SOURCES.md` — Master source registry with verification status
7. `DECISION_LOG.md` — Structural decisions and rationale

### 3. Check AI_INBOX/ at session start

Per project rules (`.claude/rules/00-repo.md`): check `AI_INBOX/` for any files Ryan has dropped since Round 1. Process every file — integrate into the project or move to `AI_TRASH/` with a note. Never silently ignore inbox files. **Note:** This prompt document itself (`ROUND-2-TEAM-LEADER-PROMPT.md`) is in AI_INBOX — after reading it, move it to the project root as a record of Round 2's mandate. Process any other AI_INBOX files normally.

### 4. Update project state files

After Round 2 work is complete:
- Update `CURRENT_CYCLE.md` to reflect Round 2 completion, decisions made, and open items
- Update `CURRICULUM.md` status for any module that changed
- Append Round 2 decisions to `DECISION_LOG.md`
- Add new sources to `SOURCES.md`
- Add new terms to `GLOSSARY.md`
- Write a process blog post to `blog/` documenting Round 2

---

## Round 2 scope: what "refinement" means

Round 2 has seven workstreams. They are listed in priority order — if you must triage, protect the top items.

### Workstream 1: Source verification and factual hardening (HIGHEST PRIORITY)

**Goal:** Eliminate every [UNVERIFIED] tag in the curriculum, or explicitly hedge the claim if verification fails.

**Current state:** Module 10 has 10 unverified sources. Modules 00, 07, and 08 have additional unverified claims (Claude Code ARR, GPT Store size, system prompt extraction, developer preference surveys).

**Instructions:**
- Deploy researcher teammates to verify every [UNVERIFIED] claim against primary sources
- For claims that CAN be verified: replace the [UNVERIFIED] tag with a proper source citation and add the source to SOURCES.md
- For claims that CANNOT be verified: rewrite the sentence to use hedging language ("reportedly," "according to community estimates," "industry analysts suggest") and retain the [UNVERIFIED] tag as an honest signal
- For claims that are CONTRADICTED by research: correct the claim, cite the correcting source, and note the correction inline
- **Conflict resolution:** If two sources contradict each other: (1) prefer official documentation > blogs > secondary journalism > community; (2) within the same tier, prefer the most recent source; (3) if still ambiguous, retain [UNVERIFIED] and hedge language, and flag for human review in DECISION_LOG.md
- **Special attention items:**
  - Module 03, line 256: "$9,000/hour" agent cost estimate — verify or tag [UNVERIFIED]
  - Module 00, lines 116/127 and Module 08, line 247: Claude Code "~$2.5B ARR" — verify or hedge
  - Module 08, line 233: "78% of developers prefer Claude for code" — verify the survey or soften to qualitative language
  - Module 10, source 13: open/closed model performance gap statistics — this is a load-bearing claim; needs a real source
  - Module 10, source 15: Goldman Sachs $527B capex estimate — verify against Goldman Sachs research
  - Module 10, source 12: Gartner agentic AI predictions — verify against Gartner publications

### Workstream 2: Cross-module harmonization

**Goal:** Ensure the curriculum reads as a single coherent work, not 11 independently written documents.

**Instructions:**
- Deploy a synthesizer teammate to audit:
  - **Terminology consistency:** Every instance of a GLOSSARY.md term uses the canonical definition. No module should define the same concept differently.
  - **Pricing consistency:** Model pricing, API costs, and subscription tiers must be identical across all modules that cite them. Known discrepancy: Module 09 prompt caching table vs. Module 02 caching discussion (three Anthropic tiers vs. one mentioned).
  - **Statistics consistency:** When the same statistic appears in multiple modules (e.g., ClawHub skill counts, MCP server counts, market share figures), the numbers must match. Round 1 synthesis fixed some of these but there may be residual inconsistencies.
  - **Cross-reference completeness:** Every module that discusses a topic covered in depth by another module should cross-reference it. Bidirectional means: if Module X links to Module Y, Module Y's cross-references section should link back to Module X. Use the synthesizer to audit all cross-reference pairs in Phase 3.
  - **Citation format standardization:** Round 1 modules use mixed citation styles — some use `[F1][F2]`, others use `[1][2]`, Module 07 mixes both. Standardize ALL inline citations (existing and new) to match SOURCES.md numbering: `[F#]` for foundation profiles, `[W#]` for web sources, `[#]` for module-specific numbered sources. Each module's Sources section should include a brief legend. This is a retroactive standardization — update every module.
  - **Narrative flow:** Does reading Modules 00 → 01 → 02 → ... → 10 in order tell a coherent, building story? Flag any jarring transitions or missing connective tissue.

### Workstream 3: Depth audit and gap filling

**Goal:** Ensure every module meets the depth standard described in PROJECT-DESCRIPTION.md — "not surface-level overviews, but the kind of understanding that lets you make informed architectural decisions."

**Instructions:**
- For each module, a reviewer teammate should evaluate:
  - **Actionable specificity:** Can a reader use this information to make real decisions? Or is it still at "overview" level? Push toward decision-support depth.
  - **Missing subtopics:** Cross-check each module's content against the "Key questions to answer" in PROJECT-DESCRIPTION.md's module plan table. Are all questions answered thoroughly?
  - **Practical examples:** Does the module include concrete examples, code snippets (where relevant), configuration patterns, or decision frameworks? Add them where they would clarify.
  - **Comparison tables:** Are all comparison tables complete, with no placeholder cells or missing rows? Do they include the right dimensions for the comparison?
  - **Volatility warnings:** Are they placed on every topic that could change within 90 days? Standardize format across all modules: use `> ⚠️ **Volatility warning** (review after YYYY-MM-DD): <claim>` blockquote format.
- **Depth expansion guardrail:** Aim for 4,000–5,500 words per module (Modules 01 and 09 may reach 6,000). If gap-filling requires >20% word increase for any module, flag for human review in DECISION_LOG.md rather than implementing unilaterally.
- **Known gaps to investigate:**
  - Module 02: RAG implementation detail is thin (noted in CURRENT_CYCLE.md as a future expansion area). Strengthen the RAG section with architectural patterns, vector DB options, chunking strategies, and when-to-use-RAG decision framework.
  - Module 04: Should include a practical section on **strategic model selection in multi-agent systems** — when to use flagship models vs. fast/cheap models for different agent roles (research, writing, review, synthesis). This is a real-world best practice that emerged from building this curriculum itself. Frame it as a cost-optimization and quality-optimization pattern, not just API trivia.
  - Module 07: Plugin Marketplace size (~500 for Claude) and GPT Store size (~3M+) are unverified. Research and verify or qualify.
  - Module 09: Harmonize prompt caching tiers across all providers — ensure the table is comprehensive and matches Module 02.
  - Module 05: OpenClaw is the fastest-evolving topic. Verify all statistics (star count, skills count, contributor count) against current GitHub state.

### Workstream 4: Metadata and structural polish

**Goal:** Every module is structurally complete and self-consistent.

**Instructions:**
- Update every module's metadata block: status should reflect actual state (not "DRAFTING" if the module is COMPLETE)
- Verify every module follows the skeleton defined in `.claude/rules/modules.md`:
  1. Title and metadata block
  2. Executive summary (3-5 sentences)
  3. Prerequisites
  4. Body sections (H2 major, H3 subsections)
  5. Comparison tables (where applicable)
  6. Key takeaways (5-10 bullet points)
  7. Cross-references
  8. Sources
- Ensure word counts are accurate in metadata and CURRICULUM.md
- Standardize formatting: consistent use of bold, callout blocks, table alignment

### Workstream 5: GLOSSARY.md enrichment

**Goal:** The glossary becomes a standalone reference document, not just an index.

**Instructions:**
- Audit every module for terms that are used but not in GLOSSARY.md. Add them.
- For existing entries: ensure definitions are precise, not circular, and include context about why the term matters.
- Add "Related terms" and "See also" cross-links within the glossary.
- Group terms by domain (Models, Context Engineering, Agents, Protocols, Platforms, Security, etc.) while maintaining alphabetical ordering within groups.

### Workstream 6: SOURCES.md maintenance

**Goal:** The source registry is complete, accurate, and every module citation is traceable.

**Instructions:**
- For each module's inline citations: verify SOURCES.md has a matching entry. For each SOURCES.md entry: confirm it's cited by at least one module (remove orphaned entries, or note as "research gathered but not cited").
- Update the "Referenced By" column to reflect actual usage.
- Spot-check ~20% of URLs for accessibility (404, paywall, domain change). Prioritize checking sources marked "Unverified" or referenced by high-stakes claims.
- Flag any sources older than 90 days on rapidly-evolving topics (model pricing, feature availability, market share) as potentially stale.

### Workstream 7: Process documentation

**Goal:** Leave a clear trail for Round 3.

**Instructions:**
- Write a process blog post (`blog/2026-03-XX-round-2-refinement.html`) with at minimum:
  1. Executive summary (what was refined, why it matters)
  2. Agent team composition and task distribution
  3. Key findings from source verification (even "confirmed accuracy" is a finding worth noting)
  4. Decisions made (cite DECISION_LOG.md entries)
  5. Metrics: [UNVERIFIED] tags resolved, sources verified, cross-references added, words added/removed per module
  6. Round 3 priorities and recommendations for the pedagogical design team
- Update `CURRENT_CYCLE.md` with Round 2 completion state and Round 3 priorities
- Decision log entries should follow the format from AGENT-INIT.md: Date, Context, Decision, Rationale, Alternatives considered, Impact on curriculum. Only log structural decisions (citation format standardization, module depth changes, significant factual corrections). Routine fixes (typos, single-source additions) are tracked in SOURCES.md, not DECISION_LOG.md.

---

## Team composition

Spawn the following teammates. Adjust count based on workload — the numbers below are a starting recommendation.

| Role | Count | Model | Primary workstreams | File ownership |
|------|-------|-------|-------------------|----------------|
| **Source Verifier** | 3 | Opus | WS1 (source verification) | SOURCES.md entries; inline citation corrections in assigned modules |
| **Harmonizer** | 1 | Opus | WS2, WS4, WS5 (cross-module consistency, structure, glossary) | GLOSSARY.md; module metadata blocks; cross-references |
| **Depth Reviewer** | 2 | Opus | WS3 (depth audit and gap filling) | Module body content for assigned modules |
| **Writer** | 2 | Opus | WS3 (drafting new/expanded sections based on reviewer findings) | Module body content for assigned modules |
| **Chronicler** | 1 | Opus | WS6, WS7 (SOURCES.md audit, blog post, CURRENT_CYCLE.md) | SOURCES.md; blog/; CURRENT_CYCLE.md; DECISION_LOG.md |

> **Model policy:** Use Opus 4.6 for all teammates. We are on the Max Plan with headroom to spare. If usage limits are eventually hit, downgrade Source Verifiers to Haiku and Writers/Reviewers to Sonnet — but default to Opus for maximum quality on every task.

### Scaling heuristics

The numbers above are starting recommendations. Scale if needed:
- If [UNVERIFIED] claims exceed 20 total: add 1 Source Verifier per 10-15 additional claims
- If modules flagged for depth expansion exceed 7: add 1 Writer per 3 additional modules
- If cross-module inconsistencies from Harmonizer's Phase 1 audit exceed 10: add 1 Depth Reviewer for cross-check support

### File ownership rules (prevent conflicts)

- **No two teammates edit the same module simultaneously.** Assign modules to specific teammates.
- The Harmonizer owns GLOSSARY.md and cross-reference edits. If a Writer needs a glossary update, they message the Harmonizer.
- The Chronicler owns SOURCES.md, DECISION_LOG.md, CURRENT_CYCLE.md, and blog/. Other teammates send source additions to the Chronicler via messages.
- Module assignment suggestion:
  - Source Verifier A: Modules 00, 01, 02, 10 (heaviest verification load)
  - Source Verifier B: Modules 03, 04, 05
  - Source Verifier C: Modules 06, 07, 08, 09
  - After verification, Writers pick up modules flagged for depth expansion

### Coordination protocol

1. **Phase 1 — Archive and audit (all teammates start here):**
   - Team Leader archives Round 1 modules to `modules/round-1-archive/`
   - Source Verifiers begin WS1 in parallel across their assigned modules
   - Harmonizer begins WS2 cross-module audit (read-only first pass, notes only)
   - Depth Reviewers begin WS3 audit (read-only first pass, notes only)
   - Chronicler begins WS6 SOURCES.md audit

2. **Phase 2 — Verification and expansion (after Phase 1 audits are complete):**
   - Source Verifiers apply corrections to modules
   - Harmonizer applies terminology, citation format, and structural standardization
   - Depth Reviewers hand off gap-fill briefs to Writers
   - Writers draft expanded sections and new content
   - Chronicler collects source additions from all teammates

3. **Phase 3 — Integration and review (after all edits are applied):**
   - Harmonizer does a final cross-module consistency check
   - Depth Reviewers do a final pass on Writer output
   - Chronicler finalizes SOURCES.md, writes blog post, updates CURRENT_CYCLE.md
   - Team Leader synthesizes all findings and updates CURRICULUM.md

---

## Quality gates

A module is "Round 2 COMPLETE" when:
1. Zero [UNVERIFIED] tags remain (either verified or properly hedged)
2. All CURRICULUM.md key topics are covered at decision-support depth
3. Citation format follows the standardized convention
4. Metadata block is accurate (status, date, word count)
5. Cross-references are bidirectional and accurate
6. Terminology matches GLOSSARY.md
7. No pricing, statistics, or factual contradictions with other modules
8. Follows the module skeleton structure completely

---

## Handling discoveries

Opus-level analysis may surface issues that Round 1's faster agents missed — subtle logical inconsistencies, claims that technically cite a source but misrepresent it, or topics where the curriculum is technically correct but misleadingly incomplete. When this happens:

1. **If it's a factual correction:** Fix it. Update the source. This is core Round 2 work.
2. **If it's a structural insight** (e.g., "Module 03 and Module 04 have a 500-word overlap that should be consolidated"): Document it in DECISION_LOG.md with your recommendation, but do NOT restructure. Flag for human review.
3. **If it reveals a scope gap** (e.g., "The curriculum doesn't cover X, which is important"): Note it in CURRENT_CYCLE.md under "Open questions / Round 3 considerations." Do NOT create new content outside the existing module boundaries.
4. **If a teammate disagrees with another teammate's finding:** The Team Leader arbitrates. When in doubt, prefer the more conservative position (hedge rather than assert, source rather than claim).

---

## What NOT to do

- **Do not restructure the curriculum.** The 11-module structure and dependency graph are settled. If you believe a structural change is needed, document the case in DECISION_LOG.md and flag it for human review — do not implement it.
- **Do not add new modules.** Round 2 refines what exists.
- **Do not delete content that is correct.** Round 1 research was thorough. Sharpen it, don't strip it.
- **Do not optimize for word count.** Some modules may grow; others may stay the same. Depth and accuracy are the metrics, not brevity.
- **Do not generate derivative deliverables** (HTML, slides, diagrams). That is explicitly Round 3/4 work. Stay focused on the markdown source of truth.
- **Do not change the project infrastructure** (CLAUDE.md, AGENT-INIT.md, PROJECT-DESCRIPTION.md, .claude/rules/, .claude/agents/). These are the constitution. If you believe a change is needed, document it in DECISION_LOG.md for human review.

---

## Context about subsequent rounds

This information is provided so you understand where your work fits in the larger plan. **Do not act on Rounds 3 or 4 — that is out of scope.**

- **Round 3 (Pedagogical Design):** A team of agents with expertise in education, learning sciences, and instructional design will analyze the refined curriculum and design how it should be packaged for human consumption. This includes: learning pathway design, diagram specifications, interactive element specifications, assessment strategies, difficulty progression, and multimedia recommendations. Round 3 produces a *design document*, not the final deliverables.

- **Round 4 (Deliverable Creation):** A production team of agents will execute the Round 3 design document — building HTML interactive guides, slide decks, ecosystem diagrams (SVG/Mermaid), comparison table extracts, and the full curriculum export. These go into `deliverables/` and `diagrams/`.

Your job in Round 2 is to make the source material so accurate, deep, well-organized, and internally consistent that Rounds 3 and 4 can trust it completely and focus entirely on presentation rather than content questions.

---

## Success criteria

When Round 2 is complete, Ryan should be able to:

1. Open any module and find zero unverified claims — every fact either has a source or is explicitly qualified
2. Read the curriculum front-to-back and encounter no contradictions, no terminology drift, no unexplained jargon
3. Use the comparison tables to make real tool/platform selection decisions
4. Trust the pricing, model names, and feature statuses as current (March 2026)
5. Navigate seamlessly between modules via cross-references
6. Point a Round 3 instructional design team at this material with confidence that the content is done

---

## Begin

1. Read the files listed in "Read before acting" above.
2. Check `AI_INBOX/` and process any files.
3. Create `modules/round-1-archive/` and archive Round 1 modules.
4. Update `CURRENT_CYCLE.md` to reflect Round 2 start.
5. Spawn your team per the composition above. **Critical:** When spawning each teammate, include their specific role instructions, assigned modules, file ownership rules, and a directive to read `CLAUDE.md`, `GLOSSARY.md`, and their assigned module files before starting work. Teammates do not inherit your conversation — they need explicit context.
6. Execute the three-phase coordination protocol.
7. When all quality gates pass, update CURRICULUM.md, write the blog post, and report completion.

Good luck. Make it bulletproof.
