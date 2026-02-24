import { A } from '@solidjs/router';
import { createSignal, onMount, JSX } from 'solid-js';

export function Layout(props: { children: JSX.Element }) {
  const [isDark, setIsDark] = createSignal(false);

  onMount(() => {
    if (
      localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  });

  const toggleDark = () => {
    if (isDark()) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <div class="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
      <header class="sticky top-0 z-10 backdrop-blur-md bg-white/70 dark:bg-zinc-950/70 border-b border-zinc-200 dark:border-zinc-800 p-4 flex justify-between items-center px-6">
        <div class="flex gap-6 items-center">
          <A class="font-extrabold text-xl tracking-tight hover:text-blue-600 dark:hover:text-blue-400 transition-colors" href="/" end>Blog</A>
          <A class="font-extrabold text-xl tracking-tight hover:text-blue-600 dark:hover:text-blue-400 transition-colors" href="/docs">Docs</A>
        </div>
        <button 
          onClick={toggleDark} 
          class="p-2 px-3 text-sm font-medium bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 rounded-lg transition-colors shadow-sm"
        >
          {isDark() ? '🌞 Light' : '🌙 Dark'}
        </button>
      </header>
      <main class="max-w-5xl mx-auto p-6 md:p-10 min-h-[calc(100vh-80px)]">
        {props.children}
      </main>
    </div>
  );
}
