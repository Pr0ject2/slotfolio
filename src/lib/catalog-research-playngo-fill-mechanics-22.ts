import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-23";

const records: Record<string, CatalogResearch> = {
  "playn-go-aztec-warrior-princess": {
    mechanics: ["Free Spins"],
    source: "https://www.playngo.com/games/aztec-warrior-princess",
    verifiedAt,
    evidence: "Official Play’n GO page states that three or more Warrior Princess symbols award 15–25 Free Spins.",
  },
  "playn-go-bakers-treat": {
    mechanics: ["Wilds"],
    source: "https://www.playngo.com/games/baker's-treat",
    verifiedAt,
    evidence: "Official Play’n GO page states that the Triple Berry Layer Cake is Wild and describes additional Wild symbols in Flour Power features.",
  },
  "playn-go-big-win-cat": {
    mechanics: ["Wilds"],
    source: "https://www.playngo.com/games/big-win-cat",
    verifiedAt,
    evidence: "Official Play’n GO page explicitly identifies Big Win Cat as the game’s Wild symbol.",
  },
  "playn-go-black-mamba": {
    mechanics: ["Трансформация символов"],
    source: "https://www.playngo.com/games/black-mamba",
    verifiedAt,
    evidence: "Official Play’n GO page states that symbols in qualifying matches transform into Wild symbols.",
  },
  "playn-go-blinged": {
    mechanics: ["Free Spins"],
    source: "https://www.playngo.com/games/blinged",
    verifiedAt,
    evidence: "Official Play’n GO page states that three Diamond Scatters unlock the Free Spins feature.",
  },
  "playn-go-bull-in-a-rodeo": {
    mechanics: ["Freedom Spins"],
    source: "https://www.playngo.com/games/bull-in-a-rodeo",
    verifiedAt,
    evidence: "Official Play’n GO page describes the Freedom Round and its Freedom Spins as a distinct feature.",
  },
  "playn-go-captain-xenos-earth-adventure": {
    mechanics: ["Electric Shock"],
    source: "https://www.playngo.com/games/captain-xeno's-earth-adventure",
    verifiedAt,
    evidence: "Official Play’n GO page explicitly names Electric Shock as one of the game’s progression features.",
  },
  "playn-go-cat-wilde-and-the-doom-of-dead": {
    mechanics: ["Трансформация символов"],
    source: "https://www.playngo.com/games/cat-wilde-and-the-doom-of-dead",
    verifiedAt,
    evidence: "Official Play’n GO page states that the selector converts a chosen paying symbol into a Special Expanding Symbol for Free Spins.",
  },
  "playn-go-cops-n-robbers": {
    mechanics: ["Free Spins"],
    source: "https://www.playngo.com/games/cops-%E2%80%99n%E2%80%99-robbers",
    verifiedAt,
    evidence: "Official Play’n GO page states that the Bonus Car Chase awards Free Spins.",
  },
  "playn-go-crystal-hall": {
    mechanics: ["Instant Prizes"],
    source: "https://www.playngo.com/games/crystal-hall",
    verifiedAt,
    evidence: "Official Play’n GO page states that Fortune Roll reveals Instant Prizes up to x200 total bet.",
  },
  "playn-go-dr-toonz": {
    mechanics: ["Quantumeter"],
    source: "https://www.playngo.com/games/dr.-toonz",
    verifiedAt,
    evidence: "Official Play’n GO page describes the Quantumeter as a charge-based feature that activates colour-coded modifiers.",
  },
  "playn-go-easter-eggs": {
    mechanics: ["Free Spins"],
    source: "https://www.playngo.com/games/easter-eggs",
    verifiedAt,
    evidence: "Official Play’n GO page states that three Scatter eggs award Free Spins.",
  },
  "playn-go-fire-joker-100": {
    mechanics: ["Stacked Symbols"],
    source: "https://www.playngo.com/games/fire-joker-100",
    verifiedAt,
    evidence: "Official Play’n GO page describes the stacked-symbol setup used by Re-Spin of Fire and Wheel of Fire.",
  },
  "playn-go-fire-joker-blitz": {
    mechanics: ["Free Spins"],
    source: "https://www.playngo.com/games/fire-joker-blitz",
    verifiedAt,
    evidence: "Official Play’n GO page explicitly describes a Free Spins feature with progression stages and added spins.",
  },
  "playn-go-fortune-teller": {
    mechanics: ["Free Spins"],
    source: "https://www.playngo.com/games/fortune-teller",
    verifiedAt,
    evidence: "Official Play’n GO page states that three or more Black Cat Scatters unlock Free Spins.",
  },
  "playn-go-free-reelin-joker": {
    mechanics: ["Wilds"],
    source: "https://www.playngo.com/games/free-reelin'-joker",
    verifiedAt,
    evidence: "Official Play’n GO page explicitly identifies both Free Reelin’ Joker and Golden Joker as Wild symbols.",
  },
  "playn-go-frozen-gems": {
    mechanics: ["Free Spins"],
    source: "https://www.playngo.com/games/frozen-gems",
    verifiedAt,
    evidence: "Official Play’n GO page states that three Scatters trigger Frozen Spins with nine initial Free Spins.",
  },
  "playn-go-fulong-88": {
    mechanics: ["Free Spins"],
    source: "https://www.playngo.com/games/fulong-88",
    verifiedAt,
    evidence: "Official Play’n GO page states that three Scatters trigger ten Free Spins.",
  },
  "playn-go-gold-king": {
    mechanics: ["Free Spins"],
    source: "https://www.playngo.com/games/gold-king",
    verifiedAt,
    evidence: "Official Play’n GO page states that three Gold Kings award ten Free Super Spins and can award additional spins.",
  },
  "playn-go-golden-ticket": {
    mechanics: ["Wilds"],
    source: "https://www.playngo.com/games/golden-ticket",
    verifiedAt,
    evidence: "Official Play’n GO page explicitly describes the Golden Ticket Wild symbol and how it substitutes in winning combinations.",
  },
  "playn-go-grim-muerto": {
    mechanics: ["Free Spins"],
    source: "https://www.playngo.com/games/grim-muerto",
    verifiedAt,
    evidence: "Official Play’n GO page states that El Libro de los Muertos leads to the Free Spins feature.",
  },
  "playn-go-happy-halloween": {
    mechanics: ["Free Spins"],
    source: "https://www.playngo.com/games/happy-halloween",
    verifiedAt,
    evidence: "Official Play’n GO page states that at least three witch Scatters award ten Free Spins and the round can retrigger.",
  },
};

export function getCatalogResearchPlayngoFillMechanics22(slug: string) {
  return records[slug];
}
