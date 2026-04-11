import { For, Show, createSignal } from 'solid-js';
import type { IssueNode } from '../utils/github';

export function IssueTreeNode(props: { node: IssueNode }) {
  const [isOpen, setIsOpen] = createSignal(false);

  const hasChildren = () =>
    props.node.children && props.node.children.length > 0;

  const doneCount = () => props.node.totalCount - props.node.notDoneCount;

  const percentage = () => {
    if (props.node.totalCount === 0) return 0;
    return Math.round((doneCount() / props.node.totalCount) * 100);
  };

  return (
    <div class="pl-4 py-2">
      <div class="flex items-center space-x-3 mb-2">
        <Show when={hasChildren()}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen())}
            class="w-5 h-5 flex items-center justify-center text-col-fg-strong hover:text-col-accent-strong text-fs-1 transition-colors cursor-pointer"
          >
            {isOpen() ? '▼' : '▶'}
          </button>
        </Show>
        <Show when={!hasChildren()}>
          <span class="w-5" />
        </Show>
        <span
          class={`text-xs px-2 rounded uppercase`}
          classList={{
            'text-col-fg-weak': props.node.isDone,
            'text-col-accent-strong': !props.node.isDone,
          }}
        >
          {props.node.isDone ? 'Done' : 'Open'}
        </span>
        <a
          href={props.node.url}
          target="_blank"
          class="transition-colors group flex items-center gap-2 grow"
        >
          <span class="text-col-fg font-mono text-fs-1 group-hover:text-col-accent-strong">
            #{props.node.number.toString().padStart(3, '0')}
          </span>
          <span class="text-col-fg text-fs-2 group-hover:text-col-accent-strong">
            {props.node.title}
          </span>
        </a>
        <div class="w-30">
          <Show when={hasChildren()}>
            <div class="flex items-center space-x-2 text-fs-2 text-col-fg ml-4 font-fam-mono">
              <div class="w-24 h-2 bg-col-bg-weak rounded-full overflow-hidden flex">
                <div
                  class="h-full bg-col-accent transition-all duration-300"
                  style={{ width: `${percentage()}%` }}
                ></div>
              </div>
              <span>
                {doneCount()}/{props.node.totalCount}
              </span>
            </div>
          </Show>
        </div>
      </div>
      <Show when={hasChildren() && isOpen()}>
        <div class="mb-1">
          <For each={props.node.children}>
            {(child) => <IssueTreeNode node={child} />}
          </For>
        </div>
      </Show>
    </div>
  );
}
