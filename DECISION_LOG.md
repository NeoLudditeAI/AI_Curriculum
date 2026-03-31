# DECISION_LOG.md — Append-Only Decision Record

---

## 2026-03-20 — Curriculum structure adopted

**Context:** Project initialized with PROJECT-DESCRIPTION.md defining scope and AGENT-INIT.md defining operational directives.

**Decision:** Adopted the 11-module structure (00–10) as defined in PROJECT-DESCRIPTION.md, with the dependency graph and 4-batch execution order specified therein.

**Rationale:** The module boundaries map cleanly to distinct topic areas with manageable scope (3,000–6,000 words each). The dependency graph allows maximum parallelism while respecting topical prerequisites.

**Alternatives considered:**
- Fewer, larger modules (rejected: harder to parallelize, harder to maintain)
- More granular modules (rejected: overhead of cross-referencing outweighs benefits at this scope)

**Impact:** Sets the curriculum's structural skeleton. All module numbering, cross-references, and execution batches flow from this decision.

---

## 2026-03-20 — Token budget updated for 1M context

**Context:** AGENT-INIT.md was originally written with 200K context budget assumptions. Running on Opus 4.6 with 1M context.

**Decision:** Scaled absolute token numbers in the budget table by 5x. Percentages unchanged.

**Rationale:** 1M context allows significantly more working set capacity, reducing the need for aggressive context management during module writing. Compaction and progressive disclosure principles still apply as safeguards.

**Alternatives considered:** None — straightforward scaling.

**Impact:** More comfortable margins for holding multiple module sections and research results simultaneously.

---

## 2026-03-21 — Process blogging adopted as standard practice

**Context:** After completing all 11 curriculum modules in a single session using multi-agent orchestration, we identified the need for a durable process journal that captures execution details, agent stats, lessons learned, and decisions in a human-readable format.

**Decision:** Added `blog/` directory for HTML process journal entries. Each significant work session produces a blog post documenting the journey. Updated CLAUDE.md, .claude/rules/00-repo.md, and added .claude/rules/blog.md with path-scoped standards.

**Rationale:** DECISION_LOG.md captures structural decisions but lacks narrative context. CURRENT_CYCLE.md tracks work state but is overwritten each session. Blog posts provide the retrospective reflection and exhaustive reference that neither file offers. HTML format makes posts readable by humans outside the repo.

**Alternatives considered:**
- Markdown blog posts (rejected: HTML allows richer formatting, stat cards, dark mode, inline styling without external deps)
- Appending to DECISION_LOG.md (rejected: wrong granularity — decision log is for structural choices, not session narratives)
- Separate journal.md file (rejected: would grow unbounded; per-session HTML files are self-contained and archival)

**Impact:** All future sessions will produce a process blog post. The blog/ directory is added to the architecture invariants in CLAUDE.md and the always-on rules in 00-repo.md.

---

## 2026-03-21 — AI_INBOX / AI_TRASH collaboration system adopted

**Context:** Need a lightweight mechanism for Ryan to share non-curriculum files (agent prompts, examples, configs, sample files) with the AI agent without cluttering the project structure.

**Decision:** Created AI_INBOX/ (drop zone for human → agent file sharing) and AI_TRASH/ (staging area for reviewed-but-unneeded files). Agent checks AI_INBOX at session start, processes every file (integrates into project or moves to AI_TRASH with manifest entry). AI_TRASH requires human confirmation before emptying.

**Rationale:** The existing project structure (modules/, reference/, .claude/) is purpose-specific. Dropping miscellaneous files into those directories would violate their invariants. A dedicated inbox creates a clear handoff point without structural pollution. The trash staging area prevents accidental data loss while keeping the inbox clean.

**Alternatives considered:**
- Drop files directly into reference/research/ (rejected: that directory is for agent-gathered research, not arbitrary human-provided materials)
- Use git branches for file sharing (rejected: unnecessarily complex for dropping a few files)
- Chat-only file sharing via conversation (rejected: files may be too large or numerous; filesystem is more natural)

**Impact:** AI_INBOX/ and AI_TRASH/ added to architecture invariants. Session start checklist now includes inbox check. Path-scoped rules in .claude/rules/inbox.md. Agent definitions (researcher.md, writer.md) updated to check inbox. All future agents will process inbox contents.

---

## 2026-03-21 — Round 2 prompt created; full Opus rewrite rejected

**Context:** Round 1 complete (43,079 words, 11 modules, all COMPLETE). Post-round review identified specific quality gaps: 10+ unverified sources, citation format inconsistency, metadata mismatches, a few thin sections. Ryan raised the option of a "Phase 1.5" — having Opus 4.6 rewrite all modules from scratch using Round 1 as a launching point, since the Max Plan provides near-unlimited Opus access.

**Decision:** Rejected the full Opus rewrite. Instead, created a targeted Round 2 refinement prompt (`AI_INBOX/ROUND-2-TEAM-LEADER-PROMPT.md`) with 7 workstreams addressing the specific identified gaps, using Opus for all 9 teammates.

**Rationale:** Round 1's quality gaps are research and editorial problems (unverified sources, inconsistent formatting, depth gaps in specific sections), not model-intelligence problems. A rewrite would: (1) discard 38 researcher agents' worth of verified research; (2) introduce new unverified claims requiring another full verification cycle; (3) undo the synthesis pass that already caught cross-module inconsistencies; (4) delay Rounds 3 and 4 significantly. Surgical refinement is more efficient and lower-risk than wholesale rewriting.

**Alternatives considered:**
- Full Opus rewrite of all 11 modules (rejected: see rationale above)
- Opus rewrite of only the weakest modules (rejected: the weakest module by sourcing — Module 10 — needs verification, not rewriting; the content is sound)

**Impact:** Sets the pattern for all future rounds: refine rather than rewrite. Each round has a scoped mandate. Opus budget is spent on quality of analysis (better reviews, deeper verification) rather than quantity of output.

---

## 2026-03-21 — Model policy: Opus 4.6 for all agent roles

**Context:** Round 1 used tiered model selection (Haiku for researchers, Sonnet for writers/reviewers) following AGENT-INIT.md cost-optimization guidance. Ryan disclosed that he is on the 20x Max Plan ($200/month) and has not hit usage limits.

**Decision:** Default all agent roles to Opus 4.6 for Round 2 and future rounds. Retain the tiered model selection strategy as a documented fallback if usage limits are eventually hit.

**Rationale:** With effectively unlimited Opus access, the cost-optimization rationale for tiered models disappears. Opus brings meaningfully better analysis quality — catching subtle misrepresentations, logical inconsistencies between paragraphs, and misleadingly framed claims that faster models miss. The tiered strategy remains correct for per-token billing and should be taught as a best practice in Module 04 (multi-agent orchestration).

**Alternatives considered:**
- Keep tiered models (rejected: no cost pressure; sacrifices quality unnecessarily)
- Opus for reviewers only, Sonnet for writers (rejected: artificial distinction when budget allows uniform quality)

**Impact:** All Round 2 teammates use Opus. AGENT-INIT.md model selection table remains as-is (it's correct general guidance). Module 04's depth expansion should include strategic model selection as a practical pattern.

---

## 2026-03-21 — Round 2: Citation format standardization DEFERRED to Round 3

**Context:** Round 1 modules used inconsistent citation formats. Modules 00, 07, and 10 mixed W-prefixed citations ([W67], [W20]) with plain numbers. Module 05 used no F-prefix for foundation profiles. The remaining eight modules used [F#] + [#] consistently. The harmonizer audited the inconsistencies but full standardization was assessed as too risky to rush within Round 2's scope.

**Decision:** Defer full citation format standardization to Round 3. Document the target convention: [F#] for foundation profiles, plain [#] for module-specific web sources in body text. SOURCES.md retains global W# numbering as the master registry. Each module's Sources section maps local [#] citations to SOURCES.md W# entries.

**Rationale:** Renumbering citations across 11 modules in a time-pressured session risks introducing broken references. The inconsistency is cosmetic, not factual — it does not affect source traceability or verification. Round 3's pedagogical design phase will touch every module anyway, making it the natural point to standardize.

**Alternatives considered:**
- Standardize now (rejected: too many modules to touch safely under time pressure; risk of breaking inline citations)
- Global W# numbering everywhere (rejected: [W67] is less readable than [1] in body text)
- Leave permanently inconsistent (rejected: undermines professional quality)

**Impact:** Citation format remains inconsistent across 3 modules (M00, M07, M10) until Round 3. Added to Round 3 priorities in CURRENT_CYCLE.md.

---

## 2026-03-21 — Round 2: Agent cost estimate corrected ($9,000 to $1,200/hour)

**Context:** Module 03 (Single-Agent Systems), line 256, originally claimed an uncontrolled agent "could cost approximately $9,000 per hour." This was flagged in the post-Round-1 review as needing verification.

**Decision:** Corrected to $1,200/hour based on actual Opus 4.6 pricing ($25/MTok output) at Tier 4 rate limits (~800K output tokens per minute). Added source citation [8] with links to Anthropic pricing and rate limits documentation.

**Rationale:** The original $9,000 figure appears to have been extrapolated from higher rate limit assumptions or a different pricing tier. The corrected calculation: 800K OTPM * 60 min * $25/MTok = $1,200/hr. This is still a striking number that illustrates the resource exhaustion risk without overstating it.

**Alternatives considered:**
- Tag with [UNVERIFIED] and leave the $9,000 figure (rejected: the correct number is readily calculable from public pricing)
- Remove the cost example entirely (rejected: concrete cost figures are valuable for the audience)

**Impact:** Single factual correction in Module 03. Source [8] (W72) added to SOURCES.md.

---

## 2026-03-21 — Round 2: Claude Code ARR and Anthropic revenue verified

**Context:** Module 00 cited Claude Code's trajectory "from $1B ARR within six months to over $2.5B ARR by March 2026" and Anthropic's "$19B annualized revenue" without source attribution. Module 08 made similar Claude Code ARR claims. These were flagged as high-priority in the post-Round-1 review.

**Decision:** Verified and sourced both claims. Claude Code ARR sourced to Yahoo Finance/Investing.com (W67) and heyuan110.com (W68). The $2.5B ARR "doubled since January 2026" claim independently confirmed by Constellation Research (W78), added to Module 08.

**Rationale:** Revenue claims for private companies are inherently based on reporting rather than audited financials. Three independent sources (Yahoo Finance, heyuan110.com, Constellation Research) converging on the same $2.5B figure provides reasonable confidence. The sources are now explicitly cited.

**Alternatives considered:**
- Remove the ARR claims entirely (rejected: they are important context for Claude Code's market position)
- Mark as [UNVERIFIED] (rejected: sufficient independent sourcing exists)

**Impact:** W67, W68 added to SOURCES.md and M00 source list. W78 added for M08 cross-confirmation.

---

## 2026-03-21 — Round 2: Module 02 RAG section expanded

**Context:** The post-Round-1 depth audit flagged Module 02's RAG (Retrieval-Augmented Generation) section as insufficiently deep for the target audience. The original coverage was surface-level, lacking architectural patterns, vector database options, and practical decision frameworks.

**Decision:** Expanded the RAG section with: Naive/Advanced/Modular RAG architecture taxonomy, vector database comparison (Pinecone, Weaviate, Chroma, pgvector), chunking strategies, and a when-to-use-RAG decision framework. Stayed within the 20% word increase guardrail.

**Rationale:** RAG is a core pattern for the target audience (technically sophisticated practitioners). The original section was below the depth standard set by comparable sections in other modules (e.g., M06's MCP server architecture, M03's agent safety patterns).

**Alternatives considered:**
- Separate RAG module (rejected: topic doesn't warrant its own module; fits naturally in context engineering)
- Link to external RAG resources only (rejected: violates the self-contained depth standard)

**Impact:** Module 02 grew from ~4,300 to ~5,760 words. Source [4] (Gao et al. RAG survey, W71) added.

---

## 2026-03-21 — Round 2: Module 04 model selection section added

**Context:** The post-Round-1 review noted that Module 04 (Multi-Agent Orchestration) should include practical guidance on strategic model selection for different agent roles, using this project's own Round 1 experience as a case study.

**Decision:** Added new section "Strategic Model Selection in Multi-Agent Systems" covering: when to use flagship vs. fast models for different agent roles, cost-optimization patterns, and a decision framework (quality x volume x cost sensitivity). Used this curriculum's Round 1 tiered model strategy as a concrete example.

**Rationale:** Model selection is a practical orchestration concern that directly affects cost and quality. The curriculum's own experience (Haiku researchers, Sonnet writers, Opus synthesizer) provides an authentic case study.

**Alternatives considered:**
- Cover model selection in Module 01 only (rejected: the orchestration-specific patterns — which agent roles get which models — belong in Module 04)
- Skip the case study (rejected: concrete examples are a stated content standard)

**Impact:** Module 04 grew from ~3,800 to ~4,880 words. Cross-references to Module 01 model comparison tables added.

---

## 2026-03-21 — Round 2: Module 10 source verification (10 of 18 UNVERIFIED resolved)

**Context:** Module 10 (Frontier Topics) had the worst sourcing in the curriculum: 10 of 18 sources were tagged [UNVERIFIED] with vague attributions like "Research data" or "Public reporting."

**Decision:** Source verifiers researched and provided specific URLs for all 10 previously unverified sources. Results: 9 upgraded to Verified with primary URLs (Gartner press releases, Goldman Sachs research, Apple ML research reports, Grand View Research reports, official event pages). 1 (WWDC 2026 dates) remains Unverified as Apple has not officially announced. 1 (Malwarebytes survey on AI trust) upgraded to Partially Verified.

**Rationale:** Module 10 covers forward-looking topics where primary sources are harder to find, but most claims traced to identifiable primary sources once properly researched.

**Alternatives considered:**
- Remove unverifiable claims (rejected: the claims are important for the frontier topics narrative; most turned out to be verifiable)
- Leave as [UNVERIFIED] with a blanket caveat (rejected: undermines curriculum credibility)

**Impact:** SOURCES.md entries W50-W66 updated with specific URLs. Module 10 body text updated with improved source attributions. Only W66 (WWDC 2026) remains Unverified.

---

## 2026-03-21 — Round 2: Additional factual corrections across modules

**Context:** Source verification uncovered several factual errors beyond the high-priority items (agent cost, ARR, M10 sources). These were corrected during Phase 2.

**Decision:** Applied the following corrections:
- **OpenClaw GitHub stars:** 163K (stale) updated to 250K+ across affected modules, sourced to OpenClaw blog [W70]
- **Anthropic annualized revenue:** $14B (stale) updated to ~$19B, sourced to Yahoo Finance [W67]
- **Module 08 pricing errors:** Multiple pricing figures corrected against current provider pricing pages
- **Veo version/date:** Corrected version and GA date (January 13, 2026) in Module 10
- **GPT Store framing:** Nuanced the "3M+ GPTs" claim to distinguish between total created and actively maintained

**Rationale:** Each correction was sourced to a primary or high-quality secondary source. Stale figures (OpenClaw stars, Anthropic revenue) reflected earlier data points that had been superseded. Pricing errors in M08 were cascading from stale profile data.

**Alternatives considered:** None — these were straightforward factual corrections.

**Impact:** Improved accuracy across Modules 00, 05, 07, 08, and 10. SOURCES.md updated with corresponding entries.

---

## 2026-03-21 — Round 3: Audience broadened from Ryan to social circle

**Context:** Round 3 (Pedagogical Design) required defining the delivery audience before designing the learning experience. The original PROJECT-DESCRIPTION.md specified Ryan as the sole learner. Ryan decided to broaden the audience to include friends and colleagues he mentors on AI topics.

**Decision:** Broadened the target audience from a single self-study learner (Ryan) to a small cohort of technically sophisticated adults (Ryan's social circle). Graduate-level course format.

**Rationale:** Designing for a cohort rather than a single person justified the investment in learning science (scaffolding, assessment, progressive disclosure). A curriculum for one reader does not need quizzes or worked-example faders. A curriculum for a small group of varying expertise levels does. The expertise-reversal effect becomes relevant: Ryan may know context engineering deeply but his friends may not.

**Alternatives considered:**
- Keep as solo self-study (rejected: limits the design's pedagogical value)
- Publish broadly as a public course (rejected: too much production overhead for an educational side project)

**Impact:** WS0-WS7 all designed for a range of expertise within the "technically sophisticated" band. Progressive disclosure and prior-knowledge activation elements added to manage the variance.

---

## 2026-03-21 — Round 3: Static HTML with JS interactivity as delivery format

**Context:** Round 4 will produce the deliverable HTML curriculum. The delivery format needed to be decided before components could be designed.

**Decision:** Static HTML files with client-side JavaScript for interactivity. No server, no login, no database. localStorage for persistence. Markdown modules remain the canonical source of truth.

**Rationale:** The audience accesses content locally or via file sharing. No server infrastructure to maintain. Static HTML is portable, archivable, and works offline. JavaScript provides quiz interactivity, progress tracking, and comparison table filtering without requiring a backend. localStorage enables session resume and progress persistence without accounts.

**Alternatives considered:**
- Server-based LMS (rejected: deployment overhead, authentication complexity, maintenance burden)
- Markdown-only, no interactivity (rejected: pedagogy research shows retrieval practice significantly improves retention; quizzes require JS)
- PDF export (rejected: loses all interactivity)

**Impact:** WS0 designed a Node.js build pipeline that transforms markdown + YAML annotations into HTML. Round 4 implements this pipeline.

---

## 2026-03-21 — Round 3: Learning sequence reordered from numerical module order

**Context:** WS1 (Course Architecture) analyzed the dependency graph and conceptual prerequisites of all 11 modules. The numerical order (M00-M10) was the authoring order, not necessarily the optimal learning order.

**Decision:** Reordered the learning sequence to M00 -> M01 -> M02 -> M03 -> M06 -> M04 -> M05 -> M07 -> M09 -> M08 -> M10. Three modules moved: M09 from Batch 2 to Part 3 (after agents), M05 from independent to after M03/M06, M08 from Batch 3 to penultimate.

**Rationale:** M09 (APIs) is more meaningful after the learner understands agent tool use (M03) and MCP (M06). M05 (OpenClaw) references gather-act-verify (M03), MCP (M06), and skills (M07) -- studying it earlier leaves too many forward references. M08 (Consumer Comparison) synthesizes nearly all prior modules and functions better as a retrieval exercise late in the sequence.

**Alternatives considered:**
- Keep numerical order (rejected: conceptual prerequisites span beyond the CURRICULUM.md dependency graph)
- Fully non-linear / learner-chosen order (rejected: pedagogy research shows guided sequence outperforms free browsing for novices)

**Impact:** WS1 four-part structure adopted by all downstream workstreams. Course map page implements this sequence. Prev/next navigation follows the new order, not numerical order.

---

## 2026-03-21 — Round 3: Canonical markdown preserved; annotations in separate YAML files

**Context:** Pedagogical design requires inserting quizzes, worked examples, progressive disclosure, and other interactive elements into module content. The question: modify the markdown or inject from separate files?

**Decision:** Pedagogical elements defined in separate YAML annotation files (one per module in `build/annotations/`). Build script merges markdown + annotations into HTML. Markdown files are never modified by the build process or by pedagogical design.

**Rationale:** Separation of concerns. Content authors edit markdown. Pedagogical designers edit annotation files. Neither needs to understand the other's format. If an annotation references a section ID that no longer exists (due to content restructuring), the build emits a warning and skips it rather than failing. This also means Rounds 1-2 content is untouched by Round 3.

**Alternatives considered:**
- Inline annotations in markdown comments (rejected: clutters the canonical source; fragile coupling)
- Markdown extensions with custom syntax (rejected: breaks standard markdown rendering)
- Post-hoc HTML editing (rejected: destroys the regeneration guarantee)

**Impact:** WS0 build pipeline specified. All workstreams write specifications, not module edits. Round 4 creates annotation files and implements the build script.

---

## 2026-03-21 — Round 3: Pedagogical framework selection (Merrill + 4C/ID + Backward Design + CLT)

**Context:** The pedagogy deep research document reviewed 8 areas of learning science. Multiple instructional design frameworks were candidates. The team needed to select a coherent combination.

**Decision:** Applied four complementary frameworks: Merrill's First Principles (problem-centered module openings), 4C/ID (worked-example fading across modules), Backward Design (learning outcomes drive assessment and content), Cognitive Load Theory (progressive disclosure, chunking, multi-channel encoding).

**Rationale:** No single framework covers all design needs. Merrill provides the module-level structure (problem -> demonstration -> application -> integration). 4C/ID provides the cross-module fading trajectory (full examples in Part 1, partial in Part 2, independent in Parts 3-4). Backward Design ensures assessments align with outcomes. CLT governs component design (accordions, visual breaks, callout hierarchy).

**Alternatives considered:**
- Single framework only (rejected: each framework has blind spots the others cover)
- ADDIE process model (considered but used as process, not design framework -- ADDIE describes what to do, not how to design learning)

**Impact:** All WS2a/WS2b module designs use Backward Design (outcomes first), Merrill (problem-centered hooks), and 4C/ID (fading). All WS0 components respect CLT (segmentation, multi-channel encoding, expertise-reversal).

---

## 2026-03-21 — Round 3: Agent Teams methodology adopted then adapted for multi-phase work

**Context:** Round 3 required coordinating 9+ specialist agents across three phases. Phase 2a (WS0 + WS1 foundations) needed inter-agent handoff: WS0's component library had to reach the Visual Strategist for behavior additions, and WS1's course architecture had to inform all downstream workstreams. Phase 2b required 6+ parallel agents working on independent workstreams.

**Decision:** Used Agent Teams (TeamCreate) for Phase 2a with 4 persistent teammates (Learning Architect, Accessibility Lead, Visual Strategist, Citation Standardizer) and inter-agent messaging for WS0 handoff. Hit the flat-roster constraint for Phase 2b — Agent Teams does not support hierarchical sub-teams or dynamic roster changes. Adapted to background agents for Phases 2b and 2c while preserving the team coordination pattern for foundational work.

**Rationale:** Agent Teams excels at persistent, conversational coordination where agents need to build on each other's work (WS0 structural draft -> Visual Strategist behavior additions). Background agents are better for embarrassingly parallel workstreams (WS2a, WS2b, WS3, WS4, WS5, WS6, WS7) where each agent works independently from shared inputs. The hybrid approach used each mechanism where it was strongest.

**Alternatives considered:**
- Agent Teams for all phases (rejected: flat-roster constraint made it impractical for 6+ parallel agents in Phase 2b)
- Background agents for all phases (rejected: Phase 2a needed inter-agent handoff that background agents cannot do natively)
- Sequential execution of all workstreams (rejected: unnecessary serialization; most workstreams are independent)

**Impact:** Round 3 completed with a hybrid orchestration pattern. Future rounds should use Agent Teams for interdependent foundation work and background agents for parallel independent workstreams.

---

## 2026-03-21 — Round 3: Citation standardization completed (deferred from Round 2)

**Context:** Round 2 deferred citation format standardization for M00, M07, and M10 as too risky to rush. The target convention was defined: [F#] for foundation profiles, plain [#] for module-specific web sources in body text, with each module's Sources section mapping local citations to SOURCES.md W# entries. Round 3 included this as a standalone task assigned to a Citation Standardizer agent.

**Decision:** Applied the [F#] + [#] convention to M00, M07, and M10. This was the only module-editing work performed in Round 3. All other Round 3 output was design specifications, not module content changes.

**Rationale:** Citation standardization was low-risk, high-value cleanup that had been well-defined in Round 2. Executing it as a standalone task at the start of Round 3 (before the design work began) ensured the modules were in a clean state for the Module Designers to reference during WS2a/WS2b.

**Alternatives considered:**
- Defer again to Round 4 (rejected: Round 4 is a production round building from these modules; citations should be clean before production starts)
- Standardize all 11 modules (rejected: only M00, M07, M10 were inconsistent; the other 8 already followed the convention)

**Impact:** All 11 modules now use consistent citation formatting. The deferred item from Round 2 is resolved. CURRENT_CYCLE.md known issues list updated.

---

## 2026-03-21 — Round 3: Assessment Designer given full WS3 scope in single pass

**Context:** The original Round 3 plan split WS3 (Assessment System) into two waves: Wave 1 for the system framework (quiz types, feedback templates, scoring philosophy) and Wave 2 for sample questions. The Assessment Designer's workstream had no dependencies on other Wave 2 workstreams.

**Decision:** Gave the Assessment Designer the full WS3 scope in Wave 1, producing all 5 sections in a single pass: quiz type taxonomy, granularity framework, ~130 sample questions across all modules, feedback design templates, and the self-explanation prompt system.

**Rationale:** The Assessment Designer's only dependency was WS0 (component specs for the quiz widget) and WS1 (learning sequence for cross-module questions), both completed in Phase 2a. Since the assessment framework and sample questions draw on the same module analysis, splitting them would have required the agent to re-read all modules twice. A single pass was more efficient and produced a more coherent assessment system.

**Alternatives considered:**
- Split into two waves as originally planned (rejected: artificial separation that would require duplicate module analysis)
- Defer sample questions to Round 4 (rejected: Round 4 is production, not design; questions should be designed alongside the assessment framework)

**Impact:** WS3 delivered 9,443 words including ~130 sample questions, 4 quiz types at 4 granularities, feedback templates, and the self-explanation prompt system. No second pass needed.

---

## 2026-03-21 — Production decomposed into four rounds (4–7)

**Context:** CURRENT_CYCLE.md originally described Round 4 as a single "deliverable creation" round encompassing the build pipeline, all 9 interactive components, all 11 YAML annotation files, all 40 diagrams, full curriculum build, accessibility audit, and cross-browser testing. Reviewing the Round 3 design output (~81,400 words of specifications across 9 workstreams), this scope is far too large for a single round — it mixes infrastructure, interactive components, content authoring, and QA into one pass, creating dependency tangles and eliminating the ability to verify each layer independently.

**Decision:** Decomposed the original "Round 4" into four focused production rounds:

| Round | Name | Scope |
|-------|------|-------|
| 4 | Foundation Build | Build pipeline, CSS design system, page templates, navigation, M00 proof-of-concept |
| 5 | Component Build | 9 interactive JS components, localStorage integration, dark mode toggle UI |
| 6 | Content Production | 11 YAML annotation files, 40 diagram source files, capstone, engagement content |
| 7 | Assembly & QA | Full 11-module build, cross-browser testing, accessibility audit, optimization |

Each round builds on the previous with clear boundaries. The Team Leader prompt for each round is drafted in advance (Round 4 prompt: 634 lines, 3 optimization passes).

**Rationale:** The layered approach matches how the Round 3 specs are themselves organized — WS0/WS6 define infrastructure (Round 4), WS0 Section 2.2 defines components (Round 5), WS2-WS5/WS7 define content (Round 6), and the full integration requires all prior layers (Round 7). Building and verifying each layer independently means errors are caught early and don't cascade. The M00 proof-of-concept in Round 4 validates the entire pipeline end-to-end before scaling to all 11 modules.

**Alternatives considered:**
- Single production round (rejected: too many parallel concerns; no ability to verify infrastructure before building on it; a failed pipeline would waste all component and content work)
- Two rounds: infrastructure + everything else (rejected: components and content authoring are independent workstreams with different skill profiles; mixing them reduces parallelism and makes QA harder)
- Five rounds: split Round 6 into annotations and diagrams (rejected: unnecessary granularity; annotations and diagrams are authored from the same WS2-WS5 specs by similar agents)

**Impact:** CURRENT_CYCLE.md roadmap updated. Round 4 Team Leader prompt scoped to foundation build only, with explicit "What NOT to Do" section preventing scope creep into Rounds 5–7. Future round prompts will be drafted using the same multi-pass optimization pattern.

---

## 2026-03-21 — Round 4 directory restructuring: `build/` and `deliverables/html/` structure

**Context:** Round 4 introduces engineering artifacts (build pipeline, CSS, templates) that don't belong alongside curriculum content. The Round 4 Team Leader Prompt specifies a new `build/` directory structure.

**Decision:** Created `build/` directory with subdirectories: `annotations/`, `templates/`, `styles/`, `plugins/`, `lib/`, `diagrams/`. Extended `deliverables/html/` with subdirectories: `modules/`, `css/`, `js/`, `data/`, `images/`. Existing directories (`modules/`, `reference/`, `blog/`, etc.) remain unchanged.

**Rationale:** Separates engineering artifacts from curriculum content. Maintains canonical markdown as read-only (build reads from `modules/`, never writes to it). Aligns with WS0's specified build output structure. The `build/` directory contains all source files for the pipeline; `deliverables/html/` contains all generated output.

**Alternatives considered:**
- Putting build files in project root (rejected: pollutes the content-oriented root directory)
- Using `src/` instead of `build/` (rejected: WS0 and the Team Leader prompt both specify `build/`)

**Impact:** All Round 4 engineering work lives in `build/`. Generated HTML output goes to `deliverables/html/`. Module markdown remains the single source of truth.

---

## 2026-03-21 — Output path: `deliverables/html/modules/` subdirectory (not flat)

**Context:** WS0 Section 2.1 shows module HTML in flat structure (`deliverables/html/module-00.html`). The Round 4 Team Leader prompt specifies a `modules/` subdirectory (`deliverables/html/modules/module-00.html`).

**Decision:** Follow the Team Leader prompt's subdirectory structure.

**Rationale:** The Team Leader prompt is more recent and more specific. A subdirectory keeps module HTML separate from top-level pages (index.html, glossary.html), which is cleaner as the site grows. Per conflict resolution rules (AGENT-INIT.md Section 0), more specific/recent specs take precedence.

**Alternatives considered:**
- Flat structure per WS0 (rejected: Team Leader prompt is authoritative for Round 4)

**Impact:** `build.js` outputs module HTML to `deliverables/html/modules/`. Navigation links use `modules/module-XX.html` relative paths. Course map and glossary remain at `deliverables/html/` root.

---

## 2026-03-22 — Annotation injector upgrade to WS0-compliant HTML

**Context:** Round 4's annotation injector produces simplified HTML for quiz, self-explanation, and accordion components. The quiz output uses `div.quiz-widget` with `<ul>` choices — no `<form>`, `<fieldset>`, radio buttons, or ARIA semantics. This doesn't match the WS0 Section 2.2 spec that defines the component contracts.

**Decision:** Upgrade the annotation injector to produce full WS0-compliant HTML for all component types (quiz, self-explanation-prompt, accordion, concept-gate, worked-example). This ensures Round 6 annotations produce correct markup from the start.

**Rationale:** WS0 is the authoritative spec per Critical Rule 1 in the Round 5 prompt. Upgrading the injector is cleaner than having component JS perform DOM surgery on non-compliant markup.

**Alternatives considered:**
- Have component JS enhance simplified markup (rejected: fragile, would need to be redone when Round 6 annotations use different format)

**Impact:** Component JS targets WS0-specified HTML structure directly. All existing M00 annotations regenerated with compliant markup.

---

## 2026-03-22 — Glossary data embedded inline for file:// protocol compatibility

**Context:** The WS0 spec says glossary-tooltip.js should "load glossary.json at page init." However, `fetch('../data/glossary.json')` fails on the `file://` protocol due to browser CORS restrictions. The project requirement (Round 5 prompt, quality gate 9) is that all pages work from `file://`.

**Decision:** Embed glossary data as `<script id="glossary-data" type="application/json">` inline in module templates during build. glossary-tooltip.js reads from DOM instead of fetch.

**Rationale:** `file://` protocol compatibility is a hard requirement. Inline JSON avoids CORS entirely and works identically to fetch in terms of data availability. The build pipeline already has access to glossary data during template rendering.

**Alternatives considered:**
- Fetch with fallback (rejected: fetch always fails on file://, fallback adds complexity)
- Global JS variable (rejected: inline JSON is cleaner and doesn't pollute global scope)

**Impact:** build.js passes glossary data to template context. Module template includes inline JSON script tag. Same pattern available for course-map.json if needed by progress tracker.

---

## 2026-03-22 — Test annotations added for concept-gate and worked-example components

**Context:** M00's annotation YAML has 3 annotations (quiz, self-explanation, accordion). Round 5 builds 9 components, but concept-gate and worked-example have no test annotations. The prompt's Component Origin Matrix says these "must also work standalone for testing before Round 6 annotations exist" but provides no test fixture.

**Decision:** Add 2 test annotations to module-00.yaml: one concept-gate (after "ai-coding-tools") and one worked-example (after "consumer-market-dynamics").

**Rationale:** Quality gate 3 ("All 9 components functional in M00 proof-of-concept") requires all components to be verifiable. Without test annotations, concept-gate and worked-example cannot be exercised during Chrome visual verification. Adding to M00's existing YAML is the cleanest path — consistent with the annotation-driven architecture.

**Alternatives considered:**
- Standalone HTML test fixture (rejected: wouldn't test the full injector→component pipeline)
- Defer verification to Round 6 (rejected: violates quality gate 3)

**Impact:** M00 YAML grows by 2 annotations. After injector upgrade, M00 renders all 5 component types for full verification.

---

## 2026-03-22 — Round 6-8 scope decomposition from original Round 6-7 plan

**Context:** The original production roadmap (CURRENT_CYCLE.md) defined Round 6 as "Content Production" covering YAML annotations, 40 diagrams, capstone content, and engagement content. Round 7 was "Assembly & QA." Research into WS4 (visual specs) revealed diagrams are a hybrid engineering+content task requiring D2/Mermaid compilers not yet in the build pipeline, plus 3 "diagrams" that are actually interactive HTML/JS components.

**Decision:** Decompose into three rounds: Round 6 (Annotation Authoring — YAML files, engagement content, capstone expert answers), Round 7 (Diagrams & Visual Production — D2/Mermaid pipeline, 40 diagram source files, interactive decision trees), Round 8 (Assembly & QA — full build, cross-browser testing, accessibility audit, optimization).

**Rationale:** Annotations are pure content authoring with no engineering dependencies — the injector and components are ready. Diagrams require new build infrastructure (D2 compiler, Mermaid CLI, SVG inlining, dark mode theming) that doesn't exist yet. Mixing these in one round would create serial dependencies and blur the content/engineering boundary. The 3 interactive "diagrams" (M08-2 recommendation quiz, M08-3 pricing calculator, M03-4 cost callout) further confirm diagrams need separate engineering treatment.

**Alternatives considered:**
- Original plan: single "Content Production" round (rejected: diagram engineering would block annotation authors)
- Annotations + diagrams in parallel with separate teams (rejected: diagram team would need build pipeline changes that affect annotation rendering)

**Impact:** Production roadmap extends from 7 rounds to 8. Round 6 is now a focused content round (4 annotation authors + 1 chronicler). Round 7 becomes a focused engineering+content round for visual assets. Round 8 unchanged in scope.

---

## 2026-03-22 — Round 6: Author D full-capstone reading scope narrowed

**Context:** The Round 6 prompt (line 294) states Author D "must read all 11 module markdown files" before writing the full capstone expert answer. All 11 modules total ~47,169 words. Author D also needs WS2b specs, quiz design principles, and YAML authoring context in their working window.

**Decision:** Author D reads only the Executive Summary and Key Takeaways sections of each module (~200-300 words per module, ~3K total) rather than all 47K+ words.

**Rationale:** Loading 11 full modules alongside WS specs and YAML work would consume ~60-70% of the 1M context window, degrading annotation quality for M09 and M10. The exec summaries and key takeaways contain the essential synthesis points. Author D has deep familiarity with M09 and M10 from direct annotation work.

**Alternatives considered:**
- Full module reads (rejected: context overload)
- Reading only key takeaways without exec summaries (rejected: too thin for a comprehensive capstone)

**Impact:** Full capstone may miss minor details from module body sections, but the key frameworks, comparisons, and conclusions are all captured in the sections Author D reads.

---

## 2026-03-22 — Round 6: M08 duplicate self-explanation section ID fix

**Context:** Author C placed two `self-explanation-prompt` annotations after the same section (`pricing-trend-capability-based-bundling`) in M08. The annotation injector generates element IDs from the section slug + component type, creating duplicate HTML IDs (`se-m08-pricing-trend-capability-based-bundling`). This failed verify.js check 1 (HTML well-formedness).

**Decision:** Moved the first self-explanation (team platform-switching advice) to target `pricing-analysis` (the parent H2) instead. The second self-explanation (capability-based bundling trend) stays at the original H3.

**Rationale:** Both self-explanations are valid content, but the injector's ID generation scheme doesn't support multiple same-type annotations at the same section. Relocating to the parent section preserves both prompts while resolving the duplicate ID.

**Alternatives considered:** Modifying the annotation injector to append a counter suffix (rejected: Round 5 boundary — do not modify JS components).

**Impact:** M08 annotation placement slightly differs from WS2b spec. Negligible pedagogical impact.

---

## 2026-03-22 — Round 6: verify.js check 7 updated for expanded M00 annotations

**Context:** verify.js check 7 used `indexOf` to find the first quiz and accordion in M00 HTML. With M00 expanded from 5 to 30 annotations, the first quiz/accordion is now the opening hook (after `executive-summary`), not the original annotations after `platform-comparison-at-a-glance` and `5-enterprise-governance`. This caused a false positive failure.

**Decision:** Updated check 7 to search for quiz/accordion occurrences *after* the target section position, rather than checking the first occurrence on the page.

**Rationale:** The check's intent was to verify annotations inject after their target sections. The original `indexOf` logic was a shortcut that worked with 3 annotations but broke with 30.

**Impact:** verify.js now correctly validates annotation positioning regardless of how many annotations exist before the checked sections.

---

## 2026-03-22 — Round 7: Client-side Mermaid.js instead of D2 for diagram rendering

**Context:** WS4 specifies D2 as the preferred diagram format for most diagrams. D2 is a standalone binary compiler that generates SVG from `.d2` source files. However, the Cowork sandbox environment makes binary installation uncertain, and D2 requires a build-time compilation step.

**Decision:** Use client-side Mermaid.js (v11, loaded as browser script) for all static/semi-interactive diagrams. Use Chart.js (v4) for data visualizations. Use custom JS components for interactive decision trees and the recommendation quiz.

**Rationale:** Mermaid renders in-browser from text source — no compiler needed, no build-time dependency, works offline, themes via CSS custom properties. It handles 15 of 21 HIGH-priority diagrams. The remaining 6 require Chart.js (2 charts), custom decision-tree.js (3 trees), and custom recommendation-quiz.js (1 quiz). This aligns with the project's static HTML + JS delivery format and progressive enhancement philosophy.

**Alternatives considered:**
- D2 compiler (rejected: binary installation risk in sandbox, adds build-time dependency)
- AI-generated images (rejected: not accessible via screen readers, not themeable for dark mode, not editable as text, large file sizes ~500KB vs ~10KB SVG, violates "source → derivative" principle)
- Server-side Mermaid CLI (rejected: no server in static delivery model)

**Impact:** All 21 HIGH-priority diagrams rendered client-side. Mermaid source lives in YAML annotations, enabling the same annotation-driven injection pattern as Round 6 pedagogical components.

---

## 2026-03-22 — Round 7: MutationObserver for dark mode re-rendering

**Context:** Round 5's dark-mode.js toggles themes by setting `document.documentElement.setAttribute('data-theme', theme)` but does NOT dispatch a custom event. New diagram components (mermaid-init.js, chart-renderer.js) need to re-render when the theme changes.

**Decision:** Use `MutationObserver` on `document.documentElement` watching the `data-theme` attribute to detect theme changes and trigger diagram re-rendering.

**Rationale:** Modifying dark-mode.js to dispatch a custom event would violate the "do not modify Round 5 JS components" boundary. MutationObserver is a standard browser API, requires no changes to existing code, and is the least-coupling approach.

**Alternatives considered:**
- Modify dark-mode.js to dispatch custom event (rejected: Round 5 boundary)
- Polling `data-theme` attribute (rejected: wasteful, laggy)
- Exposing re-render callbacks globally for dark-mode.js to call (rejected: tight coupling)

**Impact:** All diagram JS components use a consistent MutationObserver pattern for dark mode. No Round 5 code modified.

---

## 2026-03-22 — Round 7: AFC_Storage for interactive component persistence

**Context:** Decision-tree.js and recommendation-quiz.js need to persist user selections. Round 5 established `window.AFC_Storage` as the centralized persistence layer (wrapping localStorage with graceful degradation, namespacing, and schema versioning).

**Decision:** All new interactive components must use `window.AFC_Storage` for persistence, not raw `localStorage`. Pipeline Engineer adds `decisionTrees: {}` and `recommendations: {}` keys to storage.js's `DEFAULT_STATE` and bumps `SCHEMA_VERSION` from 1 to 2.

**Rationale:** Consistent with quiz.js (uses `quizzes` key), concept-gate.js (uses `conceptGates`), and self-explain.js (uses `selfExplanations`). Provides graceful degradation in private browsing mode, avoids namespace collisions, and keeps all learner state under the unified `afc` localStorage key.

**Alternatives considered:**
- Raw localStorage (rejected: bypasses graceful degradation, inconsistent with existing components)
- No persistence (rejected: poor UX for multi-session learners)

**Impact:** Additive change to storage.js (new keys, version bump). Existing stored data preserved by schema migration.

---

## 2026-03-22 — Round 7: Chart.js waterfall simulated as stacked bar

**Context:** M09-2 (Cost Optimization Waterfall) requires a waterfall chart showing progressive cost reduction. Chart.js v4 has no native waterfall chart type.

**Decision:** Simulate the waterfall using a stacked bar chart with a transparent "base" dataset that raises each bar to its starting position, plus a visible "change" dataset showing the cost delta. The annotation uses `chartType: "bar"` with the stacked configuration.

**Rationale:** Adding a Chart.js plugin or a third-party waterfall library would increase bundle size and maintenance burden for a single diagram. The stacked bar approach produces a visually equivalent result using only Chart.js core features.

**Alternatives considered:**
- Chart.js waterfall plugin (rejected: additional dependency for one diagram)
- Replace with standard bar chart (rejected: loses the visual "flow" of progressive cost reduction)
- Use Mermaid instead (rejected: Mermaid has no chart capabilities)

**Impact:** WS4 deviation: M09-2 uses `chartType: "bar"` (stacked) instead of a native waterfall. Visually equivalent. No additional dependencies.

---

## 2026-03-22 — Round 7: verify.js check 1 regex tightened for data-*-id attributes

**Context:** The annotation injector generates `data-tree-id` and `data-quiz-id` attributes on interactive component containers. verify.js check 1 (duplicate ID detection) used `\bid="([^"]+)"` which matched these data attributes as if they were real HTML `id` attributes, because `\b` treats the `-` before `id` as a word boundary.

**Decision:** Changed the regex to `(?:^|\s)id="([^"]+)"` to only match standalone `id` attributes preceded by whitespace or start-of-line.

**Rationale:** The original regex caused false positive "duplicate ID" failures for diagram annotations that had both an `id` on the `<figure>` and a `data-*-id` on an inner element. The fix is minimal and precise — only the word boundary anchor changed.

**Alternatives considered:**
- Rename data attributes to avoid "id" substring (rejected: `data-tree-id` is the natural semantic name)
- Suppress false positives in check logic (rejected: masking real issues)

**Impact:** verify.js check 1 now correctly identifies only true HTML `id` attributes. 23/23 checks pass.

---

## 2026-03-22 — Round 8: CDN references for vendored libraries in single-HTML export

**Context:** The single-HTML curriculum export (`curriculum-complete.html`) needs to inline all content into one file. Mermaid.js (2.9 MB) and Chart.js (204 KB) are vendored libraries. Inlining them would make the export ~5-6 MB; using CDN references keeps it at ~1.3 MB.

**Decision:** Use CDN `<script>` tags for Mermaid.js and Chart.js in the export file, with a visible notice that diagrams require internet connectivity.

**Rationale:** The 3 MB target specified in the prompt is achievable only with CDN loading. The individual module pages still use local vendored copies for full offline support. The export is a convenience format for reading the full curriculum, not the primary delivery mechanism.

**Alternatives considered:**
- Inline everything (~5-6 MB single file) — rejected: exceeds 3 MB target, slow to load
- Offer both lean (CDN) and fat (inline) exports — deferred: possible future enhancement via a `--fat` flag
- Use a bundler to tree-shake vendored libraries — rejected: over-engineering for this project

**Impact:** Export file is 1.31 MB. Diagrams in the export require internet access. Individual module pages are unaffected (fully offline).

---

## 2026-03-22 — Round 8: Strip duplicate h1 from markdown content in build pipeline

**Context:** Each module markdown file starts with `# Module XX: Title` which converts to an `<h1>`. The Handlebars template (`module.hbs`) also generates its own `<h1>` in the module header. This created 2 `<h1>` elements per page, violating WCAG 1.3.1 heading hierarchy requirements.

**Decision:** Added a post-Layer 3 transform in `build.js` to strip the first `<h1>` from markdown-rendered HTML before injecting it into the template.

**Rationale:** The template's h1 is the canonical page heading (includes module metadata context). The markdown h1 is redundant since the template already displays the title. Stripping it at build time preserves the source markdown while fixing the HTML output.

**Alternatives considered:**
- Remove h1 from markdown source files — rejected: Round 8 scope prohibits modifying module markdown
- Change template to use h2 — rejected: h1 is semantically correct for the page title
- Hide markdown h1 with CSS — rejected: still exists in DOM for screen readers

**Impact:** All 11 module pages now have exactly 1 `<h1>`. Heading hierarchy is correct (h1 → h2 → h3).

---

## 2026-03-22 — Round 8: Conditional Mermaid/Chart.js loading per module

**Context:** All 14 pages (11 modules + index + glossary) loaded all 17 JS files including mermaid.min.js (2.9 MB) and chart.umd.min.js (204 KB), but only 8 modules use Mermaid and only 2 use Chart.js. M07 has zero diagrams. Index and glossary have no interactive components.

**Decision:** Added dynamic detection of diagram variants from YAML annotations in `build.js` and wrapped diagram scripts in Handlebars conditionals in templates. Stripped non-essential scripts from index.hbs and glossary.hbs entirely.

**Rationale:** M07 was loading 3.1 MB of unused libraries. Index and glossary loaded ~3.1 MB of diagram scripts plus ~60 KB of component scripts they could never hydrate. Conditional loading saves significant bandwidth on 6 of 14 pages.

**Alternatives considered:**
- Dynamic `import()` at runtime — rejected: requires restructuring component initialization
- Remove scripts manually per module — rejected: fragile, not data-driven
- Add all flags including `hasDecisionTree` / `hasRecommendation` — simplified: those JS files are small vanilla JS (~16 KB total), only worth conditionalizing the heavy vendored libs

**Impact:** M07 saves 3.1 MB, M08/M09 save 2.9 MB each, index/glossary save 3.1 MB+ each. verify.js check 24 validates correct loading. 25/25 checks pass.
