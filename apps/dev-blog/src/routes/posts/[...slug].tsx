import { createResource } from "solid-js";
import { useParams, A } from "@solidjs/router";
import { transform } from "solid-mds";
import { HttpStatusCode } from "@solidjs/start";
import { Title } from "@solidjs/meta";

const fetchPost = async (slug: string) => {
  const res = await fetch(`/api/posts/${slug}`);
  if (!res.ok) throw new Error("Not Found");
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
