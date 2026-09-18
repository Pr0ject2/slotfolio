import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { slots } from "../src/lib/data";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const detailTargets = {
  "playn-go-highway-legends": "5 барабанов",
  "playn-go-enchanted-meadow": "5 барабанов",
} as const;

const researchTargets = [
  "playn-go-highway-legends",
  "playn-go-def-leppard-hysteria",
  "playn-go-cash-a-cabana",
  "playn-go-fat-frankies",
  "playn-go-lab-of-madness-its-a-wild",
] as const;

test("eighth provider-wide Play’n GO batch preserves its six original official evidence records", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));
  expect(new Set([...Object.keys(detailTargets), ...researchTargets]).size).toBe(6);
  expect(catalogSeeds).toHaveLength(900);
  expect(slots).toHaveLength(100);

  for (const [slug, field] of Object.entries(detailTargets)) {
    const seed = selected.get(slug)!;
    const details = getVerifiedCatalogDetails(slug);
    expect(details?.source, slug).toBe(seed.source);
    expect(details?.field, slug).toBe(field);
    expect(details?.releaseDate, slug).toBeTruthy();
  }

  for (const slug of researchTargets) {
    const seed = selected.get(slug)!;
    const research = getVerifiedCatalogResearch(slug);
    expect(research?.source, slug).toBe(seed.source);
    expect(research?.mechanics.length, slug).toBeGreaterThan(0);
    expect(research?.evidence, slug).toBeTruthy();
  }
});
