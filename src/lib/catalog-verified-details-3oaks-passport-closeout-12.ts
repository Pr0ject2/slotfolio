import type { CatalogVerifiedDetails } from "./catalog-verified-details";

type ThreeOaksPassportCloseout = Partial<
  Pick<CatalogVerifiedDetails, "field" | "rtp" | "maxWin" | "volatility">
> & {
  fieldSource?: string;
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
  "3-oaks-gaming-coin-lamp": {
    field: "расширяемое поле · до 24 позиций",
    rtp: "95,63%",
    maxWin: "2 000x",
    volatility: "Высокая–очень высокая",
    fieldSource: "https://chips.gg/kr/play/3oaks-coin-lamp",
    rtpSource: "https://chips.gg/kr/play/3oaks-coin-lamp",
    maxWinSource: "https://chips.gg/kr/play/3oaks-coin-lamp",
    volatilitySource: "https://www.nj.com/sweepstakes/2026/07/sweepstakes-slots-players-cant-stop-spinning-this-weekend-our-picks.html",
    volatilitySourceAlt: "https://chips.gg/kr/play/3oaks-coin-lamp",
    verifiedAt,
  },
  "3-oaks-gaming-coin-princess-x1000": {
    rtp: "95,72%",
    maxWin: "20 000x",
    volatility: "Высокая",
    rtpSource: "https://casinoreview.click/game/coin-princess-x1000/",
    maxWinSource: "https://casinoreview.click/game/coin-princess-x1000/",
    volatilitySource: "https://casinoreview.click/game/coin-princess-x1000/",
    verifiedAt,
  },
  "3-oaks-gaming-coin-up-lightning": {
    rtp: "95,67%",
    maxWin: "500x",
    volatility: "Средняя",
    rtpSource: "https://stake.bet/ru/casino/games/3oaks-coin-lightning",
    maxWinSource: "https://stake.bet/ru/casino/games/3oaks-coin-lightning",
    volatilitySource: "https://stake.bet/ru/casino/games/3oaks-coin-lightning",
    verifiedAt,
  },
  "3-oaks-gaming-coin-up-hot-fire": {
    rtp: "95,75%",
    maxWin: "500–1 212x (зависит от версии)",
    volatility: "Средняя–высокая",
    rtpSource: "https://coinuphotfire.com/ru/",
    maxWinSource: "https://slotcatalog.com/en/slots/Coin-Up-Hot-Fire",
    maxWinSourceAlt: "https://clashofslots.com/slots/booongo/coin-up-hot-fire/",
    volatilitySource: "https://coinupgame.com/",
    verifiedAt,
  },
  "3-oaks-gaming-coin-volcano-2": {
    rtp: "95,66%",
    maxWin: "5 000x (Boost Bonus; Grand 500x)",
    volatility: "Средняя–высокая",
    rtpSource: "https://coinsvolcano.com/en-us/coin-volcano-2/rtp",
    maxWinSource: "https://slotcatalog.com/en/slots/coin-volcano-2",
    volatilitySource: "https://coinsvolcano.com/en-us/coin-volcano-2/rtp",
    verifiedAt,
  },
  "3-oaks-gaming-coin-express": {
    rtp: "96–97,01% (зависит от версии)",
    maxWin: "5 000x",
    volatility: "Высокая",
    rtpSource: "https://slotuk.org/free-slots/coin-express/",
    rtpSourceAlt: "https://gamblenexus.com/slots/coin-express/",
    maxWinSource: "https://3oaks.com/game/coin_express",
    volatilitySource: "https://slotuk.org/free-slots/coin-express/",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetails3OaksPassportCloseout12(slug: string) {
  return details[slug];
}
