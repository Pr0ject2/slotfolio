import type { CatalogVerifiedDetails } from "./catalog-verified-details";

type ThreeOaksPassportCloseout = Partial<
  Pick<CatalogVerifiedDetails, "rtp" | "maxWin" | "volatility">
> & {
  rtpSource?: string;
  maxWinSource?: string;
  volatilitySource?: string;
  verifiedAt: string;
};

const verifiedAt = "2026-09-25";

const details: Record<string, ThreeOaksPassportCloseout> = {
  "3-oaks-gaming-green-chilli": {
    rtp: "96,65%",
    maxWin: "2 000x",
    volatility: "Высокая",
    rtpSource: "https://greenchillislots.com/",
    maxWinSource: "https://greenchillislots.com/",
    volatilitySource: "https://greenchillislots.com/",
    verifiedAt,
  },
  "3-oaks-gaming-fishin-bear": {
    rtp: "96,50%",
    maxWin: "2 500x",
    volatility: "Средняя",
    rtpSource: "https://slotcatalog.com/en/soft/3-Oaks?cISO=GB",
    maxWinSource: "https://slotcatalog.com/en/soft/3-Oaks?cISO=GB",
    volatilitySource: "https://slotcatalog.com/en/soft/3-Oaks?cISO=GB",
    verifiedAt,
  },
  "3-oaks-gaming-super-china-pots": {
    rtp: "95,71%",
    maxWin: "2 000x",
    volatility: "Высокая",
    rtpSource: "https://chips.gg/play/3oaks-super-china-pots",
    maxWinSource: "https://chips.gg/play/3oaks-super-china-pots",
    volatilitySource: "https://chips.gg/play/3oaks-super-china-pots",
    verifiedAt,
  },
  "3-oaks-gaming-big-heist": {
    rtp: "95,54%",
    maxWin: "3 170x",
    volatility: "Высокая",
    rtpSource: "https://www.slotstemple.com/free-slots/big-heist/",
    maxWinSource: "https://www.slotstemple.com/free-slots/big-heist/",
    volatilitySource: "https://www.slotstemple.com/free-slots/big-heist/",
    verifiedAt,
  },
  "3-oaks-gaming-aztec-fire": {
    rtp: "95,50%",
    maxWin: "10 000x",
    volatility: "Средняя",
    rtpSource: "https://spinhunter.co.uk/3-oaks-gaming-slots/",
    maxWinSource: "https://spinhunter.co.uk/3-oaks-gaming-slots/",
    volatilitySource: "https://spinhunter.co.uk/3-oaks-gaming-slots/",
    verifiedAt,
  },
  "3-oaks-gaming-aztec-fire-2": {
    rtp: "95,54%",
    maxWin: "10 000x",
    volatility: "Средняя–высокая",
    rtpSource: "https://aztec-fire-2-australia.readme.io/reference/aztec-fire-2-rtp-volatility",
    maxWinSource: "https://aztecfire2.com/",
    volatilitySource: "https://www.machineasous.info/machine/aztec-fire-2/",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetails3OaksPassportCloseout4(slug: string) {
  return details[slug];
}
