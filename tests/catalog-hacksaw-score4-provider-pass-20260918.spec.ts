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

const mechanicsTargets = [
  "hacksaw-gaming-2-wild-2-die",
  "hacksaw-gaming-benny-the-beer",
  "hacksaw-gaming-bouncy-bombs",
  "hacksaw-gaming-dawn-of-kings",
  "hacksaw-gaming-dragons-domain",
  "hacksaw-gaming-evil-eyes",
  "hacksaw-gaming-eye-of-medusa",
  "hacksaw-gaming-eye-of-the-panda",
  "hacksaw-gaming-feel-the-beat",
  "hacksaw-gaming-fist-of-destruction",
  "hacksaw-gaming-klowns",
  "hacksaw-gaming-le-prechaun",
  "hacksaw-gaming-magic-piggy-og",
  "hacksaw-gaming-marlin-masters-the-big-haul",
  "hacksaw-gaming-rise-of-ymir",
  "hacksaw-gaming-rusty-and-curly",
  "hacksaw-gaming-snow-slingers",
  "hacksaw-gaming-tai-the-toad",
  "hacksaw-gaming-the-luxe",
  "hacksaw-gaming-wishbringer",
];

test("Hacksaw provider pass lifts every explicitly researched score-four target", () => {
  for (const slug of mechanicsTargets) {
    expect(scoreFor(slug), slug).toBeGreaterThanOrEqual(5);
  }
});

test("Hacksaw GAME DATA keeps exact per-game RTP variants and volatility", () => {
  expect(getVerifiedCatalogDetails("hacksaw-gaming-benny-the-beer")?.rtp).toBe(
    "96,17% / 94,17% / 92,28% / 88,26%",
  );

  const panda = getVerifiedCatalogDetails("hacksaw-gaming-eye-of-the-panda");
  expect(panda?.field).toBe("5×5 · 27 линий");
  expect(panda?.rtp).toBe("96,26% / 94,21% / 92,25% / 88,31%");
  expect(panda?.volatility).toBe("3/5");

  const prechaun = getVerifiedCatalogDetails("hacksaw-gaming-le-prechaun");
  expect(prechaun?.rtp).toBe("97,52% / 96,28% / 94,29% / 92,28% / 86,31%");
  expect(prechaun?.volatility).toBe("3/5");

  const piggy = getVerifiedCatalogDetails("hacksaw-gaming-magic-piggy-og");
  expect(piggy?.rtp).toBe("96,20% / 94,18%");
  expect(piggy?.volatility).toBe("3/5");
});

test("Hacksaw mechanics overlay preserves prior mechanics while adding official features", () => {
  const ymir = getVerifiedCatalogResearch("hacksaw-gaming-rise-of-ymir")?.mechanics ?? [];
  expect(ymir).toEqual(expect.arrayContaining(["Линии", "Респины", "Множители", "Megamultiplier™"]));

  const marlin = getVerifiedCatalogResearch("hacksaw-gaming-marlin-masters-the-big-haul")?.mechanics ?? [];
  expect(marlin).toEqual(expect.arrayContaining(["Линии", "LootLines", "Сбор символов", "Множители"]));

  const fist = getVerifiedCatalogResearch("hacksaw-gaming-fist-of-destruction")?.mechanics ?? [];
  expect(fist).toEqual(expect.arrayContaining(["Линии", "Fist Wild Reels", "Расширяющиеся барабаны", "Множители"]));
});
