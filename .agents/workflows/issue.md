---
description: Handle a GitHub issue and follow the prescribed ticket lifecycle and git workflow.
---

# Issue Workflow

When the user invokes this workflow via `/issue <number>`, you must strictly follow this process to manage and implement the ticket.

1. **Check Ticket Status**: First, inspect the issue using the GitHub CLI (e.g., `gh issue view <number> --json labels,title,body,comments` or equivalent tools) to understand its current state.

2. **Planning Phase (Label: `Plan`)**:
   - If the issue has the `Plan` label, you are in planning mode.
   - Read the entire issue description and all the conversation/comments.
   - Draft a complete technical plan to solve the issue. **Do NOT keep this plan locally in files.**
   - Write the plan as a new comment on the GitHub issue.
   - The comment MUST start with the headline `# Plan, Rev X`, where X is the revision number (start with `1` and increment it based on previous plan comments).
   - Wait for the user/supervisor to review the plan.

3. **Implementation Phase (Label: `Ready`)**:
   - If the issue has the `Ready` label, the supervisor has approved the plan and you must begin implementing.
   - **Branching**: Create and switch to a new branch. The branch name MUST follow the format: `<ticket-number>-<short-descriptive-name>` (e.g. `1-agent-setup`).
   - Implement the actual code changes base on the approved plan.
   - **Committing**: Commit the changes to your branch. Your commit messages MUST adhere to **Conventional Commits** (e.g., `feat: ...`, `fix: ...`).
   - **Pull Request**: Push the branch and create a PR.
     - The PR title MUST start with `[Agent]`, include the ticket number, and have a descriptive title (e.g. `[Agent] #1 Setup agent workflow`).
     - The PR description MUST include detailed instructions on how to test the change, and MUST link the ticket properly so it auto-closes (e.g., `Resolves #1`).

4. **Addressing Reviews**:
   - If the user or supervisor leaves Review comments on the PR, read the comments, address the feedback by updating the code, and commit/push the fixes to the same branch.

5. **Merging Restrictions**:
   - IMPORTANT: You must **NEVER** commit directly to the main branch or merge the PR yourself, even if you technically have the rights to do so. A human engineer will always handle the final merge.
