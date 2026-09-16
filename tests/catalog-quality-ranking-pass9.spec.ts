import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { slots } from "../src/lib/data";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const expected = {
  "3-oaks-gaming-15-dragon-pearls": { field: "5×3 · 25 линий", releaseDate: "2020-08" },
  "3-oaks-gaming-3-african-drums": { field: "5×3 · 25 линий", releaseDate: "2025-01" },
  "3-oaks-gaming-3-aztec-temples": { field: "5×3 · 25 линий", releaseDate: "2025-04" },
  "3-oaks-gaming-3-china-pots": { field: "5×3 · 25 линий", releaseDate: "2024-04" },
  "3-oaks-gaming-3-clover-pots": { field: "5×3 · 25 линий", releaseDate: "2024-03" },
  "3-oaks-gaming-3-clover-pots-extra": { field: "5×4 · 30 линий", releaseDate: "2025-03" },
  "3-oaks-gaming-3-coins": { field: "3×3 · 5 линий", releaseDate: "2021-01" },
  "3-oaks-gaming-3-egypt-chests": { field: "5×3 · 10 линий", releaseDate: "2024-02" },
  "3-oaks-gaming-3-hot-teapots": { field: "5×3 · 25 линий", releaseDate: "2025-04" },
  "3-oaks-gaming-3-lucky-sparks": { field: "5×3 · 25 линий", releaseDate: "2026-06" },
} as const;

const targetSlugs = new Set(Object.keys(expected));

function scoreFor(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const detailFacts = details
    ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length
    : 0;
  return detailFacts + (type ? 1 : 0) + (research?.mechanics.length ?? 0);
}

test("quality pass 9 adds exact official release months to ten score-2 3 Oaks records", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  expect(targetSlugs.size).toBe(10);
  expect(catalogSeeds).toHaveLength(900);
  expect(slots).toHaveLength(100);

  for (const [slug, values] of Object.entries(expected)) {
    const seed = selected.get(slug);
    expect(seed, slug).toBeTruthy();
    expect(seed!.provider, slug).toBe("3 Oaks Gaming");
    expect(slots.some((slot) => slot.provider === seed!.provider && slot.name === seed!.name), slug).toBe(false);

    const details = getVerifiedCatalogDetails(slug);
    expect(details, slug).toBeTruthy();
    expect(details?.source, slug).toBe(seed!.source);
    expect(details?.field, slug).toBe(values.field);
    expect(details?.releaseDate, slug).toBe(values.releaseDate);
    expect(details?.rtp, `${slug} must not invent RTP`).toBeUndefined();
    expect(details?.maxWin, `${slug} must not invent max win`).toBeUndefined();
    expect(details?.volatility, `${slug} must not invent volatility`).toBeUndefined();
    expect(scoreFor(slug), `${slug} must move from score 2 to score 3`).toBe(3);
  }

  const ranked = catalogSeeds.map((seed) => ({
    slug: seed.slug,
    provider: seed.provider,
    score: scoreFor(seed.slug),
  }));

  expect(ranked.filter((row) => row.score <= 1)).toHaveLength(22);
  expect(ranked.filter((row) => row.score === 2)).toHaveLength(130);
  expect(ranked.filter((row) => row.score === 3)).toHaveLength(456);
  expect(ranked.filter((row) => row.score <= 1 && row.provider === "Hacksaw Gaming")).toHaveLength(17);
  expect(ranked.some((row) => row.slug === "playn-go-coin-club" && row.score === 0)).toBe(true);
  expect(ranked.filter((row) => row.provider === "Nolimit City" && row.score <= 1)).toHaveLength(4);
  expect(ranked.some((row) => targetSlugs.has(row.slug) && row.score === 2)).toBe(false);
});
