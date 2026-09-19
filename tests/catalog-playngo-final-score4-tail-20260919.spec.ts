import { test, expect } from "@playwright/test";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const expectedMechanics: Record<string, string[]> = {
  "playn-go-def-leppard-hysteria": ["Кластеры", "Каскады", "Pour Some Sugar on Me"],
  "playn-go-fortune-teller": ["Pick-and-click", "Трансформация символов", "Free Spins"],
  "playn-go-irish-gold": ["Линии", "Множители", "Wilds"],
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

test("final Play’n GO score-four tail keeps the new official features without freezing later enrichment", () => {
  for (const [slug, mechanics] of Object.entries(expectedMechanics)) {
    const research = getVerifiedCatalogResearch(slug);
    expect(research, slug).toBeTruthy();
    expect(research?.source, slug).toContain("playngo.com/games/");
    expect(research?.verifiedAt, slug).toMatch(/^20\d{2}-\d{2}-\d{2}$/);
    for (const mechanic of mechanics) {
      expect(research?.mechanics, `${slug}: ${mechanic}`).toContain(mechanic);
    }
    expect(scoreFor(slug), slug).toBeGreaterThanOrEqual(5);
  }
});
