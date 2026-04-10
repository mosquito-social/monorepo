import { Heading, ThemeToggle } from "mosquito-design-system";
import { Logo } from "~/components/Logo";

export default function Color() {
  const items = [
    [
      ["primary dimmed", "var(--msq-col-primary-dimmed)"],
      ["primary", "var(--msq-col-primary)"],
      ["primary lightened", "var(--msq-col-primary-lightened)"],
    ],
    [
      ["adjacent 1", "var(--msq-col-adjacent-1)"],
      ["primary", "var(--msq-col-primary)"],
      ["adjacent 2", "var(--msq-col-adjacent-2)"],
    ],
    [
      ["bright 0", "var(--msq-col-bright-0)"],
      ["bright 1", "var(--msq-col-bright-1)"],
      ["bright 2", "var(--msq-col-bright-2)"],
      ["bright 3", "var(--msq-col-bright-3)"],
      ["bright 4", "var(--msq-col-bright-4)"],
    ],
    [
      ["dark 0", "var(--msq-col-dark-0)"],
      ["dark 1", "var(--msq-col-dark-1)"],
      ["dark 2", "var(--msq-col-dark-2)"],
      ["dark 3", "var(--msq-col-dark-3)"],
      ["dark 4", "var(--msq-col-dark-4)"],
    ],
  ];

  return (
    <div class="font-fam-main">
      <header class="flex items-center justify-between px-6 py-4 border-b border-cl-20">
        <div class="text-xl font-fam-msq font-black flex items-center gap-2">
          <Logo class="w-10 h-10 text-col-accent" /> MOSQUITO.social base styles
        </div>
        <nav class="flex items-center gap-4">
          <ThemeToggle />
        </nav>
      </header>
      <div class="max-w-5xl mx-auto p-6">
        <Heading level={2}>Color</Heading>
        {items.map((colors) => (
          <ul class="grid grid-cols-5 gap-3 text-col-fg mb-4">
            {colors.map((color) => (
              <li
                class="aspect-square rounded-lg border-2 border-col-border items-end justify-center pb-2 text-center flex text-sm font-fam-msq text-shadow-sm text-shadow-black text-white"
                style={{
                  "background-color": color[1],
                }}
              >
                {color[0]}
              </li>
            ))}
          </ul>
        ))}
        <Heading level={2}>Font Sizes</Heading>
        <p class="text-fs-1">Ultra Small Caption</p>
        <p class="text-fs-2">Captions and Side Notes</p>
        <p class="text-fs-3 max-w-xl">
          Regular Copy. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quisquam, quod.
        </p>
        <p class="text-fs-4 font-light">Larger Copy and sub headings</p>
        <p class="text-fs-4 font-bold">Default Headings</p>
        <p class="text-fs-5 font-bold">Bigger Headings</p>
        <p class="text-fs-6 font-fam-msq font-black">Section Headings</p>
        <p class="text-fs-7 font-fam-msq font-black">Page Titles</p>
      </div>
    </div>
  );
}
