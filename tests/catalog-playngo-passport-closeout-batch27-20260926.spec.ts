import { expect, test } from "@playwright/test";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const targets = [
  "playn-go-multifruit-81",
  "playn-go-new-year-riches",
  "playn-go-oasis-of-dead",
  "playn-go-octopus-treasure",
  "playn-go-odin-protector-of-realms",
  "playn-go-pack-and-cash",
  "playn-go-pandastic-adventure",
  "playn-go-pandoras-box-of-evil",
  "playn-go-perfect-gems",
  "playn-go-phoenix-reborn",
] as const;

test("twenty-seventh Play’n GO passport closeout batch is fully populated", () => {
  for (const slug of targets) {
    const details = getVerifiedCatalogDetails(slug);
    expect(details?.field, `${slug} field`).toBeTruthy();
    expect(details?.rtp, `${slug} RTP`).toBeTruthy();
    expect(details?.maxWin, `${slug} max win`).toBeTruthy();
    expect(details?.volatility, `${slug} volatility`).toBeTruthy();
    expect(details?.releaseDate, `${slug} release date`).toBeTruthy();
    expect(getVerifiedCatalogGameType(slug)?.gameType, `${slug} game type`).toBeTruthy();
    expect(getVerifiedCatalogResearch(slug)?.mechanics.length, `${slug} mechanics`).toBeGreaterThan(0);
  }
});

test("batch 27 preserves representative sourced facts", () => {
  expect(getVerifiedCatalogDetails("playn-go-multifruit-81")?.field).toBe("81 способ");
  expect(getVerifiedCatalogDetails("playn-go-multifruit-81")?.rtp).toBe("96,55%");
  expect(getVerifiedCatalogDetails("playn-go-odin-protector-of-realms")?.field).toBe("37 позиций · кластеры (4-5-6-7-6-5-4)");
  expect(getVerifiedCatalogDetails("playn-go-pack-and-cash")?.maxWin).toBe("10 000x");
  expect(getVerifiedCatalogDetails("playn-go-perfect-gems")?.rtp).toBe("96,50% / 94,50% / 91,50% / 87,50% / 84,50%");
  expect(getVerifiedCatalogDetails("playn-go-phoenix-reborn")?.maxWin).toBe("5 000x");
});
