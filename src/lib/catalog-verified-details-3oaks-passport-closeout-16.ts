import type { CatalogVerifiedDetails } from "./catalog-verified-details";

type ThreeOaksPassportCloseout = Partial<
  Pick<CatalogVerifiedDetails, "rtp" | "maxWin" | "volatility">
> & {
  rtpSource?: string;
  rtpSourceAlt?: string;
  maxWinSource?: string;
  maxWinSourceAlt?: string;
  volatilitySource?: string;
  volatilitySourceAlt?: string;
  verifiedAt: string;
};

const verifiedAt = "2026-09-25";

const details: Record<string, ThreeOaksPassportCloseout> = {
  "3-oaks-gaming-egypt-fire-2": {
    rtp: "95,76%",
    maxWin: "10 000x",
    volatility: "Средняя–высокая",
    rtpSource: "https://www.livecasinocomparer.com/online-casino-games/slots/egypt-fire-2/",
    maxWinSource: "https://betting.bet/casino/studios/3-oaks-gaming",
    volatilitySource: "https://betting.bet/casino/studios/3-oaks-gaming",
    volatilitySourceAlt: "https://www.livecasinocomparer.com/online-casino-games/slots/egypt-fire-2/",
    verifiedAt,
  },
  "3-oaks-gaming-lava-coins": {
    rtp: "95,98–96% (зависит от версии)",
    maxWin: "2 000–3 118x (зависит от версии)",
    volatility: "Средняя–высокая",
    rtpSource: "https://zeusvshades.help/provider/3-oaks-gaming/",
    rtpSourceAlt: "https://casinolandia.com/tournaments/arcane-gold-tournament-at-skycrown-casino/",
    maxWinSource: "https://betting.bet/casino/studios/3-oaks-gaming",
    maxWinSourceAlt: "https://zeusvshades.help/provider/3-oaks-gaming/",
    volatilitySource: "https://betting.bet/casino/studios/3-oaks-gaming",
    volatilitySourceAlt: "https://zeusvshades.help/provider/3-oaks-gaming/",
    verifiedAt,
  },
  "3-oaks-gaming-lava-coins-2": {
    rtp: "96,12%",
    maxWin: "1 000–10 000x (зависит от версии)",
    volatility: "Средняя–высокая",
    rtpSource: "https://www.ultimateslots.com/free-demo/lava-coins-2/",
    maxWinSource: "https://slotcatalog.com/en/slots/lava-coins-2",
    maxWinSourceAlt: "https://www.ultimateslots.com/free-demo/lava-coins-2/",
    volatilitySource: "https://betting.bet/casino/studios/3-oaks-gaming",
    volatilitySourceAlt: "https://www.ultimateslots.com/free-demo/lava-coins-2/",
    verifiedAt,
  },
  "3-oaks-gaming-sky-pearls": {
    rtp: "95,72%",
    maxWin: "1 000x",
    volatility: "Низкая–средняя",
    rtpSource: "https://gamblerid.com/games/sky-pearls",
    rtpSourceAlt: "https://www.slotstemple.com/free-slots/sky-pearls/",
    maxWinSource: "https://gamblerid.com/games/sky-pearls",
    maxWinSourceAlt: "https://www.slotstemple.com/free-slots/sky-pearls/",
    volatilitySource: "https://gamblerid.com/games/sky-pearls",
    volatilitySourceAlt: "https://betting.bet/casino/studios/3-oaks-gaming",
    verifiedAt,
  },
  "3-oaks-gaming-super-hot-teapots": {
    rtp: "95,72–96,26% (зависит от версии)",
    maxWin: "4 182–20 000x (зависит от версии)",
    volatility: "Высокая",
    rtpSource: "https://slotday.nl/3-oaks-gaming/super-hot-teapots/",
    rtpSourceAlt: "https://zeusvshades.help/slots/3-oaks-gaming/super-hot-teapots/",
    maxWinSource: "https://zeusvshades.help/slots/3-oaks-gaming/super-hot-teapots/",
    maxWinSourceAlt: "https://slotday.nl/3-oaks-gaming/super-hot-teapots/",
    volatilitySource: "https://slotday.nl/3-oaks-gaming/super-hot-teapots/",
    volatilitySourceAlt: "https://zeusvshades.help/slots/3-oaks-gaming/super-hot-teapots/",
    verifiedAt,
  },
  "3-oaks-gaming-thunder-tiger": {
    rtp: "95,75%",
    maxWin: "10 000x",
    volatility: "Средняя–высокая",
    rtpSource: "https://chips.gg/kr/play/3oaks-thunder-tiger",
    rtpSourceAlt: "https://slotessentials.com/slot-database/thunder-tiger",
    maxWinSource: "https://chips.gg/kr/play/3oaks-thunder-tiger",
    maxWinSourceAlt: "https://slotessentials.com/slot-database/thunder-tiger",
    volatilitySource: "https://slotessentials.com/slot-database/thunder-tiger",
    volatilitySourceAlt: "https://chips.gg/kr/play/3oaks-thunder-tiger",
    verifiedAt,
  },
  "3-oaks-gaming-tiger-gems": {
    rtp: "95,57%",
    maxWin: "1 000–1 560x (зависит от версии)",
    volatility: "Средняя–высокая",
    rtpSource: "https://stake.com/casino/games/3oaks-tiger-gems",
    rtpSourceAlt: "https://slotcatalog.com/en/slots/Tiger-Gems",
    maxWinSource: "https://stake.com/casino/games/3oaks-tiger-gems",
    maxWinSourceAlt: "https://slotcatalog.com/en/slots/Tiger-Gems",
    volatilitySource: "https://stake.com/casino/games/3oaks-tiger-gems",
    volatilitySourceAlt: "https://tiger-gems-australia.readme.io/reference/tiger-gems-rtp-volatility",
    verifiedAt,
  },
  "3-oaks-gaming-tiger-jungle": {
    rtp: "95,86%",
    maxWin: "5 000–5 272x (зависит от версии)",
    volatility: "Средняя–высокая",
    rtpSource: "https://stake.us/casino/games/3oaks-tiger-jungle",
    rtpSourceAlt: "https://uk.slotuk.org/free-slots/tiger-jungle/",
    maxWinSource: "https://stake.us/casino/games/3oaks-tiger-jungle",
    maxWinSourceAlt: "https://uk.slotuk.org/free-slots/tiger-jungle/",
    volatilitySource: "https://stake.us/casino/games/3oaks-tiger-jungle",
    volatilitySourceAlt: "https://slotranker.com/3-oaks/tiger-jungle-hold-and-win",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetails3OaksPassportCloseout16(slug: string) {
  return details[slug];
}
