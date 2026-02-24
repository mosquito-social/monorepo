import { createAsync, cache } from '@solidjs/router';
import { getAllContent } from '../utils/content';
import { For, Suspense } from 'solid-js';

const getBlogContent = cache(async () => {
  'use server';
  return getAllContent().blog;
}, 'blog-content');

export default function Index() {
  const blogEntries = createAsync(() => getBlogContent());

  return (
    <div class="space-y-8">
      <div>
        <h1 class="font-extrabold text-4xl tracking-tight text-zinc-900 dark:text-zinc-50">Dev Blog</h1>
        <p class="text-zinc-600 dark:text-zinc-400 mt-2 text-lg">Latest updates from the Mosquito Social engineering team.</p>
      </div>

      <div class="space-y-6">
        <Suspense fallback={<div class="animate-pulse h-24 bg-zinc-200 dark:bg-zinc-800 rounded-xl w-full" />}>
          <For each={blogEntries()}>
            {(entry) => (
              <article class="p-6 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-blue-500 transition-colors group bg-white dark:bg-zinc-900 shadow-sm block">
                <a href={entry.path} class="block text-inherit no-underline">
                  <header class="mb-2">
                    <h2 class="text-2xl font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {entry.metadata?.title || 'Untitled Post'}
                    </h2>
                    <div class="text-sm text-zinc-500 mt-2 flex items-center gap-2">
                      {entry.metadata?.date && <time>{entry.metadata.date}</time>}
                      {entry.metadata?.author && (
                        <>
                          <span>•</span>
                          <span>{entry.metadata.author}</span>
                        </>
                      )}
                    </div>
                  </header>
                  <p class="text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
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
