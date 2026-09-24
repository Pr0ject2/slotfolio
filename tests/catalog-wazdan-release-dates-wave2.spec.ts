import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getCatalogVerifiedDetailsWazdanScore6Wave } from "../src/lib/catalog-verified-details-wazdan-score6-wave";

const backTo70sSource = "https://wazdan.com/news/new-releases-updates/four-new-games-added-in-may";

const expected = [
  ["wazdan-back-to-the-70s", "2017-05-01", backTo70sSource],
  ["wazdan-relic-hunters-and-the-book-of-faith", "2019-10-04", undefined],
] as const;

test("Wazdan release-date wave2 keeps exact first-party provenance", () => {
  for (const [slug, releaseDate, releaseDateSource] of expected) {
    const seed = catalogSeeds.find((item) => item.slug === slug);
    const direct = getCatalogVerifiedDetailsWazdanScore6Wave(slug);
    const merged = getVerifiedCatalogDetails(slug);

    expect(seed?.provider).toBe("Wazdan");
    expect(direct?.releaseDate).toBe(releaseDate);
    expect(direct?.releaseDateVerifiedAt).toBe("2026-09-23");
    expect(direct?.releaseDateSource).toBe(releaseDateSource);
    expect(direct?.source).toBe(seed?.source);
    expect(merged?.releaseDate).toBe(releaseDate);
  }
});

test("new Wazdan release dates do not rewrite older wave verification dates", () => {
  expect(getCatalogVerifiedDetailsWazdanScore6Wave("wazdan-black-horse")?.verifiedAt).toBe("2026-09-20");
});

test("Wazdan release-date residual drops from twelve to ten", () => {
  const residual = catalogSeeds
    .filter((seed) => seed.provider === "Wazdan")
    .filter((seed) => !getVerifiedCatalogDetails(seed.slug)?.releaseDate);

  expect(residual).toHaveLength(10);
  expect(residual.some((seed) => seed.slug === "wazdan-back-to-the-70s")).toBe(false);
  expect(residual.some((seed) => seed.slug === "wazdan-relic-hunters-and-the-book-of-faith")).toBe(false);
});
