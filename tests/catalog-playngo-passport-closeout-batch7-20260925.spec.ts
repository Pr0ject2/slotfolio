import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const targets = [
  "playn-go-nsync-pop",
  "playn-go-3-blades-and-blessings",
  "playn-go-5x-magic",
  "playn-go-ace-of-spades",
  "playn-go-agent-destiny",
  "playn-go-agent-of-hearts",
  "playn-go-cats-and-cash",
  "playn-go-champions-of-mithrune",
  "playn-go-charlie-chance",
  "playn-go-charlie-chance-and-the-curse-of-cleopatra",
] as const;

const fieldTargets = new Set([
  "playn-go-5x-magic",
  "playn-go-agent-of-hearts",
  "playn-go-cats-and-cash",
  "playn-go-champions-of-mithrune",
]);

const maxWinTargets = new Set<string>(targets.filter((slug) => slug !== "playn-go-ace-of-spades"));

test("seventh Play'n GO passport closeout batch is fully populated", () => {
  const selected = new Set(catalogSeeds.map((seed) => seed.slug));
  expect(targets).toHaveLength(10);

  for (const slug of targets) {
    expect(selected.has(slug), `${slug} must be in the selected catalog`).toBe(true);
    const details = getVerifiedCatalogDetails(slug) as ReturnType<typeof getVerifiedCatalogDetails> & {
      fieldSource?: string;
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
    if (fieldTargets.has(slug)) expect(details?.fieldSource, `${slug} field provenance`).toMatch(/^https:\/\//);
    if (maxWinTargets.has(slug)) expect(details?.maxWinSource, `${slug} max-win provenance`).toMatch(/^https:\/\//);
  }
});

test("seventh closeout preserves representative version-aware math facts", () => {
  expect(getVerifiedCatalogDetails("playn-go-nsync-pop")?.rtp).toBe(
    "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
  );
  expect(getVerifiedCatalogDetails("playn-go-agent-destiny")?.rtp).toBe(
    "96,26% / 94,26% / 91,25% / 87,25% / 84,25%",
  );
  expect(getVerifiedCatalogDetails("playn-go-agent-of-hearts")?.field).toBe(
    "7-7-5-5-5-7-7 · Cluster Pays",
  );
  expect(getVerifiedCatalogDetails("playn-go-cats-and-cash")?.rtp).toBe("96,07% / 94,12%");
  expect(getVerifiedCatalogDetails("playn-go-champions-of-mithrune")?.field).toBe("5×5 · 20 линий");
  expect(getVerifiedCatalogDetails("playn-go-charlie-chance")?.maxWin).toBe("20 000x");
  expect(getVerifiedCatalogDetails("playn-go-charlie-chance")?.volatility).toBe("Высокая");
});

test("seventh closeout keeps existing official Ace of Spades max win", () => {
  const ace = getVerifiedCatalogDetails("playn-go-ace-of-spades") as ReturnType<typeof getVerifiedCatalogDetails> & {
    maxWinSource?: string;
  };
  expect(ace?.maxWin).toBe("2500 монет");
  expect(ace?.maxWinSource).toBe("https://www.playngo.com/games/ace-of-spades");
});

test("seventh closeout keeps canonical Play'n GO pages primary", () => {
  const seeds = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));
  for (const slug of targets) {
    expect(getVerifiedCatalogDetails(slug)?.source, slug).toBe(seeds.get(slug)?.source);
  }
});
