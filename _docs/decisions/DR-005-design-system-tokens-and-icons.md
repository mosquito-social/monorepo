---
status: accepted
date: 2026-04-09
type: architecture
---

# DR-005: Design System Tokens and Icons

## Context and Problem Statement

The mosquito.social design system (`packages/mosquito-design-system`) needs two
foundational conventions locked in early:

1. A consistent source for icons that avoids ad-hoc SVG proliferation.
2. A scalable CSS token architecture that supports per-section theming and
   automatic dark mode without an unmanageable number of variables.

## Decision Options Considered

**Icons**

- Create custom inline SVGs as needed.
- Use a third-party icon library (`lucide-solid`).

**Tokens**

- Flat single-level CSS custom properties.
- Multi-step system: small set of core (themeable) variables → derived semantic
  variables.

## Decision Outcome

### Icons

`lucide-solid` is the canonical icon source for all SolidJS components. Custom
SVGs **must not** be created unless `lucide-solid` provides no suitable icon.

### Design Token Architecture (multi-step)

#### Step 1 — Core variables

A minimal set of ~20–30 raw design values, all prefixed `--msq-`. These are the
**only** variables that need to be overridden to re-theme a section or page.

Examples:

```css
--msq-hue-primary: 220;
--msq-hue-accent: 160;
--msq-radius-base: 0.5rem;
```

#### Step 2 — Semantic Tailwind variables

Derived from Step 1 and registered as Tailwind CSS theme variables (e.g. via
`@theme` or `tailwind.config`). Dark mode compatibility is resolved at this
layer — either via a `.dark` selector or `@media (prefers-color-scheme: dark)`.
An intermediate light/dark split step is allowed when the derivation logic is
non-trivial.

Example:

```css
--color-col-border-dimmed: ...;
--color-col-surface-bg-soft: ...;
```

#### Naming schema for semantic color tokens

```
msq-col-{usecase}-{fg|bg}-{soft|dim}
```

- `usecase`: describes what the color is for (e.g. `button`, `copy`, `surface`,
  `border`)
- `fg` / `bg`: optional — differentiates foreground text from background fill
- `strong` / `soft` / `weak`: optional modifiers for reduced-emphasis variants

Examples: `msq-col-button-bg-weak`, `msq-col-surface-bg-soft`,
`msq-col-accent-fg`

## Consequences

- **Positive**: Theming a page section requires changing only the small set of
  `--msq-` core variables. Semantic names communicate intent clearly. Icon
  consistency is enforced by a single dependency.
- **Negative**: Requires discipline to keep Step 1 minimal — resist adding core
  vars that are only used in one place. The derivation layer adds a small amount
  of indirection.
