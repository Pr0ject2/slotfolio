import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { slots } from "../src/lib/data";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const pushFinalSlugs = [
  "push-gaming-sea-of-spirits",
  "push-gaming-shamrock-saints",
  "push-gaming-tarot-treasures",
  "push-gaming-the-grand-show",
  "push-gaming-the-great-banker",
  "push-gaming-tiki-tumble",
  "push-gaming-tricky-treats",
  "push-gaming-triple-rampage",
  "push-gaming-vegas-vault",
  "push-gaming-viva-lock-vegas",
  "push-gaming-wild-swarm",
  "push-gaming-wild-swarm-2",
  "push-gaming-wild-swarm-3-chocolate-eggs",
  "push-gaming-wild-swarm-triple-hive",
];

test("Push Gaming final records stay selected and complete current runtime enrichment", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  for (const slug of pushFinalSlugs) {
    const seed = selected.get(slug);
    expect(seed, slug).toBeTruthy();
    expect(slots.some((slot) => slot.provider === seed!.provider && slot.name === seed!.name), slug).toBe(false);
    expect(getVerifiedCatalogDetails(slug)?.source, slug).toBe(seed!.source);
    expect(getVerifiedCatalogResearch(slug)?.source, slug).toBe(seed!.source);
    expect(getVerifiedCatalogGameType(slug), slug).toBeUndefined();
  }

  const unverifiedCatalogOnly = catalogSeeds.filter(
    (seed) =>
      seed.provider === "Push Gaming" &&
      !slots.some((slot) => slot.provider === seed.provider && slot.name === seed.name) &&
      !getVerifiedCatalogDetails(seed.slug) &&
      !getVerifiedCatalogGameType(seed.slug) &&
      !getVerifiedCatalogResearch(seed.slug),
  );

  expect(unverifiedCatalogOnly).toEqual([]);
});
