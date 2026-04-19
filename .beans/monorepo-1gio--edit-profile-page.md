---
# monorepo-1gio
title: Edit Profile Page
status: completed
type: feature
priority: normal
created_at: 2026-04-18T18:16:28Z
updated_at: 2026-04-18T18:27:10Z
parent: monorepo-5uvk
---

Route: /edit-profile (current user only)

Two-column layout matching the community create form: form fields on the left,
live profile preview on the right. Same grid ratio: grid-cols-1
lg:grid-cols-[1fr_400px].

## Form Fields (left)

- Avatar: upload/change button with current avatar preview (button can be a noop
  for now)
- First name
- Last name
- Display name (auto-suggested from first + last, but editable)
- Handle / ID / slug (@alice-chen) — editable, shown with @ prefix, validated
  for uniqueness and allowed characters (lowercase alphanumeric + hyphens)
- Bio (optional, short textarea)

## Preview (right, sticky)

Shows the profile card as it would appear — same layout as the profile page
header: avatar, full name, @handle, bio snippet. Updates live as the user types.

## Behaviour

- Save button submits the form (mock only, no real persistence)
- Cancel returns to /profile/{userId}
- The handle field must NOT change the route of the edit page itself
  (/edit-profile stays fixed)

## Summary of Changes\n\nCreated  with:\n- Two-column layout () matching the community create form\n- Form fields: avatar (noop button), first name, last name, display name (auto-suggested), handle (@-prefixed, slugified, with validation), bio (optional)\n- Handle auto-generates from first+last name until the user edits it manually\n- Live preview panel (sticky) showing avatar, full name, @handle, and bio as they update\n- Save (mock, no persistence) and Cancel (navigates back to /profile/{userId})
