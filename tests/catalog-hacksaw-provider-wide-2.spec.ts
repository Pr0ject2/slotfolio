import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const targetSlugs = new Set([
  "hacksaw-gaming-beam-boys",
  "hacksaw-gaming-bullets-and-bounty",
  "hacksaw-gaming-danny-dollar",
  "hacksaw-gaming-dawn-of-kings",
  "hacksaw-gaming-densho",
  "hacksaw-gaming-divine-drop",
  "hacksaw-gaming-donny-dough",
  "hacksaw-gaming-dropem",
  "hacksaw-gaming-dusk-princess",
  "hacksaw-gaming-evil-eyes",
  "hacksaw-gaming-eye-of-medusa",
  "hacksaw-gaming-eye-of-the-panda",
  "hacksaw-gaming-feel-the-beat",
  "hacksaw-gaming-fighter-pit",
  "hacksaw-gaming-fist-of-destruction",
  "hacksaw-gaming-immortal-desire",
  "hacksaw-gaming-jelly-slice",
  "hacksaw-gaming-keepem",
  "hacksaw-gaming-klowns",
  "hacksaw-gaming-le-cowboy",
  "hacksaw-gaming-rainbow-princess",
  "hacksaw-gaming-rise-of-ymir",
  "hacksaw-gaming-rusty-and-curly",
  "hacksaw-gaming-shaolin-master",
  "hacksaw-gaming-slayers-inc",
  "hacksaw-gaming-snow-slingers",
  "hacksaw-gaming-steamrunners",
  "hacksaw-gaming-tai-the-toad",
  "hacksaw-gaming-temple-of-torment",
  "hacksaw-gaming-twisted-lab",
  "hacksaw-gaming-wishbringer",
  "hacksaw-gaming-xmas-drop",
  "hacksaw-gaming-ze-zeus",
]);

function scoreParts(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const research = getVerifiedCatalogResearch(slug);
  const detailFacts = details
    ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length
    : 0;
  const researchFacts = research?.mechanics.length ?? 0;
  const type = getVerifiedCatalogGameType(slug);
  return { withoutType: detailFacts + researchFacts, total: detailFacts + researchFacts + (type ? 1 : 0) };
}

test("second provider-wide Hacksaw pass adds official Game Type to all thirty-three selected score-2 cards", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  expect(targetSlugs.size).toBe(33);
  expect(catalogSeeds).toHaveLength(900);

  for (const slug of targetSlugs) {
    const seed = selected.get(slug);
    expect(seed, slug).toBeTruthy();
    expect(seed!.provider, slug).toBe("Hacksaw Gaming");

    const gameType = getVerifiedCatalogGameType(slug);
    expect(gameType, slug).toEqual({
      gameType: "Slots",
      source: seed!.source,
      verifiedAt: "2026-09-16",
    });

    const scores = scoreParts(slug);
    expect(scores.withoutType, `${slug} must preserve its two previously verified facts`).toBe(2);
    expect(scores.total, `${slug} must move from score 2 to score 3 only through official Game Type`).toBe(3);
  }

  const ranked = catalogSeeds.map((seed) => ({
    slug: seed.slug,
    provider: seed.provider,
    score: scoreParts(seed.slug).total,
  }));

  expect(ranked.filter((row) => row.score <= 1)).toHaveLength(5);
  expect(ranked.filter((row) => row.score === 2)).toHaveLength(114);
  expect(ranked.filter((row) => row.score === 3)).toHaveLength(489);
  expect(ranked.filter((row) => row.provider === "Hacksaw Gaming" && row.score === 2)).toHaveLength(59);
  expect(ranked.filter((row) => row.provider === "Hacksaw Gaming" && row.score <= 1)).toHaveLength(0);
  expect(ranked.filter((row) => row.provider === "Nolimit City" && row.score <= 1)).toHaveLength(4);
  expect(ranked.some((row) => row.slug === "playn-go-coin-club" && row.score === 0)).toBe(true);
  expect(ranked.some((row) => targetSlugs.has(row.slug) && row.score === 2)).toBe(false);
});
