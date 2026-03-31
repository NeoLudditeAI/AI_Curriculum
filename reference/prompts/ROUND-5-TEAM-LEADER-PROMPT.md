# Round 5 Team Leader Prompt — Component Build

**Document type:** Agent Team Leader prompt — to be provided as the initial instruction when creating the Round 5 Agent Team in Claude Code.
**Created:** 2026-03-22
**Author:** Ryan + Claude (pre-session planning)
**Preceding work:** Round 1 produced 11 modules (43,079 words). Round 2 refined them to 47,169 words with 83 verified sources. Round 3 produced a comprehensive pedagogical design (~81,400 words across 9 workstreams). Round 4 built the foundation: a 6-layer Node.js build pipeline, 7-file CSS design system (1,101 lines), 3 Handlebars page templates with ARIA landmarks and keyboard navigation, and an M00 proof-of-concept render passing 11/11 automated verification checks. See `CURRENT_CYCLE.md` for full state and `blog/` for process journals.

You are the Team Leader for Round 5 of the AI Frontier Curriculum project. You are an Opus 4.6 agent orchestrating a team of Opus 4.6 teammates using **Claude Code Agent Teams**.

---

## How Agent Teams Work

You have access to the `Agent` tool for spawning persistent teammates and `SendMessage` for communicating with them. This is critical to understand:

- **Spawning:** Use the `Agent` tool to create each teammate. Each teammate runs as a persistent agent in its own context window. They share the filesystem but NOT your conversation context.
- **Communication:** Use `SendMessage` to send instructions, handoff signals, and status requests to teammates. They reply via `SendMessage` back to you.
- **Context isolation:** Teammates do NOT inherit your conversation. When you spawn a teammate, you MUST provide their complete instructions in the spawn prompt — their role, assigned files, the specs they need to read, file ownership rules, anti-patterns, and any coordination signals they need to watch for. If you don't tell them, they don't know it.
- **File system is shared:** All teammates read and write to the same filesystem. This is why file ownership rules are critical — two agents writing to the same file will corrupt it.
- **Parallel execution:** Multiple teammates can work simultaneously on independent tasks. Use this aggressively — spawn component engineers in parallel when their work doesn't overlap.
- **Team Leader role:** You orchestrate. You verify exit criteria. You resolve conflicts. You do NOT do the implementation work yourself — delegate to teammates.

**When spawning each teammate, include in their prompt:**
1. Their specific role and assigned components/tasks
2. The files they own (and must NOT touch files outside their ownership)
3. Which spec files to read before starting (with full paths and relevant section numbers)
4. The anti-patterns list (briefly or by reference to PEDAGOGICAL-DESIGN.md Appendix A)
5. How to signal completion (SendMessage to Team Leader)
6. Any coordination dependencies (e.g., "Wait for storage.js to be complete before integrating localStorage")
7. The project's persistence-first rule: write decisions and state to files, not just chat

---

## Mission

Build the 9 interactive JavaScript components specified in WS0 Section 2.2, plus the localStorage persistence layer from WS0 Section 2.5, and the dark mode toggle UI. These components bring the static HTML foundation from Round 4 to life — quizzes, tooltips, progress tracking, worked examples, and navigation enhancements.

Round 5 is the second of four production rounds. Round 4 built the pipeline, design system, and templates. Your job is to build every interactive component those templates need. Round 6 will author the annotation content (YAML files + diagrams) and Round 7 will assemble and QA the complete site.

**Production round roadmap (for boundary awareness):**

| Round | Name | Scope | Status |
|-------|------|-------|--------|
| 4 | Foundation Build | Build pipeline, CSS design system, page templates, navigation, M00 proof-of-concept | **COMPLETE** |
| **5** | **Component Build** | **9 interactive JS components, localStorage integration, dark mode toggle** | **THIS ROUND** |
| 6 | Content Production | 11 YAML annotation files, 40 diagram source files, capstone, engagement content | Planned |
| 7 | Assembly & QA | Full 11-module build, cross-browser testing, accessibility audit, optimization | Planned |

**Your round's boundary:** You build all interactive JavaScript components and the persistence layer. You do NOT author YAML annotation files beyond what M00 already has (Round 6), create diagram source files (Round 6), or perform full cross-browser testing (Round 7). Your components must work with the existing M00 proof-of-concept annotations and be ready to handle any annotation content Round 6 produces.

---

## Audience

The curriculum targets Ryan and his social circle — technically sophisticated AI power users who want structured, deep expertise. The components must feel polished and professional. Interactions should be smooth, accessible, and purposeful — every component exists because learning science says it improves retention or comprehension.

**Delivery format:** Static HTML + CSS + JS. No server. No framework. No build-time JS dependencies beyond Node.js. Files open directly from the filesystem (`file://` protocol). localStorage for client-side state persistence.

---

## Critical Rules

1. **WS0 Section 2.2 is the settled specification.** The component specs in `reference/research/round-3/ws0-component-library.md` define every component's HTML structure, ARIA semantics, keyboard navigation, screen reader behavior, JavaScript behavior, and variants. Follow them exactly. Deviate only for a concrete, documented technical blocker — and log the deviation in DECISION_LOG.md.

2. **Progressive enhancement is mandatory.** Every page must be readable and navigable with JavaScript disabled. Quiz questions are visible (just not interactive). Accordion content is expanded by default (CSS handles collapse when JS loads). Tables are usable (just not filterable/sortable). Critical content is never hidden behind JS-only interactions.

3. **No frameworks, no build tools for JS.** Vanilla JavaScript only. No React, Vue, Svelte. No TypeScript. No webpack, Vite, Rollup. No npm runtime dependencies for client-side JS. The build pipeline already handles markdown-to-HTML; component JS is loaded via `<script>` tags in the templates. Components are ES modules where beneficial, but must work via simple concatenation or direct script loading.

4. **WCAG 2.2 AA compliance is non-negotiable.** All components must meet the ARIA patterns specified in WS0. Focus management, keyboard navigation, screen reader announcements — all specified per component. The WS0 spec is your accessibility contract.

5. **localStorage schema is settled.** WS0 Section 2.5 defines the `afc.*` namespace, the data structure for every component type, the schema versioning strategy, and the storage.js API. Implement it exactly. Components read and write through `storage.js`, never directly to `localStorage`.

6. **All agents read and internalize the anti-patterns list** (PEDAGOGICAL-DESIGN.md, Appendix A). Key anti-patterns for component builders: #4 (quiz without feedback — every quiz provides explanatory feedback), #5 (hidden content as default — critical-path content always visible), #6 (generic gamification — progress tracks mastery, not points).

7. **Persistence-first policy** (from AGENT-INIT.md Section 8). Anything that must survive compaction, session restarts, or agent switching MUST be written into a repository file. Chat history is a cache. Repo files are durable state. Always keep current: CURRENT_CYCLE.md, DECISION_LOG.md.

8. **Update project state files after every phase completion.** Update CURRENT_CYCLE.md after each phase completes. Update DECISION_LOG.md for any structural decisions. This is not an end-of-round task — it happens continuously.

---

## Reading Order and Conflict Resolution

Read these files in this order before spawning any teammates (per AGENT-INIT.md Section 0):

1. `PROJECT-DESCRIPTION.md` — What we're building and why
2. `AGENT-INIT.md` — Operational directives, context engineering rules, agent definitions
3. `CURRICULUM.md` — Master index, module status, production roadmap
4. `CURRENT_CYCLE.md` — Round 4 completion state, known issues, Round 5 scope
5. `.claude/rules/00-repo.md` — Always-on repository rules
6. `reference/research/round-3/ws0-component-library.md` — **CRITICAL: All 9 component specs (Section 2.2), localStorage schema (Section 2.5), navigation system (Section 2.3), glossary integration (Section 2.4)** (958 lines — use progressive disclosure, read section by section)
7. `reference/research/PEDAGOGICAL-DESIGN.md` — Appendix A (anti-patterns)
8. `build/templates/module.hbs` — The module page template with Round 5 data-* placeholders
9. `build/templates/index.hbs` — Course map template with resume banner placeholder
10. `build/build.js` — The build pipeline (understand how HTML is generated and where JS is loaded)

**Priority on conflict:** PROJECT-DESCRIPTION.md > AGENT-INIT.md > Round 3 specs (WS0) > Round 4 outputs > CURRICULUM.md > repository instruction files > conversation.

**Context management:** WS0 is 958 lines. Do NOT read it all into context at once. Use offset/limit to read the specific component specs relevant to each engineer's assignment. Instruct teammates to do the same — progressive disclosure is mandatory (AGENT-INIT.md Section 8).

---

## What Round 4 Built (Your Foundation)

Understanding the existing codebase is essential. Here is what Round 4 produced:

### Build pipeline (`build/build.js`)
- 6-layer transformation: parse → transform → convert → annotate → template → bundle
- Custom remark plugins: `section-ids.js`, `heading-extract.js`, `glossary-detect.js`
- Annotation injector reads YAML from `build/annotations/` and injects HTML after target section IDs
- Outputs to `deliverables/html/`

### Templates (`build/templates/`)
- `module.hbs` — Module page with these Round 5 integration points:
  - `data-progress-bar` on a hidden div (line 17) — progress tracker hooks here
  - `data-session-resume` on a hidden div (line 55) — session resume hooks here
  - `data-toc-active` on TOC links (line 46) — scroll tracking hooks here
  - Inline `<script>` for keyboard navigation (lines 90-100) — currently handles ← → arrows
  - `data-theme="light"` on `<html>` — dark mode toggle changes this attribute
- `index.hbs` — Course map with:
  - `data-resume-banner` with `data-resume-link` (lines 21-23) — resume banner hooks here
  - `data-part` on part sections (line 29)
- `glossary.hbs` — Glossary page with filter input already functional via inline JS

### CSS design system (`build/styles/`)
- 7 files, 1,101 lines total: `_variables.css`, `_typography.css`, `_layout.css`, `_colors.css`, `_forms.css`, `_print.css`, `main.css`
- Dark mode CSS custom properties already defined on `[data-theme="dark"]` — only need JS toggle
- All component CSS classes from WS0 (`.quiz`, `.accordion`, `.table-enhancer`, `.glossary-tooltip`, `.concept-gate`, `.worked-example`, `.self-explain`, `.progress-tracker`, `.nav-sidebar`) need **component-specific CSS** added

### Existing JS
- Keyboard navigation (← → for prev/next module) is inline in module.hbs
- Glossary filter is inline in glossary.hbs
- No external JS files exist yet — Round 5 creates all component JS

### Annotations
- `build/annotations/module-00.yaml` — 3 sample annotations (1 quiz, 1 self-explanation prompt, 1 accordion)
- Only M00 has annotations; modules 01-10 will get full annotations in Round 6

### Critical: Component Origin Matrix

Not all 9 components come from the annotation injector. Understanding WHERE each component's HTML originates is essential:

| Component | HTML Origin | How JS Activates |
|-----------|------------|-----------------|
| Quiz Widget | Annotation injector (`annotation-injector.js`) | JS enhances `div.quiz-widget` elements |
| Accordion | Annotation injector | JS enhances `details.accordion` elements |
| Self-Explanation | Annotation injector | JS **must inject** textarea + button (injector only generates prompt text + hidden answer) |
| Glossary Tooltip | Remark plugin during Layer 2 (`glossary-detect.js`) | JS **must inject** tooltip markup for `span.glossary-term--first-use` (plugin only generates `<span>` wrappers) |
| Table Enhancer | Markdown → HTML conversion (all `<table>` elements) | JS wraps ALL tables in `.module-body` with enhancer UI |
| Concept-Check Gate | Annotation injector (type added during Phase 2a injector upgrade) | JS enhances injected markup; component must also work standalone for testing before Round 6 annotations exist |
| Worked-Example Fader | Annotation injector (type added during Phase 2a injector upgrade) | JS enhances injected markup; component must also work standalone for testing before Round 6 annotations exist |
| Progress Tracker | Template data-* attributes (`data-progress-bar`, `data-toc-active`) | JS reads DOM and creates progress UI |
| Navigation Controls | Template elements (sidebar, breadcrumbs, footer) | JS enhances existing nav elements |

**Key implication:** The annotation injector currently generates **simplified HTML** that does NOT match WS0's full component spec. Specifically:

- **Quiz:** Injector outputs `div.quiz-widget` with `<ul>` of choices (no `<form>`, no `<fieldset>`, no radio buttons, no submit button, no `role="region"`). Component JS must either (a) enhance the simplified markup with missing interactive elements, or (b) the injector must be updated to match WS0. **Decision: Update the annotation injector** to produce WS0-compliant HTML. This is cleaner than JS-side DOM surgery and ensures Round 6 annotations produce correct markup from the start. Log this in DECISION_LOG.md.

- **Self-Explanation:** Injector outputs `div.self-explanation` with prompt text and hidden answer. No textarea, no button. Component JS must inject the textarea, "Compare with Expert Answer" button, and feedback comparison layout.

- **Glossary Tooltip:** The remark plugin generates `<span class="glossary-term glossary-term--first-use" data-term="slug">term</span>`. No tooltip `<div>` is generated. Component JS must dynamically create and position tooltip elements.

- **Accordion:** Injector correctly outputs `<details class="accordion">` — this matches WS0 and works with native HTML disclosure semantics.

### Build context: Missing `jsPath`

Round 4's `build.js` defines `site.cssPath` and `site.dataPath` in the template context but NOT `site.jsPath`. The Storage & Infrastructure Engineer must add `jsPath` to the site context object in `build.js`:
- For module pages: `jsPath: '../js'` (modules are in a subdirectory)
- For index/glossary: `jsPath: 'js'` (they're at the root level)

---

## Components to Build

### Phase 1: Foundation Layer

These must be built first — other components depend on them.

**1a. Storage Module (`storage.js`)**
Per WS0 Section 2.5. This is the persistence backbone for all other components.

- Implements the `afc.*` localStorage namespace
- JSON serialization/deserialization with schema versioning (`_version: 1`)
- Graceful degradation when localStorage unavailable (private browsing, full storage) — falls back to in-memory object for the current session
- API: `get(path)`, `set(path, value)`, `getProgress(moduleId)`, `updateProgress(moduleId, data)`, `getPreferences()`, `resetAll()`
- `resetAll()` must show a confirmation dialog before clearing
- Session tracking: saves `session.lastModule`, `session.lastSection`, `session.scrollPosition` on `beforeunload`

**1b. Dark Mode Toggle**
- JS: reads `afc.preferences.darkMode` from storage on page load. If not set, respects `prefers-color-scheme` media query.
- Toggles `data-theme` attribute on `<html>` between "light" and "dark"
- Saves preference to storage
- UI: add a toggle button to the site header in all 3 templates (`module.hbs`, `index.hbs`, `glossary.hbs`). Markup:
  ```html
  <button class="dark-mode-toggle" aria-pressed="false" aria-label="Toggle dark mode">
    <span class="dark-mode-toggle__icon" aria-hidden="true"></span>
  </button>
  ```
  Place inside the existing `<header class="site-header">` element in each template.
- Keyboard accessible, with `aria-pressed` state toggling between "true"/"false"
- Respects `prefers-reduced-motion` for any transition animations

### Phase 2: Core Components (parallel)

These 6 components are independent of each other and can be built in parallel. All depend on `storage.js` from Phase 1.

**2a. Quiz Widget** — WS0 Component 1
- **First: Update annotation injector** (`build/lib/annotation-injector.js`) to produce WS0-compliant HTML. Current output is a bare `div.quiz-widget` with `<ul>` choices; WS0 requires `<section class="quiz">` with `<form>`, `<fieldset>`, `<legend>`, radio buttons, submit button, and `role="region"`. Update `renderQuiz()` to match WS0 Section 2.2 Component 1 HTML structure. Also add support for `concept-gate`, `self-explanation-prompt` (with textarea + button), and `worked-example` component types while in the injector. **Log this injector upgrade in DECISION_LOG.md.**
- 3 variants: `concept-check`, `section-review`, `module-assessment`
- Form submission intercepted, no page reload
- Correct/incorrect via CSS classes + icon indicators (not color-only)
- Feedback div unhidden and populated with explanation text
- `module-assessment` shows cumulative score
- State saved to `storage.js` under `afc.quizzes.*`
- After submission, focus moves to feedback region (`aria-live="polite"`)
- Must work with the existing M00 annotation quiz (rebuild with `node build/build.js` after injector update)

**2b. Progressive-Disclosure Accordion** — WS0 Component 2
- Uses native `<details>`/`<summary>` elements (progressive enhancement: works without JS)
- 3 variants: `advanced-detail`, `supplementary-reference`, `worked-example`
- JS enhances: tracks open/close state, adds animation if `prefers-reduced-motion` allows
- Print stylesheet expands all accordions (already handled by CSS from Round 4)

**2c. Comparison-Table Enhancer** — WS0 Component 3
- Enhances ALL `<table>` elements inside `.module-body` (620+ table rows across 11 modules). Every markdown table becomes a filterable, sortable comparison table.
- Wraps each table in an enhancer container with filter input, sortable column headers, and responsive scroll
- Filter: text input filters rows by matching any column; `aria-live` announces result count
- Sort: clicking column header toggles ascending/descending; `aria-sort` attribute updated
- Responsive: horizontal scroll container with overflow shadow indicator; optional sticky first column for wide tables
- `Escape` clears filter
- This is the most frequently used component (620+ table rows across 11 modules)

**2d. Glossary Tooltip** — WS0 Component 4
- The remark plugin (`build/plugins/glossary-detect.js`) generates `<span class="glossary-term glossary-term--first-use" data-term="slug">` — just a wrapper, no tooltip markup
- Component JS must **dynamically create tooltip elements** for `.glossary-term--first-use` spans, reading term definitions from `data/glossary.json` (already generated by the build)
- Add `tabindex="0"` and `role="button"` to first-use spans (via JS, since the remark plugin doesn't add them)
- Create tooltip `<div role="tooltip">` with definition, first-introduced module, related terms
- 300ms hover delay to prevent flicker
- Touch: tap to toggle
- Dismiss: click outside, `Escape`, or focus away
- Position: above by default, flips below if insufficient viewport space, constrained to viewport
- Link via `aria-describedby` from term span to tooltip div
- Subsequent uses (`.glossary-term` only) are not interactive
- Must load `glossary.json` at page init to populate tooltip content

**2e. Concept-Check Gate** — WS0 Component 5
- Advisory (never blocking) prerequisite checklist before advanced sections
- Checkbox state persisted to `storage.js` under `afc.conceptGates.*`
- Visual feedback on checked items (background color + checkmark icon)
- When all checked: collapses to slim "Prerequisites reviewed" bar
- Continue link always accessible regardless of checkbox state

**2f. Self-Explanation Prompt** — WS0 Component 7
- **After injector upgrade (Phase 2a):** injector generates full WS0 markup including textarea and button. As defensive programming, component JS should verify expected elements exist and inject textarea + button if missing (handles pre-upgrade markup gracefully)
- Textarea for learner response with hidden `<label>` for accessibility
- "Compare with Expert Answer" button starts `disabled`
- Button enables after textarea has >= 50 characters
- Reveal shows expert answer alongside learner response for comparison
- Response saved to `storage.js` under `afc.selfExplanations.*`
- No scoring — purely reflective
- Must work with existing M00 annotation self-explanation prompt

### Phase 3: Complex Components

These have dependencies on Phase 2 or require cross-component coordination.

**3a. Worked-Example Fader** — WS0 Component 6
- 4 progressive stages: `full`, `partial`, `guided`, `independent`
- `partial` variant: contenteditable blank fill-in areas with `role="textbox"`
- `guided` variant: hints available on request (hidden by default)
- `independent` variant: problem only, with "Reveal Complete Solution" disclosure
- Stage progression indicator (dots with `aria-label="Stage N of 4"`)
- State saved to `storage.js` under `afc.workedExamples.*`

**3b. Progress Tracker** — WS0 Component 8
- Module progress bar (`role="progressbar"`) in module header — hooks into `data-progress-bar`
- Section completion via Intersection Observer: marked complete when user scrolls >= 80% AND spends >= 10 seconds
- Quiz completion counts toward section progress
- Sidebar TOC section checkmarks (completed sections get check icon)
- Current section highlighting in sidebar via Intersection Observer
- Course-level progress on course map page
- Session resume: on page load, if `session.lastModule` matches current module, shows scroll-to-section offer in `data-session-resume` div
- All state through `storage.js` under `afc.progress.*`
- Progress framed as "sections explored" not "pages read"

**3c. Navigation Controls Enhancement** — WS0 Component 9
- Scroll progress indicator (thin bar at top of page, `aria-hidden`)
- Sidebar toggle with `aria-expanded` (collapse/expand on narrow viewports — already has CSS, needs JS)
- Enhanced keyboard shortcuts: `Alt+Left`/`Right` (prev/next module), `Alt+Up` (course map), `Alt+T` (toggle sidebar), `/` (focus search/filter), `?` (keyboard shortcuts help dialog)
- Keyboard shortcuts help dialog: `role="dialog"`, `aria-modal="true"`, focus trapping
- The existing inline keyboard script (← → arrows) in module.hbs should be refactored into this component

---

## Component CSS

Each component needs CSS that matches the design system. The CSS belongs in the existing `build/styles/` directory.

**Create:** `build/styles/_components.css` — all component-specific styles

This file imports/follows the CSS custom properties from `_variables.css` and extends them for component-specific needs:
- Quiz: form styling, choice highlighting (correct/incorrect), feedback display
- Accordion: summary hover state, caret rotation, animation
- Table enhancer: filter input, sort indicators, scroll shadow, sticky column
- Glossary tooltip: tooltip positioning, arrow, animation, dotted underline for first-use
- Concept gate: checklist styling, collapse animation, "prerequisites reviewed" bar
- Worked example: stage dots, blank input areas, stage badge colors
- Self-explanation: textarea styling, side-by-side comparison layout
- Progress tracker: bar fill animation, section checkmarks, course-level indicators
- Navigation: scroll indicator bar, sidebar toggle button, shortcuts dialog

**Update:** `build/styles/main.css` to import `_components.css`

Dark mode variants for all component styles should use `[data-theme="dark"]` selector, consistent with the existing pattern in `_colors.css`.

---

## Build Pipeline Integration

Round 4's `build.js` currently loads no external JS files. Round 5 must integrate component JS into the build output.

### JS file structure

```
build/js/
├── storage.js          # localStorage wrapper (Phase 1)
├── dark-mode.js        # Dark mode toggle (Phase 1)
├── quiz.js             # Quiz widget (Phase 2)
├── accordion.js        # Accordion enhancement (Phase 2)
├── table-enhancer.js   # Table filter/sort (Phase 2)
├── glossary-tooltip.js # Tooltip behavior (Phase 2)
├── concept-gate.js     # Prerequisite checklist (Phase 2)
├── self-explain.js     # Self-explanation prompt (Phase 2)
├── worked-example.js   # Worked-example fader (Phase 3)
├── progress-tracker.js # Progress tracking + session resume (Phase 3)
└── navigation.js       # Enhanced navigation + keyboard shortcuts (Phase 3)
```

### Build pipeline changes

`build.js` Layer 6 (Bundle) must be updated to:
1. Copy all JS files from `build/js/` to `deliverables/html/js/`
2. Copy `_components.css` (already handled if it follows the existing CSS concatenation pattern)

### Template changes

All 3 Handlebars templates need `<script>` tags added before `</body>` to load the component JS files. Order matters — `storage.js` must load first since other components depend on it.

```html
<script src="{{site.jsPath}}/storage.js"></script>
<script src="{{site.jsPath}}/dark-mode.js"></script>
<script src="{{site.jsPath}}/quiz.js"></script>
<script src="{{site.jsPath}}/accordion.js"></script>
<script src="{{site.jsPath}}/table-enhancer.js"></script>
<script src="{{site.jsPath}}/glossary-tooltip.js"></script>
<script src="{{site.jsPath}}/concept-gate.js"></script>
<script src="{{site.jsPath}}/self-explain.js"></script>
<script src="{{site.jsPath}}/worked-example.js"></script>
<script src="{{site.jsPath}}/progress-tracker.js"></script>
<script src="{{site.jsPath}}/navigation.js"></script>
```

**Template modifications summary:**
1. All 3 templates: add dark mode toggle button in `<header class="site-header">`
2. All 3 templates: add `<script>` tags before `</body>`
3. `module.hbs`: refactor inline keyboard script (lines 90-100) into `navigation.js`
4. `build.js`: add `jsPath` to site context objects (3 locations: module, index, glossary contexts)

### Annotation injector upgrade

The Round 4 annotation injector (`build/lib/annotation-injector.js`) generates simplified HTML for 3 component types: quiz, self-explanation-prompt, and accordion. This HTML does NOT match the full WS0 specs. **The Quiz & Assessment Engineer must upgrade the injector as the first Phase 2 task** to produce WS0-compliant HTML for all component types. See the Component Origin Matrix above for details.

After the injector upgrade, run `node build/build.js` to regenerate M00's HTML. All other component engineers should verify against this regenerated output.

The injector currently supports these YAML component types:
- `quiz` (variants: concept-check, section-review, module-assessment)
- `self-explanation-prompt`
- `accordion` (variants: advanced-detail, supplementary-reference, worked-example)

The upgrade should add support for:
- `concept-gate`
- `worked-example` (variants: full, partial, guided, independent)

---

## Team Composition

| Role | Agent | Primary Responsibility | Files Owned |
|------|-------|----------------------|-------------|
| **Team Leader** | You | Orchestration, phase gates, quality review, Chrome verification, DECISION_LOG | DECISION_LOG.md |
| **Storage & Infrastructure Engineer** | Teammate | storage.js, dark mode toggle, build pipeline JS integration, template script tags | `build/js/storage.js`, `build/js/dark-mode.js`, build.js Layer 6 updates, template `<script>` additions |
| **Quiz & Assessment Engineer** | Teammate | Annotation injector upgrade, quiz widget, concept-check gate, self-explanation prompt | `build/lib/annotation-injector.js`, `build/js/quiz.js`, `build/js/concept-gate.js`, `build/js/self-explain.js` |
| **Table & Tooltip Engineer** | Teammate | Table enhancer, glossary tooltip | `build/js/table-enhancer.js`, `build/js/glossary-tooltip.js` |
| **Progress & Navigation Engineer** | Teammate | Progress tracker, navigation controls, worked-example fader, accordion | `build/js/progress-tracker.js`, `build/js/navigation.js`, `build/js/worked-example.js`, `build/js/accordion.js` |
| **CSS & QA Engineer** | Teammate | Component CSS, visual regression testing, annotation injector HTML verification | `build/styles/_components.css`, `build/styles/main.css` (import addition only) |
| **Chronicler** | Teammate | Blog post, CURRENT_CYCLE.md updates, progress monitoring | CURRENT_CYCLE.md, `blog/YYYY-MM-DD-round-5-component-build.html` |

**Model:** All teammates Opus 4.6. No exceptions. We are on the Max Plan with headroom. Default to Opus for maximum quality on all engineering tasks.

**File ownership is exclusive.** If two agents need to write to the same file, coordinate through the Team Leader via SendMessage.

**Project rules awareness:** All teammates should be aware of the project's `.claude/rules/` directory. The Chronicler should read `.claude/rules/blog.md` for blog post format. The CSS & QA Engineer should read the existing CSS files to understand the design system patterns before creating `_components.css`.

---

## Phased Coordination Protocol

### Phase 1 (Foundation Layer) — Sequential start

1. **Spawn Storage & Infrastructure Engineer** with Phase 1 tasks. They build `storage.js`, `dark-mode.js`, update `build.js` Layer 6 to copy JS files, and add `<script>` tags to all 3 templates. They also create the `build/js/` directory.
2. **Spawn Chronicler** immediately — they monitor all phases and document progress.
3. **Spawn CSS & QA Engineer** immediately — they can begin `_components.css` in parallel with Phase 1, reading WS0 component specs for styling needs. They also verify the annotation injector's HTML output matches WS0 specs.
4. Storage & Infrastructure Engineer signals completion. Team Leader verifies `storage.js` works (import/export, get/set, graceful degradation test). Verify dark mode toggle functions. Verify build pipeline copies JS correctly. Verify templates load scripts.

### Phase 2 (Core Components) — Parallel build

5. **Spawn Quiz & Assessment Engineer** with annotation injector upgrade FIRST, then Components 1, 5, 7. The injector upgrade must complete before other engineers test with `node build/build.js` — it changes the HTML output they target.
6. **Spawn Table & Tooltip Engineer** with Components 3, 4 (table-enhancer, glossary-tooltip). Can start immediately — their components don't depend on injector output.
7. **Spawn Progress & Navigation Engineer** with Components 2, 6, 8, 9 (accordion, worked-example, progress-tracker, navigation). Accordion targets `<details>` from the injector; verify markup still correct after injector upgrade.
8. All three engineers work in parallel. They all depend on `storage.js` being complete (Phase 1 gate). After Quiz & Assessment Engineer completes the injector upgrade, they signal Team Leader, who runs `node build/build.js` to regenerate M00 HTML with the new markup. Other engineers can then verify their components against the updated output.
9. Each engineer signals completion independently.

### Phase 3 (Integration & Verification) — Sequential convergence

10. **CSS & QA Engineer** does a full visual pass: Run `node build/build.js`, open M00 in Chrome, verify all components render correctly, test interactions.
11. **Team Leader runs Chrome visual verification** (the Team Leader has access to Claude in Chrome; teammates do not). Follow the verification checklist below.
12. **All engineers fix any issues** found during integration.
13. Team Leader reviews all results and declares Round 5 complete or identifies fixes needed.

### Cross-phase dependency map

```
Phase 1 (Storage + Dark Mode + Pipeline Integration)
                    │
          All Phase 1 complete
            /         |          \
Phase 2a          Phase 2b        Phase 2c
(Quiz/Gate/SE)  (Table/Tooltip)  (Progress/Nav/Accordion/WE)
         \           |           /
          └── all Phase 2 complete ──┘
                    │
CSS & QA finalization + Component CSS
                    │
Phase 3 (Integration + Chrome Verification)
                    │
              Round 5 COMPLETE
```

---

## Verification

### Automated verification

Update `build/verify.js` to add these component-specific checks (Pipeline Engineer or CSS & QA Engineer):

12. **Component JS loaded:** All `<script>` tags present in module, index, and glossary pages
13. **Storage module works:** `storage.js` initializes without errors, `get`/`set` round-trips correctly
14. **Dark mode toggle present:** Dark mode button exists in all page templates
15. **Quiz interactivity:** The M00 concept-check quiz accepts input and shows feedback
16. **Glossary tooltip:** First-use terms in M00 have tooltip markup and respond to interaction
17. **Progressive enhancement:** Disable JS, verify content is still visible and navigable
18. **No console errors:** Zero JavaScript errors across all pages

### Chrome visual verification

After automated tests pass, use Claude in Chrome to:

1. Open `deliverables/html/modules/module-00.html` in the browser
2. Verify all 3 M00 annotations render with interactive components (quiz, self-explanation, accordion)
3. Test the quiz: select an answer, submit, verify feedback appears with explanation
4. Test the self-explanation: type in textarea, verify button enables at 50+ chars, reveal expert answer
5. Test glossary tooltips: hover/focus a first-use term, verify tooltip appears with definition
6. Test table enhancer: type in filter, verify rows filter; click column header, verify sort
7. Test dark mode toggle: click, verify colors change; refresh page, verify preference persists
8. Test progress tracker: scroll through sections, verify sidebar checkmarks appear, verify progress bar updates
9. Test session resume: navigate away and return, verify resume prompt appears
10. Test keyboard shortcuts: `Alt+T` toggles sidebar, `?` shows shortcuts dialog, `Escape` dismisses
11. Resize to 768px: verify sidebar collapses, verify toggle button appears
12. Resize to 375px: verify single-column layout, verify all components work
13. Open course map (`index.html`): verify module progress indicators display
14. Open in private browsing: verify graceful degradation (no localStorage errors, components work in memory-only mode)

### Exit criteria

- `node build/build.js` runs without errors
- `node build/verify.js` passes all checks (original 11 + new component checks)
- All 9 components function correctly in M00 proof-of-concept
- localStorage persistence works (quiz answers, progress, preferences survive page reload)
- Graceful degradation: private browsing mode works without errors
- Dark mode toggle functions and persists preference
- All components keyboard-accessible and screen-reader-friendly per WS0 specs
- Build remains idempotent (same inputs → same outputs)
- No console errors in browser on any page
- Component CSS follows the existing design system patterns (custom properties, responsive breakpoints)

---

## Quality Gates

Every gate must pass before the round is declared complete.

1. **Build still passes:** `node build/build.js` produces output without errors. All Round 4 verification still passes.
2. **Automated verification passes:** `node build/verify.js` passes all checks (Round 4's 11 + Round 5's new checks).
3. **All 9 components functional:** Each component works per its WS0 spec in the M00 proof-of-concept.
4. **localStorage persistence verified:** Quiz answers, progress, concept-gate checkboxes, self-explanation responses, preferences, and session state all persist across page reloads.
5. **Graceful degradation:** Components work in private browsing (in-memory fallback). Pages readable with JS disabled.
6. **Dark mode works:** Toggle changes theme, preference persists, respects `prefers-color-scheme` default.
7. **WCAG compliance maintained:** All component interactions keyboard-accessible, ARIA patterns match WS0 spec, focus management correct.
8. **Build idempotency maintained:** Running build twice produces identical output.
9. **File:// protocol works:** All pages load without errors from filesystem. No CORS issues from component JS.
10. **No console errors:** Zero JavaScript errors on all pages.
11. **DECISION_LOG updated:** Any spec deviations or design decisions logged.
12. **CURRENT_CYCLE.md updated:** Reflects Round 5 completion state, metrics, and Round 6 readiness.
13. **Blog post written:** Process journal entry for Round 5.

---

## What NOT to Do

**Engineering anti-patterns:**
- **Do NOT use any JavaScript framework** (React, Vue, Svelte, etc.). Vanilla JS only.
- **Do NOT use TypeScript.** Plain JavaScript.
- **Do NOT add npm runtime dependencies** for client-side JS. Build dependencies (for Node.js build script) are fine; browser-loaded JS must have zero external dependencies.
- **Do NOT add a bundler** for JS (webpack, Vite, etc.). JS files are loaded via individual `<script>` tags.
- **Do NOT minify** in Round 5. Readable, debuggable code. Minification is Round 7.
- **Do NOT author YAML annotation files** for modules 01-10. Only M00 has annotations; Round 6 creates the rest.
- **Do NOT create diagrams or diagram rendering infrastructure.** That's Round 6.
- **Do NOT perform full cross-browser testing.** Test in Chrome for now. Cross-browser QA is Round 7.
- **Do NOT write directly to localStorage.** All components use `storage.js` as the abstraction layer.

**Pedagogical anti-patterns (from PEDAGOGICAL-DESIGN.md Appendix A):**
1. **Quiz without feedback** — Every quiz answer shows an explanatory response, not just correct/incorrect.
2. **Hidden content as default** — Accordions start collapsed BUT content on the critical learning path is never inside an accordion. Only supplementary/advanced content.
3. **Generic gamification** — Progress tracks "sections explored" and mastery, not points or badges.
4. **Color-only encoding** — All correct/incorrect, complete/incomplete indicators use both color AND icons/text.
5. **Seductive details** — Component interactions serve learning objectives, not novelty.

---

## Handling Discoveries and Ambiguity

**Ambiguity protocol** (from AGENT-INIT.md Section 1): If a spec is vague on an implementation detail:
1. Make the simplest conservative assumption.
2. Isolate the assumption to limit blast radius.
3. Record the assumption and open question in CURRENT_CYCLE.md.
4. Proceed — do not block unless the ambiguity affects component architecture.

If during implementation you discover:

- **A mismatch between WS0 spec and annotation injector HTML:** The annotation injector generates the HTML that components attach to. If its output doesn't match WS0's specified HTML structure, update the injector to match WS0 (WS0 is authoritative). Log the change in DECISION_LOG.md.
- **A spec gap** (WS0 doesn't specify a detail): Make a conservative choice, document in DECISION_LOG.md, flag for Round 7 review.
- **A technical limitation** (e.g., tooltip positioning edge case): Implement the best approximation that preserves the spec's intent. Log it.
- **A Round 4 bug:** Fix it if it directly blocks your component work. Log the fix in DECISION_LOG.md. Do not go hunting for Round 4 bugs beyond what directly affects your work.

---

## Key Reference Files

Read the relevant sections of WS0 using progressive disclosure (offset/limit) — do not load all 958 lines into context at once. Read section-by-section as each phase requires.

| File | What it tells you |
|------|-------------------|
| `reference/research/round-3/ws0-component-library.md` | **All 9 component specs (Section 2.2), localStorage schema (Section 2.5), navigation (Section 2.3), glossary integration (Section 2.4)** |
| `reference/research/PEDAGOGICAL-DESIGN.md` | **Appendix A (anti-patterns)** |
| `build/build.js` | **Build pipeline — understand Layer 6 (Bundle) for JS integration** |
| `build/lib/annotation-injector.js` | **The HTML that annotation types produce — your JS must target these elements** |
| `build/templates/module.hbs` | **Module page template with data-* placeholder attributes for components** |
| `build/templates/index.hbs` | **Course map template with resume banner placeholder** |
| `build/templates/glossary.hbs` | **Glossary template with existing filter functionality** |
| `build/styles/_variables.css` | **CSS custom properties — component CSS must use these** |
| `build/styles/_colors.css` | **Color palette including dark mode — component CSS must follow this pattern** |
| `build/annotations/module-00.yaml` | **The 3 test annotations your components must work with** |

---

## Success Criteria

Round 5 is complete when:

1. ✅ `build/js/` directory exists with 11 JS files (storage, dark-mode, 9 components)
2. ✅ `build/styles/_components.css` exists with all component-specific styles
3. ✅ `storage.js` implements the full WS0 Section 2.5 API with graceful degradation
4. ✅ Dark mode toggle works, persists preference, respects `prefers-color-scheme`
5. ✅ All 9 components function correctly in M00 proof-of-concept
6. ✅ Quiz widget handles all 3 variants with feedback and localStorage persistence
7. ✅ Table enhancer provides filter + sort on markdown-generated tables
8. ✅ Glossary tooltips appear on first-use terms with definition and related terms
9. ✅ Progress tracker shows section completion, module progress bar, and session resume
10. ✅ All components keyboard-accessible per WS0 ARIA specs
11. ✅ Graceful degradation: pages usable without JS, components work without localStorage
12. ✅ Build pipeline copies JS files and templates load them correctly
13. ✅ `node build/verify.js` passes all checks (Round 4's 11 + Round 5's additions)
14. ✅ Chrome visual verification passes across all components
15. ✅ DECISION_LOG.md updated with any spec deviations
16. ✅ CURRENT_CYCLE.md updated with Round 5 state
17. ✅ Blog post written documenting Round 5

---

## Begin Sequence

1. **Read project files** in the order specified in "Reading Order and Conflict Resolution" above. Also read the blog posts in `blog/` for Round 1-4 context.
2. **Process AI_INBOX/** per project rules (`.claude/rules/inbox.md`). This prompt document itself is in AI_INBOX — after reading it, move it to the project root as `ROUND-5-TEAM-LEADER-PROMPT.md` (matching the pattern from Rounds 3 and 4). Process any other AI_INBOX files normally.
3. **Read the annotation injector source code** (`build/lib/annotation-injector.js`) to understand exactly what HTML it produces for each component type. This is the integration contract.
4. **Read the M00 proof-of-concept HTML** (`deliverables/html/modules/module-00.html`) to see the current rendered output including the 3 annotations.
5. **Create the `build/js/` directory.**
6. **Spawn teammates** per the Team Composition table and Phased Coordination Protocol. **Critical:** When spawning each teammate, provide their complete context — role, files owned, specs to read (with full file paths and relevant WS0 section numbers), anti-patterns, completion signal protocol, and any dependencies. Teammates do NOT inherit your conversation. See "How Agent Teams Work" section above.
7. **Execute Phases 1–3** following the coordination protocol. Verify exit criteria at each phase gate before advancing.
8. **Run `node build/build.js`** to generate fresh output with all components integrated.
9. **Verify all quality gates** (13 gates) and success criteria (17 items).
10. **Update CURRENT_CYCLE.md** with Round 5 completion state, metrics, and Round 6 readiness.
11. **Write blog post** per `.claude/rules/blog.md` format standards.

Round 4 gave us a solid, verified foundation. Now make it interactive.
