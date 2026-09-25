import { expect, test } from "@playwright/test";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";

const expected = {
  "3-oaks-gaming-power-sun": { rtp: "96,01%", maxWin: "3 000x", volatility: "Средняя" },
  "3-oaks-gaming-power-sun-xxl": { rtp: "95%", maxWin: "4 288x", volatility: "Высокая" },
  "3-oaks-gaming-purple-diamond": { rtp: "96,12%", maxWin: "5 000x", volatility: "Высокая" },
  "3-oaks-gaming-space-coins": { rtp: "96,01%", maxWin: "3 000x", volatility: "Высокая" },
  "3-oaks-gaming-supreme-diamond-xxl": { rtp: "96,34%", maxWin: "1 000x", volatility: "Высокая" },
  "3-oaks-gaming-rush-for-gold": { rtp: "95,90%", maxWin: "8 518x", volatility: "Высокая" },
} as const;

test("3 Oaks passport closeout batch 9 preserves verified math facts", () => {
  for (const [slug, values] of Object.entries(expected)) {
    const details = getVerifiedCatalogDetails(slug) as (ReturnType<typeof getVerifiedCatalogDetails> & {
      rtpSource?: string;
      maxWinSource?: string;
      volatilitySource?: string;
    });
    expect(details, slug).toBeTruthy();
    for (const [key, value] of Object.entries(values)) {
      expect(details?.[key as keyof typeof details], `${slug} ${key}`).toBe(value);
    }
    expect(details?.rtpSource, `${slug} RTP provenance`).toMatch(/^https:\/\//);
    expect(details?.maxWinSource, `${slug} max-win provenance`).toMatch(/^https:\/\//);
    expect(details?.volatilitySource, `${slug} volatility provenance`).toMatch(/^https:\/\//);
  }
});
