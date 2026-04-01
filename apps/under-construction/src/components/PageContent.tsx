import { A } from "@solidjs/router";
import { ThemeToggle } from "mosquito-design-system/ThemeToggle";
import { Logo } from "./Logo";

export function PageContent(props: { title: string }) {
  return (
    <div class="flex flex-col min-h-screen font-fam-main">
      <header class="flex items-center justify-between px-6 py-4 border-b border-cl-20">
        <div class="text-xl font-fam-msq font-black flex items-center gap-2">
          <Logo class="w-10 h-10" /> MOSQUITO.social
        </div>
        <nav class="flex items-center gap-4">
          <A
            href="/ysabeau"
            class="text-cf-20 hover:text-cf-0 transition-colors"
          >
            ysabeau
          </A>
          <A
            href="/bricolage"
            class="text-cf-20 hover:text-cf-0 transition-colors"
          >
            bricolage
          </A>
          <ThemeToggle />
        </nav>
      </header>
      <main class="flex-1 p-6 max-w-2xl mx-auto w-full">
        <h1 class="text-6xl font-fam-msq font-black">{props.title}</h1>
        <p class="text-cf-20">
          Placeholder content. This page is still being built.
        </p>
      </main>
    </div>
  );
}
