---
# monorepo-2v4l
title: Community Detail Page
status: todo
type: feature
created_at: 2026-04-17T14:42:04Z
updated_at: 2026-04-17T14:42:04Z
parent: monorepo-5uvk
---

Route: `/communities/:slug`

## Layout & Content

- Community headline (name + optional tagline)
- Community description
- Member list: avatar (or initials fallback), name, role badge
- Community type badge (e.g. Public, Private)
- Navigation to sub-pages: Settings, Events (tab bar or sidebar nav)

## Design Assumptions

- Page is fully self-contained – for prototype purposes the content is the same regardless of slug (wired to mock data)
- Member list is compact but visually distinct – cards or a roster-style list
- Theme of the community (primaryHue, font, spacing) should visually influence the page – this is a key prototype goal
- Mobile: stacked layout; Desktop: possible sidebar with community meta on the left

## Out of scope

- Join / Leave actions
- Real slug-based routing to distinct communities (single mock community is fine)
- Pagination of members
