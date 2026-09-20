import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

// Only records that already participate in the verified-details chain belong here.
// Le Cowboy has official release timing, but no compatible detail base yet, so it stays out rather than widening lookup semantics for one fact.
const releaseDates: Record<string, string> = {
  "hacksaw-gaming-bash-bros": "2025-10-09",
  "hacksaw-gaming-bouncy-bombs": "2024-03",
  "hacksaw-gaming-dark-summoning": "2023-12",
  "hacksaw-gaming-densho": "2023-09-07",
  "hacksaw-gaming-dropem": "2023-07-27",
  "hacksaw-gaming-eye-of-medusa": "2025-07-10",
  "hacksaw-gaming-immortal-desire": "2023-11",
  "hacksaw-gaming-mighty-masks": "2023-06",
  "hacksaw-gaming-ronin-stackways": "2023-08-10",
  "hacksaw-gaming-temple-of-torment": "2023-05-25",
  "hacksaw-gaming-vending-machine": "2023-07-13",
  "hacksaw-gaming-xmas-drop": "2023-11",
};

const slotTypes = [
  "hacksaw-gaming-2-wild-2-die",
  "hacksaw-gaming-cash-crew",
  "hacksaw-gaming-dark-summoning",
  "hacksaw-gaming-ronin-stackways",
  "hacksaw-gaming-vending-machine",
];

const targets = [...new Set([...Object.keys(releaseDates), ...slotTypes])];

function score(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const gameType = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  return [details?.field, details?.rtp, details?.maxWin, details?.volatility, details?.releaseDate].filter(Boolean).length
    + (gameType?.gameType ? 1 : 0)
    + (research?.mechanics.length ?? 0);
}

test("Hacksaw score-six pass preserves official dates, slot classification and provenance", () => {
  const seeds = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  for (const [slug, releaseDate] of Object.entries(releaseDates)) {
    const details = getVerifiedCatalogDetails(slug);
    expect(details?.releaseDate, slug).toBe(releaseDate);
    expect(details?.releaseDateSource, slug).toContain("hacksawgaming.com/news/");
    expect(details?.source, slug).toBe(seeds.get(slug)?.source);
  }

  for (const slug of slotTypes) {
    const gameType = getVerifiedCatalogGameType(slug);
    expect(gameType?.gameType, slug).toBe("Slots");
    expect(gameType?.source, slug).toBe("https://www.hacksawgaming.com/games/slots");
  }

  for (const slug of targets) {
    expect(score(slug), slug).toBeGreaterThan(6);
  }
});
