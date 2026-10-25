# Final launch review — 2026-10-25

Baseline: published main `d7f00f3609fdc78b3156b709f9d3925bb74fa76e`.

## Verified baseline

- Exact-head CI for PR #559: 1718 Playwright tests PASS; published main has the tested tree. GitHub Pages #529 and Cloudflare production `21dc5a31` SUCCESS on main.
- 150 real production browser views: RU/EN/ES, 320/390/768/1024/1440px, home, catalogue, full dossier, catalogue record, comparison, provider, mechanic, journal, collections and About. No horizontal overflow, broken eager images or browser errors. Mobile menu opens, closes with Escape and returns focus in each language. Screenshots retained in the private audit output.
- All 435 sitemap URLs return HTTP 200. One transport failure for `/en/journal/reading-paytables/` passed a separate ordinary HTTPS retry.
- npm registry advisory check: 84 package names from the exact lockfile, no advisories returned. This is a point-in-time check, not a guarantee against unknown vulnerabilities.
- Six public exposure/redirect probes return 404: `.env`, `.env.local`, `.git/config`, `package-lock.json`, `/api/`, and an arbitrary redirect destination on `/go/1win`.
- TypeScript, 1008 strict artwork assets and four asset-input security tests PASS. Structured data escapes `<`; the configured redirect fails closed without an approved HTTPS host. CI actions are pinned and the PR workflow has read-only repository permissions.

## Changes

Replace the abstract footer slogan with a direct description, without forced line breaks:

- RU: «Слоты понятным языком.»
- EN: “Slot games, clearly explained.”
- ES: “Tragamonedas, explicadas con claridad.”

Add a shared Cloudflare Pages response policy: nosniff, strict-origin referrer policy, anti-framing headers, no embedded objects, same-origin base/form destinations, HTTPS upgrade, disabled unnecessary device APIs and an initial one-day HSTS lifetime. No subdomain or preload commitment. This is bounded hardening, not a strict script CSP: static Next.js inline hydration remains unchanged. GitHub Pages cannot apply this `_headers` configuration.

Make `noopener` explicit alongside existing `noreferrer` in the two RU game templates. Existing `noreferrer` already isolates the opener in modern browsers; the change makes the intent explicit and consistent with EN/ES. Source URLs and sponsored link attributes stay unchanged.

New Playwright coverage checks the response-policy source while preserving all previous cache/noindex rules, and verifies HTTPS/new-tab isolation for source and commercial links in both game templates in all three languages.

Configuration follows [Cloudflare Pages header documentation](https://developers.cloudflare.com/pages/configuration/headers/). Header application still requires a deployed preview check; the local static server does not implement Cloudflare `_headers` semantics.

## Launch gates still open

1. Main is deliberately closed to indexing: `robots.txt` has `Disallow: /`, and editorial pages carry `noindex, nofollow`. Do not enable the existing launch switch until the final launch decision. Comparison/search/catalogue exclusions and preview/mirror noindex must remain.
2. Five ordinary custom-domain URLs still return cached old HTTP 200: `/disclosure/`, `/regions/`, `/en/disclosure/`, `/es/disclosure/`, `/es/regions/great-britain/`. These routes are absent from source/export; the old cache incident remains unresolved. Do not claim that query-string 404s or a previous purge fixed them.

No game data, published game set, source facts, images, SEO directives, sitemap, launch switches, dependency versions or existing tests are changed by this PR. No merge or launch-indexing authorization is inferred from the request for a final review.
