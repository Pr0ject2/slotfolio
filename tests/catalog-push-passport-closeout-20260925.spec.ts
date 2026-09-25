import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

test("all selected Push Gaming catalog cards have complete passports", () => {
  const incomplete = catalogSeeds
    .filter((seed) => seed.provider === "Push Gaming")
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

test("Push Gaming closeout keeps corrected representative facts", () => {
  expect(getVerifiedCatalogDetails("push-gaming-3-liberty-eagles")?.releaseDate).toBe("2026-08-25");
  expect(getVerifiedCatalogDetails("push-gaming-big-bamboo")?.releaseDate).toBe("2022-03-03");
  expect(getVerifiedCatalogDetails("push-gaming-happy-bamboo")?.releaseDate).toBe("2025-11-05");
  expect(getVerifiedCatalogDetails("push-gaming-dj-cat")?.field).toBe("4×1–5 · 5 линий");
  expect(getVerifiedCatalogDetails("push-gaming-samurais-katana")?.volatility).toBe("Высокая");
});
