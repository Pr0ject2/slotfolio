import { expect, test } from "@playwright/test";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";

const expected = {
  "3-oaks-gaming-3-super-hot-chillies": { rtp: "95,74%", maxWin: "1 000x", volatility: "Средняя" },
  "3-oaks-gaming-buddha-megaways": { rtp: "95,58%", volatility: "Высокая" },
  "3-oaks-gaming-black-wolf-2": { rtp: "95,54%", maxWin: "2 000x", volatility: "Высокая" },
  "3-oaks-gaming-4-pots-of-egypt": { rtp: "95,56–96,12% (зависит от версии)", maxWin: "5 000x", volatility: "Высокая" },
  "3-oaks-gaming-4-wolf-drums": { rtp: "96%", maxWin: "5 000x", volatility: "Высокая" },
  "3-oaks-gaming-coin-volcano": { rtp: "95,66%", maxWin: "2 551x", volatility: "Средняя" },
  "3-oaks-gaming-dragon-pearls": { rtp: "95%", volatility: "Средняя" },
  "3-oaks-gaming-egypt-power-x1000": { rtp: "95,73%" },
} as const;

test("3 Oaks passport closeout batch 5 preserves verified math facts", () => {
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
  }
});
