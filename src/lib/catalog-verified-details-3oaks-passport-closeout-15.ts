import type { CatalogVerifiedDetails } from "./catalog-verified-details";
import { getCatalogVerifiedDetails3OaksPassportCloseout16 } from "./catalog-verified-details-3oaks-passport-closeout-16";

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
  "3-oaks-gaming-3-super-hot-teapots": {
    rtp: "95,72–96,01% (зависит от версии)",
    maxWin: "8 073–20 000x (зависит от версии)",
    volatility: "Средняя–высокая",
    rtpSource: "https://sigma.world/play/games/3-oaks/3-super-hot-teapots/",
    rtpSourceAlt: "https://www.thelines.com/casino/sweepstakes/sweepstakes-news/meet-megabonanzas-3-new-exclusive-games-now-live",
    maxWinSource: "https://sigma.world/play/games/3-oaks/3-super-hot-teapots/",
    maxWinSourceAlt: "https://www.thelines.com/casino/sweepstakes/sweepstakes-news/meet-megabonanzas-3-new-exclusive-games-now-live",
    volatilitySource: "https://sigma.world/play/games/3-oaks/3-super-hot-teapots/",
    volatilitySourceAlt: "https://www.thelines.com/casino/sweepstakes/sweepstakes-news/meet-megabonanzas-3-new-exclusive-games-now-live",
    verifiedAt,
  },
  "3-oaks-gaming-lord-of-thunder": {
    rtp: "95,68–96,11% (зависит от версии)",
    maxWin: "1 000–5 000x (источники расходятся)",
    volatility: "Средняя–высокая",
    rtpSource: "https://lecowboy-hacksawgaming.com/rtp-analysis/",
    rtpSourceAlt: "https://gamblenexus.com/slots/lord-of-thunder/",
    maxWinSource: "https://slotzone.io/slots/lord-of-thunder/",
    maxWinSourceAlt: "https://gamblenexus.com/slots/lord-of-thunder/",
    volatilitySource: "https://slotzone.io/slots/lord-of-thunder/",
    volatilitySourceAlt: "https://gamblenexus.com/slots/lord-of-thunder/",
    verifiedAt,
  },
  "3-oaks-gaming-lucky-penny": {
    rtp: "94,77–96,01% (зависит от версии)",
    maxWin: "20 000x",
    volatility: "Средняя–высокая",
    rtpSource: "https://www.playusa.com/press-play/lucky-penny-my-slot-experience/",
    rtpSourceAlt: "https://xcitingslots.com/slots/lucky-penny/",
    maxWinSource: "https://wolfbet.com/slots/game/3oaks-lucky-penny",
    volatilitySource: "https://www.playusa.com/press-play/lucky-penny-my-slot-experience/",
    volatilitySourceAlt: "https://wolfbet.com/slots/game/3oaks-lucky-penny",
    verifiedAt,
  },
  "3-oaks-gaming-magic-clovers": {
    rtp: "96,02%",
    maxWin: "2 000–5 000x (зависит от версии)",
    volatility: "Средняя–выше средней",
    rtpSource: "https://gamblenexus.com/slots/magic-clovers/",
    maxWinSource: "https://betting.bet/casino/studios/3-oaks-gaming",
    maxWinSourceAlt: "https://gamblenexus.com/slots/magic-clovers/",
    volatilitySource: "https://betting.bet/casino/studios/3-oaks-gaming",
    volatilitySourceAlt: "https://gamblenexus.com/slots/magic-clovers/",
    verifiedAt,
  },
  "3-oaks-gaming-sun-of-egypt-2": {
    rtp: "95,64–95,68% (зависит от версии)",
    maxWin: "5 000–6 675x (зависит от версии)",
    volatility: "Высокая",
    rtpSource: "https://sun-of-egypt-2.com/ru/",
    rtpSourceAlt: "https://northcasinoreport.com/games/sun-of-egypt-2/",
    maxWinSource: "https://sun-of-egypt-2.com/ru/",
    maxWinSourceAlt: "https://northcasinoreport.com/games/sun-of-egypt-2/",
    volatilitySource: "https://sun-of-egypt-2.com/ru/",
    verifiedAt,
  },
  "3-oaks-gaming-super-hot-chilli": {
    rtp: "95,58%",
    maxWin: "2 373x",
    volatility: "Средняя–высокая",
    rtpSource: "https://slotcatalog.com/en/slots/super-hot-chilli",
    maxWinSource: "https://slotcatalog.com/en/slots/super-hot-chilli",
    volatilitySource: "https://slotcatalog.com/en/slots/super-hot-chilli",
    verifiedAt,
  },
  "3-oaks-gaming-super-hotfire-diamonds": {
    rtp: "96,09%",
    maxWin: "1 000x",
    volatility: "Высокая",
    rtpSource: "https://rtpspy.com/slots/super-hotfire-diamonds",
    rtpSourceAlt: "https://slotcatalog.com/en/slots/super-hotfire-diamonds",
    maxWinSource: "https://rtpspy.com/slots/super-hotfire-diamonds",
    maxWinSourceAlt: "https://slotcatalog.com/en/slots/super-hotfire-diamonds",
    volatilitySource: "https://rtpspy.com/slots/super-hotfire-diamonds",
    verifiedAt,
  },
  "3-oaks-gaming-super-sticky-piggy": {
    rtp: "95,64–96,01% (зависит от версии)",
    maxWin: "3 000–6 750x (зависит от версии)",
    volatility: "Средняя–выше средней",
    rtpSource: "https://slotcatalog.com/en/slots/Super-Sticky-Piggy",
    rtpSourceAlt: "https://gamblenexus.com/slots/super-sticky-piggy/",
    maxWinSource: "https://gamblenexus.com/slots/super-sticky-piggy/",
    maxWinSourceAlt: "https://slotcatalog.com/en/slots/Super-Sticky-Piggy",
    volatilitySource: "https://betting.bet/casino/studios/3-oaks-gaming",
    volatilitySourceAlt: "https://gamblenexus.com/slots/super-sticky-piggy/",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetails3OaksPassportCloseout15(slug: string) {
  return getCatalogVerifiedDetails3OaksPassportCloseout16(slug) ?? details[slug];
}
