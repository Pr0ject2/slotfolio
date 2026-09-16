import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { slots } from "../src/lib/data";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const expected = {
  "playn-go-happy-halloween": {
    field: "5 барабанов · до 50 линий",
    releaseDate: "2015-10-14",
    source: "https://www.playngo.com/games/happy-halloween",
  },
  "playn-go-house-of-doom": {
    field: "5 барабанов · 10 фиксированных линий",
    releaseDate: "2018-03-12",
    source: "https://www.playngo.com/games/house-of-doom",
    fieldSource: "https://www.playngo.com/posts/play-n-go-top-charts-with-musical-masterpiece-house-of-doom",
  },
  "playn-go-hugo-2": {
    field: "5 барабанов · 10 линий",
    releaseDate: "2017-11-22",
    source: "https://www.playngo.com/games/hugo-2",
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

test("quality pass 20 adds exact official layout facts to three score-2 Play’n GO records", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  expect(targetSlugs.size).toBe(3);
  expect(catalogSeeds).toHaveLength(900);
  expect(slots).toHaveLength(100);
  expect(catalogSeeds.length + slots.length).toBe(1000);

  for (const [slug, values] of Object.entries(expected)) {
    const seed = selected.get(slug);
    expect(seed, slug).toBeTruthy();
    expect(seed!.provider, slug).toBe("Play’n GO");
    expect(seed!.source, slug).toBe(values.source);
    expect(slots.some((slot) => slot.provider === seed!.provider && slot.name === seed!.name), slug).toBe(false);

    const details = getVerifiedCatalogDetails(slug);
    expect(details, slug).toBeTruthy();
    expect(details?.source, slug).toBe(values.source);
    expect(details?.field, slug).toBe(values.field);
    expect(details?.releaseDate, slug).toBe(values.releaseDate);
    expect(details?.rtp, `${slug} must not invent RTP`).toBeUndefined();
    expect(details?.maxWin, `${slug} must not invent max win`).toBeUndefined();
    expect(details?.volatility, `${slug} must not invent volatility`).toBeUndefined();

    if ("fieldSource" in values) {
      expect(details && "fieldSource" in details, `${slug} must retain the separate official field source`).toBe(true);
      if (details && "fieldSource" in details) {
        expect(details.fieldSource, slug).toBe(values.fieldSource);
      }
    } else {
      expect(details && "fieldSource" in details, `${slug} must not invent a second field source`).toBe(false);
    }

    expect(getVerifiedCatalogResearch(slug), `${slug} must not invent a mechanic`).toBeUndefined();
    expect(getVerifiedCatalogGameType(slug)?.gameType, slug).toBe("Video Slot");
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
