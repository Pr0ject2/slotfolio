import { expect, test } from "@playwright/test";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const targets = [
  "playn-go-iron-girl",
  "playn-go-jade-magician",
  "playn-go-joker-flip",
  "playn-go-jolly-roger-2",
  "playn-go-jolly-roger-wild-kraken",
  "playn-go-king-of-sweets",
  "playn-go-kings-mask",
  "playn-go-kings-mask-eclipse-of-gods",
  "playn-go-kingdom-below",
  "playn-go-kiss-reels-of-rock",
] as const;

test("nineteenth Play’n GO passport closeout batch is fully populated", () => {
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
});

test("batch 19 preserves representative researched facts", () => {
  expect(getVerifiedCatalogDetails("playn-go-jolly-roger-wild-kraken")?.field).toBe("5×3 · 20 линий");
  expect(getVerifiedCatalogDetails("playn-go-kings-mask")?.maxWin).toBeTruthy();
  expect(getVerifiedCatalogDetails("playn-go-kingdom-below")?.maxWin).toBe("6 000x");
  expect(getVerifiedCatalogDetails("playn-go-kiss-reels-of-rock")?.maxWin).toBe("50 000x");
});
