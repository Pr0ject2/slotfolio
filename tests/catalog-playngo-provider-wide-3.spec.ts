import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { slots } from "../src/lib/data";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const targets = {
  "playn-go-oasis-of-dead": { field: "5×3 · 20 линий", releaseDate: "2024-07-04", fieldSource: "https://www.playngo.com/posts/oasis-of-dead-review" },
  "playn-go-octopus-treasure": { field: "5×3 · 20 линий", releaseDate: "2020-09-10", fieldSource: "https://www.playngo.com/post/the-top-4-underwater-slots-to-play-in-2023" },
  "playn-go-pandastic-adventure": { field: "5×3", maxWin: "6500x", releaseDate: "2024-01-11", fieldSource: "https://www.playngo.com/post/pandastic-adventure", maxWinSource: "https://www.playngo.com/post/pandastic-adventure" },
  "playn-go-phoenix-reborn": { field: "5 барабанов", releaseDate: "2019-04-16", fieldSource: "https://www.playngo.com/post/play-n-go-rise-to-the-occasion-with-phoenix-reborn" },
  "playn-go-piggy-blitz-casino-gold": { field: "6 барабанов · 4096 способов", releaseDate: "2026-01-29", fieldSource: "https://www.playngo.com/posts/piggy-blitz-casino-gold" },
  "playn-go-piggy-blitz-disco-gold": { field: "6×4", maxWin: "5000x", releaseDate: "2024-11-07", fieldSource: "https://www.playngo.com/post/play-n-go-music-launches-piggy-blitz-disco-gold-visualiser", maxWinSource: "https://www.playngo.com/post/play-n-go-music-launches-piggy-blitz-disco-gold-visualiser" },
  "playn-go-piggy-heist": { field: "6 барабанов", releaseDate: "2025-12-16", fieldSource: "https://www.playngo.com/posts/piggy-heist" },
  "playn-go-piranha-pays": { field: "5×4 · 30 линий → 5×8", releaseDate: "2024-03-21", fieldSource: "https://www.playngo.com/post/piranha-pays" },
  "playn-go-potion-of-madness": { field: "5 барабанов → 5×6 · 40 линий в Free Spins", releaseDate: "2025-01-30", fieldSource: "https://www.playngo.com/post/potion-of-madness" },
  "playn-go-puebla-parade": { field: "5×4 → 5×7", releaseDate: "2022-04-21", fieldSource: "https://www.playngo.com/post/puebla-parade-gets-the-party-started" },
  "playn-go-rabbit-hole-riches": { field: "3×3", releaseDate: "2020-10-08", fieldSource: "https://www.playngo.com/post/play-n-go-bring-back-the-wonder-in-court-of-hearts" },
} as const;

const targetSlugs = new Set(Object.keys(targets));

function scoreFor(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const detailFacts = details
    ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length
    : 0;
  return detailFacts + (type ? 1 : 0) + (research?.mechanics.length ?? 0);
}

test("third provider-wide Play’n GO batch enriches eleven remaining weak cards", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  expect(targetSlugs.size).toBe(11);
  expect(catalogSeeds).toHaveLength(900);
  expect(slots).toHaveLength(100);
  expect(catalogSeeds.length + slots.length).toBe(1000);

  for (const [slug, values] of Object.entries(targets)) {
    const seed = selected.get(slug);
    expect(seed, slug).toBeTruthy();
    expect(seed!.provider, slug).toBe("Play’n GO");
    expect(slots.some((slot) => slot.provider === seed!.provider && slot.name === seed!.name), slug).toBe(false);

    const details = getVerifiedCatalogDetails(slug);
    expect(details, slug).toBeTruthy();
    expect(details?.source, `${slug} must preserve the official catalog game page as primary provenance`).toBe(seed!.source);
    expect(details?.field, slug).toBe(values.field);
    expect(details?.releaseDate, slug).toBe(values.releaseDate);
    expect(details?.rtp, `${slug} must not invent RTP`).toBeUndefined();
    expect(details?.volatility, `${slug} must not invent volatility`).toBeUndefined();
    expect(details && "fieldSource" in details, `${slug} must retain separate official field provenance`).toBe(true);
    if (details && "fieldSource" in details) expect(details.fieldSource, slug).toBe(values.fieldSource);

    if ("maxWin" in values) {
      expect(details?.maxWin, slug).toBe(values.maxWin);
      expect(details && "maxWinSource" in details, `${slug} must retain separate official max-win provenance`).toBe(true);
      if (details && "maxWinSource" in details) expect(details.maxWinSource, slug).toBe(values.maxWinSource);
      expect(scoreFor(slug), `${slug} should gain both verified facts`).toBe(4);
    } else {
      expect(details?.maxWin, `${slug} must not invent max win`).toBeUndefined();
      expect(scoreFor(slug), `${slug} should move from score 2 to score 3`).toBe(3);
    }

    expect(getVerifiedCatalogResearch(slug), `${slug} must not invent a taxonomy mechanic`).toBeUndefined();
    expect(getVerifiedCatalogGameType(slug)?.gameType, slug).toBe("Video Slot");
  }

  const ranked = catalogSeeds.map((seed) => ({ slug: seed.slug, provider: seed.provider, score: scoreFor(seed.slug) }));
  expect(ranked.filter((row) => row.score <= 1)).toHaveLength(22);
  expect(ranked.filter((row) => row.score === 2)).toHaveLength(203);
  expect(ranked.filter((row) => row.score === 3)).toHaveLength(399);
  expect(ranked.filter((row) => row.score <= 1 && row.provider === "Hacksaw Gaming")).toHaveLength(17);
  expect(ranked.some((row) => row.slug === "playn-go-coin-club" && row.score === 0)).toBe(true);
  expect(ranked.filter((row) => row.provider === "Nolimit City" && row.score <= 1)).toHaveLength(4);
  expect(ranked.some((row) => targetSlugs.has(row.slug) && row.score === 2)).toBe(false);
});
