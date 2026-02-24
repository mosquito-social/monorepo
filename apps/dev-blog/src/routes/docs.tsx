import { createAsync, cache, A } from '@solidjs/router';
import { getAllContent, ContentEntry } from '../utils/content';
import { For, Suspense, Show } from 'solid-js';

const getDocsContent = cache(async () => {
  'use server';
  return getAllContent().docs;
}, 'docs-content');

// Helper to build a tree from the flat docs list based on parent and weight
function buildTree(docs: ContentEntry[]) {
  const tree: { doc: ContentEntry, children: any[] }[] = [];
  const map = new Map<string, { doc: ContentEntry, children: any[] }>();

  docs.forEach(doc => {
    // Determine a unique ID. We can use the file basename as an ID or just the path
    const id = doc.path.split('/').pop() || doc.path;
    map.set(id, { doc, children: [] });
  });

  docs.forEach(doc => {
    const id = doc.path.split('/').pop() || doc.path;
    const node = map.get(id)!;
    if (doc.metadata.parent && map.has(doc.metadata.parent)) {
      map.get(doc.metadata.parent)!.children.push(node);
    } else {
      tree.push(node);
    }
  });

  // Sort children by weight
  const sortNodes = (nodes: any[]) => {
    nodes.sort((a, b) => {
      const wA = typeof a.doc.metadata.weight === 'number' ? a.doc.metadata.weight : 999;
      const wB = typeof b.doc.metadata.weight === 'number' ? b.doc.metadata.weight : 999;
      return wA - wB;
    });
    nodes.forEach(n => sortNodes(n.children));
  };
  sortNodes(tree);

  return tree;
}

function TreeNode(props: { node: { doc: ContentEntry, children: any[] } }) {
  // Extract trailing part for URL
  const slug = props.node.doc.path.split('/documentation/')[1] || props.node.doc.path.split('/').pop();
  
  return (
    <li class="my-1">
      <A 
        href={`/docs/${slug}`}
        class="block py-1.5 px-3 rounded-md text-sm text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        activeClass="font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30"
      >
        {props.node.doc.metadata.title || 'Untitled'}
      </A>
      <Show when={props.node.children.length > 0}>
        <ul class="pl-4 mt-1 border-l border-zinc-200 dark:border-zinc-800 ml-3">
          <For each={props.node.children}>
            {(child) => <TreeNode node={child} />}
          </For>
        </ul>
      </Show>
    </li>
  );
}

export default function DocsLayout(props: any) {
  const docs = createAsync(() => getDocsContent());

  return (
    <div class="flex flex-col md:flex-row gap-8">
      <aside class="md:w-64 flex-shrink-0 md:sticky md:top-24 md:max-h-[calc(100vh-8rem)] overflow-y-auto">
        <h2 class="font-bold text-lg mb-4 text-zinc-900 dark:text-zinc-100">Documentation</h2>
        <Suspense fallback={<div class="animate-pulse h-32 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />}>
          <ul class="-ml-3">
            <For each={buildTree(docs() || [])}>
              {(node) => <TreeNode node={node} />}
            </For>
          </ul>
        </Suspense>
      </aside>
      <main class="flex-1 min-w-0">
        {props.children}
      </main>
    </div>
  );
}
