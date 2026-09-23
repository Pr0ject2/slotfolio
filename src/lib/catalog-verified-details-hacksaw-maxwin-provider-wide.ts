import type { CatalogVerifiedDetails } from "./catalog-verified-details";
import { getCatalogVerifiedDetailsHacksawVolatilityProviderWide } from "./catalog-verified-details-hacksaw-volatility-provider-wide";

type HacksawMaxWinDetails = CatalogVerifiedDetails & {
  maxWinSource?: string;
  volatilitySource?: string;
};

const verifiedAt = "2026-09-17";
const newVerifiedAt = "2026-09-23";

const details: Record<string, HacksawMaxWinDetails> = {
  "hacksaw-gaming-beam-boys": { maxWin: "12 500x", source: "https://www.hacksawgaming.com/games/beam-boys", verifiedAt },
  "hacksaw-gaming-bouncy-bombs": { maxWin: "10 000x", source: "https://www.hacksawgaming.com/games/bouncy-bombs", verifiedAt },
  "hacksaw-gaming-danny-dollar": { maxWin: "12 500x", source: "https://www.hacksawgaming.com/games/danny-dollar", verifiedAt },
  "hacksaw-gaming-dawn-of-kings": { maxWin: "10 000x", source: "https://www.hacksawgaming.com/games/dawn-of-kings", verifiedAt },
  "hacksaw-gaming-death-becomes-you": { maxWin: "15 000x", source: "https://www.hacksawgaming.com/games/death-becomes-you", verifiedAt },
  "hacksaw-gaming-densho": { maxWin: "10 000x", source: "https://www.hacksawgaming.com/games/densho", verifiedAt },
  "hacksaw-gaming-dragons-domain": { maxWin: "10 000x", source: "https://www.hacksawgaming.com/games/dragons-domain", verifiedAt },
  "hacksaw-gaming-dropem": { maxWin: "10 000x", source: "https://www.hacksawgaming.com/games/drop-em", verifiedAt },
  "hacksaw-gaming-dusk-princess": { maxWin: "10 000x", source: "https://www.hacksawgaming.com/games/dusk-princess", verifiedAt },
  "hacksaw-gaming-evil-eyes": { maxWin: "12 500x", source: "https://www.hacksawgaming.com/games/evil-eyes", verifiedAt },
  "hacksaw-gaming-eye-of-medusa": { maxWin: "10 000x", source: "https://www.hacksawgaming.com/games/eye-of-medusa", verifiedAt },
  "hacksaw-gaming-eye-of-the-panda": { maxWin: "10 000x", source: "https://www.hacksawgaming.com/games/eye-of-the-panda", verifiedAt },
  "hacksaw-gaming-feel-the-beat": { maxWin: "10 000x", source: "https://www.hacksawgaming.com/games/feel-the-beat", verifiedAt },
  "hacksaw-gaming-fist-of-destruction": { maxWin: "10 000x", source: "https://www.hacksawgaming.com/games/fist-of-destruction", verifiedAt },
  "hacksaw-gaming-immortal-desire": { maxWin: "10 000x", source: "https://www.hacksawgaming.com/games/immortal-desire", verifiedAt },
  "hacksaw-gaming-jelly-slice": { maxWin: "10 000x", source: "https://www.hacksawgaming.com/games/jelly-slice", verifiedAt },
  "hacksaw-gaming-keepem": { maxWin: "10 000x", source: "https://www.hacksawgaming.com/games/keep-em", verifiedAt },
  "hacksaw-gaming-klowns": { maxWin: "10 000x", source: "https://www.hacksawgaming.com/games/klowns", verifiedAt },
  "hacksaw-gaming-le-football-fan": { maxWin: "2 500x", source: "https://www.hacksawgaming.com/games/le-football-fan", verifiedAt },
  "hacksaw-gaming-le-pharaoh": { maxWin: "15 000x", maxWinSource: "https://static-stg.hacksawgaming.com/1562/1.42.1/gameinfoassets/templates/en-us/en-us-gameinfo.html", source: "https://www.hacksawgaming.com/games/le-pharaoh", verifiedAt: newVerifiedAt },
  "hacksaw-gaming-le-prechaun": { maxWin: "15 000x", source: "https://www.hacksawgaming.com/games/le-prechaun", verifiedAt },
  "hacksaw-gaming-magic-piggy-og": { maxWin: "2 500x", source: "https://www.hacksawgaming.com/games/magic-piggy-og", verifiedAt },
  "hacksaw-gaming-marlin-masters-og": { maxWin: "7 500x", source: "https://www.hacksawgaming.com/games/marlin-masters-og", verifiedAt },
  "hacksaw-gaming-marlin-masters-the-big-haul": { maxWin: "10 000x", source: "https://www.hacksawgaming.com/games/marlin-masters-the-big-haul", verifiedAt },
  "hacksaw-gaming-mayan-stackways": { maxWin: "10 000x", source: "https://www.hacksawgaming.com/games/mayan-stackways", verifiedAt },
  "hacksaw-gaming-mighty-masks": { maxWin: "10 000x", source: "https://www.hacksawgaming.com/games/mighty-masks", verifiedAt },
  "hacksaw-gaming-rise-of-ymir": { maxWin: "15 000x", source: "https://www.hacksawgaming.com/games/rise-of-ymir", verifiedAt },
  "hacksaw-gaming-rusty-and-curly": { maxWin: "10 000x", source: "https://www.hacksawgaming.com/games/rusty-and-curly", verifiedAt },
  "hacksaw-gaming-slayers-inc": { maxWin: "15 000x", source: "https://www.hacksawgaming.com/games/slayers-inc", verifiedAt },
  "hacksaw-gaming-snow-slingers": { maxWin: "10 000x", source: "https://www.hacksawgaming.com/games/snow-slingers", verifiedAt },
  "hacksaw-gaming-steamrunners": { maxWin: "10 000x", source: "https://www.hacksawgaming.com/games/steamrunners", verifiedAt },
  "hacksaw-gaming-tai-the-toad": { maxWin: "7 500x", source: "https://www.hacksawgaming.com/games/tai-the-toad", verifiedAt },
  "hacksaw-gaming-temple-of-torment": { maxWin: "10 000x", source: "https://www.hacksawgaming.com/games/temple-of-torment", verifiedAt },
  "hacksaw-gaming-the-luxe": { maxWin: "20 000x", source: "https://www.hacksawgaming.com/games/the-luxe", verifiedAt },
  "hacksaw-gaming-tiger-legends": { maxWin: "10 000x", source: "https://www.hacksawgaming.com/games/tiger-legends", verifiedAt },
  "hacksaw-gaming-twisted-lab": { maxWin: "15 000x", source: "https://www.hacksawgaming.com/games/twisted-lab", verifiedAt },
  "hacksaw-gaming-wishbringer": { maxWin: "10 000x", source: "https://www.hacksawgaming.com/games/wishbringer", verifiedAt },
  "hacksaw-gaming-xmas-drop": { maxWin: "12 500x", source: "https://www.hacksawgaming.com/games/xmas-drop", verifiedAt },
  "hacksaw-gaming-ze-zeus": { maxWin: "10 000x", source: "https://www.hacksawgaming.com/games/ze-zeus", verifiedAt },
};

export function getCatalogVerifiedDetailsHacksawMaxWinProviderWide(slug: string): HacksawMaxWinDetails | undefined {
  const maxWin = details[slug];
  const volatility = getCatalogVerifiedDetailsHacksawVolatilityProviderWide(slug);

  if (!volatility) return maxWin;
  if (!maxWin) return volatility;
  return { ...maxWin, ...volatility };
}
