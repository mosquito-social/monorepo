import { fetchIssuesTree } from "../../utils/github";

export async function GET({ request }: { request: Request }) {
  const url = new URL(request.url);
  const refresh = url.searchParams.get("refresh") === "true";
  
  try {
    const tree = await fetchIssuesTree(refresh);
    return new Response(JSON.stringify(tree), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
