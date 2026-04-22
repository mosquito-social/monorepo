---
# monorepo-dxew
title: Font scaling
status: completed
type: task
priority: normal
created_at: 2026-04-21T16:13:20Z
updated_at: 2026-04-22T05:49:19Z
parent: monorepo-6ncp
---

We already have a scale parameter in the theme. It's called
`--dsp-font-size-ratio: 1.618;`.

This should be adjustable as well. So add another setting to the Community
Settings. Let's call it `size scale`. It should be a slider just like density
and produce values between 1.3 and 2 defaulting to 1.618.

We have derived all font sizes internally from this ratio, so the font look and
feel should scale with just this one value.

Make sure that it's handed over to the preview like the color values and the
fonts.

And add the value to the community type and the mock communities.

## Summary of Changes\n\n- Added  field to  type\n- Added  (default) to all 9 mock communities\n- Added  signal (default 1.618) in both  and \n- Wired  CSS variable into  in both forms\n- Added Size Scale slider (range 1.3–2.0, step 0.01) after Density in Visual Details section of both forms\n- Slider marks custom theme and resets to 1.618 when applying a preset
