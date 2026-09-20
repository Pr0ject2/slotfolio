import { test, expect } from "@playwright/test";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const slugs = [
  "playn-go-15-crystal-roses-a-tale-of-love",
  "playn-go-3-blades-and-blessings",
  "playn-go-ankh-of-anubis",
  "playn-go-bakers-treat",
  "playn-go-bao-shi",
  "playn-go-barn-busters",
  "playn-go-beasts-of-fire",
  "playn-go-beasts-of-fire-maximum",
  "playn-go-big-win-cat-pawsperity",
  "playn-go-boat-bonanza-christmas",
] as const;

test.only("profile second Play’n GO score-six wave", () => {
  const rows = slugs.map((slug) => {
    const details = getVerifiedCatalogDetails(slug);
    const type = getVerifiedCatalogGameType(slug);
    const research = getVerifiedCatalogResearch(slug);
    const facts = {
      field: details?.field ?? null,
      rtp: details?.rtp ?? null,
      maxWin: details?.maxWin ?? null,
      volatility: details?.volatility ?? null,
      releaseDate: details?.releaseDate ?? null,
      gameType: type?.gameType ?? null,
      mechanics: research?.mechanics ?? [],
    };
    const score = [facts.field, facts.rtp, facts.maxWin, facts.volatility, facts.releaseDate].filter(Boolean).length
      + (facts.gameType ? 1 : 0)
      + facts.mechanics.length;
    return { slug, score, ...facts };
  });

  console.log("PLAYNGO_SCORE6_WAVE2", JSON.stringify(rows));
  expect(rows.every((row) => row.score === 6)).toBeTruthy();
});
