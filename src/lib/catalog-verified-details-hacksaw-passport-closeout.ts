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
  "hacksaw-gaming-2-wild-2-die": {
    rtp: "96,25% / 94,15% / 92,14% / 88,25%",
    releaseDate: "2024-01-04",
    rtpSource: "https://slotcatalog.com/en/slots/2-Wild-2-Die",
    releaseDateSource: "https://slotcatalog.com/en/slots/2-Wild-2-Die",
    verifiedAt,
  },
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
  "hacksaw-gaming-beam-boys": {
    rtp: "96,35% / 94,24% / 92,30% / 88,25%",
    releaseDate: "2024-02-01",
    rtpSource: "https://www.slotuk.org/free-slots/dark-summoning/",
    releaseDateSource: "https://www.hacksawgaming.com/news/february-game-release-round-up",
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
  "hacksaw-gaming-cash-crew": {
    rtp: "96,26% / 94,23% / 92,17% / 88,29%",
    releaseDate: "2024-04-04",
    rtpSource: "https://www.aboutslots.com/casino-slots/cash-crew",
    releaseDateSource: "https://www.aboutslots.com/casino-slots/cash-crew",
    verifiedAt,
  },
  "hacksaw-gaming-dawn-of-kings": {
    rtp: "96,24% / 94,25% / 92,21% / 88,07%",
    releaseDate: "2024-03-07",
    rtpSource: "https://www.slotuk.org/free-slots/dark-summoning/",
    releaseDateSource: "https://www.slotuk.org/free-slots/dark-summoning/",
    verifiedAt,
  },
  "hacksaw-gaming-death-becomes-you": {
    field: "5×4 · 14 линий",
    fieldSource: "https://www.olbg.com/slots/games/death-becomes-you",
    verifiedAt,
  },
  "hacksaw-gaming-divine-drop": {
    rtp: "96,25% / 94,34% / 92,34% / 88,29%",
    releaseDate: "2024-04-25",
    rtpSource: "https://www.slotuk.org/free-slots/2-wild-2-die/",
    releaseDateSource: "https://www.olbg.com/slots/games/divine-drop",
    verifiedAt,
  },
  "hacksaw-gaming-dusk-princess": {
    rtp: "96,21% / 94,42% / 92,30% / 86,10%",
    releaseDate: "2026-03-17",
    rtpSource: "https://slotcatalog.com/en/slots/dusk-princess",
    releaseDateSource: "https://slotcatalog.com/en/slots/dusk-princess",
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
  "hacksaw-gaming-feel-the-beat": {
    rtp: "96,20% / 94,28% / 92,26% / 88,34%",
    releaseDate: "2024-01-25",
    rtpSource: "https://clashofslots.com/slots/hacksaw-gaming/feel-the-beat/",
    releaseDateSource: "https://clashofslots.com/slots/hacksaw-gaming/feel-the-beat/",
    verifiedAt,
  },
  "hacksaw-gaming-fist-of-destruction": {
    rtp: "96,30% / 94,30% / 92,38% / 88,27%",
    releaseDate: "2024-02-22",
    rtpSource: "https://www.slotuk.org/free-slots/fist-of-destruction/",
    releaseDateSource: "https://www.slotuk.org/free-slots/fist-of-destruction/",
    verifiedAt,
  },
  "hacksaw-gaming-great-game-rockies": {
    field: "5×3 · 17 линий",
    fieldSource: "https://chips.gg/play/hacksawgaming-great-game-rockies",
    verifiedAt,
  },
  "hacksaw-gaming-keepem": {
    rtp: "96,27% / 94,25% / 92,27% / 88,29%",
    releaseDate: "2024-05-02",
    rtpSource: "https://www.slotuk.org/free-slots/2-wild-2-die/",
    releaseDateSource: "https://www.slotuk.org/free-slots/2-wild-2-die/",
    verifiedAt,
  },
  "hacksaw-gaming-jelly-slice": {
    rtp: "96,24% / 94,32% / 92,30% / 88,28%",
    releaseDate: "2024-05-16",
    rtpSource: "https://www.slotuk.org/free-slots/2-wild-2-die/",
    releaseDateSource: "https://www.slotuk.org/free-slots/2-wild-2-die/",
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
  "hacksaw-gaming-orb-of-destiny": {
    rtp: "96,23% / 94,29% / 92,27% / 88,26%",
    releaseDate: "2024-04-18",
    rtpSource: "https://clashofslots.com/slots/hacksaw-gaming/orb-of-destiny/",
    releaseDateSource: "https://clashofslots.com/slots/hacksaw-gaming/orb-of-destiny/",
    verifiedAt,
  },
  "hacksaw-gaming-red-rascal": {
    field: "5×5 · 19 линий",
    fieldSource: "https://stake.com/casino/games/hacksaw-red-rascal",
    verifiedAt,
  },
  "hacksaw-gaming-rusty-and-curly": {
    rtp: "96,29% / 94,31% / 92,25% / 88,31%",
    releaseDate: "2024-03-28",
    rtpSource: "https://slotcatalog.com/en/slots/Rusty-Curly",
    releaseDateSource: "https://slotcatalog.com/en/slots/Rusty-Curly",
    verifiedAt,
  },
  "hacksaw-gaming-sand-and-ashes": {
    field: "5×5 · 19 линий",
    fieldSource: "https://lindseyslaw.com/games/sand-and-ashes/",
    verifiedAt,
  },
  "hacksaw-gaming-slayers-inc": {
    rtp: "96,28% / 94,36% / 92,40% / 88,22%",
    releaseDate: "2024-05-23",
    rtpSource: "https://www.slotuk.org/free-slots/2-wild-2-die/",
    releaseDateSource: "https://www.slotuk.org/free-slots/2-wild-2-die/",
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
