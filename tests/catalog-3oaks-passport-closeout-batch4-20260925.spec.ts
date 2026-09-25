import { expect, test } from "@playwright/test";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";

const expected = {
  "3-oaks-gaming-green-chilli": ["96,65%", "2 000x", "Высокая"],
  "3-oaks-gaming-fishin-bear": ["96,50%", "2 500x", "Средняя"],
  "3-oaks-gaming-super-china-pots": ["95,71%", "2 000x", "Высокая"],
  "3-oaks-gaming-big-heist": ["95,54%", "3 170x", "Высокая"],
  "3-oaks-gaming-aztec-fire": ["95,50%", "10 000x", "Средняя"],
  "3-oaks-gaming-aztec-fire-2": ["95,54%", "10 000x", "Средняя–высокая"],
} as const;

test("fourth 3 Oaks passport closeout batch has complete math facts", () => {
  for (const [slug, [rtp, maxWin, volatility]] of Object.entries(expected)) {
    const details = getVerifiedCatalogDetails(slug) as ReturnType<typeof getVerifiedCatalogDetails> & {
      rtpSource?: string;
      maxWinSource?: string;
      volatilitySource?: string;
    };
    expect(details?.rtp, slug).toBe(rtp);
    expect(details?.maxWin, slug).toBe(maxWin);
    expect(details?.volatility, slug).toBe(volatility);
    expect(details?.rtpSource, `${slug} RTP provenance`).toMatch(/^https:\/\//);
    expect(details?.maxWinSource, `${slug} max-win provenance`).toMatch(/^https:\/\//);
    expect(details?.volatilitySource, `${slug} volatility provenance`).toMatch(/^https:\/\//);
  }
});
