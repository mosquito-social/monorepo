---
# monorepo-j3ea
title: Community Members Page
status: completed
type: feature
priority: normal
created_at: 2026-04-18T15:41:32Z
updated_at: 2026-04-18T16:54:40Z
parent: monorepo-5uvk
---

Route: `/community/:slug/members`

A list of people who have joined the community.

It's in the context of a community so also here the left vertical nav item
should show up.

## Layout & Content

- Page heading: "Members"
- counter "n members"
- list of member rows, each showing:
  - Avatar
  - Display name
  - Role badge (admin=organizer / member)
  - Join date (also add to mocks)
- Organizers listed first
- Use mock data from the community's `members` array in combinatin with the
  users

In general, admins of communities are called "Organizers" in the UI.

## Summary of Changes\n\n- Added  to  type\n- Updated all mock community members with join dates\n- Created  route with:\n  - CommunitySidebar for left nav\n  - Member count in subtitle\n  - Member rows: avatar (with fallback initials), display name, join date, Organizer badge\n  - Organizers sorted first

## Summary of Changes

- Added joinedAt to Member type
- Updated all mock community members with join dates
- Created members.tsx route with CommunitySidebar, member count, avatar rows with Organizer badge, organizers sorted first
