import type { CatalogVerifiedDetails } from "./catalog-verified-details";

const verifiedAt = "2026-09-11";
const verifiedAtFinal = "2026-09-13";
const verifiedAtLatest = "2026-09-17";

const details: Record<string, CatalogVerifiedDetails> = {
  "nolimit-city-bowel-of-beelzebub": {
    releaseDate: "2026-12-01",
    source: "https://nolimitcity.com/games/bowel-of-beelzebub",
    verifiedAt: verifiedAtFinal,
  },
  "nolimit-city-ding-dong-death": {
    field: "6×3",
    rtp: "95,83%",
    maxWin: "14 280x",
    releaseDate: "2026-09-22",
    source: "https://nolimitcity.com/games/ding-dong-death",
    verifiedAt,
  },
  "nolimit-city-duck-hunters-2": {
    field: "6×6",
    rtp: "96,00%",
    maxWin: "40 000x",
    releaseDate: "2026-09-10",
    source: "https://nolimitcity.com/games/duck-hunters-2",
    verifiedAt,
  },
  "nolimit-city-fire-in-the-hole-4": {
    releaseDate: "2026-11-17",
    source: "https://nolimitcity.com/games/game-1",
    verifiedAt: verifiedAtFinal,
  },
  "nolimit-city-gator-hunters-2": {
    field: "6×5",
    rtp: "96,00%",
    maxWin: "30 000x",
    releaseDate: "2026-10-06",
    source: "https://nolimitcity.com/games/gator-hunters-2",
    verifiedAt: verifiedAtLatest,
  },
  "nolimit-city-six-feet-under": {
    releaseDate: "2026-10-20",
    source: "https://nolimitcity.com/games/six-feet-under",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsNolimit(slug: string) {
  return details[slug];
}
