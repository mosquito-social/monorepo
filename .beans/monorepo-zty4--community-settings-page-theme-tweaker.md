---
# monorepo-zty4
title: Community Settings Page – Theme Tweaker
status: todo
type: feature
created_at: 2026-04-17T14:42:10Z
updated_at: 2026-04-17T14:42:10Z
parent: monorepo-5uvk
---

Route: `/communities/:slug/settings`

## Layout & Content

- Page heading: "Community Settings" (or "Theme")
- Three theme controls:
  1. **Primary Hue** – horizontal slider (0–360), shows a color swatch preview
  2. **Font** – dropdown with named options (e.g. Sans, Serif, Mono, Rounded)
  3. **Spacing** – horizontal slider (compact → spacious, e.g. 0–100)
- Live preview: changes should reflect immediately in the UI (local state, not persisted)
- Save button (no-op for prototype, can show a toast)

## Design Assumptions

- This is a key "wow" screen – the live preview should be visually satisfying
- The preview could be a miniature mockup of the community page or just the current page re-styled in place
- Hue slider should show a gradient track (full spectrum) with a thumb
- Spacing slider affects padding/gap in the preview component
- Controls are clearly labeled with current value shown (e.g. "Hue: 220°")

## Out of scope

- Persisting settings to backend
- Other settings (name, description edits, member management)
