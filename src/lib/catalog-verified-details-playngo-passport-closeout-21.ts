import type { CatalogVerifiedDetails } from "./catalog-verified-details";
import { getCatalogVerifiedDetailsPlayngoPassportCloseout22 } from "./catalog-verified-details-playngo-passport-closeout-22";

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
  "playn-go-invading-vegas": {
    field: "5×3 · 20 линий",
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "1 000x",
    volatility: "Средняя",
    fieldSource: "https://slotcatalog.com/en/slots/Invading-Vegas",
    rtpSource: "https://slotcatalog.com/en/slots/Invading-Vegas",
    maxWinSource: "https://slotcatalog.com/en/slots/Invading-Vegas",
    volatilitySource: "https://slotcatalog.com/en/slots/Invading-Vegas",
    verifiedAt,
  },
  "playn-go-irish-gold": {
    field: "3×3 · 5 линий",
    rtp: "95,42%",
    maxWin: "5 000x",
    volatility: "Высокая",
    fieldSource: "https://www.slotstemple.com/us/free-slots/irish-gold/",
    rtpSource: "https://www.slotstemple.com/us/free-slots/irish-gold/",
    maxWinSource: "https://www.slotstemple.com/us/free-slots/irish-gold/",
    volatilitySource: "https://www.slotstemple.com/us/free-slots/irish-gold/",
    verifiedAt,
  },
  "playn-go-jewel-box": {
    field: "5×3 · 15 линий",
    rtp: "95,78%",
    maxWin: "1 756x",
    volatility: "Средняя",
    fieldSource: "https://gamwiz.com/games/play-n-go/jewel-box",
    rtpSource: "https://gamwiz.com/games/play-n-go/jewel-box",
    maxWinSource: "https://gamwiz.com/games/play-n-go/jewel-box",
    volatilitySource: "https://gamwiz.com/games/play-n-go/jewel-box",
    verifiedAt,
  },
  "playn-go-jolly-roger": {
    field: "5×3 · 15 линий",
    rtp: "94,98%",
    maxWin: "4 000x",
    volatility: "Низкая",
    fieldSource: "https://www.slotstemple.com/ca/free-slots/jolly-roger/",
    rtpSource: "https://www.slotstemple.com/ca/free-slots/jolly-roger/",
    maxWinSource: "https://www.slotstemple.com/ca/free-slots/jolly-roger/",
    volatilitySource: "https://www.slotstemple.com/ca/free-slots/jolly-roger/",
    verifiedAt,
  },
  "playn-go-journey-to-paris": {
    field: "5×5 · кластеры",
    rtp: "96,37% / 94,74% / 91,75% / 87,69% / 84,69%",
    maxWin: "18 566x",
    volatility: "Средняя",
    fieldSource: "https://respinix.com/demo/journey-to-paris/",
    rtpSource: "https://respinix.com/demo/journey-to-paris/",
    maxWinSource: "https://respinix.com/demo/journey-to-paris/",
    volatilitySource: "https://respinix.com/demo/journey-to-paris/",
    verifiedAt,
  },
  "playn-go-lady-of-fortune": {
    rtp: "95,79%",
    maxWin: "2 500x",
    volatility: "Средняя",
    rtpSource: "https://casinorange.com/slot/lady-of-fortune",
    maxWinSource: "https://casinorange.com/slot/lady-of-fortune",
    volatilitySource: "https://casinorange.com/slot/lady-of-fortune",
    verifiedAt,
  },
  "playn-go-lab-of-madness-its-a-wild": {
    field: "5×4 · 20 линий",
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "8 000x",
    volatility: "Средняя–высокая",
    fieldSource: "https://aurexbet.com/lab-of-madness-slot-review-rtp-max-win-wild-features/",
    rtpSource: "https://aurexbet.com/lab-of-madness-slot-review-rtp-max-win-wild-features/",
    maxWinSource: "https://aurexbet.com/lab-of-madness-slot-review-rtp-max-win-wild-features/",
    volatilitySource: "https://aurexbet.com/lab-of-madness-slot-review-rtp-max-win-wild-features/",
    verifiedAt,
  },
  "playn-go-legacy-of-gems-blitzways": {
    rtp: "96,20%",
    maxWin: "20 000x",
    volatility: "Средняя–высокая",
    rtpSource: "https://www.gambling.com/uk/online-casinos/slots/games/legacy-of-gems-blitzways",
    maxWinSource: "https://www.gambling.com/uk/online-casinos/slots/games/legacy-of-gems-blitzways",
    volatilitySource: "https://www.gambling.com/uk/online-casinos/slots/games/legacy-of-gems-blitzways",
    verifiedAt,
  },
  "playn-go-legion-gold-reckoning": {
    field: "5×3 · 25 линий",
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "10 000x",
    volatility: "Средняя",
    fieldSource: "https://www.bigwinboard.com/legion-gold-reckoning-playn-go-slot-review/",
    rtpSource: "https://www.bigwinboard.com/legion-gold-reckoning-playn-go-slot-review/",
    maxWinSource: "https://www.bigwinboard.com/legion-gold-reckoning-playn-go-slot-review/",
    volatilitySource: "https://www.bigwinboard.com/legion-gold-reckoning-playn-go-slot-review/",
    verifiedAt,
  },
  "playn-go-legion-gold-and-the-throne-of-dead": {
    field: "5×3 · 25 линий",
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "10 000x",
    volatility: "Средняя",
    fieldSource: "https://www.bigwinboard.com/legion-gold-and-the-throne-of-dead-playn-go-slot-review/",
    rtpSource: "https://www.bigwinboard.com/legion-gold-and-the-throne-of-dead-playn-go-slot-review/",
    maxWinSource: "https://www.bigwinboard.com/legion-gold-and-the-throne-of-dead-playn-go-slot-review/",
    volatilitySource: "https://www.bigwinboard.com/legion-gold-and-the-throne-of-dead-playn-go-slot-review/",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsPlayngoPassportCloseout21(slug: string) {
  return details[slug] ?? getCatalogVerifiedDetailsPlayngoPassportCloseout22(slug);
}
