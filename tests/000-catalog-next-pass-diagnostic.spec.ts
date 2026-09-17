import { test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

function qualityScore(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const detailFacts = details
    ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length
    : 0;
  return detailFacts + (type ? 1 : 0) + (research?.mechanics.length ?? 0);
}

function plainText(html: string) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&#(?:39|x27);/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeMaxWin(raw: string) {
  const digits = raw.replace(/[^0-9]/g, "");
  if (!digits) return "";
  return `${digits.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}x`;
}

function extractMaxWin(text: string) {
  const patterns = [
    /max(?:imum)? win(?: of| is| up to| of up to)?\s*(?:an?\s*)?([0-9][0-9.,\s]*)\s*(?:x|times(?: your| the)? bet)/i,
    /([0-9][0-9.,\s]*)\s*x\s+max(?:imum)? win/i,
    /max(?:imum)? win[^.!?]{0,80}?([0-9][0-9.,\s]*)\s*x\b/i,
  ];
  for (const pattern of patterns) {
    const match = pattern.exec(text);
    if (match) return normalizeMaxWin(match[1]);
  }
  return "";
}

async function probe(seed: (typeof catalogSeeds)[number]) {
  try {
    const response = await fetch(seed.source, {
      headers: { "user-agent": "Slotfolio verification probe/1.0" },
      signal: AbortSignal.timeout(20_000),
    });
    if (!response.ok) {
      return { slug: seed.slug, source: seed.source, status: response.status, maxWin: "", sample: "" };
    }
    const text = plainText(await response.text());
    const maxWin = extractMaxWin(text);
    const maxIndex = text.toLowerCase().indexOf("max win");
    return {
      slug: seed.slug,
      source: seed.source,
      status: response.status,
      maxWin,
      sample: maxIndex >= 0 ? text.slice(Math.max(0, maxIndex - 100), maxIndex + 260) : text.slice(0, 220),
    };
  } catch (error) {
    return {
      slug: seed.slug,
      source: seed.source,
      status: 0,
      maxWin: "",
      sample: error instanceof Error ? error.message : String(error),
    };
  }
}

test.only("probe Hacksaw score-3 game pages for explicit max win", async () => {
  test.setTimeout(180_000);
  const targets = catalogSeeds.filter(
    (seed) =>
      seed.provider === "Hacksaw Gaming" &&
      qualityScore(seed.slug) === 3 &&
      !getVerifiedCatalogDetails(seed.slug)?.maxWin,
  );

  const results: Awaited<ReturnType<typeof probe>>[] = [];
  for (let i = 0; i < targets.length; i += 8) {
    results.push(...(await Promise.all(targets.slice(i, i + 8).map(probe))));
  }

  console.log(
    "HACKSAW_MAXWIN_PROBE",
    JSON.stringify({
      total: targets.length,
      explicitMaxWin: results.filter((result) => result.maxWin).length,
      verified: results.filter((result) => result.maxWin).map((result) => ({
        slug: result.slug,
        source: result.source,
        maxWin: result.maxWin,
      })),
      unresolved: results.filter((result) => !result.maxWin),
    }),
  );

  throw new Error("diagnostic only");
});
