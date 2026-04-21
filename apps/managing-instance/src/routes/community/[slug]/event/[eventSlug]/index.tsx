import { A, useParams } from '@solidjs/router';
import { Button } from 'mosquito-design-system';
import { Show, createMemo } from 'solid-js';
import { CommunitySidebar } from '../../../../../components/community-sidebar';
import { MOCK_COMMUNITIES } from '../../../../../mocks/communities';
import { MOCK_EVENTS } from '../../../../../mocks/events';
import { MOCK_USERS } from '../../../../../mocks/users';

const CURRENT_USER = MOCK_USERS[0];

function CalendarCard(props: { date: Date }) {
  const month = () =>
    new Intl.DateTimeFormat('en-US', { month: 'short' })
      .format(props.date)
      .toUpperCase();
  const day = () => props.date.getDate();

  return (
    <div class="shrink-0 w-14 h-16 rounded-xl overflow-hidden border border-col-line flex flex-col items-center shadow-sm">
      <div class="w-full bg-col-accent text-col-bg text-center text-fs-1 font-bold font-fam-msq py-0.5 leading-tight">
        {month()}
      </div>
      <div class="flex-1 flex items-center justify-center text-fs-5 font-black font-fam-msq text-col-fg-strong">
        {day()}
      </div>
    </div>
  );
}

function formatTime(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}

function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

function formatFullDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

function AgendaLine(props: { index: number; text: string }) {
  const parts = props.text.split(' – ');
  const time = parts.length > 1 ? parts[0] : null;
  const item = parts.length > 1 ? parts.slice(1).join(' – ') : props.text;

  return (
    <div class="flex gap-4 py-3 border-b border-col-line last:border-0">
      <div class="shrink-0 flex items-start gap-3">
        <div class="w-6 h-6 rounded-full bg-col-accent/10 text-col-accent flex items-center justify-center text-fs-1 font-bold font-fam-msq mt-0.5">
          {props.index + 1}
        </div>
      </div>
      <div class="flex-1 min-w-0">
        <Show when={time}>
          <span class="text-fs-1 font-bold text-col-fg-weak font-fam-msq tabular-nums block mb-0.5">
            {time}
          </span>
        </Show>
        <span class="text-fs-2 text-col-fg leading-snug">{item}</span>
      </div>
    </div>
  );
}

export default function EventDetailPage() {
  const params = useParams<{ slug: string; eventSlug: string }>();

  const community = createMemo(
    () => MOCK_COMMUNITIES.find((c) => c.slug === params.slug) ?? null,
  );

  const event = createMemo(
    () => MOCK_EVENTS.find((e) => e.slug === params.eventSlug) ?? null,
  );

  const membership = createMemo(() => {
    const c = community();
    if (!c) return null;
    return c.members.find((m) => m.user.id === CURRENT_USER.id) ?? null;
  });

  const endTime = createMemo(() => {
    const e = event();
    if (!e) return null;
    return new Date(e.date.getTime() + e.durationInMinutes * 60 * 1000);
  });

  const agendaLines = createMemo(() => {
    const e = event();
    if (!e) return [];
    return e.agenda.split('\n').filter((l) => l.trim().length > 0);
  });

  const hasCoords = createMemo(() => {
    const e = event();
    return e?.location.lat != null && e?.location.lng != null;
  });

  const mapUrl = createMemo(() => {
    const e = event();
    if (!e?.location.lat || !e?.location.lng) return null;
    const { lat, lng } = e.location;
    const delta = 0.008;
    return `https://www.openstreetmap.org/export/embed.html?bbox=${lng - delta},${lat - delta},${lng + delta},${lat + delta}&layer=mapnik&marker=${lat},${lng}`;
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
        <Show
          when={event()}
          fallback={
            <div class="flex min-h-screen">
              <CommunitySidebar community={c()} membership={membership()} />
              <main class="flex-1 overflow-y-auto bg-col-bg-weak">
                <div class="min-h-[60vh] flex flex-col items-center justify-center gap-6 text-center px-4">
                  <div class="text-5xl font-black font-fam-msq text-col-fg-weak">
                    404
                  </div>
                  <h1 class="text-fs-6 font-fam-msq font-bold text-col-fg-strong">
                    Event not found
                  </h1>
                  <p class="text-fs-3 text-col-fg-soft max-w-sm">
                    This event doesn't exist or may have been removed.
                  </p>
                  <Button
                    href={`/community/${c().slug}/events`}
                    variant="secondary"
                  >
                    Back to Events
                  </Button>
                </div>
              </main>
            </div>
          }
        >
          {(ev) => (
            <div class="flex min-h-screen">
              <CommunitySidebar community={c()} membership={membership()} />

              <main class="flex-1 overflow-y-auto bg-col-bg-weak">
                <div class="max-w-5xl mx-auto px-6 py-8">
                  {/* Back link */}
                  <A
                    href={`/community/${c().slug}/events`}
                    class="inline-flex items-center gap-1.5 text-fs-2 text-col-fg-weak hover:text-col-fg transition-colors no-underline mb-6"
                  >
                    <span>←</span>
                    <span>All Events</span>
                  </A>

                  {/* Two-column layout */}
                  <div class="grid grid-cols-[1fr_300px] gap-10 items-start">
                    {/* LEFT: Main content */}
                    <div class="min-w-0">
                      <h1 class="text-fs-7 font-fam-msq font-black text-col-fg-strong leading-tight mb-4">
                        {ev().title}
                      </h1>

                      <p class="text-fs-3 text-col-fg leading-relaxed mb-10">
                        {ev().description}
                      </p>

                      {/* Agenda */}
                      <Show when={agendaLines().length > 0}>
                        <section>
                          <h2 class="text-fs-4 font-fam-msq font-bold text-col-fg-strong mb-4">
                            Agenda
                          </h2>
                          <div class="bg-col-bg rounded-2xl border border-col-line px-4">
                            {agendaLines().map((line, i) => (
                              <AgendaLine index={i} text={line} />
                            ))}
                          </div>
                        </section>
                      </Show>
                    </div>

                    {/* RIGHT: Quick overview */}
                    <aside class="flex flex-col gap-4">
                      {/* CTA / Status */}
                      <div class="bg-col-bg rounded-2xl border border-col-line p-4">
                        <Show
                          when={ev().status === 'upcoming'}
                          fallback={
                            <p class="text-fs-2 font-bold text-col-fg-weak text-center py-1">
                              Past event
                            </p>
                          }
                        >
                          <Show
                            when={
                              ev().ticketTypes && ev().ticketTypes!.length > 0
                            }
                            fallback={
                              <Button variant="primary" size="sm" href="#">
                                Ask to Join
                              </Button>
                            }
                          >
                            <Button
                              variant="primary"
                              size="sm"
                              href={`/community/${c().slug}/event/${ev().slug}/book`}
                            >
                              Get Tickets
                            </Button>
                          </Show>
                        </Show>
                      </div>

                      {/* Event summary card */}
                      <div class="bg-col-bg rounded-2xl border border-col-line p-4 flex flex-col gap-4">
                        {/* Title + calendar */}
                        <div class="flex items-start gap-3">
                          <CalendarCard date={ev().date} />
                          <div class="flex-1 min-w-0">
                            <p class="text-fs-2 font-bold font-fam-msq text-col-fg-strong leading-snug">
                              {ev().title}
                            </p>
                            <p class="text-fs-1 text-col-fg-soft mt-0.5">
                              {formatFullDate(ev().date)}
                            </p>
                          </div>
                        </div>

                        {/* Time row */}
                        <div class="grid grid-cols-3 gap-2 text-center border-t border-col-line pt-4">
                          <div>
                            <p class="text-fs-1 text-col-fg-weak uppercase tracking-wide font-bold mb-0.5">
                              Start
                            </p>
                            <p class="text-fs-2 font-bold font-fam-msq text-col-fg-strong">
                              {formatTime(ev().date)}
                            </p>
                          </div>
                          <div>
                            <p class="text-fs-1 text-col-fg-weak uppercase tracking-wide font-bold mb-0.5">
                              Duration
                            </p>
                            <p class="text-fs-2 font-bold font-fam-msq text-col-fg-strong">
                              {formatDuration(ev().durationInMinutes)}
                            </p>
                          </div>
                          <div>
                            <p class="text-fs-1 text-col-fg-weak uppercase tracking-wide font-bold mb-0.5">
                              End
                            </p>
                            <p class="text-fs-2 font-bold font-fam-msq text-col-fg-strong">
                              {formatTime(endTime()!)}
                            </p>
                          </div>
                        </div>

                        {/* Location */}
                        <div class="border-t border-col-line pt-4">
                          <Show when={hasCoords() && mapUrl()}>
                            <div class="rounded-xl overflow-hidden border border-col-line mb-3 h-40">
                              <iframe
                                src={mapUrl()!}
                                width="100%"
                                height="100%"
                                style="border: 0"
                                loading="lazy"
                                title="Event location map"
                              />
                            </div>
                          </Show>
                          <p class="text-fs-2 font-bold text-col-fg-strong leading-snug">
                            {ev().location.label}
                          </p>
                          <Show when={ev().location.address}>
                            <p class="text-fs-1 text-col-fg-soft mt-0.5">
                              {ev().location.address}
                            </p>
                          </Show>
                        </div>
                      </div>
                    </aside>
                  </div>
                </div>
              </main>
            </div>
          )}
        </Show>
      )}
    </Show>
  );
}
