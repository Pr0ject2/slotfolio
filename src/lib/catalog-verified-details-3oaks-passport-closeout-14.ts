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
  "3-oaks-gaming-3-jewel-crowns": {
    rtp: "95,65%",
    maxWin: "1 000x",
    volatility: "Высокая",
    rtpSource: "https://dduvs.com/slots/3-jewel-crowns/",
    maxWinSource: "https://dduvs.com/slots/3-jewel-crowns/",
    volatilitySource: "https://dduvs.com/slots/3-jewel-crowns/",
    verifiedAt,
  },
  "3-oaks-gaming-3-olymp-fortunes": {
    rtp: "96,08%",
    maxWin: "1 000–5 000x (источники расходятся)",
    volatility: "Высокая",
    rtpSource: "https://sigma.world/play/games/3-oaks/3-olymp-fortunes/",
    rtpSourceAlt: "https://gamblenexus.com/slots/3-olymp-fortunes/",
    maxWinSource: "https://sigma.world/play/games/3-oaks/3-olymp-fortunes/",
    maxWinSourceAlt: "https://gamblenexus.com/slots/3-olymp-fortunes/",
    volatilitySource: "https://sigma.world/play/games/3-oaks/3-olymp-fortunes/",
    verifiedAt,
  },
  "3-oaks-gaming-777-fruity-coins": {
    rtp: "96,01%",
    maxWin: "1 055–3 000x (зависит от версии)",
    volatility: "Средняя–выше средней",
    rtpSource: "https://gamblenexus.com/slots/777-fruity-coins/",
    maxWinSource: "https://betting.bet/casino/studios/3-oaks-gaming",
    maxWinSourceAlt: "https://gamblenexus.com/slots/777-fruity-coins/",
    volatilitySource: "https://betting.bet/casino/studios/3-oaks-gaming",
    volatilitySourceAlt: "https://gamblenexus.com/slots/777-fruity-coins/",
    verifiedAt,
  },
  "3-oaks-gaming-amazonia-wins": {
    rtp: "95,66%",
    maxWin: ">20 000x",
    volatility: "Высокая",
    rtpSource: "https://rainbet.com/casino/slots/3-oaks-amazonia-wins",
    maxWinSource: "https://3oaks.com/news/new-release-amazonia-wins",
    volatilitySource: "https://3oaks.com/news/new-release-amazonia-wins",
    verifiedAt,
  },
  "3-oaks-gaming-dancing-joker": {
    rtp: "95,71%",
    maxWin: "1 039x",
    volatility: "Средняя–высокая",
    rtpSource: "https://mail.newcasinogamereviews.com/dancing-joker",
    maxWinSource: "https://satoshihero.com/game/3-oaks-dancing-joker",
    volatilitySource: "https://mail.newcasinogamereviews.com/dancing-joker",
    verifiedAt,
  },
  "3-oaks-gaming-grab-more-gold": {
    rtp: "95,7%",
    maxWin: "1 000–10 000x (зависит от версии)",
    volatility: "Средняя–высокая",
    rtpSource: "https://stake.com/casino/games/3oaks-grab-more-gold",
    maxWinSource: "https://stake.com/casino/games/3oaks-grab-more-gold",
    maxWinSourceAlt: "https://slotcatalog.com/en/slots/Grab-More-Gold",
    volatilitySource: "https://slotcatalog.com/en/slots/Grab-More-Gold",
    volatilitySourceAlt: "https://stake.com/casino/games/3oaks-grab-more-gold",
    verifiedAt,
  },
  "3-oaks-gaming-grab-the-gold": {
    rtp: "95,71%",
    maxWin: "6 526x",
    volatility: "Высокая",
    rtpSource: "https://slotranker.com/3-oaks/grab-the-gold",
    maxWinSource: "https://pokiemachines.com/real-money-slots/grab-the-gold/",
    volatilitySource: "https://slotranker.com/3-oaks/grab-the-gold",
    verifiedAt,
  },
  "3-oaks-gaming-grand": {
    rtp: "95,44%",
    maxWin: "5 000x",
    volatility: "Средняя",
    rtpSource: "https://www.livebet.com/casino/slots/3-oaks-gaming/grand",
    maxWinSource: "https://www.livebet.com/casino/slots/3-oaks-gaming/grand",
    volatilitySource: "https://www.livebet.com/casino/slots/3-oaks-gaming/grand",
    verifiedAt,
  },
  "3-oaks-gaming-hot-fire-fruits": {
    rtp: "95,65%",
    maxWin: "60x",
    volatility: "Низкая–средняя",
    rtpSource: "https://wolfbet.com/slots/game/3oaks-hot-fire-fruits",
    rtpSourceAlt: "https://satoshihero.com/game/3-oaks-hot-fire-fruits",
    maxWinSource: "https://wolfbet.com/slots/game/3oaks-hot-fire-fruits",
    maxWinSourceAlt: "https://satoshihero.com/game/3-oaks-hot-fire-fruits",
    volatilitySource: "https://satoshihero.com/game/3-oaks-hot-fire-fruits",
    verifiedAt,
  },
  "3-oaks-gaming-joker-glitz-x1000": {
    rtp: "95,73–96,12% (зависит от версии)",
    maxWin: "40 000x",
    volatility: "Средняя–высокая",
    rtpSource: "https://wolfbet.com/slots/provider/3oaks",
    rtpSourceAlt: "https://sigma.world/play/games/3-oaks/joker-glitz-x1000/",
    maxWinSource: "https://gamblenexus.com/slots/joker-glitx-x1000/",
    volatilitySource: "https://sigma.world/play/games/3-oaks/joker-glitz-x1000/",
    volatilitySourceAlt: "https://gamblenexus.com/slots/joker-glitx-x1000/",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetails3OaksPassportCloseout14(slug: string) {
  return details[slug];
}
