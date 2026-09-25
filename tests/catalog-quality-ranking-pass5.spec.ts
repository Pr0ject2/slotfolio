import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { slots } from "../src/lib/data";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const expectedDetails = {
  "3-oaks-gaming-3-coin-volcanoes": { field: "4×3 · 2 линии", releaseDate: "2024-11" },
  "3-oaks-gaming-3-jewel-crowns": { field: "3 барабана", releaseDate: "2025-06" },
  "3-oaks-gaming-coin-up-lightning": { field: "3×3", releaseDate: "2024-07" },
  "3-oaks-gaming-coin-volcano": { field: "3×3", releaseDate: "2023-08" },
  "3-oaks-gaming-dj-tiger-x1000": { field: "6×5", releaseDate: "2026-03" },
  "3-oaks-gaming-egypt-power-x1000": { field: "6×5", releaseDate: "2025-11" },
  "3-oaks-gaming-joker-glitz-x1000": { field: "6×5", releaseDate: "2026-06" },
  "3-oaks-gaming-magic-apple-2": { field: "5×4 · 20 линий", releaseDate: "2022-06" },
  "3-oaks-gaming-sunlight-princess": { field: "5×3 · 30 линий", releaseDate: "2023-02" },
} as const;

const collectionSlugs = new Set([
  "3-oaks-gaming-coin-lamp",
  "3-oaks-gaming-sun-of-egypt-5",
]);

const targetSlugs = new Set([...Object.keys(expectedDetails), ...collectionSlugs]);

test("quality pass 5 preserves its original 3 Oaks facts while allowing later passport completion", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  expect(targetSlugs.size).toBe(11);
  expect(catalogSeeds).toHaveLength(900);
  expect(slots).toHaveLength(100);

  for (const slug of targetSlugs) {
    const seed = selected.get(slug);
    expect(seed, slug).toBeTruthy();
    expect(seed!.provider, slug).toBe("3 Oaks Gaming");
    expect(slots.some((slot) => slot.provider === seed!.provider && slot.name === seed!.name), slug).toBe(false);

    const details = getVerifiedCatalogDetails(slug);
    expect(details?.source, slug).toBe(seed!.source);
    expect(details?.rtp, `${slug} RTP`).toBeTruthy();
    expect(details?.maxWin, `${slug} max win`).toBeTruthy();
    expect(details?.volatility, `${slug} volatility`).toBeTruthy();
  }

  for (const [slug, expected] of Object.entries(expectedDetails)) {
    const details = getVerifiedCatalogDetails(slug);
    expect(details?.field, slug).toBe(expected.field);
    expect(details?.releaseDate, slug).toBe(expected.releaseDate);
  }

  for (const slug of collectionSlugs) {
    const seed = selected.get(slug)!;
    const research = getVerifiedCatalogResearch(slug);
    expect(research?.source, slug).toBe(seed.source);
    expect(research?.mechanics, slug).toContain("Сбор символов");
  }

  const remainingThin3Oaks = catalogSeeds
    .filter((seed) => seed.provider === "3 Oaks Gaming")
    .map((seed) => {
      const details = getVerifiedCatalogDetails(seed.slug);
      const type = getVerifiedCatalogGameType(seed.slug);
      const research = getVerifiedCatalogResearch(seed.slug);
      const detailFacts = details
        ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length
        : 0;
      return {
        slug: seed.slug,
        score: detailFacts + (type ? 1 : 0) + (research?.mechanics.length ?? 0),
      };
    })
    .filter((row) => row.score <= 1);

  expect(remainingThin3Oaks).toEqual([]);
});
