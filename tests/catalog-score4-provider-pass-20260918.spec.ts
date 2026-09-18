import { test, expect } from "@playwright/test";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

test("3 Oaks provider pass preserves verified technical facts and richer mechanics", () => {
  const africanDrums = getVerifiedCatalogDetails("3-oaks-gaming-4-african-drums");
  expect(africanDrums?.maxWin).toBe("20000x");
  expect(africanDrums?.volatility).toBe("Высокая");

  const egyptPower = getVerifiedCatalogDetails("3-oaks-gaming-egypt-power-x1000");
  expect(egyptPower?.maxWin).toBe("40000x");
  expect(egyptPower?.volatility).toBe("Высокая");

  const egyptMechanics = getVerifiedCatalogResearch("3-oaks-gaming-egypt-power-x1000")?.mechanics ?? [];
  expect(egyptMechanics).toEqual(expect.arrayContaining(["Каскады", "Множители", "Mystery Symbols"]));

  const pearlsMechanics = getVerifiedCatalogResearch("3-oaks-gaming-15-dragon-pearls")?.mechanics ?? [];
  expect(pearlsMechanics).toEqual(
    expect.arrayContaining(["Линии", "Респины", "Блокировка символов", "Сбор символов"]),
  );

  expect(getVerifiedCatalogResearch("3-oaks-gaming-hot-fire-fruits")?.mechanics).toEqual(["Линии"]);
});

test("Push provider pass keeps official RTP variants and feature mechanics", () => {
  const razorWays = getVerifiedCatalogDetails("push-gaming-razor-ways");
  expect(razorWays?.rtp).toBe("96,36%");
  expect(razorWays?.maxWin).toBe("25 000x");
  expect(razorWays?.volatility).toBe("Средняя–высокая");
  expect(getVerifiedCatalogResearch("push-gaming-razor-ways")?.mechanics).toEqual(
    expect.arrayContaining(["Способы", "Каскады", "Mystery Symbols", "Расширяющиеся барабаны", "Множители"]),
  );

  expect(getVerifiedCatalogDetails("push-gaming-tiki-tumble")?.maxWin).toBe("18 278x");

  const neon = getVerifiedCatalogDetails("push-gaming-neon-cash-city");
  expect(neon?.rtp).toBe("96,35% / 94,37%");
  expect(neon?.maxWin).toBe("9395.5x");
  expect(neon?.volatility).toBe("Средняя–высокая");

  expect(getVerifiedCatalogResearch("push-gaming-big-bamboo")?.mechanics).toEqual(
    expect.arrayContaining(["Mystery Symbols", "Респины", "Множители", "Сбор символов"]),
  );
});
