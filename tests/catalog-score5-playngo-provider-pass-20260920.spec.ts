import { test, expect } from "@playwright/test";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const expected: Record<string, string[]> = {
  "playn-go-nsync-pop": ["Free Spins", "Wilds"],
  "playn-go-3-blades-and-blessings": ["Free Spins"],
  "playn-go-3-clown-monty": ["Free Spins", "Sticky Wilds", "Pick-and-click"],
  "playn-go-agent-destiny": ["Linked Reels", "Free Spins", "Mega Symbols"],
  "playn-go-alice-cooper-and-the-tome-of-madness": ["Wilds", "Free Spins", "Множители", "Трансформация символов"],
  "playn-go-athena-ascending": ["Free Spins", "Прогрессивные множители"],
  "playn-go-banana-rock": ["Free Spins", "Wilds"],
  "playn-go-buildin-even-more-bucks": ["Free Spins"],
  "playn-go-canine-carnage": ["Free Spins", "Прогрессивные множители"],
  "playn-go-cash-a-cabana": ["Free Spins"],
  "playn-go-cat-wilde-and-the-doom-of-dead": ["Free Spins"],
  "playn-go-cat-wilde-in-the-eclipse-of-the-sun-god": ["Free Spins", "Прогрессивные множители"],
  "playn-go-champions-of-mithrune": ["Free Spins", "Wild Reels"],
  "playn-go-charlie-chance-and-the-curse-of-cleopatra": ["Sticky Wilds", "Free Spins", "Множители", "Wilds"],
  "playn-go-clash-of-camelot": ["Free Spins", "Sticky Wilds", "Расширяющиеся символы"],
  "playn-go-cloud-quest": ["Каскады", "Wilds"],
  "playn-go-captain-xenos-earth-adventure": ["Wilds"],
  "playn-go-cash-of-command": ["Трансформация символов", "Wilds"],
  "playn-go-cats-and-cash": ["Wilds", "Scatter Pays"],
  "playn-go-colt-lightning": ["Респины", "Free Spins"],
  "playn-go-diamonds-of-the-realm": ["Free Spins", "Wilds"],
  "playn-go-cursed-moon-power-collection": ["Free Spins", "Множители"],
  "playn-go-diamond-vortex": ["Sticky Wilds", "Free Spins", "Множители", "Трансформация символов"],
  "playn-go-divina-commedia-i-nove-cerchi": ["Free Spins", "Hold & Win"],
  "playn-go-doom-of-egypt": ["Wilds"],
  "playn-go-energoonz": ["Wilds", "Множители", "Free Spins"],
  "playn-go-eye-of-the-kraken": ["Wilds", "Free Spins", "Pick-and-click"],
  "playn-go-coils-of-cash": ["Wilds"],
  "playn-go-fire-toad": ["Wilds", "Free Spins"],
  "playn-go-firefly-frenzy": ["Wilds", "Frenzy Spins"],
  "playn-go-fortune-teller": ["Wilds"],
  "playn-go-free-reelin-joker-1000": ["Респины"],
  "playn-go-game-of-gladiators-uprising": ["Free Spins"],
  "playn-go-gargantoonz": ["Wilds", "Sticky Wilds"],
  "playn-go-gemix": ["Wilds", "Sticky Wilds"],
  "playn-go-gemix-2": ["Wilds", "Трансформация символов", "Множители"],
  "playn-go-ghost-of-dead": ["Wilds", "Free Spins"],
  "playn-go-gold-volcano": ["Wilds", "Множители", "Free Spins", "Сбор символов"],
  "playn-go-holy-moo-extreme-power": ["Сбор символов", "Instant Prizes", "Free Spins"],
  "playn-go-honey-rush": ["Sticky Wilds", "Множители", "Трансформация символов"],
  "playn-go-honey-rush-black-and-yellow": ["Walking Wilds", "Сбор символов", "Множители", "Instant Prizes"],
  "playn-go-idol-of-fortune": ["Free Spins", "Wilds"],
  "playn-go-joker-flip": ["Респины", "Free Spins"],
  "playn-go-king-of-sweets": ["Wilds", "Множители", "Free Spins"],
  "playn-go-kings-mask": ["Free Spins"],
  "playn-go-moon-princess-origins": ["Wilds", "Трансформация символов", "Free Spins", "Instant Prizes"],
  "playn-go-perfect-gems": ["Wilds", "Множители", "Free Spins"],
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

test("Play’n GO score-five waves preserve official feature facts additively", () => {
  expect(Object.keys(expected)).toHaveLength(47);

  for (const [slug, mechanics] of Object.entries(expected)) {
    const research = getVerifiedCatalogResearch(slug);
    expect(research, slug).toBeTruthy();
    expect(research?.source, slug).toMatch(/^https:\/\/(www\.)?playngo\.com\//);
    expect(research?.verifiedAt, slug).toMatch(/^20\d{2}-\d{2}-\d{2}$/);
    expect(research?.evidence, slug).toBeTruthy();
    for (const mechanic of mechanics) {
      expect(research?.mechanics, `${slug}: ${mechanic}`).toContain(mechanic);
    }
    expect(scoreFor(slug), slug).toBeGreaterThanOrEqual(6);
  }
});

test("late Play’n GO score-five overlay keeps earlier cluster mechanics", () => {
  for (const slug of ["playn-go-gargantoonz", "playn-go-gemix"]) {
    const mechanics = getVerifiedCatalogResearch(slug)?.mechanics ?? [];
    expect(mechanics, slug).toContain("Кластеры");
    expect(mechanics, slug).toContain("Каскады");
    expect(mechanics, slug).toContain("Wilds");
    expect(mechanics, slug).toContain("Sticky Wilds");
  }
});
