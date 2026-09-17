import { test, expect } from "@playwright/test";
import { createCatalogModel } from "../src/lib/catalog-index";

const expectedUnresolved = [
  "nolimit-city-bowel-of-beelzebub",
  "nolimit-city-fire-in-the-hole-4",
  "nolimit-city-gator-hunters-2",
  "nolimit-city-six-feet-under",
  "playn-go-muerto-en-mictlan",
];

test("current public catalog mechanics coverage stays evidence-backed", () => {
  const model = createCatalogModel();
  const unresolved = model.items
    .filter((item) => item.mechanics.length === 0)
    .map((item) => item.slug)
    .sort();

  expect(model.facets.total).toBe(1000);
  expect(model.facets.mechanicsKnown).toBe(995);
  expect(unresolved).toEqual(expectedUnresolved);
});

test("newer mechanics evidence is not blocked by legacy empty research", () => {
  const model = createCatalogModel();
  const bySlug = new Map(model.items.map((item) => [item.slug, item]));

  expect(bySlug.get("push-gaming-iron-phoenix")?.mechanics).toEqual(["Способы"]);
  expect(bySlug.get("playn-go-rally-4-riches")?.mechanics).toEqual(["Линии"]);
  expect(bySlug.get("wazdan-12-coins")?.mechanics).toEqual(["Сбор символов"]);
  expect(bySlug.get("nolimit-city-ding-dong-death")?.mechanics).toEqual(["Каскады"]);
});
