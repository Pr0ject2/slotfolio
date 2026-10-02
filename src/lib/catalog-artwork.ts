const artworkBySlug: Record<string, string> = {
  "3-oaks-gaming-15-dragon-pearls": "/images/catalog/3-oaks-gaming-15-dragon-pearls.webp",
  "3-oaks-gaming-3-african-drums": "/images/catalog/3-oaks-gaming-3-african-drums.webp",
  "3-oaks-gaming-3-aztec-temples": "/images/catalog/3-oaks-gaming-3-aztec-temples.webp",
  "3-oaks-gaming-3-china-pots": "/images/catalog/3-oaks-gaming-3-china-pots.webp",
  "3-oaks-gaming-3-clover-pots": "/images/catalog/3-oaks-gaming-3-clover-pots.webp",
};

export function getCatalogArtwork(slug: string) {
  return artworkBySlug[slug] ?? null;
}
