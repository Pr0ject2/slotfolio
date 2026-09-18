import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const expected = {
  "hacksaw-gaming-aiko-and-the-wind-spirit": ["2025-07-24", "https://www.hacksawgaming.com/news/june-round-up-awards-and-anniversaries"],
  "hacksaw-gaming-army-of-ares": ["2025-12-04", "https://www.hacksawgaming.com/news/november-round-up"],
  "hacksaw-gaming-chaos-crew-3": ["2025-09-25", "https://www.hacksawgaming.com/news/august-round-up"],
  "hacksaw-gaming-dark-spiral": ["2026-03-05", "https://www.hacksawgaming.com/news/february-round-up"],
  "hacksaw-gaming-eternal-duel": ["2026-03-12", "https://www.hacksawgaming.com/news/february-round-up"],
  "hacksaw-gaming-hot-ross": ["2026-02-26", "https://www.hacksawgaming.com/news/january-round-up"],
  "hacksaw-gaming-invictus": ["2025-07-03", "https://www.hacksawgaming.com/news/june-round-up-awards-and-anniversaries"],
  "hacksaw-gaming-jaws-of-justice": ["2025-12-11", "https://www.hacksawgaming.com/news/november-round-up"],
  "hacksaw-gaming-le-bunny": ["2026-03-26", "https://www.hacksawgaming.com/news/february-round-up"],
  "hacksaw-gaming-le-digger": ["2026-05-07", "https://www.hacksawgaming.com/news/april-round-up"],
  "hacksaw-gaming-le-fisherman": ["2026-02-05", "https://www.hacksawgaming.com/news/january-round-up"],
  "hacksaw-gaming-le-santa": ["2025-11-27", "https://www.hacksawgaming.com/news/october-round-up"],
  "hacksaw-gaming-miami-mayhem": ["2025-08-28", "https://www.hacksawgaming.com/news/july-round-up-hot-highlights"],
  "hacksaw-gaming-spear-of-athena": ["2025-11-20", "https://www.hacksawgaming.com/news/october-round-up"],
  "hacksaw-gaming-stormborn": ["2025-09-18", "https://www.hacksawgaming.com/news/august-round-up"],
  "hacksaw-gaming-sun-princess": ["2025-10-23", "https://www.hacksawgaming.com/news/september-round-up"],
  "hacksaw-gaming-superstar-sevens": ["2026-02-19", "https://www.hacksawgaming.com/news/january-round-up"],
  "hacksaw-gaming-the-count": ["2025-10-14", "https://www.hacksawgaming.com/news/september-round-up"],
  "hacksaw-gaming-the-luxe": ["2025-07-17", "https://www.hacksawgaming.com/news/june-round-up-awards-and-anniversaries"],
  "hacksaw-gaming-the-wildwood-curse": ["2025-10-02", "https://www.hacksawgaming.com/news/september-round-up"],
  "hacksaw-gaming-toshi-ways-club": ["2025-12-23", "https://www.hacksawgaming.com/news/november-round-up"],
  "hacksaw-gaming-zeus-ze-zecond": ["2026-02-12", "https://www.hacksawgaming.com/news/january-round-up"],
} as const;

function scoreFor(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const detailFacts = details
    ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length
    : 0;
  return detailFacts + (type ? 1 : 0) + (research?.mechanics.length ?? 0);
}

test("Hacksaw provider-wide pass 3 preserves its separately sourced official release dates", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  expect(Object.keys(expected)).toHaveLength(22);

  for (const [slug, [releaseDate, releaseDateSource]] of Object.entries(expected)) {
    const seed = selected.get(slug);
    expect(seed, slug).toBeTruthy();
    expect(seed!.provider, slug).toBe("Hacksaw Gaming");

    const details = getVerifiedCatalogDetails(slug);
    expect(details?.releaseDate, `${slug} release date`).toBe(releaseDate);
    expect(details?.releaseDateSource, `${slug} release source`).toBe(releaseDateSource);
    expect(details?.source, `${slug} game source`).toBe(seed!.source);
    expect(details?.verifiedAt, `${slug} verification date`).toMatch(/^20\d{2}-\d{2}-\d{2}$/);
    expect(getVerifiedCatalogGameType(slug)?.gameType, slug).toBe("Slots");
    expect(getVerifiedCatalogResearch(slug)?.mechanics.length, slug).toBeGreaterThanOrEqual(1);
    expect(scoreFor(slug), `${slug} must stay at or above the achieved quality floor`).toBeGreaterThanOrEqual(3);
  }
});
