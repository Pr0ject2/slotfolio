import { test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

test("temporary Play’n GO completeness audit", () => {
  const rows = catalogSeeds
    .filter((seed) => seed.provider === "Play’n GO")
    .map((seed) => {
      const details = getVerifiedCatalogDetails(seed.slug);
      const type = getVerifiedCatalogGameType(seed.slug);
      const research = getVerifiedCatalogResearch(seed.slug);
      const visible = {
        mechanics: research?.mechanics ?? [],
        gameType: type?.gameType ?? "",
        field: details?.field ?? "",
        rtp: details?.rtp ?? "",
        maxWin: details?.maxWin ?? "",
        volatility: details?.volatility ?? "",
        releaseDate: details?.releaseDate ?? "",
      };
      const count = [
        visible.mechanics.length ? "mechanics" : "",
        visible.gameType,
        visible.field,
        visible.rtp,
        visible.maxWin,
        visible.volatility,
        visible.releaseDate,
      ].filter(Boolean).length;
      return { slug: seed.slug, name: seed.name, count, ...visible };
    });

  const weak = rows.filter((row) => row.count < 4);
  console.log(`PLAYNGO_AUDIT total=${rows.length} weak_lt4=${weak.length}`);
  console.log(`PLAYNGO_AUDIT_ROWS=${JSON.stringify(weak)}`);
});
