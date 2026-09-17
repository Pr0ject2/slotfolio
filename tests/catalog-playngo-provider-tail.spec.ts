import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const expected: Record<string, { releaseDate: string; mechanic: string; evidenceSource?: string }> = {
  "playn-go-5x-magic": { releaseDate: "2012-11-30", mechanic: "Множители" },
  "playn-go-athena-ascending": { releaseDate: "2022-12-01", mechanic: "Множители" },
  "playn-go-cat-wilde-and-the-lost-chapter": {
    releaseDate: "2022-02-10",
    mechanic: "Расширяющиеся символы",
    evidenceSource: "https://www.playngo.com/post/cat-wilde-and-the-lost-chapter",
  },
  "playn-go-derby-wheel": { releaseDate: "2022-06-09", mechanic: "Бонусное колесо" },
  "playn-go-fortune-teller": { releaseDate: "2012-11-29", mechanic: "Pick-and-click" },
  "playn-go-idol-of-fortune": {
    releaseDate: "2022-05-12",
    mechanic: "Mystery Reels",
    evidenceSource: "https://www.playngo.com/posts/idol-of-fortune",
  },
  "playn-go-invading-vegas": {
    releaseDate: "2023-01-12",
    mechanic: "Lock On Re-Spin",
    evidenceSource: "https://www.playngo.com/post/invading-vegas",
  },
  "playn-go-irish-gold": { releaseDate: "2012-12-12", mechanic: "Линии" },
  "playn-go-jewel-box": { releaseDate: "2012-11-29", mechanic: "Pick-and-click" },
  "playn-go-mega-don": { releaseDate: "2022-07-28", mechanic: "Трансформация символов" },
  "playn-go-myth": { releaseDate: "2012-11-29", mechanic: "Множители" },
  "playn-go-new-year-riches": { releaseDate: "2020-11-26", mechanic: "Нарастающий множитель" },
  "playn-go-pandoras-box-of-evil": { releaseDate: "2023-03-02", mechanic: "Re-Spin" },
  "playn-go-pearl-lagoon": { releaseDate: "2012-10-05", mechanic: "Множители" },
  "playn-go-pilgrim-of-dead": { releaseDate: "2023-01-19", mechanic: "Расширяющиеся символы" },
  "playn-go-pimped": { releaseDate: "2015-02-16", mechanic: "Win Spins™" },
};

function scoreFor(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const detailFacts = details
    ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length
    : 0;
  return detailFacts + (type ? 1 : 0) + (research?.mechanics.length ?? 0);
}

test("final Play’n GO provider tail moves all sixteen remaining score-2 cards to score 3 from exact official features", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  expect(Object.keys(expected)).toHaveLength(16);

  for (const [slug, facts] of Object.entries(expected)) {
    const seed = selected.get(slug);
    expect(seed, slug).toBeTruthy();
    expect(seed?.provider, slug).toBe("Play’n GO");

    const details = getVerifiedCatalogDetails(slug);
    const gameType = getVerifiedCatalogGameType(slug);
    const research = getVerifiedCatalogResearch(slug);

    expect(details?.releaseDate, slug).toBe(facts.releaseDate);
    expect(gameType?.gameType, slug).toBe("Video Slot");
    expect(research?.source, slug).toBe(seed?.source);
    expect(research?.verifiedAt, slug).toBe("2026-09-17");
    expect(research?.mechanics, slug).toEqual([facts.mechanic]);
    expect(research?.evidence, slug).toBeTruthy();

    if (facts.evidenceSource) {
      expect("evidenceSource" in (research ?? {}) ? research?.evidenceSource : undefined, slug).toBe(facts.evidenceSource);
    }

    expect(scoreFor(slug), slug).toBe(3);
  }
});
