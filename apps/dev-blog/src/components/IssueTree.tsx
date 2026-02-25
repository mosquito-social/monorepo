import { createSignal, For, Show } from "solid-js";
import type { IssueNode } from "../utils/github";

export function IssueTreeNode(props: { node: IssueNode }) {
  const [isOpen, setIsOpen] = createSignal(true);
  
  const hasChildren = () => props.node.children && props.node.children.length > 0;
  
  const doneCount = () => props.node.totalCount - props.node.notDoneCount;
  
  const percentage = () => {
    if (props.node.totalCount === 0) return 0;
    return Math.round((doneCount() / props.node.totalCount) * 100);
  };
  
  return (
    <div class="ml-4 pl-4 py-2 relative border-l border-gray-200">
      <div class="flex items-center space-x-3 mb-2">
        <Show when={hasChildren()}>
          <button 
            type="button" 
            onClick={() => setIsOpen(!isOpen())}
            class="w-5 h-5 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-600 rounded text-xs transition-colors cursor-pointer"
          >
            {isOpen() ? "▼" : "▶"}
          </button>
        </Show>
        <Show when={!hasChildren()}>
          <span class="w-5" />
        </Show>
        <span class="text-gray-500 font-mono text-sm">#{props.node.number}</span>
        <a href={props.node.url} target="_blank" class="font-medium text-blue-600 hover:text-blue-800 hover:underline">
          {props.node.title}
        </a>
        <span class={`text-xs px-2 py-0.5 rounded font-medium ${props.node.isDone ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
          {props.node.isDone ? "Done" : "Open"}
        </span>
        <Show when={hasChildren()}>
          <div class="flex items-center space-x-2 text-sm text-gray-500 ml-4">
            <span>({props.node.notDoneCount}/{props.node.totalCount} open)</span>
            <div class="w-24 h-2 bg-gray-200 rounded-full overflow-hidden flex">
              <div class="h-full bg-blue-500 transition-all duration-300" style={{ width: `${percentage()}%` }}></div>
            </div>
            <span class="text-xs text-gray-400">{percentage()}%</span>
          </div>
        </Show>
      </div>
      <Show when={hasChildren() && isOpen()}>
        <div class="mt-1">
          <For each={props.node.children}>
            {(child) => <IssueTreeNode node={child} />}
          </For>
        </div>
      </Show>
    </div>
  );
}
