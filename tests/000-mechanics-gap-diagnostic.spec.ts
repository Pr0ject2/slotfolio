import { test } from "@playwright/test";
import { createCatalogModel } from "../src/lib/catalog-index";

test.only("dump mechanics coverage gaps", () => {
  const model = createCatalogModel();
  const missing = model.items.filter((item) => item.mechanics.length === 0);
  const providers = [...new Set(missing.map((item) => item.provider))].sort((a, b) => a.localeCompare(b, "en"));
  const byProvider = Object.fromEntries(
    providers.map((provider) => [
      provider,
      missing
        .filter((item) => item.provider === provider)
        .map((item) => ({ slug: item.slug, name: item.name, source: item.source, coverage: item.coverage })),
    ]),
  );
  console.log("MECHANICS_GAPS", JSON.stringify({ count: missing.length, byProvider }));
  throw new Error(`diagnostic complete: ${missing.length} mechanics gaps`);
});
