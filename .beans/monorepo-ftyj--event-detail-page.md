---
# monorepo-ftyj
title: Event Detail Page
status: completed
type: feature
priority: normal
created_at: 2026-04-17T14:42:21Z
updated_at: 2026-04-18T15:22:38Z
parent: monorepo-5uvk
---

Route: `/communities/:slug/event/:id`

## Data

Pull the data from the event mocks based on the id from the URL.

If there is no data, show an empty state with a button that links back to the
community events page. And send a 404.

## Layout & Content

The page just as all community pages should have the vertical navigation element
that was previously added to the home page.

The general layout in the content area should additionaly be two column.

On the left:

- title
- description
- agenda

On the right (fixed width, smaller column) - Quick overview:

- Call to action / status
  - at the moment just generally add the button "Ask to join" if the event is in
    the future
  - "past event" in grey when it's in the past
- Repeat the title
- Date next to the title as a calendar card just like in the other views
- below: Start Time | Duration | End Time (calculated)
- Location (as a map with a pin on the given location / geo coordinates) - se
  also implementation on the other pages
- Label of the location
- Address below

## Design Assumptions

- This is a content-rich page – generous typography, clear visual hierarchy
- Agenda section uses a visually distinct block (e.g. numbered list,
  timeline-style, or bordered section) – wired to a single mock event

## Out of scope

- RSVP / attendance
- Edit event inline
- Comments or discussion

## Summary of Changes

Created :

- Route:  (matches links from events list page)
- Looks up community by slug and event by slug; shows 404 empty state with back link if either not found
- Uses  for left nav
- Two-column layout: left = title, description, agenda; right = overview card
- Agenda rendered as numbered timeline lines (parses  format)
- Right column: CTA ("Ask to Join" if upcoming / "Past event" if past), calendar card, Start/Duration/End time grid, OpenStreetMap iframe embed when coords present, location label + address
