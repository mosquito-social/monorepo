# Mosquito Social Monorepo

This repo will contain several artefacts of the Mosquito Social project.

- The Discovery Instance (DI)
- The Managing Instance (MI)
- The Documentation Hub

Other applications might be added later.

## AI Agent Workflow (for Engineers)

We have set up a customized workflow for our AI coding assistants (like
Antigravity and Claude sub-agents). When you want an agent to handle an issue,
keep the following rules in mind:

### How to Assign Tasks

1. **Planning**: Create a GitHub issue for the task. Label the issue with
   `Plan`. The AI will read the issue and draft a technical plan, adding it as a
   comment starting with the headline `# Plan, Rev X`.
2. **Reviewing the Plan**: Review the AI's plan. If it needs adjustments, reply
   in the comments of the issue. The AI will revise the plan and post a new
   comment starting with `# Plan, Rev <X+1>`.
3. **Execution**: Once you are satisfied with the proposed plan, change the
   issue label to `Ready`. Ping the AI referencing the ticket (e.g., using the
   `/issue 1` slash command).
   - In `Ready` mode, the AI will branch off, implement the changes, and create
     a Pull Request.
   - The AI follows Conventional Commits natively.
   - Branches follow the format `<ticket-number>-<shortname>`.
   - PRs are prefixed with `[Agent]` and follow a descriptive template,
     including instructions on how to test the change.
4. **Code Review and Merging**: You can perform a normal code review on the
   created PR. Add review comments if necessary, and ask the AI to address them
   on its branch. Once everything looks good, an engineer must manually merge
   the PR to the `main` branch. The AI itself is strictly forbidden from merging
   to `main`.

## Deployment (Coolify)

Apps in this monorepo are deployed using Coolify via the root `Dockerfile`. The
Dockerfile is multi-stage and handles the monorepo dependencies and workspace
setup.

To deploy an app (e.g., `dev-blog` or `under-construction`):

1. In Coolify, create a new resource and connect it to this GitHub repository.
2. For the **Build Pack**, specify **Docker**.
3. Point the Dockerfile location to `/Dockerfile` (the root).
4. **Crucial Step**: In the Coolify environment configuration for the
   deployment, you MUST add a **Build Argument**:
   - Key: `APP_NAME`
   - Value: The folder name of the app in `apps/` (e.g., `under-construction`).

This ensures the Dockerfile builds the exact application you are targeting.
