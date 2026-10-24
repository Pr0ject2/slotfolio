# Slotfolio prelaunch gate — 25 October 2026

This checklist is **preparation**, not permission to open search indexing. Public production hostname: `https://slotfolio.org`. Baseline `main`: `64b5ae301e0b9f51f8e1e1029bf8687bf5f82c8f` (SEO preparation PR #553).

## Verified from repository and GitHub deployments

- RU / EN / ES with the same 1,000 game identities per locale (100 full dossiers + 900 catalogue-only profiles).
- The PR #553 SEO build prepares 444 RU/EN/ES editorial URLs with reciprocal language alternatives. A further 2,700 catalogue-only URLs and utility/error routes remain noindex. Do not interpret 3,000 game URLs as approved indexable landing pages.
- Exact main build and deploy checks (GitHub Pages and Cloudflare Pages) returned SUCCESS for this baseline. This does not by itself establish external HTTP or visual correctness on all public hostnames.
- `SLOTFOLIO_LAUNCH_INDEXING` defaults to false. The production-only activation path is documented in `docs/seo-international-launch-20261024.md`.
- Local source code displays an active, sponsored `https://viazento.link/slotfolio` link on game pages; RU/EN legal copy was inconsistent before this PR. The link goes to a general casino selection, not an individually verified availability list. Spanish copy already discloses this accurately.

## Must pass before *any* indexing decision

1. **Full CI on the exact head of this PR**, including TS, security, strict artwork and all Playwright tests; successful Cloudflare preview. Merge only after reviewer/owner confirmation and clean PR state.
2. **Production deployment on the merge SHA**: record `main`, GitHub Pages and Cloudflare production SHA; run browser QA on RU/EN/ES, 320/375/390/768/1440px, including the game links, locale-switch, keyboard navigation, catalogue filters, art loading, and affiliate disclosure pages.
3. **Real external HTTP probes**, not only build-time checks: `https://slotfolio.org/`, `/robots.txt`, `/sitemap.xml`, representative locale pages, a full dossier, a catalogue-only game, a nonexistent URL, `https://www.slotfolio.org/`, both `pages.dev` aliases. Verify status codes, 404 behaviour, canonical/hreflang, robots and HTTP X-Robots-Tag. Ensure the www hostname is either redirected permanently to the apex or deliberately remains unused and unadvertised. An independent HTTP crawl has **not** yet been confirmed by this document.
4. **Editorial correction/contact channel**: add a genuine owner-approved means to request corrections. Do not invent an email address or claim a nonexistent helpdesk. This remains an owner decision.
5. **Legal and regional review**: verify age and responsible-gambling disclosures, current casino affiliate disclosures, availability limitations by country, privacy/cookie practices against actual scripts and services, and jurisdiction-specific requirements. This document is not a legal opinion.
6. **Search-account ownership**: verify Search Console Domain property and (if targeting the region) Yandex Webmaster. This requires the site owner's DNS/account authorization; no connection is assumed. Query demand estimates in existing planning files are hypotheses, not measured traffic.
7. **Search visibility decision is separate**. If owner approves, set `SLOTFOLIO_LAUNCH_INDEXING=true` for Cloudflare **production only**, redeploy the verified `main` commit and check that only the 444 approved editorial pages become indexable. Keep GitHub Pages and pages.dev noindex. Submit the canonical sitemap only after confirming live directives. Rollback instructions are in the SEO launch guide.

## Current blockers to a search launch

- No verified site-wide external HTTP crawl from the current assistant environment.
- No confirmed real editorial correction/contact channel.
- The `www` redirect and Google/Yandex ownership have not been independently established.
- Any jurisdiction-specific gambling/affiliate compliance assessment is still pending.
- Current PR must pass exact-head CI and production QA after merge.

**Invariant:** site data, the 1,000-game selection, sources, artwork gates and search-index controls must not be loosened to pass launch checks.
