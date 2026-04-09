import { JSX, splitProps } from 'solid-js';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-col-accent text-col-accent-fg hover:bg-col-accent-hover',
  secondary: 'border border-col-border text-col-text hover:bg-col-surface',
  ghost: 'text-col-text-muted hover:text-col-text',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

export function Button(props: ButtonProps) {
  const [local, rest] = splitProps(props, ['variant', 'size', 'class', 'children']);
  const variant = () => local.variant ?? 'primary';
  const size = () => local.size ?? 'md';

  return (
    <button
      {...rest}
      class={`inline-flex items-center justify-center rounded-lg font-semibold transition-colors cursor-pointer ${variantClasses[variant()]} ${sizeClasses[size()]} ${local.class ?? ''}`.trim()}
    >
      {local.children}
    </button>
  );
}
