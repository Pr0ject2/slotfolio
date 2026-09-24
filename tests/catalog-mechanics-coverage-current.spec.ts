import { test, expect } from "@playwright/test";
import { createCatalogModel } from "../src/lib/catalog-index";

const expectedUnresolved = [
  "nolimit-city-bowel-of-beelzebub",
  "nolimit-city-fire-in-the-hole-4",
];

test("current public catalog mechanics coverage stays evidence-backed", () => {
  const model = createCatalogModel();
  const unresolved = model.items
    .filter((item) => item.mechanics.length === 0)
    .map((item) => item.slug)
    .sort();

  expect(model.facets.total).toBe(1000);
  expect(model.facets.mechanicsKnown).toBe(998);
  expect(unresolved).toEqual(expectedUnresolved);
});

test("newer mechanics evidence is not blocked by legacy empty research", () => {
  const model = createCatalogModel();
  const bySlug = new Map(model.items.map((item) => [item.slug, item]));

  expect(bySlug.get("push-gaming-iron-phoenix")?.mechanics).toContain("Способы");
  expect(bySlug.get("playn-go-rally-4-riches")?.mechanics).toEqual(expect.arrayContaining(["Линии", "Множители", "Респины"]));
  expect(bySlug.get("playn-go-muerto-en-mictlan")?.mechanics).toContain("Расширяющиеся символы");
  expect(bySlug.get("wazdan-12-coins")?.mechanics).toContain("Сбор символов");
  expect(bySlug.get("nolimit-city-ding-dong-death")?.mechanics).toContain("Каскады");
});
