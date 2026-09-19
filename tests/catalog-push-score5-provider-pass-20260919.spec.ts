import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

function scoreFor(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  return (
    [details?.field, details?.rtp, details?.maxWin, details?.volatility, details?.releaseDate].filter(Boolean).length +
    (type?.gameType ? 1 : 0) +
    (research?.mechanics.length ?? 0)
  );
}

test("Push score-five provider pass leaves only the evidence-limited residual at score five", () => {
  const scoreFivePush = catalogSeeds
    .filter((seed) => seed.provider === "Push Gaming")
    .filter((seed) => scoreFor(seed.slug) === 5)
    .map((seed) => seed.slug);

  expect(scoreFivePush.filter((slug) => slug !== "push-gaming-red-hot-multipliers")).toEqual([]);
  expect(scoreFor("push-gaming-red-hot-multipliers")).toBeGreaterThanOrEqual(5);
});

test("Push score-five pass preserves exact official technical facts and provenance", () => {
  const bigCatch = getVerifiedCatalogDetails("push-gaming-fish-n-nudge-big-catch");
  expect(bigCatch?.releaseDate).toBe("2025-07-09");
  expect(bigCatch?.releaseDateSource).toBe("https://www.pushgaming.com/blog/push-gaming-reels-fish-n-nudge-big-catch.html");

  const joker = getVerifiedCatalogDetails("push-gaming-joker-troupe");
  expect(joker?.releaseDate).toBe("2020-02-17");
  expect(joker?.volatility).toBe("Высокая");

  expect(getVerifiedCatalogGameType("push-gaming-retroverse")?.gameType).toBe("Slots");
  expect(getVerifiedCatalogGameType("push-gaming-the-great-banker")?.gameType).toBe("Slots");
});

test("Push score-five feature enrichment stays additive and evidence-backed", () => {
  const expectedMechanics: Record<string, string[]> = {
    "push-gaming-bamboo-ways": ["Каскады", "Expanding Wilds", "Mystery Symbols", "Instant Prizes"],
    "push-gaming-big-bam-book": ["Сбор символов", "Mystery Symbols", "Instant Prizes"],
    "push-gaming-diamond-supernova-100": ["Линии", "Scatter Prizes"],
    "push-gaming-dj-cat": ["Сбор символов", "Множители", "Расширяющиеся барабаны"],
    "push-gaming-power-paws": ["Кластеры", "Сбор символов", "Mystery Symbols", "Респины"],
    "push-gaming-sea-of-spirits": ["Способы", "Сбор символов", "Sticky Frames", "Instant Prizes"],
    "push-gaming-tricky-treats": ["Кластеры", "Сбор символов", "Sticky Symbols", "Cluster Link"],
  };

  for (const [slug, mechanics] of Object.entries(expectedMechanics)) {
    const research = getVerifiedCatalogResearch(slug);
    expect(research?.source, slug).toContain("pushgaming.com/");
    expect(research?.evidence, slug).toBeTruthy();
    for (const mechanic of mechanics) {
      expect(research?.mechanics, `${slug}: ${mechanic}`).toContain(mechanic);
    }
    expect(scoreFor(slug), slug).toBeGreaterThanOrEqual(6);
  }
});
