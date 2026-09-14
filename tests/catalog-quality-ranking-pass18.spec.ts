import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { slots } from "../src/lib/data";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const expected = {
  "3-oaks-gaming-3-jewel-crowns": {
    field: "3 барабана",
    releaseDate: "2025-06",
    detailSource: "https://3oaks.com/game/3_jewel_crowns",
  },
  "3-oaks-gaming-sky-pearls": {
    field: "4×4",
    releaseDate: "2024-03",
    detailSource: "https://3oaks.com/game/sky_pearls",
    evidenceSource: "https://3oaks.com/news/new-release-sky-pearls",
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

test("quality pass 18 confirms collection mechanics for two more score-2 3 Oaks records", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  expect(targetSlugs.size).toBe(2);
  expect(catalogSeeds).toHaveLength(900);
  expect(slots).toHaveLength(100);
  expect(catalogSeeds.length + slots.length).toBe(1000);

  for (const [slug, values] of Object.entries(expected)) {
    const seed = selected.get(slug);
    expect(seed, slug).toBeTruthy();
    expect(seed!.provider, slug).toBe("3 Oaks Gaming");
    expect(seed!.source, slug).toBe(values.detailSource);
    expect(slots.some((slot) => slot.provider === seed!.provider && slot.name === seed!.name), slug).toBe(false);

    const details = getVerifiedCatalogDetails(slug);
    expect(details, slug).toBeTruthy();
    expect(details?.source, slug).toBe(values.detailSource);
    expect(details?.field, slug).toBe(values.field);
    expect(details?.releaseDate, slug).toBe(values.releaseDate);
    expect(details?.rtp, `${slug} must not invent RTP`).toBeUndefined();
    expect(details?.maxWin, `${slug} must not invent max win`).toBeUndefined();
    expect(details?.volatility, `${slug} must not invent volatility`).toBeUndefined();

    const research = getVerifiedCatalogResearch(slug);
    expect(research?.source, slug).toBe(values.detailSource);
    expect(research?.mechanics, `${slug} must use only the verified collect mechanic`).toEqual(["Сбор символов"]);
    expect(research?.evidence, slug).toMatch(/fill|accumulat|collect/i);

    if ("evidenceSource" in values) {
      expect(research && "evidenceSource" in research, `${slug} must retain the separate evidence source`).toBe(true);
      if (research && "evidenceSource" in research) {
        expect(research.evidenceSource, slug).toBe(values.evidenceSource);
      }
    } else {
      expect(research && "evidenceSource" in research, `${slug} must not invent a second source`).toBe(false);
    }

    expect(getVerifiedCatalogGameType(slug), `${slug} must not invent Game Type`).toBeUndefined();
    expect(scoreFor(slug), `${slug} must move from score 2 to score 3`).toBe(3);
  }

  const ranked = catalogSeeds.map((seed) => ({
    slug: seed.slug,
    provider: seed.provider,
    score: scoreFor(seed.slug),
  }));

  expect(ranked.filter((row) => row.score <= 1)).toHaveLength(22);
  expect(ranked.filter((row) => row.score === 2)).toHaveLength(252);
  expect(ranked.filter((row) => row.score === 3)).toHaveLength(359);
  expect(ranked.filter((row) => row.score <= 1 && row.provider === "Hacksaw Gaming")).toHaveLength(17);
  expect(ranked.some((row) => row.slug === "playn-go-coin-club" && row.score === 0)).toBe(true);
  expect(ranked.filter((row) => row.provider === "Nolimit City" && row.score <= 1)).toHaveLength(4);
  expect(ranked.some((row) => targetSlugs.has(row.slug) && row.score === 2)).toBe(false);
});
