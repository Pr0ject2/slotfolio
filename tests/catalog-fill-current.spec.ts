import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

test("current provider-wide fill preserves the newest official card facts", () => {
  const seeds = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  const leprechaun = getVerifiedCatalogDetails("playn-go-leprechauns-diamond-dig");
  expect(leprechaun?.field).toBe("5 барабанов");
  expect(leprechaun?.source).toBe(seeds.get("playn-go-leprechauns-diamond-dig")?.source);
  expect(getVerifiedCatalogResearch("playn-go-leprechauns-diamond-dig")?.mechanics).toEqual(
    expect.arrayContaining(["Сбор символов", "Множители"]),
  );

  const wrappin = getVerifiedCatalogDetails("playn-go-playn-go-wrappin-gold");
  expect(wrappin?.field).toBe("5 барабанов");
  expect(wrappin?.source).toBe(seeds.get("playn-go-playn-go-wrappin-gold")?.source);

  const hotelYeti = getVerifiedCatalogDetails("playn-go-hotel-yeti-way");
  expect(hotelYeti?.field).toBe("4096 способов");
  expect(hotelYeti?.maxWin).toBe("30000x");
  expect(hotelYeti?.source).toBe(seeds.get("playn-go-hotel-yeti-way")?.source);

  const mysteryJoker6000 = getVerifiedCatalogDetails("playn-go-mystery-joker-6000");
  expect(mysteryJoker6000?.field).toBe("3×3");
  expect(mysteryJoker6000?.maxWin).toBe("6000x");
  expect(mysteryJoker6000?.source).toBe(seeds.get("playn-go-mystery-joker-6000")?.source);

  const rally = getVerifiedCatalogDetails("playn-go-rally-4-riches");
  expect(rally?.releaseDate).toBe("2020-06-11");
  expect(getVerifiedCatalogResearch("playn-go-rally-4-riches")?.mechanics).toEqual(
    expect.arrayContaining(["Линии", "Множители", "Респины"]),
  );

  expect(getVerifiedCatalogResearch("playn-go-muerto-en-mictlan")?.mechanics).toContain("Расширяющиеся символы");

  const dinopolis = getVerifiedCatalogDetails("push-gaming-dinopolis");
  expect(dinopolis?.rtp).toBe("96,40% / 93,95%");
  expect(dinopolis?.maxWin).toBe("50000x");
  expect(dinopolis?.volatility).toBe("Высокая");
  expect(dinopolis?.source).toBe(seeds.get("push-gaming-dinopolis")?.source);
});
