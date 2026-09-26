import { expect, test } from "@playwright/test";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const targets = [
  "playn-go-invading-vegas",
  "playn-go-irish-gold",
  "playn-go-jewel-box",
  "playn-go-jolly-roger",
  "playn-go-journey-to-paris",
  "playn-go-lady-of-fortune",
  "playn-go-lab-of-madness-its-a-wild",
  "playn-go-legacy-of-gems-blitzways",
  "playn-go-legion-gold-reckoning",
  "playn-go-legion-gold-and-the-throne-of-dead",
] as const;

test("twenty-first Play’n GO passport closeout batch is fully populated", () => {
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

test("batch 21 preserves representative researched facts", () => {
  expect(getVerifiedCatalogDetails("playn-go-invading-vegas")?.maxWin).toBe("1 000x");
  expect(getVerifiedCatalogDetails("playn-go-jewel-box")?.maxWin).toBe("1 756x");
  expect(getVerifiedCatalogDetails("playn-go-journey-to-paris")?.field).toBe("5×5 · кластеры");
  expect(getVerifiedCatalogDetails("playn-go-lab-of-madness-its-a-wild")?.maxWin).toBe("8 000x");
  expect(getVerifiedCatalogDetails("playn-go-legion-gold-reckoning")?.maxWin).toBe("10 000x");
});
