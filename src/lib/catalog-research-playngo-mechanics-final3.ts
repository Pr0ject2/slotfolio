import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-17";

const records: Record<string, CatalogResearch> = {
  "playn-go-nsync-pop": {
    mechanics: ["Расширяющиеся барабаны"],
    source: "https://www.playngo.com/games/%2Ansync-pop",
    verifiedAt,
    evidence: "Official Play’n GO page says the Free Spins objective is expanding the reels, completed through the Encore Spin feature.",
  },
  "playn-go-dansband-pa-turne": {
    mechanics: ["Множители"],
    source: "https://www.playngo.com/games/dansband-p%C3%A5-turn%C3%A9",
    verifiedAt,
    evidence: "Official Play’n GO page describes a randomized Win Multiplier that carries into Free Spins and increases progressively.",
  },
  "playn-go-holiday-season": {
    mechanics: ["Множители"],
    source: "https://www.playngo.com/games/holiday-season",
    verifiedAt,
    evidence: "Official Play’n GO page describes a Gamble round where correctly guessing a card colour or suit multiplies the prize.",
  },
  "playn-go-legacy-of-dynasties": {
    mechanics: ["Расширяющиеся символы"],
    source: "https://www.playngo.com/games/legacy-of-dynasties",
    verifiedAt,
    evidence: "Official Play’n GO page explicitly describes Expanding Symbols, including guaranteed expanding symbols during Free Spins.",
  },
  "playn-go-leprechauns-vault": {
    mechanics: ["Множители"],
    source: "https://www.playngo.com/games/leprechaun%27s-vault",
    verifiedAt,
    evidence: "Official Play’n GO page describes Wild Multipliers as a core feature alongside Sticky Wilds.",
  },
  "playn-go-lordi-reel-monsters": {
    mechanics: ["Pick-and-click"],
    source: "https://www.playngo.com/games/lordi-reel-monsters",
    verifiedAt,
    evidence: "Official Play’n GO page explicitly says the player picks and clicks one of two Lordi songs when the Free Spins feature begins.",
  },
  "playn-go-madame-ink": {
    mechanics: ["Mystery Reels"],
    source: "https://www.playngo.com/games/madame-ink",
    verifiedAt,
    evidence: "Official Play’n GO page explicitly describes the Mystery Reel feature and its mystery-symbol reveal on the middle reel.",
  },
  "playn-go-mega-don-feeding-frenzy": {
    mechanics: ["Трансформация символов"],
    source: "https://www.playngo.com/games/mega-don%3A-feeding-frenzy",
    verifiedAt,
    evidence: "Official Play’n GO page says Snack Time selects standard symbols and transforms them into higher-paying shark symbols.",
  },
  "playn-go-merlin-realm-of-charm": {
    mechanics: ["Расширяющиеся символы"],
    source: "https://www.playngo.com/games/merlin-realm-of-charm",
    verifiedAt,
    evidence: "Official Play’n GO page explicitly describes Sticky Expanding Symbols that cover an entire reel and remain in place.",
  },
  "playn-go-merlin-journey-of-flame": {
    mechanics: ["Расширяющиеся символы"],
    source: "https://www.playngo.com/games/merlin%3A-journey-of-flame",
    verifiedAt,
    evidence: "Official Play’n GO page explicitly describes a Special Expanding Symbol mechanic during Free Spins.",
  },
  "playn-go-moon-princess-100": {
    mechanics: ["Множители"],
    source: "https://www.playngo.com/games/moon-princess-100",
    verifiedAt,
    evidence: "Official Play’n GO page describes a multiplier that can increase up to x100 during the game.",
  },
  "playn-go-motley-crue": {
    mechanics: ["Множители"],
    source: "https://www.playngo.com/games/m%C3%B6tley-cr%C3%BCe",
    verifiedAt,
    evidence: "Official Play’n GO page says the Kickstart My Heart feature randomly multiplies wins during Wild Side.",
  },
  "playn-go-mystery-genie-fortunes-of-the-lamp": {
    mechanics: ["Mystery Symbols"],
    source: "https://www.playngo.com/games/mystery-genie--fortunes-of-the-lamp",
    verifiedAt,
    evidence: "Official Play’n GO page describes Mystery Symbols that open and reveal symbols, including during Sand Rewind respins.",
  },
  "playn-go-ninja-fruits": {
    mechanics: ["Множители"],
    source: "https://www.playngo.com/games/ninja-fruits",
    verifiedAt,
    evidence: "Official Play’n GO page describes an optional Gamble round where a correct colour guess doubles the prize and a correct suit guess quadruples it.",
  },
  "playn-go-phoenix-reborn": {
    mechanics: ["Линии"],
    source: "https://www.playngo.com/games/phoenix-reborn",
    verifiedAt,
    evidence: "Official Play’n GO page explicitly states that wins are formed along 40 paylines.",
  },
  "playn-go-primal-rampage": {
    mechanics: ["Бонусное колесо"],
    source: "https://www.playngo.com/games/primal-rampage",
    verifiedAt,
    evidence: "Official Play’n GO page describes Rage Symbols bringing the Primal Wheel into view as a game feature.",
  },
  "playn-go-rabbit-hole-riches": {
    mechanics: ["Pick-and-click"],
    source: "https://www.playngo.com/games/rabbit-hole-riches",
    verifiedAt,
    evidence: "Official Play’n GO page describes the Teacup Party Pick Bonus where the player chooses one of four cups to reveal prizes and continue-or-collect outcomes.",
  },
};

export function getCatalogResearchPlayngoMechanicsFinal3(slug: string) {
  return records[slug];
}
