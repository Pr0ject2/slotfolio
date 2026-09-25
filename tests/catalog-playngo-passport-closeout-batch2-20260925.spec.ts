import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const targets = [
  "playn-go-13th-trial-hercules-abyssways",
  "playn-go-15-crystal-roses-a-tale-of-love",
  "playn-go-24k-dragon",
  "playn-go-3-clown-monty",
  "playn-go-3-clown-monty-ii",
  "playn-go-7-sins",
  "playn-go-alice-cooper-and-the-tome-of-madness",
  "playn-go-animal-madness",
  "playn-go-ankh-of-anubis",
] as const;

test("second Play'n GO passport closeout batch is fully populated", () => {
  const selected = new Set(catalogSeeds.map((seed) => seed.slug));
  expect(targets).toHaveLength(9);

  for (const slug of targets) {
    expect(selected.has(slug), `${slug} must be in the selected catalog`).toBe(true);
    const details = getVerifiedCatalogDetails(slug) as ReturnType<typeof getVerifiedCatalogDetails> & {
      rtpSource?: string;
      maxWinSource?: string;
      volatilitySource?: string;
    };
    const gameType = getVerifiedCatalogGameType(slug);
    const research = getVerifiedCatalogResearch(slug);

    expect(details?.field, `${slug} field`).toBeTruthy();
    expect(details?.rtp, `${slug} RTP`).toBeTruthy();
    expect(details?.maxWin, `${slug} max win`).toBeTruthy();
    expect(details?.volatility, `${slug} volatility`).toBeTruthy();
    expect(details?.releaseDate, `${slug} release date`).toBeTruthy();
    expect(gameType?.gameType, `${slug} game type`).toBeTruthy();
    expect(research?.mechanics.length, `${slug} mechanics`).toBeGreaterThan(0);
    expect(details?.rtpSource, `${slug} RTP provenance`).toMatch(/^https:\/\//);
    expect(details?.volatilitySource, `${slug} volatility provenance`).toMatch(/^https:\/\//);
  }
});

test("second closeout keeps canonical Play'n GO pages primary", () => {
  const seeds = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));
  for (const slug of targets) {
    expect(getVerifiedCatalogDetails(slug)?.source, slug).toBe(seeds.get(slug)?.source);
  }
});
