import { test, expect } from "@playwright/test";
import rawSeeds from "../src/data/catalog-seeds.json" with { type: "json" };
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { slots } from "../src/lib/data";

test("broken Coin Club seed is skipped and Rally 4 Riches fills the Play’n GO slot", () => {
  const rawCoinClub = rawSeeds.find((seed) => seed.slug === "playn-go-coin-club");
  const selectedCoinClub = catalogSeeds.find((seed) => seed.slug === "playn-go-coin-club");
  const playngo = catalogSeeds.filter((seed) => seed.provider === "Play’n GO");
  const replacement = playngo.at(-1);

  expect(rawCoinClub).toMatchObject({
    name: "Coin Club",
    provider: "Play’n GO",
    source: "https://www.playngo.com/games/coin-club",
  });
  expect(selectedCoinClub).toBeUndefined();
  expect(replacement).toEqual({
    slug: "playn-go-rally-4-riches",
    name: "Rally 4 Riches",
    provider: "Play’n GO",
    source: "https://www.playngo.com/games/rally-4-riches",
    verifiedBy: "official-provider-catalog",
  });
  expect(getVerifiedCatalogGameType("playn-go-rally-4-riches")).toEqual({
    gameType: "Video Slot",
    source: "https://www.playngo.com/games/rally-4-riches",
    verifiedAt: "2026-09-17",
  });

  expect(catalogSeeds).toHaveLength(900);
  expect(slots).toHaveLength(100);
  expect(catalogSeeds.length + slots.length).toBe(1000);
});
