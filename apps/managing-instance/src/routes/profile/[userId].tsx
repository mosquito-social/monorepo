import { useParams } from "@solidjs/router";
import { For, Show, createMemo } from "solid-js";
import { Avatar, Button } from "mosquito-design-system";
import { MOCK_COMMUNITIES } from "../../mocks/communities";
import { MOCK_USERS } from "../../mocks/users";

const CURRENT_USER = MOCK_USERS[0];

function formatJoinDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default function UserProfilePage() {
  const params = useParams<{ userId: string }>();

  const user = createMemo(
    () => MOCK_USERS.find((u) => u.id === params.userId) ?? null,
  );

  const isCurrentUser = createMemo(
    () => user()?.id === CURRENT_USER.id,
  );

  const memberships = createMemo(() => {
    const u = user();
    if (!u) return [];
    return MOCK_COMMUNITIES.flatMap((community) => {
      const member = community.members.find((m) => m.user.id === u.id);
      if (!member) return [];
      return [{ community, member }];
    });
  });

  return (
    <Show
      when={user()}
      fallback={
        <div class="min-h-[60vh] flex flex-col items-center justify-center gap-6 text-center px-4">
          <div class="text-5xl font-black font-fam-msq text-col-fg-weak">
            404
          </div>
          <h1 class="text-fs-6 font-fam-msq font-bold text-col-fg-strong">
            User not found
          </h1>
          <Button href="/" variant="secondary">
            Back to Homepage
          </Button>
        </div>
      }
    >
      {(u) => (
        <main class="bg-col-bg-weak min-h-screen">
          <div class="max-w-2xl mx-auto px-6 py-12">
            {/* Header */}
            <div class="flex items-start gap-5 mb-10">
              <div class="w-20 h-20 flex-shrink-0">
                <Avatar user={u()} size="lg" class="!w-full !h-full" />
              </div>
              <div class="flex-1 min-w-0">
                <h1 class="text-fs-7 font-fam-msq font-black text-col-fg-strong leading-tight">
                  {u().firstName} {u().lastName}
                </h1>
                <p class="text-fs-3 text-col-fg-weak mt-1">@{u().id}</p>
              </div>
              <Show when={isCurrentUser()}>
                <Button href="/edit-profile" variant="secondary" size="sm">
                  Edit profile
                </Button>
              </Show>
            </div>

            {/* Communities */}
            <div>
              <h2 class="text-fs-4 font-fam-msq font-bold text-col-fg-strong mb-4">
                Communities
              </h2>

              <Show
                when={memberships().length > 0}
                fallback={
                  <p class="text-fs-2 text-col-fg-weak">
                    Not a member of any communities yet.
                  </p>
                }
              >
                <div class="rounded-2xl border border-col-line bg-col-bg overflow-hidden">
                  <For each={memberships()}>
                    {({ community, member }, index) => (
                      <>
                        <Show when={index() > 0}>
                          <div class="h-px bg-col-line" />
                        </Show>
                        <a
                          href={`/community/${community.slug}`}
                          class="flex items-center gap-4 px-5 py-4 hover:bg-col-surface transition-colors no-underline"
                        >
                          <img
                            src={community.logoUrl}
                            alt={community.name}
                            class="w-10 h-14 rounded-lg bg-col-surface object-contain p-1 flex-shrink-0"
                          />
                          <div class="flex-1 min-w-0">
                            <p class="text-fs-3 font-semibold text-col-fg-strong leading-tight">
                              {community.name}
                            </p>
                            <Show when={member.joinedAt}>
                              <p class="text-fs-1 text-col-fg-weak mt-0.5">
                                Joined {formatJoinDate(member.joinedAt!)}
                              </p>
                            </Show>
                          </div>
                          <Show when={member.role === "admin"}>
                            <span class="flex-shrink-0 px-2.5 py-0.5 rounded-full text-fs-1 font-bold font-fam-msq bg-col-accent/10 text-col-accent">
                              Organizer
                            </span>
                          </Show>
                        </a>
                      </>
                    )}
                  </For>
                </div>
              </Show>
            </div>
          </div>
        </main>
      )}
    </Show>
  );
}
