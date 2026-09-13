import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { slots } from "../src/lib/data";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";

const finalSlugs = [
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

const gridSlots = new Set([
  "playn-go-charlie-chance-and-the-curse-of-cleopatra",
  "playn-go-lordi-reel-monsters",
]);
const unknownGameType = new Set(["playn-go-coin-club", "playn-go-ras-reckoning"]);

test("final Play’n GO gap records stay selected and preserve exact official sources", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  for (const slug of finalSlugs) {
    const seed = selected.get(slug);
    expect(seed, slug).toBeTruthy();
    expect(slots.some((slot) => slot.provider === seed!.provider && slot.name === seed!.name), slug).toBe(false);
    expect(getVerifiedCatalogDetails(slug)?.source, slug).toBe(seed!.source);

    const type = getVerifiedCatalogGameType(slug);
    if (unknownGameType.has(slug)) {
      expect(type, `${slug} official Game Type is unpublished`).toBeUndefined();
    } else {
      expect(type?.source, slug).toBe(seed!.source);
      expect(type?.gameType, slug).toBe(gridSlots.has(slug) ? "Grid Slot" : "Video Slot");
    }
  }
});
