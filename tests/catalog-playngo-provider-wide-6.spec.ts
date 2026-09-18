import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { slots } from "../src/lib/data";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const targetSlugs = [
  "playn-go-banana-rock",
  "playn-go-bullion-xpress",
  "playn-go-doom-of-egypt",
  "playn-go-fates-fortune",
  "playn-go-game-of-gladiators-uprising",
  "playn-go-golden-legend",
  "playn-go-legion-gold",
  "playn-go-legion-gold-and-the-throne-of-dead",
  "playn-go-legion-gold-reckoning",
  "playn-go-lord-merlin-and-the-lady-of-the-lake",
  "playn-go-love-joker",
  "playn-go-mount-m",
  "playn-go-mystery-joker-6000",
  "playn-go-nugget-n-nonsense",
  "playn-go-pearls-of-india",
  "playn-go-prissy-princess",
  "playn-go-rage-to-riches",
] as const;

test("sixth provider-wide Play’n GO batch preserves its seventeen official research records", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));
  expect(targetSlugs).toHaveLength(17);
  expect(catalogSeeds).toHaveLength(900);
  expect(slots).toHaveLength(100);

  for (const slug of targetSlugs) {
    const seed = selected.get(slug);
    expect(seed, slug).toBeTruthy();
    expect(seed!.provider, slug).toBe("Play’n GO");
    const research = getVerifiedCatalogResearch(slug);
    expect(research?.source, slug).toBe(seed!.source);
    expect(research?.mechanics.length, slug).toBeGreaterThan(0);
    expect(research?.evidence, slug).toBeTruthy();
    expect(getVerifiedCatalogGameType(slug)?.gameType, slug).toBe("Video Slot");
  }
});
