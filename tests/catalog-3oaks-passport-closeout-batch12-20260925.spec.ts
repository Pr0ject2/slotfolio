import { expect, test } from "@playwright/test";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";

const expected = {
  "3-oaks-gaming-coin-lamp": { field: "расширяемое поле · до 24 позиций", rtp: "95,63%", maxWin: "2 000x", volatility: "Высокая–очень высокая" },
  "3-oaks-gaming-coin-princess-x1000": { rtp: "95,72%", maxWin: "20 000x", volatility: "Высокая" },
  "3-oaks-gaming-coin-up-lightning": { rtp: "95,67%", maxWin: "500x", volatility: "Средняя" },
  "3-oaks-gaming-coin-up-hot-fire": { rtp: "95,75%", maxWin: "500–1 212x (зависит от версии)", volatility: "Средняя–высокая" },
  "3-oaks-gaming-coin-volcano-2": { rtp: "95,66%", maxWin: "5 000x (Boost Bonus; Grand 500x)", volatility: "Средняя–высокая" },
  "3-oaks-gaming-coin-express": { rtp: "96–97,01% (зависит от версии)", maxWin: "5 000x", volatility: "Высокая" },
} as const;

test("3 Oaks passport closeout batch 12 preserves coin-series specs", () => {
  for (const [slug, values] of Object.entries(expected)) {
    const details = getVerifiedCatalogDetails(slug) as ReturnType<typeof getVerifiedCatalogDetails>;
    expect(details, slug).toBeTruthy();
    for (const [key, value] of Object.entries(values)) {
      expect(details?.[key as keyof typeof details], `${slug} ${key}`).toBe(value);
    }
  }
});
