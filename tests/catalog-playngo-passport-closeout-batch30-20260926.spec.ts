import { expect, test } from "@playwright/test";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const targets = [
  "playn-go-mystery-joker-6000",
  "playn-go-myth",
  "playn-go-ninja-fruits",
  "playn-go-nugget-n-nonsense",
  "playn-go-pearl-lagoon",
  "playn-go-pimped",
  "playn-go-playn-go-buffalo-of-wealth",
  "playn-go-prissy-princess",
  "playn-go-prosperity-palace",
  "playn-go-puebla-parade",
] as const;

test("thirtieth Play’n GO passport closeout batch is fully populated", () => {
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

test("batch 30 preserves representative sourced facts", () => {
  expect(getVerifiedCatalogDetails("playn-go-myth")?.maxWin).toBe("5 000x");
  expect(getVerifiedCatalogDetails("playn-go-ninja-fruits")?.rtp).toBe("96,65%");
  expect(getVerifiedCatalogDetails("playn-go-pearl-lagoon")?.maxWin).toBe("5 000x");
  expect(getVerifiedCatalogDetails("playn-go-pimped")?.maxWin).toBe("10 000x");
  expect(getVerifiedCatalogDetails("playn-go-prissy-princess")?.maxWin).toBe("6 003x");
});
