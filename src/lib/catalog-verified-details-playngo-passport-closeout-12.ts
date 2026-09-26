import type { CatalogVerifiedDetails } from "./catalog-verified-details";
import { getCatalogVerifiedDetailsPlayngoPassportCloseout13 } from "./catalog-verified-details-playngo-passport-closeout-13";

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
  "playn-go-fox-mayhem": {
    rtp: "96,20%",
    maxWin: "4 000x",
    volatility: "Средняя",
    rtpSource: "https://www.online-slot.co.uk/online-slots/reviews/fox-mayhem/",
    maxWinSource: "https://www.online-slot.co.uk/online-slots/reviews/fox-mayhem/",
    volatilitySource: "https://www.online-slot.co.uk/online-slots/reviews/fox-mayhem/",
    verifiedAt,
  },
  "playn-go-free-reelin-joker": {
    rtp: "96,17%",
    maxWin: "1 000x",
    volatility: "Средняя",
    rtpSource: "https://slotcatalog.com/en/slots/Free-Reelin-Joker",
    maxWinSource: "https://slotcatalog.com/en/slots/Free-Reelin-Joker",
    volatilitySource: "https://slotcatalog.com/en/slots/Free-Reelin-Joker",
    verifiedAt,
  },
  "playn-go-free-reelin-joker-1000": {
    rtp: "96,18%",
    volatility: "Средняя",
    rtpSource: "https://fruityslots.com/slots/reviews/free-reelin-joker-1000/",
    volatilitySource: "https://fruityslots.com/slots/reviews/free-reelin-joker-1000/",
    verifiedAt,
  },
  "playn-go-frozen-gems": {
    rtp: "96,36%",
    maxWin: "10 000x",
    volatility: "Высокая",
    rtpSource: "https://slotcatalog.com/en/slots/Frozen-Gems",
    maxWinSource: "https://slotcatalog.com/en/slots/Frozen-Gems",
    volatilitySource: "https://slotcatalog.com/en/slots/Frozen-Gems",
    verifiedAt,
  },
  "playn-go-fu-er-dai": {
    rtp: "96,51%",
    maxWin: "5 000x",
    volatility: "Высокая",
    rtpSource: "https://1001spins.com/game/fu-er-dai-slot-review/",
    maxWinSource: "https://1001spins.com/game/fu-er-dai-slot-review/",
    volatilitySource: "https://1001spins.com/game/fu-er-dai-slot-review/",
    verifiedAt,
  },
  "playn-go-game-of-gladiators": {
    rtp: "96,42%",
    maxWin: "5 000x",
    volatility: "Средняя–высокая",
    rtpSource: "https://www.luckymobileslots.com/game-reviews/game-of-gladiators/",
    maxWinSource: "https://www.luckymobileslots.com/game-reviews/game-of-gladiators/",
    volatilitySource: "https://www.luckymobileslots.com/game-reviews/game-of-gladiators/",
    verifiedAt,
  },
  "playn-go-game-of-gladiators-uprising": {
    field: "5×4 · 30 линий",
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "6 000x",
    volatility: "Средняя",
    fieldSource: "https://www.aboutslots.com/casino-slots/game-of-gladiators-uprising",
    rtpSource: "https://www.aboutslots.com/casino-slots/game-of-gladiators-uprising",
    maxWinSource: "https://www.aboutslots.com/casino-slots/game-of-gladiators-uprising",
    volatilitySource: "https://www.aboutslots.com/casino-slots/game-of-gladiators-uprising",
    verifiedAt,
  },
  "playn-go-gargantoonz": {
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "7 000x",
    volatility: "Высокая",
    rtpSource: "https://www.bigwinboard.com/gargantoonz-playn-go-slot-review/",
    maxWinSource: "https://www.bigwinboard.com/gargantoonz-playn-go-slot-review/",
    volatilitySource: "https://www.bigwinboard.com/gargantoonz-playn-go-slot-review/",
    verifiedAt,
  },
  "playn-go-gates-of-troy": {
    rtp: "96,20%",
    maxWin: "3 000x",
    volatility: "Средняя",
    rtpSource: "https://www.aboutslots.com/casino-slots/gates-of-troy",
    maxWinSource: "https://www.aboutslots.com/casino-slots/gates-of-troy",
    volatilitySource: "https://www.aboutslots.com/casino-slots/gates-of-troy",
    verifiedAt,
  },
  "playn-go-helloween": {
    rtp: "96,20%",
    maxWin: "5 000x",
    volatility: "Средняя",
    rtpSource: "https://www.slotuk.org/free-slots/helloween/",
    maxWinSource: "https://www.slotuk.org/free-slots/helloween/",
    volatilitySource: "https://www.slotuk.org/free-slots/helloween/",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsPlayngoPassportCloseout12(slug: string) {
  return details[slug] ?? getCatalogVerifiedDetailsPlayngoPassportCloseout13(slug);
}
