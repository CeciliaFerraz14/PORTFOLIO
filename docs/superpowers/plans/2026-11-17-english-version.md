# English Version Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Every visible text of the portfolio in Spanish and English, with an `ES / EN` switch in the top nav.

**Architecture:** Client-side locale held in a React context (`LanguageProvider`) mounted in the root layout. UI copy lives in two typed dictionaries (`es.ts` source, `en.ts` typed against it). Project copy stays next to its images in `projects.tsx` as `{ es, en }` pairs. Same URL for both languages.

**Tech Stack:** Next.js 16.3.5 (App Router, client components), React 19, TypeScript 5, Node 24 built-in test runner (`node --test`, native type stripping). No new dependencies.

**Spec:** `docs/superpowers/specs/2026-11-17-english-version-design.md`

## Global Constraints

- No i18n library, no proxy, no `/en` routes.
- Metadata (title, description), `opengraph-image.tsx` and `apple-icon.tsx` stay in Spanish.
- First visit: browser language (`en*` -> `en`, anything else -> `es`); afterwards the stored choice wins. Storage key: `lang`. Every `localStorage` access in try/catch.
- `<html lang>` follows the selected locale; server render is `es`.
- English copy keeps the Spanish tone: close and playful, not corporate (e.g. "psst… empieza por aquí" -> "psst… start here").
- Switch label `ES / EN`, placed in `.nav-links` after "Hablemos", using existing tokens only (`--ink`, `--paper`, `--font-space-mono`); active language visibly marked, `aria-pressed` on each button.
- Code and comments in English, no emoji (existing glyphs like `✉`, `☕`, `⌘` in the UI stay).
- The contact email sent to Cecilia (subject, topic labels in `actions.ts`) stays in Spanish.
- Run `npx tsc --noEmit`, `npx eslint src/app` and `npm test` after every task; all must pass.

## Review Focus

- `localStorage` unavailable or throwing (private mode, blocked storage): page renders in the browser language, switch still works for the session. Test in Task 1 (`readStoredLocale` with a throwing storage).
- Regional browser languages (`en-GB`, `en-US`, `ca-ES`, `pt-BR`, empty list): `en*` -> `en`, everything else -> `es`. Test in Task 1.
- Switching language while a project window, the about folder or the tablet contact app is open: open content re-renders in the new language and stays open. Checked in Task 5 browser pass.
- A form error is showing and the language changes: the error text changes too (the form stores the error code, not the text). Covered by Task 3's typed error codes; checked in Task 5.
- English strings longer than Spanish on a 360 px wide screen: nav with the switch does not overflow horizontally, project cards and skill pills wrap. Checked in Task 5.

---

### Task 1: Locale core and provider

**Files:**
- Create: `src/app/i18n/locale.ts`
- Create: `src/app/i18n/locale.test.ts`
- Create: `src/app/i18n/LanguageProvider.tsx`
- Modify: `src/app/layout.tsx` (wrap `children`, `lang="es"` instead of the current wrong `"en"`)
- Modify: `package.json` (add script `"test": "node --test src/app/i18n/*.test.ts"`)
- Modify: `tsconfig.json` (add `"allowImportingTsExtensions": true` so the test can import `./locale.ts`; `noEmit` is already set)

**Interfaces:**
- Produces (in `locale.ts`, no imports, so Node can run it directly):
  - `export type Locale = "es" | "en"`
  - `export const LOCALE_STORAGE_KEY = "lang"`
  - `export function isLocale(value: unknown): value is Locale`
  - `export function readStoredLocale(storage: Pick<Storage, "getItem"> | undefined): Locale | null` (returns `null` when missing, invalid or when `getItem` throws)
  - `export function pickLocale(stored: Locale | null, languages: readonly string[]): Locale`
  - `export type Localized = { es: string; en: string }`
- Produces (in `LanguageProvider.tsx`, `"use client"`):
  - `export function LanguageProvider({ children }: { children: React.ReactNode }): JSX.Element`
  - `export function useLanguage(): { locale: Locale; setLocale(locale: Locale): void; t: Dictionary }` (`Dictionary` comes from Task 2; until then `t` may be omitted and added in Task 2)

- [ ] **Step 1: Write the failing tests** in `locale.test.ts` with `node:test` and `node:assert/strict`:
  - `pickLocale(null, ["en-GB", "es"])` -> `"en"`; `pickLocale(null, ["ca-ES", "en"])` -> `"es"` (first language decides); `pickLocale(null, [])` -> `"es"`; `pickLocale("es", ["en-US"])` -> `"es"`; `pickLocale("en", ["es-ES"])` -> `"en"`.
  - `readStoredLocale({ getItem: () => "en" })` -> `"en"`; `readStoredLocale({ getItem: () => "fr" })` -> `null`; `readStoredLocale({ getItem: () => { throw new Error("blocked"); } })` -> `null`; `readStoredLocale(undefined)` -> `null`.
- [ ] **Step 2: Run `npm test`.** Expected: FAIL (module not found).
- [ ] **Step 3: Implement `locale.ts`** with the signatures above.
- [ ] **Step 4: Run `npm test`.** Expected: PASS.
- [ ] **Step 5: Implement `LanguageProvider.tsx`.** Initial state `"es"` (matches the server render). In an effect on mount: `pickLocale(readStoredLocale(safeLocalStorage()), navigator.languages)`. `setLocale` updates state and writes `LOCALE_STORAGE_KEY` in try/catch. An effect keeps `document.documentElement.lang` in sync. Wrap `children` in `layout.tsx`.
- [ ] **Step 6: Run `npx tsc --noEmit && npx eslint src/app && npm test && npm run build`.** Expected: all pass.
- [ ] **Step 7: Commit** `feat(i18n): add locale detection and language provider`.

### Task 2: Dictionaries, nav switch and page sections

**Files:**
- Create: `src/app/i18n/es.ts`, `src/app/i18n/en.ts`
- Modify: `src/app/i18n/LanguageProvider.tsx` (expose `t`)
- Modify: `src/app/page.tsx` (every visible string, `aria-label`, the explorer/roadmap data around lines 130-140, `skillGroups` labels and the IA/Idiomas pill texts, footer)
- Modify: `src/app/globals.css` (`.lang-switch` styles, mobile rule inside the existing `@media (max-width: 760px)` block)

**Interfaces:**
- Consumes: `Locale`, `useLanguage` from Task 1.
- Produces: `export const es = { ... }` and `export type Dictionary = typeof es` in `es.ts`; `export const en: Dictionary = { ... }` in `en.ts`. Top-level keys later tasks rely on: `nav`, `hero`, `about`, `projects`, `ideas`, `skills`, `contact`, `form`, `tablet`, `footer`. Tasks 3 and 4 add keys under `form`, `tablet` and `projects` (UI words only, like "abrir").

- [ ] **Step 1: Create `es.ts`** with all copy currently in `page.tsx`, copied verbatim, and `en.ts` with the English version. A missing key in `en.ts` must fail `tsc`.
- [ ] **Step 2: Replace the strings in `page.tsx`** with `t.*` from `useLanguage()`. Data arrays that hold copy (roadmap, explorer folders, skill groups) move into the dictionaries or read their text from them; tech names in pills (React, Supabase...) are not translated.
- [ ] **Step 3: Add the switch** in `.nav-links` after "Hablemos": two buttons `ES` and `EN` inside `<div className="lang-switch" role="group" aria-label={t.nav.language}>`, each with `aria-pressed` and `onClick={() => setLocale(...)}`.
- [ ] **Step 4: Run `npx tsc --noEmit && npx eslint src/app && npm test && npm run build`.** Expected: all pass.
- [ ] **Step 5: Commit** `feat(i18n): translate page sections and add ES/EN switch`.

### Task 3: Interactive components and contact form

**Files:**
- Modify: `src/app/ContactForm.tsx`, `src/app/actions.ts`, `src/app/TabletContact.tsx`, `src/app/IdeaPad.tsx`, `src/app/ProjectsBoard.tsx` (UI words only: "abrir", "Abrir …", close labels, "Pruébala", install headings), `src/app/ShotCarousel.tsx` (aria labels)
- Modify: `src/app/i18n/es.ts`, `src/app/i18n/en.ts` (keys under `form`, `tablet`, `ideas`, `projects`)

**Interfaces:**
- Consumes: `useLanguage` (Task 1), `Dictionary` (Task 2).
- Produces: `export type ContactErrorCode = "invalid" | "not-configured" | "send-failed"` in `actions.ts`; `ContactResult = { ok: true } | { ok: false; error: ContactErrorCode }`. The form keeps `ContactErrorCode | null` in state (a network failure maps to `"send-failed"`) and renders `t.form.errors[code]`, so the message follows the language.

- [ ] **Step 1: Change `actions.ts`** to return the codes above; email subject and body stay in Spanish.
- [ ] **Step 2: Translate the components** listed above through `t.*`.
- [ ] **Step 3: Run `npx tsc --noEmit && npx eslint src/app && npm test && npm run build`.** Expected: all pass, and `grep -n "error: \"" src/app/actions.ts` shows only codes.
- [ ] **Step 4: Commit** `feat(i18n): translate interactive components and contact form`.

### Task 4: Bilingual project data

**Files:**
- Modify: `src/app/projects.tsx`
- Modify: `src/app/ProjectsBoard.tsx`, `src/app/ShotCarousel.tsx` (read the localized fields)

**Interfaces:**
- Consumes: `Locale`, `Localized` (Task 1), `useLanguage` (Task 1).
- Produces: in `Project`, `subtitle?`, `status.label`, `summary`, `problem`, `tryIt.label`, `tryIt.note`, and each `Shot.alt` / `Shot.label` become `Localized`; `built` becomes `Localized[]`; `install` entries become `{ platform: Localized; steps: Localized[] }` (shared `pwaInstall` stays one constant). `visual` becomes `(locale: Locale) => ReactNode`, and its `alt` texts reuse the same `Localized` values as the project's `shots` (declare each project's shots once, before the project object, and read them from both places; no duplicated alt strings). Titles and tags are not translated.

- [ ] **Step 1: Convert the types and the five projects** (Neurodate, HOMI, TrokoApp, FaltApp, Atenea CRM), keeping the Spanish text verbatim and adding English with the same meaning and tone.
- [ ] **Step 2: Update `ProjectsBoard.tsx` and `ShotCarousel.tsx`** to render `field[locale]` and `project.visual(locale)`.
- [ ] **Step 3: Run `npx tsc --noEmit && npx eslint src/app && npm test && npm run build`.** Expected: all pass.
- [ ] **Step 4: Commit** `feat(i18n): translate project content`.

### Task 5: Browser verification (main session, not a subagent)

- [ ] **Step 1:** `npm run dev`, open the site in one browser at desktop width and at 360 px.
- [ ] **Step 2:** Check every Review Focus line: switch both ways with a project window, the about folder and the tablet app open; trigger a form error and switch; first visit with an English browser language; reload keeps the choice; no Spanish left in English mode except metadata and tech names; nav does not overflow at 360 px.
- [ ] **Step 3:** Fix anything found through the owning task's implementer, then stop the dev server and close the tab.
