import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const expected = {
  "hacksaw-gaming-beam-boys": { volatility: "Низкая / Экстремальная" },
  "hacksaw-gaming-danny-dollar": { volatility: "Средняя–высокая" },
  "hacksaw-gaming-densho": { rtp: "96,40% / 94,38% / 92,33% / 88,34%", volatility: "4/5" },
  "hacksaw-gaming-dropem": { rtp: "96,21% / 94,19% / 92,26% / 88,10%", volatility: "4/5" },
  "hacksaw-gaming-immortal-desire": { rtp: "96,24% / 94,12% / 92,27% / 88,25%", volatility: "4/5" },
  "hacksaw-gaming-jelly-slice": { volatility: "3/5" },
  "hacksaw-gaming-keepem": { volatility: "3/5" },
  "hacksaw-gaming-marlin-masters-og": { rtp: "96,25% / 94,23% / 92,27%", volatility: "3/5", releaseDate: "2026-07-28" },
  "hacksaw-gaming-mayan-stackways": { volatility: "Средняя–высокая" },
  "hacksaw-gaming-mighty-masks": { rtp: "96,30% / 94,20% / 92,26% / 88,38%", volatility: "4/5" },
  "hacksaw-gaming-slayers-inc": { volatility: "5/5" },
  "hacksaw-gaming-steamrunners": { volatility: "Средняя" },
  "hacksaw-gaming-temple-of-torment": { rtp: "96,20% / 94,09% / 92,19% / 88,24%", volatility: "3/5" },
  "hacksaw-gaming-twisted-lab": { volatility: "4/5" },
  "hacksaw-gaming-xmas-drop": { rtp: "96,22% / 94,27% / 92,32% / 88,02%", volatility: "3/5" },
} as const;

function scoreFor(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const detailFacts = details
    ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length
    : 0;
  return detailFacts + (type ? 1 : 0) + (research?.mechanics.length ?? 0);
}

test("Hacksaw score-four pass preserves exact official technical facts", () => {
  for (const [slug, values] of Object.entries(expected)) {
    const seed = catalogSeeds.find((item) => item.slug === slug);
    const details = getVerifiedCatalogDetails(slug);
    expect(seed, slug).toBeTruthy();
    expect(details, slug).toBeTruthy();
    expect(details?.source, slug).toBe(seed?.source);
    expect(Date.parse(details?.verifiedAt ?? ""), `${slug} keeps or advances its verification date`).toBeGreaterThanOrEqual(
      Date.parse("2026-09-18"),
    );
    if ("rtp" in values) expect(details?.rtp, slug).toBe(values.rtp);
    if ("volatility" in values) expect(details?.volatility, slug).toBe(values.volatility);
    if ("releaseDate" in values) expect(details?.releaseDate, slug).toBe(values.releaseDate);
    expect(details?.maxWin, `${slug} keeps previously verified max win`).toBeTruthy();
    expect(scoreFor(slug), slug).toBeGreaterThan(4);
  }
});
