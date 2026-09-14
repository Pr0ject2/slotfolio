import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { slots } from "../src/lib/data";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const expected = {
  "push-gaming-razor-shark-jackpots": {
    maxWin: "11007.70x",
    volatility: "Средняя",
    releaseDate: "2026-06-03",
    source: "https://www.pushgaming.com/games/razor-shark-jackpots.html",
    releaseDateSource:
      "https://www.pushgaming.com/blog/push-gaming-redefines-staple-slot-series-release-razor-shark-jackpots.html",
  },
  "push-gaming-red-hot-multipliers": {
    maxWin: "2500x",
    volatility: "Низкая",
    releaseDate: "2026-02",
    source: "https://www.pushgaming.com/games/red-hot-multipliers.html",
    releaseDateSource:
      "https://www.pushgaming.com/blog/reel-hot-games-continues-2026-momentum-release-diamonds-4-win.html",
  },
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

test("quality pass 15 adds separately sourced Push release dates to two score-2 records", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  expect(targetSlugs.size).toBe(2);
  expect(catalogSeeds).toHaveLength(900);
  expect(slots).toHaveLength(100);
  expect(catalogSeeds.length + slots.length).toBe(1000);

  for (const [slug, values] of Object.entries(expected)) {
    const seed = selected.get(slug);
    expect(seed, slug).toBeTruthy();
    expect(seed!.provider, slug).toBe("Push Gaming");
    expect(seed!.source, slug).toBe(values.source);
    expect(slots.some((slot) => slot.provider === seed!.provider && slot.name === seed!.name), slug).toBe(false);

    const details = getVerifiedCatalogDetails(slug);
    expect(details, slug).toBeTruthy();
    expect(details?.source, slug).toBe(values.source);
    expect(details?.maxWin, slug).toBe(values.maxWin);
    expect(details?.volatility, slug).toBe(values.volatility);
    expect(details?.releaseDate, slug).toBe(values.releaseDate);
    expect(details?.field, `${slug} must not invent a field`).toBeUndefined();
    expect(details?.rtp, `${slug} must not collapse multiple RTP configurations`).toBeUndefined();
    expect("releaseDateSource" in details!, `${slug} must retain a separate release source`).toBe(true);
    if ("releaseDateSource" in details!) {
      expect(details.releaseDateSource, slug).toBe(values.releaseDateSource);
      expect(details.releaseDateSource, slug).toMatch(/^https:\/\/www\.pushgaming\.com\/blog\//);
    }

    const research = getVerifiedCatalogResearch(slug);
    expect(research?.source, slug).toBe(values.source);
    expect(research?.mechanics, `${slug} must not invent a taxonomy mechanic`).toEqual([]);
    expect(getVerifiedCatalogGameType(slug), `${slug} must not invent Game Type`).toBeUndefined();
    expect(scoreFor(slug), `${slug} must move from score 2 to score 3`).toBe(3);
  }

  const ranked = catalogSeeds.map((seed) => ({
    slug: seed.slug,
    provider: seed.provider,
    score: scoreFor(seed.slug),
  }));

  expect(ranked.filter((row) => row.score <= 1)).toHaveLength(22);
  expect(ranked.filter((row) => row.score === 2)).toHaveLength(187);
  expect(ranked.filter((row) => row.score === 3)).toHaveLength(407);
  expect(ranked.filter((row) => row.score <= 1 && row.provider === "Hacksaw Gaming")).toHaveLength(17);
  expect(ranked.some((row) => row.slug === "playn-go-coin-club" && row.score === 0)).toBe(true);
  expect(ranked.filter((row) => row.provider === "Nolimit City" && row.score <= 1)).toHaveLength(4);
  expect(ranked.some((row) => targetSlugs.has(row.slug) && row.score === 2)).toBe(false);
});
