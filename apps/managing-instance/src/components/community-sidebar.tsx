import { A } from '@solidjs/router';
import { Button, Tag } from 'mosquito-design-system';
import { Show } from 'solid-js';
import type { Community, Member } from '../types';

interface CommunitySidebarProps {
  community: Community;
  membership: Member | null;
}

export function CommunitySidebar(props: CommunitySidebarProps) {
  const slug = () => props.community.slug;
  const isAdmin = () => props.membership?.role === 'admin';

  const navItems = () => [
    { label: 'Home', href: `/community/${slug()}`, end: true },
    { label: 'Events', href: `/community/${slug()}/events`, end: false },
    { label: 'Members', href: `/community/${slug()}/members`, end: false },
    { label: 'Chat', href: `/community/${slug()}/chats`, end: false },
  ];

  return (
    <aside class="w-80 flex-shrink-0 border-r border-col-line sticky top-0 h-screen overflow-y-auto flex flex-col">
      {/* Community card header */}
      <div class="relative h-36 flex-shrink-0 overflow-hidden">
        <img
          src={props.community.bgImageUrl}
          alt=""
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
        <img
          src={props.community.logoUrl}
          alt={props.community.name}
          class="absolute bottom-3 left-4 w-12 h-16 rounded-lg bg-white/90 object-contain p-1.5 shadow-sm"
        />
      </div>

      <div class="p-4 flex flex-col gap-4 flex-1">
        {/* Title + description */}
        <div>
          <h1 class="text-fs-5 font-fam-msq font-black text-col-fg-strong leading-tight">
            {props.community.name}
          </h1>
          <p class="text-fs-2 text-col-fg-soft mt-1 leading-relaxed">
            {props.community.description}
          </p>
        </div>

        {/* Membership state */}
        <Show when={!props.membership}>
          <Button variant="primary" size="sm" href="#">
            Ask to Join
          </Button>
        </Show>
        <Show when={isAdmin()}>
          <Tag variant="accent">You are the organizer</Tag>
        </Show>

        {/* Navigation */}
        <nav class="flex flex-col gap-1 mt-2">
          {navItems().map((item) => (
            <A
              href={item.href}
              end={item.end}
              class="px-3 py-2 rounded-lg text-fs-2 font-medium text-col-fg transition-colors hover:bg-col-surface no-underline"
              activeClass="bg-col-accent/10 font-bold text-col-accent"
            >
              {item.label}
            </A>
          ))}
        </nav>

        <Show when={isAdmin()}>
          <div class="mt-4 pt-4 border-t border-col-line flex flex-col gap-2">
            <p class="px-3 text-fs-1 font-bold font-fam-msq tracking-widest text-col-fg-weak uppercase">
              Administration
            </p>
            <A
              href={`/community/${slug()}/settings`}
              class="px-3 py-2 rounded-lg text-fs-2 font-medium text-col-fg transition-colors hover:bg-col-surface no-underline"
              activeClass="bg-col-accent/10 font-bold text-col-accent"
            >
              Community Settings
            </A>
            <A
              href={`/community/${slug()}/new-event`}
              class="px-3 py-2 rounded-lg text-fs-2 font-medium text-col-fg transition-colors hover:bg-col-surface no-underline"
              activeClass="bg-col-accent/10 font-bold text-col-accent"
            >
              Create Event
            </A>
          </div>
        </Show>
      </div>
    </aside>
  );
}
