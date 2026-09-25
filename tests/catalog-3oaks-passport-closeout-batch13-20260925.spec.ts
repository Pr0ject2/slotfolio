import { expect, test } from "@playwright/test";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";

const expected = {
  "3-oaks-gaming-3-clover-pots-extra": { rtp: "96,01%", maxWin: "5 000–10 000x (зависит от версии)", volatility: "Средняя–выше средней" },
  "3-oaks-gaming-3-pots-of-egypt": { rtp: "95,5–96% (зависит от версии)", maxWin: "2 000–3 258x (зависит от версии)", volatility: "Средняя" },
  "3-oaks-gaming-4-fortune-clovers": { rtp: "95,75%", maxWin: "5 000–7 435x (зависит от версии)", volatility: "Средняя–высокая" },
  "3-oaks-gaming-chili-coins": { rtp: "95,64%", maxWin: "20 000x", volatility: "Высокая" },
  "3-oaks-gaming-crystal-scarabs": { rtp: "95,6%", maxWin: "3 000–5 664x (зависит от версии)", volatility: "Средняя–высокая" },
} as const;

test("3 Oaks passport closeout batch 13 preserves version-aware specs", () => {
  for (const [slug, values] of Object.entries(expected)) {
    const details = getVerifiedCatalogDetails(slug) as ReturnType<typeof getVerifiedCatalogDetails>;
    expect(details, slug).toBeTruthy();
    for (const [key, value] of Object.entries(values)) {
      expect(details?.[key as keyof typeof details], `${slug} ${key}`).toBe(value);
    }
  }
});
