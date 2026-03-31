# Round 8 Team Leader Prompt — Assembly & QA

**Document type:** Agent Team Leader prompt — to be provided as the initial instruction when creating the Round 8 Agent Team in Claude Code.
**Created:** 2026-03-22
**Author:** Ryan + Claude (pre-session planning)
**Preceding work:** Rounds 1-2 produced 11 modules (47,169 words, 83 sources). Round 3 produced pedagogical design (~81,400 words, 9 workstreams). Round 4 built the build pipeline, CSS design system, and Handlebars templates. Round 5 built 9 interactive JS components (98.5K). Round 6 authored 337 YAML annotations and 5 capstone expert answers. Round 7 added 21 diagrams (15 Mermaid, 3 decision trees, 2 Chart.js charts, 1 recommendation quiz) with 4 new JS files and 2 vendored libraries. See `CURRENT_CYCLE.md` for full state and `blog/` for process journals.

You are the Team Leader for Round 8 of the AI Frontier Curriculum project. You are an Opus 4.6 agent orchestrating a team of Opus 4.6 teammates using **Claude Code Agent Teams**.

---

## How Agent Teams Work

You have access to the `Agent` tool for spawning persistent teammates and `SendMessage` for communicating with them. This is critical to understand:

- **Spawning:** Use the `Agent` tool to create each teammate. Each teammate runs as a persistent agent in its own context window. They share the filesystem but NOT your conversation context.
- **Communication:** Use `SendMessage` to send instructions, handoff signals, and status requests to teammates. They reply via `SendMessage` back to you.
- **Context isolation:** Teammates do NOT inherit your conversation. When you spawn a teammate, you MUST provide their complete instructions in the spawn prompt — their role, assigned work, file ownership rules, quality standards, and any coordination signals they need to watch for. If you don't tell them, they don't know it.
- **File system is shared:** All teammates read and write to the same filesystem. This is why file ownership rules are critical — two agents writing to the same file will corrupt it.
- **Parallel execution:** Multiple teammates can work simultaneously on independent tasks. Round 8 has many independent verification tasks — maximize parallelism.
- **Team Leader role:** You orchestrate. You verify quality. You resolve conflicts. You run the final verification gates.

**When spawning each teammate, include in their prompt:**
1. Their specific role and assigned work items
2. The files they own (and must NOT touch files outside their ownership)
3. Which spec files to read before starting (with full paths and relevant sections)
4. Quality standards specific to their task
5. How to signal completion (SendMessage to Team Leader)
6. The project's persistence-first rule: write decisions and state to files, not just chat

---

## Mission

Round 8 is the final production round. Everything functional exists: 11 modules, 337 annotations, 21 diagrams, 15 JS components, a CSS design system, and a build pipeline producing 14 HTML files. This round's job is to verify it all works together, fix what doesn't, improve accessibility and performance, build the single-HTML curriculum export, and close out the project.

This is NOT a feature round. No new modules, no new components, no new diagram types. Round 8 fixes bugs, improves quality, and delivers the final product.

**Production round roadmap (for boundary awareness):**

| Round | Name | Scope | Status |
|-------|------|-------|--------|
| 4 | Foundation Build | Build pipeline, CSS design system, page templates, navigation | **COMPLETE** |
| 5 | Component Build | 9 interactive JS components, localStorage, dark mode, annotation injector | **COMPLETE** |
| 6 | Annotation Authoring | 337 YAML annotations, engagement content, 5 capstone expert answers | **COMPLETE** |
| 7 | Diagrams & Visual Production | Mermaid/Chart.js infrastructure, 21 HIGH-priority diagrams | **COMPLETE** |
| **8** | **Assembly & QA** | **Full verification, accessibility audit, performance, single-HTML export, polish** | **THIS ROUND** |

**Your round's boundary:** You verify, fix, optimize, and export. You do NOT add new modules, new annotations, new diagram types, or new JS components. You MAY fix bugs in existing JS/CSS, improve accessibility, optimize performance, add the single-HTML export build target, and revise capstone documents. You MAY add new verify.js checks for Round 8-specific validations.

---

## Reading Order

Read these files in this order before spawning any teammates:

1. `PROJECT-DESCRIPTION.md` — What we're building and why
2. `AGENT-INIT.md` — Operational directives, context engineering rules
3. `CURRICULUM.md` — Master index, module status
4. `CURRENT_CYCLE.md` — Round 7 completion state, Round 8 scope
5. `.claude/rules/00-repo.md` — Always-on repository rules
6. `build/build.js` — Build pipeline (understand all 6 layers)
7. `build/verify.js` — Current 23 verification checks
8. `build/templates/module.hbs` — Template (18 script tags, ARIA landmarks)
9. `build/styles/main.css` — CSS bundle (7 source files via @import)
10. `build/styles/_colors.css` — CSS custom properties for both themes
11. `reference/research/round-3/WS6-layout-accessibility.md` — WS6 accessibility spec (WCAG 2.2 AA requirements)

**Priority on conflict:** Module markdown content (factual authority) > WS specs > CURRICULUM.md > repository instruction files > conversation.

---

## Known Issues to Fix

These issues were identified during pre-Round 8 review. They are the primary content fixes for this round.

### P0: Capstone Part-to-Module Mismatch (MUST FIX)

The 4-Part learning structure defined in WS1 groups modules as:

| Part | Name | Modules |
|------|------|---------|
| 1 | The Terrain | M00, M01, M02 |
| 2 | Agent Systems | M03, M06, M04, M05 |
| 3 | Building & Automating | M07, M09 |
| 4 | Synthesis & Horizon | M08, M10 |

Round 6 assigned authors by module number range, not by Part grouping. Two capstone documents have mismatched module coverage:

**Part 2 capstone** (`reference/research/capstone-answers/part-2-capstone.md`):
- Should cover M03 (Single Agents), M06 (MCP), M04 (Multi-Agent), M05 (OpenClaw)
- Actually covers M03/M04/M06 topics but completely omits M05 (OpenClaw). Also references M01 model selection (Part 1 content) without noting the cross-Part reference.
- **Fix required:** Revise the scenario or expert answer to incorporate OpenClaw as an alternative agent platform or as context for the open-source agent landscape. The scenario (customer support agent) could naturally reference OpenClaw as an alternative deployment platform to cloud-hosted solutions, tying in M05's local-first philosophy and ClawHub skills.

**Part 3 capstone** (`reference/research/capstone-answers/part-3-capstone.md`):
- Should cover M07 (Skills, Plugins & Automation) and M09 (Developer Platforms & APIs)
- Actually covers M06 (MCP) + M07 (Skills) but barely references M09. The scenario is an integration architecture that leans heavily on MCP server selection (Part 2 content).
- **Fix required:** Revise to center on Part 3's actual modules. The scenario should engage substantively with M09 topics: API architecture choices (Messages vs Responses vs Gemini API), SDK selection, pricing economics (caching tiers, batching, model tiering), and structured outputs. The M07 content (skills, scheduled tasks) is appropriate but needs M09 to join it. Consider a scenario like "Build a multi-provider API integration that optimizes for cost while using skills for workflow automation" — this naturally exercises both M07 and M09.

### P1: CURRENT_CYCLE.md Known Issues Stale

The "Known remaining issues" section still lists items that were resolved in Round 4 Phase 0:
- "3 SOURCES.md URLs return 404" — these were archived with notation in Round 4
- "3 duplicate source entries flagged" — these were consolidated in Round 4

**Fix required:** Update the known issues section to reflect current state. The 12 Unverified sources are still unverified and should remain listed.

---

## Current Build State

```
Build output:          14 HTML files (11 modules + index + glossary + build manifest)
JS files:              17 (11 custom components + 4 diagram components + 2 vendored libraries) — template has 18 script tags including 1 inline data script
CSS:                   1 bundled main.css (63 KB, from 7 source files)
Verify checks:         23/23 passing
YAML annotations:      337 pedagogical + 21 diagram = 358 total entries across 11 files
Total build size:      ~4.9 MB (2.9 MB is mermaid.min.js alone)
Glossary terms:        55
Cross-module links:    163 (all resolving)
```

### Component Inventory (DO NOT MODIFY except for bug fixes)

| Component | JS File | Size | Round |
|-----------|---------|------|-------|
| Storage API | storage.js | 7.8K | R5 (schema v2 from R7) |
| Dark Mode | dark-mode.js | 3.3K | R5 |
| Quiz Widget | quiz.js | 7.1K | R5 |
| Accordion | accordion.js | 4.5K | R5 |
| Table Enhancer | table-enhancer.js | 15K | R5 |
| Glossary Tooltip | glossary-tooltip.js | 12K | R5 |
| Concept Gate | concept-gate.js | 4.2K | R5 |
| Self-Explanation | self-explain.js | 6.4K | R5 |
| Worked Example | worked-example.js | 17K | R5 |
| Progress Tracker | progress-tracker.js | 15K | R5 |
| Navigation | navigation.js | 9.7K | R5 |
| Mermaid Init | mermaid-init.js | 3.1K | R7 |
| Chart Renderer | chart-renderer.js | 4.6K | R7 |
| Decision Tree | decision-tree.js | 8.4K | R7 |
| Recommendation Quiz | recommendation-quiz.js | 7.6K | R7 |
| Mermaid Library | mermaid.min.js | 2.9 MB | R7 (vendored v11) |
| Chart.js Library | chart.umd.min.js | 204K | R7 (vendored v4) |

---

## Team Composition

| Role | Agent | Primary Responsibility | Files Owned |
|------|-------|----------------------|-------------|
| **Team Leader** | You | Orchestration, Phase 1 gate, Phase 5 final verification, quality gates | DECISION_LOG.md |
| **Content Editor** | Teammate | Capstone revisions, CURRENT_CYCLE.md known issues fix (Phase 1 only), source verification | `reference/research/capstone-answers/part-2-capstone.md`, `part-3-capstone.md`, `SOURCES.md` (verification status updates only), `CURRENT_CYCLE.md` (known issues section only, Phase 1) |
| **QA Engineer** | Teammate | Console error sweep, visual verification at 3 breakpoints, functional testing of all interactive components, print stylesheet testing | None (read-only + bug reports) |
| **Accessibility Engineer** | Teammate | WCAG 2.2 AA audit, dark mode button contrast fix, keyboard navigation audit, screen reader testing, reduced-motion verification | `build/styles/_colors.css` (contrast fix), `build/styles/_components.css` (button fix), `build/styles/_diagrams.css` (a11y fixes), `build/js/*.js` (a11y bug fixes only) |
| **Export Engineer** | Teammate | Single-HTML curriculum export, conditional script loading, asset size optimization | `build/build.js` (add diagram flags to context), `build/templates/module.hbs` (conditional script tags), `build/templates/index.hbs` (trim unused scripts), `build/templates/glossary.hbs` (trim unused scripts), new file: `build/export.js` |
| **Chronicler** | Teammate | CURRENT_CYCLE.md final update (Phase 5 only, after Content Editor is done), blog post | `CURRENT_CYCLE.md` (Phase 5 only — Content Editor edits known issues in Phase 1 first), `blog/2026-03-22-round-8-assembly-qa.html` |

**Model:** All teammates Opus 4.6. No exceptions.

---

## Phased Coordination Protocol

### Phase 1: Baseline & Content Fixes (parallel)

**All tasks in this phase are independent and run simultaneously.**

**1a. Team Leader — Run baseline verification:**
```bash
cd "/sessions/relaxed-lucid-keller/mnt/Learn Agents"
node build/build.js    # Expect: 14 files, zero warnings
node build/verify.js   # Expect: 23/23 checks pass
```
Confirm the build is healthy before spawning the team. If baseline fails, diagnose and fix before proceeding.

**1b. Content Editor — Capstone revisions:**

Read these files before starting:
- `reference/research/round-3/WS1-course-architecture.md` (Section 1.1 — the 4-Part structure)
- `reference/research/round-3/ws2b-module-designs-m06-m10.md` (capstone scenario specifications)
- `reference/research/capstone-answers/part-2-capstone.md` (current Part 2 capstone)
- `reference/research/capstone-answers/part-3-capstone.md` (current Part 3 capstone)
- Module executive summaries: `modules/MODULE-05-openclaw-and-open-agents.md`, `modules/MODULE-09-developer-platforms-apis.md`

Tasks:
1. **Revise Part 2 capstone** to incorporate M05 (OpenClaw). The existing customer support scenario is strong — extend it to address: "Should this be deployed on a cloud platform (Claude/OpenAI) or self-hosted via OpenClaw? What are the trade-offs?" This naturally exercises M05's local-first philosophy, ClawHub skills, and the open-vs-closed ecosystem question. Keep the revision concise — add 1-2 paragraphs, don't rewrite the entire document. Ensure M03, M04, M05, and M06 are all substantively covered.
2. **Revise Part 3 capstone** to center on M07 + M09. The scenario should engage with API architecture, SDK selection, pricing economics (caching, batching, model tiering from M09) alongside skills and automation (M07). Consider revising the scenario to: "Build a multi-provider API integration layer for a development team — choose APIs, optimize costs, and automate workflows with skills and scheduled tasks." The existing MCP content should be referenced as context from Part 2, not as Part 3's core contribution.
3. **Update CURRENT_CYCLE.md** known issues section: remove the 3 resolved 404 items and 3 resolved duplicate items. Keep the 12 Unverified sources listed.
4. **Verify remaining Unverified sources** in SOURCES.md: for each of the 12 Unverified entries, attempt to access the URL and verify the claim. Update verification status to Verified, Stale, or add a note if the URL is no longer accessible. Use web search if direct URL access fails.
5. Signal completion with: list of changes made, word count deltas for capstone revisions, source verification results.

**1c. Spawn remaining teammates** after baseline passes. QA Engineer, Accessibility Engineer, and Export Engineer can begin reading project files while Content Editor works.

### Phase 2: Full QA Sweep (parallel — after Phase 1 baseline confirmed)

**QA Engineer and Accessibility Engineer work simultaneously. Export Engineer begins research.**

**2a. QA Engineer — Functional Testing:**

Start a local server for visual testing:
```bash
cd "/sessions/relaxed-lucid-keller/mnt/Learn Agents"
python3 -m http.server 8765 --directory deliverables/html/ &
```

**Console error sweep (ALL 14 pages):**
Navigate to each page via `http://localhost:8765/` and check for JavaScript console errors. Report every error with: page URL, error message, and suspected cause. Zero console errors is the target.

Pages to check:
- `index.html` (course map)
- `glossary.html`
- All 11 module pages: `modules/module-00.html` through `modules/module-10.html`
- Check each page in BOTH light and dark mode

**Visual verification at 3 breakpoints (ALL module pages):**
For each of the 11 module pages, verify at 1280px (desktop), 768px (tablet), and 375px (mobile):
- Layout: sidebar collapses correctly on mobile, main content fills width
- Tables: horizontal scroll wrapper activates on narrow viewports, no overflow
- Mermaid diagrams: no horizontal overflow, readable at each width
- Chart.js charts: canvas resizes responsively
- Annotations: all quiz, accordion, self-explanation, worked-example components render correctly
- Navigation: prev/next links work, breadcrumbs visible, keyboard shortcuts functional

**Functional testing of interactive components:**
- **Quizzes (all 3 variants):** Select answers, submit, verify feedback appears with correct/incorrect styling. Verify answer persists after page reload (AFC_Storage). Test at least one concept-check, one section-review, and one module-assessment quiz.
- **Decision trees (M01-4, M02-5, M04-5):** Click branches, verify path updates, test keyboard navigation (arrow keys, enter), verify selected path persists after reload, test reset button.
- **Chart.js charts (M08-1, M09-2):** Verify data renders, hover tooltips appear, dark mode re-renders correctly. Verify the M09-2 waterfall chart's transparent base segments create the correct visual waterfall effect.
- **Recommendation quiz (M08-2):** Complete all questions, verify scoring produces a recommendation, verify "try again" reset works, verify result persists after reload.
- **Accordion (opening hooks, curiosity prompts):** Click to expand/collapse, verify content appears, test hash-target auto-expansion.
- **Self-explanation prompts:** Type in textarea, verify character counter, verify expert reveal button enables after 50+ characters, verify text persists after reload.
- **Concept gates:** Check prerequisite items, verify collapse-on-completion.
- **Worked examples:** Verify 4-stage fading renders, contenteditable blanks are interactive, progressive hints work.
- **Glossary tooltips:** Hover over glossary-linked terms in module text, verify tooltip appears after ~300ms with correct definition.
- **Progress tracker:** Scroll through a module, verify sidebar checkmarks update, verify progress bar increments, verify session resume banner on course map.
- **Table enhancer:** Verify filter and sort controls on comparison tables, test with multiple columns.

**Dark mode comprehensive test:**
Toggle dark mode on at least 3 module pages. Verify:
- All text is readable (no dark-on-dark or light-on-light)
- Mermaid diagrams re-render with correct theme (MutationObserver triggers re-initialization)
- Chart.js charts re-render with updated colors
- Decision tree selection highlighting uses correct theme colors
- Quiz feedback styling (correct/incorrect) is visible in both themes
- Code blocks have appropriate contrast
- Table borders and alternating row colors adapt

**Print stylesheet verification:**
Use browser print preview (Ctrl+P) on at least 2 module pages:
- Verify: sidebar hidden, main content full width, navigation hidden
- Verify: Mermaid SVGs print at fixed width (not clipped)
- Verify: Chart.js canvases render in print (canvas elements can be problematic)
- Verify: Interactive controls (quiz submit buttons, decision tree branches) are hidden or deemphasized
- Verify: Page breaks don't split mid-table or mid-diagram

**Build idempotency test:**
```bash
node build/build.js && md5sum deliverables/html/modules/*.html > /tmp/build1.md5
node build/build.js && md5sum deliverables/html/modules/*.html > /tmp/build2.md5
diff /tmp/build1.md5 /tmp/build2.md5  # Must be identical
```

Signal completion with: full bug report organized by severity (blocking, non-blocking, cosmetic), specific file paths and line numbers where possible, screenshots if browser tools allow.

**2b. Accessibility Engineer — WCAG 2.2 AA Audit:**

Read before starting:
- `reference/research/round-3/WS6-layout-accessibility.md` — Full accessibility specification
- `build/styles/_colors.css` — Color system
- `build/styles/_components.css` — Component styling (dark mode toggle is here)
- `build/styles/_diagrams.css` — Diagram styling

**Color contrast audit:**
For EVERY color pair used in the design system (text on background, border on background, icon on background), calculate contrast ratio. WCAG 2.2 AA requires:
- Normal text: 4.5:1 minimum
- Large text (18px+ or 14px+ bold): 3:1 minimum
- UI components and graphical objects: 3:1 minimum

Pay special attention to:
- **Dark mode toggle button:** Round 7 flagged a potential contrast issue. Pre-Round 8 analysis found the light-mode hover state's border color (`--color-accent: #1B4D8E`) against the hover background (`--color-bg-secondary: #F0F0F5`) yields approximately 3.1:1 — below the 4.5:1 WCAG AA requirement. Verify this calculation and fix if confirmed. The dark-mode hover pair (`#64B5F6` on `#252540`) appears to pass at ~4.8:1 but should be independently verified. The default (non-hover) states in both themes appear to have high contrast.
- Quiz feedback colors (correct green, incorrect red) in both themes
- Mermaid diagram text on diagram backgrounds in both themes
- Chart.js label/axis text on canvas backgrounds in both themes
- Decision tree branch text on highlight background
- Accordion header text on header background

**Keyboard navigation audit:**
Navigate the ENTIRE curriculum using only keyboard (no mouse). Verify:
- Tab order is logical across all page regions (skip link → header → sidebar → main → footer)
- All interactive elements are focusable (buttons, links, quiz choices, decision tree branches)
- Focus outlines are visible on every focusable element
- Escape key closes modals/tooltips where applicable
- Left/right arrow keys navigate between modules (from navigation.js)
- `?` opens help dialog (from navigation.js)
- Decision trees: arrow keys navigate branches, enter selects
- Quiz: tab between choices, space/enter to select, tab to submit

**ARIA audit:**
Check all 14 pages for:
- Every page has correct landmark roles (banner, navigation, main, complementary, contentinfo)
- All interactive components have appropriate ARIA attributes (aria-expanded, aria-pressed, aria-live, aria-label)
- Glossary tooltips use aria-describedby
- Progress tracker updates are announced via aria-live
- Decision tree path changes announced via aria-live
- Recommendation quiz results announced via aria-live
- All images/diagrams have alt text or aria-label

**Reduced-motion verification:**
Enable `prefers-reduced-motion: reduce` in browser settings. Verify:
- Accordion expand/collapse animations are disabled
- Progress bar transitions are disabled
- Any CSS transitions in _diagrams.css are disabled
- Page remains fully functional without animations

**Screen reader spot-check:**
If a screen reader is available, verify on 1 module page:
- Heading hierarchy is correct (h1 → h2 → h3, no skips)
- Quiz questions are announced with their options
- Diagram alt text is read for figure elements
- Glossary tooltips are announced when triggered

Signal completion with: full accessibility report organized by WCAG criterion, severity (blocking vs. enhancement), and specific remediation instructions for each issue found. Include exact color values and contrast ratios for any failing pairs.

**2c. Export Engineer — Research & Planning:**

While QA and Accessibility work, the Export Engineer reads project files and plans:

1. Read `build/build.js` thoroughly (all 6 layers)
2. Read `build/templates/module.hbs`, `index.hbs`, `glossary.hbs`
3. Understand the current output structure (`deliverables/html/`)
4. Plan the single-HTML export approach (see Phase 3)
5. Assess Mermaid lazy loading feasibility (see Phase 3)

### Phase 3: Engineering Improvements (Export Engineer — after Phase 2 planning)

**3a. Mermaid.js Conditional Loading:**

`mermaid.min.js` is 2.9 MB — 59% of the total build output. It currently loads on ALL 14 pages (11 modules + index + glossary) via the templates, but only 8 of 11 modules have Mermaid diagrams. M07 has zero diagrams of any type. M08 and M09 use only Chart.js (no Mermaid). Index and glossary pages have no diagrams at all.

The diagram library requirements per module are:

| Module | Needs mermaid.js? | Needs chart.js? | Needs decision-tree.js? | Needs recommendation-quiz.js? |
|--------|-------------------|-----------------|-------------------------|-------------------------------|
| M00 | YES (2 diagrams) | no | no | no |
| M01 | YES (3) | no | YES (1) | no |
| M02 | YES (3) | no | YES (1) | no |
| M03 | YES (1) | no | no | no |
| M04 | YES (2) | no | YES (1) | no |
| M05 | YES (1) | no | no | no |
| M06 | YES (2) | no | no | no |
| M07 | **NO** | **NO** | **NO** | **NO** |
| M08 | **NO** | YES (1) | no | YES (1) |
| M09 | **NO** | YES (1) | no | no |
| M10 | YES (3) | no | no | no |
| index | **NO** | **NO** | **NO** | **NO** |
| glossary | **NO** | **NO** | **NO** | **NO** |

M07 has zero diagrams of any type. Index and glossary pages have no diagrams. Currently ALL three templates (module.hbs, index.hbs, glossary.hbs) load ALL 17 external scripts including mermaid.min.js (2.9 MB) and chart.umd.min.js (204K).

Implement conditional loading:
- In `build/build.js`, after Layer 4 annotation injection, read each module's YAML file and detect which diagram variants are present. Add boolean flags (`hasMermaid`, `hasChart`, `hasDecisionTree`, `hasRecommendation`) to each module's template context. This is a ~10-line addition in the Layer 5 context assembly — read the YAML, check for variant strings, set flags. Do NOT restructure the build pipeline.
- In `module.hbs`, wrap diagram-related script tags in Handlebars conditionals: `{{#if hasMermaid}}<script src="...mermaid.min.js">...{{/if}}`. Apply similarly for chart.umd.min.js, mermaid-init.js, chart-renderer.js, decision-tree.js, and recommendation-quiz.js.
- In `index.hbs` and `glossary.hbs`, these pages have NO diagrams — remove the 6 diagram-related script tags entirely (mermaid.min.js, chart.umd.min.js, mermaid-init.js, chart-renderer.js, decision-tree.js, recommendation-quiz.js). Also remove component scripts that don't apply to these pages (quiz.js, concept-gate.js, self-explain.js, worked-example.js, table-enhancer.js) — they have no annotations to hydrate. Keep: storage.js, dark-mode.js, glossary-tooltip.js, progress-tracker.js, navigation.js.
- Similarly, index.hbs can drop accordion.js (no accordions on course map page).

**Savings per page:**
- M07: saves 2.9 MB (mermaid) + 204K (chart) + 24K (4 diagram JS files) = ~3.1 MB
- M08, M09: save 2.9 MB (mermaid) + 3.1K (mermaid-init) each
- index.hbs, glossary.hbs: save ~3.1 MB each (all diagram libs + unused component scripts)

After implementation:
- Verify M07 loads NO diagram-related scripts
- Verify M08 loads chart.umd.min.js + chart-renderer.js + recommendation-quiz.js but NOT mermaid
- Verify M09 loads chart.umd.min.js + chart-renderer.js but NOT mermaid
- Verify index.hbs and glossary.hbs load only core scripts (storage, dark-mode, glossary-tooltip, progress-tracker, navigation)
- Verify modules WITH Mermaid/Chart.js diagrams still render correctly
- Verify all 23 existing verify.js checks still pass
- Update verify.js check 12 ("Component JS loaded") to account for conditional loading

**3b. Single-HTML Curriculum Export:**

Build a new script `build/export.js` that produces a single self-contained HTML file combining all 11 modules, the glossary, and the course map into one navigable document. This is specified in PROJECT-DESCRIPTION.md as "Full curriculum export (single HTML)."

Requirements:
- All CSS inlined in a `<style>` tag (from the bundled main.css)
- All custom JS inlined in `<script>` tags (the 11 custom + 4 diagram components = 15 files, ~115K)
- **Vendored libraries NOT inlined** — instead, reference CDN URLs as fallback with a local-load check: `<script src="https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js"></script>` with a `<noscript>` note that diagrams require JavaScript. This keeps the export file manageable (~2-3 MB instead of ~6 MB).
- Glossary data and course map data inlined as JSON (same pattern as module.hbs)
- Each module as a `<section id="module-XX">` with all its content
- A navigation sidebar listing all modules with in-page anchor links
- The 4-Part structure from WS1 reflected in the sidebar grouping
- A table of contents at the top
- Print-friendly: `@media print` rules carry over from the CSS bundle

Output path: `deliverables/html/curriculum-complete.html`

**Implementation approach:**
1. Read all 11 generated module HTML files from `deliverables/html/modules/`
2. Extract the `<main>` content from each (strip the template chrome — header, sidebar, navigation)
3. Wrap each in a `<section>` with the module's ID
4. Build a unified sidebar with all module titles grouped by Part
5. Inline CSS and custom JS
6. Add CDN script tags for vendored libraries
7. Write the combined file

Run `build/export.js` after `build/build.js` — the export reads from build output, not from source.

Add a verify.js check (check 24) that confirms `curriculum-complete.html` exists and contains all 11 module sections.

Signal completion with: export file size, list of modules included, any issues encountered.

### Phase 4: Bug Fixes (parallel — after Phase 2 reports)

**Team Leader triages QA Engineer and Accessibility Engineer bug reports.**

For each bug:
1. Classify: **blocking** (prevents curriculum use), **non-blocking** (degraded experience), **cosmetic** (visual polish)
2. Assign to the appropriate teammate based on file ownership
3. After fix, re-verify the specific check

**Accessibility Engineer** fixes any WCAG failures in CSS files they own.
**Export Engineer** fixes any build pipeline issues they introduced.
**Team Leader** fixes anything that falls outside teammate file ownership.

Re-run full verification after all fixes:
```bash
node build/build.js
node build/verify.js   # All checks must pass (23 existing + any new)
```

### Phase 5: Final Verification & Documentation (sequential — after all fixes)

**5a. Team Leader — Final quality gates:**

Run the complete verification suite:
```bash
node build/build.js          # 14 module files + 1 export file
node build/verify.js         # All checks pass
node build/export.js         # Single-HTML export generates
```

Verify all quality gates (see Quality Gates section).

**5b. Chronicler — Final documentation:**

Update CURRENT_CYCLE.md with:
- Round 8 completion state
- Team composition and roles
- Phase-by-phase summary
- Metrics (bugs found, bugs fixed, accessibility issues, export file size)
- Final curriculum metrics (total words, total annotations, total diagrams, total JS, total CSS, build size)
- Known deferred items (MEDIUM/LOW diagrams, future event updates)

Write blog post: `blog/2026-03-22-round-8-assembly-qa.html`
- Follow the same format as previous blog posts (standalone HTML, warm stone-tone CSS, table of contents)
- Document the QA process, what was found, what was fixed
- Include final curriculum metrics
- Note the single-HTML export as a deliverable
- Link to all previous blog posts in the footer

**CURRENT_CYCLE.md sequential handoff:** Content Editor modifies CURRENT_CYCLE.md in Phase 1 (known issues section only). Chronicler takes over CURRENT_CYCLE.md in Phase 5 and writes the Round 8 completion state, preserving Content Editor's Phase 1 changes. If conflicts arise, Team Leader arbitrates. These two agents must NOT write to CURRENT_CYCLE.md concurrently.

---

## Verification

### Build verification

```bash
node build/build.js    # Must succeed without errors
node build/verify.js   # All checks must pass (23 existing + new Round 8 checks)
node build/export.js   # Single-HTML export must generate
```

**Chrome visual verification:** Start a local server: `python3 -m http.server 8765 --directory deliverables/html/` then navigate to `http://localhost:8765/`.

### QA verification checklist

For each of the 11 module pages, the QA Engineer must confirm:
1. Page loads without console errors (both themes)
2. Layout correct at 3 breakpoints
3. All annotations render (quizzes, accordions, self-explanations, worked examples, concept gates)
4. All diagrams render (Mermaid, Chart.js, decision trees, recommendation quiz)
5. Dark mode toggle works correctly
6. Interactive components function (click, keyboard, persistence)

---

## Quality Gates

Every gate must pass before Round 8 is declared complete.

**Build gates:**
1. `node build/build.js` produces 14+ files without errors
2. `node build/verify.js` passes all checks (23 existing + Round 8 additions)
3. `node build/export.js` produces `curriculum-complete.html`
4. Build is idempotent (consecutive runs produce identical output)

**Functional gates:**
5. Zero console errors across all 14 pages in both themes
6. All 337 pedagogical annotations render correctly
7. All 21 diagrams render correctly
8. All interactive components function (quiz, decision tree, chart, recommendation quiz, accordion, self-explanation, concept gate, worked example)
9. Dark mode toggle correctly re-themes all content including Mermaid re-render and Chart.js re-render
10. Progress tracker, navigation, and glossary tooltips function

**Accessibility gates:**
11. All color pairs meet WCAG 2.2 AA contrast requirements (4.5:1 for normal text, 3:1 for large text and UI)
12. All interactive elements keyboard-accessible with visible focus
13. All ARIA attributes present and correct
14. `prefers-reduced-motion` disables animations

**Content gates:**
15. Part 2 capstone covers M03, M04, M05, M06
16. Part 3 capstone covers M07, M09
17. CURRENT_CYCLE.md known issues section reflects current state

**Performance gates:**
18. Mermaid.js loads only on the 8 modules with Mermaid diagrams (not M07, M08, M09, index, glossary)
19. Chart.js loads only on M08 and M09 (not the other 9 modules, index, or glossary)
20. Single-HTML export is under 3 MB (vendored libraries referenced via CDN, not inlined)

**Documentation gates:**
21. CURRENT_CYCLE.md updated with Round 8 completion state and final metrics
22. Blog post written documenting Round 8
23. DECISION_LOG.md updated with any new decisions

---

## What NOT to Do

**Scope anti-patterns:**
- **Do NOT add new modules, annotations, or diagram types.** This is QA, not feature development.
- **Do NOT restructure the build pipeline.** Add the export target and conditional loading as additive changes only.
- **Do NOT modify module markdown.** Content is frozen for this round.
- **Do NOT rewrite JS components.** Fix bugs, improve accessibility, but do not refactor working code.
- **Do NOT author MEDIUM/LOW priority diagrams.** Those are deferred beyond Round 8.

**QA anti-patterns:**
- **Do NOT mark a bug as fixed without re-verifying.** Every fix requires a re-test.
- **Do NOT ignore cosmetic issues.** Log them even if they're non-blocking — they affect the learning experience.
- **Do NOT skip dark mode testing.** Every visual check must be done in BOTH themes.
- **Do NOT skip mobile testing.** The 375px breakpoint reveals issues the desktop view hides.

---

## Key Reference Files

| File | What it tells you |
|------|-------------------|
| `build/build.js` | **Build pipeline — 6 layers, understand before modifying** |
| `build/verify.js` | **23 verification checks — add new ones for Round 8** |
| `build/templates/module.hbs` | **Template — 18 script tags, ARIA landmarks, data attributes** |
| `build/styles/_colors.css` | **CSS custom properties — light and dark themes** |
| `build/styles/_components.css` | **Component styling — dark mode toggle button is here** |
| `build/styles/_diagrams.css` | **Diagram styling — Mermaid, Chart.js, decision tree, recommendation** |
| `build/js/storage.js` | **AFC_Storage API — schema v2 with decisionTrees + recommendations** |
| `build/js/dark-mode.js` | **Dark mode — sets data-theme, no custom event, MutationObserver pattern** |
| `reference/research/round-3/WS6-layout-accessibility.md` | **Accessibility spec — WCAG 2.2 AA requirements** |
| `reference/research/round-3/WS1-course-architecture.md` | **4-Part structure — canonical module groupings** |
| `reference/research/capstone-answers/` | **Capstone documents — Part 2 and Part 3 need revision** |
| `SOURCES.md` | **Source registry — 12 Unverified entries to check** |

---

## Success Criteria

Round 8 is complete when:

1. ✅ `node build/build.js` runs without errors (14+ HTML files)
2. ✅ `node build/verify.js` passes all checks (23+ checks)
3. ✅ `node build/export.js` produces `curriculum-complete.html` under 3 MB
4. ✅ Zero console errors across all pages in both themes
5. ✅ All 337 annotations + 21 diagrams render correctly
6. ✅ All interactive components function with keyboard and mouse
7. ✅ Dark mode comprehensively works (text, diagrams, charts, components)
8. ✅ WCAG 2.2 AA compliance verified (contrast, keyboard, ARIA, reduced-motion)
9. ✅ Dark mode toggle button meets contrast requirements
10. ✅ Mermaid/Chart.js conditionally loaded (not on pages without those diagram types)
11. ✅ Print stylesheet verified (layout, diagrams, no clipped content)
12. ✅ Build is idempotent
13. ✅ Part 2 capstone covers M03, M04, M05, M06
14. ✅ Part 3 capstone covers M07, M09
15. ✅ CURRENT_CYCLE.md known issues section is current
16. ✅ Remaining Unverified sources in SOURCES.md have been checked
17. ✅ DECISION_LOG.md updated with Round 8 decisions
18. ✅ CURRENT_CYCLE.md updated with Round 8 completion state
19. ✅ Blog post written documenting Round 8

---

## Begin Sequence

1. **Read project files** in the order specified in "Reading Order" above.
2. **Process AI_INBOX/** per project rules. Move this prompt to project root as `ROUND-8-TEAM-LEADER-PROMPT.md`.
3. **Run `node build/build.js && node build/verify.js`** to verify the baseline (14 files, 23/23 checks).
4. **Spawn Content Editor** with capstone revision instructions and source verification tasks.
5. **Spawn QA Engineer** with full functional testing instructions.
6. **Spawn Accessibility Engineer** with WCAG audit instructions.
7. **Spawn Export Engineer** with conditional loading and single-HTML export instructions.
8. **Spawn Chronicler** — can begin reading previous blog posts and planning the Round 8 post while waiting for Phase 2 results.
9. **Monitor Phase 2** — collect bug reports from QA Engineer and Accessibility Engineer.
10. **Triage and assign bug fixes** (Phase 4).
11. **Verify fixes** and run full verification suite.
12. **Confirm single-HTML export** generated correctly.
13. **Verify all quality gates** (23 gates) and success criteria (19 items).
14. **Final documentation** — Chronicler updates CURRENT_CYCLE.md and writes blog post.

Rounds 1-7 built the curriculum. Round 8 makes it bulletproof.
