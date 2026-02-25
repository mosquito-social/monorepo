export default function DesignSystem() {
  const bgColors = [
    { name: 'cb-0', class: 'bg-cb-0 text-cf-0' },
    { name: 'cb-10', class: 'bg-cb-10 text-cf-10' },
    { name: 'cb-20', class: 'bg-cb-20 text-cf-10' },
    { name: 'cb-30', class: 'bg-cb-30 text-cf-10' },
  ];
  const fgColors = [
    { name: 'cf-0', class: 'text-cf-0' },
    { name: 'cf-10', class: 'text-cf-10' },
    { name: 'cf-20', class: 'text-cf-20' },
    { name: 'cf-30', class: 'text-cf-30' },
  ];
  const lineColors = [
    { name: 'cl-10', class: 'border-cl-10 text-cb-0' },
    { name: 'cl-20', class: 'border-cl-20 text-cb-10' },
    { name: 'cl-30', class: 'border-cl-30 text-cb-10' },
  ];
  const primaryColors = [{ name: 'cp-main', class: 'bg-cp-main text-cb-0' }];
  const secondaryColors = [{ name: 'cs-main', class: 'bg-cs-main text-cb-0' }];

  return (
    <div class="min-h-screen bg-cb-10 text-cf-10 p-8">
      <h1 class="text-6xl font-mos mos-effect text-cb-0 mb-8">Design System</h1>

      <section>
        <h2 class="text-4xl font-bold uppercase mb-6">
          Tailwind Tokens for Colors
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          {bgColors.map((c) => (
            <div
              class={`p-4 rounded-lg shadow-md flex flex-col items-center justify-center border border-cl-20 aspect-square ${c.class}`}
            >
              <span class="font-mono">{c.name}</span>
              <span class="text-cf-30 text-xs">background</span>
            </div>
          ))}
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {fgColors.map((c) => (
            <div
              class={`p-4 rounded-lg shadow-md flex flex-col items-center justify-center border border-cl-20 aspect-square`}
            >
              <span class={`font-mos text-8xl ${c.class}`}>Aa</span>
              <span class="font-mono">{c.name}</span>
              <span class="text-cf-30 text-xs">foreground/text</span>
            </div>
          ))}
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {lineColors.map((c) => (
            <div
              class={`p-4 rounded-lg shadow-md flex flex-col items-center justify-center border border-cl-20 aspect-square`}
            >
              <span
                class={`font-mos text-8xl block w-1/2 aspect-square border ${c.class}`}
              ></span>
              <span class="font-mono">{c.name}</span>
              <span class="text-xs">line/border</span>
            </div>
          ))}
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {primaryColors.map((c) => (
            <div
              class={`p-4 rounded-lg shadow-md flex flex-col items-center justify-center border border-cl-20 aspect-square ${c.class}`}
            >
              <span class="font-mono">{c.name}</span>
              <span class="text-xs">primary palette</span>
            </div>
          ))}
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {secondaryColors.map((c) => (
            <div
              class={`p-4 rounded-lg shadow-md flex flex-col items-center justify-center border border-cl-20 aspect-square ${c.class}`}
            >
              <span class="font-mono">{c.name}</span>
              <span class="text-xs">secondary palette</span>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2 class="text-4xl font-bold uppercase mb-6 mt-8">
          Tailwind Tokens for Fonts
        </h2>
        <div class="border border-cl-20 p-4 rounded-xl mb-4">
          <p class="font-mos text-4xl">Caprasimo</p>
          <p class="font-mono">text-mos</p>
          <p class="text-cf-30 text-xs">Mosquito signature Font</p>
        </div>
        <div class="border border-cl-20 p-4 rounded-xl mb-4">
          <p class="font-sans text-4xl">
            IBM Plex Sans <strong>Bold</strong> <em>Italic</em>
          </p>
          <p class="font-mono">text-sans</p>
          <p class="text-cf-30 text-xs">Go-To sans serif font</p>
        </div>
        <div class="border border-cl-20 p-4 rounded-xl mb-4">
          <p class="font-serif text-4xl">
            IBM Plex Serif <strong>Bold</strong> <em>Italic</em>
          </p>
          <p class="font-mono">text-serif</p>
          <p class="text-cf-30 text-xs">Typeface for long form text</p>
        </div>
        <div class="border border-cl-20 p-4 rounded-xl mb-4">
          <p class="font-mono text-4xl">
            IBM Plex Mono <strong>Bold</strong> <em>Italic</em>
          </p>
          <p class="font-mono">text-mono</p>
          <p class="text-cf-30 text-xs">Typeface for code</p>
        </div>
      </section>
    </div>
  );
}
