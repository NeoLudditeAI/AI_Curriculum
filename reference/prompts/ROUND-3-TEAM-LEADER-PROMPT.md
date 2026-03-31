# ROUND 3 — Pedagogical Design: Team Leader Prompt

**Document type:** Agent Team Leader prompt — to be provided as the initial instruction when creating the Round 3 Agent Team in Claude Code.

**Created:** 2026-03-21
**Author:** Ryan + Claude (pre-session planning)
**Preceding work:** Round 1 produced 11 modules (43,079 words). Round 2 refined them to 47,169 words with zero [UNVERIFIED] tags, 83 verified sources, 30 glossary terms added, and full cross-module harmonization. See `CURRENT_CYCLE.md` and `blog/` for documentation.

---

## Your mission

You are the Team Leader for **Round 3: Pedagogical Design** of the AI Frontier Curriculum project. Rounds 1 and 2 produced a deeply sourced, internally consistent, 47,000+ word curriculum across 11 modules covering bleeding-edge AI topics. The content is done. Your job is to design how that content should be packaged and delivered as a **graduate-level interactive course** for maximum learning effectiveness.

**You are NOT creating the deliverables.** Round 4 will build the actual HTML, diagrams, and interactive elements. Your team produces a **comprehensive design document** — a pedagogical blueprint that a production team can execute without ambiguity. Think of it as an architect's detailed plans before construction begins.

### Audience

The primary audience is **technically sophisticated adults** — software engineers, AI power users, tech-savvy professionals — who are motivated self-learners but not domain experts in the specific curriculum topics. Think: a smart colleague who uses AI tools daily but wants to develop structured, deep expertise. These are people being mentored on modern AI by someone who already has deep expertise (Ryan).

This is NOT a casual blog, a corporate training module, or a beginner's guide. It's a **graduate-level course** — dense, rigorous, and intellectually demanding — but designed with modern learning science to maximize comprehension and retention.

### Delivery format

- **Static HTML files** that open locally in a browser (no server, no LMS, no database)
- **JavaScript** available for client-side interactivity (quizzes, progressive disclosure, localStorage for progress)
- **Canonical source remains markdown** — the modules in `modules/` are the source of truth. All HTML is a derivative. Your design must specify how markdown maps to HTML output.
- No external dependencies that require internet access to function (CDN libraries are acceptable for build-time bundling only)

### Your primary deliverable

A single comprehensive design document: `reference/research/PEDAGOGICAL-DESIGN.md`

This document must be detailed enough that a Round 4 production team can build every element you specify without needing to ask clarifying questions. For every design recommendation, specify: what it is, why (citing research), where it goes (which modules/locations), and how it should work (behavioral specification).

**Required design document skeleton** (the Team Leader assembles in Phase 3):

```
# PEDAGOGICAL-DESIGN.md — AI Frontier Curriculum

## 1. Course Architecture (WS1)
   1.1 Learning sequence and module groupings
   1.2 Prerequisite map (per-module)
   1.3 Visual course map specification
   1.4 Spiral sequencing plan (core concepts × modules)

## 2. HTML Component Library (WS0)
   2.1 Markdown-to-HTML transformation pipeline
   2.2 Reusable component specifications (quiz, disclosure, comparison, glossary)
   2.3 Navigation system (inter-module, intra-module, course map)
   2.4 Glossary integration pattern
   2.5 localStorage schema and progress persistence

## 3. Page Layout and Accessibility (WS6)
   3.1 Typography and visual hierarchy
   3.2 Color palette (light + dark mode, WCAG AA)
   3.3 Responsive breakpoints
   3.4 Semantic HTML and ARIA patterns
   3.5 Cognitive load management rules

## 4. Module Designs (WS2) — one subsection per module
   4.N Module NN: [Title]
       - Learning outcomes
       - Opening hook
       - Prior knowledge activation
       - Section-by-section annotations
       - Closing synthesis
       - Estimated completion time

## 5. Assessment System (WS3)
   5.1 Quiz architecture (types, placement, difficulty)
   5.2 Question type specifications
   5.3 Feedback design
   5.4 Difficulty progression and fading
   5.5 Sample questions (calibration exemplars)

## 6. Visual and Interactive Elements (WS4)
   6.1 Diagram inventory (per module)
   6.2 Interactive comparison specifications
   6.3 Flowchart and decision tree specifications
   6.4 Progressive disclosure map

## 7. Engagement Design (WS5)
   7.1 Narrative hooks (per module)
   7.2 Curiosity-driven knowledge gaps (per module)
   7.3 Progress and milestone system
   7.4 Pacing and session design
   7.5 Tone and voice guidelines

## 8. Spaced Repetition and Integration (WS7)
   8.1 Review checkpoint map
   8.2 Concept callback matrix
   8.3 Cumulative assessment designs
   8.4 Recommended study schedule
   8.5 Capstone experience

## 9. Content Requests (for pre-Round 4 content patch)
   9.1 Missing content needed to support pedagogical design
   9.2 Content modifications needed (rewording, restructuring within modules)
   9.3 Priority ranking and dependencies

## 10. Appendices
   A. Pedagogical anti-patterns reference
   B. Research citations index
```

Each section's owner is noted. Teammates draft their sections in `reference/research/round-3/` working files; the Team Leader merges them into this skeleton in Phase 3.

---

## Critical rules

### 1. Do NOT modify module content

The files in `modules/` are the refined Round 2 output. **Do not edit them. Do not restructure them. Do not rewrite them.** Your design works WITH the existing content structure, not against it. If you identify content gaps that would need to be filled to support your pedagogical design, document them as "Content requests" in Section 9 of the design document. These will be addressed in a brief content patch between Rounds 3 and 4 — do NOT fill them yourself, and do NOT expect Round 4 (production) to write content.

### 2. Read before acting

Before spawning any teammates or beginning work, read these files in order:
1. `PROJECT-DESCRIPTION.md` — What we're building and why
2. `AGENT-INIT.md` — Operational directives, context engineering rules
3. `CURRICULUM.md` — Master index, module status, dependency graph
4. `CURRENT_CYCLE.md` — Round 2 completion state, known issues, roadmap
5. `GLOSSARY.md` — Canonical definitions (83 terms)
6. `reference/research/pedagogy-deep-research.md` — **CRITICAL: Deep Research output on modern learning science.** This is your team's primary knowledge base. Every pedagogical recommendation you make should trace to evidence in this document.
7. All 11 modules in `modules/` — Read each one. You cannot design a learning experience for content you haven't read.

### 3. Check AI_INBOX/ at session start

Per project rules: check `AI_INBOX/` for files. **Note:** This prompt document itself is in AI_INBOX — after reading it, move it to the project root as a record of Round 3's mandate. The `DEEP-RESEARCH-PEDAGOGY-PROMPT.md` file in AI_INBOX is the prompt that generated the pedagogy research already stored in `reference/research/pedagogy-deep-research.md` — move it to `AI_TRASH/` as it has been fully processed. Process any other AI_INBOX files normally.

### 4. Update project state files

After Round 3 work is complete:
- Update `CURRENT_CYCLE.md` to reflect Round 3 completion, decisions made, and open items
- Append Round 3 decisions to `DECISION_LOG.md`
- Write a process blog post to `blog/` documenting Round 3
- Update `CURRICULUM.md` if any status changes are warranted

### 5. Citation format standardization (deferred from Round 2)

This is a housekeeping task carried over from Round 2. Three modules (M00, M07, M10) have inconsistent citation formats. The convention is:
- `[F#]` for foundation profile citations
- Plain `[#]` for module-specific web sources in body text
- Each module's Sources section maps local `[#]` citations to SOURCES.md `W#` entries

Apply this convention to M00, M07, and M10. This is mechanical work — assign it to a single teammate early in the process so it doesn't block design work.

---

## Research foundation

Your team has access to a comprehensive evidence-based analysis of modern pedagogical science in `reference/research/pedagogy-deep-research.md`. This document covers 8 domains with research summaries, practical implications, implementation recommendations, and anti-patterns. Here is a synthesis of the key frameworks and findings your design should incorporate:

### Frameworks to apply

**Merrill's First Principles of Instruction** — Each learning unit should:
1. Be centered on a **real-world problem or task** (not just information)
2. **Activate** prior knowledge before presenting new content
3. **Demonstrate** the new knowledge with concrete examples
4. Give learners opportunity to **apply** what they've learned
5. Encourage **integration** into the learner's existing mental models

**4C/ID Model (van Merriënboer)** — For complex technical domains:
- Whole-task practice with supportive information
- Part-task practice for routine sub-skills
- Progressive complexity through task classes

**Backward Design (Wiggins & McTighe)** — Start with learning outcomes, then design assessments, then plan instruction. Every element in your design should trace to a learning outcome.

**Cognitive Load Theory (Sweller)** — Minimize extraneous load, manage intrinsic load, maximize germane load:
- Segmentation: break complex topics into digestible chunks
- Signaling: use visual cues to guide attention
- Progressive disclosure: show summaries first, details on demand
- Spatial contiguity: diagrams near their explanatory text

**Mayer's Multimedia Learning Principles** — Critical constraints on visual and interactive design:
- Coherence: exclude extraneous material (no decorative images, "seductive details," or irrelevant anecdotes)
- Signaling: use cues (bold, highlights, headings) to guide attention to essential material
- Redundancy: don't present identical information in text AND narration AND captions simultaneously
- Spatial contiguity: place diagrams near their explanatory text, not on separate pages
- Modality: combine visuals with text carefully; avoid split-attention effects

**Universal Design for Learning (UDL)** — Provide multiple means of:
- Representation (text + diagrams + code + tables for the same concept)
- Engagement (choice in how to explore; scaffolded and advanced paths)
- Action/expression (varied assessment types: MCQ, open reflection, scenario decisions)
This framework directly addresses the dual-audience challenge — different learners engage with different representations.

**Expertise-Reversal Effect** — Scaffolding that helps novices can hinder experts. Design must accommodate both: provide scaffolding for the broader audience while letting experienced readers skip it without friction.

### Evidence-based principles to encode in every design decision

| Principle | Evidence | Implication |
|-----------|----------|-------------|
| Retrieval practice > passive review | Dunlosky et al. (2013) meta-analysis: "high utility" | Frequent low-stakes quizzes, not just reading |
| Spaced practice > massed practice | Decades of cognitive psych research; "high utility" | Design spacing into module sequence; review checkpoints |
| Scaffolding large effect (g≈0.87) | Meta-analysis of scaffolding in online higher ed | Explicit prerequisites, "you should know" gates, fading |
| Concept maps boost retention/transfer | Meta-analysis vs. text-only study | Visual topic maps for navigation and review |
| Worked examples → fading | Sweller's worked-example effect | Full examples early, completion problems later, independent problems last |
| Curiosity via knowledge gaps | Loewenstein's knowledge-gap theory | Open with intriguing questions; promise resolution through content |
| Narrative anchoring aids novices | Case-based reasoning literature | Real-world scenarios and historical context at module openings |
| Cumulative assessment beats isolated | Studies on cumulative testing | Cross-module integration questions, not just within-module recall |
| Progressive disclosure reduces overload | Segmentation principle (Mayer) | Expandable sections, summary-first design |
| 15-30 min optimal session length | Multimedia learning guidelines | Design natural break points within modules |
| Coherence: no seductive details | Mayer's coherence principle | Every visual, story, and aside must serve a learning objective |
| Multiple representations aid varied learners | UDL framework | Offer text + diagram + code + table for key concepts |
| Unguided discovery hurts novices | Kirschner, Sweller, Clark (2006) | Always provide structure; make exploration optional, not default |

---

## Workstreams

Your design document must address each of these areas. They are listed in dependency order — early workstreams inform later ones.

### Workstream 0: HTML component library and transformation architecture (FOUNDATIONAL)

**Goal:** Define the reusable building blocks that translate pedagogical intent into implementable HTML/JS components. This workstream is foundational — every other workstream's specifications reference these components.

**Design and specify:**

- **Markdown-to-HTML transformation pipeline:** How does module markdown become interactive HTML? Specify:
  - The build process (manual? scripted? what tool transforms .md → .html?)
  - How pedagogical elements (quizzes, progressive disclosure, hooks) are injected — do they get added as custom HTML blocks in the markdown? As separate data files? As annotations that a build script interprets?
  - How the canonical markdown relationship is maintained (can the HTML be regenerated from markdown + design annotations?)
- **Reusable component specifications:** Define each UI component the course uses. For each:
  - Name and purpose
  - HTML structure (semantic elements, ARIA roles)
  - JavaScript behavior (events, state, localStorage interactions)
  - CSS class conventions (but not full implementation — Round 4 does that)
  - Variants (e.g., "quiz" has variants: concept-check, section-review, module-assessment)
  - Required components: quiz widget, progressive-disclosure accordion, comparison-table enhancer, glossary tooltip, concept-check gate, worked-example fader, self-explanation prompt, progress tracker, navigation controls
- **Navigation system:** How learners move through the course:
  - Inter-module navigation (next/previous module, return to course map)
  - Intra-module navigation (section sidebar or table of contents, anchor links, scroll position indicator)
  - Course map page (the visual map from WS1, as a navigable hub)
  - Breadcrumbs or context indicators ("Part 2 > Module 04 > Section 3")
  - Keyboard navigation patterns
- **Glossary integration:** How the 83 GLOSSARY.md terms surface in module HTML:
  - First use per module: how it's visually distinguished (underline? icon?)
  - Interaction: tooltip on hover/focus? Link to glossary page? Inline expandable definition?
  - Glossary page: standalone reference page generated from GLOSSARY.md
  - Relationship to the "Related terms" already in GLOSSARY.md entries
- **localStorage schema:** A unified schema for all client-side persistence:
  - Progress tracking (sections read, quizzes completed, scores)
  - Session resume ("Welcome back" flow)
  - User preferences (dark mode, font size if adjustable)
  - Schema versioning (how to handle updates without losing progress)

This workstream is owned by the **Accessibility Lead** (for HTML structure, ARIA, and keyboard patterns) and the **Visual Strategist** (for component behavior and interaction design), collaborating. The Learning Architect provides the navigation requirements from WS1.

**Boundary with WS6:** WS0 defines COMPONENT-LEVEL specs (how each individual widget works: its HTML, ARIA, JS behavior, variants). WS6 defines PAGE-LEVEL specs (overall layout, typography, color, responsive design — the container components live in). The localStorage schema is defined ONCE here in WS0; WS6 references it when specifying session-level UX behaviors (resume flow, break points). Do not duplicate specifications across both.

### Workstream 1: Learning pathway and course architecture

**Goal:** Design the overall course structure — how a learner navigates from zero to complete understanding.

**Analyze:**
- The existing module dependency graph in CURRICULUM.md
- Conceptual prerequisites that may differ from the module organization
- Where cross-cutting knowledge is needed (concepts used across multiple modules)

**Design and specify:**
- **Recommended learning sequence:** Should learners follow M00→M01→...→M10 linearly, or is a different order better for learning? Justify with evidence.
- **Module groupings:** Should modules be grouped into larger units (e.g., "Part 1: Foundations," "Part 2: Agent Systems," "Part 3: Ecosystem")? If so, specify groupings and transition points.
- **Prerequisites per module:** For each module, list exactly what the learner must understand before starting. Be specific — not "Module 01" but "the concept of context windows and token pricing from Module 01, Sections 3-4."
- **A visual course map:** Specify a navigable concept graph/map showing module relationships. This is both a navigation tool and an advance organizer (Ausubel). Describe the nodes, edges, and interactive behavior (clickable to navigate).
- **Spiral sequencing plan:** Identify 5-8 core concepts that should be revisited across multiple modules at increasing depth. For each, specify where it first appears, where it recurs, and how the later treatment builds on the earlier one.

### Workstream 2: Module-level instructional design

**Goal:** Design the internal structure of each module as a learning experience, not just a document.

**For each of the 11 modules, specify:**

- **Learning outcomes:** 3-5 specific, measurable outcomes per module (Backward Design). Use Bloom's taxonomy verbs: "identify," "explain," "compare," "evaluate," "design." These inform all other design decisions for the module.
- **Opening hook:** A problem, scenario, or curiosity-provoking question that frames the module (Merrill's problem-centered principle). Be specific — write the actual hook text or describe it precisely enough that a writer could draft it.
- **Prior knowledge activation:** What should the learner recall or review before diving in? Specify a brief "warm-up" exercise (2-3 questions from previous modules) that activates relevant schema.
- **Section-by-section annotations:** For each major section (H2) in the existing module, specify:
  - What type of learning element to add (quiz, worked example, scenario, diagram, comparison activity, self-explanation prompt)
  - Where exactly it should be placed (after which paragraph or section)
  - What it should assess or reinforce
  - Approximate complexity level
- **Closing synthesis:** How the module should end — a **whole-task exercise** (per 4C/ID) that requires applying the module's knowledge holistically to a realistic scenario, not just recalling individual concepts. For example, M09 (Developer APIs) might end with "Design an API integration strategy for a startup with these constraints..." The exercise should also connect forward to subsequent modules where appropriate.
- **Estimated completion time** for each module (reading + activities), broken into segments with natural pause points.

### Workstream 3: Assessment and retrieval practice design

**Goal:** Design the self-assessment system — quizzes, exercises, and feedback mechanisms.

**Design and specify:**

- **Quiz architecture:** Define 3-4 quiz types to use across the curriculum:
  - **Concept checks** (mid-section, 1-2 questions, immediate feedback) — Format, placement rules, difficulty calibration
  - **Section reviews** (end of H2 section, 3-5 questions, mix of recall and application) — Format, scoring approach
  - **Module assessments** (end of module, 8-12 questions, cumulative) — Format, integration questions from prior modules
  - **Cross-module synthesis** (at course milestones, integrating multiple modules) — Placement, format, scope
- **Question types and when to use each:**
  - Multiple choice (factual recall, concept discrimination)
  - Scenario-based decision exercises ("Which platform/approach would you recommend for X?")
  - Compare-your-answer-to-expert prompts (open reflection → model answer reveal)
  - Worked-example completion problems (fading scaffolding)
  - Self-explanation prompts ("Explain in your own words why...")
  - Concept mapping exercises ("List the key components of X and describe their relationships")
- **Feedback design:** For each question type, specify how feedback is delivered via client-side JavaScript:
  - Correct/incorrect indication
  - Explanation of the correct answer (and why wrong answers are wrong)
  - Links back to relevant content for review
  - Encouraging framing ("This is a challenging concept — most learners need to review Section X")
- **Difficulty progression:** How difficulty ramps within and across modules. Specify the fading pattern: where worked examples appear, where completion problems replace them, where fully independent problems appear.
- **Sample questions:** For at least 4 modules spanning different content types, draft 5-8 sample questions across question types to establish the quality standard and difficulty calibration. Suggested spread: one foundation module (M00 or M01), one technical core module (M02, M03, or M06), one comparison module (M08), and one frontier/synthesis module (M10). These exemplars set the bar for Round 4's question authoring across the remaining modules.

### Workstream 4: Visual and interactive element specifications

**Goal:** Specify every diagram, visualization, and interactive element needed.

**For each element, provide:**
- Type (architecture diagram, flowchart, comparison matrix, concept map, timeline, ecosystem map, sequence diagram)
- Source content (which module section it supports; quote the specific content it visualizes)
- What it should show (specific components, relationships, data flows)
- Labels and annotations needed
- Interactive behavior (if any): hover states, click actions, expandable details
- Accessibility requirements (alt text description, keyboard navigability)
- Why this visualization aids learning (cite specific cognitive science principle)

**Required diagram categories:**

1. **Architecture diagrams** — For modules covering system architecture (M03 agent systems, M04 multi-agent, M05 OpenClaw, M06 MCP). Specify component boxes, data flows, and callout annotations.
2. **Ecosystem maps** — For M00 (landscape overview), M08 (consumer comparison). Specify nodes, relationships, groupings.
3. **Comparison visualizations** — For every comparison table in the curriculum. Specify whether the static table suffices or if an interactive filter/highlight tool would add learning value. For each interactive comparison, specify filter dimensions and behavior.
4. **Flowcharts and decision trees** — For procedural content (M02 context engineering decisions, M04 orchestration pattern selection, M09 platform selection). Specify decision nodes, branches, and outcomes.
5. **Timelines** — For historical context (M00 market evolution, M10 frontier topics). Specify events, date ranges, and annotations.
6. **Concept maps** — For end-of-module and end-of-course synthesis. Specify nodes (concepts), edges (relationships), and whether they're static or interactive.

**Progressive disclosure map** (jointly owned with Accessibility Lead from WS6 — Visual Strategist identifies WHERE, Accessibility Lead validates cognitive load rationale):
- Identify every section across all modules where content should use expandable/collapsible UI
- For each, specify: what the collapsed summary shows, what expands, and the trigger mechanism
- Follow the rule: main learning path content is always visible; supplementary depth, advanced details, and reference material can be collapsed
- Classify each instance: "advanced detail" (for expertise-reversal), "supplementary reference" (tables, specs), or "worked example" (for fading pattern)

### Workstream 5: Engagement and motivation design

**Goal:** Design the engagement layer — how the course maintains momentum through dense technical material without dumbing it down.

**Design and specify:**

- **Narrative hooks per module:** For each module, specify a real-world story, case study, or historical anecdote that opens the module and illustrates why the topic matters. These should be factual (sourced), relevant (not decorative), and brief (2-3 paragraphs). They must serve the learning objective, not just entertain.
- **Curiosity-driven structure:** For each module, identify 2-3 points where a "knowledge gap" can be created — posing a question that the subsequent content answers. Specify the question and where it's placed.
- **Progress system design** (WHAT and WHY — the technical HOW is in WS0's progress tracker component and localStorage schema; reference those, don't redefine them):
  - Per-module progress: what constitutes "completion" (sections read? quizzes attempted? score threshold?)
  - Course-level progress: what metrics to display (modules completed, overall percentage, time invested)
  - Milestone markers: which module groupings constitute milestones, what happens when a milestone is reached
  - Visual metaphor: progress bar, checklist, dashboard, or something else — justify the choice
  - Anti-gaming: progress should reflect engagement (quiz completion, not just scrolling) — specify the rules
- **Pacing recommendations:** For each module, specify recommended session length and natural break points. Design "pause and reflect" moments at section boundaries.
- **Tone and voice guidelines:** Document specific guidance for the content-to-HTML transformation:
  - Maintain the authoritative, dense tone of the source material
  - Where to add conversational bridges ("Here's where it gets interesting...")
  - Where NOT to add fluff (comparison tables, technical specifications, pricing data)
  - How to handle the expertise-reversal tension (scaffolding for newer readers without condescending to experienced ones)

### Workstream 6: Accessibility and cognitive load management

**Goal:** Ensure the design meets accessibility standards and manages cognitive load.

**Design and specify:**

- **Page layout blueprint:** Specify the HTML page template structure:
  - Typography: font family, base size, heading scale, line height, line length (50-75 characters)
  - Whitespace: margins, padding between sections, spacing between elements
  - Color palette: primary, secondary, accent, background, text colors — all meeting WCAG AA contrast ratios (≥4.5:1 for normal text, ≥3:1 for large text)
  - Information hierarchy: how H1/H2/H3/body/captions/code are visually distinguished
  - Dark mode specification (colors, contrast ratios)
- **Responsive design requirements:** How the layout adapts to desktop, tablet, mobile viewports
- **Semantic HTML structure:** Specify ARIA roles, landmark regions, heading hierarchy, and keyboard navigation patterns for all interactive elements
- **Cognitive load management patterns:**
  - Maximum section length before a break point (specify in approximate words or reading time)
  - When to use progressive disclosure vs. always-visible content
  - How to handle dense comparison tables (scrollable? paginated? filterable?)
  - How code examples and technical configurations should be presented (syntax highlighting, line numbers, copy button, inline annotations)
- **Reading strategy support** (coordinates with WS0 navigation system):
  - Linear readers: clear sequential flow, "next section" navigation
  - Skimmers: scannable headings, key takeaway boxes, bolded terms
  - Reference users: search functionality, anchor links, glossary tooltips
- **Session design** (coordinates with WS0 localStorage schema):
  - Break point identification per module (where learners naturally pause)
  - "Welcome back" resume UX flow
  - Bookmarking and "pick up where you left off" behavior

### Workstream 7: Spaced repetition and cross-module integration

**Goal:** Design the mechanisms that promote long-term retention and knowledge integration.

**Design and specify:**

- **Review checkpoints:** Specify exactly where review moments occur:
  - At the start of each module (warm-up questions from prerequisite modules)
  - At course milestone boundaries (integration exercises after module groupings)
  - As concept callbacks within module body text (linking back to earlier treatments)
- **Concept callback map:** Create a matrix of core concepts × modules, showing where each concept appears and how the treatment deepens. This becomes the specification for explicit cross-references and review prompts.
- **Cumulative assessment design:** At 2-3 milestone points in the course, specify comprehensive assessments that require integrating knowledge across multiple modules. For each:
  - Which modules are covered
  - The scenario or problem frame
  - What knowledge must be synthesized
  - Expected complexity and time
- **Recommended study schedule:** Specify an ideal pacing schedule (e.g., "Module per week" or "2-3 sessions per module") with spacing rationale. Include a visual study calendar or timeline.
- **End-of-course synthesis:** Design a capstone experience that ties the entire curriculum together — a comprehensive scenario, project, or assessment that requires drawing on all 11 modules.

---

## Team composition

Spawn the following teammates. All use Opus 4.6.

| Role | Count | Primary workstreams | Responsibilities |
|------|-------|-------------------|-----------------|
| **Learning Architect** | 1 | WS1, WS7 | Course structure, learning pathway, spiral sequencing, spaced repetition design, cross-module integration, navigation requirements for WS0 |
| **Module Designer** | 2 | WS2 | Per-module instructional design: learning outcomes, hooks, section annotations, closing synthesis, time estimates. Split: Designer-A handles M00-M05, Designer-B handles M06-M10 |
| **Assessment Designer** | 1 | WS3 | Assessment system architecture, question type specs, feedback design, difficulty progression, sample questions. Works closely with Module Designers (they identify WHAT to assess per section; Assessment Designer specifies HOW) |
| **Visual Strategist** | 1 | WS0 (components + interaction), WS4 | Component behavior specs, interaction design, diagram specifications, comparison visualizations, progressive disclosure identification |
| **Engagement Specialist** | 1 | WS5 | Narrative hooks, curiosity design, progress system, tone guidelines, pacing |
| **Accessibility Lead** | 1 | WS0 (HTML + ARIA + layout), WS6 | Page layout blueprint, HTML component structure, ARIA patterns, cognitive load management, responsive specs, glossary integration, localStorage schema |
| **Citation Standardizer** | 1 | Rule 5 (deferred work) | Apply citation format convention to M00, M07, M10. This teammate is the ONLY one who edits module files. |
| **Chronicler** | 1 | Documentation | DECISION_LOG.md entries, blog post, CURRENT_CYCLE.md update |

> **Model policy:** Use Opus 4.6 for all teammates. We are on the Max Plan with headroom to spare. If usage limits are eventually hit, downgrade the Citation Standardizer and Chronicler to Sonnet — but default to Opus for maximum analytical quality on every design task.

### File ownership rules (prevent conflicts)

- **Only the Citation Standardizer edits files in `modules/`.** All other teammates produce NEW files only.
- The Chronicler owns `DECISION_LOG.md`, `CURRENT_CYCLE.md`, `CURRICULUM.md`, and `blog/`.
- Each teammate drafts their workstream output in a dedicated working file under `reference/research/round-3/`:
  - `ws0-component-library.md` (Visual Strategist + Accessibility Lead)
  - `ws1-course-architecture.md` (Learning Architect)
  - `ws2a-module-designs-m00-m05.md` (Module Designer-A)
  - `ws2b-module-designs-m06-m10.md` (Module Designer-B)
  - `ws3-assessment-system.md` (Assessment Designer)
  - `ws4-visual-specs.md` (Visual Strategist)
  - `ws5-engagement-design.md` (Engagement Specialist)
  - `ws6-layout-accessibility.md` (Accessibility Lead)
  - `ws7-spaced-repetition.md` (Learning Architect)
- The Team Leader merges these into `reference/research/PEDAGOGICAL-DESIGN.md` in Phase 3 using the required skeleton.
- If a teammate needs to reference content from another teammate's working file, they READ it — they do not edit it.

### Coordination protocol

**Phase 1 — Read and analyze (all teammates start here):**
- Team Leader reads all required files per Rule 2 (including `blog/2026-03-21-building-the-curriculum.html` and the Round 2 blog post for context on corrections made)
- Archives this prompt to project root; processes AI_INBOX per Rule 3
- All teammates read `reference/research/pedagogy-deep-research.md` (the learning science foundation) AND the pedagogical anti-patterns list in this prompt
- Learning Architect reads all 11 modules and the dependency graph; begins course structure analysis
- Module Designers read their assigned modules in depth (every section, every table, every comparison)
- Assessment Designer reads all 11 modules surveying assessment opportunities; reads WS3 specs
- Visual Strategist surveys all modules for visual/diagram/interaction opportunities
- Engagement Specialist reads all modules noting engagement opportunities and tone patterns
- Accessibility Lead reads all modules reviewing cognitive load patterns; reads GLOSSARY.md for integration planning
- Citation Standardizer reads M00, M07, M10 and begins citation format work (independent track)
- Chronicler sets up documentation files

**Phase 2 — Design (dependency-ordered, not all-parallel):**

*Phase 2a (foundations — must complete before 2b):*
- Learning Architect drafts WS1 (pathway design) — this establishes the course structure that everything else depends on
- Accessibility Lead + Visual Strategist co-draft WS0 (component library, navigation, glossary integration, localStorage schema) — this establishes the building blocks other workstreams reference
- Citation Standardizer applies format standardization to M00, M07, M10

*Phase 2b (module-level design — after 2a is complete, two waves):*

Wave 1 (must produce initial drafts before Wave 2 begins):
- Module Designers draft WS2 (module-level instructional design) using the Learning Architect's pathway and WS0's component library as their frame. **When referencing learning elements in section annotations, use WS0 component names** (e.g., "concept-check quiz" not "a quick quiz"; "progressive-disclosure accordion" not "expandable section"). This ensures Round 4 can map every annotation to a buildable component.
- Accessibility Lead drafts WS6 (page layout and cognitive load specs) — this can proceed in parallel with WS2 since it defines the page container, not module-specific elements

Wave 2 (after Module Designers share initial WS2 drafts):
- Assessment Designer drafts WS3 (assessment system) using Module Designers' section annotations as input — Module Designers flag WHAT to assess per section, Assessment Designer specifies HOW (question format, difficulty, feedback)
- Visual Strategist drafts WS4 (visual specifications) using Module Designers' placement annotations as input
- Engagement Specialist drafts WS5 (engagement design) using Module Designers' hooks and pacing notes as input

*Phase 2c (integration design — after 2b is complete):*
- Learning Architect drafts WS7 (spaced repetition and cross-module integration) — this requires Module Designers' section annotations to specify review checkpoints and concept callbacks

**Phase 3 — Integrate and review (after all Phase 2 drafts are complete):**
- Team Leader assembles all workstream outputs into the unified `PEDAGOGICAL-DESIGN.md` using the required skeleton
- Learning Architect reviews entire design doc for coherence — does the assessment design align with the pathway? Do visual elements support the learning outcomes? Do components match specifications?
- Module Designers cross-check each other's work (Designer-A reviews Designer-B's modules and vice versa)
- Assessment Designer reviews Module Designers' section annotations for assessment coverage gaps
- Accessibility Lead reviews ALL interactive element specs across WS3, WS4, WS5 for WCAG compliance and cognitive load
- Visual Strategist validates that all WS2/WS3 element placements reference valid WS0 components
- Chronicler finalizes documentation (DECISION_LOG, blog post, CURRENT_CYCLE)
- Team Leader does a final completeness check against the quality gates below

---

## Quality gates

The design document is "Round 3 COMPLETE" when:

1. **The HTML component library is fully specified** (every reusable component has HTML structure, JS behavior, ARIA patterns, and variants documented)
2. **Navigation and glossary integration are specified** (inter-module, intra-module, course map, glossary tooltips, keyboard patterns)
3. **Every module has specified learning outcomes** (3-5 per module, using Bloom's taxonomy verbs)
4. **Every module has a complete instructional design** (opening hook, section annotations, closing synthesis, estimated time)
5. **The assessment system is fully specified** (question types, placement rules, feedback mechanisms, difficulty progression, sample questions for 4+ modules spanning different content types)
6. **Every recommended diagram/visualization has a detailed specification** (type, content, annotations, interactive behavior, accessibility, learning rationale)
7. **The course pathway is justified with evidence** (sequencing rationale, prerequisite mapping, spiral sequencing plan)
8. **The page layout blueprint is production-ready** (typography, colors, responsive breakpoints, WCAG compliance specs)
9. **The progress and engagement systems are specified** (localStorage schema, progress tracking, milestone design)
10. **Cross-module integration is designed** (review checkpoints, cumulative assessments, concept callback map, capstone)
11. **Citation format is standardized** in M00, M07, M10
12. **Every design recommendation cites its evidence base** — no "we should do X" without "because research shows Y (Source)"
13. **The design document follows the required skeleton** — all sections present, each with clear ownership attribution

---

## Handling discoveries

Your team will develop deep pedagogical insights as they analyze the curriculum. When this happens:

1. **If it's a design decision within scope:** Make it. Document the rationale in the design document. This is core Round 3 work.
2. **If it requires content changes** (e.g., "Module 03 needs a new section on X to support the learning pathway"): Document it as a "Content request" in the design document. Do NOT edit modules (except Citation Standardizer on citation format).
3. **If it's a structural insight** (e.g., "Modules 03 and 04 should be merged for pedagogical reasons"): Document it in DECISION_LOG.md as a recommendation. Do NOT restructure. Flag for human review.
4. **If teammates disagree on a design approach:** The Team Leader arbitrates using the evidence in `pedagogy-deep-research.md`. When research is ambiguous, prefer the simpler design (less cognitive load for learners AND for the Round 4 production team).

---

## What NOT to do

- **Do not create HTML, CSS, JavaScript, or any deliverable files.** That is Round 4. You produce specifications, not implementations.
- **Do not edit module content** (except Citation Standardizer on citation format in M00, M07, M10).
- **Do not restructure the curriculum.** The 11-module structure is settled.
- **Do not design for a server, LMS, database, or internet-required features.** Everything must work as static HTML opened locally.
- **Do not design K-12 or introductory pedagogy.** This audience is graduate-level adults with technical sophistication.
- **Do not add "gamification" without learning rationale.** No points, badges, or leaderboards unless you can cite evidence they improve learning outcomes for this audience. Progress tracking is fine; arbitrary rewards are not.
- **Do not make vague recommendations.** "Add more interactivity" is useless. "Add a 3-question multiple-choice quiz after Section 4.2 testing concept X, Y, Z with immediate feedback showing the correct answer and a link back to the relevant paragraph" is useful.
- **Do not change project infrastructure** (CLAUDE.md, AGENT-INIT.md, PROJECT-DESCRIPTION.md, .claude/rules/, .claude/agents/). Document any proposed changes in DECISION_LOG.md.

### Pedagogical anti-patterns (from the research — distribute to all teammates)

These are evidence-based mistakes to avoid. Every teammate should internalize them:

- **Seductive details:** No irrelevant stories, fun facts, or decorative images. Every element must serve a learning objective (Mayer's coherence principle).
- **Unscaffolded problem-based learning:** Never throw learners into complex scenarios without prior instruction. Scaffolded → faded → independent, always in that order (Kirschner et al., 2006).
- **Color-only information encoding:** Never use color as the sole means of conveying meaning — always pair with labels, patterns, or text (WCAG, universal design).
- **Quiz without feedback:** Every assessment item must provide meaningful explanatory feedback, not just correct/incorrect. Feedback is the learning mechanism, not the score.
- **Hidden content as default:** Expandable sections must be discoverable. Don't hide critical learning path content behind toggles — only supplementary and advanced material.
- **Generic "gamification":** No points, badges, streaks, or leaderboards unless directly tied to a learning outcome with evidence. Progress tracking is different from gamification.
- **Walls of text without breaks:** Dense technical passages need visual breaks, headings, and interaction points every ~800-1,000 words maximum.
- **Isolated modules:** Every module must connect forward and backward. No module should feel like a standalone article — the course is a progression, not a collection.
- **Identical treatment for all readers:** The expertise-reversal effect means one-size-fits-all scaffolding will either bore experts or overwhelm novices. Progressive disclosure and "skip to advanced" patterns resolve this.

---

## Context about subsequent rounds

**Content patch (Round 3.5, if needed):** If your design document's Section 9 contains content requests, a brief content team will address them before Round 4 begins. This ensures Round 4 receives both complete content AND complete design specifications.

**Round 4 (Deliverable Creation):** A production team will execute this design document — building HTML pages, interactive quizzes (JavaScript), diagrams (SVG/Mermaid), ecosystem maps, comparison tools, and the full curriculum export. They will work from `PEDAGOGICAL-DESIGN.md` as their specification, using the component library (Section 2) as their UI pattern reference. The more precise your specifications are, the better Round 4's output will be.

**Your job is to make the design so detailed, evidence-based, and unambiguous that Round 4 can focus entirely on implementation rather than design decisions.**

---

## Success criteria

When Round 3 is complete, the design document should enable:

1. A Round 4 production team to build every HTML page, diagram, quiz, and interactive element by referencing the component library specs (WS0) — without needing to invent UI patterns or make pedagogical design decisions
2. Every design choice to be traceable to a learning science principle or framework from the research foundation
3. A learner to have a clear, motivated path through the entire curriculum with appropriate scaffolding, practice, and review
4. The dual-audience tension to be resolved — newer learners get scaffolding and engagement; experienced readers can skip to density without friction (via progressive disclosure and the expertise-reversal patterns)
5. The course to function as a coherent educational experience with unified navigation, glossary integration, and progress tracking — not 11 standalone documents with links between them
6. All accessibility requirements to be specified at a level of detail that a frontend developer could implement without accessibility expertise (ARIA roles, keyboard patterns, contrast ratios — all explicit)
7. Citation format to be standardized across all 11 modules
8. Any content gaps identified during pedagogical design to be documented precisely enough for a content patch team to address them without further research

---

## Begin

1. Read the files listed in "Read before acting" above. Also read the blog posts in `blog/` for Round 1 and Round 2 context.
2. Check `AI_INBOX/` and process files per Rule 3.
3. Read ALL 11 modules — you cannot design a learning experience for content you haven't analyzed.
4. Create `reference/research/round-3/` directory for workstream working files.
5. Spawn your team per the composition above. **Critical:** When spawning each teammate, include their specific role instructions, assigned workstreams, file ownership rules, the pedagogical anti-patterns list, and a directive to read `reference/research/pedagogy-deep-research.md` and their assigned module files before starting work. Teammates do not inherit your conversation — they need explicit context.
6. Execute the three-phase coordination protocol. **Respect the phase dependencies** — WS0 and WS1 must complete before Phase 2b; within 2b, Module Designers (Wave 1) must share initial drafts before Assessment/Visual/Engagement agents begin (Wave 2); WS7 requires WS2 output.
7. Assemble the unified `PEDAGOGICAL-DESIGN.md` from workstream working files using the required skeleton.
8. When all 13 quality gates pass, update project state files, write the blog post, and report completion.

The curriculum content is excellent. Now make the learning experience match.
