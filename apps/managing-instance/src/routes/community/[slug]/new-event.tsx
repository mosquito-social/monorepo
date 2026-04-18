import "leaflet/dist/leaflet.css";
import { A, useParams } from "@solidjs/router";
import {
  Show,
  createEffect,
  createMemo,
  createSignal,
  onCleanup,
  onMount,
} from "solid-js";
import { MOCK_COMMUNITIES } from "../../../mocks/communities";
import { MOCK_USERS } from "../../../mocks/users";
import { CommunitySidebar } from "../../../components/community-sidebar";
import { Button } from "mosquito-design-system";

const CURRENT_USER = MOCK_USERS[0];

const inputClass =
  "w-full rounded-xl border border-col-line bg-col-bg px-4 py-3 text-fs-3 text-col-fg placeholder:text-col-fg-weak focus:outline-none focus:border-col-accent transition-colors";

const labelClass = "block text-fs-2 font-semibold text-col-fg-soft mb-1.5";

type LocationMode = "remote" | "place";

async function reverseGeocodeAddress(
  lat: number,
  lng: number,
): Promise<{ label: string; address: string } | null> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
      { headers: { "Accept-Language": "en" } },
    );
    const data = await res.json();
    const addr = data.address ?? {};

    const road = addr.road ?? addr.pedestrian ?? addr.footway ?? "";
    const houseNumber = addr.house_number ?? "";
    const postcode = addr.postcode ?? "";
    const city =
      addr.city ??
      addr.town ??
      addr.village ??
      addr.hamlet ??
      addr.municipality ??
      addr.county ??
      "";

    const streetPart = [road, houseNumber].filter(Boolean).join(" ");
    const localePart = [postcode, city].filter(Boolean).join(" ");
    const fullAddress = [streetPart, localePart].filter(Boolean).join(", ");

    const label =
      addr.amenity ??
      addr.building ??
      addr.leisure ??
      addr.tourism ??
      (streetPart || data.name || null);

    return fullAddress
      ? { label: label ?? fullAddress, address: fullAddress }
      : null;
  } catch {
    return null;
  }
}

export default function NewEventPage() {
  const params = useParams<{ slug: string }>();

  const community = createMemo(
    () => MOCK_COMMUNITIES.find((c) => c.slug === params.slug) ?? null,
  );

  const membership = createMemo(() => {
    const c = community();
    if (!c) return null;
    return c.members.find((m) => m.user.id === CURRENT_USER.id) ?? null;
  });

  const [title, setTitle] = createSignal("");
  const [description, setDescription] = createSignal("");
  const [eventDate, setEventDate] = createSignal("");
  const [duration, setDuration] = createSignal("");
  const [locationMode, setLocationMode] = createSignal<LocationMode>("place");
  const [remoteDescription, setRemoteDescription] = createSignal("");
  const [locationLabel, setLocationLabel] = createSignal("");
  const [locationAddress, setLocationAddress] = createSignal("");
  const [locationLoading, setLocationLoading] = createSignal(false);
  const [agenda, setAgenda] = createSignal("");

  let mapEl: HTMLDivElement | undefined;

  onMount(async () => {
    const L = (await import("leaflet")).default;

    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });

    let map: ReturnType<typeof L.map> | null = null;
    let marker: ReturnType<typeof L.marker> | null = null;
    let mapReady = false;

    const pinIcon = () =>
      L.divIcon({
        className: "",
        html: `<div style="
          width:18px;height:18px;border-radius:50%;
          background:oklch(0.6 0.26 220);
          border:3px solid white;
          box-shadow:0 2px 10px rgba(0,0,0,0.35);
        "></div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      });

    createEffect(() => {
      if (locationMode() !== "place") return;

      if (mapReady) {
        setTimeout(() => map?.invalidateSize(), 0);
        return;
      }

      mapReady = true;
      setTimeout(() => {
        if (!mapEl) return;

        map = L.map(mapEl, { zoomControl: true }).setView([51.1, 10.4], 5);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(map);

        map.on(
          "click",
          async (e: { latlng: { lat: number; lng: number } }) => {
            const { lat, lng } = e.latlng;
            const icon = pinIcon();

            if (marker) {
              marker.setLatLng([lat, lng]);
              marker.setIcon(icon);
            } else {
              marker = L.marker([lat, lng], { icon }).addTo(map!);
            }

            setLocationLoading(true);
            setLocationLabel("");
            setLocationAddress("");
            const result = await reverseGeocodeAddress(lat, lng);
            if (result) {
              setLocationLabel(result.label);
              setLocationAddress(result.address);
            }
            setLocationLoading(false);
          },
        );

        onCleanup(() => map?.remove());
      }, 0);
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
            <div class="max-w-2xl mx-auto px-6 py-8">
              {/* Back link */}
              <A
                href={`/community/${c().slug}/events`}
                class="inline-flex items-center gap-2 text-fs-2 text-col-fg-soft hover:text-col-fg no-underline transition-colors mb-8"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  class="flex-shrink-0"
                >
                  <path
                    d="M10 12L6 8L10 4"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Back to Events
              </A>

              <div class="mb-8">
                <h1 class="text-fs-6 font-fam-msq font-black text-col-fg-strong">
                  Create Event
                </h1>
                <p class="text-fs-2 text-col-fg-soft mt-1">
                  Schedule a new event for {c().name}.
                </p>
              </div>

              <div class="space-y-6">
                {/* Title */}
                <div>
                  <label class={labelClass}>Title</label>
                  <input
                    type="text"
                    value={title()}
                    onInput={(e) => setTitle(e.currentTarget.value)}
                    class={`${inputClass} text-fs-4 font-bold`}
                    placeholder="e.g. April Meetup"
                  />
                </div>

                {/* Description */}
                <div>
                  <label class={labelClass}>Description</label>
                  <textarea
                    value={description()}
                    onInput={(e) => setDescription(e.currentTarget.value)}
                    rows={3}
                    class={inputClass}
                    placeholder="What is this event about?"
                  />
                </div>

                {/* Date & Duration */}
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class={labelClass}>Date & Time</label>
                    <input
                      type="datetime-local"
                      value={eventDate()}
                      onInput={(e) => setEventDate(e.currentTarget.value)}
                      class={inputClass}
                    />
                  </div>
                  <div>
                    <label class={labelClass}>Duration (minutes)</label>
                    <input
                      type="number"
                      min="1"
                      value={duration()}
                      onInput={(e) => setDuration(e.currentTarget.value)}
                      class={inputClass}
                      placeholder="e.g. 120"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label class={labelClass}>Location</label>
                  <div class="flex gap-2 mb-4">
                    <button
                      type="button"
                      onClick={() => setLocationMode("remote")}
                      class={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-fs-2 font-semibold border transition-colors ${
                        locationMode() === "remote"
                          ? "bg-col-accent text-col-bg border-col-accent"
                          : "border-col-line text-col-fg-soft hover:border-col-accent hover:text-col-fg"
                      }`}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <circle
                          cx="7"
                          cy="7"
                          r="5.5"
                          stroke="currentColor"
                          stroke-width="1.3"
                        />
                        <path
                          d="M1.5 7h11M7 1.5c-1.5 2-2 3.5-2 5.5s.5 3.5 2 5.5M7 1.5c1.5 2 2 3.5 2 5.5s-.5 3.5-2 5.5"
                          stroke="currentColor"
                          stroke-width="1.3"
                        />
                      </svg>
                      Remote
                    </button>
                    <button
                      type="button"
                      onClick={() => setLocationMode("place")}
                      class={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-fs-2 font-semibold border transition-colors ${
                        locationMode() === "place"
                          ? "bg-col-accent text-col-bg border-col-accent"
                          : "border-col-line text-col-fg-soft hover:border-col-accent hover:text-col-fg"
                      }`}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M7 1C4.791 1 3 2.791 3 5c0 3 4 8 4 8s4-5 4-8c0-2.209-1.791-4-4-4z"
                          stroke="currentColor"
                          stroke-width="1.3"
                          stroke-linejoin="round"
                        />
                        <circle
                          cx="7"
                          cy="5"
                          r="1.3"
                          stroke="currentColor"
                          stroke-width="1.2"
                        />
                      </svg>
                      Place
                    </button>
                  </div>

                  <Show when={locationMode() === "remote"}>
                    <textarea
                      value={remoteDescription()}
                      onInput={(e) =>
                        setRemoteDescription(e.currentTarget.value)
                      }
                      rows={2}
                      class={inputClass}
                      placeholder="e.g. Zoom link, Google Meet, or other details"
                    />
                  </Show>

                  <Show when={locationMode() === "place"}>
                    <div
                      ref={mapEl}
                      class="h-56 rounded-xl overflow-hidden border border-col-line mb-3"
                    />
                    <div class="min-h-[1.5rem] flex items-center gap-1.5 mb-3">
                      <Show when={locationLoading()}>
                        <svg
                          class="animate-spin text-col-fg-weak"
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                        >
                          <circle
                            cx="7"
                            cy="7"
                            r="5.5"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-dasharray="20 14"
                          />
                        </svg>
                        <span class="text-fs-1 text-col-fg-weak">
                          Finding address…
                        </span>
                      </Show>
                      <Show when={!locationLoading() && locationAddress()}>
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <path
                            d="M6 1C4.067 1 2.5 2.567 2.5 4.5c0 2.5 3.5 6.5 3.5 6.5s3.5-4 3.5-6.5C9.5 2.567 7.933 1 6 1z"
                            fill="currentColor"
                            class="text-col-accent"
                          />
                          <circle cx="6" cy="4.5" r="1" fill="white" />
                        </svg>
                        <span class="text-fs-2 text-col-fg font-medium">
                          {locationAddress()}
                        </span>
                      </Show>
                      <Show
                        when={
                          !locationLoading() &&
                          !locationAddress() &&
                          locationMode() === "place"
                        }
                      >
                        <span class="text-fs-1 text-col-fg-weak">
                          Click the map to pin the event location
                        </span>
                      </Show>
                    </div>
                    <Show when={locationAddress()}>
                      <div class="space-y-3">
                        <div>
                          <label class={labelClass}>Venue Name</label>
                          <input
                            type="text"
                            value={locationLabel()}
                            onInput={(e) =>
                              setLocationLabel(e.currentTarget.value)
                            }
                            class={inputClass}
                            placeholder="e.g. Design Offices Frankfurt Westend"
                          />
                        </div>
                        <div>
                          <label class={labelClass}>Address</label>
                          <input
                            type="text"
                            value={locationAddress()}
                            onInput={(e) =>
                              setLocationAddress(e.currentTarget.value)
                            }
                            class={inputClass}
                          />
                        </div>
                      </div>
                    </Show>
                  </Show>
                </div>

                {/* Agenda */}
                <div>
                  <label class={labelClass}>Agenda</label>
                  <textarea
                    value={agenda()}
                    onInput={(e) => setAgenda(e.currentTarget.value)}
                    rows={5}
                    class={inputClass}
                    placeholder="List the agenda items, one per line"
                  />
                  <p class="mt-1.5 text-fs-1 text-col-fg-weak">
                    List the agenda items, one per line
                  </p>
                </div>

                {/* Submit */}
                <div class="flex items-center gap-4 pt-2">
                  <button
                    type="button"
                    class="inline-flex items-center justify-center rounded-full px-8 py-4 text-fs-4 font-fam-msq font-black bg-col-accent border-2 border-col-accent text-col-bg hover:bg-col-accent-strong hover:text-col-bg-strong transition-colors cursor-pointer"
                  >
                    Create Event
                  </button>
                  <A
                    href={`/community/${c().slug}/events`}
                    class="text-fs-2 text-col-fg-soft hover:text-col-fg no-underline transition-colors"
                  >
                    Cancel
                  </A>
                </div>
              </div>
            </div>
          </main>
        </div>
      )}
    </Show>
  );
}
