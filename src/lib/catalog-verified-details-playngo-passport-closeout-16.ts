import type { CatalogVerifiedDetails } from "./catalog-verified-details";
import { getCatalogVerifiedDetailsPlayngoPassportCloseout17 } from "./catalog-verified-details-playngo-passport-closeout-17";

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
  "playn-go-gnawn-gold": {
    field: "5×3 · 10 линий",
    rtp: "96,24%",
    maxWin: "40 000x",
    volatility: "Высокая",
    fieldSource: "https://fruityslots.com/slots/reviews/gnawn-gold/",
    rtpSource: "https://fruityslots.com/slots/reviews/gnawn-gold/",
    maxWinSource: "https://fruityslots.com/slots/reviews/gnawn-gold/",
    volatilitySource: "https://fruityslots.com/slots/reviews/gnawn-gold/",
    verifiedAt,
  },
  "playn-go-holy-moo-extreme-power": {
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "4 000x",
    volatility: "Высокая",
    rtpSource: "https://fruityslots.com/slots/reviews/holy-moo-extreme-power/",
    maxWinSource: "https://fruityslots.com/slots/reviews/holy-moo-extreme-power/",
    volatilitySource: "https://fruityslots.com/slots/reviews/holy-moo-extreme-power/",
    verifiedAt,
  },
  "playn-go-hugo-legacy": {
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "3 000x",
    volatility: "Средняя",
    rtpSource: "https://slotcatalog.com/en/slots/Hugo-Legacy",
    maxWinSource: "https://slotcatalog.com/en/slots/Hugo-Legacy",
    volatilitySource: "https://slotcatalog.com/en/slots/Hugo-Legacy",
    verifiedAt,
  },
  "playn-go-gerards-gambit": {
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "3 000x",
    volatility: "Средняя",
    rtpSource: "https://www.slotuk.org/free-slots/gerards-gambit/",
    maxWinSource: "https://www.slotuk.org/free-slots/gerards-gambit/",
    volatilitySource: "https://www.slotuk.org/free-slots/gerards-gambit/",
    verifiedAt,
  },
  "playn-go-fortune-teller": {
    field: "5 барабанов · 20 линий",
    rtp: "96,08%",
    maxWin: "5 000x",
    volatility: "Средняя",
    fieldSource: "https://www.slotstemple.com/free-slots/fortune-teller/",
    rtpSource: "https://www.slotstemple.com/free-slots/fortune-teller/",
    maxWinSource: "https://www.slotstemple.com/free-slots/fortune-teller/",
    volatilitySource: "https://www.slotstemple.com/free-slots/fortune-teller/",
    verifiedAt,
  },
  "playn-go-gemix-100": {
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "25 000x",
    volatility: "Высокая",
    rtpSource: "https://www.bigwinboard.com/gemix-100-playn-go-slot-review/",
    maxWinSource: "https://www.bigwinboard.com/gemix-100-playn-go-slot-review/",
    volatilitySource: "https://www.bigwinboard.com/gemix-100-playn-go-slot-review/",
    verifiedAt,
  },
  "playn-go-grannys-wild": {
    field: "5×3 · 243 способа",
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "2 800x",
    volatility: "Высокая",
    fieldSource: "https://bonkku.com/demos/grannys-wild/",
    rtpSource: "https://www.bigwinboard.com/grannys-wild-playn-go-slot-review/",
    maxWinSource: "https://www.bigwinboard.com/grannys-wild-playn-go-slot-review/",
    volatilitySource: "https://www.bigwinboard.com/grannys-wild-playn-go-slot-review/",
    verifiedAt,
  },
  "playn-go-hugo-goal": {
    rtp: "96,49%",
    maxWin: "800x",
    volatility: "Средняя–высокая",
    rtpSource: "https://www.casino777.nl/en/p/playngo/game/hugo-goal",
    maxWinSource: "https://www.casino777.nl/en/p/playngo/game/hugo-goal",
    volatilitySource: "https://www.casino777.nl/en/p/playngo/game/hugo-goal",
    verifiedAt,
  },
  "playn-go-gold-volcano": {
    rtp: "96,20%",
    maxWin: "10 000x",
    volatility: "Высокая",
    rtpSource: "https://slotcatalog.com/en/slots/Gold-Volcano",
    maxWinSource: "https://slotcatalog.com/en/slots/Gold-Volcano",
    volatilitySource: "https://slotcatalog.com/en/slots/Gold-Volcano",
    verifiedAt,
  },
  "playn-go-gemix": {
    rtp: "94,78%",
    maxWin: "6 025x",
    volatility: "Средняя",
    rtpSource: "https://slotcatalog.com/en/slots/Gemix",
    maxWinSource: "https://slotcatalog.com/en/slots/Gemix",
    volatilitySource: "https://slotcatalog.com/en/slots/Gemix",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsPlayngoPassportCloseout16(slug: string) {
  return details[slug] ?? getCatalogVerifiedDetailsPlayngoPassportCloseout17(slug);
}
