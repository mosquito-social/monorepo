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
    <div class="ml-4 pl-4 py-2 relative border-l border-cl-10">
      <div class="flex items-center space-x-3 mb-2">
        <Show when={hasChildren()}>
          <button 
            type="button" 
            onClick={() => setIsOpen(!isOpen())}
            class="w-5 h-5 flex items-center justify-center bg-cb-30 hover:bg-cb-10 text-cf-20 rounded text-xs transition-colors cursor-pointer"
          >
            {isOpen() ? "▼" : "▶"}
          </button>
        </Show>
        <Show when={!hasChildren()}>
          <span class="w-5" />
        </Show>
        <span class="text-cf-10 font-mono text-sm">#{props.node.number}</span>
        <a href={props.node.url} target="_blank" class="font-bold text-cf-30 hover:text-cp-main transition-colors hover:underline">
          {props.node.title}
        </a>
        <span class={`text-xs px-2 py-0.5 rounded font-bold ${props.node.isDone ? 'bg-cb-30 text-cf-20' : 'bg-cp-main text-cb-10'}`}>
          {props.node.isDone ? "Done" : "Open"}
        </span>
        <Show when={hasChildren()}>
          <div class="flex items-center space-x-2 text-sm text-cf-10 ml-4 font-mono">
            <span>({props.node.notDoneCount}/{props.node.totalCount} open)</span>
            <div class="w-24 h-2 bg-cb-30 rounded-full overflow-hidden flex">
              <div class="h-full bg-cs-main transition-all duration-300" style={{ width: `${percentage()}%` }}></div>
            </div>
            <span class="text-xs text-cf-10">{percentage()}%</span>
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
