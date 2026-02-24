# Product Decision Record: Design System Theme & Colors

## Context

We need a unified approach to implement dark mode, light mode, and a base color palette across our three applications (`dev-blog`, `discovery-instance`, `managing-instance`). The goal is to avoid code duplication and rely on a single source of truth for the baseline design tokens.

## Decision

We will implement all design tokens in the `mosquito-design-system` package.

1. **Color Space**: All colors will be defined strictly in `oklch`. This ensures uniform perceptual brightness and is natively supported by modern browsers.
2. **Light / Dark Mode**:
   - The primary theme switch will utilize the native CSS `light-dark()` function, coupled with `color-scheme: light dark`.
   - On the client side, user preferences can be persisted via a `colorScheme` cookie.
   - A piece of FOUC-prevention JS will run in the `<head>` of our apps, checking the cookie and applying a `.dark` or `.light` class to the `<html>` root element. This in turn will toggle the document's `color-scheme` via CSS overrides.
3. **Tailwind Processing**:
   - The design system will export a `theme.css` block containing Tailwind 4 `@theme` mappings, effectively wiring up CSS variables like `--color-cb-0` into classes `bg-cb-0`, `text-cb-0` etc.

## Starting Palette

Our baseline palette consists of semantic layer-based backgrounds (e.g. `cb-10`, `cb-20`, `cb-30`), foreground texts (e.g. `cf-10`, `cf-20`), white/black, and accent colors centered around `hue 10` (primary) and `hue 170` (secondary).

This palette acts as a placeholder or v1 schema until a holistic brand identity and design system is delivered by designers.
