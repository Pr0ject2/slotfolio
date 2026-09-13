import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const expectedRemainingPlayngoSlugs = [
  "playn-go-chambers-of-ancients",
  "playn-go-champions-of-mithrune",
  "playn-go-charlie-chance",
  "playn-go-charlie-chance-and-the-curse-of-cleopatra",
  "playn-go-charlie-chance-in-hell-to-pay",
  "playn-go-clash-of-camelot",
  "playn-go-coin-club",
  "playn-go-colt-lightning",
  "playn-go-colt-lightning-firestorm",
  "playn-go-crazy-cows",
  "playn-go-cursed-moon-power-collection",
  "playn-go-dansband-pa-turne",
  "playn-go-derby-wheel",
  "playn-go-diamonds-of-the-realm",
  "playn-go-grim-muerto",
  "playn-go-legion-gold-victory",
  "playn-go-leprechaun-goes-egypt",
  "playn-go-leprechaun-goes-wild",
  "playn-go-leprechauns-diamond-dig",
  "playn-go-leprechauns-vault",
  "playn-go-lion-saga-odyssey",
  "playn-go-loot-and-labyrinths",
  "playn-go-lord-merlin-and-the-lady-of-the-lake",
  "playn-go-lordi-reel-monsters",
  "playn-go-love-is-in-the-fair",
  "playn-go-love-joker",
  "playn-go-luchamigos",
  "playn-go-mystery-joker-6000",
  "playn-go-nugget-n-nonsense",
  "playn-go-ras-reckoning",
  "playn-go-raging-rex-3",
];

test("report remaining runtime catalog-only enrichment gaps", () => {
  const gaps = catalogSeeds.filter(
    (seed) =>
      !getVerifiedCatalogDetails(seed.slug) &&
      !getVerifiedCatalogGameType(seed.slug) &&
      !getVerifiedCatalogResearch(seed.slug),
  );

  const byProvider = Object.fromEntries(
    Object.entries(
      gaps.reduce<Record<string, number>>((acc, seed) => {
        acc[seed.provider] = (acc[seed.provider] || 0) + 1;
        return acc;
      }, {}),
    ).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "en")),
  );

  console.log(
    "UNVERIFIED_RUNTIME_GAPS",
    JSON.stringify({
      count: gaps.length,
      byProvider,
      records: gaps.map(({ slug, name, provider, source }) => ({ slug, name, provider, source })),
    }),
  );

  expect(gaps.map((seed) => seed.slug)).toEqual(expectedRemainingPlayngoSlugs);
  expect(byProvider).toEqual({ "Play’n GO": expectedRemainingPlayngoSlugs.length });
});
