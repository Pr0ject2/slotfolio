import { test, expect } from "@playwright/test";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

function scoreFor(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  return (
    (details ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length : 0) +
    (type ? 1 : 0) +
    (research?.mechanics.length ?? 0)
  );
}

test("final 3 Oaks tail keeps new official facts without freezing future enrichment", () => {
  const coinUp = getVerifiedCatalogResearch("3-oaks-gaming-coin-up-volcano");
  expect(coinUp?.source).toBe("https://3oaks.com/game/coinup_volcano");
  expect(coinUp?.mechanics).toContain("Сбор символов");
  expect(coinUp?.mechanics).toContain("Респины");
  expect(scoreFor("3-oaks-gaming-coin-up-volcano")).toBeGreaterThanOrEqual(5);

  const hotFire = getVerifiedCatalogDetails("3-oaks-gaming-hot-fire-fruits");
  expect(hotFire?.releaseDate).toBe("2024-10-24");
  expect(hotFire?.releaseDateSource).toBe("https://3oaks.com/news/new-release-hot-fire-fruits");

  const chinaPots = getVerifiedCatalogDetails("3-oaks-gaming-super-china-pots");
  expect(chinaPots?.maxWin).toBe("2000x");
  expect(chinaPots?.releaseDate).toBe("2025-06-05");
  expect(getVerifiedCatalogGameType("3-oaks-gaming-super-china-pots")?.gameType).toBe("Slots");
  expect(scoreFor("3-oaks-gaming-super-china-pots")).toBeGreaterThanOrEqual(6);
});

test("Iron Phoenix exposes the richer official Push feature set and exact variants", () => {
  const details = getVerifiedCatalogDetails("push-gaming-iron-phoenix");
  const research = getVerifiedCatalogResearch("push-gaming-iron-phoenix");

  expect(details?.source).toBe("https://www.pushgaming.com/games/iron-phoenix.html");
  expect(details?.rtp).toBe("96,24% / 94,01%");
  expect(details?.maxWin).toBe("12242.10x");
  expect(details?.volatility).toBe("Низкая–средняя");
  expect(research?.source).toBe("https://www.pushgaming.com/games/iron-phoenix.html");
  for (const mechanic of ["Способы", "Phoenix Reel", "Cash Prizes", "Jackpots"]) {
    expect(research?.mechanics, mechanic).toContain(mechanic);
  }
  expect(scoreFor("push-gaming-iron-phoenix")).toBeGreaterThanOrEqual(7);
});
