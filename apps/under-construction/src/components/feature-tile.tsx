import { JSX } from "solid-js";

export interface FeatureTileProps {
  icon: JSX.Element;
  title: string;
  body: string;
}

export function FeatureTile(props: FeatureTileProps) {
  return (
    <div class="flex flex-col gap-3 p-6 bg-col-bg-soft rounded-xl border border-col-line">
      <div class="w-10 h-10 flex items-center justify-center text-col-accent">
        {props.icon}
      </div>
      <p class="text-fs-4 font-bold text-col-fg font-fam-msq">{props.title}</p>
      <p class="text-fs-3 text-col-fg-soft leading-relaxed">{props.body}</p>
    </div>
  );
}
