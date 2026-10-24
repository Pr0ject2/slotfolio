#!/usr/bin/env bash
set -euo pipefail

# Cloudflare Pages builds from Git (Linux). Leave GitHub Pages CI untouched.
# Preview must stay noindex until hostname, editorial policies and SEO are approved.
export SLOTFOLIO_STATIC_EXPORT=true
export NEXT_PUBLIC_SITE_URL="https://slotfolio.org"
export NEXT_PUBLIC_BASE_PATH=""
# A deliberate production-only launch switch. Defaults remain noindex.
# Preview branches stay closed even if the variable is shared project-wide.
NEXT_PUBLIC_INDEXABLE="$(node scripts/launch-mode.mjs)"
export NEXT_PUBLIC_INDEXABLE

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

# Preserve full RSC URLs with one internal 200 rule, after verifying all 900
# Spanish catalogue copies are byte-identical to their retained index.txt.
node scripts/prepare-cloudflare-assets.mjs out

# Fail closed: never publish a root-domain artifact with broken URLs or indexing.
test -s out/index.html
test -s out/slots/index.html
test -s out/en/index.html
test -s out/en/about/index.html
test -s out/en/responsible-gaming/index.html
test -s out/sitemap.xml
test -s out/robots.txt
node scripts/check-seo-export.mjs out --indexable="$NEXT_PUBLIC_INDEXABLE"
echo "Cloudflare Pages root-domain export verified (indexable=$NEXT_PUBLIC_INDEXABLE)."
