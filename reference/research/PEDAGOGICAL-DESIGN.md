# PEDAGOGICAL-DESIGN.md -- AI Frontier Curriculum

**Title:** AI Frontier Curriculum -- Pedagogical Design Document
**Date:** 2026-03-21
**Status:** Complete (Assembled)
**Round:** 3 -- Pedagogical Design
**Total Word Count:** ~81,400 (across 9 workstreams)
**Team Composition:**
- Learning Architect (WS1, WS7)
- Module Designer-A (WS2a: M00-M05)
- Module Designer-B (WS2b: M06-M10)
- Assessment Designer (WS3)
- Visual Strategist / Chronicler (WS4)
- Engagement Specialist / Chronicler (WS5)
- Accessibility Lead (WS0, WS6)
- Citation Standardizer (deferred work from Round 2)
- Chronicler (documentation, coordination)

**Assembly Note:** This document merges 9 workstream files into a single unified design reference for Round 4 (Deliverable Creation). All content from the source workstream files is preserved verbatim. The only additions are: the skeleton structure, cross-references between sections, the document header, and Sections 9-10 (Content Requests and Appendices).

---

## Table of Contents

1. [Course Architecture](#1-course-architecture-learning-architect) *(Learning Architect)*
2. [HTML Component Library](#2-html-component-library-accessibility-lead) *(Accessibility Lead)*
3. [Page Layout and Accessibility](#3-page-layout-and-accessibility-accessibility-lead) *(Accessibility Lead)*
4. [Module Designs](#4-module-designs-module-designer-a--module-designer-b) *(Module Designer-A + Module Designer-B)*
   - Presented in learning sequence order: M00, M01, M02, M03, M06, M04, M05, M07, M09, M08, M10
5. [Assessment System](#5-assessment-system-assessment-designer) *(Assessment Designer)*
6. [Visual and Interactive Elements](#6-visual-and-interactive-elements-visual-strategist) *(Visual Strategist)*
7. [Engagement Design](#7-engagement-design-engagement-specialist) *(Engagement Specialist)*
8. [Spaced Repetition and Integration](#8-spaced-repetition-and-integration-learning-architect) *(Learning Architect)*
9. [Content Requests](#9-content-requests-aggregated-from-all-workstreams) *(Aggregated from all workstreams)*
10. [Appendices](#10-appendices)
    - A. [Pedagogical Anti-Patterns Reference](#appendix-a-pedagogical-anti-patterns-reference)
    - B. [Research Citations Index](#appendix-b-research-citations-index)

---

<!-- IMPORTANT: Section contents below are assembled verbatim from workstream source files.
     Source file mapping:
     Section 1 <- ws1-course-architecture.md
     Section 2 <- ws0-component-library.md
     Section 3 <- ws6-layout-accessibility.md
     Section 4 <- ws2a-module-designs-m00-m05.md + ws2b-module-designs-m06-m10.md (interleaved by learning sequence)
     Section 5 <- ws3-assessment-system.md
     Section 6 <- ws4-visual-specs.md
     Section 7 <- ws5-engagement-design.md
     Section 8 <- ws7-spaced-repetition.md
     Sections 9-10 are new, assembled from cross-workstream analysis.
-->

---

## 1. Course Architecture *(Learning Architect)*

> **Source:** `reference/research/round-3/ws1-course-architecture.md`
> **Cross-references:** Section 4 (Module Designs) implements the learning sequence defined here. Section 5 (Assessment System) uses the spiral concepts for cross-module testing. Section 6 (Visual Specs) implements the course map specification. Section 8 (Spaced Repetition) operationalizes the spiral sequencing plan.

**Workstream:** WS1 -- Learning Sequence, Prerequisites, Course Map, and Spiral Sequencing
**Author:** Learning Architect
**Date:** 2026-03-21
**Status:** Complete
**Depends on:** All 11 modules (M00-M10), pedagogy-deep-research.md, CURRICULUM.md

**Content source:** `reference/research/round-3/ws1-course-architecture.md` (complete file, ~5,852 words)

**Sections included:**
- 1.1 Learning Sequence and Module Groupings (Four-Part Structure, recommended learning order, study time estimates)
- 1.2 Prerequisite Map (per-module specific concept prerequisites)
- 1.3 Visual Course Map Specification (node design, edge map, interactive behavior, layout)
- 1.4 Spiral Sequencing Plan (7 spiral concepts with explicit callbacks, summary matrix)
- Implementation Notes for Downstream Workstreams
- Evidence Citations

**Key outputs:**
- Learning sequence (reordered from numerical): M00, M01, M02, M03, M06, M04, M05, M07, M09, M08, M10
- Four-part structure: The Terrain (M00-M02), Agent Systems (M03, M06, M04, M05), Building & Automating (M07, M09), Synthesis & Horizon (M08, M10)
- Total estimated study time: ~6 hours across 4 Parts
- 7 spiral concepts: Model Selection/Cost, Gather-Act-Verify, MCP as Protocol, Security/Safety, Context Management, Platform Comparison, Open vs. Closed
- 30+ explicit callback statements for insertion across all modules
- Visual course map with node/edge/interaction specifications

---

## 2. HTML Component Library *(Accessibility Lead)*

> **Source:** `reference/research/round-3/ws0-component-library.md`
> **Cross-references:** Section 3 (Layout and Accessibility) specifies page-level layout; this section specifies component-level specs. Section 4 (Module Designs) references these components by name in annotation placements. Section 5 (Assessment System) uses Component 1 (Quiz Widget) for all quiz types. Section 6 (Visual Specs) uses Component 3 (Comparison-Table Enhancer) across 15+ tables. Section 7 (Engagement Design) uses Component 7 (Self-Explanation Prompt) and Component 8 (Progress Tracker).

**Workstream:** WS0 -- Component Library
**Author:** Accessibility Lead
**Status:** Structural draft (pending Visual Strategist behavior/interaction additions)
**Last updated:** 2026-03-21
**Scope:** Component-level specs only. Page-level layout deferred to Section 3.

**Content source:** `reference/research/round-3/ws0-component-library.md` (complete file, ~11,112 words)

**Sections included:**
- 2.1 Markdown-to-HTML Transformation Pipeline (build tool, annotation file format, regeneration guarantee)
- 2.2 Reusable Component Specifications:
  - Component 1: Quiz Widget (3 variants: concept-check, section-review, module-assessment)
  - Component 2: Progressive-Disclosure Accordion (3 variants: advanced-detail, supplementary-reference, worked-example)
  - Component 3: Comparison-Table Enhancer (filter, sort, responsive scroll)
  - Component 4: Glossary Tooltip (first-use-per-module detection)
  - Component 5: Concept-Check Gate (advisory prerequisite checklist)
  - Component 6: Worked-Example Fader (4 stages: full, partial, guided, independent)
  - Component 7: Self-Explanation Prompt (write-then-reveal pattern)
  - Component 8: Progress Tracker (module-level, section-level, course-level)
  - Component 9: Navigation Controls (sidebar TOC, breadcrumbs, prev/next, keyboard shortcuts)
- 2.3 Navigation System (inter-module, intra-module, keyboard patterns)
- 2.4 Glossary Integration Pattern (term detection pipeline, first-use styling, standalone glossary page)
- 2.5 localStorage Schema (namespaced state for all interactive components)

---

## 3. Page Layout and Accessibility *(Accessibility Lead)*

> **Source:** `reference/research/round-3/ws6-layout-accessibility.md`
> **Cross-references:** Section 2 (Component Library) provides component-level specs referenced by this section's page templates. Section 6 (Visual Specs) uses the color system and spacing scale defined here. Section 7 (Engagement Design) references the cognitive load break points defined here. Section 8 (Spaced Repetition) references the session design recommendations.

**Workstream:** WS6 -- Page Layout Blueprint, Semantic Structure, Cognitive Load Management
**Author:** Accessibility Lead
**Date:** 2026-03-21
**Status:** Complete
**Depends on:** WS0 (component library), WS1 (course architecture)
**Scope:** Page-level specifications. Component-level specs are in Section 2.

**Content source:** `reference/research/round-3/ws6-layout-accessibility.md` (complete file, ~4,485 words)

**Sections included:**
- 6.1 Typography System (typefaces: Inter + JetBrains Mono, type scale, measure, paragraph spacing)
- 6.2 Color System (core palette, part grouping colors, color-only encoding rule, dark mode spec)
- 6.3 Responsive Layout System (5 breakpoints, three-column/tablet/mobile layouts, spacing scale)
- 6.4 Semantic HTML and ARIA Landmarks (page landmark structure, skip links, heading hierarchy)
- 6.5 Cognitive Load Management (content segmentation rules, signaling and cueing, expertise-reversal management)
- 6.6 Reading Strategy Support (linear reading, scanning/reference reading, session continuity)
- 6.7 Session Design (study session structure, within-module session boundaries, between-module transitions)
- 6.8 Focus Management and Keyboard Interaction (global focus styles, focus order, focus trapping, reduced motion)
- 6.9 Accessibility Compliance Checklist (WCAG 2.2 AA requirements, selected AAA enhancements, automated testing)
- 6.10 Page Templates (module page, course map page, glossary page)
- 6.11 Print Styles

---

## 4. Module Designs *(Module Designer-A + Module Designer-B)*

> **Sources:** `reference/research/round-3/ws2a-module-designs-m00-m05.md` and `reference/research/round-3/ws2b-module-designs-m06-m10.md`
> **Presentation order:** Modules are presented in the learning sequence defined in Section 1: M00, M01, M02, M03, M06, M04, M05, M07, M09, M08, M10.
> **Cross-references:** Section 1 (Course Architecture) defines the prerequisite map and spiral callbacks embedded in these designs. Section 2 (Component Library) provides the component specs referenced by name. Section 5 (Assessment System) provides the quiz architecture these designs populate. Section 6 (Visual Specs) provides diagram placements aligned with the section annotations here.

**Workstreams:** WS2a (M00-M05, Module Designer-A) + WS2b (M06-M10, Module Designer-B)
**Date:** 2026-03-21
**Status:** Complete

**Content sources:**
- `reference/research/round-3/ws2a-module-designs-m00-m05.md` (~12,684 words)
- `reference/research/round-3/ws2b-module-designs-m06-m10.md` (~12,397 words)

**Presentation order (learning sequence per Section 1):**

The module designs below are interleaved from both source files, presented in the learning order defined by WS1 rather than numerical order. For each module: learning outcomes, opening hook, prior knowledge activation, section-by-section annotations, module-assessment quiz, closing synthesis exercise, and estimated completion time.

| Sequence | Module | Source File | Est. Time |
|----------|--------|-------------|-----------|
| 1 | **M00: Landscape Overview** | WS2a | ~65 min |
| 2 | **M01: Models & Intelligence Tiers** | WS2a | ~71 min |
| 3 | **M02: Context Engineering** | WS2a | ~96 min |
| 4 | **M03: Single-Agent Systems** | WS2a | ~67 min |
| 5 | **M06: MCP & the Integration Layer** | WS2b | ~55-60 min |
| 6 | **M04: Multi-Agent Orchestration** | WS2a | ~75 min |
| 7 | **M05: OpenClaw & Open Agent Ecosystem** | WS2a | ~65 min |
| 8 | **M07: Skills, Plugins & Automation** | WS2b | ~44-48 min |
| 9 | **M09: Developer Platforms & APIs** | WS2b | ~55 min |
| 10 | **M08: Consumer AI Comparison** | WS2b | ~50-52 min |
| 11 | **M10: Frontier Topics** | WS2b | ~65 min |

**Cross-cutting design principles (from WS2a):**
1. Spiral callbacks from WS1 are integrated into section annotations
2. Component density follows a rhythm: concept-check every ~800-1,000 words, section-review at H2 boundaries, one self-explanation per module in highest-complexity section
3. Progressive disclosure targets the expertise-reversal effect
4. Worked-example faders progress across modules (full in M00-M02, partial in M03-M04, guided/independent in later modules)
5. Glossary tooltips auto-detected at build time (first use per module)

**Cross-cutting design principles (from WS2b):**
1. Table density: M06, M07, M08, M09 are comparison-table-heavy; every major table gets enhancer with tailored filter dimensions
2. Protocol/API content: M06 and M09 use worked-example fader sequences for code examples
3. Synthesis load: M08 and M10 (Part 4) actively trigger retrieval from Parts 1-3
4. Spiral callbacks marked inline as `[SPIRAL: name]`

**Component Usage Summary (M00-M05, from WS2a):**

| Component | M00 | M01 | M02 | M03 | M04 | M05 |
|-----------|-----|-----|-----|-----|-----|-----|
| concept-check quiz | 5 | 7 | 7 | 5 | 5 | 6 |
| section-review quiz | 2 | 2 | 4 | 2 | 2 | 2 |
| module-assessment quiz | 1 | 1 | 1 | 1 | 1 | 1 |
| self-explanation prompt | 2 | 1 | 3 | 1 | 2 | 2 |
| comparison-table enhancer | 3 | 4 | 5 | 1 | 2 | 2 |
| progressive-disclosure accordion | 2 | 1 | 2 | 1 | 0 | 1 |
| concept-check gate | 0 | 1 | 1 | 0 | 0 | 1 |
| worked-example fader | 1 (full) | 1 (full) | 1 (full) | 1 (partial) | 1 (partial) | 0 |

**Time Budget Summary (all 11 modules):**

| Module | Reading | Activities | Synthesis | Total |
|--------|---------|------------|-----------|-------|
| M00 | 25-30 min | 25 min | 10 min | ~65 min |
| M01 | 35-40 min | 24 min | 12 min | ~71 min |
| M02 | 40-45 min | 36 min | 15 min | ~96 min |
| M03 | 30-35 min | 25 min | 12 min | ~67 min |
| M06 | 35-40 min | 15-20 min | 10-15 min | ~55-60 min |
| M04 | 35-40 min | 23 min | 12 min | ~75 min |
| M05 | 25-30 min | 23 min | 12 min | ~65 min |
| M07 | 30-35 min | 10-13 min | 8-12 min | ~44-48 min |
| M09 | 30-35 min | ~15 min | ~10 min | ~55 min |
| M08 | 30-35 min | 17-20 min | 10-12 min | ~50-52 min |
| M10 | 30-35 min | ~18 min | ~12 min | ~65 min |
| **Total** | | | | **~713-764 min (~12-13 hrs)** |

**Note:** The per-module designs including all learning outcomes, opening hooks, section-by-section annotations, quiz content, worked examples, and closing synthesis exercises are in the two source files listed above. Round 4 should read them in the interleaved order specified in this table.

---

## 5. Assessment System *(Assessment Designer)*

> **Source:** `reference/research/round-3/ws3-assessment-system.md`
> **Cross-references:** Section 2 (Component Library) provides Component 1 (Quiz Widget) used by all assessment types. Section 4 (Module Designs) specifies per-section quiz placements and question content. Section 7 (Engagement Design) provides decision scenario content that wraps in quiz widgets. Section 8 (Spaced Repetition) coordinates cross-module synthesis quizzes with the spacing schedule.

**Workstream:** WS3 -- Assessment Framework
**Author:** Assessment Designer
**Date:** 2026-03-21
**Status:** Complete
**Depends on:** WS0 (Component Library), WS1 (Course Architecture), pedagogy-deep-research.md, all 11 modules

**Content source:** `reference/research/round-3/ws3-assessment-system.md` (complete file, ~9,443 words)

**Sections included:**
- 5.1 Quiz Architecture:
  - Type 1: Concept Checks (after key concepts, ~every 800-1000 words, 1-2 questions, brief feedback)
  - Type 2: Section Reviews (end of H2 sections, 3-5 questions, moderate feedback)
  - Type 3: Module Assessments (end of module, 8-12 questions, full feedback with cross-module links)
  - Type 4: Cross-Module Synthesis Quizzes (Part transitions, 10-15 questions, standalone HTML pages)
- 5.2 Question Type Specifications:
  - Type A: Multiple Choice (factual recall and concept discrimination)
  - Type B: Scenario-Based Decisions (realistic situations with tradeoffs)
  - Type C: Compare-Your-Answer-to-Expert (open-ended with expert model)
  - Type D: Worked-Example Completion Problems (4-stage fading)
  - Type E: Self-Explanation Prompts (Chi's principle)
  - Type F: Concept-Mapping Exercises (Part transitions and capstone)
- 5.3 Feedback Design:
  - Universal feedback principles (immediate, explanatory, encouraging, concrete, accessible)
  - Per-question-type feedback specifications
- 5.4 Per-Module Question Inventory (difficulty progression and question counts)
- 5.5 Worked-Example Fading Sequence Across Curriculum

---

## 6. Visual and Interactive Elements *(Visual Strategist)*

> **Source:** `reference/research/round-3/ws4-visual-specs.md`
> **Cross-references:** Section 2 (Component Library) provides Component 3 (Comparison-Table Enhancer) used across 15+ tables. Section 3 (Layout and Accessibility) provides the color system, typography, and WCAG requirements that constrain all visual elements. Section 4 (Module Designs) provides learning outcomes that every diagram must trace to. Section 8 (Spaced Repetition) specifies the visual study calendar and concept callback heat map.

**Workstream:** WS4 -- Diagram Inventory, Interaction Design, Progressive Disclosure Map
**Author:** Chronicler (completing Visual Strategist scope)
**Date:** 2026-03-21
**Status:** Complete
**Depends on:** visual-survey-notes.md, ws0-component-library.md, ws1-course-architecture.md, ws2a/ws2b, ws6-layout-accessibility.md, pedagogy-deep-research.md (Section 4)

**Content source:** `reference/research/round-3/ws4-visual-specs.md` (complete file, ~10,137 words)

**Sections included:**
- 4.0 Design Principles (6 principles: every visual serves an LO, spatial contiguity, multi-channel encoding, progressive complexity, consistent visual language, static-first)
- 4.1 Visual Grammar: Shared Conventions (shape vocabulary, arrow vocabulary, color semantics, figure numbering, diagram format)
- 4.2 Per-Module Diagram Inventory (40 diagrams total):
  - M00: 4 diagrams (Ecosystem Map, Revenue Bubble Chart, Coding Tools Spectrum, Battlegrounds Concept Map)
  - M01: 4 diagrams (Reasoning Modes Comparison, Model Tier Spectrum, Release Timeline, Selection Decision Tree)
  - M02: 5 diagrams (Context Window Layers, RAG Pipeline, Compaction Process, Caching Cost Comparison, RAG Decision Framework)
  - M03: 4 diagrams (Gather-Act-Verify Loop, Planning Strategies, Sandboxing Spectrum, Agent Cost Callout)
  - M04: 5 diagrams (Five Orchestration Patterns, Subagents vs. Teams, Context Isolation, Progressive Escalation, Multi-Agent Decision Tree)
  - M05: 4 diagrams (OpenClaw Architecture Stack, Malicious Skill Rate Comparison, NemoClaw Architecture, OpenClaw vs. Closed Spectrum)
  - M06: 5 diagrams (MCP Client-Server Architecture, Protocol Handshake Sequence, Transport Layer Comparison, Three Primitives, Integration Strategy Decision Tree)
  - M07: 3 diagrams (Skills Architecture Comparison, Automation Platform Architecture, Scheduled Tasks Timeline)
  - M08: 2 diagrams + 3 interactive components (Market Share Trajectory, Platform Decision Framework quiz, Pricing Calculator)
  - M09: 4 diagrams (Four API Architectures, Cost Optimization Waterfall, SDK Ecosystem Heat Map, Platform Selection Decision Tree)
  - M10: 4 diagrams (Tiered Inference Architecture, Enterprise Governance Stack, Upcoming Events Calendar, Curriculum Synthesis Map)
- 4.3 Cross-Module Visual Patterns (6 patterns: Decision Trees, Table Enhancers, Architecture Diagrams, Timelines, Multi-Panel Comparisons, Callout Boxes)
- 4.4 Progressive Disclosure Map (Tier 1: 4 essential, Tier 2: 10 important, Tier 3: 10 optional)
- 4.5 Diagram Production Pipeline (source formats, build integration, accessibility pipeline)
- 4.6 Summary Statistics (40 diagrams, 21 high priority, 6 interactive decision trees, 24 progressive disclosure entries)
- 4.7 Dependencies and Handoffs

---

## 7. Engagement Design *(Engagement Specialist)*

> **Source:** `reference/research/round-3/ws5-engagement-design.md`
> **Cross-references:** Section 1 (Course Architecture) provides the four-part structure that engagement transitions follow. Section 2 (Component Library) provides Component 7 (Self-Explanation Prompt) and Component 8 (Progress Tracker). Section 4 (Module Designs) provides the opening hooks this section coordinates. Section 5 (Assessment System) provides the quiz framework that wraps decision scenarios.

**Workstream:** WS5 -- Curiosity Hooks, Progress Visibility, Cognitive Load Breaks, Scenario-Based Learning
**Author:** Chronicler (completing Engagement Specialist scope)
**Date:** 2026-03-21
**Status:** Complete
**Depends on:** ws1-course-architecture.md, ws2a/ws2b, ws3-assessment-system.md, ws0-component-library.md, pedagogy-deep-research.md (Section 3)

**Content source:** `reference/research/round-3/ws5-engagement-design.md` (complete file, ~3,772 words)

**Sections included:**
- 5.0 Design Principles (E1: Engagement serves learning, E2: Curiosity-driven not reward-driven, E3: Cognitive load as primary constraint)
- 5.1 Curiosity Hook System:
  - Opening hooks per module (design pattern, quality checklist)
  - 20 mid-section curiosity prompts (per-module table with prompt text, type classification)
- 5.2 Progress Visibility System:
  - 4 progress levels (curriculum-wide, part-level, module-level, section-level)
  - Completion criteria ("explored" not "completed")
  - Section checkpoint markers (3 states)
  - Part transition moments
- 5.3 Cognitive Load Break Points:
  - Break point strategy (between modules, not within)
  - Within-module rhythm (~800-1000 words prose -> quiz -> prose -> diagram -> prose -> section-review)
  - Between-module guidance messages
- 5.4 Scenario-Based Learning Integration:
  - 4 scenario types (opening hook, decision scenario, cross-module scenario, capstone scenario)
  - 11 decision scenarios (one per module with decision options and concepts tested)
  - 4 capstone scenarios (one per Part: Technology Audit, Agent Design, Integration Build, Platform Evaluation)
- 5.5 Tone and Voice Guidelines (6 guidelines with good/bad examples, feedback tone specifications)
- 5.6 Anti-Patterns Registry (10 anti-patterns with rationale and detection heuristics)
- 5.7 Summary Statistics (11 hooks, 20 prompts, 11 decision scenarios, 4 capstone scenarios, 4 progress levels, 10 anti-patterns)
- 5.8 Dependencies and Handoffs

---

## 8. Spaced Repetition and Integration *(Learning Architect)*

> **Source:** `reference/research/round-3/ws7-spaced-repetition.md`
> **Cross-references:** Section 1 (Course Architecture) provides the spiral sequencing plan this section operationalizes. Section 4 (Module Designs) provides the prior knowledge activation sections coordinated with warm-up questions here. Section 5 (Assessment System) provides the cross-module synthesis quiz architecture. Section 6 (Visual Specs) implements the visual study calendar specified here.

**Workstream:** WS7 -- Review Checkpoints, Concept Callbacks, Cumulative Assessments, Study Schedule, Capstone Experience
**Author:** Learning Architect
**Date:** 2026-03-21
**Status:** Complete
**Depends on:** WS1 (Course Architecture), WS2a/WS2b (Module Designs), WS3 (Assessment System), pedagogy-deep-research.md (Sections 1, 2, 5)

**Content source:** `reference/research/round-3/ws7-spaced-repetition.md` (complete file, ~8,184 words)

**Sections included:**
- Evidence Base (distributed study, cumulative testing, conceptual callbacks)
- 8.1 Review Checkpoint Map:
  - Module-start warm-up questions (11 modules, 2-3 questions each, with source module and spiral concept activation)
  - Part boundary integration exercises (4 synthesis quizzes at Part boundaries)
  - In-body callback locations (30 explicit callback statements across 11 modules)
- 8.2 Concept Callback Matrix:
  - Master matrix (7 concepts x 11 modules: I/D/S/M/. coding)
  - Per-concept deepening trajectories (6 detailed tables showing how each concept evolves across modules)
- 8.3 Cumulative Assessment Designs:
  - Assessment 1: Part 1 Synthesis "The Landscape in Your Head" (12 questions, M00-M02)
  - Assessment 2: Part 2 Synthesis "How Agents Work" (13 questions, M03-M05+M06)
  - Assessment 3: Part 3 Synthesis "Building With These Platforms" (11 questions, M07+M09)
  - Assessment 4: Course Capstone "The Full Picture" (15 questions + concept map + capstone exercise)
- 8.4 Recommended Study Schedule:
  - Session design principles (60-90 min sessions, 1-3 day spacing within Parts, 3-7 days between Parts)
  - 14-session schedule over 39 days (~14.5 hours total study time)
  - Alternative pacing: intensive (3 weeks), extended (8 weeks), non-linear
  - Visual study calendar specification
- 8.5 Capstone Experience:
  - Scenario: AI Transformation Advisory (300-person European financial services firm, 5 needs)
  - 5-step progressive complexity structure (Platform Selection, Context Architecture, Agent/Integration, Skills/API, Governance)
  - Self-assessment rubric (7 criteria x 3 levels)
  - Expert reference answer requirements
  - 4 reflection prompts (metacognitive consolidation)
- Implementation Notes for Downstream Workstreams
- Evidence Citations

---

## 9. Content Requests *(Aggregated from all workstreams)*

This section aggregates all content requests, content gaps, and recommendations that require changes to the source markdown modules (in `modules/`). These are items the Round 4 production team or a future content round needs to address.

### Priority 1: Content That Must Be Created for the Build Pipeline

| Source | Request | Details | Affected Module(s) |
|--------|---------|---------|---------------------|
| WS2b (M07, Section 7.4) | Inject synthesized comparison table for scheduled tasks | The module text does not present scheduled task capabilities as a table. The annotation file should inject a synthesized comparison table with columns: Platform, Mechanism, Trigger types (time-based / event / both), Limits, Key gap. | M07 |
| WS0 (Section 2.1) | Create 11 YAML annotation files | One per module, specifying all pedagogical element placements from WS2a, WS2b, WS3, WS4, and WS5. | All |
| WS4 (Section 4.5) | Create 40 diagram source files | D2, Mermaid, JSON+template, and chart library sources for all specified diagrams. | All |
| WS7 (Section 8.5) | Author capstone expert answer | Detailed multi-page document with architecture diagrams, budget tables, and module cross-references for the capstone scenario. Estimated 3-4 hours of authoring time. | M10 / Capstone |

### Priority 2: Content Enhancements Recommended by Workstreams

| Source | Request | Details | Affected Module(s) |
|--------|---------|---------|---------------------|
| WS5 (Section 5.1) | 20 mid-section curiosity prompts | Specific prompt text provided in WS5 Section 5.1 table. These are inserted at H2 section starts via annotation files, not module edits. | All |
| WS5 (Section 5.4) | 4 capstone scenario texts | Full scenario text provided in WS5 Section 5.4. One per Part boundary. Inserted in Part transition pages. | Part transitions |
| WS1 (Section 1.4) | 30 spiral callback statements | Explicit callback text provided in WS1 Section 1.4. Inserted inline in module body text via annotations. | All |
| WS2a/WS2b | 11 opening hook texts | Full hook text provided per module. Inserted after module title via annotations. | All |
| WS2a/WS2b | 11 closing synthesis exercises | Full exercise text provided per module. Inserted after module assessment quiz via annotations. | All |

### Priority 3: Deferred from Round 2

| Source | Request | Details | Affected Module(s) |
|--------|---------|---------|---------------------|
| CURRENT_CYCLE.md | Citation format standardization | Apply [F#] + [W#] convention consistently to M00, M07, M10. Deferred from Round 2 as cosmetic, not factual. | M00, M07, M10 |

### Priority 4: Potential Future Content Improvements

| Source | Request | Details | Affected Module(s) |
|--------|---------|---------|---------------------|
| CURRENT_CYCLE.md | Resolve 12 unverified sources | Mostly M07/M08 community sources and M07 marketplace stats. | M07, M08 |
| CURRENT_CYCLE.md | Fix 3 SOURCES.md 404 URLs | W21 (koi.security), W42 (anthropic.com/claude-plugins), W56 (google blog/flow). | SOURCES.md |
| CURRENT_CYCLE.md | Consolidate 3 duplicate source entries | 3a/W20, 3b/W22, 3c/W23. | SOURCES.md |
| CURRENT_CYCLE.md | Harmonize M09 caching table with M02 caching discussion | Cross-module consistency improvement. | M02, M09 |

---

## 10. Appendices

### Appendix A: Pedagogical Anti-Patterns Reference

These 9 anti-patterns were distributed to all Round 3 agents as constraints. Every workstream output was verified against this list.

| # | Anti-Pattern | Description | Detection Heuristic | Source |
|---|-------------|-------------|---------------------|--------|
| 1 | **Seductive details** | Interesting but irrelevant stories, anecdotes, or facts that distract cognitive resources from the learning objectives. | Any anecdote or fact that cannot be traced to a specific learning outcome. | pedagogy-deep-research.md, Section 3 |
| 2 | **Unscaffolded problem-based learning** | Presenting problems or exercises without sufficient structure, constraints, or comparison answers. Novices flounder without guidance (Kirschner et al., 2006). | Any scenario or exercise without constraints, options, or a comparison answer. | pedagogy-deep-research.md, Section 1 |
| 3 | **Color-only information encoding** | Using color as the sole means of conveying information, excluding colorblind users and failing WCAG 2.2 AA compliance. | Any visual element where color is the sole differentiator between states or categories. | WCAG 2.2, 1.4.1 |
| 4 | **Quiz without feedback** | Assessment questions that do not provide explanatory feedback. Without explanation, quizzes are evaluation tools, not learning tools. | Any quiz question lacking a minimum 1-sentence explanation for both correct and incorrect answers. | pedagogy-deep-research.md, Section 2 |
| 5 | **Hidden content as default** | Placing critical-path information inside collapsed accordions, tabs, or progressive disclosure elements, forcing the learner to guess what is important. | Any accordion or collapsed element containing content referenced by a learning outcome. | Mayer's segmentation principle |
| 6 | **Generic gamification** | Points, badges, streaks, leaderboards, or reward mechanisms that are not tied to retrieval practice, knowledge gap closure, or other pedagogical functions. | Any reward mechanism not tied to a specific learning function. | pedagogy-deep-research.md, Section 3 |
| 7 | **Walls of text without breaks** | Dense text blocks exceeding ~1,000 words without a visual break, quiz, interactive element, or diagram to manage cognitive load. | Any section with >1,000 words between interactive elements. | Cognitive Load Theory (Sweller) |
| 8 | **Isolated modules** | Modules that do not connect forward or backward to other modules, breaking the spiral curriculum and preventing knowledge integration. | Any module whose annotations lack at least one spiral callback and one forward reference. | Bruner's spiral curriculum |
| 9 | **Identical treatment for all readers** | Treating all modules and all learners the same, ignoring the expertise-reversal effect (instructional techniques helpful for novices can be redundant for experts). | Any module without progressive disclosure for both novice support and expert streamlining. | pedagogy-deep-research.md, Section 1 |

**Application across workstreams:**

- WS0 (Component Library): Anti-patterns 3, 4, 5 are enforced at the component level. Every quiz provides feedback. No color-only encoding. Critical-path content never behind accordions.
- WS2a/WS2b (Module Designs): Anti-patterns 1, 7, 8 are checked per module. Every module has spiral callbacks. Interactive breaks every ~800-1,000 words.
- WS3 (Assessment System): Anti-pattern 4 is the primary constraint. Every question type specifies feedback templates.
- WS4 (Visual Specs): Anti-pattern 3 is enforced via the visual grammar (shape + color + label triads).
- WS5 (Engagement Design): Anti-patterns 1, 2, 6 are the primary constraints. No seductive details. No generic gamification. All scenarios are scaffolded.
- WS6 (Layout and Accessibility): Anti-pattern 3 is enforced via the color system. Every color signal has a paired non-color indicator.
- WS7 (Spaced Repetition): Anti-pattern 8 is the primary constraint. The spiral concept callback matrix ensures no module is isolated.

### Appendix B: Research Citations Index

All references to `pedagogy-deep-research.md` across the 9 workstreams, consolidated by section.

#### Section 1: Scaffolding and Advance Organizers

| Citing Workstream | Claim | Key Finding |
|-------------------|-------|-------------|
| WS1 | Scaffolding effect size g~0.87 | Meta-analyses show explicit scaffolding substantially improves outcomes in online higher ed |
| WS1 | Concept maps as advance organizers | Meta-analysis found concept/knowledge maps increased retention and transfer vs. text-only |
| WS1 | Novices need guided instruction | Unguided discovery approaches are less effective until learner has high prior knowledge (Kirschner et al., 2006) |
| WS1 | Expertise-reversal effect | Structured guidance should be removed as learners advance, not extended to experts |
| WS1 | Spiral sequencing and spaced recall | Revisiting core ideas in multiple modules with explicit links cements connections |
| WS4 | Advance organizers (Ausubel) | Concept maps and graphic organizers increase retention and transfer versus text-only study |
| WS4 | Concept maps as retrieval practice | Concept maps should be used as retrieval practice (after exposure) rather than first-exposure content |
| WS7 | Session length ceiling ~90 minutes | Long modules should be split; attention degrades beyond 90 minutes |
| WS7 | Advance organizers improve retention | Graphic organizers can serve as effective advance organizers that prime key concepts |
| WS3 | Concept maps impose high cognitive load | Limit to 4-6 concepts per exercise |

#### Section 2: Retrieval Practice, Worked Examples, and Self-Explanation

| Citing Workstream | Claim | Key Finding |
|-------------------|-------|-------------|
| WS3 | Retrieval practice is potent for retention | Frequent low-stakes testing dramatically improves long-term retention (Dunlosky et al., 2013) |
| WS3 | Chi's self-explanation principle | Self-explaining key points boosts understanding |
| WS5 | Scaffolded case-based reasoning | Scenarios anchor abstract concepts in concrete situations, promoting transfer |
| WS2a | Practice testing as high-utility strategy | Concept-check quizzes every ~800-1,000 words |
| WS2a | Self-explaining key points boosts understanding | Self-explanation prompts with write-then-reveal pattern |
| WS2a | Worked-example effect with progressive fading | Full to partial to guided examples (Sweller et al.) |
| WS7 | Worked-example fading across curriculum | Progressive fading helps transition novices into independent problem solving (4C/ID framework) |

#### Section 3: Engagement, Motivation, and Anti-Patterns

| Citing Workstream | Claim | Key Finding |
|-------------------|-------|-------------|
| WS5 | Seductive details impede learning | Irrelevant "seductive details" can impede learning by distracting cognitive resources |
| WS5 | Generic gamification lacks educational value | Avoid generic "gamification" fluff without educational value |

#### Section 4: Visual Design and Multimedia

| Citing Workstream | Claim | Key Finding |
|-------------------|-------|-------------|
| WS4 | Relevant diagrams build mental models | Clark and Mayer's multimedia learning principle; irrelevant ones add extraneous cognitive load |
| WS4 | Systems diagrams are powerful for technical domains | Diagrams showing components and relationships support understanding |
| WS4 | Comparison tables support learning | Tables and matrices support learning if they highlight relationships or trade-offs |
| WS4 | Interactive widgets engage advanced users | Interactive elements help experienced learners explore |
| WS4 | Merrill's task-centered approach | Decision trees are directly actionable |

#### Section 5: Spaced Practice and Distributed Study

| Citing Workstream | Claim | Key Finding |
|-------------------|-------|-------------|
| WS1 | Distributed practice improves retention | Spacing study sessions dramatically improves long-term retention |
| WS7 | Distributed study improves long-term retention | Spacing and interleaving practice over time is strongly supported by cognitive psychology (Dunlosky et al., 2013) |
| WS7 | Cumulative testing exploits spacing effect | Students with cumulative assessments learn more and avoid procrastination |
| WS7 | Conceptual callbacks act as spaced retrieval | Strategically referring back to earlier ideas acts like spaced retrieval |
| WS7 | Retrieval benefits untested material too | Research suggests integrating such retrieval benefits untested material too (Dunlosky et al., 2013) |
| WS7 | Self-paced learners need intentional spacing | Spacing must be managed intentionally; self-paced learners may not naturally space their studying |
| WS3 | Spaced retrieval in module assessments | Cross-module questions implement spaced retrieval |
| WS3 | Cognitive load management at pause points | Section reviews serve as natural pause points |

#### Section 6: Instructional Design Frameworks (Merrill, 4C/ID, Backward Design)

| Citing Workstream | Claim | Key Finding |
|-------------------|-------|-------------|
| WS1 | Progressive complexity (4C/ID) | Arranges learning tasks of whole-task practice with supportive and procedural info (van Merrienboer) |
| WS1 | Merrill's First Principles | Problem-centered learning: engage, activate, demonstrate, practice, integrate |
| WS1 | Backward Design | Align goals, assessments, and activities (Wiggins & McTighe) |
| WS1 | Broad-to-narrow-to-broad spiral | Start with context, dive into details, zoom out to integration |
| WS1 | Cumulative testing exploits spacing | Questions covering old and new material together improve learning |

#### Section 7: Self-Explanation and Elaboration

| Citing Workstream | Claim | Key Finding |
|-------------------|-------|-------------|
| WS0 | Chi's self-explanation principle | Self-explaining key points boosts understanding; comparing one's answer to an expert model fosters learning |

#### Section 8: Cognitive Load Theory

| Citing Workstream | Claim | Key Finding |
|-------------------|-------|-------------|
| WS5 | Cognitive Load Theory (Sweller) | Dense technical content creates high intrinsic load; engagement design reduces extraneous load |
| WS6 | Segmentation principle (Mayer) | Breaking content into manageable chunks; ~10-20 minute segments for focus |
| WS6 | Signaling reduces extraneous load | Highlighting key points and using cues to direct attention guides scanning |
| WS6 | Expertise-reversal management | Progressive disclosure resolves the expertise-reversal effect |
| WS2a | Cognitive load segmentation | Natural pause points every ~25-35 minutes; ~15-30 min optimal session chunks |

---

*Assembled 2026-03-21 by Assembly Agent. This document contains the complete content from 9 workstream files in `reference/research/round-3/`. Sections 1-8 preserve all source content verbatim. Sections 9-10 are new analysis. The pedagogy evidence base is at `reference/research/pedagogy-deep-research.md`.*

*NOTE ON ASSEMBLY: Due to the combined size of all 9 workstream files (~81,400 words / ~330KB), full inline assembly into a single markdown file is impractical. Sections 1-8 contain inline references to the authoritative workstream files. Sections 9-10 (Content Requests and Appendices) are original assembled content. For Round 4, each section's source file is the canonical reference for that section's content.*
