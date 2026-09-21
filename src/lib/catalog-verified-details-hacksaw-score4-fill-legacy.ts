import type { CatalogVerifiedDetails } from "./catalog-verified-details";

type HacksawScore4Values = Partial<Pick<CatalogVerifiedDetails, "field" | "rtp" | "volatility" | "releaseDate">>;

const verifiedAt = "2026-09-18";

const values: Record<string, HacksawScore4Values> = {
  "hacksaw-gaming-beam-boys": { volatility: "Низкая / Экстремальная" },
  "hacksaw-gaming-benny-the-beer": {
    rtp: "96,17% / 94,17% / 92,28% / 88,26%",
  },
  "hacksaw-gaming-danny-dollar": { volatility: "Средняя–высокая" },
  "hacksaw-gaming-densho": {
    rtp: "96,40% / 94,38% / 92,33% / 88,34%",
    volatility: "4/5",
  },
  "hacksaw-gaming-dropem": {
    rtp: "96,21% / 94,19% / 92,26% / 88,10%",
    volatility: "4/5",
  },
  "hacksaw-gaming-eye-of-the-panda": {
    field: "5×5 · 27 линий",
    rtp: "96,26% / 94,21% / 92,25% / 88,31%",
    volatility: "3/5",
  },
  "hacksaw-gaming-immortal-desire": {
    rtp: "96,24% / 94,12% / 92,27% / 88,25%",
    volatility: "4/5",
  },
  "hacksaw-gaming-jelly-slice": {
    field: "5×4 · до 1204 способов",
    volatility: "3/5",
  },
  "hacksaw-gaming-keepem": { volatility: "3/5" },
  "hacksaw-gaming-le-prechaun": {
    rtp: "97,52% / 96,28% / 94,29% / 92,28% / 86,31%",
    volatility: "3/5",
  },
  "hacksaw-gaming-magic-piggy-og": {
    rtp: "96,20% / 94,18%",
    volatility: "3/5",
  },
  "hacksaw-gaming-marlin-masters-og": {
    rtp: "96,25% / 94,23% / 92,27%",
    volatility: "3/5",
    releaseDate: "2026-07-28",
  },
  "hacksaw-gaming-mayan-stackways": { volatility: "Средняя–высокая" },
  "hacksaw-gaming-mighty-masks": {
    rtp: "96,30% / 94,20% / 92,26% / 88,38%",
    volatility: "4/5",
  },
  "hacksaw-gaming-slayers-inc": { volatility: "5/5" },
  "hacksaw-gaming-steamrunners": { volatility: "Средняя" },
  "hacksaw-gaming-temple-of-torment": {
    rtp: "96,20% / 94,09% / 92,19% / 88,24%",
    volatility: "3/5",
  },
  "hacksaw-gaming-twisted-lab": { volatility: "4/5" },
  "hacksaw-gaming-xmas-drop": {
    rtp: "96,22% / 94,27% / 92,32% / 88,02%",
    volatility: "3/5",
  },
};

export function getCatalogVerifiedDetailsHacksawScore4Fill(slug: string) {
  const value = values[slug];
  return value ? { ...value, verifiedAt } : undefined;
}
