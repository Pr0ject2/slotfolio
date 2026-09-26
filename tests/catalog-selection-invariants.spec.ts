import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { slots } from "../src/lib/data";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";

const sourceLockedTail = [
  "endorphina-3-golden-chests",
  "nolimit-city-bowel-of-beelzebub",
  "nolimit-city-fire-in-the-hole-4",
] as const;

test("catalog selection keeps source-locked tail records and excludes non-slot Wazdan Three Cards", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  for (const slug of sourceLockedTail) {
    const seed = selected.get(slug);
    expect(seed, slug).toBeTruthy();
    expect(slots.some((slot) => slot.provider === seed!.provider && slot.name === seed!.name), slug).toBe(false);
    expect(getVerifiedCatalogDetails(slug)?.source, slug).toBe(seed!.source);
  }

  expect(
    catalogSeeds.some((seed) => seed.slug === "wazdan-three-cards"),
    "Wazdan Three Cards is official Video Poker, not a slot",
  ).toBe(false);
});
