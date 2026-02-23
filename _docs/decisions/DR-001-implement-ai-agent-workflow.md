---
status: accepted
date: 2026-02-23
type: architecture
---

# DR-001: Implement AI Agent Workflow

## Context and Problem Statement

We need a robust, standardized way to assign and oversee tasks performed by AI agents (e.g., Antigravity, Claude) in this monorepo to ensure the agents don't break things, and that engineering oversight is maintained securely.

## Decision Options Considered

- Ad-hoc assignment to agents directly.
- Standardized git-flow process driven by GitHub Issues.

## Decision Outcome

We accepted the **Standardized git-flow process driven by GitHub Issues**.
Instead of assigning tasks arbitrarily, all assignments will pass through a GitHub issue planning phase using explicit labels (`Plan`, `Ready`), which the AI must read and respond to via comments (writing a "Plan, Rev X"). Actual execution requires branching, PR creation prefixed with `[Agent]`, and conventional commits. Agents are unconditionally barred from merging directly to `main`.

## Consequences

- **Positive**: Strict human-in-the-loop review ensures high-quality contributions and avoids rogue system changes. Uniformity allows multiple AI systems to adhere to the same workflow safely.
- **Negative**: Adds a slight overhead by requiring label toggles (`Plan` -> `Ready`) before execution can begin.
