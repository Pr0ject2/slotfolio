import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const targets = [
  "playn-go-big-win-cat",
  "playn-go-big-win-cat-pawsperity",
  "playn-go-black-mamba",
  "playn-go-blazin-bullfrog",
  "playn-go-blinged",
  "playn-go-boat-bonanza",
  "playn-go-boat-bonanza-christmas",
  "playn-go-boat-bonanza-colossal-catch",
  "playn-go-boat-bonanza-croconile",
  "playn-go-boat-bonanza-down-under",
] as const;

test("fourth Play'n GO passport closeout batch is fully populated", () => {
  const selected = new Set(catalogSeeds.map((seed) => seed.slug));
  expect(targets).toHaveLength(10);

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
    expect(details?.maxWinSource, `${slug} max-win provenance`).toMatch(/^https:\/\//);
    expect(details?.volatilitySource, `${slug} volatility provenance`).toMatch(/^https:\/\//);
  }
});

test("fourth closeout keeps canonical Play'n GO pages primary", () => {
  const seeds = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));
  for (const slug of targets) {
    expect(getVerifiedCatalogDetails(slug)?.source, slug).toBe(seeds.get(slug)?.source);
  }
});

test("Boat Bonanza uses the published Play'n GO math profile", () => {
  const details = getVerifiedCatalogDetails("playn-go-boat-bonanza") as ReturnType<typeof getVerifiedCatalogDetails> & {
    rtpSource?: string;
    volatilitySource?: string;
  };
  expect(details?.rtp).toBe("96,21% / 94,25% / 91,25% / 87,24% / 84,22%");
  expect(details?.volatility).toBe("Высокая");
  expect(details?.rtpSource).toContain("Boat%20Bonanza%20Rules%20and%20Settings.pdf");
  expect(details?.volatilitySource).toContain("Boat%20Bonanza%20Rules%20and%20Settings.pdf");
});
