// Expose a guide only after its complete copy and caveats are translated.
export const spanishDossierSlugs = [
  "gates-of-olympus", "sweet-bonanza", "book-of-dead", "reactoonz", "the-dog-house",
  "big-bass-bonanza", "jammin-jars", "razor-shark", "wanted-dead-or-a-wild", "le-bandit",
  "san-quentin-xways", "fire-in-the-hole", "starlight-princess", "sugar-rush", "fruit-party",
  "legacy-of-dead", "fire-joker", "rise-of-olympus", "fat-rabbit", "retro-tapes",
  "chaos-crew", "chaos-crew-2", "deadwood", "mental", "starburst",
  "gonzos-quest", "dead-or-alive-2", "money-train-2", "snake-arena", "book-of-99",
  "gates-of-olympus-1000", "sugar-rush-1000", "gates-of-olympus-super-scatter", "sweet-bonanza-super-scatter", "mahjong-wins-super-scatter",
  "hand-of-anubis", "rip-city", "hell-hot-100", "joker-stoker", "lucky-streak-1",
] as const;
const ready = new Set<string>(spanishDossierSlugs);
export function hasSpanishDossier(slug: string): boolean { return ready.has(slug); }
