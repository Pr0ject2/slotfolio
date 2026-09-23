import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";
import { getCatalogResearch3OaksPublicApiPass } from "../src/lib/catalog-research-3oaks-public-api-pass";

const expected = {
  "3-oaks-gaming-3-super-hot-teapots": {
    evidenceSource: "https://3oaks.com/api/v1/games/3_super_hot_teapots",
    mechanics: ["Hold & Win", "Множители", "Бонусное колесо", "Jackpots"],
  },
  "3-oaks-gaming-4-fortune-clovers": {
    evidenceSource: "https://3oaks.com/api/v1/games/4_fortune_clovers",
    mechanics: ["Hold & Win", "Сбор символов", "Множители", "Расширяющиеся барабаны", "Mystery Symbols", "Jackpots"],
  },
  "3-oaks-gaming-lucky-penny-3-pots-super-wheel": {
    evidenceSource: "https://3oaks.com/api/v1/games/lucky_penny_3_pots_super_wheel",
    mechanics: ["Hold & Win", "Респины", "Множители", "Бонусное колесо", "Jackpots"],
  },
} as const;

function scoreFor(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const detailFacts = details ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length : 0;
  return detailFacts + (type ? 1 : 0) + (research?.mechanics.length ?? 0);
}

test("official 3 Oaks public API enriches the three feature-rich score-four cards additively", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  for (const [slug, values] of Object.entries(expected)) {
    const seed = selected.get(slug);
    const direct = getCatalogResearch3OaksPublicApiPass(slug);
    const merged = getVerifiedCatalogResearch(slug);

    expect(seed, slug).toBeTruthy();
    expect(direct?.source, slug).toBe(values.evidenceSource);
    expect(direct?.verifiedAt, slug).toBe("2026-09-23");
    expect(merged?.source, slug).toBe(seed?.source);
    expect(merged?.evidenceSource, slug).toBe(values.evidenceSource);
    expect(merged?.mechanics, `${slug} must retain the previously verified line mechanic`).toContain("Линии");
    for (const mechanic of values.mechanics) {
      expect(merged?.mechanics, `${slug} must include ${mechanic}`).toContain(mechanic);
    }
    expect(scoreFor(slug), `${slug} must move above the old score-four floor`).toBeGreaterThan(4);
  }
});

test("public API pass does not invent features for explicitly featureless Hot Fire Fruits", () => {
  const slug = "3-oaks-gaming-hot-fire-fruits";
  expect(getCatalogResearch3OaksPublicApiPass(slug)).toBeUndefined();
  expect(getVerifiedCatalogResearch(slug)?.mechanics).toContain("Линии");
});
