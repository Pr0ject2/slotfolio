import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { slots } from "../src/lib/data";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const detailsExpected = {
  "playn-go-15-crystal-roses-a-tale-of-love": { field: "5×3", releaseDate: "2022-01-13" },
  "playn-go-animal-madness": { field: "5×5", releaseDate: "2022-05-19", maxWin: "2250x" },
  "playn-go-big-win-cat-pawsperity": { field: "3×3", releaseDate: "2025-06-24" },
  "playn-go-easter-eggs": { field: "5×3", releaseDate: "2015-03-17" },
  "playn-go-easter-eggspedition": { field: "5×3", releaseDate: "2024-03-28" },
  "playn-go-fire-joker-100": { field: "3×3", releaseDate: "2025-05-29" },
  "playn-go-free-reelin-joker-1000": { field: "3×1", releaseDate: "2023-05-25", maxWin: "1000x" },
  "playn-go-gargantoonz": { field: "7×7", releaseDate: "2023-11-30" },
  "playn-go-gerards-gambit": { field: "3×1 · 1 линия → 5×3 · 10 линий", releaseDate: "2023-04-27" },
  "playn-go-ghost-of-dead": { field: "5×3", releaseDate: "2021-09-16", maxWin: "10000x" },
  "playn-go-hugo-legacy": { field: "7×7", releaseDate: "2023-08-10" },
  "playn-go-loot-and-labyrinths": { field: "5×3", releaseDate: "2025-04-03" },
  "playn-go-piggy-blitz": { field: "4096 способов", releaseDate: "2023-09-21", maxWin: "5000x" },
} as const;

const researchExpected = {
  "playn-go-agent-destiny": ["Линии"],
  "playn-go-animal-madness": ["Кластеры", "Каскады"],
  "playn-go-captain-glum-pirate-hunter": ["Линии"],
  "playn-go-gargantoonz": ["Кластеры", "Каскады"],
  "playn-go-gerards-gambit": ["Линии"],
  "playn-go-hugo-legacy": ["Кластеры"],
  "playn-go-piggy-blitz": ["Способы"],
} as const;

const expectedScores = {
  "playn-go-15-crystal-roses-a-tale-of-love": 3,
  "playn-go-agent-destiny": 3,
  "playn-go-animal-madness": 6,
  "playn-go-big-win-cat-pawsperity": 3,
  "playn-go-captain-glum-pirate-hunter": 3,
  "playn-go-easter-eggs": 3,
  "playn-go-easter-eggspedition": 3,
  "playn-go-fire-joker-100": 3,
  "playn-go-free-reelin-joker-1000": 4,
  "playn-go-gargantoonz": 5,
  "playn-go-gerards-gambit": 4,
  "playn-go-ghost-of-dead": 4,
  "playn-go-hugo-legacy": 4,
  "playn-go-loot-and-labyrinths": 3,
  "playn-go-piggy-blitz": 5,
} as const;

const gridSlots = new Set(["playn-go-animal-madness", "playn-go-gargantoonz", "playn-go-hugo-legacy"]);
const targetSlugs = new Set(Object.keys(expectedScores));

function scoreFor(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const detailFacts = details
    ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length
    : 0;
  return detailFacts + (type ? 1 : 0) + (research?.mechanics.length ?? 0);
}

test("provider-wide Play’n GO pass enriches fifteen weak cards from official evidence", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  expect(targetSlugs.size).toBe(15);
  expect(catalogSeeds).toHaveLength(900);
  expect(slots).toHaveLength(100);
  expect(catalogSeeds.length + slots.length).toBe(1000);

  for (const [slug, expectedScore] of Object.entries(expectedScores)) {
    const seed = selected.get(slug);
    expect(seed, slug).toBeTruthy();
    expect(seed!.provider, slug).toBe("Play’n GO");
    expect(slots.some((slot) => slot.provider === seed!.provider && slot.name === seed!.name), slug).toBe(false);
    expect(getVerifiedCatalogGameType(slug)?.gameType, slug).toBe(gridSlots.has(slug) ? "Grid Slot" : "Video Slot");
    expect(scoreFor(slug), slug).toBe(expectedScore);
  }

  for (const [slug, values] of Object.entries(detailsExpected)) {
    const seed = selected.get(slug)!;
    const details = getVerifiedCatalogDetails(slug);
    expect(details, slug).toBeTruthy();
    expect(details?.source, `${slug} must preserve the catalog seed as primary provenance`).toBe(seed.source);
    expect(details?.field, slug).toBe(values.field);
    expect(details?.releaseDate, slug).toBe(values.releaseDate);
    expect(details?.rtp, `${slug} must not invent RTP`).toBeUndefined();
    expect(details?.volatility, `${slug} must not invent volatility`).toBeUndefined();
    expect(details && "fieldSource" in details, `${slug} must retain its separate official field evidence`).toBe(true);
    if ("maxWin" in values) {
      expect(details?.maxWin, slug).toBe(values.maxWin);
      expect(details && "maxWinSource" in details, `${slug} must retain its separate official max-win evidence`).toBe(true);
    } else {
      expect(details?.maxWin, `${slug} must not invent max win`).toBeUndefined();
    }
  }

  for (const [slug, mechanics] of Object.entries(researchExpected)) {
    const seed = selected.get(slug)!;
    const research = getVerifiedCatalogResearch(slug);
    expect(research?.source, `${slug} must preserve the catalog seed as primary research source`).toBe(seed.source);
    expect(research?.mechanics, slug).toEqual(mechanics);
    expect(research?.evidence, slug).toBeTruthy();
    expect(research && "evidenceSource" in research, `${slug} must retain separate official evidence provenance`).toBe(true);
  }

  const ranked = catalogSeeds.map((seed) => ({ slug: seed.slug, provider: seed.provider, score: scoreFor(seed.slug) }));
  expect(ranked.filter((row) => row.score <= 1)).toHaveLength(22);
  expect(ranked.filter((row) => row.score === 2)).toHaveLength(146);
  expect(ranked.filter((row) => row.score === 3)).toHaveLength(442);
  expect(ranked.filter((row) => row.score <= 1 && row.provider === "Hacksaw Gaming")).toHaveLength(17);
  expect(ranked.some((row) => row.slug === "playn-go-coin-club" && row.score === 0)).toBe(true);
  expect(ranked.filter((row) => row.provider === "Nolimit City" && row.score <= 1)).toHaveLength(4);
  expect(ranked.some((row) => targetSlugs.has(row.slug) && row.score === 2)).toBe(false);
});
