---
status: accepted
date: 2026-02-23
type: architecture
---

# DR-003: Toolchain with Biome and Oxlint

## Context and Problem Statement

A growing monorepo requires consistently formatted code and static analysis to enforce best practices and catch errors early. Traditional tools like ESLint and Prettier can become slow in large codebases.

## Decision

We will adopt [Biome](https://biomejs.dev/) for fast, unified code formatting and [Oxlint](https://oxc-project.github.io/docs/guide/usage/linter.html) for fast static analysis (linting).

## Consequences

- Pre-commit checks and CI validation will execute much faster compared to a typical ESLint + Prettier setup.
- The rule sets might slightly differ from standard ESLint recommended defaults, but performance gains justify this.
