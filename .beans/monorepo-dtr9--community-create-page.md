---
# monorepo-dtr9
title: Community Create Page
status: todo
type: feature
created_at: 2026-04-17T14:42:29Z
updated_at: 2026-04-17T14:42:29Z
parent: monorepo-5uvk
---

Route: `/new-community`

## Layout & Content

Form with the following fields:

1. **Name** – text input
2. **Description** – textarea
3. **Type** – select/radio: Public, Private, Invite-only
4. **Theme Style** – visual selector (not dark/light toggle): a set of named visual presets shown as swatches or mini preview cards. Suggested styles: Modern, Minimal, Bold, Retro, Soft. User picks one.

Submit CTA: "Create Community" (no-op for prototype, or redirect to a mock community detail page)

## Design Assumptions

- Theme selector is the visual highlight of this form – it should feel like choosing a personality, not a setting. Consider showing a small preview card per style.
- Form layout: single column, generous vertical spacing
- Field labels above inputs (not placeholder-only)
- No inline validation required for prototype
- Back / cancel link to homepage

## Out of scope

- Image/logo upload
- Advanced settings (invite links, membership rules)
- Real form submission
