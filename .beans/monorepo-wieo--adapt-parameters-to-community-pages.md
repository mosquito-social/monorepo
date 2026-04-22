---
# monorepo-wieo
title: Adapt parameters to community pages
status: completed
type: task
priority: normal
created_at: 2026-04-21T16:13:20Z
updated_at: 2026-04-22T06:16:05Z
parent: monorepo-6ncp
---

Apply the parametric theming system to all community pages so each community can
render with its own theme tokens.

General flow (thinking beyond mocks for context):

- all community meta including settings is fetched asynchronously (from db)
- the parametes are injected already on the server
- especially the chosen font definitions should be there as well.

What to do now:

Make sure a community page communities/:id/\*\* has

- font loading based on its choice (i.e. only the fonts they chose, not the
  others)
- css variable injection through style prop on the page level (affecting all
  styling on the page)
- for now the values come from the mocked communities (just like name etc.)
- make sure SSR is working properly (i.e. the sending is delayed until the
  values are resolved, no client side flickering).

## Summary of Changes

Updated mock community font values to valid FontStackId keys. Created theme-utils.ts with communityThemeToStyle() utility. Created community/[slug].tsx layout that injects CSS variables server-side via style prop and bundles all font stacks. SSR-safe: no client-side flicker for theme tokens.
