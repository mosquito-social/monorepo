---
# monorepo-1wt0
title: Color Scheme Switcher (Light / Dark)
status: completed
type: feature
priority: normal
created_at: 2026-04-18T15:41:33Z
updated_at: 2026-04-18T15:59:33Z
parent: monorepo-5uvk
---

Add a light/dark mode toggle to the app header (far right).

## Requirements

- Use the color scheme switcher component from the mosquito design system
  (packages/mosquito-design-system/theme-toggle.tsx)
- Toggle persists to cookie `colorScheme`
- Respects `prefers-color-scheme` as the default on first visit

## Summary of Changes\n\n- Added  import and component to  (far right of header)\n- Updated  to fall back to  when no cookie is set\n- Updated  to resolve theme from  as default on first visit
