import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";

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

test.only("probe current 3 Oaks missing game type for direct slot wording", async () => {
  const targets = catalogSeeds.filter(
    (seed) => seed.provider === "3 Oaks Gaming" && !getVerifiedCatalogGameType(seed.slug),
  );
  const rows = [];
  for (const seed of targets) {
    const response = await fetch(seed.source, { headers: { "user-agent": "Mozilla/5.0 Slotfolio catalog verification" } });
    const text = plainText(await response.text());
    const match = /\bslot\b/i.exec(text);
    if (!match) continue;
    const index = match.index;
    rows.push({
      slug: seed.slug,
      source: seed.source,
      status: response.status,
      snippet: text.slice(Math.max(0, index - 140), Math.min(text.length, index + 240)),
    });
  }
  console.log("THREE_OAKS_GAMETYPE_DIRECT_SLOT", JSON.stringify({ residual: targets.length, directSlotRows: rows }));
  expect(targets.length).toBe(-1);
});
