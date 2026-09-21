import { expect, test } from "@playwright/test";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const slugs = [
  "push-gaming-big-bamboo-2",
  "push-gaming-fang-city",
  "push-gaming-happy-bamboo",
  "push-gaming-henry-the-ape",
  "push-gaming-mad-blast",
  "push-gaming-razor-shark-jackpots",
  "push-gaming-red-hot-multipliers",
  "push-gaming-regal-knights",
  "push-gaming-the-great-banker",
] as const;

test("profile final Push Gaming score-six composition", () => {
  for (const slug of slugs) {
    const details = getVerifiedCatalogDetails(slug);
    const type = getVerifiedCatalogGameType(slug);
    const research = getVerifiedCatalogResearch(slug);
    console.log("PUSH_SCORE6_PROFILE", JSON.stringify({ slug, details, type, mechanics: research?.mechanics ?? [] }));
    const detailFacts = details
      ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length
      : 0;
    const score = detailFacts + (type ? 1 : 0) + (research?.mechanics.length ?? 0);
    expect(score, slug).toBe(6);
  }
});
