"use client";

import { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import { en } from "./en";
import { es, type Dictionary } from "./es";
import {
  LOCALE_STORAGE_KEY,
  pickLocale,
  readStoredLocale,
  type Locale,
} from "./locale";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const listeners = new Set<() => void>();

// The choice made in this visit; kept here so it works even when storage throws.
let chosen: Locale | null = null;

function safeLocalStorage(): Storage | undefined {
  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): Locale {
  return chosen ?? pickLocale(readStoredLocale(safeLocalStorage()), navigator.languages);
}

// Matches the server HTML, so hydration never mismatches.
function getServerSnapshot(): Locale {
  return "es";
}

function setLocale(next: Locale) {
  chosen = next;
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
  } catch {
    // Storage unavailable: the choice only lasts for this visit.
  }
  listeners.forEach((listener) => listener());
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(
    () => ({ locale, setLocale, t: locale === "en" ? en : es }),
    [locale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
