import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { slots } from "../src/lib/data";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const expected = {
  "playn-go-infernal-trinity-go-guaranteed": { releaseDate: "2026-09-03", source: "https://www.playngo.com/games/infernal-trinity-go-guaranteed", mechanics: ["Сбор символов"] },
  "playn-go-jolly-roger": { releaseDate: "2012-01-01", source: "https://www.playngo.com/games/jolly-roger", mechanics: ["Линии"] },
  "playn-go-jolly-roger-wild-kraken": { releaseDate: "2024-12-19", source: "https://www.playngo.com/games/jolly-roger-wild-kraken", mechanics: ["Каскады"] },
} as const;

function scoreFor(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const detailFacts = details ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length : 0;
  return detailFacts + (type ? 1 : 0) + (research?.mechanics.length ?? 0);
}

test("quality pass 22 preserves its original official mechanic facts on three Play’n GO records", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));
  expect(Object.keys(expected)).toHaveLength(3);
  expect(catalogSeeds).toHaveLength(900);
  expect(slots).toHaveLength(100);

  for (const [slug, values] of Object.entries(expected)) {
    const seed = selected.get(slug);
    expect(seed, slug).toBeTruthy();
    expect(seed!.source, slug).toBe(values.source);
    const details = getVerifiedCatalogDetails(slug);
    expect(details?.source, slug).toBe(values.source);
    expect(details?.releaseDate, slug).toBe(values.releaseDate);
    const research = getVerifiedCatalogResearch(slug);
    expect(research?.source, slug).toBe(values.source);
    expect(research?.mechanics, slug).toEqual(expect.arrayContaining([...values.mechanics]));
    expect(research?.evidence, slug).toBeTruthy();
    expect(getVerifiedCatalogGameType(slug)?.gameType, slug).toBe("Video Slot");
    expect(scoreFor(slug), slug).toBeGreaterThanOrEqual(3);
  }

  expect(getVerifiedCatalogDetails("playn-go-infernal-trinity-go-guaranteed")?.field).toBe("5 барабанов");
});
