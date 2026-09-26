import { expect, test } from "@playwright/test";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const targets = [
  "playn-go-enchanted-crystals",
  "playn-go-energoonz",
  "playn-go-happy-halloween",
  "playn-go-grim-muerto",
  "playn-go-honey-rush",
  "playn-go-golden-ticket-2",
  "playn-go-house-of-doom",
  "playn-go-house-of-doom-2-the-crypt",
  "playn-go-hugo-2",
  "playn-go-hotel-yeti-way",
] as const;

test("thirteenth Play’n GO passport closeout batch is fully populated", () => {
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
