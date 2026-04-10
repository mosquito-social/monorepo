export default function Color() {
  const baseClasses =
    "aspect-square rounded-lg border-2 border-col-border items-end justify-center pb-2 text-center flex text-sm font-fam-msq text-shadow-sm text-shadow-black text-white";
  const items = [
    [
      ["primary dimmed", ""],
      ["primary", "var(--msq-col-primary)"],
      ["primary lightened", "var(--msq-col-primary-lightened)"],
    ],
    {
      name: "primary dimmed",
      value: "var(--msq-col-primary-dimmed)",
    },
    {
      name: "primary",
      value: "var(--msq-col-primary)",
    },
    {
      name: "primary lightened",
      value: "var(--msq-col-primary-lightened)",
    },
    {
      name: "bright dimmed",
      value: "var(--msq-col-bright-dimmed)",
    },
    {
      name: "bright",
      value: "var(--msq-col-bright)",
    },
    {
      name: "bright lightened",
      value: "var(--msq-col-bright-lightened)",
    },
    {
      name: "bright full",
      value: "var(--msq-col-bright-full)",
    },
    {
      name: "dark full",
      value: "var(--msq-col-dark-full)",
    },
    {
      name: "dark dimmed",
      value: "var(--msq-col-dark-dimmed)",
    },
    {
      name: "dark",
      value: "var(--msq-col-dark)",
    },
    {
      name: "dark lightened",
      value: "var(--msq-col-dark-lightened)",
    },
    {
      name: "primary",
      value: "var(--msq-col-primary)",
    },
    {
      name: "adjacent 1",
      value: "var(--msq-col-adjacent-1)",
    },
    {
      name: "adjacent 2",
      value: "var(--msq-col-adjacent-2)",
    },
  ];

  return (
    <div class="font-fam-main">
      <h1>Color</h1>
      <ul class="grid grid-cols-6 gap-3 text-white">
        {items.map((item) => (
          <li
            class={`${baseClasses}`}
            style={{
              "background-color": item.value,
            }}
          >
            {item.name}
          </li>
        ))}
      </ul>
      <h1>Font Sizes</h1>
      <p class="text-fs-1">Ultra Small Caption</p>
      <p class="text-fs-2">Captions and Side Notes</p>
      <p class="text-fs-3 max-w-xl">
        Regular Copy. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Quisquam, quod.
      </p>
      <p class="text-fs-4 font-light">Larger Copy and sub headings</p>
      <p class="text-fs-4 font-bold">Default Headings</p>
      <p class="text-fs-5 font-bold">Bigger Headings</p>
      <p class="text-fs-6 font-fam-msq font-black">Section Headings</p>
      <p class="text-fs-7 font-fam-msq font-black">Page Titles</p>
    </div>
  );
}
