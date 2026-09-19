import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";
import { getCatalogResearchPlayngoFillMechanics20 } from "../src/lib/catalog-research-playngo-fill-mechanics-20";

const targets = [
  "playn-go-aztec-idols",
  "playn-go-chronos-joker",
  "playn-go-crazy-cows",
  "playn-go-dansband-pa-turne",
  "playn-go-doom-of-egypt",
  "playn-go-dragon-ship",
  "playn-go-easter-eggs",
  "playn-go-enchanted-crystals",
  "playn-go-enchanted-meadow",
  "playn-go-fu-er-dai",
  "playn-go-game-of-gladiators",
  "playn-go-gold-trophy-2",
  "playn-go-golden-caravan",
  "playn-go-golden-colts",
  "playn-go-golden-ticket",
  "playn-go-grim-muerto",
  "playn-go-happy-halloween",
  "playn-go-holiday-season",
  "playn-go-holiday-spirits",
  "playn-go-house-of-doom",
  "playn-go-hugo",
  "playn-go-hugo-2",
  "playn-go-hugo-goal",
  "playn-go-hugos-adventure",
  "playn-go-inferno-joker",
  "playn-go-inferno-star",
  "playn-go-invading-vegas-revenge-on-mars",
  "playn-go-iron-girl",
  "playn-go-jade-magician",
  "playn-go-jolly-roger",
  "playn-go-kings-mask",
  "playn-go-legacy-of-egypt",
  "playn-go-leprechaun-goes-egypt",
  "playn-go-leprechaun-goes-wild",
  "playn-go-lord-merlin-and-the-lady-of-the-lake",
  "playn-go-lucky-diamonds",
  "playn-go-mermaids-diamond",
  "playn-go-muerto-en-mictlan",
  "playn-go-multifruit-81",
  "playn-go-mystery-joker",
  "playn-go-ninja-fruits",
  "playn-go-phoenix-reborn",
  "playn-go-photo-safari",
  "playn-go-pimped",
  "playn-go-queens-day-tilt",
  "playn-go-rabbit-hole-riches",
] as const;

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

test("final Play’n GO score-four pass lifts all 46 official-feature targets without freezing future enrichment", () => {
  expect(targets).toHaveLength(46);
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  for (const slug of targets) {
    const seed = selected.get(slug);
    const pass = getCatalogResearchPlayngoFillMechanics20(slug);
    const runtime = getVerifiedCatalogResearch(slug);

    expect(seed, slug).toBeTruthy();
    expect(seed?.provider, slug).toBe("Play’n GO");
    expect(pass, slug).toBeTruthy();
    expect(pass?.source, slug).toMatch(/^https:\/\/www\.playngo\.com\//);
    expect(pass?.verifiedAt, slug).toBe("2026-09-19");
    expect(pass?.evidence, slug).toBeTruthy();
    expect(runtime?.source, slug).toBe(seed?.source);
    for (const mechanic of pass?.mechanics ?? []) {
      expect(runtime?.mechanics, `${slug}: ${mechanic}`).toContain(mechanic);
    }
    expect(scoreFor(slug), slug).toBeGreaterThanOrEqual(5);
  }
});

test("final Play’n GO pass keeps representative official feature sets intact", () => {
  const expected: Record<string, string[]> = {
    "playn-go-chronos-joker": ["Респины", "Прогрессивные множители"],
    "playn-go-golden-ticket": ["Удаление символов", "Прогрессивные множители"],
    "playn-go-hugos-adventure": ["Flying Wilds", "Sticky Wilds", "Множители"],
    "playn-go-iron-girl": ["Респины", "Sticky Symbols", "Сбор символов", "Прогрессивные множители", "Wild Add"],
    "playn-go-muerto-en-mictlan": ["Расширяющиеся символы", "Walking Wilds", "Sticky Wilds"],
    "playn-go-rabbit-hole-riches": ["Pick-and-click", "Респины", "Instant Prizes", "Прогрессивные множители"],
  };

  for (const [slug, mechanics] of Object.entries(expected)) {
    const runtime = getVerifiedCatalogResearch(slug);
    for (const mechanic of mechanics) {
      expect(runtime?.mechanics, `${slug}: ${mechanic}`).toContain(mechanic);
    }
  }
});
