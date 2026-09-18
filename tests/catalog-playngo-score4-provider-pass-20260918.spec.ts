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
  "playn-go-13th-trial-hercules-abyssways",
  "playn-go-agent-of-hearts",
  "playn-go-ankh-of-anubis-awakening",
  "playn-go-banana-rush",
  "playn-go-banquet-of-dead",
  "playn-go-bao-shi",
  "playn-go-barn-busters",
  "playn-go-baron-lord-of-saturday",
  "playn-go-beasts-of-fire-maximum",
  "playn-go-big-win-cat-pawsperity",
  "playn-go-boat-bonanza-croconile",
  "playn-go-book-of-dead-go-collect",
  "playn-go-bubblin-riches",
  "playn-go-buildin-even-more-bucks",
  "playn-go-buildin-more-bucks",
  "playn-go-captain-glum-pirate-hunter",
  "playn-go-cashin-joker",
  "playn-go-city-of-sound",
  "playn-go-count-jokula",
  "playn-go-crabbys-gold-ii",
  "playn-go-crystal-hall",
  "playn-go-fangs-and-fire",
  "playn-go-fat-frankies",
  "playn-go-fire-joker-100",
  "playn-go-fire-joker-blitz",
  "playn-go-game-of-gladiators-uprising",
  "playn-go-golden-legend",
  "playn-go-imperial-opera",
  "playn-go-lady-of-fortune",
  "playn-go-lady-of-fortune-destiny-spins",
  "playn-go-lawn-n-disorder",
  "playn-go-loot-and-labyrinths",
  "playn-go-medusas-madness",
  "playn-go-mega-don-triple-threat",
  "playn-go-moon-princess-extreme",
  "playn-go-moon-princess-stargazing",
  "playn-go-myth-of-dead",
  "playn-go-oasis-of-dead",
  "playn-go-odin-protector-of-realms",
  "playn-go-piggy-heist",
  "playn-go-piranha-pays",
  "playn-go-potion-of-madness",
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

  const genie = getVerifiedCatalogDetails("playn-go-1001-mystery-genie-fortunes");
  expect(genie?.field).toBe("5×4 · 20 линий");
  expect(genie?.maxWin).toBe("1001x");

  expect(getVerifiedCatalogDetails("playn-go-cat-wilde-and-the-pyramids-of-dead")?.maxWin).toBe(
    "5000x / 10000x",
  );
  expect(getVerifiedCatalogDetails("playn-go-cashin-joker")?.maxWin).toBe("10800x");
  expect(getVerifiedCatalogDetails("playn-go-legion-gold-victory")?.maxWin).toBe("1000x");
  expect(getVerifiedCatalogDetails("playn-go-imperial-opera")?.field).toBe("5 барабанов · 20 линий");
  expect(getVerifiedCatalogDetails("playn-go-golden-legend")?.field).toBe("≥5 барабанов");
  expect(getVerifiedCatalogDetails("playn-go-odin-protector-of-realms")?.field).toBe(
    "Шестиугольная сетка · 37 символов",
  );
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

  expect(getVerifiedCatalogResearch("playn-go-moon-princess-stargazing")?.mechanics).toEqual(
    expect.arrayContaining(["Кластеры", "Каскады", "Sticky Wilds", "Множители", "Сбор символов"]),
  );
  expect(getVerifiedCatalogResearch("playn-go-potion-of-madness")?.mechanics).toEqual(
    expect.arrayContaining(["Линии", "Sticky Wilds", "Респины", "Расширяющиеся барабаны", "Трансформация символов"]),
  );
  expect(getVerifiedCatalogResearch("playn-go-ankh-of-anubis-awakening")?.mechanics).toEqual(
    expect.arrayContaining(["Сбор символов", "Респины", "Sticky Wilds", "Расширяющиеся символы", "Stacked Wilds"]),
  );
  expect(getVerifiedCatalogResearch("playn-go-boat-bonanza-croconile")?.mechanics).toEqual(
    expect.arrayContaining(["Линии", "Сбор символов", "Респины", "Lock’n Spin", "Множители", "Instant Prizes"]),
  );
});
