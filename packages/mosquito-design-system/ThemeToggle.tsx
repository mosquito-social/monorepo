import { createSignal, onMount } from 'solid-js';

export function ThemeToggle() {
  const [theme, setTheme] = createSignal('system');

  onMount(() => {
    const match = document.cookie.match(/(?:^|; )colorScheme=([^;]+)/);
    const cookieTheme = match ? match[1] : 'system';
    setTheme(cookieTheme);
  });

  const updateTheme = (newTheme: string) => {
    setTheme(newTheme);
    document.cookie = `colorScheme=${newTheme}; path=/; max-age=31536000`;

    document.documentElement.classList.remove('dark', 'light');

    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (newTheme === 'light') {
      document.documentElement.classList.add('light');
    }
  };

  return (
    <select
      value={theme()}
      onInput={(e) => updateTheme((e.target as HTMLSelectElement).value)}
      class="bg-cb-10 text-cf-10 border border-cb-30 rounded px-2 py-1 outline-none text-sm"
    >
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  );
}
