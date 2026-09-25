import { expect, test } from "@playwright/test";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";

const expected = {
  "3-oaks-gaming-4-fairy-flowers": { rtp: "95,71%", maxWin: "10 000x", volatility: "Средняя–высокая" },
  "3-oaks-gaming-aztec-sun": { rtp: "95,33%", maxWin: "1 000x", volatility: "Высокая" },
  "3-oaks-gaming-hit-the-gold": { rtp: "95,66%", maxWin: "2 000x", volatility: "Средняя" },
  "3-oaks-gaming-green-chilli-2": { rtp: "95,6%", maxWin: "5 000x", volatility: "Высокая" },
  "3-oaks-gaming-china-festival": { rtp: "95,7%", maxWin: "5 000x", volatility: "Средняя" },
} as const;

test("3 Oaks passport closeout batch 7 preserves verified math facts", () => {
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
