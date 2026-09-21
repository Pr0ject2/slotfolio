import { test, expect } from "@playwright/test";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";

const enriched = {
  "endorphina-burning-coins-100": "200 000x",
  "endorphina-druids-fortune": "10 000x",
} as const;

const evidenceLimited = [
  "endorphina-chance-machine-90s",
  "endorphina-fortune-bankers",
  "endorphina-gift-of-midas",
  "endorphina-groovin-tiger",
  "endorphina-moofo",
  "endorphina-zalatar",
] as const;

test("Endorphina score-six max-win pass keeps only directly advertised official maxima", () => {
  for (const [slug, maxWin] of Object.entries(enriched)) {
    const details = getVerifiedCatalogDetails(slug);
    expect(details?.maxWin, slug).toBe(maxWin);
    expect(details?.source, slug).toBe(`https://endorphina.com/games/${slug.replace("endorphina-", "")}/play`);
    expect(details?.verifiedAt, slug).toBe("2026-09-21");
  }

  for (const slug of evidenceLimited) {
    expect(getVerifiedCatalogDetails(slug)?.maxWin, slug).toBeUndefined();
  }
});
