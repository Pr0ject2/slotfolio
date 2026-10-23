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

## Stage 15: complete game guides 21–30

Chaos Crew, Chaos Crew 2, Deadwood, Mental, Starburst, Gonzo’s Quest, Dead or Alive 2,
Money Train 2, Snake Arena and Book of 99 receive complete Spanish content.
Conflicting publisher figures, regional RTP qualifications and distinctions
between bonus modes remain explicit. Identical shared feature paragraphs reuse
reviewed literal Spanish translations; no missing paragraph is generated or
shortened. All original cards and notes remain present.
Readiness and full-source fingerprints cover thirty guides. Passport dates with
written months use conventional Spanish day/month/year phrasing; stored dates
are unchanged. Seventy guides and the remaining site sections still require work.

## Stage 16: complete game guides 31–40

gates-of-olympus-1000, sugar-rush-1000, gates-of-olympus-super-scatter, sweet-bonanza-super-scatter, mahjong-wins-super-scatter, hand-of-anubis, rip-city, hell-hot-100, joker-stoker, lucky-streak-1 receive complete Spanish
copy, feature cards, editorial notes, numerical caveats and source labels.
No existing content is shortened. Game records, calculations, artwork and sources
remain unchanged. Readiness and complete-source fingerprints cover 40 guides.
The existing browser and export regressions include every added guide;
60 guides and the remaining site sections still require translation.

## Stage 17: complete game guides 41–50

3-coin-towers, hell-hot-40, crown-coins, 2026-hit-slot, 2021-hit-slot, 2023-hit-slot, 2025-hit-slot, prestige-crown, lucky-streak-3, lucky-streak-1000 receive complete Spanish
copy, feature cards, editorial notes, numerical caveats and source labels.
No existing content is shortened. Game records, calculations, artwork and sources
remain unchanged. Readiness and complete-source fingerprints cover 50 guides.
The existing browser and export regressions include every added guide;
50 guides and the remaining site sections still require translation.

## Stage 18: complete game guides 51–60

burning-coins-40, ultra-fresh, chance-machine-20, 81-burning-ways, burning-coins-20, dia-de-los-muertos-2, bear-crazy, the-big-dog-house, fury-of-anubis, nitro-nights receive complete Spanish
copy, feature cards, editorial notes, numerical caveats and source labels.
No existing content is shortened. Game records, calculations, artwork and sources
remain unchanged. Readiness and complete-source fingerprints cover 60 guides.
The existing browser and export regressions include every added guide;
40 guides and the remaining site sections still require translation.

## Stage 19: complete game guides 61–70

dork-unit, crypto-genesys, max-win-machine, power-of-ten, gemhalla, house-of-sins, scarab-temple, jungle-volcano, mighty-hot-amazonia, mummyland-treasures receive complete Spanish
copy, feature cards, editorial notes, numerical caveats and source labels.
No existing content is shortened. Game records, calculations, artwork and sources
remain unchanged. Readiness and complete-source fingerprints cover 70 guides.
The existing browser and export regressions include every added guide;
30 guides and the remaining site sections still require translation.

## Stage 20: complete game guides 71–80

troy-superways, gates-of-olympus-2500, sweet-bonanza-1000, black-friday-shady-lady, devils-finger, zeus-claws, panda-claw-jackpot, wolf-hunt-claw-and-win, claw-bonanza-gold-rush, double-triple-burning-wilds receive complete Spanish
copy, feature cards, editorial notes, numerical caveats and source labels.
No existing content is shortened. Game records, calculations, artwork and sources
remain unchanged. Readiness and complete-source fingerprints cover 80 guides.
The existing browser and export regressions include every added guide;
20 guides and the remaining site sections still require translation.

## Stage 21: complete game guides 81–90

clawbass-bonanza, clawbass-bonanza-free-rush, 3-claws-of-aztec-fire, great-clawsby-deluxe, fruit-train-express-hold-win, hot-and-spicy-jackpot, wild-west-girls, caramelo-jackpot, coin-flynn, coin-craze-jackpot receive complete Spanish
copy, feature cards, editorial notes, numerical caveats and source labels.
No existing content is shortened. Game records, calculations, artwork and sources
remain unchanged. Readiness and complete-source fingerprints cover 90 guides.
The existing browser and export regressions include every added guide;
10 guides and the remaining site sections still require translation.

## Stage 22: complete game guides 91–100

caishen-gold-infinity-dragon, money-booster, midas-hand-of-fortune, mustang-rush, power-of-zeus-mancala, life-and-death, rad-maxx, 777-coins, 3-hot-chillies, egypt-fire receive complete Spanish
copy, feature cards, editorial notes, numerical caveats and source labels.
No existing content is shortened. Game records, calculations, artwork and sources
remain unchanged. Readiness and complete-source fingerprints cover 100 guides.
The existing browser and export regressions include every added guide;
0 guides and the remaining site sections still require translation.

## Complete game coverage validation

The final six copy batches (guides 41–100) are submitted together after guide
40. All 100 complete guides and 900 catalogue profiles now have Spanish copy.
An exact-set regression compares all 1000 ready slugs against the published
catalogue, rejects extra routes and verifies Spanish language counterparts.
The untranslated-route browser test now uses an untranslated provider profile;
there are no untranslated published game pages left in this prepared tree.

Validation on Next.js 16.4.2: TypeScript PASS, production export 3118 pages,
234 Playwright tests PASS, 1008 local artwork assets verified, and four asset
security tests PASS. Existing six-width guide coverage remains unchanged;
every further guide receives a 390px browser check and full static-content,
number, source and reciprocal-language checks. Real screenshots include the
last guide, Egypt Fire, and Sweet Bonanza 1000. These are local results;
publication still requires exact-head CI and preview, then both production
hosts for every preceding stage in order.

## Stage 23: complete mechanics reference

Adds the Spanish mechanics index and all five complete explanations. Each
retains both principle paragraphs, the three-step sequence, contrast, appeal,
limitations, three rule questions and the existing game example. Original
example identities, related mechanics, game membership and calculated
statistics remain unchanged. Shared entity classes and the existing profile
CSS module preserve the editorial design. A Spanish-scoped contents rule keeps
short desktop links on separate rows; a real screenshot exposed the inherited
inline-flex collision, and a geometry regression checks all six 44px rows.
Individual Spanish game guides now
link directly to their Spanish mechanic explanation. The secondary navigation
replaces its duplicate catalogue entry with the mechanics index.

Regression coverage checks exact copy fields, paragraph counts, numbers,
rendered content and reciprocal language links; all five profiles receive
browser checks at 320/375/390/768/1024/1440. Keyboard navigation reaches the
rules from a game guide, follows contents anchors and persists comparison
selection. Untranslated provider, comparison and reading links remain labelled
as English. No game records, source lists, artwork, noindex or CI gates change.

Local validation: TypeScript PASS; final production export 3124 pages. All 234
existing scenarios passed in the combined regression run. After correcting two
new test-harness assumptions (scroll to lazy images and locate the comparison
button across its changing accessible name), all 32 new mechanics scenarios
passed. The final scoped contents fix passed those 32 scenarios plus the five
foundation width sweeps: 37/37 PASS. Desktop before/after screenshots confirm
separate contents rows; mobile screenshots include the loaded game artwork.

## Stage 24: complete provider profiles and navigation

Adds the provider index and all 18 profiles. Every existing summary, introduction,
body, signoff and optional reading note is translated in full. Reading-note game
identities, game membership and calculated distributions remain unchanged.
Original attribution uncertainties are retained; no unverified provider claim
is upgraded. A profile with no selected complete guides explicitly explains
that state rather than promising two nonexistent examples.

Spanish game guides and mechanic profiles now link to Spanish providers. The
footer exposes both completed entity sections. Home-page features now open the
complete Spanish game guides instead of their temporary English destinations.
The direct-untranslated-route test continues to cover a real untranslated
legacy edition chooser; published game and provider translations are checked
positively in dedicated tests. No game records, catalogue selection, sources,
artwork, noindex or CI gates change.

Validation for the provider stage: TypeScript PASS, production export 3143
pages, and all 297 local Playwright checks PASS. The 31 new provider checks
cover all 18 complete profiles, exact field and number parity, reading-note
identities, all game rows, 320/375/390/768/1024/1440, the index and a keyboard
path from the Spanish home through a guide and provider into filtered catalogue.
Real 320px and 1440px screenshots were reviewed. Exact-head CI, preview and
both production checks remain mandatory before sequential publication.

## Stage 25: complete Spanish comparison

Adds /es/compare using the existing shared comparison component and the same
100 published guide identities. All controls, presets, table headings,
configuration gaps and source qualifications are translated. The Spanish
comparison index reuses complete Spanish guide copy while preserving raw
identities, numbers, edition differences, metrics and source caveats.

Spanish catalogue controls, game guides, providers, mechanics, help and footer
now open the Spanish table. Selections still use the existing shared browser
storage across RU/EN/ES. The two-game limit, seed handling, removal, presets,
keyboard focus and horizontal table scrolling retain the original behaviour.
No game data, artwork, sources, noindex or CI gates change.

Validation: TypeScript PASS; production export 3144 pages; 341 Playwright
checks PASS, including all previous Spanish checks, the existing English
entity/comparison suite and Russian responsive comparison checks. Nine new
Spanish cases verify complete dictionary coverage, all 100 identities and
metrics, six viewport widths, loaded artwork, keyboard scrolling, all eight
presets, limits, seeds and three-language persistence. Real 320px and 1440px
screenshots were reviewed. Exact-head CI and preview remain required.

## Stage 26: complete journal and article navigation

Adds the journal index, all five complete practical guides and the long-form
cascades article. The existing Spanish RTP article remains available. Every
source paragraph, example, checklist, numerical illustration, table row,
caption, reference and publication date is retained. Only internal language
destinations change; official external source URLs stay identical. The existing
editorial layouts and article CSS are reused. A Spanish locale option for
article structured data preserves the default behaviour of existing callers.
The Spanish navigation now opens the full journal, and mechanic reading links
reach the Spanish cascade article. Collections still awaiting their Spanish
stage are explicitly labelled as English.

Validation: TypeScript PASS; production export 3151 pages; 62 targeted local
checks PASS, comprising 51 new journal checks and 11 existing foundation checks.
All eight journal routes were checked at 320/375/390/768/1024/1440. Tests verify
full copy and numerical parity, internal destinations, external source URLs,
the seven feature-article sections and their paragraph counts, four table rows,
Spanish metadata and language counterparts, keyboard anchors and horizontal
table scrolling. Real mobile and desktop screenshots were reviewed. Local
inventory: 1042 Spanish routes, no extra routes; 10 content routes and 404 remain
against 1052 Russian content routes plus the shared 404.

## Stage 27 — complete Spanish collections

Added all four selections and their index at `/es/collections`: beyond paylines,
cluster features, wild symbols and 5 × 3 bonuses. Every selected game, its order,
explanation, rule check and comparison checklist is retained. Reused the existing
collection layout and local images. Spanish guides, comparison and related
selections are linked directly; the mechanics and journal links now point to
their complete Spanish counterparts.

Validation: TypeScript PASS; production export 3156 pages; 50 targeted checks
PASS, including 32 new Spanish checks, 11 foundation checks and seven existing
English collection checks. All five routes were checked at
320/375/390/768/1024/1440, including loaded artwork, complete copy, exact game
selection and numbers, no horizontal document overflow, Spanish metadata,
keyboard focus and adding two games to the comparison. Real mobile and desktop
screenshots were reviewed. Data, artwork, noindex and CI requirements unchanged.

## Stage 28 — bonus terms and country guidance

Added complete Spanish counterparts of `/bonuses`, `/regions` and
`/regions/great-britain`, including every original section, paragraph, worked
example, table row, restriction and qualification. Preserved the distinction
between Great Britain and Northern Ireland and the exact official source URLs.
The Gambling Commission register and public information pages were checked on
2026-10-23. The five-row operator table is labelled and keyboard focusable.
The footer now exposes both practical guides.

Validation: TypeScript PASS; production export 3159 pages; 31 targeted checks
PASS (20 new practical-guide checks and 11 foundation checks). All three routes
checked at 320/375/390/768/1024/1440. Tests cover source structure and reference
parity, the illustrative 100 / 10× / 1,000 calculation and its qualifications,
language counterparts, noindex, no document overflow, anchor navigation and
table focus. Real mobile and desktop screenshots reviewed. No game data,
artwork, dependency, indexing policy or CI requirements changed.

## Stage 29 — complete route parity and Spanish navigation

Completed the two retired-link edition choosers with the exact existing game
editions and local artwork, an explicit Spanish 404, segment not-found and
retryable Spanish error state. The shared static 404 selects RU/EN/ES copy using
the existing document-language script and scoped CSS, retaining recovery links
in the same language and the 404/noindex response behavior.

Spanish atlas navigation now exposes catalogue, mechanics, journal and
collections, with providers and comparison alongside them. Completed Spanish
destinations replace temporary links to English comparison/bonus/collection
pages and Russian regional guidance. Removed the redundant Russian-original
link from the fully translated catalogue pages. Missing Spanish game copy fails
explicitly instead of silently falling back to another language.

Validation: TypeScript PASS; production export 3162 pages; artwork 1008 PASS;
asset-source security 4 PASS; final combined Playwright run 474 PASS. Inventory
matches all 1052 Russian content routes plus 404 exactly: 1053 Spanish routes,
no missing or extra routes. Every exported Spanish page is checked for internal
destinations, missing files and untranslated content; language switches remain
available. All 1000 published game identities and full translated content remain
covered by existing strict source-parity checks.

The first combined run found the edition-list overflow at 320 px and remaining
cross-language links. Reused the existing responsive entity-game grid and fixed
the destinations; the final run passes. The original >100-word completeness
checks remain on every previously covered foundation page. The newly added
short edition/recovery utilities have exact content, game membership, loaded
artwork, keyboard, status/noindex and six-width checks in
`spanish-completion.spec.ts` rather than padding their copy to an article length.
The unknown-route boundary is retained and tested in all three languages.
Real mobile and desktop screenshots were reviewed.

No game data, published selection, artwork, original sources, sitemap, indexing
policy or CI/security requirements changed. Wave 88 was not started.

## Remaining publication gates

All Spanish content is prepared. Each pending PR still requires its exact-head
CI and preview checks and sequential publication verification on both hosts;
prepared content must not be reported as production content before those gates.

Each stage requires a separate PR, exact-final-SHA CI success and a verified
preview. The user explicitly authorized #529 and all subsequent Spanish stages
after these checks on 2026-10-21. Verify mergeability and both GitHub Pages and
Cloudflare production for each merged SHA before merging the next stage.
Do not merge CI-only branches, relax guards or publish a partial profile as a
complete translation.
