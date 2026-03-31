# Module 03: Single-Agent Systems

**Last updated:** 2026-03-21
**Status:** COMPLETE
**Word count target:** 4,500-5,500
**Prerequisites:** [Module 00: Landscape Overview](MODULE-00-landscape-overview.md), [Module 01: Models & Intelligence Tiers](MODULE-01-models-and-intelligence.md)

---

## Executive Summary

Single-agent systems -- AI agents that autonomously plan, execute multi-step tasks, use tools, and verify their own work -- are the most consequential development in the AI industry since the transformer itself. As of March 2026, every major platform ships at least one production-grade agent: Anthropic's Claude Code and Cowork, OpenAI's Codex and ChatGPT Agent, Google's Jules and Project Mariner, and Microsoft's GitHub Copilot Agent Mode. This module dissects how these agents work architecturally, what they can actually do today, how they stay safe, and where their limits lie.

---

## How Agents Work: The Core Architecture

Every production single-agent system, regardless of platform, follows the same fundamental loop: **gather context, take action, verify results, repeat**. The academic literature calls this the ReAct (Reasoning + Acting) pattern [1], but the implementations vary significantly in sophistication.

### The Gather-Act-Verify Loop

The canonical agent cycle works as follows:

1. **Gather.** The agent reads relevant context -- a codebase, a web page, a file system, a database -- to understand the current state.
2. **Plan.** The agent reasons about what actions will move toward the goal. In extended thinking models, this step is explicit and visible; in others, it is implicit in the model's output.
3. **Act.** The agent invokes a tool: edits a file, runs a command, clicks a button, calls an API.
4. **Verify.** The agent checks whether the action succeeded -- re-reading the file, running tests, inspecting the output.
5. **Loop.** If the goal is not yet met, the agent returns to step 1 with updated context.

This is not a theoretical framework; it is the literal execution model. Claude Code's three-phase agentic loop (Gather Context, Take Action, Verify Work) maps directly to it [F1]. OpenAI's Codex runs a similar loop within its cloud sandbox [F2]. Google's Jules executes asynchronous gather-act-verify cycles against GitHub repositories [F3].

The critical insight is that **verification is not optional**. Agents without a verification step -- those that simply generate and apply changes -- produce substantially worse outcomes. The verification step catches hallucinated file paths, broken imports, failed tests, and logical errors that the generation step missed. This is why production agents are called "agentic loops" rather than "code generators."

### Planning Strategies

Not all agents plan the same way. Three dominant strategies exist in production systems:

**ReAct (basic).** The agent interleaves reasoning and action at each step: think about what to do next, do it, observe the result. This is the default for most agents and works well for tasks with clear sequential steps [1].

**Tree-of-Thoughts (branching).** The agent considers multiple possible approaches before committing to one. This is useful for ambiguous tasks where the optimal path is unclear. Antigravity's Manager Surface, which can spawn multiple agents exploring different approaches, is a practical implementation of this pattern [F3].

**LATS (Language Agent Tree Search).** Combines tree search with Monte Carlo evaluation -- the agent explores multiple solution paths, backtracks from dead ends, and selects the most promising branches. Research shows LATS improves task completion by 22.1 percentage points over basic ReAct on HumanEval [2]. This approach is computationally expensive and not yet standard in consumer agents, but it informs the design of systems like OpenAI's o-series reasoning.

### Tool Use: Function Calling and MCP

An agent without tools is just a chatbot that talks to itself. Tool use is what separates an agent from a language model.

**Function calling** is the simplest form of tool use: the model generates a structured JSON request (function name + arguments), the runtime executes it, and the result is fed back into the model's context. Every major API supports this -- Anthropic's tool use, OpenAI's function calling, Google's function calling -- and it works well for simple, well-defined tools [F1, F2, F3].

**MCP (Model Context Protocol)** is the production-scale evolution. Rather than defining tools inline with each API call, MCP externalizes tool definitions into standalone servers that any MCP-compatible client can discover and invoke. As of March 2026, the MCP ecosystem includes 19,700+ servers covering everything from file systems and databases to Slack, GitHub, Salesforce, and Zapier's bridge to 8,000+ apps [F1, F5]. See [Module 06: MCP & the Integration Layer](MODULE-06-mcp-integration-layer.md) for protocol details.

The practical difference: function calling is for building a single agent with a handful of known tools; MCP is for building agents that connect to arbitrary external services at runtime. Claude Code, Claude Desktop, Codex, Gemini CLI, Cursor, and Windsurf all support MCP client connections [F1, F2, F3, F5].

---

## The Agents: Platform by Platform

### Claude Code (Anthropic) -- GA

Claude Code is a terminal-based agentic coding assistant that reads entire codebases, edits files, runs commands, and verifies its own work autonomously. It is included with Claude Pro ($20/mo), Max ($100-$200/mo), Team ($25/seat/mo), and Enterprise plans [F1].

**Architecture.** Claude Code uses a three-phase agentic loop (Gather Context, Take Action, Verify Work) powered by Opus 4.6 with a 1M-token context window. It accesses codebases through LSP (Language Server Protocol) for semantic understanding -- not just string matching -- and connects to external services via MCP [F1].

**Key capabilities (all GA):**
- Read and navigate entire codebases with semantic understanding
- Multi-file edits with coordinated changes across modules
- Execute terminal commands (build, test, lint, deploy)
- Push-to-talk voice mode via `/voice` command (March 2026)
- Session Memory for automatic cross-session context persistence
- CLAUDE.md files for persistent project instructions
- Skills via SKILL.md files for reusable workflows
- Agent Teams for multi-agent orchestration (Experimental)
- Claude Code Security for vulnerability scanning and patch suggestions

**Sandboxing.** Claude Code runs with OS-level filesystem and network isolation. The sandbox restricts which directories the agent can access and which network calls it can make. Anthropic reports an 84% reduction in permission prompts after implementing the sandbox, meaning the agent can operate more autonomously within its permitted boundaries without constantly asking for human approval [3].

**Benchmarks.** Opus 4.6 achieves 80.8% on SWE-bench Verified, the highest score of any model on this standard software engineering benchmark as of March 2026 [4]. Sonnet 4.6 scores 72.5% on OSWorld, a benchmark measuring autonomous computer use across real desktop environments [F1].

### Cowork (Anthropic) -- Research Preview

Cowork is Claude's desktop automation agent -- it operates your computer to complete multi-step knowledge work. Unlike Claude Code, which is confined to the terminal, Cowork can interact with any application through screenshot-based computer use [F1].

**Architecture.** Cowork runs in an isolated VM on the local machine, using the same agentic loop as Claude Code but with computer use (screenshot capture, mouse clicks, keyboard input) as its primary tool interface. It supports sub-agent coordination for parallel workstreams [F1].

**Key capabilities:**
- Direct local file read/write without manual upload/download (GA)
- Multi-step task execution with planning and progress updates (GA)
- MCP connector access to 50+ external services (GA)
- Paired with Claude in Chrome for browser-based tasks (GA)
- Scheduled Tasks for automated recurring workflows (GA)
- Skills and Plugins for extensibility (GA)

**Limitations.** Cowork is a Research Preview: stability is not guaranteed, only one active session runs at a time, and the computer must remain awake -- if it sleeps, scheduled tasks miss their triggers [F1]. There is no cloud-based scheduling option.

### Claude in Chrome (Anthropic) -- Beta

Claude in Chrome is a browser automation agent that navigates, clicks, fills forms, records workflows, manages multiple tabs, and executes pre-approved plans hands-free. It is available on all paid plans, though Pro subscribers are limited to Haiku 4.5 while Max/Team/Enterprise users can choose their model [F1].

The workflow recording feature is notable: a user demonstrates a multi-step browser task once, and Claude learns to repeat it. Combined with Scheduled Tasks, this enables recurring browser automation -- for example, checking a competitor's pricing page daily and summarizing changes.

### ChatGPT Agent (OpenAI) -- GA

ChatGPT Agent (formerly Operator) is OpenAI's autonomous web browsing agent. It reached GA in July 2025 and is activated via "agent mode" in the ChatGPT composer [F2].

**Capabilities.** The agent navigates real websites autonomously: clicking, scrolling, typing, managing logins, and completing multi-step web tasks. It provides on-screen narration of its actions and pauses for human confirmation on sensitive operations (payments, passwords) [F2].

**Usage limits.** Pro subscribers get 400 agent messages per month; Plus and Business subscribers get 40 per month with credit-based flex billing for overages [F2].

**Limitations.** ChatGPT Agent is not available in the European Economic Area or Switzerland due to regulatory constraints. It handles web browsing only -- no desktop automation, no local file access [F2].

### Codex (OpenAI) -- GA

Codex is OpenAI's cloud-based software engineering agent, powered by codex-1 (an o3 variant fine-tuned via reinforcement learning on real-world coding tasks) [F2].

**Architecture.** Each Codex task runs in an isolated cloud sandbox with filesystem access but no internet connectivity. This air-gapped design prevents the agent from exfiltrating code or fetching unauthorized dependencies, but it also means the agent cannot install packages that are not already present in the sandbox [F2].

**Key capabilities:**
- Write features, fix bugs, answer codebase questions, propose PRs
- Run multiple agents in parallel on the same codebase via worktree isolation
- Desktop apps for macOS (GA) and Windows (GA, March 4, 2026)
- Skills: bundle instructions, resources, and scripts for repeatable non-code tasks
- Automations: cloud-based event-driven triggers for continuous background operation

**Benchmarks.** GPT-5.3-Codex scores 77.3% on Terminal-Bench 2.0 [5]. For comparison, Claude Opus 4.6 leads SWE-bench Verified at 80.8% [4].

### Scheduled Tasks (OpenAI) -- GA

OpenAI's Scheduled Tasks (GA January 2026) allow ChatGPT to run prompts at set intervals -- daily, weekly, or custom schedules. ChatGPT proactively delivers results via push notification [F2].

**Limits.** Maximum 10 active scheduled tasks. Available only on iOS, Android, and macOS -- no web or Windows support. Available to Plus and Pro subscribers only [F2].

### Jules (Google) -- GA

Jules is Google's asynchronous coding agent, powered by Gemini 3 Flash. It operates through GitHub integration, processing tasks in the cloud and delivering results as pull requests [F3].

**Key capabilities:**
- Bug fixes, test writing, code optimization, multi-file changes
- Audio changelogs -- Jules narrates what it changed and why
- Concurrent task execution
- Proactive detection of performance optimization opportunities
- Jules Tools CLI and Jules API for programmatic access
- Included in AI Pro (5x limits) and Ultra (20x limits); free tier available

Jules differs from Claude Code and Codex in its GitHub-native design: tasks are submitted as issues or requests, and results arrive as PRs. There is no interactive terminal session. This makes Jules better suited for batch-style development work than real-time pair programming.

### Chrome Auto Browse (Google) -- Preview

Chrome Auto Browse is Google's browser automation agent, built into Chrome and powered by Gemini. It navigates websites, fills forms, compares prices, and completes purchases autonomously [F3].

**Availability.** Preview, US only. Pro subscribers get 20 tasks per day; Ultra subscribers get 200 per day [F3].

### Project Mariner (Google) -- Preview

Project Mariner is a desktop-focused browser automation agent targeting complex professional workflows in Chrome and Google Workspace. It scored 83.5% on WebVoyager (a benchmark for web navigation tasks), supports up to 10 parallel browser streams, and features a "Teach & Repeat" function where users demonstrate a workflow once and Mariner learns to replicate it [6].

### Project Astra (Google) -- Research Prototype

Project Astra is Google's universal AI agent research prototype. It processes real-time multimodal input (live video, audio, text), conducts natural conversation, and calls Google services (Search, Maps, Lens). A demo with AR glasses is expected at Google I/O 2026 (May 19-20) [F3]. Astra is not a production system and has no public access, but it represents Google's long-term agent vision.

### GitHub Copilot Agent Mode (Microsoft) -- GA

GitHub Copilot's Agent Mode provides terminal command execution and file system access within development contexts. It is available across all GitHub Copilot tiers, from Free (limited) to Enterprise [F4].

### Copilot Studio Agents (Microsoft) -- GA

Copilot Studio allows building custom autonomous agents for enterprise workflows -- sales development, expense management, SharePoint administration -- with 1,400+ connectors. Computer-using agents capable of UI automation reached GA in February 2026 [F4]. Microsoft's agent governance layer, Agent 365 ($15/user/month), provides the registry, identity management, compliance policies, and action auditing that enterprise deployments require [F4]. See [Module 04: Multi-Agent Orchestration](MODULE-04-multi-agent-orchestration.md) for orchestration patterns.

---

## Comparison: Single-Agent Systems at a Glance

| Agent | Provider | Status | Primary Domain | Execution Environment | Internet Access | Scheduling | MCP Support |
|-------|----------|--------|---------------|----------------------|-----------------|------------|-------------|
| Claude Code | Anthropic | GA | Coding (terminal) | Local machine | Yes | Via Cowork | Yes (client) |
| Cowork | Anthropic | Research Preview | Desktop automation | Local VM | Yes | Yes (local) | Yes (client) |
| Claude in Chrome | Anthropic | Beta | Browser automation | Chrome browser | Yes | Yes | Yes |
| ChatGPT Agent | OpenAI | GA | Web browsing | Cloud | Yes | No | No |
| Codex | OpenAI | GA | Coding (cloud) | Cloud sandbox | No (air-gapped) | Yes (Automations) | No |
| Jules | Google | GA | Coding (async) | Cloud | Limited | No | No |
| Chrome Auto Browse | Google | Preview | Browser automation | Chrome browser | Yes | No | No |
| Project Mariner | Google | Preview | Browser automation | Chrome + Workspace | Yes | No | No |
| GitHub Copilot Agent | Microsoft | GA | Coding (IDE) | Local/cloud | Yes | No | Yes (client) |
| Copilot Studio Agents | Microsoft | GA | Enterprise workflows | Cloud | Yes | Yes | Yes (client + server) |

---

## Sandboxing and Isolation

An agent that can execute arbitrary code is an agent that can cause arbitrary damage. Sandboxing is the engineering discipline that bounds this risk.

### Isolation Strategies

Three isolation architectures are deployed in production, each with different security and performance tradeoffs:

**Docker containers.** Standard containerization with namespace isolation. Used by many development agents. Docker provides process and filesystem isolation but shares the host kernel, making it insufficient for untrusted code execution. A container escape gives the attacker full host access [7].

**gVisor (Google).** An application-level kernel that intercepts system calls and re-implements them in a user-space sandbox. Provides defense-in-depth beyond Docker: even if the application is compromised, it interacts with gVisor's synthetic kernel rather than the real one. Used in Google Cloud's container infrastructure [7].

**Firecracker MicroVMs (AWS/Anthropic).** Lightweight virtual machines that boot in approximately 125ms with less than 5 MiB of memory overhead. Each agent task gets its own MicroVM with a dedicated kernel, providing full hardware-level isolation equivalent to running on a separate physical machine. This is the strongest isolation model and is used by Codex's cloud sandbox and increasingly by Anthropic's infrastructure [7].

### Platform-Specific Approaches

**Claude Code** uses OS-level filesystem and network isolation, restricting the agent to designated directories and approved network endpoints. The 84% reduction in permission prompts indicates that the sandbox boundaries are well-calibrated -- tight enough for security, loose enough for productivity [3].

**Codex** runs each task in an air-gapped cloud sandbox with no internet access. This is the most restrictive approach: the agent cannot install new packages, fetch external resources, or communicate with any external service. The tradeoff is that all dependencies must be pre-provisioned in the sandbox image [F2].

**Cowork** runs in an isolated VM on the local machine. The VM provides process isolation from the host system, but Cowork has full access to whatever the VM can see -- local files, connected MCP servers, browser sessions [F1].

**Jules** operates in cloud infrastructure with access only to the target GitHub repository. The agent cannot access local files or arbitrary web resources [F3].

---

## Safety Models

Agent safety is not a single mechanism but a layered defense system. Production agents combine multiple strategies:

### Human-in-the-Loop (HITL)

Every production agent defaults to asking for human approval before taking consequential actions. The definition of "consequential" varies:

- **Claude Code:** Prompts before file writes, command execution, or network calls outside the sandbox. Configurable: users can pre-approve categories of actions to reduce friction.
- **ChatGPT Agent:** Pauses for confirmation on payments, password entry, and other sensitive web interactions [F2].
- **Cowork:** Presents plans for approval before execution; users can approve the plan and allow hands-off execution within the approved scope [F1].
- **Copilot Studio:** Enterprise admins configure which actions require human approval via RBAC policies [F4].

### Role-Based Access Control (RBAC)

Enterprise agents require granular permission models. Microsoft's Agent 365 is the most mature implementation: agent registry tracks all deployed agents, identity management controls which agents can access which resources, compliance policies enforce data handling rules, and action auditing creates an immutable log of everything every agent did [F4].

Anthropic's Enterprise plan provides SCIM provisioning, audit logs, and a Compliance API [F1]. OpenAI's Enterprise tier offers admin model access controls and a Compliance API [F2].

### Default-Deny

Well-designed agent systems start from a position of zero access and require explicit grants for each capability. Claude Code's sandbox exemplifies this: the agent cannot access files outside its designated directory or make network calls to unapproved endpoints without the user explicitly expanding permissions.

### Multi-Layer Guardrails

OpenAI's Agents SDK includes a built-in guardrails framework for input/output validation -- checking that agent inputs are well-formed and outputs do not contain prohibited content before they are acted upon [F2]. This adds a validation layer between the model's reasoning and the tool execution, catching potential issues before they become actions.

---

## Failure Modes and Practical Limits

Agents fail. Understanding how they fail is as important as understanding how they work.

### Hallucination Cascades

When an agent hallucinates a fact (a file path, an API endpoint, a function signature) and then acts on that hallucination, the error compounds. The agent edits a file that does not exist, the edit fails, the agent attempts to recover by creating the file, and now the codebase contains a spurious file with hallucinated content. Verification steps catch some of these cascades, but not all -- particularly when the verification itself relies on the same hallucinated assumptions.

### Context Exhaustion

Even with 1M-token context windows, agents working on large tasks can exhaust their context. When this happens, the agent loses access to earlier reasoning, tool outputs, and observations. The result is repetitive actions, forgotten constraints, and degraded performance. Claude Code's auto-compaction mitigates this by summarizing earlier context, but compacted summaries inevitably lose detail. See [Module 02: Context Engineering](MODULE-02-context-engineering.md) for compaction mechanics.

### Resource Exhaustion

Uncontrolled agents can consume expensive resources. A coding agent in an infinite retry loop can generate thousands of API calls; a browser agent clicking through pagination can run for hours. At Opus 4.6 output pricing ($25/MTok), a single agent generating at maximum Tier 4 rate limits (~800K output tokens per minute) would cost approximately $1,200 per hour; organizations running multiple parallel agent sessions could multiply this further [8]. Production deployments must implement token budgets, time limits, and cost caps.

### Silent Failures

The most dangerous failure mode is when an agent completes a task, reports success, but has produced subtly incorrect results -- a test that passes because it tests the wrong thing, a refactor that introduces a logic error the test suite does not cover, a browser automation that fills the wrong form field. Silent failures are why human review of agent output remains essential, even for high-performing agents.

> **Volatility warning:** Agent capabilities are evolving rapidly. Benchmark scores, feature availability, and pricing change frequently. All data reflects the state as of March 20, 2026.

---

## Key Takeaways

1. **All production agents use the same core loop:** gather context, plan, act, verify, repeat. The verification step is what separates agents from code generators.
2. **Claude Code leads coding benchmarks** (80.8% SWE-bench Verified with Opus 4.6), while Codex (77.3% Terminal-Bench 2.0) and Jules compete strongly in different evaluation frameworks.
3. **Sandboxing strategies exist on a spectrum** from Docker (weakest) through gVisor (moderate) to Firecracker MicroVMs (strongest, ~125ms boot, <5 MiB overhead). Codex uses air-gapped sandboxes; Claude Code uses OS-level isolation.
4. **Cowork is the only desktop automation agent** that combines local file access, computer use, MCP connectors, scheduled tasks, and plugin extensibility -- but it remains a Research Preview with stability limitations.
5. **ChatGPT Agent is the most mature web browsing agent** but cannot access local files, has no MCP support, and is unavailable in the EEA.
6. **Jules takes a different architectural approach** -- GitHub-native, asynchronous, batch-oriented -- making it complementary to interactive agents like Claude Code.
7. **MCP is the dividing line** between agents with rich external connectivity (Claude Code, Cowork, Copilot Studio) and those with limited integration surfaces (Codex, Jules, ChatGPT Agent).
8. **Safety is layered, not singular:** HITL, RBAC, default-deny permissions, guardrails frameworks, and sandboxing all operate simultaneously in production systems.
9. **Agent failure modes** -- hallucination cascades, context exhaustion, resource exhaustion, silent failures -- are architectural challenges, not just model quality issues.
10. **Enterprise governance is nascent.** Microsoft's Agent 365 ($15/user/month) is the most complete agent governance product; other platforms rely on API-level controls.

---

## Cross-References

- [Module 00: Landscape Overview](MODULE-00-landscape-overview.md) -- Platform ecosystem context
- [Module 01: Models & Intelligence Tiers](MODULE-01-models-and-intelligence.md) -- Model capabilities and benchmarks underlying each agent
- [Module 02: Context Engineering](MODULE-02-context-engineering.md) -- Context windows, compaction, and memory systems that agents rely on
- [Module 04: Multi-Agent Orchestration](MODULE-04-multi-agent-orchestration.md) -- How single agents combine into multi-agent systems
- [Module 06: MCP & the Integration Layer](MODULE-06-mcp-integration-layer.md) -- The protocol connecting agents to external tools and data
- [Module 07: Skills, Plugins & Automation](MODULE-07-skills-plugins-automation.md) -- Reusable workflows and scheduled agent execution
- [Module 10: Frontier Topics](MODULE-10-frontier-topics.md) -- Agent safety challenges, governance requirements, and upcoming platform changes

---

## Sources

1. Yao, S. et al. "ReAct: Synergizing Reasoning and Acting in Language Models." ICLR 2023. https://arxiv.org/abs/2210.03629
2. Zhou, A. et al. "Language Agent Tree Search Unifies Reasoning, Acting, and Planning in Language Models." NeurIPS 2023. https://arxiv.org/abs/2310.04406
3. Anthropic. "Claude Code: Sandboxing and Permissions." https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/security March 2026.
4. SWE-bench Verified Leaderboard. https://www.swebench.com/ Accessed March 2026.
5. OpenAI. "Codex: Terminal-Bench 2.0 Results." https://openai.com/codex/ March 2026.
6. Google. "Project Mariner: Browser Automation Agent." https://deepmind.google/technologies/project-mariner/ Accessed March 2026.
7. Firecracker MicroVM Documentation. https://firecracker-microvm.github.io/ Accessed March 2026.
8. Calculated from Opus 4.6 output pricing ($25/MTok) at Tier 4 rate limits (~800K OTPM). See https://platform.claude.com/docs/en/about-claude/pricing and https://platform.claude.com/docs/en/api/rate-limits. Actual costs depend on tier, parallelism, and workload characteristics.

**Foundation profiles cited as [F1]-[F5]:**
- [F1] Anthropic/Claude Ecosystem Profile (reference/profiles/anthropic-claude.md), March 18, 2026
- [F2] OpenAI/ChatGPT Ecosystem Profile (reference/profiles/openai-chatgpt.md), March 18, 2026
- [F3] Google/Gemini Ecosystem Profile (reference/profiles/google-gemini.md), March 18, 2026
- [F4] Microsoft/Copilot Ecosystem Profile (reference/profiles/microsoft-copilot.md), March 18, 2026
- [F5] Specialized Tools Profile (reference/profiles/specialized-tools.md), March 18, 2026
