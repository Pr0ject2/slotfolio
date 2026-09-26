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
  "playn-go-chinese-new-year": {
    rtp: "96,65%",
    maxWin: "6 250x",
    volatility: "Средняя",
    rtpSource: "https://www.slottomat.com/slot/chinese-new-year",
    maxWinSource: "https://www.slottomat.com/slot/chinese-new-year",
    volatilitySource: "https://www.slottomat.com/slot/chinese-new-year",
    verifiedAt,
  },
  "playn-go-cops-n-robbers": {
    rtp: "96,47%",
    maxWin: "14 480x",
    volatility: "Средняя",
    rtpSource: "https://www.aboutslots.com/casino-slots/cops-n-robbers",
    maxWinSource: "https://www.aboutslots.com/casino-slots/cops-n-robbers",
    volatilitySource: "https://www.aboutslots.com/casino-slots/cops-n-robbers",
    verifiedAt,
  },
  "playn-go-crazy-cows": {
    rtp: "96,18%",
    maxWin: "2 500x",
    volatility: "Средняя",
    rtpSource: "https://gg.co.uk/online-casinos/slots/crazy-cows/",
    maxWinSource: "https://gg.co.uk/online-casinos/slots/crazy-cows/",
    volatilitySource: "https://gg.co.uk/online-casinos/slots/crazy-cows/",
    verifiedAt,
  },
  "playn-go-dragon-ship": {
    rtp: "96,01%",
    maxWin: "8 032x",
    volatility: "Высокая",
    rtpSource: "https://www.aboutslots.com/casino-slots/dragon-ship",
    maxWinSource: "https://www.aboutslots.com/casino-slots/dragon-ship",
    volatilitySource: "https://www.aboutslots.com/casino-slots/dragon-ship",
    verifiedAt,
  },
  "playn-go-enchanted-meadow": {
    rtp: "96,18%",
    maxWin: "2 500x",
    volatility: "Средняя",
    rtpSource: "https://www.slotstemple.com/free-slots/enchanted-meadow/",
    maxWinSource: "https://www.slotstemple.com/free-slots/enchanted-meadow/",
    volatilitySource: "https://www.slotstemple.com/free-slots/enchanted-meadow/",
    verifiedAt,
  },
  "playn-go-fortunes-of-ali-baba": {
    rtp: "96,89%",
    maxWin: "10 000x",
    volatility: "Высокая",
    rtpSource: "https://www.aboutslots.com/casino-slots/fortunes-of-ali-baba",
    maxWinSource: "https://www.aboutslots.com/casino-slots/fortunes-of-ali-baba",
    volatilitySource: "https://www.aboutslots.com/casino-slots/fortunes-of-ali-baba",
    verifiedAt,
  },
  "playn-go-gold-of-fortune-god": {
    rtp: "96,18%",
    maxWin: "6 000x",
    volatility: "Средняя",
    rtpSource: "https://www.online-slot.co.uk/online-slots/reviews/gold-of-fortune-god/",
    maxWinSource: "https://www.online-slot.co.uk/online-slots/reviews/gold-of-fortune-god/",
    volatilitySource: "https://www.online-slot.co.uk/online-slots/reviews/gold-of-fortune-god/",
    verifiedAt,
  },
  "playn-go-gold-trophy-2": {
    rtp: "96,88%",
    maxWin: "1 250x",
    volatility: "Средняя",
    rtpSource: "https://wits.gg/games/playn-go-gold-trophy-2",
    maxWinSource: "https://wits.gg/games/playn-go-gold-trophy-2",
    volatilitySource: "https://wits.gg/games/playn-go-gold-trophy-2",
    verifiedAt,
  },
  "playn-go-golden-colts": {
    rtp: "96,55%",
    maxWin: "2 500x",
    volatility: "Средняя",
    rtpSource: "https://www.aboutslots.com/casino-slots/golden-colts",
    maxWinSource: "https://www.aboutslots.com/casino-slots/golden-colts",
    volatilitySource: "https://www.aboutslots.com/casino-slots/golden-colts",
    verifiedAt,
  },
  "playn-go-honey-rush-100": {
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "50 000x",
    volatility: "Очень высокая",
    rtpSource: "https://www.casinowizard.com/slots/honey-rush-100/",
    maxWinSource: "https://www.casinowizard.com/slots/honey-rush-100/",
    volatilitySource: "https://www.casinowizard.com/slots/honey-rush-100/",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsPlayngoPassportCloseout17(slug: string) {
  return details[slug];
}
