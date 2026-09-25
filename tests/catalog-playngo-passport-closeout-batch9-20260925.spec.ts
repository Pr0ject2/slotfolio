import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const targets = [
  "playn-go-crystal-sun",
  "playn-go-dawn-of-egypt",
  "playn-go-diamond-vortex",
  "playn-go-dio-killing-the-dragon",
  "playn-go-disco-diamonds",
  "playn-go-doom-of-egypt",
  "playn-go-dr-toonz",
  "playn-go-dragonfates-favor",
  "playn-go-eye-of-atum",
  "playn-go-fangs-and-fire",
] as const;

test("ninth Play'n GO passport closeout batch is fully populated", () => {
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
    expect(details?.maxWinSource, `${slug} max-win provenance`).toMatch(/^https:\/\//);
    expect(details?.volatilitySource, `${slug} volatility provenance`).toMatch(/^https:\/\//);
  }

  const doom = getVerifiedCatalogDetails("playn-go-doom-of-egypt") as ReturnType<typeof getVerifiedCatalogDetails> & {
    fieldSource?: string;
  };
  expect(doom?.field).toBe("5×3 · 10 линий");
  expect(doom?.fieldSource).toMatch(/^https:\/\//);
});

test("ninth closeout preserves representative math facts", () => {
  expect(getVerifiedCatalogDetails("playn-go-crystal-sun")?.rtp).toBe("96,60%");
  expect(getVerifiedCatalogDetails("playn-go-crystal-sun")?.maxWin).toBe("4 000x");

  expect(getVerifiedCatalogDetails("playn-go-dawn-of-egypt")?.rtp).toBe("96,23%");
  expect(getVerifiedCatalogDetails("playn-go-dawn-of-egypt")?.maxWin).toBe("5 000x");

  expect(getVerifiedCatalogDetails("playn-go-dio-killing-the-dragon")?.rtp).toBe(
    "96,25% / 94,25% / 91,25% / 87,25% / 84,25%",
  );
  expect(getVerifiedCatalogDetails("playn-go-dio-killing-the-dragon")?.maxWin).toBe("15 000x");

  expect(getVerifiedCatalogDetails("playn-go-disco-diamonds")?.rtp).toBe("96,29%");
  expect(getVerifiedCatalogDetails("playn-go-disco-diamonds")?.volatility).toBe("Средняя");

  expect(getVerifiedCatalogDetails("playn-go-dr-toonz")?.maxWin).toBe("22 000x");

  expect(getVerifiedCatalogDetails("playn-go-dragonfates-favor")?.rtp).toBe(
    "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
  );
  expect(getVerifiedCatalogDetails("playn-go-dragonfates-favor")?.maxWin).toBe("30 000x");

  expect(getVerifiedCatalogDetails("playn-go-eye-of-atum")?.maxWin).toBe("2 000x");
  expect(getVerifiedCatalogDetails("playn-go-fangs-and-fire")?.maxWin).toBe("60 000x");
});

test("ninth closeout keeps canonical Play'n GO pages primary", () => {
  const seeds = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));
  for (const slug of targets) {
    expect(getVerifiedCatalogDetails(slug)?.source, slug).toBe(seeds.get(slug)?.source);
  }
});
