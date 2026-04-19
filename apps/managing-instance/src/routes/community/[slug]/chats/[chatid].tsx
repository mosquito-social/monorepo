import { A, useParams } from '@solidjs/router';
import { Avatar, Button, Tag } from 'mosquito-design-system';
import { For, Show, createMemo } from 'solid-js';
import { CommunitySidebar } from '../../../../components/community-sidebar';
import { MOCK_COMMUNITIES } from '../../../../mocks/communities';
import { MOCK_EVENTS } from '../../../../mocks/events';
import { MOCK_USERS } from '../../../../mocks/users';
import type { Member } from '../../../../types';

const CURRENT_USER = MOCK_USERS[0];

interface ThreadReply {
  id: string;
  author: (typeof MOCK_USERS)[number];
  content: string;
  createdAt: Date;
}

interface Thread {
  id: string;
  headline?: string;
  author: (typeof MOCK_USERS)[number];
  content: string;
  createdAt: Date;
  replies: ThreadReply[];
}

const MOCK_THREADS: Thread[] = [
  {
    id: 't1',
    headline: 'Welcome to #all-members 👋',
    author: MOCK_USERS[0],
    content:
      'Welcome everyone to our community channel! This is the main space for community-wide announcements, questions, and general chat. Feel free to introduce yourself or share anything JavaScript-related.',
    createdAt: new Date('2026-04-15T09:00:00Z'),
    replies: [
      {
        id: 't1-r1',
        author: MOCK_USERS[1],
        content:
          "Hey everyone! Just joined last week – super excited to be here. I'm a frontend dev working mostly with React and TypeScript.",
        createdAt: new Date('2026-04-15T09:14:00Z'),
      },
      {
        id: 't1-r2',
        author: MOCK_USERS[3],
        content:
          'Great to have you, Bob! The March meetup was fantastic – looking forward to the next one already.',
        createdAt: new Date('2026-04-15T09:31:00Z'),
      },
      {
        id: 't1-r3',
        author: MOCK_USERS[2],
        content:
          'Hi! Clara here. Been lurking for months, finally decided to show my face 😄 Mostly working on backend stuff but trying to get more into the browser side.',
        createdAt: new Date('2026-04-15T10:02:00Z'),
      },
    ],
  },
  {
    id: 't2',
    author: MOCK_USERS[2],
    content:
      "Anyone experimenting with React 19's server actions in production? I've been building a small app with the new form handling and `useFormState` – the mental model is a bit different from what I expected.",
    createdAt: new Date('2026-04-16T14:22:00Z'),
    replies: [
      {
        id: 't2-r1',
        author: MOCK_USERS[1],
        content:
          'Yeah, `useFormState` got renamed to `useActionState` in the final release, tripped me up for a good hour. Worth reading the migration guide carefully.',
        createdAt: new Date('2026-04-16T14:45:00Z'),
      },
      {
        id: 't2-r2',
        author: MOCK_USERS[0],
        content:
          'This would make a great talk! If you put together a short demo Clara, we could slot you into the May meetup. Want me to add you to the CFP list?',
        createdAt: new Date('2026-04-16T15:10:00Z'),
      },
      {
        id: 't2-r3',
        author: MOCK_USERS[2],
        content:
          "Oh I'd love that! Yes please – I'll put something together over the next two weeks.",
        createdAt: new Date('2026-04-18T15:28:00Z'),
      },
    ],
  },
  {
    id: 't3',
    headline: 'April Meetup – April 24th',
    author: MOCK_USERS[0],
    content:
      'Just a heads-up that our April meetup is confirmed for April 24th at Design Offices Frankfurt Westend. Doors open at 18:30. Two talks lined up: React Server Components in practice + Building CLI tools with Node.js. See the Events section for the full agenda.',
    createdAt: new Date('2026-04-17T10:00:00Z'),
    replies: [
      {
        id: 't3-r1',
        author: MOCK_USERS[3],
        content:
          "Will there be recordings this time? I couldn't make the March one and didn't want to miss it again.",
        createdAt: new Date('2026-04-17T10:35:00Z'),
      },
      {
        id: 't3-r2',
        author: MOCK_USERS[0],
        content:
          "Planning to record both talks, yes! We'll post them to the community within a week of the event.",
        createdAt: new Date('2026-04-17T11:00:00Z'),
      },
    ],
  },
  {
    id: 't4',
    author: MOCK_USERS[3],
    content:
      "Anyone tried deploying a SolidStart app to Cloudflare Workers? Running into some edge runtime issues – it seems like certain Node.js APIs aren't available and I'm not sure how to polyfill them.",
    createdAt: new Date('2026-04-18T08:15:00Z'),
    replies: [
      {
        id: 't4-r1',
        author: MOCK_USERS[1],
        content:
          'The Miniflare local emulator is really solid for catching these early. Check if you have any `fs` or `path` usage – those are the usual culprits on edge runtimes.',
        createdAt: new Date('2026-04-18T08:40:00Z'),
      },
      {
        id: 't4-r2',
        author: MOCK_USERS[0],
        content:
          "We should do a short workshop on edge deployments – the DX has improved massively in the last year. Happy to co-host one if there's interest.",
        createdAt: new Date('2026-04-18T09:05:00Z'),
      },
      {
        id: 't4-r3',
        author: MOCK_USERS[3],
        content:
          "That would be awesome! And yes, pairing would help a lot – I'll ping you on DM Bob, thanks.",
        createdAt: new Date('2026-04-18T09:22:00Z'),
      },
    ],
  },
];

function formatTimestamp(date: Date) {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'Yesterday';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(date);
}

interface ChatChannelSidebarProps {
  communitySlug: string;
  isAdmin: boolean;
  communityEvents: (typeof MOCK_EVENTS)[number][];
  members: (typeof MOCK_USERS)[number][];
}

function ChatChannelSidebar(props: ChatChannelSidebarProps) {
  const base = () => `/community/${props.communitySlug}/chats`;

  return (
    <div class="w-56 flex-shrink-0 border-r border-col-line h-full overflow-y-auto flex flex-col bg-col-bg-weak">
      <div class="p-3 flex flex-col gap-1">
        <p class="px-2 py-1 text-fs-1 font-bold font-fam-msq tracking-widest text-col-fg-weak uppercase">
          Channels
        </p>
        <A
          href={`${base()}/general`}
          end={true}
          class="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-fs-2 text-col-fg transition-colors hover:bg-col-surface no-underline"
          activeClass="bg-col-accent/10 font-bold text-col-accent"
        >
          <span class="text-col-fg-weak">#</span>
          all-members
        </A>
        <Show when={props.isAdmin}>
          <A
            href={`${base()}/organizers`}
            end={true}
            class="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-fs-2 text-col-fg transition-colors hover:bg-col-surface no-underline"
            activeClass="bg-col-accent/10 font-bold text-col-accent"
          >
            <span class="text-col-fg-weak">#</span>
            organizers
          </A>
        </Show>
        <For each={props.communityEvents}>
          {(event) => (
            <A
              href={`${base()}/${event.slug}`}
              end={true}
              class="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-fs-2 text-col-fg transition-colors hover:bg-col-surface no-underline truncate"
              activeClass="bg-col-accent/10 font-bold text-col-accent"
            >
              <span class="text-col-fg-weak">#</span>
              <span class="truncate">
                {event.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
              </span>
            </A>
          )}
        </For>
      </div>

      <div class="p-3 flex flex-col gap-1">
        <p class="px-2 py-1 text-fs-1 font-bold font-fam-msq tracking-widest text-col-fg-weak uppercase">
          Direct Messages
        </p>
        <For each={props.members}>
          {(member) => (
            <A
              href={`${base()}/${member.id}`}
              end={true}
              class="flex items-center gap-2 px-2 py-1.5 rounded-lg text-fs-2 text-col-fg transition-colors hover:bg-col-surface no-underline"
              activeClass="bg-col-accent/10 font-bold text-col-accent"
            >
              <Avatar user={member} size="xs" />
              <span class="truncate">{member.displayName}</span>
            </A>
          )}
        </For>
      </div>
    </div>
  );
}

interface ThreadItemProps {
  thread: Thread;
  communityMembers: Member[];
}

function ThreadItem(props: ThreadItemProps) {
  const isAuthorCurrentUser = (userId: string) => userId === CURRENT_USER.id;
  const isAuthorAdmin = (userId: string) =>
    props.communityMembers.some(
      (m) => m.user.id === userId && m.role === 'admin',
    );

  return (
    <article class="flex flex-col gap-3">
      <Show when={props.thread.headline}>
        <div class="flex items-center gap-3">
          <div class="flex-1 h-px bg-col-line" />
          <span class="text-fs-1 font-bold font-fam-msq text-col-fg-weak tracking-wide uppercase shrink-0">
            {props.thread.headline}
          </span>
          <div class="flex-1 h-px bg-col-line" />
        </div>
      </Show>

      <div class="flex gap-3">
        <div class="flex-shrink-0 mt-0.5">
          <Avatar user={props.thread.author} size="sm" />
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-1">
            <span
              class={`text-fs-2 font-bold font-fam-msq ${
                isAuthorCurrentUser(props.thread.author.id)
                  ? 'text-col-accent'
                  : 'text-col-fg-strong'
              }`}
            >
              {props.thread.author.displayName}
            </span>
            <Show when={isAuthorAdmin(props.thread.author.id)}>
              <Tag variant="accent">Organizer</Tag>
            </Show>
            <span class="text-fs-1 text-col-fg-weak">
              {formatTimestamp(props.thread.createdAt)}
            </span>
          </div>
          <p class="text-fs-2 text-col-fg leading-relaxed">
            {props.thread.content}
          </p>

          <Show when={props.thread.replies.length > 0}>
            <div class="mt-3 pl-3 border-l-2 border-col-line flex flex-col gap-3">
              <For each={props.thread.replies}>
                {(reply) => (
                  <div class="flex gap-2.5">
                    <div class="flex-shrink-0">
                      <Avatar user={reply.author} size="xs" />
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center gap-2 mb-0.5">
                        <span
                          class={`text-fs-2 font-bold font-fam-msq ${
                            isAuthorCurrentUser(reply.author.id)
                              ? 'text-col-accent'
                              : 'text-col-fg-strong'
                          }`}
                        >
                          {reply.author.displayName}
                        </span>
                        <Show when={isAuthorAdmin(reply.author.id)}>
                          <Tag variant="accent">Organizer</Tag>
                        </Show>
                        <span class="text-fs-1 text-col-fg-weak">
                          {formatTimestamp(reply.createdAt)}
                        </span>
                      </div>
                      <p class="text-fs-2 text-col-fg leading-relaxed">
                        {reply.content}
                      </p>
                    </div>
                  </div>
                )}
              </For>
            </div>
          </Show>
        </div>
      </div>
    </article>
  );
}

function resolveChannelName(
  chatid: string,
  events: (typeof MOCK_EVENTS)[number][],
  members: (typeof MOCK_USERS)[number][],
): string {
  if (chatid === 'general') return 'all-members';
  if (chatid === 'organizers') return 'organizers';
  const event = events.find((e) => e.slug === chatid);
  if (event) return event.title;
  const member = members.find((m) => m.id === chatid);
  if (member) return member.displayName;
  return chatid;
}

export default function CommunitySubChannelPage() {
  const params = useParams<{ slug: string; chatid: string }>();

  const community = createMemo(
    () => MOCK_COMMUNITIES.find((c) => c.slug === params.slug) ?? null,
  );

  const membership = createMemo(() => {
    const c = community();
    if (!c) return null;
    return c.members.find((m) => m.user.id === CURRENT_USER.id) ?? null;
  });

  const isAdmin = () => membership()?.role === 'admin';

  const communityEvents = createMemo(() => {
    const c = community();
    if (!c) return [];
    return MOCK_EVENTS.filter((e) => e.communityId === c.id);
  });

  const members = createMemo(() => {
    const c = community();
    if (!c) return [];
    return c.members.map((m) => m.user);
  });

  const channelName = createMemo(() =>
    resolveChannelName(params.chatid, communityEvents(), members()),
  );

  const isDM = createMemo(() => members().some((m) => m.id === params.chatid));

  const dmUser = createMemo(() =>
    members().find((m) => m.id === params.chatid),
  );

  return (
    <Show
      when={community()}
      fallback={
        <div class="min-h-[60vh] flex flex-col items-center justify-center gap-6 text-center px-4">
          <div class="text-5xl font-black font-fam-msq text-col-fg-weak">
            404
          </div>
          <h1 class="text-fs-6 font-fam-msq font-bold text-col-fg-strong">
            Community not found
          </h1>
          <Button href="/" variant="secondary">
            Back to Homepage
          </Button>
        </div>
      }
    >
      {(c) => (
        <div class="flex h-[calc(100vh-4rem)] overflow-hidden">
          <CommunitySidebar community={c()} membership={membership()} />

          <ChatChannelSidebar
            communitySlug={c().slug}
            isAdmin={isAdmin()}
            communityEvents={communityEvents()}
            members={members()}
          />

          {/* Chat area */}
          <div class="flex-1 flex flex-col min-w-0 bg-col-bg">
            {/* Fixed header */}
            <div class="flex-shrink-0 px-6 py-3 border-b border-col-line flex items-center gap-2">
              <Show
                when={isDM() && dmUser()}
                fallback={
                  <>
                    <span class="text-col-fg-weak text-fs-3">#</span>
                    <h2 class="text-fs-3 font-fam-msq font-bold text-col-fg-strong">
                      {channelName()}
                    </h2>
                  </>
                }
              >
                {(user) => (
                  <>
                    <Avatar user={user()} size="xs" />
                    <h2 class="text-fs-3 font-fam-msq font-bold text-col-fg-strong">
                      {user().displayName}
                    </h2>
                    <span class="text-fs-2 text-col-fg-soft ml-2">
                      Direct message
                    </span>
                  </>
                )}
              </Show>
            </div>

            {/* Scrollable threads */}
            <div class="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-8">
              <div class="max-w-3xl w-full mx-auto flex flex-col gap-8">
                <For each={MOCK_THREADS}>
                  {(thread) => (
                    <ThreadItem
                      thread={thread}
                      communityMembers={c().members}
                    />
                  )}
                </For>
              </div>
            </div>

            {/* Fixed input */}
            <div class="flex-shrink-0 px-6 py-4 border-t border-col-line">
              <div class="max-w-3xl mx-auto">
                <div class="flex items-center gap-3 bg-col-surface border border-col-line rounded-xl px-4 py-3">
                  <Avatar user={CURRENT_USER} size="xs" />
                  <input
                    type="text"
                    placeholder={`Message ${isDM() ? dmUser()?.displayName : `#${channelName()}`}`}
                    class="flex-1 bg-transparent text-fs-2 text-col-fg placeholder:text-col-fg-weak outline-none"
                    disabled
                  />
                  <button
                    type="button"
                    class="text-fs-2 text-col-fg-weak hover:text-col-accent transition-colors px-2"
                    aria-label="Send message"
                    disabled
                  >
                    ↑
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Show>
  );
}
