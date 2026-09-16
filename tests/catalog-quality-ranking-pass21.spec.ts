import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { slots } from "../src/lib/data";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const expectedFields = {
  "playn-go-house-of-doom-2-the-crypt": {
    field: "5×3 · 20 линий",
    releaseDate: "2021-03-11",
    source: "https://www.playngo.com/games/house-of-doom-2%3A-the-crypt",
    fieldSource: "https://www.playngo.com/post/topfive-halloween-games",
  },
  "playn-go-hugos-adventure": {
    field: "5 барабанов · 10 линий",
    releaseDate: "2019-09-05",
    source: "https://www.playngo.com/games/hugo's-adventure",
  },
} as const;

const hugoCartsSlug = "playn-go-hugo-carts";
const targetSlugs = new Set([...Object.keys(expectedFields), hugoCartsSlug]);

function scoreFor(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const detailFacts = details
    ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length
    : 0;
  return detailFacts + (type ? 1 : 0) + (research?.mechanics.length ?? 0);
}

test("quality pass 21 adds one exact official fact to three more score-2 Play’n GO records", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  expect(targetSlugs.size).toBe(3);
  expect(catalogSeeds).toHaveLength(900);
  expect(slots).toHaveLength(100);
  expect(catalogSeeds.length + slots.length).toBe(1000);

  for (const [slug, values] of Object.entries(expectedFields)) {
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
    expect(details?.rtp, `${slug} must not invent RTP`).toBeUndefined();
    expect(details?.maxWin, `${slug} must not invent max win`).toBeUndefined();
    expect(details?.volatility, `${slug} must not invent volatility`).toBeUndefined();

    if ("fieldSource" in values) {
      expect(details && "fieldSource" in details, `${slug} must retain the separate official field source`).toBe(true);
      if (details && "fieldSource" in details) {
        expect(details.fieldSource, slug).toBe(values.fieldSource);
      }
    } else {
      expect(details && "fieldSource" in details, `${slug} must not invent a second field source`).toBe(false);
    }

    expect(getVerifiedCatalogResearch(slug), `${slug} must not invent a mechanic`).toBeUndefined();
    expect(getVerifiedCatalogGameType(slug)?.gameType, slug).toBe("Video Slot");
    expect(scoreFor(slug), `${slug} must move from score 2 to score 3`).toBe(3);
  }

  const carts = selected.get(hugoCartsSlug);
  expect(carts, hugoCartsSlug).toBeTruthy();
  expect(carts!.provider, hugoCartsSlug).toBe("Play’n GO");
  expect(carts!.source, hugoCartsSlug).toBe("https://www.playngo.com/games/hugo-carts");
  expect(slots.some((slot) => slot.provider === carts!.provider && slot.name === carts!.name), hugoCartsSlug).toBe(false);

  const cartsDetails = getVerifiedCatalogDetails(hugoCartsSlug);
  expect(cartsDetails, hugoCartsSlug).toBeTruthy();
  expect(cartsDetails?.source, hugoCartsSlug).toBe(carts!.source);
  expect(cartsDetails?.releaseDate, hugoCartsSlug).toBe("2021-08-26");
  expect(cartsDetails?.field, `${hugoCartsSlug} must not invent a field`).toBeUndefined();
  expect(cartsDetails?.rtp, `${hugoCartsSlug} must not invent RTP`).toBeUndefined();
  expect(cartsDetails?.maxWin, `${hugoCartsSlug} must not invent max win`).toBeUndefined();
  expect(cartsDetails?.volatility, `${hugoCartsSlug} must not invent volatility`).toBeUndefined();

  const cartsResearch = getVerifiedCatalogResearch(hugoCartsSlug);
  expect(cartsResearch?.source, hugoCartsSlug).toBe(carts!.source);
  expect(cartsResearch?.mechanics, hugoCartsSlug).toEqual(["Способы"]);
  expect(cartsResearch?.evidence, hugoCartsSlug).toMatch(/ways|1,024/i);
  expect(getVerifiedCatalogGameType(hugoCartsSlug)?.gameType, hugoCartsSlug).toBe("Video Slot");
  expect(scoreFor(hugoCartsSlug), `${hugoCartsSlug} must move from score 2 to score 3`).toBe(3);
});
