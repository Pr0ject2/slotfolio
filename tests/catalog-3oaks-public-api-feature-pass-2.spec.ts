import { expect, test } from "@playwright/test";
import { getCatalogResearch3OaksPublicApiPass2 } from "../src/lib/catalog-research-3oaks-public-api-pass-2";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const cases = {
  "3-oaks-gaming-coin-up-volcano": {
    api: "https://3oaks.com/api/v1/games/coinup_volcano",
    canonical: "https://3oaks.com/game/coinup_volcano",
    oldMechanics: ["Сбор символов", "Респины"],
    newMechanics: ["Hold & Win", "Mystery Symbols", "Jackpots", "Расширяющиеся барабаны", "Множители"],
  },
  "3-oaks-gaming-book-of-sun-multichance": {
    api: "https://3oaks.com/api/v1/games/book_of_sun_multichance",
    canonical: "https://3oaks.com/game/book_of_sun_multichance",
    oldMechanics: ["Линии", "Расширяющиеся символы", "Free Spins"],
    newMechanics: ["Wild"],
  },
} as const;

function scoreFor(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const gameType = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const detailFacts = details
    ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length
    : 0;
  return detailFacts + (gameType ? 1 : 0) + (research?.mechanics.length ?? 0);
}

test("second 3 Oaks public API wave adds only direct feature evidence and keeps provenance", () => {
  for (const [slug, values] of Object.entries(cases)) {
    const direct = getCatalogResearch3OaksPublicApiPass2(slug);
    expect(direct?.source, slug).toBe(values.api);
    expect(direct?.evidenceSources, slug).toEqual([values.api]);
    expect(direct?.verifiedAt, slug).toBe("2026-09-24");

    const merged = getVerifiedCatalogResearch(slug);
    expect(merged?.source, slug).toBe(values.canonical);
    expect(merged?.evidenceSources, slug).toContain(values.api);
    for (const mechanic of values.oldMechanics) expect(merged?.mechanics, `${slug}: ${mechanic}`).toContain(mechanic);
    for (const mechanic of values.newMechanics) expect(merged?.mechanics, `${slug}: ${mechanic}`).toContain(mechanic);
    expect(scoreFor(slug), slug).toBeGreaterThan(6);
  }
});

test("second 3 Oaks API wave does not promote jackpot values into maxWin", () => {
  expect(getVerifiedCatalogDetails("3-oaks-gaming-coin-up-volcano")?.maxWin).toBeUndefined();
  expect(getVerifiedCatalogDetails("3-oaks-gaming-book-of-sun-multichance")?.maxWin).toBeUndefined();
});
