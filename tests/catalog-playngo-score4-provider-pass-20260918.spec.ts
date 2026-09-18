import { test, expect } from "@playwright/test";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

function scoreFor(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const detailFacts = details
    ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length
    : 0;
  return detailFacts + (type ? 1 : 0) + (research?.mechanics.length ?? 0);
}

const enrichedMechanics = [
  "playn-go-1001-mystery-genie-fortunes",
  "playn-go-barn-busters",
  "playn-go-big-win-cat-pawsperity",
  "playn-go-book-of-dead-go-collect",
  "playn-go-buildin-more-bucks",
  "playn-go-cashin-joker",
  "playn-go-city-of-sound",
  "playn-go-crabbys-gold-ii",
  "playn-go-crystal-hall",
  "playn-go-fangs-and-fire",
  "playn-go-fire-joker-blitz",
  "playn-go-lawn-n-disorder",
  "playn-go-loot-and-labyrinths",
  "playn-go-moon-princess-extreme",
  "playn-go-myth-of-dead",
  "playn-go-oasis-of-dead",
  "playn-go-piggy-heist",
  "playn-go-ras-reckoning",
];

test("Play’n GO provider pass keeps every mechanics target enriched beyond score four", () => {
  for (const slug of enrichedMechanics) {
    expect(scoreFor(slug), slug).toBeGreaterThanOrEqual(5);
  }
});

test("Play’n GO provider pass preserves corrected and variant technical facts", () => {
  const ra = getVerifiedCatalogDetails("playn-go-ras-reckoning");
  expect(ra?.field).toBe("6×5");
  expect(ra?.releaseDate).toBe("2025-12-04");
  expect(getVerifiedCatalogResearch("playn-go-ras-reckoning")?.mechanics).toEqual(
    expect.arrayContaining(["Кластеры", "Каскады", "Mega Drop"]),
  );

  expect(getVerifiedCatalogDetails("playn-go-cat-wilde-and-the-pyramids-of-dead")?.maxWin).toBe(
    "5000x / 10000x",
  );
  expect(getVerifiedCatalogDetails("playn-go-cashin-joker")?.maxWin).toBe("10800x");
  expect(getVerifiedCatalogDetails("playn-go-legion-gold-victory")?.maxWin).toBe("1000x");
  expect(getVerifiedCatalogDetails("playn-go-imperial-opera")?.field).toBe("5 барабанов · 20 линий");
  expect(getVerifiedCatalogDetails("playn-go-golden-legend")?.field).toBe("≥5 барабанов");
});

test("Play’n GO mechanics pass corrects Cashin’ Joker and keeps richer official feature sets", () => {
  const cashin = getVerifiedCatalogResearch("playn-go-cashin-joker")?.mechanics ?? [];
  expect(cashin).toEqual(expect.arrayContaining(["Множители", "Респины", "Расширяющиеся барабаны"]));
  expect(cashin).not.toContain("Линии");

  const crabby = getVerifiedCatalogResearch("playn-go-crabbys-gold-ii")?.mechanics ?? [];
  expect(crabby).toEqual(
    expect.arrayContaining(["Сбор символов", "Hold N Spin", "Sticky Wilds", "Расширяющиеся символы", "Walking Wilds", "Множители", "Gamble"]),
  );

  const genie = getVerifiedCatalogResearch("playn-go-1001-mystery-genie-fortunes")?.mechanics ?? [];
  expect(genie).toEqual(expect.arrayContaining(["Расширяющиеся символы", "Респины", "Множители", "Mystery Symbols", "Locks & Keys"]));
});
