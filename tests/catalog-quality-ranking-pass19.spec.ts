import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { slots } from "../src/lib/data";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const expectedFields = {
  "playn-go-gold-of-fortune-god": {
    field: "5×3",
    releaseDate: "2024-06-06",
    source: "https://www.playngo.com/games/gold-of-fortune-god",
    fieldSource: "https://www.playngo.com/posts/gold-of-fortune-god",
  },
  "playn-go-hot-dog-heist": {
    field: "5×3 · 40 линий",
    releaseDate: "2024-12-13",
    source: "https://www.playngo.com/games/hot-dog-heist",
    fieldSource: "https://www.playngo.com/post/hot-dog-heist",
  },
} as const;

const grannySlug = "playn-go-grannys-wild";
const targetSlugs = new Set([...Object.keys(expectedFields), grannySlug]);

function scoreFor(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const detailFacts = details
    ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length
    : 0;
  return detailFacts + (type ? 1 : 0) + (research?.mechanics.length ?? 0);
}

test("quality pass 19 adds one exact official fact to three score-2 Play’n GO records", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  expect(targetSlugs.size).toBe(3);
  expect(catalogSeeds).toHaveLength(900);
  expect(slots).toHaveLength(100);
  expect(catalogSeeds.length + slots.length).toBe(1000);

  for (const [slug, values] of Object.entries(expectedFields)) {
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
    expect(details && "fieldSource" in details, `${slug} must retain the separate official field source`).toBe(true);
    if (details && "fieldSource" in details) {
      expect(details.fieldSource, slug).toBe(values.fieldSource);
    }

    expect(getVerifiedCatalogResearch(slug), `${slug} must not invent a mechanic`).toBeUndefined();
    expect(getVerifiedCatalogGameType(slug)?.gameType, slug).toBe("Video Slot");
    expect(scoreFor(slug), `${slug} must move from score 2 to score 3`).toBe(3);
  }

  const granny = selected.get(grannySlug);
  expect(granny, grannySlug).toBeTruthy();
  expect(granny!.provider, grannySlug).toBe("Play’n GO");
  expect(granny!.source, grannySlug).toBe("https://www.playngo.com/games/granny's-wild");
  expect(slots.some((slot) => slot.provider === granny!.provider && slot.name === granny!.name), grannySlug).toBe(false);

  const grannyDetails = getVerifiedCatalogDetails(grannySlug);
  expect(grannyDetails, grannySlug).toBeTruthy();
  expect(grannyDetails?.source, grannySlug).toBe(granny!.source);
  expect(grannyDetails?.releaseDate, grannySlug).toBe("2026-05-26");
  expect(grannyDetails?.field, `${grannySlug} must not invent a field`).toBeUndefined();
  expect(grannyDetails?.rtp, `${grannySlug} must not invent RTP`).toBeUndefined();
  expect(grannyDetails?.maxWin, `${grannySlug} must not invent max win`).toBeUndefined();
  expect(grannyDetails?.volatility, `${grannySlug} must not invent volatility`).toBeUndefined();

  const grannyResearch = getVerifiedCatalogResearch(grannySlug);
  expect(grannyResearch?.source, grannySlug).toBe(granny!.source);
  expect(grannyResearch?.mechanics, grannySlug).toEqual(["Сбор символов"]);
  expect(grannyResearch?.evidence, grannySlug).toMatch(/collect/i);
  expect(getVerifiedCatalogGameType(grannySlug)?.gameType, grannySlug).toBe("Video Slot");
  expect(scoreFor(grannySlug), `${grannySlug} must move from score 2 to score 3`).toBe(3);

  const ranked = catalogSeeds.map((seed) => ({
    slug: seed.slug,
    provider: seed.provider,
    score: scoreFor(seed.slug),
  }));

  expect(ranked.filter((row) => row.score <= 1)).toHaveLength(22);
  expect(ranked.filter((row) => row.score === 2)).toHaveLength(140);
  expect(ranked.filter((row) => row.score === 3)).toHaveLength(446);
  expect(ranked.filter((row) => row.score <= 1 && row.provider === "Hacksaw Gaming")).toHaveLength(17);
  expect(ranked.some((row) => row.slug === "playn-go-coin-club" && row.score === 0)).toBe(true);
  expect(ranked.filter((row) => row.provider === "Nolimit City" && row.score <= 1)).toHaveLength(4);
  expect(ranked.some((row) => targetSlugs.has(row.slug) && row.score === 2)).toBe(false);
});
