import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogGameTypePlayngoFill } from "../src/lib/catalog-verified-game-type-playngo-fill";

const slug = "playn-go-ras-reckoning";
const gameTypeSource = "https://www.playngo.com/post/ras-reckoning";

test("Ra's Reckoning keeps canonical source separate from direct grid-slot evidence", () => {
  const seed = catalogSeeds.find((item) => item.slug === slug);
  const direct = getVerifiedCatalogGameTypePlayngoFill(slug);
  const merged = getVerifiedCatalogGameType(slug);

  expect(seed?.provider).toBe("Play’n GO");
  expect(seed?.source).toBe("https://www.playngo.com/games/ra's-reckoning");
  expect(direct?.gameType).toBe("Grid Slot");
  expect(direct?.source).toBe(seed?.source);
  expect(direct?.gameTypeSource).toBe(gameTypeSource);
  expect(direct?.verifiedAt).toBe("2026-09-23");
  expect(merged?.gameType).toBe("Grid Slot");
  expect(merged?.source).toBe(seed?.source);
});

test("current selected Play'n GO catalog has no remaining Game Type gap", () => {
  const residual = catalogSeeds
    .filter((seed) => seed.provider === "Play’n GO" && !getVerifiedCatalogGameType(seed.slug))
    .map((seed) => seed.slug);
  expect(residual).toEqual([]);
});

test("new Game Type evidence does not rewrite older Play'n GO verification dates", () => {
  expect(getVerifiedCatalogGameTypePlayngoFill("playn-go-lucky-diamonds")?.verifiedAt).toBe("2026-09-18");
});
