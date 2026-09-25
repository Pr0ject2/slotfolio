import { expect, test } from "@playwright/test";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";

const expected = {
  "3-oaks-gaming-black-wolf": { rtp: "95,65%", maxWin: "1 000x", volatility: "Средняя" },
  "3-oaks-gaming-magic-apple": { rtp: "95,78%", maxWin: "2 000x", volatility: "Высокая" },
  "3-oaks-gaming-book-of-sun-multichance": { rtp: "95,4%", maxWin: "6 000x", volatility: "Высокая" },
  "3-oaks-gaming-gold-nuggets": { rtp: "95,63%", maxWin: "1 000x", volatility: "Средняя" },
  "3-oaks-gaming-777-gems-respin": { rtp: "95,70%", maxWin: "750x", volatility: "Средняя" },
  "3-oaks-gaming-fortune-globe": { rtp: "94,73%", maxWin: "10 000x", volatility: "Высокая" },
  "3-oaks-gaming-gold-express": { rtp: "95,64%", maxWin: "2 000x", volatility: "Средняя" },
} as const;

test("3 Oaks passport closeout batch 6 preserves verified math facts", () => {
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
