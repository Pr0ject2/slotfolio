import { expect, test } from "@playwright/test";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const targets = [
  "playn-go-animal-madness",
  "playn-go-boat-bonanza",
  "playn-go-crabbys-gold",
  "playn-go-forge-of-fortunes",
  "playn-go-free-reelin-joker-1000",
] as const;

test("temporary near-complete Play’n GO profile", () => {
  const rows = targets.map((slug) => ({
    slug,
    details: getVerifiedCatalogDetails(slug),
    type: getVerifiedCatalogGameType(slug),
    research: getVerifiedCatalogResearch(slug),
  }));

  console.log("PLAYNGO_NEAR_COMPLETE", JSON.stringify(rows));
  expect(rows).toHaveLength(5);
});
