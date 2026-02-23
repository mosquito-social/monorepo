# Decision Records

This folder tracks the architectural and product decisions made for this repository over time.

## Rules for Agents

- When adding a new decision record, prefix the file name with the next available identifier in the format `DR-NNN-name-in-kebab-case.md`.
- Each record MUST include the following YAML frontmatter:
  - `status`: proposed | accepted | rejected | superseded | deprecated
  - `date`: YYYY-MM-DD
  - `type`: architecture | product
- Add an entry for the new file in this very index.

## Index of Decisions

- [DR-001: Implement AI Agent Workflow](DR-001-implement-ai-agent-workflow.md)
- [DR-002: Setup Monorepo and Bun](DR-002-setup-monorepo-bun.md)
- [DR-003: Toolchain with Biome and Oxlint](DR-003-toolchain-biome-oxlint.md)
