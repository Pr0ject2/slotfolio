/**
 * Slotfolio-drawn editorial covers. These are explicitly non-official
 * illustrations. Never replace the source-backed slot.image metadata or
 * the checked-in/provider-localized reference artwork.
 */
export const editorialArtworkBySlug: Readonly<Record<string, string>> = {
  "1win-bonanza": "/images/editorial/1win-bonanza.svg",
  "gates-of-1win": "/images/editorial/gates-of-1win.svg",
  "house-of-sins": "/images/editorial/house-of-sins.svg",
  "gates-of-olympus": "/images/editorial/gates-of-olympus.svg",
  "gates-of-olympus-1000": "/images/editorial/gates-of-olympus-1000.svg",
  "big-bass-bonanza": "/images/editorial/big-bass-bonanza.svg",
  "the-dog-house": "/images/editorial/the-dog-house.svg",
  "sugar-rush": "/images/editorial/sugar-rush.svg",
  "fruit-party": "/images/editorial/fruit-party.svg",
  "fury-of-anubis": "/images/editorial/fury-of-anubis.svg",
  "sweet-bonanza": "/images/editorial/sweet-bonanza.svg",
  "mahjong-wins-super-scatter": "/images/editorial/mahjong-wins-super-scatter.svg",
  "gates-of-olympus-super-scatter": "/images/editorial/gates-of-olympus-super-scatter.svg",
  "sugar-rush-1000": "/images/editorial/sugar-rush-1000.svg",
  "starlight-princess": "/images/editorial/starlight-princess.svg",
  "the-big-dog-house": "/images/editorial/the-big-dog-house.svg",
  "hot-and-spicy-jackpot": "/images/editorial/hot-and-spicy-jackpot.svg",
  "legacy-of-dead": "/images/editorial/legacy-of-dead.svg",
  "hand-of-anubis": "/images/editorial/hand-of-anubis.svg",
  "rise-of-olympus": "/images/editorial/rise-of-olympus.svg",
};

export function getEditorialArtwork(slug: string): string | undefined {
  return editorialArtworkBySlug[slug];
}
