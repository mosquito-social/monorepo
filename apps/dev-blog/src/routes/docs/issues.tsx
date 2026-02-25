import { createSignal, onMount, For, Show } from "solid-js";
import { IssueTreeNode } from "../../components/IssueTree";
import type { IssueNode } from "../../utils/github";

export default function IssuesPage() {
  const [issues, setIssues] = createSignal<IssueNode[]>([]);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal("");

  const fetchIssues = async (refresh = false) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/issues${refresh ? "?refresh=true" : ""}`);
      if (!res.ok) throw new Error("Failed to fetch issues");
      const data = await res.json();
      setIssues(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  onMount(() => {
    fetchIssues();
  });

  return (
    <div class="py-4">
      <div class="flex items-center justify-between mb-8 pb-4 border-b border-cl-10">
        <div>
          <h1 class="text-3xl font-bold font-mos tracking-tight text-cf-30 mos-effect">GitHub Issues</h1>
          <p class="text-cf-10 mt-2 font-mono">Hierarchical view of repository tasks and progress.</p>
        </div>
        <button
          onClick={() => fetchIssues(true)}
          disabled={loading()}
          class="px-4 py-2 bg-cp-main text-cb-10 rounded hover:opacity-90 disabled:opacity-50 transition-colors cursor-pointer font-bold flex items-center"
        >
          <Show when={loading()}>
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-cb-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </Show>
          {loading() ? "Refreshing..." : "Refresh"}
        </button>
      </div>
      
      <Show when={error()}>
        <div class="bg-cb-30 text-cp-main p-4 rounded mb-6 border border-cl-20 font-mono">
          <strong>Error:</strong> {error()}
        </div>
      </Show>
      
      <div class="bg-cb-20 rounded border border-cl-10 p-6 overflow-hidden">
        <Show when={loading() && issues().length === 0}>
          <div class="flex flex-col items-center justify-center p-12 text-cf-10">
            <svg class="animate-spin h-8 w-8 text-cp-main mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p class="font-mono">Loading issues tree...</p>
          </div>
        </Show>
        
        <Show when={!loading() || issues().length > 0}>
          <div class="space-y-1">
            <For each={issues()}>
              {(issue) => <IssueTreeNode node={issue} />}
            </For>
            <Show when={issues().length === 0 && !loading()}>
              <div class="text-cf-10 font-mono text-center py-12 bg-cb-10 rounded">
                <p>No issues found in the repository.</p>
              </div>
            </Show>
          </div>
        </Show>
      </div>
    </div>
  );
}
