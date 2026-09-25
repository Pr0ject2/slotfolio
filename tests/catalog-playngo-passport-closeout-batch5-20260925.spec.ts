import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const targets = [
  "playn-go-book-of-dead-go-collect",
  "playn-go-bubblin-riches",
  "playn-go-buildin-more-bucks",
  "playn-go-bull-in-a-china-shop",
  "playn-go-bull-in-a-rodeo",
  "playn-go-bullion-xpress",
  "playn-go-candy-island-princess",
  "playn-go-canine-carnage",
  "playn-go-captain-glum-pirate-hunter",
  "playn-go-captain-xenos-earth-adventure",
] as const;

test("fifth Play'n GO passport closeout batch is fully populated", () => {
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

  const canine = getVerifiedCatalogDetails("playn-go-canine-carnage") as ReturnType<typeof getVerifiedCatalogDetails> & { fieldSource?: string };
  const captainGlum = getVerifiedCatalogDetails("playn-go-captain-glum-pirate-hunter") as ReturnType<typeof getVerifiedCatalogDetails> & { fieldSource?: string };
  expect(canine?.field).toBe("5×3 · 243 способа");
  expect(canine?.fieldSource).toMatch(/^https:\/\//);
  expect(captainGlum?.field).toBe("5×3–5 · 243 способа");
  expect(captainGlum?.fieldSource).toMatch(/^https:\/\//);
});

test("fifth closeout preserves representative math facts", () => {
  const book = getVerifiedCatalogDetails("playn-go-book-of-dead-go-collect");
  expect(book?.rtp).toBe("96,20% / 94,20% / 91,20% / 87,20% / 84,20%");
  expect(book?.maxWin).toBe("10 000x");
  expect(book?.volatility).toBe("Высокая");

  expect(getVerifiedCatalogDetails("playn-go-captain-glum-pirate-hunter")?.maxWin).toBe("9 000x");
});

test("fifth closeout keeps canonical Play'n GO pages primary", () => {
  const seeds = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));
  for (const slug of targets) {
    expect(getVerifiedCatalogDetails(slug)?.source, slug).toBe(seeds.get(slug)?.source);
  }
});
