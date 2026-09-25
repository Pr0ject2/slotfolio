import type { CatalogVerifiedDetails } from "./catalog-verified-details";

type PlayngoPassportCloseout = Partial<
  Pick<CatalogVerifiedDetails, "rtp" | "maxWin" | "volatility">
> & {
  rtpSource?: string;
  maxWinSource?: string;
  volatilitySource?: string;
  verifiedAt: string;
};

const verifiedAt = "2026-09-25";

const details: Record<string, PlayngoPassportCloseout> = {
  "playn-go-charlie-chance-in-hell-to-pay": {
    rtp: "96,23% / 94,79% / 91,33% / 87,59% / 84,71%",
    maxWin: "6 666x",
    volatility: "Средняя",
    rtpSource: "https://allslotsites.com/slot-games/charlie-chance-in-hell-to-pay/",
    maxWinSource: "https://allslotsites.com/slot-games/charlie-chance-in-hell-to-pay/",
    volatilitySource: "https://allslotsites.com/slot-games/charlie-chance-in-hell-to-pay/",
    verifiedAt,
  },
  "playn-go-chronos-joker": {
    rtp: "96,54% / 94,57% / 91,56% / 87,53% / 84,52%",
    maxWin: "1 600x",
    volatility: "Средняя",
    rtpSource: "https://www.bigwinboard.com/chronos-joker-playn-go-slot-review/",
    maxWinSource: "https://www.bigwinboard.com/chronos-joker-playn-go-slot-review/",
    volatilitySource: "https://www.bigwinboard.com/chronos-joker-playn-go-slot-review/",
    verifiedAt,
  },
  "playn-go-city-of-sound": {
    rtp: "96,30% / 94,31% / 91,31% / 87,30% / 84,30%",
    maxWin: "4 000x",
    volatility: "Средняя",
    rtpSource: "https://bonkku.com/demos/city-of-sound/",
    maxWinSource: "https://bonkku.com/demos/city-of-sound/",
    volatilitySource: "https://bonkku.com/demos/city-of-sound/",
    verifiedAt,
  },
  "playn-go-clash-of-camelot": {
    rtp: "96,28% / 94,28% / 91,29% / 87,27% / 84,25%",
    maxWin: "35 000x",
    volatility: "Высокая",
    rtpSource: "https://www.aboutslots.com/casino-slots/clash-of-camelot",
    maxWinSource: "https://www.aboutslots.com/casino-slots/clash-of-camelot",
    volatilitySource: "https://www.aboutslots.com/casino-slots/clash-of-camelot",
    verifiedAt,
  },
  "playn-go-cloud-quest": {
    rtp: "96,52% / 94,54% / 91,54% / 87,54% / 84,53%",
    maxWin: "2 500x",
    volatility: "Средняя",
    rtpSource: "https://gamblerid.com/games/cloud-quest",
    maxWinSource: "https://gamblerid.com/games/cloud-quest",
    volatilitySource: "https://gamblerid.com/games/cloud-quest",
    verifiedAt,
  },
  "playn-go-coils-of-cash": {
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "30 000x",
    volatility: "Высокая",
    rtpSource: "https://www.bigwinboard.com/coils-of-cash-playn-go-slot-review/",
    maxWinSource: "https://www.bigwinboard.com/coils-of-cash-playn-go-slot-review/",
    volatilitySource: "https://www.bigwinboard.com/coils-of-cash-playn-go-slot-review/",
    verifiedAt,
  },
  "playn-go-colt-lightning": {
    rtp: "96,24% / 94,27% / 91,28% / 87,25% / 84,27%",
    volatility: "Высокая",
    rtpSource: "https://fruityslots.com/slots/reviews/colt-lightning/",
    volatilitySource: "https://fruityslots.com/slots/reviews/colt-lightning/",
    verifiedAt,
  },
  "playn-go-contact": {
    rtp: "96,55% / 94,55% / 91,62% / 87,41% / 84,66%",
    maxWin: "1 517,5x",
    volatility: "Высокая",
    rtpSource: "https://gamblerid.com/games/contact",
    maxWinSource: "https://www.playngo.com/games/contact",
    volatilitySource: "https://gamblerid.com/games/contact",
    verifiedAt,
  },
  "playn-go-coywolf-cash": {
    rtp: "96,31% / 94,30% / 91,28% / 87,26% / 84,25%",
    maxWin: "4 000x",
    volatility: "Высокая",
    rtpSource: "https://www.aboutslots.com/casino-slots/coywolf-cash",
    maxWinSource: "https://www.aboutslots.com/casino-slots/coywolf-cash",
    volatilitySource: "https://www.aboutslots.com/casino-slots/coywolf-cash",
    verifiedAt,
  },
  "playn-go-crabbys-gold": {
    rtp: "96,25% / 94,25% / 91,25% / 87,25% / 84,25%",
    volatility: "Средняя",
    rtpSource: "https://casinotest24.com/slots/crabbys-gold/",
    volatilitySource: "https://casinotest24.com/slots/crabbys-gold/",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsPlayngoPassportCloseout8(slug: string) {
  return details[slug];
}
