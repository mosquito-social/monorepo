---
# monorepo-filt
title: Community Members Page — Member Filtering
status: in-progress
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
- [ ] Smoke-test: verify each filter works independently and in combination

## Out of scope

- Adding new fields (company, age) to the data model — separate feature
- Persisting filter state to the URL or local storage
- Server-side / paginated filtering
