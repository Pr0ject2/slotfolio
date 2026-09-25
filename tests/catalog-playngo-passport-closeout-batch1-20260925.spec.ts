import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const targets = [
  "playn-go-1001-mystery-genie-fortunes",
  "playn-go-ankh-of-anubis-awakening",
  "playn-go-banquet-of-dead",
  "playn-go-baron-lord-of-saturday",
  "playn-go-beasts-of-fire-maximum",
  "playn-go-buildin-bucks",
  "playn-go-buildin-even-more-bucks",
  "playn-go-chambers-of-ancients",
  "playn-go-colt-lightning-firestorm",
  "playn-go-colt-lightning-inferno",
  "playn-go-crabbys-gold-ii",
  "playn-go-crystal-hall",
  "playn-go-cursed-moon-power-collection",
  "playn-go-dansband-pa-turne",
  "playn-go-easter-eggspedition",
  "playn-go-fulong-88",
] as const;

test("first Play'n GO passport closeout batch is fully populated", () => {
  const selected = new Set(catalogSeeds.map((seed) => seed.slug));
  expect(targets).toHaveLength(16);

  for (const slug of targets) {
    expect(selected.has(slug), `${slug} must be in the selected catalog`).toBe(true);
    const details = getVerifiedCatalogDetails(slug) as ReturnType<typeof getVerifiedCatalogDetails> & {
      rtpSource?: string;
      maxWinSource?: string;
      volatilitySource?: string;
    };
    const gameType = getVerifiedCatalogGameType(slug);
    const research = getVerifiedCatalogResearch(slug);

    expect(details?.field, `${slug} field`).toBeTruthy();
    expect(details?.rtp, `${slug} RTP`).toBeTruthy();
    expect(details?.maxWin, `${slug} max win`).toBeTruthy();
    expect(details?.volatility, `${slug} volatility`).toBeTruthy();
    expect(details?.releaseDate, `${slug} release date`).toBeTruthy();
    expect(gameType?.gameType, `${slug} game type`).toBeTruthy();
    expect(research?.mechanics.length, `${slug} mechanics`).toBeGreaterThan(0);
    expect(details?.rtpSource, `${slug} RTP provenance`).toMatch(/^https:\/\//);
    expect(details?.volatilitySource, `${slug} volatility provenance`).toMatch(/^https:\/\//);
    if (slug !== "playn-go-1001-mystery-genie-fortunes") {
      expect(details?.maxWinSource, `${slug} max-win provenance`).toMatch(/^https:\/\//);
    }
  }
});

test("later math completion does not overwrite canonical Play'n GO source facts", () => {
  const seeds = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));
  for (const slug of targets) {
    expect(getVerifiedCatalogDetails(slug)?.source, slug).toBe(seeds.get(slug)?.source);
  }
});
