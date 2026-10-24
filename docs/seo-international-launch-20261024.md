# International launch: RU / EN / ES

Primary hostname: `https://slotfolio.org`. Preparation base: main `8962246688a6fcd7aea9cfd73d88508ca9b667bc` (24 October 2026).

## Scope and current state

The published site is still a closed preview: its root robots.txt disallows crawling and its pages carry noindex. This PR prepares the launch without enabling indexing.

The sitemap now contains 444 existing editorial URLs: 148 per language, including 100 game guides per language. Each has a self canonical and reciprocal RU/EN/ES alternatives in HTML and XML. The 900 catalogue records per language, search, comparison tool, retired game-name chooser pages and error pages remain noindex. The game set, facts, source records, artwork and affiliate links do not change.

Translated editorial templates previously carried permanent noindex directives. They now follow the preview flag. Explicit permanent exclusions retain their directives. Both shared and Spanish not-found boundaries declare noindex independently of the root layout.

GitHub Pages stays closed regardless of its repository variable. Cloudflare `pages.dev` aliases receive hostname-specific HTTP noindex headers; the custom hostname does not receive this header. Feature-branch builds remain closed even if the project-wide launch variable is enabled.

## Verification before approval

1. Require full GitHub CI SUCCESS on the exact final PR SHA, mergeability and a successful Cloudflare preview of that SHA.
2. Check the preview sitemap (444 unique URLs), self canonicals, reciprocal alternatives, robots.txt and HTTP noindex headers on both deployment and branch aliases. Check representative RU/EN/ES pages in a browser.
3. Run both static export modes. `node scripts/check-seo-export.mjs out --indexable=false` checks the preview; the true mode checks the approved root-domain artifact. The validator checks all 444 sitemap documents, all 2700 protected catalogue documents, utilities, retired aliases and multilingual 404s. It fails on contradictory crawler directives.
4. Retain strict artwork, security, TypeScript and existing Playwright checks. No CI-only PR should be merged.

## Activation after explicit launch approval

1. Merge the reviewed SEO PR only after the conditions above pass. First verify main and both normal production deployments while indexing remains closed.
2. In Cloudflare Pages, set **production** environment variable `SLOTFOLIO_LAUNCH_INDEXING=true`, then redeploy the verified main SHA. Do not set it for preview environments. The build script also requires `CF_PAGES=1` and `CF_PAGES_BRANCH=main`; any invalid flag value fails the build.
3. Confirm the deployment SHA equals main. On `slotfolio.org`, verify robots.txt has `Allow: /` and the primary sitemap URL; 444 editorial pages are indexable. Protected catalogue and utility pages retain noindex. They must remain crawlable so search engines can read the directive.
4. Verify both `slotfolio.pages.dev` and the deployment alias still return `X-Robots-Tag: noindex`; GitHub Pages must retain robots disallow and metadata noindex. Verify no HTTP noindex header reaches the custom hostname.
5. Add/verify a Search Console Domain property using the owner's DNS, submit `https://slotfolio.org/sitemap.xml`, inspect representative URLs in every language. Add the primary hostname to Yandex Webmaster if used. Account ownership is not confirmed by this PR.
6. Check HTTP-to-HTTPS, chosen `www` behavior and TLS. The initial public audit could not fetch www; determine the cause before advertising that hostname. Set one permanent redirect to the primary hostname if www is supported.
7. Provide a real correction/contact channel; do not invent a mailbox. Monitor indexed URLs, language targeting, queries, CTR and field Core Web Vitals after launch.

Rollback: unset `SLOTFOLIO_LAUNCH_INDEXING` or set it to `false`, redeploy the same known main SHA and verify robots/meta directives and aliases again. Index removal is not instantaneous; use the verified search-engine property if urgent removal is necessary.

## Semantic core and prioritization

The accompanying local workbook/CSVs contain 1551 query candidates (517 per language), mapped to the 444 current landing pages. A separate reserve contains 2700 language-specific catalogue candidates and explicitly excludes them from launch indexing. Queries are deduplicated within each language; one query has one landing owner.

Queries derive from current game names and page contents, with selected primary-source terminology checks. They are not Keyword Planner, Wordstat or Search Console exports. Monthly volume, measurement country and volume source must remain empty until measured; blank does not mean zero. Priorities describe content readiness and site structure, not estimated traffic. P1 covers navigation and foundational explanations; P2 covers other existing editorial pages; P3 is the closed reserve.

International targeting uses language codes `ru`, `en`, `es`, without claiming casino availability in particular countries. Do not target on-site demo/play intentions, guaranteed winnings or unverified bonus/GEO offers. The interactive comparison tool remains noindex; explanatory comparison queries map to the existing journal guide.

## Primary technical references

- [Google: multilingual sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)
- [Google: canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google: noindex and crawl access](https://developers.google.com/search/docs/crawling-indexing/block-indexing)
- [Google: faceted navigation](https://developers.google.com/crawling/docs/faceted-navigation)
- [Cloudflare: hostname-specific headers](https://developers.cloudflare.com/pages/configuration/headers/)
