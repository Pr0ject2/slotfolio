# Slotfolio — Cloudflare Pages + slotfolio.org (prelaunch, not live)

Updated: 2026-10-13. Domain registrar: Porkbun. Hosting: **Cloudflare Pages**. GitHub repository: `Pr0ject2/slotfolio`. Keep `https://pr0ject2.github.io/slotfolio/` working as a separately deployed **noindex preview**.

## Architecture

Porkbun registers the domain and manages its renewal. **Cloudflare DNS** will host the authoritative DNS zone for `slotfolio.org`; **Cloudflare Pages** serves the static Next.js export. GitHub remains the source of truth for code and tests. Do **not** use GitHub Pages apex A records `185.199.10*.153`, GitHub Pages custom domain, or a `CNAME` file.

This PR changes only the opt-in Cloudflare build path and documentation. Existing `.github/workflows/deploy-pages.yml` and Pages preview should remain unchanged. No automatic publishing or DNS change is performed by this PR.

## Owner setup: Cloudflare DNS + Porkbun

1. Sign in to https://dash.cloudflare.com/ and **Add a domain / Website**: `slotfolio.org` (the free zone plan is sufficient for initial QA).
2. Cloudflare will assign **two unique authoritative nameservers**. Copy the exact names shown for this domain — never guess them.
3. Review the DNS records Cloudflare proposes to import. Preserve legitimate mail records (MX, SPF, DKIM, DMARC, verification TXT) if used. Remove old parking/incorrect web records only after reviewing them.
4. In https://porkbun.com/ → Domain Management → `slotfolio.org` → **Details → Nameservers → edit**, replace Porkbun NS with the **two assigned Cloudflare NS** and save. These are nameserver settings, **not** new NS records under "DNS Records". If DNSSEC is configured, check Cloudflare's DNSSEC guidance before switching; stale DS can disrupt resolution.
5. Wait for Cloudflare zone status **Active** and resolve/verify authoritative DNS. Porkbun says nameserver changes can take up to 48 h.
6. Once delegated to Cloudflare, edit web DNS in **Cloudflare DNS**, not Porkbun's former DNS Records section. Never delete mail TXT/MX records unintentionally.

## Owner setup: Cloudflare Pages deployment

1. In Cloudflare → **Workers & Pages → Create → Pages → Import an existing Git repository**, authorize GitHub and select `Pr0ject2/slotfolio`. Use production branch `main`.
2. Choose **Next.js (Static HTML Export)**; override the **Build command** to `npm run build:cloudflare`; **Build output directory**: `out`; root directory: repository root; **Node version: 22** (set `NODE_VERSION=22` if needed). Leave `NEXT_PUBLIC_INDEXABLE` off or `false`: the build script explicitly sets it to `false`.
3. The opt-in build script `scripts/build-cloudflare-pages.sh` strictly localizes approved game artwork, removes `src/app/go/[operator]/route.ts` **only from the temporary Cloudflare build checkout** (server redirect is not supported by static hosting), performs a Next static export with `SLOTFOLIO_STATIC_EXPORT=true`, `NEXT_PUBLIC_SITE_URL=https://slotfolio.org`, `NEXT_PUBLIC_BASE_PATH=""`, and checks the output has `noindex`, prohibitive robots.txt, and correct sitemap URLs.
4. Check the first `*.pages.dev` preview carefully. It is intentionally noindex and uses the future canonical hostname. **Do not enable indexing** for either preview. Check the total asset count and individual sizes against Cloudflare Pages limits (free: 20,000 files, max 25 MiB/file); Cloudflare Pages build time limit is **20 minutes**. If fetching hundreds of first-party artwork assets exceeds the timeout, pause and design a cached build + authenticated Direct Upload via GitHub Actions rather than weakening verification or substituting placeholder images.
5. In the Pages project → **Custom domains → Set up a domain**, add `slotfolio.org`. Because the apex DNS zone is active in the **same Cloudflare account**, Cloudflare can create the necessary DNS routing. Verify SSL certificate and HTTPS, including canonical root-domain redirects.
6. If you want `www.slotfolio.org`, provision the `www` hostname/DNS and a **301 redirect from www to https://slotfolio.org**, retaining path/query. Cloudflare has an official Pages guide using Bulk Redirects / Redirect Rules. Avoid divergent indexable copies.

## Launch gate — do NOT index until reviewed

- Full original GitHub CI must remain green on the final PR head. Merging this preparation PR should **not alter the GitHub Pages workflow** or existing preview behavior.
- Cloudflare Pages production build/deploy must succeed with the full strict artwork set, **1042 pages** as audited at PR #472, and expected canonical root URLs, CSS, images, links, and 200/404 behavior. Check `https://slotfolio.org/`, `/slots/`, games, providers, mechanics, comparison and mobile.
- Confirm `https://slotfolio.org/robots.txt` disallows indexing at this prelaunch stage, and `meta robots` has `noindex` on published pages. Preserve separate noindex/exclusion from sitemap for `/search`, `/compare`, `/slots/catalog/*` after public indexation is later enabled.
- Confirm canonical/OG/JSON-LD/sitemap URLs use only `https://slotfolio.org/`, never localhost or `github.io/slotfolio`.
- Obtain **actual editorial contact**, review editorial-policy/about/privacy/responsible-gaming/affiliate disclosure and applicable iGaming promotion rules. Confirm Cloudflare's acceptable-use terms for the site's actual affiliate model.
- Only then discuss an **independent reviewed change** that turns on `NEXT_PUBLIC_INDEXABLE=true` in the **Cloudflare production build**, rechecks robots/sitemap and enrolls Google Search Console and Yandex Webmaster. Current build script **forces false** as a safety gate.
- Keep the 100 full dossiers and 900 catalog-only games as is; do not start Wave 88 or open catalog-only indexing implicitly.

Documentation:
- https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/
- https://developers.cloudflare.com/pages/configuration/custom-domains/
- https://developers.cloudflare.com/pages/platform/limits/
- https://developers.cloudflare.com/pages/how-to/www-redirect/
- https://kb.porkbun.com/article/22-how-to-change-nameservers
