import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const cases = [
  ["3-oaks-gaming-3-super-coin-volcanoes", "3 Super Coin Volcanoes"],
  ["bgaming-multi-rush", "Multi Rush"],
  ["hacksaw-gaming-chaos-crew-3", "Chaos Crew 3"],
  ["playn-go-animal-madness", "Animal Madness"],
  ["push-gaming-blaze-of-ra", "Blaze of Ra"],
] as const;

test("cards 111-115 retain first-party dossier coverage", () => {
  for (const [slug] of cases) {
    expect(catalogSeeds.some((seed) => seed.slug === slug)).toBe(true);
    const details = getVerifiedCatalogDetails(slug);
    const gameType = getVerifiedCatalogGameType(slug);
    const research = getVerifiedCatalogResearch(slug);
    expect(details?.source).toMatch(/^https:\/\//);
    expect(gameType?.gameType).toBeTruthy();
    expect(research?.mechanics.length).toBeGreaterThan(0);
  }
  expect(getVerifiedCatalogResearch("hacksaw-gaming-chaos-crew-3")?.mechanics).toEqual(
    expect.arrayContaining(["EPIC DROP™", "Множители", "Free Spins"]),
  );
  expect(getVerifiedCatalogResearch("playn-go-animal-madness")?.mechanics).toEqual(
    expect.arrayContaining(["Каскады", "Удаление символов", "Шкала прогресса", "Wilds"]),
  );
});

for (const [slug, name] of cases) {
  test(`${name} catalog page renders`, async ({ page }) => {
    await page.goto(`/slots/catalog/${slug}`);
    await expect(page.locator("h1")).toContainText(name);
    await expect(page.locator(".catalog-record-facts")).toBeVisible();
  });
}
