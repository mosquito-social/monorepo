import { Meta, Title } from '@solidjs/meta';
import { createAsync, useParams } from '@solidjs/router';
import { Heading } from 'mosquito-design-system';
import { canonicalComponents } from 'mosquito-design-system/canonical';
import { Show, Suspense } from 'solid-js';
import { transform } from 'solid-mds';
import { Metadata } from '../../types';
import { getDoc } from '../../utils/queries';

export default function DocDetail() {
  const params = useParams();
  const doc = createAsync(() => getDoc(`docs/${params.id || ''}`));

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
            <div class="">
              <Title>
                {result.global?.title ?? 'Documentation'} | Docs |
                mosquito.social
              </Title>
              <Meta
                name="description"
                content={result.global?.description ?? ''}
              />
              <Heading
                level={1}
                sub={result.global?.subtitle}
                super={result.global?.supertitle}
              >
                {result.global?.title}
              </Heading>
              <MarkdownBody />
            </div>
          );
        }}
      </Show>
    </Suspense>
  );
}
