# Slotfolio English localization — staged rollout (2026-10-15)

## Status / scope
The first English edition is a **initial editorial pilot**, not an English translation of all 1,000 game records. Do not announce the entire site as English-language yet. All existing Russian routes, dossiers, catalog-only descriptions, source citations, checked-in images, and search/filter behavior remain unchanged.

Translated routes:
- `/en`
- `/en/about`
- `/en/editorial-policy`
- `/en/privacy`
- `/en/responsible-gaming`
- `/en/journal/understanding-rtp`

Page navigation and footer translate according to explicit /en routes. The English UI labels unlocalized destinations as **Russian**. The language switcher maps one-to-one only for reviewed routes and otherwise lands on the English home page; it must never create broken `/en/slots/[slug]` links. Shared site layout retains Russian by default.

## Technical choices
- Preserve Next.js static export; no middleware, header-based negotiation or external translation services.
- `src/lib/locales.ts` is the reviewed English route allowlist.
- `src/lib/english-system-pages.ts` contains explicit human-readable English editorial-policy and safety copy. No machine translation of technical game details or invented operator availability.
- `src/components/shell.tsx` provides localized site navigation; `src/app/en/layout.tsx` marks English content with `lang=en`.
- `src/lib/seo.ts` adds bilingual canonical/alternate metadata only where both route versions exist. Use **UK English spelling and internationally understandable terminology** (e.g. catalogue, licence, paytable, paylines, Return to Player). English OpenGraph locale is `en_GB`.
- Root document language follows the current locale even on client-side navigation. Russian route defaults remain unchanged.
- Cloudflare Pages and GitHub Pages stay noindex. Do **not** enable indexing as part of localization.
- Cloudflare static export explicitly verifies English output files and noindex for `/en`.

## Next stages (not yet completed)
1. Translate the interactive catalog UI, filters, facets, navigation and category/collection pages and search behavior (preserving canonical 100+900 selection and query semantics).
2. Translate the 100 full dossiers with editorial review and terminology glossary for RTP, volatility, ways, paylines, max win and features; do not fabricate technical parameters.
3. Translate all 900 catalog-only records in deterministic, reviewable waves from the *published selection*, retaining source-backed attributes and artwork.
4. Translate mechanics, providers, all journal guides, collection articles, comparisons, regional help, validation messages, alt text and structured data. Expand `englishReadyPaths` only after complete translations.
5. Add locale-aware sitemap hreflang entries only for translated/indexable pages once the site is cleared for SEO. Preserve existing `noindex` gates in the meantime.

## Gate for every PR
Exact-head CI success (dependencies, typecheck, strict artwork, production build, full Playwright); verify English route render and language links at mobile and desktop widths. Guarded merge with expected head SHA, followed by both GitHub Pages and Cloudflare Pages deployment verification. English pages cannot claim full catalogue translation while game dossiers remain Russian. A translated page must read naturally in English, not mechanically follow Russian syntax. The editor must verify factual equivalence against the Russian page, check policy/affiliate claims, use the terminology glossary, and label all Russian-only links.
