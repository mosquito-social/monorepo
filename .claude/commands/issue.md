---
description: Handle a GitHub issue following the prescribed ticket lifecycle (Plan → Ready → PR).
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, Task, WebFetch
argument-hint: <issue-number>
---

# Issue Workflow

Handle GitHub issue $ARGUMENTS by strictly following this process:

1. **Check Ticket Status**: Inspect the issue:
   ```
   gh issue view $ARGUMENTS --json labels,title,body,comments
   ```
   Understand its current state before doing anything else.

2. **Planning Phase (Label: `Plan`)**:
   - If the issue has the `Plan` label, you are in planning mode.
   - Read the entire issue description and all comments.
   - Draft a complete technical plan. **Do NOT keep this plan locally in files.**
   - Write the plan as a new comment on the GitHub issue.
   - The comment MUST start with `# Plan, Rev X` (X = revision number, start at 1, increment from previous plan comments).
   - Wait for the user/supervisor to review the plan.

3. **Implementation Phase (Label: `Ready`)**:
   - If the issue has the `Ready` label, the plan is approved — begin implementing.
   - **Branching**: Create and switch to a new branch: `<ticket-number>-<short-descriptive-name>` (e.g. `51-homepage`).
   - Implement the changes based on the approved plan.
   - **Committing**: Use Conventional Commits (`feat: ...`, `fix: ...`, etc.).
   - **Pull Request**: Push the branch and create a PR.
     - Title MUST start with `[Agent]`, include the ticket number, and be descriptive.
     - Description MUST include testing instructions and `Resolves #$ARGUMENTS`.

4. **Addressing Reviews**:
   - If there are review comments on the PR, address the feedback, then commit and push to the same branch.

5. **Merging Restrictions**:
   - NEVER commit directly to the main branch or merge the PR. A human engineer handles the final merge.
