import { expect, test } from "@playwright/test";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const expectedMechanics: Record<string, string> = {
  "playn-go-animal-madness": "Удаление символов",
  "playn-go-boat-bonanza": "Free Spins",
  "playn-go-crabbys-gold": "Hold & Win",
  "playn-go-forge-of-fortunes": "Линии",
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

test("second Play’n GO score-six feature wave lifts only directly evidenced targets", () => {
  for (const [slug, mechanic] of Object.entries(expectedMechanics)) {
    const research = getVerifiedCatalogResearch(slug);

    expect(research?.mechanics, slug).toContain(mechanic);
    expect(research?.source, slug).toContain("playngo.com/");
    expect(research?.verifiedAt, slug).toBe("2026-09-22");
    expect(scoreFor(slug), slug).toBeGreaterThan(6);
  }
});
