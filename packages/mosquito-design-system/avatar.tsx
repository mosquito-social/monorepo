import { JSX, Show } from 'solid-js';

export interface AvatarUser {
  displayName: string;
  avatarUrl?: string;
}

type AvatarSize = 'sm' | 'md' | 'lg';

const sizeClasses: Record<AvatarSize, string> = {
  sm: 'w-8 h-8 text-fs-1',
  md: 'w-10 h-10 text-fs-2',
  lg: 'w-14 h-14 text-fs-3',
};

export interface AvatarProps {
  user: AvatarUser;
  size?: AvatarSize;
  class?: string;
}

export function Avatar(props: AvatarProps) {
  const size = () => props.size ?? 'md';
  const initials = () => {
    const parts = props.user.displayName.trim().split(' ');
    return parts.length >= 2
      ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
      : parts[0].slice(0, 2).toUpperCase();
  };

  return (
    <div
      class={`${sizeClasses[size()]} rounded-full overflow-hidden flex-shrink-0 ${props.class ?? ''}`.trim()}
    >
      <Show
        when={props.user.avatarUrl}
        fallback={
          <div class="w-full h-full bg-col-accent flex items-center justify-center font-fam-msq font-bold text-col-bg">
            {initials()}
          </div>
        }
      >
        <img
          src={props.user.avatarUrl}
          alt={props.user.displayName}
          class="w-full h-full object-cover"
        />
      </Show>
    </div>
  );
}
