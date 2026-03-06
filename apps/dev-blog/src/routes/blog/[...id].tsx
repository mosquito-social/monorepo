import { Meta, Title } from '@solidjs/meta';
import { createAsync, useParams } from '@solidjs/router';
import { canonicalComponents } from 'mosquito-design-system/canonical';
import { Show, Suspense } from 'solid-js';
import { transform } from 'solid-mds';
import { Metadata } from '../../types';
import { getDoc } from '../../utils/queries';

export default function DocDetail() {
  const params = useParams();
  const doc = createAsync(() => getDoc(`blog/${params.id || ''}`));

  return (
    <Suspense fallback={<div class="">Loading...</div>}>
      <Show
        when={doc()}
        fallback={
          <div class="">
            <h1>Documentation Page Not Found</h1>
            <p>The requested documentation page could not be found.</p>
          </div>
        }
      >
        {(d) => {
          // Parse and transform the raw markdown
          const result = transform<Metadata, {}>(d(), canonicalComponents);
          const MarkdownBody = result.steps.default.Body;

          return (
            <div class="max-w-2xl mx-auto">
              <Title>
                {result.global?.title ?? ''} | Blog | mosquito.social
              </Title>
              <Meta
                name="description"
                content={result.global?.description ?? ''}
              />
              <h1 class="font-mos mos-effect text-6xl text-cb-0 mb-4">
                {result.global?.title ?? 'Documentation'}
              </h1>
              <p class="text-cf-20 text-xl mb-8">{result.global?.subtitle}</p>
              <MarkdownBody />
            </div>
          );
        }}
      </Show>
    </Suspense>
  );
}
