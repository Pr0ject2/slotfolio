import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const closeoutDate = "2026-09-26";

const expectedProviders = [
  "3 Oaks Gaming",
  "BGaming",
  "Endorphina",
  "Hacksaw Gaming",
  "Nolimit City",
  "Play’n GO",
  "Push Gaming",
  "Wazdan",
] as const;

const expectedPreRelease = [
  "nolimit-city-bowel-of-beelzebub",
  "nolimit-city-fire-in-the-hole-4",
  "nolimit-city-gator-hunters-2",
  "nolimit-city-six-feet-under",
] as const;

function missingPassportFields(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  return [
    !details?.field && "field",
    !details?.rtp && "rtp",
    !details?.maxWin && "maxWin",
    !details?.volatility && "volatility",
    !details?.releaseDate && "releaseDate",
    !getVerifiedCatalogGameType(slug)?.gameType && "gameType",
    !(getVerifiedCatalogResearch(slug)?.mechanics.length) && "mechanics",
  ].filter(Boolean);
}

test("all released catalog cards have complete passports across every selected provider", () => {
  expect(catalogSeeds).toHaveLength(900);

  const providers = [...new Set(catalogSeeds.map((seed) => seed.provider))].sort();
  expect(providers).toEqual([...expectedProviders].sort());

  const preReleaseSet = new Set<string>(expectedPreRelease);
  const releasedResidual = catalogSeeds
    .filter((seed) => !preReleaseSet.has(seed.slug))
    .map((seed) => ({
      slug: seed.slug,
      provider: seed.provider,
      missing: missingPassportFields(seed.slug),
    }))
    .filter((row) => row.missing.length > 0);

  expect(releasedResidual, JSON.stringify(releasedResidual)).toEqual([]);
});

test("global passport guard permits only explicit future Nolimit City releases to remain partially unpublished", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  const actualFuture = catalogSeeds
    .filter((seed) => {
      const releaseDate = getVerifiedCatalogDetails(seed.slug)?.releaseDate;
      return releaseDate && releaseDate > closeoutDate;
    })
    .map((seed) => seed.slug)
    .sort();

  expect(actualFuture).toEqual([...expectedPreRelease].sort());

  for (const slug of expectedPreRelease) {
    const seed = selected.get(slug);
    const details = getVerifiedCatalogDetails(slug);

    expect(seed?.provider, slug).toBe("Nolimit City");
    expect(details?.releaseDate, slug).toBeTruthy();
    expect(details!.releaseDate! > closeoutDate, slug).toBe(true);
    expect(getVerifiedCatalogGameType(slug)?.gameType, slug).toBe("Slots");

    for (const value of [details?.field, details?.rtp, details?.maxWin, details?.volatility]) {
      expect(value, `${slug} must not use fake zero placeholders`).not.toBe("0");
      expect(value, `${slug} must not use fake zero placeholders`).not.toBe("0%");
      expect(value, `${slug} must not use fake zero placeholders`).not.toBe("0x");
    }
  }
});
