import { expect, test } from "@playwright/test";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const targets = [
  "playn-go-hugos-adventure",
  "playn-go-ice-joker",
  "playn-go-idol-of-fortune",
  "playn-go-immortails-of-egypt",
  "playn-go-imperial-opera",
  "playn-go-infernal-trinity-go-guaranteed",
  "playn-go-inferno-joker",
  "playn-go-inferno-star",
  "playn-go-invading-vegas-revenge-on-mars",
  "playn-go-invading-vegas-las-christmas",
] as const;

test("eighteenth Play’n GO passport closeout batch is fully populated", () => {
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

test("batch 18 preserves representative sourced math profiles", () => {
  expect(getVerifiedCatalogDetails("playn-go-hugos-adventure")?.maxWin).toBe("5 000x");
  expect(getVerifiedCatalogDetails("playn-go-idol-of-fortune")?.field).toBe("5×3 · 243 способа");
  expect(getVerifiedCatalogDetails("playn-go-infernal-trinity-go-guaranteed")?.maxWin).toBe("6 000x");
  expect(getVerifiedCatalogDetails("playn-go-invading-vegas-revenge-on-mars")?.volatility).toBe("Средняя");
});
