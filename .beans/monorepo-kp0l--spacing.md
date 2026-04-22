---
# monorepo-kp0l
title: Spacing
status: completed
type: task
priority: normal
created_at: 2026-04-21T16:13:20Z
updated_at: 2026-04-22T05:51:53Z
parent: monorepo-6ncp
---

Spacing in tailwind is managed by one single factor called `--scale`. For
consistency, I've already created `--dsp-scale`.

the theory is: when this changes, all distances (e.g. `mx-10`) change
proportionally.

Wire this value to the community setting `Density`. and give it a range between
0.8 and 1.3.

Also make sure that the value is transferred to the preview window.

## Summary of Changes\n\n- Added --dsp-scale to previewStyle in both community-settings-form.tsx and community-create-form.tsx, wired to the density signal\n- Changed density slider range from 1.0-1.5 to 0.8-1.3 in both forms\n- Clamped warm preset density from 1.35 to 1.3 to fit new range\n- Mock community spacing values (1.0, 1.1, 1.2) are all within new range, no changes needed
