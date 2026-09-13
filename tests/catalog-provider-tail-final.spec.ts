import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { slots } from "../src/lib/data";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const finalTailSlugs = [
  "endorphina-3-golden-chests",
  "nolimit-city-bowel-of-beelzebub24th-november-20261st-december-2026",
  "nolimit-city-fire-in-the-hole-410th-november-202617th-november-2026",
];

const completedProviders = new Set([
  "BGaming",
  "Hacksaw Gaming",
  "Wazdan",
  "Endorphina",
  "Nolimit City",
  "Push Gaming",
  "3 Oaks Gaming",
]);

test("final provider tail stays selected and completed providers have no unverified runtime slots", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  for (const slug of finalTailSlugs) {
    const seed = selected.get(slug);
    expect(seed, slug).toBeTruthy();
    expect(slots.some((slot) => slot.provider === seed!.provider && slot.name === seed!.name), slug).toBe(false);
    expect(getVerifiedCatalogDetails(slug)?.source, slug).toBe(seed!.source);
  }

  expect(catalogSeeds.some((seed) => seed.slug === "wazdan-three-cards"), "Wazdan Three Cards is official Video Poker, not a slot").toBe(false);

  const unverifiedCatalogOnly = catalogSeeds.filter(
    (seed) =>
      completedProviders.has(seed.provider) &&
      !slots.some((slot) => slot.provider === seed.provider && slot.name === seed.name) &&
      !getVerifiedCatalogDetails(seed.slug) &&
      !getVerifiedCatalogGameType(seed.slug) &&
      !getVerifiedCatalogResearch(seed.slug),
  );

  expect(unverifiedCatalogOnly).toEqual([]);
});
