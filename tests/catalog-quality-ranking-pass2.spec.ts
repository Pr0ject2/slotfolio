import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { slots } from "../src/lib/data";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const expectedFields: Record<string, string> = {
  "push-gaming-mystery-mission-to-the-moon": "6×4 · 20 линий",
  "3-oaks-gaming-hit-the-gold": "5×3 · 25 линий",
  "3-oaks-gaming-hot-fire-fruits": "3×3 · 5 линий",
  "hacksaw-gaming-beam-boys": "6×4",
  "hacksaw-gaming-bullets-and-bounty": "5×5",
  "hacksaw-gaming-danny-dollar": "5×5",
  "hacksaw-gaming-dawn-of-kings": "5×3",
  "hacksaw-gaming-densho": "10 линий",
  "hacksaw-gaming-divine-drop": "5×4 · 14 линий",
  "hacksaw-gaming-donny-dough": "14 линий",
  "hacksaw-gaming-dropem": "7776 способов",
  "hacksaw-gaming-evil-eyes": "5×5",
  "hacksaw-gaming-feel-the-beat": "5×5",
  "hacksaw-gaming-fighter-pit": "5×4",
  "hacksaw-gaming-fist-of-destruction": "5×4",
  "hacksaw-gaming-immortal-desire": "1024 способа",
  "hacksaw-gaming-jelly-slice": "5×4 · до 1204 способов",
  "hacksaw-gaming-keepem": "6×5 · 15 625 способов",
  "hacksaw-gaming-klowns": "6×5",
  "hacksaw-gaming-rise-of-ymir": "5×4",
  "hacksaw-gaming-rusty-and-curly": "5×4",
  "hacksaw-gaming-slayers-inc": "5×4 · 14 линий",
  "hacksaw-gaming-snow-slingers": "5×4",
  "hacksaw-gaming-steamrunners": "5×4",
  "hacksaw-gaming-tai-the-toad": "5×5",
  "hacksaw-gaming-temple-of-torment": "14 линий",
  "hacksaw-gaming-twisted-lab": "5×5 · 19 линий",
  "hacksaw-gaming-wishbringer": "6×4",
  "hacksaw-gaming-xmas-drop": "19 линий",
  "hacksaw-gaming-marlin-masters-og": "5×3",
  "hacksaw-gaming-marlin-masters-the-big-haul": "5×4",
  "hacksaw-gaming-mayan-stackways": "5×4 · до 100 000 способов",
  "hacksaw-gaming-mighty-masks": "20 линий",
};

const pushExpected = {
  "push-gaming-iron-phoenix": { maxWin: "12242.10x", volatility: "Низкая–средняя" },
  "push-gaming-mystery-mission-to-the-moon": { maxWin: "10000x", volatility: "Высокая" },
  "push-gaming-razor-shark-jackpots": { maxWin: "11007.70x", volatility: "Средняя" },
  "push-gaming-red-hot-multipliers": { maxWin: "2500x", volatility: "Низкая" },
} as const;

const targetSlugs = new Set([...Object.keys(expectedFields), ...Object.keys(pushExpected)]);
const pushSlugs = new Set(Object.keys(pushExpected));

test("quality pass 2 improves thin Push, 3 Oaks and Hacksaw records from official evidence", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  expect(targetSlugs.size).toBe(36);

  for (const slug of targetSlugs) {
    const seed = selected.get(slug);
    expect(seed, slug).toBeTruthy();
    expect(slots.some((slot) => slot.provider === seed!.provider && slot.name === seed!.name), slug).toBe(false);

    const details = getVerifiedCatalogDetails(slug);
    expect(details?.source, slug).toBe(seed!.source);

    if (expectedFields[slug]) {
      expect(details?.field, slug).toBe(expectedFields[slug]);
    }

    if (!pushSlugs.has(slug)) {
      expect(getVerifiedCatalogResearch(slug)?.source, slug).toBe(seed!.source);
    }
  }

  for (const [slug, expected] of Object.entries(pushExpected)) {
    const details = getVerifiedCatalogDetails(slug);
    expect(details?.maxWin, slug).toBe(expected.maxWin);
    expect(details?.volatility, slug).toBe(expected.volatility);
  }
});
