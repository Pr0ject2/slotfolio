import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getCatalogVerifiedDetailsNolimit } from "../src/lib/catalog-verified-details-nolimit";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const closeoutDate = "2026-09-26";
const expectedPreRelease = [
  "nolimit-city-bowel-of-beelzebub",
  "nolimit-city-fire-in-the-hole-4",
  "nolimit-city-gator-hunters-2",
  "nolimit-city-six-feet-under",
];

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

test("Nolimit City released catalog cards have complete passports and future cards stay explicit pre-release", () => {
  const nolimitSeeds = catalogSeeds.filter((seed) => seed.provider === "Nolimit City");
  expect(nolimitSeeds).toHaveLength(6);

  const releasedResidual = nolimitSeeds
    .filter((seed) => {
      const releaseDate = getVerifiedCatalogDetails(seed.slug)?.releaseDate;
      return releaseDate && releaseDate <= closeoutDate;
    })
    .map((seed) => ({ slug: seed.slug, missing: missingPassportFields(seed.slug) }))
    .filter((row) => row.missing.length > 0);

  expect(releasedResidual, JSON.stringify(releasedResidual)).toEqual([]);

  const preRelease = nolimitSeeds
    .filter((seed) => {
      const releaseDate = getVerifiedCatalogDetails(seed.slug)?.releaseDate;
      return releaseDate && releaseDate > closeoutDate;
    })
    .map((seed) => seed.slug)
    .sort();

  expect(preRelease).toEqual([...expectedPreRelease].sort());

  for (const slug of expectedPreRelease) {
    const details = getVerifiedCatalogDetails(slug);
    expect(details?.releaseDate, slug).toBeTruthy();
    expect(getVerifiedCatalogGameType(slug)?.gameType, slug).toBe("Slots");

    for (const value of [details?.field, details?.rtp, details?.maxWin, details?.volatility]) {
      expect(value, `${slug} must not use fake zero placeholders`).not.toBe("0");
      expect(value, `${slug} must not use fake zero placeholders`).not.toBe("0%");
      expect(value, `${slug} must not use fake zero placeholders`).not.toBe("0x");
    }
  }
});

test("Nolimit City closeout preserves field-level provenance for newly enriched values", () => {
  const ding = getCatalogVerifiedDetailsNolimit("nolimit-city-ding-dong-death");
  expect(ding?.rtp).toBe("96,08%");
  expect(ding?.rtpSource).toBe("https://nolimitcity.com/games/ding-dong-death");
  expect(getVerifiedCatalogResearch("nolimit-city-ding-dong-death")?.mechanics).toEqual(
    expect.arrayContaining(["xNudge", "xSplit", "xTra"]),
  );

  const gator = getCatalogVerifiedDetailsNolimit("nolimit-city-gator-hunters-2");
  expect(gator?.volatility).toBe("Экстремальная");
  expect(gator?.volatilitySource).toBe("https://www.slotshawk.com/slot-games/gator-hunters-2/");
});
