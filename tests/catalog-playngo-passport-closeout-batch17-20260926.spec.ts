import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const targets = [
  "playn-go-chinese-new-year",
  "playn-go-cops-n-robbers",
  "playn-go-crazy-cows",
  "playn-go-dragon-ship",
  "playn-go-enchanted-meadow",
  "playn-go-fortunes-of-ali-baba",
  "playn-go-gold-of-fortune-god",
  "playn-go-gold-trophy-2",
  "playn-go-golden-colts",
  "playn-go-honey-rush-100",
] as const;

test("seventeenth Play’n GO passport closeout batch is fully populated", () => {
  for (const slug of targets) {
    const details = getVerifiedCatalogDetails(slug);
    expect(details?.field, `${slug} field`).toBeTruthy();
    expect(details?.rtp, `${slug} RTP`).toBeTruthy();
    expect(details?.maxWin, `${slug} max win`).toBeTruthy();
    expect(details?.volatility, `${slug} volatility`).toBeTruthy();
    expect(details?.releaseDate, `${slug} release date`).toBeTruthy();
    expect(getVerifiedCatalogGameType(slug)?.gameType, `${slug} game type`).toBeTruthy();
    expect(getVerifiedCatalogResearch(slug)?.mechanics.length, `${slug} mechanics`).toBeGreaterThan(0);
  }

  const residual = catalogSeeds
    .filter((seed) => seed.provider === "Play’n GO")
    .map((seed) => {
      const details = getVerifiedCatalogDetails(seed.slug);
      const missing = [
        !details?.field && "field",
        !details?.rtp && "rtp",
        !details?.maxWin && "maxWin",
        !details?.volatility && "volatility",
        !details?.releaseDate && "releaseDate",
        !getVerifiedCatalogGameType(seed.slug)?.gameType && "gameType",
        !(getVerifiedCatalogResearch(seed.slug)?.mechanics.length) && "mechanics",
      ].filter(Boolean);
      return { slug: seed.slug, name: seed.name, missing };
    })
    .filter((row) => row.missing.length > 0);

  console.log(`PLAYNGO_RESIDUAL ${JSON.stringify({ count: residual.length, first40: residual.slice(0, 40) })}`);
});
