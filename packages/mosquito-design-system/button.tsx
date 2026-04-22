import { A } from '@solidjs/router';
import { JSX, splitProps } from 'solid-js';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps
  extends JSX.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-col-accent border-2 border-col-accent text-col-text-strong hover:bg-col-accent-weak',
  secondary: 'border-2 border-col-border text-col-text hover:bg-col-bg-soft',
  ghost:
    'text-col-fg-soft border-2 border-transparent hover:border-col-border hover:text-col-fg-strong',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-1 text-fs-3 font-fam-msq font-bold',
  md: 'px-6 py-2 text-fs-4 font-fam-msq font-bold',
  lg: 'px-8 py-3 text-fs-5 font-fam-msq font-bold',
};

export function Button(props: ButtonProps) {
  const [local, rest] = splitProps(props, [
    'variant',
    'size',
    'class',
    'children',
  ]);
  const variant = () => local.variant ?? 'primary';
  const size = () => local.size ?? 'md';

  return (
    <A
      href={props.href ?? '#'}
      {...rest}
      class={`inline-flex items-center justify-center rounded-full font-semibold transition-colors cursor-pointer ${variantClasses[variant()]} ${sizeClasses[size()]}`.trim()}
    >
      {local.children}
    </A>
  );
}
