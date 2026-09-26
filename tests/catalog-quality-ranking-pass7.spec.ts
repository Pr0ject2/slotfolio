import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { slots } from "../src/lib/data";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const targetSlugs = new Set([
  "bgaming-money-maker",
  "endorphina-moofo",
  "endorphina-zalatar",
  "playn-go-chinese-new-year",
  "playn-go-lucky-diamonds",
]);

test("quality pass 7 preserves its original official facts while allowing later enrichment", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  expect(targetSlugs.size).toBe(5);
  expect(catalogSeeds).toHaveLength(900);
  expect(slots).toHaveLength(100);

  for (const slug of targetSlugs) {
    const seed = selected.get(slug);
    expect(seed, slug).toBeTruthy();
    expect(slots.some((slot) => slot.provider === seed!.provider && slot.name === seed!.name), slug).toBe(false);

    const details = getVerifiedCatalogDetails(slug);
    expect(details, slug).toBeTruthy();
    expect(details?.source, slug).toBe(seed!.source);
  }

  const moneyMaker = getVerifiedCatalogDetails("bgaming-money-maker");
  expect(moneyMaker?.field).toBe("3×1 · 1 линия");
  expect(moneyMaker?.rtp).toBe("97,00%");
  expect(moneyMaker?.maxWin).toBe("1 000x");
  expect(moneyMaker?.volatility).toBe("Низкая");
  expect(moneyMaker?.releaseDate).toBe("2026-06-10");

  const moofo = getVerifiedCatalogDetails("endorphina-moofo");
  expect(moofo?.field).toBe("5×3 · 30 линий");
  expect(moofo?.rtp).toBe("96,05%");
  expect(moofo?.maxWin).toBe("1500x");
  expect(moofo?.volatility).toBe("Высокая");

  const zalatar = getVerifiedCatalogDetails("endorphina-zalatar");
  expect(zalatar?.field).toBe("5×3 · 25 линий");
  expect(zalatar?.rtp).toBe("96,03%");
  expect(zalatar?.maxWin).toBe("6600x");
  expect(zalatar?.volatility).toBe("Высокая");

  const chineseNewYear = getVerifiedCatalogDetails("playn-go-chinese-new-year");
  expect(chineseNewYear?.field).toBe("5×3");
  expect(chineseNewYear?.rtp).toBe("96,65%");
  expect(chineseNewYear?.maxWin).toBe("6 250x");
  expect(chineseNewYear?.volatility).toBe("Средняя");
  expect(chineseNewYear?.releaseDate).toBe("2014-04-28");

  const luckyDiamonds = getVerifiedCatalogDetails("playn-go-lucky-diamonds");
  expect(luckyDiamonds?.field).toBe("3 барабана · 1 линия");
  expect(luckyDiamonds?.rtp).toBeUndefined();
  expect(luckyDiamonds?.maxWin).toBeUndefined();
  expect(luckyDiamonds?.volatility).toBeUndefined();
  expect(luckyDiamonds?.releaseDate).toBe("2012-11-29");

  for (const slug of targetSlugs) {
    const details = getVerifiedCatalogDetails(slug);
    const type = getVerifiedCatalogGameType(slug);
    const research = getVerifiedCatalogResearch(slug);
    const detailFacts = details
      ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length
      : 0;
    const score = detailFacts + (type ? 1 : 0) + (research?.mechanics.length ?? 0);
    expect(score, `${slug} must leave the thin score<=1 bucket`).toBeGreaterThanOrEqual(2);
  }
});
