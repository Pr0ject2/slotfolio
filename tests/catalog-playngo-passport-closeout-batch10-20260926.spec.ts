import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const targets = [
  "playn-go-count-jokula",
  "playn-go-def-leppard-hysteria",
  "playn-go-derby-wheel",
  "playn-go-diamonds-of-the-realm",
  "playn-go-divina-commedia-i-nove-cerchi",
  "playn-go-divine-showdown",
  "playn-go-eye-of-the-kraken",
  "playn-go-fire-joker-100",
  "playn-go-fire-joker-blitz",
  "playn-go-forge-of-fortunes",
] as const;

test("tenth Play’n GO passport closeout batch is fully populated", () => {
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
    expect(details?.volatilitySource, `${slug} volatility provenance`).toMatch(/^https:\/\//);
  }
});

test("tenth closeout preserves representative verified math and layouts", () => {
  const count = getVerifiedCatalogDetails("playn-go-count-jokula");
  expect(count?.field).toBe("3×3 · 5 линий");
  expect(count?.rtp).toBe("96,22% / 94,23% / 91,23% / 87,23% / 84,23%");
  expect(count?.maxWin).toBe("8 350x");
  expect(count?.volatility).toBe("Средняя");

  const derby = getVerifiedCatalogDetails("playn-go-derby-wheel");
  expect(derby?.field).toBe("3×3 · 5 линий");
  expect(derby?.rtp).toBe("96,20% / 94,20% / 91,20% / 87,20% / 84,20%");
  expect(derby?.maxWin).toBe("2800x");
  expect(derby?.volatility).toBe("Высокая");

  expect(getVerifiedCatalogDetails("playn-go-diamonds-of-the-realm")?.maxWin).toBe("20 000x");
  expect(getVerifiedCatalogDetails("playn-go-divina-commedia-i-nove-cerchi")?.field).toBe("5×3 · 10 линий");
  expect(getVerifiedCatalogDetails("playn-go-divine-showdown")?.maxWin).toBe("5 000x");
  expect(getVerifiedCatalogDetails("playn-go-eye-of-the-kraken")?.maxWin).toBe("500x");
  expect(getVerifiedCatalogDetails("playn-go-fire-joker-100")?.maxWin).toBe("5 000x");
  expect(getVerifiedCatalogDetails("playn-go-fire-joker-blitz")?.maxWin).toBe("6 000x");
  expect(getVerifiedCatalogDetails("playn-go-forge-of-fortunes")?.maxWin).toBe("2500x");
});

test("tenth closeout keeps canonical Play’n GO pages primary", () => {
  const seeds = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));
  for (const slug of targets) {
    expect(getVerifiedCatalogDetails(slug)?.source, slug).toBe(seeds.get(slug)?.source);
  }
});
