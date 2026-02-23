# Decision Records

This folder tracks the architectural and product decisions made for this repository over time.

## Rules for Agents

- When adding a new decision record, prefix the file name with the next available identifier (e.g., `DR-002`) followed by a kebab-case title: `DR-00X-descriptive-title.md`.
- Each record MUST include the following YAML frontmatter:
  - `status`: proposed | accepted | rejected | superseded | deprecated
  - `date`: YYYY-MM-DD
  - `type`: architecture | product
- Add an entry for the new file in this very index.

## Index of Decisions

- [DR-001: Implement AI Agent Workflow](DR-001-implement-ai-agent-workflow.md)
