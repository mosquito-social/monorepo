export {
  flatten,
  translator,
  resolveTemplate,
  template,
} from '@solid-primitives/i18n';
import type { Locale } from './types.js';
export type { Locale } from './types.js';

/**
 * Reads locale from cookie, falls back to browser language, then 'en'.
 * Safe to call on server (returns 'en').
 */
export function detectLocale(): Locale {
  if (typeof document === 'undefined') return 'en';
  const cookie = document.cookie.match(/locale=([^;]+)/)?.[1];
  if (cookie === 'de' || cookie === 'en') return cookie;
  if (typeof navigator !== 'undefined' && navigator.language.startsWith('de'))
    return 'de';
  return 'en';
}

/**
 * Writes the locale to a cookie so it persists across page loads.
 */
export function persistLocale(locale: Locale): void {
  if (typeof document === 'undefined') return;
  document.cookie = `locale=${locale}; path=/; max-age=${365 * 24 * 60 * 60}; SameSite=Lax`;
}
