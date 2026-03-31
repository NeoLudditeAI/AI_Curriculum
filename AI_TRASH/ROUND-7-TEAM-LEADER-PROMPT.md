# Round 7 Team Leader Prompt — Diagrams & Visual Production

**Document type:** Agent Team Leader prompt — to be provided as the initial instruction when creating the Round 7 Agent Team in Claude Code.
**Created:** 2026-03-22
**Author:** Ryan + Claude (pre-session planning)
**Preceding work:** Round 1 produced 11 modules (47,169 words). Round 2 refined them with 83 verified sources. Round 3 produced a comprehensive pedagogical design (~81,400 words across 9 workstreams). Round 4 built the 6-layer Node.js build pipeline, CSS design system, and Handlebars templates. Round 5 built 9 interactive JavaScript components (98.5K JS), localStorage persistence, dark mode toggle, and an annotation injector supporting 5 component types. Round 6 authored 337 YAML annotations across 11 modules, 5 capstone expert answers, and engagement content. See `CURRENT_CYCLE.md` for full state and `blog/` for process journals.

You are the Team Leader for Round 7 of the AI Frontier Curriculum project. You are an Opus 4.6 agent orchestrating a team of Opus 4.6 teammates using **Claude Code Agent Teams**.

---

## How Agent Teams Work

You have access to the `Agent` tool for spawning persistent teammates and `SendMessage` for communicating with them. This is critical to understand:

- **Spawning:** Use the `Agent` tool to create each teammate. Each teammate runs as a persistent agent in its own context window. They share the filesystem but NOT your conversation context.
- **Communication:** Use `SendMessage` to send instructions, handoff signals, and status requests to teammates. They reply via `SendMessage` back to you.
- **Context isolation:** Teammates do NOT inherit your conversation. When you spawn a teammate, you MUST provide their complete instructions in the spawn prompt — their role, assigned work, file ownership rules, quality standards, and any coordination signals they need to watch for. If you don't tell them, they don't know it.
- **File system is shared:** All teammates read and write to the same filesystem. This is why file ownership rules are critical — two agents writing to the same file will corrupt it.
- **Parallel execution:** Multiple teammates can work simultaneously on independent tasks. But in this round, some work has sequential dependencies — read the Phased Coordination Protocol carefully.
- **Team Leader role:** You orchestrate. You verify quality. You resolve conflicts. You do NOT author diagram content yourself — delegate to teammates.

**When spawning each teammate, include in their prompt:**
1. Their specific role and assigned work items
2. The files they own (and must NOT touch files outside their ownership)
3. Which spec files to read before starting (with full paths and relevant sections)
4. Quality standards: diagrams must be accurate, accessible, and themed for light/dark mode
5. The annotation YAML format for their component type (see "Diagram Annotation Format" below)
6. **Progressive enhancement rule:** Diagrams enhance understanding but critical content is always in the module text. A page must be fully educational without diagrams loading.
7. How to signal completion (SendMessage to Team Leader)
8. The project's persistence-first rule: write decisions and state to files, not just chat

---

## Mission

Produce the visual layer for the AI Frontier Curriculum. This round adds 21 HIGH-priority diagrams across all 11 modules — architecture diagrams, decision trees, data charts, and interactive components — all rendered client-side using Mermaid.js and Chart.js. When Round 7 is complete, running `node build/build.js` will produce fully interactive HTML with both the Round 6 pedagogical annotations AND the Round 7 visual assets.

This is a hybrid engineering + content round. Phase 1 builds the infrastructure (new JS components, annotation injector upgrades, library installation). Phases 2-3 author and integrate the diagram content. This differs from Round 6 (pure content) — the critical path requires engineering to complete before content authoring begins.

**Production round roadmap (for boundary awareness):**

| Round | Name | Scope | Status |
|-------|------|-------|--------|
| 4 | Foundation Build | Build pipeline, CSS design system, page templates, navigation | **COMPLETE** |
| 5 | Component Build | 9 interactive JS components, localStorage, dark mode, annotation injector | **COMPLETE** |
| 6 | Annotation Authoring | 337 YAML annotations, engagement content, 5 capstone expert answers | **COMPLETE** |
| **7** | **Diagrams & Visual Production** | **Mermaid/Chart.js infrastructure, 21 HIGH-priority diagrams, interactive components** | **THIS ROUND** |
| 8 | Assembly & QA | Full 11-module build, cross-browser testing, accessibility audit, optimization | Planned |

**Your round's boundary:** You build diagram rendering infrastructure and author the 21 HIGH-priority diagrams specified in WS4. You do NOT modify existing Round 5 components (quiz.js, accordion.js, etc.), modify module markdown content, modify Round 6 YAML annotations, or perform full cross-browser QA (Round 8). You may update `build/lib/annotation-injector.js` to add the new `diagram` component type — this is expected and required. MEDIUM/LOW priority diagrams from WS4 are deferred to Round 8 or beyond.

---

## Audience

The curriculum targets technically sophisticated AI power users. Diagrams should be information-dense and precise — exact model names, specific pricing, real feature names. No decorative filler. Every element in a diagram earns its place by teaching something the text alone cannot convey as efficiently (spatial relationships, process flows, comparative positioning).

---

## Critical Rules

1. **Client-side rendering, not build-time compilation.** Mermaid diagrams are rendered in the browser by mermaid.js. Chart.js charts render at page load. No D2 compiler, no Mermaid CLI, no server-side SVG generation. Diagram source code lives in YAML annotations and is injected as `<pre class="mermaid">` blocks (for Mermaid) or `<canvas>` elements (for Chart.js) that the libraries pick up on page load.

2. **WS4 is the diagram blueprint.** `reference/research/round-3/ws4-visual-specs.md` specifies every diagram's content, layout, interactions, and accessibility requirements. Follow it for structure and content. Deviate only when the specified approach conflicts with client-side Mermaid rendering — and log the deviation.

3. **Dark mode is mandatory.** Every diagram must look correct in both light and dark mode. Mermaid diagrams use `mermaid-init.js` which reads CSS custom properties from `build/styles/_colors.css` and watches for `data-theme` attribute changes via `MutationObserver`. Chart.js charts use the same pattern. No hardcoded colors in diagram source — use theme variables.

4. **Accessibility is mandatory.** Every diagram annotation must include an `alt` field with descriptive text (20-150 words depending on complexity). Interactive components need keyboard navigation and `aria-live` announcements for state changes. No color-only encoding — pair color with shape, pattern, or label.

5. **Diagram source in YAML annotations.** Diagram content is authored as YAML annotation entries in the existing `build/annotations/module-XX.yaml` files. Authors APPEND to the existing Round 6 YAML files — they do NOT overwrite or remove existing annotations. The annotation injector renders the diagram HTML at the specified section position.

6. **Module markdown is read-only.** Do not modify any `modules/MODULE-XX-*.md` file. Diagrams are overlays injected via annotations, not inline content.

7. **Factual accuracy matches module content.** Every label, number, and relationship in a diagram must be verifiable against the module's text. If the module says Claude Code has 54% enterprise market share, the diagram must show 54%.

8. **Persistence-first policy.** Anything that must survive compaction MUST be written to a file. Update CURRENT_CYCLE.md after each phase. Update DECISION_LOG.md for any structural decisions.

---

## Reading Order

Read these files in this order before spawning any teammates:

1. `PROJECT-DESCRIPTION.md` — What we're building and why
2. `AGENT-INIT.md` — Operational directives, context engineering rules
3. `CURRICULUM.md` — Master index, module status
4. `CURRENT_CYCLE.md` — Round 6 completion state, Round 7 scope
5. `.claude/rules/00-repo.md` — Always-on repository rules
6. `build/annotations/module-00.yaml` — Existing YAML format (337 Round 6 annotations across 11 files)
7. `build/lib/annotation-injector.js` — Current injector (5 component types; you'll add a 6th)
8. `build/build.js` — Build pipeline (understand Layer 6 for JS/CSS copying)
9. `build/templates/module.hbs` — Template (understand where script tags go)
10. `build/styles/_colors.css` — CSS custom properties for theming
11. `build/js/storage.js` — AFC_Storage API (understand the persistence API all interactive components must use)
12. `build/js/dark-mode.js` — Dark mode toggle (sets `data-theme` attribute; no custom event — this is why new components use MutationObserver)
13. `reference/research/round-3/ws4-visual-specs.md` — **PRIMARY SPEC: All diagram specifications** (read progressively — Section 4.1 for inventory, Section 4.2 for per-module specs, Section 4.3 for cross-module patterns)

**Priority on conflict:** Module markdown content (factual authority) > WS4 (diagram blueprints) > WS0 (component design patterns) > CURRICULUM.md > repository instruction files > conversation.

**Context management:** WS4 is large. Each author should read only the sections relevant to their assigned modules. Use offset/limit for targeted reading.

---

## Rendering Architecture

### Client-Side Mermaid (static and semi-interactive diagrams)

Mermaid.js renders diagrams from text source at page load. The approach:

1. **YAML annotation** contains Mermaid source code in the `data.source` field
2. **Annotation injector** renders it as `<pre class="mermaid">[source]</pre>` wrapped in an accessible `<figure>` with `<figcaption>`
3. **mermaid.js** (loaded via `<script>` tag in template) finds all `.mermaid` elements and renders them to SVG on page load
4. **mermaid-init.js** configures theming from CSS custom properties and detects dark mode changes via `MutationObserver` on `document.documentElement`'s `data-theme` attribute (dark-mode.js sets this attribute but does NOT dispatch a custom event)

**Mermaid supports:** flowcharts (`graph TD/LR`), sequence diagrams (`sequenceDiagram`), class diagrams, state diagrams, and more. Architecture diagrams use `graph` with `subgraph` for grouping. See https://mermaid.js.org/syntax/ for full syntax reference.

**Hover interactions on Mermaid diagrams:** Mermaid's rendered SVG supports CSS hover effects. For diagrams requiring hover-highlight behavior (e.g., "hover on client highlights all reachable servers"), add CSS rules targeting Mermaid's generated SVG classes. Complex interactions requiring state management should use a lightweight wrapper JS.

### Chart.js (data visualizations)

Chart.js renders data charts on `<canvas>` elements. The approach:

1. **YAML annotation** contains Chart.js configuration JSON in `data.config`
2. **Annotation injector** renders a `<canvas>` element with a unique ID, wrapped in an accessible `<figure>`
3. **chart-renderer.js** finds all chart canvases on page load, parses their config from a data attribute, and initializes Chart.js instances
4. **Dark mode:** Chart.js reads CSS custom properties for colors at initialization; detects theme toggle via `MutationObserver` on `data-theme` attribute (same pattern as mermaid-init.js) and re-renders with updated colors

### Decision Trees (interactive, state-managed)

Custom JS component for click-to-select branching trees. The approach:

1. **YAML annotation** contains tree structure JSON in `data.config`
2. **Annotation injector** renders a container `<div>` with the config as a data attribute
3. **decision-tree.js** finds containers, renders the tree, handles click/keyboard interaction, persists selected path via `window.AFC_Storage` (not raw localStorage)

### Recommendation Quiz (M08-2 only)

A specialized scoring quiz — not right/wrong like the existing quiz component, but a preference-based recommendation engine. 5-6 questions with weighted answers that produce a platform recommendation.

1. **YAML annotation** contains question set and scoring matrix in `data.config`
2. **Annotation injector** renders a form container
3. **recommendation-quiz.js** handles form interaction, scoring calculation, and result display with rationale

---

## Diagram Annotation Format

All diagram annotations are APPENDED to the existing Round 6 YAML files in `build/annotations/module-XX.yaml`. The `diagram` component type has 4 variants:

### Mermaid diagrams

```yaml
  - after: "section-id-slug"
    component: diagram
    variant: mermaid
    data:
      id: "m00-1"           # Diagram ID from WS4 (used for CSS targeting)
      title: "AI Ecosystem Map"
      alt: "Four-quadrant map showing Anthropic, OpenAI, Google, and Microsoft positioned by consumer reach vs. enterprise depth, with specialist tool clusters around the periphery"
      source: |
        graph TD
          subgraph Anthropic["Anthropic/Claude"]
            A1[Claude Code] --> A2[Agent SDK]
            A1 --> A3[MCP]
          end
          subgraph OpenAI["OpenAI/ChatGPT"]
            B1[ChatGPT] --> B2[Codex]
          end
          %% ... full diagram source
```

### Chart.js charts

```yaml
  - after: "section-id-slug"
    component: diagram
    variant: chart
    data:
      id: "m08-1"
      title: "Market Share Trajectory (Mar 2025 – Mar 2026)"
      alt: "Line chart showing ChatGPT declining from 87% to 68% market share while Gemini rises from 5.4% to 18.2%, with Claude and Copilot stable at approximately 2% each"
      chartType: "line"     # Chart.js native types: line, bar. For M09-2 "waterfall": simulate with a stacked bar chart using transparent base segments — Chart.js has no native waterfall type.
      config: |
        {
          "labels": ["Mar 2025", "Jun 2025", "Sep 2025", "Dec 2025", "Mar 2026"],
          "datasets": [
            {
              "label": "ChatGPT",
              "data": [87, 80, 75, 71, 68],
              "borderDash": []
            }
          ]
        }
```

### Decision trees

```yaml
  - after: "section-id-slug"
    component: diagram
    variant: decision-tree
    data:
      id: "m01-4"
      title: "Model Selection Decision Tree"
      alt: "Interactive decision tree starting with 'What is your primary task?' branching through coding, reasoning, creative writing, multimodal, and budget-constrained paths to specific model recommendations with pricing"
      config: |
        {
          "root": {
            "question": "What is your primary task?",
            "branches": [
              {
                "label": "Coding",
                "question": "What scale?",
                "branches": [
                  { "label": "Single file", "terminal": { "model": "Claude Sonnet 4.6", "price": "$3/$15 per MTok", "rationale": "Fast, accurate for focused tasks" } },
                  { "label": "Multi-file agent", "terminal": { "model": "Claude Code (Opus 4.6)", "price": "$15/$75 per MTok", "rationale": "54% enterprise coding market share" } }
                ]
              }
            ]
          }
        }
```

### Recommendation quiz (M08-2 only)

```yaml
  - after: "section-id-slug"
    component: diagram
    variant: recommendation
    data:
      id: "m08-2"
      title: "Platform Decision Framework"
      alt: "Interactive questionnaire that recommends an AI platform based on your use case, budget, agentic needs, data privacy requirements, and existing tool ecosystem"
      config: |
        {
          "questions": [
            {
              "text": "What is your primary use case?",
              "options": [
                { "label": "Coding and development", "scores": { "claude": 3, "chatgpt": 2, "gemini": 1, "copilot": 2 } },
                { "label": "Research and analysis", "scores": { "claude": 2, "chatgpt": 3, "gemini": 2, "copilot": 1 } }
              ]
            }
          ],
          "platforms": {
            "claude": { "name": "Claude", "tagline": "Best for..." },
            "chatgpt": { "name": "ChatGPT", "tagline": "Best for..." }
          }
        }
```

---

## The 21 HIGH-Priority Diagrams

| ID | Title | Module | Variant | Author Assignment |
|----|-------|--------|---------|-------------------|
| M00-1 | AI Ecosystem Map | 00 | mermaid | Mermaid Author A |
| M00-4 | Key Battlegrounds Concept Map | 00 | mermaid | Mermaid Author A |
| M01-1 | Reasoning Modes Comparison | 01 | mermaid | Mermaid Author A |
| M01-2 | Model Tier Spectrum | 01 | mermaid | Mermaid Author A |
| M01-4 | Model Selection Decision Tree | 01 | decision-tree | Interactive Engineer |
| M02-1 | Context Window Layers | 02 | mermaid | Mermaid Author A |
| M02-2 | RAG Pipeline Architecture | 02 | mermaid | Mermaid Author A |
| M02-5 | RAG Decision Framework | 02 | decision-tree | Interactive Engineer |
| M03-1 | Gather-Act-Verify Loop | 03 | mermaid | Mermaid Author A |
| M04-1 | Five Orchestration Patterns | 04 | mermaid | Mermaid Author B |
| M04-2 | Subagents vs. Agent Teams | 04 | mermaid | Mermaid Author B |
| M04-5 | Multi-Agent Decision Tree | 04 | decision-tree | Interactive Engineer |
| M05-1 | OpenClaw Architecture Stack | 05 | mermaid | Mermaid Author B |
| M06-1 | MCP Client-Server Architecture | 06 | mermaid | Mermaid Author B |
| M06-4 | Three Primitives Diagram | 06 | mermaid | Mermaid Author B |
| M08-1 | Market Share Trajectory | 08 | chart | Interactive Engineer |
| M08-2 | Platform Decision Framework | 08 | recommendation | Interactive Engineer |
| M09-2 | Cost Optimization Waterfall | 09 | chart | Interactive Engineer |
| M10-1 | Tiered Inference Architecture | 10 | mermaid | Mermaid Author B |
| M10-2 | Enterprise Governance Stack | 10 | mermaid | Mermaid Author B |
| M10-4 | Curriculum Synthesis Map | 10 | mermaid | Mermaid Author B |

**Distribution:** Mermaid Author A: 7 diagrams (M00-M03). Mermaid Author B: 8 diagrams (M04-M10). Interactive Engineer: 6 items (3 decision trees, 2 charts, 1 recommendation quiz).

**Dependency note:** M10-4 (Curriculum Synthesis Map) should be authored last — it references all modules. All decision trees share the same interaction pattern and styling; the Interactive Engineer should build one, verify it works, then replicate for the other two.

---

## What Round 5 and Round 6 Built (Your Foundation)

### Round 5 Component Inventory (DO NOT MODIFY)

| Component | JS File | Annotation-Driven? |
|-----------|---------|-------------------|
| Quiz Widget | quiz.js | Yes (5 types in YAML) |
| Self-Explanation | self-explain.js | Yes |
| Concept-Check Gate | concept-gate.js | Yes |
| Worked-Example Fader | worked-example.js | Yes |
| Accordion | accordion.js | Yes |
| Table Enhancer | table-enhancer.js | No (auto-activates) |
| Glossary Tooltip | glossary-tooltip.js | No (auto-activates) |
| Progress Tracker | progress-tracker.js | No (template-driven) |
| Navigation Controls | navigation.js | No (template-driven) |
| Storage API | storage.js | No (utility) |
| Dark Mode | dark-mode.js | No (utility) |

### Round 6 Annotation State

337 YAML annotation entries across 11 module files. **Your diagram annotations are APPENDED to these files.** Do not overwrite, reorder, or remove existing annotations. Add diagram entries after the existing Round 6 entries in each file.

### Current Build State

```
node build/build.js   → 14 HTML files, zero warnings
node build/verify.js  → 18/18 checks pass
```

Round 7 must maintain this baseline. After adding diagram infrastructure, the build must still produce 14 files with no warnings, and all 18 existing checks must still pass. New checks will be added for diagram-specific verification.

---

## Team Composition

| Role | Agent | Primary Responsibility | Files Owned |
|------|-------|----------------------|-------------|
| **Team Leader** | You | Orchestration, quality review, build verification | DECISION_LOG.md |
| **Pipeline Engineer** | Teammate | Mermaid/Chart.js install, annotation injector upgrade, template updates, verify.js, storage schema | `build/lib/annotation-injector.js`, `build/js/mermaid-init.js`, `build/js/chart-renderer.js`, `build/js/decision-tree.js`, `build/js/recommendation-quiz.js`, `build/js/mermaid.min.js` (vendored), `build/js/chart.umd.min.js` (vendored), `build/js/storage.js` (schema update only), `build/templates/*.hbs`, `build/verify.js`, `build/package.json` |
| **Mermaid Author A** | Teammate | M00-M03 Mermaid diagram source (7 diagrams) | Appends to: `build/annotations/module-00.yaml`, `module-01.yaml`, `module-02.yaml`, `module-03.yaml` |
| **Mermaid Author B** | Teammate | M04-M10 Mermaid diagram source (8 diagrams) | Appends to: `build/annotations/module-04.yaml`, `module-05.yaml`, `module-06.yaml`, `module-10.yaml` |
| **Interactive Engineer** | Teammate | Decision trees, charts, recommendation quiz content + config | Appends to: `module-01.yaml`, `module-02.yaml`, `module-04.yaml`, `module-08.yaml`, `module-09.yaml` |
| **CSS/QA Engineer** | Teammate | Diagram CSS, mermaid theme, responsive, dark mode, accessibility | `build/styles/_diagrams.css`, `build/styles/main.css` (add `@import` only) |
| **Chronicler** | Teammate | CURRENT_CYCLE.md updates, blog post | CURRENT_CYCLE.md, `blog/YYYY-MM-DD-round-7-diagrams.html` |

**Model:** All teammates Opus 4.6. No exceptions.

**File ownership note:** Mermaid Author A and Interactive Engineer both write to `module-01.yaml` and `module-02.yaml`. **Coordinate via SendMessage** — Author A appends Mermaid diagrams first, then Interactive Engineer appends decision tree annotations after Author A signals completion for that module. Similarly for `module-04.yaml` (Author B first, then Interactive Engineer).

---

## Phased Coordination Protocol

### Phase 1: Infrastructure (Pipeline Engineer — sequential, blocks all others)

**This phase must complete before any content authoring begins.**

1. **Install dependencies:**
   ```bash
   cd build && npm install mermaid@11 chart.js@4
   ```

2. **Create new JS files:**
   - `build/js/mermaid-init.js` — Initialize mermaid with theme from CSS custom properties; detect dark-mode toggles via `MutationObserver` on `document.documentElement` watching the `data-theme` attribute (dark-mode.js does NOT dispatch a custom event — it only sets this attribute); on theme change, re-initialize mermaid and re-render all `.mermaid` elements; configure security (disable click handlers from Mermaid source to prevent XSS).
   - `build/js/chart-renderer.js` — Find all `<canvas data-chart-config>` elements, parse config, initialize Chart.js instances with theme colors from CSS custom properties; detect dark-mode toggles via the same `MutationObserver` pattern (watch `data-theme` attribute) and re-render charts with updated colors.
   - `build/js/decision-tree.js` — Render interactive decision trees from JSON config; click-to-select branches; keyboard navigation (arrow keys); persist selected path via `window.AFC_Storage.set()` (use the `decisionTrees` key — consistent with how quiz.js uses `quizzes` and concept-gate.js uses `conceptGates`); reset button; `aria-live` announcements for path changes. Do NOT use raw `localStorage` — use the AFC_Storage abstraction from storage.js.
   - `build/js/recommendation-quiz.js` — Render scoring form from config; calculate weighted scores; display recommendation with rationale; "Try different answers" reset; `aria-live` result announcement. Persist last recommendation via `window.AFC_Storage.set()` (use a `recommendations` key). Do NOT use raw `localStorage`.

3. **Upgrade annotation injector:**
   Add a 6th component type `diagram` to `build/lib/annotation-injector.js` with a `renderDiagram()` function dispatching on variant:
   - `mermaid` → `<figure class="diagram diagram--mermaid" id="diagram-{id}"><pre class="mermaid">{source}</pre><figcaption>{title}</figcaption></figure>` with `role="img"` and `aria-label="{alt}"` on the figure. **Escaping note:** Use the existing `escapeHtml()` on `{source}` — this is safe because Mermaid reads `textContent` from the `<pre>` element, which automatically decodes HTML entities. Follow the same escaping pattern as the existing render functions.
   - `chart` → `<figure class="diagram diagram--chart" id="diagram-{id}"><canvas data-chart-type="{chartType}" data-chart-config='{config}'></canvas><figcaption>{title}</figcaption></figure>` with `role="img"` and `aria-label="{alt}"`.
   - `decision-tree` → `<figure class="diagram diagram--decision-tree" id="diagram-{id}"><div class="decision-tree" data-tree-config='{config}'></div><figcaption>{title}</figcaption></figure>` with appropriate ARIA.
   - `recommendation` → `<figure class="diagram diagram--recommendation" id="diagram-{id}"><div class="recommendation-quiz" data-quiz-config='{config}'></div><figcaption>{title}</figcaption></figure>` with appropriate ARIA.

4. **Update Handlebars templates:**
   Add script tags for mermaid and new JS files to `build/templates/module.hbs` (and index.hbs, glossary.hbs if diagrams appear there). Load order:
   ```html
   <!-- After existing Round 5 component scripts -->
   <script src="{{site.jsPath}}/mermaid.min.js"></script>
   <script src="{{site.jsPath}}/chart.umd.min.js"></script>
   <script src="{{site.jsPath}}/mermaid-init.js"></script>
   <script src="{{site.jsPath}}/chart-renderer.js"></script>
   <script src="{{site.jsPath}}/decision-tree.js"></script>
   <script src="{{site.jsPath}}/recommendation-quiz.js"></script>
   ```

5. **Vendor library bundles into `build/js/`:**
   Copy `node_modules/mermaid/dist/mermaid.min.js` → `build/js/mermaid.min.js`. Copy `node_modules/chart.js/dist/chart.umd.min.js` → `build/js/chart.umd.min.js`. Layer 6 already copies all `.js` files from `build/js/` to the output directory — vendoring libraries here means no build.js modification is needed for asset copying.

6. **Update verify.js:**
   Add new checks:
   - Check 19: `diagram` component type exists in annotation-injector.js
   - Check 20: mermaid.min.js exists in output JS directory
   - Check 21: chart.umd.min.js exists in output JS directory
   - Check 22: All `build/annotations/*.yaml` files parse without errors
   - Check 23: All diagram annotations have `id`, `title`, and `alt` fields

7. **Update storage.js default schema:**
   Add two new keys to the `DEFAULT_STATE` in `build/js/storage.js`: `decisionTrees: {}` and `recommendations: {}` (alongside existing `quizzes`, `conceptGates`, `selfExplanations`, `workedExamples`). Bump `SCHEMA_VERSION` from 1 to 2. This is a minimal, additive change — existing data is preserved.

8. **Run baseline verification:**
   ```bash
   node build/build.js    # Must still produce 14 files, zero warnings
   node build/verify.js   # 18 existing checks must still pass + 5 new = 23 total
   ```

9. **Signal completion** to Team Leader. Include: list of files created/modified, npm packages installed (with exact versions), vendored library filenames, new verify.js check numbers (19-23), storage.js schema version bump, any issues encountered.

### Phase 2: Content Authoring (parallel — after Phase 1)

**Mermaid Authors A and B + Interactive Engineer work simultaneously.**

10. **Mermaid Authors** work through their assigned modules:
   - Read the module markdown for factual accuracy
   - Read the WS4 spec for the specific diagram (use progressive disclosure)
   - Extract section IDs from generated HTML: `grep '<h[23]' deliverables/html/modules/module-XX.html`
   - Write the Mermaid source code following Mermaid.js syntax
   - Append the YAML annotation entry to the module's existing YAML file
   - Run `node build/build.js` to verify the build succeeds
   - Open the generated HTML to verify the Mermaid diagram renders
   - Signal completion per diagram: diagram ID, section ID used, any WS4 deviations

11. **Interactive Engineer** authors YAML annotation configs for all 6 interactive items (the JS rendering engines were already created by Pipeline Engineer in Phase 1):
    - Start with M01-4 decision tree: author the YAML annotation with full tree config JSON, run `node build/build.js`, verify the decision tree renders, click interaction works, keyboard navigation works, AFC_Storage persists selected path
    - Author M02-5 and M04-5 decision tree configs (same `decision-tree` variant, different data)
    - Author M08-1 chart annotation (line chart config JSON), verify Chart.js renders it
    - Author M09-2 chart annotation (waterfall chart config)
    - Author M08-2 recommendation quiz annotation (question set + scoring matrix)
    - Signal completion per item: diagram ID, section ID used, any issues

12. **Team Leader monitors** — as each author completes a diagram:
    - Run `node build/build.js` to verify
    - Spot-check the rendered HTML for the diagram
    - Verify alt text is descriptive and accurate
    - Check that diagram content matches module text

**Build concurrency note:** Multiple authors appending to different YAML files can run `node build/build.js` simultaneously with low collision risk (the build reads YAML but writes HTML). If a build error looks like a file conflict, retry once. The Team Leader's Phase 4 full build is authoritative.

**Shared YAML file coordination:** For modules where both a Mermaid Author and the Interactive Engineer write annotations (M01, M02, M04), the Mermaid Author writes first and signals completion. The Interactive Engineer then appends their entries. This prevents YAML corruption from simultaneous writes to the same file.

### Phase 3: CSS & Theming (CSS/QA Engineer — overlaps with Phase 2)

13. **CSS/QA Engineer** creates `build/styles/_diagrams.css` and adds `@import '_diagrams.css';` to `build/styles/main.css` (after the existing `@import '_components.css';` line — the build's `bundleCss()` resolves `@import` statements, so this is how the new styles get bundled):
    - Container styling for `.diagram` figures (max-width, centering, margin)
    - Mermaid SVG responsive sizing (`overflow-x: auto` for wide diagrams)
    - Dark mode Mermaid theme configuration (extend `_colors.css` variables)
    - Chart.js canvas responsive sizing
    - Decision tree interactive styling (selected branch highlight, hover effects, focus outlines)
    - Recommendation quiz form styling
    - Print stylesheet additions (`@media print` — render diagrams at fixed width, hide interactive controls)
    - Reduced motion: `@media (prefers-reduced-motion: reduce)` — disable any transition animations

14. **CSS/QA Engineer** verifies accessibility:
    - All `<figure>` elements have `role="img"` and `aria-label`
    - Decision trees have keyboard navigation (tab, arrow keys, enter)
    - `aria-live="polite"` on decision tree path display and recommendation result
    - Focus management: visible focus outlines on all interactive elements
    - Color contrast: diagram text meets WCAG 2.2 AA against background in both themes

### Phase 4: Integration & Verification (Team Leader — sequential)

15. **Full build:**
    ```bash
    node build/build.js    # All 11 modules with Round 6 annotations + Round 7 diagrams
    node build/verify.js   # All 23 checks must pass (18 existing + 5 new)
    ```

16. **Visual verification:**
    Start a local server (`python3 -m http.server 8765 --directory deliverables/html/`) and verify in Chrome:
    - At least 2 Mermaid diagrams render correctly (check M00-1 and M06-1)
    - At least 1 decision tree is interactive (check M01-4)
    - At least 1 chart renders (check M08-1)
    - Dark mode toggle re-renders all diagram types correctly
    - Existing Round 6 annotations (quizzes, self-explanations) still function

17. **Quality gates verification** — all 15 gates must pass (see Quality Gates section).

18. **Delegate fixes** to responsible teammate. Re-verify after fixes.

19. **Chronicler** updates CURRENT_CYCLE.md and writes blog post.

---

## Verification

### Build verification

```bash
node build/build.js    # Must succeed without errors
node build/verify.js   # All 23 checks must pass (18 existing + 5 new)
```

**Chrome visual verification:** The Cowork sandbox blocks `file://` URLs. Start a local server: `python3 -m http.server 8765 --directory deliverables/html/` then navigate to `http://localhost:8765/modules/module-00.html`.

### Content verification (Team Leader)

For each diagram:
1. **Renders correctly:** Diagram appears in the right position, all elements visible
2. **Factual accuracy:** Labels, numbers, relationships match module content
3. **Alt text quality:** Descriptive, accurate, 20-150 words
4. **Dark mode:** Diagram is legible and correctly themed in both modes
5. **Interactive elements work:** Decision tree branches clickable, charts hoverable, recommendation quiz functional
6. **No regression:** Existing Round 6 annotations still render and function

---

## Quality Gates

Every gate must pass before the round is declared complete.

1. **Build passes:** `node build/build.js` produces 14 files without errors.
2. **Existing checks pass:** All 18 Round 5 verification checks still pass.
3. **New checks pass:** All new diagram verification checks pass.
4. **Mermaid library loads:** mermaid.min.js is present in output JS directory and initializes without console errors.
5. **Chart.js library loads:** `chart.umd.min.js` is present in output JS directory.
6. **All 21 diagram annotations exist:** One YAML entry per HIGH-priority diagram in the correct module file.
7. **All diagrams have `id`, `title`, and `alt` fields:** Verified by verify.js.
8. **Mermaid diagrams render:** At least 12 of 15 Mermaid diagrams render without Mermaid syntax errors.
9. **Decision trees interactive:** All 3 decision trees respond to click and keyboard input.
10. **Charts render:** Both Chart.js charts (M08-1, M09-2) display data correctly.
11. **Dark mode works:** Diagrams re-theme correctly on toggle (spot-check 3 diagrams).
12. **No Round 6 regression:** Existing quiz, self-explanation, and accordion annotations still render and function.
13. **DECISION_LOG updated:** Any WS4 deviations or architectural decisions logged.
14. **CURRENT_CYCLE.md updated:** Reflects Round 7 completion state with metrics.
15. **Blog post written:** Process journal entry for Round 7.

---

## What NOT to Do

**Scope anti-patterns:**
- **Do NOT install D2.** All diagrams use client-side Mermaid or Chart.js. No server-side compilation.
- **Do NOT modify Round 5 JS components** (quiz.js, accordion.js, etc.). They are complete and tested. **Exception:** Pipeline Engineer adds `decisionTrees` and `recommendations` keys to storage.js's `DEFAULT_STATE` and bumps `SCHEMA_VERSION` — this is an additive, non-breaking change.
- **Do NOT modify or reorder Round 6 YAML annotations.** Append diagram entries after existing content.
- **Do NOT modify module markdown.** Diagrams are injected via annotations.
- **Do NOT author MEDIUM/LOW priority diagrams.** Only the 21 HIGH-priority items in the table above.
- **Do NOT hardcode colors.** Use CSS custom properties or Mermaid theme variables.

**Content anti-patterns:**
- **Do NOT create decorative diagrams.** Every element teaches something.
- **Do NOT hallucinate data.** Every number in a chart or label in a diagram must trace to module content.
- **Do NOT use color-only encoding.** Pair with shape, pattern, dash style, or label.
- **Do NOT omit alt text.** Every diagram annotation must have an `alt` field.

---

## Key Reference Files

| File | What it tells you |
|------|-------------------|
| `reference/research/round-3/ws4-visual-specs.md` | **PRIMARY SPEC: All diagram specifications** |
| `build/annotations/module-00.yaml` | **Existing YAML format (append to this pattern)** |
| `build/lib/annotation-injector.js` | **Current injector — add `diagram` component type** |
| `build/build.js` | **Build pipeline — understand Layer 6 for asset copying** |
| `build/templates/module.hbs` | **Template — add script tags for mermaid/chart.js** |
| `build/styles/_colors.css` | **CSS custom properties — map to Mermaid/Chart.js themes** |
| `build/js/dark-mode.js` | **Dark mode toggle — sets `data-theme` attr, no custom event** |
| `build/js/storage.js` | **AFC_Storage API — use for all persistence, never raw localStorage** |
| `modules/MODULE-XX-*.md` | **Factual authority — diagram content must match** |
| `GLOSSARY.md` | **Canonical term definitions** |

---

## Success Criteria

Round 7 is complete when:

1. ✅ `node build/build.js` runs without errors (14 HTML files)
2. ✅ `node build/verify.js` passes all 23 checks (18 existing + 5 new diagram checks)
3. ✅ mermaid.js and Chart.js load in generated HTML without console errors
4. ✅ `mermaid-init.js` syncs theme with dark mode toggle
5. ✅ `chart-renderer.js` initializes all chart instances
6. ✅ `decision-tree.js` renders interactive trees with keyboard nav and AFC_Storage persistence
7. ✅ `recommendation-quiz.js` renders M08-2 with scoring and recommendation
8. ✅ Annotation injector supports `diagram` component type with 4 variants
9. ✅ 15 Mermaid diagram annotations exist in YAML files (one per diagram)
10. ✅ 3 decision tree annotations exist (M01-4, M02-5, M04-5)
11. ✅ 2 chart annotations exist (M08-1, M09-2)
12. ✅ 1 recommendation quiz annotation exists (M08-2)
13. ✅ All 21 diagram annotations have `id`, `title`, and `alt` fields
14. ✅ Dark mode renders correctly for all diagram types (spot-check 3+)
15. ✅ No regression in Round 6 annotations (quizzes, self-explanations, accordions still work)
16. ✅ `_diagrams.css` provides responsive, accessible, themed diagram styling
17. ✅ DECISION_LOG.md updated with architectural decisions
18. ✅ CURRENT_CYCLE.md updated with Round 7 completion state
19. ✅ Blog post written documenting Round 7

---

## Begin Sequence

1. **Read project files** in the order specified in "Reading Order" above.
2. **Process AI_INBOX/** per project rules. Move this prompt to project root as `ROUND-7-TEAM-LEADER-PROMPT.md`.
3. **Run `node build/build.js && node build/verify.js`** to verify the baseline (14 files, 18/18 checks).
4. **Spawn Pipeline Engineer** with complete Phase 1 instructions. Wait for completion before spawning content authors.
5. **Verify Phase 1 output:** Run build + verify. Confirm new JS files exist, annotation injector handles `diagram` type, libraries copy to output. Test with a minimal Mermaid annotation in module-00.yaml (append a simple `graph TD` test diagram, verify it renders, then remove the test annotation).
6. **Spawn Mermaid Authors A and B, Interactive Engineer, CSS/QA Engineer, and Chronicler** simultaneously.
7. **Coordinate shared YAML files:** For M01, M02, M04 — Mermaid Author writes first, then Interactive Engineer appends.
8. **Monitor Phase 2** — verify builds and spot-check diagrams as they complete.
9. **Execute Phase 4** — full integration and verification.
10. **Verify all quality gates** (15 gates) and success criteria (19 items).
11. **Update CURRENT_CYCLE.md** with Round 7 completion state and Round 8 readiness.

Round 6 gave us interactive pedagogy. Now give the curriculum eyes.
