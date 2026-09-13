import type { CatalogVerifiedDetails } from "./catalog-verified-details";

const verifiedAt = "2026-09-13";

const details: Record<string, CatalogVerifiedDetails> = {
  "push-gaming-sea-of-spirits": {
    source: "https://www.pushgaming.com/games/sea-spirits.html",
    verifiedAt,
  },
  "push-gaming-shamrock-saints": {
    source: "https://www.pushgaming.com/games/shamrock-saints.html",
    verifiedAt,
  },
  "push-gaming-tarot-treasures": {
    source: "https://www.pushgaming.com/games/tarot-treasures.html",
    verifiedAt,
  },
  "push-gaming-the-grand-show": {
    source: "https://www.pushgaming.com/games/grand-show.html",
    verifiedAt,
  },
  "push-gaming-the-great-banker": {
    source: "https://www.pushgaming.com/games/great-banker.html",
    verifiedAt,
  },
  "push-gaming-tiki-tumble": {
    field: "5×4 · 20 линий",
    source: "https://www.pushgaming.com/games/tiki-tumble.html",
    verifiedAt,
  },
  "push-gaming-tricky-treats": {
    source: "https://www.pushgaming.com/games/tricky-treats.html",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsPushFinal(slug: string) {
  return details[slug];
}
