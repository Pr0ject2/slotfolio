import { test, expect } from "@playwright/test";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

function scoreFor(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  return (details ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length : 0)
    + (type ? 1 : 0)
    + (research?.mechanics.length ?? 0);
}

const enriched = [
  "hacksaw-gaming-cloud-princess",
  "hacksaw-gaming-cursed-crypt",
  "hacksaw-gaming-dark-spiral",
  "hacksaw-gaming-death-becomes-you",
  "hacksaw-gaming-donut-division",
  "hacksaw-gaming-dusk-princess",
  "hacksaw-gaming-fire-my-laser",
  "hacksaw-gaming-le-bunny",
  "hacksaw-gaming-le-cowboy",
  "hacksaw-gaming-le-digger",
  "hacksaw-gaming-le-fisherman",
  "hacksaw-gaming-le-football-fan",
  "hacksaw-gaming-le-king",
  "hacksaw-gaming-le-pharaoh",
  "hacksaw-gaming-le-santa",
  "hacksaw-gaming-marlin-masters-atlantis",
  "hacksaw-gaming-pray-for-three",
  "hacksaw-gaming-smoking-dragon",
  "hacksaw-gaming-spear-of-athena",
  "hacksaw-gaming-stormborn",
  "hacksaw-gaming-superstar-sevens",
  "hacksaw-gaming-tiger-legends",
  "hacksaw-gaming-toshi-ways-club",
  "hacksaw-gaming-wings-of-horus",
  "hacksaw-gaming-ze-zeus",
];

test("Hacksaw 2026-09-19 tail keeps all former score-four cards beyond score four", () => {
  for (const slug of enriched) {
    expect(scoreFor(slug), slug).toBeGreaterThanOrEqual(5);
  }
});

test("Hacksaw 2026-09-19 tail preserves exact official GAME DATA variants", () => {
  const death = getVerifiedCatalogDetails("hacksaw-gaming-death-becomes-you");
  expect(death?.rtp).toBe("96,34% / 94,36% / 92,23% / 86,28%");
  expect(death?.volatility).toBe("4/5");

  const football = getVerifiedCatalogDetails("hacksaw-gaming-le-football-fan");
  expect(football?.rtp).toBe("96,41% / 94,29% / 92,30%");
  expect(football?.volatility).toBe("2/5");

  expect(getVerifiedCatalogDetails("hacksaw-gaming-dusk-princess")?.field).toBe("6×5");
  expect(getVerifiedCatalogDetails("hacksaw-gaming-ze-zeus")?.field).toBe("6×5");
  expect(getVerifiedCatalogDetails("hacksaw-gaming-cursed-crypt")?.releaseDate).toBe("2024-06");
  expect(getVerifiedCatalogDetails("hacksaw-gaming-tiger-legends")?.releaseDate).toBe("2025-09-04");
});

test("Hacksaw 2026-09-19 tail retains representative official feature enrichment", () => {
  expect(getVerifiedCatalogResearch("hacksaw-gaming-dark-spiral")?.mechanics).toEqual(
    expect.arrayContaining(["Каскады", "Расширяющиеся символы", "Stacked Symbols", "Sticky Symbols"]),
  );
  expect(getVerifiedCatalogResearch("hacksaw-gaming-fire-my-laser")?.mechanics).toEqual(
    expect.arrayContaining(["Каскады", "Bombs Away", "Множители", "Удаление символов", "Прогрессивные множители"]),
  );
  expect(getVerifiedCatalogResearch("hacksaw-gaming-stormborn")?.mechanics).toEqual(
    expect.arrayContaining(["Сбор символов", "Множители", "Респины", "Sticky Wilds", "Wild Reels"]),
  );
  expect(getVerifiedCatalogResearch("hacksaw-gaming-toshi-ways-club")?.mechanics).toEqual(
    expect.arrayContaining(["Каскады", "Трансформация символов", "Sticky Frames"]),
  );
  expect(getVerifiedCatalogResearch("hacksaw-gaming-wings-of-horus")?.mechanics).toEqual(
    expect.arrayContaining(["Orb Transformations", "Sacred Scripture", "Трансформация символов", "Instant Prizes"]),
  );
  expect(getVerifiedCatalogResearch("hacksaw-gaming-ze-zeus")?.mechanics).toEqual(
    expect.arrayContaining(["Кластеры", "Каскады", "Сбор символов", "Множители", "Instant Prizes"]),
  );
});
