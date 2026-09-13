import type { CatalogVerifiedDetails } from "./catalog-verified-details";

const verifiedAt = "2026-09-13";

const details: Record<string, CatalogVerifiedDetails> = {
  "push-gaming-boss-bear": { maxWin: "25000x", volatility: "Высокая", source: "https://www.pushgaming.com/games/boss-bear.html", verifiedAt },
  "push-gaming-dino-p-d": { maxWin: "10000x", volatility: "Средняя–высокая", source: "https://www.pushgaming.com/games/dino-pd.html", verifiedAt },
  "push-gaming-dinopolis": { maxWin: "50000x", volatility: "Высокая", source: "https://www.pushgaming.com/games/dinopolis.html", verifiedAt },
  "push-gaming-fat-banker": { maxWin: "25000x", volatility: "Высокая", source: "https://www.pushgaming.com/games/fat-banker.html", verifiedAt },
  "push-gaming-generous-jack": { maxWin: "10000x", volatility: "Высокая", source: "https://www.pushgaming.com/games/generous-jack.html", verifiedAt },
  "push-gaming-goat-getter": { maxWin: "10000x", volatility: "Средняя–высокая", source: "https://www.pushgaming.com/games/goat-getter.html", verifiedAt },
  "push-gaming-happy-bamboo": { maxWin: "6060x", volatility: "Средняя", source: "https://www.pushgaming.com/games/happy-bamboo.html", verifiedAt },
  "push-gaming-hearts-highway": { maxWin: "10000x", volatility: "Средняя–высокая", source: "https://www.pushgaming.com/games/hearts-highway.html", verifiedAt },
  "push-gaming-henry-the-ape": { maxWin: "61499.9x", volatility: "Высокая", source: "https://www.pushgaming.com/games/henry-ape.html", verifiedAt },
  "push-gaming-mad-blast": { maxWin: "10000x", volatility: "Высокая", source: "https://www.pushgaming.com/games/mad-blast.html", verifiedAt },
  "push-gaming-mad-cars": { maxWin: "25000x", volatility: "Высокая", source: "https://www.pushgaming.com/games/mad-cars.html", verifiedAt },
  "push-gaming-masked-mayhem": { maxWin: "10231x", volatility: "Средняя–высокая", source: "https://www.pushgaming.com/games/masked-mayhem.html", verifiedAt },
  "push-gaming-olympus-unleashed": { maxWin: "2340x", volatility: "Низкая", source: "https://www.pushgaming.com/games/olympus-unleashed.html", verifiedAt },
  "push-gaming-power-vault": { maxWin: "4112x", volatility: "Очень низкая", source: "https://www.pushgaming.com/games/power-vault.html", verifiedAt },
  "push-gaming-rat-king": { maxWin: "10000x", volatility: "Средняя", source: "https://www.pushgaming.com/games/rat-king.html", verifiedAt },
  "push-gaming-regal-knights": { maxWin: "4897.8x", volatility: "Низкая", source: "https://www.pushgaming.com/games/regal-knights.html", verifiedAt },
  "push-gaming-santas-vault": { maxWin: "8118x", volatility: "Низкая", source: "https://www.pushgaming.com/games/santas-vault.html", verifiedAt },
  "push-gaming-shamrock-saints": { maxWin: "10000x", volatility: "Средняя–высокая", source: "https://www.pushgaming.com/games/shamrock-saints.html", verifiedAt },
  "push-gaming-the-grand-show": { maxWin: "10000x", volatility: "Средняя", source: "https://www.pushgaming.com/games/grand-show.html", verifiedAt },
  "push-gaming-the-great-banker": { maxWin: "10317.6x", volatility: "Средняя", source: "https://www.pushgaming.com/games/great-banker.html", verifiedAt },
  "push-gaming-triple-rampage": { maxWin: "5400x", volatility: "Низкая–средняя", source: "https://www.pushgaming.com/games/triple-rampage.html", verifiedAt },
  "push-gaming-viva-lock-vegas": { maxWin: "13154x", volatility: "Низкая–средняя", source: "https://www.pushgaming.com/games/viva-lock-vegas.html", verifiedAt },
  "push-gaming-wild-swarm-2": { maxWin: "10000x", volatility: "Высокая", source: "https://www.pushgaming.com/games/wild-swarm-2.html", verifiedAt },
  "push-gaming-wild-swarm-3-chocolate-eggs": { maxWin: "23902.8x", volatility: "Низкая–средняя", source: "https://www.pushgaming.com/games/wild-swarm-3-chocolate-eggs.html", verifiedAt },
  "push-gaming-wild-swarm-triple-hive": { maxWin: "23902.8x", volatility: "Средняя", source: "https://www.pushgaming.com/games/wild-swarm-triple-hive.html", verifiedAt },
};

export function getCatalogVerifiedDetailsQualityPass3(slug: string) {
  return details[slug];
}
