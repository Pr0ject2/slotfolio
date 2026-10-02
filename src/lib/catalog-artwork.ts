const artworkBySlug: Record<string, string> = {
  "3-oaks-gaming-15-dragon-pearls": "/images/catalog/3-oaks-gaming-15-dragon-pearls.webp",
  "3-oaks-gaming-3-african-drums": "/images/catalog/3-oaks-gaming-3-african-drums.webp",
  "3-oaks-gaming-3-aztec-temples": "/images/catalog/3-oaks-gaming-3-aztec-temples.webp",
  "3-oaks-gaming-3-china-pots": "/images/catalog/3-oaks-gaming-3-china-pots.webp",
  "3-oaks-gaming-3-clover-pots": "/images/catalog/3-oaks-gaming-3-clover-pots.webp",
  "3-oaks-gaming-3-clover-pots-extra": "/images/catalog/3-oaks-gaming-3-clover-pots-extra.webp",
  "3-oaks-gaming-3-coin-volcanoes": "/images/catalog/3-oaks-gaming-3-coin-volcanoes.webp",
  "3-oaks-gaming-3-coins": "/images/catalog/3-oaks-gaming-3-coins.webp",
  "3-oaks-gaming-3-egypt-chests": "/images/catalog/3-oaks-gaming-3-egypt-chests.webp",
  "3-oaks-gaming-3-hot-chillies": "/images/catalog/3-oaks-gaming-3-hot-chillies.webp",
  "3-oaks-gaming-3-hot-teapots": "/images/catalog/3-oaks-gaming-3-hot-teapots.webp",
  "3-oaks-gaming-3-jewel-crowns": "/images/catalog/3-oaks-gaming-3-jewel-crowns.webp",
  "3-oaks-gaming-3-lucky-sparks": "/images/catalog/3-oaks-gaming-3-lucky-sparks.webp",
  "3-oaks-gaming-3-olymp-fortunes": "/images/catalog/3-oaks-gaming-3-olymp-fortunes.webp",
  "3-oaks-gaming-3-pots-of-egypt": "/images/catalog/3-oaks-gaming-3-pots-of-egypt.webp",
  "3-oaks-gaming-3-super-coin-volcanoes": "/images/catalog/3-oaks-gaming-3-super-coin-volcanoes.webp",
  "3-oaks-gaming-3-super-hot-chillies": "/images/catalog/3-oaks-gaming-3-super-hot-chillies.webp",
  "3-oaks-gaming-3-super-hot-teapots": "/images/catalog/3-oaks-gaming-3-super-hot-teapots.webp",
  "3-oaks-gaming-4-african-drums": "/images/catalog/3-oaks-gaming-4-african-drums.webp",
  "3-oaks-gaming-4-clover-pots": "/images/catalog/3-oaks-gaming-4-clover-pots.webp",
  "3-oaks-gaming-4-fairy-flowers": "/images/catalog/3-oaks-gaming-4-fairy-flowers.webp",
  "3-oaks-gaming-4-fortune-clovers": "/images/catalog/3-oaks-gaming-4-fortune-clovers.webp",
  "3-oaks-gaming-4-pots-of-egypt": "/images/catalog/3-oaks-gaming-4-pots-of-egypt.webp",
  "3-oaks-gaming-4-wolf-drums": "/images/catalog/3-oaks-gaming-4-wolf-drums.webp",
  "3-oaks-gaming-777-coins": "/images/catalog/3-oaks-gaming-777-coins.webp",
};

export function getCatalogArtwork(slug: string) {
  return artworkBySlug[slug] ?? null;
}
