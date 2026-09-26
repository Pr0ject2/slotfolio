import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const targets = [
  "playn-go-easter-eggs",
  "playn-go-fat-frankies",
  "playn-go-fate-of-dead-blitzways",
  "playn-go-fates-fortune",
  "playn-go-feline-fury",
  "playn-go-fire-joker-freeze",
  "playn-go-fire-toad",
  "playn-go-fire-toad-2",
  "playn-go-firefly-frenzy",
  "playn-go-forge-of-gems",
] as const;

test("eleventh Play’n GO passport closeout batch is fully populated", () => {
  const selected = new Set(catalogSeeds.map((seed) => seed.slug));
  expect(targets).toHaveLength(10);

  for (const slug of targets) {
    expect(selected.has(slug), `${slug} must be in the selected catalog`).toBe(true);
    const details = getVerifiedCatalogDetails(slug) as ReturnType<typeof getVerifiedCatalogDetails> & {
      fieldSource?: string;
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
    expect(details?.maxWinSource, `${slug} max-win provenance`).toMatch(/^https:\/\//);
    expect(details?.volatilitySource, `${slug} volatility provenance`).toMatch(/^https:\/\//);
  }
});

test("eleventh closeout preserves representative math and layouts", () => {
  expect(getVerifiedCatalogDetails("playn-go-easter-eggs")?.rtp).toBe("96,75%");
  expect(getVerifiedCatalogDetails("playn-go-easter-eggs")?.maxWin).toBe("500x");

  const fat = getVerifiedCatalogDetails("playn-go-fat-frankies");
  expect(fat?.field).toBe("5×3 · 243 способа");
  expect(fat?.maxWin).toBe("6 000x");

  expect(getVerifiedCatalogDetails("playn-go-fate-of-dead-blitzways")?.rtp).toBe("96,20% / 94,20% / 91,20% / 87,20% / 84,20%");
  expect(getVerifiedCatalogDetails("playn-go-fate-of-dead-blitzways")?.maxWin).toBe("20 000x");

  const fortune = getVerifiedCatalogDetails("playn-go-fates-fortune");
  expect(fortune?.field).toBe("5×3 · 10 линий");
  expect(fortune?.maxWin).toBe("5 000x");

  expect(getVerifiedCatalogDetails("playn-go-fire-joker-freeze")?.maxWin).toBe("1 000x");
  expect(getVerifiedCatalogDetails("playn-go-fire-toad")?.maxWin).toBe("5 000x");
  expect(getVerifiedCatalogDetails("playn-go-fire-toad-2")?.maxWin).toBe("5 300x");
  expect(getVerifiedCatalogDetails("playn-go-firefly-frenzy")?.maxWin).toBe("10 000x");
  expect(getVerifiedCatalogDetails("playn-go-forge-of-gems")?.maxWin).toBe("20 000x");
});

test("eleventh closeout keeps canonical Play’n GO pages primary", () => {
  const seeds = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));
  for (const slug of targets) {
    expect(getVerifiedCatalogDetails(slug)?.source, slug).toBe(seeds.get(slug)?.source);
  }
});
