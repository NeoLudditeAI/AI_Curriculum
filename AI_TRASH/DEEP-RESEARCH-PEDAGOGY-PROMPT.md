# Deep Research Prompt: Modern Pedagogical Science for Technical Curriculum Design

## Context

I am building an 11-module graduate-level curriculum on bleeding-edge AI topics (LLMs, agentic systems, context engineering, MCP, consumer AI platforms, developer APIs). The content is complete — 47,000+ words of verified, deeply sourced material across 11 interconnected modules. I now need to design how this content should be packaged and delivered for maximum learning effectiveness.

**Audience:** Technically sophisticated adults (software engineers, AI power users, tech-savvy professionals) who are motivated self-learners but not domain experts in the specific curriculum topics. Think: a smart colleague who uses AI tools daily but wants to develop structured, deep expertise.

**Format:** Static HTML files (open locally in a browser, no server required). JavaScript is available for interactivity. Canonical content lives in markdown; HTML is a derivative deliverable.

**Constraint:** The module content itself is fixed — the pedagogical design must work *with* the existing content structure, not rewrite it. We're designing the learning experience layer, not changing the underlying material.

## Research questions

I need a comprehensive, evidence-based analysis of the following areas. For each, I need: what the research says, what the practical implications are for this specific project, and concrete implementation recommendations.

### 1. Learning pathway design for interconnected technical content

- How should learners navigate a curriculum where topics are deeply interconnected but have conceptual dependencies? (Our modules are organized by topic domain, but understanding often requires cross-cutting knowledge.)
- What does the research say about **linear vs. non-linear learning paths** for technical material? When is strict sequencing better than learner-directed exploration?
- How should **prerequisites and scaffolding** work in a self-paced digital course? What mechanisms prevent learners from getting in over their heads without being patronizing?
- What is the current evidence on **learning maps / knowledge graphs** as navigation tools? Do visual representations of topic relationships actually improve learning outcomes, or are they just nice to look at?

### 2. Active learning and retrieval practice in digital environments

- What are the most effective forms of **retrieval practice** (active recall) for technical/conceptual material in self-paced digital formats?
- How should **self-assessment checkpoints** be designed — frequency, format, difficulty? What does the research say about placement (end of section? end of module? interleaved?)?
- What is the evidence on **scenario-based learning** and **problem-based learning** for technical domains? How do you design effective scenarios when the material is conceptual (understanding how AI systems work) rather than procedural (writing code)?
- What role should **decision framework exercises** play — exercises where the learner must choose between options (e.g., "which AI platform would you recommend for this use case and why")?
- What does the research say about **worked examples with progressive complexity** (also called "fading worked examples") for building expert-level mental models?

### 3. Engagement and motivation in self-paced technical learning

- What are the evidence-based strategies for maintaining **engagement** in dense, text-heavy technical material without dumbing it down?
- How do **narrative structures** (case studies, real-world stories, historical context) affect learning outcomes in technical domains? Is there a tradeoff between engagement and information density?
- What is the current research on **curiosity-driven learning design** — structuring content to create knowledge gaps that motivate continued reading?
- How should **visual design and typography** support learning in technical content? (Cognitive load theory applied to page layout, use of whitespace, information hierarchy.)
- What are the evidence-based approaches to **progress indicators and completion mechanics** in self-paced courses? Do they help or create perverse incentives?

### 4. Visual and interactive elements for technical comprehension

- What types of **diagrams and visual aids** have the strongest evidence for improving comprehension of technical systems? (Architecture diagrams, flowcharts, comparison matrices, concept maps, ecosystem maps, timelines.)
- What is the research on **interactive vs. static visualizations** for learning? When does interactivity help, and when is it a distraction?
- How should **comparison tables** be designed for maximum learning value (not just reference value)? Our curriculum has extensive platform-vs-platform comparisons.
- What is the evidence on **expandable/progressive disclosure** in digital learning materials — showing summaries first with the option to drill deeper?
- How should **code examples and technical configurations** be presented in a learning context vs. a reference context?

### 5. Spaced repetition and long-term retention

- What are the practical implications of **spaced repetition** research for a self-paced curriculum? Can we design the module structure to naturally create spacing effects?
- How should **review and synthesis moments** be designed between modules to consolidate learning?
- What does the research say about **cumulative assessment** — questions that require integrating knowledge across multiple modules?
- How effective are **concept callbacks** (deliberately referencing earlier concepts in later modules to strengthen connections)?

### 6. Instructional design frameworks applicable to this project

- Which **instructional design frameworks** are most relevant for a graduate-level, self-paced, technical digital course? (e.g., Merrill's First Principles, 4C/ID, ADDIE, Backward Design, Universal Design for Learning)
- What does the research say about the **optimal structure of a learning unit** (module) — how should it begin, what should the middle look like, how should it end?
- How should the **overall course arc** be designed — is there an optimal pattern for a multi-module technical curriculum (e.g., broad→narrow→broad, simple→complex, concrete→abstract)?
- What are the evidence-based approaches to **differentiated learning** within a single curriculum — serving both the expert reader (like me) who wants maximum density AND the motivated-but-newer reader who needs more scaffolding?

### 7. Assessment and feedback in self-study environments

- What types of **self-assessment** work best when there is no instructor? (Multiple choice, open-ended reflection, scenario analysis, compare-your-answer-to-expert-answer?)
- How should **feedback** be delivered in a static HTML environment (no server-side processing)? What can be done with client-side JavaScript alone?
- What is the evidence on **self-explanation prompts** — asking learners to explain concepts in their own words as a learning mechanism?
- How effective are **peer comparison** elements (e.g., "most learners found this concept challenging") in self-paced settings?

### 8. Accessibility and cognitive load management

- How should **cognitive load** be managed in a dense technical curriculum? What are the concrete design patterns for reducing extraneous load while maintaining intrinsic complexity?
- What does the research say about **reading length and session design** — how long should a module take to complete, and how should breaks be structured?
- How should content be designed for **different reading strategies** (linear reading vs. skimming vs. targeted lookup)?
- What are the **accessibility best practices** for interactive educational HTML — keyboard navigation, screen reader compatibility, color contrast, responsive design?

## Output format

For each of the 8 sections above, provide:

1. **Research summary** — What does the evidence actually say? Cite specific studies, meta-analyses, or established frameworks where possible. Distinguish between well-established findings and emerging/contested claims.
2. **Practical implications** — Given our specific project (11-module AI curriculum, graduate-level, self-paced, static HTML), what are the concrete takeaways?
3. **Implementation recommendations** — Specific, actionable design patterns we should adopt. Be concrete: "Use X pattern because Y research shows Z" rather than "consider using active learning techniques."
4. **Anti-patterns to avoid** — What does the research say NOT to do? What are common mistakes in digital technical education?

## What I do NOT need

- General advice about "making content engaging" without evidence backing it
- K-12 or undergraduate pedagogy that doesn't apply to graduate-level adult learners
- Recommendations that require a server, database, LMS, or anything beyond static HTML + JavaScript
- Marketing or sales-oriented "course design" advice (this is not a commercial product)
- AI-specific pedagogy (teaching people how to prompt, etc.) — I need the learning science itself, which we'll apply to our AI content

## Depth expectations

This research will directly inform the instructional design of a serious educational resource. I need graduate-level depth on the pedagogy itself — the same rigor we applied to the AI content. Surface-level "10 tips for online learning" will not be useful. Prioritize meta-analyses, systematic reviews, and established frameworks from learning science researchers (Roediger, Bjork, Sweller, Mayer, Merrill, van Merriënboer, Clark, etc.) over anecdotal best practices.
