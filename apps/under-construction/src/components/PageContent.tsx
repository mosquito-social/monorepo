import { A } from "@solidjs/router";
import { ThemeToggle } from "mosquito-design-system/ThemeToggle";
import { Logo } from "./Logo";

export function PageContent(props: { variant: "bricolage" | "ysabeau" }) {
  return (
    <div class="flex flex-col min-h-screen font-fam-main bg-col-bg text-col-text">
      <header class="flex items-center justify-between px-6 py-4 border-b border-cl-20">
        <div class="text-xl font-fam-msq font-black flex items-center gap-2">
          <Logo class="w-10 h-10 text-col-accent" /> MOSQUITO.social
        </div>
        <nav class="flex items-center gap-4">
          <A
            href="/ysabeau"
            class={`text-cf-20 hover:text-cf-0 transition-colors ${props.variant === "ysabeau" ? "font-black" : ""}`}
          >
            ysabeau
          </A>
          <A
            href="/bricolage"
            class={`text-cf-20 hover:text-cf-0 transition-colors ${props.variant === "bricolage" ? "font-black" : ""}`}
          >
            bricolage
          </A>
          <ThemeToggle />
        </nav>
      </header>
      <main class="flex-1">
        <div class="grid grid-cols-3 divide-x divide-col-border h-full">
          {/* Column 1: Hero */}
          <div class="p-10 flex flex-col">
            <div class="flex flex-col gap-5">
              <p class="text-xs tracking-[0.1em] uppercase text-col-text-subtle font-semibold font-fam-msq">
                Federated Communities
              </p>
              <h1 class="text-7xl font-fam-msq font-black text-col-text leading-[0.92]">
                Find your people.
              </h1>
              <p class="text-col-text-muted leading-relaxed">
                Communities built on openness. Events that actually happen. A
                network that belongs to no one — and everyone.
              </p>
              <div class="flex items-center gap-4">
                <button class="bg-col-accent text-col-accent-fg px-5 py-2.5 rounded-lg font-semibold text-sm">
                  Explore communities
                </button>
                <span class="text-col-text-muted text-sm cursor-pointer">
                  How it works →
                </span>
              </div>
            </div>

            <div class="flex-1" />

            <div class="border-t border-col-border pt-6">
              <p class="text-xs tracking-[0.1em] uppercase text-col-text-subtle font-semibold mb-3 font-fam-msq">
                Typography
              </p>
              <p class="font-fam-msq font-bold text-col-text">
                Bricolage 700 — Display
              </p>
              <p class="font-fam-main text-col-text-muted text-sm mt-1">
                Source Sans 3 400 — Body & UI
              </p>
            </div>
          </div>

          {/* Column 2: Type Scale + Navigation */}
          <div class="p-10 flex flex-col gap-8 relative">
            <div>
              <p class="text-xs tracking-[0.15em] uppercase text-col-text-subtle font-semibold mb-6 font-fam-msq">
                Type Scale
              </p>

              <div class="mb-5">
                <span class="absolute right-2 top-4 text-9xl font-fam-msq font-black text-col-border leading-none select-none pointer-events-none">
                  Aa
                </span>
                <p class="text-xs tracking-[0.12em] uppercase text-col-text-subtle mb-1">
                  Display / 900
                </p>
                <p class="text-4xl font-fam-msq font-bold text-col-text leading-none">
                  Community
                </p>
                <p class="text-xs tracking-[0.12em] uppercase text-col-text-subtle mb-1 mt-7">
                  Headline / 700
                </p>
                <p class="text-2xl font-fam-main font-bold text-col-text">
                  Screen Printing Workshop
                </p>
                <p class="text-xs tracking-[0.12em] uppercase text-col-text-subtle mb-1 mt-7">
                  Body / 400
                </p>
                <p class="text-col-text-muted text-sm leading-relaxed">
                  Open to all skill levels. Materials provided. Bring a garment,
                  tote bag, or anything you'd like to print on. Limited spots
                  available.
                </p>
              </div>
            </div>

            <div class="border-t border-col-border pt-6">
              <p class="text-xs tracking-[0.15em] uppercase text-col-text-subtle font-semibold mb-4 font-fam-msq">
                Navigation & Live States
              </p>

              <div class="flex gap-1 mb-5">
                <button class="bg-col-accent text-col-accent-fg px-4 py-1.5 rounded-md text-sm font-semibold">
                  Discover
                </button>
                <button class="text-col-text-muted px-4 py-1.5 rounded-md text-sm">
                  Communities
                </button>
                <button class="text-col-text-muted px-4 py-1.5 rounded-md text-sm">
                  Events
                </button>
              </div>

              <div class="flex flex-col gap-3">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2.5">
                    <span class="w-2 h-2 rounded-full bg-col-live flex-shrink-0" />
                    <span class="font-semibold text-col-text text-sm">
                      Hamburg Sketchers
                    </span>
                  </div>
                  <span class="text-col-text-subtle text-sm">12 online</span>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2.5">
                    <span class="w-2 h-2 rounded-full bg-col-live flex-shrink-0" />
                    <span class="font-semibold text-col-text text-sm">
                      Flea Market Collective
                    </span>
                  </div>
                  <span class="text-col-text-subtle text-sm">34 online</span>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2.5">
                    <span class="w-2 h-2 rounded-full bg-col-inactive flex-shrink-0" />
                    <span class="text-col-text-muted text-sm">
                      Photography Walkers
                    </span>
                  </div>
                  <span class="text-col-text-subtle text-sm">offline</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Card + Color Palette */}
          <div class="p-10 flex flex-col gap-8">
            <div>
              <p class="text-xs tracking-[0.15em] uppercase text-col-text-subtle font-semibold mb-4 font-fam-msq">
                Card Component
              </p>

              <div class="bg-col-surface rounded-2xl p-6 flex flex-col gap-3">
                <p class="text-xs tracking-[0.12em] uppercase text-col-tag-text font-semibold">
                  Workshop · Sat 14 Jun
                </p>
                <h3 class="text-xl font-fam-msq font-bold text-col-text leading-snug">
                  Introduction to Screen Printing
                </h3>
                <p class="text-col-text-muted text-sm leading-relaxed">
                  Open to all levels. Materials included. Bring something you
                  want to print on.
                </p>
                <div class="flex items-center justify-between mt-1">
                  <div class="flex items-center">
                    <div class="relative z-30 w-8 h-8 rounded-full bg-col-avatar-bg text-col-avatar-fg text-xs font-bold flex items-center justify-center ring-2 ring-col-avatar-ring">
                      MR
                    </div>
                    <div class="relative z-20 w-8 h-8 rounded-full bg-col-avatar-bg text-col-avatar-fg text-xs font-bold flex items-center justify-center ring-2 ring-col-avatar-ring -ml-2">
                      JK
                    </div>
                    <div class="relative z-10 w-8 h-8 rounded-full bg-col-avatar-bg text-col-avatar-fg text-xs font-bold flex items-center justify-center ring-2 ring-col-avatar-ring -ml-2">
                      +8
                    </div>
                  </div>
                  <button class="bg-col-accent text-col-accent-fg px-4 py-2 rounded-lg text-sm font-semibold">
                    Join event
                  </button>
                </div>
              </div>
            </div>

            <div class="border-t border-col-border pt-6">
              <p class="text-xs tracking-[0.15em] uppercase text-col-text-subtle font-semibold mb-4 font-fam-msq flex items-center gap-2">
                Colour —{" "}
                {props.variant === "bricolage" ? "Chemical Cyan" : "Deep Rose"}
                <span class="dark:hidden"> — Light</span>
                <span class="light:hidden"> — Dark</span>
              </p>

              <div class="flex gap-3">
                {[
                  { bg: "bg-col-accent", label: "Accent" },
                  {
                    bg: "bg-col-bg border border-col-border",
                    label: "Surface 1",
                  },
                  { bg: "bg-col-surface", label: "Surface 2" },
                  { bg: "bg-col-text", label: "Copy 1" },
                  { bg: "bg-col-text-muted", label: "Copy 2" },
                ].map(({ bg, label }) => (
                  <div class="flex flex-col items-center gap-1.5">
                    <div class={`w-14 h-14 rounded-xl ${bg}`} />
                    <span class="text-[10px] text-col-text-subtle uppercase tracking-wide">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
