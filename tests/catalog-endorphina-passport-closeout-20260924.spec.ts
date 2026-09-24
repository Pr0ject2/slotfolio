import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const externallyVerifiedMaxWins = {
  "endorphina-burning-coins-20-dice": "1500x",
  "endorphina-chance-machine-90s": "2500x",
  "endorphina-fortune-bankers": "25000x",
  "endorphina-fortune-chests-dice": "1500x",
  "endorphina-gift-of-midas": "6500x",
  "endorphina-groovin-tiger": "1000x",
  "endorphina-moofo": "1500x",
  "endorphina-zalatar": "6600x",
} as const;

test("all selected Endorphina catalog cards have complete passports", () => {
  const incomplete = catalogSeeds
    .filter((seed) => seed.provider === "Endorphina")
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

test("Endorphina closeout preserves canonical provider sources and external max-win provenance", () => {
  for (const [slug, maxWin] of Object.entries(externallyVerifiedMaxWins)) {
    const details = getVerifiedCatalogDetails(slug) as (ReturnType<typeof getVerifiedCatalogDetails> & { maxWinSource?: string });
    expect(details?.maxWin, slug).toBe(maxWin);
    expect(details?.source, slug).toContain("endorphina.com/games/");
    expect(details?.maxWinSource, slug).toMatch(/slotcatalog\.com|marvn\.ai/);
  }

  expect(getVerifiedCatalogDetails("endorphina-burning-coins-20-dice")?.releaseDate).toBe("2026-07-31");
  expect(getVerifiedCatalogDetails("endorphina-fortune-chests-dice")?.releaseDate).toBe("2026-09-07");
});
