# Documentation Index

Welcome to the documentation for this repository. This directory (`_docs/`) serves as the single source of truth for all agents and engineers.

## Core Structure

- **[Decisions](decisions/DECISION_INDEX.md)**: Product and architecture decisions.

All agents (Antigravity, Claude, etc.) must refer to this index and its sub-documents for context, constraints, and instructions on how to operate within this repository.

## Workspace Structure

This repo is a monorepo setup using [Bun Workspaces](https://bun.sh/docs/install/workspaces). The main directories are:

- `apps/`: Contains the deployable applications.
- `packages/`: Contains reusable library packages.

## Run Scripts

The following scripts are available in the root `package.json` to ease daily development tasks:

- `bun run check:ts`: Type-checks all TypeScript files without emitting any outputs.
- `bun run check:format`: Verifies formatting using Biome.
- `bun run check:lint`: Analyzes code dynamically for issues using Oxlint.
- `bun run check:all`: Runs TS check, Format check, and Lint check continuously.
