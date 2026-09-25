import type { CatalogVerifiedGameType } from "./catalog-verified-game-type";

const verifiedAt = "2026-09-25";
const source = "https://www.pushgaming.com/games/";

const gameTypes: Record<string, CatalogVerifiedGameType> = Object.fromEntries(
  [
    "push-gaming-bamboo-ways",
    "push-gaming-big-bam-book",
    "push-gaming-big-bamboo",
    "push-gaming-dinopolis",
    "push-gaming-dj-cat",
    "push-gaming-fire-pig-push-ways",
    "push-gaming-iron-phoenix",
    "push-gaming-jaguar-drop",
    "push-gaming-mystery-of-the-nile",
    "push-gaming-neon-cash-city",
    "push-gaming-power-paws",
    "push-gaming-razor-ways",
    "push-gaming-santas-vault",
    "push-gaming-sea-of-spirits",
    "push-gaming-tiki-tumble",
    "push-gaming-tricky-treats",
    "push-gaming-triple-rampage",
    "push-gaming-vegas-vault",
    "push-gaming-viva-lock-vegas",
  ].map((slug) => [slug, { gameType: "Slots", source, verifiedAt }]),
) as Record<string, CatalogVerifiedGameType>;

export function getVerifiedCatalogGameTypePushCloseout(slug: string) {
  return gameTypes[slug];
}
