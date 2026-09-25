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
  "3-oaks-gaming-3-clover-pots-extra": {
    rtp: "96,01%",
    maxWin: "5 000–10 000x (зависит от версии)",
    volatility: "Средняя–выше средней",
    rtpSource: "https://xcitingslots.com/slots/3-clover-pots-extra/",
    maxWinSource: "https://slotcatalog.com/en/slots/3-clover-pots-extra",
    maxWinSourceAlt: "https://xcitingslots.com/slots/3-clover-pots-extra/",
    volatilitySource: "https://slotcatalog.com/en/slots/3-clover-pots-extra",
    volatilitySourceAlt: "https://xcitingslots.com/slots/3-clover-pots-extra/",
    verifiedAt,
  },
  "3-oaks-gaming-3-pots-of-egypt": {
    rtp: "95,5–96% (зависит от версии)",
    maxWin: "2 000–3 258x (зависит от версии)",
    volatility: "Средняя",
    rtpSource: "https://evasi0n.com/slot/3-pots-of-egypt/",
    rtpSourceAlt: "https://www.slotuk.org/free-slots/3-pots-of-egypt/",
    maxWinSource: "https://www.slotuk.org/free-slots/3-pots-of-egypt/",
    maxWinSourceAlt: "https://evasi0n.com/slot/3-pots-of-egypt/",
    volatilitySource: "https://evasi0n.com/slot/3-pots-of-egypt/",
    verifiedAt,
  },
  "3-oaks-gaming-4-fortune-clovers": {
    rtp: "95,75%",
    maxWin: "5 000–7 435x (зависит от версии)",
    volatility: "Средняя–высокая",
    rtpSource: "https://mail.newcasinogamereviews.com/4-fortune-clovers",
    rtpSourceAlt: "https://chips.gg/fr/play/3oaks-4-fortune-clovers",
    maxWinSource: "https://mail.newcasinogamereviews.com/4-fortune-clovers",
    maxWinSourceAlt: "https://chips.gg/fr/play/3oaks-4-fortune-clovers",
    volatilitySource: "https://chips.gg/fr/play/3oaks-4-fortune-clovers",
    volatilitySourceAlt: "https://mail.newcasinogamereviews.com/4-fortune-clovers",
    verifiedAt,
  },
  "3-oaks-gaming-chili-coins": {
    rtp: "95,64%",
    maxWin: "20 000x",
    volatility: "Высокая",
    rtpSource: "https://chili-coins.com/",
    maxWinSource: "https://chili-coins.com/",
    volatilitySource: "https://chili-coins.com/",
    verifiedAt,
  },
  "3-oaks-gaming-crystal-scarabs": {
    rtp: "95,6%",
    maxWin: "3 000–5 664x (зависит от версии)",
    volatility: "Средняя–высокая",
    rtpSource: "https://slotcatalog.com/uk/slots/Crystal-Scarabs",
    maxWinSource: "https://slotcatalog.com/uk/slots/Crystal-Scarabs",
    maxWinSourceAlt: "https://gamblenexus.com/slots/crystal-scarabs/",
    volatilitySource: "https://betting.bet/casino/studios/3-oaks-gaming",
    volatilitySourceAlt: "https://gamblenexus.com/slots/crystal-scarabs/",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetails3OaksPassportCloseout13(slug: string) {
  return details[slug];
}
