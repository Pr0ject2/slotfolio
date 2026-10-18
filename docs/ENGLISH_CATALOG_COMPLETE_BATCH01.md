# Complete English catalogue content: batch 01

The first 100 existing English catalogue-only routes now include the full content already published in their Russian counterparts: every introductory paragraph, expanded feature card, editorial observation, numerical explanation, comparison context, source group, FAQ and related-game list.

This is translation of existing content, not new game research or a promotion to independent full-review coverage. The catalogue remains 1,000 games: 100 dossiers and 900 catalogue records. The other 800 English catalogue records retain their existing technical presentation until subsequent batches.

## Scope and provenance

- Batch order follows the first 100 original catalogue seeds, from `3-oaks-gaming-15-dragon-pearls` to `playn-go-alice-cooper-and-the-tome-of-madness`.
- Copy lives in `src/lib/english-catalog-complete-batch01.json`; a shared server component renders the expanded records.
- SHA-256 fingerprints bind each translation to the original editorial, expanded feature list, catalogue seed, research, verified details and game-type record. Source changes require translation review.
- Original sources, factual records, artwork, Russian copy, coverage, routes, metadata, canonical rules and noindex remain unchanged.
- Responsive styles are scoped to the expanded English profiles. They accommodate the contents navigation, source labels and feature grids at narrow widths without changing other pages.

## Validation

`tests/english-catalog-complete-batch01.spec.ts` checks source fingerprints, paragraph and feature counts, numerical parity, absence of untranslated Cyrillic, all translated blocks in the static output and every original source URL for all 100 records. Browser tests cover 320, 390, 768, 1024 and 1440 px, keyboard focus and anchor navigation, FAQ expansion, plus two other representative records. Existing English catalogue checks remain in place.

Full Actions CI on the final PR head and production deployment verification are required before publication. Private before/after browser captures and release evidence are maintained outside the public repository.
