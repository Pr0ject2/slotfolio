import type { CatalogVerifiedDetails } from "./catalog-verified-details";

type HacksawVolatilityDetails = Pick<CatalogVerifiedDetails, "source" | "verifiedAt" | "volatility"> & {
  volatilitySource: string;
};

const verifiedAt = "2026-09-21";
const volatilitySource = "https://www.hacksawgaming.com/games";

const details: Record<string, HacksawVolatilityDetails> = {
  "hacksaw-gaming-aiko-and-the-wind-spirit": { volatility: "3/5", volatilitySource, source: "https://www.hacksawgaming.com/games/aiko-and-the-wind-spirit", verifiedAt },
  "hacksaw-gaming-cloud-princess": { volatility: "3/5", volatilitySource, source: "https://www.hacksawgaming.com/games/cloud-princess", verifiedAt },
  "hacksaw-gaming-dandy-diamonds": { volatility: "3/5", volatilitySource, source: "https://www.hacksawgaming.com/games/dandy-diamonds", verifiedAt },
  "hacksaw-gaming-dark-spiral": { volatility: "4/5", volatilitySource, source: "https://www.hacksawgaming.com/games/dark-spiral", verifiedAt },
  "hacksaw-gaming-donny-and-danny": { volatility: "3/5", volatilitySource, source: "https://www.hacksawgaming.com/games/donny-and-danny", verifiedAt },
  "hacksaw-gaming-donut-division": { volatility: "3/5", volatilitySource, source: "https://www.hacksawgaming.com/games/donut-division", verifiedAt },
  "hacksaw-gaming-dragons-domain": { volatility: "4/5", volatilitySource, source: "https://www.hacksawgaming.com/games/dragons-domain", verifiedAt },
  "hacksaw-gaming-evil-eyes": { volatility: "4/5", volatilitySource, source: "https://www.hacksawgaming.com/games/evil-eyes", verifiedAt },
  "hacksaw-gaming-fire-my-laser": { volatility: "3/5", volatilitySource, source: "https://www.hacksawgaming.com/games/fire-my-laser", verifiedAt },
  "hacksaw-gaming-hot-ross": { volatility: "5/5", volatilitySource, source: "https://www.hacksawgaming.com/games/hot-ross", verifiedAt },
  "hacksaw-gaming-hounds-of-hell": { volatility: "4/5", volatilitySource, source: "https://www.hacksawgaming.com/games/hounds-of-hell", verifiedAt },
  "hacksaw-gaming-invictus": { volatility: "4/5", volatilitySource, source: "https://www.hacksawgaming.com/games/invictus", verifiedAt },
  "hacksaw-gaming-jaws-of-justice": { volatility: "4/5", volatilitySource, source: "https://www.hacksawgaming.com/games/jaws-of-justice", verifiedAt },
  "hacksaw-gaming-klowns": { volatility: "3/5", volatilitySource, source: "https://www.hacksawgaming.com/games/klowns", verifiedAt },
  "hacksaw-gaming-le-bunny": { volatility: "3/5", volatilitySource, source: "https://www.hacksawgaming.com/games/le-bunny", verifiedAt },
  "hacksaw-gaming-le-cowboy": { volatility: "3/5", volatilitySource, source: "https://www.hacksawgaming.com/games/le-cowboy", verifiedAt },
  "hacksaw-gaming-le-fisherman": { volatility: "3/5", volatilitySource, source: "https://www.hacksawgaming.com/games/le-fisherman", verifiedAt },
  "hacksaw-gaming-le-king": { volatility: "3/5", volatilitySource, source: "https://www.hacksawgaming.com/games/le-king", verifiedAt },
  "hacksaw-gaming-le-pharaoh": { volatility: "3/5", volatilitySource, source: "https://www.hacksawgaming.com/games/le-pharaoh", verifiedAt },
  "hacksaw-gaming-le-santa": { volatility: "3/5", volatilitySource, source: "https://www.hacksawgaming.com/games/le-santa", verifiedAt },
  "hacksaw-gaming-le-viking": { volatility: "3/5", volatilitySource, source: "https://www.hacksawgaming.com/games/le-viking", verifiedAt },
  "hacksaw-gaming-le-zeus": { volatility: "3/5", volatilitySource, source: "https://www.hacksawgaming.com/games/le-zeus", verifiedAt },
  "hacksaw-gaming-marlin-masters-atlantis": { volatility: "3/5", volatilitySource, source: "https://www.hacksawgaming.com/games/marlin-masters-atlantis", verifiedAt },
  "hacksaw-gaming-miami-mayhem": { volatility: "4/5", volatilitySource, source: "https://www.hacksawgaming.com/games/miami-mayhem", verifiedAt },
  "hacksaw-gaming-phoenix-duelreels": { volatility: "3/5", volatilitySource, source: "https://www.hacksawgaming.com/games/phoenix-duelreels", verifiedAt },
  "hacksaw-gaming-reign-of-rome": { volatility: "4/5", volatilitySource, source: "https://www.hacksawgaming.com/games/reign-of-rome", verifiedAt },
  "hacksaw-gaming-rise-of-fortuna": { volatility: "3/5", volatilitySource, source: "https://www.hacksawgaming.com/games/rise-of-fortuna", verifiedAt },
  "hacksaw-gaming-spear-of-athena": { volatility: "3/5", volatilitySource, source: "https://www.hacksawgaming.com/games/spear-of-athena", verifiedAt },
  "hacksaw-gaming-spinman": { volatility: "2/5", volatilitySource, source: "https://www.hacksawgaming.com/games/spinman", verifiedAt },
  "hacksaw-gaming-superstar-sevens": { volatility: "3/5", volatilitySource, source: "https://www.hacksawgaming.com/games/superstar-sevens", verifiedAt },
  "hacksaw-gaming-the-count": { volatility: "4/5", volatilitySource, source: "https://www.hacksawgaming.com/games/the-count", verifiedAt },
  "hacksaw-gaming-the-wildwood-curse": { volatility: "3/5", volatilitySource, source: "https://www.hacksawgaming.com/games/the-wildwood-curse", verifiedAt },
  "hacksaw-gaming-tiger-legends": { volatility: "3/5", volatilitySource, source: "https://www.hacksawgaming.com/games/tiger-legends", verifiedAt },
  "hacksaw-gaming-toshi-ways-club": { volatility: "4/5", volatilitySource, source: "https://www.hacksawgaming.com/games/toshi-ways-club", verifiedAt },
  "hacksaw-gaming-ultimate-slot-of-america": { volatility: "3/5", volatilitySource, source: "https://www.hacksawgaming.com/games/ultimate-slot-of-america", verifiedAt },
};

export function getCatalogVerifiedDetailsHacksawVolatilityProviderWide(slug: string) {
  return details[slug];
}
