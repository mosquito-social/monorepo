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
    <div class="p-8 max-w-5xl mx-auto min-h-screen">
      <div class="flex items-center justify-between mb-8 pb-4 border-b">
        <div>
          <h1 class="text-3xl font-bold tracking-tight text-gray-900">GitHub Issues</h1>
          <p class="text-gray-500 mt-2">Hierarchical view of repository tasks and progress.</p>
        </div>
        <button
          onClick={() => fetchIssues(true)}
          disabled={loading()}
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm cursor-pointer font-medium flex items-center"
        >
          <Show when={loading()}>
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </Show>
          {loading() ? "Refreshing..." : "Refresh"}
        </button>
      </div>
      
      <Show when={error()}>
        <div class="bg-red-50 text-red-700 p-4 rounded-md mb-6 border border-red-200">
          <strong>Error:</strong> {error()}
        </div>
      </Show>
      
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 overflow-hidden">
        <Show when={loading() && issues().length === 0}>
          <div class="flex flex-col items-center justify-center p-12 text-gray-400">
            <svg class="animate-spin h-8 w-8 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p>Loading issues tree...</p>
          </div>
        </Show>
        
        <Show when={!loading() || issues().length > 0}>
          <div class="space-y-1">
            <For each={issues()}>
              {(issue) => <IssueTreeNode node={issue} />}
            </For>
            <Show when={issues().length === 0 && !loading()}>
              <div class="text-gray-500 text-center py-12 bg-gray-50 rounded-lg">
                <p>No issues found in the repository.</p>
              </div>
            </Show>
          </div>
        </Show>
      </div>
    </div>
  );
}
