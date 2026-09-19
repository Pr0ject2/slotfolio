import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

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
  };
  const score = [facts.field, facts.rtp, facts.maxWin, facts.volatility, facts.releaseDate].filter(Boolean).length
    + (facts.gameType ? 1 : 0)
    + facts.mechanics.length;
  const missing = [
    !facts.field && "field",
    !facts.rtp && "rtp",
    !facts.maxWin && "maxWin",
    !facts.volatility && "volatility",
    !facts.releaseDate && "releaseDate",
    !facts.gameType && "gameType",
  ].filter(Boolean);
  return { score, ...facts, missing, detailsSource: details?.source ?? null, researchSource: research?.source ?? null };
}

test.only("profile remaining score-five catalog cards", () => {
  const rows = catalogSeeds
    .map((seed) => ({ slug: seed.slug, provider: seed.provider, ...profile(seed.slug) }))
    .filter((row) => row.score === 5);

  const byProvider = Object.fromEntries(
    [...new Set(rows.map((row) => row.provider))]
      .sort()
      .map((provider) => [provider, rows.filter((row) => row.provider === provider).length]),
  );
  const bySignature = Object.fromEntries(
    [...new Set(rows.map((row) => row.missing.join("+")))]
      .sort()
      .map((signature) => [signature, rows.filter((row) => row.missing.join("+") === signature).length]),
  );

  console.log("SCORE5_COUNT", rows.length);
  console.log("SCORE5_BY_PROVIDER", JSON.stringify(byProvider));
  console.log("SCORE5_BY_SIGNATURE", JSON.stringify(bySignature));
  console.log("SCORE5_ROWS", JSON.stringify(rows));
  expect(rows.length).toBeGreaterThan(0);
});
