# Requested removal of disclosure and regions index pages

Based on main `64b5ae301e0b9f51f8e1e1029bf8687bf5f82c8f`.

Remove `/disclosure` and `/regions`, including their EN and ES equivalents.
Remove links from footers, About, bonuses, editorial/privacy information and
game dossiers, as well as translation registries and sitemap entries. These
six URLs must return 404 and must not redirect to unrelated content.

The separately published `/regions/great-britain` articles remain available;
their breadcrumbs no longer point to the removed index. Removing that article
was not part of the exact URLs requested. Its existing facts and references
are unchanged.

The unconfigured `/go/1win` fallback now redirects to `/about` (307), instead
of the removed disclosure page. Configured affiliate transitions and their
attributes remain unchanged, as do existing inline commercial disclosures.

Sitemap: 438 editorial URLs, 146 per language. All 2700 catalogue pages retain
noindex. The indexing approval gate, 1000 published games, characteristics,
source records, images, affiliate destination and CI/security rules are unchanged.

Regression coverage checks all exported HTML for links to removed destinations,
all six missing exports/HTTP 404s, sitemap and translation registries, plus
remaining information and both game templates at 320 and 1440 px in RU/EN/ES.
Existing tests now inspect only retained routes; their retained assertions stay
in force. Artwork, security, TypeScript, production build and SEO validation
must pass before review.

Open PR #556 edits disclosure content on the old base. It needs reconciliation
after this removal; it must not restore these pages or their navigation links.
