import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const asOf = "2026-09-26";

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

test("released Nolimit City catalog cards have complete evidence-backed passports", () => {
  const releasedResidual = catalogSeeds
    .filter((seed) => seed.provider === "Nolimit City")
    .filter((seed) => {
      const releaseDate = getVerifiedCatalogDetails(seed.slug)?.releaseDate;
      return releaseDate && releaseDate <= asOf;
    })
    .map((seed) => ({ slug: seed.slug, missing: missingPassportFields(seed.slug) }))
    .filter((row) => row.missing.length > 0);

  expect(releasedResidual, JSON.stringify(releasedResidual)).toEqual([]);
});

test("Nolimit City future-release residual is explicit and contains no fake zero math", () => {
  const future = catalogSeeds
    .filter((seed) => seed.provider === "Nolimit City")
    .filter((seed) => (getVerifiedCatalogDetails(seed.slug)?.releaseDate ?? "") > asOf)
    .map((seed) => ({
      slug: seed.slug,
      missing: missingPassportFields(seed.slug),
      details: getVerifiedCatalogDetails(seed.slug),
    }));

  expect(future.map(({ slug }) => slug).sort()).toEqual([
    "nolimit-city-bowel-of-beelzebub",
    "nolimit-city-fire-in-the-hole-4",
    "nolimit-city-gator-hunters-2",
    "nolimit-city-six-feet-under",
  ]);

  expect(
    future.map(({ slug, missing }) => ({ slug, missing })),
  ).toEqual([
    {
      slug: "nolimit-city-bowel-of-beelzebub",
      missing: ["field", "rtp", "maxWin", "volatility", "mechanics"],
    },
    {
      slug: "nolimit-city-fire-in-the-hole-4",
      missing: ["field", "rtp", "maxWin", "volatility", "mechanics"],
    },
    {
      slug: "nolimit-city-gator-hunters-2",
      missing: ["volatility"],
    },
    {
      slug: "nolimit-city-six-feet-under",
      missing: ["field", "rtp", "maxWin", "volatility"],
    },
  ]);

  for (const { slug, details } of future) {
    expect(details?.rtp, `${slug} must not use placeholder RTP`).not.toBe("0%");
    expect(details?.rtp, `${slug} must not use placeholder RTP`).not.toBe("0,00%");
    expect(details?.maxWin, `${slug} must not use placeholder max win`).not.toBe("0x");
    expect(details?.releaseDate, `${slug} release date`).toBeTruthy();
    expect(getVerifiedCatalogGameType(slug)?.gameType, `${slug} game type`).toBe("Slots");
  }
});

test("released Nolimit City facts preserve current official math and mechanics", () => {
  const ding = getVerifiedCatalogDetails("nolimit-city-ding-dong-death");
  expect(ding?.field).toBe("6×3");
  expect(ding?.rtp).toBe("95,83%");
  expect(ding?.maxWin).toBe("14 280x");
  expect(ding?.volatility).toBe("Экстремальная");
  expect(getVerifiedCatalogResearch("nolimit-city-ding-dong-death")?.mechanics).toEqual(["Bonus Buy", "Action Spin"]);

  const duck = getVerifiedCatalogDetails("nolimit-city-duck-hunters-2");
  expect(duck?.field).toBe("6×6");
  expect(duck?.rtp).toBe("96,00%");
  expect(duck?.maxWin).toBe("40 000x");
  expect(duck?.volatility).toBe("Экстремальная");
  expect(getVerifiedCatalogResearch("nolimit-city-duck-hunters-2")?.mechanics).toEqual(["Способы", "Bonus Buy", "Action Spin"]);
});
