import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-20";

const records: Record<string, CatalogResearch> = {
  "playn-go-ace-of-spades": {
    mechanics: ["Wilds"],
    source: "https://www.playngo.com/games/ace-of-spades",
    verifiedAt,
    evidence: "Official Play’n GO page says the Ace of Spades is Wild, substitutes for any other symbol and doubles or quadruples combination wins when one or two Wilds participate.",
  },
  "playn-go-fire-toad-2": {
    mechanics: ["Free Spins", "Retriggers"],
    source: "https://www.playngo.com/games/fire-toad-2",
    verifiedAt,
    evidence: "Official page says three or more Scatters unlock a selectable Free Spins round and further Scatters retrigger additional spins, up to the stated feature limit.",
  },
  "playn-go-gold-trophy-2": {
    mechanics: ["Free Spins", "Wilds"],
    source: "https://www.playngo.com/games/gold-trophy-2",
    verifiedAt,
    evidence: "Official page describes the Gold Trophy Wild Multiplier and says three or more Prize Cheque Scatters trigger 15 Free Spins with an additional x3 multiplier.",
  },
  "playn-go-journey-to-paris": {
    mechanics: ["Free Spins", "Scatter Pays", "Множители"],
    source: "https://www.playngo.com/games/journey-to-paris",
    verifiedAt,
    evidence: "Official page says revealing the hidden Bonus word awards ten free rounds with Scatter Pays, a win multiplier that can reach x5 and five extra free spins from 5+ bonus symbols.",
  },
  "playn-go-legion-gold-victory": {
    mechanics: ["Free Spins", "Mega Symbols", "Instant Prizes"],
    source: "https://www.playngo.com/games/legion-gold-victory%21",
    verifiedAt,
    evidence: "Official page describes Mega Free Spins with shifting 3x3 Mega Symbols and Instant Prize Coins whose values can be collected by Gold Bags.",
  },
  "playn-go-leprechauns-diamond-dig": {
    mechanics: ["Free Spins", "Retriggers"],
    source: "https://www.playngo.com/games/leprechaun's-diamond-dig",
    verifiedAt,
    evidence: "Official page says three or more Leprechaun Scatters unlock 10 Free Spins and Clover milestones award extra Free Spins while increasing the Mega Blast multiplier.",
  },
  "playn-go-leprechauns-vault": {
    mechanics: ["Free Spins"],
    source: "https://www.playngo.com/games/leprechaun's-vault",
    verifiedAt,
    evidence: "Official page explicitly describes a Free Spins feature whose spin count is built from vault-door code values before the game moves into the vault feature.",
  },
  "playn-go-lion-saga-odyssey": {
    mechanics: ["Free Spins", "Retriggers"],
    source: "https://www.playngo.com/games/lion-saga-odyssey",
    verifiedAt,
    evidence: "Official page says three or more Scatters trigger eight Free Spins and the feature can be retriggered without a stated spin-count limit until the win cap is reached.",
  },
  "playn-go-lucky-diamonds": {
    mechanics: ["Wilds"],
    source: "https://www.playngo.com/games/lucky-diamonds",
    verifiedAt,
    evidence: "Official page says the Diamond is Wild, substitutes for other reel symbols and multiplies wins when one or two Diamonds participate in a winning combination.",
  },
  "playn-go-merry-xmas": {
    mechanics: ["Free Spins", "Wilds", "Stacked Wilds"],
    source: "https://www.playngo.com/games/merry-xmas",
    verifiedAt,
    evidence: "Official page says three Santa Scatters award 10 Free Spins, while gift-wrapped Wilds can multiply wins and additional Wilds stack higher during the Free Spins feature.",
  },
  "playn-go-miner-donkey-trouble": {
    mechanics: ["Free Spins", "Wilds"],
    source: "https://www.playngo.com/games/miner-donkey-trouble",
    verifiedAt,
    evidence: "Official page says the Pickaxe Wild feature adds 4–10 Diamond Wilds and detonating three Dynamite Scatters awards five retriggerable Free Spins.",
  },
  "playn-go-moon-princess-power-of-love": {
    mechanics: ["Free Spins", "Retriggers"],
    source: "https://www.playngo.com/games/moon-princess-power-of-love",
    verifiedAt,
    evidence: "Official page describes selectable Free Spins powers and says clearing the grid can retrigger three additional spins repeatedly up to the feature maximum.",
  },
  "playn-go-pack-and-cash": {
    mechanics: ["Wilds", "Mystery Symbols", "Free Spins", "Прогрессивные множители"],
    source: "https://www.playngo.com/games/pack-%26-cash",
    verifiedAt,
    evidence: "Official page describes Wild substitution, Express Package mystery symbols, Scatter-triggered Free Spins and a win multiplier that increases through cascades and carries across the Free Spins feature.",
  },
  "playn-go-pearl-lagoon": {
    mechanics: ["Wilds", "Scatter Pays"],
    source: "https://www.playngo.com/games/pearl-lagoon",
    verifiedAt,
    evidence: "Official page says the Wild substitutes for ordinary reel symbols and two or more Scatters pay anywhere, in addition to the already recorded Free Spins and Gamble mechanics.",
  },
  "playn-go-pimped": {
    mechanics: ["Wilds"],
    source: "https://www.playngo.com/games/pimped",
    verifiedAt,
    evidence: "Official page explicitly states that the Wild substitutes for any other reel symbol except Scatter and helps form winning combinations.",
  },
  "playn-go-prosperity-palace": {
    mechanics: ["Wilds", "Free Spins"],
    source: "https://www.playngo.com/games/prosperity-palace",
    verifiedAt,
    evidence: "Official page says the Jade Dragon is Wild and three Golden Buddha symbols award ten Free Spins, alongside the existing line and Gamble mechanics.",
  },
  "playn-go-ras-reckoning": {
    mechanics: ["Free Spins", "Persistent Frames"],
    source: "https://www.playngo.com/games/ra's-reckoning",
    verifiedAt,
    evidence: "Official page says Scatters unlock Red Eclipse Free Spins and Divine Frames persist between spins until Ra’s Blessing activates them; additional Scatters can add more spins.",
  },
};

export function getCatalogResearchPlayngoScore5ProviderPass5(slug: string) {
  return records[slug];
}
