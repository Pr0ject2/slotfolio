import { expect, test } from "@playwright/test";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const targets = [
  "playn-go-legion-gold-unleashed",
  "playn-go-legion-gold-victory",
  "playn-go-leprechaun-goes-egypt",
  "playn-go-leprechaun-goes-wild",
  "playn-go-leprechauns-diamond-dig",
  "playn-go-leprechauns-vault",
  "playn-go-lion-saga-odyssey",
  "playn-go-loot-and-labyrinths",
  "playn-go-lord-merlin-and-the-lady-of-the-lake",
  "playn-go-lordi-reel-monsters",
] as const;

test("twenty-third Play’n GO passport closeout batch is fully populated", () => {
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

test("batch 23 preserves representative sourced profiles", () => {
  expect(getVerifiedCatalogDetails("playn-go-legion-gold-unleashed")?.maxWin).toBe("3000x");
  expect(getVerifiedCatalogDetails("playn-go-legion-gold-victory")?.field).toBe("5×3");
  expect(getVerifiedCatalogDetails("playn-go-leprechauns-vault")?.maxWin).toBeTruthy();
  expect(getVerifiedCatalogDetails("playn-go-loot-and-labyrinths")?.maxWin).toBe("20 000x");
  expect(getVerifiedCatalogDetails("playn-go-lordi-reel-monsters")?.maxWin).toBeTruthy();
});
