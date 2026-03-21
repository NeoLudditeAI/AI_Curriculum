# CLAUDE.md

## Non-negotiables

- Follow AGENT-INIT.md and PROJECT-DESCRIPTION.md.
- Do not restructure modules without a DECISION_LOG.md entry.
- Run verification checks before declaring any module complete.
- All factual claims must be sourced. No hallucinated statistics or dates.

## Verification commands

- Cross-reference check: compare claims against SOURCES.md entries
- Terminology check: validate terms against GLOSSARY.md
- Completeness check: verify all CURRICULUM.md topics are addressed in module
- Consistency check: ensure no contradictions with other completed modules

## Content standards

- Audience: technically sophisticated self-study (assume strong baseline)
- Tone: authoritative, dense, educational — not marketing copy
- Format: living markdown documents; derivative files built from them
- Sources: every non-obvious claim needs a source; prefer primary sources
- Currency: all information must reflect March 2026 state unless historicizing

## Architecture invariants

- modules/ contains one file per module, numbered 00-10+
- reference/profiles/ contains cleaned versions of ecosystem research (no ACD content)
- CURRICULUM.md is the single source of truth for module status
- GLOSSARY.md is the single source of truth for term definitions
- Cross-references between modules use relative links

## Context rules

- This file <=200 lines. Detail goes in .claude/rules/ and docs.
- Read CURRENT_CYCLE.md before starting any session.
- Update CURRENT_CYCLE.md and CURRICULUM.md after every module change.

## Imports

@AGENT-INIT.md
@PROJECT-DESCRIPTION.md
@CURRENT_CYCLE.md
@CURRICULUM.md
