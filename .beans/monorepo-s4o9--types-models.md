---
# monorepo-s4o9
title: Types & Models
status: completed
type: task
priority: normal
created_at: 2026-04-17T14:41:51Z
updated_at: 2026-04-17T15:10:21Z
parent: monorepo-5uvk
---

Define all TypeScript types and models used across the prototype. No backend
wiring yet – these serve as the shape contract. Location:
`apps/managing-instance/src/types`

## Types to define

- `Community { id, slug, name, bgImageUrl, logoUrl, description, type: key of CommunityType , theme: CommunityTheme, members: Member[] }`
- `CommunityType`: static configuration with slug as key, name and description
- `CommunityTheme { style: ThemeBaseStyle, primaryHue: number, font: FontOption, spacing: number }`
- `ThemeBaseStyle`: static configuration with slug as key, name and description
- `User { id, displayName, firstName, lastName, email,  avatarUrl? }`
- `Member { user: User, role?: MemberRole }`
- `MemberRole` – admin | member
- `Event { id, slug, communityId, title, description, location: EventLocation, agenda: string, date: Date, durationInMinutes: number, status: EventStatus }`
- `EventLocation { label: string, address?: string, lat?: number, lng?: number }`

## Configuration

Create a `config/` folder with files for all static data (community type and
Theme).

## Mock data

Create a `mocks/` folder with files for at least 3 communities, 7 Users that
spread over the communities, and 0 , 1 and 3 events (mix of upcoming/past)
assigned to the communities.

## Assumptions

- All IDs are strings (UUID for events or slugs for events and users)
- No Zod or runtime validation needed at this stage

## Summary of Changes\n\nCreated all TypeScript types and models in :\n\n- **** – All core interfaces and type aliases: , , , , , , , , , , \n- **** –  record (professional, hobby, local, learning, activist)\n- **** –  record (minimal, bold, warm, glass)\n- **** – Re-exports\n- **** – 7 mock users spread across communities\n- **** – 3 communities (berlin-js, urban-gardeners-hamburg, climate-action-now)\n- **** – berlin-js: 3 events (2 upcoming + 1 past), urban-gardeners: 1 upcoming, climate-action: 0 events\n- **** – Re-exports
