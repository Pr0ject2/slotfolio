import { expect, test } from "@playwright/test";
import { getCatalogVerifiedDetailsPlayngoFill } from "../src/lib/catalog-verified-details-playngo-fill";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";

const slug = "playn-go-kings-mask";

test("King's Mask keeps the directly advertised official max win", () => {
  const overlay = getCatalogVerifiedDetailsPlayngoFill(slug);
  const merged = getVerifiedCatalogDetails(slug);

  expect(overlay?.maxWin).toBe("10000x");
  expect(overlay?.maxWinSource).toBe("https://www.playngo.com/games/king%27s-mask");
  expect(overlay?.verifiedAt).toBe("2026-09-23");
  expect(merged?.maxWin).toBe("10000x");
});
