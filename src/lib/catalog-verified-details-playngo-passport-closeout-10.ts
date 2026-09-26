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
  "playn-go-count-jokula": {
    field: "3×3 · 5 линий",
    rtp: "96,22% / 94,23% / 91,23% / 87,23% / 84,23%",
    maxWin: "8 350x",
    volatility: "Средняя",
    fieldSource: "https://slotcatalog.com/en/slots/Count-Jokula",
    rtpSource: "https://www.bigwinboard.com/count-jokula-playn-go-slot-review/",
    maxWinSource: "https://slotcatalog.com/en/slots/Count-Jokula",
    volatilitySource: "https://www.bigwinboard.com/count-jokula-playn-go-slot-review/",
    verifiedAt,
  },
  "playn-go-def-leppard-hysteria": {
    rtp: "96,27%",
    maxWin: "10 000x",
    volatility: "Средняя",
    rtpSource: "https://slotcatalog.com/en/slots/Def-Leppard-Hysteria",
    maxWinSource: "https://slotcatalog.com/en/slots/Def-Leppard-Hysteria",
    volatilitySource: "https://slotcatalog.com/en/slots/Def-Leppard-Hysteria",
    verifiedAt,
  },
  "playn-go-derby-wheel": {
    field: "3×3 · 5 линий",
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    volatility: "Высокая",
    fieldSource: "https://clientzone.betconstruct.com/media/download/m2g6f3/Derby%20Wheel%20Rules%20and%20Settings.pdf",
    rtpSource: "https://clientzone.betconstruct.com/media/download/m2g6f3/Derby%20Wheel%20Rules%20and%20Settings.pdf",
    volatilitySource: "https://clientzone.betconstruct.com/media/download/m2g6f3/Derby%20Wheel%20Rules%20and%20Settings.pdf",
    verifiedAt,
  },
  "playn-go-diamonds-of-the-realm": {
    field: "5×3 · 20 линий",
    rtp: "96,23%",
    maxWin: "20 000x",
    volatility: "Очень высокая",
    fieldSource: "https://slotyeti.com/en/slots/diamonds-of-the-realm/",
    rtpSource: "https://slotyeti.com/en/slots/diamonds-of-the-realm/",
    maxWinSource: "https://slotyeti.com/en/slots/diamonds-of-the-realm/",
    volatilitySource: "https://slotyeti.com/en/slots/diamonds-of-the-realm/",
    verifiedAt,
  },
  "playn-go-divina-commedia-i-nove-cerchi": {
    field: "5×3 · 10 линий",
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "3 000x",
    volatility: "Средняя",
    fieldSource: "https://www.bigwinboard.com/divina-commedia-i-nove-cerchi-playn-go-slot-review/",
    rtpSource: "https://www.bigwinboard.com/divina-commedia-i-nove-cerchi-playn-go-slot-review/",
    maxWinSource: "https://www.bigwinboard.com/divina-commedia-i-nove-cerchi-playn-go-slot-review/",
    volatilitySource: "https://www.bigwinboard.com/divina-commedia-i-nove-cerchi-playn-go-slot-review/",
    verifiedAt,
  },
  "playn-go-divine-showdown": {
    rtp: "96,51%",
    maxWin: "5 000x",
    volatility: "Высокая",
    rtpSource: "https://www.aboutslots.com/casino-slots/divine-showdown",
    maxWinSource: "https://www.aboutslots.com/casino-slots/divine-showdown",
    volatilitySource: "https://www.aboutslots.com/casino-slots/divine-showdown",
    verifiedAt,
  },
  "playn-go-eye-of-the-kraken": {
    rtp: "94,54%",
    volatility: "Средняя",
    rtpSource: "https://spindex.net/slot-demos/eye-of-the-kraken",
    volatilitySource: "https://spindex.net/slot-demos/eye-of-the-kraken",
    verifiedAt,
  },
  "playn-go-fire-joker-100": {
    rtp: "96,21% / 94,21% / 91,21% / 87,21% / 84,21%",
    maxWin: "5 000x",
    volatility: "Средняя",
    rtpSource: "https://slotuk.org/free-slots/fire-joker-100/",
    maxWinSource: "https://slotuk.org/free-slots/fire-joker-100/",
    volatilitySource: "https://slotuk.org/free-slots/fire-joker-100/",
    verifiedAt,
  },
  "playn-go-fire-joker-blitz": {
    rtp: "96,29% / 94,27% / 91,26% / 87,25% / 84,24%",
    maxWin: "6 000x",
    volatility: "Средняя",
    rtpSource: "https://www.bigwinboard.com/fire-joker-blitz-playn-go-slot-review/",
    maxWinSource: "https://www.bigwinboard.com/fire-joker-blitz-playn-go-slot-review/",
    volatilitySource: "https://www.bigwinboard.com/fire-joker-blitz-playn-go-slot-review/",
    verifiedAt,
  },
  "playn-go-forge-of-fortunes": {
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    volatility: "Средняя–высокая",
    rtpSource: "https://fruityslots.com/slots/reviews/forge-of-fortunes/",
    volatilitySource: "https://fruityslots.com/slots/reviews/forge-of-fortunes/",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsPlayngoPassportCloseout10(slug: string) {
  return details[slug];
}
