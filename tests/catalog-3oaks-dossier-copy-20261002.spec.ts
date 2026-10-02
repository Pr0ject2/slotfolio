import { expect, test } from "@playwright/test";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

test("five 3 Oaks records contain game-specific official mechanic copy", () => {
  const expected = [
    "3-oaks-gaming-15-dragon-pearls",
    "3-oaks-gaming-3-african-drums",
    "3-oaks-gaming-3-aztec-temples",
    "3-oaks-gaming-3-china-pots",
    "3-oaks-gaming-3-clover-pots",
  ];

  for (const slug of expected) {
    const research = getVerifiedCatalogResearch(slug);
    expect(research?.source).toContain("3oaks.com/game/");
    expect(research?.mechanicDetails).toBeDefined();
    expect(Object.keys(research?.mechanicDetails ?? {})).toEqual(expect.arrayContaining(research?.mechanics ?? []));
  }
});

test("15 Dragon Pearls explains its Hold & Win sequence", () => {
  const research = getVerifiedCatalogResearch("3-oaks-gaming-15-dragon-pearls");
  expect(research?.mechanicDetails?.["Респины"]).toContain("шестью респинами");
  expect(research?.mechanicDetails?.["Сбор символов"]).toContain("синяя");
});
