import { expect, test } from "@playwright/test";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const targets = [
  "playn-go-lady-of-fortune-destiny-spins",
  "playn-go-lady-of-fortune-remastered",
  "playn-go-lawn-n-disorder",
  "playn-go-legacy-of-dynasties",
  "playn-go-legacy-of-egypt",
  "playn-go-legacy-of-inca",
  "playn-go-legacy-of-undead-dragon-abyssways",
  "playn-go-legend-of-the-ice-dragon",
  "playn-go-legion-gold",
  "playn-go-legion-gold-and-the-sphinx-of-dead",
] as const;

test("twentieth Play’n GO passport closeout batch is fully populated", () => {
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

test("batch 20 preserves representative researched facts", () => {
  expect(getVerifiedCatalogDetails("playn-go-lawn-n-disorder")?.maxWin).toBe("50 000x");
  expect(getVerifiedCatalogDetails("playn-go-legacy-of-inca")?.field).toBe("5×3 · 20 линий");
  expect(getVerifiedCatalogDetails("playn-go-legion-gold")?.field).toBe("5×3 · 25 линий");
  expect(getVerifiedCatalogDetails("playn-go-legacy-of-undead-dragon-abyssways")?.maxWin).toBe("20 000x");
});
