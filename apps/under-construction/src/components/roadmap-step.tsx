export interface RoadmapStepProps {
  step: number;
  title: string;
  body: string;
  current?: boolean;
  last?: boolean;
  currentLabel?: string;
}

export function RoadmapStep(props: RoadmapStepProps) {
  return (
    <div class="flex gap-6">
      {/* Step indicator */}
      <div class="flex flex-col items-center">
        <div
          class={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold font-fam-msq shrink-0 border-2 ${
            props.current
              ? 'bg-col-accent text-col-accent-fg border-col-accent'
              : 'bg-col-bg text-col-text-subtle border-col-border'
          }`}
        >
          {props.step}
        </div>
        {!props.last && <div class="w-0.5 flex-1 mt-2 bg-col-border min-h-8" />}
      </div>

      {/* Content */}
      <div class="pb-10 flex-1">
        <div class="flex items-center gap-3 mb-1">
          <p class="font-bold text-col-text font-fam-msq">{props.title}</p>
          {props.current && props.currentLabel && (
            <span class="text-xs px-2 py-0.5 rounded-full bg-col-accent text-col-accent-fg font-semibold">
              {props.currentLabel}
            </span>
          )}
        </div>
        <p class="text-sm text-col-text-muted leading-relaxed">{props.body}</p>
      </div>
    </div>
  );
}
