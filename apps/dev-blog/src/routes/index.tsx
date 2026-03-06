import { Meta, Title } from '@solidjs/meta';
import { A, createAsync } from '@solidjs/router';
import { canonicalComponents } from 'mosquito-design-system/canonical';
import { For, Show } from 'solid-js';
import { transform } from 'solid-mds';
import { Metadata } from '../types';
import { getDoc, getMetadata } from '../utils/queries';

export default function Index() {
  const page = createAsync(() => getDoc('home'));
  const metadata = createAsync(() => getMetadata());

  return (
    <div class="space-y-8">
      <div>
        <h1 class="font-mos mos-effect text-6xl text-cb-0 mb-3">
          Mosquito.social Devs
        </h1>
        <p class="text-lg mb-8">Latest updates from the engineering team.</p>
      </div>

      <div class="flex">
        <div class="grow">
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
                  <Meta name="description" content={''} />
                  <MarkdownBody />
                </div>
              );
            }}
          </Show>
        </div>
        <aside class="w-xs">
          <h2 class="text-xl font-bold mb-3">
            <A href="/blog">Latest Blog Posts</A>
          </h2>
          <Show when={metadata()} fallback={<div></div>}>
            {(meta) => {
              const allBlogs = Object.entries(meta()).filter(([key]) =>
                key.startsWith('/blog'),
              );
              return (
                <For each={allBlogs}>
                  {([path, meta]: [string, Metadata]) => (
                    <A
                      href={path}
                      class="block border border-cl-10 p-3 bg-cb-20 rounded-lg mb-3"
                    >
                      <h3 class="font-bold mb-2">{meta.title}</h3>
                      <Show when={meta.subtitle}>
                        <h3 class="mb-2 text-sm">{meta.subtitle}</h3>
                      </Show>
                      <p class="text-sm text-right text-cf-20">{meta.date}</p>
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
