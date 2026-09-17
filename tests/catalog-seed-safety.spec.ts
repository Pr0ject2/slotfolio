import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const rejectedProviderArtifacts = [
  "hacksaw-gaming-blocks",
  "playn-go-3-hand-casino-holdem",
  "playn-go-bugs-party",
  "playn-go-casino-holdem",
  "playn-go-coin-club",
  "playn-go-deuces-wild-mh",
  "playn-go-flying-pigs",
  "playn-go-go-craps",
  "playn-go-jacks-or-better-mh",
  "playn-go-money-wheel",
  "playn-go-super-wheel",
  "wazdan-black-jack",
  "wazdan-sic-bo-dragons",
  "wazdan-three-cards",
];

test("catalog seed selection excludes verified non-slots and broken provider artifacts", () => {
  expect(catalogSeeds).toHaveLength(900);
  const selected = new Set(catalogSeeds.map((seed) => seed.slug));
  for (const slug of rejectedProviderArtifacts) expect(selected.has(slug), slug).toBe(false);
  expect(selected.has("playn-go-rally-4-riches"), "valid official replacement stays selected").toBe(true);
});

test("confirmed non-slot products are not exposed as verified slot research", () => {
  expect(getVerifiedCatalogResearch("hacksaw-gaming-blocks")).toBeUndefined();
  expect(getVerifiedCatalogResearch("playn-go-bugs-party")).toBeUndefined();
});

test("catalog seed selection repairs verified provider-title parser artifacts", () => {
  const throne = catalogSeeds.find((seed) => seed.slug === "wazdan-throne-of-elements-platinum");
  if (throne) expect(throne.name).toBe("Throne of Elements: Platinum");
  expect(catalogSeeds.some((seed) => seed.name.trim().toLowerCase() === "new")).toBe(false);
});
