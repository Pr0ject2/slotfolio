import type { CatalogVerifiedGameType } from "./catalog-verified-game-type";

const verifiedAt = "2026-09-16";

const gameTypes: Record<string, CatalogVerifiedGameType> = {
  "hacksaw-gaming-beam-boys": { gameType: "Slots", source: "https://www.hacksawgaming.com/games/beam-boys", verifiedAt },
  "hacksaw-gaming-bullets-and-bounty": { gameType: "Slots", source: "https://www.hacksawgaming.com/games/Bullets-and-bounty", verifiedAt },
  "hacksaw-gaming-danny-dollar": { gameType: "Slots", source: "https://www.hacksawgaming.com/games/danny-dollar", verifiedAt },
  "hacksaw-gaming-dawn-of-kings": { gameType: "Slots", source: "https://www.hacksawgaming.com/games/dawn-of-kings", verifiedAt },
  "hacksaw-gaming-densho": { gameType: "Slots", source: "https://www.hacksawgaming.com/games/densho", verifiedAt },
  "hacksaw-gaming-divine-drop": { gameType: "Slots", source: "https://www.hacksawgaming.com/games/divine-drop", verifiedAt },
  "hacksaw-gaming-donny-dough": { gameType: "Slots", source: "https://www.hacksawgaming.com/games/donny-dough", verifiedAt },
  "hacksaw-gaming-dropem": { gameType: "Slots", source: "https://www.hacksawgaming.com/games/drop-em", verifiedAt },
  "hacksaw-gaming-dusk-princess": { gameType: "Slots", source: "https://www.hacksawgaming.com/games/dusk-princess", verifiedAt },
  "hacksaw-gaming-evil-eyes": { gameType: "Slots", source: "https://www.hacksawgaming.com/games/evil-eyes", verifiedAt },
  "hacksaw-gaming-eye-of-medusa": { gameType: "Slots", source: "https://www.hacksawgaming.com/games/eye-of-medusa", verifiedAt },
  "hacksaw-gaming-eye-of-the-panda": { gameType: "Slots", source: "https://www.hacksawgaming.com/games/eye-of-the-panda", verifiedAt },
  "hacksaw-gaming-feel-the-beat": { gameType: "Slots", source: "https://www.hacksawgaming.com/games/feel-the-beat", verifiedAt },
  "hacksaw-gaming-fighter-pit": { gameType: "Slots", source: "https://www.hacksawgaming.com/games/fighter-pit", verifiedAt },
  "hacksaw-gaming-fist-of-destruction": { gameType: "Slots", source: "https://www.hacksawgaming.com/games/fist-of-destruction", verifiedAt },
  "hacksaw-gaming-immortal-desire": { gameType: "Slots", source: "https://www.hacksawgaming.com/games/immortal-desire", verifiedAt },
  "hacksaw-gaming-jelly-slice": { gameType: "Slots", source: "https://www.hacksawgaming.com/games/jelly-slice", verifiedAt },
  "hacksaw-gaming-keepem": { gameType: "Slots", source: "https://www.hacksawgaming.com/games/keep-em", verifiedAt },
  "hacksaw-gaming-klowns": { gameType: "Slots", source: "https://www.hacksawgaming.com/games/klowns", verifiedAt },
  "hacksaw-gaming-le-cowboy": { gameType: "Slots", source: "https://www.hacksawgaming.com/games/le-cowboy", verifiedAt },
  "hacksaw-gaming-rainbow-princess": { gameType: "Slots", source: "https://www.hacksawgaming.com/games/rainbow-princess", verifiedAt },
  "hacksaw-gaming-rise-of-ymir": { gameType: "Slots", source: "https://www.hacksawgaming.com/games/rise-of-ymir", verifiedAt },
  "hacksaw-gaming-rusty-and-curly": { gameType: "Slots", source: "https://www.hacksawgaming.com/games/rusty-and-curly", verifiedAt },
  "hacksaw-gaming-shaolin-master": { gameType: "Slots", source: "https://www.hacksawgaming.com/games/shaolin-master", verifiedAt },
  "hacksaw-gaming-slayers-inc": { gameType: "Slots", source: "https://www.hacksawgaming.com/games/slayers-inc", verifiedAt },
  "hacksaw-gaming-snow-slingers": { gameType: "Slots", source: "https://www.hacksawgaming.com/games/snow-slingers", verifiedAt },
  "hacksaw-gaming-steamrunners": { gameType: "Slots", source: "https://www.hacksawgaming.com/games/steamrunners", verifiedAt },
  "hacksaw-gaming-tai-the-toad": { gameType: "Slots", source: "https://www.hacksawgaming.com/games/tai-the-toad", verifiedAt },
  "hacksaw-gaming-temple-of-torment": { gameType: "Slots", source: "https://www.hacksawgaming.com/games/temple-of-torment", verifiedAt },
  "hacksaw-gaming-twisted-lab": { gameType: "Slots", source: "https://www.hacksawgaming.com/games/twisted-lab", verifiedAt },
  "hacksaw-gaming-wishbringer": { gameType: "Slots", source: "https://www.hacksawgaming.com/games/wishbringer", verifiedAt },
  "hacksaw-gaming-xmas-drop": { gameType: "Slots", source: "https://www.hacksawgaming.com/games/xmas-drop", verifiedAt },
  "hacksaw-gaming-ze-zeus": { gameType: "Slots", source: "https://www.hacksawgaming.com/games/ze-zeus", verifiedAt },
};

export function getVerifiedCatalogGameTypeHacksawProviderWide2(slug: string) {
  return gameTypes[slug];
}
