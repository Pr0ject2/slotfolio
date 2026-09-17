import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { slots } from "../src/lib/data";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const repaired = [
  {
    oldSlug: "nolimit-city-bowel-of-beelzebub24th-november-20261st-december-2026",
    slug: "nolimit-city-bowel-of-beelzebub",
    name: "Bowel Of Beelzebub",
    source: "https://nolimitcity.com/games/bowel-of-beelzebub",
    releaseDate: "2026-12-01",
  },
  {
    oldSlug: "nolimit-city-ding-dong-death15th-september-202622nd-september-2026",
    slug: "nolimit-city-ding-dong-death",
    name: "Ding Dong Death",
    source: "https://nolimitcity.com/games/ding-dong-death",
    releaseDate: "2026-09-22",
  },
  {
    oldSlug: "nolimit-city-duck-hunters-23rd-september-202610th-september-2026",
    slug: "nolimit-city-duck-hunters-2",
    name: "Duck Hunters 2",
    source: "https://nolimitcity.com/games/duck-hunters-2",
    releaseDate: "2026-09-10",
  },
  {
    oldSlug: "nolimit-city-fire-in-the-hole-410th-november-202617th-november-2026",
    slug: "nolimit-city-fire-in-the-hole-4",
    name: "Fire In The Hole 4",
    source: "https://nolimitcity.com/games/game-1",
    releaseDate: "2026-11-17",
  },
  {
    oldSlug: "nolimit-city-gator-hunters-229th-september-20266th-october-2026",
    slug: "nolimit-city-gator-hunters-2",
    name: "Gator Hunters 2",
    source: "https://nolimitcity.com/games/gator-hunters-2",
    releaseDate: "2026-10-06",
  },
  {
    oldSlug: "nolimit-city-six-feet-under13th-october-202620th-october-2026",
    slug: "nolimit-city-six-feet-under",
    name: "Six Feet Under",
    source: "https://nolimitcity.com/games/six-feet-under",
    releaseDate: "2026-10-20",
  },
] as const;

test("Nolimit roadmap parser artifacts resolve to canonical catalog slugs", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));
  const fullKeys = new Set(slots.map((slot) => `${slot.provider}\u0000${slot.name}`));

  expect(catalogSeeds).toHaveLength(900);

  for (const item of repaired) {
    expect(selected.has(item.oldSlug), item.oldSlug).toBe(false);

    const seed = selected.get(item.slug);
    expect(seed, item.slug).toBeTruthy();
    expect(seed?.name, item.slug).toBe(item.name);
    expect(seed?.provider, item.slug).toBe("Nolimit City");
    expect(seed?.source, item.slug).toBe(item.source);
    expect(fullKeys.has(`Nolimit City\u0000${item.name}`), item.slug).toBe(false);

    const details = getVerifiedCatalogDetails(item.slug);
    expect(details?.source, item.slug).toBe(item.source);
    expect(details?.releaseDate, item.slug).toBe(item.releaseDate);

    const gameType = getVerifiedCatalogGameType(item.slug);
    expect(gameType?.gameType, item.slug).toBe("Slots");
    expect(gameType?.source, item.slug).toBe(item.source);
  }

  const gator = getVerifiedCatalogDetails("nolimit-city-gator-hunters-2");
  expect(gator?.field).toBe("6×5");
  expect(gator?.rtp).toBe("96,00%");
  expect(gator?.maxWin).toBe("30 000x");

  expect(getVerifiedCatalogResearch("nolimit-city-duck-hunters-2")?.mechanics).toEqual(["Способы"]);
  expect(getVerifiedCatalogResearch("nolimit-city-duck-hunters-23rd-september-202610th-september-2026")).toBeUndefined();
});
