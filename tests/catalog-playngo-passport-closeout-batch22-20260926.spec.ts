import { expect, test } from "@playwright/test";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const targets = [
  "playn-go-madame-ink",
  "playn-go-mafia-gold",
  "playn-go-mahjong-88",
  "playn-go-manta-mayhem",
  "playn-go-matsuri",
  "playn-go-medusas-madness",
  "playn-go-mega-don",
  "playn-go-mega-don-triple-threat",
  "playn-go-mega-don-feeding-frenzy",
  "playn-go-merlin-and-the-ice-queen-morgana",
] as const;

test("twenty-second Play’n GO passport closeout batch is fully populated", () => {
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

test("batch 22 preserves representative researched facts", () => {
  expect(getVerifiedCatalogDetails("playn-go-mafia-gold")?.maxWin).toBe("6 000x");
  expect(getVerifiedCatalogDetails("playn-go-manta-mayhem")?.field).toBe("5×3 · 20 линий");
  expect(getVerifiedCatalogDetails("playn-go-mega-don")?.field).toBe("5×4 · 1 024 способа");
  expect(getVerifiedCatalogDetails("playn-go-mega-don-triple-threat")?.maxWin).toBe("25 000x");
});
