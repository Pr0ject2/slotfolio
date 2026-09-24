import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

test("all selected Wazdan catalog cards have complete passports", () => {
  const incomplete = catalogSeeds
    .filter((seed) => seed.provider === "Wazdan")
    .map((seed) => {
      const details = getVerifiedCatalogDetails(seed.slug);
      const gameType = getVerifiedCatalogGameType(seed.slug);
      const research = getVerifiedCatalogResearch(seed.slug);
      const missing = [
        !details?.field ? "field" : null,
        !details?.rtp ? "rtp" : null,
        !details?.maxWin ? "maxWin" : null,
        !details?.volatility ? "volatility" : null,
        !details?.releaseDate ? "releaseDate" : null,
        !gameType?.gameType ? "gameType" : null,
        !(research?.mechanics.length) ? "mechanics" : null,
      ].filter(Boolean);
      return { slug: seed.slug, missing };
    })
    .filter((row) => row.missing.length > 0);

  expect(incomplete).toEqual([]);
});

test("Wazdan closeout keeps third-party release dates separate from canonical provider sources", () => {
  const datedViaArchive = [
    "wazdan-9-burning-stars",
    "wazdan-back-to-the-70s",
    "wazdan-black-hawk",
    "wazdan-fenix-play-27",
    "wazdan-fire-bird",
    "wazdan-football-mania",
    "wazdan-hot-777",
    "wazdan-hot-party",
    "wazdan-magic-fruits",
    "wazdan-magic-fruits-27",
    "wazdan-vegas-hot",
  ];

  for (const slug of datedViaArchive) {
    const details = getVerifiedCatalogDetails(slug);
    expect(details?.source, slug).toContain("wazdan.com/games/");
    expect(details?.releaseDateSource, slug).toContain("slotcatalog.com/");
  }

  expect(getVerifiedCatalogDetails("wazdan-relic-hunters-and-the-book-of-faith")?.releaseDate).toBe("2019-10-04");
});
