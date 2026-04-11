import { JSX, Show } from "solid-js";

// Import Dynamic to resolve the issue
import { Dynamic } from "solid-js/web";

const comps = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
};

export const Heading = (
  props: JSX.HTMLAttributes<HTMLDivElement> & {
    level: 1 | 2 | 3 | 4;
    super?: string;
    sub?: string;
  },
) => {
  return (
    <div
      {...props}
      classList={{
        "mt-16 mb-8": props.level === 1,
        "mt-12 mb-6": props.level === 2,
        "mt-8 mb-4": props.level === 3,
        "mt-2 mb-1": props.level === 3,
      }}
    >
      <Show when={props.super}>
        <p class="text-fs-2 uppercase text-col-accent-strong tracking-widest font-bold">
          {props.super}
        </p>
      </Show>
      <Dynamic
        component={comps[props.level]}
        class="leading-none text-col-fg-strong"
        classList={{
          "text-fs-7 font-fam-msq font-black my-4": props.level === 1,
          "text-fs-6 font-fam-msq font-black my-3": props.level === 2,
          "text-fs-5 font-bold my-2": props.level === 3,
          "text-fs-3 font-bold my-1": props.level === 4,
        }}
      >
        {props.children}
      </Dynamic>
      <Show when={props.sub}>
        <p
          classList={{
            "text-fs-4 text-col-fg-soft font-light max-w-xl":
              props.level === 2 || props.level === 1,
            "text-fs-3 text-col-fg-soft font-light max-w-xl": props.level === 3,
            "text-fs-2 text-col-fg-soft font-light": props.level === 4,
          }}
        >
          {props.sub}
        </p>
      </Show>
    </div>
  );
};
