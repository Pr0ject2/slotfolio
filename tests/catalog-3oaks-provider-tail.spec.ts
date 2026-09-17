import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { slots } from "../src/lib/data";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const targets = {
  "3-oaks-gaming-coin-lamp": { releaseDate: "2025-02", mechanic: "Сбор символов" },
  "3-oaks-gaming-coin-up-volcano": { field: "4×3", releaseDate: "2026-08" },
  "3-oaks-gaming-sun-of-egypt-5": { releaseDate: "2025-09", mechanic: "Сбор символов" },
} as const;

function scoreFor(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const detailFacts = details
    ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length
    : 0;
  return detailFacts + (type ? 1 : 0) + (research?.mechanics.length ?? 0);
}

test("final 3 Oaks provider tail moves the last three score-2 cards to score 3 with official slot classification", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  expect(Object.keys(targets)).toHaveLength(3);

  for (const [slug, expected] of Object.entries(targets)) {
    const seed = selected.get(slug);
    expect(seed, slug).toBeTruthy();
    expect(seed!.provider, slug).toBe("3 Oaks Gaming");
    expect(slots.some((slot) => slot.provider === seed!.provider && slot.name === seed!.name), slug).toBe(false);

    const type = getVerifiedCatalogGameType(slug);
    expect(type?.gameType, slug).toBe("Slots");
    expect(type?.source, slug).toBe(seed!.source);
    expect(type?.verifiedAt, slug).toBe("2026-09-17");

    const details = getVerifiedCatalogDetails(slug);
    expect(details?.source, slug).toBe(seed!.source);
    expect(details?.releaseDate, slug).toBe(expected.releaseDate);
    if ("field" in expected) expect(details?.field, slug).toBe(expected.field);

    if ("mechanic" in expected) {
      expect(getVerifiedCatalogResearch(slug)?.mechanics, slug).toContain(expected.mechanic);
    } else {
      expect(getVerifiedCatalogResearch(slug), slug).toBeUndefined();
    }

    expect(scoreFor(slug), slug).toBe(3);
  }
});
