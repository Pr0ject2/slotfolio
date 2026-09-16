import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const expectedRtp = {
  "push-gaming-big-bamboo": "96,13% / 94,13%",
  "push-gaming-blaze-of-ra": "96,40% / 94,18%",
  "push-gaming-diamond-supernova-100": "96,33% / 94,29%",
  "push-gaming-diamond-supernova-20": "96,33% / 94,22%",
  "push-gaming-diamond-supernova-40": "96,32% / 94,23%",
  "push-gaming-diamond-supernova-5": "96,34% / 94,27%",
  "push-gaming-diamonds-4-the-win": "96,38% / 94,39%",
  "push-gaming-fang-city": "96,33% / 94,37%",
  "push-gaming-fire-pig-push-ways": "96,27% / 94,37%",
  "push-gaming-iron-phoenix": "96,24% / 94,01%",
  "push-gaming-power-paws": "96,25% / 94,32%",
  "push-gaming-retroverse": "96,24% / 94,37%",
  "push-gaming-sea-of-spirits": "96,36% / 94,28%",
  "push-gaming-tarot-treasures": "96,39% / 94,33%",
  "push-gaming-tiki-tumble": "96,49%",
  "push-gaming-tricky-treats": "96,32% / 94,38%",
  "push-gaming-vegas-vault": "96,36% / 94,33%",
} as const;

const expectedField: Partial<Record<keyof typeof expectedRtp, string>> = {
  "push-gaming-blaze-of-ra": "5×4 · 40 линий",
  "push-gaming-diamond-supernova-100": "100 линий",
  "push-gaming-diamond-supernova-20": "20 линий",
  "push-gaming-diamond-supernova-40": "40 линий",
  "push-gaming-diamond-supernova-5": "5 линий",
  "push-gaming-diamonds-4-the-win": "3 барабана · 5 линий",
  "push-gaming-retroverse": "6×9",
  "push-gaming-tiki-tumble": "5×4 · 20 линий",
};

const expectedMaxWin: Partial<Record<keyof typeof expectedRtp, string>> = {
  "push-gaming-big-bamboo": "50 000x",
  "push-gaming-fang-city": "10 000x",
  "push-gaming-iron-phoenix": "12242.10x",
};

const expectedVolatility: Partial<Record<keyof typeof expectedRtp, string>> = {
  "push-gaming-big-bamboo": "Высокая",
  "push-gaming-fang-city": "Средняя",
  "push-gaming-iron-phoenix": "Низкая–средняя",
};

function scoreFor(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const detailFacts = details
    ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length
    : 0;
  return detailFacts + (type ? 1 : 0) + (research?.mechanics.length ?? 0);
}

test("provider-wide Push Gaming pass moves all seventeen score-2 cards to score 3 with official technical facts", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  expect(Object.keys(expectedRtp)).toHaveLength(17);

  for (const [slug, rtp] of Object.entries(expectedRtp) as [keyof typeof expectedRtp, string][]) {
    const seed = selected.get(slug);
    expect(seed, slug).toBeTruthy();
    expect(seed!.provider, slug).toBe("Push Gaming");

    const details = getVerifiedCatalogDetails(slug);
    expect(details, slug).toBeTruthy();
    expect(details?.rtp, slug).toBe(rtp);
    expect(details?.source, slug).toBe(seed!.source);
    expect(details?.verifiedAt, slug).toBe("2026-09-16");

    if (expectedField[slug]) expect(details?.field, slug).toBe(expectedField[slug]);
    if (expectedMaxWin[slug]) expect(details?.maxWin, slug).toBe(expectedMaxWin[slug]);
    if (expectedVolatility[slug]) expect(details?.volatility, slug).toBe(expectedVolatility[slug]);

    expect(scoreFor(slug), slug).toBe(3);
  }
});
