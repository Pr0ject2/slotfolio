# Catalogue density and navigation

Base: main `8962246688a6fcd7aea9cfd73d88508ca9b667bc`. This is independent of the SEO launch PR #553; indexing controls and metadata are unchanged.

## Visitor changes

- Remove repeated totals from the catalogue heading/eyebrow and facet options. Keep one live result summary; the detailed pagination range remains available to assistive technology.
- Replace two detached language boxes with one native disclosure in the masthead. It shows the current language and full language names, remains available outside the mobile menu, and works before hydration and without JavaScript. Escape returns focus to its summary; outside click/Tab closes it. Existing preference, query, fragment, mount and in-tab comparison behavior is retained.
- Keep numbered pagination on wide screens and add a direct native page selector on every width. Previous/next controls remain at least 44 px. Choosing a page preserves filters, view and sort, updates browser history, and moves focus to results rather than leaving it below the list.
- Use two compact list cards per row from 1280 px; narrower layouts use one. Artwork and title form the header, with full-width inline label/value facts below. All existing facts, mechanics, features, artwork, destinations and comparison controls remain. Cover view stays independent.

Styles are scoped to the shared catalogue components. This is not a general CSS cleanup. Higher-specificity legacy card-polish rules were accounted for after comparing real browser screenshots.

## Validation

Local production export: 3162 pages; TypeScript PASS; 1008 strict artwork records PASS; four security tests PASS. Browser review: 65 tests PASS, including 19 new regressions across RU/EN/ES at 320/375/390/768/1024/1440 px, direct last-page selection, Back, keyboard focus, language persistence and mobile menu behavior.

Actual first RU card at 1440 px, after fonts and images loaded: 1074 × 413 px before, 531 × 302 px after. Two cards occupy the row. Private before/after screenshots cover all six widths plus EN/ES phone/desktop views.

Existing tests were updated only where the requested UI changed: language tests open the native disclosure; the mobile-menu test still checks menu links and Escape; repeated facet-count expectations now check their absence and exercise filtering; pagination tests validate the new selector while retaining range/history/edge checks. Security, data, artwork, SEO/noindex and CI requirements are unchanged. Full exact-head CI and deployed preview must pass before publication. No merge is part of this preparation.
