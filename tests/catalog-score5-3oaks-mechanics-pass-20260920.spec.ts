import { test, expect } from "@playwright/test";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const expected: Record<string, string[]> = {
  "3-oaks-gaming-3-jewel-crowns": ["Free Spins", "Jackpots"],
  "3-oaks-gaming-aztec-sun": ["Free Spins", "Jackpots"],
  "3-oaks-gaming-book-of-sun-multichance": ["Free Spins"],
  "3-oaks-gaming-buddha-megaways": ["Free Spins", "Прогрессивные множители", "Gamble"],
  "3-oaks-gaming-coin-princess-x1000": ["Scatter Pays", "Free Spins", "Прогрессивные множители"],
  "3-oaks-gaming-dj-tiger-x1000": ["Permanent Wilds", "Free Spins", "Прогрессивные множители"],
  "3-oaks-gaming-joker-glitz-x1000": ["Mystery Symbols", "Free Spins", "Прогрессивные множители"],
  "3-oaks-gaming-lucky-apple-x1000": ["Mystery Symbols", "Free Spins", "Прогрессивные множители"],
  "3-oaks-gaming-lucky-penny": ["Free Spins", "Прогрессивные множители"],
  "3-oaks-gaming-lucky-penny-2": ["Mystery Symbols", "Free Spins", "Прогрессивные множители"],
  "3-oaks-gaming-lucky-penny-power-scatter": ["Instant Prizes", "Free Spins", "Прогрессивные множители"],
  "3-oaks-gaming-sun-of-egypt-5": ["Free Spins", "Jackpots"],
};

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

test("3 Oaks score-five mechanics pass preserves official feature facts while allowing later enrichment", () => {
  expect(Object.keys(expected)).toHaveLength(12);

  for (const [slug, mechanics] of Object.entries(expected)) {
    const research = getVerifiedCatalogResearch(slug);
    expect(research?.source, slug).toMatch(/^https:\/\/(www\.)?3oaks\.com\//);
    expect(research?.verifiedAt, slug).toMatch(/^20\d{2}-\d{2}-\d{2}$/);
    expect(research?.evidence, slug).toBeTruthy();
    for (const mechanic of mechanics) {
      expect(research?.mechanics, `${slug}: ${mechanic}`).toContain(mechanic);
    }
    expect(scoreFor(slug), slug).toBeGreaterThanOrEqual(6);
  }

  const djType = getVerifiedCatalogGameType("3-oaks-gaming-dj-tiger-x1000");
  expect(djType?.gameType).toBe("Slots");
  expect(djType?.source).toBe("https://3oaks.com/game/dj_tiger_x1000");
});
