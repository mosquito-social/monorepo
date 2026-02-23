---
status: accepted
date: 2026-02-23
type: architecture
---

# DR-002: Setup Monorepo and Bun

## Context and Problem Statement

We need a flexible project structure that can accommodate multiple applications and packages while sharing a unified toolchain and common dependencies.

## Decision

We will use a Monorepo setup structured into `apps/*` and `packages/*`. To manage dependencies efficiently and to run TypeScript out of the box without complex intermediate build steps during development, we will use [Bun](https://bun.sh/).

## Consequences

- Dependency management and scripts execution will be significantly faster.
- We rely on Bun's specific workspaces setup.
- Any CI system or external tooling must support Bun or have it installed.
