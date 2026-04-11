import { JSX } from 'solid-js';
import { Button } from 'mosquito-design-system/button';

export interface CtaCardProps {
  title: string;
  body: string;
  cta: string;
  icon: JSX.Element;
  href?: string;
  variant?: 'default' | 'accent';
}

export function CtaCard(props: CtaCardProps) {
  return (
    <div
      class={`flex flex-col gap-5 p-8 rounded-2xl border ${
        props.variant === 'accent'
          ? 'bg-col-accent text-col-accent-fg border-col-accent'
          : 'bg-col-bg border-col-border'
      }`}
    >
      <div
        class={`w-12 h-12 rounded-xl flex items-center justify-center ${
          props.variant === 'accent' ? 'bg-col-accent-fg/10' : 'bg-col-surface'
        }`}
      >
        {props.icon}
      </div>
      <div class="flex flex-col gap-2">
        <p
          class={`font-bold text-lg font-fam-msq ${
            props.variant === 'accent' ? 'text-col-accent-fg' : 'text-col-text'
          }`}
        >
          {props.title}
        </p>
        <p
          class={`text-sm leading-relaxed ${
            props.variant === 'accent' ? 'text-col-accent-fg/80' : 'text-col-text-muted'
          }`}
        >
          {props.body}
        </p>
      </div>
      <Button
        variant={props.variant === 'accent' ? 'secondary' : 'primary'}
        class={
          props.variant === 'accent'
            ? 'bg-col-accent-fg text-col-accent hover:bg-col-accent-fg/90 border-transparent'
            : ''
        }
      >
        {props.cta}
      </Button>
    </div>
  );
}
