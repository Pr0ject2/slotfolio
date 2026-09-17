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

function storySegment(text: string) {
  const startMatch = /HERE.?S THE STORY/i.exec(text);
  if (!startMatch) return "";
  const start = startMatch.index + startMatch[0].length;
  const tail = text.slice(start);
  const endMatch = /\bFEATURES\b/i.exec(tail);
  return (endMatch ? tail.slice(0, endMatch.index) : tail.slice(0, 1800)).trim();
}

async function probe(seed: (typeof catalogSeeds)[number]) {
  try {
    const response = await fetch(seed.source, {
      headers: { "user-agent": "Slotfolio verification probe/1.0" },
      signal: AbortSignal.timeout(20_000),
    });
    if (!response.ok) {
      return { slug: seed.slug, source: seed.source, status: response.status, slot: false, story: "" };
    }
    const story = storySegment(plainText(await response.text()));
    return {
      slug: seed.slug,
      source: seed.source,
      status: response.status,
      slot: /\bslots?\b/i.test(story),
      story: story.slice(0, 420),
    };
  } catch (error) {
    return {
      slug: seed.slug,
      source: seed.source,
      status: 0,
      slot: false,
      story: error instanceof Error ? error.message : String(error),
    };
  }
}

test.only("probe 3 Oaks score-3 game pages for explicit slot wording", async () => {
  test.setTimeout(180_000);
  const targets = catalogSeeds.filter(
    (seed) =>
      seed.provider === "3 Oaks Gaming" &&
      qualityScore(seed.slug) === 3 &&
      !getVerifiedCatalogGameType(seed.slug),
  );

  const results: Awaited<ReturnType<typeof probe>>[] = [];
  for (let i = 0; i < targets.length; i += 8) {
    results.push(...(await Promise.all(targets.slice(i, i + 8).map(probe))));
  }

  console.log(
    "THREE_OAKS_SLOT_PROBE",
    JSON.stringify({
      total: targets.length,
      explicitSlot: results.filter((result) => result.slot).length,
      verified: results.filter((result) => result.slot).map((result) => result.slug),
      unresolved: results.filter((result) => !result.slot),
    }),
  );

  throw new Error("diagnostic only");
});
