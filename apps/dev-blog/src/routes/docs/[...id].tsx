import { createAsync, cache, useParams } from '@solidjs/router';
import { getAllContent } from '../../utils/content';
import { Show, Suspense } from 'solid-js';
import { parse } from 'hast-mds';
import { transform } from 'solid-mds';

const getDoc = cache(async (id: string) => {
  'use server';
  const docs = getAllContent().docs;
  const doc = docs.find(d => {
    const slug = d.path.split('/documentation/')[1] || d.path.split('/').pop();
    return slug === id;
  });
  return doc || null;
}, 'doc-detail');

export default function DocDetail() {
  const params = useParams();
  const doc = createAsync(() => getDoc(params.id || ''));

  return (
    <Suspense fallback={<div class="animate-pulse h-64 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />}>
      <Show when={doc()} fallback={
        <div class="prose dark:prose-invert">
          <h1>Document Not Found</h1>
          <p>The requested document could not be found.</p>
        </div>
      }>
        {(d) => {
          // Parse and transform the raw markdown
          const parsed = parse(d().raw);
          const result = transform(parsed);
          const MarkdownBody = result.steps.default.Body;
          
          return (
            <div class="prose dark:prose-invert max-w-none prose-zinc prose-a:text-blue-600 dark:prose-a:text-blue-400">
              <MarkdownBody />
            </div>
          );
        }}
      </Show>
    </Suspense>
  );
}
