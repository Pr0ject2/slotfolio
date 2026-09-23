import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const candidates = [
  "playn-go-octopus-treasure",
  "playn-go-ghost-of-dead",
  "playn-go-lordi-reel-monsters",
  "playn-go-legion-gold-unleashed",
  "playn-go-wild-blood-ii",
  "playn-go-happy-halloween",
  "playn-go-boat-bonanza",
  "playn-go-eye-of-the-kraken",
] as const;

test.only("probe direct Play'n GO evidence candidates", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));
  const rows = candidates.map((slug) => {
    const seed = selected.get(slug);
    const details = getVerifiedCatalogDetails(slug);
    const gameType = getVerifiedCatalogGameType(slug);
    const research = getVerifiedCatalogResearch(slug);
    const detailFacts = details ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length : 0;
    return {
      slug,
      selected: Boolean(seed),
      source: seed?.source,
      details,
      gameType,
      mechanics: research?.mechanics.length ?? 0,
      score: detailFacts + (gameType ? 1 : 0) + (research?.mechanics.length ?? 0),
    };
  });
  console.log("PLAYNGO_DIRECT_CANDIDATES", JSON.stringify(rows));
  expect(rows.length).toBe(-1);
});
