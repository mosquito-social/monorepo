import { A } from '@solidjs/router';
import { ThemeToggle } from 'mosquito-design-system';
import { Logo } from './logo';

export function SiteHeader() {
  return (
    <header class="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b border-col-line bg-col-bg/95 backdrop-blur-sm">
      <A
        href="/"
        class="flex items-center gap-2 font-fam-msq font-black text-fs-4 text-col-fg group hover:text-col-fg-strong"
      >
        <Logo class="w-8 h-8 text-col-accent group-hover:text-col-accent-strong" />
        <span>
          <span class="opacity-50 font-light">dev.</span>MOSQUITO.social
        </span>
      </A>
      <nav class="flex items-center gap-3">
        <A
          class="text-col-fg-soft hover:font-bold text-fs-3 hover:text-col-fg-strong transition-colors"
          href="/blog"
        >
          Blog
        </A>
        <A
          class="text-col-fg-soft hover:font-bold text-fs-3 hover:text-col-fg-strong transition-colors"
          href="/docs"
        >
          Docs
        </A>
        <ThemeToggle />
      </nav>
    </header>
  );
}
