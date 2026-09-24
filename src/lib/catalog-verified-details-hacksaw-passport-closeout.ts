import type { CatalogVerifiedDetails } from "./catalog-verified-details";

type HacksawPassportCloseout = Partial<
  Pick<CatalogVerifiedDetails, "field" | "rtp" | "releaseDate">
> & {
  fieldSource?: string;
  rtpSource?: string;
  releaseDateSource?: string;
  verifiedAt: string;
};

const verifiedAt = "2026-09-24";

const details: Record<string, HacksawPassportCloseout> = {
  "hacksaw-gaming-3-cursed-chests-hold-and-win": {
    field: "5×3 · 17 линий",
    fieldSource: "https://www.aboutslots.com/casino-slots/3-cursed-chests-hold-and-win",
    verifiedAt,
  },
  "hacksaw-gaming-arizona-james-and-the-lost-relics": {
    field: "6×5 · кластеры",
    fieldSource: "https://www.aboutslots.com/casino-slots/arizona-james-and-the-lost-relics",
    verifiedAt,
  },
  "hacksaw-gaming-beast-below": {
    releaseDate: "2023-06-22",
    releaseDateSource: "https://fruityslots.com/slots/providers/hacksaw-gaming/",
    verifiedAt,
  },
  "hacksaw-gaming-benny-the-beer": {
    releaseDate: "2023-10-05",
    releaseDateSource: "https://fruityslots.com/slots/providers/hacksaw-gaming/",
    verifiedAt,
  },
  "hacksaw-gaming-bouncy-bombs": {
    rtp: "96,22% / 94,37% / 92,16% / 88,30%",
    rtpSource: "https://clientzone.betconstruct.com/media/download/63294y/Bouncy%20Bombs_ProductSheet.pdf",
    verifiedAt,
  },
  "hacksaw-gaming-death-becomes-you": {
    field: "5×4 · 14 линий",
    fieldSource: "https://www.olbg.com/slots/games/death-becomes-you",
    verifiedAt,
  },
  "hacksaw-gaming-epic-ze-zeus": {
    field: "6×5 · кластеры",
    fieldSource: "https://sigma.world/play/games/hacksaw-gaming/epic-ze-zeus/",
    verifiedAt,
  },
  "hacksaw-gaming-eye-of-the-panda": {
    releaseDate: "2023-10-20",
    releaseDateSource: "https://slotcatalog.com/en/slots/Eye-of-the-Panda",
    verifiedAt,
  },
  "hacksaw-gaming-great-game-rockies": {
    field: "5×3 · 17 линий",
    fieldSource: "https://chips.gg/play/hacksawgaming-great-game-rockies",
    verifiedAt,
  },
  "hacksaw-gaming-le-football-fan": {
    field: "6×5 · кластеры",
    fieldSource: "https://fruityslots.com/slots/reviews/le-football-fan/",
    verifiedAt,
  },
  "hacksaw-gaming-le-hooligan": {
    field: "6×5 · кластеры",
    fieldSource: "https://bonkku.com/demos/le-hooligan/",
    verifiedAt,
  },
  "hacksaw-gaming-le-prechaun": {
    field: "6×5 · кластеры",
    fieldSource: "https://le-prechaun.com/",
    verifiedAt,
  },
  "hacksaw-gaming-le-sortudo": {
    field: "3×3 · 9 линий",
    fieldSource: "https://time2play.com/casinos/games/slots/le-sortudo/",
    verifiedAt,
  },
  "hacksaw-gaming-magic-piggy-og": {
    field: "5×3 · 17 линий",
    fieldSource: "https://www.aboutslots.com/casino-slots/magic-piggy-og",
    verifiedAt,
  },
  "hacksaw-gaming-red-rascal": {
    field: "5×5 · 19 линий",
    fieldSource: "https://stake.com/casino/games/hacksaw-red-rascal",
    verifiedAt,
  },
  "hacksaw-gaming-sand-and-ashes": {
    field: "5×5 · 19 линий",
    fieldSource: "https://lindseyslaw.com/games/sand-and-ashes/",
    verifiedAt,
  },
  "hacksaw-gaming-supreme-zeus": {
    field: "5×4 · 1024 способа",
    fieldSource: "https://supremezeus.com/",
    verifiedAt,
  },
  "hacksaw-gaming-tiger-legends": {
    rtp: "96,30%",
    rtpSource: "https://www.playusa.com/slots/hacksaw-gaming/tiger-legends/",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsHacksawPassportCloseout(slug: string) {
  return details[slug];
}
