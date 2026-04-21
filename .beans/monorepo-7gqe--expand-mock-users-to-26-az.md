---
# monorepo-7gqe
title: Expand Mock Users to 26 (A–Z)
status: completed
type: task
priority: normal
created_at: 2026-04-21T09:48:50Z
updated_at: 2026-04-21T10:36:15Z
parent: monorepo-0qe8
---

We should have 26 mock users in sum, one per letter of the alphabet.

Each with a realistic name, avatar placeholder, bio, location across Europe.

We will build up 3 core european areas to make it realistic: Hamburg, Barcelona,
Edinburgh. Make sure they're placed around those regions.

Also make sure that they are added to communties and events. Make some of them
event organizers.

## Summary of Changes

- Added `bio?: string` and `location?: string` to the `User` type in `types/index.ts`
- Expanded `MOCK_USERS` from 7 to 26, one per letter A–Z
- Regional split: Hamburg (A, D, E, H, K, N, S, U, W = 9), Barcelona (B, F, J, L, O, P, R, V, X = 9), Edinburgh (C, G, I, M, Q, T, Y, Z = 8)
- Each user has a realistic name, dicebear avatar URL, short bio, and location
