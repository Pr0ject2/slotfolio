import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";

const detailSlugs = [
  "3-oaks-gaming-15-dragon-pearls",
  "3-oaks-gaming-3-african-drums",
  "3-oaks-gaming-3-aztec-temples",
  "3-oaks-gaming-3-china-pots",
  "3-oaks-gaming-3-clover-pots",
  "3-oaks-gaming-3-coin-volcanoes",
  "3-oaks-gaming-3-coins",
  "3-oaks-gaming-3-egypt-chests",
  "3-oaks-gaming-3-hot-chillies",
] as const;

const gameTypeSlugs = [
  "3-oaks-gaming-3-coin-volcanoes",
  "3-oaks-gaming-hit-the-gold",
  "3-oaks-gaming-sunlight-princess",
] as const;

test("first 3 Oaks passport closeout batch completes every selected target", () => {
  const selected = new Set(catalogSeeds.map((seed) => seed.slug));
  const selectedTargets = detailSlugs.filter((slug) => selected.has(slug));
  expect(selectedTargets.length).toBeGreaterThan(0);

  for (const slug of selectedTargets) {
    const details = getVerifiedCatalogDetails(slug) as ReturnType<typeof getVerifiedCatalogDetails> & {
      rtpSource?: string;
      maxWinSource?: string;
      volatilitySource?: string;
    };
    expect(details?.rtp, `${slug} RTP`).toBeTruthy();
    expect(details?.maxWin, `${slug} maxWin`).toBeTruthy();
    expect(details?.volatility, `${slug} volatility`).toBeTruthy();
    expect(details?.rtpSource, `${slug} RTP provenance`).toMatch(/^https:\/\//);
    expect(details?.maxWinSource, `${slug} max-win provenance`).toMatch(/^https:\/\//);
    expect(details?.volatilitySource, `${slug} volatility provenance`).toMatch(/^https:\/\//);
  }
});

test("remaining selected 3 Oaks game-type targets are classified", () => {
  const selected = new Set(catalogSeeds.map((seed) => seed.slug));
  for (const slug of gameTypeSlugs.filter((slug) => selected.has(slug))) {
    expect(getVerifiedCatalogGameType(slug)?.gameType, slug).toBe("Slots");
  }
});
