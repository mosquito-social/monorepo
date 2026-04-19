import { A, useParams } from '@solidjs/router';
import { Avatar, Button, Tag } from 'mosquito-design-system';
import { For, Show, createMemo } from 'solid-js';
import { CommunitySidebar } from '../../../components/community-sidebar';
import { MOCK_COMMUNITIES } from '../../../mocks/communities';
import { MOCK_EVENTS } from '../../../mocks/events';
import { MOCK_USERS } from '../../../mocks/users';
import type { Community } from '../../../types';

// Alice is the current user for prototyping
const CURRENT_USER = MOCK_USERS[0];

type PostType = 'text' | 'announcement' | 'image' | 'link';

interface Post {
  id: string;
  type: PostType;
  author: (typeof MOCK_USERS)[number];
  content: string;
  imageUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  ogImage?: string;
  createdAt: Date;
}

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    type: 'announcement',
    author: MOCK_USERS[0],
    content:
      '📣 Our next meetup is confirmed! Save the date for April 24th at Design Offices Frankfurt Westend. Two great talks lined up — see the Events section for details.',
    createdAt: new Date('2026-04-15T10:00:00Z'),
  },
  {
    id: '2',
    type: 'text',
    author: MOCK_USERS[1],
    content:
      'Just shipped my first Bun-powered API in production this week. The cold start performance is genuinely impressive. Anyone else running Bun in prod? Happy to share notes.',
    createdAt: new Date('2026-04-14T16:30:00Z'),
  },
  {
    id: '3',
    type: 'image',
    author: MOCK_USERS[2],
    content:
      "Last month's meetup crowd — what a turnout! Looking forward to the next one.",
    imageUrl:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    createdAt: new Date('2026-04-10T18:45:00Z'),
  },
  {
    id: '4',
    type: 'link',
    author: MOCK_USERS[3],
    content:
      "Found this deep-dive on SolidJS signals vs React state really well written. Worth your time if you're considering the switch.",
    ogTitle: 'SolidJS vs React: A Deep Dive into Reactivity',
    ogDescription:
      "An in-depth comparison of SolidJS fine-grained reactivity and React's virtual DOM model, with benchmarks and migration patterns.",
    ogUrl: 'https://example.com/solidjs-vs-react',
    ogImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600',
    createdAt: new Date('2026-04-08T11:00:00Z'),
  },
  {
    id: '5',
    type: 'text',
    author: MOCK_USERS[2],
    content:
      "Reminder: the CFP for the May workshop is open until the end of the month. We need 2–3 speakers. Drop a reply here or ping me directly if you're interested.",
    createdAt: new Date('2026-04-07T09:00:00Z'),
  },
];

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(date);
}

function formatPostTime(date: Date) {
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
  );
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(date);
}

function CalendarLeaf(props: { date: Date }) {
  const month = () =>
    new Intl.DateTimeFormat('en-US', { month: 'short' })
      .format(props.date)
      .toUpperCase();
  const day = () => props.date.getDate();

  return (
    <div class="flex-shrink-0 w-12 h-12 rounded-xl overflow-hidden border border-col-line flex flex-col items-center">
      <div class="w-full bg-col-accent text-col-bg text-center text-fs-1 font-bold font-fam-msq py-0.5 leading-tight">
        {month()}
      </div>
      <div class="flex-1 flex items-center justify-center text-fs-4 font-black font-fam-msq text-col-fg-strong">
        {day()}
      </div>
    </div>
  );
}

function PostCard(props: { post: Post; community: Community }) {
  const p = props.post;
  const isAuthorAdmin = () =>
    props.community.members.some(
      (m) => m.user.id === p.author.id && m.role === 'admin',
    );

  return (
    <article class="bg-col-bg border border-col-line rounded-2xl overflow-hidden">
      <div class="p-4 flex items-start gap-3">
        <Avatar user={p.author} size="sm" />
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-fs-2 font-bold font-fam-msq text-col-fg-strong">
              {p.author.displayName}
            </span>
            <Show when={isAuthorAdmin()}>
              <Tag variant="accent">Organizer</Tag>
            </Show>
            <span class="text-fs-1 text-col-fg-weak">
              {formatPostTime(p.createdAt)}
            </span>
          </div>
          <Show when={p.type === 'announcement'}>
            <div class="bg-col-accent/10 border border-col-accent/30 rounded-xl p-3 text-fs-2 text-col-fg">
              {p.content}
            </div>
          </Show>
          <Show when={p.type !== 'announcement'}>
            <p class="text-fs-2 text-col-fg leading-relaxed">{p.content}</p>
          </Show>
        </div>
      </div>

      <Show when={p.type === 'image' && p.imageUrl}>
        <div class="px-4 pb-4">
          <img
            src={p.imageUrl}
            alt=""
            class="w-full rounded-xl object-cover max-h-64"
          />
        </div>
      </Show>

      <Show when={p.type === 'link'}>
        <div class="mx-4 mb-4 border border-col-line rounded-xl overflow-hidden flex">
          <Show when={p.ogImage}>
            <img
              src={p.ogImage}
              alt=""
              class="w-24 h-24 object-cover flex-shrink-0"
            />
          </Show>
          <div class="p-3 flex flex-col justify-center min-w-0">
            <p class="text-fs-2 font-bold text-col-fg-strong truncate">
              {p.ogTitle}
            </p>
            <p class="text-fs-1 text-col-fg-soft mt-0.5 line-clamp-2">
              {p.ogDescription}
            </p>
            <p class="text-fs-1 text-col-fg-weak mt-1 truncate">{p.ogUrl}</p>
          </div>
        </div>
      </Show>
    </article>
  );
}

export default function CommunityDetailPage() {
  const params = useParams<{ slug: string }>();

  const community = createMemo(
    () => MOCK_COMMUNITIES.find((c) => c.slug === params.slug) ?? null,
  );

  const membership = createMemo(() => {
    const c = community();
    if (!c) return null;
    return c.members.find((m) => m.user.id === CURRENT_USER.id) ?? null;
  });

  const upcomingEvents = createMemo(() => {
    const c = community();
    if (!c) return [];
    return MOCK_EVENTS.filter(
      (e) => e.communityId === c.id && e.status === 'upcoming',
    );
  });

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
          <p class="text-fs-3 text-col-fg-soft max-w-sm">
            We couldn't find a community at this address. It may have been
            removed or the link is incorrect.
          </p>
          <Button href="/" variant="secondary">
            Back to Homepage
          </Button>
        </div>
      }
    >
      {(c) => (
        <div class="flex min-h-screen">
          <CommunitySidebar community={c()} membership={membership()} />

          {/* Main content */}
          <main class="flex-1 overflow-y-auto bg-col-bg-weak">
            <div class="max-w-4xl mx-auto px-6 py-8">
              <div class="grid grid-cols-[1fr_280px] gap-8">
                {/* Posts stream */}
                <section class="flex flex-col gap-4">
                  <h2 class="sr-only">Posts</h2>
                  <For each={MOCK_POSTS}>
                    {(post) => <PostCard post={post} community={c()} />}
                  </For>
                </section>

                {/* Upcoming events */}
                <aside>
                  <h2 class="text-fs-3 font-fam-msq font-bold text-col-fg-strong mb-4">
                    Upcoming Events
                  </h2>
                  <Show
                    when={upcomingEvents().length > 0}
                    fallback={
                      <p class="text-fs-2 text-col-fg-weak">
                        No upcoming events scheduled yet.
                      </p>
                    }
                  >
                    <div class="flex flex-col gap-4">
                      <For each={upcomingEvents()}>
                        {(event) => (
                          <A
                            href={`/events/${event.slug}`}
                            class="flex gap-3 no-underline group"
                          >
                            <CalendarLeaf date={event.date} />
                            <div class="flex-1 min-w-0">
                              <p class="text-fs-2 font-bold text-col-fg-strong group-hover:text-col-accent transition-colors leading-tight">
                                {event.title}
                              </p>
                              <p class="text-fs-1 text-col-fg-soft mt-0.5 line-clamp-2 leading-snug">
                                {event.description}
                              </p>
                              <p class="text-fs-1 text-col-fg-weak mt-1 flex items-center gap-1">
                                <span>📍</span>
                                {event.location.label}
                              </p>
                            </div>
                          </A>
                        )}
                      </For>
                    </div>
                  </Show>
                </aside>
              </div>
            </div>
          </main>
        </div>
      )}
    </Show>
  );
}
