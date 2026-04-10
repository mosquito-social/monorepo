import { JSX, splitProps } from "solid-js";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-col-accent text-col-bg hover:bg-col-accent-strong hover:text-col-bg-strong",
  secondary: "border border-col-border text-col-text hover:bg-col-surface",
  ghost: "text-col-text-muted hover:text-col-text",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-fs-2 font-fam-msq font-bold",
  md: "px-6 py-3 text-fs-3 font-fam-msq font-bold",
  lg: "px-8 py-4 text-fs-4 font-fam-msq font-black",
};

export function Button(props: ButtonProps) {
  const [local, rest] = splitProps(props, [
    "variant",
    "size",
    "class",
    "children",
  ]);
  const variant = () => local.variant ?? "primary";
  const size = () => local.size ?? "md";

  return (
    <button
      {...rest}
      class={`inline-flex items-center justify-center rounded-full font-semibold transition-colors cursor-pointer ${variantClasses[variant()]} ${sizeClasses[size()]} ${local.class ?? ""}`.trim()}
    >
      {local.children}
    </button>
  );
}
