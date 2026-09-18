import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { slots } from "../src/lib/data";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const researchTargets = [
  "playn-go-diamonds-of-the-realm",
  "playn-go-divina-commedia-i-nove-cerchi",
  "playn-go-leprechauns-diamond-dig",
  "playn-go-midnight-gold",
  "playn-go-playn-go-mole-digger",
  "playn-go-playn-go-wrappin-gold",
] as const;

const coltSlug = "playn-go-colt-lightning";

test("seventh provider-wide Play’n GO batch preserves seven original official evidence records", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));
  expect(researchTargets.length + 1).toBe(7);
  expect(catalogSeeds).toHaveLength(900);
  expect(slots).toHaveLength(100);

  for (const slug of researchTargets) {
    const seed = selected.get(slug);
    expect(seed, slug).toBeTruthy();
    const research = getVerifiedCatalogResearch(slug);
    expect(research?.source, slug).toBe(seed!.source);
    expect(research?.mechanics, slug).toContain("Сбор символов");
    expect(research?.evidence, slug).toBeTruthy();
    expect(getVerifiedCatalogGameType(slug)?.gameType, slug).toBe("Video Slot");
  }

  const coltSeed = selected.get(coltSlug);
  expect(coltSeed, coltSlug).toBeTruthy();
  const colt = getVerifiedCatalogDetails(coltSlug);
  expect(colt?.source, coltSlug).toBe(coltSeed!.source);
  expect(colt?.releaseDate, coltSlug).toBe("2023-02-16");
  expect(colt?.field, coltSlug).toBe("5 барабанов · ряды 3-4-4-4-3");
  expect(colt?.maxWin, coltSlug).toBe("25000x");
  expect(getVerifiedCatalogGameType(coltSlug)?.gameType, coltSlug).toBe("Video Slot");
});
