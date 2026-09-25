import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const targets = [
  "playn-go-cash-of-command",
  "playn-go-cash-pump",
  "playn-go-cash-vandal",
  "playn-go-cash-a-cabana",
  "playn-go-cashin-joker",
  "playn-go-cat-wilde-and-the-doom-of-dead",
  "playn-go-cat-wilde-and-the-incan-quest",
  "playn-go-cat-wilde-and-the-lost-chapter",
  "playn-go-cat-wilde-and-the-pyramids-of-dead",
  "playn-go-cat-wilde-in-the-eclipse-of-the-sun-god",
] as const;

test("sixth Play'n GO passport closeout batch is fully populated", () => {
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
});

test("sixth closeout preserves representative RTP ladders and layouts", () => {
  const command = getVerifiedCatalogDetails("playn-go-cash-of-command") as ReturnType<typeof getVerifiedCatalogDetails> & { fieldSource?: string };
  expect(command?.field).toBe("9×9 · Cluster Pays");
  expect(command?.fieldSource).toMatch(/^https:\/\//);
  expect(command?.rtp).toBe("96,28% / 94,27% / 91,27% / 87,24% / 84,23%");

  expect(getVerifiedCatalogDetails("playn-go-cash-vandal")?.rtp).toBe("96,47% / 94,42% / 91,41% / 87,43% / 84,41%");
  expect(getVerifiedCatalogDetails("playn-go-cashin-joker")?.rtp).toBe("96,00% / 94,21% / 91,21% / 87,21% / 84,21%");

  const lost = getVerifiedCatalogDetails("playn-go-cat-wilde-and-the-lost-chapter") as ReturnType<typeof getVerifiedCatalogDetails> & { fieldSource?: string };
  expect(lost?.field).toBe("5×3 · 10 линий");
  expect(lost?.fieldSource).toMatch(/^https:\/\//);

  const pyramids = getVerifiedCatalogDetails("playn-go-cat-wilde-and-the-pyramids-of-dead") as ReturnType<typeof getVerifiedCatalogDetails> & { fieldSource?: string };
  expect(pyramids?.field).toBe("5×3 · 10 линий");
  expect(pyramids?.volatility).toBe("Средняя");
});

test("sixth closeout keeps canonical Play'n GO pages primary", () => {
  const seeds = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));
  for (const slug of targets) {
    expect(getVerifiedCatalogDetails(slug)?.source, slug).toBe(seeds.get(slug)?.source);
  }
});
