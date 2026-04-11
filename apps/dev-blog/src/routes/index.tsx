import { Meta, Title } from "@solidjs/meta";
import { A, createAsync } from "@solidjs/router";
import { canonicalComponents, H2, H3 } from "mosquito-design-system/canonical";
import { For, Show } from "solid-js";
import { transform } from "solid-mds";
import { Metadata } from "../types";
import { getDoc, getMetadata } from "../utils/queries";
import { Heading } from "mosquito-design-system";

export default function Index() {
  const page = createAsync(() => getDoc("home"));
  const metadata = createAsync(() => getMetadata());

  return (
    <div class="space-y-8">
      <div>
        <h1 class="font-fam-msq text-fs-7 text-col-fg-strong font-black">
          Mosquito.social Devs
        </h1>
        <p class="text-fs-4 text-col-fg-weak mb-8">
          Latest updates from the engineering team.
        </p>
      </div>

      <div class="grid grid-cols-5">
        <div class="col-span-3">
          <Show
            when={page()}
            fallback={
              <div class="">
                <h1>Documentation Page Not Found</h1>
                <p>The requested documentation page could not be found.</p>
              </div>
            }
          >
            {(p) => {
              const parsed = transform<Metadata, {}>(p(), canonicalComponents);
              const MarkdownBody = parsed.steps.default.Body;

              return (
                <div>
                  <Title>Development Portal | mosquito.social</Title>
                  <Meta name="description" content={""} />
                  <MarkdownBody />
                </div>
              );
            }}
          </Show>
        </div>
        <aside class="w-xs col-span-2">
          <H2>
            <A href="/blog">Latest Blog Posts</A>
          </H2>
          <Show when={metadata()} fallback={<div></div>}>
            {(meta) => {
              const allBlogs = Object.entries(meta()).filter(([key]) =>
                key.startsWith("/blog"),
              );
              return (
                <For each={allBlogs}>
                  {([path, meta]: [string, Metadata]) => (
                    <A
                      href={path}
                      class="block border border-col-line p-3 bg-col-bg-soft rounded-lg mb-3 hover:border-col-line-strong "
                    >
                      <Heading level={4} sub={meta.subtitle}>
                        {meta.title}
                      </Heading>
                      <p class="text-fs-2 text-right text-col-fg-weak">
                        {meta.date}
                      </p>
                    </A>
                  )}
                </For>
              );
            }}
          </Show>
        </aside>
      </div>
    </div>
  );
}
