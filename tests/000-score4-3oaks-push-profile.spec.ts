import { test, expect } from "@playwright/test";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const targets = [
  "3-oaks-gaming-black-wolf-2",
  "3-oaks-gaming-coin-up-volcano",
  "3-oaks-gaming-dragon-pearls",
  "3-oaks-gaming-hot-fire-fruits",
  "3-oaks-gaming-super-china-pots",
  "push-gaming-iron-phoenix",
] as const;

function profile(slug: string) {
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
    detailsSource: details?.source ?? null,
    researchSource: research?.source ?? null,
  };
  const score = [facts.field, facts.rtp, facts.maxWin, facts.volatility, facts.releaseDate].filter(Boolean).length
    + (facts.gameType ? 1 : 0) + facts.mechanics.length;
  return { score, ...facts };
}

test.only("profile final 3 Oaks and Push score-four tail", () => {
  const rows = targets.map((slug) => ({ slug, ...profile(slug) }));
  console.log("FINAL_NON_PLAYNGO_SCORE4", JSON.stringify(rows));
  expect(rows).toHaveLength(6);
});
