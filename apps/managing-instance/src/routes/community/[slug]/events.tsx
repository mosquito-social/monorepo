import { A, useParams } from "@solidjs/router";
import { For, Show, createMemo } from "solid-js";
import { Button } from "mosquito-design-system";
import { MOCK_COMMUNITIES } from "../../../mocks/communities";
import { MOCK_EVENTS } from "../../../mocks/events";
import { MOCK_USERS } from "../../../mocks/users";
import { CommunitySidebar } from "../../../components/community-sidebar";

const CURRENT_USER = MOCK_USERS[0];

function formatEventDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function CalendarLeaf(props: { date: Date }) {
  const month = () =>
    new Intl.DateTimeFormat("en-US", { month: "short" })
      .format(props.date)
      .toUpperCase();
  const day = () => props.date.getDate();

  return (
    <div class="flex-shrink-0 w-12 h-14 rounded-xl overflow-hidden border border-col-line flex flex-col items-center">
      <div class="w-full bg-col-accent text-col-bg text-center text-fs-1 font-bold font-fam-msq py-0.5 leading-tight">
        {month()}
      </div>
      <div class="flex-1 flex items-center justify-center text-fs-4 font-black font-fam-msq text-col-fg-strong">
        {day()}
      </div>
    </div>
  );
}

function EventCard(props: {
  slug: string;
  communitySlug: string;
  upcoming: boolean;
}) {
  const event = () => MOCK_EVENTS.find((e) => e.slug === props.slug)!;

  return (
    <A
      href={`/community/${props.communitySlug}/event/${event().slug}`}
      class="no-underline group"
    >
      <article
        class={`rounded-2xl border p-4 flex gap-4 transition-colors hover:border-col-accent/40 ${
          props.upcoming
            ? "bg-col-bg border-col-line"
            : "bg-col-bg-weak border-col-line opacity-60"
        }`}
      >
        <Show when={props.upcoming}>
          <CalendarLeaf date={event().date} />
        </Show>
        <Show when={!props.upcoming}>
          <div class="flex-shrink-0 w-12 h-14 rounded-xl border border-col-line flex flex-col items-center bg-col-surface">
            <div class="w-full bg-col-fg-weak/20 text-col-fg-weak text-center text-fs-1 font-bold font-fam-msq py-0.5 leading-tight">
              {new Intl.DateTimeFormat("en-US", { month: "short" })
                .format(event().date)
                .toUpperCase()}
            </div>
            <div class="flex-1 flex items-center justify-center text-fs-4 font-black font-fam-msq text-col-fg-weak">
              {event().date.getDate()}
            </div>
          </div>
        </Show>

        <div class="flex-1 min-w-0">
          <p
            class={`text-fs-3 font-bold font-fam-msq leading-tight group-hover:text-col-accent transition-colors ${
              props.upcoming ? "text-col-fg-strong" : "text-col-fg-soft"
            }`}
          >
            {event().title}
          </p>
          <p class="text-fs-2 text-col-fg-weak mt-0.5">
            {formatEventDate(event().date)}
          </p>
          <p class="text-fs-2 text-col-fg-soft mt-1 line-clamp-2 leading-relaxed">
            {event().description}
          </p>
          <p class="text-fs-1 text-col-fg-weak mt-2 flex items-center gap-1">
            <span>📍</span>
            {event().location.label}
          </p>
        </div>
      </article>
    </A>
  );
}

export default function CommunityEventsPage() {
  const params = useParams<{ slug: string }>();

  const community = createMemo(
    () => MOCK_COMMUNITIES.find((c) => c.slug === params.slug) ?? null,
  );

  const membership = createMemo(() => {
    const c = community();
    if (!c) return null;
    return c.members.find((m) => m.user.id === CURRENT_USER.id) ?? null;
  });

  const isAdmin = () => membership()?.role === "admin";

  const upcomingEvents = createMemo(() => {
    const c = community();
    if (!c) return [];
    return MOCK_EVENTS.filter(
      (e) => e.communityId === c.id && e.status === "upcoming",
    );
  });

  const pastEvents = createMemo(() => {
    const c = community();
    if (!c) return [];
    return MOCK_EVENTS.filter(
      (e) => e.communityId === c.id && e.status === "past",
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
              {/* Page header */}
              <div class="flex items-center justify-between mb-8">
                <div>
                  <h1 class="text-fs-6 font-fam-msq font-black text-col-fg-strong">
                    Events
                  </h1>
                  <p class="text-fs-2 text-col-fg-soft mt-1">
                    All events from {c().name}
                  </p>
                </div>
                <Show when={isAdmin()}>
                  <Button
                    href={`/community/${c().slug}/new-event`}
                    variant="primary"
                    size="sm"
                  >
                    Create Event
                  </Button>
                </Show>
              </div>

              {/* Upcoming events */}
              <section class="mb-10">
                <h2 class="text-fs-4 font-fam-msq font-bold text-col-fg-strong mb-4">
                  Upcoming Events
                </h2>
                <Show
                  when={upcomingEvents().length > 0}
                  fallback={
                    <div class="rounded-2xl border border-dashed border-col-line bg-col-bg p-8 text-center">
                      <p class="text-fs-3 font-bold text-col-fg-weak">
                        No upcoming events
                      </p>
                      <p class="text-fs-2 text-col-fg-weak mt-1">
                        Check back later or{" "}
                        <Show
                          when={isAdmin()}
                          fallback={
                            <span>ask the organizer to schedule one.</span>
                          }
                        >
                          <A
                            href={`/community/${c().slug}/events/new`}
                            class="text-col-accent"
                          >
                            create one now.
                          </A>
                        </Show>
                      </p>
                    </div>
                  }
                >
                  <div class="flex flex-col gap-3">
                    <For each={upcomingEvents()}>
                      {(event) => (
                        <EventCard
                          slug={event.slug}
                          communitySlug={c().slug}
                          upcoming={true}
                        />
                      )}
                    </For>
                  </div>
                </Show>
              </section>

              {/* Past events */}
              <section>
                <h2 class="text-fs-4 font-fam-msq font-bold text-col-fg-soft mb-4">
                  Past Events
                </h2>
                <Show
                  when={pastEvents().length > 0}
                  fallback={
                    <div class="rounded-2xl border border-dashed border-col-line bg-col-bg p-8 text-center">
                      <p class="text-fs-2 text-col-fg-weak">
                        No past events yet.
                      </p>
                    </div>
                  }
                >
                  <div class="flex flex-col gap-3">
                    <For each={pastEvents()}>
                      {(event) => (
                        <EventCard
                          slug={event.slug}
                          communitySlug={c().slug}
                          upcoming={false}
                        />
                      )}
                    </For>
                  </div>
                </Show>
              </section>
            </div>
          </main>
        </div>
      )}
    </Show>
  );
}
