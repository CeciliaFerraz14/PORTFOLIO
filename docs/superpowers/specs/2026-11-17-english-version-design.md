# English version with a language switch

## Intent

Make the whole portfolio readable in English, with an `ES / EN` switch in the
top navigation, so it can be shared with recruiters (Deloitte application)
who may prefer English.

## Goals

- Every visible text has a Spanish and an English version: hero, about,
  projects (cards, detail window, screenshot labels and alt texts), ideas,
  skills, contact, contact form and its messages, footer, aria labels.
- `ES / EN` switch in the top nav, right of "Hablemos", in the site's style
  (Space Mono, ink border); the active language is highlighted.
- First visit: browser language (`en*` -> English, otherwise Spanish). After
  that, the choice is remembered in `localStorage` (wrapped in try/catch).
- `<html lang>` follows the selected language.
- English keeps the same close, playful tone as the Spanish copy.

## Non-goals

- No per-language URLs (`/en`), no proxy, no i18n library.
- Metadata (title, description), Open Graph image and social previews stay in
  Spanish.

## Approaches

1. Sub-path routing `/es` and `/en` (Next.js 16 guide): shareable English URL
   and translated metadata, more restructuring.
2. Client-side switch on the same URL (chosen by Cecilia: simpler). Cost:
   first paint is Spanish until the stored/browser language is read, and
   previews stay in Spanish.
3. `next-intl`: same as 1 with an extra dependency; not worth it for one page.

## Design

- `src/app/i18n/es.ts` is the source dictionary; `src/app/i18n/en.ts` is typed
  against it (`typeof es`), so a missing key fails the build.
- Project data (`projects.tsx`) keeps one structure; translatable fields hold
  both languages or come from the dictionaries, without duplicating images,
  sizes or layout.
- A small client `LanguageProvider` (React context) holds the locale and
  exposes the dictionary; every client component reads from it. The page is
  already a client component.
- The contact server action returns error codes; the form maps them to the
  current dictionary.

## Left to the builder

- Exact key structure of the dictionaries.
- How the provider avoids a visible flash when the stored language is English
  (e.g. render after reading storage, matching the existing loader).
