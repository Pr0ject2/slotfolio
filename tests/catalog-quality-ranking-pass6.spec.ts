import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { slots } from "../src/lib/data";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const gameTypeSlugs = new Set([
  "hacksaw-gaming-cloud-princess",
  "hacksaw-gaming-dark-spiral",
  "hacksaw-gaming-deal-with-death",
  "hacksaw-gaming-donny-and-danny",
  "hacksaw-gaming-donut-division",
  "hacksaw-gaming-dragons-domain",
  "hacksaw-gaming-epic-ze-zeus",
  "hacksaw-gaming-fire-my-laser",
  "hacksaw-gaming-frkn-bananas",
  "hacksaw-gaming-great-game-rockies",
  "hacksaw-gaming-grug-make-fire",
  "hacksaw-gaming-invictus",
  "hacksaw-gaming-le-bunny",
  "hacksaw-gaming-le-hooligan",
  "hacksaw-gaming-le-sortudo",
  "hacksaw-gaming-pray-for-six",
  "hacksaw-gaming-reign-of-rome",
  "hacksaw-gaming-smoking-dragon",
  "hacksaw-gaming-sun-princess",
  "hacksaw-gaming-superstar-sevens",
  "hacksaw-gaming-supreme-zeus",
  "hacksaw-gaming-the-luxe",
]);

const collectionSlugs = new Set([
  "hacksaw-gaming-le-fisherman",
  "hacksaw-gaming-le-digger",
  "hacksaw-gaming-le-king",
  "hacksaw-gaming-le-santa",
  "hacksaw-gaming-marlin-masters-atlantis",
  "hacksaw-gaming-miami-mayhem",
  "hacksaw-gaming-stormborn",
  "hacksaw-gaming-zeus-ze-zecond",
]);

const expectedDetails = {
  "hacksaw-gaming-epic-ze-zeus": { rtp: "96,22% / 94,16% / 92,35%", maxWin: "50 000x", volatility: "5/5", releaseDate: "2026-08-18" },
  "hacksaw-gaming-great-game-rockies": { rtp: "96,33% / 94,33% / 92,29% / 86,25%", maxWin: "5 000x", volatility: "3/5", releaseDate: "2026-06-11" },
  "hacksaw-gaming-grug-make-fire": { rtp: "96,19% / 94,28% / 92,27% / 86,22%", maxWin: "10 000x", volatility: "4/5" },
  "hacksaw-gaming-le-hooligan": { rtp: "96,34% / 94,23% / 92,17%", maxWin: "10 000x", volatility: "3/5", releaseDate: "2026-06-08" },
  "hacksaw-gaming-le-sortudo": { rtp: "96,27% / 94,29% / 92,23% / 86,28%", maxWin: "2 500x", volatility: "3/5", releaseDate: "2026-08-04" },
  "hacksaw-gaming-supreme-zeus": { rtp: "96,39% / 94,30% / 92,31% / 86,32%", maxWin: "12 500x", volatility: "4/5", releaseDate: "2026-07-30" },
} as const;

const targetSlugs = new Set([...gameTypeSlugs, ...collectionSlugs]);

test("quality pass 6 improves thirty thin Hacksaw runtime records from official evidence", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  expect(targetSlugs.size).toBe(30);
  expect(catalogSeeds).toHaveLength(900);
  expect(slots).toHaveLength(100);

  for (const slug of targetSlugs) {
    const seed = selected.get(slug);
    expect(seed, slug).toBeTruthy();
    expect(seed!.provider, slug).toBe("Hacksaw Gaming");
    expect(slots.some((slot) => slot.provider === seed!.provider && slot.name === seed!.name), slug).toBe(false);
  }

  for (const slug of gameTypeSlugs) {
    const seed = selected.get(slug)!;
    const type = getVerifiedCatalogGameType(slug);
    expect(type?.gameType, slug).toBe("Slots");
    expect(type?.source, slug).toBe(seed.source);
  }

  for (const slug of collectionSlugs) {
    const seed = selected.get(slug)!;
    const research = getVerifiedCatalogResearch(slug);
    expect(research?.source, slug).toBe(seed.source);
    expect(research?.mechanics, slug).toContain("Сбор символов");
  }

  for (const [slug, expected] of Object.entries(expectedDetails)) {
    const seed = selected.get(slug)!;
    const details = getVerifiedCatalogDetails(slug);
    expect(details?.source, slug).toBe(seed.source);
    expect(details?.field, `${slug} must not invent layout`).toBeUndefined();
    expect(details?.rtp, slug).toBe(expected.rtp);
    expect(details?.maxWin, slug).toBe(expected.maxWin);
    expect(details?.volatility, slug).toBe(expected.volatility);
    if ("releaseDate" in expected) {
      expect(details?.releaseDate, slug).toBe(expected.releaseDate);
    } else {
      expect(details?.releaseDate, `${slug} must not guess release date`).toBeUndefined();
    }
  }

  for (const slug of targetSlugs) {
    const details = getVerifiedCatalogDetails(slug);
    const type = getVerifiedCatalogGameType(slug);
    const research = getVerifiedCatalogResearch(slug);
    const detailFacts = details
      ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length
      : 0;
    const score = detailFacts + (type ? 1 : 0) + (research?.mechanics.length ?? 0);
    expect(score, `${slug} must leave the thin score<=1 bucket`).toBeGreaterThanOrEqual(2);
  }

  const remainingThinHacksaw = catalogSeeds
    .filter((seed) => seed.provider === "Hacksaw Gaming")
    .map((seed) => {
      const details = getVerifiedCatalogDetails(seed.slug);
      const type = getVerifiedCatalogGameType(seed.slug);
      const research = getVerifiedCatalogResearch(seed.slug);
      const detailFacts = details
        ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length
        : 0;
      return {
        slug: seed.slug,
        score: detailFacts + (type ? 1 : 0) + (research?.mechanics.length ?? 0),
      };
    })
    .filter((row) => row.score <= 1);

  expect(remainingThinHacksaw).toHaveLength(0);
  expect(remainingThinHacksaw.some((row) => targetSlugs.has(row.slug))).toBe(false);
});
