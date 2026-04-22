---
# monorepo-kukt
title: Switch font stacks
status: completed
type: task
priority: normal
created_at: 2026-04-21T16:13:20Z
updated_at: 2026-04-21T17:08:45Z
parent: monorepo-6ncp
---

We will add a more detailed font selection to the community creation form.
Additionally we will make the fonts available locally via fontsource.

## Part 1

We have a selection of 8 different font pairings and scale adaptations. Store
them indexed by ID together with a displayed name in a file in the config folder
including the needed packages on font source.

e.g. `{ "elegance": { display: '"Shippori Mincho", serif;', ...} }`

These are the selected font stacks:

```json
{
  "mono-signal": {
    "name": "Mono Signal",
    "signature": "\"Share Tech Mono\", monospace",
    "main": "\"IBM Plex Sans\", sans-serif",
    "mono": "\"IBM Plex Mono\", monospace",
    "fontsource": [
      "@fontsource/share-tech-mono",
      "@fontsource/ibm-plex-sans",
      "@fontsource/ibm-plex-mono"
    ]
  },
  "condensed": {
    "name": "Condensed",
    "signature": "\"Barlow Condensed\", sans-serif",
    "main": "\"Barlow\", sans-serif",
    "mono": "\"JetBrains Mono\", monospace",
    "fontsource": [
      "@fontsource/barlow-condensed",
      "@fontsource/barlow",
      "@fontsource-variable/jetbrains-mono"
    ]
  },
  "editorial": {
    "name": "Editorial",
    "signature": "\"DM Serif Display\", serif",
    "main": "\"DM Sans\", sans-serif",
    "mono": "\"DM Mono\", monospace",
    "fontsource": [
      "@fontsource/dm-serif-display",
      "@fontsource/dm-sans",
      "@fontsource/dm-mono"
    ]
  },
  "precision": {
    "name": "Precision",
    "signature": "\"Shippori Mincho\", serif",
    "main": "\"Noto Sans JP\", sans-serif",
    "mono": "\"Noto Sans Mono\", monospace",
    "fontsource": [
      "@fontsource/shippori-mincho",
      "@fontsource/noto-sans-jp",
      "@fontsource/noto-sans-mono"
    ]
  },
  "craft": {
    "name": "Craft",
    "signature": "\"Fraunces\", serif",
    "main": "\"Source Sans 3\", sans-serif",
    "mono": "\"Source Code Pro\", monospace",
    "fontsource": [
      "@fontsource-variable/fraunces",
      "@fontsource-variable/source-sans-3",
      "@fontsource-variable/source-code-pro"
    ]
  },
  "canvas": {
    "name": "Canvas",
    "signature": "\"Syne\", sans-serif",
    "main": "\"Plus Jakarta Sans\", sans-serif",
    "mono": "\"Commit Mono\", monospace",
    "fontsource": [
      "@fontsource/syne",
      "@fontsource/plus-jakarta-sans",
      "@fontsource/commit-mono"
    ]
  },
  "dispatch": {
    "name": "Dispatch",
    "signature": "\"Bebas Neue\", sans-serif",
    "main": "\"Work Sans\", sans-serif",
    "mono": "\"JetBrains Mono\", monospace",
    "fontsource": [
      "@fontsource/bebas-neue",
      "@fontsource/work-sans",
      "@fontsource-variable/jetbrains-mono"
    ]
  },

  "platform": {
    "name": "Mosquito",
    "signature": "\"Bricolage Grotesque\", sans-serif",
    "main": "\"Source Sans 3\", sans-serif",
    "mono": "\"Source Code Pro\", monospace",
    "fontsource": [
      "@fontsource-variable/bricolage-grotesque",
      "@fontsource-variable/source-sans-3",
      "@fontsource-variable/source-code-pro"
    ]
  },
  "default": {
    "name": "Default",
    "signature": "\"Plus Jakarta Sans\", sans-serif",
    "main": "\"Plus Jakarta Sans\", sans-serif",
    "mono": "\"JetBrains Mono\", monospace",
    "fontsource": [
      "@fontsource/plus-jakarta-sans",
      "@fontsource-variable/jetbrains-mono"
    ]
  }
}
```

## Part 2

Load all of the fonts in the Community Creation Form. Exchange the "Primary
Font" dropdown with a "Font Stack" dropdown. Consisting of

- Name (small)
- Signature Font: FontName (2rem)
- Body Font: FontName (1rem) using the right font for both.

make `Default` the standard.

Also adapt the preview in the community create form as follows:

Inject the variables via style attribute and have the content elements pick it
up via tailwind (font-fam-msq, font-fam-main or font-fam-mono)

```
--dsp-font-signature: ...;
--dsp-font-main: ...;
--dsp-font-mono: ...;
```

Also add some more dummy text (a h3, a p and a monospaced word inside the p).

## Part 3

On all other pages load the fontsource definitions of "platform" (which is our
bricolage standard). Please also make sure that the google font loading is
removed from the main layout.

## Summary of Changes\n\n- Created  with 9 font stacks (mono-signal, condensed, editorial, precision, craft, canvas, dispatch, platform, default)\n- Exported , , and  from config/index.ts\n- Installed all 21 fontsource packages in managing-instance\n- Replaced old 3-font  array +  type with new  config\n- Updated font dropdown to show: stack name (small), signature font at 2rem, body font at 1rem\n- Updated preview to inject , ,  CSS variables; content uses , ,  Tailwind classes\n- Added h3 + p with monospaced inline element to preview dummy text\n- Imported platform fontsource packages in  (Bricolage Grotesque, Source Sans 3, Source Code Pro)\n- Removed Google Fonts links from \n- Updated THEME_PRESETS to use new FontStackId values
