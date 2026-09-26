import { expect, test } from "@playwright/test";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const targets = [
  "playn-go-playn-go-mole-digger",
  "playn-go-playn-go-wrappin-gold",
  "playn-go-potion-of-madness",
  "playn-go-primal-rampage",
  "playn-go-prism-of-gems",
  "playn-go-queens-day-tilt",
  "playn-go-rabbit-hole-riches",
  "playn-go-rabbit-hole-riches-court-of-hearts",
  "playn-go-raging-rex",
  "playn-go-raging-rex-2",
] as const;

test("twenty-ninth Play’n GO passport closeout batch is fully populated", () => {
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

test("batch 29 preserves representative sourced facts", () => {
  expect(getVerifiedCatalogDetails("playn-go-playn-go-mole-digger")?.maxWin).toBe("10 000x");
  expect(getVerifiedCatalogDetails("playn-go-prism-of-gems")?.maxWin).toBe("30 000x");
  expect(getVerifiedCatalogDetails("playn-go-queens-day-tilt")?.field).toBe("3×3");
  expect(getVerifiedCatalogDetails("playn-go-rabbit-hole-riches")?.maxWin).toBe("5 000x");
  expect(getVerifiedCatalogDetails("playn-go-raging-rex-2")?.maxWin).toBe("30 000x");
});
