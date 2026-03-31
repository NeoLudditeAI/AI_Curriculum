# WS0: Component Library — Structural Specifications

**Workstream:** WS0 — Component Library
**Author:** Accessibility Lead
**Status:** Structural draft (pending Visual Strategist behavior/interaction additions)
**Last updated:** 2026-03-21
**Scope:** Component-level specs only. Page-level layout deferred to WS6.

---

## 2.1 Markdown-to-HTML Transformation Pipeline

### Build Tool and Architecture

The build pipeline transforms canonical markdown modules into interactive HTML while preserving markdown as the single source of truth. No pedagogical annotations or interactive elements are added to the markdown files themselves.

**Tool:** A Node.js build script (`build.js`) using the following layers:

| Layer | Responsibility | Tool/Library |
|-------|---------------|--------------|
| 1. Parse | Markdown AST generation | `unified` + `remark-parse` |
| 2. Transform | AST manipulation (glossary term detection, section ID injection, heading extraction) | Custom `remark` plugins |
| 3. Convert | AST to HTML | `remark-rehype` + `rehype-stringify` |
| 4. Annotate | Inject pedagogical elements from annotation files | Custom post-processor |
| 5. Template | Wrap in page shell with navigation, CSS, JS | Handlebars or EJS templates |
| 6. Bundle | Copy static assets, generate course map data | File copy + JSON generation |

### Pedagogical Element Injection

Pedagogical elements (quizzes, self-explanation prompts, worked examples, concept-check gates) are defined in **separate annotation files**, not inline in the markdown. This preserves the canonical markdown relationship and allows pedagogical design to evolve independently of content.

**Annotation file format:** One YAML file per module, co-located in a `build/annotations/` directory.

```
build/annotations/
  module-00.yaml
  module-01.yaml
  ...
  module-10.yaml
```

Each annotation file specifies insertions by section anchor:

```yaml
# build/annotations/module-02.yaml
module: 02
annotations:
  - after: "the-1m-token-convergence"    # section ID derived from heading
    component: quiz
    variant: concept-check
    data:
      question: "Which provider was first to remove long-context surcharges?"
      choices: ["Anthropic", "OpenAI", "Google", "Microsoft"]
      correct: 0
      explanation: "Anthropic removed surcharges on March 14, 2026 [F1]."

  - after: "what-a-million-tokens-actually-buys"
    component: self-explanation-prompt
    data:
      prompt: "Before reading on, explain why a 1M-token window does not mean you should always use 1M tokens."
      expert_answer: "Performance degrades non-linearly past ~70% capacity. Cost scales with input tokens. Most tasks benefit from focused, relevant context over maximum context."
```

### Regeneration Guarantee

Running `node build.js` at any time produces a complete, consistent HTML site from the current markdown modules plus current annotation files. No manual HTML editing is permitted. The build is idempotent and deterministic given the same inputs.

**Build outputs:**

```
deliverables/html/
  index.html              # Course map / landing page
  glossary.html           # Standalone glossary
  module-00.html          # One HTML file per module
  ...
  module-10.html
  assets/
    css/main.css
    js/components.js       # All component JS bundled
    js/navigation.js       # Navigation and progress tracking
    data/course-map.json   # Generated from CURRICULUM.md dependency graph
    data/glossary.json     # Generated from GLOSSARY.md
```

### Canonical Markdown Relationship

The markdown files in `modules/` are never modified by the build process. The relationship is strictly one-directional:

```
modules/*.md  ──┐
                ├──→  build.js  ──→  deliverables/html/
annotations/*.yaml ──┘
```

Content authors edit markdown. Pedagogical designers edit annotation files. The build merges them. If annotation references a section ID that no longer exists (due to content restructuring), the build emits a warning and skips that annotation rather than failing.

---

## 2.2 Reusable Component Specifications

All components follow these shared principles:

- **Semantic HTML first.** Every component uses the most meaningful HTML element for its purpose.
- **Progressive enhancement.** Components are usable (though less interactive) with JavaScript disabled. Critical-path content is never hidden behind JS.
- **WCAG 2.2 AA compliance.** Color contrast >= 4.5:1 for normal text, >= 3:1 for large text. All interactive elements keyboard-operable. ARIA attributes where native semantics are insufficient.
- **No color-only encoding.** Every use of color is paired with text labels, icons, or patterns.
- **Focus management.** Visible focus indicators on all interactive elements. Focus trapped within modals/overlays when open. Focus returned to trigger element on close.

### Component 1: Quiz Widget

**Purpose:** Retrieval practice at three granularities — quick concept checks within sections, section-end reviews, and module-end assessments. Evidence: retrieval practice is among the most potent strategies for retention; frequent low-stakes testing dramatically improves long-term retention (Dunlosky et al., 2013).

**Variants:**

| Variant | Trigger Point | Question Count | Feedback Depth |
|---------|--------------|----------------|----------------|
| `concept-check` | After a key concept (~every 800-1000 words) | 1-2 | Brief (1-2 sentences) |
| `section-review` | End of H2 section | 3-5 | Moderate (explanation + source reference) |
| `module-assessment` | End of module, before Key Takeaways | 8-12 | Full (explanation + cross-module links + "review this section" pointers) |

**HTML Structure:**

```html
<section class="quiz" data-variant="concept-check" role="region" aria-label="Concept check">
  <h4 class="quiz__heading">
    <span class="quiz__icon" aria-hidden="true"><!-- check icon --></span>
    Check Your Understanding
  </h4>
  <form class="quiz__form" novalidate>
    <fieldset class="quiz__question">
      <legend class="quiz__question-text">Which protocol does MCP use for transport?</legend>
      <div class="quiz__choices" role="radiogroup">
        <label class="quiz__choice">
          <input type="radio" name="q1" value="0" />
          <span class="quiz__choice-label">REST over HTTP</span>
        </label>
        <label class="quiz__choice">
          <input type="radio" name="q1" value="1" />
          <span class="quiz__choice-label">JSON-RPC 2.0</span>
        </label>
        <!-- additional choices -->
      </div>
    </fieldset>
    <button type="submit" class="quiz__submit">Check Answer</button>
  </form>
  <div class="quiz__feedback" role="status" aria-live="polite" hidden>
    <p class="quiz__feedback-text"></p>
    <p class="quiz__feedback-explanation"></p>
    <a class="quiz__feedback-link" href="">Review this section</a>
  </div>
</section>
```

**ARIA and Semantics:**
- `role="region"` with `aria-label` on the quiz container to announce its purpose.
- `role="radiogroup"` on the choices container for screen readers to group options.
- `aria-live="polite"` on the feedback region so screen readers announce results without interrupting.
- `fieldset`/`legend` used for each question to associate the question text with its choices.

**Keyboard Navigation:**
- `Tab` moves between questions, choices, and the submit button.
- Arrow keys navigate within a `radiogroup`.
- `Enter` or `Space` selects a radio choice.
- `Enter` on the submit button checks answers.
- After submission, focus moves to the feedback region.

**Screen Reader Behavior:**
- Question text is announced via `legend`.
- On submission, the `aria-live` region announces "Correct" or "Incorrect" followed by the explanation.
- For `module-assessment` variant, a summary ("You answered 7 of 10 correctly") is announced first.

**JavaScript Behavior:**
- Form submission is intercepted; no page reload.
- Correct/incorrect state applied via CSS classes (`.quiz__choice--correct`, `.quiz__choice--incorrect`) with both color AND icon indicators (checkmark / X).
- Feedback div is unhidden and populated.
- Quiz completion state saved to localStorage (see Section 2.5).
- `module-assessment` variant shows cumulative score and per-question review.

---

### Component 2: Progressive-Disclosure Accordion

**Purpose:** Manage cognitive load by segmenting optional detail behind expandable sections. Aligns with Mayer's segmentation principle and the expertise-reversal effect — novices see the streamlined path; experienced readers expand for depth.

**Variants:**

| Variant | Use Case | Default State | Visual Treatment |
|---------|----------|---------------|-----------------|
| `advanced-detail` | Deep technical content beyond core learning path | Collapsed | Labeled "Advanced Detail" with caret icon |
| `supplementary-reference` | Additional sources, related reading, historical context | Collapsed | Labeled "Supplementary" with bookmark icon |
| `worked-example` | Full worked examples that may overwhelm if always visible | Collapsed | Labeled "Worked Example" with code icon |

**HTML Structure:**

```html
<details class="accordion" data-variant="advanced-detail">
  <summary class="accordion__trigger">
    <span class="accordion__icon" aria-hidden="true"><!-- caret icon --></span>
    <span class="accordion__label">Advanced Detail</span>
    <span class="accordion__title">MCP OAuth 2.1 Token Exchange Flow</span>
  </summary>
  <div class="accordion__content">
    <!-- expanded content here -->
  </div>
</details>
```

**ARIA and Semantics:**
- Uses native `<details>`/`<summary>` elements, which provide built-in disclosure semantics. Screen readers announce "collapsed" / "expanded" state natively.
- No additional ARIA roles needed — native semantics are sufficient.
- The variant label ("Advanced Detail") precedes the title in the summary so screen readers announce the content type first.

**Keyboard Navigation:**
- `Tab` focuses the `<summary>` element.
- `Enter` or `Space` toggles open/closed.
- No focus trapping — content flows naturally after the summary.

**Screen Reader Behavior:**
- Announced as a disclosure widget with current state.
- Content within the expanded section is read in normal document order.

**Critical Design Rule:** Content on the critical learning path is NEVER placed inside an accordion. Only supplementary, advanced, or example content belongs here. This follows the anti-pattern rule: "Hidden content as default — critical path content always visible."

---

### Component 3: Comparison-Table Enhancer

**Purpose:** Enhance the 620+ table rows across all modules with filtering, sorting, and responsive scroll behavior. Tables are the dominant content pattern (M01: 107 rows, M08: 102 rows, M02: 91 rows).

**HTML Structure:**

The build pipeline wraps markdown-generated tables in an enhancer container:

```html
<div class="table-enhancer" data-columns="5" role="region" aria-label="Comparison: Core Capability Matrix">
  <div class="table-enhancer__controls">
    <label class="table-enhancer__filter-label">
      Filter:
      <input type="text" class="table-enhancer__filter"
             placeholder="Type to filter rows..."
             aria-describedby="filter-help-1" />
    </label>
    <span id="filter-help-1" class="sr-only">Filters table rows by matching text in any column</span>
    <div class="table-enhancer__sort-indicator" aria-live="polite"></div>
  </div>
  <div class="table-enhancer__scroll-container" tabindex="0" role="region" aria-label="Scrollable table">
    <table>
      <!-- original markdown-generated table markup -->
      <thead>
        <tr>
          <th scope="col" aria-sort="none">
            <button class="table-enhancer__sort-btn">
              Capability
              <span class="table-enhancer__sort-icon" aria-hidden="true"></span>
            </button>
          </th>
          <!-- additional column headers -->
        </tr>
      </thead>
      <tbody>
        <!-- table rows -->
      </tbody>
    </table>
  </div>
  <p class="table-enhancer__status" aria-live="polite">
    Showing <span class="table-enhancer__count">12</span> of 12 rows
  </p>
</div>
```

**ARIA and Semantics:**
- Wrapper `role="region"` with descriptive `aria-label` derived from the preceding heading or table caption.
- Column headers use `scope="col"` and `aria-sort` attribute (values: `none`, `ascending`, `descending`).
- Scroll container has `tabindex="0"` so keyboard users can scroll with arrow keys.
- Filter results count announced via `aria-live="polite"`.
- Sort state changes announced via the sort indicator `aria-live` region.

**Keyboard Navigation:**
- `Tab` moves to filter input, then sort buttons, then scroll container.
- `Enter` on a sort button toggles sort direction.
- Arrow keys scroll within the scroll container when focused.
- `Escape` clears the filter input.

**Screen Reader Behavior:**
- Filter changes announced: "Showing 5 of 12 rows."
- Sort changes announced: "Sorted by Capability, ascending."
- Table headers read with `scope="col"` for proper association.

**Responsive Behavior:**
- Tables wider than viewport get horizontal scroll within the container.
- A subtle gradient/shadow on the right edge indicates scrollable overflow.
- First column optionally "sticky" for tables with many columns (e.g., the 5-column capability matrices in M08).

---

### Component 4: Glossary Tooltip

**Purpose:** Surface definitions for the 83 glossary terms in context, at point of need. Implements the "first-use-per-module" highlighting pattern from the pedagogy research — terms are visually marked on their first occurrence in each module, then appear as normal text afterward.

**HTML Structure:**

```html
<!-- First use of term in module: styled and interactive -->
<span class="glossary-term glossary-term--first-use"
      data-term="context-window"
      tabindex="0"
      role="button"
      aria-describedby="glossary-tip-context-window">
  context window
</span>
<div class="glossary-tooltip"
     id="glossary-tip-context-window"
     role="tooltip"
     hidden>
  <p class="glossary-tooltip__definition">
    The maximum amount of text (measured in tokens) that a model can process
    in a single interaction. As of March 2026, ranges from 128K to 1M+ tokens.
  </p>
  <p class="glossary-tooltip__meta">
    First introduced: Module 01 | Related: Token, Compaction
  </p>
  <a class="glossary-tooltip__link" href="glossary.html#context-window">
    Full glossary entry
  </a>
</div>

<!-- Subsequent uses: no tooltip, no special styling -->
<span class="glossary-term" data-term="context-window">context window</span>
```

**ARIA and Semantics:**
- First-use terms have `role="button"` and `tabindex="0"` to indicate interactivity.
- The tooltip uses `role="tooltip"` and is linked via `aria-describedby`.
- Subsequent uses have no interactive role — they are purely semantic markers for the standalone glossary page's backreference system.

**Keyboard Navigation:**
- `Tab` focuses first-use glossary terms (they participate in tab order).
- `Enter` or `Space` opens the tooltip.
- `Escape` closes the tooltip.
- Focus remains on the term after closing.

**Screen Reader Behavior:**
- First-use: "context window, button. The maximum amount of text measured in tokens..."
- Subsequent uses: read as normal inline text (no announcement of glossary status).

**Term Detection (Build-Time):**
- The build script loads `data/glossary.json` (generated from GLOSSARY.md).
- For each module, it scans the HTML output for exact term matches (case-insensitive, word-boundary matching).
- The FIRST match of each term in a module gets the `glossary-term--first-use` class and associated tooltip markup.
- Subsequent matches get only the `glossary-term` class.
- Terms inside headings, code blocks, and table headers are excluded from detection to avoid disruptive tooltips in structural elements.

---

### Component 5: Concept-Check Gate

**Purpose:** Advisory checkpoint before advanced sections, prompting recall of prerequisite concepts. NOT a blocker — the learner is always free to proceed. Evidence: gates as self-checks improve outcomes without frustrating self-learners (pedagogy research, Section 1).

**HTML Structure:**

```html
<aside class="concept-gate" role="note" aria-label="Prerequisite check">
  <h4 class="concept-gate__heading">
    <span class="concept-gate__icon" aria-hidden="true"><!-- prerequisite icon --></span>
    Before You Continue
  </h4>
  <p class="concept-gate__description">
    The next section builds on these concepts. If any are unfamiliar,
    review the linked sections first.
  </p>
  <ul class="concept-gate__checklist">
    <li class="concept-gate__item">
      <label>
        <input type="checkbox" class="concept-gate__checkbox" />
        <span class="concept-gate__concept">
          I understand how context windows differ across providers
        </span>
      </label>
      <a class="concept-gate__review-link" href="module-01.html#context-windows">
        Review in Module 01
      </a>
    </li>
    <!-- additional checklist items -->
  </ul>
  <p class="concept-gate__continue">
    <a href="#next-section" class="concept-gate__proceed-link">
      Continue to next section
    </a>
  </p>
</aside>
```

**ARIA and Semantics:**
- `role="note"` marks this as supplementary advisory content.
- `aria-label="Prerequisite check"` identifies the region.
- Checkboxes are standard `<input type="checkbox">` with associated `<label>` elements.
- The continue link is a standard anchor, always visible regardless of checkbox state.

**Keyboard Navigation:**
- Standard checkbox interaction: `Tab` to focus, `Space` to toggle.
- Review links are standard anchors in tab order.
- The continue link is always reachable — no gating.

**Screen Reader Behavior:**
- Announced as "note, Prerequisite check."
- Each checklist item reads naturally: "checkbox, unchecked, I understand how context windows differ across providers."

**JavaScript Behavior:**
- Checkbox state persisted to localStorage.
- Visual feedback (subtle background color change + checkmark icon) on checked items.
- If all items checked, the gate visually collapses to a slim "Prerequisites reviewed" bar — but the continue link is accessible at all times regardless.
- No blocking, no modal, no forced interaction.

---

### Component 6: Worked-Example Fader

**Purpose:** Implements the worked-example effect with progressive fading. Full solutions for novices; partial scaffolding as learners build confidence; guided prompts for near-independence; independent problems as the final step. Evidence: worked examples with fading (full to partial to none) help novices build schemas and transition to independent problem-solving (Sweller et al.; pedagogy research, Section 2).

**Variants (sequential progression):**

| Stage | Label | What Is Shown | What Learner Does |
|-------|-------|---------------|-------------------|
| `full` | Worked Example | Complete solution with annotated reasoning | Study and trace the logic |
| `partial` | Completion Problem | Solution with key steps blanked | Fill in missing steps |
| `guided` | Guided Problem | Problem statement + hints available on request | Attempt with optional scaffolding |
| `independent` | Practice Problem | Problem statement only | Solve independently, then compare |

**HTML Structure (partial variant shown):**

```html
<div class="worked-example" data-stage="partial" role="region"
     aria-label="Completion problem: Choosing an orchestration pattern">
  <div class="worked-example__header">
    <span class="worked-example__stage-badge">Completion Problem</span>
    <span class="worked-example__stage-indicator" aria-label="Stage 2 of 4">
      <span class="worked-example__dot worked-example__dot--complete" aria-hidden="true"></span>
      <span class="worked-example__dot worked-example__dot--current" aria-hidden="true"></span>
      <span class="worked-example__dot" aria-hidden="true"></span>
      <span class="worked-example__dot" aria-hidden="true"></span>
    </span>
  </div>
  <div class="worked-example__problem">
    <p>A team needs three agents to research, write, and review a document.
    The research must complete before writing begins, but review can happen
    in parallel with a second research pass.</p>
  </div>
  <div class="worked-example__solution">
    <p><strong>Step 1:</strong> Identify the dependency graph...</p>
    <p><strong>Step 2:</strong>
      <span class="worked-example__blank" role="textbox"
            aria-label="Fill in step 2" contenteditable="true">
      </span>
    </p>
    <p><strong>Step 3:</strong> Select the orchestration pattern...</p>
    <p><strong>Step 4:</strong>
      <span class="worked-example__blank" role="textbox"
            aria-label="Fill in step 4" contenteditable="true">
      </span>
    </p>
  </div>
  <button class="worked-example__reveal" aria-expanded="false"
          aria-controls="we-answer-1">
    Reveal Complete Solution
  </button>
  <div class="worked-example__answer" id="we-answer-1" hidden>
    <!-- Full annotated solution -->
  </div>
</div>
```

**ARIA and Semantics:**
- `role="region"` with descriptive `aria-label` on the container.
- Blank fill-in areas use `role="textbox"` with `contenteditable="true"` and individual `aria-label` attributes.
- Stage indicator uses `aria-label="Stage 2 of 4"` for screen reader users; dots are `aria-hidden`.
- Reveal button uses `aria-expanded` and `aria-controls` for the disclosure pattern.

**Keyboard Navigation:**
- `Tab` moves through blanks and the reveal button.
- Blanks are editable text regions — standard text input behavior.
- `Enter` on the reveal button expands the answer.
- `Escape` on an expanded answer collapses it.

**Screen Reader Behavior:**
- Stage badge read as part of the region label context.
- "Stage 2 of 4" announced from the indicator's `aria-label`.
- Blanks announced as "Fill in step 2, textbox."
- Reveal button announces "Reveal Complete Solution, collapsed" or "expanded."

---

### Component 7: Self-Explanation Prompt

**Purpose:** Prompts learners to articulate understanding before seeing an expert answer. Implements Chi's self-explanation principle and the elaboration effect. Evidence: self-explaining key points boosts understanding; comparing one's answer to an expert model fosters learning (pedagogy research, Section 7).

**HTML Structure:**

```html
<div class="self-explain" role="region" aria-label="Self-explanation exercise">
  <h4 class="self-explain__heading">
    <span class="self-explain__icon" aria-hidden="true"><!-- thought icon --></span>
    Explain It Yourself
  </h4>
  <p class="self-explain__prompt">
    Why does prompt caching provide a larger discount on Anthropic's platform
    (90%) compared to OpenAI's (50%)? Consider the architectural differences.
  </p>
  <div class="self-explain__input-area">
    <label for="se-response-1" class="sr-only">Your explanation</label>
    <textarea id="se-response-1" class="self-explain__textarea"
              rows="4"
              placeholder="Write your explanation here..."></textarea>
  </div>
  <button class="self-explain__reveal"
          aria-expanded="false"
          aria-controls="se-expert-1"
          disabled>
    Compare with Expert Answer
  </button>
  <p class="self-explain__hint">Write at least a few sentences to enable comparison.</p>
  <div class="self-explain__expert" id="se-expert-1" hidden>
    <h5 class="self-explain__expert-heading">Expert Answer</h5>
    <p>Anthropic designed prompt caching as an explicit, opt-in feature with
    three cache duration tiers (5-minute, 1-hour, persistent), giving developers
    fine-grained control. This architectural investment justifies the deeper
    discount. OpenAI's caching is automatic and transparent — simpler to use
    but with less optimization surface, hence the smaller discount.</p>
  </div>
</div>
```

**ARIA and Semantics:**
- `role="region"` with descriptive `aria-label`.
- `<textarea>` has an associated `<label>` (visually hidden via `sr-only`).
- Reveal button uses `aria-expanded` / `aria-controls` disclosure pattern.
- Button starts `disabled` until the textarea has substantive content (minimum character threshold).

**Keyboard Navigation:**
- `Tab` moves from prompt text to textarea to reveal button.
- Standard text editing in the textarea.
- `Enter` on the reveal button shows the expert answer.

**Screen Reader Behavior:**
- Region announced with label.
- Prompt text read in normal flow.
- Textarea announced with its label.
- Button announces disabled state and changes to enabled when content threshold met.
- Expert answer region announced on expansion.

**JavaScript Behavior:**
- Reveal button enables after the textarea contains >= 50 characters (heuristic for substantive attempt).
- Learner's response saved to localStorage for session continuity.
- After reveal, both the learner's response and the expert answer are visible side by side for comparison.
- No scoring or grading — this is a reflective exercise.

---

### Component 8: Progress Tracker

**Purpose:** Provides a persistent sense of advancement through the curriculum. Tracks section completion (scroll-based + quiz completion) and quiz scores. Stored entirely in localStorage. Evidence: progress indicators motivate by providing clear goals (goal-setting theory), but must frame progress as mastery, not just completion (pedagogy research, Section 3).

**HTML Structure:**

```html
<!-- Module-level progress bar (appears in module header) -->
<div class="progress-tracker" role="progressbar"
     aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"
     aria-label="Module 02 progress: 35% complete">
  <div class="progress-tracker__bar">
    <div class="progress-tracker__fill" style="width: 35%"></div>
  </div>
  <span class="progress-tracker__label">
    35% — 4 of 11 sections explored
  </span>
</div>

<!-- Section-level checkmarks (in sidebar TOC) -->
<nav class="progress-tracker__sections" aria-label="Section progress">
  <ul>
    <li class="progress-tracker__section progress-tracker__section--complete">
      <span class="progress-tracker__check" aria-hidden="true"><!-- check icon --></span>
      <a href="#the-1m-token-convergence">The 1M-Token Convergence</a>
      <span class="sr-only">(completed)</span>
    </li>
    <li class="progress-tracker__section progress-tracker__section--current">
      <span class="progress-tracker__dot" aria-hidden="true"><!-- current dot --></span>
      <a href="#prompt-caching" aria-current="true">Prompt Caching</a>
      <span class="sr-only">(current section)</span>
    </li>
    <li class="progress-tracker__section">
      <a href="#memory-systems">Memory Systems</a>
    </li>
  </ul>
</nav>

<!-- Course-level progress (appears on course map page) -->
<div class="progress-tracker__course" role="region" aria-label="Course progress">
  <p class="progress-tracker__summary">
    <strong>4 of 11 modules started</strong> | 2 completed | 12 quizzes passed
  </p>
  <!-- Per-module indicators rendered here -->
</div>
```

**ARIA and Semantics:**
- Module progress bar uses `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`.
- `aria-label` provides a human-readable progress description.
- Section list uses standard `<nav>` with `aria-label`.
- Completed sections marked with `sr-only` "(completed)" text.
- Current section uses `aria-current="true"`.

**Keyboard Navigation:**
- Section links are standard anchors in tab order.
- Progress bar is not interactive — purely informational.

**Screen Reader Behavior:**
- Progress bar announced: "Module 02 progress: 35% complete, progressbar."
- Section list announced as navigation with completion status per item.

**JavaScript Behavior:**
- Section "completion" detected via Intersection Observer: a section is marked complete when the user has scrolled through >= 80% of it AND spent >= 10 seconds (heuristic to prevent speed-scrolling from counting).
- Quiz completion counts toward section progress.
- All state stored in localStorage (see Section 2.5).
- Progress framed as "sections explored" rather than "pages read" to emphasize engagement over completion.

---

### Component 9: Navigation Controls

**Purpose:** Provide consistent, accessible navigation across the curriculum at multiple levels: inter-module (course-level), intra-module (section-level), and contextual (breadcrumbs, prev/next).

**HTML Structure:**

```html
<!-- Sidebar TOC (intra-module navigation) -->
<nav class="nav-sidebar" aria-label="Module contents">
  <div class="nav-sidebar__header">
    <span class="nav-sidebar__module-label">Module 02</span>
    <h3 class="nav-sidebar__module-title">Context Engineering</h3>
    <button class="nav-sidebar__toggle" aria-expanded="true"
            aria-controls="nav-sidebar-list"
            aria-label="Toggle table of contents">
      <span aria-hidden="true"><!-- collapse icon --></span>
    </button>
  </div>
  <ul id="nav-sidebar-list" class="nav-sidebar__list">
    <li><a href="#executive-summary">Executive Summary</a></li>
    <li>
      <a href="#context-windows">Context Windows: Sizes, Pricing, and Practical Limits</a>
      <ul class="nav-sidebar__sublist">
        <li><a href="#the-1m-token-convergence">The 1M-Token Convergence</a></li>
        <li><a href="#what-a-million-tokens-actually-buys">What a Million Tokens Actually Buys</a></li>
      </ul>
    </li>
    <!-- additional sections -->
  </ul>
</nav>

<!-- Breadcrumbs (contextual location) -->
<nav class="breadcrumbs" aria-label="Breadcrumb">
  <ol class="breadcrumbs__list">
    <li class="breadcrumbs__item">
      <a href="index.html">Course Map</a>
    </li>
    <li class="breadcrumbs__item">
      <a href="index.html#part-1">Part 1: Foundations</a>
    </li>
    <li class="breadcrumbs__item" aria-current="page">
      Module 02: Context Engineering
    </li>
  </ol>
</nav>

<!-- Prev/Next (inter-module sequential navigation) -->
<nav class="nav-sequential" aria-label="Module navigation">
  <a class="nav-sequential__prev" href="module-01.html">
    <span class="nav-sequential__direction">Previous</span>
    <span class="nav-sequential__title">Module 01: Models & Intelligence Tiers</span>
  </a>
  <a class="nav-sequential__next" href="module-03.html">
    <span class="nav-sequential__direction">Next</span>
    <span class="nav-sequential__title">Module 03: Single-Agent Systems</span>
  </a>
</nav>

<!-- Scroll progress indicator (visual only) -->
<div class="scroll-indicator" role="presentation" aria-hidden="true">
  <div class="scroll-indicator__fill"></div>
</div>
```

**ARIA and Semantics:**
- Each `<nav>` has a unique `aria-label` to distinguish between multiple navigation landmarks.
- Breadcrumbs use `<ol>` (ordered list) with `aria-current="page"` on the current item.
- Scroll indicator is `aria-hidden="true"` and `role="presentation"` — it is a visual affordance only, not communicated to assistive technology.
- Sidebar toggle uses `aria-expanded` and `aria-controls`.

**Keyboard Navigation:**
- All navigation links are in standard tab order.
- Sidebar toggle: `Enter` or `Space` to collapse/expand.
- Keyboard shortcut support (announced via a "Keyboard shortcuts" help dialog):
  - `Alt+Left` / `Alt+Right`: previous / next module.
  - `Alt+Up`: course map.
  - `Alt+T`: toggle sidebar.

**Screen Reader Behavior:**
- Multiple `<nav>` landmarks differentiated by `aria-label`: "Module contents," "Breadcrumb," "Module navigation."
- Current page announced in breadcrumbs.
- Sidebar collapse state announced.

---

## 2.3 Navigation System

### Inter-Module Navigation

**Course map page** (`index.html`): The primary entry point and advance organizer. Displays all 11 modules organized into four parts (based on the dependency graph from CURRICULUM.md):

| Part | Modules | Theme |
|------|---------|-------|
| Part 1: Foundations | M00, M01 | Who, what, how smart |
| Part 2: Core Mechanics | M02, M03, M06 | How they remember, act, connect |
| Part 3: Systems & Ecosystems | M04, M05, M07, M08, M09 | How they coordinate, compare, build |
| Part 4: Horizons | M10 | Where it is going |

The course map renders as a visual node graph (specified in WS4 by the Visual Strategist) with:
- Nodes for each module (clickable, linked to module HTML).
- Edges showing prerequisite relationships.
- Visual grouping by Part.
- Per-module progress indicators (from localStorage).
- Hover/focus summaries showing the module's executive summary.

**Sequential navigation:** Every module page has prev/next links (Component 9) following the recommended reading order: M00 -> M01 -> M02 -> M03 -> M06 -> M04 -> M05 -> M07 -> M08 -> M09 -> M10. This order respects dependencies while allowing linear traversal.

### Intra-Module Navigation

**Sidebar TOC** (Component 9): Always present on module pages. Shows H2 and H3 headings with nesting. Highlights current section via Intersection Observer. Collapsible on narrow viewports.

**In-page anchor links:** Every H2 and H3 heading gets a stable `id` (slugified from heading text). These anchors are used by:
- Sidebar TOC links.
- Cross-module references.
- Annotation file section references.
- Concept-check gate review links.

### Breadcrumbs

Always visible at the top of every page. Three levels: Course Map > Part > Module. Provides instant orientation and a path back to the course map.

### Keyboard Navigation Patterns

| Key Combo | Action | Scope |
|-----------|--------|-------|
| `Tab` / `Shift+Tab` | Standard focus traversal | Global |
| `Alt+Left` | Previous module | Inter-module |
| `Alt+Right` | Next module | Inter-module |
| `Alt+Up` | Course map | Inter-module |
| `Alt+T` | Toggle sidebar TOC | Intra-module |
| `Escape` | Close tooltip / collapse expanded element | Component |
| `/` | Focus search / filter (if present on page) | Page |

A keyboard shortcuts reference is accessible via a `?` key press, rendered as a modal dialog (`role="dialog"`, `aria-modal="true"`) with focus trapping.

---

## 2.4 Glossary Integration Pattern

### Term Detection Pipeline (Build-Time)

1. **Source:** `GLOSSARY.md` is parsed into `data/glossary.json` during the build. Each entry contains: `id` (slugified term), `term`, `definition`, `firstIntroduced`, `relatedTerms[]`.

2. **Matching:** For each module's generated HTML, the build script:
   - Tokenizes visible text content (excluding `<code>`, `<pre>`, `<h1>`-`<h6>`, `<th>`, and elements with `data-no-glossary`).
   - For each glossary term, finds all word-boundary matches (case-insensitive).
   - Marks the FIRST match as `glossary-term--first-use` with tooltip markup.
   - Marks subsequent matches as `glossary-term` (semantic only, no interaction).

3. **Disambiguation:** Multi-word terms are matched before single-word terms (e.g., "context window" matched before "context" alone). If a shorter term is a substring of a longer glossary term, only the longer match applies.

### First-Use Styling

First-use terms receive:
- A subtle dotted underline (not solid, to distinguish from links).
- A small superscript indicator icon (aria-hidden).
- The `glossary-term--first-use` class, which enables the tooltip interaction.

Subsequent uses receive:
- No visual distinction in the default view.
- The `glossary-term` data attribute, enabling the standalone glossary page to show "Used in: Module 02 (5 occurrences)."

### Tooltip Interaction

- **Desktop:** Hover OR focus triggers tooltip display after a 300ms delay (prevents flicker on casual mouse movement). Tooltip remains visible while the term or tooltip itself is hovered/focused.
- **Touch:** Tap to toggle tooltip visibility.
- **Dismiss:** Click/tap outside, `Escape` key, or moving focus away.
- **Position:** Tooltip appears above the term by default; flips below if insufficient viewport space above. Horizontally centered on the term, constrained to viewport edges.

### Standalone Glossary Page

`glossary.html` renders all 83 terms in a searchable, filterable list:

- Grouped by domain (matching GLOSSARY.md's groupings: Models & Intelligence, Context Engineering, Agents, Protocols & Integration, Platforms & Products).
- Each entry shows: term, definition, first introduced module (linked), related terms (linked to their entries).
- A search/filter input at the top narrows visible entries.
- Each entry has an anchor ID for deep linking from module tooltips.
- A "back-references" section per term lists which modules use the term and how many times.

### Related Terms

When a tooltip is displayed, related terms (from GLOSSARY.md's "Related Terms" column) are shown as clickable links within the tooltip. Clicking a related term:
- If on the glossary page: scrolls to and highlights that term's entry.
- If on a module page: navigates to `glossary.html#term-id`.

---

## 2.5 localStorage Schema

All client-side state is stored under a single namespaced key prefix to avoid conflicts and enable schema versioning.

### Schema

```json
{
  "afc": {
    "_version": 1,
    "_lastAccess": "2026-03-21T14:30:00Z",

    "progress": {
      "modules": {
        "00": {
          "started": "2026-03-21T10:00:00Z",
          "lastVisited": "2026-03-21T10:45:00Z",
          "sectionsComplete": ["executive-summary", "market-structure", "four-ecosystems"],
          "sectionsTotal": 11,
          "quizzesPassed": 2,
          "quizzesTotal": 4
        }
      },
      "course": {
        "modulesStarted": ["00", "01", "02"],
        "modulesComplete": ["00"],
        "totalQuizzesPassed": 8,
        "totalQuizzesAvailable": 44
      }
    },

    "quizzes": {
      "m02-concept-check-1": {
        "answered": true,
        "correct": true,
        "selectedChoice": 0,
        "timestamp": "2026-03-21T10:15:00Z"
      }
    },

    "conceptGates": {
      "m04-prerequisite-1": {
        "items": [true, true, false],
        "timestamp": "2026-03-21T11:00:00Z"
      }
    },

    "selfExplanations": {
      "m02-se-1": {
        "response": "Anthropic designed caching as opt-in with three tiers...",
        "revealed": true,
        "timestamp": "2026-03-21T10:20:00Z"
      }
    },

    "workedExamples": {
      "m04-we-1": {
        "stage": "partial",
        "blanks": {"step2": "Identify parallel branches...", "step4": ""},
        "solutionRevealed": false,
        "timestamp": "2026-03-21T11:30:00Z"
      }
    },

    "preferences": {
      "sidebarCollapsed": false,
      "reducedMotion": false,
      "fontSize": "default"
    },

    "session": {
      "lastModule": "02",
      "lastSection": "prompt-caching",
      "scrollPosition": 2450
    }
  }
}
```

### Key Design Decisions

**Namespace prefix:** All data stored under the `afc` key (AI Frontier Curriculum). This prevents collisions with other localStorage data on the same origin.

**Schema versioning:** The `_version` field enables future migrations. If the code detects a stored version lower than the current expected version, it runs a migration function before reading data. Version 1 is the initial schema.

**Granularity:** Quiz and self-explanation data stored at the individual item level, keyed by `{module}-{component}-{number}`. Progress data aggregated at module and course levels.

**Session resume:** On page load, if `session.lastModule` matches the current module, the page offers to scroll to `session.lastSection`. If a different module, the course map highlights the last-visited module. The scroll position is saved on `beforeunload`.

**Size budget:** Estimated maximum localStorage usage for a complete curriculum traversal: ~50KB (well within the 5MB browser limit). Quiz responses are the largest contributor; even with all 44 quizzes answered and all self-explanation responses saved, total stays under 100KB.

**No PII:** The localStorage schema contains no personally identifiable information. No names, emails, or tracking IDs. This is a local-only, privacy-respecting progress system.

**Expiry:** No automatic expiry. Data persists until the user clears browser storage. A "Reset Progress" button on the course map page clears the `afc` namespace after a confirmation dialog.

### Read/Write API

Components interact with localStorage through a thin wrapper module (`storage.js`) that handles:

- JSON serialization/deserialization.
- Schema version checking and migration.
- Default values for missing keys.
- Graceful degradation if localStorage is unavailable (private browsing, storage full). Components fall back to in-memory state for the current session.

```
// Pseudocode API
storage.get('quizzes.m02-concept-check-1')     // Returns quiz data or null
storage.set('quizzes.m02-concept-check-1', {…}) // Writes quiz data
storage.getProgress('02')                        // Returns module progress
storage.updateProgress('02', {…})                // Merges progress update
storage.getPreferences()                         // Returns preferences
storage.resetAll()                               // Clears afc namespace
```

---

## Appendix: Content Pattern Audit

Analysis of all 11 modules to inform component placement and frequency:

| Module | Table Rows | Heading Sections (H2+H3) | Code Blocks | Estimated Quiz Placement Points |
|--------|-----------|--------------------------|-------------|-------------------------------|
| M00 | 45 | 33 | 0 | 3-4 concept checks, 1 section review, 1 module assessment |
| M01 | 107 | 41 | 0 | 4-5 concept checks, 2 section reviews, 1 module assessment |
| M02 | 91 | 40 | 0 | 4-5 concept checks, 2 section reviews, 1 module assessment |
| M03 | 12 | 35 | 0 | 3-4 concept checks, 1 section review, 1 module assessment |
| M04 | 43 | 34 | 0 | 3-4 concept checks, 1 section review, 1 module assessment |
| M05 | 40 | 27 | 0 | 3-4 concept checks, 1 section review, 1 module assessment |
| M06 | 58 | 40 | 4 | 4-5 concept checks, 2 section reviews, 1 module assessment |
| M07 | 22 | 28 | 0 | 3-4 concept checks, 1 section review, 1 module assessment |
| M08 | 102 | 29 | 0 | 4-5 concept checks, 2 section reviews, 1 module assessment |
| M09 | 71 | 22 | 0 | 3-4 concept checks, 1 section review, 1 module assessment |
| M10 | 29 | 35 | 0 | 3-4 concept checks, 1 section review, 1 module assessment |
| **Total** | **620** | **364** | **4** | **~44 quizzes across all modules** |

**Key observations for component design:**
- Tables are the dominant content pattern. The comparison-table enhancer (Component 3) will be the most frequently instantiated component.
- Only M06 has code blocks (MCP JSON-RPC examples). Code highlighting is needed but not a priority component.
- All 11 modules follow the standard skeleton: metadata, executive summary, prerequisites, body (H2/H3), key takeaways, cross-references, sources. The build pipeline can reliably inject components at structural boundaries.
- Cross-module markdown links are sparse (only 1 detected). The build pipeline should generate richer inter-module linking from the cross-references sections and annotation files.

---

---

# Visual Strategist Additions: Behavior, Interaction, and Design System

**Author:** Visual Strategist
**Date:** 2026-03-21
**Scope:** Component interaction behavior, state transitions, animation timing, visual design tokens, responsive breakpoints, CSS class architecture. These additions complement (never override) the Accessibility Lead's structural specifications above.

---

## 3.1 Design Tokens

Design tokens are the atomic visual values shared across all components. They are defined as CSS custom properties on `:root` and consumed by all component styles. This ensures visual consistency while enabling future theming.

### Color System

All colors serve a semantic purpose. No decorative color. Every color pairing meets WCAG 2.2 AA contrast (4.5:1 for normal text, 3:1 for large text and UI components).

```css
:root {
  /* --- Surface colors --- */
  --color-surface-primary: #ffffff;          /* Page background */
  --color-surface-secondary: #f8f9fa;        /* Cards, component backgrounds */
  --color-surface-tertiary: #eef0f2;         /* Nested surfaces, hover states */
  --color-surface-inverse: #1a1d21;          /* Dark surfaces (footer, overlays) */

  /* --- Text colors --- */
  --color-text-primary: #1a1d21;             /* Body text. Contrast on white: 16.1:1 */
  --color-text-secondary: #4a5060;           /* Secondary text. Contrast on white: 7.2:1 */
  --color-text-tertiary: #6b7280;            /* Hints, placeholders. Contrast on white: 4.6:1 */
  --color-text-inverse: #f8f9fa;             /* Text on dark surfaces. Contrast on inverse: 15.3:1 */
  --color-text-link: #1a56db;               /* Link text. Contrast on white: 7.8:1 */
  --color-text-link-visited: #5b21b6;       /* Visited links. Contrast on white: 8.1:1 */

  /* --- Platform identity colors (used in comparison visuals) --- */
  /* Each platform color has a text-safe variant (on white) and a background variant (light tint) */
  --color-platform-anthropic: #d97706;       /* Amber. Contrast on white: 3.5:1 (large text/icons only) */
  --color-platform-anthropic-bg: #fef3c7;    /* Amber tint for backgrounds */
  --color-platform-anthropic-text: #92400e;  /* Darker amber for text. Contrast on white: 5.6:1 */
  --color-platform-openai: #059669;          /* Emerald. Contrast on white: 3.3:1 (large text/icons only) */
  --color-platform-openai-bg: #d1fae5;
  --color-platform-openai-text: #065f46;     /* Contrast on white: 7.1:1 */
  --color-platform-google: #2563eb;          /* Blue. Contrast on white: 4.6:1 */
  --color-platform-google-bg: #dbeafe;
  --color-platform-google-text: #1e40af;     /* Contrast on white: 7.3:1 */
  --color-platform-microsoft: #7c3aed;       /* Violet. Contrast on white: 4.5:1 */
  --color-platform-microsoft-bg: #ede9fe;
  --color-platform-microsoft-text: #5b21b6;  /* Contrast on white: 8.1:1 */
  --color-platform-opensource: #dc2626;       /* Red. Contrast on white: 4.6:1 */
  --color-platform-opensource-bg: #fee2e2;
  --color-platform-opensource-text: #991b1b;  /* Contrast on white: 7.8:1 */

  /* --- IMPORTANT: Platform colors are ALWAYS paired with text labels or icons.
     Never color-only encoding. The --platform-*-text variants are for text;
     the base variants are for borders, icons, and large decorative elements. --- */

  /* --- Semantic feedback colors --- */
  --color-feedback-correct: #059669;         /* Green for correct answers */
  --color-feedback-correct-bg: #d1fae5;
  --color-feedback-incorrect: #dc2626;       /* Red for incorrect answers */
  --color-feedback-incorrect-bg: #fee2e2;
  --color-feedback-info: #2563eb;            /* Blue for informational */
  --color-feedback-info-bg: #dbeafe;
  --color-feedback-warning: #d97706;         /* Amber for warnings / volatility */
  --color-feedback-warning-bg: #fef3c7;

  /* --- Focus indicator --- */
  --color-focus-ring: #2563eb;               /* Visible focus outline */
  --focus-ring-width: 3px;
  --focus-ring-offset: 2px;
  --focus-ring-style: var(--focus-ring-width) solid var(--color-focus-ring);
}
```

**Non-color encoding guarantee:** Every use of platform identity colors is accompanied by:
- A text label identifying the platform by name, OR
- An icon with `aria-label`, OR
- A pattern fill (stripe, dots, crosshatch) differentiating the entity in charts/diagrams.

The five platform patterns for use in charts and diagrams (alongside color):
- Anthropic: solid fill
- OpenAI: diagonal stripe (45deg, 4px)
- Google: horizontal stripe (0deg, 4px)
- Microsoft: dot pattern (4px dot, 8px spacing)
- Open Source: crosshatch (45deg + 135deg, 4px)

### Typography Scale

```css
:root {
  /* --- Font families --- */
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  --font-heading: var(--font-body);          /* Same family, differentiated by weight */
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;

  /* --- Size scale (base: 18px for body on desktop) --- */
  --text-xs: 0.75rem;    /* 13.5px — footnotes, metadata */
  --text-sm: 0.875rem;   /* 15.75px — captions, helper text */
  --text-base: 1rem;     /* 18px — body text */
  --text-lg: 1.125rem;   /* 20.25px — lead paragraphs */
  --text-xl: 1.25rem;    /* 22.5px — H4 */
  --text-2xl: 1.5rem;    /* 27px — H3 */
  --text-3xl: 1.875rem;  /* 33.75px — H2 */
  --text-4xl: 2.25rem;   /* 40.5px — H1 / module title */

  /* --- Line heights --- */
  --leading-tight: 1.25;   /* Headings */
  --leading-normal: 1.6;   /* Body text (optimized for 50-75 char line length) */
  --leading-relaxed: 1.75;  /* Long-form reading, component content */

  /* --- Font weights --- */
  --weight-normal: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;
}
```

**Line length:** Body text containers are `max-width: 70ch` (~630px at 18px base) to maintain the 50-75 character optimal reading range cited in pedagogy research Section 8. Tables and diagrams may exceed this width within their scroll containers.

### Spacing Scale

```css
:root {
  --space-1: 0.25rem;   /* 4px — tight internal padding */
  --space-2: 0.5rem;    /* 8px — small gaps */
  --space-3: 0.75rem;   /* 12px — inline spacing */
  --space-4: 1rem;      /* 16px — standard padding */
  --space-6: 1.5rem;    /* 24px — section spacing */
  --space-8: 2rem;      /* 32px — component separation */
  --space-12: 3rem;     /* 48px — major section breaks */
  --space-16: 4rem;     /* 64px — module-level spacing */
}
```

### Elevation (Shadows)

```css
:root {
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
  --shadow-tooltip: 0 4px 12px rgba(0, 0, 0, 0.15);
}
```

### Border Radii

```css
:root {
  --radius-sm: 4px;     /* Buttons, inputs, small cards */
  --radius-md: 8px;     /* Component containers, panels */
  --radius-lg: 12px;    /* Large cards, modal dialogs */
  --radius-full: 9999px; /* Pills, circular indicators */
}
```

---

## 3.2 Motion and Transition System

All motion respects `prefers-reduced-motion`. When the user or OS has reduced motion enabled, all transitions resolve instantly (duration: 0ms) and all animations are suppressed.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Timing Tokens

```css
:root {
  --duration-instant: 100ms;   /* Hover feedback, focus rings */
  --duration-fast: 150ms;      /* Button state changes, icon rotations */
  --duration-normal: 250ms;    /* Accordion expand/collapse, panel transitions */
  --duration-slow: 400ms;      /* Content fade-in, large layout shifts */
  --duration-tooltip-delay: 300ms; /* Hover intent delay before tooltip shows */

  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);  /* Material "standard" curve */
  --ease-enter: cubic-bezier(0, 0, 0.2, 1);       /* Elements entering view */
  --ease-exit: cubic-bezier(0.4, 0, 1, 1);        /* Elements leaving view */
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1); /* Subtle overshoot for emphasis */
}
```

### Transition Catalog

Every animated property in the system is listed here. No ad-hoc transitions. Every motion serves a purpose: communicating state change, directing attention, or maintaining spatial context.

| Component | Property | Duration | Easing | Trigger | Purpose |
|-----------|----------|----------|--------|---------|---------|
| All focusable | `outline`, `box-shadow` | `--duration-instant` | `--ease-default` | Focus | Show focus ring |
| Accordion | `height`, `opacity` of content | `--duration-normal` | `--ease-default` | Toggle | Expand/collapse |
| Accordion | `transform: rotate` on caret icon | `--duration-fast` | `--ease-default` | Toggle | Indicate open/closed |
| Quiz feedback | `opacity`, `max-height` | `--duration-normal` | `--ease-enter` | Submit | Reveal feedback |
| Quiz choice | `background-color`, `border-color` | `--duration-fast` | `--ease-default` | Correct/incorrect | Feedback state |
| Glossary tooltip | `opacity`, `transform: translateY(4px)` | `--duration-fast` | `--ease-enter` | Hover/focus | Appear/disappear |
| Table filter | `opacity` of filtered rows | `--duration-fast` | `--ease-exit` | Filter input | Rows fade out/in |
| Progress bar fill | `width` | `--duration-slow` | `--ease-default` | Section complete | Grow to new value |
| Progress checkmark | `opacity`, `transform: scale` | `--duration-fast` | `--ease-bounce` | Section complete | Pop-in effect |
| Self-explain reveal | `opacity`, `max-height` | `--duration-normal` | `--ease-enter` | Button click | Reveal expert answer |
| Worked-example answer | `opacity`, `max-height` | `--duration-normal` | `--ease-enter` | Button click | Reveal solution |
| Concept-gate collapse | `height`, `opacity` | `--duration-normal` | `--ease-default` | All checked | Collapse to slim bar |
| Scroll indicator | `width` | `0ms` (real-time) | linear | Scroll | Track position |
| Sidebar highlight | `background-color` | `--duration-fast` | `--ease-default` | Scroll position | Show current section |
| Nav sidebar | `width`, `opacity` | `--duration-normal` | `--ease-default` | Toggle button | Collapse/expand |

---

## 3.3 Responsive Breakpoints

```css
:root {
  --bp-sm: 640px;    /* Small phones in landscape, large phones in portrait */
  --bp-md: 768px;    /* Tablets in portrait */
  --bp-lg: 1024px;   /* Tablets in landscape, small laptops */
  --bp-xl: 1280px;   /* Standard desktop */
  --bp-2xl: 1536px;  /* Wide desktop */
}
```

### Layout Behavior by Breakpoint

| Breakpoint | Sidebar | Body Width | Table Behavior | Component Layout |
|------------|---------|------------|----------------|-----------------|
| < `--bp-md` (mobile) | Hidden; hamburger toggle | Full width, 16px horizontal padding | Horizontal scroll; 1st column sticky | Components stack vertically; full width |
| `--bp-md` to `--bp-lg` (tablet) | Collapsible overlay; hidden by default | Max 70ch, centered | Horizontal scroll on wide tables | Components at full body width |
| `--bp-lg` to `--bp-xl` (laptop) | Persistent, 240px fixed width | Max 70ch, offset right of sidebar | Most tables fit; widest ones scroll | Components at body width |
| >= `--bp-xl` (desktop) | Persistent, 260px fixed width | Max 70ch, centered in remaining space | All tables fit (1280 - 260 sidebar = 1020px content) | Components at body width |

### Component-Specific Responsive Behavior

**Quiz widget:**
- Mobile: Choices stack vertically (one per line). Submit button full-width.
- Desktop: Choices may render in a 2-column grid if 4+ options exist and text is short enough.

**Comparison table enhancer:**
- Mobile: Filter input collapses under a "Filter" button to save vertical space. Horizontal scroll with shadow indicator. First column sticky if table has > 3 columns.
- Desktop: Filter input always visible above table. Sort buttons on column headers.

**Glossary tooltip:**
- Mobile: Tooltip renders as a bottom-sheet overlay (slides up from bottom, max 40vh height) rather than a floating tooltip. Dismissed by tapping outside or swipe-down.
- Desktop: Standard floating tooltip positioned above/below the term.

**Nav sidebar:**
- Mobile: Full-screen overlay triggered by hamburger button. Background dimmed. Focus trapped within sidebar when open.
- Tablet: Overlay that slides in from left, partially covering content. Background dimmed.
- Desktop: Persistent panel to the left of content.

**Progress tracker:**
- Mobile: Compact horizontal bar only (no section list). Section list accessible via sidebar.
- Desktop: Bar + section list in sidebar with checkmarks.

**Worked-example fader:**
- Mobile: Stage indicator dots stack horizontally above the problem. Blanks expand to full width.
- Desktop: Stage indicator aligned right of the header badge.

---

## 3.4 Component Behavior Specifications

These specifications add state machines, event handling, error states, and detailed interaction behavior to each component defined by the Accessibility Lead in Section 2.2. They are organized to match the component numbering above.

### Component 1: Quiz Widget — Behavior

#### State Machine

```
UNANSWERED ──(select choice)──→ SELECTED ──(submit)──→ EVALUATING ──→ CORRECT
                                                                   └──→ INCORRECT ──(retry, if allowed)──→ UNANSWERED
```

| State | Visual | Aria Announcement | Stored |
|-------|--------|-------------------|--------|
| `UNANSWERED` | Default appearance. Submit button disabled (or absent if no choice selected). | — | — |
| `SELECTED` | Selected radio shows filled indicator. Submit button enabled. | "Choice selected: [choice text]" | — |
| `EVALUATING` | Brief (100ms) delay with submit button showing spinner. Prevents double-submit. | — | — |
| `CORRECT` | Correct choice: green left border + checkmark icon. Feedback area revealed with explanation. Submit button changes to "Continue" (scrolls to next content). | "Correct. [explanation]" via `aria-live` | `{ answered: true, correct: true, selectedChoice: n }` |
| `INCORRECT` | Selected choice: red left border + X icon. Correct choice: green left border + checkmark (revealed). Feedback area revealed. | "Incorrect. The correct answer is [correct choice]. [explanation]" via `aria-live` | `{ answered: true, correct: false, selectedChoice: n }` |

#### Variant-Specific Behavior

**`concept-check` (1-2 questions):**
- No retry. Once answered, result is final (but not punitive -- the learner can proceed regardless).
- After answering, the quiz visually collapses to a slim result bar: "[check icon] Correct" or "[X icon] Incorrect — [one-line explanation]." Click to re-expand.
- Collapse transition: `--duration-normal`, `--ease-default`.

**`section-review` (3-5 questions):**
- Questions presented one at a time (not all at once). After answering each, the next reveals with a slide-in transition.
- Running score shown: "2 of 3 correct so far."
- After final question, summary shown with per-question review links.

**`module-assessment` (8-12 questions):**
- All questions visible (scrollable form). Each question independent.
- Submit checks all at once. Summary at top: "You answered 7 of 10 correctly."
- Per-question result indicators inline. Questions answered incorrectly link to the relevant section for review.
- A "Retake Assessment" button resets all choices (clears localStorage for this assessment) and returns to `UNANSWERED`.

#### Error States

- If localStorage write fails (storage full, private browsing): Quiz functions normally but shows a small info banner: "Progress cannot be saved in this browser mode." Banner uses `--color-feedback-info-bg` background.
- If annotation data is malformed (missing `correct` index): Quiz renders in read-only mode with all choices visible and a note: "This quiz is temporarily unavailable."

#### CSS Class Conventions

```
.quiz                          — Container
.quiz--concept-check           — Variant: concept check
.quiz--section-review          — Variant: section review
.quiz--module-assessment       — Variant: module assessment
.quiz--answered                — State: answered (any result)
.quiz--collapsed               — State: collapsed to result bar (concept-check only)
.quiz__choice--selected        — Choice: currently selected
.quiz__choice--correct         — Choice: correct answer (after submit)
.quiz__choice--incorrect       — Choice: incorrect selection (after submit)
.quiz__submit--disabled        — Submit: no choice selected
.quiz__submit--loading         — Submit: evaluating (spinner)
.quiz__feedback--visible       — Feedback: revealed
.quiz__feedback--correct       — Feedback: correct result styling
.quiz__feedback--incorrect     — Feedback: incorrect result styling
```

---

### Component 2: Progressive-Disclosure Accordion — Behavior

#### State Machine

```
COLLAPSED ──(click/Enter/Space on summary)──→ EXPANDING ──(animation complete)──→ EXPANDED
EXPANDED ──(click/Enter/Space on summary)──→ COLLAPSING ──(animation complete)──→ COLLAPSED
```

#### Animation Sequence

**Expanding:**
1. Caret icon rotates 90deg clockwise (`--duration-fast`, `--ease-default`).
2. Content container `max-height` transitions from `0` to measured scroll height (`--duration-normal`, `--ease-default`).
3. Content `opacity` transitions from `0` to `1`, starting at 50% of the height transition (staggered for a "reveal" feel).
4. On animation complete, `max-height` is set to `none` (allowing dynamic content) and the animation class is removed.

**Collapsing:**
1. Content `opacity` transitions to `0` (`--duration-fast`, `--ease-exit`).
2. `max-height` transitions from current height to `0` (`--duration-normal`, `--ease-default`).
3. Caret icon rotates back (`--duration-fast`, `--ease-default`).

#### Variant-Specific Behavior

**`advanced-detail`:** Left border accent in `--color-feedback-info` (blue). Badge reads "Advanced Detail" in `--text-sm`, `--weight-semibold`.

**`supplementary-reference`:** Left border accent in `--color-text-tertiary` (gray). Badge reads "Supplementary" in `--text-sm`.

**`worked-example`:** Left border accent in `--color-platform-anthropic` (amber). Badge reads "Worked Example" in `--text-sm`. Distinct from the Worked-Example Fader (Component 6) -- this accordion wraps static example content, not the interactive fading pattern.

#### Interaction Details

- **Multiple accordions:** Independent. Opening one does not close others (unlike a traditional accordion group). Rationale: learners may want multiple advanced sections open for comparison.
- **Deep linking:** If the URL hash points to an element inside a collapsed accordion, the accordion auto-expands on page load and scrolls to the target. This ensures annotation file cross-references work correctly.
- **Print behavior:** All accordions expand in print media (`@media print { details[open] { ... } details { open: true; } }`).

#### Error States

- If content inside the accordion fails to load (broken image, missing embed): The accordion still opens. A fallback message replaces the broken content: "This content could not be loaded."

#### CSS Class Conventions

```
.accordion                       — Container (applied to <details>)
.accordion--advanced-detail      — Variant
.accordion--supplementary        — Variant
.accordion--worked-example       — Variant
.accordion--expanding            — Transient: animation in progress (expand)
.accordion--collapsing           — Transient: animation in progress (collapse)
.accordion__trigger              — The <summary> element
.accordion__icon                 — Caret icon container
.accordion__icon--rotated        — Caret rotated (open state)
.accordion__label                — Variant label ("Advanced Detail")
.accordion__title                — Content title
.accordion__content              — Inner content wrapper
```

---

### Component 3: Comparison-Table Enhancer — Behavior

#### State Machine

```
DEFAULT ──(type in filter)──→ FILTERING ──(clear filter / Escape)──→ DEFAULT
DEFAULT ──(click sort button)──→ SORTED_ASC ──(click same column)──→ SORTED_DESC ──(click same column)──→ DEFAULT
```

#### Filter Behavior

- **Debounce:** Filter input is debounced at 200ms. Typing pauses before the filter executes, preventing per-keystroke re-renders on large tables.
- **Match logic:** Case-insensitive substring match against ALL visible text in each row. A row is shown if any cell contains the filter string.
- **Row transition:** Non-matching rows receive `opacity: 0` over `--duration-fast`, then `display: none` after the transition completes. Matching rows that were hidden receive `display: table-row` then `opacity: 1`.
- **Count update:** The `aria-live` status updates after each filter: "Showing 5 of 12 rows."
- **Empty state:** If no rows match, show a centered message in the table body: "No rows match your filter." Styled with `--color-text-secondary` on `--color-surface-secondary`.
- **Clear:** Escape key or clicking an "X" button inside the input clears the filter and restores all rows.

#### Sort Behavior

- **Cycle:** None -> Ascending -> Descending -> None. Three-state cycle on each column header button.
- **Sort icon:** Up arrow (ascending), down arrow (descending), neutral double arrow (none). Icon transitions with `--duration-fast`.
- **Sort type inference:** The build script annotates column headers with `data-sort-type="text"` or `data-sort-type="number"` based on content analysis. Numeric columns sort numerically; text columns sort lexicographically.
- **Stability:** Sort is stable -- rows with equal values maintain their original relative order.
- **Aria update:** Sort indicator `aria-live` region announces: "Sorted by [column name], ascending."

#### Responsive: Sticky First Column

On viewports < `--bp-lg` where the table overflows:
- The first `<th>` and first `<td>` in each row receive `position: sticky; left: 0`.
- A `box-shadow` on the sticky column's right edge (`2px 0 4px rgba(0,0,0,0.1)`) visually separates it from scrolling content.
- The scroll container's right edge gets a gradient fade (`linear-gradient(to left, rgba(0,0,0,0.08) 0%, transparent 20px)`) to indicate more content is scrollable.

#### Platform Highlighting (Comparison Tables Only)

Tables with `data-highlight="platform"` (set in annotation files for platform comparison tables) gain additional behavior:
- Hovering/focusing a column header highlights that entire column with `--color-surface-tertiary` background.
- Column highlight transition: `--duration-instant`.
- A row of platform color indicators appears below the header row: thin colored bars using `--color-platform-*` values with accompanying text labels.

#### Error States

- If a table has 0 rows after build (malformed markdown): Render an empty table with a message: "Table data unavailable."

#### CSS Class Conventions

```
.table-enhancer                          — Wrapper
.table-enhancer--filterable              — Has filter controls
.table-enhancer--sortable                — Has sort buttons
.table-enhancer--platform-highlight      — Platform comparison mode
.table-enhancer--scrollable              — Overflow detected; scroll indicators active
.table-enhancer__filter--active          — Filter has content
.table-enhancer__sort-btn--asc           — Column sorted ascending
.table-enhancer__sort-btn--desc          — Column sorted descending
.table-enhancer__row--hidden             — Row filtered out
.table-enhancer__row--match              — Row matches filter (highlight)
.table-enhancer__col--highlighted        — Column being hovered/focused
.table-enhancer__sticky-col              — Sticky first column
.table-enhancer__scroll-shadow--left     — Left shadow indicator (scrolled right)
.table-enhancer__scroll-shadow--right    — Right shadow indicator (more content right)
.table-enhancer__empty                   — No matching rows message
```

---

### Component 4: Glossary Tooltip — Behavior

#### State Machine

```
IDLE ──(hover 300ms / focus / tap)──→ SHOWING ──(animation)──→ VISIBLE
VISIBLE ──(mouseout + not on tooltip / blur / tap outside / Escape)──→ HIDING ──(animation)──→ IDLE
```

#### Show/Hide Timing

- **Show delay (desktop hover):** 300ms hover intent. Cursor must remain on the term for 300ms before tooltip appears. Prevents accidental triggers during scrolling or casual mouse movement.
- **Show (focus/tap):** Immediate (no delay). Focus and tap are intentional actions.
- **Show animation:** `opacity: 0 -> 1` and `transform: translateY(4px) -> translateY(0)` over `--duration-fast` with `--ease-enter`.
- **Hide delay:** 150ms grace period when cursor moves from term to tooltip (allows reaching the tooltip to click links). If cursor enters tooltip within 150ms, tooltip stays open.
- **Hide animation:** `opacity: 1 -> 0` over `--duration-fast` with `--ease-exit`.

#### Positioning Logic

1. Calculate tooltip preferred position: centered horizontally on the term, 8px above the term's top edge.
2. If insufficient space above (< tooltip height + 16px margin from viewport top): flip to below the term.
3. If tooltip extends beyond left or right viewport edge: shift horizontally so it stays within 16px of edge.
4. A small 8px CSS triangle pointer connects the tooltip to the term, adjusting its horizontal position to remain centered on the term even when the tooltip body is shifted.

#### Mobile (< `--bp-md`): Bottom-Sheet Mode

On touch devices / narrow viewports, the tooltip renders as a bottom-sheet instead of a floating tooltip:
- A semi-transparent backdrop (`rgba(0,0,0,0.3)`) covers the page.
- The tooltip slides up from the bottom of the viewport: `transform: translateY(100%) -> translateY(0)` over `--duration-normal` with `--ease-enter`.
- Maximum height: 40vh. Content scrolls if it exceeds this.
- Dismiss: tap backdrop, swipe down (touch), or Escape key.
- Focus is trapped within the bottom-sheet while open.

#### CSS Class Conventions

```
.glossary-term                    — All glossary terms (semantic marker)
.glossary-term--first-use         — First occurrence in module (interactive)
.glossary-term--active            — Tooltip currently showing for this term
.glossary-tooltip                 — Tooltip container
.glossary-tooltip--visible        — Tooltip showing (opacity 1)
.glossary-tooltip--above          — Positioned above term
.glossary-tooltip--below          — Positioned below term (flipped)
.glossary-tooltip--shifted-left   — Shifted to stay in viewport
.glossary-tooltip--shifted-right  — Shifted to stay in viewport
.glossary-tooltip--bottom-sheet   — Mobile bottom-sheet mode
.glossary-tooltip__pointer        — CSS triangle connecting tooltip to term
.glossary-tooltip__backdrop       — Semi-transparent backdrop (mobile only)
```

---

### Component 5: Concept-Check Gate — Behavior

#### State Machine

```
OPEN ──(check individual item)──→ OPEN (with progress)
OPEN (all items checked) ──(auto-collapse after 800ms)──→ COLLAPSED
COLLAPSED ──(click/focus collapsed bar)──→ OPEN
```

#### Interaction Details

- **Checkbox feedback:** On check, the item receives a subtle left-to-right background sweep animation (`--color-feedback-correct-bg`, `--duration-fast`), and the checkmark icon fades in (`opacity 0->1`, `--duration-fast`, `--ease-bounce`).
- **All-checked collapse:** When all checkboxes are checked, wait 800ms (let the learner see the completed state), then collapse the gate to a slim bar: height transition from full to 48px (`--duration-normal`, `--ease-default`). The collapsed bar shows: "[check icon] Prerequisites reviewed" with a subtle "expand" affordance.
- **Collapsed bar:** Click or focus+Enter re-expands to full gate (same expand animation as accordion).
- **Persist:** Checkbox state and collapsed/expanded state saved to localStorage per `conceptGates` schema.
- **Restore on reload:** If all checkboxes were previously checked, load in collapsed state. If partially checked, load in open state with checked items pre-checked.

#### "Continue" Link Behavior

The continue link (`concept-gate__proceed-link`) is ALWAYS visible and functional regardless of checkbox state. This is not a gate -- it is an advisory checkpoint. The link:
- Smooth-scrolls to the next section (`scroll-behavior: smooth` with `--duration-slow`).
- On mobile, also closes any overlay sidebar that might be open.

#### CSS Class Conventions

```
.concept-gate                    — Container
.concept-gate--complete          — All items checked
.concept-gate--collapsed         — Collapsed to slim bar
.concept-gate__item--checked     — Individual item checked
.concept-gate__checkbox-icon     — Animated checkmark
.concept-gate__collapsed-bar     — The slim bar shown when collapsed
```

---

### Component 6: Worked-Example Fader — Behavior

#### State Machine (per example set)

```
FULL ──(next stage button)──→ PARTIAL ──(next stage)──→ GUIDED ──(next stage)──→ INDEPENDENT
Any stage ──(reveal button)──→ SOLUTION_VISIBLE
```

**Note:** Not all example sets will have all four stages. An annotation may define only `full` + `partial`, or `partial` + `independent`. The stage indicator adjusts to show only the defined stages.

#### Stage Transitions

- **Between stages:** Crossfade. Current stage content fades out (`opacity 1->0`, `--duration-normal`, `--ease-exit`), new stage content fades in (`opacity 0->1`, `--duration-normal`, `--ease-enter`). Total transition: ~500ms with 100ms overlap.
- **Stage indicator dots:** Current dot grows (`transform: scale(1.3)`, `--duration-fast`, `--ease-bounce`). Previous dots fill with `--color-feedback-correct`. Upcoming dots remain unfilled.

#### Blank Interaction (`partial` and `guided` stages)

- Blanks (`contenteditable` areas) receive a dashed bottom border (`2px dashed --color-text-tertiary`) to indicate they are fillable.
- On focus, the border transitions to solid (`--duration-instant`) and the background lightens to `--color-surface-secondary`.
- Blank content is auto-saved to localStorage on `blur` (debounced at 500ms while typing).
- Blanks have a minimum height of 1.5em and expand with content.

#### Hint System (`guided` stage)

- Hints are collapsible (using the accordion pattern). Initially collapsed with label: "Need a hint?"
- Up to 3 progressive hints. Each hint reveals the next hint toggle: "Hint 1" -> "Another hint?" -> "Hint 2" -> "Final hint?" -> "Hint 3."
- This progressive hint revelation prevents the learner from seeing all hints at once, encouraging genuine attempt before assistance.

#### Reveal Button

- Disabled until the learner has interacted with at least one blank (for `partial`/`guided`) or spent >= 30 seconds on the problem (for `independent`). This prevents immediate reveal without engagement.
- On click: solution area slides in (`max-height 0->auto`, `opacity 0->1`, `--duration-normal`, `--ease-enter`). Button text changes to "Hide Solution" with `aria-expanded="true"`.
- Solution and learner's blanks remain visible simultaneously for comparison.

#### CSS Class Conventions

```
.worked-example                       — Container
.worked-example--full                 — Stage: full worked example
.worked-example--partial              — Stage: completion problem
.worked-example--guided               — Stage: guided problem
.worked-example--independent          — Stage: independent problem
.worked-example--solution-visible     — Solution revealed
.worked-example__dot--complete        — Stage indicator: completed stage
.worked-example__dot--current         — Stage indicator: current stage
.worked-example__blank                — Fillable blank area
.worked-example__blank--focused       — Blank currently focused
.worked-example__blank--filled        — Blank has content
.worked-example__hint                 — Hint accordion
.worked-example__reveal--disabled     — Reveal button disabled (not enough engagement)
.worked-example__answer--visible      — Solution area visible
```

---

### Component 7: Self-Explanation Prompt — Behavior

#### State Machine

```
EMPTY ──(type >= 50 chars)──→ READY ──(click reveal)──→ COMPARING
COMPARING ──(click "hide expert answer")──→ READY
```

#### Textarea Behavior

- **Character counter:** A subtle counter below the textarea shows `${chars}/50 characters for comparison` until 50 chars are reached, then disappears. Counter uses `--text-xs`, `--color-text-tertiary`.
- **Auto-grow:** Textarea height grows with content (min 4 rows, max 12 rows). Uses a hidden mirror `<div>` to measure content height and applies it to the textarea.
- **Auto-save:** Content saved to localStorage on blur and every 5 seconds while typing (debounced).
- **Restore:** On page reload, textarea content restored from localStorage if present.

#### Reveal Transition

- Button transitions from `disabled` to `enabled` when char threshold met: `opacity 0.5->1`, `cursor: not-allowed -> pointer`, `--duration-fast`.
- On click: Expert answer slides in below the textarea (`max-height`, `opacity`, `--duration-normal`, `--ease-enter`). Both learner text and expert answer are visible.
- A subtle visual divider separates "Your Answer" from "Expert Answer." Both are labeled with `--text-sm` headings.
- Button text changes to "Hide Expert Answer" (`aria-expanded="true"`).

#### CSS Class Conventions

```
.self-explain                     — Container
.self-explain--ready              — 50+ chars entered; reveal enabled
.self-explain--comparing          — Expert answer visible
.self-explain__textarea           — The text input area
.self-explain__textarea--growing  — Auto-height adjustment active
.self-explain__char-count         — Character counter
.self-explain__char-count--met    — Threshold met (counter hides)
.self-explain__reveal--enabled    — Reveal button active
.self-explain__expert--visible    — Expert answer shown
.self-explain__divider            — Visual separator between answers
```

---

### Component 8: Progress Tracker — Behavior

#### Section Completion Heuristic (Refined)

The Accessibility Lead specified: >=80% scrolled AND >=10 seconds. Adding precision:

- **Intersection Observer setup:** One observer per H2 section. Each section's bounding box is the content between one H2 heading and the next (or end of module content).
- **Scroll tracking:** Section is considered "80% scrolled" when the observer reports >= 80% of the section's height has entered the viewport at any point (cumulative). This handles non-linear scrolling (user scrolls down, back up, down again).
- **Time tracking:** A timer starts when any part of the section is in the viewport. Timer pauses when the section leaves the viewport entirely. Timer accumulates across visits (stored in-memory per session, committed to localStorage on section completion or `beforeunload`).
- **Completion trigger:** When BOTH conditions met (80% scrolled AND 10+ seconds of viewport time), the section transitions to complete.
- **Quiz bonus:** If a section contains a quiz and the learner answers it (correct or incorrect), the section is immediately marked complete regardless of scroll/time metrics. The quiz interaction demonstrates engagement.

#### Progress Bar Animation

- On section completion: the fill width transitions to the new percentage (`--duration-slow`, `--ease-default`).
- The numeric label updates at the start of the transition (not at the end), so the number matches the target immediately while the bar catches up visually.
- On the milestone completions (25%, 50%, 75%, 100%), the label briefly shows a micro-celebration: bold text with a subtle scale pulse (`transform: scale(1.05)`, `--duration-fast`, `--ease-bounce`), then returns to normal.

#### Section Checkmarks (Sidebar)

- On section completion: the current section's dot morphs to a checkmark. The dot scales to 0 (`--duration-fast`), then the checkmark scales from 0 to 1 (`--duration-fast`, `--ease-bounce`).
- Color transitions from `--color-text-tertiary` (incomplete) to `--color-feedback-correct` (complete).
- Current section indicator: a left border accent (`3px solid --color-text-link`) on the active sidebar item, updated by Intersection Observer as the user scrolls.

#### Course-Level Progress (Course Map Page)

- Each module node on the course map shows:
  - **Not started:** Gray outline, no fill.
  - **Started (< 100%):** Partial fill ring (like a donut chart) showing percentage. Animated on page load.
  - **Complete:** Full fill with checkmark. Uses `--color-feedback-correct`.
- Summary text above the map updates from localStorage on page load.

#### CSS Class Conventions

```
.progress-tracker                        — Module-level bar container
.progress-tracker--milestone             — Hit a milestone (25/50/75/100%)
.progress-tracker__fill                  — The colored fill bar
.progress-tracker__label--celebrating    — Milestone pulse animation
.progress-tracker__section--complete     — Section completed
.progress-tracker__section--current      — Currently viewing this section
.progress-tracker__section--upcoming     — Not yet reached
.progress-tracker__check                 — Checkmark icon
.progress-tracker__check--entering       — Checkmark pop-in animation
.progress-tracker__course-node           — Module node on course map
.progress-tracker__course-node--empty    — Module not started
.progress-tracker__course-node--partial  — Module in progress
.progress-tracker__course-node--complete — Module complete
```

---

### Component 9: Navigation Controls — Behavior

#### Sidebar TOC Active Section Tracking

- **Intersection Observer:** One observer per H2 section. When a section's top edge crosses the viewport midpoint, that section becomes "current" in the sidebar.
- **Active indicator:** The current section's sidebar link receives `--color-text-link` left border and `--color-surface-secondary` background, transitioned with `--duration-fast`.
- **Auto-scroll:** If the active section's sidebar link is not visible within the sidebar scroll area, the sidebar smoothly scrolls to bring it into view (`scrollIntoView({ behavior: 'smooth', block: 'nearest' })`).

#### Sidebar Toggle (Mobile/Tablet)

- **Open animation:** Sidebar slides in from left (`transform: translateX(-100%) -> translateX(0)`, `--duration-normal`, `--ease-enter`). Backdrop fades in (`opacity 0->0.3`, `--duration-normal`).
- **Close animation:** Reverse of open. Sidebar slides out, backdrop fades out.
- **Focus trap:** When sidebar overlay is open, Tab cycles within sidebar content only. Escape closes.
- **Body scroll lock:** When sidebar overlay is open on mobile, `body` receives `overflow: hidden` to prevent background scrolling.

#### Scroll Progress Indicator

- The thin bar at the very top of the viewport (2px height, full width) fills left-to-right as the user scrolls through the module.
- Calculation: `(scrollTop / (scrollHeight - clientHeight)) * 100%`.
- Color: `--color-text-link` (blue).
- No transition on the width (updates in real-time with scroll, via `requestAnimationFrame` for performance).
- Hidden on mobile (< `--bp-md`) to avoid visual clutter on small screens.

#### Prev/Next Module Links

- **Hover:** Background shifts to `--color-surface-secondary` with `--duration-instant`. Arrow icon translates 4px in the navigation direction (`--duration-fast`, `--ease-default`).
- **Active/pressed:** Background shifts to `--color-surface-tertiary`.
- **Keyboard:** Standard link behavior. `Enter` to navigate. Visible focus ring.

#### Breadcrumb Behavior

- Separator between breadcrumb items: `>` character, `--color-text-tertiary`, `aria-hidden="true"`.
- Current page (last item) is bold, not a link.
- On narrow viewports (< `--bp-md`): Only the immediate parent and current page are shown. A "..." truncation replaces earlier levels. Clicking "..." expands to full breadcrumb.

#### Keyboard Shortcuts Dialog

- Triggered by `?` key (when no input/textarea is focused).
- Renders as a modal: `role="dialog"`, `aria-modal="true"`, `aria-label="Keyboard shortcuts"`.
- Focus trapped within dialog. First focus: close button.
- Backdrop: same as mobile sidebar (semi-transparent).
- Dismiss: `Escape`, click backdrop, or close button.
- Content: two-column table of shortcuts and their descriptions.

#### CSS Class Conventions

```
.nav-sidebar                        — Sidebar container
.nav-sidebar--open                  — Sidebar visible (mobile/tablet overlay)
.nav-sidebar--collapsed             — Sidebar collapsed (desktop toggle)
.nav-sidebar__item--active          — Currently viewing this section
.nav-sidebar__backdrop              — Semi-transparent overlay (mobile/tablet)
.nav-sequential__prev               — Previous module link
.nav-sequential__next               — Next module link
.nav-sequential__arrow              — Arrow icon (animated on hover)
.nav-sequential__arrow--hover       — Arrow translated on hover
.breadcrumbs__separator             — > character between items
.breadcrumbs__truncated             — ... for collapsed breadcrumb (mobile)
.scroll-indicator                   — Top scroll progress bar
.scroll-indicator__fill             — Colored fill portion
.shortcuts-dialog                   — Keyboard shortcuts modal
.shortcuts-dialog__backdrop         — Modal backdrop
.shortcuts-dialog__content          — Modal content panel
```

---

## 3.5 Global Interaction Patterns

These patterns are shared across multiple components and should be implemented as reusable JavaScript modules.

### Pattern A: Disclosure Toggle

Used by: Accordion (Component 2), Worked-Example reveal, Self-Explanation reveal, Concept-Gate collapse.

**Shared behavior:**
1. Toggle trigger element has `aria-expanded` (true/false) and `aria-controls` pointing to the content panel.
2. On activation (click, Enter, Space): toggle `aria-expanded`, toggle `hidden` on the content panel, and run the expand/collapse animation.
3. Animation uses `max-height` + `opacity` for smooth height transitions without layout thrash.
4. A `transitionend` event listener cleans up animation classes after completion.

**Implementation:** `disclosure.js` exports `initDisclosure(trigger, content, options)` where `options` includes `duration`, `easing`, and `onOpen`/`onClose` callbacks.

### Pattern B: Hover Intent

Used by: Glossary Tooltip (Component 4), Platform column highlighting (Component 3).

**Shared behavior:**
1. On `mouseenter`: start a delay timer (configurable, default 300ms).
2. If `mouseleave` fires before timer expires: cancel (no action).
3. If timer expires with cursor still on element: fire the "show" callback.
4. On `mouseleave` from the trigger: start a grace period timer (configurable, default 150ms).
5. If cursor enters the related content (tooltip, column) within grace period: cancel hide.
6. If grace period expires: fire the "hide" callback.

**Implementation:** `hoverIntent.js` exports `initHoverIntent(trigger, options)` where `options` includes `showDelay`, `hideGracePeriod`, `onShow`, `onHide`.

### Pattern C: Debounced Input

Used by: Table filter (Component 3), Glossary search, Self-Explanation auto-save.

**Shared behavior:**
1. On `input` event: reset a timer.
2. When timer expires (configurable, default 200ms for filter, 5000ms for auto-save): fire the callback with current input value.
3. On `Escape`: clear input and fire callback immediately with empty string.

**Implementation:** `debounce.js` exports `debounce(fn, delay)`.

### Pattern D: Focus Trap

Used by: Sidebar overlay (Component 9), Keyboard shortcuts dialog, Glossary bottom-sheet (mobile).

**Shared behavior:**
1. On open: find all focusable elements within the trap container.
2. Move focus to the first focusable element (or a designated initial focus target).
3. On `Tab` at the last element: wrap to first. On `Shift+Tab` at first: wrap to last.
4. On `Escape`: close the trap and return focus to the trigger element.
5. On close: restore focus to the element that triggered the open.

**Implementation:** `focusTrap.js` exports `createFocusTrap(container, options)` with `activate()`, `deactivate()` methods.

### Pattern E: Intersection Tracking

Used by: Progress Tracker section completion (Component 8), Sidebar active section (Component 9).

**Shared behavior:**
1. Create one `IntersectionObserver` per tracked set (sections, sidebar items).
2. Threshold array: `[0, 0.1, 0.2, ..., 1.0]` for granular tracking.
3. On intersection change: update the internal state (percentage visible, cumulative visibility).
4. Debounce state updates to avoid per-frame recalculation.

**Implementation:** `intersectionTracker.js` exports `createTracker(elements, options)` with `onEnter`, `onExit`, `onProgress` callbacks.

---

## 3.6 Print Styles

When `@media print` is active:

- All accordions are forced open (content visible).
- All quiz feedback is visible (regardless of answered state).
- All worked-example solutions are visible.
- Sidebar, progress tracker, scroll indicator, and navigation controls are hidden (`display: none`).
- Glossary tooltips are suppressed; first-use terms print as normal underlined text.
- Tables print without scroll containers (full width, wrapping as needed).
- Color is preserved but all platform indicators also have text labels (already guaranteed by the non-color-encoding rule).
- Page breaks are avoided within components: `break-inside: avoid` on `.quiz`, `.accordion`, `.worked-example`, `.self-explain`, `.concept-gate`.
- Links show their URL in parentheses after the link text: `a[href]::after { content: " (" attr(href) ")"; }` (external links only; internal anchors suppressed).

---

*End of Visual Strategist additions. The combined document (Accessibility Lead structural specs + Visual Strategist behavior/interaction specs) constitutes the complete WS0 Component Library specification, ready for implementation in Round 4.*
