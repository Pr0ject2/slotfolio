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

function snippets(text: string, marker: string) {
  const lower = text.toLowerCase();
  const needle = marker.toLowerCase();
  const results: string[] = [];
  let start = 0;
  while (results.length < 3) {
    const index = lower.indexOf(needle, start);
    if (index < 0) break;
    results.push(text.slice(Math.max(0, index - 90), Math.min(text.length, index + 260)));
    start = index + needle.length;
  }
  return results;
}

test.only("probe exact current Hacksaw RTP residual from canonical official pages", async () => {
  const targets = catalogSeeds.filter(
    (seed) => seed.provider === "Hacksaw Gaming" && !getVerifiedCatalogDetails(seed.slug)?.rtp,
  );

  const rows = [];
  for (const seed of targets) {
    const response = await fetch(seed.source, {
      headers: { "user-agent": "Mozilla/5.0 Slotfolio catalog verification" },
    });
    const text = plainText(await response.text());
    const rtp = snippets(text, "RTP");
    const gameData = snippets(text, "GAME DATA");
    if (rtp.length || gameData.length) {
      rows.push({ slug: seed.slug, source: seed.source, status: response.status, rtp, gameData });
    }
  }

  console.log("HACKSAW_RTP_PROBE", JSON.stringify({ residual: targets.length, directOfficialRows: rows }));
  expect(targets.length).toBe(-1);
});
