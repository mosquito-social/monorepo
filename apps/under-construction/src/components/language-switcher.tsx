import { useT } from "~/i18n/index";

export function LanguageSwitcher() {
  const { locale, setLocale } = useT();

  return (
    <button
      type="button"
      onClick={() => setLocale(locale() === "en" ? "de" : "en")}
      class="text-sm font-semibold text-col-text-muted hover:text-col-text transition-colors px-2 py-1 rounded"
      aria-label="Switch language"
    >
      {locale() === "en" ? "DE" : "EN"}
    </button>
  );
}
