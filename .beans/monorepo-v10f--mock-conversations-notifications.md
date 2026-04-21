---
# monorepo-v10f
title: Mock Conversations & Notifications
status: completed
type: task
priority: normal
created_at: 2026-04-21T09:48:57Z
updated_at: 2026-04-21T10:52:07Z
parent: monorepo-0qe8
---

Conversations are currently identical and static. THey should also come from
mocks.

Create functions that return mocks with realistic presets with the following
cases.

- Some conversations are empty. They would be dimmed and sorted further down.
  The show an empty state. No mocks.
- Some conversations have unread. notifications. That should be part of the
  mock.
- 1:1 conversations could be a function where you hand in the participants
  (current user + clicked on user) and otherwise always returns the same - just
  the names would be replaced.
- 1:n conversations should contain an organizer (with the marker) and the logged
  in user. Also some others from that community. (Hand over the characters and
  get the conversation in return).

## Summary of Changes

- Added `ThreadReply`, `Thread`, `Conversation` types to `types/index.ts`
- Created `mocks/conversations.ts` with:
  - `getDmMeta(otherUserId)` / `getChannelMeta(channelId)` — lightweight sidebar metadata (hasContent, unreadCount)
  - `createDmConversation(currentUser, otherUser)` — 1:1 template with real first names woven in; unread preset for 5 specific users
  - `createGroupConversation({ organizer, currentUser, others, communityName, channelType })` — 1:n template for `general` and `organizers` channels
  - `createEventChannelConversation({ ... })` — event channel threads; only returns content for slugs in a preset set, otherwise null
  - `EMPTY_DM_USERS` — 6 user IDs with no DM history (empty state)
  - `POPULATED_EVENT_SLUGS` — 8 event slugs with channel content; all others are empty
- Updated `mocks/index.ts` to re-export all conversation functions
- Rewrote `routes/community/[slug]/chats/[chatid].tsx`:
  - Removed hardcoded `MOCK_THREADS`; all content now comes from factory functions
  - Sidebar: empty channels dimmed + sorted to bottom, unread badge (coloured pill) shown per channel/DM
  - Thread area: shows `EmptyChannelState` component when conversation has no threads
  - `channelMeta` record computed once per community and passed to sidebar
