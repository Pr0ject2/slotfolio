import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const expected = {
  "hacksaw-gaming-circle-of-life": ["2026-01", "https://www.hacksawgaming.com/news/january-round-up"],
  "hacksaw-gaming-deal-with-death": ["2026-01", "https://www.hacksawgaming.com/news/january-round-up"],
  "hacksaw-gaming-pray-for-six": ["2026-01", "https://www.hacksawgaming.com/news/january-round-up"],
  "hacksaw-gaming-smoking-dragon": ["2026-01", "https://www.hacksawgaming.com/news/january-round-up"],
  "hacksaw-gaming-epic-bullets-and-bounty": ["2026-04", "https://www.hacksawgaming.com/news/april-round-up"],
  "hacksaw-gaming-munchy-milo": ["2026-04", "https://www.hacksawgaming.com/news/april-round-up"],
  "hacksaw-gaming-marlin-masters-atlantis": ["2026-04", "https://www.hacksawgaming.com/news/april-round-up"],
  "hacksaw-gaming-dynasty-of-death": ["2026-04", "https://www.hacksawgaming.com/news/april-round-up"],
  "hacksaw-gaming-dandy-diamonds": ["2026-06", "https://www.hacksawgaming.com/news/june-round-up"],
  "hacksaw-gaming-rise-of-fortuna": ["2026-06", "https://www.hacksawgaming.com/news/june-round-up"],
  "hacksaw-gaming-pray-for-three": ["2025-05", "https://www.hacksawgaming.com/news/may-game-round-up"],
  "hacksaw-gaming-spinman": ["2025-05", "https://www.hacksawgaming.com/news/may-game-round-up"],
  "hacksaw-gaming-ultimate-slot-of-america": ["2025-06", "https://www.hacksawgaming.com/news/june-round-up-awards-and-anniversaries"],
  "hacksaw-gaming-freds-food-truck": ["2025-06", "https://www.hacksawgaming.com/news/june-round-up-awards-and-anniversaries"],
  "hacksaw-gaming-le-king": ["2025-06", "https://www.hacksawgaming.com/news/june-round-up-awards-and-anniversaries"],
  "hacksaw-gaming-le-zeus": ["2025-09-11", "https://www.hacksawgaming.com/news/august-round-up"],
  "hacksaw-gaming-sixsixsix": ["2024-07", "https://www.hacksawgaming.com/news/july-2024-monthly-round-up"],
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

test("Hacksaw provider-wide pass 4 adds separately sourced official release timing to seventeen score-2 cards", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  expect(Object.keys(expected)).toHaveLength(17);

  for (const [slug, [releaseDate, releaseDateSource]] of Object.entries(expected)) {
    const seed = selected.get(slug);
    expect(seed, slug).toBeTruthy();
    expect(seed!.provider, slug).toBe("Hacksaw Gaming");

    const details = getVerifiedCatalogDetails(slug);
    expect(details, slug).toBeTruthy();
    expect(details?.source, slug).toBe(seed!.source);
    expect(details?.releaseDate, slug).toBe(releaseDate);
    expect(details?.verifiedAt, slug).toBe("2026-09-16");
    expect(details && "releaseDateSource" in details, `${slug} must retain separate official release provenance`).toBe(true);
    if (details && "releaseDateSource" in details) {
      expect(details.releaseDateSource, slug).toBe(releaseDateSource);
    }
    expect(details?.field, `${slug} must not invent layout data`).toBeUndefined();
    expect(details?.rtp, `${slug} must not invent RTP`).toBeUndefined();
    expect(details?.maxWin, `${slug} must not invent max win`).toBeUndefined();
    expect(details?.volatility, `${slug} must not invent volatility`).toBeUndefined();
    expect(getVerifiedCatalogGameType(slug)?.gameType, slug).toBe("Slots");
    expect(getVerifiedCatalogResearch(slug)?.mechanics.length, slug).toBe(1);
    expect(scoreFor(slug), `${slug} must move from score 2 to score 3`).toBe(3);
  }
});
