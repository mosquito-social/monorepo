---
# monorepo-dtr9
title: Community Create Page
status: completed
type: feature
priority: normal
created_at: 2026-04-17T14:42:29Z
updated_at: 2026-04-18T10:43:32Z
parent: monorepo-5uvk
---

Route: `/new-community`

## Layout & Content

Form with the following fields:

1. **Name** – text input (bigger), a slugified version will automatically be
   created, so show this below as the home url like
   `mosquito.sociaal/communities/my-community`. Make sure slugify transforms
   german umlauts, ß and letters with accents properly.
2. **Description** – textarea
3. **Community Type**: Dropdown with all the options from community-types.ts.
   Should be presented nicely (so use popover instead of generic select.
4. **Visual Details Area** with
   - **Crest** logo of the community in 2:3 (no functionality for now, just a
     default / fallback with a swap / exchange button)
   - **Background** top image of the community in 16:9 also with an exchange
     button
   - **Theme preselect** choose between existing presets coming from
     theme-styles.ts
   - The preselect only prefills the parameters of the theme. THese parameters
     can be tweaked below additionally. When tweaked, the theme select jumps to
     "custom". These variables can be set:
     - primary hue (0-360 slider with a rainbow preview below representing the
       oklch palette)
     - primary font. Dropdown with preview (three fonts for now, Bricolage,
       Helvetica, Georgia, bricolage would be the default)
     - density (slider that sets values from 1.0 to 1.5, but we don't show the
       numbers)
   - The theme is also shown as a preview to see the effect of the changes, but
     also a noop for now. It contains background image on top, Crest placed
     there. Below the title and the description, below some dummy text.

Submit CTA: "Create Community" (no-op for current prototype)

## Design Assumptions

- Create a compact 2 column view. On the left, the settings, on the right the
  visual example. Keep it compact with whitespace around it to make it look like
  an immersive setting.
- Forms: Field labels above inputs (not placeholder-only)
- No inline validation required for prototype
- Back / cancel link to homepage
- Make it a component, we will reuse it later on also in the community settings.

## Out of scope

- Image/logo upload
- Advanced settings (invite links, membership rules)
- Real form submission

## Summary of Changes

Created the community creation page at route `/new-community`.

**New files:**
- `apps/managing-instance/src/routes/new-community.tsx` — route wrapper
- `apps/managing-instance/src/components/community-create-form.tsx` — reusable form component

**What was built:**
- Name field with real-time slugify (handles ä/ö/ü/ß and unicode accents), shows community URL below
- Description textarea
- Community Type popover with rich descriptions for all types from community-types.ts
- Visual Details section:
  - Crest (2:3) and Background (16:9) placeholders with Swap buttons (no-op)
  - Style Preset buttons from theme-styles.ts (selecting a preset prefills hue/font/density; tweaking any marks it 'Custom')
  - Primary Hue 0–360 slider with oklch rainbow gradient preview below
  - Primary Font dropdown with live preview in each font (Bricolage, Helvetica, Georgia)
  - Density slider (compact → spacious, no numbers)
- Live preview panel (right column): applies hue via `--msq-hue-primary` CSS override and selected font-family; shows background, crest, name, description, dummy content
- 2-column layout (lg+), sticky preview panel
- 'Create Community' submit button (no-op), Cancel link back to homepage
