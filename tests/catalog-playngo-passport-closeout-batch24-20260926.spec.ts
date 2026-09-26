import { expect, test } from "@playwright/test";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const targets = [
  "playn-go-love-is-in-the-fair",
  "playn-go-love-joker",
  "playn-go-luchamigos",
  "playn-go-lucky-diamonds",
  "playn-go-merlin-realm-of-charm",
  "playn-go-merlin-journey-of-flame",
  "playn-go-merlins-grimoire",
  "playn-go-mermaids-diamond",
  "playn-go-merry-xmas",
  "playn-go-midnight-gold",
] as const;

test("twenty-fourth Play’n GO passport closeout batch is fully populated", () => {
  for (const slug of targets) {
    const details = getVerifiedCatalogDetails(slug);
    expect(details?.field, `${slug} field`).toBeTruthy();
    expect(details?.rtp, `${slug} RTP`).toBeTruthy();
    expect(details?.maxWin, `${slug} max win`).toBeTruthy();
    expect(details?.volatility, `${slug} volatility`).toBeTruthy();
    expect(details?.releaseDate, `${slug} release date`).toBeTruthy();
    expect(getVerifiedCatalogGameType(slug)?.gameType, `${slug} game type`).toBeTruthy();
    expect(getVerifiedCatalogResearch(slug)?.mechanics.length, `${slug} mechanics`).toBeGreaterThan(0);
  }
});

test("batch 24 preserves representative researched facts", () => {
  expect(getVerifiedCatalogDetails("playn-go-love-is-in-the-fair")?.maxWin).toBe("10 000x");
  expect(getVerifiedCatalogDetails("playn-go-lucky-diamonds")?.field).toBe("3 барабана · 1 линия");
  expect(getVerifiedCatalogDetails("playn-go-merlin-journey-of-flame")?.maxWin).toBe("7 500x");
  expect(getVerifiedCatalogDetails("playn-go-mermaids-diamond")?.maxWin).toBe("5 000x");
  expect(getVerifiedCatalogDetails("playn-go-midnight-gold")?.field).toBe("5×3 · 20 линий");
});
