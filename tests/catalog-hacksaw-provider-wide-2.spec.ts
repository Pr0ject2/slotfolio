import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";

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

test("second provider-wide Hacksaw pass preserves official Game Type on all thirty-three targets", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  expect(targetSlugs.size).toBe(33);
  expect(catalogSeeds).toHaveLength(900);

  for (const slug of targetSlugs) {
    const seed = selected.get(slug);
    expect(seed, slug).toBeTruthy();
    expect(seed!.provider, slug).toBe("Hacksaw Gaming");

    expect(getVerifiedCatalogGameType(slug), slug).toEqual({
      gameType: "Slots",
      source: seed!.source,
      verifiedAt: "2026-09-16",
    });
  }
});
