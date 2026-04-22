import { FONT_STACKS } from "./font-stacks";
import type { CommunityTheme } from "../types";

export function communityThemeToStyle(theme: CommunityTheme): Record<string, string> {
  const h = theme.primaryHue;
  const stack = FONT_STACKS[theme.font] ?? FONT_STACKS.default;
  return {
    "--dsp-col-primary-dimmed": `oklch(0.4 0.3 ${h})`,
    "--dsp-col-primary": `oklch(0.6 0.26 ${h})`,
    "--dsp-col-primary-lightened": `oklch(0.8 0.12 ${h})`,
    "--dsp-col-adjacent-1": `oklch(0.6 0.26 ${h + 10})`,
    "--dsp-col-adjacent-2": `oklch(0.6 0.26 ${h - 10})`,
    "--dsp-col-bright-4": `oklch(0.65 0.02 ${h})`,
    "--dsp-col-bright-3": `oklch(0.82 0.02 ${h})`,
    "--dsp-col-bright-2": `oklch(0.9 0.02 ${h})`,
    "--dsp-col-bright-1": `oklch(0.96 0.015 ${h})`,
    "--dsp-col-bright-0": `oklch(0.98 0.01 ${h})`,
    "--dsp-col-dark-0": `oklch(0.15 0.02 ${h})`,
    "--dsp-col-dark-1": `oklch(0.18 0.011 ${h})`,
    "--dsp-col-dark-2": `oklch(0.23 0.009 ${h})`,
    "--dsp-col-dark-3": `oklch(0.28 0.009 ${h})`,
    "--dsp-col-dark-4": `oklch(0.4 0.009 ${h})`,
    "--dsp-scale": String(theme.spacing),
    "--dsp-font-signature": stack.signature,
    "--dsp-font-main": stack.main,
    "--dsp-font-mono": stack.mono,
    "--dsp-font-size-ratio": String(theme.sizeScale),
  };
}
