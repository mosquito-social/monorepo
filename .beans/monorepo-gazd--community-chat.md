---
# monorepo-gazd
title: Community Chat
status: completed
type: feature
priority: normal
created_at: 2026-04-18T15:41:29Z
updated_at: 2026-04-18T16:38:13Z
parent: monorepo-5uvk
---

Route: `/community/:slug/chats`

(make sure the link in the navigation points to this path)

Threaded chat interface with channels for a community.

As for all community pages, you should display the navigation on the left and
have enough space for the main content.

Use mock data from user, community and events.

## Layout & Content

The main area consists of a left sub navigation to switch between channels and a
chat space covering the main area (with width constraint).

Channels:

in the channels area display all channels of the community. For the mock, this
would be

- All members
- Organizers (if the user is an admin)
- One for each event the current user is in
- all members (direct messages)

Chat space:

- title fixed on top
- input fixed on bottom
- scrollable dummy threads inbetween

A thread has an optional headline, a main message and threaded answers all from
users (so display mini avatar and name next to it) and with timestamps. If it's
the admin, also display an organizer badge. If it's you, the currently logged in
user, use the primary color.

Just invent the content for now.

## URL Schema

The channel "All members" is the main one. Displayed directly under `.../chats`.

All other channels have an additional id hash like `.../chats/:chatid`

For now, all of these sub pages can display the same content.

## Summary of Changes\n\n- Created  — main #all-members channel page\n- Created  — sub-channel page (organizers, events, DMs)\n- Added  size to Avatar component in mosquito-design-system\n- Fixed sidebar nav link from  to \n- Channel sidebar shows: Channels (all-members, organizers if admin, per-event channels) + Direct Messages (all community members)\n- Chat area: fixed header + scrollable mock threads + fixed input\n- Thread UI: optional headline divider, avatar, name in accent color for current user, Organizer badge for admins, threaded replies with border-l\n- Full-height layout using  to account for sticky header
