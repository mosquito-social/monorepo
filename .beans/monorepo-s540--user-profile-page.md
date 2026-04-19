---
# monorepo-s540
title: User Profile Page
status: completed
type: feature
priority: normal
created_at: 2026-04-18T15:41:32Z
updated_at: 2026-04-18T18:10:33Z
parent: monorepo-5uvk
---

Route: `/profile/:userId` (or `/profile` for the current user)

Profile page of a user listing their communities and roles.

## Layout & Content

- Header: avatar, firstName, lastName, id in small below with an @ e.g.
  `@alice-chen`, firstName, lastName in small below
- Section: "Communities" — rows for each community the user belongs to, showing
  - logo (crest)
  - Name
  - Role if admin (then show the Badge "Organizer")
  - right aligned joined at with readable absolute date formatting.

Use the data from the mocks combining users and communities.

## Special case

if the user is the logged in user. Display an edit CTA button. Points to the URL
`/edit-profile` (you can only edit your own profile and it should not interfere
with the handle/id/slug of the user).

## Summary of Changes\n\nCreated  with avatar header, community membership list (with Organizer badge), and Edit profile CTA for the current user. Added  that redirects to the current user's profile. Linked the header avatar to the current user's profile page.
