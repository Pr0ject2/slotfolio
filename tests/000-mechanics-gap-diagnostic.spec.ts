import { test } from "@playwright/test";
import { createCatalogModel } from "../src/lib/catalog-index";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";

test.only("classify mechanics gaps by already verified field evidence", () => {
  const model = createCatalogModel();
  const missing = model.items.filter((item) => item.mechanics.length === 0);
  const providers = [...new Set(missing.map((item) => item.provider))].sort((a, b) => a.localeCompare(b, "en"));
  const byProvider = Object.fromEntries(
    providers.map((provider) => {
      const rows = missing.filter((item) => item.provider === provider).map((item) => {
        const details = getVerifiedCatalogDetails(item.slug);
        const field = details?.field ?? "";
        const evidence = /(?:линии|линий|линия|paylines?|lines?)/i.test(field)
          ? "lines"
          : /(?:ways?|способ)/i.test(field)
            ? "ways"
            : "none";
        return { slug: item.slug, field, evidence, source: details?.source ?? item.source };
      });
      return [provider, {
        total: rows.length,
        lines: rows.filter((row) => row.evidence === "lines").length,
        ways: rows.filter((row) => row.evidence === "ways").length,
        none: rows.filter((row) => row.evidence === "none").length,
        unresolved: rows.filter((row) => row.evidence === "none"),
      }];
    }),
  );
  console.log("MECHANICS_FIELD_EVIDENCE", JSON.stringify({ count: missing.length, byProvider }));
  throw new Error("mechanics field evidence diagnostic complete");
});
