import type { CatalogVerifiedDetails } from "./catalog-verified-details";

type QualityPass3Details = CatalogVerifiedDetails & {
  releaseDateSource?: string;
  fieldSource?: string;
};

const verifiedAt = "2026-09-13";
const verifiedAtScore4 = "2026-09-18";

const details: Record<string, QualityPass3Details> = {
  "push-gaming-boss-bear": { maxWin: "25000x", volatility: "Высокая", source: "https://www.pushgaming.com/games/boss-bear.html", verifiedAt },
  "push-gaming-dino-p-d": { maxWin: "10000x", volatility: "Средняя–высокая", source: "https://www.pushgaming.com/games/dino-pd.html", verifiedAt },
  "push-gaming-dinopolis": { maxWin: "50000x", volatility: "Высокая", source: "https://www.pushgaming.com/games/dinopolis.html", verifiedAt },
  "push-gaming-fat-banker": { field: "50 линий", maxWin: "25000x", volatility: "Высокая", releaseDate: "2022-05-19", fieldSource: "https://www.pushgaming.com/blog/push-gaming-expands-fan-favourite-fat-series-fat-banker.html", releaseDateSource: "https://www.pushgaming.com/blog/push-gaming-expands-fan-favourite-fat-series-fat-banker.html", source: "https://www.pushgaming.com/games/fat-banker.html", verifiedAt: verifiedAtScore4 },
  "push-gaming-generous-jack": { field: "старт 1×3 · расширяемое поле", maxWin: "10000x", volatility: "Высокая", releaseDate: "2022-12-12", fieldSource: "https://www.pushgaming.com/blog/push-gaming-introduces-another-highly-engaging-mechanic-generous-jack.html", releaseDateSource: "https://www.pushgaming.com/blog/push-gaming-introduces-another-highly-engaging-mechanic-generous-jack.html", source: "https://www.pushgaming.com/games/generous-jack.html", verifiedAt: verifiedAtScore4 },
  "push-gaming-goat-getter": { field: "5×6", maxWin: "10000x", volatility: "Средняя–высокая", releaseDate: "2023-08-24", fieldSource: "https://www.pushgaming.com/blog/push-gaming-scales-slot-summit-quest-elusive-mountain-goats-its-latest-pay-anywhere-title-goat-getter.html", releaseDateSource: "https://www.pushgaming.com/blog/push-gaming-scales-slot-summit-quest-elusive-mountain-goats-its-latest-pay-anywhere-title-goat-getter.html", source: "https://www.pushgaming.com/games/goat-getter.html", verifiedAt: verifiedAtScore4 },
  "push-gaming-happy-bamboo": { field: "3×3", maxWin: "6060x", volatility: "Средняя", fieldSource: "https://www.pushgaming.com/blog/q-game-producer-jack-marshall-speaks-askgamblers.html", source: "https://www.pushgaming.com/games/happy-bamboo.html", verifiedAt: verifiedAtScore4 },
  "push-gaming-hearts-highway": { field: "5×3 · 20 линий", maxWin: "10000x", volatility: "Средняя–высокая", releaseDate: "2024-02-13", fieldSource: "https://www.pushgaming.com/blog/push-gaming-reimagines-classic-slot-machines-hearts-highway.html", releaseDateSource: "https://www.pushgaming.com/blog/push-gaming-reimagines-classic-slot-machines-hearts-highway.html", source: "https://www.pushgaming.com/games/hearts-highway.html", verifiedAt: verifiedAtScore4 },
  "push-gaming-henry-the-ape": { maxWin: "61499.9x", volatility: "Высокая", releaseDate: "2025-06-11", releaseDateSource: "https://www.pushgaming.com/blog/push-gaming-drops-mic-bold-new-release-henry-ape.html", source: "https://www.pushgaming.com/games/henry-ape.html", verifiedAt: verifiedAtScore4 },
  "push-gaming-mad-blast": { maxWin: "10000x", volatility: "Высокая", releaseDate: "2025-02-20", releaseDateSource: "https://www.pushgaming.com/blog/push-gaming-lights-fuse-explosive-multiplier-play-mad-blast.html", source: "https://www.pushgaming.com/games/mad-blast.html", verifiedAt: verifiedAtScore4 },
  "push-gaming-mad-cars": { field: "5×6", maxWin: "25000x", volatility: "Высокая", releaseDate: "2022-08-10", fieldSource: "https://www.pushgaming.com/blog/push-gaming-races-through-post-apocalyptic-wastelands-mad-cars.html", releaseDateSource: "https://www.pushgaming.com/blog/push-gaming-races-through-post-apocalyptic-wastelands-mad-cars.html", source: "https://www.pushgaming.com/games/mad-cars.html", verifiedAt: verifiedAtScore4 },
  "push-gaming-masked-mayhem": { maxWin: "10231x", volatility: "Средняя–высокая", source: "https://www.pushgaming.com/games/masked-mayhem.html", verifiedAt },
  "push-gaming-olympus-unleashed": { maxWin: "2340x", volatility: "Низкая", releaseDate: "2025-05-07", releaseDateSource: "https://www.pushgaming.com/blog/push-gaming-ascends-new-heights-mythic-new-release-olympus-unleashed.html", source: "https://www.pushgaming.com/games/olympus-unleashed.html", verifiedAt: verifiedAtScore4 },
  "push-gaming-power-vault": { field: "3×3 · 5 линий", maxWin: "4112x", volatility: "Очень низкая", releaseDate: "2025-03-05", fieldSource: "https://www.pushgaming.com/blog/push-gaming-cracks-code-power-vault.html", releaseDateSource: "https://www.pushgaming.com/blog/push-gaming-cracks-code-power-vault.html", source: "https://www.pushgaming.com/games/power-vault.html", verifiedAt: verifiedAtScore4 },
  "push-gaming-rat-king": { field: "6×6", maxWin: "10000x", volatility: "Средняя", releaseDate: "2023-07-27", fieldSource: "https://www.pushgaming.com/blog/push-gaming-blends-retro-themes-innovative-gameplay-rat-king.html", releaseDateSource: "https://www.pushgaming.com/blog/push-gaming-blends-retro-themes-innovative-gameplay-rat-king.html", source: "https://www.pushgaming.com/games/rat-king.html", verifiedAt: verifiedAtScore4 },
  "push-gaming-regal-knights": { maxWin: "4897.8x", volatility: "Низкая", releaseDate: "2025-05-28", releaseDateSource: "https://www.pushgaming.com/blog/push-gaming-embarks-chivalrous-quest-regal-knights.html", source: "https://www.pushgaming.com/games/regal-knights.html", verifiedAt: verifiedAtScore4 },
  "push-gaming-santas-vault": { maxWin: "8118x", volatility: "Низкая", source: "https://www.pushgaming.com/games/santas-vault.html", verifiedAt },
  "push-gaming-shamrock-saints": { field: "5×4 · 20 линий", maxWin: "10000x", volatility: "Средняя–высокая", releaseDate: "2024-03-05", fieldSource: "https://www.pushgaming.com/blog/push-gaming-explores-rarely-seen-side-leprechauns-shamrock-saints.html", releaseDateSource: "https://www.pushgaming.com/blog/push-gaming-explores-rarely-seen-side-leprechauns-shamrock-saints.html", source: "https://www.pushgaming.com/games/shamrock-saints.html", verifiedAt: verifiedAtScore4 },
  "push-gaming-the-grand-show": { maxWin: "10000x", volatility: "Средняя", releaseDate: "2024-07-17", releaseDateSource: "https://www.pushgaming.com/blog/push-gaming-packs-features-galore-big-top-grand-show.html", source: "https://www.pushgaming.com/games/grand-show.html", verifiedAt: verifiedAtScore4 },
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
