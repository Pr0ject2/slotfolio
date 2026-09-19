import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

function scoreFor(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  return (
    (details ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length : 0) +
    (type ? 1 : 0) +
    (research?.mechanics.length ?? 0)
  );
}

const playngoMechanics: Record<string, string[]> = {
  "playn-go-5x-magic": ["Множители", "Wilds", "Scatter Pays"],
  "playn-go-cat-wilde-and-the-lost-chapter": ["Расширяющиеся символы", "Free Spins", "Scatter Trigger"],
  "playn-go-mega-don": ["Трансформация символов", "Free Spins", "Retriggers"],
  "playn-go-myth": ["Множители", "Free Spins", "Gamble"],
  "playn-go-pearl-lagoon": ["Множители", "Free Spins", "Gamble"],
};

test("post-score-four Play’n GO pass preserves the new official feature facts", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  for (const [slug, expectedMechanics] of Object.entries(playngoMechanics)) {
    const seed = selected.get(slug);
    const research = getVerifiedCatalogResearch(slug);
    expect(seed, slug).toBeTruthy();
    expect(research?.source, slug).toBe(seed?.source);
    expect(research?.evidence, slug).toBeTruthy();
    for (const mechanic of expectedMechanics) {
      expect(research?.mechanics, `${slug}: ${mechanic}`).toContain(mechanic);
    }
    expect(scoreFor(slug), slug).toBeGreaterThanOrEqual(5);
  }
});

test("Hit the Gold keeps the exact official 3 Oaks feature set additive", () => {
  const slug = "3-oaks-gaming-hit-the-gold";
  const seed = catalogSeeds.find((item) => item.slug === slug);
  const research = getVerifiedCatalogResearch(slug);

  expect(seed).toBeTruthy();
  expect(research?.source).toBe(seed?.source);
  expect(research?.evidence).toBeTruthy();
  for (const mechanic of ["Линии", "Hold & Win", "Респины", "Jackpots", "Mystery Symbols", "Free Spins"]) {
    expect(research?.mechanics, mechanic).toContain(mechanic);
  }
  expect(scoreFor(slug)).toBeGreaterThanOrEqual(5);
});

test("current 3 Oaks releases keep official slot classification without freezing later enrichment", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));
  const slugs = [
    "3-oaks-gaming-3-super-hot-teapots",
    "3-oaks-gaming-4-fortune-clovers",
    "3-oaks-gaming-lucky-penny-3-pots-super-wheel",
  ];

  for (const slug of slugs) {
    const seed = selected.get(slug);
    const type = getVerifiedCatalogGameType(slug);
    expect(seed, slug).toBeTruthy();
    expect(type?.gameType, slug).toBe("Slots");
    expect(type?.source, slug).toBe(seed?.source);
    expect(type?.verifiedAt, slug).toMatch(/^20\d{2}-\d{2}-\d{2}$/);
  }
});
