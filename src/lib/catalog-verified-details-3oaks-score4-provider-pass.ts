import type { CatalogVerifiedDetails } from "./catalog-verified-details";

const verifiedAt = "2026-09-18";

const records: Record<string, CatalogVerifiedDetails> = {
  "3-oaks-gaming-4-african-drums": {
    maxWin: "20000x",
    volatility: "Высокая",
    source: "https://3oaks.com/news/new-release-4-african-drums",
    verifiedAt,
  },
  "3-oaks-gaming-egypt-power-x1000": {
    maxWin: "40000x",
    volatility: "Высокая",
    source: "https://3oaks.com/news/new-release-egypt-power-x1000",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetails3OaksScore4ProviderPass(slug: string) {
  return records[slug];
}
