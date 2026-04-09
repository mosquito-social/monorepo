import { JSX } from 'solid-js';

export interface FeatureTileProps {
  icon: JSX.Element;
  title: string;
  body: string;
}

export function FeatureTile(props: FeatureTileProps) {
  return (
    <div class="flex flex-col gap-3 p-6 bg-col-bg rounded-xl border border-col-border-subtle">
      <div class="w-10 h-10 flex items-center justify-center text-col-accent">
        {props.icon}
      </div>
      <p class="font-semibold text-col-text font-fam-msq">{props.title}</p>
      <p class="text-sm text-col-text-muted leading-relaxed">{props.body}</p>
    </div>
  );
}
