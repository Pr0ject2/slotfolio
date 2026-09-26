import { expect, test } from "@playwright/test";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const targets = [
  "playn-go-moon-princess-trinity",
  "playn-go-moon-princess-christmas-kingdom",
  "playn-go-motley-crue",
  "playn-go-mount-m",
  "playn-go-muerto-en-mictlan",
  "playn-go-mystery-egg-surprise",
  "playn-go-mystery-genie-fortunes-of-the-lamp",
  "playn-go-mystery-joker",
  "playn-go-myth-of-dead",
  "playn-go-naughty-nicks-book",
] as const;

test("twenty-sixth Play’n GO passport closeout batch is fully populated", () => {
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

test("batch 26 preserves representative sourced facts", () => {
  expect(getVerifiedCatalogDetails("playn-go-moon-princess-trinity")?.field).toBe("5×5 · кластеры");
  expect(getVerifiedCatalogDetails("playn-go-mount-m")?.maxWin).toBe("13 000x");
  expect(getVerifiedCatalogDetails("playn-go-mystery-egg-surprise")?.maxWin).toBe("6 480x");
  expect(getVerifiedCatalogDetails("playn-go-mystery-joker")?.field).toBe("3 барабана");
  expect(getVerifiedCatalogDetails("playn-go-naughty-nicks-book")?.maxWin).toBe("7 500x");
});
