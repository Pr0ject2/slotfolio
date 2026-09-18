import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const expected: Record<string, string> = {
  "hacksaw-gaming-beam-boys": "12 500x",
  "hacksaw-gaming-bouncy-bombs": "10 000x",
  "hacksaw-gaming-danny-dollar": "12 500x",
  "hacksaw-gaming-dawn-of-kings": "10 000x",
  "hacksaw-gaming-death-becomes-you": "15 000x",
  "hacksaw-gaming-densho": "10 000x",
  "hacksaw-gaming-dragons-domain": "10 000x",
  "hacksaw-gaming-dropem": "10 000x",
  "hacksaw-gaming-dusk-princess": "10 000x",
  "hacksaw-gaming-evil-eyes": "12 500x",
  "hacksaw-gaming-eye-of-medusa": "10 000x",
  "hacksaw-gaming-eye-of-the-panda": "10 000x",
  "hacksaw-gaming-feel-the-beat": "10 000x",
  "hacksaw-gaming-fist-of-destruction": "10 000x",
  "hacksaw-gaming-immortal-desire": "10 000x",
  "hacksaw-gaming-jelly-slice": "10 000x",
  "hacksaw-gaming-keepem": "10 000x",
  "hacksaw-gaming-klowns": "10 000x",
  "hacksaw-gaming-le-football-fan": "2 500x",
  "hacksaw-gaming-le-prechaun": "15 000x",
  "hacksaw-gaming-magic-piggy-og": "2 500x",
  "hacksaw-gaming-marlin-masters-og": "7 500x",
  "hacksaw-gaming-marlin-masters-the-big-haul": "10 000x",
  "hacksaw-gaming-mayan-stackways": "10 000x",
  "hacksaw-gaming-mighty-masks": "10 000x",
  "hacksaw-gaming-rise-of-ymir": "15 000x",
  "hacksaw-gaming-rusty-and-curly": "10 000x",
  "hacksaw-gaming-slayers-inc": "15 000x",
  "hacksaw-gaming-snow-slingers": "10 000x",
  "hacksaw-gaming-steamrunners": "10 000x",
  "hacksaw-gaming-tai-the-toad": "7 500x",
  "hacksaw-gaming-temple-of-torment": "10 000x",
  "hacksaw-gaming-the-luxe": "20 000x",
  "hacksaw-gaming-tiger-legends": "10 000x",
  "hacksaw-gaming-twisted-lab": "15 000x",
  "hacksaw-gaming-wishbringer": "10 000x",
  "hacksaw-gaming-xmas-drop": "12 500x",
  "hacksaw-gaming-ze-zeus": "10 000x",
};

function qualityScore(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const detailFacts = details
    ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length
    : 0;
  return detailFacts + (type ? 1 : 0) + (research?.mechanics.length ?? 0);
}

test("Hacksaw provider-wide max-win pass preserves official sources and raises all 38 records", () => {
  expect(Object.keys(expected)).toHaveLength(38);

  for (const [slug, maxWin] of Object.entries(expected)) {
    const seed = catalogSeeds.find((item) => item.slug === slug);
    const details = getVerifiedCatalogDetails(slug);

    expect(seed, `${slug} selected seed`).toBeTruthy();
    expect(details?.maxWin, `${slug} max win`).toBe(maxWin);
    expect(details?.source, `${slug} official source`).toBe(seed?.source);
    expect(details?.verifiedAt, `${slug} remains verified`).toBeTruthy();
    expect(qualityScore(slug), `${slug} quality score`).toBeGreaterThanOrEqual(4);
  }
});
