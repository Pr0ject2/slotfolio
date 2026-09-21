import { test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

function scoreFor(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const detailFacts = details
    ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length
    : 0;
  return detailFacts + (type ? 1 : 0) + (research?.mechanics.length ?? 0);
}

function missingFor(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const missing: string[] = [];
  if (!details?.field) missing.push("field");
  if (!details?.rtp) missing.push("rtp");
  if (!details?.maxWin) missing.push("maxWin");
  if (!details?.volatility) missing.push("volatility");
  if (!details?.releaseDate) missing.push("releaseDate");
  if (!type) missing.push("gameType");
  if (!(research?.mechanics.length ?? 0)) missing.push("mechanics");
  return missing;
}

test("profile current score-six catalog tail by provider and missing signature", () => {
  const rows = catalogSeeds
    .filter((seed) => scoreFor(seed.slug) === 6)
    .map((seed) => ({ provider: seed.provider, slug: seed.slug, missing: missingFor(seed.slug) }));

  const byProvider = new Map<string, { count: number; signatures: Map<string, number> }>();
  for (const row of rows) {
    const current = byProvider.get(row.provider) ?? { count: 0, signatures: new Map<string, number>() };
    current.count += 1;
    const signature = row.missing.join("+") || "none";
    current.signatures.set(signature, (current.signatures.get(signature) ?? 0) + 1);
    byProvider.set(row.provider, current);
  }

  const summary = [...byProvider.entries()]
    .map(([provider, value]) => ({
      provider,
      count: value.count,
      signatures: [...value.signatures.entries()]
        .sort((a, b) => b[1] - a[1])
        .map(([signature, count]) => ({ signature, count })),
    }))
    .sort((a, b) => b.count - a.count || a.provider.localeCompare(b.provider));

  const threeOaks = rows
    .filter((row) => row.provider === "3 Oaks Gaming")
    .map((row) => {
      const research = getVerifiedCatalogResearch(row.slug);
      return {
        slug: row.slug,
        mechanics: research?.mechanics ?? [],
        source: research?.source,
        evidenceSource: research?.evidenceSource,
      };
    });

  console.log("SCORE6_PROVIDER_PROFILE", JSON.stringify({ total: rows.length, summary }));
  console.log("SCORE6_3OAKS_MECHANICS", JSON.stringify(threeOaks));
});
