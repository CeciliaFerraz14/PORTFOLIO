export type Locale = "es" | "en";

export type Localized = { es: string; en: string };

export const LOCALE_STORAGE_KEY = "lang";

export function isLocale(value: unknown): value is Locale {
  return value === "es" || value === "en";
}

export function readStoredLocale(
  storage: Pick<Storage, "getItem"> | undefined,
): Locale | null {
  try {
    const value = storage?.getItem(LOCALE_STORAGE_KEY);
    return isLocale(value) ? value : null;
  } catch {
    return null;
  }
}

// A stored choice wins; otherwise the browser's first language decides.
export function pickLocale(
  stored: Locale | null,
  languages: readonly string[],
): Locale {
  if (stored) return stored;
  return languages[0]?.toLowerCase().startsWith("en") ? "en" : "es";
}
