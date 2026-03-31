# CURRENT_CYCLE.md — Session Work Order

Last updated: 2026-03-22

---

## Current state: Round 8 COMPLETE — Assembly & QA

All 8 production rounds complete. 11 modules built, annotated, diagrammed, tested, and exported. 25/25 verification checks pass, zero console errors across 13 pages, WCAG 2.2 AA accessibility audit passed.

---

## Round 8 completed

### Team composition
- **Team Lead:** 1 Opus 4.6 orchestrator (baseline verification, browser testing via Chrome MCP, bug triage, final verification)
- **Content Editor:** 1 Opus 4.6 (capstone revisions, source verification, CURRENT_CYCLE.md known issues)
- **QA Engineer:** 1 Opus 4.6 (HTML validation, programmatic checks, build idempotency)
- **Accessibility Engineer:** 1 Opus 4.6 (WCAG 2.2 AA audit, CSS contrast fixes, ARIA fixes)
- **Export Engineer:** 1 Opus 4.6 (conditional script loading, single-HTML export, verify.js checks 24-25)
- **Chronicler:** 1 Opus 4.6 (documentation, blog)
- **Model:** All teammates Opus 4.6 (Max Plan)

### Phase 1: Baseline & Content Fixes — COMPLETE
- Build baseline verified: 14 files, 23/23 checks pass
- AI_INBOX processed: Round 7 prompt moved to AI_TRASH
- Content Editor revised Part 2 capstone (+333 words, added M05/OpenClaw coverage)
- Content Editor rewrote Part 3 capstone (+844 words, centered on M07+M09)
- Source verification: 10/12 verified, 1 marked Speculative (W66 WWDC), 1 remains Unverified (W41 Reddit)
- CURRENT_CYCLE.md known issues cleaned: removed 6 resolved items from Rounds 3-7

### Phase 2: QA & Accessibility Audits — COMPLETE
- TL browser testing: 13/13 pages zero console errors, M00 component health verified, dark mode toggle works, mobile layout validated (375px)
- QA Engineer: HTML validation, build idempotency confirmed, script tag audit, component presence verified
- Accessibility Engineer found and fixed 4 issues:
  - Border color contrast (light #D0D0DA to #767688, dark #3A3A50 to #7A7AA2)
  - Status badge dark mode overrides added
  - Quiz feedback prefers-color-scheme fallback added
  - Decision tree aria-expanded misuse corrected
- Dark mode toggle button: all hover states pass WCAG AA (no fix needed)
- All color pairs pass WCAG 4.5:1 for text, 3:1 for UI components

### Phase 3: Export Engineering — COMPLETE
- Conditional Mermaid/Chart.js loading implemented:
  - build.js detects diagram variants from YAML annotations dynamically
  - module.hbs wraps heavy scripts in Handlebars conditionals
  - index.hbs stripped to 4 core scripts (was 18)
  - glossary.hbs stripped to 3 core scripts (was 16)
  - M07 saves 3.1 MB, M08/M09 save 2.9 MB each, index/glossary save 3.1 MB+ each
- Single-HTML curriculum export (build/export.js):
  - Combines all 11 modules into one navigable document
  - CSS and custom JS inlined, vendored libs via CDN
  - 4-Part sidebar navigation, table of contents
  - Output: 1.31 MB (target was <3 MB)
  - Module IDs prefixed to avoid collisions, cross-module links rewritten to anchors

### Phase 4: Bug Fixes — COMPLETE
- TL fixed duplicate h1 on all module pages (build.js strips markdown h1, template h1 is canonical)
- TL fixed verify.js false positives from inlined JS in export (strip script blocks before scanning)
- Export ID collision fix: prefixIds() function added to export.js
- Export link rewriting: cross-module .html links converted to in-page #anchors

### Phase 5: Final Verification & Documentation — COMPLETE
- Build: 14 files, zero warnings
- Verify: 25/25 checks pass (23 existing + 2 new: conditional loading + export validation)
- Export: curriculum-complete.html generated (1.31 MB, 11/11 modules)
- DECISION_LOG: 4 new entries (CDN export, h1 fix, conditional loading, verify.js script stripping)

### Round 8 metrics
| Metric | Value |
|--------|-------|
| Build output | 14 HTML files + 1 export file, zero warnings |
| Verify checks | 25/25 pass (23 existing + 2 new) |
| Export file | curriculum-complete.html, 1.31 MB |
| Console errors | 0 across 13 pages in both themes |
| A11y issues found | 4 (all fixed) |
| A11y warnings | 2 (h1 duplicate — fixed, widget heading levels — noted) |
| Sources verified | 10/12 (1 speculative, 1 unverified) |
| Capstone revisions | Part 2 (+333 words), Part 3 (+844 words) |
| CURRENT_CYCLE.md stale items removed | 6 |
| DECISION_LOG entries | 4 new |
| Opus teammates | 6 (TL, Content Editor, QA Engineer, A11y Engineer, Export Engineer, Chronicler) |
| Conditional loading savings | M07: -3.1 MB, M08/M09: -2.9 MB each, index/glossary: -3.1 MB+ each |
| New JS files | 1 (export.js) |
| Modified JS files | 2 (build.js, verify.js — also decision-tree.js a11y fix) |
| Modified CSS files | 3 (_colors.css, _components.css, _layout.css) |
| Modified templates | 3 (module.hbs, index.hbs, glossary.hbs) |

---

## Round 7 completed

### Team composition
- **Team Lead:** 1 Opus 4.6 orchestrator (Phase 1 verification, Phase 4 integration)
- **Pipeline Engineer:** 1 Opus 4.6 (4 new JS files, injector upgrade, vendored libs, verify.js, storage.js)
- **Mermaid Author A:** 1 Opus 4.6 (M00-M03 Mermaid diagrams — 7 diagrams)
- **Mermaid Author B:** 1 Opus 4.6 (M04-M10 Mermaid diagrams — 8 diagrams)
- **Interactive Engineer:** 1 Opus 4.6 (3 decision trees, 2 charts, 1 recommendation quiz)
- **CSS/QA Engineer:** 1 Opus 4.6 (_diagrams.css, accessibility verification)
- **Chronicler:** 1 Opus 4.6 (documentation, blog)
- **Model:** All teammates Opus 4.6 (Max Plan)

### Phase 1: Infrastructure — COMPLETE
- Pipeline Engineer built full diagram rendering stack before content authoring began
- 4 new JS files: mermaid-init.js, chart-renderer.js, decision-tree.js, recommendation-quiz.js
- 2 vendored libraries: mermaid.min.js (v11), chart.umd.min.js (v4)
- Annotation injector upgraded: 6th component type `diagram` with 4 variants (mermaid, chart, decision-tree, recommendation)
- 6 new script tags added to module.hbs template
- verify.js expanded: 5 new checks (19-23) for diagram infrastructure
- storage.js updated: `decisionTrees` and `recommendations` keys added, SCHEMA_VERSION bumped 1→2
- Baseline verified: 14 files output, 23/23 checks pass

### Phase 2: Parallel Content Authoring — COMPLETE
- 3 content agents worked simultaneously after Phase 1
- Mermaid Author A: M00 (2), M01 (2), M02 (2), M03 (1) = 7 Mermaid diagrams
- Mermaid Author B: M04 (2), M05 (1), M06 (2), M10 (3 including synthesis map) = 8 Mermaid diagrams
- Interactive Engineer: M08-1 line chart, M09-2 waterfall chart, M08-2 recommendation quiz, M01-4/M02-5/M04-5 decision trees = 6 items
- All 21 diagram annotations appended to existing Round 6 YAML files
- Shared YAML coordination (M01, M02, M04): Mermaid Author wrote first, Interactive Engineer appended after
- M10-4 Curriculum Synthesis Map authored last (references all modules)

### Phase 3: CSS & Theming — COMPLETE
- CSS/QA Engineer created _diagrams.css (overlapped with Phase 2)
- Container styling, responsive Mermaid SVG sizing, Chart.js canvas constraints
- Decision tree interactive styling (selected branch, hover, focus outlines)
- Recommendation quiz form styling
- Dark mode adaptations via CSS custom properties
- Print stylesheet and reduced-motion media queries
- @import added to main.css

### Phase 4: Integration Verification — COMPLETE
- Build: `node build/build.js` — 14 files, zero warnings
- Verify: `node build/verify.js` — 23/23 checks pass (18 existing + 5 new)
- Quality gates: 15/15 pass

### Key architectural decisions (see DECISION_LOG.md)
- Client-side Mermaid.js over D2 (no build-time compilation, works offline)
- MutationObserver for dark mode re-rendering (no Round 5 code modified)
- AFC_Storage for interactive persistence (consistent with existing components)

### Deviations from WS4 specs
- D2 replaced with Mermaid.js throughout (diagram content adapted to Mermaid syntax)
- Only 21 HIGH-priority diagrams produced (MEDIUM/LOW deferred to Round 8+)

### Round 7 metrics
| Metric | Value |
|--------|-------|
| Total diagrams | 21 |
| Mermaid diagrams | 15 |
| Decision trees | 3 (M01-4, M02-5, M04-5) |
| Chart.js charts | 2 (M08-1 line, M09-2 waterfall) |
| Recommendation quiz | 1 (M08-2) |
| New JS files | 4 (mermaid-init, chart-renderer, decision-tree, recommendation-quiz) |
| Vendored libraries | 2 (mermaid.min.js, chart.umd.min.js) |
| New CSS file | 1 (_diagrams.css) |
| New verify.js checks | 5 (checks 19-23) |
| Total verify checks | 23/23 pass |
| Build output | 14 HTML files, zero warnings |
| Quality gates | 15/15 pass |
| DECISION_LOG entries | 3 (Mermaid over D2, MutationObserver, AFC_Storage) |
| Opus teammates | 7 (TL, Pipeline, Mermaid A, Mermaid B, Interactive, CSS/QA, Chronicler) |
| Modules with diagrams | 9 of 11 (M07, M08 have charts/quiz only; M00-M06, M09-M10 have Mermaid) |

---

## Round 6 completed

### Team composition
- **Team Lead:** 1 Opus 4.6 orchestrator (verification, integration fixes)
- **Author A:** 1 Opus 4.6 (M00, M01, M02 annotations + Part 1 capstone)
- **Author B:** 1 Opus 4.6 (M03, M04, M05 annotations + Part 2 capstone)
- **Author C:** 1 Opus 4.6 (M06, M07, M08 annotations + Part 3 capstone)
- **Author D:** 1 Opus 4.6 (M09, M10 annotations + Part 4 + Full capstone)
- **Chronicler:** 1 Opus 4.6 (documentation, blog)
- **Model:** All teammates Opus 4.6 (Max Plan)

### Phase 1: Parallel Annotation Authoring — COMPLETE
- 4 authors worked in parallel, each owning 2-3 modules plus one capstone document
- Author A: M00 (30), M01 (30), M02 (46) + Part 1 capstone
- Author B: M03 (28), M04 (30), M05 (29) + Part 2 capstone
- Author C: M06 (32), M07 (23), M08 (28) + Part 3 capstone
- Author D: M09 (30), M10 (31) + Part 4 capstone + Full capstone
- All 11 opening hooks delivered (accordion component, first annotation per module)
- ~28 curiosity prompts as supplementary-reference accordions (exceeded 15-20 target)
- Spiral callbacks embedded in quiz explanation fields throughout
- Module-assessment quizzes: 11/11 modules (7-12 questions each)
- Round 5 test annotations in M00 replaced per WS2a spec

### Phase 2: Integration Verification — COMPLETE
- Quality gates 1-11: all pass
- node build/build.js: 14 files, zero warnings
- node build/verify.js: 18/18 checks pass
- 2 issues found and fixed by TL:
  - M08 duplicate HTML IDs: two self-explanations targeted same section; one relocated to parent H2
  - verify.js check 7 false positive: indexOf logic updated to search after target section position

### Phase 3: Documentation — COMPLETE
- CURRENT_CYCLE.md updated with Round 6 completion state
- Blog post written: blog/2026-03-22-round-6-annotation-authoring.html

### Deviations from WS2a/WS2b specs
- Author A replaced Round 5 test annotations in M00 (concept-gate removed, worked-example relocated per WS2a)
- Author D reading scope narrowed to exec summaries + key takeaways (logged in DECISION_LOG)
- M08 self-explanation relocated from H3 to H2 due to duplicate ID constraint
- Annotation counts (337) higher than prompt target table (190-220) because format contract requires separate YAML entries per quiz question — correct behavior

### Capstone expert answers delivered
| Document | Words |
|----------|-------|
| part-1-capstone.md | ~480 |
| part-2-capstone.md | ~410 |
| part-3-capstone.md | ~420 |
| part-4-capstone.md | ~450 |
| full-capstone.md | ~900 |

### Round 6 metrics
| Metric | Value |
|--------|-------|
| YAML annotation files | 11 (one per module) |
| Total YAML entries | 337 |
| Quiz entries (concept-check + section-review + module-assessment) | ~240 |
| Self-explanation prompts | ~25 |
| Accordion entries (hooks + prompts + supplementary) | ~40 |
| Worked examples | ~15 |
| Concept gates | ~8 |
| Opening hooks | 11/11 |
| Module-assessment quizzes | 11/11 |
| Curiosity prompts | ~28 |
| Capstone documents | 5 (~2,660 words total) |
| Quality gates passed | 11/11 |
| Verify checks | 18/18 pass |
| Build output | 14 HTML files, zero warnings |
| Issues found & fixed | 2 (M08 duplicate IDs, verify.js false positive) |
| DECISION_LOG entries | 3+ (duplicate ID fix, reading scope, verify.js update) |
| Opus teammates | 6 (TL, 4 Authors, Chronicler) |

---

## Round 5 completed

### Team composition
- **Team Lead:** 1 Opus 4.6 orchestrator
- **Storage & Infrastructure Engineer:** 1 (storage.js, dark-mode.js, build pipeline integration)
- **Quiz & Assessment Engineer:** 1 (annotation injector upgrade, quiz, concept-gate, self-explain)
- **Table & Tooltip Engineer:** 1 (table-enhancer, glossary-tooltip)
- **Progress & Navigation Engineer:** 1 (accordion, worked-example, progress-tracker, navigation)
- **CSS & QA Engineer:** 1 (component CSS, verify.js updates, visual verification)
- **Chronicler:** 1 (documentation, blog)
- **Model:** All teammates Opus 4.6 (Max Plan)

### Phase 1: Foundation Layer — COMPLETE
- storage.js: 7.6K, full WS0 Section 2.5 API, graceful degradation, schema versioning
- dark-mode.js: 3.2K, prefers-color-scheme fallback, persistence
- build.js updated: jsPath in 3 contexts, JS file copying in Layer 6
- Templates updated: dark mode toggle in header, 11 script tags in all 3 templates
- Build verified: 14 files output, 2 JS files copied, correct relative paths
- Inline keyboard script preserved in module.hbs

### Phase 2: Core Components — COMPLETE
- Annotation injector upgraded to WS0-compliant HTML (5 component types)
- quiz.js (7.1K): 3 variants, feedback with icons, localStorage persistence
- concept-gate.js (4.2K): advisory checklist, collapse on completion
- self-explain.js (6.4K): auto-grow textarea, 50-char threshold, expert reveal
- table-enhancer.js (14.4K): filter/sort/responsive scroll, 620+ table rows
- glossary-tooltip.js (11.1K): 300ms hover intent, viewport-constrained, file:// safe via inline JSON
- accordion.js (4.5K): animated details/summary, auto-expand for hash targets
- progress-tracker.js (14.0K): Intersection Observer, sidebar checkmarks, session resume
- navigation.js (9.6K): scroll indicator, sidebar toggle, keyboard shortcuts, ? help dialog
- worked-example.js (16.4K): 4-stage fader, contenteditable blanks, progressive hints
- Glossary data embedded inline (55 terms, file:// CORS fix)
- Inline keyboard script removed from module.hbs
- 18/18 verification checks pass
- Total JS output: 11 files, 98.5K

### Phase 3: Integration & Verification — COMPLETE
- Bug found and fixed: storage.js session tracking picked up `<script id="glossary-data">` as a "section" — fixed to only query `h2[id], h3[id]`
- progress-tracker.js patched: session resume only accepts h2/h3 elements
- verify.js check #7 updated for WS0-compliant class names (quiz, self-explain)
- 18/18 automated verification checks pass
- Chrome visual verification: all 9 components render and function in M00
- Quiz: correct/incorrect feedback with icons, localStorage persistence
- Dark mode toggle works, respects prefers-color-scheme
- Progress bar at 27%, sidebar checkmarks visible
- Course map: resume banner, 4-part structure, module cards
- Zero console errors

### Round 5 metrics
| Metric | Value |
|--------|-------|
| JS files created | 11 (storage, dark-mode, 9 components) |
| JS total size | 98.5K |
| CSS file created | _components.css (~580 lines) |
| Annotation injector | Upgraded to WS0-compliant HTML (5 types) |
| Test annotations added | 2 (concept-gate, worked-example) |
| Verify checks | 18/18 pass (11 Round 4 + 7 new) |
| Glossary data | Inline JSON (55 terms, file:// safe) |
| Course map data | Inline JSON (4 parts, 11 modules) |
| Bugs found & fixed | 2 (session tracking selector, verify check class names) |
| DECISION_LOG entries | 3 (injector upgrade, glossary embedding, test annotations) |
| Opus teammates | 6 (Storage, Quiz, Table/Tooltip, Progress/Nav, CSS/QA, Chronicler) |
| Build output | 14 HTML files, 11 JS files, 1 CSS bundle |

---

## Round 4 completed

### Team composition
- **Team Lead:** 1 Opus 4.6 orchestrator
- **Pipeline Engineer:** 1 (build pipeline, verification script)
- **Design System Engineer:** 1 (CSS design system)
- **Template Engineer:** 1 (Handlebars templates, navigation)
- **Content Prep / QA:** 1 (Phase 0 tasks)
- **Chronicler:** 1 (documentation, blog)
- **Model:** All teammates Opus 4.6 (Max Plan)

### Phase 0: Content Preparation — COMPLETE
- M00 annotation YAML created (3 annotations with verified section IDs)
- M07 scheduled-tasks comparison table inserted
- SOURCES.md housekeeping: 3 404s archived, 3 duplicates consolidated, 1 orphan removed

### Phase 1: Build Pipeline — COMPLETE
- 6-layer unified/remark pipeline operational (11 modules processed, 14 output files)
- 3 annotations injected into M00, 55 glossary terms detected
- Idempotent build verified (identical MD5 on consecutive runs)
- npm install succeeded (112 packages)
- Scaffolding templates created (to be enhanced in Phases 2-3)

### Phase 2: CSS Design System — COMPLETE
- 7 CSS files, 1,101 lines total
- Full light/dark color system, type scale per WS6 spec
- 3-column responsive layout, print stylesheet
- Focus management, reduced motion support
- Google Fonts: Inter + JetBrains Mono

### Phase 3: Page Templates and Navigation — COMPLETE
- 3 Handlebars templates enhanced to full WS6 spec
- module.hbs: skip links, ARIA landmarks, breadcrumbs, sidebar TOC, prev/next nav with keyboard shortcuts, Round 5 data-* placeholders
- index.hbs: 4-Part module listing with part colors, resume banner placeholder
- glossary.hbs: filter input with aria-live status, dl semantics, category grouping
- Build still producing 14 files successfully

### Phase 4: Integration and Verification — COMPLETE
- 11/11 automated verification checks pass (verify.js)
- Chrome visual verification passed at 3 breakpoints (1280px, 768px, 375px)
- Zero console errors
- Build idempotency confirmed

### Round 4 metrics
| Metric | Value |
|--------|-------|
| Build pipeline | 6-layer unified/remark, 14 output files |
| CSS design system | 7 files, 1,101 lines, light/dark mode, WCAG compliant |
| Templates | 3 Handlebars templates, full ARIA landmarks, keyboard nav |
| Annotations | 3 M00 proof-of-concept annotations injected |
| Glossary | 55 terms parsed, 20 first-use detected in M00, filter functional |
| Navigation | Learning sequence (non-numerical) verified across all 11 modules |
| Verification | 11/11 automated checks pass, Chrome visual pass at 3 breakpoints |
| Content fixes | M01 duplicate heading renamed, M07 table added, SOURCES.md 7 issues resolved |
| Integration fixes | Cross-module .md-to-.html link rewriting, glossary related-term slug resolution, mobile overflow fix |
| Opus teammates | 5 (Pipeline Engineer, Design System Engineer, Template Engineer, Content Prep/QA, Chronicler) |
| npm packages | 112 |

---

## Round 3 completed

### Team composition
- **Team Lead:** 1 Opus 4.6 orchestrator
- **Learning Architect:** 1 (WS1 course architecture, WS7 spaced repetition)
- **Accessibility Lead:** 1 (WS0 component library structure, WS6 layout/accessibility)
- **Visual Strategist:** 1 (WS0 component behavior, visual survey notes)
- **Citation Standardizer:** 1 (M00, M07, M10 citation format — completed before team formation)
- **Module Designer-A:** 1 (WS2a: pedagogical overlays M00-M05)
- **Module Designer-B:** 1 (WS2b: pedagogical overlays M06-M10)
- **Assessment Designer:** 1 (WS3 assessment framework)
- **Engagement Specialist / Chronicler:** 1 (WS4 visual specs, WS5 engagement design, blog, DECISION_LOG, CURRENT_CYCLE)
- **Chronicler:** 1 (documentation, monitoring, WS4/WS5 completion, assembly, finalization)
- **Model:** All teammates Opus 4.6 (Max Plan)

### Phase 2a: Foundation workstreams (all complete)
- WS0: Component library — 9 reusable components, build pipeline, localStorage schema, glossary integration (11,112 words)
- WS1: Course architecture — four-part structure, reordered learning sequence, prerequisite map, 7 spiral concepts (5,852 words)
- Visual survey notes — per-module visual opportunity inventory (3,321 words)
- Citation standardization — [F#] + [#] convention applied to M00, M07, M10

### Phase 2b: Module-level design (all complete)
- WS2a: Module designs M00-M05 — learning outcomes, hooks, quiz placements, worked-example faders (12,684 words)
- WS2b: Module designs M06-M10 — learning outcomes, spiral callbacks, comparison enhancements (12,397 words)

### Phase 2c: Cross-cutting systems (all complete)
- WS3: Assessment system — 4 quiz types, ~130 questions, feedback framework, self-explanation prompts (9,443 words)
- WS4: Visual and interactive specs — 40 diagrams, 6 cross-module patterns, progressive disclosure map (10,137 words)
- WS5: Engagement design — curiosity hooks, 20 mid-section prompts, 4 capstone scenarios, progress system (3,772 words)
- WS6: Layout and accessibility — typography, color system, responsive layout, WCAG 2.2 AA (4,485 words)
- WS7: Spaced repetition and integration — cross-module review, spacing schedule, integration exercises (8,184 words)

### Phase 3: Assembly and documentation (all complete)
- PEDAGOGICAL-DESIGN.md assembled — 7,711 lines / ~81,400 words across 9 workstream files, master reference for Round 4
- Blog post completed: `blog/2026-03-21-round-3-pedagogical-design.html`
- DECISION_LOG updated with 8 Round 3 entries (5 pre-existing + 3 new)
- CURRENT_CYCLE.md updated
- CURRICULUM.md updated with pedagogical design note

### Round 3 metrics
| Metric | Value |
|--------|-------|
| Workstream documents produced | 9 (WS0-WS7 + visual survey) |
| Total workstream lines | 7,711 |
| Total design output | ~81,400 words |
| Reusable components specified | 9 |
| Diagrams specified | 40 (21 high priority) |
| Quiz questions designed | ~130 |
| Decision scenarios | 11 |
| Capstone scenarios | 4 |
| Curiosity prompts | 20 |
| Progressive disclosure entries | 24 |
| Cross-module visual patterns | 6 |
| Spiral concepts tracked | 7 |
| DECISION_LOG entries added | 8 (5 pre-existing + 3 new) |
| Opus teammates | 10 |
| Pedagogical frameworks applied | 4 (Merrill, 4C/ID, Backward Design, CLT) |
| Phase 2a orchestration | Agent Teams (4 persistent teammates, inter-agent WS0 handoff) |
| Phase 2b-2c orchestration | Parallel background agents (3+3 agents) |
| Retries | 1 auth error (engagement specialist), 1 timeout (engagement specialist) |
| Module edits | Citation standardization only (M00, M07, M10) |

### Key design decisions
| Decision | Rationale |
|----------|-----------|
| Audience broadened to Ryan's social circle | Justified investment in scaffolding, assessment, progressive disclosure |
| Static HTML + JS delivery format | Portable, offline, no server; localStorage for persistence |
| Learning sequence reordered from numerical | M09 after agents, M05 after M03/M06, M08 penultimate (synthesis) |
| Annotations in separate YAML files | Preserves canonical markdown; content and pedagogy evolve independently |
| Four pedagogical frameworks combined | Merrill (module structure), 4C/ID (fading), Backward Design (outcomes), CLT (components) |

---

## Round 2 completed (summary)

- 47,169 words across 11 modules (COMPLETE)
- 83 sources in SOURCES.md (78 web + 5 foundation)
- 9 Opus teammates: 3 source verifiers, 1 harmonizer, 2 depth reviewers, 2 writers, 1 chronicler
- Key corrections: agent cost ($9K -> $1.2K), ARR verification, M10 sources (9/10 verified), RAG expansion, model selection section
- See blog/2026-03-21-round-2-refinement.html for full narrative

---

## Round 1 completed (summary)

- 11 modules drafted, reviewed, and marked COMPLETE (43,079 words)
- 38 researcher agents, 12+ writer agents, 5 reviewer agents, 3 reviser agents, 1 synthesizer
- Synthesis pass resolved cross-module inconsistencies, added 8 glossary terms
- See blog/2026-03-21-building-the-curriculum.html for full Round 1 narrative

---

## Known remaining issues

### Inherited from Round 2
- Source verification (Round 8): 10 of 12 previously-unverified sources verified (2026-03-22); W41 remains unverified (Reddit URL inaccessible, claims corroborated via secondary sources); W66 marked Speculative (WWDC 2026 is future event, June 8-12)
- M09 prompt caching table and M02 caching discussion could be further harmonized

### Resolved in previous rounds
- ~~3 SOURCES.md URLs return 404~~ — archived with notation in Round 4 Phase 0 (W21, W42, W56)
- ~~3 duplicate source entries~~ — consolidated in Round 4 Phase 0 (3a/W20, 3b/W22, 3c/W23)
- ~~W4 orphaned source~~ — removed in Round 4 Phase 0
- ~~Priority 1 content requests~~ — YAML annotations (337), diagrams (21), M07 table, capstone answers all delivered in Rounds 6-7
- ~~Priority 2 content enhancements~~ — curiosity prompts, capstone scenarios, spiral callbacks, opening hooks delivered in Round 6
- ~~Priority 3 citation standardization~~ — completed in Round 3

---

## Production roadmap (Rounds 4–8)

The original "Round 4" production plan was decomposed into focused rounds. Round 6 was further decomposed from the original "Content Production" scope — diagrams deferred to Round 7 because they require D2/Mermaid build infrastructure that doesn't exist yet (see DECISION_LOG.md).

| Round | Name | Scope | Team Size | Depends on |
|-------|------|-------|-----------|------------|
| **4** | **Foundation Build** | Build pipeline (unified/remark), CSS design system (WS6), Handlebars page templates, navigation system, M00 proof-of-concept render, M07 table patch, SOURCES.md housekeeping | 6 Opus agents | Round 3 specs |
| **5** | **Component Build** | 9 interactive JS components, localStorage integration, dark mode toggle UI, annotation injector upgrade | 7 Opus agents | Round 4 |
| **6** | **Annotation Authoring** | 11 YAML annotation files (337 entries), engagement content, 5 capstone expert answers — **COMPLETE** | 6 Opus agents | Rounds 4–5 |
| **7** | **Diagrams & Visual Production** | Client-side Mermaid.js/Chart.js infrastructure, 21 HIGH-priority diagrams, 3 decision trees, 1 recommendation quiz — **COMPLETE** | 7 Opus agents | Rounds 4–6 |
| **8** | **Assembly & QA** | Full 11-module build, cross-browser testing, accessibility audit (WCAG 2.2 AA), performance optimization, conditional script loading, single-HTML export — **COMPLETE** | 6 Opus agents | Rounds 4–7 |

### Round 5 details (COMPLETE)

**Team:** Team Leader, Storage & Infrastructure Engineer, Quiz & Assessment Engineer, Table & Tooltip Engineer, Progress & Navigation Engineer, CSS & QA Engineer, Chronicler — all Opus 4.6

**Delivered:** 11 JS files (98.5K), _components.css (~580 lines), annotation injector upgrade, 18/18 verification checks passing, Chrome visual verification complete.

See Round 5 completed section above for full details.

### Round 6 details (COMPLETE)

**Team:** Team Leader (orchestrator), Author A (M00-M02 + Part 1 capstone), Author B (M03-M05 + Part 2 capstone), Author C (M06-M08 + Part 3 capstone), Author D (M09-M10 + Part 4 + Full capstone), Chronicler — all Opus 4.6

**Delivered:** 337 YAML annotations across 11 modules, 5 capstone expert answer documents (~2,660 words), 11/11 opening hooks, ~28 curiosity prompts, 11/11 module-assessment quizzes. All 11 quality gates pass, 18/18 verify.js checks pass.

See Round 6 completed section above for full details.

### Round 7 details (COMPLETE)

**Team:** Team Leader (orchestrator), Pipeline Engineer (infrastructure), Mermaid Author A (M00-M03), Mermaid Author B (M04-M10), Interactive Engineer (decision trees, charts, recommendation quiz), CSS/QA Engineer (_diagrams.css, accessibility), Chronicler — all Opus 4.6

**Delivered:** 21 diagrams across 9 modules (15 Mermaid, 3 decision trees, 2 Chart.js charts, 1 recommendation quiz). 4 new JS files, 2 vendored libraries, 1 new CSS file, 5 new verify.js checks. 23/23 verification checks pass, 15/15 quality gates pass.

See Round 7 completed section above for full details.

### Round 8 details (COMPLETE)

**Team:** Team Leader (orchestrator, browser testing), Content Editor (capstone revisions, source verification), QA Engineer (HTML validation, build checks), Accessibility Engineer (WCAG audit, CSS/ARIA fixes), Export Engineer (conditional loading, single-HTML export), Chronicler (documentation, blog) -- all Opus 4.6

**Delivered:** 25/25 verification checks passing, zero console errors across 13 pages, 4 accessibility fixes, conditional script loading (up to 3.1 MB savings per page), single-HTML curriculum export (1.31 MB), Part 2 and Part 3 capstone revisions, 10/12 sources verified. All production rounds complete.

See Round 8 completed section above for full details.

---

## Ongoing items

- Monitor for updates after Google I/O 2026 (May 19-20), Microsoft Build (June 2-3), WWDC (June 8-12)
- Resolve remaining Unverified sources, fix 404 URLs, consolidate duplicate entries (Round 4 Phase 0 addresses 404s and duplicates)
