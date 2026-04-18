---
# monorepo-zty4
title: Community Settings Page – Theme Tweaker
status: completed
type: feature
priority: normal
created_at: 2026-04-17T14:42:10Z
updated_at: 2026-04-18T15:31:49Z
parent: monorepo-5uvk
---

Route: `/communities/:slug/settings`

## Layout & Content

- Page heading: "Community Settings"

Have a general look at the page
apps/managing-instance/src/routes/new-community.tsx, the new community page.

This page should have (for now) the exact same content. Just add the mock data
of the community as a prefill of the form data.

Please optimize. As both pages use the same content, extract it into a shared
component.

## Summary of Changes\n\n- Added  interface to  with optional , , , , , and  props\n- All form fields now initialize from  (with safe fallbacks), so the same component works for both create and settings flows\n- Font IDs that don't exist in the FONTS array (e.g. 'geist', 'lora', 'inter' from mock data) fall back to 'bricolage'\n- Created  — loads community by slug, passes mock data as , sets heading/button labels for the settings context\n- The sidebar already had a "Community Settings" link pointing to this route for admins
