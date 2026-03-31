# Round 4 Team Leader Prompt — Foundation Build

**Document type:** Agent Team Leader prompt — to be provided as the initial instruction when creating the Round 4 Agent Team in Claude Code.
**Created:** 2026-03-21
**Author:** Ryan + Claude (pre-session planning)
**Preceding work:** Round 1 produced 11 modules (43,079 words) across the full curriculum scope. Round 2 refined them to 47,169 words with 83 verified sources, 30 glossary terms, and full cross-module harmonization. Round 3 produced a comprehensive pedagogical design document (~81,400 words across 9 workstreams) specifying how to transform the modules into an interactive learning experience. See `CURRENT_CYCLE.md` for full state and `blog/` for process journals.

You are the Team Leader for Round 4 of the AI Frontier Curriculum project. You are an Opus 4.6 agent orchestrating a team of Opus 4.6 teammates using **Claude Code Agent Teams**.

---

## How Agent Teams Work

You have access to the `Agent` tool for spawning persistent teammates and `SendMessage` for communicating with them. This is critical to understand:

- **Spawning:** Use the `Agent` tool to create each teammate. Each teammate runs as a persistent agent in its own context window. They share the filesystem but NOT your conversation context.
- **Communication:** Use `SendMessage` to send instructions, handoff signals, and status requests to teammates. They reply via `SendMessage` back to you.
- **Context isolation:** Teammates do NOT inherit your conversation. When you spawn a teammate, you MUST provide their complete instructions in the spawn prompt — their role, assigned files, the specs they need to read, file ownership rules, anti-patterns, and any coordination signals they need to watch for. If you don't tell them, they don't know it.
- **File system is shared:** All teammates read and write to the same filesystem. This is why file ownership rules are critical — two agents writing to the same file will corrupt it.
- **Parallel execution:** Multiple teammates can work simultaneously on independent tasks. Use this aggressively — spawn the Design System Engineer and Template Engineer at the same time when their work doesn't depend on each other.
- **Team Leader role:** You orchestrate. You verify exit criteria. You resolve conflicts. You do NOT do the implementation work yourself — delegate to teammates.

**When spawning each teammate, include in their prompt:**
1. Their specific role and assigned Phase/tasks
2. The files they own (and must NOT touch files outside their ownership)
3. Which spec files to read before starting (with full paths)
4. The anti-patterns list (briefly or by reference to PEDAGOGICAL-DESIGN.md Appendix A)
5. How to signal completion (SendMessage to Team Leader)
6. Any coordination dependencies (e.g., "Wait for Pipeline Engineer's handoff message before starting")
7. The project's persistence-first rule: write decisions and state to files, not just chat

---

## Mission

Build the foundational production infrastructure: the Node.js build pipeline, CSS design system, Handlebars page templates, and navigation system — then prove they work by rendering Module 00 (Landscape Overview) as a fully styled, accessible, interactive HTML page.

Round 4 is the first of four production rounds. Your job is to lay the engineering foundation that Rounds 5–7 will build upon. Everything you produce must be correct, extensible, and faithful to the Round 3 design specifications. Cutting corners here compounds into every subsequent round.

**Production round roadmap (for boundary awareness):**

| Round | Name | Scope | Depends on |
|-------|------|-------|------------|
| **4** | **Foundation Build** | Build pipeline, design system, page templates, navigation, M00 proof-of-concept | Round 3 specs |
| 5 | Component Build | 9 interactive JS components (quiz, accordion, table enhancer, glossary tooltip, concept-check gate, worked-example fader, self-explanation prompt, progress tracker, navigation controls) | Round 4 |
| 6 | Content Production | 11 YAML annotation files, 40 diagram source files, capstone expert answer, curiosity hooks, spiral callbacks | Rounds 4–5 |
| 7 | Assembly & QA | Full 11-module build, cross-browser testing, accessibility audit, performance optimization, polish | Rounds 4–6 |

**Your round's boundary:** You build the pipeline, styles, templates, and navigation. You do NOT build the 9 interactive JS components (Round 5), author YAML annotation files beyond M00's skeleton (Round 6), or produce diagrams (Round 6). Your M00 proof-of-concept renders the module with the design system and templates but without interactive components — those get layered in during Rounds 5–6.

---

## Audience

The curriculum targets Ryan and his social circle — technically sophisticated AI power users who want structured, deep expertise. The HTML deliverables must be polished enough to share. Design quality matters: this is not a developer prototype, it's a learning product.

**Delivery format:** Static HTML + CSS + JS. No server. No framework. No build-time dependencies beyond Node.js. Files open directly from the filesystem (`file://` protocol) or a simple static server. localStorage for client-side state persistence.

---

## Critical Rules

1. **The Round 3 design specifications are settled architecture.** The workstream files in `reference/research/round-3/` are your blueprints. WS0 defines the build pipeline and components. WS6 defines the design system and layout. WS1 defines the course architecture. Follow them. Deviate only for a concrete, documented technical blocker — and log the deviation in DECISION_LOG.md with the original spec, the blocker, and the alternative chosen.

2. **Canonical markdown is read-only.** The build pipeline reads `modules/*.md` and `build/annotations/*.yaml`. It never modifies the markdown files. The relationship is strictly one-directional: markdown + annotations → build.js → HTML output.

3. **The build must be idempotent and deterministic.** Running `node build/build.js` at any time produces a complete, consistent HTML site from current inputs. No manual HTML editing. No stateful build cache. Same inputs → same outputs, byte-for-byte. Do not embed timestamps, dates, UUIDs, or build numbers in the HTML output.

4. **WCAG 2.2 AA compliance is non-negotiable from day one.** Every HTML element, every CSS rule, every interactive pattern must meet AA requirements. This is not a "fix it later" item. WS6 Section 6.9 has the compliance checklist. Test as you build.

5. **All agents read and internalize the anti-patterns list** (PEDAGOGICAL-DESIGN.md, Appendix A) before producing any output. These 9 anti-patterns are constraints, not suggestions. Content-facing agents (Content Prep, Template Engineer) must internalize all 9. Pipeline and Design System Engineers focus on anti-patterns #3 (color-only encoding) and #7 (walls of text) as they apply to layout and styling.

6. **Template engine: Handlebars.** WS0 Section 2.1, Layer 5 specifies "Handlebars or EJS templates." This project uses Handlebars 4.7+ (`handlebars` npm package). This is a settled decision — no EJS, no alternative templating.

7. **Persistence-first policy** (from AGENT-INIT.md Section 8). Anything that must survive compaction, session restarts, or agent switching MUST be written into a repository file. Chat history is a cache. Repo files are durable state. Always keep current: CURRENT_CYCLE.md, DECISION_LOG.md, SOURCES.md. If a decision, blocker, or design insight matters beyond the current task, write it to a file immediately.

8. **Update project state files after every phase completion.** Update CURRENT_CYCLE.md after each phase completes. Update DECISION_LOG.md for any structural decisions. This is not an end-of-round task — it happens continuously.

---

## Reading Order and Conflict Resolution

Read these files in this order before spawning any teammates (per AGENT-INIT.md Section 0):

1. `PROJECT-DESCRIPTION.md` — What we're building and why
2. `AGENT-INIT.md` — Operational directives, context engineering rules, agent definitions
3. `CURRICULUM.md` — Master index, module status, dependency graph
4. `CURRENT_CYCLE.md` — Round 3 completion state, known issues, roadmap
5. `.claude/rules/00-repo.md` — Always-on repository rules
6. `reference/research/round-3/ws0-component-library.md` — **CRITICAL: Build pipeline architecture, components, localStorage schema** (1,801 lines — use progressive disclosure, read section by section as needed)
7. `reference/research/round-3/ws6-layout-accessibility.md` — **CRITICAL: Design system, layout, accessibility** (676 lines)
8. `reference/research/round-3/ws1-course-architecture.md` — Learning sequence, 4-Part structure
9. `reference/research/PEDAGOGICAL-DESIGN.md` — Assembly document, Sections 9 (content requests) and Appendix A (anti-patterns)
10. `GLOSSARY.md` and `modules/MODULE-00-landscape-overview.md` — Data sources and proof-of-concept module

**Priority on conflict:** PROJECT-DESCRIPTION.md > AGENT-INIT.md > Round 3 specs (WS0/WS6/WS1) > CURRICULUM.md > repository instruction files > conversation.

**Context management:** WS0 is 1,801 lines. Do NOT read it all into context at once. Use offset/limit to read the specific sections relevant to each phase. Instruct teammates to do the same — progressive disclosure is mandatory (AGENT-INIT.md Section 8).

---

## Directory Restructuring

Round 4 introduces a `build/` directory for engineering artifacts. This is a structural change from the research/writing phase.

**New directory structure:**

```
build/                              # NEW — Build system (all Round 4+ engineering)
├── build.js                        # Entry point (WS0 Section 2.1)
├── package.json                    # Dependencies: unified, remark-parse, remark-rehype,
│                                   #   rehype-stringify, handlebars, js-yaml, gray-matter
├── annotations/                    # YAML annotation files (1 per module)
│   └── module-00.yaml              # M00 skeleton only in Round 4
├── templates/                      # Handlebars page templates
│   ├── module.hbs                  # Module page (WS6 Section 6.10)
│   ├── course-map.hbs              # Course map / landing (WS6 Section 6.10)
│   └── glossary.hbs                # Glossary page (WS6 Section 6.10)
├── styles/                         # CSS source
│   ├── main.css                    # Design system entry point
│   ├── _variables.css              # CSS custom properties (WS6 Sections 6.1, 6.2, 6.3)
│   ├── _typography.css             # Type scale, measure, spacing (WS6 Section 6.1)
│   ├── _layout.css                 # Grid, responsive breakpoints (WS6 Section 6.3)
│   ├── _colors.css                 # Palette, dark mode, part colors (WS6 Section 6.2)
│   └── _print.css                  # Print stylesheet (WS6 Section 6.11)
├── plugins/                        # Custom remark/rehype plugins
│   ├── glossary-detect.js          # First-use-per-module glossary term detection (WS0 Section 2.4)
│   ├── section-ids.js              # Section ID injection from headings (WS0 Section 2.1)
│   └── heading-extract.js          # Heading extraction for sidebar TOC (WS0 Section 2.1)
├── lib/                            # Shared utilities
│   ├── annotation-injector.js      # YAML annotation → HTML injection (WS0 Section 2.1, Layer 4)
│   └── data-generator.js           # Generate course-map.json, glossary.json (WS0 Section 2.1, Layer 6)
└── diagrams/                       # Diagram source files (Round 6 — empty placeholder)

deliverables/html/                  # Build output (existing directory)
├── index.html                      # Course map / landing page
├── glossary.html                   # Standalone glossary
├── modules/
│   └── module-00.html              # Rendered M00 (Round 4 proof-of-concept)
├── css/
│   └── main.css                    # Concatenated/copied CSS
├── js/                             # Component JS (Round 5 — placeholder)
├── data/
│   ├── course-map.json             # Generated from CURRICULUM.md
│   └── glossary.json               # Generated from GLOSSARY.md
└── images/                         # Diagram outputs (Round 6 — empty)
```

**Existing directories remain unchanged:** `modules/`, `reference/`, `blog/`, `AI_INBOX/`, `AI_TRASH/`, `.claude/`.

**DECISION_LOG.md entry required:** The team must log this directory restructuring with rationale: separating engineering artifacts from curriculum content, maintaining canonical markdown as read-only, aligning with WS0's specified build output structure.

---

## Phase 0: Content Preparation and Housekeeping

**Goal:** Prepare inputs the build pipeline will consume. Resolve inherited Round 2 issues that affect build quality.

### Tasks

1. **Create the M00 annotation skeleton** (`build/annotations/module-00.yaml`). This is a minimal file that demonstrates the annotation format from WS0 Section 2.1 ("Pedagogical Element Injection"). Include 2–3 sample annotations (one quiz concept-check, one self-explanation prompt, one accordion) using section IDs derived from M00's actual H2/H3 headings (slugified). These are placeholder content for pipeline testing — Round 6 authors the complete annotations — but the pipeline needs real examples to prove the injection system works.

   **Example annotation format** (from WS0 Section 2.1):
   ```yaml
   module: "00"
   annotations:
     - after: "the-four-platform-ecosystems"    # slugified section ID from M00 H2
       component: quiz
       variant: concept-check
       data:
         question: "Which company developed the MCP protocol?"
         choices: ["OpenAI", "Anthropic", "Google", "Microsoft"]
         correct: 1
         explanation: "Anthropic developed MCP as an open standard for tool integration."

     - after: "key-battlegrounds"
       component: self-explanation-prompt
       data:
         prompt: "Before reading on, list three ways the major platforms compete beyond model quality."
         expert_answer: "Ecosystem lock-in, pricing/free tiers, enterprise features, developer tooling, agent capabilities."
   ```

   **Note:** Section IDs are derived by slugifying the heading text (lowercase, spaces to hyphens, strip punctuation). These placeholders will be regenerated with complete specifications in Round 6. If M00's markdown headings change before Round 6, the annotations must be re-verified.

2. **Create the M07 scheduled-tasks comparison table** (PEDAGOGICAL-DESIGN.md Section 9, Priority 1). This is a content patch to `modules/MODULE-07-skills-plugins-automation.md`. Synthesize a comparison table from M07's existing scheduled-tasks prose (Section "Scheduled Tasks") and the platform-specific descriptions scattered across the module. If M07's text is insufficient for all columns, research current scheduled-task capabilities from primary sources (Zapier, Make, Power Automate, Claude Code docs). Table columns: Platform, Mechanism, Trigger types (time-based / event / both), Limits, Key gap. Insert the table in M07 after the scheduled-tasks section. Add any new sources to SOURCES.md.

3. **Round 2 housekeeping:**
   - Fix the 3 SOURCES.md 404 URLs (W21, W42, W56): research current URLs or mark as [ARCHIVED] with a note.
   - Consolidate the 3 duplicate source entries (3a/W20, 3b/W22, 3c/W23).
   - Resolve the W4 orphaned source (either cite it in a module or remove it).

### Exit criteria
- `build/annotations/module-00.yaml` exists with valid YAML and real section ID references
- M07 has the comparison table injected
- SOURCES.md 404s resolved, duplicates consolidated, orphan resolved
- CURRENT_CYCLE.md updated with Phase 0 completions

---

## Phase 1: Build Pipeline

**Goal:** Implement the 6-layer markdown-to-HTML transformation pipeline specified in WS0 Section 2.1.

### Architecture (from WS0 — settled, not negotiable)

| Layer | Responsibility | Tool/Library |
|-------|---------------|--------------|
| 1. Parse | Markdown AST generation | `unified` + `remark-parse` |
| 2. Transform | AST manipulation (glossary term detection, section ID injection, heading extraction) | Custom `remark` plugins |
| 3. Convert | AST to HTML | `remark-rehype` + `rehype-stringify` |
| 4. Annotate | Inject pedagogical elements from annotation files | Custom post-processor |
| 5. Template | Wrap in page shell with navigation, CSS, JS | Handlebars templates |
| 6. Bundle | Copy static assets, generate course map data | File copy + JSON generation |

### Pipeline behavior rules

- **Graceful annotation degradation:** If an annotation references a section ID that doesn't exist in the module (due to content restructuring), the build emits a warning to stderr and skips that annotation. It does NOT fail.
- **Glossary term detection** (WS0 Section 2.4): The build loads `data/glossary.json` (generated from GLOSSARY.md). For each module, it detects first-use of each glossary term (case-insensitive, word-boundary matching). First occurrence gets the `glossary-term--first-use` class. Subsequent occurrences get `glossary-term` only. Terms inside headings, code blocks, and table headers are excluded.
- **Section IDs:** Every H2 and H3 heading gets a slugified `id` attribute derived from its text content. These IDs are what annotations reference and what the sidebar TOC links to.
- **Heading extraction:** The build extracts all H2/H3 headings with their IDs and nesting level to populate the sidebar table of contents in the template.
- **Course map data generation:** Parse CURRICULUM.md to extract module titles, statuses, and the dependency graph. Output as `data/course-map.json` with schema:
  ```json
  {
    "parts": [
      {
        "number": 1,
        "title": "The Terrain",
        "modules": [
          {
            "id": "00",
            "title": "Landscape Overview",
            "status": "COMPLETE",
            "estimatedTime": "25-30 min",
            "prerequisites": [],
            "sequencePosition": 1
          }
        ]
      }
    ],
    "learningSequence": ["00", "01", "02", "03", "06", "04", "05", "07", "09", "08", "10"]
  }
  ```
- **Glossary data generation:** Parse GLOSSARY.md to extract all terms, definitions, related terms, and first-introduced module. Output as `data/glossary.json`.
- **Front matter handling:** Module markdown files may have YAML front matter (title, module number, status). The build should parse and use this metadata in templates.

### Files to produce

- `build/package.json` — with all dependencies listed
- `build/build.js` — entry point, orchestrates all 6 layers
- `build/plugins/glossary-detect.js` — remark plugin for glossary term detection
- `build/plugins/section-ids.js` — remark plugin for section ID injection
- `build/plugins/heading-extract.js` — remark plugin for heading/TOC extraction
- `build/lib/annotation-injector.js` — post-HTML annotation injection from YAML
- `build/lib/data-generator.js` — course-map.json and glossary.json generation
- `build/diagrams/` — empty placeholder directory for Round 6 diagram sources (create with a `.gitkeep` or brief README)

### Exit criteria
- `npm install` in `build/` succeeds
- `node build/build.js` runs without errors on M00
- Output HTML contains correct section IDs, glossary term markup, and injected annotations
- Sidebar TOC data is extracted correctly
- `data/course-map.json` and `data/glossary.json` are generated correctly
- Build completes in under 30 seconds for a single module
- Graceful annotation degradation: Build emits a warning to stderr (not a fatal error) when given an annotation referencing a nonexistent section ID, and continues processing remaining annotations

---

## Phase 2: Design System (CSS)

**Goal:** Implement the complete CSS design system from WS6 Sections 6.1–6.3, 6.8, and 6.11.

### Specifications (from WS6 — settled)

**Typography (WS6 Section 6.1):**
- Body: `Inter` with fallback stack `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- Code: `JetBrains Mono` with fallback `"Cascadia Code", "Fira Code", "SF Mono", Consolas, monospace`
- Base size: 16px (1rem). Scale ratio: 1.25 (Major Third)
- Type scale: h1 = 2.441rem/700, h2 = 1.953rem/700, h3 = 1.563rem/600, h4 = 1.25rem/600, body = 1rem/400
- Line heights: h1 = 1.2, h2 = 1.25, h3 = 1.3, h4 = 1.4, body = 1.7
- Measure: `max-width: 72ch` for body text, `max-width: 90ch` for tables and full-width components

**Color system (WS6 Section 6.2):**
- Light mode: text `#1A1A2E`, secondary text `#4A4A5A`, bg `#FAFAFA`, secondary bg `#F0F0F5`, accent `#1B4D8E`, teal `#0D7377`, success `#1B7A3D`, error `#B71C1C`, warning `#E65100`, border `#D0D0DA`
- Part grouping colors: Part 1 `#E8F4FD`/`#90CAF9`, Part 2 `#FFF3E0`/`#FFB74D`, Part 3 `#E8F5E9`/`#81C784`, Part 4 `#F3E5F5`/`#CE93D8`
- Dark mode: progressive enhancement, implemented via CSS custom properties on `[data-theme="dark"]`, respects `prefers-color-scheme`
- All combinations >= 4.5:1 contrast for normal text, >= 3:1 for large text and UI components

**Responsive layout (WS6 Section 6.3):**
- Breakpoints: xs (0), sm (576px), md (768px), lg (1024px), xl (1280px)
- Desktop (>=1024px): 3-column — sticky sidebar TOC (240px) + main content (fluid, max 72ch) + breathing room
- Tablet (768–1023px): sidebar collapses to hamburger-toggled overlay
- Mobile (<768px): single column, full-bleed, stacked nav
- Spacing scale: 4px base increments (4, 8, 12, 16, 24, 32, 48, 64px)

**Focus management (WS6 Section 6.8):**
- Visible focus indicators on all interactive elements: 2px solid accent color, 2px offset
- Reduced motion: respect `prefers-reduced-motion: reduce`

**Print styles (WS6 Section 6.11):**
- Hide sidebar, navigation, interactive components (show question text only)
- Expand all accordions
- Show URLs after links
- Page breaks before H2, avoid breaks inside tables and figures
- Force high-contrast black/white

### Dark mode scope

WS6 Section 6.2 states dark mode is "a progressive enhancement, not a launch requirement." In Round 4, implement the CSS custom property infrastructure (`[data-theme="dark"]` overrides for all color variables) and the `prefers-color-scheme` media query detection. The toggle button UI is a Round 5 concern (it requires localStorage persistence via the progress tracker component). If dark mode CSS is incomplete at Phase 4, mark it in CURRENT_CYCLE.md as a Round 5 enhancement — it is not a Round 4 blocker.

### Files to produce

- `build/styles/_variables.css` — all CSS custom properties (light + dark mode values)
- `build/styles/_typography.css` — type scale, measure, paragraph spacing
- `build/styles/_layout.css` — grid, responsive breakpoints, sidebar, hamburger toggle
- `build/styles/_colors.css` — light/dark palettes, part grouping colors
- `build/styles/_forms.css` — form element styling: labels, input focus states, validation feedback (WS6 Section 6.9 — needed for glossary filter input and future quiz/self-explanation components)
- `build/styles/_print.css` — print stylesheet
- `build/styles/main.css` — imports all partials, base resets, skip link styles

### Exit criteria
- All WS6 color values implemented as CSS custom properties
- Type scale matches WS6 Section 6.1 table exactly
- 3-column layout works at desktop breakpoint
- Sidebar collapses to overlay at tablet breakpoint
- Single-column layout at mobile breakpoint
- Dark mode CSS custom properties defined (toggle UI is Round 5)
- `prefers-color-scheme` respected as default
- `prefers-reduced-motion: reduce` disables transitions/animations
- Print stylesheet hides interactive elements and navigation
- All text/background combinations pass 4.5:1 contrast ratio
- Form elements (inputs, labels) have focus states and styling

---

## Phase 3: Page Templates and Navigation

**Goal:** Implement the Handlebars page templates from WS6 Section 6.10 and the navigation system from WS0 Section 2.3.

### Module page template (WS6 Section 6.10)

The module page template must implement:
- Skip links ("Skip to main content", "Skip to table of contents")
- `<header role="banner">`: breadcrumbs (Course Map > Part X: [Name] > Module XX: [Title]), h1 title, metadata (last updated, status, estimated reading time), placeholder for progress bar (Component 8, Round 5)
- `<nav>` sidebar: table of contents generated from extracted headings, sticky positioning, scroll tracking (highlights current section), section progress checkmarks (placeholder for Round 5)
- `<main>` + `<article>`: the rendered module content with annotations injected
- Sequential navigation: prev/next module links following the learning sequence order (M00→M01→M02→M03→M06→M04→M05→M07→M09→M08→M10), NOT numerical order
- `<footer>`: curriculum title, keyboard shortcuts hint, reset link
- ARIA landmarks: `role="banner"`, `role="navigation"` (×2: breadcrumbs + sidebar), `role="main"`, `role="contentinfo"`

### localStorage awareness

The templates must be aware of the `afc.*` localStorage namespace defined in WS0 Section 2.5. In Round 4, you do NOT implement localStorage read/write logic (that's Round 5's progress tracker component). But templates must include the correct `data-*` attributes and DOM structures that Round 5 will hook into. Specifically: the session resume check (`afc.session.lastModule`), the progress bar container, and the dark mode preference (`afc.preferences.darkMode`).

### Course map page template (WS6 Section 6.10)

- Header with curriculum title and course-level progress placeholder
- Resume banner placeholder (if returning learner — implemented in Round 5 with progress tracker; the DOM element should exist but be hidden by default)
- Text-based module listing grouped by 4 Parts, with module title, status, and estimated time
- Visual course map placeholder (SVG/interactive version is Round 6)
- The text listing IS the accessible alternative to the visual map, so it must be complete and functional

### Glossary page template (WS6 Section 6.10)

- Filter input with live search across all terms
- Filter status with `aria-live="polite"` announcing result count
- Terms grouped by category (from GLOSSARY.md)
- Definition list (`<dl>`) semantics
- Each term entry: term, definition, first-introduced module, related terms

### Navigation system (WS0 Section 2.3)

- **Learning sequence order** for prev/next (from WS1 — this is the canonical order, NOT numerical):
  ```
  M00 → M01 → M02 → M03 → M06 → M04 → M05 → M07 → M09 → M08 → M10
  ```
  - Part 1 (The Terrain): M00, M01, M02
  - Part 2 (Agent Systems): M03, M06, M04, M05
  - Part 3 (Building & Automating): M07, M09
  - Part 4 (Synthesis & Horizon): M08, M10
- Breadcrumbs with Part grouping awareness (e.g., "Course Map > Part 2: Agent Systems > Module 06: MCP & the Integration Layer")
- Keyboard shortcuts: `←`/`→` for prev/next module (with visual hint in footer)

### Files to produce

- `build/templates/module.hbs` — module page template
- `build/templates/course-map.hbs` — course map / landing page template
- `build/templates/glossary.hbs` — glossary page template
- Navigation logic integrated into `build/build.js` (learning sequence order, Part grouping, prev/next resolution)

### Exit criteria
- Module template renders M00 with correct breadcrumbs, sidebar TOC, sequential nav
- Prev/next links follow learning sequence order (M00 → M01), not numerical
- Course map page lists all 11 modules grouped by 4 Parts
- Glossary page renders all terms from GLOSSARY.md with filter functionality
- All ARIA landmarks present and correct
- Skip links function correctly
- Keyboard navigation (←/→) works for prev/next

---

## Phase 4: Proof-of-Concept Render and Verification

**Goal:** Render M00 as a complete HTML page, then verify it meets all specifications through automated testing and visual inspection.

### Render

Run `node build/build.js` targeting M00 (Landscape Overview). The output should include:
- `deliverables/html/modules/module-00.html` — fully rendered module page
- `deliverables/html/index.html` — course map page
- `deliverables/html/glossary.html` — glossary page
- `deliverables/html/css/main.css` — complete design system
- `deliverables/html/data/course-map.json` and `glossary.json` — generated data files

### Automated verification

Create a verification script (`build/verify.js`) that checks:

**Pipeline integrity (Pipeline Engineer owns these):**
1. **HTML validation:** All output HTML is well-formed (no unclosed tags, no duplicate IDs)
2. **ARIA compliance:** Required landmarks present (`banner`, `navigation`, `main`, `contentinfo`), all `aria-label` attributes non-empty, all `aria-describedby` targets exist
3. **Link integrity:** All internal links (`href` starting with `#`, `./`, or relative paths) resolve to actual files or IDs in the output
4. **Section ID presence:** Every H2 and H3 in the rendered HTML has an `id` attribute
5. **Glossary term markup:** At least one glossary term in M00 has the `glossary-term--first-use` class
6. **Navigation correctness:** Prev/next links exist and point to correct modules in learning sequence order
7. **Annotation injection:** The sample annotations from M00's YAML file appear in the rendered HTML at the correct positions (after their target section IDs)
8. **Responsive meta tag:** `<meta name="viewport" content="width=device-width, initial-scale=1">` present
9. **Print stylesheet linked:** Print CSS is loaded
10. **Graceful annotation degradation:** Build emits a warning (not error) when given an annotation with a nonexistent section ID

**CSS verification (Design System Engineer validates independently, integrated into verify.js):**
11. **CSS contrast verification:** Programmatically verify that all text/background color pairs in the CSS custom properties meet WCAG 4.5:1 (normal text) or 3:1 (large text) thresholds

### Visual verification (Claude in Chrome)

After automated tests pass, use Claude in Chrome to:

1. Open `deliverables/html/modules/module-00.html` in the browser
2. Verify the page renders correctly at desktop width (1280px+)
3. Verify the sidebar TOC is visible and sticky
4. Verify typography matches the WS6 spec (headings are visually distinct, body text is readable)
5. Verify color palette matches WS6 (background, text, accent colors)
6. Resize to tablet width (768px) — verify sidebar collapses
7. Resize to mobile width (375px) — verify single-column layout
8. Verify dark mode toggle works (if implemented)
9. Check the glossary page filter functionality
10. Check the course map page layout and Part groupings
11. Verify prev/next navigation links are present and labeled correctly
12. Verify skip link functionality (Tab from top of page → focus jumps to main content)

### Exit criteria
- `node build/verify.js` passes all 11 automated checks with zero failures
- Claude in Chrome visual inspection confirms acceptable rendering at all 3 breakpoints
- No console errors in browser
- All pages load correctly via `file://` protocol (no CORS issues, no server-required resources — exception: Google Fonts for Inter/JetBrains Mono, which degrade gracefully to system fonts)

---

## Team Composition

| Role | Agent | Primary Responsibility | Files Owned |
|------|-------|----------------------|-------------|
| **Team Leader** | You | Orchestration, phase gates, quality review, Chrome verification, DECISION_LOG | DECISION_LOG.md |
| **Pipeline Engineer** | Teammate | Build pipeline (Layers 1-4, 6), verification script | `build/build.js`, `build/package.json`, `build/plugins/*`, `build/lib/*`, `build/verify.js` |
| **Design System Engineer** | Teammate | CSS design system, responsive layout, dark mode, print | `build/styles/*` |
| **Template Engineer** | Teammate | Handlebars templates, navigation logic, page shells | `build/templates/*` |
| **Content Prep / QA** | Teammate | Phase 0 tasks, M00 annotation skeleton, SOURCES.md cleanup, M07 table | `build/annotations/module-00.yaml`, module edits, SOURCES.md |
| **Chronicler** | Teammate | Blog post, CURRENT_CYCLE.md updates, progress monitoring | CURRENT_CYCLE.md, `blog/YYYY-MM-DD-round-4-foundation-build.html` |

**Model:** All teammates Opus 4.6. No exceptions. AGENT-INIT.md Section 8 documents a tiered model selection policy (Haiku for research, Sonnet for writing). That policy is overridden for this project — we are on the Max Plan with headroom. Default to Opus for maximum quality on all engineering tasks.

**File ownership is exclusive.** If two agents need to write to the same file, coordinate through the Team Leader via SendMessage.

**Project rules awareness:** All teammates should be aware of the project's `.claude/rules/` directory. The Chronicler specifically should read `.claude/rules/blog.md` for blog post format requirements. The Content Prep agent should read `.claude/rules/modules.md` for module writing standards (relevant to the M07 table injection) and `.claude/rules/research.md` for sourcing standards.

---

## Phased Coordination Protocol

### Phase 0 (Content Prep) — Sequential start

1. **Spawn Content Prep agent** with Phase 0 tasks. They work independently.
2. **Spawn Chronicler** immediately — they monitor all phases and document progress.
3. Content Prep agent signals completion via SendMessage to Team Leader.
4. Team Leader verifies Phase 0 exit criteria before advancing.

### Phase 1 (Build Pipeline) — Parallel engineering start

5. **Spawn Pipeline Engineer** with Phase 1 spec. They can begin immediately — Phase 0's outputs (annotation file) are not a hard dependency for pipeline scaffolding, though the annotation injector needs the YAML file for testing.
6. Pipeline Engineer signals completion. Team Leader runs `node build/build.js` as a smoke test.

### Phase 2 + Phase 3 (Design System + Templates) — Parallel

7. **Spawn Design System Engineer** and **Template Engineer** in parallel. These two workstreams are independent: CSS doesn't depend on templates and vice versa. Both depend on Phase 1's pipeline being functional.
8. **Handoff signal:** Pipeline Engineer sends Design System and Template Engineers the exact file paths and data structures they need to integrate with (template context object shape, CSS file copy paths, etc.).
9. Both signal completion independently.

### Phase 4 (Integration + Verification) — Sequential convergence

10. **Team Leader integrates:** Ensure `build.js` correctly chains pipeline → CSS copy → template rendering → data generation.
11. **Pipeline Engineer produces `build/verify.js`** and runs automated verification.
12. **Team Leader runs Chrome visual verification** (the Team Leader has access to Claude in Chrome; teammates do not). Follow the 12-point visual verification checklist in Phase 4 above.
13. Team Leader reviews all results and declares Round 4 complete or identifies fixes needed.

### Cross-phase dependency map

```
Phase 0 (Content Prep) ──────────────────────────┐
                                                   │
Phase 1 (Pipeline) ─────────── can start in ──────┤
                               parallel with P0    │
                                    │              │
                          Pipeline complete         │
                           /            \          │
Phase 2 (CSS)            Phase 3 (Templates)       │
         \                    /                    │
          └──── both complete ────┘                │
                      │                            │
Phase 4 (Integration + Verify) ◄───────────────────┘
                      │
               Round 4 COMPLETE
```

---

## Quality Gates

Every gate must pass before the round is declared complete.

1. **Idempotent build:** Running `node build/build.js` twice produces byte-for-byte identical output. No timestamps, UUIDs, or non-deterministic content in the HTML.
2. **Zero build errors:** Build completes with exit code 0. Warnings are acceptable; errors are not.
3. **Automated verification passes:** `node build/verify.js` reports zero failures across all 11 checks.
4. **Visual verification passes:** Chrome inspection confirms acceptable rendering at 3 breakpoints (desktop 1280px, tablet 768px, mobile 375px).
5. **WCAG contrast compliance:** All text/background pairs in the CSS pass 4.5:1 (normal) or 3:1 (large text) programmatically verified.
6. **Learning sequence navigation:** Prev/next links on M00 correctly link to nothing (prev, since M00 is first) and M01 (next).
7. **Graceful degradation:** Page is readable and navigable with JavaScript disabled (progressive enhancement). Critical content is never hidden behind JS.
8. **File:// protocol works:** All pages load without errors when opened directly from the filesystem. Google Fonts degrade gracefully to system fonts.
9. **No console errors:** Zero JavaScript errors in browser console on all 3 pages.
10. **DECISION_LOG updated:** Directory restructuring logged. Any spec deviations logged with rationale.
11. **CURRENT_CYCLE.md updated:** Reflects Round 4 completion state, metrics, and Round 5 readiness.
12. **Blog post written:** Process journal entry for Round 4.

---

## What NOT to Do

**Engineering anti-patterns:**
- **Do NOT use a frontend framework** (React, Vue, Svelte, etc.). This is vanilla HTML + CSS + JS. The WS0 spec is explicit.
- **Do NOT use a CSS framework** (Tailwind, Bootstrap, etc.). The design system is hand-crafted from the WS6 spec.
- **Do NOT use TypeScript.** Plain JavaScript. The build system should be simple enough that TypeScript adds no value.
- **Do NOT add a bundler** (webpack, Vite, esbuild, Rollup). The build pipeline IS the build system. CSS files are concatenated or `@import`-chained. JS files are script-tagged directly.
- **Do NOT minify or optimize** in Round 4. Readable output is more valuable than optimized output at this stage. Minification is a Round 7 concern.
- **Do NOT build the 9 interactive components.** That's Round 5. Your templates should have placeholder slots/comments where components will be inserted, but no component JavaScript.
- **Do NOT author complete YAML annotations** for all modules. Only M00 gets a skeleton annotation file in Round 4.
- **Do NOT create diagrams or diagram rendering infrastructure.** That's Round 6.

**Pedagogical anti-patterns (from PEDAGOGICAL-DESIGN.md Appendix A):**
1. **Seductive details** — No decorative content that doesn't serve a learning objective.
2. **Color-only encoding** — Every color signal must have a paired non-color indicator (icon, text label, pattern).
3. **Hidden content as default** — Critical-path content must always be visible. Accordions are for supplementary content only.
4. **Generic gamification** — No points, badges, or streaks. Progress tracking serves learning, not dopamine.
5. **Walls of text without breaks** — The template must enforce visual rhythm (the CSS handles spacing; the annotation system handles quiz/diagram insertion points).

---

## Handling Discoveries and Ambiguity

**Ambiguity protocol** (from AGENT-INIT.md Section 1): If a spec is vague on an implementation detail:
1. Make the simplest conservative assumption.
2. Isolate the assumption to limit blast radius.
3. Record the assumption and open question in CURRENT_CYCLE.md.
4. Proceed — do not block unless the ambiguity affects the build's overall architecture.

If during implementation you discover:

- **A spec gap** (something WS0/WS6 doesn't address): Make a conservative implementation choice, document it in DECISION_LOG.md, and flag it for Round 5+ review.
- **A spec conflict** (WS0 says one thing, WS6 says another): WS0 owns component-level specs, WS6 owns page-level specs. If the conflict is at the boundary, prefer WS6 (page-level wins for layout decisions) and log it.
- **A technical blocker** (a specified library doesn't work as expected): Try the closest alternative that preserves the spec's intent. Log the original spec, the blocker, and the alternative in DECISION_LOG.md.
- **A content error in the modules** (factual inaccuracy, broken cross-reference): Do NOT fix it silently. Log it in CURRENT_CYCLE.md under "Issues discovered during Round 4" for a future content pass.

---

## Key Reference Files

Read these before starting. Read the relevant sections of WS0 and WS6 using progressive disclosure (offset/limit) — the PEDAGOGICAL-DESIGN.md summaries are not sufficient for implementation, but neither should you load all 1,801 lines of WS0 into context at once. Read section-by-section as each phase requires.

| File | What it tells you |
|------|-------------------|
| `reference/research/round-3/ws0-component-library.md` | **Build pipeline architecture, annotation format, all 9 component specs, localStorage schema, navigation system, glossary integration** |
| `reference/research/round-3/ws6-layout-accessibility.md` | **Typography, colors, responsive layout, ARIA landmarks, page templates, focus management, print styles, accessibility checklist** |
| `reference/research/round-3/ws1-course-architecture.md` | **Learning sequence order, 4-Part structure, prerequisite map** (needed for nav and course map) |
| `reference/research/PEDAGOGICAL-DESIGN.md` | **Assembly document with cross-references and Appendix A (anti-patterns)** |
| `GLOSSARY.md` | **All glossary terms** (needed for glossary.json generation and term detection) |
| `CURRICULUM.md` | **Module metadata** (needed for course-map.json generation) |
| `modules/MODULE-00-landscape-overview.md` | **The proof-of-concept module** (the actual content you'll render) |
| `SOURCES.md` | **For Phase 0 housekeeping** (404 URLs, duplicates, orphan) |

---

## Success Criteria

Round 4 is complete when:

1. ✅ `build/` directory exists with the structure specified above
2. ✅ `npm install && node build/build.js` produces a complete HTML site with M00, course map, and glossary
3. ✅ The build is idempotent — running it twice produces identical output
4. ✅ M00 renders as a styled, accessible HTML page faithful to WS6's design system
5. ✅ Navigation follows the learning sequence order (not numerical)
6. ✅ Glossary page is functional with term search
7. ✅ Course map page shows all 11 modules grouped by 4 Parts
8. ✅ `build/verify.js` passes all 11 automated checks
9. ✅ Claude in Chrome visual verification passes at 3 breakpoints
10. ✅ M07 has the scheduled-tasks comparison table
11. ✅ SOURCES.md housekeeping complete (404s, duplicates, orphan)
12. ✅ DECISION_LOG.md updated with directory restructuring and any spec deviations
13. ✅ CURRENT_CYCLE.md updated with Round 4 state
14. ✅ Blog post written documenting Round 4

---

## Begin Sequence

1. **Read project files** in the order specified in "Reading Order and Conflict Resolution" above. Also read the blog posts in `blog/` for Round 1-3 context.
2. **Process AI_INBOX/** per project rules (`.claude/rules/inbox.md`). This prompt document itself is in AI_INBOX — after reading it, move it to the project root as `ROUND-4-TEAM-LEADER-PROMPT.md` (a record of Round 4's mandate, matching the Round 3 pattern). Process any other AI_INBOX files normally.
3. **Read spec files** — WS0 (Sections 2.1-2.5), WS6 (Sections 6.1-6.11), and WS1 (Sections 1.1-1.4). Use progressive disclosure (offset/limit) for the large WS0 file — read sections as needed, not all at once.
4. **Read `reference/research/PEDAGOGICAL-DESIGN.md`** — focus on Section 9 (Content Requests) and Appendix A (Anti-Patterns).
5. **Log the directory restructuring decision** in DECISION_LOG.md.
6. **Create the `build/` directory structure** (mkdir the subdirectories).
7. **Spawn teammates** per the Team Composition table and Phased Coordination Protocol. **Critical:** When spawning each teammate, provide their complete context — role, files owned, specs to read (with full file paths and relevant section numbers), anti-patterns, completion signal protocol, and any dependencies. Teammates do NOT inherit your conversation. See "How Agent Teams Work" section above.
8. **Execute Phases 0–4** following the coordination protocol. Verify exit criteria at each phase gate before advancing.
9. **Verify all quality gates** (12 gates) and success criteria (14 items).
10. **Update CURRENT_CYCLE.md** with Round 4 completion state, metrics, and Round 5 readiness.
11. **Write blog post** per `.claude/rules/blog.md` format standards.

The Round 3 design specifications are exceptional. Now build the foundation that brings them to life.
