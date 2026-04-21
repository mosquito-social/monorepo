import { Show } from 'solid-js';

interface CommunityHeaderProps {
  bgImageUrl: string;
  logoUrl: string;
  name: string;
  description: string;
  imageHeight?: string;
  badge?: string;
  descriptionClass?: string;
  textStyle?: string;
}

export function CommunityHeader(props: CommunityHeaderProps) {
  return (
    <div>
      <div
        class={`group/img relative ${props.imageHeight ?? 'h-36'} overflow-hidden flex-shrink-0`}
      >
        <img
          src={props.bgImageUrl}
          alt=""
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div class="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/10 transition-colors group-hover/img:from-black/90 group-hover/img:via-black/60 group-hover/img:to-black/20" />
        <img
          src={props.logoUrl}
          alt=""
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4/5 w-auto object-contain opacity-40 brightness-0 invert"
        />
        <Show when={props.badge}>
          <span class="absolute top-3 right-3 rounded-full bg-col-accent/90 px-2.5 py-0.5 text-fs-1 font-semibold text-col-bg backdrop-blur-sm">
            {props.badge}
          </span>
        </Show>
      </div>
      <div class="p-4 bg-col-bg" style={props.textStyle}>
        <p class="text-fs-4 font-fam-msq font-bold text-col-fg-strong leading-tight">
          {props.name}
        </p>
        <p
          class={`text-fs-2 text-col-fg-soft mt-1 leading-relaxed ${props.descriptionClass ?? ''}`}
        >
          {props.description}
        </p>
      </div>
    </div>
  );
}
