import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { slots } from "../src/lib/data";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const expected = {
  "playn-go-aztec-idols": { field: "≥5 барабанов", releaseDate: "2012-08-11" },
  "playn-go-crazy-cows": { field: "≥5 барабанов", releaseDate: "2014-11-05" },
  "playn-go-dragon-ship": { field: "≥5 барабанов", releaseDate: "2012-10-07" },
  "playn-go-enchanted-crystals": { field: "≥5 барабанов", releaseDate: "2014-05-26" },
  "playn-go-golden-caravan": { field: "≥5 барабанов", releaseDate: "2016-04-20" },
  "playn-go-golden-colts": { field: "≥5 барабанов", releaseDate: "2019-02-26" },
  "playn-go-grim-muerto": { field: "≥5 барабанов", releaseDate: "2016-07-11" },
  "playn-go-holiday-season": { field: "3 позиции на барабане", releaseDate: "2016-11-14" },
  "playn-go-motley-crue": { field: "≥5 барабанов", releaseDate: "2022-12-22" },
  "playn-go-ninja-fruits": { field: "≥5 барабанов", releaseDate: "2013-06-19" },
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

test("ninth provider-wide Play’n GO batch adds conservative official reel evidence to ten score-2 cards", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  expect(targetSlugs.size).toBe(10);
  expect(catalogSeeds).toHaveLength(900);
  expect(slots).toHaveLength(100);
  expect(catalogSeeds.length + slots.length).toBe(1000);

  for (const [slug, values] of Object.entries(expected)) {
    const seed = selected.get(slug);
    expect(seed, slug).toBeTruthy();
    expect(seed!.provider, slug).toBe("Play’n GO");
    expect(slots.some((slot) => slot.provider === seed!.provider && slot.name === seed!.name), slug).toBe(false);

    const details = getVerifiedCatalogDetails(slug);
    expect(details, slug).toBeTruthy();
    expect(details?.source, `${slug} must preserve the official catalog page as primary provenance`).toBe(seed!.source);
    expect(details?.field, slug).toBe(values.field);
    expect(details?.releaseDate, slug).toBe(values.releaseDate);
    expect(details?.rtp, `${slug} must not invent RTP`).toBeUndefined();
    expect(details?.maxWin, `${slug} must not invent max win`).toBeUndefined();
    expect(details?.volatility, `${slug} must not invent volatility`).toBeUndefined();
    expect(details?.verifiedAt, slug).toBe("2026-09-16");
    expect(details && "fieldSource" in details, `${slug} must retain field provenance`).toBe(true);
    if (details && "fieldSource" in details) {
      expect(details.fieldSource, slug).toMatch(/^https:\/\/www\.playngo\.com\//);
    }

    expect(getVerifiedCatalogGameType(slug), `${slug} keeps the already verified game type`).toMatchObject({
      gameType: "Video Slot",
    });
    expect(getVerifiedCatalogResearch(slug)?.mechanics ?? [], `${slug} must not invent a mechanic`).toEqual([]);
    expect(scoreFor(slug), `${slug} must move from score 2 to score 3`).toBe(3);
  }

  const ranked = catalogSeeds.map((seed) => ({ slug: seed.slug, provider: seed.provider, score: scoreFor(seed.slug) }));
  expect(ranked.filter((row) => row.score <= 1)).toHaveLength(5);
  expect(ranked.filter((row) => row.score === 2)).toHaveLength(147);
  expect(ranked.filter((row) => row.score === 3)).toHaveLength(456);
  expect(ranked.filter((row) => row.score <= 1 && row.provider === "Hacksaw Gaming")).toHaveLength(0);
  expect(ranked.some((row) => row.slug === "playn-go-coin-club" && row.score === 0)).toBe(true);
  expect(ranked.filter((row) => row.provider === "Nolimit City" && row.score <= 1)).toHaveLength(4);
  expect(ranked.some((row) => targetSlugs.has(row.slug) && row.score === 2)).toBe(false);
});
