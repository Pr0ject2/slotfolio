import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const expectedNewMechanic: Record<string, string> = {
  "3-oaks-gaming-3-hot-teapots": "Hold & Win",
  "3-oaks-gaming-3-lucky-sparks": "Free Spins",
  "3-oaks-gaming-777-fruity-coins": "Hold & Win",
  "3-oaks-gaming-777-gems-respin": "Блокировка символов",
  "3-oaks-gaming-big-heist": "Free Spins",
  "3-oaks-gaming-buddha-megaways": "Каскады",
  "3-oaks-gaming-crystal-scarabs": "Free Spins",
  "3-oaks-gaming-dancing-joker": "Free Spins",
  "3-oaks-gaming-fishin-bear": "Free Spins",
  "3-oaks-gaming-grand": "Hold & Win",
  "3-oaks-gaming-lady-fortune": "Free Spins",
  "3-oaks-gaming-lava-coins": "Hold & Win",
  "3-oaks-gaming-lord-of-thunder": "Hold & Win",
  "3-oaks-gaming-magic-apple": "Free Spins",
  "3-oaks-gaming-moon-sisters": "Hold & Win",
  "3-oaks-gaming-power-sun": "Jackpots",
  "3-oaks-gaming-power-sun-xxl": "Hold & Win",
  "3-oaks-gaming-purple-diamond": "Hold & Win",
  "3-oaks-gaming-rio-gems": "Free Spins",
  "3-oaks-gaming-sun-of-egypt": "Free Spins",
  "3-oaks-gaming-super-china-pots": "Jackpots",
  "3-oaks-gaming-super-hot-teapots": "Hold & Win",
};

function scoreFor(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const gameType = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const detailFacts = details
    ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length
    : 0;
  return detailFacts + (gameType ? 1 : 0) + (research?.mechanics.length ?? 0);
}

test("final 3 Oaks score-six feature pass lifts all directly evidenced targets", () => {
  for (const [slug, mechanic] of Object.entries(expectedNewMechanic)) {
    const research = getVerifiedCatalogResearch(slug);
    expect(research?.mechanics, slug).toContain(mechanic);
    expect(research?.source, slug).toContain("3oaks.com/");
    expect(scoreFor(slug), slug).toBeGreaterThan(6);
  }
});

test("3 Oaks released score-six tail is empty after later direct API evidence", () => {
  const scoreSix = catalogSeeds
    .filter((seed) => seed.provider === "3 Oaks Gaming" && scoreFor(seed.slug) === 6)
    .map((seed) => seed.slug)
    .sort();

  expect(scoreSix).toEqual([]);
});
