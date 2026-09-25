import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const targets = [
  "playn-go-charlie-chance-in-hell-to-pay",
  "playn-go-chronos-joker",
  "playn-go-city-of-sound",
  "playn-go-clash-of-camelot",
  "playn-go-cloud-quest",
  "playn-go-coils-of-cash",
  "playn-go-colt-lightning",
  "playn-go-contact",
  "playn-go-coywolf-cash",
  "playn-go-crabbys-gold",
] as const;

const maxWinTargets = new Set<string>(
  targets.filter((slug) => slug !== "playn-go-colt-lightning" && slug !== "playn-go-crabbys-gold"),
);

test("eighth Play'n GO passport closeout batch is fully populated", () => {
  const selected = new Set(catalogSeeds.map((seed) => seed.slug));
  expect(targets).toHaveLength(10);

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
    if (maxWinTargets.has(slug)) expect(details?.maxWinSource, `${slug} max-win provenance`).toMatch(/^https:\/\//);
  }
});

test("eighth closeout preserves representative RTP ladders and exact max wins", () => {
  expect(getVerifiedCatalogDetails("playn-go-charlie-chance-in-hell-to-pay")?.rtp).toBe(
    "96,23% / 94,79% / 91,33% / 87,59% / 84,71%",
  );
  expect(getVerifiedCatalogDetails("playn-go-chronos-joker")?.rtp).toBe(
    "96,54% / 94,57% / 91,56% / 87,53% / 84,52%",
  );
  expect(getVerifiedCatalogDetails("playn-go-city-of-sound")?.maxWin).toBe("4 000x");
  expect(getVerifiedCatalogDetails("playn-go-clash-of-camelot")?.maxWin).toBe("35 000x");
  expect(getVerifiedCatalogDetails("playn-go-cloud-quest")?.rtp).toBe(
    "96,52% / 94,54% / 91,54% / 87,54% / 84,53%",
  );
  expect(getVerifiedCatalogDetails("playn-go-coils-of-cash")?.maxWin).toBe("30 000x");
  expect(getVerifiedCatalogDetails("playn-go-contact")?.maxWin).toBe("1 517,5x");
  expect(getVerifiedCatalogDetails("playn-go-coywolf-cash")?.rtp).toBe(
    "96,31% / 94,30% / 91,28% / 87,26% / 84,25%",
  );
  expect(getVerifiedCatalogDetails("playn-go-crabbys-gold")?.rtp).toBe(
    "96,25% / 94,25% / 91,25% / 87,25% / 84,25%",
  );
});

test("Contact keeps official Play'n GO maximum-win provenance", () => {
  const contact = getVerifiedCatalogDetails("playn-go-contact") as ReturnType<typeof getVerifiedCatalogDetails> & {
    maxWinSource?: string;
  };
  expect(contact?.maxWinSource).toBe("https://www.playngo.com/games/contact");
});

test("eighth closeout keeps canonical Play'n GO pages primary", () => {
  const seeds = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));
  for (const slug of targets) {
    expect(getVerifiedCatalogDetails(slug)?.source, slug).toBe(seeds.get(slug)?.source);
  }
});
