import { ThemeToggle } from "mosquito-design-system/ThemeToggle";

export default function DesignSystem() {
  const colors = [
    { name: 'cb-0', class: 'bg-cb-0 text-cf-0' },
    { name: 'cf-0', class: 'bg-cf-0 text-cb-0' },
    { name: 'cb-10', class: 'bg-cb-10 text-cf-10' },
    { name: 'cb-20', class: 'bg-cb-20 text-cf-10' },
    { name: 'cb-30', class: 'bg-cb-30 text-cf-10' },
    { name: 'cf-10', class: 'bg-cf-10 text-cb-10' },
    { name: 'cf-20', class: 'bg-cf-20 text-cb-10' },
    { name: 'cf-30', class: 'bg-cf-30 text-cb-10' },
    { name: 'cp-main', class: 'bg-cp-main text-cb-0' },
    { name: 'cs-main', class: 'bg-cs-main text-cb-0' },
  ];

  return (
    <div class="min-h-screen bg-cb-10 text-cf-10 p-8">
      <div class="flex justify-between items-center mb-12">
        <h1 class="text-3xl font-bold">Design System</h1>
        <ThemeToggle />
      </div>

      <section>
        <h2 class="text-2xl font-semibold mb-6">Colors</h2>
        <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
          {colors.map((c) => (
            <div class={`p-6 rounded shadow-md flex flex-col items-center justify-center border border-cb-30 aspect-square ${c.class}`}>
              <span class="font-mono">{c.name}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
