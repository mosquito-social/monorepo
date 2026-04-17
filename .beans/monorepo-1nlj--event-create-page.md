---
# monorepo-1nlj
title: Event Create Page
status: todo
type: feature
created_at: 2026-04-17T14:42:35Z
updated_at: 2026-04-17T14:42:35Z
parent: monorepo-5uvk
---

Route: `/communities/:slug/new-event`

## Layout & Content

Form with the following fields:

1. **Title** – text input
2. **Description** – textarea
3. **Date** – date + time picker (native `<input type="datetime-local">` is fine for prototype)
4. **Location** – combination:
   - Text input for location label/name (e.g. "Rooftop Bar, Berlin")
   - Optional address field
   - Optional: a simple map interaction to pin the location (can be a placeholder/static UI for prototype)
5. **Agenda** – textarea (plain text, one item per line or freeform)

Submit CTA: "Create Event" (no-op or redirect to events list)

## Design Assumptions

- Date + location selectors are the distinctive UI elements here – they should feel purposeful, not generic HTML
- Location section could show a small static map placeholder even without real geocoding
- Agenda field has a subtle hint text: "List the agenda items, one per line"
- Form is single-column, comfortable reading width (not full viewport)
- Back / cancel link to the community events page

## Out of scope

- Real geocoding or map interaction
- Recurring events
- Co-organizers / invitations
- Real form submission
