"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  LOCALE_STORAGE_KEY,
  pickLocale,
  readStoredLocale,
  type Locale,
} from "./locale";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function safeLocalStorage(): Storage | undefined {
  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Starts as "es" so the first client render matches the server HTML.
  const [locale, setLocaleState] = useState<Locale>("es");

  useEffect(() => {
    // Browser-only values can only be read after hydration, so this one-time sync is intentional.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocaleState(
      pickLocale(readStoredLocale(safeLocalStorage()), navigator.languages),
    );
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  function setLocale(next: Locale) {
    setLocaleState(next);
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      // Storage unavailable: the choice only lasts for this visit.
    }
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
