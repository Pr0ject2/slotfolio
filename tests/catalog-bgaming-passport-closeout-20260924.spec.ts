import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

test("all selected BGaming catalog cards have complete passports", () => {
  const incomplete = catalogSeeds
    .filter((seed) => seed.provider === "BGaming")
    .map((seed) => {
      const details = getVerifiedCatalogDetails(seed.slug);
      const gameType = getVerifiedCatalogGameType(seed.slug);
      const research = getVerifiedCatalogResearch(seed.slug);
      const missing = [
        !details?.field ? "field" : null,
        !details?.rtp ? "rtp" : null,
        !details?.maxWin ? "maxWin" : null,
        !details?.volatility ? "volatility" : null,
        !details?.releaseDate ? "releaseDate" : null,
        !gameType?.gameType ? "gameType" : null,
        !(research?.mechanics.length) ? "mechanics" : null,
      ].filter(Boolean);
      return { slug: seed.slug, missing };
    })
    .filter((row) => row.missing.length > 0);

  expect(incomplete).toEqual([]);
});

test("Money Maker uses the current canonical BGaming passport", () => {
  const details = getVerifiedCatalogDetails("bgaming-money-maker");
  expect(details?.field).toBe("3×1 · 1 линия");
  expect(details?.rtp).toBe("97,00%");
  expect(details?.maxWin).toBe("1 000x");
  expect(details?.volatility).toBe("Низкая");
  expect(details?.releaseDate).toBe("2026-06-10");
  expect(details?.source).toBe("https://bgaming.com/games/money-maker");
});
