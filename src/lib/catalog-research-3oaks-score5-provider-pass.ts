import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-20";

const records: Record<string, CatalogResearch> = {
  "3-oaks-gaming-3-jewel-crowns": {
    mechanics: ["Free Spins", "Jackpots"],
    source: "https://3oaks.com/game/3_jewel_crowns",
    verifiedAt,
    evidence: "Official 3 Oaks page says filling the Crown meters triggers seven Free Spins and can unlock fixed MINOR, MAJOR and GRAND jackpots during the feature.",
  },
  "3-oaks-gaming-aztec-sun": {
    mechanics: ["Free Spins", "Jackpots"],
    source: "https://3oaks.com/game/aztec_sun",
    verifiedAt,
    evidence: "Official 3 Oaks page says three Scatters trigger eight retriggerable Free Spins and the Hold & Win round includes fixed MINI, MAJOR and GRAND jackpot prizes.",
  },
  "3-oaks-gaming-book-of-sun-multichance": {
    mechanics: ["Free Spins"],
    source: "https://3oaks.com/game/book_of_sun_multichance",
    verifiedAt,
    evidence: "Official 3 Oaks page says three Book Scatters trigger twelve Free Spins, and retriggers add another expanding symbol while the round continues.",
  },
  "3-oaks-gaming-buddha-megaways": {
    mechanics: ["Free Spins", "Прогрессивные множители", "Gamble"],
    source: "https://3oaks.com/game/buddha_megaways",
    verifiedAt,
    evidence: "Official 3 Oaks page says the multiplier rises by one on consecutive cascades, keeps increasing without reset during Free Spins, and Free Spins can be gambled.",
  },
  "3-oaks-gaming-coin-princess-x1000": {
    mechanics: ["Scatter Pays", "Free Spins", "Прогрессивные множители"],
    source: "https://3oaks.com/game/coin_princess_x1000",
    verifiedAt,
    evidence: "Official 3 Oaks page explicitly defines Scatter Pays, Free Spins and a cumulative Total Multiplier that grows from multiplier symbols during winning cascades.",
  },
  "3-oaks-gaming-dj-tiger-x1000": {
    mechanics: ["Permanent Wilds", "Free Spins", "Прогрессивные множители"],
    source: "https://3oaks.com/game/dj_tiger_x1000",
    verifiedAt,
    evidence: "Official 3 Oaks page says the Permanent Wild remains until the cascade ends; Free Spins accumulate winning multipliers into a Total Multiplier that grows through the feature.",
  },
  "3-oaks-gaming-joker-glitz-x1000": {
    mechanics: ["Mystery Symbols", "Free Spins", "Прогрессивные множители"],
    source: "https://3oaks.com/game/joker_glitz_x1000",
    verifiedAt,
    evidence: "Official 3 Oaks page describes Mystery Multipliers from x10 to x1000 and a Progressive Total Multiplier that never resets during Free Spins.",
  },
  "3-oaks-gaming-lucky-apple-x1000": {
    mechanics: ["Mystery Symbols", "Free Spins", "Прогрессивные множители"],
    source: "https://3oaks.com/game/lucky_apple_x1000",
    verifiedAt,
    evidence: "Official 3 Oaks page describes a Mystery Multiplier from x10 to x1000 and a cumulative Total Multiplier that grows throughout Free Spins.",
  },
  "3-oaks-gaming-lucky-penny": {
    mechanics: ["Free Spins", "Прогрессивные множители"],
    source: "https://3oaks.com/game/lucky_penny",
    verifiedAt,
    evidence: "Official 3 Oaks page says Free Spins add each landed multiplier to a Total Multiplier that keeps growing through the round.",
  },
  "3-oaks-gaming-lucky-penny-2": {
    mechanics: ["Mystery Symbols", "Free Spins", "Прогрессивные множители"],
    source: "https://3oaks.com/game/lucky_penny_2",
    verifiedAt,
    evidence: "Official 3 Oaks release describes the Mystery Multiplier from x10 to x1000 and a progressive Total Multiplier built from winning multipliers during Free Spins.",
  },
  "3-oaks-gaming-lucky-penny-power-scatter": {
    mechanics: ["Instant Prizes", "Free Spins", "Прогрессивные множители"],
    source: "https://3oaks.com/game/lucky_penny_powerscatter",
    verifiedAt,
    evidence: "Official 3 Oaks page says Power Scatters can award instant x100, x500, x5000 or x50000 prizes and Free Spins use a progressive Total Multiplier.",
  },
  "3-oaks-gaming-sun-of-egypt-5": {
    mechanics: ["Free Spins", "Jackpots"],
    source: "https://3oaks.com/game/sun_of_egypt_5",
    verifiedAt,
    evidence: "Official 3 Oaks page describes six fixed jackpots and a Free Spins feature where higher-value symbols appear and Bonus/Power Symbols land more frequently.",
  },
};

export function getCatalogResearch3OaksScore5ProviderPass(slug: string) {
  return records[slug];
}
