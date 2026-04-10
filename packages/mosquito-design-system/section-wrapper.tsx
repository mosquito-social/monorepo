import { JSX, splitProps } from "solid-js";

type SectionBg = "default" | "weak" | "strong";

export interface SectionWrapperProps extends JSX.HTMLAttributes<HTMLElement> {
  bg?: SectionBg;
  narrow?: boolean;
}

const bgClasses: Record<SectionBg, string> = {
  default: "bg-col-bg",
  weak: "bg-col-bg-weak",
  strong: "bg-col-accent-weak",
};

export function SectionWrapper(props: SectionWrapperProps) {
  const [local, rest] = splitProps(props, [
    "bg",
    "narrow",
    "class",
    "children",
  ]);
  const bg = () => local.bg ?? "default";
  const maxW = () => (local.narrow ? "max-w-3xl" : "max-w-6xl");

  return (
    <section
      {...rest}
      class={`w-full py-16 md:py-24 ${bgClasses[bg()]} ${local.class ?? ""}`.trim()}
    >
      <div class={`${maxW()} mx-auto px-6`}>{local.children}</div>
    </section>
  );
}
