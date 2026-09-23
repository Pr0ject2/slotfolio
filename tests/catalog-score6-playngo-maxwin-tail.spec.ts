import { expect, test } from "@playwright/test";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getCatalogVerifiedDetailsPlayngoFill } from "../src/lib/catalog-verified-details-playngo-fill";

const cases = [
  ["playn-go-ace-of-spades", "2500 монет", "https://www.playngo.com/games/ace-of-spades"],
  ["playn-go-derby-wheel", "2800x", "https://www.playngo.com/games/derby-wheel"],
  ["playn-go-leprechauns-vault", "9000x", "https://www.playngo.com/games/leprechaun%27s-vault"],
] as const;

test("official Play'n GO score-six max-win facts remain integrated", () => {
  for (const [slug, maxWin, source] of cases) {
    const overlay = getCatalogVerifiedDetailsPlayngoFill(slug);
    const merged = getVerifiedCatalogDetails(slug);

    expect(overlay?.maxWin, `${slug}: overlay maxWin`).toBe(maxWin);
    expect(overlay?.maxWinSource, `${slug}: official maxWin source`).toBe(source);
    expect(overlay?.verifiedAt, `${slug}: verification date`).toBe("2026-09-23");
    expect(merged?.maxWin, `${slug}: merged maxWin`).toBe(maxWin);
  }
});
