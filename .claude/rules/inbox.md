---
paths:
  - 'AI_INBOX/**'
  - 'AI_TRASH/**'
---

# AI_INBOX / AI_TRASH collaboration system

## AI_INBOX processing rules

- Check AI_INBOX/ at the start of every session and whenever the user directs
- For each file found, decide: **integrate** into the project or **move to AI_TRASH/**
- When integrating: move or copy the file to the appropriate project location (reference/, .claude/, modules/, etc.). Note what was done in CURRENT_CYCLE.md.
- When trashing: move the file to AI_TRASH/ and update the manifest table in AI_TRASH/README.md with: filename, source (AI_INBOX), date, reason for trashing
- Never silently ignore files in AI_INBOX — every file must be processed and accounted for
- Never delete files from AI_INBOX without processing them first
- If unsure where a file belongs, ask the user

## AI_TRASH rules

- AI_TRASH is a staging area, NOT a permanent deletion
- Files here are reviewed periodically with the user before being archived, restored, or deleted
- Maintain the manifest table in AI_TRASH/README.md
- Never empty AI_TRASH without explicit human confirmation
- When reviewing with user, present each file with: name, why it was trashed, recommended action (archive/restore/delete)
