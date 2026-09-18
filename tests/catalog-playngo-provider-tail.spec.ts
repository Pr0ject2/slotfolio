import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const expectedReleaseDates: Record<string, string> = {
  "playn-go-5x-magic": "2012-11-30",
  "playn-go-athena-ascending": "2022-12-01",
  "playn-go-cat-wilde-and-the-lost-chapter": "2022-02-10",
  "playn-go-derby-wheel": "2022-06-09",
  "playn-go-fortune-teller": "2012-11-29",
  "playn-go-idol-of-fortune": "2022-05-12",
  "playn-go-invading-vegas": "2023-01-12",
  "playn-go-irish-gold": "2012-12-12",
  "playn-go-jewel-box": "2012-11-29",
  "playn-go-mega-don": "2022-07-28",
  "playn-go-myth": "2012-11-29",
  "playn-go-new-year-riches": "2020-11-26",
  "playn-go-pandoras-box-of-evil": "2023-03-02",
  "playn-go-pearl-lagoon": "2012-10-05",
  "playn-go-pilgrim-of-dead": "2023-01-19",
  "playn-go-pimped": "2015-02-16",
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

test("final Play’n GO provider tail preserves the official facts that originally lifted sixteen cards", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));
  expect(Object.keys(expectedReleaseDates)).toHaveLength(16);

  for (const [slug, releaseDate] of Object.entries(expectedReleaseDates)) {
    const seed = selected.get(slug);
    expect(seed, slug).toBeTruthy();
    expect(seed?.provider, slug).toBe("Play’n GO");

    const details = getVerifiedCatalogDetails(slug);
    const gameType = getVerifiedCatalogGameType(slug);
    const research = getVerifiedCatalogResearch(slug);

    expect(details?.releaseDate, slug).toBe(releaseDate);
    expect(gameType?.gameType, slug).toBe("Video Slot");
    expect(research?.source, slug).toBe(seed?.source);
    expect(research?.mechanics.length, slug).toBeGreaterThan(0);
    expect(research?.evidence, slug).toBeTruthy();
    expect(scoreFor(slug), slug).toBeGreaterThanOrEqual(3);
  }
});
