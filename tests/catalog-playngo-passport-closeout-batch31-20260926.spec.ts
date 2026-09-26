import { expect, test } from "@playwright/test";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const targets = [
  "playn-go-ras-reckoning",
  "playn-go-rage-to-riches",
  "playn-go-raging-rex-3",
  "playn-go-rainforest-magic",
  "playn-go-rally-4-riches",
] as const;

test("final Play’n GO passport closeout batch is fully populated", () => {
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

test("final batch preserves representative sourced facts", () => {
  expect(getVerifiedCatalogDetails("playn-go-ras-reckoning")?.maxWin).toBe("50 000x");
  expect(getVerifiedCatalogDetails("playn-go-rage-to-riches")?.field).toBe("5×3 · 20 линий");
  expect(getVerifiedCatalogDetails("playn-go-raging-rex-3")?.maxWin).toBe("30 000x");
  expect(getVerifiedCatalogDetails("playn-go-rainforest-magic")?.maxWin).toBe("5 000x");
  expect(getVerifiedCatalogDetails("playn-go-rally-4-riches")?.maxWin).toBe("5 000x");
});
