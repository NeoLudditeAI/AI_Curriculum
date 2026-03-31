# WS3: Assessment System Design

**Workstream:** WS3 -- Assessment Framework
**Author:** Assessment Designer
**Date:** 2026-03-21
**Status:** Complete
**Depends on:** WS0 (Component Library), WS1 (Course Architecture), pedagogy-deep-research.md, all 11 modules (M00-M10)

---

## 5.1 Quiz Architecture

### Design Principles

Every assessment in this curriculum serves exactly one purpose: helping the learner consolidate and verify their understanding. There are no grades, no leaderboards, no pass/fail gates. The system uses four quiz types at four granularities, each mapped to a specific pedagogical function grounded in retrieval practice research (Dunlosky et al., 2013; pedagogy-deep-research.md, Section 2).

All quiz types use the Quiz Widget from WS0 (Component 1) with variant-specific configuration. All provide immediate, explanatory feedback. All are client-side JavaScript with state persisted to localStorage.

---

### Type 1: Concept Checks

**Pedagogical function:** Interrupt passive reading with targeted retrieval. Force the learner to recall or apply the concept just presented before moving on. This exploits the testing effect at the point of maximum recency.

| Property | Specification |
|----------|--------------|
| WS0 variant | `concept-check` |
| Placement | After key concepts, approximately every 800-1000 words of body content |
| Question count | 1-2 per instance |
| Question types | Multiple choice (factual recall), or single self-explanation prompt |
| Difficulty | Low to moderate -- tests the concept just presented, not synthesis |
| Feedback depth | Brief: 1-2 sentences confirming the correct answer and explaining why |
| Time to complete | 30-60 seconds |

**Placement rules:**
- Insert after each H3 subsection that introduces a new concept, framework, or comparison table.
- Never place two concept checks within the same H3 subsection.
- Skip placement in sections that are purely introductory (Executive Summary, Prerequisites) or structural (Key Takeaways, Cross-References, Sources).
- In modules with dense comparison tables (M01, M08, M09), place concept checks after the table rather than within it, testing the learner's ability to extract meaning from the data.

**Trigger heuristic:** If a section introduces a term that appears in GLOSSARY.md, or presents a comparison table with 3+ rows, or describes a named architecture/pattern (e.g., gather-act-verify loop, JSON-RPC 2.0 transport), it warrants a concept check.

---

### Type 2: Section Reviews

**Pedagogical function:** Consolidate understanding at the H2 section level. Mix factual recall with application questions to test both surface and deeper processing. These serve as natural pause points aligned with cognitive load management (pedagogy-deep-research.md, Section 8).

| Property | Specification |
|----------|--------------|
| WS0 variant | `section-review` |
| Placement | End of each H2 body section (before the next H2 heading) |
| Question count | 3-5 per instance |
| Question types | Mix of multiple choice (1-2), scenario-based decision (1), and one compare-your-answer or self-explanation prompt |
| Difficulty | Moderate -- requires integrating concepts across the section's subsections |
| Feedback depth | Moderate: explanation of correct answer, why each wrong answer is wrong, source reference (e.g., "[F1]" or "[W42]") |
| Time to complete | 3-5 minutes |

**Placement rules:**
- Every H2 body section gets a section review. Exceptions: Executive Summary, Prerequisites, Key Takeaways, Cross-References, Sources.
- For short H2 sections (under 500 words), merge the section review with the following section's review rather than producing a trivial quiz.
- Section reviews should include at least one question that requires the learner to apply concepts (not just recall facts). For example, "Given X scenario, which approach would you recommend and why?"

**Question composition per section review:**
- 1-2 factual recall (multiple choice)
- 1 application/scenario (multiple choice or compare-your-answer)
- 1 self-explanation prompt (open reflection with expert answer reveal)
- 0-1 additional question at designer's discretion based on section complexity

---

### Type 3: Module Assessments

**Pedagogical function:** Cumulative retrieval across the entire module. Tests integration of concepts across sections. Includes 1-2 cross-module questions that connect to prior modules in the learning sequence, implementing spaced retrieval (pedagogy-deep-research.md, Section 5).

| Property | Specification |
|----------|--------------|
| WS0 variant | `module-assessment` |
| Placement | End of module, after Key Takeaways, before Cross-References |
| Question count | 8-12 per module |
| Question types | Full mix: multiple choice (3-4), scenario-based decisions (2-3), compare-your-answer (1-2), worked-example completion (1), self-explanation (1-2) |
| Difficulty | Moderate to challenging -- requires synthesis across the module plus 1-2 integration questions from prior modules |
| Feedback depth | Full: explanation, why wrong answers are wrong, "review this section" links, cross-module links for integration questions |
| Time to complete | 10-15 minutes |

**Placement rules:**
- Every module gets exactly one module assessment.
- Position after Key Takeaways (so the learner has seen the summary) but before Cross-References and Sources (which are navigational, not content).

**Integration question rules (cross-module):**
- Modules in Part 1 (M00, M01, M02): 0-1 integration questions (limited prior material).
- Modules in Part 2 (M03, M06, M04, M05): 1-2 integration questions drawing from Part 1 concepts.
- Modules in Part 3 (M07, M09): 2 integration questions drawing from Parts 1-2.
- Modules in Part 4 (M08, M10): 2-3 integration questions drawing from all prior Parts.

**Integration question sourcing:** Use the Spiral Summary Matrix from WS1 Section 1.4 to identify which spiral concepts are active in the current module. Integration questions should test a spiral concept at its current depth level while referencing its prior treatment. For example, in M04's module assessment, an integration question might test the gather-act-verify loop (Spiral 2) at the multi-agent coordination depth, requiring recall of the single-agent version from M03.

**Score display:** Module assessments show a cumulative score (e.g., "You answered 8 of 10 correctly") with per-question review. The score is informational, not gating. A "Review suggested" note appears for questions answered incorrectly, with direct links to the relevant section.

---

### Type 4: Cross-Module Synthesis Quizzes

**Pedagogical function:** Cumulative retrieval and integration at Part boundaries. These are the highest-order assessments, testing the learner's ability to synthesize concepts across multiple modules into coherent analysis. Aligned with the four-Part structure from WS1.

| Property | Specification |
|----------|--------------|
| WS0 variant | `module-assessment` (reused with extended configuration) |
| Placement | At the transition between Parts, as standalone assessment pages |
| Question count | 10-15 per synthesis quiz |
| Question types | Scenario-based decisions (4-5), compare-your-answer (3-4), self-explanation (2-3), concept-mapping exercise (1) |
| Difficulty | Challenging -- requires integrating concepts across multiple modules and applying them to novel scenarios |
| Feedback depth | Full: detailed explanations with references back to specific sections in multiple modules |
| Time to complete | 15-25 minutes |

**Placement and scope:**

| Synthesis Quiz | Placement | Modules Covered | Scope |
|----------------|-----------|----------------|-------|
| **Part 1 Synthesis** | After M02, before starting M03 | M00, M01, M02 | The landscape, models, and context engineering. "You know what exists and how it thinks." |
| **Part 2 Synthesis** | After M05, before starting M07 | M03, M06, M04, M05 (plus Part 1 callbacks) | Agent architectures, integration protocols, orchestration, open ecosystem. "You know how agents work." |
| **Part 3 Synthesis** | After M09, before starting M08 | M07, M09 (plus Parts 1-2 callbacks) | Skills, automation, APIs. "You know how to build with these platforms." |
| **Course Capstone** | After M10 (final) | All modules M00-M10 | Full curriculum synthesis. "You can analyze and compare the entire AI landscape." |

**Format:**
- Synthesis quizzes are delivered as standalone HTML pages (e.g., `synthesis-part-1.html`), not embedded within module pages.
- They open with a brief framing paragraph: "This assessment covers the concepts from [Part name]. Take 15-20 minutes. There are no tricks -- every question tests something you have studied."
- The Course Capstone includes a concept-mapping exercise where the learner sketches (mentally or on paper) how 4-5 key concepts connect, then compares against an expert concept map rendered on screen.

---

## 5.2 Question Type Specifications

### Type A: Multiple Choice (Factual Recall and Concept Discrimination)

**When to use:** Testing recognition of specific facts (model names, pricing, protocol details) or discrimination between similar concepts (MCP vs. function calling, orchestration patterns).

**Format:**
- 4 answer choices (occasionally 5 for complex discriminations).
- Exactly one correct answer.
- Distractors are plausible -- they should represent real misconceptions, not absurd options.

**Construction rules:**
- The stem (question text) must be a complete, self-contained question or statement. No "Which of the following..." without context.
- Distractors should reflect common misconceptions or confusion between similar concepts. For example, confusing Anthropic's three-tier caching with OpenAI's automatic caching is a realistic error.
- Avoid "all of the above" or "none of the above."
- Avoid negatively-worded stems ("Which is NOT...") unless testing a specific exclusion that matters (e.g., "Which model does NOT support extended thinking?").

**Feedback template:**
```
CORRECT: [Restate why this answer is correct, citing the specific fact or distinction.]
INCORRECT (per distractor):
  - [Distractor A]: [Why this is wrong. What it actually refers to or where the confusion arises.]
  - [Distractor B]: [Same pattern.]
  - [Distractor C]: [Same pattern.]
```

**Annotation YAML example:**
```yaml
- after: "the-gather-act-verify-loop"
  component: quiz
  variant: concept-check
  data:
    question: "In the canonical agent loop, what happens immediately after the agent takes an action?"
    choices:
      - "It plans its next action"
      - "It verifies the result of the action"
      - "It gathers new context"
      - "It reports to the user"
    correct: 1
    explanation: "The gather-act-verify loop requires verification immediately after action. The agent checks whether the action succeeded (re-reading the file, running tests, inspecting output) before deciding what to do next. Skipping verification is a primary cause of cascading agent errors."
    distractors:
      - "Planning occurs before action, not after. The sequence is gather-plan-act-verify-loop."
      - "Gathering new context happens after verification, when the agent loops back to step 1 with updated state."
      - "Reporting to the user is not a core loop step. Most agent actions occur without user interaction until the task completes or a permission check is needed."
```

---

### Type B: Scenario-Based Decisions

**When to use:** Testing the learner's ability to apply concepts to realistic situations. These are the highest-value questions for this curriculum's audience (technically sophisticated practitioners who need to make informed architectural decisions).

**Format:**
- A scenario paragraph (3-5 sentences) describing a realistic situation: a project requirement, a cost constraint, a technical limitation, a team need.
- A decision question: "Which approach / platform / model / architecture would you recommend?"
- 4 answer choices, each a viable option with different tradeoffs.
- The correct answer is the best choice given the scenario constraints, not the only possible choice.

**Construction rules:**
- Scenarios must be realistic and grounded in the curriculum's content. Reference real model names, real pricing, real features.
- The "correct" answer should be clearly best given the stated constraints, but the feedback should acknowledge that other choices have merits in different contexts.
- Include at least one scenario constraint that makes the decision non-trivial (e.g., budget limit, latency requirement, security requirement, team size).

**Feedback template:**
```
BEST ANSWER: [Explain why this is the best fit for the specific constraints in the scenario.]
WHY NOT:
  - [Option A]: [Acknowledges strengths, explains why the scenario constraints make it suboptimal.]
  - [Option B]: [Same pattern.]
  - [Option C]: [Same pattern.]
KEY PRINCIPLE: [The general decision framework or tradeoff being tested.]
```

**Annotation YAML example:**
```yaml
- after: "pricing-economics"
  component: quiz
  variant: section-review
  data:
    type: scenario
    scenario: "Your team processes 50,000 customer support tickets per day through an AI triage system. Each ticket is 200-500 tokens. The system prompt (2,000 tokens) is identical for every request. Latency is not critical -- tickets can be processed in batches. Your budget is $500/day."
    question: "Which pricing optimization strategy would reduce costs most?"
    choices:
      - "Use GPT-5.4 Nano at $0.20/MTok input"
      - "Use Claude Haiku 4.5 with prompt caching (persistent tier) and Batch API"
      - "Use Gemini 3.1 Flash-Lite at $0.25/MTok input"
      - "Use Claude Sonnet 4.6 with prompt caching (5-minute tier)"
    correct: 1
    explanation: "With 50K identical system prompts per day and no latency requirement, combining Anthropic's persistent prompt caching (90% discount on the 2K-token system prompt) with the Batch API (50% discount on all tokens) yields the deepest discount stack. Haiku 4.5 at $1/MTok base becomes effectively $0.05/MTok for cached input and $2.50/MTok for output after batch discount."
    distractors:
      - "GPT-5.4 Nano has a low base rate but OpenAI's automatic caching offers only 50% discount vs. Anthropic's 90%, and there is no equivalent batch discount stack."
      - "Gemini Flash-Lite is cheap but lacks an explicit prompt caching mechanism comparable to Anthropic's three-tier system for this use case."
      - "Sonnet 4.6 is a strong model but at $3/MTok input is 3x Haiku's cost. For a triage task (classification, not deep reasoning), Haiku's capabilities are sufficient. The 5-minute cache tier also requires re-caching frequently vs. persistent."
```

---

### Type C: Compare-Your-Answer-to-Expert

**When to use:** Testing deeper understanding that cannot be captured in multiple choice. The learner articulates their reasoning, then compares against an expert model answer. Best for "why" questions and evaluative judgments.

**Format:**
- An open-ended question (1-2 sentences).
- A textarea for the learner's response.
- A "Compare with Expert Answer" button (enabled after >= 50 characters typed, per WS0 Component 7).
- An expert answer (3-8 sentences) that models strong analytical reasoning.

**Construction rules:**
- Questions should ask "why," "how," or "evaluate" -- not "what" (which is better served by multiple choice).
- Expert answers should demonstrate the analytical framework, not just state the conclusion. Show the reasoning process.
- Expert answers should acknowledge nuance and tradeoffs where they exist.

**Feedback template:**
```
EXPERT ANSWER: [A complete, well-reasoned response that models the thinking process.]
KEY POINTS TO LOOK FOR IN YOUR ANSWER:
  - [Point 1 the learner should have addressed]
  - [Point 2]
  - [Point 3]
```

---

### Type D: Worked-Example Completion Problems

**When to use:** Teaching procedural knowledge -- how to make a decision, configure a system, or evaluate a set of options. Uses the WS0 Worked-Example Fader (Component 6) with progressive scaffolding removal.

**Format:** Four stages following the fading pattern:

| Stage | WS0 `data-stage` | What is shown | What the learner does |
|-------|-------------------|---------------|----------------------|
| 1. Full worked example | `full` | Complete solution with annotated reasoning at every step | Study the logic; trace each decision |
| 2. Completion problem | `partial` | Solution with 2-3 key steps blanked out | Fill in the missing steps, then reveal full solution to compare |
| 3. Guided problem | `guided` | Problem statement with hints available on request | Attempt independently, use hints if stuck, then compare |
| 4. Independent problem | `independent` | Problem statement only | Solve fully, then compare against expert solution |

**Construction rules:**
- Each worked-example sequence addresses ONE decision type or procedure (e.g., "choosing an orchestration pattern," "designing a prompt caching strategy," "evaluating security posture of an OpenClaw skill").
- The full worked example comes first in the module (or Part). Completion problems appear in later sections or subsequent modules. Guided and independent problems appear in module assessments or synthesis quizzes.
- The blanked-out steps in completion problems should target the highest-value decision points, not mechanical details.

**Placement within the 4C/ID framework:**
- Stage 1 (full) and Stage 2 (partial): Within the module where the concept is introduced.
- Stage 3 (guided): In a subsequent module where the concept recurs at deeper depth (per spiral plan).
- Stage 4 (independent): In module assessments or cross-module synthesis quizzes.

---

### Type E: Self-Explanation Prompts

**When to use:** After presenting an example, diagram, comparison table, or surprising claim. Forces the learner to articulate *why* something works, not just *what* it is. Based on Chi's self-explanation principle (pedagogy-deep-research.md, Section 2).

**Format:**
- Uses WS0 Component 7 (Self-Explanation Prompt).
- A prompt that asks "why" or "explain" (not "what" or "list").
- A textarea for the learner's response.
- An expert answer revealed after the learner has written a substantive response.

**Construction rules:**
- Place after content that the learner might passively accept without deeper processing. Comparison tables, architectural diagrams, and counterintuitive claims are prime targets.
- The prompt should be specific enough to guide the learner's thinking but not so narrow that it has only one sentence as a valid answer.
- Expert answers should add analytical depth beyond what the module text already stated -- reward the learner for engaging with a richer explanation.

---

### Type F: Concept-Mapping Exercises

**When to use:** At Part transitions (synthesis quizzes) and the Course Capstone. Tests the learner's ability to see structural relationships between concepts across modules.

**Format:**
- A prompt listing 4-6 concepts from across the covered modules.
- An instruction: "Sketch (on paper or mentally) how these concepts relate to each other. Draw arrows showing dependencies, influences, or tradeoffs. Then compare your map with the expert version below."
- A "Reveal Expert Map" button that displays an annotated concept map (rendered as an accessible SVG with text descriptions).

**Construction rules:**
- Concepts should span at least 2 modules (and 3+ for the Course Capstone).
- The expert map should include brief annotations on each edge explaining the relationship (e.g., "MCP enables --> agent tool access").
- Provide a text alternative for the concept map: a bulleted list of relationships for screen reader accessibility.
- Limit to 4-6 concepts per exercise to manage cognitive load (pedagogy-deep-research.md, Section 1 notes that complex maps impose high cognitive load).

---

## 5.3 Feedback Design

### Universal Feedback Principles

Every assessment item in the curriculum provides feedback. No exceptions. Feedback serves learning, not evaluation.

**Principles applied across all question types:**

1. **Immediate delivery.** Feedback appears the moment the learner submits an answer or reveals the expert response. No batched feedback at the end of a quiz.
2. **Explanatory, not just evaluative.** "Correct" is necessary but insufficient. Every feedback message explains *why* the answer is correct and, for multiple-choice, *why each wrong answer is wrong*.
3. **Encouraging framing.** Incorrect answers are learning opportunities. Use phrases like "Not quite -- here is the key distinction" rather than "Wrong." For correct answers: "Exactly right" or "Well reasoned."
4. **Concrete references.** Feedback links back to the specific section where the concept was taught, using anchor links (e.g., `module-03.html#the-gather-act-verify-loop`). For cross-module integration questions, link to sections in multiple modules.
5. **No color-only encoding.** Correct/incorrect indicated by icon (checkmark / X) AND color AND text label. Per WS0 anti-pattern rules and WCAG compliance.
6. **Accessible announcement.** Feedback regions use `aria-live="polite"` so screen readers announce results without interrupting the learner's flow.

---

### Feedback Specifications by Question Type

#### Multiple Choice (Type A)

**On submission (before answer reveal):**
- Selected choice highlighted with border emphasis.
- Submit button text changes to "Checking..."

**On correct answer:**
- Selected choice receives `.quiz__choice--correct` class: green border + checkmark icon + "Correct" text badge.
- Feedback region unhidden. Content:
  - "Correct." (bold, green text with checkmark icon)
  - Explanation paragraph (1-3 sentences).
  - Source reference in brackets, e.g., "[Module 01, Anthropic Model Table]".

**On incorrect answer:**
- Selected choice receives `.quiz__choice--incorrect` class: red border + X icon + "Incorrect" text badge.
- Correct choice receives `.quiz__choice--correct` class (revealed).
- Feedback region unhidden. Content:
  - "Not quite." (bold, amber text with arrow icon)
  - "The correct answer is [B]." (with the full text of the correct choice)
  - Explanation of why the correct answer is right (1-2 sentences).
  - Explanation of why the selected answer is wrong (1-2 sentences, specific to the chosen distractor).
  - "Review this concept" link to the relevant module section.

**Implementation note:** Distractor-specific feedback requires storing per-distractor explanations in the annotation YAML. The `distractors` array in the YAML maps positionally to the `choices` array.

---

#### Scenario-Based Decisions (Type B)

**Same visual treatment as multiple choice, plus:**

**On correct answer:**
- Additional "Key principle" callout box below the explanation, summarizing the decision framework the learner just applied (e.g., "When latency is not critical and input is highly repetitive, stacking caching + batch discounts yields the deepest cost reduction.").

**On incorrect answer:**
- "Why your choice is not optimal here" section explains how the scenario constraints specifically disadvantage the chosen option.
- "When your choice WOULD be the best option" section acknowledges that the chosen option has merits in different contexts. This avoids demoralizing learners who made a reasonable-but-suboptimal choice.
- "Review this concept" links to up to 2 relevant sections.

---

#### Compare-Your-Answer-to-Expert (Type C)

**On reveal:**
- Expert answer displayed in a distinct visual container (different background, labeled "Expert Answer").
- Below the expert answer: a "Key Points" checklist (3-4 items). Each item is a checkbox the learner can use to self-assess whether their answer addressed that point.
- Self-assessment checkboxes are informational only -- no scoring.
- No "correct/incorrect" judgment. The learner evaluates the quality of their own reasoning.

---

#### Worked-Example Completion (Type D)

**For completion problems (stage 2):**
- After the learner fills in blanks and clicks "Reveal Complete Solution":
  - The full solution (including the blanked steps) is displayed.
  - Each originally-blanked step is highlighted with a distinct background (amber) so the learner can compare their attempt.
  - No automated scoring of free-text blanks. The learner self-evaluates.

**For guided problems (stage 3):**
- Hints are expandable (accordion pattern). Each hint reveal is tracked in localStorage.
- After reveal: "You used [N] of [M] hints" displayed as informational feedback.
- Full solution displayed for comparison.

**For independent problems (stage 4):**
- No hints available. Solution revealed only after the learner clicks "I have attempted this problem."
- Solution display includes annotated reasoning at every step.

---

#### Self-Explanation Prompts (Type E)

**On reveal:**
- Expert answer appears below the learner's response (both visible simultaneously for comparison).
- No automated scoring.
- Framing text: "Compare your explanation with the expert answer below. Did you identify the key factors?"
- Optional "Key points" checklist (same as Type C) for self-assessment.

---

#### Concept-Mapping Exercises (Type F)

**On reveal:**
- Expert concept map displayed as SVG (with `<title>` and `<desc>` for accessibility).
- Below the SVG: text-only alternative listing each relationship as a bullet.
- Framing text: "Compare your map with the expert version. Look for relationships you missed and any you included that the expert map does not -- both are valuable for deepening your understanding."

---

## 5.4 Difficulty Progression

### Within-Module Progression

Difficulty ramps within each module following a three-tier pattern that maps to 4C/ID task classes:

| Position in module | Task class (4C/ID) | Assessment types | Difficulty level |
|-------------------|--------------------|--------------------|-----------------|
| First third (early H2 sections) | Task Class 1: Recognition | Concept checks (factual recall), full worked examples | Low: identify, recognize, recall |
| Middle third (core H2 sections) | Task Class 2: Application | Section reviews (recall + application mix), completion problems | Moderate: apply, compare, differentiate |
| Final third (synthesis sections + module assessment) | Task Class 3: Analysis | Module assessment (integration, scenario decisions, self-explanation) | Challenging: analyze, evaluate, synthesize |

**Calibration rules:**
- The first concept check in any module should be answerable by someone who has read only the preceding 2-3 paragraphs. It tests immediate recall.
- Section reviews in the middle of the module should require connecting ideas across multiple subsections.
- The module assessment should include at least 2 questions that require reasoning not explicitly stated in the text -- the learner must synthesize from the presented material.

### Across-Module Progression

Difficulty increases across the learning sequence following the Part structure from WS1:

| Part | Modules (learning order) | Baseline difficulty | Rationale |
|------|-------------------------|--------------------|----|
| Part 1: The Terrain | M00, M01, M02 | Low to moderate | Foundational vocabulary and frameworks. Most questions test recognition and basic application. Worked examples are fully scaffolded. |
| Part 2: Agent Systems | M03, M06, M04, M05 | Moderate | Core technical content. Questions shift toward application and scenario-based decisions. Completion problems introduced (fading begins). |
| Part 3: Building & Automating | M07, M09 | Moderate to challenging | Applied knowledge. Scenario questions require integrating prior knowledge with new material. Guided problems (minimal scaffolding). |
| Part 4: Synthesis & Horizon | M08, M10 | Challenging | Synthesis and evaluation. Questions require cross-module reasoning. Independent problems (no scaffolding). Concept-mapping exercises. |

### Worked-Example Fading Schedule

The fading pattern spans the entire curriculum, not just individual modules. This is the primary mechanism for transitioning the learner from guided study to independent analysis.

| Fading stage | Where it appears | Example application |
|-------------|-----------------|---------------------|
| **Full worked example** | Part 1 modules (M00, M01, M02) | Full model selection walkthrough: "Given this task, here is how to choose a model, step by step, with reasoning at each decision point." |
| **Completion problem** | Part 2 modules (M03, M06, M04) | Partial orchestration design: "Here is the scenario and the dependency graph. Steps 1 and 3 are provided. Fill in step 2 (choose the orchestration pattern) and step 4 (assign models to agents)." |
| **Guided problem** | Part 3 modules (M07, M09) and Part 2 late modules (M05) | API pricing optimization with hints available: "Design a cost optimization strategy for this workload. Hints: consider caching tiers, batch processing, model tiering." |
| **Independent problem** | Part 4 modules (M08, M10) and synthesis quizzes | Full platform evaluation: "A startup needs to choose an AI platform. Evaluate their requirements against the four ecosystems. No hints provided. Compare your analysis with the expert evaluation." |

### Module-Specific Difficulty Profiles

| Module | Concept checks | Section reviews | Module assessment | Notes |
|--------|---------------|----------------|-------------------|-------|
| M00 (Landscape) | 4 (low) | 2 (low-mod) | 8 Qs (moderate) | Mostly recognition; tests platform identification and market structure |
| M01 (Models) | 5 (low) | 3 (moderate) | 10 Qs (moderate) | Heavy table reading; tests model comparison and selection |
| M02 (Context Engineering) | 6 (low-mod) | 4 (moderate) | 10 Qs (mod-challenging) | Deepest module; tests caching strategies and RAG architectural decisions |
| M03 (Single Agents) | 5 (moderate) | 3 (moderate) | 10 Qs (moderate) | Tests architectural understanding; first scenario-based decisions |
| M06 (MCP) | 4 (moderate) | 3 (moderate) | 9 Qs (moderate) | Protocol-level knowledge; tests understanding of MCP primitives and adoption |
| M04 (Multi-Agent) | 4 (mod-challenging) | 3 (challenging) | 10 Qs (challenging) | Orchestration pattern selection; multi-agent model allocation |
| M05 (OpenClaw) | 3 (moderate) | 2 (moderate) | 8 Qs (moderate) | Shortest module; tests open vs. closed comparison and security assessment |
| M07 (Skills) | 4 (moderate) | 3 (mod-challenging) | 9 Qs (mod-challenging) | Skills architecture comparison; automation platform selection |
| M09 (APIs) | 4 (mod-challenging) | 3 (challenging) | 10 Qs (challenging) | API design philosophy; pricing economics at depth |
| M08 (Consumer Comparison) | 3 (challenging) | 4 (challenging) | 10 Qs (challenging) | Synthesis module; requires cross-module recall from M00-M07 |
| M10 (Frontier) | 3 (challenging) | 4 (challenging) | 12 Qs (challenging) | Capstone; evaluative and forward-looking questions |

---

## 5.5 Sample Questions

### Module 00: Landscape Overview (Foundation)

**Concept Check -- after "The Four Platform Ecosystems" (H2)**

```yaml
- after: "anthropic-claude"
  component: quiz
  variant: concept-check
  data:
    question: "What is Anthropic's strategic center of gravity, distinguishing it from the other three platform ecosystems?"
    choices:
      - "Consumer scale and creative breadth"
      - "Enterprise autonomy -- Claude as a trusted digital worker"
      - "Ubiquitous integration across devices and surfaces"
      - "Enterprise workflow embedded in existing productivity tools"
    correct: 1
    explanation: "Anthropic positions Claude as a trusted autonomous agent for enterprise use -- acting, not just answering. Consumer scale is OpenAI's center (A). Ubiquitous integration is Google's via Android/Chrome/Workspace (C). Enterprise workflow via existing tools is Microsoft's via M365 (D)."
    distractors:
      - "This describes OpenAI/ChatGPT, which leads with 900M+ weekly active users and the broadest consumer product portfolio."
      - "This describes Google/Gemini, which uniquely runs models at every layer: cloud, browser, on-device, and inside Workspace."
      - "This describes Microsoft/Copilot, which embeds AI into the M365 suite that already runs most enterprise knowledge work."
```

**Section Review -- end of "Specialized Tools" (H2)**

```yaml
- after: "specialized-tools"
  component: quiz
  variant: section-review
  data:
    questions:
      - type: multiple-choice
        question: "Which specialized AI tool occupies the 'research and real-time information' niche in the ecosystem?"
        choices: ["Notion AI", "Perplexity", "ElevenLabs", "Midjourney"]
        correct: 1
        explanation: "Perplexity specializes in AI-powered research with real-time web search, source citation, and a growing Pro subscriber base. Notion AI focuses on workspace productivity (A). ElevenLabs on voice synthesis (C). Midjourney on image generation (D)."
      - type: scenario
        scenario: "A marketing agency needs an AI tool to generate product images on demand, integrate with their design pipeline, and does not need text generation or research capabilities."
        question: "Which specialized tool best fits this use case?"
        choices: ["Perplexity Pro", "Midjourney", "Notion AI", "Otter.ai"]
        correct: 1
        explanation: "Midjourney specializes in image generation and is the leading tool in this niche. Perplexity is for research (A). Notion AI is for workspace productivity (C). Otter.ai is for meeting transcription (D)."
      - type: self-explanation
        prompt: "The module describes five 'key battlegrounds' shaping competition in the AI industry. Choose one and explain why it represents a genuine competitive advantage rather than a commodity feature."
        expert_answer: "MCP adoption is a strong example. While model quality and pricing are converging (all providers approach similar performance at similar costs), the integration protocol layer creates network effects: as more MCP servers are built, platforms that support MCP natively become more valuable. Anthropic's first-mover advantage (they created MCP) gives them ecosystem credibility, but the protocol's open nature means this advantage is contestable. This is a genuine battleground because the winner influences the architecture of the entire agent ecosystem, not just one product."
```

**Module Assessment excerpt (3 of 8 questions):**

```yaml
- after: "key-takeaways"
  component: quiz
  variant: module-assessment
  data:
    questions:
      - type: multiple-choice
        question: "Which company's AI revenue run rate is approximately $19B as of March 2026?"
        choices: ["OpenAI", "Anthropic", "Google (Gemini)", "Microsoft"]
        correct: 1
        explanation: "Anthropic's annualized revenue surged to ~$19B, with ~80% from enterprise customers. OpenAI leads at ~$25B (A). Google does not break out Gemini revenue separately (C). Microsoft reports $13B+ AI run rate (D)."
      - type: scenario
        scenario: "A Fortune 500 company already uses Microsoft 365 for 80,000 employees and wants to add AI capabilities with minimal change management. They need agent capabilities that work within their existing email, documents, and collaboration tools."
        question: "Which platform ecosystem is the strongest fit?"
        choices: ["Anthropic/Claude", "OpenAI/ChatGPT", "Google/Gemini", "Microsoft/Copilot"]
        correct: 3
        explanation: "Microsoft/Copilot embeds AI directly into the M365 tools these 80,000 employees already use daily. Copilot Cowork operates across Outlook, Word, Excel, PowerPoint, and Teams. Agent 365 provides enterprise governance. The key constraint is 'minimal change management' -- no new product adoption required."
      - type: compare-your-answer
        question: "OpenAI has 900M+ weekly active users but is losing web traffic share (87% to 68%). Explain how a company can simultaneously grow absolute user counts while losing relative market share, and what this signals about the competitive landscape."
        expert_answer: "The AI market itself is growing rapidly, so the total addressable user base is expanding. OpenAI's absolute user count grows because new users continue joining, but competitors (especially Gemini, growing from 3.1% to 18.2%) are capturing a disproportionate share of new market entrants. This signals market maturation: the era of ChatGPT as the sole mainstream option is ending. Distribution advantages (Google's Android/Chrome/Workspace integration) and enterprise lock-in (Microsoft's M365 base) are pulling users toward alternatives without requiring them to leave ChatGPT. Many users now use multiple platforms."
        key_points:
          - "Market growth explains why absolute numbers rise while share falls"
          - "Competitors capture new entrants, not necessarily converting existing ChatGPT users"
          - "Distribution advantages (Google) and enterprise lock-in (Microsoft) are key competitive levers"
```

---

### Module 02: Context Engineering (Technical Core)

**Concept Check -- after "The 1M-Token Convergence" (H3)**

```yaml
- after: "the-1m-token-convergence"
  component: quiz
  variant: concept-check
  data:
    question: "Which provider was first to remove long-context surcharges on their 1M-token models?"
    choices: ["OpenAI", "Anthropic", "Google", "Microsoft"]
    correct: 1
    explanation: "Anthropic removed long-context surcharges on March 14, 2026, offering Opus 4.6 and Sonnet 4.6 at standard per-token rates for the full 1M window. Google never charged surcharges for Flash models. OpenAI did not report surcharges on GPT-5.4."
```

**Self-Explanation Prompt -- after "Prompt Caching" comparison table**

```yaml
- after: "prompt-caching-paying-less-for-repeated-context"
  component: self-explanation-prompt
  data:
    prompt: "Anthropic offers a 90% caching discount with explicit, opt-in cache management. OpenAI offers a 50% discount with automatic, transparent caching. Explain why a developer building a high-throughput production system might prefer the more complex (Anthropic) approach over the simpler one."
    expert_answer: "In a high-throughput system, the developer has detailed knowledge of which content is repeated (system prompts, reference documents, few-shot examples) and can engineer cache strategy around those patterns. Anthropic's three cache duration tiers (5-minute, 1-hour, persistent) let the developer match cache lifetime to content volatility -- a static system prompt gets persistent caching, while a frequently-updated reference document gets 1-hour caching. The 90% discount (vs. 50%) compounds at scale: for 100K requests/day with a 4K-token system prompt, the difference between 90% and 50% discount on that cached prefix is substantial. The trade-off is implementation complexity, but at production scale, the ROI on that complexity is clear."
```

**Section Review -- end of "Memory Systems" (H2)**

```yaml
- after: "memory-systems-how-platforms-remember-you"
  component: quiz
  variant: section-review
  data:
    questions:
      - type: multiple-choice
        question: "Which platform's memory system stores information as structured facts in the user profile, automatically extracted from conversations?"
        choices: ["Claude Memory", "ChatGPT Saved Memories", "Gemini Personal Intelligence", "Copilot Recall"]
        correct: 1
        explanation: "ChatGPT Saved Memories automatically extracts structured facts from conversations and stores them in the user profile. Claude Memory stores unstructured markdown notes. Gemini Personal Intelligence draws from Google account data. Copilot Recall captures screen snapshots."
      - type: scenario
        scenario: "A privacy-conscious user wants AI that remembers their preferences across sessions but refuses to have any information leave their device or be processed by cloud servers."
        question: "Which memory architecture comes closest to meeting this requirement?"
        choices:
          - "Claude Memory (stored on Anthropic's servers)"
          - "ChatGPT Saved Memories (stored on OpenAI's servers)"
          - "Copilot Recall (stores screen captures on-device with local semantic index)"
          - "Gemini Personal Intelligence (draws from Google account data)"
        correct: 2
        explanation: "Copilot Recall stores data on the local device using a semantic index, with content never leaving the machine. While it has faced privacy controversies regarding its screen-capture approach, it is architecturally the only major memory system that keeps data on-device. Claude Memory (A) and ChatGPT Memories (B) store on provider servers. Gemini (D) draws from cloud-synced Google account data."
      - type: self-explanation
        prompt: "The four major memory systems take fundamentally different approaches: unstructured notes, structured facts, device-local capture, and account-data integration. Explain why no single approach has emerged as the 'winner' -- what tradeoff does each optimize for?"
        expert_answer: "Each optimizes for a different point in the privacy-capability-convenience tradeoff space. Claude Memory (unstructured notes) optimizes for user control and transparency -- you can see and edit exactly what is stored. ChatGPT Memories (structured facts) optimizes for automatic, effortless personalization at the cost of user opacity (harder to audit). Copilot Recall (on-device capture) optimizes for privacy at the cost of capability (limited to what is on screen, not conversational depth). Gemini Personal Intelligence optimizes for breadth (your entire Google life) at the cost of privacy (deep Google account integration). No winner has emerged because the tradeoffs reflect genuinely different user values, not engineering limitations."
```

**Module Assessment excerpt (3 of 10 questions):**

```yaml
- after: "key-takeaways"
  component: quiz
  variant: module-assessment
  data:
    questions:
      - type: multiple-choice
        question: "In the context of RAG system design, what is the primary purpose of 'chunking' a source document?"
        choices:
          - "To compress the document for faster network transfer"
          - "To split the document into retrievable units that balance semantic coherence with embedding model limits"
          - "To encrypt document sections for security"
          - "To convert the document from one format to another"
        correct: 1
        explanation: "Chunking splits source documents into units suitable for embedding and retrieval. Each chunk must be small enough for the embedding model's context window while maintaining enough semantic coherence to be useful when retrieved. Chunk size is a key architectural decision: too small loses context, too large wastes retrieval precision."
      - type: worked-example-completion
        stage: partial
        problem: "Design a prompt caching strategy for a customer service bot that handles 10,000 requests/day. The system prompt is 3,000 tokens (static). Product catalog context is 15,000 tokens (updated weekly). Each customer message averages 200 tokens."
        steps_shown: [1, 3]
        steps_blanked: [2, 4]
        full_solution:
          - "Step 1: Identify cacheable content. The 3,000-token system prompt is identical for every request -- highest cache value. The 15,000-token product catalog changes weekly -- medium cache value."
          - "Step 2: Choose cache tiers. System prompt: persistent cache (never changes within a deployment). Product catalog: 1-hour cache (refreshed on weekly updates, but stable within the hour for burst traffic)."
          - "Step 3: Calculate cost impact. Without caching: (3,000 + 15,000) * 10,000 = 180M tokens/day at full input rate. With caching: system prompt at 10% rate + catalog at 10% rate for cache hits = effective 90% reduction on 18K tokens per request."
          - "Step 4: Evaluate batch API eligibility. Customer service requires real-time responses, so the Batch API (50% discount, async processing) is NOT suitable for the primary serving path. However, batch processing could be used for end-of-day analytics on the conversation logs."
      - type: scenario
        question_intro: "[INTEGRATION QUESTION -- connects to Module 01]"
        scenario: "You are building a RAG pipeline for legal document analysis. Documents average 50,000 tokens each, and the system must retrieve relevant passages from a corpus of 10,000 documents. Response accuracy is critical. Budget is moderate."
        question: "Which model would you use for the generation step (after retrieval), and why?"
        choices:
          - "Haiku 4.5 -- cheapest option at $1/$5 per MTok"
          - "GPT-5.4 Mini -- good balance of cost ($0.40/$2.00) and capability"
          - "Claude Sonnet 4.6 -- strong reasoning at $3/$15 with 1M context for retrieved passages"
          - "Claude Opus 4.6 -- best reasoning at $5/$25 for legal accuracy"
        correct: 2
        explanation: "For legal document analysis where accuracy is critical and budget is moderate, Sonnet 4.6 provides strong reasoning capability with a 1M-token context window large enough to process substantial retrieved passages. Opus 4.6 (D) would be more accurate but at nearly 2x the cost, which exceeds 'moderate' budget constraints for production scale. Haiku (A) is too weak for accuracy-critical legal work. GPT-5.4 Mini (B) is a reasonable alternative but its context handling differs architecturally -- this is a judgment call that should reference M01's model comparison."
```

---

### Module 08: Consumer AI Comparison (Comparison/Synthesis)

**Concept Check -- after "Core Capability Matrix" table**

```yaml
- after: "core-capability-matrix"
  component: quiz
  variant: concept-check
  data:
    question: "Which is the ONLY platform among the big four that offers built-in video generation as a consumer feature?"
    choices: ["Claude", "ChatGPT (via Sora)", "Gemini (via Flow)", "Copilot"]
    correct: 1
    explanation: "ChatGPT integrates Sora 2 for video generation. Google's Flow exists as a separate creative studio, not directly embedded in the Gemini consumer chat. Claude does not offer video generation. Copilot does not offer it natively."
    distractors:
      - "Claude focuses on text, code, and analysis. No image or video generation capabilities."
      - "Google's Flow merges Whisk, ImageFX, and video generation, but it is a separate product from the Gemini App, not built into the consumer chat interface."
      - "Copilot integrates DALL-E for image generation but does not offer video generation."
```

**Section Review -- end of "Pricing Analysis" (H2)**

```yaml
- after: "pricing-analysis"
  component: quiz
  variant: section-review
  data:
    questions:
      - type: multiple-choice
        question: "At the ~$20/month consumer tier, which platform offers the most generous model access (highest-capability model available for general use)?"
        choices: ["Claude Pro ($20)", "ChatGPT Plus ($20)", "Gemini Advanced ($19.99)", "Copilot Pro ($20)"]
        correct: 0
        explanation: "Claude Pro provides access to Opus 4.6 (the most capable Claude model) at the $20 tier. ChatGPT Plus provides GPT-5.4 access. Gemini Advanced provides Gemini 2.5 Pro access. Copilot Pro provides GPT-4o access (notably a generation behind). However, 'most generous' depends on the metric -- Claude Pro's Opus access is the strongest single-model access at this price point."
      - type: scenario
        scenario: "A graduate student on a tight budget uses AI primarily for research assistance: summarizing papers, finding connections between sources, and generating citations. They use AI 2-3 hours daily and value accuracy over creative features. They have a Google Workspace account through their university."
        question: "Which platform provides the best value for this use case?"
        choices:
          - "Claude Pro ($20/month)"
          - "ChatGPT Plus ($20/month)"
          - "Gemini Advanced (free via university Google Workspace)"
          - "Perplexity Pro ($20/month)"
        correct: 2
        explanation: "If the university provides Google Workspace with Gemini Advanced included, the cost is zero -- making it the clear winner on value. Gemini's Deep Research feature, integration with Google Scholar and Google Docs, and strong summarization capabilities serve the research use case well. Perplexity Pro (D) is strong for research but costs $20/month. Claude Pro (A) is excellent for accuracy but also $20/month. The scenario constraint 'tight budget' plus 'university Google Workspace' makes Gemini the dominant choice."
      - type: compare-your-answer
        question: "ChatGPT has 900M+ weekly active users but only 50M paying subscribers (roughly 5.5% conversion). Claude has ~2% web traffic share but the highest per-session engagement (34.7 minutes). What do these metrics reveal about each platform's relationship with its users, and what does this imply for their long-term business strategies?"
        expert_answer: "ChatGPT's low conversion rate suggests most users engage casually -- quick questions, occasional use -- and do not find the free-to-paid upgrade compelling enough at scale. The massive free user base is an asset for data and brand awareness but a liability if conversion does not improve (server costs scale with users, revenue scales with subscribers). Claude's high engagement-per-session suggests a smaller but more invested user base -- people who have chosen Claude deliberately and use it for deep, sustained work. This implies Anthropic's strategy should focus on increasing its market reach (getting more people to try Claude) while maintaining the depth that retains power users. OpenAI's strategy should focus on conversion (convincing casual users to pay) and retention (stopping the subscription churn visible in the 1.5M March 2026 cancellations)."
        key_points:
          - "Low conversion rate at ChatGPT suggests casual, shallow engagement by most users"
          - "High engagement at Claude suggests deep, intentional use by a smaller committed base"
          - "Different user relationships imply different growth strategies (breadth vs. conversion vs. depth)"
          - "OpenAI's churn problem (1.5M cancellations) suggests the paying users are not fully retained"
```

**Module Assessment excerpt (3 of 10 questions):**

```yaml
- after: "key-takeaways"
  component: quiz
  variant: module-assessment
  data:
    questions:
      - type: scenario
        question_intro: "[INTEGRATION QUESTION -- connects to Module 03]"
        scenario: "A freelance developer uses AI coding tools daily. They value deep code understanding, multi-file refactoring capability, and terminal-based workflow. They already have VS Code and a terminal-centric development setup. Budget: $20/month personal use."
        question: "Which consumer plan and associated coding tool combination is the strongest fit?"
        choices:
          - "ChatGPT Plus + Codex"
          - "Claude Pro + Claude Code"
          - "Gemini Advanced + Antigravity"
          - "Copilot Pro + GitHub Copilot"
        correct: 1
        explanation: "Claude Pro provides access to Opus 4.6, and Claude Code is the leading terminal-based agentic coding tool with $2.5B+ ARR and 54% enterprise coding agent market share. The developer's preference for terminal-based workflow aligns directly with Claude Code's design. Codex (A) is cloud-based, not terminal-native. Antigravity (C) is an IDE, not terminal-based. GitHub Copilot (D) is IDE-integrated, strong for inline completion but less capable for multi-file agentic refactoring."
      - type: self-explanation
        question_intro: "[INTEGRATION QUESTION -- connects to Module 01 and Module 02]"
        prompt: "Module 01 showed that model pricing has converged across providers, and Module 02 showed that caching and context strategies can reduce effective costs by 90%. Given this, explain why consumer subscription pricing ($20/month) has also converged -- is this a coincidence, or does it reflect something structural about the market?"
        expert_answer: "The convergence is structural, not coincidental. Three factors drive it: (1) Model cost convergence means the underlying compute cost per user-session is similar across providers, setting a floor for viable subscription pricing. (2) The $20 price point was established by ChatGPT Plus in early 2023 and became a market anchor -- deviating significantly risks either looking premium (too expensive) or cheap (low quality perception). (3) At scale, $20/month is roughly the break-even point where heavy users (who consume significant compute) are subsidized by light users (who barely use their allocation), making the subscription model sustainable. The interesting deviation is Google's free tier via Workspace -- Google can subsidize AI access because Gemini usage drives engagement with the broader Google ecosystem (Search, Workspace, Cloud), where the real revenue lives."
      - type: multiple-choice
        question_intro: "[INTEGRATION QUESTION -- connects to Module 06]"
        question: "Which statement about MCP support across consumer platforms is most accurate as of March 2026?"
        choices:
          - "All four platforms support MCP at GA level in their consumer products"
          - "Only Anthropic supports MCP; others use proprietary integration methods"
          - "MCP support varies widely: native in Claude, available via integration in ChatGPT, supported in Gemini extensions, and GA in Copilot Studio"
          - "MCP is a developer-only feature not exposed in any consumer product"
        correct: 2
        explanation: "MCP adoption varies significantly by platform. Anthropic built MCP and supports it natively across Claude products. OpenAI added MCP support (initially for Deep Research). Google maps MCP concepts to its extensions framework. Microsoft has GA MCP support in Copilot Studio and Azure Functions. The claim that 'only Anthropic supports MCP' (B) is outdated. Consumer exposure varies -- MCP is most visible in Claude Code and developer tools, but its effects (available integrations) flow through to consumer products."
```

---

### Module 10: Frontier Topics (Synthesis/Capstone)

**Concept Check -- after "On-Device AI" (H2) opening**

```yaml
- after: "google-gemini-nano-and-aicore"
  component: quiz
  variant: concept-check
  data:
    question: "What is the primary user-facing advantage of on-device AI inference over cloud-based inference?"
    choices:
      - "Higher model quality and reasoning capability"
      - "Lower latency, offline availability, and stronger privacy guarantees"
      - "Lower cost per inference"
      - "Larger context window capacity"
    correct: 1
    explanation: "On-device inference delivers latency under 20ms (vs. 200-500ms for cloud), works without internet connectivity, and keeps data on the device. However, on-device models are necessarily smaller and less capable than cloud models (A is wrong). Cost comparison depends on scale (C). Context windows are severely constrained on-device (D is wrong)."
```

**Section Review -- end of "Enterprise Agent Governance" (H2)**

```yaml
- after: "enterprise-agent-governance"
  component: quiz
  variant: section-review
  data:
    questions:
      - type: multiple-choice
        question: "Microsoft's Agent 365 governance framework includes which of the following capabilities?"
        choices:
          - "Open-source agent runtime with local-first deployment"
          - "Centralized permission management, audit logging, and compliance controls for enterprise agents"
          - "On-device model deployment for privacy"
          - "Community-driven skills registry with peer review"
        correct: 1
        explanation: "Agent 365 is Microsoft's enterprise governance control plane for agents, providing permission management, audit trails, and compliance controls. It reaches GA on May 1, 2026 at $15/user/month. Open-source runtime (A) describes OpenClaw. On-device deployment (C) describes Gemini Nano/Apple Intelligence. Community skills registry (D) describes ClawHub."
      - type: scenario
        question_intro: "[INTEGRATION QUESTION -- connects to Module 03, Module 04, Module 05]"
        scenario: "A European bank needs to deploy AI agents for document processing. Requirements: (1) comply with EU AI Act transparency rules, (2) all data must remain within the bank's infrastructure, (3) agents must be auditable with full action logs, (4) the solution must support multi-agent orchestration."
        question: "Which combination of platform and governance approach best addresses all four requirements?"
        choices:
          - "ChatGPT Enterprise with OpenAI's built-in compliance"
          - "OpenClaw self-hosted with NemoClaw enterprise runtime, plus a custom audit logging layer"
          - "Microsoft Copilot Studio with Agent 365 governance on Azure"
          - "Claude for Enterprise with Anthropic's audit logging"
        correct: 1
        explanation: "The requirements for data sovereignty (on-premises), EU AI Act compliance, auditability, and multi-agent orchestration point to OpenClaw + NemoClaw. OpenClaw can be self-hosted entirely on the bank's infrastructure (requirement 2). NemoClaw (NVIDIA's enterprise runtime) adds the governance and orchestration layer. EU AI Act compliance requires a custom audit layer regardless of platform, but self-hosted deployment gives the bank maximum control. Microsoft's option (C) is strong on governance but runs on Azure cloud. ChatGPT Enterprise (A) and Claude Enterprise (D) are cloud-hosted, failing requirement 2."
      - type: self-explanation
        prompt: "The module describes a tension between open and closed AI ecosystems. Drawing on what you learned in Module 05 (OpenClaw) and Module 06 (MCP), explain why MCP's adoption by both open-source (OpenClaw) and closed-platform (Anthropic, OpenAI, Google) ecosystems is significant for the future of this tension."
        expert_answer: "MCP functions as a bridge protocol between the open and closed worlds. For closed platforms, MCP adoption means their agents can access a growing universe of third-party integrations without building bespoke connectors. For OpenClaw and the open ecosystem, MCP compatibility means their agents can use the same tool ecosystem as commercial platforms, reducing the capability gap that drives enterprise buyers toward closed platforms. This is significant because it creates a shared 'integration commons' -- the competitive differentiation shifts from 'what can this agent connect to?' (increasingly the same for everyone) toward 'how well does this agent reason, plan, and execute?' (where model quality and orchestration design matter more). MCP does not resolve the open-vs-closed tension, but it moves the battlefield to higher ground."
      - type: compare-your-answer
        question_intro: "[INTEGRATION QUESTION -- connects to Module 01, Module 08]"
        question: "Google I/O 2026 (May 19-20), WWDC 2026 (June 8-12), and Microsoft Build 2026 (June 2-3) are all approaching. Based on everything you have learned about these companies' strategic positions, model lineups, and competitive dynamics, what is the single most consequential announcement each company could make at their event?"
        expert_answer: "Google: A Gemini 3.1 Pro GA release with demonstrable quality parity to Claude Opus 4.6 and GPT-5.4 on reasoning benchmarks. Google's model quality has consistently been 'close but not quite' at the frontier, and closing this gap would be the most consequential shift because Google already has the distribution advantage -- they lack only the model quality crown. Microsoft: Agent 365 GA with cross-platform agent interoperability (not just Microsoft agents). Microsoft's governance play is strong, but if Agent 365 can govern agents built on any framework (including OpenClaw and Anthropic's Agent SDK), it becomes the de facto enterprise control plane for the entire market. Apple: On-device models that match Gemini Nano's capability while running on Apple Silicon with native integration into Siri, Messages, and Mail. Apple has been silent on AI agents, and entering the space with on-device-first agents would open a privacy-centric market segment that no current player occupies credibly."
        key_points:
          - "Google's biggest lever is model quality (they already have distribution)"
          - "Microsoft's biggest lever is cross-platform governance (not just their own agents)"
          - "Apple's entry into on-device AI agents would create a new market segment"
          - "Each announcement would shift the competitive map in a different dimension"
```

---

### Module Assessment excerpt for M10 (3 of 12 questions):

```yaml
- after: "key-takeaways"
  component: quiz
  variant: module-assessment
  data:
    questions:
      - type: multiple-choice
        question: "According to the 2026 Malwarebytes survey cited in the module, what percentage of respondents do not trust AI with their data?"
        choices: ["50%", "70%", "90%", "95%"]
        correct: 2
        explanation: "The survey found that 90% of respondents do not trust AI with their data, highlighting the strong consumer demand for on-device and privacy-preserving AI solutions."
      - type: scenario
        question_intro: "[INTEGRATION QUESTION -- connects to Module 05]"
        scenario: "An AI startup is building an agent framework. They need to decide between building on OpenClaw (open-source, MIT-licensed, 250K+ GitHub stars) or building a proprietary framework. Their target market is enterprise customers in regulated industries (finance, healthcare)."
        question: "What is the strongest argument AGAINST using OpenClaw as the foundation?"
        choices:
          - "OpenClaw lacks multi-agent orchestration capabilities"
          - "The ClawHub skills registry has a 12-20% malicious skill rate, creating supply-chain security risk for enterprise deployments"
          - "OpenClaw cannot use commercial LLM providers"
          - "OpenClaw's MIT license prevents enterprise use"
        correct: 1
        explanation: "The 12-20% malicious skill rate in ClawHub (documented via ClawHavoc and ClawJacked vulnerabilities in Module 05) is a serious supply-chain security concern for regulated industries. While OpenClaw's core runtime is solid, the ecosystem around it has governance gaps that enterprise compliance teams would flag. OpenClaw does support multi-agent orchestration (A is wrong). It can use any LLM provider (C is wrong). The MIT license explicitly permits commercial use (D is wrong)."
      - type: concept-mapping
        concepts:
          - "On-device inference"
          - "Cloud-based agents"
          - "MCP"
          - "Enterprise governance (Agent 365)"
          - "Open-source (OpenClaw)"
        instruction: "Sketch how these five concepts relate to each other. Consider: what enables what? What constrains what? Where do they compete, and where do they complement?"
        expert_map:
          relationships:
            - from: "Cloud-based agents"
              to: "MCP"
              label: "Cloud agents use MCP for tool access"
            - from: "Open-source (OpenClaw)"
              to: "MCP"
              label: "OpenClaw adopts MCP for tool compatibility"
            - from: "Enterprise governance"
              to: "Cloud-based agents"
              label: "Agent 365 governs agent behavior and permissions"
            - from: "On-device inference"
              to: "Cloud-based agents"
              label: "Competes on privacy and latency; limited on capability"
            - from: "Open-source (OpenClaw)"
              to: "Cloud-based agents"
              label: "Competes on cost and control; limited on polish"
            - from: "Enterprise governance"
              to: "Open-source (OpenClaw)"
              label: "NemoClaw bridges governance gap for OpenClaw in enterprise"
          text_alternative:
            - "Cloud-based agents use MCP for tool access (the protocol delivers external tools to agents)."
            - "OpenClaw also adopts MCP, creating tool compatibility across open and closed ecosystems."
            - "Enterprise governance (Agent 365) wraps around cloud-based agents to control permissions and audit actions."
            - "On-device inference competes with cloud agents on privacy and latency, but is constrained in capability."
            - "OpenClaw competes with cloud platforms on cost and control, but is constrained in polish and security governance."
            - "NemoClaw (NVIDIA) bridges the governance gap, bringing enterprise controls to the OpenClaw ecosystem."
```

---

## Implementation Notes for Downstream Workstreams

### For WS0 (Component Library)
- The annotation YAML schema needs the following extensions beyond the current spec:
  - `questions` array for multi-question quizzes (section reviews and module assessments).
  - `type` field per question (`multiple-choice`, `scenario`, `self-explanation`, `compare-your-answer`, `worked-example-completion`, `concept-mapping`).
  - `distractors` array (parallel to `choices`) for per-distractor feedback on multiple-choice items.
  - `question_intro` field for integration question labels (displayed as a small badge above the question).
  - `key_points` array for compare-your-answer items (rendered as a self-assessment checklist).
  - `stage`, `steps_shown`, `steps_blanked`, and `full_solution` fields for worked-example-completion items.
  - `concepts`, `instruction`, `expert_map.relationships`, and `expert_map.text_alternative` fields for concept-mapping items.
- The concept-mapping expert map renderer needs to produce an accessible SVG with `<title>`, `<desc>`, and linked `aria-describedby` pointing to the text alternative.

### For WS2 (Module Designers)
- Each module's annotation file should contain approximately:
  - 3-6 concept checks (one per key concept/table)
  - 2-4 section reviews (one per H2 body section)
  - 1 module assessment (8-12 questions)
- Concept check placement should be mapped to specific section IDs once module content is finalized.
- Integration questions in module assessments should reference the spiral concepts active in that module (per the Spiral Summary Matrix in WS1).

### For WS4 (Visual Strategist)
- Concept-mapping exercise expert maps should follow the same visual language as the course map (WS1 Section 1.3) -- rounded rectangle nodes, labeled edges, Part-based color coding.
- Synthesis quiz pages need their own page template (similar to module pages but without sidebar TOC -- replaced with quiz progress indicator).

### For WS6 (Layout / Accessibility)
- Module assessments with 8-12 questions should be paginated (3-4 questions per "page" within the assessment) to prevent overwhelming scroll length. Use internal pagination (JS-controlled show/hide), not separate HTML pages.
- Synthesis quizzes (10-15 questions) should use the same pagination approach.
- All question types must meet the keyboard navigation and screen reader behavior specifications in WS0.

---

## Assessment Inventory Summary

| Assessment Type | Count per Module | Total across 11 Modules | Total Items |
|----------------|-----------------|------------------------|-------------|
| Concept checks | 3-6 | 44-66 (est. 48) | 48-96 questions |
| Section reviews | 2-4 | 22-44 (est. 34) | 102-170 questions |
| Module assessments | 1 | 11 | 88-132 questions |
| Cross-module synthesis quizzes | -- | 4 (Part boundaries + Capstone) | 40-60 questions |
| **Total** | -- | **~97 assessment instances** | **~280-460 questions** |

Estimated authoring effort: 40-60 hours of assessment design to produce approximately 350 questions with full feedback, distractor explanations, and cross-module integration questions. The sample questions in Section 5.5 serve as calibration exemplars for the authoring team -- they demonstrate the expected quality, depth, and format for each question type.
