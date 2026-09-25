import { expect, test } from "@playwright/test";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";

const expected = {
  "3-oaks-gaming-sun-of-egypt": { rtp: "95%", maxWin: "1 000x", volatility: "Средняя–высокая" },
  "3-oaks-gaming-sun-of-egypt-3": { rtp: "95,61%", maxWin: "10 000x", volatility: "Высокая" },
  "3-oaks-gaming-magic-apple-2": { rtp: "95,53%", maxWin: "5 133x", volatility: "Высокая" },
  "3-oaks-gaming-moon-sisters": { rtp: "95%", maxWin: "1 000x", volatility: "Средняя" },
  "3-oaks-gaming-sunlight-princess": { rtp: "95,52%", maxWin: "10 345x", volatility: "Высокая" },
} as const;

test("3 Oaks passport closeout batch 8 preserves verified math facts", () => {
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
