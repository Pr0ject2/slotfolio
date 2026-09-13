import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-13";
const research: Record<string, CatalogResearch> = {};

function add(slug: string, mechanics: string[], source: string, evidence: string) {
  research[slug] = { mechanics, source, verifiedAt, evidence };
}

add("push-gaming-3-liberty-eagles", ["Способы", "Сбор символов"], "https://www.pushgaming.com/games/3-liberty-eagles.html", "Official page states 4,096 ways, Collector Symbols collecting visible Instant Prizes, and Freedom Reels expanding to 46,656 ways.");
add("push-gaming-blaze-of-ra", ["Линии"], "https://www.pushgaming.com/games/blaze-ra.html", "Official page describes a 5x4 slot with 40 paylines.");
add("push-gaming-boss-bear", ["Сбор символов"], "https://www.pushgaming.com/games/boss-bear.html", "Official page describes Scatter Symbols filling a progression meter that converts low symbols.");
add("push-gaming-diamond-supernova-100", ["Линии"], "https://www.pushgaming.com/games/diamond-supernova-100.html", "Official page publishes 100 paylines.");
add("push-gaming-diamond-supernova-20", ["Линии"], "https://www.pushgaming.com/games/diamond-supernova-20.html", "Official page publishes 20 paylines.");
add("push-gaming-diamond-supernova-40", ["Линии"], "https://www.pushgaming.com/games/diamond-supernova-40.html", "Official page publishes 40 paylines.");
add("push-gaming-diamond-supernova-5", ["Линии"], "https://www.pushgaming.com/games/diamond-supernova-5.html", "Official page publishes five paylines.");
add("push-gaming-diamonds-4-the-win", ["Линии"], "https://www.pushgaming.com/games/diamonds-4-win.html", "Official catalogue describes a classic three-reel slot with five paylines.");
add("push-gaming-dino-p-d", ["Сбор символов"], "https://www.pushgaming.com/games/dino-pd.html", "Official page states Collector Symbols contribute to the Low Symbol meter and four collectors fill a level.");
add("push-gaming-dinopolis", ["Сбор символов"], "https://www.pushgaming.com/games/dinopolis.html", "Official page describes Dino Collector Coins filling a meter, with five coins advancing the level.");
add("push-gaming-fat-banker", ["Сбор символов"], "https://www.pushgaming.com/games/fat-banker.html", "Official page describes Fortune Link collection and Wild Money Bags collected into a progress meter.");
add("push-gaming-fire-pig-push-ways", ["Способы", "Сбор символов"], "https://www.pushgaming.com/games/fire-pig-push-ways.html", "Official page says Hot Zones increase winning ways and Fire Pig collects prizes while advancing a progression meter.");
add("push-gaming-generous-jack", ["Сбор символов"], "https://www.pushgaming.com/games/generous-jack.html", "Official page describes Jack Symbols contributing to a Free Spins meter while the layout expands.");
add("push-gaming-goat-getter", ["Сбор символов"], "https://www.pushgaming.com/games/goat-getter.html", "Official page says the Goat collects Coin Pot prizes and advances a progression meter.");
add("push-gaming-happy-bamboo", ["Сбор символов"], "https://www.pushgaming.com/games/happy-bamboo.html", "Official page explicitly includes Collector Symbols and describes Hold and Respin prize collection.");
add("push-gaming-hearts-highway", ["Сбор символов"], "https://www.pushgaming.com/games/hearts-highway.html", "Official page describes Golden Hearts collected into a progression meter.");
add("push-gaming-henry-the-ape", ["Сбор символов"], "https://www.pushgaming.com/games/henry-ape.html", "Official page describes Gold Disks filling a Bonus Meter and advancing feature progression.");
add("push-gaming-iron-phoenix", [], "https://www.pushgaming.com/games/iron-phoenix.html", "Official page explains adjacent-reel matching but publishes no fixed line or ways count suitable for the current taxonomy.");
add("push-gaming-jaguar-drop", ["Кластеры", "Каскады", "Сбор символов"], "https://www.pushgaming.com/games/jaguar-drop.html", "Official page describes Cluster Wins, new symbols cascading after wins, and Collector Symbols completing prize rows.");
add("push-gaming-jiggys-pot-o-gold", ["Линии", "Сбор символов"], "https://www.pushgaming.com/games/jiggys-pot-o-gold.html", "Official page describes a 3x3 game with five paylines and a Collector Symbol in the bonus feature.");
add("push-gaming-joker-troupe", ["Линии", "Сбор символов"], "https://www.pushgaming.com/games/joker-troupe.html", "Official page describes a 4x3 base game with 10 paylines and a Red Joker progression meter.");
add("push-gaming-mad-blast", ["Каскады"], "https://www.pushgaming.com/games/mad-blast.html", "Official page explicitly describes cascading wins and a multiplier increasing through winning cascades.");
add("push-gaming-mad-cars", ["Сбор символов"], "https://www.pushgaming.com/games/mad-cars.html", "Official page describes Instant Prize Car symbols being collected as they reach the feature track's top.");
add("push-gaming-masked-mayhem", ["Сбор символов"], "https://www.pushgaming.com/games/masked-mayhem.html", "Official page describes Bonus Symbols collected for progression and prize symbols collected in the Win Zone.");
add("push-gaming-mystery-mission-to-the-moon", [], "https://www.pushgaming.com/games/mystery-mission-moon.html", "Official page confirms Mystery/Nudge features but no base line, ways, cluster or cascade structure safe for the current taxonomy.");
add("push-gaming-mystery-of-the-nile", ["Линии", "Сбор символов"], "https://www.pushgaming.com/games/mystery-nile.html", "Official page states revealed wins pay across all 10 lines and Golden Pharaoh outcomes can reveal Collector Symbols.");
add("push-gaming-neon-cash-city", ["Кластеры", "Каскады", "Сбор символов"], "https://www.pushgaming.com/games/neon-cash-city.html", "Official page describes an 8x8 grid, clusters, cascades, and a Scatter progression meter.");
add("push-gaming-olympus-unleashed", ["Линии"], "https://www.pushgaming.com/games/olympus-unleashed.html", "Official page explicitly describes Wild multipliers applying to wins on the same win line.");
add("push-gaming-power-paws", ["Кластеры", "Сбор символов"], "https://www.pushgaming.com/games/power-paws.html", "Official page refers to winning clusters and Winning Symbols filling the Progression Meter.");
add("push-gaming-power-vault", ["Сбор символов"], "https://www.pushgaming.com/games/power-vault.html", "Official page describes the Vault Collector collecting visible prizes and coin values.");
add("push-gaming-rat-king", ["Сбор символов"], "https://www.pushgaming.com/games/rat-king.html", "Official page describes Collection Boxes collecting multipliers and Rat King symbols contributing to a Free Spins meter.");
add("push-gaming-razor-shark-jackpots", [], "https://www.pushgaming.com/games/razor-shark-jackpots.html", "Official page confirms token-driven jackpot and mystery features without a base structural value safe to map.");
add("push-gaming-razor-ways", ["Способы", "Каскады", "Сбор символов"], "https://www.pushgaming.com/games/razor-ways.html", "Official page states up to 46,656 ways, grid expansion after cascades, and a Multiplier Level meter.");
add("push-gaming-red-hot-multipliers", [], "https://www.pushgaming.com/games/red-hot-multipliers.html", "Official page confirms multiplier features without a direct base line, ways, cluster or cascade value.");
add("push-gaming-regal-knights", ["Сбор символов"], "https://www.pushgaming.com/games/regal-knights.html", "Official page states Scatter Symbols are collected on a Low Symbols meter during Free Spins.");
add("push-gaming-retro-sweets", ["Кластеры", "Сбор символов"], "https://www.pushgaming.com/games/retro-sweets.html", "Official page requires groups of five or more for Cluster Links and describes the Sweet Collector; Push Gaming confirms the 6x9 matrix.");
add("push-gaming-retroverse", ["Кластеры"], "https://www.pushgaming.com/games/retroverse.html", "Official page explicitly describes Cluster Wins and Push Gaming confirms the 6x9 Retro-series grid.");
add("push-gaming-samurais-katana", ["Линии", "Сбор символов"], "https://www.pushgaming.com/games/samurais-katana.html", "Official Push Gaming release states a 5x4 layout with 20 win lines; the game page describes a Multiplier Level meter.");
add("push-gaming-santa-hopper", ["Кластеры", "Каскады", "Сбор символов"], "https://www.pushgaming.com/games/santa-hopper.html", "Official page pays clusters, explicitly describes cascades, and states Santa collects all Chimney Symbols in view.");
add("push-gaming-santas-vault", ["Сбор символов"], "https://www.pushgaming.com/games/santas-vault.html", "Official page describes Vault Collector prize collection and coins accumulating in the vault before the bonus feature.");

export function getCatalogResearchPushWave1(slug: string) {
  return research[slug];
}
