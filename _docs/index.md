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

## Design System

The mosquito.social design system lives in `packages/mosquito-design-system`. See [DR-005](decisions/DR-005-design-system-tokens-and-icons.md) for the full rationale.

Key rules:
- **Icons**: Use `lucide-solid`. Do not create custom SVGs unless the library has no suitable icon.
- **Tokens – Step 1 (core)**: ~20–30 raw variables prefixed `--msq-` (e.g. `--msq-hue-primary`). Override these to re-theme a section or page.
- **Tokens – Step 2 (semantic)**: Tailwind CSS variables derived from Step 1. Dark mode is resolved here. Naming schema: `msq-col-{usecase}-{fg|bg}-{soft|dim}` (e.g. `msq-col-border-dimmed`, `msq-col-surface-bg-soft`).

## Conventions

- **File Naming**: ALL files have to follow the alpha-numeric-kebab-case pattern. They have no capital letters and words are separated with a `-`.
