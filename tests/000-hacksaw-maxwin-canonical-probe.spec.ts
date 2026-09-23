import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";

function plainText(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&#x27;|&#39;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function snippets(text: string, markers: string[]) {
  const lower = text.toLowerCase();
  const found: string[] = [];
  for (const marker of markers) {
    let start = 0;
    while (found.length < 8) {
      const index = lower.indexOf(marker.toLowerCase(), start);
      if (index < 0) break;
      const snippet = text.slice(Math.max(0, index - 120), Math.min(text.length, index + 300));
      if (!found.includes(snippet)) found.push(snippet);
      start = index + marker.length;
    }
  }
  return found;
}

test.only("probe current Hacksaw max-win residual for direct canonical claims", async () => {
  const targets = catalogSeeds.filter(
    (seed) => seed.provider === "Hacksaw Gaming" && !getVerifiedCatalogDetails(seed.slug)?.maxWin,
  );

  const rows = [];
  for (const seed of targets) {
    const response = await fetch(seed.source, {
      headers: { "user-agent": "Mozilla/5.0 Slotfolio catalog verification" },
    });
    const text = plainText(await response.text());
    const claims = snippets(text, ["maximum win", "max win", "maxwin"]);
    if (claims.length) rows.push({ slug: seed.slug, source: seed.source, status: response.status, claims });
  }

  console.log("HACKSAW_MAXWIN_CANONICAL_PROBE", JSON.stringify({ residual: targets.length, directClaimRows: rows }));
  expect(targets.length).toBe(-1);
});
