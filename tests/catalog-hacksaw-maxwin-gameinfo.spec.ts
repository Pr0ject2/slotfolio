import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getCatalogVerifiedDetailsHacksawMaxWinProviderWide } from "../src/lib/catalog-verified-details-hacksaw-maxwin-provider-wide";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";

const slug = "hacksaw-gaming-le-pharaoh";
const maxWinSource = "https://static-stg.hacksawgaming.com/1562/1.42.1/gameinfoassets/templates/en-us/en-us-gameinfo.html";

test("Le Pharaoh max win keeps canonical source separate from official gameinfo evidence", () => {
  const seed = catalogSeeds.find((item) => item.slug === slug);
  const direct = getCatalogVerifiedDetailsHacksawMaxWinProviderWide(slug);
  const merged = getVerifiedCatalogDetails(slug);

  expect(seed?.provider).toBe("Hacksaw Gaming");
  expect(seed?.source).toBe("https://www.hacksawgaming.com/games/le-pharaoh");
  expect(direct?.maxWin).toBe("15 000x");
  expect(direct?.maxWinSource).toBe(maxWinSource);
  expect(direct?.maxWinVerifiedAt).toBe("2026-09-23");
  expect(direct?.source).toBe(seed?.source);
  expect(merged?.maxWin).toBe("15 000x");
});

test("new max-win evidence does not rewrite older verification dates", () => {
  expect(getCatalogVerifiedDetailsHacksawMaxWinProviderWide("hacksaw-gaming-jelly-slice")?.verifiedAt).toBe("2026-09-17");
});
