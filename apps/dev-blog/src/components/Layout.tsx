import { A } from '@solidjs/router';
import { ThemeToggle } from 'mosquito-design-system/ThemeToggle';
import { JSX, createSignal, onMount } from 'solid-js';

export function Layout(props: { children: JSX.Element }) {
  return (
    <div class="min-h-screen bg-cb-10 font-sans">
      <header class="sticky top-0 z-10 border-b border-cl-10 p-3 flex justify-between items-center px-4 bg-cb-20">
        <div>
          <A class="font-mos text-2xl text-cf-30" href="/">
            dev.<span class="mos-effect text-cb-30">mosquito</span>.social
          </A>
        </div>
        <div class="flex gap-4 items-center">
          <A
            class="font-bold text-lg hover:text-cp-main transition-colors"
            href="/"
          >
            Blog
          </A>
          <A
            class="font-bold text-lg hover:text-cp-main transition-colors"
            href="/docs"
          >
            Docs
          </A>
          <ThemeToggle />
        </div>
      </header>
      <main class="max-w-5xl mx-auto p-6 md:p-10 min-h-[calc(100vh-80px)]">
        {props.children}
      </main>
    </div>
  );
}
