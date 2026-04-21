---
# monorepo-0blq
title: Local Assets Folder – Crests & Community Images
status: completed
type: task
priority: normal
created_at: 2026-04-21T09:48:59Z
updated_at: 2026-04-21T10:23:37Z
parent: monorepo-0qe8
---

Set up a local assets (/public/mock-assets) folder structure for community
crests and cover images.

- Placeholder SVG crests per community type.
- Decide on naming convention and wire up mock data references.

Add all existing footage in there already.

## Summary of Changes

- Created `/public/mock-assets/crests/` with 9 type-based placeholder SVG crests (type-family, type-neighbourhood, type-friends, type-hobby, type-club, type-fan-community, type-workplace, type-professional, type-alumni)
- Copied existing 3 community-specific crests (frankfurt-js, urban-gardeners-hamburg, climate-action-now) into `/public/mock-assets/crests/`
- Created `/public/mock-assets/covers/` with gradient SVG placeholder cover images for all 3 communities
- Updated `src/mocks/communities.ts` to reference local paths (`/mock-assets/crests/` and `/mock-assets/covers/`) instead of Unsplash URLs and `/logos/`
- Naming convention: `/mock-assets/crests/{slug}.svg` (community-specific), `/mock-assets/crests/type-{type}.svg` (type fallback), `/mock-assets/covers/{slug}.svg`
