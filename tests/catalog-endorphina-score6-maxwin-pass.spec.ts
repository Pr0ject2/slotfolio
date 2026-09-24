import { test, expect } from "@playwright/test";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";

const officialMaxWins = {
  "endorphina-burning-coins-100": "200 000x",
  "endorphina-druids-fortune": "10 000x",
} as const;

const secondaryMaxWins = {
  "endorphina-chance-machine-90s": "2500x",
  "endorphina-fortune-bankers": "25000x",
  "endorphina-gift-of-midas": "6500x",
  "endorphina-groovin-tiger": "1000x",
  "endorphina-moofo": "1500x",
  "endorphina-zalatar": "6600x",
} as const;

test("Endorphina max-win coverage keeps canonical provider sources while allowing later evidence", () => {
  for (const [slug, maxWin] of Object.entries(officialMaxWins)) {
    const details = getVerifiedCatalogDetails(slug);
    expect(details?.maxWin, slug).toBe(maxWin);
    expect(details?.source, slug).toBe(`https://endorphina.com/games/${slug.replace("endorphina-", "")}/play`);
  }

  for (const [slug, maxWin] of Object.entries(secondaryMaxWins)) {
    const details = getVerifiedCatalogDetails(slug) as (ReturnType<typeof getVerifiedCatalogDetails> & { maxWinSource?: string });
    expect(details?.maxWin, slug).toBe(maxWin);
    expect(details?.source, slug).toContain("endorphina.com/games/");
    expect(details?.maxWinSource, slug).toBeTruthy();
  }
});
