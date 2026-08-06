import { ui, defaultLang, type Lang, type UiKey } from "./ui";

/**
 * Coerces an arbitrary locale string (e.g. `Astro.currentLocale`) into a
 * supported `Lang`, falling back to the default locale.
 */
export function toLang(locale: string | undefined): Lang {
  return locale === "es" ? "es" : defaultLang;
}

/**
 * Returns a translator `t(key, params?)` for the given locale. Keys are
 * autocompleted from the English dictionary; missing translations fall
 * back to English. `{placeholder}` tokens are interpolated from `params`.
 *
 * When called without `params`, the raw template is returned unchanged —
 * useful for passing token templates to client-side scripts.
 */
export function useTranslations(lang: Lang) {
  return function t(key: UiKey, params?: Record<string, string | number>) {
    let text: string = ui[lang][key] ?? ui[defaultLang][key];
    if (params) {
      for (const [token, value] of Object.entries(params)) {
        text = text.replaceAll(`{${token}}`, String(value));
      }
    }
    return text;
  };
}
