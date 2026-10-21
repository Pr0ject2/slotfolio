# Spanish localization

User scope: the whole existing site, in separate stages. Base: main
`864abb23cfc44e0e587867344ee3b63b0a8770d9` (PR #528). No new games,
new research claims, replacement artwork, indexing change, or Wave 88.

## Stage 1: foundation

Seven complete pages: `/es`, `/es/about`, `/es/editorial-policy`, `/es/privacy`,
`/es/disclosure`, `/es/responsible-gaming`, `/es/journal/understanding-rtp`.
The existing navigation, language storage and static document-language script now
support RU/EN/ES. Manual selection retains the current query and anchor; a saved
Spanish preference cannot discard an untranslated direct game link.

Only complete routes belong in `spanishReadyPaths`. Canonical and reciprocal
hreflang use real translations. Global noindex and the existing sitemap policy
remain unchanged. Until a destination has its complete Spanish translation,
visitor-facing links explicitly say "en inglés" rather than presenting English
content as Spanish. The affiliate disclosure reflects the actual outbound casino
selection link without promising any game's regional availability or a bonus.
Existing RU/EN privacy copy now names the three-language selector.

Spanish uses neutral, direct wording: `tragamonedas`, `tirada`, `proveedor`,
`retorno al jugador`, `volatilidad`, `tabla de pagos`. Preserve game names, source
URLs, configurations, numerical values and source qualifications. Translate the
whole existing content; do not reduce game pages to a passport or invent facts.
British support services remain explicitly qualified as British, not universal
resources for Spanish-speaking visitors.

Local checks: TypeScript and production static build PASS (2116 pages), 36
Playwright checks PASS (10 new, 13 existing language checks, 13 retired-link
regressions). Real screenshots cover 320, 390, 768, 1024 and 1440 px. The new
tests also cover plain HTML without JavaScript, keyboard menu/focus, persistence
before hydration, browser detection, complete policy sections, real reciprocal
alternates and absence of falsely advertised Spanish game routes.

## Stage 2: catalogue and search interface

Based on published main `468036fe3a09f48246f3b13c6f1ba6857d6ede04` (#529).
Adds `/es/slots` and `/es/search`, using the existing 1000-game model and shared
catalogue controls. Filters, result counts, sorting, pagination, list/cover views,
empty results and comparison selection have Spanish copy. Label formatting
preserves empty values, dates, digits, ranges and branded feature names.
Whole Spanish search phrases resolve to existing English aliases; isolated words
such as `de` do not broaden unrelated searches. Accents are accepted without
altering Russian normalization. Both game types retain their current English
destinations, explicitly labelled `en inglés`; individual Spanish profiles will
be registered only after their complete translation.

New regressions cover all 1000 records, alias equivalence, dates and unknown
values, real loaded artwork, both routes and views at all five widths, filters,
URL/history state, pagination, empty results, reload persistence and keyboard
comparison selection. No artwork manifest, game facts, source, published set,
indexing policy, CI configuration or existing test requirement is changed.

## Remaining stages

1. Catalogue, search and filters, with Spanish formatting and feature labels;
   complete translations of the 900 existing catalogue profiles in batches of
   100. Register each game only when its full page is translated, including
   mechanics, bonuses, explanations, provenance and caveats.
2. Complete translations of all 100 existing game guides, including the casino
   link and promo-code interaction. Reuse the same verified local artwork and
   source records. Preserve all factual differences between editions.
3. The 18 provider profiles, five mechanics and comparison, including controls,
   presets and persistence across all three languages.
4. Journal, collections, bonuses and regions. The exported English inventory has
   seven journal articles, four collections, and a Great Britain regional page;
   check Russian content too so that a missing English translation cannot omit
   an existing Russian page from the Spanish scope. Translate full content,
   tables, captions, controls and meaningful image descriptions.
5. The two retired-link chooser pages and all remaining loading/error/help
   states. Replace temporary English-labelled destinations only when the Spanish
   destination exists. Audit parity against the published Russian catalogue
   (1000 games) and complete route inventory, not merely the current ready list.

Each stage requires a separate PR, exact-final-SHA CI success and a verified
preview. The user explicitly authorized #529 and all subsequent Spanish stages
after these checks on 2026-10-21. Verify mergeability and both GitHub Pages and
Cloudflare production for each merged SHA before merging the next stage.
Do not merge CI-only branches, relax guards or publish a partial profile as a
complete translation.
