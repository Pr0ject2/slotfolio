import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const cases = [
  ["bgaming-3-lucky-monkeys-hold-and-win", "2026-09-28"],
  ["endorphina-3-golden-chests", "2026-09-03"],
  ["playn-go-nsync-pop", "2022-06-30"],
  ["wazdan-12-bells", "2024-11-06"],
  ["bgaming-alien-fruits-3", "2026-07-01"],
] as const;

for (const [slug, releaseDate] of cases) {
  test(`${slug} keeps the verified passport fields`, async ({ page }) => {
    expect(catalogSeeds.some((seed) => seed.slug === slug)).toBe(true);
    const details = getVerifiedCatalogDetails(slug);
    const gameType = getVerifiedCatalogGameType(slug);
    const research = getVerifiedCatalogResearch(slug);
    expect(details?.releaseDate).toBe(releaseDate);
    expect(details?.field).toBeTruthy();
    expect(details?.rtp).toBeTruthy();
    expect(details?.maxWin).toBeTruthy();
    expect(details?.volatility).toBeTruthy();
    expect(gameType?.gameType).toBeTruthy();
    expect(research?.mechanics.length).toBeGreaterThan(0);

    await page.goto(`/slots/catalog/${slug}`);
    await expect(page.locator(".catalog-record-facts")).toContainText("Дата релиза");
    await expect(page.locator(".catalog-record-facts")).toContainText(releaseDate.slice(0, 4));
    await expect(page.locator(".catalog-record-facts")).toContainText(gameType!.gameType);
  });
}
