import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { slots } from "../src/lib/data";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const expectedFields = {
  "playn-go-house-of-doom-2-the-crypt": { field: "5×3 · 20 линий", releaseDate: "2021-03-11", source: "https://www.playngo.com/games/house-of-doom-2%3A-the-crypt" },
  "playn-go-hugos-adventure": { field: "5 барабанов · 10 линий", releaseDate: "2019-09-05", source: "https://www.playngo.com/games/hugo's-adventure" },
} as const;

const hugoCartsSlug = "playn-go-hugo-carts";
const targetSlugs = new Set([...Object.keys(expectedFields), hugoCartsSlug]);

function scoreFor(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const detailFacts = details ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length : 0;
  return detailFacts + (type ? 1 : 0) + (research?.mechanics.length ?? 0);
}

test("quality pass 21 preserves its original official facts while allowing later enrichment", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));
  expect(targetSlugs.size).toBe(3);
  expect(catalogSeeds).toHaveLength(900);
  expect(slots).toHaveLength(100);

  for (const [slug, values] of Object.entries(expectedFields)) {
    const seed = selected.get(slug);
    expect(seed, slug).toBeTruthy();
    expect(seed!.source, slug).toBe(values.source);
    const details = getVerifiedCatalogDetails(slug);
    expect(details?.source, slug).toBe(values.source);
    expect(details?.field, slug).toBe(values.field);
    expect(details?.releaseDate, slug).toBe(values.releaseDate);
    expect(getVerifiedCatalogGameType(slug)?.gameType, slug).toBe("Video Slot");
    expect(scoreFor(slug), slug).toBeGreaterThanOrEqual(3);
  }

  const carts = selected.get(hugoCartsSlug);
  expect(carts, hugoCartsSlug).toBeTruthy();
  const cartsDetails = getVerifiedCatalogDetails(hugoCartsSlug);
  expect(cartsDetails?.source, hugoCartsSlug).toBe(carts!.source);
  expect(cartsDetails?.releaseDate, hugoCartsSlug).toBe("2021-08-26");
  expect(cartsDetails?.field, hugoCartsSlug).toBe("1024 способов");
  const cartsResearch = getVerifiedCatalogResearch(hugoCartsSlug);
  expect(cartsResearch?.source, hugoCartsSlug).toBe(carts!.source);
  expect(cartsResearch?.mechanics, hugoCartsSlug).toContain("Способы");
  expect(cartsResearch?.evidence, hugoCartsSlug).toBeTruthy();
  expect(getVerifiedCatalogGameType(hugoCartsSlug)?.gameType, hugoCartsSlug).toBe("Video Slot");
  expect(scoreFor(hugoCartsSlug), hugoCartsSlug).toBeGreaterThanOrEqual(3);
});
