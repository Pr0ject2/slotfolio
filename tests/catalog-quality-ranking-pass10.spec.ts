import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { slots } from "../src/lib/data";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const expected = {
  "3-oaks-gaming-3-olymp-fortunes": { field: "5×3 · 25 линий", releaseDate: "2026-04" },
  "3-oaks-gaming-3-pots-of-egypt": { field: "5×3 · 25 линий", releaseDate: "2024-10" },
  "3-oaks-gaming-3-super-hot-chillies": { field: "5×3 · 25 линий", releaseDate: "2025-05" },
  "3-oaks-gaming-4-african-drums": { field: "5×3 · 25 линий", releaseDate: "2025-11" },
  "3-oaks-gaming-4-clover-pots": { field: "5×3 · 25 линий", releaseDate: "2026-06" },
  "3-oaks-gaming-4-fairy-flowers": { field: "5×3 · 25 линий", releaseDate: "2026-03" },
  "3-oaks-gaming-4-pots-of-egypt": { field: "5×3 · 20 линий", releaseDate: "2025-12" },
  "3-oaks-gaming-4-wolf-drums": { field: "5×3 · 25 линий", releaseDate: "2026-02" },
  "3-oaks-gaming-777-fruity-coins": { field: "3×3 · 5 линий", releaseDate: "2025-07" },
  "3-oaks-gaming-777-gems-respin": { field: "3×3 · 5 линий", releaseDate: "2019-12" },
  "3-oaks-gaming-amazonia-wins": { field: "5×3 · 25 линий", releaseDate: "2025-07" },
  "3-oaks-gaming-aztec-fire": { field: "5×4 · 20 линий", releaseDate: "2022-08" },
  "3-oaks-gaming-aztec-fire-2": { field: "5×4 · 20 линий", releaseDate: "2023-12" },
  "3-oaks-gaming-aztec-sun": { field: "5×3 · 25 линий", releaseDate: "2020-06" },
  "3-oaks-gaming-big-heist": { field: "5×3 · 10 линий", releaseDate: "2022-09" },
  "3-oaks-gaming-black-wolf": { field: "5×4 · 25 линий", releaseDate: "2021-12" },
  "3-oaks-gaming-black-wolf-2": { field: "5×4 · 25 линий", releaseDate: "2023-09" },
  "3-oaks-gaming-book-of-sun-multichance": { field: "5×3 · 10 линий", releaseDate: "2019-05" },
  "3-oaks-gaming-chili-coins": { field: "3×3 · 5 линий", releaseDate: "2026-01" },
  "3-oaks-gaming-coin-express": { field: "5×3 · 5 линий", releaseDate: "2025-04" },
} as const;

const targetSlugs = new Set(Object.keys(expected));

function scoreFor(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const detailFacts = details
    ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length
    : 0;
  return detailFacts + (type ? 1 : 0) + (research?.mechanics.length ?? 0);
}

test("quality pass 10 adds exact official release months to twenty score-2 3 Oaks records", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  expect(targetSlugs.size).toBe(20);
  expect(catalogSeeds).toHaveLength(900);
  expect(slots).toHaveLength(100);

  for (const [slug, values] of Object.entries(expected)) {
    const seed = selected.get(slug);
    expect(seed, slug).toBeTruthy();
    expect(seed!.provider, slug).toBe("3 Oaks Gaming");
    expect(slots.some((slot) => slot.provider === seed!.provider && slot.name === seed!.name), slug).toBe(false);

    const details = getVerifiedCatalogDetails(slug);
    expect(details, slug).toBeTruthy();
    expect(details?.source, slug).toBe(seed!.source);
    expect(details?.field, slug).toBe(values.field);
    expect(details?.releaseDate, slug).toBe(values.releaseDate);
    expect(details?.rtp, `${slug} must not invent RTP`).toBeUndefined();
    expect(details?.maxWin, `${slug} must not invent max win`).toBeUndefined();
    expect(details?.volatility, `${slug} must not invent volatility`).toBeUndefined();
    expect(scoreFor(slug), `${slug} must move from score 2 to score 3`).toBe(3);
  }

  const ranked = catalogSeeds.map((seed) => ({
    slug: seed.slug,
    provider: seed.provider,
    score: scoreFor(seed.slug),
  }));

  expect(ranked.filter((row) => row.score <= 1)).toHaveLength(22);
  expect(ranked.filter((row) => row.score === 2)).toHaveLength(260);
  expect(ranked.filter((row) => row.score === 3)).toHaveLength(351);
  expect(ranked.filter((row) => row.score <= 1 && row.provider === "Hacksaw Gaming")).toHaveLength(17);
  expect(ranked.some((row) => row.slug === "playn-go-coin-club" && row.score === 0)).toBe(true);
  expect(ranked.filter((row) => row.provider === "Nolimit City" && row.score <= 1)).toHaveLength(4);
  expect(ranked.some((row) => targetSlugs.has(row.slug) && row.score === 2)).toBe(false);
});
