import { expect, test } from "@playwright/test";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";

const expected = {
  "3-oaks-gaming-coin-up-volcano": { rtp: "95,66%", maxWin: "1 500x", volatility: "Средняя" },
  "3-oaks-gaming-lucky-penny-3-pots-super-wheel": { rtp: "95,77%", maxWin: "1 420x", volatility: "Высокая" },
  "3-oaks-gaming-lucky-penny-power-scatter": { rtp: "95,59–96,03% (зависит от версии)", maxWin: "50 000x", volatility: "Высокая" },
  "3-oaks-gaming-lucky-penny-2": { rtp: "95,66–96,05% (зависит от версии)", maxWin: "20 000x", volatility: "Высокая–очень высокая" },
  "3-oaks-gaming-sun-of-egypt-5": { field: "5×3 · 20 линий", rtp: "95–95,68% (зависит от версии)", maxWin: "5 000x", volatility: "Высокая" },
} as const;

test("3 Oaks passport closeout batch 11 preserves version-aware specs", () => {
  for (const [slug, values] of Object.entries(expected)) {
    const details = getVerifiedCatalogDetails(slug) as (ReturnType<typeof getVerifiedCatalogDetails> & {
      rtpSource?: string;
      rtpSourceAlt?: string;
      maxWinSource?: string;
      volatilitySource?: string;
      fieldSource?: string;
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
