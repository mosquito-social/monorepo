import { useParams } from '@solidjs/router';
import { Button } from 'mosquito-design-system';
import { For, Show, createMemo } from 'solid-js';
import { CommunitySidebar } from '../../../components/community-sidebar';
import { MOCK_COMMUNITIES } from '../../../mocks/communities';
import { MOCK_USERS } from '../../../mocks/users';
import type { Member } from '../../../types';

const CURRENT_USER = MOCK_USERS[0];

function formatJoinDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(date);
}

function MemberRow(props: { member: Member }) {
  const isAdmin = () => props.member.role === 'admin';

  return (
    <div class="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-col-surface transition-colors">
      <Show
        when={props.member.user.avatarUrl}
        fallback={
          <div class="w-10 h-10 rounded-full bg-col-accent/20 flex items-center justify-center flex-shrink-0">
            <span class="text-fs-3 font-bold font-fam-msq text-col-accent">
              {props.member.user.firstName[0]}
            </span>
          </div>
        }
      >
        <img
          src={props.member.user.avatarUrl}
          alt={props.member.user.displayName}
          class="w-10 h-10 rounded-full object-cover flex-shrink-0 bg-col-surface"
        />
      </Show>

      <div class="flex-1 min-w-0">
        <p class="text-fs-3 font-semibold text-col-fg-strong leading-tight">
          {props.member.user.displayName}
        </p>
        <Show when={props.member.joinedAt}>
          <p class="text-fs-1 text-col-fg-weak mt-0.5">
            Joined {formatJoinDate(props.member.joinedAt!)}
          </p>
        </Show>
      </div>

      <Show when={isAdmin()}>
        <span class="flex-shrink-0 px-2.5 py-0.5 rounded-full text-fs-1 font-bold font-fam-msq bg-col-accent/10 text-col-accent">
          Organizer
        </span>
      </Show>
    </div>
  );
}

export default function CommunityMembersPage() {
  const params = useParams<{ slug: string }>();

  const community = createMemo(
    () => MOCK_COMMUNITIES.find((c) => c.slug === params.slug) ?? null,
  );

  const membership = createMemo(() => {
    const c = community();
    if (!c) return null;
    return c.members.find((m) => m.user.id === CURRENT_USER.id) ?? null;
  });

  const sortedMembers = createMemo(() => {
    const c = community();
    if (!c) return [];
    return [...c.members].sort((a, b) => {
      if (a.role === 'admin' && b.role !== 'admin') return -1;
      if (a.role !== 'admin' && b.role === 'admin') return 1;
      return 0;
    });
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
          <Button href="/" variant="secondary">
            Back to Homepage
          </Button>
        </div>
      }
    >
      {(c) => (
        <div class="flex min-h-screen">
          <CommunitySidebar community={c()} membership={membership()} />

          <main class="flex-1 overflow-y-auto bg-col-bg-weak">
            <div class="max-w-3xl mx-auto px-6 py-8">
              <div class="mb-8">
                <h1 class="text-fs-6 font-fam-msq font-black text-col-fg-strong">
                  Members
                </h1>
                <p class="text-fs-2 text-col-fg-soft mt-1">
                  {c().members.length}{' '}
                  {c().members.length === 1 ? 'member' : 'members'}
                </p>
              </div>

              <div class="rounded-2xl border border-col-line bg-col-bg overflow-hidden">
                <For each={sortedMembers()}>
                  {(member, index) => (
                    <>
                      <Show when={index() > 0}>
                        <div class="h-px bg-col-line mx-4" />
                      </Show>
                      <MemberRow member={member} />
                    </>
                  )}
                </For>
              </div>
            </div>
          </main>
        </div>
      )}
    </Show>
  );
}
