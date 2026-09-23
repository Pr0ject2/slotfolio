import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";
import { getCatalogVerifiedDetailsPlayngoFill } from "../src/lib/catalog-verified-details-playngo-fill";

const slug = "playn-go-def-leppard-hysteria";

function scoreFor(target: string) {
  const details = getVerifiedCatalogDetails(target);
  const type = getVerifiedCatalogGameType(target);
  const research = getVerifiedCatalogResearch(target);
  const detailFacts = details ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length : 0;
  return detailFacts + (type ? 1 : 0) + (research?.mechanics.length ?? 0);
}

test("official Play'n GO grid series supplies Def Leppard Hysteria 5x7 layout", () => {
  const seed = catalogSeeds.find((entry) => entry.slug === slug);
  const overlay = getCatalogVerifiedDetailsPlayngoFill(slug);
  const merged = getVerifiedCatalogDetails(slug);

  expect(seed).toBeTruthy();
  expect(seed?.source).toBe("https://www.playngo.com/games/def-leppard%3A-hysteria");
  expect(overlay?.field).toBe("5×7");
  expect(overlay?.fieldSource).toBe("https://it.playngo.com/series/grid-slots");
  expect(overlay?.verifiedAt).toBe("2026-09-23");
  expect(merged?.source).toBe(seed?.source);
  expect(merged?.field).toBe("5×7");
  expect(merged && "fieldSource" in merged ? merged.fieldSource : undefined).toBe("https://it.playngo.com/series/grid-slots");
  expect(scoreFor(slug)).toBeGreaterThan(6);
});

test("Def Leppard field enrichment does not invent unsupported passport facts", () => {
  const details = getVerifiedCatalogDetails(slug);
  expect(details?.rtp).toBeUndefined();
  expect(details?.maxWin).toBeUndefined();
  expect(details?.volatility).toBeUndefined();
});
