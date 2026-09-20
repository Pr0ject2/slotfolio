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

test.only("profile remaining score-six catalog tail after current provider waves", () => {
  const allRows = catalogSeeds.map((seed) => ({ slug: seed.slug, provider: seed.provider, source: seed.source, ...profile(seed.slug) }));
  const rows = allRows.filter((row) => row.score === 6);

  const byProvider = [...new Map(
    rows.map((row) => row.provider).map((provider) => [provider, rows.filter((row) => row.provider === provider).length]),
  ).entries()].sort((a, b) => b[1] - a[1]);

  const signatureCounts = new Map<string, number>();
  for (const row of rows) {
    const missing = ["field", "rtp", "maxWin", "volatility", "releaseDate", "gameType"]
      .filter((key) => !row[key as keyof typeof row]);
    const signature = `${row.provider} :: missing=${missing.join(",") || "none"} :: mechanics=${row.mechanics.length}`;
    signatureCounts.set(signature, (signatureCounts.get(signature) ?? 0) + 1);
  }
  const signatures = [...signatureCounts.entries()].sort((a, b) => b[1] - a[1]);

  const bgamingGaps = allRows
    .filter((row) => row.provider === "BGaming")
    .map((row) => ({
      slug: row.slug,
      source: row.source,
      missing: ["field", "rtp", "maxWin", "volatility", "releaseDate", "gameType"].filter((key) => !row[key as keyof typeof row]),
    }))
    .filter((row) => row.missing.length > 0);

  console.log("SCORE6_COUNT", rows.length);
  console.log("SCORE6_BY_PROVIDER", JSON.stringify(byProvider));
  console.log("SCORE6_SIGNATURES", JSON.stringify(signatures));
  console.log("BGAMING_PASSPORT_GAPS", JSON.stringify(bgamingGaps));

  expect(rows.length).toBeGreaterThan(0);
});
