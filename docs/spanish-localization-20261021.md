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
preview. Publication authorization for earlier English batches is not silently
extended to new Spanish PRs. Do not merge CI-only branches, relax guards or
publish a partial profile as a complete translation.
