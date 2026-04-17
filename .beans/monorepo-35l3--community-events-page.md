---
# monorepo-35l3
title: Community Events Page
status: todo
type: feature
created_at: 2026-04-17T14:42:16Z
updated_at: 2026-04-17T14:42:16Z
parent: monorepo-5uvk
---

Route: `/communities/:slug/events`

## Layout & Content

- Two sections: **Upcoming Events** and **Past Events**
- Each event card shows: title, date, location label, brief description snippet
- Primary CTA: "Create Event" – links to `/communities/:slug/new-event`
- Empty state for each section if no events in that category

## Design Assumptions

- Upcoming section comes first and is visually prominent
- Past events are visually de-emphasized (muted colors, smaller cards)
- Event cards link through to the event detail page (`/communities/:slug/event/:id`)
- CTA button is sticky or prominent near the top
- Date display: human-friendly (e.g. "Saturday, May 3 · 7:00 PM")
- Use mock data from shared mock-data module (at least 2 upcoming, 1 past)

## Out of scope

- Filtering or search
- Calendar view
- RSVP actions
