// Expose a guide only after its complete copy and caveats are translated.
export const spanishDossierSlugs = [
  "gates-of-olympus", "sweet-bonanza", "book-of-dead", "reactoonz", "the-dog-house",
] as const;
const ready = new Set<string>(spanishDossierSlugs);
export function hasSpanishDossier(slug: string): boolean { return ready.has(slug); }
