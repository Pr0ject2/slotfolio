import type { CatalogVerifiedDetails } from "./catalog-verified-details";
import { getCatalogVerifiedDetailsPlayngoPassportCloseout31 } from "./catalog-verified-details-playngo-passport-closeout-31";

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
  "playn-go-mystery-joker-6000": {
    rtp: "96,97%",
    volatility: "Высокая",
    rtpSource: "https://1001spins.com/game/mystery-joker-6000-slot-review/",
    volatilitySource: "https://1001spins.com/game/mystery-joker-6000-slot-review/",
    verifiedAt,
  },
  "playn-go-myth": {
    field: "5×3 · 20 линий",
    rtp: "96,88%",
    maxWin: "5 000x",
    volatility: "Высокая",
    fieldSource: "https://www.aboutslots.com/casino-slots/myth",
    rtpSource: "https://www.aboutslots.com/casino-slots/myth",
    maxWinSource: "https://www.aboutslots.com/casino-slots/myth",
    volatilitySource: "https://www.aboutslots.com/casino-slots/myth",
    verifiedAt,
  },
  "playn-go-ninja-fruits": {
    rtp: "96,65%",
    maxWin: "150x",
    volatility: "Высокая",
    rtpSource: "https://www.slotstemple.com/free-slots/ninja-fruits/",
    maxWinSource: "https://www.slotstemple.com/free-slots/ninja-fruits/",
    volatilitySource: "https://www.slotstemple.com/free-slots/ninja-fruits/",
    verifiedAt,
  },
  "playn-go-nugget-n-nonsense": {
    field: "5×3 · 243 способа",
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "50 000x",
    volatility: "Высокая",
    fieldSource: "https://www.bigwinboard.com/nugget-n-nonsense-playn-go-slot-review/",
    rtpSource: "https://www.bigwinboard.com/nugget-n-nonsense-playn-go-slot-review/",
    maxWinSource: "https://www.bigwinboard.com/nugget-n-nonsense-playn-go-slot-review/",
    volatilitySource: "https://www.bigwinboard.com/nugget-n-nonsense-playn-go-slot-review/",
    verifiedAt,
  },
  "playn-go-pearl-lagoon": {
    field: "5×3 · 20 линий",
    rtp: "96,88%",
    maxWin: "5 000x",
    volatility: "Высокая",
    fieldSource: "https://www.slotstemple.com/free-slots/pearl-lagoon/",
    rtpSource: "https://www.slotstemple.com/free-slots/pearl-lagoon/",
    maxWinSource: "https://www.slotstemple.com/free-slots/pearl-lagoon/",
    volatilitySource: "https://www.slotstemple.com/free-slots/pearl-lagoon/",
    verifiedAt,
  },
  "playn-go-pimped": {
    field: "5×3 · 10 линий",
    rtp: "94,51%",
    maxWin: "10 000x",
    volatility: "Высокая",
    fieldSource: "https://slotranker.com/play-n-go/pimped",
    rtpSource: "https://slotranker.com/play-n-go/pimped",
    maxWinSource: "https://slotranker.com/play-n-go/pimped",
    volatilitySource: "https://slotranker.com/play-n-go/pimped",
    verifiedAt,
  },
  "playn-go-playn-go-buffalo-of-wealth": {
    rtp: "94,20%",
    maxWin: "7 000x",
    volatility: "Высокая",
    rtpSource: "https://slotcatalog.com/en/slots/buffalo-of-wealth",
    maxWinSource: "https://slotcatalog.com/en/slots/buffalo-of-wealth",
    volatilitySource: "https://slotcatalog.com/en/slots/buffalo-of-wealth",
    verifiedAt,
  },
  "playn-go-prissy-princess": {
    field: "5×3 · 20 линий",
    rtp: "94,62%",
    maxWin: "6 003x",
    volatility: "Средняя",
    fieldSource: "https://www.stakers.com/en/casino/prissy_princess/",
    rtpSource: "https://www.stakers.com/en/casino/prissy_princess/",
    maxWinSource: "https://www.stakers.com/en/casino/prissy_princess/",
    volatilitySource: "https://www.stakers.com/en/casino/prissy_princess/",
    verifiedAt,
  },
  "playn-go-prosperity-palace": {
    rtp: "96,25%",
    maxWin: "5 000x",
    volatility: "Низкая",
    rtpSource: "https://slotzone.io/slots/prosperity-palace/",
    maxWinSource: "https://slotzone.io/slots/prosperity-palace/",
    volatilitySource: "https://slotzone.io/slots/prosperity-palace/",
    verifiedAt,
  },
  "playn-go-puebla-parade": {
    rtp: "96,20%",
    maxWin: "5 000x",
    volatility: "Высокая",
    rtpSource: "https://slotcatalog.com/en/slots/Puebla-Parade",
    maxWinSource: "https://slotcatalog.com/en/slots/Puebla-Parade",
    volatilitySource: "https://slotcatalog.com/en/slots/Puebla-Parade",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsPlayngoPassportCloseout30(slug: string) {
  return details[slug] ?? getCatalogVerifiedDetailsPlayngoPassportCloseout31(slug);
}
