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

## Stage 3: first 100 complete game profiles

The first 100 entries in the existing catalogue selection receive full Spanish
profiles. Every existing introductory paragraph, editorial explanation and
feature description is translated; no profile is shortened to a passport.
The Spanish renderer preserves the English renderer's calculations, related-game
selection, source URLs and missing-data rules. It reuses the existing local
artwork and styles. The shared casino link and promo-code controls gain Spanish
copy while retaining their URL, code, safe link attributes and clipboard fallback.

Readiness for dynamic game routes uses a separate lightweight slug registry,
without shipping the full translated content to the language selector. Catalogue
cards and related rows choose Spanish destinations only for complete profiles;
remaining English destinations remain labelled. The static foundation route list
stays limited to static pages, as in the existing English registry.

The new source hashes identify the exact existing English content used for each
translation. Tests compare all 100 entries, paragraph/feature counts, numerical
values, source links, complete exported HTML and reciprocal language routes.
Browser checks cover 320, 375, 390, 768, 1024 and 1440 px, including the first,
middle and last profile, real artwork, safe outbound navigation, keyboard focus,
copy success and manual copying after a denied clipboard request. Existing
RU/EN tests and CI timeout settings remain unchanged.

## Stage 4: catalogue profiles 101–200

The next 100 entries from the existing second catalogue batch receive complete
Spanish translations of every introductory paragraph, feature and editorial
explanation. The shared renderer and data selection are unchanged. This batch
extends the lightweight route registry and source fingerprints to 200 profiles;
the remaining English game destinations keep their explicit language labels.

The batch reuses the same completeness, numerical-value, source-fingerprint,
exported-content, reciprocal-language and responsive-browser regressions. No
game characteristic, source record, artwork, published selection or CI rule is
changed. There are 700 catalogue profiles and 100 game guides left to translate
after this batch, alongside the remaining site sections.

## Stage 5: catalogue profiles 201–300

The third existing catalogue batch receives complete Spanish introductions,
feature explanations and editorial notes. Readiness and source fingerprints
extend to 300 profiles, with no changes to the shared renderer or source facts.
Edition differences, conditional awards, risk descriptions and missing-data
qualifications remain explicit. The same nine batch regressions cover complete
exported content and responsive browser behavior. After this batch, 600 catalogue
profiles and 100 game guides remain, plus the remaining site sections.

## Stage 6: catalogue profiles 301–400

The fourth existing catalogue batch receives complete Spanish content. Its 100
profiles preserve all introductory paragraphs, feature descriptions, editorial
qualifications and numerical values, including explicit source discrepancies.
The route registry and translation-source fingerprints now cover 400 profiles.
The renderer, verified source records and artwork remain unchanged. The same
nine batch regressions check the full export, original sources, language routes,
real images and six responsive widths. After this batch, 500 catalogue profiles
and 100 game guides remain, plus the remaining site sections.

## Stage 7: catalogue profiles 401–500

The fifth existing catalogue batch receives complete Spanish content. All 100
profiles preserve every source paragraph, feature and editorial qualification,
including the distinction between theoretical limits, feature values and
conditional awards. Readiness and source fingerprints extend to 500 profiles.
The same nine regressions cover complete HTML, original sources, language routes,
real artwork and six responsive widths. After this batch, 400 catalogue profiles
and 100 game guides remain, plus the remaining site sections.

## Stage 8: catalogue profiles 501–600

The next existing catalogue batch receives 100 complete Spanish translations.
All introductory paragraphs, features, editorial notes, numerical values and
source qualifications are preserved, including differences between editions and
conditional bonus behavior. The shared renderer and source records are unchanged.
Readiness and source fingerprints extend to 600 profiles. The same nine
regressions cover complete export content, original sources, reciprocal language
routes, real artwork and six responsive widths. After this batch, 300 catalogue
profiles and 100 game guides remain, plus the remaining site sections.

## Stage 9: catalogue profiles 601–700

The next existing catalogue batch receives 100 complete Spanish translations.
All introductory paragraphs, features, editorial notes, numerical values and
source qualifications are preserved, including differences between editions and
conditional bonus behavior. The shared renderer and source records are unchanged.
Readiness and source fingerprints extend to 700 profiles. The same nine
regressions cover complete export content, original sources, reciprocal language
routes, real artwork and six responsive widths. After this batch, 200 catalogue
profiles and 100 game guides remain, plus the remaining site sections.

## Stage 10: catalogue profiles 701–800

The next existing catalogue batch receives 100 complete Spanish translations.
All introductory paragraphs, features, editorial notes, numerical values and
source qualifications are preserved, including differences between editions and
conditional bonus behavior. The shared renderer and source records are unchanged.
Readiness and source fingerprints extend to 800 profiles. The same nine
regressions cover complete export content, original sources, reciprocal language
routes, real artwork and six responsive widths. After this batch, 100 catalogue
profiles and 100 game guides remain, plus the remaining site sections.

## Stage 11: catalogue profiles 801–900

The next existing catalogue batch receives 100 complete Spanish translations.
All introductory paragraphs, features, editorial notes, numerical values and
source qualifications are preserved, including differences between editions and
conditional bonus behavior. The shared renderer and source records are unchanged.
Readiness and source fingerprints extend to 900 profiles. The same nine
regressions cover complete export content, original sources, reciprocal language
routes, real artwork and six responsive widths. After this batch, 0 catalogue
profiles and 100 game guides remain, plus the remaining site sections.

## Stage 12: first five complete game guides

Gates of Olympus, Sweet Bonanza, Book of Dead, Reactoonz and The Dog House receive
complete Spanish guides. Descriptions, rule explanations, every feature card,
editorial notes, metric caveats, release dates, source qualifications and shared
FAQ are translated. Game records, calculations, source URLs and artwork remain
unchanged. A separate server renderer reuses the existing dossier styles.

Only the five complete routes enter readiness, language links and reciprocal
alternates. Catalogue cards and related rows link to those Spanish guides;
untranslated destinations remain explicitly labelled. Tests fingerprint English
source copy, preserve numerical sequences and caveats, check complete export
content and original references, and exercise every guide at six widths.
The total remains 1000 games; the remaining translation scope is 95 game guides
and other site sections, including full parity with all 1052 original RU routes.

## Stage 13: complete game guides 6–10

Big Bass Bonanza, Jammin’ Jars, Razor Shark, Wanted Dead or a Wild and Le Bandit
receive complete existing content in Spanish, including their feature cards and
source qualifications. Maximum and observed figures remain distinct. Wanted's
conflicting first-party volatility scales and Le Bandit's indirect release-date
reference are retained explicitly. Dates not overridden by editorial copy use
the existing passport's translated month, without changing the source date.

Source fingerprints now include resolved English feature cards as well as the
per-game copy, covering explanatory cards supplied by the shared English helper.
The original thirty responsive checks for five template representatives remain;
each additional copy-only guide receives its own 390px browser scenario and
complete export/content/source checks. No existing scenario or timeout is removed.
Readiness covers ten guides; 90 guides and the other site sections remain.

## Stage 14: complete game guides 11–20

San Quentin xWays, Fire in the Hole, Starlight Princess, Sugar Rush, Fruit Party,
Legacy of Dead, Fire Joker, Rise of Olympus, Fat Rabbit and Retro Tapes receive
complete Spanish descriptions, feature explanations, editorial notes and cards.
Fat Rabbit's observed-win qualification and both sourced RTP configurations in
Retro Tapes remain explicit. No source records or numerical values change.
Visual review also found an English passport category in Retro Tapes. The
display formatter now translates all fifteen existing passport categories;
a regression checks every source passport and keeps its stored value unchanged.
Readiness and complete-source fingerprints cover twenty guides. Existing export
checks cover every new text and source; each new guide has a 390px browser check,
in addition to the unchanged six-width representative matrix. Eighty guides and
the remaining site sections still require translation.

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
