import { expect, test } from "@playwright/test";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const targets = [
  "playn-go-pearls-of-india",
  "playn-go-photo-safari",
  "playn-go-piggy-bank-farm",
  "playn-go-piggy-blitz",
  "playn-go-piggy-blitz-casino-gold",
  "playn-go-piggy-blitz-disco-gold",
  "playn-go-piggy-heist",
  "playn-go-pilgrim-of-dead",
  "playn-go-piranha-pays",
  "playn-go-planet-fortune",
] as const;

test("twenty-eighth Play’n GO passport closeout batch is fully populated", () => {
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

test("batch 28 preserves representative sourced facts", () => {
  expect(getVerifiedCatalogDetails("playn-go-pearls-of-india")?.rtp).toBe("96,87%");
  expect(getVerifiedCatalogDetails("playn-go-piggy-blitz")?.field).toBe("4096 способов");
  expect(getVerifiedCatalogDetails("playn-go-piggy-blitz-casino-gold")?.maxWin).toBe("8 000x");
  expect(getVerifiedCatalogDetails("playn-go-piggy-heist")?.maxWin).toBe("70 000x");
  expect(getVerifiedCatalogDetails("playn-go-piranha-pays")?.maxWin).toBe("5 000x");
});
