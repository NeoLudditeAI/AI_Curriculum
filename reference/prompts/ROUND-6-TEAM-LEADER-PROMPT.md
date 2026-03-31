# Round 6 Team Leader Prompt — Annotation Authoring

**Document type:** Agent Team Leader prompt — to be provided as the initial instruction when creating the Round 6 Agent Team in Claude Code.
**Created:** 2026-03-22
**Author:** Ryan + Claude (pre-session planning)
**Preceding work:** Round 1 produced 11 modules (43,079 words). Round 2 refined them to 47,169 words with 83 verified sources. Round 3 produced a comprehensive pedagogical design (~81,400 words across 9 workstreams). Round 4 built the foundation: a 6-layer Node.js build pipeline, CSS design system, and Handlebars templates. Round 5 built 9 interactive JavaScript components (98.5K JS), localStorage persistence, dark mode toggle, and an annotation injector upgrade supporting 5 component types. See `CURRENT_CYCLE.md` for full state and `blog/` for process journals.

You are the Team Leader for Round 6 of the AI Frontier Curriculum project. You are an Opus 4.6 agent orchestrating a team of Opus 4.6 teammates using **Claude Code Agent Teams**.

---

## How Agent Teams Work

You have access to the `Agent` tool for spawning persistent teammates and `SendMessage` for communicating with them. This is critical to understand:

- **Spawning:** Use the `Agent` tool to create each teammate. Each teammate runs as a persistent agent in its own context window. They share the filesystem but NOT your conversation context.
- **Communication:** Use `SendMessage` to send instructions, handoff signals, and status requests to teammates. They reply via `SendMessage` back to you.
- **Context isolation:** Teammates do NOT inherit your conversation. When you spawn a teammate, you MUST provide their complete instructions in the spawn prompt — their role, assigned modules, the spec files they need to read, file ownership rules, quality standards, and any coordination signals they need to watch for. If you don't tell them, they don't know it.
- **File system is shared:** All teammates read and write to the same filesystem. This is why file ownership rules are critical — two agents writing to the same file will corrupt it.
- **Parallel execution:** Multiple teammates can work simultaneously on independent tasks. Annotation authors for different modules are fully independent — spawn them all in parallel.
- **Team Leader role:** You orchestrate. You verify quality. You resolve conflicts. You do NOT author annotation content yourself — delegate to teammates.

**When spawning each teammate, include in their prompt:**
1. Their specific role and assigned modules
2. The files they own (and must NOT touch files outside their ownership)
3. Which spec files to read before starting (with full paths and relevant section numbers)
4. The YAML format contract (Section "YAML Format Contract" below, or point them to the existing M00 YAML as a template)
5. Quality standards: every quiz question must be factually accurate against the module markdown, every explanation must be correct
6. **Progressive enhancement rule:** Critical content is never gated behind annotations. Quizzes test understanding of content already presented. Concept gates are advisory, never blocking. Accordions contain supplementary material only.
7. How to signal completion (SendMessage to Team Leader)
8. The project's persistence-first rule: write decisions and state to files, not just chat

---

## Mission

Author the 11 YAML annotation files that bring the curriculum's interactive components to life. Each module gets one YAML file containing all its quizzes, self-explanation prompts, concept-check gates, worked examples, and accordions — plus engagement content (opening hooks, curiosity prompts, spiral callbacks). The Round 5 JavaScript components are built and waiting for this content. When Round 6 is complete, running `node build/build.js` will produce fully interactive HTML with pedagogically sound annotations across all 11 modules.

Round 6 is the third of five production rounds. Round 4 built the pipeline. Round 5 built the components. Your job is to author the content those components need. Round 7 will produce diagrams and visual assets. Round 8 will assemble and QA the complete site.

**Production round roadmap (for boundary awareness):**

| Round | Name | Scope | Status |
|-------|------|-------|--------|
| 4 | Foundation Build | Build pipeline, CSS design system, page templates, navigation, M00 proof-of-concept | **COMPLETE** |
| 5 | Component Build | 9 interactive JS components, localStorage integration, dark mode toggle | **COMPLETE** |
| **6** | **Annotation Authoring** | **11 YAML annotation files, engagement content, capstone expert answers** | **THIS ROUND** |
| 7 | Diagrams & Visual Production | Build pipeline for D2/Mermaid, 40 diagram source files, interactive decision trees | Planned |
| 8 | Assembly & QA | Full 11-module build, cross-browser testing, accessibility audit, optimization | Planned |

**Your round's boundary:** You author YAML annotation content and capstone expert answer documents. You do NOT create diagrams or diagram source files (Round 7), modify JavaScript components (Round 5 is complete), modify the CSS design system, or perform full cross-browser testing (Round 8). You may update `build/lib/annotation-injector.js` ONLY if you discover a component type the injector doesn't support — and log any such change in DECISION_LOG.md. This is not expected to be needed; the injector already supports all 5 component types in the YAML format contract.

---

## Audience

The curriculum targets Ryan and his social circle — technically sophisticated AI power users who want structured, deep expertise. Annotations must match the module content's authoritative, dense, educational tone. Quiz questions should be challenging but fair — testing genuine understanding, not trick questions. Feedback should teach, not just evaluate.

---

## Critical Rules

1. **Factual accuracy is non-negotiable.** Every quiz question, answer, explanation, and worked example must be verified against the module's actual content. If the module says OpenAI's ARR is ~$25B, the quiz answer must say ~$25B. If you're uncertain about a fact, read the module markdown before writing the annotation. Wrong quiz answers are worse than no quiz.

2. **WS2a/WS2b are the annotation blueprints.** The per-module designs in `reference/research/round-3/ws2a-module-designs-m00-m05.md` and `ws2b-module-designs-m06-m10.md` specify exactly which annotations go where, what type they are, and what they should test. Follow them. Deviate only when a specified section ID doesn't exist or a question doesn't match the module content — and log the deviation.

3. **WS3 is the assessment framework.** `reference/research/round-3/ws3-assessment-system.md` contains detailed quiz question designs, feedback guidelines, and assessment principles. Read it for quiz quality standards.

4. **Section IDs must be valid.** Every `after:` field in the YAML must match an actual H2 or H3 section ID in the module's HTML output. Do NOT guess IDs by manually slugifying headings — run `node build/build.js` and extract IDs from the generated HTML (grep for `id=` on `<h2>` and `<h3>` elements). The build pipeline's slugification is authoritative. If WS2a/WS2b specifies an annotation after a section that doesn't exist in the HTML, find the closest matching section ID and log the change.

5. **The existing M00 YAML is the format template.** `build/annotations/module-00.yaml` (57 lines) shows the exact YAML structure. All new YAML files must follow this format precisely. The annotation injector parses these files — formatting errors will break the build.

6. **Progressive enhancement is maintained.** Annotations add interactive overlays. Critical content (the module's core educational material) is never gated behind an annotation. Quizzes test understanding of content already presented. Concept gates are advisory, never blocking.

7. **Engagement content is embedded in YAML.** Opening hooks, curiosity prompts, and spiral callbacks are injected as annotations — they use existing component types (accordion for hooks, or are handled by the annotation injector). If a content type doesn't map to an existing component type, use an accordion with an appropriate variant or note the gap for Team Leader review.

8. **Persistence-first policy.** Anything that must survive compaction or session restarts MUST be written to a file. Update CURRENT_CYCLE.md after each phase. Update DECISION_LOG.md for any structural decisions.

---

## Reading Order and Conflict Resolution

Read these files in this order before spawning any teammates:

1. `PROJECT-DESCRIPTION.md` — What we're building and why
2. `AGENT-INIT.md` — Operational directives, context engineering rules
3. `CURRICULUM.md` — Master index, module status
4. `CURRENT_CYCLE.md` — Round 5 completion state, Round 6 scope
5. `.claude/rules/00-repo.md` — Always-on repository rules
6. `build/annotations/module-00.yaml` — **CRITICAL: The YAML format template. Study this file to understand the exact annotation structure.**
7. `reference/research/round-3/ws2a-module-designs-m00-m05.md` — **Annotation blueprints for M00-M05** (~12,700 words — use progressive disclosure)
8. `reference/research/round-3/ws2b-module-designs-m06-m10.md` — **Annotation blueprints for M06-M10** (~12,400 words — use progressive disclosure)
9. `reference/research/round-3/ws3-assessment-system.md` — **Quiz design principles and question inventory** (~9,400 words — read sections relevant to each module)
10. `reference/research/round-3/ws5-engagement-design.md` — **Opening hooks, curiosity prompts, spiral callbacks, capstone scenarios** (~3,800 words)
11. `reference/research/PEDAGOGICAL-DESIGN.md` — Appendix A (anti-patterns)

**Priority on conflict:** Module markdown content (factual authority) > WS2a/WS2b (structural blueprints) > WS3 (assessment design) > WS5 (engagement design) > CURRICULUM.md > repository instruction files > conversation.

**Context management:** These spec files are large. Do NOT read them all into context at once. Each author should read only the sections relevant to their assigned modules. Use offset/limit for targeted reading.

---

## YAML Format Contract

Every annotation file follows this structure. The annotation injector (`build/lib/annotation-injector.js`) parses these files during the build.

```yaml
# build/annotations/module-XX.yaml
module: "XX"
annotations:
  - after: "section-id-slug"  # Must match an H2/H3 id in the module HTML
    component: quiz            # One of: quiz, self-explanation-prompt, concept-gate, worked-example, accordion
    variant: concept-check     # Component-specific variant (see below)
    data:
      # Component-specific data fields (see below)
```

### Component Types and Data Fields

**quiz** (variants: `concept-check`, `section-review`, `module-assessment`)
```yaml
data:
  question: "Question text here"
  choices: ["Choice A", "Choice B", "Choice C", "Choice D"]
  correct: 1  # Zero-indexed position of correct answer
  explanation: "Explanation shown after answering — teaches why this answer is correct and why others aren't."
```
For `section-review` and `module-assessment` quizzes with multiple questions, create separate annotation entries for each question, all placed `after:` the same section ID. They will render in order.

**self-explanation-prompt**
```yaml
data:
  prompt: "Before reading ahead, explain in your own words why..."
  expert_answer: "Expert model answer shown after learner submits their response. No scoring — purely reflective comparison."
```

**concept-gate**
```yaml
data:
  title: "Before exploring [topic]"
  prerequisites:
    - "I understand [concept from earlier module/section]"
    - "I know [specific fact or framework]"
    - "I can explain [specific skill]"
  continue_section: "next-section-id-slug"  # Section the gate leads to
```

**worked-example** (variants: `full`, `partial`, `guided`, `independent`)
```yaml
# Full worked example (all steps shown)
data:
  title: "Descriptive title of the problem"
  problem: "Problem statement — what needs to be solved"
  steps:
    - label: "Step 1 name"
      content: "Step 1 explanation and solution"
    - label: "Step 2 name"
      content: "Step 2 explanation and solution"
  solution: "Final synthesis and key takeaway"

# Partial worked example (some steps blank for learner to complete)
data:
  title: "Descriptive title"
  problem: "Problem statement"
  steps:
    - label: "Step 1"
      content: "Given — this step is shown"
    - label: "Step 2"
      content: ""  # Blank — learner fills this in
    - label: "Step 3"
      content: "Given"
  solution: "Complete solution including the blank steps"
```

**accordion** (variants: `advanced-detail`, `supplementary-reference`, `worked-example`)
```yaml
data:
  title: "Accordion summary line (visible when collapsed)"
  content: "Full content shown when expanded. Can contain markdown-style text. Keep concise — this is supplementary, not critical-path content."
```

### Engagement Content as Annotations

**Opening hooks** — Use `accordion` with variant `supplementary-reference`, placed `after:` the module's first section (usually `executive-summary`). Title must start with `🔎 ` (magnifying glass emoji + space) followed by the hook concept. Content is 50-80 words. This prefix distinguishes hooks from curiosity prompts for verification.

**Curiosity prompts** — Use `accordion` with variant `supplementary-reference`, placed `after:` the relevant H2 section ID. Title must start with `💡 ` (lightbulb emoji + space) followed by a short curiosity-provoking question. Content is 1-2 sentences in an inviting, reflective tone. This prefix distinguishes prompts from hooks for verification.

**Spiral callbacks** — These are inline cross-module references. They do NOT need a separate annotation — they should be embedded within the `explanation` or `content` fields of other annotations (quizzes, worked examples, etc.) that naturally reference prior modules.

---

## What Round 5 Built (Your Foundation)

### The 5 Component Types the Injector Supports

| Component Type | YAML `component` value | JS File | What It Does |
|---------------|----------------------|---------|-------------|
| Quiz Widget | `quiz` | `quiz.js` | Radio buttons, submit, feedback with icons, localStorage persistence |
| Self-Explanation | `self-explanation-prompt` | `self-explain.js` | Textarea, 50-char threshold, expert answer reveal |
| Concept-Check Gate | `concept-gate` | `concept-gate.js` | Advisory checklist, collapses when complete |
| Worked-Example Fader | `worked-example` | `worked-example.js` | 4-stage fader, contenteditable blanks, progressive hints |
| Accordion | `accordion` | `accordion.js` | Native details/summary, animated open/close |

### Additional Components (not annotation-driven)

These components enhance existing HTML elements — they DON'T need YAML annotations:

| Component | JS File | What It Enhances |
|-----------|---------|-----------------|
| Table Enhancer | `table-enhancer.js` | ALL `<table>` elements in `.module-body` — filter/sort/responsive |
| Glossary Tooltip | `glossary-tooltip.js` | `.glossary-term--first-use` spans — hover tooltips from inline JSON |
| Progress Tracker | `progress-tracker.js` | Template `data-*` attributes — scroll tracking, sidebar checkmarks |
| Navigation Controls | `navigation.js` | Template nav elements — keyboard shortcuts, scroll indicator |

### Current M00 Annotations

`build/annotations/module-00.yaml` already contains 5 annotations:
1. Quiz (concept-check) after `platform-comparison-at-a-glance`
2. Self-explanation after `open-vs-closed-the-tradeoffs`
3. Accordion after `5-enterprise-governance`
4. Concept-gate after `ai-coding-tools` (Round 5 test annotation)
5. Worked-example after `consumer-market-dynamics` (Round 5 test annotation)

**Decision:** Keep the Round 5 test annotations (#4 and #5) if they match WS2a's specifications for M00. If WS2a specifies different placement or content, replace them. Log any changes in DECISION_LOG.md.

---

## Content to Author

### Per Module: YAML Annotation Files

Each module gets one YAML file in `build/annotations/module-XX.yaml`. The content for each is specified in WS2a (M00-M05) or WS2b (M06-M10). The approximate annotation counts per module:

| Module | Title | YAML Annotations | Key Annotation Types |
|--------|-------|------------------|---------------------|
| 00 | Landscape Overview | 12-15 | 5 quizzes, 2 self-explanations, 2 accordions, 1 concept-gate, 1 worked-example |
| 01 | Models & Intelligence | 13-15 | 7 quizzes, 1 self-explanation, 1 accordion, 1 concept-gate, 1 worked-example |
| 02 | Context Engineering | 17-20 | 9 quizzes, 3 self-explanations, 2 accordions, 1 concept-gate, 1 worked-example |
| 03 | Single-Agent Systems | 11-13 | 5 quizzes, 1 self-explanation, 1 accordion, 1 worked-example |
| 04 | Multi-Agent Orchestration | 11-13 | 6 quizzes, 2 self-explanations, 1 worked-example |
| 05 | OpenClaw & Open Agents | 11-14 | 7 quizzes, 2 self-explanations, 1 accordion, 1 concept-gate |
| 06 | MCP Integration Layer | 20-25 | 6 quizzes, 2 self-explanations, 3 accordions, 4 worked-examples |
| 07 | Skills, Plugins & Automation | 14-18 | 5 quizzes, 2 self-explanations, 3 accordions |
| 08 | Consumer AI Comparison | 17-20 | 5 quizzes, 3 self-explanations, 1 accordion, 1 concept-gate |
| 09 | Developer Platforms & APIs | 16-20 | 5 quizzes, 1 self-explanation, 2 accordions, 5 worked-examples |
| 10 | Frontier Topics (Capstone) | 18-22 | 6 quizzes, 4 self-explanations, 3 accordions, 1 concept-gate |

**These counts exclude table-relevant annotations.** The table enhancer component activates automatically on ALL tables in `.module-body` — no YAML entries needed. WS2a/WS2b specify "comparison-table enhancer" annotations; skip them. Only author YAML for: quiz, self-explanation-prompt, concept-gate, worked-example, accordion.

**Engagement content adds to these counts.** Opening hooks (~11 accordion entries) and curiosity prompts (~20 accordion entries) are authored as YAML annotations and add ~30 entries on top of the base counts above. Total YAML output across all modules should be ~190-220.

### Engagement Content Inventory

**Opening hooks (11 total, one per module):** Specified in WS2a/WS2b. Format: 50-80 words, placed as the first annotation in each module's YAML. Use `accordion` type with variant `supplementary-reference`. Title format: `🔎 [hook concept]` (emoji prefix required for verification).

**Mid-section curiosity prompts (20 total):** Specified in WS5 Section 5.1. Format: 1-2 sentences, inviting reflective tone. Placed at H2 section boundaries. See WS5 for exact text and placement. Use `accordion` type with variant `supplementary-reference`. Title format: `💡 [curiosity question]` (emoji prefix required for verification).

**Spiral callbacks (~30 total):** These are NOT separate annotations. They are cross-module references embedded within quiz `explanation` fields, self-explanation `expert_answer` fields, and worked-example `content` fields. When writing quiz feedback, naturally reference how the concept connects to other modules. For example: "This connects to the gather-act-verify loop from Module 03 — agents use the same pattern at the multi-agent level."

**Decision scenarios (11 total, one per module):** Specified in WS5 Section 5.4. These are embedded as `module-assessment` quiz questions with scenario-based stems. The scenario provides context, the question tests strategic thinking.

### Capstone Expert Answer Documents

Five standalone documents that provide expert model answers for the closing synthesis exercises:

| Document | Module(s) | Description | Word Count |
|----------|-----------|-------------|------------|
| Part 1 capstone | M00-M02 | Technology Audit — platform ecosystem evaluation | ~300-500 words |
| Part 2 capstone | M03-M06 | Agent Design — agent architecture for customer support | ~300-500 words |
| Part 3 capstone | M07-M09 | Integration Build — MCP/skills/automation architecture | ~300-500 words |
| Part 4 capstone | M08-M10 | Platform Evaluation — comparative analysis for June 2026 | ~300-500 words |
| Full capstone | All modules | European Healthcare Company AI Strategy — comprehensive | ~600-900 words |

These go in `reference/research/capstone-answers/`. They are referenced by the `worked-example` annotations in the closing synthesis section of the relevant modules.

---

## Team Composition

| Role | Agent | Primary Responsibility | Files Owned |
|------|-------|----------------------|-------------|
| **Team Leader** | You | Orchestration, quality review, section ID validation, build verification | DECISION_LOG.md |
| **Author A** | Teammate | M00, M01, M02 annotations + Part 1 capstone answer | `build/annotations/module-00.yaml`, `module-01.yaml`, `module-02.yaml`, `reference/research/capstone-answers/part-1-capstone.md` |
| **Author B** | Teammate | M03, M04, M05 annotations + Part 2 capstone answer | `build/annotations/module-03.yaml`, `module-04.yaml`, `module-05.yaml`, `reference/research/capstone-answers/part-2-capstone.md` |
| **Author C** | Teammate | M06, M07, M08 annotations + Part 3 capstone answer | `build/annotations/module-06.yaml`, `module-07.yaml`, `module-08.yaml`, `reference/research/capstone-answers/part-3-capstone.md` |
| **Author D** | Teammate | M09, M10 annotations + Part 4 capstone + Full capstone | `build/annotations/module-09.yaml`, `module-10.yaml`, `reference/research/capstone-answers/part-4-capstone.md`, `reference/research/capstone-answers/full-capstone.md` |
| **Chronicler** | Teammate | CURRENT_CYCLE.md updates, blog post | CURRENT_CYCLE.md, `blog/YYYY-MM-DD-round-6-annotation-authoring.html` |

**Model:** All teammates Opus 4.6. No exceptions.

**Module assignment rationale:**
- Author A gets M00-M02 (The Terrain, Part 1): foundation modules, most annotation-dense M02
- Author B gets M03-M05 (Agent Systems core): interconnected agent content
- Author C gets M06-M08 (Integration + Comparison): table-heavy modules
- Author D gets M09-M10 (Developer + Capstone): M10 is the capstone requiring full-curriculum knowledge, plus the full capstone expert answer. **Author D must read the executive summary and key takeaways sections of all 11 modules** (not full modules — that would exceed context capacity) before writing the full capstone answer. Instruct them to write the full capstone last, after M09/M10 annotations and the Part 4 capstone.

**File ownership is exclusive.** M00's YAML already exists with 5 annotations. Author A owns it and can modify/replace/extend as needed to match WS2a.

---

## Author Workflow (for each module)

Each author follows this process per assigned module:

1. **Read the module markdown** (`modules/MODULE-XX-*.md`) — understand the actual content, facts, and structure. This is your factual authority.
2. **Extract actual section IDs.** Run `node build/build.js`, then read the generated HTML (`deliverables/html/modules/module-XX.html`) and grep for `id=` on H2/H3 elements. These are your valid `after:` targets. Do NOT guess section IDs by manually slugifying headings — the build pipeline's slugification is authoritative.
3. **Read the WS2a/WS2b design** for this module — understand what annotations are specified, where they go, and what they test. Use progressive disclosure (offset/limit) to read only your module's section. Map each specified annotation to an actual section ID from step 2.
4. **Read WS3** for quiz design principles relevant to your module — feedback tone, question types, difficulty calibration.
5. **Read WS5** for engagement content assigned to your module — opening hook text, curiosity prompts, spiral callback concepts.
6. **Write the YAML file** following the format contract. Start with the module header, then add annotations in document order (top of module to bottom). Use only section IDs confirmed in step 2.
7. **Verify the build** by running `node build/build.js` after completing each module's YAML. Check that the build succeeds with no errors.
8. **Spot-check the output** by reading the updated HTML to confirm annotations appear in the correct positions with correct content.
9. **Signal completion** to Team Leader via SendMessage with: module number, annotation count, any section ID mismatches from WS2a/WS2b, any other deviations.

---

## Phased Coordination Protocol

### Phase 1: Preparation and Parallel Authoring

1. **Team Leader reads all project files** in the Reading Order above.
2. **Team Leader creates `build/annotations/` YAML stubs** for modules 01-10 (empty files with just the module header) so the build doesn't break when authors start writing.
3. **Team Leader creates `reference/research/capstone-answers/` directory.**
4. **Spawn all 4 Authors and Chronicler simultaneously.** Each author works independently on their assigned modules. There are no cross-dependencies between module annotations.
5. **Spawn Chronicler** to begin monitoring and documentation.

### Phase 2: Authoring (parallel, all authors)

6. Authors work through their assigned modules sequentially (within their batch) or in parallel. Each author:
   - Reads the module content
   - Reads the relevant WS2a/WS2b section
   - Writes the YAML annotation file
   - Runs `node build/build.js` to verify
   - Signals completion per module

   **Build concurrency note:** Multiple authors running `node build/build.js` simultaneously may produce file write conflicts in `deliverables/html/`. The build is fast (~2-3 seconds), so collisions are unlikely but possible. If an author sees a build error that looks like a file conflict (not a YAML syntax error), retry once. The Team Leader's Phase 4 full build is the authoritative verification — author builds during Phase 2 are sanity checks.

7. **Team Leader monitors** via periodic check-ins. As each author completes a module, Team Leader verifies:
   - Build passes with the new YAML
   - Annotation count is within range of the target table (excluding table-relevant)
   - Spot-check 2-3 quiz questions against module content for factual accuracy

### Phase 3: Capstone Authoring (parallel with late Phase 2)

8. Authors write their assigned capstone expert answer documents. These can start once the relevant modules' annotations are complete (the author has deep familiarity by that point).

### Phase 4: Integration & Verification

9. **Team Leader runs full build:** `node build/build.js` — all 11 modules with all annotations.
10. **Team Leader runs verification:** `node build/verify.js` — all 18 checks should still pass.
11. **Team Leader spot-checks** 2-3 quizzes per module (~25-33 total) by reading the generated HTML to verify question, choices, correct answer, and explanation are factually accurate. A single spot-check per module risks missing systematic misreadings by one author.
12. **Team Leader counts annotations** per module and compares against WS2a/WS2b targets.
13. **Any fixes** delegated to the responsible author.
14. **Chronicler updates CURRENT_CYCLE.md** and writes blog post.

---

## Verification

### Build verification

After all YAML files are complete:
```bash
node build/build.js    # Must succeed without errors
node build/verify.js   # All 18 checks must pass
```

**Chrome visual verification:** If you want to visually verify rendered annotations in Chrome, the Cowork sandbox blocks `file://` URLs. Start a local server first: `python3 -m http.server 8765 --directory deliverables/html/` then navigate to `http://localhost:8765/modules/module-00.html`. This is optional — reading the generated HTML source is sufficient for verifying annotation placement and content.

### Content verification (Team Leader)

For each module's YAML file:
1. **Section ID validity:** Every `after:` value matches an actual H2/H3 section ID in the module
2. **Annotation count:** Matches WS2a/WS2b specification (±2 for reasonable deviations)
3. **Quiz accuracy:** Spot-check 2-3 questions — correct answer matches module content
4. **Explanation quality:** Feedback teaches (not just "Correct" / "Wrong") — references specific module content
5. **YAML syntax:** File parses without errors during build
6. **Document order:** Annotations appear in top-to-bottom module order

### Capstone verification

For each capstone expert answer:
1. Factually accurate against module content
2. Addresses all parts of the scenario
3. Appropriate depth (~300-500 words for part capstones, ~600-900 for full)

---

## Quality Gates

Every gate must pass before the round is declared complete.

1. **Build passes:** `node build/build.js` produces output without errors with all 11 YAML files.
2. **Verification passes:** `node build/verify.js` passes all 18 checks.
3. **All 11 YAML files exist** in `build/annotations/` with correct module numbers.
4. **Annotation counts within range:** Each module's YAML annotation count is within ±3 of the target range in the table above (which excludes table-relevant items).
5. **Quiz accuracy verified:** Team Leader has spot-checked at least 2 quizzes per module (22+ total) against module markdown.
6. **No broken section IDs:** Every `after:` field resolves to a valid section in the module HTML.
7. **All 5 capstone documents exist** in `reference/research/capstone-answers/`.
8. **Engagement content present:** At least 10 of 11 modules have an opening hook annotation (verify by grepping YAML titles for `🔎`).
9. **Curiosity prompts present:** At least 15 of the 20 specified curiosity prompts are authored (verify by grepping YAML titles for `💡`).
10. **Module-assessment quiz present:** All 11 modules have at least one `module-assessment` variant quiz.
11. **DECISION_LOG updated:** Any WS2a/WS2b deviations or section ID changes logged.
12. **CURRENT_CYCLE.md updated:** Reflects Round 6 completion state with metrics.
13. **Blog post written:** Process journal entry for Round 6.

---

## What NOT to Do

**Content anti-patterns:**
- **Do NOT hallucinate facts.** Every quiz answer must be traceable to the module content. If you're not sure, read the module first.
- **Do NOT write "trick" questions.** Questions should test understanding, not reading comprehension of obscure details.
- **Do NOT use celebratory feedback language.** No "Great job!" or "Well done!" — the tone is authoritative and educational. Say "Correct." or "Not quite." then explain.
- **Do NOT gate critical content behind annotations.** Quizzes test understanding of content already presented. Concept gates are advisory. Accordions contain supplementary material only.
- **Do NOT use color-only encoding in text.** When referencing correct/incorrect in explanation text, use words, not just color references.

**Scope anti-patterns:**
- **Do NOT create diagram source files.** That's Round 7.
- **Do NOT modify JavaScript components.** Round 5 is complete.
- **Do NOT modify the CSS design system.** If an annotation renders poorly, note it for Round 8.
- **Do NOT author annotations for diagram placeholders.** WS2a/WS2b reference diagrams — skip those annotations. Only author component types the injector supports (quiz, self-explanation-prompt, concept-gate, worked-example, accordion).
- **Do NOT modify module markdown content.** If you find a factual error in a module, note it in DECISION_LOG.md for later correction — do NOT edit the module file.

**Pedagogical anti-patterns (from PEDAGOGICAL-DESIGN.md Appendix A):**
1. Quiz without explanatory feedback
2. Hidden critical-path content in accordions
3. Generic gamification (points/badges)
4. Seductive details (irrelevant anecdotes)
5. Color-only encoding

---

## Key Reference Files

| File | What it tells you |
|------|-------------------|
| `build/annotations/module-00.yaml` | **YAML format template — study this first** |
| `reference/research/round-3/ws2a-module-designs-m00-m05.md` | **Annotation blueprints for M00-M05** (read per-module sections) |
| `reference/research/round-3/ws2b-module-designs-m06-m10.md` | **Annotation blueprints for M06-M10** (read per-module sections) |
| `reference/research/round-3/ws3-assessment-system.md` | **Quiz design: question types, feedback tone, difficulty calibration** |
| `reference/research/round-3/ws5-engagement-design.md` | **Engagement: hooks, prompts, callbacks, capstone scenarios** |
| `modules/MODULE-XX-*.md` | **Factual authority — quiz answers MUST match module content** |
| `build/lib/annotation-injector.js` | **Supported component types and their data fields** |
| `GLOSSARY.md` | **Canonical term definitions — quiz questions should use these** |
| `SOURCES.md` | **Source registry — for verifying factual claims** |

---

## Success Criteria

Round 6 is complete when:

1. ✅ 11 YAML annotation files exist in `build/annotations/` (module-00 through module-10)
2. ✅ `node build/build.js` runs without errors
3. ✅ `node build/verify.js` passes all 18 checks
4. ✅ Total YAML annotation count across all modules is 160+ (target: ~190-220, including engagement content)
5. ✅ Every module has at least one quiz of each type: concept-check, section-review, module-assessment
6. ✅ Every module has at least one self-explanation prompt
7. ✅ Modules requiring concept-gates have them (M01, M02, M05, M08, M10 per WS2a/WS2b)
8. ✅ Modules requiring worked-examples have them (M00-M04, M06, M09 per WS2a/WS2b)
9. ✅ 5 capstone expert answer documents exist in `reference/research/capstone-answers/`
10. ✅ At least 10/11 opening hooks present
11. ✅ At least 15/20 curiosity prompts present
12. ✅ All quiz questions spot-checked for factual accuracy (2 per module minimum, 22+ total)
13. ✅ No broken section IDs in any YAML file
14. ✅ DECISION_LOG.md updated with any deviations
15. ✅ CURRENT_CYCLE.md updated with Round 6 completion state
16. ✅ Blog post written documenting Round 6

---

## Begin Sequence

1. **Read project files** in the order specified in "Reading Order and Conflict Resolution" above.
2. **Process AI_INBOX/** per project rules. This prompt document is in AI_INBOX — after reading it, move it to the project root as `ROUND-6-TEAM-LEADER-PROMPT.md`.
3. **Create YAML stubs** for modules 01-10 (minimal valid YAML with just the module header and an empty annotations list). This prevents build errors during authoring.
4. **Create `reference/research/capstone-answers/` directory.**
5. **Read the existing M00 YAML** (`build/annotations/module-00.yaml`) to internalize the format.
6. **Run `node build/build.js`** to verify the baseline build works with stubs.
7. **Spawn all 5 teammates** per the Team Composition table. **Critical:** When spawning each author, provide their complete context — assigned modules, files owned, spec files to read (with full paths and relevant sections), the YAML format contract, quality standards, and completion signal protocol. Include the existing M00 YAML content or path as their format reference.
8. **Monitor Phase 2** — verify builds as authors complete modules.
9. **Execute Phase 4** — full integration and verification after all authoring complete.
10. **Verify all quality gates** (13 gates) and success criteria (16 items).
11. **Update CURRENT_CYCLE.md** with Round 6 completion state, metrics, and Round 7 readiness.
12. **Write blog post** per `.claude/rules/blog.md` format standards.

Round 5 gave us the interactive components. Now fill them with content that teaches.
