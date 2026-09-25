import { expect, test } from "@playwright/test";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";

const slugs = [
  "3-oaks-gaming-3-lucky-sparks",
  "3-oaks-gaming-3-super-coin-volcanoes",
  "3-oaks-gaming-4-african-drums",
  "3-oaks-gaming-4-clover-pots",
  "3-oaks-gaming-3-hot-teapots",
] as const;

test("second 3 Oaks passport closeout batch has complete math facts", () => {
  for (const slug of slugs) {
    const details = getVerifiedCatalogDetails(slug) as ReturnType<typeof getVerifiedCatalogDetails> & {
      rtpSource?: string;
      maxWinSource?: string;
      volatilitySource?: string;
    };
    expect(details?.rtp, `${slug} RTP`).toBeTruthy();
    expect(details?.maxWin, `${slug} maxWin`).toBeTruthy();
    expect(details?.volatility, `${slug} volatility`).toBeTruthy();
    expect(details?.rtpSource, `${slug} RTP provenance`).toMatch(/^https:\/\//);
  }

  const africanDrums = getVerifiedCatalogDetails("3-oaks-gaming-4-african-drums");
  expect(africanDrums?.maxWin).toBe("20000x");
  expect(africanDrums?.volatility).toBe("Высокая");

  const cloverPots = getVerifiedCatalogDetails("3-oaks-gaming-4-clover-pots");
  expect(cloverPots?.maxWin).toBe("15 000x");
  expect(cloverPots?.volatility).toBe("Высокая");

  const superCoin = getVerifiedCatalogDetails("3-oaks-gaming-3-super-coin-volcanoes");
  expect(superCoin?.rtp).toContain("зависит от версии");

  const hotTeapots = getVerifiedCatalogDetails("3-oaks-gaming-3-hot-teapots");
  expect(hotTeapots?.rtp).toContain("зависит от версии");
  expect(hotTeapots?.maxWin).toContain("зависит от версии");
});
