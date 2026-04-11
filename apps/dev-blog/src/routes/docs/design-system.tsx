import { H2, Heading } from 'mosquito-design-system';

const ColorTile = (props: {
  name: string;
  class: string;
  isLight?: boolean;
}) => {
  return (
    <div
      class={`p-4 rounded-lg shadow-md flex flex-col items-start justify-end border border-col-line-strong aspect-square ${props.class}`}
    >
      <span
        class="font-fam-mono text-col-fg-strong text-fs-1 font-bold"
        classList={{ light: props.isLight }}
      >
        {props.name}
      </span>
      <span class="text-col-fg text-fs-1" classList={{ light: props.isLight }}>
        accent
      </span>
    </div>
  );
};
const TypoTile = (props: { name: string; class: string }) => {
  return (
    <div
      class={`p-4 rounded-lg shadow-md flex flex-col items-start justify-end border border-col-line-strong aspect-square`}
    >
      <span class={`font-fam-msq text-fs-7 font-black ${props.class}`}>Aa</span>
      <span class="font-fam-mono text-col-fg-strong text-fs-1 font-bold">
        {props.name}
      </span>
      <span class="text-cf-30 text-fs-1">foreground/text</span>
    </div>
  );
};
const LineTile = (props: { name: string; class: string }) => {
  return (
    <div
      class={`p-4 rounded-lg shadow-md flex flex-col items-start justify-end border border-col-line-strong aspect-square`}
    >
      <span
        class={`font-mos mb-4 text-8xl block w-1/2 aspect-square mx-auto border ${props.class}`}
      ></span>
      <span class="font-fam-mono text-col-fg-strong text-fs-1 font-bold">
        {props.name}
      </span>
      <span class="text-cf-30 text-fs-1">line/border</span>
    </div>
  );
};

export default function DesignSystem() {
  const accentColors = [
    { name: 'col-accent', class: 'bg-col-accent text-cb-0' },
    { name: 'col-accent-weak', class: 'bg-col-accent-weak text-cb-0' },
    {
      name: 'col-accent-strong',
      class: 'bg-col-accent-strong text-cb-0',
      isLight: true,
    },
  ];
  const adjacentColors = [
    { name: 'col-adjacent-1', class: 'bg-col-adjacent-1 text-cb-0' },
    { name: 'col-accent', class: 'bg-col-accent text-cb-0' },
    { name: 'col-adjacent-2', class: 'bg-col-adjacent-2 text-cb-0' },
  ];
  const bgColors = [
    { name: 'col-bg', class: 'bg-col-bg text-cf-0' },
    { name: 'col-bg-soft', class: 'bg-col-bg-soft text-cf-10' },
    { name: 'col-bg-weak', class: 'bg-col-bg-weak text-cf-10' },
  ];
  const fgColors = [
    { name: 'col-fg-strong', class: 'text-col-fg-strong' },
    { name: 'col-fg', class: 'text-col-fg' },
    { name: 'col-fg-soft', class: 'text-col-fg-soft' },
    { name: 'col-fg-weak', class: 'text-col-fg-weak' },
  ];
  const lineColors = [
    { name: 'col-line-strongest', class: 'border-col-line-strongest' },
    { name: 'col-line-strong', class: 'border-col-line-strong' },
    { name: 'col-line', class: 'border-col-line' },
    { name: 'col-line-soft', class: 'border-col-line-soft' },
  ];

  return (
    <div class="min-h-screen bg-cb-10 text-cf-10">
      <Heading level={1}>Design System</Heading>

      <section>
        <H2>Tailwind Color Tokens</H2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {accentColors.map((c) => (
            <ColorTile {...c} />
          ))}
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {adjacentColors.map((c) => (
            <ColorTile {...c} />
          ))}
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {bgColors.map((c) => (
            <ColorTile {...c} />
          ))}
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {fgColors.map((c) => (
            <TypoTile {...c} />
          ))}
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {lineColors.map((c) => (
            <LineTile {...c} />
          ))}
        </div>
      </section>
      <section>
        <H2>Tailwind Font Tokens</H2>

        <div class="border border-col-line-strong p-4 rounded-xl mb-4">
          <p class="font-fam-msq text-fs-6">Display Font</p>
          <p class="font-fam-mono text-col-fg-strong text-fs-1 font-bold">
            font-fam-msq
          </p>
          <p class="text-cf-30 text-fs-1">
            Signature Typo for big headings and titles
          </p>
        </div>
        <div class="border border-col-line-strong p-4 rounded-xl mb-4">
          <p class="font-fam-main text-fs-6">
            Main Font <strong>Bold</strong> <em>Italic</em>
          </p>
          <p class="font-fam-mono text-col-fg-strong text-fs-1 font-bold">
            font-fam-main
          </p>
          <p class="text-cf-30 text-fs-1">Go-To sans serif font</p>
        </div>
        <div class="border border-col-line-strong p-4 rounded-xl mb-4">
          <p class="font-fam-mono text-fs-6">
            Monospaced <strong>Bold</strong> <em>Italic</em>
          </p>
          <p class="font-fam-mono text-col-fg-strong text-fs-1 font-bold">
            font-fam-mono
          </p>
          <p class="text-cf-30 text-fs-1">Typeface for code</p>
        </div>
      </section>
    </div>
  );
}
