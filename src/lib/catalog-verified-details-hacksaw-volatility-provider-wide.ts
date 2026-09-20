import type { CatalogVerifiedDetails } from "./catalog-verified-details";

type HacksawVolatilityDetails = Pick<CatalogVerifiedDetails, "source" | "verifiedAt" | "volatility"> & {
  volatilitySource: string;
};

const verifiedAt = "2026-09-21";
const volatilitySource = "https://www.hacksawgaming.com/games";

const details: Record<string, HacksawVolatilityDetails> = {
  "hacksaw-gaming-cloud-princess": { volatility: "3/5", volatilitySource, source: "https://www.hacksawgaming.com/games/cloud-princess", verifiedAt },
  "hacksaw-gaming-donny-and-danny": { volatility: "3/5", volatilitySource, source: "https://www.hacksawgaming.com/games/donny-and-danny", verifiedAt },
  "hacksaw-gaming-donut-division": { volatility: "3/5", volatilitySource, source: "https://www.hacksawgaming.com/games/donut-division", verifiedAt },
  "hacksaw-gaming-dragons-domain": { volatility: "4/5", volatilitySource, source: "https://www.hacksawgaming.com/games/dragons-domain", verifiedAt },
  "hacksaw-gaming-evil-eyes": { volatility: "4/5", volatilitySource, source: "https://www.hacksawgaming.com/games/evil-eyes", verifiedAt },
  "hacksaw-gaming-fire-my-laser": { volatility: "3/5", volatilitySource, source: "https://www.hacksawgaming.com/games/fire-my-laser", verifiedAt },
  "hacksaw-gaming-hounds-of-hell": { volatility: "4/5", volatilitySource, source: "https://www.hacksawgaming.com/games/hounds-of-hell", verifiedAt },
  "hacksaw-gaming-klowns": { volatility: "3/5", volatilitySource, source: "https://www.hacksawgaming.com/games/klowns", verifiedAt },
  "hacksaw-gaming-le-cowboy": { volatility: "3/5", volatilitySource, source: "https://www.hacksawgaming.com/games/le-cowboy", verifiedAt },
  "hacksaw-gaming-le-pharaoh": { volatility: "3/5", volatilitySource, source: "https://www.hacksawgaming.com/games/le-pharaoh", verifiedAt },
  "hacksaw-gaming-le-viking": { volatility: "3/5", volatilitySource, source: "https://www.hacksawgaming.com/games/le-viking", verifiedAt },
  "hacksaw-gaming-phoenix-duelreels": { volatility: "3/5", volatilitySource, source: "https://www.hacksawgaming.com/games/phoenix-duelreels", verifiedAt },
  "hacksaw-gaming-reign-of-rome": { volatility: "4/5", volatilitySource, source: "https://www.hacksawgaming.com/games/reign-of-rome", verifiedAt },
};

export function getCatalogVerifiedDetailsHacksawVolatilityProviderWide(slug: string) {
  return details[slug];
}
