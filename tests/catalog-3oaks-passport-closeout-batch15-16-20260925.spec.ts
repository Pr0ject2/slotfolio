import { expect, test } from "@playwright/test";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";

const required = [
  "3-oaks-gaming-3-super-hot-teapots",
  "3-oaks-gaming-lord-of-thunder",
  "3-oaks-gaming-lucky-penny",
  "3-oaks-gaming-magic-clovers",
  "3-oaks-gaming-sun-of-egypt-2",
  "3-oaks-gaming-super-hot-chilli",
  "3-oaks-gaming-super-hotfire-diamonds",
  "3-oaks-gaming-super-sticky-piggy",
  "3-oaks-gaming-egypt-fire-2",
  "3-oaks-gaming-lava-coins",
  "3-oaks-gaming-lava-coins-2",
  "3-oaks-gaming-sky-pearls",
  "3-oaks-gaming-super-hot-teapots",
  "3-oaks-gaming-thunder-tiger",
  "3-oaks-gaming-tiger-gems",
  "3-oaks-gaming-tiger-jungle",
] as const;

test("final 3 Oaks passport batches provide all math fields", () => {
  for (const slug of required) {
    const details = getVerifiedCatalogDetails(slug);
    expect(details?.rtp, `${slug} RTP`).toBeTruthy();
    expect(details?.maxWin, `${slug} max win`).toBeTruthy();
    expect(details?.volatility, `${slug} volatility`).toBeTruthy();
  }
});
