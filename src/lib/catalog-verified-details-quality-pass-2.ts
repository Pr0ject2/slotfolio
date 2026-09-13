import type { CatalogVerifiedDetails } from "./catalog-verified-details";

const verifiedAt = "2026-09-13";

const details: Record<string, CatalogVerifiedDetails> = {
  "push-gaming-iron-phoenix": { maxWin: "12242.10x", volatility: "Низкая–средняя", source: "https://www.pushgaming.com/games/iron-phoenix.html", verifiedAt },
  "push-gaming-mystery-mission-to-the-moon": { field: "6×4 · 20 линий", maxWin: "10000x", volatility: "Высокая", source: "https://www.pushgaming.com/games/mystery-mission-moon.html", verifiedAt },
  "push-gaming-razor-shark-jackpots": { maxWin: "11007.70x", volatility: "Средняя", source: "https://www.pushgaming.com/games/razor-shark-jackpots.html", verifiedAt },
  "push-gaming-red-hot-multipliers": { maxWin: "2500x", volatility: "Низкая", source: "https://www.pushgaming.com/games/red-hot-multipliers.html", verifiedAt },
  "3-oaks-gaming-hit-the-gold": { field: "5×3 · 25 линий", source: "https://3oaks.com/game/hit_the_gold", verifiedAt },
  "3-oaks-gaming-hot-fire-fruits": { field: "3×3 · 5 линий", source: "https://3oaks.com/game/hot_fire_fruits", verifiedAt },
  "hacksaw-gaming-beam-boys": { field: "6×4", source: "https://www.hacksawgaming.com/games/beam-boys", verifiedAt },
  "hacksaw-gaming-bullets-and-bounty": { field: "5×5", source: "https://www.hacksawgaming.com/games/Bullets-and-bounty", verifiedAt },
  "hacksaw-gaming-danny-dollar": { field: "5×5", source: "https://www.hacksawgaming.com/games/danny-dollar", verifiedAt },
  "hacksaw-gaming-dawn-of-kings": { field: "5×3", source: "https://www.hacksawgaming.com/games/dawn-of-kings", verifiedAt },
  "hacksaw-gaming-densho": { field: "10 линий", source: "https://www.hacksawgaming.com/games/densho", verifiedAt },
  "hacksaw-gaming-divine-drop": { field: "5×4 · 14 линий", source: "https://www.hacksawgaming.com/games/divine-drop", verifiedAt },
  "hacksaw-gaming-donny-dough": { field: "14 линий", source: "https://www.hacksawgaming.com/games/donny-dough", verifiedAt },
  "hacksaw-gaming-dropem": { field: "7776 способов", source: "https://www.hacksawgaming.com/games/drop-em", verifiedAt },
  "hacksaw-gaming-evil-eyes": { field: "5×5", source: "https://www.hacksawgaming.com/games/evil-eyes", verifiedAt },
  "hacksaw-gaming-feel-the-beat": { field: "5×5", source: "https://www.hacksawgaming.com/games/feel-the-beat", verifiedAt },
  "hacksaw-gaming-fighter-pit": { field: "5×4", source: "https://www.hacksawgaming.com/games/fighter-pit", verifiedAt },
  "hacksaw-gaming-fist-of-destruction": { field: "5×4", source: "https://www.hacksawgaming.com/games/fist-of-destruction", verifiedAt },
  "hacksaw-gaming-immortal-desire": { field: "1024 способа", source: "https://www.hacksawgaming.com/games/immortal-desire", verifiedAt },
  "hacksaw-gaming-jelly-slice": { field: "до 1204 способов", source: "https://www.hacksawgaming.com/games/jelly-slice", verifiedAt },
  "hacksaw-gaming-keepem": { field: "6×5 · 15 625 способов", source: "https://www.hacksawgaming.com/games/keep-em", verifiedAt },
  "hacksaw-gaming-klowns": { field: "6×5", source: "https://www.hacksawgaming.com/games/klowns", verifiedAt },
  "hacksaw-gaming-rise-of-ymir": { field: "5×4", source: "https://www.hacksawgaming.com/games/rise-of-ymir", verifiedAt },
  "hacksaw-gaming-rusty-and-curly": { field: "5×4", source: "https://www.hacksawgaming.com/games/rusty-and-curly", verifiedAt },
  "hacksaw-gaming-slayers-inc": { field: "5×4 · 14 линий", source: "https://www.hacksawgaming.com/games/slayers-inc", verifiedAt },
  "hacksaw-gaming-snow-slingers": { field: "5×4", source: "https://www.hacksawgaming.com/games/snow-slingers", verifiedAt },
  "hacksaw-gaming-steamrunners": { field: "5×4", source: "https://www.hacksawgaming.com/games/steamrunners", verifiedAt },
  "hacksaw-gaming-tai-the-toad": { field: "5×5", source: "https://www.hacksawgaming.com/games/tai-the-toad", verifiedAt },
  "hacksaw-gaming-temple-of-torment": { field: "14 линий", source: "https://www.hacksawgaming.com/games/temple-of-torment", verifiedAt },
  "hacksaw-gaming-twisted-lab": { field: "5×5 · 19 линий", source: "https://www.hacksawgaming.com/games/twisted-lab", verifiedAt },
  "hacksaw-gaming-wishbringer": { field: "6×4", source: "https://www.hacksawgaming.com/games/wishbringer", verifiedAt },
  "hacksaw-gaming-xmas-drop": { field: "19 линий", source: "https://www.hacksawgaming.com/games/xmas-drop", verifiedAt },
  "hacksaw-gaming-marlin-masters-og": { field: "5×3", source: "https://www.hacksawgaming.com/games/marlin-masters-og", verifiedAt },
  "hacksaw-gaming-marlin-masters-the-big-haul": { field: "5×4", source: "https://www.hacksawgaming.com/games/marlin-masters-the-big-haul", verifiedAt },
  "hacksaw-gaming-mayan-stackways": { field: "5×4 · до 100 000 способов", source: "https://www.hacksawgaming.com/games/mayan-stackways", verifiedAt },
  "hacksaw-gaming-mighty-masks": { field: "20 линий", source: "https://www.hacksawgaming.com/games/mighty-masks", verifiedAt },
};

export function getCatalogVerifiedDetailsQualityPass2(slug: string) {
  return details[slug];
}
