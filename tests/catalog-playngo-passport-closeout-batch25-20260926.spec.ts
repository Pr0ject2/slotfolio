import { expect, test } from "@playwright/test";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const targets = [
  "playn-go-miner-donkey-trouble",
  "playn-go-mirror-joker",
  "playn-go-mission-cash",
  "playn-go-monkey-battle-for-the-scrolls",
  "playn-go-moon-princess",
  "playn-go-moon-princess-100",
  "playn-go-moon-princess-extreme",
  "playn-go-moon-princess-origins",
  "playn-go-moon-princess-power-of-love",
  "playn-go-moon-princess-stargazing",
] as const;

test("twenty-fifth Play’n GO passport closeout batch is fully populated", () => {
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

test("batch 25 preserves representative sourced facts", () => {
  expect(getVerifiedCatalogDetails("playn-go-miner-donkey-trouble")?.maxWin).toBe("10 000x");
  expect(getVerifiedCatalogDetails("playn-go-mirror-joker")?.field).toBe("3×3 · 5 линий · до 5×3 в Mirror Respin");
  expect(getVerifiedCatalogDetails("playn-go-moon-princess")?.rtp).toBe("96,50%");
  expect(getVerifiedCatalogDetails("playn-go-moon-princess-origins")?.maxWin).toBe("10000x");
  expect(getVerifiedCatalogDetails("playn-go-moon-princess-extreme")?.maxWin).toBe("50 000x");
});
