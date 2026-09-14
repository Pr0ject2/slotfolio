import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { slots } from "../src/lib/data";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const detailTargets = {
  "playn-go-ice-joker": { field: "5×3 · 20 линий", releaseDate: "2020-12-03", fieldSource: "https://www.playngo.com/posts/top-winter-themed-slots" },
  "playn-go-kings-mask": { maxWin: "10000x", releaseDate: "2022-05-26" },
  "playn-go-lady-of-fortune-destiny-spins": { field: "3 направления выплат", releaseDate: "2025-08-07" },
  "playn-go-merlin-journey-of-flame": { field: "6 барабанов в Free Spins", releaseDate: "2023-07-13" },
  "playn-go-moon-princess-100": { field: "5×5", releaseDate: "2022-04-07", fieldSource: "https://it.playngo.com/series/grid-slots" },
  "playn-go-naughty-nicks-book": { field: "6 барабанов в Free Spins", releaseDate: "2022-12-08" },
} as const;

const researchTargets = {
  "playn-go-hope-unleashed-fortune-rises": { mechanics: ["Сбор символов"], releaseDate: "2026-03-24" },
  "playn-go-legacy-of-inca": { mechanics: ["Способы"], releaseDate: "2023-02-02", evidenceSource: "https://www.playngo.com/post/legacy-of-inca" },
  "playn-go-manta-mayhem": { mechanics: ["Сбор символов"], releaseDate: "2026-05-14" },
  "playn-go-merlin-and-the-ice-queen-morgana": { mechanics: ["Линии"], releaseDate: "2021-11-25" },
  "playn-go-merry-xmas": { mechanics: ["Линии"], releaseDate: "2014-11-17", evidenceSource: "https://www.playngo.com/post/merry-xmas-review" },
} as const;

const targetSlugs = new Set([...Object.keys(detailTargets), ...Object.keys(researchTargets)]);
const gridSlots = new Set(["playn-go-moon-princess-100"]);

function scoreFor(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const detailFacts = details
    ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length
    : 0;
  return detailFacts + (type ? 1 : 0) + (research?.mechanics.length ?? 0);
}

test("second provider-wide Play’n GO batch moves eleven exact official records out of score 2", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  expect(targetSlugs.size).toBe(11);
  expect(catalogSeeds).toHaveLength(900);
  expect(slots).toHaveLength(100);
  expect(catalogSeeds.length + slots.length).toBe(1000);

  for (const slug of targetSlugs) {
    const seed = selected.get(slug);
    expect(seed, slug).toBeTruthy();
    expect(seed!.provider, slug).toBe("Play’n GO");
    expect(slots.some((slot) => slot.provider === seed!.provider && slot.name === seed!.name), slug).toBe(false);
    expect(getVerifiedCatalogGameType(slug)?.gameType, slug).toBe(gridSlots.has(slug) ? "Grid Slot" : "Video Slot");
    expect(scoreFor(slug), `${slug} must move from score 2 to score 3`).toBe(3);
  }

  for (const [slug, values] of Object.entries(detailTargets)) {
    const seed = selected.get(slug)!;
    const details = getVerifiedCatalogDetails(slug);
    expect(details, slug).toBeTruthy();
    expect(details?.source, `${slug} must preserve the catalog seed as primary provenance`).toBe(seed.source);
    expect(details?.releaseDate, slug).toBe(values.releaseDate);
    expect(details?.rtp, `${slug} must not invent RTP`).toBeUndefined();
    expect(details?.volatility, `${slug} must not invent volatility`).toBeUndefined();
    expect(getVerifiedCatalogResearch(slug), `${slug} must not invent a taxonomy mechanic`).toBeUndefined();

    if ("field" in values) {
      expect(details?.field, slug).toBe(values.field);
      if ("fieldSource" in values) {
        expect(details && "fieldSource" in details, `${slug} must retain separate official field provenance`).toBe(true);
        if (details && "fieldSource" in details) expect(details.fieldSource, slug).toBe(values.fieldSource);
      } else {
        expect(details && "fieldSource" in details, `${slug} uses its primary game page for the field fact`).toBe(false);
      }
      expect(details?.maxWin, `${slug} must not invent max win`).toBeUndefined();
    } else {
      expect(details?.field, `${slug} must not invent a field`).toBeUndefined();
      expect(details?.maxWin, slug).toBe(values.maxWin);
    }
  }

  for (const [slug, values] of Object.entries(researchTargets)) {
    const seed = selected.get(slug)!;
    const details = getVerifiedCatalogDetails(slug);
    expect(details, slug).toBeTruthy();
    expect(details?.source, slug).toBe(seed.source);
    expect(details?.releaseDate, slug).toBe(values.releaseDate);
    expect(details?.field, `${slug} must not invent a field`).toBeUndefined();
    expect(details?.rtp, `${slug} must not invent RTP`).toBeUndefined();
    expect(details?.maxWin, `${slug} must not invent max win`).toBeUndefined();
    expect(details?.volatility, `${slug} must not invent volatility`).toBeUndefined();

    const research = getVerifiedCatalogResearch(slug);
    expect(research?.source, `${slug} must preserve the catalog seed as primary research source`).toBe(seed.source);
    expect(research?.mechanics, slug).toEqual(values.mechanics);
    expect(research?.evidence, slug).toBeTruthy();
    if ("evidenceSource" in values) {
      expect(research && "evidenceSource" in research, `${slug} must retain separate official evidence provenance`).toBe(true);
      if (research && "evidenceSource" in research) expect(research.evidenceSource, slug).toBe(values.evidenceSource);
    } else {
      expect(research && "evidenceSource" in research, `${slug} uses its primary game page as evidence`).toBe(false);
    }
  }

  const ranked = catalogSeeds.map((seed) => ({ slug: seed.slug, provider: seed.provider, score: scoreFor(seed.slug) }));
  expect(ranked.filter((row) => row.score <= 1)).toHaveLength(22);
  expect(ranked.filter((row) => row.score === 2)).toHaveLength(153);
  expect(ranked.filter((row) => row.score === 3)).toHaveLength(436);
  expect(ranked.filter((row) => row.score <= 1 && row.provider === "Hacksaw Gaming")).toHaveLength(17);
  expect(ranked.some((row) => row.slug === "playn-go-coin-club" && row.score === 0)).toBe(true);
  expect(ranked.filter((row) => row.provider === "Nolimit City" && row.score <= 1)).toHaveLength(4);
  expect(ranked.some((row) => targetSlugs.has(row.slug) && row.score === 2)).toBe(false);
});
