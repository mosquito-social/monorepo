export interface UseCaseCardProps {
  name: string;
  description: string;
  gradient: string;
}

export function UseCaseCard(props: UseCaseCardProps) {
  return (
    <div class="snap-start shrink-0 w-[78vw] sm:w-[54vw] md:w-[40vw] lg:w-[34vw] bg-col-surface rounded-2xl overflow-hidden border border-col-border-subtle">
      <div
        class="aspect-[4/3] w-full"
        style={`background: ${props.gradient}`}
        aria-hidden="true"
      />
      <div class="p-6 flex flex-col gap-2">
        <p class="text-fs-3 font-semibold uppercase tracking-wider text-col-tag-text font-fam-msq">
          {props.name}
        </p>
        <p class="text-col-fg-soft text-fs-3 leading-relaxed">
          {props.description}
        </p>
      </div>
    </div>
  );
}
