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
  "playn-go-madame-ink": {
    rtp: "96,21%",
    maxWin: "5 000x",
    volatility: "Средняя",
    rtpSource: "https://chips.gg/catalog/playngo-madame-ink",
    maxWinSource: "https://chips.gg/catalog/playngo-madame-ink",
    volatilitySource: "https://chips.gg/catalog/playngo-madame-ink",
    verifiedAt,
  },
  "playn-go-mafia-gold": {
    rtp: "94,20%",
    maxWin: "6 000x",
    volatility: "Высокая",
    rtpSource: "https://slotranker.com/play-n-go/mafia-gold",
    maxWinSource: "https://slotranker.com/play-n-go/mafia-gold",
    volatilitySource: "https://slotranker.com/play-n-go/mafia-gold",
    verifiedAt,
  },
  "playn-go-mahjong-88": {
    rtp: "96,62%",
    maxWin: "5 000x",
    volatility: "Средняя–высокая",
    rtpSource: "https://www.luckymobileslots.com/game-reviews/mahjong-88/",
    maxWinSource: "https://www.luckymobileslots.com/game-reviews/mahjong-88/",
    volatilitySource: "https://www.luckymobileslots.com/game-reviews/mahjong-88/",
    verifiedAt,
  },
  "playn-go-manta-mayhem": {
    field: "5×3 · 20 линий",
    rtp: "96,20%",
    maxWin: "9 000x",
    volatility: "Высокая",
    fieldSource: "https://mail.newcasinogamereviews.com/manta-mayhem",
    rtpSource: "https://mail.newcasinogamereviews.com/manta-mayhem",
    maxWinSource: "https://mail.newcasinogamereviews.com/manta-mayhem",
    volatilitySource: "https://mail.newcasinogamereviews.com/manta-mayhem",
    verifiedAt,
  },
  "playn-go-matsuri": {
    rtp: "96,17%",
    maxWin: "3 000x",
    volatility: "Средняя",
    rtpSource: "https://slotyeti.com/en/slots/matsuri/",
    maxWinSource: "https://slotyeti.com/en/slots/matsuri/",
    volatilitySource: "https://slotyeti.com/en/slots/matsuri/",
    verifiedAt,
  },
  "playn-go-medusas-madness": {
    rtp: "96,59%",
    maxWin: "2 000x",
    volatility: "Средняя",
    rtpSource: "https://xcitingslots.com/slots/medusas-madness/",
    maxWinSource: "https://xcitingslots.com/slots/medusas-madness/",
    volatilitySource: "https://xcitingslots.com/slots/medusas-madness/",
    verifiedAt,
  },
  "playn-go-mega-don": {
    field: "5×4 · 1 024 способа",
    rtp: "96,20%",
    maxWin: "10 000x",
    volatility: "Высокая",
    fieldSource: "https://gg.co.uk/online-casinos/slots/mega-don/",
    rtpSource: "https://gg.co.uk/online-casinos/slots/mega-don/",
    maxWinSource: "https://gg.co.uk/online-casinos/slots/mega-don/",
    volatilitySource: "https://gg.co.uk/online-casinos/slots/mega-don/",
    verifiedAt,
  },
  "playn-go-mega-don-triple-threat": {
    rtp: "96,18%",
    maxWin: "25 000x",
    volatility: "Высокая",
    rtpSource: "https://gg.co.uk/online-casinos/slots/megadon-triple-threat/",
    maxWinSource: "https://gg.co.uk/online-casinos/slots/megadon-triple-threat/",
    volatilitySource: "https://gg.co.uk/online-casinos/slots/megadon-triple-threat/",
    verifiedAt,
  },
  "playn-go-mega-don-feeding-frenzy": {
    rtp: "96,20%",
    maxWin: "20 000x",
    volatility: "Высокая",
    rtpSource: "https://www.gambling.com/uk/online-casinos/slots/games/mega-don-feeding-frenzy",
    maxWinSource: "https://www.gambling.com/uk/online-casinos/slots/games/mega-don-feeding-frenzy",
    volatilitySource: "https://www.gambling.com/uk/online-casinos/slots/games/mega-don-feeding-frenzy",
    verifiedAt,
  },
  "playn-go-merlin-and-the-ice-queen-morgana": {
    field: "5×3 · 10 линий",
    rtp: "96,20%",
    maxWin: "20 000x",
    volatility: "Высокая",
    fieldSource: "https://slotcatalog.com/en/slots/Merlin-and-the-Ice-Queen-Morgana",
    rtpSource: "https://slotcatalog.com/en/slots/Merlin-and-the-Ice-Queen-Morgana",
    maxWinSource: "https://slotcatalog.com/en/slots/Merlin-and-the-Ice-Queen-Morgana",
    volatilitySource: "https://slotcatalog.com/en/slots/Merlin-and-the-Ice-Queen-Morgana",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsPlayngoPassportCloseout22(slug: string) {
  return details[slug];
}
