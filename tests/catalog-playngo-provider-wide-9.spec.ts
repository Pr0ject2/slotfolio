import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { slots } from "../src/lib/data";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";

const expected = {
  "playn-go-aztec-idols": { field: "≥5 барабанов", releaseDate: "2012-08-11" },
  "playn-go-crazy-cows": { field: "≥5 барабанов", releaseDate: "2014-11-05" },
  "playn-go-dragon-ship": { field: "≥5 барабанов", releaseDate: "2012-10-07" },
  "playn-go-enchanted-crystals": { field: "≥5 барабанов", releaseDate: "2014-05-26" },
  "playn-go-golden-caravan": { field: "≥5 барабанов", releaseDate: "2016-04-20" },
  "playn-go-golden-colts": { field: "≥5 барабанов", releaseDate: "2019-02-26" },
  "playn-go-grim-muerto": { field: "≥5 барабанов", releaseDate: "2016-07-11" },
  "playn-go-holiday-season": { field: "3 позиции на барабане", releaseDate: "2016-11-14" },
  "playn-go-motley-crue": { field: "≥5 барабанов", releaseDate: "2022-12-22" },
  "playn-go-ninja-fruits": { field: "≥5 барабанов", releaseDate: "2013-06-19" },
} as const;

const targetSlugs = new Set(Object.keys(expected));

test("ninth provider-wide Play’n GO batch preserves conservative official reel evidence while allowing later verification", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  expect(targetSlugs.size).toBe(10);
  expect(catalogSeeds).toHaveLength(900);
  expect(slots).toHaveLength(100);
  expect(catalogSeeds.length + slots.length).toBe(1000);

  for (const [slug, values] of Object.entries(expected)) {
    const seed = selected.get(slug);
    expect(seed, slug).toBeTruthy();
    expect(seed!.provider, slug).toBe("Play’n GO");
    expect(slots.some((slot) => slot.provider === seed!.provider && slot.name === seed!.name), slug).toBe(false);

    const details = getVerifiedCatalogDetails(slug);
    expect(details, slug).toBeTruthy();
    expect(details?.source, `${slug} must preserve the official catalog page as primary provenance`).toBe(seed!.source);
    expect(details?.field, slug).toBe(values.field);
    expect(details?.releaseDate, slug).toBe(values.releaseDate);
    expect(details?.verifiedAt, slug).toBeTruthy();
    expect(details && "fieldSource" in details, `${slug} must retain field provenance`).toBe(true);
    if (details && "fieldSource" in details) {
      expect(details.fieldSource, slug).toMatch(/^https:\/\/www\.playngo\.com\//);
    }

    expect(getVerifiedCatalogGameType(slug), `${slug} keeps the already verified game type`).toMatchObject({
      gameType: "Video Slot",
    });
  }
});
