import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const expectedAdditions: Record<string, string[]> = {
  "hacksaw-gaming-aiko-and-the-wind-spirit": ["Расширяющиеся символы", "Множители", "Респины"],
  "hacksaw-gaming-bash-bros": ["Множители"],
  "hacksaw-gaming-circle-of-life": ["Респины"],
  "hacksaw-gaming-cloud-princess": ["Множители"],
  "hacksaw-gaming-dandy-diamonds": ["Респины"],
  "hacksaw-gaming-donny-and-danny": ["Множители"],
  "hacksaw-gaming-donut-division": ["Множители"],
  "hacksaw-gaming-dorks-of-the-deep": ["Расширяющиеся барабаны", "Респины"],
  "hacksaw-gaming-dynasty-of-death": ["Множители"],
  "hacksaw-gaming-eternal-duel": ["Множители"],
  "hacksaw-gaming-freds-food-truck": ["Множители"],
  "hacksaw-gaming-frkn-bananas": ["Расширяющиеся символы", "Множители"],
  "hacksaw-gaming-hot-ross": ["Расширяющиеся барабаны", "Множители"],
  "hacksaw-gaming-hounds-of-hell": ["Множители"],
  "hacksaw-gaming-invictus": ["Множители"],
  "hacksaw-gaming-jaws-of-justice": ["Трансформация символов"],
  "hacksaw-gaming-le-viking": ["Респины"],
  "hacksaw-gaming-phoenix-duelreels": ["Респины"],
  "hacksaw-gaming-rainbow-princess": ["Множители"],
  "hacksaw-gaming-reign-of-rome": ["Множители"],
  "hacksaw-gaming-shaolin-master": ["Множители"],
  "hacksaw-gaming-sixsixsix": ["Бонусное колесо", "Множители"],
  "hacksaw-gaming-spinman": ["Расширяющиеся барабаны", "Бонусное колесо"],
  "hacksaw-gaming-sun-princess": ["Трансформация символов", "Множители"],
  "hacksaw-gaming-the-count": ["Расширяющиеся символы", "Множители"],
  "hacksaw-gaming-wings-of-horus": ["Трансформация символов"],
  "hacksaw-gaming-chaos-crew-3": ["Множители", "Трансформация символов"],
  "hacksaw-gaming-duel-at-dawn": ["Расширяющиеся барабаны"],
  "hacksaw-gaming-epic-bullets-and-bounty": ["Расширяющиеся барабаны"],
  "hacksaw-gaming-marlin-masters": ["Множители"],
  "hacksaw-gaming-pray-for-three": ["Бонусное колесо"],
  "hacksaw-gaming-rise-of-fortuna": ["Бонусное колесо"],
  "hacksaw-gaming-stormborn": ["Множители"],
};

function scoreFor(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  return (
    (details ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length : 0) +
    (type ? 1 : 0) +
    (research?.mechanics.length ?? 0)
  );
}

test("Hacksaw fill exposes normalized mechanics already explicit in official evidence", () => {
  expect(Object.keys(expectedAdditions)).toHaveLength(33);

  for (const [slug, additions] of Object.entries(expectedAdditions)) {
    const seed = catalogSeeds.find((item) => item.slug === slug);
    const research = getVerifiedCatalogResearch(slug);

    expect(seed, slug).toBeTruthy();
    expect(research?.source, slug).toBe(seed?.source);
    expect(research?.verifiedAt, slug).toBe("2026-09-18");
    for (const mechanic of additions) {
      expect(research?.mechanics, `${slug}: ${mechanic}`).toContain(mechanic);
    }
    expect(scoreFor(slug), slug).toBeGreaterThanOrEqual(4);
  }
});
