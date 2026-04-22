import { A } from '@solidjs/router';
import { Button, Tag } from 'mosquito-design-system';
import { Show } from 'solid-js';
import type { Community, Member } from '../types';
import { CommunityHeader } from './community-header';

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
    <aside class="w-80 shrink-0 border-r border-col-line sticky top-0 h-screen overflow-y-auto flex flex-col">
      <CommunityHeader
        bgImageUrl={props.community.bgImageUrl}
        logoUrl={props.community.logoUrl}
        name={props.community.name}
        description={props.community.description}
      />

      <div class="px-4 pb-4 flex flex-col gap-4 flex-1">
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
