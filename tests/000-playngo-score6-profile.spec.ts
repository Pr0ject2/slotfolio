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
  return { score, ...facts };
}

test.only("profile exact Play’n GO score-six tail", () => {
  const rows = catalogSeeds
    .filter((seed) => seed.provider === "Play’n GO")
    .map((seed) => ({ slug: seed.slug, source: seed.source, ...profile(seed.slug) }))
    .filter((row) => row.score === 6)
    .map((row) => ({
      ...row,
      missing: ["field", "rtp", "maxWin", "volatility", "releaseDate", "gameType"].filter(
        (key) => !row[key as keyof typeof row],
      ),
    }));

  const signatures = new Map<string, number>();
  for (const row of rows) {
    const key = `missing=${row.missing.join(",") || "none"}; mechanics=${row.mechanics.length}`;
    signatures.set(key, (signatures.get(key) ?? 0) + 1);
  }

  const maxWinTargets = rows
    .filter((row) => row.missing.includes("maxWin"))
    .map(({ slug, source, missing, mechanics }) => ({ slug, source, missing, mechanics: mechanics.length }));
  const fieldTargets = rows
    .filter((row) => row.missing.includes("field"))
    .map(({ slug, source, missing, mechanics }) => ({ slug, source, missing, mechanics: mechanics.length }));

  console.log("PLAYNGO_SCORE6_COUNT", rows.length);
  console.log("PLAYNGO_SCORE6_SIGNATURES", JSON.stringify([...signatures.entries()].sort((a, b) => b[1] - a[1])));
  console.log("PLAYNGO_SCORE6_MAXWIN_TARGETS", JSON.stringify(maxWinTargets));
  console.log("PLAYNGO_SCORE6_FIELD_TARGETS", JSON.stringify(fieldTargets));
  expect(rows.length).toBeGreaterThan(0);
});
