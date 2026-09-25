import type { CatalogVerifiedDetails } from "./catalog-verified-details";

type ThreeOaksPassportCloseout = Partial<
  Pick<CatalogVerifiedDetails, "rtp" | "maxWin" | "volatility">
> & {
  rtpSource?: string;
  maxWinSource?: string;
  volatilitySource?: string;
  verifiedAt: string;
};

const verifiedAt = "2026-09-25";

const details: Record<string, ThreeOaksPassportCloseout> = {
  "3-oaks-gaming-15-dragon-pearls": {
    rtp: "95,71%",
    maxWin: "5 000x",
    volatility: "Высокая",
    rtpSource: "https://search-casino.com/games/slots/15-dragon-pearls/",
    maxWinSource: "https://search-casino.com/games/slots/15-dragon-pearls/",
    volatilitySource: "https://search-casino.com/games/slots/15-dragon-pearls/",
    verifiedAt,
  },
  "3-oaks-gaming-3-african-drums": {
    rtp: "95,68%",
    maxWin: "4 280x",
    volatility: "Средняя",
    rtpSource: "https://slotranker.com/3-oaks/3-african-drums",
    maxWinSource: "https://slotranker.com/3-oaks/3-african-drums",
    volatilitySource: "https://slotranker.com/3-oaks/3-african-drums",
    verifiedAt,
  },
  "3-oaks-gaming-3-aztec-temples": {
    rtp: "96%",
    maxWin: "2 000x",
    volatility: "Высокая",
    rtpSource: "https://allslotsonline.casino/en/slots/3-aztec-temples/",
    maxWinSource: "https://allslotsonline.casino/en/slots/3-aztec-temples/",
    volatilitySource: "https://allslotsonline.casino/en/slots/3-aztec-temples/",
    verifiedAt,
  },
  "3-oaks-gaming-3-china-pots": {
    rtp: "95,68%",
    maxWin: "4 280x",
    volatility: "Средняя",
    rtpSource: "https://www.slotstemple.com/free-slots/3-china-pots/",
    maxWinSource: "https://www.slotstemple.com/free-slots/3-china-pots/",
    volatilitySource: "https://www.slotstemple.com/free-slots/3-china-pots/",
    verifiedAt,
  },
  "3-oaks-gaming-3-clover-pots": {
    rtp: "95,74%",
    maxWin: "5 000x",
    volatility: "Высокая",
    rtpSource: "https://search-casino.com/games/slots/3-clover-pots/",
    maxWinSource: "https://search-casino.com/games/slots/3-clover-pots/",
    volatilitySource: "https://search-casino.com/games/slots/3-clover-pots/",
    verifiedAt,
  },
  "3-oaks-gaming-3-coin-volcanoes": {
    rtp: "95,68%",
    maxWin: "2 000x",
    volatility: "Средняя",
    rtpSource: "https://coinsvolcano.com/en-us/3-coin-volcanoes",
    maxWinSource: "https://coinsvolcano.com/en-us/3-coin-volcanoes",
    volatilitySource: "https://coinsvolcano.com/en-us/3-coin-volcanoes",
    verifiedAt,
  },
  "3-oaks-gaming-3-coins": {
    rtp: "95,84%",
    maxWin: "750x",
    volatility: "Средняя",
    rtpSource: "https://slotcatalog.com/en/slots/3-Coins-Hold-and-Win?cISO=NO",
    maxWinSource: "https://slotcatalog.com/en/slots/3-Coins-Hold-and-Win?cISO=NO",
    volatilitySource: "https://slotcatalog.com/en/slots/3-Coins-Hold-and-Win?cISO=NO",
    verifiedAt,
  },
  "3-oaks-gaming-3-egypt-chests": {
    rtp: "95,71%",
    maxWin: "5 000x",
    volatility: "Средняя",
    rtpSource: "https://slotcatalog.com/en/slots/3-Egypt-Chests?cISO=GB",
    maxWinSource: "https://3oaks.com/game/3_egypt_chests",
    volatilitySource: "https://playgoslots.com/3-oaks/03-egypt-chests.html",
    verifiedAt,
  },
  "3-oaks-gaming-3-hot-chillies": {
    rtp: "95,59%",
    maxWin: "1 000x",
    volatility: "Средняя",
    rtpSource: "https://betting.bet/casino/studios/3-oaks-gaming",
    maxWinSource: "https://betting.bet/casino/studios/3-oaks-gaming",
    volatilitySource: "https://betting.bet/casino/studios/3-oaks-gaming",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetails3OaksPassportCloseout1(slug: string) {
  return details[slug];
}
