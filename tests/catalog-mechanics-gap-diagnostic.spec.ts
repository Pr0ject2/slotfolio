import { test, expect } from "@playwright/test";
import { createCatalogModel } from "../src/lib/catalog-index";

test("diagnose current mechanics coverage gaps", () => {
  const model = createCatalogModel();
  const missing = model.items.filter((item) => item.mechanics.length === 0);
  const byProvider = Object.fromEntries(
    [...new Set(missing.map((item) => item.provider))]
      .sort((a, b) => a.localeCompare(b, "en"))
      .map((provider) => [
        provider,
        missing
          .filter((item) => item.provider === provider)
          .map((item) => ({ slug: item.slug, name: item.name, source: item.source, coverage: item.coverage })),
      ]),
  );
  console.log("MECHANICS_GAPS", JSON.stringify({ count: missing.length, byProvider }));
  expect(model.facets.mechanicsKnown).toBe(698);
  expect(missing).toHaveLength(302);
});
