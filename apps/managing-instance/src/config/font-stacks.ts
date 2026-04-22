export interface FontStack {
  name: string;
  signature: string;
  main: string;
  mono: string;
  fontsource: string[];
}

export const FONT_STACKS: Record<string, FontStack> = {
  'mono-signal': {
    name: 'Mono Signal',
    signature: '"Share Tech Mono", monospace',
    main: '"IBM Plex Sans", sans-serif',
    mono: '"IBM Plex Mono", monospace',
    fontsource: [
      '@fontsource/share-tech-mono',
      '@fontsource/ibm-plex-sans',
      '@fontsource/ibm-plex-mono',
    ],
  },
  condensed: {
    name: 'Condensed',
    signature: '"Barlow Condensed", sans-serif',
    main: '"Barlow", sans-serif',
    mono: '"JetBrains Mono", monospace',
    fontsource: [
      '@fontsource/barlow-condensed',
      '@fontsource/barlow',
      '@fontsource-variable/jetbrains-mono',
    ],
  },
  editorial: {
    name: 'Editorial',
    signature: '"DM Serif Display", serif',
    main: '"DM Sans", sans-serif',
    mono: '"DM Mono", monospace',
    fontsource: [
      '@fontsource/dm-serif-display',
      '@fontsource/dm-sans',
      '@fontsource/dm-mono',
    ],
  },
  precision: {
    name: 'Precision',
    signature: '"Shippori Mincho", serif',
    main: '"Noto Sans JP", sans-serif',
    mono: '"Noto Sans Mono", monospace',
    fontsource: [
      '@fontsource/shippori-mincho',
      '@fontsource/noto-sans-jp',
      '@fontsource/noto-sans-mono',
    ],
  },
  craft: {
    name: 'Craft',
    signature: '"Fraunces", serif',
    main: '"Source Sans 3", sans-serif',
    mono: '"Source Code Pro", monospace',
    fontsource: [
      '@fontsource-variable/fraunces',
      '@fontsource-variable/source-sans-3',
      '@fontsource-variable/source-code-pro',
    ],
  },
  canvas: {
    name: 'Canvas',
    signature: '"Syne", sans-serif',
    main: '"Plus Jakarta Sans", sans-serif',
    mono: '"Commit Mono", monospace',
    fontsource: [
      '@fontsource/syne',
      '@fontsource/plus-jakarta-sans',
      '@fontsource/commit-mono',
    ],
  },
  dispatch: {
    name: 'Dispatch',
    signature: '"Bebas Neue", sans-serif',
    main: '"Work Sans", sans-serif',
    mono: '"JetBrains Mono", monospace',
    fontsource: [
      '@fontsource/bebas-neue',
      '@fontsource/work-sans',
      '@fontsource-variable/jetbrains-mono',
    ],
  },
  platform: {
    name: 'Mosquito',
    signature: '"Bricolage Grotesque Variable", sans-serif',
    main: '"Source Sans 3", sans-serif',
    mono: '"Source Code Pro", monospace',
    fontsource: [
      '@fontsource-variable/bricolage-grotesque',
      '@fontsource-variable/source-sans-3',
      '@fontsource-variable/source-code-pro',
    ],
  },
  default: {
    name: 'Default',
    signature: '"Plus Jakarta Sans", sans-serif',
    main: '"Plus Jakarta Sans", sans-serif',
    mono: '"JetBrains Mono", monospace',
    fontsource: [
      '@fontsource/plus-jakarta-sans',
      '@fontsource-variable/jetbrains-mono',
    ],
  },
};

export type FontStackId = keyof typeof FONT_STACKS;
