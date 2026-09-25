import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";

const expected = {
  "3-oaks-gaming-more-magic-apple": ["95,57%", "7 420x", "Средняя–высокая"],
  "3-oaks-gaming-sun-of-egypt-4": ["95,47%", "10 000x", "Средняя–высокая"],
  "3-oaks-gaming-little-farm": ["95,69%", "5 000x", "Средняя"],
  "3-oaks-gaming-rio-gems": ["95,69%", "10 000x", "Высокая"],
  "3-oaks-gaming-hit-more-gold": ["96,65%", "5 000x", "Высокая"],
  "3-oaks-gaming-777-coins": ["95,75%", "6 000x", "Средняя"],
} as const;

test("third 3 Oaks passport closeout batch completes every selected target", () => {
  const selected = new Set(catalogSeeds.map((seed) => seed.slug));
  const selectedEntries = Object.entries(expected).filter(([slug]) => selected.has(slug));
  expect(selectedEntries.length).toBeGreaterThan(0);

  for (const [slug, [rtp, maxWin, volatility]] of selectedEntries) {
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
