---
# monorepo-i46c
title: Homepage – Headline, Communities List & CTA
status: completed
type: feature
priority: normal
created_at: 2026-04-17T14:41:57Z
updated_at: 2026-04-17T15:26:31Z
parent: monorepo-5uvk
---

Route: `/`

In general: Nake sure you use the available components from the mosquito design
system package

## Overall layout

Create a Header thatis visible in all pages. It should contain

- logo and app name "MOSQUITO.social" on the left
- a user area on the right. For this pick the first user of the mocks. Round
  avatar.

Avatar is a good candidate for a design system component. So create this in the
design system accepting the user data.

## Layout & Content of the main area

- Large hero headline (the main brand statement for mosquito.social –
  placeholder text for now)
- super and sub headline as well - for all three there is a heading component in
  the design system
- Primary CTA: "Create your own community" – links to `/new-community`
- A grid of community cards. Each card shows: top area: bg image, community
  Logo, below community name, description, member count

## Design Assumptions

- Hero section is full-width, vertically generous – this is the first impression
- Community cards should feel browseable – grid layout on desktop, single column
  on mobile
- CTA is visually prominent (large button, possibly repeated at top and bottom
  of list)
- No auth/login state needed for prototype – treat as public-facing landing page
- Use mock data from the shared mock-data module

## Out of scope

- Search or filtering communities
- Pagination
- Authentication

## Summary of Changes

- Created  component in the design system () — accepts  data, size prop (sm/md/lg), falls back to initials if no avatarUrl
- Exported  from the design system index and package.json exports
- Added  as a direct dependency to the managing-instance app
- Rewired  to use  +  with a  that renders the  on all pages
- Created  component () — logo/app name left, first mock user's avatar + name right
- Created homepage route () — hero section with  (super/main/sub), two CTAs (top and bottom), community cards grid using 
-  shows: bg image with gradient overlay, community logo, name, description, member count
