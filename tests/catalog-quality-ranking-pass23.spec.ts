import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { slots } from "../src/lib/data";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const expected = {
  "playn-go-legacy-of-egypt": {
    field: "5 барабанов · 30 линий",
    releaseDate: "2018-04-24",
    source: "https://www.playngo.com/games/legacy-of-egypt",
    fieldSource: "https://www.playngo.com/posts/play-n-go-unearths-new-legacy-of-egypt-slot",
  },
  "playn-go-legion-gold-unleashed": {
    field: "5×3 · 25 линий",
    maxWin: "3000x",
    releaseDate: "2024-02-29",
    source: "https://www.playngo.com/games/legion-gold-unleashed",
    fieldSource: "https://www.playngo.com/posts/legion-gold-unleashed-online-slot-review",
    maxWinSource: "https://www.playngo.com/post/legion-gold-unleashed-online-slot-review",
  },
  "playn-go-legion-gold-and-the-sphinx-of-dead": {
    field: "5×3",
    releaseDate: "2024-10-31",
    source: "https://www.playngo.com/games/legion-gold-and-the-sphinx-of-dead",
  },
} as const;

const targetSlugs = new Set(Object.keys(expected));

function scoreFor(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const detailFacts = details
    ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length
    : 0;
  return detailFacts + (type ? 1 : 0) + (research?.mechanics.length ?? 0);
}

test("quality pass 23 preserves exact official layouts while allowing later enrichment", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  expect(targetSlugs.size).toBe(3);
  expect(catalogSeeds).toHaveLength(900);
  expect(slots).toHaveLength(100);
  expect(catalogSeeds.length + slots.length).toBe(1000);

  for (const [slug, values] of Object.entries(expected)) {
    const seed = selected.get(slug);
    expect(seed, slug).toBeTruthy();
    expect(seed!.provider, slug).toBe("Play’n GO");
    expect(seed!.source, slug).toBe(values.source);
    expect(slots.some((slot) => slot.provider === seed!.provider && slot.name === seed!.name), slug).toBe(false);

    const details = getVerifiedCatalogDetails(slug);
    expect(details, slug).toBeTruthy();
    expect(details?.source, slug).toBe(values.source);
    expect(details?.field, slug).toBe(values.field);
    expect(details?.releaseDate, slug).toBe(values.releaseDate);

    if ("maxWin" in values) {
      expect(details?.maxWin, slug).toBe(values.maxWin);
      expect(details && "maxWinSource" in details, `${slug} must retain separate official max-win provenance`).toBe(true);
      if (details && "maxWinSource" in details) {
        expect(details.maxWinSource, slug).toBe(values.maxWinSource);
      }
    }

    if ("fieldSource" in values) {
      expect(details && "fieldSource" in details, `${slug} must retain the separate official field source`).toBe(true);
      if (details && "fieldSource" in details) {
        expect(details.fieldSource, slug).toBe(values.fieldSource);
      }
    } else {
      expect(details && "fieldSource" in details, `${slug} must not invent a second field source`).toBe(false);
    }

    expect(getVerifiedCatalogGameType(slug)?.gameType, slug).toBe("Video Slot");
    expect(scoreFor(slug), `${slug} must remain at least score 3`).toBeGreaterThanOrEqual(3);
  }
});
