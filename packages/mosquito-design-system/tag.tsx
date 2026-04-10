import { JSX, splitProps } from "solid-js";

type TagVariant = "default" | "accent" | "muted";

export interface TagProps extends JSX.HTMLAttributes<HTMLSpanElement> {
  variant?: TagVariant;
}

const variantClasses: Record<TagVariant, string> = {
  default: "bg-col-accent-weak/30 text-col-accent-strong",
  accent: "bg-col-accent text-col-accent-fg",
  muted: "bg-col-surface text-col-text-muted",
};

export function Tag(props: TagProps) {
  const [local, rest] = splitProps(props, ["variant", "class", "children"]);
  const variant = () => local.variant ?? "default";

  return (
    <span
      {...rest}
      class={`inline-flex items-center px-3 py-1 rounded-full text-fs-2 ${variantClasses[variant()]} ${local.class ?? ""}`.trim()}
    >
      {local.children}
    </span>
  );
}
