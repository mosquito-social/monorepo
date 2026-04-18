---
# monorepo-1nlj
title: Event Create Page
status: completed
type: feature
priority: normal
created_at: 2026-04-17T14:42:35Z
updated_at: 2026-04-18T15:02:47Z
parent: monorepo-5uvk
---

Route: `/communities/:slug/new-event`

## Layout & Content

The page just as all community pages should have the vertical navigation element
that was previously added to the home page.

The bigger space on the right should be layed out as a creation form with the
following fields:

1. **Title** – text input
2. **Description** – textarea
3. **Date** – date + time picker (native `<input type="datetime-local">` is fine
   for prototype)
4. **Duration** in minutes
5. **Location** – with two ooptions:
   - remote
     - then show a description field
   - place
     - then show a map interaction to pin the location (same as in the create
       community section)
     - but extract the proper address (not only the city)
6. **Agenda** – textarea (plain text for now)

Submit CTA: "Create Event" (no-op)

## Design Assumptions

- Agenda field has a subtle hint text: "List the agenda items, one per line"
- Form is single-column, comfortable reading width (not full viewport)
- Back / cancel link to the community events page

## Out of scope

- Recurring events
- Co-organizers / invitations
- Real form submission

## Summary of Changes\n\nCreated .\n\n- Route at  with CommunitySidebar layout\n- Form fields: Title, Description, Date & Time (datetime-local), Duration (minutes), Location (remote/place toggle), Agenda\n- Location: remote shows a description textarea; place shows a Leaflet map — clicking extracts full address (street, postcode, city) via Nominatim reverse geocode, with editable Venue Name and Address fields\n- "Create Event" CTA is no-op; Cancel/back link goes to community events page
