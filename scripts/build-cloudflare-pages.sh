#!/usr/bin/env bash
set -euo pipefail

# Cloudflare Pages builds from Git (Linux). Leave GitHub Pages CI untouched.
# Preview must stay noindex until hostname, editorial policies and SEO are approved.
export SLOTFOLIO_STATIC_EXPORT=true
export NEXT_PUBLIC_SITE_URL="https://slotfolio.org"
export NEXT_PUBLIC_BASE_PATH=""
export NEXT_PUBLIC_INDEXABLE="false"

# Match the existing strict artwork gate: missing reviewed images must fail.
localized=false
for attempt in 1 2 3; do
  echo "Cloudflare artwork localization attempt ${attempt}/3"
  if npm run assets:localize; then
    localized=true
    break
  fi
  if (( attempt < 3 )); then sleep "$((attempt * 20))"; fi
done
if [[ "$localized" != true ]]; then
  echo "Strict Slotfolio artwork verification failed; refusing to deploy."
  exit 1
fi

# Static export cannot execute the server-only affiliate redirect route.
# Only remove it in the ephemeral Cloudflare Pages build checkout.
rm -f 'src/app/go/[operator]/route.ts'

npm run build

# Fail closed: never publish a root-domain artifact with broken URLs or indexing.
test -s out/index.html
test -s out/slots/index.html
test -s out/sitemap.xml
test -s out/robots.txt
grep -qi 'noindex' out/index.html
grep -q 'Disallow: /' out/robots.txt
grep -q 'https://slotfolio.org/' out/sitemap.xml
echo "Cloudflare Pages static root-domain preview generated (noindex)."
