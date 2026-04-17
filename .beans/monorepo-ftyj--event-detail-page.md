---
# monorepo-ftyj
title: Event Detail Page
status: todo
type: feature
created_at: 2026-04-17T14:42:21Z
updated_at: 2026-04-17T14:42:21Z
parent: monorepo-5uvk
---

Route: `/communities/:slug/event/:id`

## Layout & Content

- Event title (large, prominent)
- Date & time (formatted, human-readable)
- Location block:
  - Location label + address
  - Embedded map (static map image or iframe – e.g. OpenStreetMap embed using lat/lng from mock data)
- Description (longer text, can be rich paragraph)
- Agenda (plain text or simple structured list)
- Back link to events list

## Design Assumptions

- This is a content-rich page – generous typography, clear visual hierarchy
- Map embed is a nice-to-have but should at minimum show the location label + address clearly; a static map placeholder is fine for prototype
- Agenda section uses a visually distinct block (e.g. numbered list, timeline-style, or bordered section)
- Mobile: all sections stack vertically; map takes full width
- Content is independent of the actual `:id` – wired to a single mock event

## Out of scope

- RSVP / attendance
- Edit event inline
- Comments or discussion
