import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-17";

type SourcedCatalogResearch = CatalogResearch & {
  evidenceSource?: string;
};

const research: Record<string, SourcedCatalogResearch> = {
  "playn-go-5x-magic": {
    mechanics: ["Множители"],
    source: "https://www.playngo.com/games/5x-magic",
    verifiedAt,
    evidence: "Official game page states that the 5x Wild multiplies a winning combination by x5, while two 5x Wilds multiply it by x25.",
  },
  "playn-go-athena-ascending": {
    mechanics: ["Множители"],
    source: "https://www.playngo.com/games/athena-ascending",
    verifiedAt,
    evidence: "Official game page describes Multiplier Wilds that ascend during Free Spins and increase in strength on each spin.",
  },
  "playn-go-cat-wilde-and-the-lost-chapter": {
    mechanics: ["Расширяющиеся символы"],
    source: "https://www.playngo.com/games/cat-wilde-and-the-lost-chapter",
    verifiedAt,
    evidence: "Official release describes Pyramid Spins where landing two or more Scatters unlocks Expanding Symbols.",
    evidenceSource: "https://www.playngo.com/post/cat-wilde-and-the-lost-chapter",
  },
  "playn-go-derby-wheel": {
    mechanics: ["Бонусное колесо"],
    source: "https://www.playngo.com/games/derby-wheel",
    verifiedAt,
    evidence: "Official game page states that three Wheel symbols take the player to the Bonus Wheel, which can also lead to the Horse Racing Bonus Feature.",
  },
  "playn-go-fortune-teller": {
    mechanics: ["Pick-and-click"],
    source: "https://www.playngo.com/games/fortune-teller",
    verifiedAt,
    evidence: "Official game page describes a pick-and-click bonus triggered by three Bonus symbols, with hidden cards selected to reveal prizes.",
  },
  "playn-go-idol-of-fortune": {
    mechanics: ["Mystery Reels"],
    source: "https://www.playngo.com/games/idol-of-fortune",
    verifiedAt,
    evidence: "Official release states that the Free Spins feature lets players choose the number of Mystery Reels and can award up to 88 Mystery Symbols.",
    evidenceSource: "https://www.playngo.com/posts/idol-of-fortune",
  },
  "playn-go-invading-vegas": {
    mechanics: ["Lock On Re-Spin"],
    source: "https://www.playngo.com/games/invading-vegas",
    verifiedAt,
    evidence: "Official release explicitly describes the Lock On Re-Spin Feature, where the reels flip 180 degrees during the feature.",
    evidenceSource: "https://www.playngo.com/post/invading-vegas",
  },
  "playn-go-irish-gold": {
    mechanics: ["Линии"],
    source: "https://www.playngo.com/games/irish-gold",
    verifiedAt,
    evidence: "Official game page explicitly describes Wild substitutions on the payline and winning combinations containing Pots of Gold.",
  },
  "playn-go-jewel-box": {
    mechanics: ["Pick-and-click"],
    source: "https://www.playngo.com/games/jewel-box",
    verifiedAt,
    evidence: "Official game page states that three Jewel Box Scatters open a pick-and-click game with three boxes holding unique values.",
  },
  "playn-go-mega-don": {
    mechanics: ["Трансформация символов"],
    source: "https://www.playngo.com/games/mega-don",
    verifiedAt,
    evidence: "Official game page states that Mega Don is built around symbol transformation and progression, with Scatters unlocking symbol upgrades and retriggers.",
  },
  "playn-go-myth": {
    mechanics: ["Множители"],
    source: "https://www.playngo.com/games/myth",
    verifiedAt,
    evidence: "Official game page states that Wild winning combinations pay double, while Free Spins triple prizes and Wild combinations can pay six times the normal prize.",
  },
  "playn-go-new-year-riches": {
    mechanics: ["Нарастающий множитель"],
    source: "https://www.playngo.com/games/new-year-riches",
    verifiedAt,
    evidence: "Official game page states that Free Spins start with an x2 Win Multiplier and add another x2 on each subsequent spin up to x20.",
  },
  "playn-go-pandoras-box-of-evil": {
    mechanics: ["Re-Spin"],
    source: "https://www.playngo.com/games/pandora's-box-of-evil",
    verifiedAt,
    evidence: "Official game page describes the Re-Spin of Hope, which locks Mystery Symbols, Scatters and Mystery Wilds before another re-spin.",
  },
  "playn-go-pearl-lagoon": {
    mechanics: ["Множители"],
    source: "https://www.playngo.com/games/pearl-lagoon",
    verifiedAt,
    evidence: "Official game page states that Wild combinations pay double, Free Spins triple winning combinations and Wild wins during Free Spins pay six times the normal prize.",
  },
  "playn-go-pilgrim-of-dead": {
    mechanics: ["Расширяющиеся символы"],
    source: "https://www.playngo.com/games/pilgrim-of-dead",
    verifiedAt,
    evidence: "Official game page states that three or more Tomb Scatters reveal a Special Expanding symbol, which becomes sticky during Free Spins and can expand.",
  },
  "playn-go-pimped": {
    mechanics: ["Win Spins™"],
    source: "https://www.playngo.com/games/pimped",
    verifiedAt,
    evidence: "Official game page states that three or more Dollar Scatters trigger Win Spins™, where every spin guarantees at least one winning combination.",
  },
};

export function getCatalogResearchPlayngoProviderTail(slug: string) {
  return research[slug];
}
