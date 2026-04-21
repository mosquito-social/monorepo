---
# monorepo-4xgu
title: Mock Events per Community (0–5, max 2 future)
status: completed
type: task
priority: normal
created_at: 2026-04-21T09:48:55Z
updated_at: 2026-04-21T10:42:48Z
parent: monorepo-0qe8
---

Add 0–5 mock events to each of the 9 communities (if they don't have any yet).
At most 2 events per community may be in the future (make sure that they stay
there (consider the current date. The mocks should still work in 2 weeks). Past
events should have realistic dates and attendance data.

## Summary of Changes

- Added `attendees?: User[]` and `maxAttendees?: number` to the `Event` type
- Updated `MOCK_EVENTS` from 4 to 31 events across all 9 communities:
  - frankfurt-js: 3 (kept, added attendees to past event)
  - urban-gardeners-hamburg: 2 (1 kept + 1 new past)
  - climate-action-now: 3 (2 past + 1 future)
  - die-reinhardts: 2 (1 past + 1 future)
  - gracia-neighbours: 4 (2 past + 2 future)
  - barcelona-photo-collective: 3 (2 past + 1 future)
  - el-born-foodies: 3 (1 past + 2 future)
  - edinburgh-creative-guild: 4 (2 past + 2 future)
  - caledonian-fc: 5 (3 past + 2 future)
- All future events dated 2026-05-09 or later (safe past 2026-05-05 cutoff)
- Past events have realistic attendee lists drawn from community members
- Locations include lat/lng for in-person events
