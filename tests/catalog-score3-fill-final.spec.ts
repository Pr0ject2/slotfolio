import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
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

const threeOaksTargets: Record<string, string[]> = {
  "3-oaks-gaming-rush-for-gold": ["Линии", "Сбор символов", "Расширяющиеся барабаны", "Множители"],
  "3-oaks-gaming-space-coins": ["Линии", "Респины", "Блокировка символов", "Сбор символов"],
  "3-oaks-gaming-sun-of-egypt-4": ["Линии", "Респины", "Mystery Symbols", "Сбор символов", "Множители"],
  "3-oaks-gaming-sun-of-egypt-5": ["Сбор символов", "Множители", "Расширяющиеся барабаны"],
  "3-oaks-gaming-super-sticky-piggy": ["Линии", "Множители", "Блокировка символов", "Сбор символов"],
  "3-oaks-gaming-supreme-diamond-xxl": ["Линии", "Сбор символов", "Блокировка символов", "Респины"],
  "3-oaks-gaming-sky-pearls": ["Сбор символов", "Респины", "Блокировка символов", "Mystery Symbols"],
  "3-oaks-gaming-super-china-pots": ["Линии", "Множители"],
};

const playngoTargets: Record<string, string> = {
  "playn-go-5x-magic": "Множители",
  "playn-go-cat-wilde-and-the-lost-chapter": "Расширяющиеся символы",
  "playn-go-mega-don": "Трансформация символов",
  "playn-go-myth": "Множители",
  "playn-go-pearl-lagoon": "Множители",
};

test("final score-three fill keeps new 3 Oaks evidence additive and canonical", () => {
  for (const [slug, mechanics] of Object.entries(threeOaksTargets)) {
    const seed = catalogSeeds.find((item) => item.slug === slug);
    const research = getVerifiedCatalogResearch(slug);
    expect(seed, slug).toBeTruthy();
    expect(research, slug).toBeTruthy();
    expect(research?.source, slug).toBe(seed!.source);
    for (const mechanic of mechanics) expect(research?.mechanics, `${slug}: ${mechanic}`).toContain(mechanic);
    expect(scoreFor(slug), slug).toBeGreaterThanOrEqual(4);
  }

  expect(getVerifiedCatalogResearch("3-oaks-gaming-sky-pearls")?.evidenceSource).toBe(
    "https://3oaks.com/news/new-release-sky-pearls",
  );
  expect(getVerifiedCatalogResearch("3-oaks-gaming-super-china-pots")?.evidenceSource).toBe(
    "https://3oaks.com/news/new-release-super-china-pots",
  );
});

test("explicit Play’n GO evidence does not erase previously verified mechanics", () => {
  for (const [slug, mechanic] of Object.entries(playngoTargets)) {
    const seed = catalogSeeds.find((item) => item.slug === slug);
    const research = getVerifiedCatalogResearch(slug);
    expect(seed, slug).toBeTruthy();
    expect(research, slug).toBeTruthy();
    expect(research?.source, slug).toBe(seed!.source);
    expect(research?.mechanics, slug).toContain(mechanic);
  }

  const invadingVegas = getVerifiedCatalogResearch("playn-go-invading-vegas");
  expect(invadingVegas?.mechanics).toEqual(
    expect.arrayContaining(["Lock On Re-Spin", "Респины", "Walking Wilds", "Расширяющиеся символы"]),
  );
});
