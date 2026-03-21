# DECISION_LOG.md — Append-Only Decision Record

---

## 2026-03-20 — Curriculum structure adopted

**Context:** Project initialized with PROJECT-DESCRIPTION.md defining scope and AGENT-INIT.md defining operational directives.

**Decision:** Adopted the 11-module structure (00–10) as defined in PROJECT-DESCRIPTION.md, with the dependency graph and 4-batch execution order specified therein.

**Rationale:** The module boundaries map cleanly to distinct topic areas with manageable scope (3,000–6,000 words each). The dependency graph allows maximum parallelism while respecting topical prerequisites.

**Alternatives considered:**
- Fewer, larger modules (rejected: harder to parallelize, harder to maintain)
- More granular modules (rejected: overhead of cross-referencing outweighs benefits at this scope)

**Impact:** Sets the curriculum's structural skeleton. All module numbering, cross-references, and execution batches flow from this decision.

---

## 2026-03-20 — Token budget updated for 1M context

**Context:** AGENT-INIT.md was originally written with 200K context budget assumptions. Running on Opus 4.6 with 1M context.

**Decision:** Scaled absolute token numbers in the budget table by 5x. Percentages unchanged.

**Rationale:** 1M context allows significantly more working set capacity, reducing the need for aggressive context management during module writing. Compaction and progressive disclosure principles still apply as safeguards.

**Alternatives considered:** None — straightforward scaling.

**Impact:** More comfortable margins for holding multiple module sections and research results simultaneously.
