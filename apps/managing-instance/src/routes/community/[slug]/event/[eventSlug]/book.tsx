import { A, useParams } from '@solidjs/router';
import { Button } from 'mosquito-design-system';
import { For, Show, createMemo, createSignal } from 'solid-js';
import { CommunitySidebar } from '../../../../../components/community-sidebar';
import { MOCK_COMMUNITIES } from '../../../../../mocks/communities';
import { MOCK_EVENTS } from '../../../../../mocks/events';
import { MOCK_USERS } from '../../../../../mocks/users';
import type { TicketType } from '../../../../../types';

const CURRENT_USER = MOCK_USERS[0];

type Stage = 'selecting' | 'booking' | 'confirmed';

function formatPrice(cents: number, currency: string): string {
  if (cents === 0) return 'Free';
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency,
  }).format(cents / 100);
}

function formatDateRange(start: Date, durationMinutes: number): string {
  const end = new Date(start.getTime() + durationMinutes * 60 * 1000);
  const monthFmt = new Intl.DateTimeFormat('en-US', { month: 'long' });
  const year = start.getFullYear();
  if (start.getMonth() === end.getMonth()) {
    return `${monthFmt.format(start)} ${start.getDate()}–${end.getDate()}, ${year}`;
  }
  const shortFmt = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  });
  return `${shortFmt.format(start)} – ${shortFmt.format(end)}, ${year}`;
}

function AvailabilityBar(props: { availability: number; total: number }) {
  const pct = () =>
    props.total > 0 ? Math.round((props.availability / props.total) * 100) : 0;
  const urgent = () => pct() <= 30;
  return (
    <div class="flex items-center gap-2">
      <div class="flex-1 h-1.5 rounded-full bg-col-bg-weak overflow-hidden">
        <div
          class={`h-full rounded-full transition-all ${urgent() ? 'bg-orange-400' : 'bg-col-accent'}`}
          style={{ width: `${pct()}%` }}
        />
      </div>
      <span class="text-fs-1 text-col-fg-weak whitespace-nowrap shrink-0">
        {props.availability} left
      </span>
    </div>
  );
}

function TicketCard(props: {
  ticket: TicketType;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      class={`relative rounded-2xl border p-5 flex flex-col gap-3 cursor-pointer transition-all ${
        props.selected
          ? 'border-col-accent bg-col-accent/5 shadow-sm'
          : 'border-col-line bg-col-bg hover:border-col-accent/50'
      }`}
      onClick={props.onSelect}
    >
      <Show when={props.ticket.badge}>
        <span class="absolute top-4 right-4 text-fs-1 font-bold bg-col-accent text-col-bg px-2 py-0.5 rounded-full">
          {props.ticket.badge}
        </span>
      </Show>

      <div>
        <p class="text-fs-3 font-bold font-fam-msq text-col-fg-strong pr-20">
          {props.ticket.name}
        </p>
        <p class="text-fs-2 text-col-fg-soft">{props.ticket.tagline}</p>
      </div>

      <p class="text-fs-6 font-black font-fam-msq text-col-fg-strong leading-none">
        {formatPrice(props.ticket.price, props.ticket.currency)}
      </p>

      <AvailabilityBar
        availability={props.ticket.availability}
        total={props.ticket.totalCapacity}
      />

      <ul class="flex flex-col gap-1.5 flex-1">
        <For each={props.ticket.perks}>
          {(perk) => (
            <li class="flex items-start gap-2 text-fs-2 text-col-fg">
              <span class="text-col-accent mt-0.5 shrink-0 font-bold">✓</span>
              <span>{perk}</span>
            </li>
          )}
        </For>
      </ul>

      <div class="pt-1">
        <Button variant={props.selected ? 'primary' : 'secondary'} size="sm">
          {props.selected ? 'Selected ✓' : 'Select'}
        </Button>
      </div>
    </div>
  );
}

const inputClass =
  'w-full rounded-xl border border-col-line bg-col-bg px-4 py-3 text-fs-3 text-col-fg placeholder:text-col-fg-weak focus:outline-none focus:border-col-accent transition-colors';
const labelClass = 'block text-fs-2 font-semibold text-col-fg-soft mb-1.5';
const selectClass = `${inputClass} cursor-pointer`;

export default function BookEventPage() {
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

  const [stage, setStage] = createSignal<Stage>('selecting');
  const [selectedTicket, setSelectedTicket] = createSignal<TicketType | null>(
    null,
  );

  const [name, setName] = createSignal('');
  const [email, setEmail] = createSignal('');
  const [dietary, setDietary] = createSignal('none');
  const [tshirt, setTshirt] = createSignal('M');
  const [github, setGithub] = createSignal('');
  const [company, setCompany] = createSignal('');

  const bookingRef = (() => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    return (
      'FJSH-2026-' +
      Array.from(
        { length: 4 },
        () => chars[Math.floor(Math.random() * chars.length)],
      ).join('')
    );
  })();

  function handleTicketSelect(ticket: TicketType) {
    setSelectedTicket(ticket);
    setStage('booking');
    setTimeout(() => {
      document
        .getElementById('booking-form')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    setStage('confirmed');
    setTimeout(() => {
      document
        .getElementById('confirmation')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }

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
                <div class="max-w-4xl mx-auto px-6 py-8">
                  {/* Back link */}
                  <A
                    href={`/community/${c().slug}/event/${ev().slug}`}
                    class="inline-flex items-center gap-1.5 text-fs-2 text-col-fg-weak hover:text-col-fg transition-colors no-underline mb-6"
                  >
                    <span>←</span>
                    <span>Back to event</span>
                  </A>

                  {/* Hero strip */}
                  <div class="mb-8">
                    <h1 class="text-fs-7 font-fam-msq font-black text-col-fg-strong leading-tight mb-2">
                      {ev().title}
                    </h1>
                    <p class="text-fs-3 text-col-fg-soft">
                      <span>
                        📅 {formatDateRange(ev().date, ev().durationInMinutes)}
                      </span>
                      <Show when={ev().location.label}>
                        <span class="mx-2 text-col-fg-weak">·</span>
                        <span>📍 {ev().location.label}</span>
                        <Show when={ev().location.address}>
                          <span class="text-col-fg-weak">
                            , {ev().location.address}
                          </span>
                        </Show>
                      </Show>
                    </p>
                  </div>

                  {/* Ticket selection */}
                  <section class="mb-10">
                    <h2 class="text-fs-5 font-fam-msq font-bold text-col-fg-strong mb-5">
                      Choose your ticket
                    </h2>
                    <Show
                      when={ev().ticketTypes && ev().ticketTypes!.length > 0}
                      fallback={
                        <p class="text-fs-3 text-col-fg-soft">
                          No tickets available for this event.
                        </p>
                      }
                    >
                      <div class="grid grid-cols-2 gap-4">
                        <For each={ev().ticketTypes!}>
                          {(ticket) => (
                            <TicketCard
                              ticket={ticket}
                              selected={selectedTicket()?.id === ticket.id}
                              onSelect={() => handleTicketSelect(ticket)}
                            />
                          )}
                        </For>
                      </div>
                    </Show>
                  </section>

                  {/* Booking form */}
                  <Show when={stage() !== 'selecting'}>
                    <div id="booking-form" class="scroll-mt-6">
                      <Show when={stage() === 'booking'}>
                        <div class="bg-col-bg rounded-2xl border border-col-line p-6">
                          <h2 class="text-fs-5 font-fam-msq font-bold text-col-fg-strong mb-1">
                            Your details
                          </h2>
                          <p class="text-fs-2 text-col-fg-soft mb-6">
                            Booking:{' '}
                            <span class="font-semibold text-col-fg">
                              {selectedTicket()?.name}
                            </span>{' '}
                            ·{' '}
                            <span class="font-semibold text-col-fg">
                              {formatPrice(
                                selectedTicket()?.price ?? 0,
                                selectedTicket()?.currency ?? 'EUR',
                              )}
                            </span>
                          </p>

                          <form
                            onSubmit={handleSubmit}
                            class="flex flex-col gap-5"
                          >
                            {/* Common fields */}
                            <div class="grid grid-cols-2 gap-4">
                              <div>
                                <label class={labelClass} for="field-name">
                                  Full name
                                </label>
                                <input
                                  id="field-name"
                                  type="text"
                                  required
                                  placeholder="Alice Chen"
                                  class={inputClass}
                                  value={name()}
                                  onInput={(e) =>
                                    setName(e.currentTarget.value)
                                  }
                                />
                              </div>
                              <div>
                                <label class={labelClass} for="field-email">
                                  Email address
                                </label>
                                <input
                                  id="field-email"
                                  type="email"
                                  required
                                  placeholder="alice@example.com"
                                  class={inputClass}
                                  value={email()}
                                  onInput={(e) =>
                                    setEmail(e.currentTarget.value)
                                  }
                                />
                              </div>
                            </div>

                            <div class="grid grid-cols-2 gap-4">
                              <div>
                                <label class={labelClass} for="field-dietary">
                                  Dietary requirements
                                </label>
                                <select
                                  id="field-dietary"
                                  class={selectClass}
                                  value={dietary()}
                                  onChange={(e) =>
                                    setDietary(e.currentTarget.value)
                                  }
                                >
                                  <option value="none">None</option>
                                  <option value="vegetarian">Vegetarian</option>
                                  <option value="vegan">Vegan</option>
                                  <option value="gluten-free">
                                    Gluten-free
                                  </option>
                                  <option value="other">Other</option>
                                </select>
                              </div>
                              <div>
                                <label class={labelClass} for="field-tshirt">
                                  T-shirt size
                                </label>
                                <select
                                  id="field-tshirt"
                                  class={selectClass}
                                  value={tshirt()}
                                  onChange={(e) =>
                                    setTshirt(e.currentTarget.value)
                                  }
                                >
                                  <option value="XS">XS</option>
                                  <option value="S">S</option>
                                  <option value="M">M</option>
                                  <option value="L">L</option>
                                  <option value="XL">XL</option>
                                  <option value="XXL">XXL</option>
                                </select>
                              </div>
                            </div>

                            {/* Conditional: GitHub handle */}
                            <Show
                              when={selectedTicket()?.formFields.includes(
                                'github',
                              )}
                            >
                              <div>
                                <label class={labelClass} for="field-github">
                                  GitHub handle
                                </label>
                                <div class="relative">
                                  <span class="absolute left-4 top-1/2 -translate-y-1/2 text-fs-3 text-col-fg-weak select-none">
                                    @
                                  </span>
                                  <input
                                    id="field-github"
                                    type="text"
                                    required
                                    placeholder="your-handle"
                                    class={`${inputClass} pl-8`}
                                    value={github()}
                                    onInput={(e) =>
                                      setGithub(e.currentTarget.value)
                                    }
                                  />
                                </div>
                              </div>
                            </Show>

                            {/* Conditional: Company */}
                            <Show
                              when={selectedTicket()?.formFields.includes(
                                'company',
                              )}
                            >
                              <div>
                                <label class={labelClass} for="field-company">
                                  Company / Organisation
                                </label>
                                <input
                                  id="field-company"
                                  type="text"
                                  placeholder="Acme GmbH"
                                  class={inputClass}
                                  value={company()}
                                  onInput={(e) =>
                                    setCompany(e.currentTarget.value)
                                  }
                                />
                              </div>
                            </Show>

                            {/* Order summary + submit */}
                            <div class="flex items-center justify-between pt-4 border-t border-col-line gap-4">
                              <div>
                                <p class="text-fs-2 text-col-fg-soft">Total</p>
                                <p class="text-fs-5 font-black font-fam-msq text-col-fg-strong leading-tight">
                                  {formatPrice(
                                    selectedTicket()?.price ?? 0,
                                    selectedTicket()?.currency ?? 'EUR',
                                  )}
                                </p>
                              </div>
                              <Button type="submit" variant="primary" size="md">
                                Complete Booking
                              </Button>
                            </div>
                          </form>
                        </div>
                      </Show>

                      {/* Confirmation */}
                      <Show when={stage() === 'confirmed'}>
                        <div
                          id="confirmation"
                          class="scroll-mt-6 bg-col-bg rounded-2xl border border-col-line p-8 text-center flex flex-col items-center gap-4"
                        >
                          <div class="w-16 h-16 rounded-full bg-col-accent/10 flex items-center justify-center text-3xl">
                            ✓
                          </div>
                          <div>
                            <h2 class="text-fs-6 font-fam-msq font-black text-col-fg-strong mb-1">
                              You're in!
                            </h2>
                            <p class="text-fs-3 text-col-fg-soft">
                              Your spot is confirmed. See you at the hackathon!
                            </p>
                          </div>

                          <div class="bg-col-bg-weak rounded-xl px-6 py-4 w-full max-w-sm text-left flex flex-col gap-2 mt-2">
                            <div class="flex justify-between text-fs-2">
                              <span class="text-col-fg-soft">Ticket</span>
                              <span class="font-semibold text-col-fg">
                                {selectedTicket()?.name}
                              </span>
                            </div>
                            <div class="flex justify-between text-fs-2">
                              <span class="text-col-fg-soft">Name</span>
                              <span class="font-semibold text-col-fg">
                                {name()}
                              </span>
                            </div>
                            <div class="flex justify-between text-fs-2">
                              <span class="text-col-fg-soft">Email</span>
                              <span class="font-semibold text-col-fg">
                                {email()}
                              </span>
                            </div>
                            <div class="flex justify-between text-fs-2 pt-2 border-t border-col-line mt-1">
                              <span class="text-col-fg-soft">
                                Booking reference
                              </span>
                              <span class="font-black font-fam-msq text-col-accent tracking-wide">
                                {bookingRef}
                              </span>
                            </div>
                          </div>

                          <A
                            href={`/community/${c().slug}/event/${ev().slug}`}
                            class="text-fs-2 text-col-accent hover:underline no-underline mt-2"
                          >
                            ← Back to event details
                          </A>
                        </div>
                      </Show>
                    </div>
                  </Show>
                </div>
              </main>
            </div>
          )}
        </Show>
      )}
    </Show>
  );
}
