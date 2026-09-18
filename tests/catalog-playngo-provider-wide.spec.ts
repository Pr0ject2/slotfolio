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

const researchSlugs = [
  "playn-go-agent-destiny",
  "playn-go-animal-madness",
  "playn-go-captain-glum-pirate-hunter",
  "playn-go-gargantoonz",
  "playn-go-gerards-gambit",
  "playn-go-hugo-legacy",
  "playn-go-piggy-blitz",
] as const;

const targetSlugs = new Set([...Object.keys(detailsExpected), ...researchSlugs]);
const gridSlots = new Set(["playn-go-animal-madness", "playn-go-gargantoonz", "playn-go-hugo-legacy"]);

test("provider-wide Play’n GO pass preserves its fifteen original official evidence records", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));
  expect(targetSlugs.size).toBe(15);
  expect(catalogSeeds).toHaveLength(900);
  expect(slots).toHaveLength(100);

  for (const slug of targetSlugs) {
    const seed = selected.get(slug)!;
    expect(seed.provider, slug).toBe("Play’n GO");
    expect(getVerifiedCatalogGameType(slug)?.gameType, slug).toBe(gridSlots.has(slug) ? "Grid Slot" : "Video Slot");
  }

  for (const [slug, values] of Object.entries(detailsExpected)) {
    const seed = selected.get(slug)!;
    const details = getVerifiedCatalogDetails(slug);
    expect(details?.source, slug).toBe(seed.source);
    expect(details?.field, slug).toBe(values.field);
    expect(details?.releaseDate, slug).toBe(values.releaseDate);
    if ("maxWin" in values) expect(details?.maxWin, slug).toBe(values.maxWin);
  }

  for (const slug of researchSlugs) {
    const seed = selected.get(slug)!;
    const research = getVerifiedCatalogResearch(slug);
    expect(research?.source, slug).toBe(seed.source);
    expect(research?.mechanics.length, slug).toBeGreaterThan(0);
    expect(research?.evidence, slug).toBeTruthy();
  }
});
