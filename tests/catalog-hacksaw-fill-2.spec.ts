import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const expected = {
  "hacksaw-gaming-booze-bash": { mechanics: ["Match-2-Win", "Множители"] },
  "hacksaw-gaming-bullets-and-bounty": {
    maxWin: "20 000x",
    mechanics: ["Линии", "DuelReels™", "Расширяющиеся барабаны", "Множители"],
  },
  "hacksaw-gaming-cash-crew": { mechanics: ["Линии", "Множители"] },
  "hacksaw-gaming-divine-drop": {
    maxWin: "10 000x",
    volatility: "3/5",
    mechanics: ["Линии", "Множители", "Респины"],
  },
  "hacksaw-gaming-donny-dough": { mechanics: ["Линии", "LOOTLINES™", "Множители"] },
  "hacksaw-gaming-fighter-pit": {
    maxWin: "10 000x",
    mechanics: ["Линии", "Wild Fist Reels", "Расширяющиеся барабаны", "Множители"],
  },
} as const;

test("second Hacksaw fill preserves official technical facts and normalized mechanics", () => {
  expect(Object.keys(expected)).toHaveLength(6);

  for (const [slug, values] of Object.entries(expected)) {
    const seed = catalogSeeds.find((item) => item.slug === slug);
    const details = getVerifiedCatalogDetails(slug);
    const research = getVerifiedCatalogResearch(slug);

    expect(seed, slug).toBeTruthy();
    expect(details?.source, slug).toBe(seed?.source);
    expect(research?.source, slug).toBe(seed?.source);
    expect(research?.verifiedAt, slug).toBe("2026-09-18");

    if ("maxWin" in values) expect(details?.maxWin, slug).toBe(values.maxWin);
    if ("volatility" in values) expect(details?.volatility, slug).toBe(values.volatility);

    for (const mechanic of values.mechanics) {
      expect(research?.mechanics, `${slug}: ${mechanic}`).toContain(mechanic);
    }
  }
});
