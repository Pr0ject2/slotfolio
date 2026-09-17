import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

test("catalog research keeps the selected seed's canonical official source", () => {
  const mismatches = catalogSeeds.flatMap((seed) => {
    const research = getVerifiedCatalogResearch(seed.slug);
    if (!research || research.source === seed.source) return [];
    return [{ slug: seed.slug, seedSource: seed.source, researchSource: research.source }];
  });

  expect(mismatches).toEqual([]);
});
