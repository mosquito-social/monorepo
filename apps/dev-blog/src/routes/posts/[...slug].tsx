import { Title } from '@solidjs/meta';
import { A, useParams } from '@solidjs/router';
import { HttpStatusCode } from '@solidjs/start';
import { createResource } from 'solid-js';
import { transform } from 'solid-mds';

import { isServer } from 'solid-js/web';
import { getRequestEvent } from 'solid-js/web';

const fetchPost = async (slug: string) => {
  let url = `/api/posts/${slug}`;
  if (isServer) {
    const event = getRequestEvent();
    if (event && event.request) {
      const parsedUrl = new URL(event.request.url);
      url = `${parsedUrl.origin}${url}`;
    } else {
      url = `http://localhost:${process.env.PORT || 3331}${url}`;
    }
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error('Not Found');
  return res.json();
};

export default function Post() {
  const params = useParams();
  const [ast] = createResource(() => params.slug, fetchPost);

  return (
    <main class="post-container p-4">
      {ast.loading && <p>Loading...</p>}
      {ast.error && (
        <>
          <Title>Not Found</Title>
          <HttpStatusCode code={404} />
          <h1>404 Not Found</h1>
          <A href="/">Go Back Home</A>
        </>
      )}
      {ast() && !ast.loading && !ast.error && (
        <article>
          {(() => {
            const result = transform(ast());
            const Body = result.steps.default.Body;
            return <Body />;
          })()}
        </article>
      )}
    </main>
  );
}
