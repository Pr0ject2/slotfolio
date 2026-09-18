import { test, expect } from "@playwright/test";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

function scoreFor(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const detailFacts = details
    ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length
    : 0;
  return detailFacts + (type ? 1 : 0) + (research?.mechanics.length ?? 0);
}

const endorphinaTargets = [
  "endorphina-burning-coins-100",
  "endorphina-burning-coins-20-dice",
  "endorphina-chance-machine-90s",
  "endorphina-druids-fortune",
  "endorphina-fortune-bankers",
  "endorphina-fortune-chests-dice",
  "endorphina-gift-of-midas",
  "endorphina-groovin-tiger",
  "endorphina-hell-hot-1000",
  "endorphina-moofo",
  "endorphina-zalatar",
];

const threeOaksTargets = [
  "3-oaks-gaming-3-jewel-crowns",
  "3-oaks-gaming-buddha-megaways",
  "3-oaks-gaming-coin-princess-x1000",
  "3-oaks-gaming-joker-glitz-x1000",
  "3-oaks-gaming-lucky-apple-x1000",
  "3-oaks-gaming-lucky-penny",
  "3-oaks-gaming-lucky-penny-2",
  "3-oaks-gaming-lucky-penny-power-scatter",
];

const pushTargets = [
  "push-gaming-10-swords",
  "push-gaming-bamboo-ways",
  "push-gaming-big-bam-book",
  "push-gaming-big-bamboo-2",
  "push-gaming-bison-battle",
  "push-gaming-candy-blast",
  "push-gaming-cats-of-olympuss",
  "push-gaming-crystal-catcher",
  "push-gaming-deadly-5",
  "push-gaming-dj-cat",
  "push-gaming-dj-fox",
  "push-gaming-fang-city",
  "push-gaming-fat-banker",
  "push-gaming-generous-jack",
  "push-gaming-goat-getter",
  "push-gaming-happy-bamboo",
  "push-gaming-hearts-highway",
  "push-gaming-henry-the-ape",
  "push-gaming-mad-blast",
  "push-gaming-mad-cars",
  "push-gaming-olympus-unleashed",
  "push-gaming-power-vault",
  "push-gaming-rat-king",
  "push-gaming-regal-knights",
  "push-gaming-shamrock-saints",
  "push-gaming-the-grand-show",
];

test("2026-09-18 score-four fill lifts every targeted catalog card without promotion", () => {
  for (const slug of [...endorphinaTargets, ...threeOaksTargets, ...pushTargets]) {
    expect(scoreFor(slug), slug).toBeGreaterThanOrEqual(5);
  }
});

test("Endorphina fill preserves exact official release facts and slot classification", () => {
  expect(getVerifiedCatalogDetails("endorphina-burning-coins-100")?.releaseDate).toBe("2026-07-01");
  expect(getVerifiedCatalogDetails("endorphina-hell-hot-1000")?.maxWin).toBe("1000x");
  expect(getVerifiedCatalogDetails("endorphina-hell-hot-1000")?.releaseDate).toBe("2026-08-27");
  expect(getVerifiedCatalogDetails("endorphina-moofo")?.releaseDate).toBe("2026-07-09");
  expect(getVerifiedCatalogDetails("endorphina-zalatar")?.releaseDate).toBe("2026-07-15");
  for (const slug of endorphinaTargets) {
    expect(getVerifiedCatalogGameType(slug)?.gameType, slug).toBe("Slots");
  }
});

test("3 Oaks score-four tail keeps only explicitly verified slot classifications", () => {
  for (const slug of threeOaksTargets) {
    expect(getVerifiedCatalogGameType(slug)?.gameType, slug).toBe("Slots");
  }
  expect(getVerifiedCatalogDetails("3-oaks-gaming-buddha-megaways")?.maxWin).toBe("12000x");
});

test("Push score-four fill exposes exact release and layout facts from official material", () => {
  const expectedReleases: Record<string, string> = {
    "push-gaming-10-swords": "2023-05-31",
    "push-gaming-bamboo-ways": "2025-09-03",
    "push-gaming-big-bam-book": "2024-08-29",
    "push-gaming-big-bamboo-2": "2026-03-25",
    "push-gaming-bison-battle": "2022-01-20",
    "push-gaming-candy-blast": "2025-03-26",
    "push-gaming-cats-of-olympuss": "2024-09-12",
    "push-gaming-deadly-5": "2022-08-31",
    "push-gaming-dj-cat": "2024-04-16",
    "push-gaming-dj-fox": "2023-12-14",
    "push-gaming-fang-city": "2025-06-18",
    "push-gaming-fat-banker": "2022-05-19",
    "push-gaming-generous-jack": "2022-12-12",
    "push-gaming-goat-getter": "2023-08-24",
    "push-gaming-hearts-highway": "2024-02-13",
    "push-gaming-henry-the-ape": "2025-06-11",
    "push-gaming-mad-blast": "2025-02-20",
    "push-gaming-mad-cars": "2022-08-10",
    "push-gaming-olympus-unleashed": "2025-05-07",
    "push-gaming-power-vault": "2025-03-05",
    "push-gaming-rat-king": "2023-07-27",
    "push-gaming-regal-knights": "2025-05-28",
    "push-gaming-shamrock-saints": "2024-03-05",
    "push-gaming-the-grand-show": "2024-07-17",
  };
  for (const [slug, releaseDate] of Object.entries(expectedReleases)) {
    expect(getVerifiedCatalogDetails(slug)?.releaseDate, slug).toBe(releaseDate);
  }

  expect(getVerifiedCatalogDetails("push-gaming-crystal-catcher")?.field).toBe("7×7");
  expect(getVerifiedCatalogDetails("push-gaming-happy-bamboo")?.field).toBe("3×3");
  expect(getVerifiedCatalogDetails("push-gaming-power-vault")?.field).toBe("3×3 · 5 линий");
  expect(getVerifiedCatalogDetails("push-gaming-rat-king")?.field).toBe("6×6");
});
