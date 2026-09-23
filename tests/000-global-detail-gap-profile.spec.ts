import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";

test.only("profile catalog detail gaps by provider", () => {
  const byProvider = catalogSeeds.reduce<Record<string, { total: number; field: number; rtp: number; maxWin: number; volatility: number; releaseDate: number }>>((acc, seed) => {
    const details = getVerifiedCatalogDetails(seed.slug);
    const row = acc[seed.provider] ??= { total: 0, field: 0, rtp: 0, maxWin: 0, volatility: 0, releaseDate: 0 };
    row.total += 1;
    if (!details?.field) row.field += 1;
    if (!details?.rtp) row.rtp += 1;
    if (!details?.maxWin) row.maxWin += 1;
    if (!details?.volatility) row.volatility += 1;
    if (!details?.releaseDate) row.releaseDate += 1;
    return acc;
  }, {});

  const ordered = Object.entries(byProvider)
    .sort((a, b) => {
      const gapsA = a[1].field + a[1].rtp + a[1].maxWin + a[1].volatility + a[1].releaseDate;
      const gapsB = b[1].field + b[1].rtp + b[1].maxWin + b[1].volatility + b[1].releaseDate;
      return gapsB - gapsA;
    });

  console.log("GLOBAL_DETAIL_GAPS", JSON.stringify(ordered));
  expect(ordered.length).toBe(-1);
});
