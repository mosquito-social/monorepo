---
# monorepo-2v4l
title: Community Detail Page
status: completed
type: feature
priority: normal
created_at: 2026-04-17T14:42:04Z
updated_at: 2026-04-18T14:18:52Z
parent: monorepo-5uvk
---

Route: `/communities/:slug`

This page is supposed to be the landing page for communities.

## Data

If the slug fits to one of the mocked communities, display the content using the
mock data. If not, display a not found message, set status to 404, and add a cta
to go back to the homepage.

## Layout & Content

Think of a full screen layout, so we go a slightly different route than others.
No need to think of a mobile adaptation yet.

On the left, there's a navigation bar/column. It's a box with fixed width (md in
tailwind)that has a layout similar to the community card on the homepage. With
...

- background
- crest
- title
- description

Then there's the main state

- If the current user is NOT a member/admin yet, show a Ask to Join button
- If the user is member, show nothing
- If the user is admin show "Organizer" badge.

Below that there are the navigation items (links).

- Home (this page)
- Events
- Members
- Chat

In case the user is admin, show an additional item "Community Settings"

---

On the right (the main area), display a two column layout (this part has a max
width constraint).

Left: Posts - a typical stream of scial media posts. Use arbitrary data
including:

- text only messages
- announcement (text message with special style)
- image
- link with open graph data

Right: Upcoming events (list that links to the event detail page). Pull the data
from the event mocks. If there is no event, display a muted empty state.
Otherwise, show the list with:

- calendar leaf of the designated date
- title
- description
- location Label only

## Out of scope

- Join / Leave actions (buton does nothing)

## Summary of Changes

Created :

- Full-screen layout with fixed left sidebar (w-80) and scrollable main area
- Left sidebar: community bg image, crest/logo, title, description
- Membership state: "Ask to Join" button (non-member), "Organizer" Tag badge (admin), nothing (member)
- Sidebar navigation: Home, Events, Members, Chat — plus "Community Settings" for admins
- 404 fallback with CTA back to homepage when slug doesn't match
- Main area two-column grid: posts stream (left) and upcoming events (right)
- Post types implemented: text, announcement (accent-tinted box), image, link with OG card
- Events sidebar: CalendarLeaf component with month/day, title, description, location label; muted empty state when no events
- Current user hardcoded to Alice (admin of frankfurt-js) for prototype purposes
