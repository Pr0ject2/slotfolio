import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-23";

const records: Record<string, CatalogResearch> = {
  "playn-go-house-of-doom": {
    mechanics: ["Free Doom Spins"],
    source: "https://www.playngo.com/games/house-of-doom",
    verifiedAt,
    evidence: "Official Play’n GO page states that three House of Doom Scatters award ten Free Doom Spins.",
  },
  "playn-go-inferno-joker": {
    mechanics: ["Wilds"],
    source: "https://www.playngo.com/games/inferno-joker",
    verifiedAt,
    evidence: "Official Play’n GO page identifies the Inferno Joker Wild and describes how it completes winning paylines.",
  },
  "playn-go-lady-of-fortune": {
    mechanics: ["Gamble"],
    source: "https://www.playngo.com/games/lady-of-fortune",
    verifiedAt,
    evidence: "Official Play’n GO page describes the optional Gamble round with colour and suit guesses.",
  },
  "playn-go-lady-of-fortune-destiny-spins": {
    mechanics: ["Free Spins"],
    source: "https://www.playngo.com/games/lady-of-fortune-destiny-spins",
    verifiedAt,
    evidence: "Official Play’n GO page explicitly describes retriggerable Free Spins.",
  },
  "playn-go-legacy-of-dynasties": {
    mechanics: ["Nested Spins"],
    source: "https://www.playngo.com/games/legacy-of-dynasties",
    verifiedAt,
    evidence: "Official Play’n GO page explicitly names Nested Spins as a bonus triggered during Free Spins.",
  },
  "playn-go-legacy-of-gems-blitzways": {
    mechanics: ["Sticky Wilds"],
    source: "https://www.playngo.com/games/legacy-of-gems-blitzways",
    verifiedAt,
    evidence: "Official Play’n GO page states that Free Spins begin with a Sticky Wild and all Wilds remain sticky for the feature.",
  },
  "playn-go-leprechaun-goes-egypt": {
    mechanics: ["Free Spins"],
    source: "https://www.playngo.com/games/leprechaun-goes-egypt",
    verifiedAt,
    evidence: "Official Play’n GO page states that three Cleopatra Scatters award Free Spins.",
  },
  "playn-go-leprechaun-goes-wild": {
    mechanics: ["Free Spins"],
    source: "https://www.playngo.com/games/leprechaun-goes-wild",
    verifiedAt,
    evidence: "Official Play’n GO page explicitly describes a Free Spins feature triggered by three Scatters.",
  },
  "playn-go-leprechauns-vault": {
    mechanics: ["Free Spins"],
    source: "https://www.playngo.com/games/leprechaun's-vault",
    verifiedAt,
    evidence: "Official Play’n GO page describes the vault Free Spins feature and its generated spin count.",
  },
  "playn-go-mega-don": {
    mechanics: ["Snack Time"],
    source: "https://www.playngo.com/games/mega-don",
    verifiedAt,
    evidence: "Official Play’n GO release identifies Snack Time as a distinct feature in Mega Don.",
  },
  "playn-go-merlin-journey-of-flame": {
    mechanics: ["Free Spins"],
    source: "https://www.playngo.com/games/merlin%3A-journey-of-flame",
    verifiedAt,
    evidence: "Official Play’n GO page states that three or more Hatched Dragon Egg Scatters trigger up to eight Free Spins.",
  },
  "playn-go-merlins-grimoire": {
    mechanics: ["Free Spins"],
    source: "https://www.playngo.com/games/merlin's-grimoire",
    verifiedAt,
    evidence: "Official Play’n GO page states that the grid can expand across five reels during Free Spins.",
  },
  "playn-go-moon-princess-christmas-kingdom": {
    mechanics: ["Girl Power"],
    source: "https://www.playngo.com/games/moon-princess%3A-christmas-kingdom",
    verifiedAt,
    evidence: "Official Play’n GO page explicitly names Girl Power, a random modifier feature using the active princess's power.",
  },
  "playn-go-fulong-88": {
    mechanics: ["Fulong's Fortune"],
    source: "https://www.playngo.com/games/fulong-88",
    verifiedAt,
    evidence: "Official Play’n GO page explicitly names Fulong's Fortune as a distinct hidden-prize bonus feature.",
  },
};

export function getCatalogResearchPlayngoFillMechanics23(slug: string) {
  return records[slug];
}
