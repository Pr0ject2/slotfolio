import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const targets = [
  "playn-go-ankh-of-anubis-awakening",
  "playn-go-annihilator",
  "playn-go-athena-ascending",
  "playn-go-aztec-idols",
  "playn-go-aztec-warrior-princess",
  "playn-go-bakers-treat",
  "playn-go-banana-rock",
  "playn-go-banana-rush",
  "playn-go-banquet-of-dead",
  "playn-go-bao-shi",
  "playn-go-barn-busters",
  "playn-go-baron-lord-of-saturday",
  "playn-go-battle-royal",
  "playn-go-beasts-of-fire",
  "playn-go-beasts-of-fire-maximum",
  "playn-go-big-win-777",
] as const;

test("third Play'n GO passport closeout batch is fully populated", () => {
  const selected = new Set(catalogSeeds.map((seed) => seed.slug));
  expect(targets).toHaveLength(16);

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

  const athena = getVerifiedCatalogDetails("playn-go-athena-ascending") as ReturnType<typeof getVerifiedCatalogDetails> & { fieldSource?: string };
  const bananaRock = getVerifiedCatalogDetails("playn-go-banana-rock") as ReturnType<typeof getVerifiedCatalogDetails> & { fieldSource?: string };
  expect(athena?.fieldSource).toMatch(/^https:\/\//);
  expect(bananaRock?.fieldSource).toMatch(/^https:\/\//);
});

test("third closeout keeps canonical Play'n GO pages primary", () => {
  const seeds = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));
  for (const slug of targets) {
    expect(getVerifiedCatalogDetails(slug)?.source, slug).toBe(seeds.get(slug)?.source);
  }
});
