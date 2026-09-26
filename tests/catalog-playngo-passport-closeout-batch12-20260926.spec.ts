import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const targets = [
  "playn-go-fox-mayhem",
  "playn-go-free-reelin-joker",
  "playn-go-free-reelin-joker-1000",
  "playn-go-frozen-gems",
  "playn-go-fu-er-dai",
  "playn-go-game-of-gladiators",
  "playn-go-game-of-gladiators-uprising",
  "playn-go-gargantoonz",
  "playn-go-gates-of-troy",
  "playn-go-helloween",
] as const;

test("twelfth Play’n GO passport closeout batch is fully populated", () => {
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
    if (slug !== "playn-go-free-reelin-joker-1000") {
      expect(details?.maxWinSource, `${slug} max-win provenance`).toMatch(/^https:\/\//);
    }
  }
});

test("twelfth closeout preserves representative math facts", () => {
  expect(getVerifiedCatalogDetails("playn-go-fox-mayhem")?.rtp).toBe("96,20%");
  expect(getVerifiedCatalogDetails("playn-go-fox-mayhem")?.maxWin).toBe("4 000x");
  expect(getVerifiedCatalogDetails("playn-go-free-reelin-joker")?.maxWin).toBe("1 000x");
  expect(getVerifiedCatalogDetails("playn-go-free-reelin-joker-1000")?.rtp).toBe("96,18%");
  expect(getVerifiedCatalogDetails("playn-go-frozen-gems")?.maxWin).toBe("10 000x");
  expect(getVerifiedCatalogDetails("playn-go-fu-er-dai")?.maxWin).toBe("5 000x");
  expect(getVerifiedCatalogDetails("playn-go-game-of-gladiators")?.rtp).toBe("96,42%");

  const uprising = getVerifiedCatalogDetails("playn-go-game-of-gladiators-uprising");
  expect(uprising?.field).toBe("5×4 · 30 линий");
  expect(uprising?.rtp).toBe("96,20% / 94,20% / 91,20% / 87,20% / 84,20%");
  expect(uprising?.maxWin).toBe("6 000x");

  expect(getVerifiedCatalogDetails("playn-go-gargantoonz")?.maxWin).toBe("7 000x");
  expect(getVerifiedCatalogDetails("playn-go-gates-of-troy")?.maxWin).toBe("3 000x");
  expect(getVerifiedCatalogDetails("playn-go-helloween")?.maxWin).toBe("5 000x");
});

test("twelfth closeout keeps canonical Play’n GO pages primary", () => {
  const seeds = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));
  for (const slug of targets) {
    expect(getVerifiedCatalogDetails(slug)?.source, slug).toBe(seeds.get(slug)?.source);
  }
});
