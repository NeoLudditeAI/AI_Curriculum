# WS6: Layout and Accessibility Specifications

**Workstream:** WS6 -- Page Layout Blueprint, Semantic Structure, Cognitive Load Management
**Author:** Accessibility Lead
**Date:** 2026-03-21
**Status:** Complete
**Depends on:** WS0 (component library), WS1 (course architecture)
**Scope:** Page-level specifications. Component-level specs are in WS0.

---

## 6.1 Typography System

### Typeface Selection

| Role | Typeface | Fallback Stack | Rationale |
|------|----------|----------------|-----------|
| Body text | `Inter` | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif` | High x-height, open apertures, excellent legibility at 16px+. Freely available via Google Fonts or self-hosted. |
| Headings | `Inter` (weight 600-700) | Same stack | Single typeface reduces cognitive load; weight contrast alone distinguishes headings from body. |
| Code / monospace | `JetBrains Mono` | `"Cascadia Code", "Fira Code", "SF Mono", Consolas, monospace` | Designed for code legibility. Distinct from body text. Used in M06 code blocks and any inline code across modules. |

### Type Scale

Base size: `16px` (1rem). Scale ratio: 1.25 (Major Third). This produces a compact but readable hierarchy suitable for dense technical content.

| Element | Size | Weight | Line Height | Letter Spacing | Margin Top / Bottom |
|---------|------|--------|-------------|----------------|---------------------|
| `h1` (module title) | 2.441rem (39px) | 700 | 1.2 | -0.02em | 0 / 1.5rem |
| `h2` (major section) | 1.953rem (31px) | 700 | 1.25 | -0.01em | 3rem / 1rem |
| `h3` (subsection) | 1.563rem (25px) | 600 | 1.3 | 0 | 2rem / 0.75rem |
| `h4` (component heading) | 1.25rem (20px) | 600 | 1.4 | 0 | 1.5rem / 0.5rem |
| Body `p` | 1rem (16px) | 400 | 1.7 | 0 | 0 / 1rem |
| Small / caption | 0.875rem (14px) | 400 | 1.5 | 0.01em | 0 / 0.5rem |
| Table cell | 0.9375rem (15px) | 400 | 1.4 | 0 | -- |

### Measure (Line Length)

Optimal reading measure: **60-75 characters per line** (ch units). This aligns with typography research on reading speed and comprehension. The body content column is constrained to `max-width: 72ch`.

Tables, diagrams, and full-width components may exceed this measure but are contained within a wider `max-width: 90ch` boundary.

### Paragraph Spacing

Paragraphs separated by `1rem` (16px) bottom margin. No first-line indent -- block spacing is clearer for screen reading. Paragraphs kept to 3-5 lines per the pedagogy research recommendation for reducing cognitive load (Section 8).

---

## 6.2 Color System

### Core Palette

All color combinations meet WCAG 2.2 AA contrast requirements (>= 4.5:1 for normal text, >= 3:1 for large text and UI components).

**Semantic colors (light mode):**

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Text primary | Near-black | `#1A1A2E` | Body text, headings |
| Text secondary | Dark gray | `#4A4A5A` | Captions, metadata, secondary labels |
| Background primary | Off-white | `#FAFAFA` | Page background |
| Background secondary | Light gray | `#F0F0F5` | Sidebar, card backgrounds, code blocks |
| Accent primary | Deep blue | `#1B4D8E` | Links, interactive elements, focus rings |
| Accent secondary | Teal | `#0D7377` | Glossary first-use underlines, secondary interactive |
| Success | Forest green | `#1B7A3D` | Correct quiz answers, completion indicators |
| Error | Deep red | `#B71C1C` | Incorrect quiz answers |
| Warning | Dark amber | `#E65100` | Volatility warnings, caution callouts |
| Border | Medium gray | `#D0D0DA` | Table borders, dividers, card outlines |

**Part grouping colors** (from WS1 course map spec):

| Part | Background | Border | Contrast with `#1A1A2E` text |
|------|------------|--------|------------------------------|
| Part 1: The Terrain | `#E8F4FD` | `#90CAF9` | 14.2:1 (passes AAA) |
| Part 2: Agent Systems | `#FFF3E0` | `#FFB74D` | 14.8:1 (passes AAA) |
| Part 3: Building & Automating | `#E8F5E9` | `#81C784` | 14.1:1 (passes AAA) |
| Part 4: Synthesis & Horizon | `#F3E5F5` | `#CE93D8` | 13.6:1 (passes AAA) |

### Color-Only Encoding Rule

Every use of color is paired with at least one non-color indicator:

| Context | Color Signal | Paired Indicator |
|---------|-------------|-----------------|
| Quiz correct answer | Green background | Checkmark icon + "Correct" text |
| Quiz incorrect answer | Red background | X icon + "Incorrect" text |
| Part groupings on course map | Part-specific fill color | Text label ("FOUNDATIONS") + icon (compass) |
| Glossary first-use term | Teal underline | Dotted underline style (distinct from solid link underline) + superscript icon |
| Progress completion | Green fill in progress bar | "X of Y sections explored" text label |
| Prerequisite edges on course map | Gray solid vs. dashed | Solid = "Required," Dashed = "Recommended" + arrow tooltip text |

### Dark Mode (Progressive Enhancement)

Dark mode is a progressive enhancement, not a launch requirement. If implemented:

- Toggle via a button in the page header (persisted to `localStorage` under `afc.preferences.darkMode`).
- Implemented via CSS custom properties on `:root` and `[data-theme="dark"]`.
- All contrast ratios must be re-verified in dark mode.
- Prefers-color-scheme media query respects OS-level setting as the default.

---

## 6.3 Responsive Layout System

### Breakpoints

| Name | Min Width | Target Devices |
|------|-----------|----------------|
| `xs` | 0 | Phones (portrait) |
| `sm` | 576px | Phones (landscape), small tablets |
| `md` | 768px | Tablets (portrait) |
| `lg` | 1024px | Tablets (landscape), laptops |
| `xl` | 1280px | Desktops |

### Page Layout Grid

**Desktop (>= 1024px):** Three-column layout.

```
+--------------------------------------------------+
| Header (breadcrumbs + module title + progress)   |
+----------+----------------------------+----------+
| Sidebar  |   Main Content             | (margin) |
| TOC      |   max-width: 72ch          |          |
| 240px    |   + components             |          |
| sticky   |                            |          |
|          |                            |          |
+----------+----------------------------+----------+
| Sequential nav (prev / next)                     |
+--------------------------------------------------+
| Footer                                           |
+--------------------------------------------------+
```

- Sidebar: fixed width `240px`, position `sticky` at `top: 0`, scrollable if content overflows viewport height.
- Main content: fluid width, centered, `max-width: 72ch` for body text, `max-width: 90ch` for tables and full-width components.
- Right margin: empty space for visual breathing room (no content).

**Tablet (768px - 1023px):** Sidebar collapses to a hamburger-toggled overlay.

```
+--------------------------------------------------+
| Header (breadcrumbs + module title + [TOC toggle])|
+--------------------------------------------------+
|   Main Content (full width, centered)            |
|   max-width: 72ch                                |
|   padding: 0 1.5rem                              |
+--------------------------------------------------+
| Sequential nav (prev / next)                     |
+--------------------------------------------------+
```

- Sidebar becomes a slide-in panel from the left, triggered by the TOC toggle button.
- The overlay has a semi-transparent backdrop. Focus is trapped within the panel while open.
- Tables get horizontal scroll containers (Component 3 from WS0).

**Mobile (< 768px):** Single column, full-bleed.

```
+--------------------------------------------------+
| Header (compact: module number + [TOC toggle])   |
+--------------------------------------------------+
|   Main Content (full width)                      |
|   padding: 0 1rem                                |
+--------------------------------------------------+
| Sequential nav (stacked prev / next)             |
+--------------------------------------------------+
```

- Breadcrumbs collapse to show only "Course Map > Module XX".
- Prev/next navigation stacks vertically.
- Course map collapses from visual node graph to a vertical list (per WS1 spec).
- Worked-example blanks become full-width text inputs.
- Quiz choices stack vertically with generous touch targets (minimum 44x44px).

### Spacing Scale

A consistent spacing scale based on 4px increments:

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Tight spacing within components |
| `space-2` | 8px | Related element spacing |
| `space-3` | 12px | Intra-component padding |
| `space-4` | 16px | (= 1rem) Standard paragraph spacing |
| `space-6` | 24px | Section padding, card padding |
| `space-8` | 32px | Between-section spacing |
| `space-12` | 48px | Between H2 sections (top margin of H2) |
| `space-16` | 64px | Major section breaks, Part transitions |

---

## 6.4 Semantic HTML and ARIA Landmarks

### Page Landmark Structure

Every module page uses this landmark hierarchy:

```html
<body>
  <a class="skip-link" href="#main-content">Skip to main content</a>
  <a class="skip-link" href="#nav-sidebar-list">Skip to table of contents</a>

  <header role="banner">
    <!-- Breadcrumbs (nav, aria-label="Breadcrumb") -->
    <!-- Module title -->
    <!-- Progress tracker -->
    <!-- Scroll progress indicator (aria-hidden) -->
  </header>

  <nav class="nav-sidebar" aria-label="Module contents">
    <!-- Sidebar TOC (Component 9 from WS0) -->
  </nav>

  <main id="main-content">
    <article>
      <!-- Module content sections -->
      <section aria-labelledby="executive-summary-heading">
        <h2 id="executive-summary-heading">Executive Summary</h2>
        ...
      </section>

      <section aria-labelledby="section-2-heading">
        <h2 id="section-2-heading">Context Windows: Sizes, Pricing, and Limits</h2>
        ...
        <!-- Embedded components: quizzes, accordions, etc. -->
      </section>

      <!-- ... additional sections ... -->

      <section aria-labelledby="key-takeaways-heading">
        <h2 id="key-takeaways-heading">Key Takeaways</h2>
        ...
      </section>

      <section aria-labelledby="cross-references-heading">
        <h2 id="cross-references-heading">Cross-References</h2>
        ...
      </section>

      <section aria-labelledby="sources-heading">
        <h2 id="sources-heading">Sources</h2>
        ...
      </section>
    </article>
  </main>

  <nav class="nav-sequential" aria-label="Module navigation">
    <!-- Prev/Next links (Component 9 from WS0) -->
  </nav>

  <footer role="contentinfo">
    <!-- Course info, keyboard shortcuts link, reset progress -->
  </footer>
</body>
```

### Landmark Uniqueness Rules

| Landmark | `aria-label` | Count per Page |
|----------|-------------|----------------|
| `<header role="banner">` | (implicit) | 1 |
| `<main>` | (implicit) | 1 |
| `<footer role="contentinfo">` | (implicit) | 1 |
| `<nav aria-label="Module contents">` | "Module contents" | 1 |
| `<nav aria-label="Breadcrumb">` | "Breadcrumb" | 1 |
| `<nav aria-label="Module navigation">` | "Module navigation" | 1 |
| `<section>` | Via `aria-labelledby` pointing to its heading | Multiple (one per H2 section) |

All `<nav>` elements have unique `aria-label` values so screen reader users can distinguish them in landmark navigation.

### Skip Links

Two skip links at the top of every page, visible on `:focus`:

1. **"Skip to main content"** -- jumps past header and sidebar to `#main-content`.
2. **"Skip to table of contents"** -- jumps to the sidebar TOC for orientation.

Both styled as visually hidden until focused (`.skip-link:focus` becomes visible at the top of the viewport with high-contrast styling).

### Heading Hierarchy

Strict heading hierarchy enforced by the build pipeline:

- `<h1>`: Module title (exactly one per page).
- `<h2>`: Major sections (Executive Summary, body sections, Key Takeaways, Cross-References, Sources).
- `<h3>`: Subsections within H2 sections.
- `<h4>`: Component headings (quiz titles, accordion labels, self-explanation prompts). These are always within the context of their parent H2/H3 section.

The build pipeline validates that no heading level is skipped (no H2 followed directly by H4 without an intervening H3 in the same section).

---

## 6.5 Cognitive Load Management

### Content Segmentation

Evidence: Mayer's segmentation principle and CLT both advise breaking content into manageable chunks. The pedagogy research recommends ~10-20 minute segments for focus, with natural break points (Section 8).

**Segmentation rules applied to module content:**

| Rule | Specification | Rationale |
|------|--------------|-----------|
| Maximum continuous text | ~800-1,000 words before an interactive break | Matches the anti-pattern rule. After ~800 words, insert a concept-check quiz, self-explanation prompt, or visual element. |
| Section length target | Each H2 section: 500-1,500 words | Keeps individual sections completable in 3-8 minutes |
| Table proximity | Comparison tables always within 2 paragraphs of their textual reference | Spatial contiguity principle (Mayer): related text and visuals should be adjacent |
| Component density | No more than 2 interactive components per H2 section | Prevents interactivity fatigue; each interaction should feel purposeful |
| Pause points | Visual "section break" marker between H2 sections | Thin horizontal rule + white space (space-16: 64px) signals a natural stopping point |

### Signaling and Cueing

Evidence: Signaling (highlighting key points, using cues to direct attention) reduces extraneous load and guides scanning (pedagogy research, Section 8).

**Signaling elements injected by the build pipeline:**

| Signal | Implementation | Behavior |
|--------|---------------|----------|
| Key term introduction | Glossary tooltip on first use (Component 4 from WS0) | Dotted underline + tooltip. Signals: "this is a defined term." |
| Volatility warning | Callout box with caution icon | `<aside class="callout callout--volatility" role="note">` with amber left border + caution icon + "Volatility Warning" heading. Used for rapidly-changing information (pricing, feature status). |
| Cross-module callback | Inline callout | `<span class="callback">` with a subtle left border and "Recall from Module X" prefix. Links back to the original section. Implements spiral sequencing callbacks from WS1. |
| Section summary | Key points list at end of long H2 sections | A `<div class="section-summary">` with 3-5 bullet points pulling out the most important insights. Appears before the next H2 heading. |
| Status badges | Inline badge for feature availability | `<span class="status-badge status-badge--ga">GA</span>`, `--beta`, `--preview`, `--deprecated`. Color + text label. |

### Expertise-Reversal Management

Evidence: The expertise-reversal effect means that instructional techniques helpful for novices can become redundant or even harmful for experts. Progressive disclosure resolves this by letting advanced users skip scaffolding (pedagogy research, Sections 1, 6).

**Implementation strategy:**

| Learner Profile | Experience | Component Behavior |
|----------------|-----------|-------------------|
| First-time reader | No prior module context | All scaffolding visible. Concept-check gates shown prominently. Worked examples start at "full" stage. Glossary tooltips active on all first-use terms. |
| Returning reader | Has completed the module before | Progress tracker shows prior completion. Concept-check gates show as collapsed "Prerequisites reviewed" bars. Quiz answers pre-populated from localStorage (with option to retake). |
| Cross-referencing reader | Jumping in from another module | Breadcrumbs show origin. Concept-check gate at the landing point reminds of prerequisites. Glossary tooltips still active (term may be first-use in THIS module even if seen elsewhere). |

The system does not attempt to profile learners or gate content. Instead, it uses progressive disclosure (Component 2 from WS0) and localStorage state to naturally adapt the reading experience. Advanced readers collapse accordions; novices expand them. The critical learning path is always visible without interaction.

---

## 6.6 Reading Strategy Support

### Linear Reading (Default Path)

The default experience is a top-to-bottom linear reading flow, matching the recommended sequence from WS1. Every element is encountered in a pedagogically sound order:

1. Breadcrumbs (orientation)
2. Module title and metadata
3. Progress bar (motivation)
4. Executive summary (advance organizer for the module)
5. Prerequisites section (with concept-check gate if applicable)
6. Body sections in order (with embedded components)
7. Key takeaways (retrieval summary)
8. Cross-references (forward/backward connections)
9. Sources
10. Prev/next navigation

### Scanning and Reference Reading

For users who scan for specific information:

| Feature | Implementation |
|---------|---------------|
| Sidebar TOC | Always visible (desktop) or one-tap away (mobile). Shows all H2/H3 headings. Current section highlighted. |
| Section summaries | Key-points bullets at the end of long sections provide quick takeaways for scanners. |
| Glossary page search | Filter input on glossary.html for rapid term lookup. |
| Table filter | Filter input on enhanced tables (Component 3) narrows rows by keyword. |
| Jump-to-section from course map | Course map tooltips show section headings; clicking navigates directly to that module. |
| `Ctrl+F` / browser search | Works naturally because critical-path content is not hidden behind accordions or JavaScript toggles. Only supplementary content is in progressive-disclosure elements. |

### Session Continuity

Evidence: Adult learners prefer flexible pacing and may return across multiple sessions (pedagogy research, Section 8).

**Resume flow:**

1. On page load, check `localStorage` for `afc.session.lastModule` and `afc.session.lastSection`.
2. If the user is on the same module they last visited AND a scroll position is stored:
   - Show a non-modal banner at the top of the content area: "Resume where you left off? [Section Name] [Resume] [Start Over]"
   - Banner uses `role="status"` and `aria-live="polite"`.
   - "Resume" scrolls to the stored position. "Start Over" dismisses the banner and resets the module's scroll state.
3. If the user is on the course map page:
   - The last-visited module's node has a "Continue" badge.
   - A banner reads: "Continue with Module XX: [Title]? [Resume] [Browse]"
4. Banner auto-dismisses after 10 seconds if no interaction (with a subtle fade, respecting `prefers-reduced-motion`).

**Save flow:**

- On `beforeunload`, save current module, current section (determined by Intersection Observer's "current section" calculation), and scroll position to localStorage.
- On quiz/self-explanation interaction, save component state immediately (not on unload).

---

## 6.7 Session Design

### Study Session Structure

Based on WS1's estimated study times and the pedagogy research recommendation to segment content into 15-30 minute focused sessions (Section 8):

| Part | Modules | Est. Total Time | Recommended Sessions |
|------|---------|-----------------|---------------------|
| Part 1: The Terrain | M00, M01, M02 | 100-115 min | 2-3 sessions (M00 in 1; M01 in 1; M02 in 1-2, it is the longest module) |
| Part 2: Agent Systems | M03, M06, M04, M05 | 125-145 min | 3-4 sessions (one per module, or M03+M06 if momentum is high) |
| Part 3: Building & Automating | M07, M09 | 60-70 min | 1-2 sessions |
| Part 4: Synthesis & Horizon | M08, M10 | 60-70 min | 1-2 sessions |

### Within-Module Session Boundaries

For modules estimated at 35+ minutes (M01, M02, M04, M06), the build pipeline inserts a visual session break marker between H2 sections at approximately the midpoint:

```html
<div class="session-break" role="separator" aria-label="Good stopping point">
  <p class="session-break__text">
    <span class="session-break__icon" aria-hidden="true"><!-- pause icon --></span>
    <strong>Good stopping point.</strong>
    Your progress is saved automatically. Come back anytime.
  </p>
</div>
```

This is purely advisory. It does not gate content or force a pause. It signals to the learner that this is a natural boundary where they can step away without losing context.

### Between-Module Transitions

WS1 specifies advance organizers at Part boundaries. The build pipeline generates transition pages between Parts:

**Part transition structure:**

```html
<section class="part-transition" role="region" aria-label="Part 2: Agent Systems introduction">
  <h2 class="part-transition__title">Part 2: Agent Systems</h2>
  <p class="part-transition__bridge">
    <!-- Advance organizer text from WS1 -->
    You now know the landscape, the models, and how context works.
    The next four modules show how these capabilities are assembled
    into autonomous systems that act in the world.
  </p>
  <div class="part-transition__review">
    <h3>Quick Review: Part 1 Concepts</h3>
    <!-- 3-5 rapid-fire retrieval questions from Part 1 -->
    <!-- Implements spaced retrieval at Part boundaries (pedagogy research, Section 5) -->
  </div>
  <div class="part-transition__preview">
    <h3>What's Ahead</h3>
    <ul>
      <li><strong>M03:</strong> How agents work -- the architecture, the tools, the safety models.</li>
      <li><strong>M06:</strong> MCP -- the protocol that connects agents to the world.</li>
      <li><strong>M04:</strong> Multi-agent systems -- when one agent is not enough.</li>
      <li><strong>M05:</strong> OpenClaw -- the open-source alternative.</li>
    </ul>
  </div>
</section>
```

These transitions are generated as part of each module's HTML. M03 (first module in Part 2) would have the Part 2 transition prepended to its content. This avoids creating separate "interstitial" pages that break the one-file-per-module mapping.

---

## 6.8 Focus Management and Keyboard Interaction

### Global Focus Styles

Every focusable element receives a visible focus indicator:

```css
:focus-visible {
  outline: 3px solid #1B4D8E;   /* accent primary */
  outline-offset: 2px;
  border-radius: 2px;
}
```

The `:focus-visible` pseudo-class ensures focus rings appear for keyboard users but not for mouse clicks (per modern browser behavior). For browsers that do not support `:focus-visible`, a `:focus` fallback is provided.

### Focus Order

Tab order follows the visual document flow:

1. Skip links (visible on focus)
2. Header elements (breadcrumb links, progress tracker links)
3. Sidebar TOC toggle (on tablet/mobile) or sidebar links (on desktop)
4. Main content: headings, links, glossary terms, component interactive elements (in document order)
5. Sequential navigation (prev/next)
6. Footer elements

### Focus Trapping

Focus is trapped within:
- **Sidebar overlay** (tablet/mobile when open): `Tab` cycles within sidebar; `Escape` closes and returns focus to the toggle button.
- **Keyboard shortcuts dialog**: `Tab` cycles within dialog; `Escape` closes and returns focus to the trigger element.
- **Glossary tooltips** are NOT focus-trapped. They are advisory overlays; the user can `Tab` past them normally. `Escape` dismisses them.

### Reduced Motion

The `prefers-reduced-motion` media query is respected globally:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

All animations (scroll progress indicator fill, progress bar transitions, sidebar slide-in, tooltip fade) are suppressed for users who request reduced motion. The user can also set `afc.preferences.reducedMotion` in localStorage to `true` via a settings toggle, which adds `data-reduced-motion="true"` to the document root as an additional signal.

---

## 6.9 Accessibility Compliance Checklist

### WCAG 2.2 AA Requirements (Mandatory)

| Criterion | WCAG # | How Addressed |
|-----------|--------|---------------|
| Text contrast | 1.4.3 | All text/background pairs >= 4.5:1. Verified in Section 6.2. |
| Non-text contrast | 1.4.11 | UI components and graphical objects >= 3:1 against adjacent colors. Focus rings, progress bars, quiz indicators all verified. |
| Resize text | 1.4.4 | All text in `rem`/`em` units. Page remains usable at 200% zoom. No horizontal scroll on text content at 320px viewport. |
| Reflow | 1.4.10 | Single-column layout at 320px CSS width. No two-dimensional scrolling except for data tables (which get Component 3's scroll container). |
| Keyboard | 2.1.1 | All functionality operable via keyboard. Verified per-component in WS0. |
| No keyboard trap | 2.1.2 | Focus trapping only in modal contexts (sidebar overlay, shortcuts dialog) with `Escape` to exit. |
| Focus visible | 2.4.7 | 3px solid outline on `:focus-visible`. See Section 6.8. |
| Focus order | 2.4.3 | Tab order matches visual layout order. See Section 6.8. |
| Heading structure | 2.4.6, 1.3.1 | Strict H1-H4 hierarchy. Build pipeline validates no skipped levels. |
| Link purpose | 2.4.4 | All links have descriptive text. "Read more" or "click here" never used. Cross-module links include module number and title. |
| Page title | 2.4.2 | Format: "Module XX: [Title] -- AI Frontier Curriculum". Course map: "Course Map -- AI Frontier Curriculum". |
| Language | 3.1.1 | `<html lang="en">` on all pages. |
| Error identification | 3.3.1 | Quiz incorrect answers identified by icon + text + color. Self-explanation minimum-length requirement communicated via hint text. |
| Labels | 3.3.2 | All form controls (quiz inputs, filter inputs, textarea) have associated `<label>` elements (visible or `sr-only`). |
| Name, Role, Value | 4.1.2 | All interactive components use native HTML semantics or ARIA roles as specified in WS0. |

### Beyond AA: Selected AAA Enhancements

These AAA criteria are targeted for implementation where feasible:

| Criterion | WCAG # | Implementation |
|-----------|--------|---------------|
| Enhanced contrast | 1.4.6 | Body text contrast is 14.2:1+ (exceeds 7:1 AAA threshold). |
| Section headings | 2.4.10 | All content organized under headings. No orphaned paragraphs outside a section. |
| Link purpose (link only) | 2.4.9 | All link text is meaningful without surrounding context. |

### Automated Testing Integration

The build pipeline runs these accessibility checks as part of the build:

1. **`axe-core`** via a post-build script on all generated HTML files. Any violations at the "critical" or "serious" level fail the build.
2. **Heading hierarchy validation**: custom script checks that no heading level is skipped within any page.
3. **Color contrast verification**: custom script validates all color pairs defined in the CSS custom properties against WCAG thresholds.
4. **ARIA attribute validation**: `axe-core` catches invalid ARIA roles, missing labels, and duplicate IDs.

Manual testing checklist (per module, done during QA):
- Screen reader walkthrough (VoiceOver on macOS) of the full module.
- Keyboard-only navigation of all interactive components.
- 200% zoom test at 1280px viewport width.
- 320px viewport width reflow test.

---

## 6.10 Page Templates

### Module Page Template

```
+================================================================+
| [Skip to main content] [Skip to table of contents]  (sr-only)  |
+================================================================+
| <header role="banner">                                          |
|   Breadcrumb: Course Map > Part X: [Name] > Module XX: [Title] |
|   <h1>Module XX: [Title]</h1>                                  |
|   Metadata: Last updated | Status | Est. reading time           |
|   Progress bar (Component 8)                                    |
|   Scroll indicator (aria-hidden)                                |
+================================================================+
| <nav "Module     | <main>                                      |
|  contents">      |   <article>                                  |
|                   |     Part transition (if first in Part)       |
| H2: Executive    |     <section> Executive Summary </section>   |
|   Summary        |     <section> Prerequisites / Gate </section>|
| H2: [Section]    |     <section> Body section 1                |
|   H3: [Sub]      |       Quiz (concept-check)                  |
|   H3: [Sub]      |       Accordion (advanced-detail)            |
| H2: [Section]    |     </section>                               |
|   ...            |     Session break (if long module)           |
| ----------       |     <section> Body section 2                |
| H2: Key          |       Self-explanation prompt                |
|   Takeaways      |       Comparison table (enhanced)            |
| H2: Cross-Refs   |     </section>                               |
| H2: Sources      |     ...                                      |
|                   |     <section> Key Takeaways </section>       |
| [Progress        |     <section> Cross-References </section>    |
|  checkmarks]     |     <section> Sources </section>             |
|                   |   </article>                                 |
+-------------------+---------------------------------------------+
| <nav "Module navigation">                                       |
|   [<< Prev: Module XX-1: Title]   [Next: Module XX+1: Title >>]|
+================================================================+
| <footer>                                                        |
|   AI Frontier Curriculum | Keyboard shortcuts (?) | Reset       |
+================================================================+
```

### Course Map Page Template

```
+================================================================+
| <header role="banner">                                          |
|   <h1>AI Frontier Curriculum</h1>                               |
|   Course progress summary (Component 8, course-level)           |
|   Resume banner (if returning learner)                          |
+================================================================+
| <main>                                                          |
|   Visual course map (SVG, per WS1 spec)                        |
|   Text alternative: ordered list of all modules with prereqs   |
|                                                                 |
|   Part 1: The Terrain                                           |
|     M00: Landscape Overview [status] [est. time]               |
|     M01: Models & Intelligence Tiers [status] [est. time]      |
|     M02: Context Engineering [status] [est. time]              |
|                                                                 |
|   Part 2: Agent Systems                                         |
|     ...                                                         |
|                                                                 |
|   Part 3: Building & Automating                                 |
|     ...                                                         |
|                                                                 |
|   Part 4: Synthesis & Horizon                                   |
|     ...                                                         |
+================================================================+
| <footer>                                                        |
|   AI Frontier Curriculum | Keyboard shortcuts (?) | Reset       |
+================================================================+
```

### Glossary Page Template

```
+================================================================+
| <header role="banner">                                          |
|   Breadcrumb: Course Map > Glossary                             |
|   <h1>Glossary</h1>                                            |
|   Filter input: [Type to search 83 terms...]                   |
|   Filter status (aria-live): "Showing X of 83 terms"           |
+================================================================+
| <main>                                                          |
|   <section> Models & Intelligence (X terms)                     |
|     <dl> term/definition pairs </dl>                            |
|   </section>                                                    |
|   <section> Context Engineering (X terms) </section>            |
|   <section> Agents (X terms) </section>                         |
|   <section> Protocols & Integration (X terms) </section>        |
|   <section> Platforms & Products (X terms) </section>           |
+================================================================+
| <footer> ... </footer>                                          |
+================================================================+
```

---

## 6.11 Print Styles

A `@media print` stylesheet ensures module pages print cleanly:

| Rule | Specification |
|------|--------------|
| Sidebar | Hidden |
| Navigation (breadcrumbs, prev/next, scroll indicator) | Hidden |
| Interactive components (quizzes, self-explanation) | Show question text and expert answer; hide input fields and buttons |
| Accordions | Expanded (all content visible) |
| Glossary tooltips | Hidden; first-use terms shown with dotted underline only |
| Progress tracker | Hidden |
| Links | Show URL in parentheses after link text: `a[href]::after { content: " (" attr(href) ")"; }` |
| Page breaks | `break-before: page` on H2 headings; `break-inside: avoid` on tables, figures, and quiz blocks |
| Colors | Forced to high-contrast black/white. Part grouping colors removed. |

---

*This document specifies page-level layout, accessibility, and cognitive load management for the AI Frontier Curriculum HTML deliverables. Component-level specs are in WS0 (ws0-component-library.md). Visual interaction details (animations, transitions, design tokens) are specified by the Visual Strategist.*
