import {
  detectLocale,
  flatten,
  persistLocale,
  resolveTemplate,
  translator,
} from 'i18n';
import type { Locale } from 'i18n';
import {
  type ParentProps,
  createContext,
  createSignal,
  useContext,
} from 'solid-js';
import { de } from './de';
import { en } from './en';

const dicts = {
  en: flatten(en),
  de: flatten(de),
} as const;

type I18nContextValue = {
  t: (key: string) => string;
  locale: () => Locale;
  setLocale: (locale: Locale) => void;
};

const I18nCtx = createContext<I18nContextValue>();

export function I18nProvider(props: ParentProps) {
  const [locale, rawSetLocale] = createSignal<Locale>(detectLocale());

  const dict = () => dicts[locale()] as unknown as Record<string, string>;
  const t = translator(dict, resolveTemplate) as (key: string) => string;

  const setLocale = (l: Locale) => {
    rawSetLocale(l);
    persistLocale(l);
  };

  return (
    <I18nCtx.Provider value={{ t, locale, setLocale }}>
      {props.children}
    </I18nCtx.Provider>
  );
}

export function useT(): I18nContextValue {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error('useT must be used inside I18nProvider');
  return ctx;
}
