# AI_INBOX

Drop files here to share them with the AI agent. Files placed here will be reviewed, processed, and routed to the appropriate location in the project — or moved to AI_TRASH if not immediately useful.

## What to put here

- Agent prompts, system instructions, configuration examples
- Sample files, templates, reference documents
- Research materials, articles, PDFs for the agent to review
- Anything you want the agent to see that isn't core curriculum content

## How it works

1. **You** drop files into this folder
2. **Agent** checks AI_INBOX at the start of every session (and when directed)
3. For each file, the agent will:
   - **Integrate** it into the project (move to reference/, modules/, .claude/, etc.) and note what was done in CURRENT_CYCLE.md
   - **Move to AI_TRASH/** if the file isn't needed right now, with a note explaining why
4. The agent will never silently ignore or delete files from here

## Tips

- Use descriptive filenames — the agent uses the name to understand context
- If a file is urgent or high-priority, mention it in your session prompt
- Multiple files are fine — the agent will process them all
- Subdirectories are fine for organizing related files
