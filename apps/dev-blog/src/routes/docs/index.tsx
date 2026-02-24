import { A } from '@solidjs/router';

export default function DocsIndex() {
  return (
    <div class="prose dark:prose-invert max-w-none">
      <h1>Documentation</h1>
      <p class="text-xl text-zinc-600 dark:text-zinc-400">
        Select a document from the sidebar to start reading.
      </p>
    </div>
  );
}
