import { cache, createAsync } from '@solidjs/router';
import { For, Suspense } from 'solid-js';
import { getAllContent } from '../utils/content';

const getBlogContent = cache(async () => {
  'use server';
  return getAllContent().blog;
}, 'blog-content');

export default function Index() {
  const blogEntries = createAsync(() => getBlogContent());

  return (
    <div class="space-y-8">
      <div>
        <h1 class="font-mos mos-effect text-6xl text-cb-0 mb-3">Dev Blog</h1>
        <p class="text-lg mb-8">
          Latest updates from the <span class="font-mos">mosquito.social</span>{' '}
          engineering team.
        </p>
      </div>

      <div class="space-y-6">
        <Suspense
          fallback={
            <div class="animate-pulse h-24 bg-zinc-200 dark:bg-zinc-800 rounded-xl w-full" />
          }
        >
          <For each={blogEntries()}>
            {(entry) => (
              <article class="p-6 border border-cb-30 rounded-xl hover:border-cp-main transition-colors group bg-cb-20">
                <a href={entry.path} class="block text-inherit no-underline">
                  <header class="mb-2">
                    <h2 class="text-2xl font-mos group-hover:text-cp-main transition-colors">
                      {entry.metadata?.title || 'Untitled Post'}
                    </h2>
                    <div class="text-sm text-cf-40 mt-2 flex items-center gap-2">
                      {entry.metadata?.date && (
                        <time>{entry.metadata.date}</time>
                      )}
                      {entry.metadata?.author && (
                        <>
                          <span>•</span>
                          <span>{entry.metadata.author}</span>
                        </>
                      )}
                    </div>
                  </header>
                  <p class="text-cf-30 line-clamp-2 leading-relaxed">
                    {entry.metadata?.description || 'No description provided.'}
                  </p>
                </a>
              </article>
            )}
          </For>
        </Suspense>
      </div>
    </div>
  );
}
