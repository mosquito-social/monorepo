import "leaflet/dist/leaflet.css";
import { A } from "@solidjs/router";
import {
  For,
  Show,
  createEffect,
  createMemo,
  createSignal,
  onCleanup,
  onMount,
} from "solid-js";
import { COMMUNITY_TYPES } from "../config/community-types";
import { THEME_BASE_STYLES } from "../config/theme-styles";
import { Button } from "mosquito-design-system";

function slugify(str: string): string {
  return str
    .replace(/[äÄ]/g, "ae")
    .replace(/[öÖ]/g, "oe")
    .replace(/[üÜ]/g, "ue")
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const FONTS = [
  {
    id: "bricolage",
    label: "Bricolage",
    family: '"Bricolage Grotesque", sans-serif',
  },
  {
    id: "helvetica",
    label: "Helvetica",
    family: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  },
  {
    id: "georgia",
    label: "Georgia",
    family: 'Georgia, "Times New Roman", serif',
  },
] as const;

type FontId = (typeof FONTS)[number]["id"];

const THEME_PRESETS: Record<
  string,
  { hue: number; font: FontId; density: number }
> = {
  minimal: { hue: 220, font: "helvetica", density: 1.0 },
  bold: { hue: 350, font: "bricolage", density: 1.25 },
  warm: { hue: 45, font: "georgia", density: 1.35 },
  glass: { hue: 200, font: "bricolage", density: 1.1 },
};

const DEFAULT_BG =
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200";
const DEFAULT_CREST = "/logos/frankfurt-js.svg";

const inputClass =
  "w-full rounded-xl border border-col-line bg-col-bg px-4 py-3 text-fs-3 text-col-fg placeholder:text-col-fg-weak focus:outline-none focus:border-col-accent transition-colors";

const labelClass = "block text-fs-2 font-semibold text-col-fg-soft mb-1.5";

async function reverseGeocode(
  lat: number,
  lng: number,
): Promise<string | null> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10`,
      { headers: { "Accept-Language": "en" } },
    );
    const data = await res.json();
    const addr = data.address ?? {};
    return (
      addr.city ||
      addr.town ||
      addr.village ||
      addr.hamlet ||
      addr.municipality ||
      addr.county ||
      data.name ||
      null
    );
  } catch {
    return null;
  }
}

interface CommunityFormProps {
  initialData?: {
    name?: string;
    description?: string;
    communityType?: string | null;
    themeStyle?: string;
    primaryHue?: number;
    font?: string;
    density?: number;
  };
  heading?: string;
  subheading?: string;
  submitLabel?: string;
  backHref?: string;
  backLabel?: string;
}

export function CommunityCreateForm(props: CommunityFormProps) {
  const init = props.initialData ?? {};
  const validFont = (f: string | undefined): FontId =>
    FONTS.some((x) => x.id === f) ? (f as FontId) : "bricolage";

  const [name, setName] = createSignal(init.name ?? "");
  const [description, setDescription] = createSignal(init.description ?? "");
  const [communityType, setCommunityType] = createSignal<string | null>(
    init.communityType ?? null,
  );
  const [typeOpen, setTypeOpen] = createSignal(false);
  const [themeStyle, setThemeStyle] = createSignal(
    init.themeStyle ?? "minimal",
  );
  const [primaryHue, setPrimaryHue] = createSignal(init.primaryHue ?? 220);
  const [font, setFont] = createSignal<FontId>(validFont(init.font));
  const [density, setDensity] = createSignal(init.density ?? 1.0);
  const [fontOpen, setFontOpen] = createSignal(false);
  const [isCustomTheme, setIsCustomTheme] = createSignal(false);

  // Homebase
  const [homebaseMode, setHomebaseMode] = createSignal<"none" | "location">(
    "none",
  );
  const [homebaseCity, setHomebaseCity] = createSignal<string | null>(null);
  const [homebaseLoading, setHomebaseLoading] = createSignal(false);

  const slug = createMemo(() => slugify(name()));
  const communityUrl = createMemo(() =>
    slug()
      ? `mosquito.social/communities/${slug()}`
      : "mosquito.social/communities/my-community",
  );
  const selectedType = createMemo(() =>
    communityType() ? COMMUNITY_TYPES[communityType()!] : null,
  );
  const selectedFont = createMemo(
    () => FONTS.find((f) => f.id === font()) ?? FONTS[0],
  );
  const currentThemeLabel = createMemo(() => {
    if (isCustomTheme()) return "Custom";
    return THEME_BASE_STYLES[themeStyle()]?.name ?? themeStyle();
  });

  let typeRef: HTMLDivElement | undefined;
  let fontRef: HTMLDivElement | undefined;
  let mapEl: HTMLDivElement | undefined;

  onMount(() => {
    const handleClick = (e: MouseEvent) => {
      if (typeRef && !typeRef.contains(e.target as Node)) setTypeOpen(false);
      if (fontRef && !fontRef.contains(e.target as Node)) setFontOpen(false);
    };
    document.addEventListener("click", handleClick);
    onCleanup(() => document.removeEventListener("click", handleClick));
  });

  // Leaflet map – initialized lazily the first time the user picks "location".
  // The map container div is always in the DOM (just hidden via CSS), so mapEl is stable.
  onMount(async () => {
    const L = (await import("leaflet")).default;

    // Fix default icon images broken by bundlers
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

    const buildPinIcon = (hue: number) =>
      L.divIcon({
        className: "",
        html: `<div style="
          width:18px;height:18px;border-radius:50%;
          background:oklch(0.6 0.26 ${hue});
          border:3px solid white;
          box-shadow:0 2px 10px rgba(0,0,0,0.35);
        "></div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      });

    // createEffect inside onMount → client-only, reacts to homebaseMode signal
    createEffect(() => {
      if (homebaseMode() !== "location") return;

      if (mapReady) {
        // Already initialized; just fix size after the hidden→visible CSS transition
        setTimeout(() => map?.invalidateSize(), 0);
        return;
      }

      mapReady = true;
      setTimeout(() => {
        if (!mapEl) return;

        map = L.map(mapEl, { zoomControl: true }).setView([51.1, 10.4], 4);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(map);

        map.on("click", async (e: { latlng: { lat: number; lng: number } }) => {
          const { lat, lng } = e.latlng;
          const icon = buildPinIcon(primaryHue());

          if (marker) {
            marker.setLatLng([lat, lng]);
            marker.setIcon(icon);
          } else {
            marker = L.marker([lat, lng], { icon }).addTo(map!);
          }

          setHomebaseLoading(true);
          setHomebaseCity(null);
          const city = await reverseGeocode(lat, lng);
          setHomebaseCity(city);
          setHomebaseLoading(false);
        });

        onCleanup(() => map?.remove());
      }, 0);
    });
  });

  const applyThemePreset = (styleKey: string) => {
    const preset = THEME_PRESETS[styleKey];
    if (preset) {
      setPrimaryHue(preset.hue);
      setFont(preset.font);
      setDensity(preset.density);
      setIsCustomTheme(false);
    }
    setThemeStyle(styleKey);
  };

  const markCustomTheme = () => setIsCustomTheme(true);

  return (
    <div class="max-w-7xl mx-auto px-6 py-10">
      <A
        href={props.backHref ?? "/"}
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
        {props.backLabel ?? "Back to communities"}
      </A>

      <div class="mb-8">
        <h1 class="text-fs-6 font-fam-msq font-black text-col-fg-strong leading-tight">
          {props.heading ?? "Create your community"}
        </h1>
        <p class="text-fs-3 text-col-fg-soft mt-1">
          {props.subheading ??
            "Set up your space in a few steps. You can change everything later."}
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 items-start">
        {/* LEFT: Form */}
        <div class="space-y-6 min-w-0">
          {/* Name */}
          <div>
            <label class={labelClass}>Community Name</label>
            <input
              type="text"
              value={name()}
              onInput={(e) => setName(e.currentTarget.value)}
              class={`${inputClass} text-fs-4 font-bold`}
              placeholder="e.g. Frankfurt JS"
            />
            <p class="mt-2 text-fs-1 text-col-fg-weak font-mono">
              {communityUrl()}
            </p>
          </div>

          {/* Description */}
          <div>
            <label class={labelClass}>Description</label>
            <textarea
              value={description()}
              onInput={(e) => setDescription(e.currentTarget.value)}
              rows={3}
              class={inputClass}
              placeholder="What is this community about?"
            />
          </div>

          {/* Community Type */}
          <div>
            <label class={labelClass}>Community Type</label>
            <div ref={typeRef} class="relative">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setTypeOpen(!typeOpen());
                }}
                class="w-full flex items-center justify-between rounded-xl border border-col-line bg-col-bg px-4 py-3 text-fs-3 text-col-fg hover:border-col-accent transition-colors cursor-pointer"
              >
                <span
                  class={selectedType() ? "text-col-fg" : "text-col-fg-weak"}
                >
                  {selectedType()?.name ?? "Select a type"}
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  class={`flex-shrink-0 transition-transform ${typeOpen() ? "rotate-180" : ""}`}
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <Show when={typeOpen()}>
                <div class="absolute top-full mt-2 left-0 right-0 z-30 rounded-2xl border border-col-line bg-col-bg shadow-xl overflow-hidden max-h-80 overflow-y-auto">
                  <For each={Object.entries(COMMUNITY_TYPES)}>
                    {([key, type]) => (
                      <button
                        type="button"
                        onClick={() => {
                          setCommunityType(key);
                          setTypeOpen(false);
                        }}
                        class={`w-full text-left px-4 py-3 hover:bg-col-bg-soft transition-colors border-b border-col-line last:border-0 ${communityType() === key ? "bg-col-bg-soft" : ""}`}
                      >
                        <div class="text-fs-3 font-semibold text-col-fg">
                          {type.name}
                        </div>
                        <div class="text-fs-1 text-col-fg-soft mt-0.5 leading-snug">
                          {type.description}
                        </div>
                      </button>
                    )}
                  </For>
                </div>
              </Show>
            </div>
          </div>

          {/* Visual Details */}
          <div class="rounded-2xl border border-col-line bg-col-bg-soft p-5 space-y-5">
            <h2 class="text-fs-4 font-fam-msq font-bold text-col-fg">
              Visual Details
            </h2>

            {/* Crest + Background */}
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class={labelClass}>Crest</p>
                <div class="relative aspect-[2/3] rounded-xl overflow-hidden border border-col-line bg-col-bg">
                  <img
                    src={DEFAULT_CREST}
                    alt="Community crest"
                    class="w-full h-full object-contain p-4"
                  />
                  <button
                    type="button"
                    class="absolute bottom-2 right-2 flex items-center gap-1 rounded-lg bg-col-bg/90 border border-col-line px-2 py-1 text-fs-1 text-col-fg-soft hover:text-col-fg hover:border-col-accent transition-colors backdrop-blur-sm"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M1 6C1 3.239 3.239 1 6 1s5 2.239 5 5-2.239 5-5 5-5-2.239-5-5z"
                        stroke="currentColor"
                        stroke-width="1.2"
                      />
                      <path
                        d="M4 6h4M8 4l2 2-2 2"
                        stroke="currentColor"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    Swap
                  </button>
                </div>
              </div>

              <div>
                <p class={labelClass}>Background</p>
                <div class="relative aspect-[2/3] rounded-xl overflow-hidden border border-col-line bg-col-bg">
                  <img
                    src={DEFAULT_BG}
                    alt="Community background"
                    class="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    class="absolute bottom-2 right-2 flex items-center gap-1 rounded-lg bg-col-bg/90 border border-col-line px-2 py-1 text-fs-1 text-col-fg-soft hover:text-col-fg hover:border-col-accent transition-colors backdrop-blur-sm"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M1 6C1 3.239 3.239 1 6 1s5 2.239 5 5-2.239 5-5 5-5-2.239-5-5z"
                        stroke="currentColor"
                        stroke-width="1.2"
                      />
                      <path
                        d="M4 6h4M8 4l2 2-2 2"
                        stroke="currentColor"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    Swap
                  </button>
                </div>
              </div>
            </div>

            {/* Style Preset */}
            <div>
              <p class={labelClass}>Style Preset</p>
              <div class="flex flex-wrap gap-2">
                <For each={Object.entries(THEME_BASE_STYLES)}>
                  {([key, style]) => (
                    <button
                      type="button"
                      onClick={() => applyThemePreset(key)}
                      class={`rounded-full px-3 py-1.5 text-fs-2 font-semibold border transition-colors ${
                        themeStyle() === key && !isCustomTheme()
                          ? "bg-col-accent text-col-bg border-col-accent"
                          : "border-col-line text-col-fg-soft hover:border-col-accent hover:text-col-fg"
                      }`}
                    >
                      {style.name}
                    </button>
                  )}
                </For>
                <Show when={isCustomTheme()}>
                  <button
                    type="button"
                    class="rounded-full px-3 py-1.5 text-fs-2 font-semibold border bg-col-accent text-col-bg border-col-accent"
                  >
                    Custom
                  </button>
                </Show>
              </div>
              <p class="mt-1.5 text-fs-1 text-col-fg-weak">
                {isCustomTheme()
                  ? "Custom theme — select a preset to start fresh"
                  : THEME_BASE_STYLES[themeStyle()]?.description}
              </p>
            </div>

            {/* Primary Hue */}
            <div>
              <p class={labelClass}>Primary Color</p>
              <div class="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="1"
                  value={primaryHue()}
                  onInput={(e) => {
                    setPrimaryHue(+e.currentTarget.value);
                    markCustomTheme();
                  }}
                  class="w-full h-2 appearance-none cursor-pointer rounded-full bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-col-fg [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-col-bg [&::-webkit-slider-thumb]:shadow-md"
                  style="background: transparent"
                />
                <div
                  class="h-2.5 rounded-full w-full"
                  style="background: linear-gradient(to right, oklch(0.6 0.26 0), oklch(0.6 0.26 45), oklch(0.6 0.26 90), oklch(0.6 0.26 135), oklch(0.6 0.26 180), oklch(0.6 0.26 225), oklch(0.6 0.26 270), oklch(0.6 0.26 315), oklch(0.6 0.26 360))"
                />
              </div>
            </div>

            {/* Font */}
            <div>
              <p class={labelClass}>Primary Font</p>
              <div ref={fontRef} class="relative">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFontOpen(!fontOpen());
                  }}
                  class="w-full flex items-center justify-between rounded-xl border border-col-line bg-col-bg px-4 py-3 hover:border-col-accent transition-colors cursor-pointer"
                >
                  <span
                    class="text-fs-4 text-col-fg font-medium"
                    style={`font-family: ${selectedFont().family}`}
                  >
                    {selectedFont().label}
                  </span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    class={`flex-shrink-0 text-col-fg-weak transition-transform ${fontOpen() ? "rotate-180" : ""}`}
                  >
                    <path
                      d="M4 6L8 10L12 6"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
                <Show when={fontOpen()}>
                  <div class="absolute top-full mt-2 left-0 right-0 z-30 rounded-2xl border border-col-line bg-col-bg shadow-xl overflow-hidden">
                    <For each={FONTS}>
                      {(f) => (
                        <button
                          type="button"
                          onClick={() => {
                            setFont(f.id);
                            setFontOpen(false);
                            markCustomTheme();
                          }}
                          class={`w-full text-left px-4 py-3 hover:bg-col-bg-soft transition-colors border-b border-col-line last:border-0 ${font() === f.id ? "bg-col-bg-soft" : ""}`}
                        >
                          <div
                            class="text-fs-5 text-col-fg font-medium"
                            style={`font-family: ${f.family}`}
                          >
                            {f.label}
                          </div>
                          <div
                            class="text-fs-2 text-col-fg-soft mt-0.5"
                            style={`font-family: ${f.family}`}
                          >
                            The quick brown fox jumps over the lazy dog
                          </div>
                        </button>
                      )}
                    </For>
                  </div>
                </Show>
              </div>
            </div>

            {/* Density */}
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <p class={labelClass} style="margin-bottom: 0">
                  Density
                </p>
                <div class="flex items-center gap-3 text-fs-1 text-col-fg-weak">
                  <span>Compact</span>
                  <span>Spacious</span>
                </div>
              </div>
              <input
                type="range"
                min="1.0"
                max="1.5"
                step="0.01"
                value={density()}
                onInput={(e) => {
                  setDensity(+e.currentTarget.value);
                  markCustomTheme();
                }}
                class="w-full h-2 appearance-none cursor-pointer rounded-full bg-col-line [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-col-fg [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-col-bg [&::-webkit-slider-thumb]:shadow-md"
              />
            </div>
          </div>

          {/* Homebase */}
          <div>
            <label class={labelClass}>Homebase</label>

            {/* Toggle */}
            <div class="flex gap-2 mb-3">
              <button
                type="button"
                onClick={() => {
                  setHomebaseMode("none");
                  setHomebaseCity(null);
                }}
                class={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-fs-2 font-semibold border transition-colors ${
                  homebaseMode() === "none"
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
                onClick={() => setHomebaseMode("location")}
                class={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-fs-2 font-semibold border transition-colors ${
                  homebaseMode() === "location"
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
                Pick a location
              </button>
            </div>

            {/* Map container – always in DOM so the ref is stable; hidden via CSS when not active */}
            <div class={homebaseMode() === "location" ? "" : "hidden"}>
              <div
                ref={mapEl}
                class="h-56 rounded-xl overflow-hidden border border-col-line"
              />
              <div class="mt-2 min-h-[1.5rem] flex items-center gap-1.5">
                <Show when={homebaseLoading()}>
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
                    Finding nearest place…
                  </span>
                </Show>
                <Show when={!homebaseLoading() && homebaseCity()}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M6 1C4.067 1 2.5 2.567 2.5 4.5c0 2.5 3.5 6.5 3.5 6.5s3.5-4 3.5-6.5C9.5 2.567 7.933 1 6 1z"
                      fill="currentColor"
                      class="text-col-accent"
                    />
                    <circle cx="6" cy="4.5" r="1" fill="white" />
                  </svg>
                  <span class="text-fs-2 text-col-fg font-medium">
                    {homebaseCity()}
                  </span>
                </Show>
                <Show
                  when={
                    !homebaseLoading() &&
                    !homebaseCity() &&
                    homebaseMode() === "location"
                  }
                >
                  <span class="text-fs-1 text-col-fg-weak">
                    Click the map to set your homebase
                  </span>
                </Show>
              </div>
            </div>

            <Show when={homebaseMode() === "none"}>
              <p class="text-fs-2 text-col-fg-soft">
                This community is fully remote — no physical homebase.
              </p>
            </Show>
          </div>

          {/* Submit */}
          <div class="flex items-center gap-4 pt-2">
            <Button>{props.submitLabel ?? "Create Community"}</Button>
            <Button href="/" variant="secondary">
              Cancel
            </Button>
          </div>
        </div>

        {/* RIGHT: Preview */}
        <div class="lg:sticky lg:top-24">
          <p class="text-fs-1 font-semibold text-col-fg-weak uppercase tracking-wider mb-3">
            Preview
          </p>
          <div
            class="rounded-2xl overflow-hidden border border-col-line shadow-lg"
            style={`--msq-hue-primary: ${primaryHue()}`}
          >
            {/* Header image */}
            <div class="relative h-40 overflow-hidden">
              <img src={DEFAULT_BG} alt="" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
              <img
                src={DEFAULT_CREST}
                alt=""
                class="absolute bottom-3 left-4 w-10 h-[60px] rounded-lg bg-white/90 object-contain p-1.5 shadow-md"
              />
              <Show when={selectedType()}>
                <span class="absolute top-3 right-3 rounded-full bg-col-accent/90 px-2.5 py-0.5 text-fs-1 font-semibold text-col-bg backdrop-blur-sm">
                  {selectedType()?.name}
                </span>
              </Show>
            </div>

            {/* Content */}
            <div
              class="p-5 bg-col-bg"
              style={`font-family: ${selectedFont().family}`}
            >
              <h2 class="text-fs-5 font-bold text-col-fg-strong leading-tight">
                {name() || "Community Name"}
              </h2>
              <p class="text-fs-2 text-col-fg-soft mt-1.5 leading-snug">
                {description() ||
                  "Your community description will appear here."}
              </p>

              {/* Homebase in preview */}
              <div class="flex items-center gap-1.5 mt-2">
                <Show
                  when={homebaseMode() === "location" && homebaseCity()}
                  fallback={
                    <Show when={homebaseMode() === "location"}>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        class="text-col-fg-weak flex-shrink-0"
                      >
                        <path
                          d="M6 1C4.067 1 2.5 2.567 2.5 4.5c0 2.5 3.5 6.5 3.5 6.5s3.5-4 3.5-6.5C9.5 2.567 7.933 1 6 1z"
                          stroke="currentColor"
                          stroke-width="1.2"
                        />
                      </svg>
                      <span class="text-fs-1 text-col-fg-weak italic">
                        Location not set yet
                      </span>
                    </Show>
                  }
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    class="flex-shrink-0"
                  >
                    <path
                      d="M6 1C4.067 1 2.5 2.567 2.5 4.5c0 2.5 3.5 6.5 3.5 6.5s3.5-4 3.5-6.5C9.5 2.567 7.933 1 6 1z"
                      fill="currentColor"
                      class="text-col-accent"
                    />
                    <circle cx="6" cy="4.5" r="1" fill="white" />
                  </svg>
                  <span class="text-fs-2 text-col-fg-soft font-medium">
                    {homebaseCity()}
                  </span>
                </Show>
                <Show when={homebaseMode() === "none"}>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    class="text-col-fg-weak flex-shrink-0"
                  >
                    <circle
                      cx="6"
                      cy="6"
                      r="4.5"
                      stroke="currentColor"
                      stroke-width="1.2"
                    />
                    <path
                      d="M1.5 6h9M6 1.5c-1.2 1.5-1.8 3-1.8 4.5s.6 3 1.8 4.5M6 1.5c1.2 1.5 1.8 3 1.8 4.5S7.2 9 6 10.5"
                      stroke="currentColor"
                      stroke-width="1.2"
                    />
                  </svg>
                  <span class="text-fs-1 text-col-fg-weak">
                    Remote community
                  </span>
                </Show>
              </div>

              <div class="mt-4 pt-4 border-t border-col-line space-y-3">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-full bg-col-accent/20 flex items-center justify-center">
                    <div class="w-4 h-4 rounded-full bg-col-accent opacity-60" />
                  </div>
                  <div class="flex-1">
                    <div class="h-2 rounded-full bg-col-fg-weak/30 w-3/4" />
                    <div class="h-1.5 rounded-full bg-col-fg-weak/20 w-1/2 mt-1" />
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-full bg-col-adjacent-1/20 flex items-center justify-center">
                    <div class="w-4 h-4 rounded-full bg-col-adjacent-1 opacity-40" />
                  </div>
                  <div class="flex-1">
                    <div class="h-2 rounded-full bg-col-fg-weak/30 w-2/3" />
                    <div class="h-1.5 rounded-full bg-col-fg-weak/20 w-1/3 mt-1" />
                  </div>
                </div>
              </div>

              <div class="mt-4 flex items-center gap-3">
                <div class="flex -space-x-2">
                  <For each={[0, 1, 2]}>
                    {(i) => (
                      <div
                        class="w-7 h-7 rounded-full border-2 border-col-bg bg-col-accent/30"
                        style={`opacity: ${1 - i * 0.2}`}
                      />
                    )}
                  </For>
                </div>
                <span class="text-fs-1 text-col-fg-weak">
                  {slug() || "your-community"} · 0 members
                </span>
              </div>
            </div>
          </div>

          <p class="text-fs-1 text-col-fg-weak mt-3 text-center">
            {currentThemeLabel()} theme · hue {primaryHue()}°
          </p>
        </div>
      </div>
    </div>
  );
}
