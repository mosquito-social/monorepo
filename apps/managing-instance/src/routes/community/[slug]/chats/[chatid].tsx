import { A, useParams } from '@solidjs/router';
import { Avatar, Button, Tag } from 'mosquito-design-system';
import { For, Show, createMemo } from 'solid-js';
import { CommunitySidebar } from '../../../../components/community-sidebar';
import {
  createDmConversation,
  createEventChannelConversation,
  createGroupConversation,
  getChannelMeta,
  getDmMeta,
} from '../../../../mocks/conversations';
import { MOCK_COMMUNITIES } from '../../../../mocks/communities';
import { MOCK_EVENTS } from '../../../../mocks/events';
import { MOCK_USERS } from '../../../../mocks/users';
import type { Conversation, Member, Thread } from '../../../../types';

const CURRENT_USER = MOCK_USERS[0];

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
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
}

interface ChannelMeta {
  hasContent: boolean;
  unreadCount: number;
}

interface ChatChannelSidebarProps {
  communitySlug: string;
  isAdmin: boolean;
  communityEvents: (typeof MOCK_EVENTS)[number][];
  members: (typeof MOCK_USERS)[number][];
  channelMeta: Record<string, ChannelMeta>;
}

function UnreadBadge(props: { count: number }) {
  return (
    <Show when={props.count > 0}>
      <span class="ml-auto min-w-[18px] h-[18px] rounded-full bg-col-accent text-white text-[10px] font-bold flex items-center justify-center px-1">
        {props.count}
      </span>
    </Show>
  );
}

function ChatChannelSidebar(props: ChatChannelSidebarProps) {
  const base = () => `/community/${props.communitySlug}/chats`;

  const channelLinkClass = (hasContent: boolean) =>
    `flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-fs-2 transition-colors hover:bg-col-surface no-underline ${
      hasContent ? 'text-col-fg' : 'text-col-fg-weak opacity-50'
    }`;

  const dmLinkClass = (hasContent: boolean) =>
    `flex items-center gap-2 px-2 py-1.5 rounded-lg text-fs-2 transition-colors hover:bg-col-surface no-underline ${
      hasContent ? 'text-col-fg' : 'text-col-fg-weak opacity-50'
    }`;

  // Sort: channels/DMs with content first, empty ones at bottom
  const sortedMembers = createMemo(() => {
    const members = props.members.filter((m) => m.id !== CURRENT_USER.id);
    return [
      ...members.filter((m) => props.channelMeta[m.id]?.hasContent !== false),
      ...members.filter((m) => props.channelMeta[m.id]?.hasContent === false),
    ];
  });

  const sortedEvents = createMemo(() => {
    const events = props.communityEvents;
    return [
      ...events.filter((e) => props.channelMeta[e.slug]?.hasContent !== false),
      ...events.filter((e) => props.channelMeta[e.slug]?.hasContent === false),
    ];
  });

  return (
    <div class="w-56 flex-shrink-0 border-r border-col-line h-full overflow-y-auto flex flex-col bg-col-bg-weak">
      <div class="p-3 flex flex-col gap-1">
        <p class="px-2 py-1 text-fs-1 font-bold font-fam-msq tracking-widest text-col-fg-weak uppercase">
          Channels
        </p>
        {/* #all-members */}
        {(() => {
          const meta = props.channelMeta['general'] ?? { hasContent: true, unreadCount: 0 };
          return (
            <A
              href={`${base()}/general`}
              end={true}
              class={channelLinkClass(meta.hasContent)}
              activeClass="bg-col-accent/10 font-bold text-col-accent opacity-100"
            >
              <span class="text-col-fg-weak">#</span>
              all-members
              <UnreadBadge count={meta.unreadCount} />
            </A>
          );
        })()}
        {/* #organizers (admin only) */}
        <Show when={props.isAdmin}>
          {(() => {
            const meta = props.channelMeta['organizers'] ?? { hasContent: true, unreadCount: 0 };
            return (
              <A
                href={`${base()}/organizers`}
                end={true}
                class={channelLinkClass(meta.hasContent)}
                activeClass="bg-col-accent/10 font-bold text-col-accent opacity-100"
              >
                <span class="text-col-fg-weak">#</span>
                organizers
                <UnreadBadge count={meta.unreadCount} />
              </A>
            );
          })()}
        </Show>
        {/* Event channels */}
        <For each={sortedEvents()}>
          {(event) => {
            const meta = props.channelMeta[event.slug] ?? { hasContent: false, unreadCount: 0 };
            return (
              <A
                href={`${base()}/${event.slug}`}
                end={true}
                class={channelLinkClass(meta.hasContent)}
                activeClass="bg-col-accent/10 font-bold text-col-accent opacity-100"
              >
                <span class="text-col-fg-weak">#</span>
                <span class="truncate flex-1">
                  {event.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                </span>
                <UnreadBadge count={meta.unreadCount} />
              </A>
            );
          }}
        </For>
      </div>

      <div class="p-3 flex flex-col gap-1">
        <p class="px-2 py-1 text-fs-1 font-bold font-fam-msq tracking-widest text-col-fg-weak uppercase">
          Direct Messages
        </p>
        <For each={sortedMembers()}>
          {(member) => {
            const meta = props.channelMeta[member.id] ?? { hasContent: true, unreadCount: 0 };
            return (
              <A
                href={`${base()}/${member.id}`}
                end={true}
                class={dmLinkClass(meta.hasContent)}
                activeClass="bg-col-accent/10 font-bold text-col-accent opacity-100"
              >
                <Avatar user={member} size="xs" />
                <span class="truncate flex-1">{member.displayName}</span>
                <UnreadBadge count={meta.unreadCount} />
              </A>
            );
          }}
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
  const isCurrentUser = (userId: string) => userId === CURRENT_USER.id;
  const isAdmin = (userId: string) =>
    props.communityMembers.some((m) => m.user.id === userId && m.role === 'admin');

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
                isCurrentUser(props.thread.author.id) ? 'text-col-accent' : 'text-col-fg-strong'
              }`}
            >
              {props.thread.author.displayName}
            </span>
            <Show when={isAdmin(props.thread.author.id)}>
              <Tag variant="accent">Organizer</Tag>
            </Show>
            <span class="text-fs-1 text-col-fg-weak">
              {formatTimestamp(props.thread.createdAt)}
            </span>
          </div>
          <p class="text-fs-2 text-col-fg leading-relaxed">{props.thread.content}</p>

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
                            isCurrentUser(reply.author.id)
                              ? 'text-col-accent'
                              : 'text-col-fg-strong'
                          }`}
                        >
                          {reply.author.displayName}
                        </span>
                        <Show when={isAdmin(reply.author.id)}>
                          <Tag variant="accent">Organizer</Tag>
                        </Show>
                        <span class="text-fs-1 text-col-fg-weak">
                          {formatTimestamp(reply.createdAt)}
                        </span>
                      </div>
                      <p class="text-fs-2 text-col-fg leading-relaxed">{reply.content}</p>
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

function EmptyChannelState(props: { channelName: string; isDM: boolean }) {
  return (
    <div class="flex-1 flex flex-col items-center justify-center gap-4 text-center px-6">
      <div class="w-16 h-16 rounded-2xl bg-col-surface flex items-center justify-center text-3xl">
        {props.isDM ? '💬' : '#'}
      </div>
      <div>
        <h3 class="text-fs-4 font-fam-msq font-bold text-col-fg-strong mb-1">
          {props.isDM ? `Start a conversation with ${props.channelName}` : `Nothing here yet`}
        </h3>
        <p class="text-fs-2 text-col-fg-soft max-w-xs">
          {props.isDM
            ? 'This is the beginning of your direct message history.'
            : `${props.channelName} is quiet for now. Be the first to say something.`}
        </p>
      </div>
    </div>
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

  // Compute channel metadata for the entire sidebar
  const channelMeta = createMemo((): Record<string, ChannelMeta> => {
    const meta: Record<string, ChannelMeta> = {};
    meta['general'] = getChannelMeta('general');
    meta['organizers'] = getChannelMeta('organizers');
    for (const event of communityEvents()) {
      meta[event.slug] = getChannelMeta(event.slug);
    }
    for (const member of members()) {
      if (member.id !== CURRENT_USER.id) {
        meta[member.id] = getDmMeta(member.id);
      }
    }
    return meta;
  });

  // Resolve the conversation for the active channel
  const currentConversation = createMemo((): Conversation | null => {
    const c = community();
    if (!c) return null;
    const chatid = params.chatid;

    // DM
    const dmTarget = members().find((m) => m.id === chatid);
    if (dmTarget) {
      const meta = getDmMeta(dmTarget.id);
      if (!meta.hasContent) return { threads: [], unreadCount: 0 };
      return createDmConversation(CURRENT_USER, dmTarget);
    }

    // #organizers
    if (chatid === 'organizers') {
      const organizer = c.members.find((m) => m.role === 'admin')?.user;
      if (!organizer) return null;
      const others = c.members.map((m) => m.user).filter((u) => u.id !== organizer.id);
      return createGroupConversation({
        organizer,
        currentUser: CURRENT_USER,
        others,
        communityName: c.name,
        channelType: 'organizers',
      });
    }

    // #general
    if (chatid === 'general') {
      const organizer = c.members.find((m) => m.role === 'admin')?.user;
      if (!organizer) return null;
      const others = c.members
        .map((m) => m.user)
        .filter((u) => u.id !== organizer.id && u.id !== CURRENT_USER.id)
        .slice(0, 3);
      return createGroupConversation({
        organizer,
        currentUser: CURRENT_USER,
        others,
        communityName: c.name,
        channelType: 'general',
      });
    }

    // Event channel
    const event = communityEvents().find((e) => e.slug === chatid);
    if (event) {
      const organizer = c.members.find((m) => m.role === 'admin')?.user;
      if (!organizer) return null;
      const others = (event.attendees ?? []).filter(
        (u) => u.id !== organizer.id && u.id !== CURRENT_USER.id,
      );
      return createEventChannelConversation({
        eventTitle: event.title,
        eventSlug: event.slug,
        organizer,
        currentUser: CURRENT_USER,
        others,
      }) ?? { threads: [], unreadCount: 0 };
    }

    return null;
  });

  const threads = createMemo(() => currentConversation()?.threads ?? []);

  const channelName = createMemo(() =>
    resolveChannelName(params.chatid, communityEvents(), members()),
  );

  const isDM = createMemo(() => members().some((m) => m.id === params.chatid));
  const dmUser = createMemo(() => members().find((m) => m.id === params.chatid));

  return (
    <Show
      when={community()}
      fallback={
        <div class="min-h-[60vh] flex flex-col items-center justify-center gap-6 text-center px-4">
          <div class="text-5xl font-black font-fam-msq text-col-fg-weak">404</div>
          <h1 class="text-fs-6 font-fam-msq font-bold text-col-fg-strong">Community not found</h1>
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
            channelMeta={channelMeta()}
          />

          {/* Chat area */}
          <div class="flex-1 flex flex-col min-w-0 bg-col-bg">
            {/* Header */}
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
                    <span class="text-fs-2 text-col-fg-soft ml-2">Direct message</span>
                  </>
                )}
              </Show>
            </div>

            {/* Thread area: empty state or messages */}
            <Show
              when={threads().length > 0}
              fallback={
                <EmptyChannelState
                  channelName={isDM() ? (dmUser()?.displayName ?? channelName()) : channelName()}
                  isDM={isDM()}
                />
              }
            >
              <div class="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-8">
                <div class="max-w-3xl w-full mx-auto flex flex-col gap-8">
                  <For each={threads()}>
                    {(thread) => (
                      <ThreadItem thread={thread} communityMembers={c().members} />
                    )}
                  </For>
                </div>
              </div>
            </Show>

            {/* Input */}
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
