import type { CatalogVerifiedDetails } from "./catalog-verified-details";

type PlayngoPassportCloseout = Partial<
  Pick<CatalogVerifiedDetails, "field" | "rtp" | "maxWin" | "volatility">
> & {
  fieldSource?: string;
  rtpSource?: string;
  maxWinSource?: string;
  volatilitySource?: string;
  verifiedAt: string;
};

const verifiedAt = "2026-09-26";

const details: Record<string, PlayngoPassportCloseout> = {
  "playn-go-love-is-in-the-fair": {
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "10 000x",
    volatility: "Высокая",
    rtpSource: "https://www.slotuk.org/free-slots/love-is-in-the-fair/",
    maxWinSource: "https://www.slotuk.org/free-slots/love-is-in-the-fair/",
    volatilitySource: "https://www.slotuk.org/free-slots/love-is-in-the-fair/",
    verifiedAt,
  },
  "playn-go-love-joker": {
    rtp: "94,20%",
    maxWin: "1 008x",
    volatility: "Средняя",
    rtpSource: "https://slotcatalog.com/en/slots/Love-Joker",
    maxWinSource: "https://slotcatalog.com/en/slots/Love-Joker",
    volatilitySource: "https://slotcatalog.com/en/slots/Love-Joker",
    verifiedAt,
  },
  "playn-go-luchamigos": {
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "10 000x",
    volatility: "Средняя–высокая",
    rtpSource: "https://fruityslots.com/slots/reviews/luchamigos/",
    maxWinSource: "https://fruityslots.com/slots/reviews/luchamigos/",
    volatilitySource: "https://fruityslots.com/slots/reviews/luchamigos/",
    verifiedAt,
  },
  "playn-go-lucky-diamonds": {
    rtp: "95,94% / 93,99% / 90,96% / 87,96% / 84,01%",
    maxWin: "800x / 833,33x",
    volatility: "Средняя",
    rtpSource: "https://slotcatalog.com/en/slots/Lucky-Diamonds",
    maxWinSource: "https://slotcatalog.com/en/slots/Lucky-Diamonds",
    volatilitySource: "https://slotcatalog.com/en/slots/Lucky-Diamonds",
    verifiedAt,
  },
  "playn-go-merlin-realm-of-charm": {
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "10 000x",
    volatility: "Высокая",
    rtpSource: "https://uk.slotuk.org/free-slots/merlin-realm-of-charm/",
    maxWinSource: "https://uk.slotuk.org/free-slots/merlin-realm-of-charm/",
    volatilitySource: "https://uk.slotuk.org/free-slots/merlin-realm-of-charm/",
    verifiedAt,
  },
  "playn-go-merlin-journey-of-flame": {
    rtp: "96,29%",
    maxWin: "7 500x",
    volatility: "Высокая",
    rtpSource: "https://slotcatalog.com/en/slots/Merlin-Journey-of-Flame",
    maxWinSource: "https://slotcatalog.com/en/slots/Merlin-Journey-of-Flame",
    volatilitySource: "https://slotcatalog.com/en/slots/Merlin-Journey-of-Flame",
    verifiedAt,
  },
  "playn-go-merlins-grimoire": {
    rtp: "96,20%",
    maxWin: "30 000x",
    volatility: "Очень высокая",
    rtpSource: "https://slotdatahub.com/slots/merlins-grimoire/",
    maxWinSource: "https://slotdatahub.com/slots/merlins-grimoire/",
    volatilitySource: "https://slotdatahub.com/slots/merlins-grimoire/",
    verifiedAt,
  },
  "playn-go-mermaids-diamond": {
    rtp: "96,50%",
    maxWin: "5 000x",
    volatility: "Средняя",
    rtpSource: "https://www.aboutslots.com/casino-slots/mermaid-s-diamond",
    maxWinSource: "https://www.aboutslots.com/casino-slots/mermaid-s-diamond",
    volatilitySource: "https://www.aboutslots.com/casino-slots/mermaid-s-diamond",
    verifiedAt,
  },
  "playn-go-merry-xmas": {
    rtp: "93,96%",
    maxWin: "2 500x",
    volatility: "Средняя",
    rtpSource: "https://www.stakers.com/en/casino/merry_xmas/",
    maxWinSource: "https://www.stakers.com/en/casino/merry_xmas/",
    volatilitySource: "https://www.stakers.com/en/casino/merry_xmas/",
    verifiedAt,
  },
  "playn-go-midnight-gold": {
    field: "5×3 · 20 линий",
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "20 000x",
    volatility: "Высокая",
    fieldSource: "https://slotcatalog.com/en/slots/midnight-gold",
    rtpSource: "https://slotcatalog.com/en/slots/midnight-gold",
    maxWinSource: "https://slotcatalog.com/en/slots/midnight-gold",
    volatilitySource: "https://slotcatalog.com/en/slots/midnight-gold",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsPlayngoPassportCloseout24(slug: string) {
  return details[slug];
}
