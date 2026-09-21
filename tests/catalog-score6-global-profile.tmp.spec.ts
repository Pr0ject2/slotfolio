import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

function snapshot(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const values = {
    field: details?.field,
    rtp: details?.rtp,
    maxWin: details?.maxWin,
    volatility: details?.volatility,
    releaseDate: details?.releaseDate,
  };
  const detailFacts = Object.values(values).filter(Boolean).length;
  const mechanics = research?.mechanics.length ?? 0;
  const score = detailFacts + (type ? 1 : 0) + mechanics;
  const missing = Object.entries(values)
    .filter(([, value]) => !value)
    .map(([key]) => key);
  return { score, missing, mechanics, hasType: Boolean(type) };
}

test("temporary Play’n GO score-six signature profile", () => {
  const groups: Record<string, string[]> = {};
  for (const seed of catalogSeeds) {
    if (seed.provider !== "Play’n GO") continue;
    const row = snapshot(seed.slug);
    if (row.score !== 6) continue;
    const signature = `${row.missing.join("+") || "none"}|m${row.mechanics}|t${row.hasType ? 1 : 0}`;
    (groups[signature] ??= []).push(seed.slug);
  }

  const histogram = Object.fromEntries(
    Object.entries(groups)
      .map(([signature, slugs]) => [signature, slugs.length] as const)
      .sort((a, b) => b[1] - a[1]),
  );

  console.log("PLAYNGO_SCORE6_SIGNATURES", JSON.stringify(histogram));
  console.log("PLAYNGO_SCORE6_GROUPS", JSON.stringify(groups));
  expect(Object.values(groups).flat()).toHaveLength(87);
});
