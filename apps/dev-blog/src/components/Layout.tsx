import { JSX } from "solid-js";
import { SiteHeader } from "./site-header";

export function Layout(props: { children: JSX.Element }) {
  return (
    <div class="min-h-screen bg-cb-10 font-sans">
      <SiteHeader />
      <main class="max-w-5xl mx-auto p-6 md:p-10 min-h-[calc(100vh-80px)]">
        {props.children}
      </main>
    </div>
  );
}
