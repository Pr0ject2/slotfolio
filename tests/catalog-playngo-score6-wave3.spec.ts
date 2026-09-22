import { expect, test } from "@playwright/test";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const expectedMechanics: Record<string, string> = {
  "playn-go-beasts-of-fire-maximum": "Maximum Burning Spins",
  "playn-go-boat-bonanza-colossal-catch": "Free Spins",
  "playn-go-boat-bonanza-down-under": "Free Spins",
  "playn-go-fangs-and-fire": "Serpent & Prowler Bonus",
  "playn-go-fate-of-dead-blitzways": "Sticky Wilds",
  "playn-go-gates-of-troy": "Free Spins",
  "playn-go-gigantoonz": "Dynamic Cluster Payways",
  "playn-go-kingdom-below": "Free Spins",
  "playn-go-loot-and-labyrinths": "Dungeon Free Spins",
  "playn-go-mega-don-feeding-frenzy": "Free Spins",
  "playn-go-mega-don-triple-threat": "Free Spins",
  "playn-go-mystery-egg-surprise": "Free Spins",
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

test("third Play’n GO score-six feature wave lifts all directly evidenced targets", () => {
  expect(Object.keys(expectedMechanics)).toHaveLength(12);

  for (const [slug, mechanic] of Object.entries(expectedMechanics)) {
    const research = getVerifiedCatalogResearch(slug);

    expect(research?.mechanics, slug).toContain(mechanic);
    expect(research?.source, slug).toContain("playngo.com/");
    expect(research?.verifiedAt, slug).toBe("2026-09-22");
    expect(scoreFor(slug), slug).toBeGreaterThan(6);
  }
});
