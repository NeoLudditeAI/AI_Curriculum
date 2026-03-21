# AGENT-INIT.md

Last updated: 2026-03-20. Adapted from generic software-engineering template for a multi-agent research & curriculum project.

This document is the operational directive for the first AI agent on this project. It provides architectural decisions, scaffolding instructions, and behavioral rules for building a multi-agent research and curriculum-building system. It is paired with a PROJECT-DESCRIPTION.md that describes the specific curriculum being built.

The receiving agent MUST treat this file as canonical, and MUST materialize it into the repository's own persistent instruction system (CLAUDE.md + rules files) during scaffolding so that all future agent sessions inherit the same standards.

---

## 0. Reading order and conflict resolution

Read these files in this order before creating or editing content:

1. PROJECT-DESCRIPTION.md
2. AGENT-INIT.md (this file)
3. CURRICULUM.md (master index — once it exists)
4. CURRENT_CYCLE.md (current work order)
5. Any existing repo instruction files (CLAUDE.md, `.claude/rules/*.md`)

Priority on conflict: PROJECT-DESCRIPTION.md > AGENT-INIT.md > CURRICULUM.md > repository instruction files > conversation.

---

## 1. Project mode: knowledge corpus, not software

This project produces a **living curriculum** — a structured body of interconnected markdown documents with derivative deliverables (HTML, slides, diagrams). There is no application code, no deployable artifact, and no test suite in the traditional sense.

All references to "code," "tests," "builds," and "deployments" in standard agent templates should be reinterpreted through this lens:

| Software concept      | Curriculum equivalent                                                            |
| --------------------- | -------------------------------------------------------------------------------- |
| Source code            | Module markdown files (`modules/MODULE-XX-*.md`)                                |
| Unit tests             | Fact verification (claims cross-referenced against sources)                     |
| Integration tests      | Cross-module consistency checks (terminology, timelines, no contradictions)      |
| E2E tests              | Curriculum completeness audit (all topics covered, learning path coherent)       |
| Build                  | Derivative generation (HTML, slides, comparison tables from source markdown)     |
| Deploy                 | Publication to workspace folder for human review                                |
| Refactor               | Module restructuring, deduplication, depth rebalancing                          |
| Dependencies           | Source materials, research profiles, web sources (tracked in SOURCES.md)        |

### Ambiguity protocol

If PROJECT-DESCRIPTION.md is vague on a topic boundary or depth question:

1. Make the simplest conservative assumption (cover the topic at survey depth).
2. Isolate the assumption in one module to limit blast radius.
3. Record the assumption and open question in CURRENT_CYCLE.md.
4. Proceed — do not block unless the ambiguity affects the curriculum's overall structure or accuracy.

---

## 2. Scaffolding sequence

Execute in three passes. Do not skip steps.

**Pass 1 — Project infrastructure:** Create documentation, instruction files, directory structure, and the master curriculum index before writing module content.

**Pass 2 — Foundation modules:** Build Module 0 (Landscape Overview) and Module 1 (Models & Intelligence Tiers) as the walking skeleton — they establish the vocabulary, competitive framing, and factual baseline that all other modules reference.

**Pass 3 — Parallel module development:** Build remaining modules in parallel using subagent teams. Each module must pass verification before being marked complete. Modules may be built in any order, but cross-references should be validated after each batch.

---

## 3. Repository layout

```text
.
├── PROJECT-DESCRIPTION.md          # What we're building and why
├── AGENT-INIT.md                   # This file — operational directives
├── CLAUDE.md                       # Persistent agent instructions (≤200 lines)
├── CURRICULUM.md                   # Master index — table of contents + status
├── CURRENT_CYCLE.md                # Living work order for current session
├── DECISION_LOG.md                 # Append-only: structural decisions + rationale
├── SOURCES.md                      # Master source registry with verification status
├── GLOSSARY.md                     # Canonical definitions for key terms
├── .claude/
│   ├── rules/
│   │   ├── 00-repo.md              # Always-on rules
│   │   ├── modules.md              # Path-scoped: module writing standards
│   │   └── research.md             # Path-scoped: research and sourcing standards
│   └── agents/
│       ├── researcher.md           # Web research and source gathering
│       ├── writer.md               # Module drafting and content creation
│       ├── reviewer.md             # Fact-checking and quality review
│       └── synthesizer.md          # Cross-module consistency and gap analysis
├── modules/
│   ├── MODULE-00-landscape-overview.md
│   ├── MODULE-01-models-and-intelligence.md
│   ├── MODULE-02-context-engineering.md
│   ├── MODULE-03-single-agent-systems.md
│   ├── MODULE-04-multi-agent-orchestration.md
│   ├── MODULE-05-openclaw-and-open-agents.md
│   ├── MODULE-06-mcp-integration-layer.md
│   ├── MODULE-07-skills-plugins-automation.md
│   ├── MODULE-08-consumer-ai-comparison.md
│   ├── MODULE-09-developer-platforms-apis.md
│   └── MODULE-10-frontier-topics.md
├── reference/
│   ├── profiles/                   # Cleaned ecosystem profiles (from uploaded originals)
│   │   ├── anthropic-claude.md
│   │   ├── openai-chatgpt.md
│   │   ├── google-gemini.md
│   │   ├── microsoft-copilot.md
│   │   └── specialized-tools.md
│   └── research/                   # Supplemental research gathered during module building
├── deliverables/                   # Generated outputs (HTML, slides, comparison tables)
│   ├── html/
│   ├── slides/
│   └── tables/
└── diagrams/                       # Architecture diagrams, ecosystem maps, flowcharts
```

---

## 4. Required documentation files

Create these with the formats below. Keep them short and index-like.

**CURRICULUM.md**: Master table of contents. For each module: number, title, status (draft/review/complete), last updated date, word count, key topics covered. Links to all modules. This is the single source of truth for curriculum state.

**CURRENT_CYCLE.md**: Living work order. Current session goals, modules in progress, modules completed this session, open questions, blockers, next priorities. MUST be updated after every module completion or significant structural change.

**DECISION_LOG.md**: Append-only. Each entry: date, context, decision, rationale, alternatives considered, impact on curriculum structure. Used for: module boundary decisions, topic depth choices, source reliability judgments, structural reorganizations.

**SOURCES.md**: Master source registry. For each source: title, URL, date accessed, verification status (verified/unverified/stale), which modules reference it. Sources include: uploaded profiles, web research, official documentation, GitHub repos.

**GLOSSARY.md**: Canonical definitions for terms used across modules. Prevents definition drift. Entries include: term, definition, first introduced (module), related terms. All modules must use GLOSSARY.md definitions consistently.

---

## 5. Persistent instruction files

### CLAUDE.md (root, canonical)

Target ≤200 lines. Only "compaction-survivor" content goes here.

```md
# CLAUDE.md

## Non-negotiables

- Follow AGENT-INIT.md and PROJECT-DESCRIPTION.md.
- Do not restructure modules without a DECISION_LOG.md entry.
- Run verification checks before declaring any module complete.
- All factual claims must be sourced. No hallucinated statistics or dates.

## Verification commands

- Cross-reference check: compare claims against SOURCES.md entries
- Terminology check: validate terms against GLOSSARY.md
- Completeness check: verify all CURRICULUM.md topics are addressed in module
- Consistency check: ensure no contradictions with other completed modules

## Content standards

- Audience: technically sophisticated self-study (assume strong baseline)
- Tone: authoritative, dense, educational — not marketing copy
- Format: living markdown documents; derivative files built from them
- Sources: every non-obvious claim needs a source; prefer primary sources
- Currency: all information must reflect March 2026 state unless historicizing

## Architecture invariants

- modules/ contains one file per module, numbered 00-10+
- reference/profiles/ contains cleaned versions of ecosystem research (no ACD content)
- CURRICULUM.md is the single source of truth for module status
- GLOSSARY.md is the single source of truth for term definitions
- Cross-references between modules use relative links

## Context rules

- This file ≤200 lines. Detail goes in .claude/rules/ and docs.
- Read CURRENT_CYCLE.md before starting any session.
- Update CURRENT_CYCLE.md and CURRICULUM.md after every module change.

## Imports

@AGENT-INIT.md
@PROJECT-DESCRIPTION.md
@CURRENT_CYCLE.md
@CURRICULUM.md
```

---

## 6. Path-specific rules (.claude/rules/)

### .claude/rules/00-repo.md (always-on)

```md
# Repository rules (always on)

- Prefer updating existing modules over creating new ones.
- Keep changes focused — one module or one structural change per work unit.
- No new modules without a CURRICULUM.md entry and DECISION_LOG.md rationale.
- All factual claims must cite a source from SOURCES.md.
- Use GLOSSARY.md definitions for all key terms.
```

### .claude/rules/modules.md

```md
---
paths:
  - 'modules/**'
---

# Module writing standards

## Structure (every module follows this skeleton)

1. **Title and metadata block** — Module number, title, last updated, status, word count target
2. **Executive summary** — 3-5 sentences. What this module covers and why it matters.
3. **Prerequisites** — Which other modules should be read first (if any).
4. **Body sections** — Organized by subtopic. Use H2 for major sections, H3 for subsections.
5. **Comparison tables** — Where applicable, use tables for head-to-head feature/capability comparisons.
6. **Key takeaways** — 5-10 bullet points summarizing the most important insights.
7. **Cross-references** — Links to related modules for deeper exploration.
8. **Sources** — Numbered list of all sources cited in the module.

## Writing rules

- Dense and educational. No filler. Every paragraph earns its place.
- Prefer concrete examples over abstract descriptions.
- When comparing platforms, be specific: feature names, model names, pricing, dates.
- Distinguish clearly between GA, Beta, Preview, Announced, and Deprecated.
- Flag areas of rapid change with a "volatility warning" callout.
- Use inline citations: [Source Name, Date] or [n] with numbered source list.
- Target 3,000-6,000 words per module (adjust based on topic breadth).
```

### .claude/rules/research.md

```md
---
paths:
  - 'reference/**'
---

# Research and sourcing standards

- Primary sources (official blogs, docs, GitHub repos) take precedence over secondary (articles, Reddit).
- Every source gets a SOURCES.md entry with: title, URL, access date, verification status.
- Mark any claim that could not be independently verified as [UNVERIFIED].
- When web research contradicts uploaded profiles, prefer the most recent source and note the discrepancy.
- Uploaded profiles (reference/profiles/) are baseline context from March 18, 2026.
- For rapidly evolving topics (pricing, model releases, feature status), verify against live sources before citing.
```

---

## 7. Subagent definitions (.claude/agents/)

Each subagent runs in its own context window. Only a structured summary returns to the parent. For this curriculum project, subagents are specialized by research and writing function rather than by code lifecycle.

### .claude/agents/researcher.md

```md
---
name: researcher
description: Gathers facts, finds sources, verifies claims. Use for any web research, source verification, or fact-finding task. Deploy in parallel for multi-topic research.
tools: Read, Grep, Glob, WebSearch, WebFetch
model: fast
---

You are a research agent for an AI curriculum project. Your job is to gather accurate, current, well-sourced information.

Workflow:
1. Receive a research brief (topic, specific questions, required depth).
2. Search web sources, official documentation, and GitHub repos.
3. Cross-reference claims across multiple sources.
4. Flag contradictions or areas of uncertainty.

Return results in this exact format:

- **Topic:** (what was researched)
- **Key findings** (bulleted; cite specific sources with URLs)
- **Data points** (numbers, dates, pricing — with source attribution)
- **Contradictions / uncertainties** (where sources disagree)
- **Sources** (numbered list: title, URL, date accessed)
- **Suggested follow-ups** (what couldn't be resolved; what needs deeper research)
```

### .claude/agents/writer.md

```md
---
name: writer
description: Drafts and revises module content. Use when research is complete and a module (or section) is ready to be written or substantially revised.
tools: Read, Edit, Write, Grep, Glob
model: inherit
---

You are a curriculum writer for a technical AI education project. Your audience is a technically sophisticated self-learner.

Workflow:
1. Read the module skeleton in CURRICULUM.md and any existing draft.
2. Read relevant research from reference/ and researcher agent outputs.
3. Read GLOSSARY.md for canonical term definitions.
4. Draft or revise content following the module structure in .claude/rules/modules.md.
5. Ensure all claims are sourced. Add new sources to SOURCES.md.
6. Update CURRICULUM.md status after completing work.

Writing principles:
- Dense, not padded. Every paragraph teaches something.
- Concrete over abstract. Use specific model names, feature names, pricing, dates.
- When comparing: use tables for structured comparison, prose for nuanced analysis.
- Cross-reference other modules where relevant (use relative links).

Return: module file path, word count, list of sources added, cross-references created, open questions.
```

### .claude/agents/reviewer.md

```md
---
name: reviewer
description: Fact-checks modules, validates sources, checks for contradictions. Use on every completed module draft before marking it complete.
tools: Read, Grep, Glob, WebSearch, WebFetch
model: inherit
---

You are a quality reviewer for an AI curriculum project. Your job is accuracy and consistency.

Review checklist:
1. **Factual accuracy:** Verify key claims against sources. Flag anything unsourced or contradicted.
2. **Currency:** Are dates, pricing, feature statuses current as of March 2026?
3. **Terminology:** Does the module use GLOSSARY.md definitions consistently?
4. **Cross-module consistency:** Does this module contradict anything in other completed modules?
5. **Completeness:** Does the module cover all topics listed for it in CURRICULUM.md?
6. **Source quality:** Are sources primary where possible? Are any sources stale?

Return:
- **Blocking issues** (factual errors, missing sources, contradictions)
- **Non-blocking improvements** (clarity, depth, organization)
- **Source gaps** (claims needing better sourcing)
- **Consistency notes** (conflicts with other modules)
- **Verdict:** PASS / NEEDS REVISION (with specific items to address)
```

### .claude/agents/synthesizer.md

```md
---
name: synthesizer
description: Analyzes the curriculum holistically. Use for cross-module gap analysis, structural reviews, glossary maintenance, and curriculum-wide consistency.
tools: Read, Grep, Glob
model: inherit
---

You are a curriculum architect. You see the forest, not the trees.

Tasks you handle:
1. **Gap analysis:** What topics are missing or underdeveloped across the curriculum?
2. **Overlap detection:** Where do modules redundantly cover the same ground?
3. **Narrative coherence:** Does the module sequence tell a coherent story? Are prerequisites met?
4. **Glossary maintenance:** Are new terms introduced in modules but missing from GLOSSARY.md?
5. **Cross-reference audit:** Are inter-module links accurate and bidirectional?
6. **Freshness check:** Flag modules that may be outdated based on their last-updated dates.

Return:
- **Structural assessment** (overall curriculum health)
- **Gaps** (missing topics, underdeveloped areas)
- **Overlaps** (redundant coverage to consolidate)
- **Broken references** (dead or inaccurate cross-links)
- **Glossary updates needed** (new terms to add or definitions to revise)
- **Recommended priorities** (what to work on next, ranked)
```

---

## 8. Context engineering rules

### Persistence-first policy

Anything that must survive compaction, session restarts, or agent switching MUST be written into a repository file. Chat history is a cache. Repo files are durable state.

Always keep current: CURRICULUM.md, CURRENT_CYCLE.md, DECISION_LOG.md, SOURCES.md, GLOSSARY.md.

### Token budget (concrete targets for 1M context)

| Category                                              | % of budget | Approx. tokens   | Notes                                         |
| ----------------------------------------------------- | ----------- | ---------------- | --------------------------------------------- |
| Persistent instructions (CLAUDE.md + always-on rules) | 2-5%        | 20,000-50,000    | Keep lean; detail goes in rules files         |
| Tool schemas (built-in + MCP)                         | 5-15%       | 50,000-150,000   | Minimize MCP servers for this project         |
| Conversation history / reasoning                      | 25-45%      | 250,000-450,000  | Primary working memory                        |
| Working set (module drafts, research, sources)        | 40-60%      | 400,000-600,000  | Read only relevant sections of long modules   |

Performance degrades non-linearly as context fills. Don't rely on "it's in there somewhere" retrieval past ~700K tokens (~70% capacity).

### Compaction design

Auto-compaction triggers at ~95% capacity. Subagent transcripts are stored independently — main compaction does not affect them.

**What survives compaction:** CLAUDE.md (reloaded fresh), auto-memory, a summary of recent work.

**What does not survive:** Verbose research outputs, detailed early conversation, web search results, full module text read earlier in session.

**Implication:** If an insight, decision, or fact matters beyond the current task, write it to a file (DECISION_LOG.md, SOURCES.md, the module itself, CURRENT_CYCLE.md). Don't leave it only in chat.

### Progressive disclosure (mandatory workflow)

1. Glob/Grep to locate relevant modules and sections.
2. Read only the smallest relevant sections (use offset/limit for large modules).
3. Edit targeted sections only.
4. Re-read to confirm changes.
5. Only then expand scope.

Never dump entire modules into context when you only need one section.

### When to delegate to subagents

**Mandatory triggers:**

- Research task requiring web search across multiple sources
- Module draft or major revision (writer agent owns the pen)
- Quality review of completed module draft (reviewer agent)
- Cross-module structural analysis (synthesizer agent)
- Parallel research on independent topics (multiple researcher agents)

**Heuristic triggers:**

- Investigation expected to exceed ~2,000 tokens of notes
- Needing >1 parallel thread (e.g., "research OpenClaw skills" + "research MCP registry" + "verify pricing tables")
- Topic is outside the current module's scope but needs a quick answer for a cross-reference

### Model selection guidance

| Task type                                                    | Recommended model | Rationale                                      |
| ------------------------------------------------------------ | ----------------- | ---------------------------------------------- |
| Web research, source gathering, simple fact verification     | fast (Haiku)      | Cheap, fast, sufficient for search + retrieval |
| Module writing, revision, structured analysis                | inherit (Sonnet)  | Good balance of quality and cost               |
| Curriculum architecture, nuanced cross-module synthesis      | strong (Opus)     | Worth the cost for structural decisions        |
| Final fact-checking review of completed modules              | inherit (Sonnet)  | Thorough enough; Opus if high-stakes           |

---

## 9. Source management

### Source hierarchy

1. **Official documentation** (docs.anthropic.com, platform.openai.com, ai.google.dev, learn.microsoft.com) — highest authority
2. **Official blogs** (anthropic.com/news, openai.com/blog, blog.google, microsoft.com/blog) — high authority
3. **GitHub repositories** (source code, READMEs, release notes) — high authority for open-source projects
4. **Reputable tech journalism** (The Verge, Ars Technica, TechCrunch) — secondary; verify claims against primary sources
5. **Community sources** (Reddit, Hacker News, developer forums) — useful for user sentiment and practical experience; always note as community source
6. **Uploaded research profiles** (reference/profiles/) — baseline context from March 18, 2026; verify any rapidly-changing claims before citing

### Verification protocol

- Every module must have ≥80% of factual claims traceable to a SOURCES.md entry.
- Pricing, model names, and feature availability statuses are high-volatility — always verify against primary sources.
- When a source contradicts an uploaded profile, prefer the most recent primary source and note the discrepancy in the module.

---

## 10. Module lifecycle

### States

```
PLANNED → RESEARCHING → DRAFTING → IN REVIEW → REVISION → COMPLETE
```

### Transitions

| From         | To           | Trigger                                              | Who                    |
| ------------ | ------------ | ---------------------------------------------------- | ---------------------- |
| PLANNED      | RESEARCHING  | Module assigned to current cycle                     | Lead agent             |
| RESEARCHING  | DRAFTING     | Research brief complete; key sources gathered         | Researcher → Writer    |
| DRAFTING     | IN REVIEW    | First complete draft exists                          | Writer → Reviewer      |
| IN REVIEW    | REVISION     | Reviewer returns issues                              | Reviewer → Writer      |
| IN REVIEW    | COMPLETE     | Reviewer returns PASS                                | Reviewer → Lead        |
| REVISION     | IN REVIEW    | Writer addresses all blocking issues                 | Writer → Reviewer      |
| COMPLETE     | REVISION     | New information invalidates content; synthesizer flag | Synthesizer → Writer   |

### Completion criteria

A module is COMPLETE when:

1. All CURRICULUM.md topics for the module are covered
2. Reviewer agent returns PASS verdict
3. All factual claims are sourced in SOURCES.md
4. Terminology matches GLOSSARY.md
5. Cross-references to other modules are accurate
6. Module follows the structure defined in .claude/rules/modules.md

---

## 11. Derivative generation

Modules are the source of truth. Deliverables are generated from them, not the other way around.

| Deliverable            | Source                           | Format            | When to generate                       |
| ---------------------- | -------------------------------- | ----------------- | -------------------------------------- |
| Interactive comparison | Comparison tables from modules   | HTML/React (.jsx) | After modules with comparison data     |
| Slide deck             | Module executive summary + tables| PPTX              | On request or after module completion  |
| Ecosystem map          | Cross-module synthesis           | SVG/Mermaid       | After Module 0 + Module 8 complete     |
| Glossary reference     | GLOSSARY.md                      | HTML              | After significant glossary updates     |
| Full curriculum export | All complete modules             | Single HTML       | On request                             |

Always regenerate deliverables from current module content — never edit deliverables directly.

---

## 12. Recovery protocol

When something goes wrong (contradictory information, structural incoherence, stale content):

1. **Stop.** Do not compound the error with more changes.
2. **Diagnose.** Spawn a researcher subagent to verify the conflicting information against primary sources.
3. **Assess scope.** Is this one module or a systemic issue across multiple modules?
4. **Choose recovery strategy:**
   - **Single module, minor error:** Fix in place, update SOURCES.md, note correction in module.
   - **Single module, major restructure needed:** Revert to last known good state if in git, re-plan section.
   - **Cross-module inconsistency:** Spawn synthesizer agent for full audit, prioritize fixes by module dependency order.
5. **Document.** Add entry to DECISION_LOG.md explaining what was wrong and how it was corrected.

---

## 13. Behavioral rules for all agents

These apply to every agent session, regardless of task.

- Read CLAUDE.md and CURRENT_CYCLE.md before starting. Treat them as binding.
- Check existing module content before writing new sections — avoid duplication.
- Do not restructure the curriculum without a DECISION_LOG.md entry.
- Never declare a module complete without running the verification checklist.
- Update CURRICULUM.md status and CURRENT_CYCLE.md after every material change.
- All factual claims must be sourced. When uncertain, mark as [UNVERIFIED] and flag for follow-up.
- Prefer specific, concrete information over vague generalities.
- When research reveals the uploaded profiles are outdated, update reference/profiles/ and note the change.
- When uncertain about module scope or depth, check PROJECT-DESCRIPTION.md first, then ask the human with specific options and tradeoffs.
- Default to parallel subagent deployment when researching independent topics.

---

## 14. Git workflow

- **Branching:** Feature branches per module or per structural change. PR-style review via reviewer agent.
- **Commits:** Conventional commits adapted for content: `content(module-03): draft single-agent systems`, `fix(sources): correct Claude Opus 4.6 pricing`, `docs(glossary): add MCP terminology`.
- **Commit frequency:** Commit after each module state transition (draft complete, review passed, etc.).

---

_Adapted 2026-03-20 from generic software-engineering AGENT-INIT template for research/curriculum use. Core context engineering principles preserved; software lifecycle concepts mapped to content lifecycle equivalents._
