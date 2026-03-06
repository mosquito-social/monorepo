import { ssr, ssrHydrationKey } from 'solid-js/web';

var r = ["<main", ` class="flex min-h-screen flex-col items-center justify-center p-4"><div class="text-center space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><h1 class="text-4xl font-bold tracking-tight sm:text-6xl">We're building something new</h1><p class="text-lg text-muted-foreground max-w-2xl mx-auto">Our platform is currently under construction. Please check back later.</p></div></main>`];
function l() {
  return ssr(r, ssrHydrationKey());
}

export { l as default };
//# sourceMappingURL=index2.mjs.map
