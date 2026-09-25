import { expect, test } from "@playwright/test";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";

const expected = {
  "3-oaks-gaming-dj-tiger-x1000": { rtp: "96,12%", maxWin: "20 000x", volatility: "Высокая" },
  "3-oaks-gaming-lady-fortune": { rtp: "95,60%", maxWin: "10 000x", volatility: "Средняя" },
  "3-oaks-gaming-golden-teapot": { rtp: "95,62%", maxWin: "5 000x", volatility: "Средняя" },
  "3-oaks-gaming-lucky-apple-x1000": { rtp: "96,06%", maxWin: "20 000x", volatility: "Высокая" },
  "3-oaks-gaming-wolf-night": { rtp: "95,69%", maxWin: "2 000x", volatility: "Средняя" },
} as const;

test("3 Oaks passport closeout batch 10 preserves verified math facts", () => {
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
