# Slotfolio security operating notes

Version: 2026-10-12.

- GitHub Pages is a static host; the production export deliberately omits the server redirect `/go/[operator]`. The operator link is fail-closed unless **both** `AFFILIATE_1WIN_URL` and `AFFILIATE_1WIN_ALLOWED_HOSTS` are explicitly set. Host matching is exact, not suffix-based; URLs require HTTPS without credentials or a custom port.
- GitHub Actions builds run with `contents: read`. Only the Pages deployment job receives `pages: write` and `id-token: write`. Pin third-party Actions by reviewed immutable commit SHAs; update intentionally when reviewing releases.
- Depend on `npm ci` from the checked-in lockfile; the CI gate audits npm packages and runs asset input-validation regression tests, TypeScript, strict artwork, static build, and the full Playwright suite.
- The artwork localizer rejects non-HTTPS URLs and obvious local/private-IP destinations, follows redirects manually with the same check, caps response bytes while streaming, and restricts paths to catalog/slot images. This is defense in depth, **not** proof against all DNS rebinding: keep manifests and CI workflows in required-review changes.
- GitHub Pages does not expose arbitrary HTTP security-header configuration. Content Security Policy, HSTS policy details, and actual response headers must be re-audited if the site moves behind a configurable CDN; do **not** inject a CSP that breaks Next.js static hydration.
- Repository administrators should require pull requests, required CI statuses, least-privilege workflow token defaults, restricted GitHub Pages environment, and branch/ruleset protection. The GitHub connector did not have access to all administrative protections for verification.
- Never add signing keys, affiliate credentials, or other secrets to `NEXT_PUBLIC_*` build-time variables, published artifacts, Git history, or workflow logs.
