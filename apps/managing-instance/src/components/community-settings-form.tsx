import "@fontsource/share-tech-mono";
import "@fontsource/ibm-plex-sans";
import "@fontsource/ibm-plex-mono";
import "@fontsource/barlow-condensed/700.css";
import "@fontsource/barlow";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource/dm-serif-display";
import "@fontsource/dm-sans";
import "@fontsource/dm-mono";
import "@fontsource/shippori-mincho/700.css";
import "@fontsource/noto-sans-jp";
import "@fontsource/noto-sans-mono";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/source-sans-3";
import "@fontsource-variable/source-code-pro";
import "@fontsource/syne/700.css";
import "@fontsource/plus-jakarta-sans";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/commit-mono";
import "@fontsource/bebas-neue";
import "@fontsource/work-sans";
import "@fontsource-variable/bricolage-grotesque";
import "leaflet/dist/leaflet.css";
import { A } from "@solidjs/router";
import { Button, Heading } from "mosquito-design-system";
import { CommunityHeader } from "./community-header";
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
import { FONT_STACKS, type FontStackId } from "../config/font-stacks";
import type { Community } from "../types";

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

const THEME_PRESETS: Record<
  string,
  { hue: number; font: FontStackId; density: number; sizeScale: number }
> = {
  minimal: { hue: 220, font: "default", density: 1.0, sizeScale: 1.618 },
  bold: { hue: 350, font: "dispatch", density: 1.25, sizeScale: 1.618 },
  warm: { hue: 45, font: "craft", density: 1.3, sizeScale: 1.618 },
  glass: { hue: 200, font: "canvas", density: 1.1, sizeScale: 1.618 },
};

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

const DEFAULT_BG = "/mock-assets/covers/default.jpg";
const DEFAULT_CREST = "/mock-assets/crests/type-professional.svg";

interface CommunitySettingsFormProps {
  community?: Community;
  heading?: string;
  subheading?: string;
  submitLabel?: string;
  backHref?: string;
  backLabel?: string;
}

export function CommunitySettingsForm(props: CommunitySettingsFormProps) {
  const c = props.community;
  const validFont = (f: string | undefined): FontStackId =>
    f !== undefined && f in FONT_STACKS ? (f as FontStackId) : "default";

  const [name, setName] = createSignal(c?.name ?? "");
  const [description, setDescription] = createSignal(c?.description ?? "");
  const [communityType, setCommunityType] = createSignal<string | null>(
    c?.type ?? null,
  );
  const [typeOpen, setTypeOpen] = createSignal(false);
  const [themeStyle, setThemeStyle] = createSignal(c?.theme.style ?? "minimal");
  const [primaryHue, setPrimaryHue] = createSignal(c?.theme.primaryHue ?? 192);
  const [font, setFont] = createSignal<FontStackId>(validFont(c?.theme.font));
  const [density, setDensity] = createSignal(c?.theme.spacing ?? 1.0);
  const [sizeScale, setSizeScale] = createSignal(c?.theme.sizeScale ?? 1.618);
  const [fontOpen, setFontOpen] = createSignal(false);
  const [isCustomTheme, setIsCustomTheme] = createSignal(false);
  const [cover, setCover] = createSignal(c?.bgImageUrl ?? DEFAULT_BG);
  const [crest, setCrest] = createSignal(c?.logoUrl ?? DEFAULT_CREST);

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
  const selectedFontStack = createMemo(
    () => FONT_STACKS[font()] ?? FONT_STACKS.default,
  );

  const previewStyle = createMemo(() => {
    const h = primaryHue();
    const stack = selectedFontStack();
    return {
      "--dsp-col-primary-dimmed": `oklch(0.4 0.3 ${h})`,
      "--dsp-col-primary": `oklch(0.6 0.26 ${h})`,
      "--dsp-col-primary-lightened": `oklch(0.8 0.12 ${h})`,
      "--dsp-col-adjacent-1": `oklch(0.6 0.26 ${h + 10})`,
      "--dsp-col-adjacent-2": `oklch(0.6 0.26 ${h - 10})`,
      "--dsp-col-bright-4": `oklch(0.65 0.02 ${h})`,
      "--dsp-col-bright-3": `oklch(0.82 0.02 ${h})`,
      "--dsp-col-bright-2": `oklch(0.9 0.02 ${h})`,
      "--dsp-col-bright-1": `oklch(0.96 0.015 ${h})`,
      "--dsp-col-bright-0": `oklch(0.98 0.01 ${h})`,
      "--dsp-col-dark-0": `oklch(0.15 0.02 ${h})`,
      "--dsp-col-dark-1": `oklch(0.18 0.011 ${h})`,
      "--dsp-col-dark-2": `oklch(0.23 0.009 ${h})`,
      "--dsp-col-dark-3": `oklch(0.28 0.009 ${h})`,
      "--dsp-col-dark-4": `oklch(0.4 0.009 ${h})`,
      "--dsp-scale": String(density()),
      "--dsp-font-signature": stack.signature,
      "--dsp-font-main": stack.main,
      "--dsp-font-mono": stack.mono,
      "--dsp-font-size-ratio": String(sizeScale()),
    };
  });

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
      setSizeScale(preset.sizeScale);
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
          class="shrink-0"
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
            <div class="flex gap-4 h-44">
              <div class="flex-[1] flex flex-col min-w-0">
                <p class={labelClass}>Crest</p>
                <div class="relative flex-1 rounded-xl overflow-hidden border border-col-line bg-col-dark-1">
                  <img
                    src={crest()}
                    alt="Community crest"
                    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4/5 w-auto object-contain opacity-40 brightness-0 invert"
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

              <div class="flex-[3] flex flex-col min-w-0">
                <p class={labelClass}>Cover</p>
                <div class="relative flex-1 rounded-xl overflow-hidden border border-col-line bg-col-bg">
                  <img
                    src={cover()}
                    alt="Community cover"
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

            {/* Font Stack */}
            <div>
              <p class={labelClass}>Font Stack</p>
              <div ref={fontRef} class="relative">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFontOpen(!fontOpen());
                  }}
                  class="w-full flex items-center justify-between rounded-xl border border-col-line bg-col-bg px-4 py-3 hover:border-col-accent transition-colors cursor-pointer"
                >
                  <div class="flex flex-col items-start gap-0.5">
                    <span
                      class="text-fs-4 text-col-fg leading-tight mb-1 font-bold"
                      style={`font-family: ${selectedFontStack().signature}`}
                    >
                      Font Style: {selectedFontStack().name}
                    </span>
                    <span
                      class="text-fs-2 text-col-fg-soft"
                      style={`font-family: ${selectedFontStack().main}`}
                    >
                      {selectedFontStack()
                        .signature.split(",")[0]
                        .replace(/"/g, "")}{" "}
                      /{" "}
                      {selectedFontStack().main.split(",")[0].replace(/"/g, "")}
                    </span>
                  </div>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    class={`shrink-0 text-col-fg-weak transition-transform ${fontOpen() ? "rotate-180" : ""}`}
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
                  <div class="absolute top-full mt-2 left-0 right-0 z-30 rounded-2xl border border-col-line bg-col-bg shadow-xl overflow-hidden max-h-80 overflow-y-auto">
                    <For each={Object.entries(FONT_STACKS)}>
                      {([id, stack]) => (
                        <button
                          type="button"
                          onClick={() => {
                            setFont(id as FontStackId);
                            setFontOpen(false);
                            markCustomTheme();
                          }}
                          class={`w-full text-left px-4 py-3 hover:bg-col-bg-soft transition-colors border-b border-col-line last:border-0 ${font() === id ? "bg-col-bg-soft" : ""}`}
                        >
                          <div
                            class="text-fs-4 text-col-fg leading-tight mb-1 font-bold"
                            style={`font-family: ${stack.signature}`}
                          >
                            Font Style: {stack.name}
                          </div>
                          <div
                            class="text-fs-2 text-col-fg-soft"
                            style={`font-family: ${stack.main}`}
                          >
                            {stack.signature.split(",")[0].replace(/"/g, "")} /{" "}
                            {stack.main.split(",")[0].replace(/"/g, "")}
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
                min="0.8"
                max="1.3"
                step="0.01"
                value={density()}
                onInput={(e) => {
                  setDensity(+e.currentTarget.value);
                  markCustomTheme();
                }}
                class="w-full h-2 appearance-none cursor-pointer rounded-full bg-col-line [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-col-fg [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-col-bg [&::-webkit-slider-thumb]:shadow-md"
              />
            </div>

            {/* Size Scale */}
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <p class={labelClass} style="margin-bottom: 0">
                  Size Scale
                </p>
                <div class="flex items-center gap-3 text-fs-1 text-col-fg-weak">
                  <span>Small</span>
                  <span>Large</span>
                </div>
              </div>
              <input
                type="range"
                min="1.3"
                max="2"
                step="0.01"
                value={sizeScale()}
                onInput={(e) => {
                  setSizeScale(+e.currentTarget.value);
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
            class="rounded-2xl overflow-hidden border border-col-line shadow-lg bg-col-bg-soft"
            style={previewStyle()}
          >
            <CommunityHeader
              bgImageUrl={cover()}
              logoUrl={crest()}
              name={name() || "Community Name"}
              description={
                description() || "Your community description will appear here."
              }
              imageHeight="h-40"
              badge={selectedType()?.name}
            />

            {/* Content */}
            <div class="px-5 pb-5 font-fam-main">
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
                        class="text-col-fg-weak shrink-0"
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
                    class="shrink-0"
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
                    class="text-col-fg-weak shrink-0"
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

              <div class="mt-4 pt-4 border-t border-col-line">
                <Heading
                  level={2}
                  super="Community Content"
                  sub="See how your texts look like"
                >
                  Welcome to the community
                </Heading>
                <p class="text-fs-3 text-col-fg-soft leading-relaxed font-fam-main mb-2">
                  This is an example text that shows how much whitespace sits
                  around your copy.{" "}
                </p>
                <p class="text-fs-3 text-col-fg-soft leading-relaxed font-fam-main">
                  Especially, it's also possible to{" "}
                  <span class="font-fam-mono text-col-accent-strong bg-col-bg-soft px-1 rounded">
                    inspect
                  </span>{" "}
                  the proportions of fixed width passages.
                </p>
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
