const editorialPlaceholders = new Set(["gates-of-1win", "1win-bonanza", "house-of-sins"]);
// These SVGs contain "Обложка пока не проверена" instead of game imagery.
export function hasReviewedGameArtwork(src?: string | null) {
  if (!src) return false;
  const pathname = src.split(/[?#]/, 1)[0];
  if (pathname.endsWith("/images/unavailable.svg")) return false;
  for (const slug of editorialPlaceholders) {
    if (pathname.endsWith("/images/slots/" + slug + ".svg")) return false;
  }
  return true;
}
