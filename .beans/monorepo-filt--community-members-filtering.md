---
# monorepo-filt
title: Community Members Page — Member Filtering
status: completed
type: feature
priority: normal
created_at: 2026-04-21T10:30:58Z
updated_at: 2026-04-21T10:30:58Z
parent: monorepo-j3ea
---

Route: `/community/:slug/members`

Add a filter bar to the Community Members page so users can narrow the member list by name, role, and join date. All filters use existing data fields — no schema changes required.

## Filter criteria

| Filter | Input type | Field(s) |
|---|---|---|
| Name search | Text input (debounced) | `user.firstName`, `user.lastName`, `user.displayName` — case-insensitive substring |
| Role | Dropdown | `member.role` — options: All, Organizer, Member |
| Joined date range | From / To date inputs | `member.joinedAt` — inclusive range |

All active filters are ANDed together. Clearing a filter shows all members again.

## UI behaviour

- Filter bar appears above the members list, below the page header
- Reactive member count ("X members") updates as filters change
- Empty state: "No members match your filters" when the filtered list is empty
- Existing sort (organizers first) is applied after filtering
- Filter state is local component state (no URL persistence)

## Tasks

- [x] Build `MemberFilterBar` component with name search, role dropdown, and joined date range inputs
- [x] Wire filter state into `CommunityMembersPage` — derive filtered list with `createMemo`
- [x] Update the member count to reflect the filtered result
- [x] Add empty state when no members match
- [x] Smoke-test: verify each filter works independently and in combination

## Summary of Changes

All changes are in `apps/managing-instance/src/routes/community/[slug]/members.tsx`:

- Added `MemberFilterBar` component with three controlled inputs: debounced text search, role `<select>`, and from/to `<input type="date">` fields
- Added four signals (`rawNameQuery`, `nameQuery`, `roleFilter`, `dateFrom`, `dateTo`) to `CommunityMembersPage`; name debounce is wired via `createEffect` + `onCleanup` (300ms)
- Replaced `sortedMembers` memo with `filteredMembers` that applies all three filters (ANDed) then sorts organizers first; date comparison uses ISO string to avoid timezone issues
- Member count subtitle now reads from `filteredMembers().length`
- Empty state ("No members match your filters") shown via `<Show>` fallback when filtered list is empty

PR: https://github.com/mosquito-social/monorepo/pull/58

## Out of scope

- Adding new fields (company, age) to the data model — separate feature
- Persisting filter state to the URL or local storage
- Server-side / paginated filtering
