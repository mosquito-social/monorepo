import { A } from "@solidjs/router";
import { For, Show } from "solid-js";

type NavItem = {
  title: string;
  path?: string;
  children?: NavItem[];
};

const navigation: NavItem[] = [
  {
    title: "Introduction",
    path: "intro",
  },
  {
    title: "Design Space",
    path: "design-space",
    children: [
      {
        title: "Design System",
        path: "design-system",
      },
    ],
  },
  {
    title: "Collab Space",
    path: "collab-space",
    children: [
      {
        title: "Feature Collection",
        path: "feature-collection",
      },
      {
        title: "Issues",
        path: "issues",
      },
    ],
  },
];

function TreeNode(props: { node: NavItem }) {
  return (
    <li class="my-1">
      <Show
        when={props.node.path}
        fallback={
          <span class="block py-1.5 text-sm font-bold text-cf-10">
            {props.node.title}
          </span>
        }
      >
        <A
          href={`/docs/${props.node.path}`}
          class="block rounded-md text-sm text-cf-20 hover:text-cf-0 hover:underline transition-colors p-1"
          activeClass="font-semibold text-cp-main bg-cb-30"
        >
          {props.node.title}
        </A>
      </Show>
      <Show when={props.node.children && props.node.children.length > 0}>
        <ul class="pl-2 mt-1 border-l border-cl-20 ml-2">
          <For each={props.node.children}>
            {(child) => <TreeNode node={child} />}
          </For>
        </ul>
      </Show>
    </li>
  );
}

export default function DocsLayout(props: any) {
  return (
    <div class="flex flex-col md:flex-row gap-5">
      <aside class="md:w-56 flex-shrink-0 md:sticky md:top-24 md:max-h-[calc(100vh-8rem)] overflow-y-auto">
        <h2 class="font-bold text-xl mb-4 text-cf-10">Documentation</h2>
        <ul class="m-0 p-0">
          <For each={navigation}>{(node) => <TreeNode node={node} />}</For>
        </ul>
      </aside>
      <main class="flex-1 min-w-0">{props.children}</main>
    </div>
  );
}
