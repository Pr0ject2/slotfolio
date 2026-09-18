import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { slots } from "../src/lib/data";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const expected = {
  "push-gaming-boss-bear": { maxWin: "25000x", volatility: "Высокая" },
  "push-gaming-dino-p-d": { maxWin: "10000x", volatility: "Средняя–высокая" },
  "push-gaming-dinopolis": { maxWin: "50000x", volatility: "Высокая" },
  "push-gaming-fat-banker": { maxWin: "25000x", volatility: "Высокая" },
  "push-gaming-generous-jack": { maxWin: "10000x", volatility: "Высокая" },
  "push-gaming-goat-getter": { maxWin: "10000x", volatility: "Средняя–высокая" },
  "push-gaming-happy-bamboo": { maxWin: "6060x", volatility: "Средняя" },
  "push-gaming-hearts-highway": { maxWin: "10000x", volatility: "Средняя–высокая" },
  "push-gaming-henry-the-ape": { maxWin: "61499.9x", volatility: "Высокая" },
  "push-gaming-mad-blast": { maxWin: "10000x", volatility: "Высокая" },
  "push-gaming-mad-cars": { maxWin: "25000x", volatility: "Высокая" },
  "push-gaming-masked-mayhem": { maxWin: "10231x", volatility: "Средняя–высокая" },
  "push-gaming-olympus-unleashed": { maxWin: "2340x", volatility: "Низкая" },
  "push-gaming-power-vault": { maxWin: "4112x", volatility: "Очень низкая" },
  "push-gaming-rat-king": { maxWin: "10000x", volatility: "Средняя" },
  "push-gaming-regal-knights": { maxWin: "4897.8x", volatility: "Низкая" },
  "push-gaming-santas-vault": { maxWin: "8118x", volatility: "Низкая" },
  "push-gaming-shamrock-saints": { maxWin: "10000x", volatility: "Средняя–высокая" },
  "push-gaming-the-grand-show": { maxWin: "10000x", volatility: "Средняя" },
  "push-gaming-the-great-banker": { maxWin: "10317.6x", volatility: "Средняя" },
  "push-gaming-triple-rampage": { maxWin: "5400x", volatility: "Низкая–средняя" },
  "push-gaming-viva-lock-vegas": { maxWin: "13154x", volatility: "Низкая–средняя" },
  "push-gaming-wild-swarm-2": { maxWin: "10000x", volatility: "Высокая" },
  "push-gaming-wild-swarm-3-chocolate-eggs": { maxWin: "23902.8x", volatility: "Низкая–средняя" },
  "push-gaming-wild-swarm-triple-hive": { maxWin: "23902.8x", volatility: "Средняя" },
} as const;

test("quality pass 3 preserves its official Push win and volatility facts while allowing later enrichment", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  expect(Object.keys(expected)).toHaveLength(25);

  for (const [slug, values] of Object.entries(expected)) {
    const seed = selected.get(slug);
    expect(seed, slug).toBeTruthy();
    expect(seed!.provider, slug).toBe("Push Gaming");
    expect(slots.some((slot) => slot.provider === seed!.provider && slot.name === seed!.name), slug).toBe(false);

    const details = getVerifiedCatalogDetails(slug);
    expect(details?.source, slug).toBe(seed!.source);
    expect(details?.maxWin, slug).toBe(values.maxWin);
    expect(details?.volatility, slug).toBe(values.volatility);
    expect(getVerifiedCatalogResearch(slug)?.mechanics.length, slug).toBeGreaterThan(0);
  }

  const remainingThinPush = catalogSeeds
    .filter((seed) => seed.provider === "Push Gaming")
    .map((seed) => {
      const details = getVerifiedCatalogDetails(seed.slug);
      const detailFacts = details
        ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length
        : 0;
      return {
        slug: seed.slug,
        score:
          detailFacts +
          (getVerifiedCatalogGameType(seed.slug) ? 1 : 0) +
          (getVerifiedCatalogResearch(seed.slug)?.mechanics.length ?? 0),
      };
    })
    .filter((row) => row.score <= 1);

  expect(remainingThinPush).toEqual([]);
});
