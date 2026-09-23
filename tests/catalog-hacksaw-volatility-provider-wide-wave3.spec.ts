import { expect, test } from "@playwright/test";
import { getCatalogVerifiedDetailsHacksawVolatilityProviderWide } from "../src/lib/catalog-verified-details-hacksaw-volatility-provider-wide";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";

const volatilitySource = "https://www.hacksawgaming.com/games";
const cases = [
  ["hacksaw-gaming-army-of-ares", "4/5"],
  ["hacksaw-gaming-bash-bros", "2/5"],
  ["hacksaw-gaming-booze-bash", "4/5"],
  ["hacksaw-gaming-chaos-crew-3", "5/5"],
  ["hacksaw-gaming-circle-of-life", "5/5"],
  ["hacksaw-gaming-deal-with-death", "4/5"],
  ["hacksaw-gaming-donny-dough", "3/5"],
  ["hacksaw-gaming-dorks-of-the-deep", "3/5"],
  ["hacksaw-gaming-duel-at-dawn", "4/5"],
  ["hacksaw-gaming-freds-food-truck", "3/5"],
  ["hacksaw-gaming-frkn-bananas", "4/5"],
  ["hacksaw-gaming-get-the-cheese", "3/5"],
  ["hacksaw-gaming-marlin-masters", "3/5"],
  ["hacksaw-gaming-octo-attack", "3/5"],
  ["hacksaw-gaming-pray-for-six", "4/5"],
  ["hacksaw-gaming-pray-for-three", "4/5"],
  ["hacksaw-gaming-rainbow-princess", "3/5"],
  ["hacksaw-gaming-sixsixsix", "5/5"],
  ["hacksaw-gaming-smoking-dragon", "2/5"],
  ["hacksaw-gaming-stormborn", "4/5"],
  ["hacksaw-gaming-strength-of-hercules", "3/5"],
  ["hacksaw-gaming-sun-princess", "3/5"],
  ["hacksaw-gaming-wings-of-horus", "4/5"],
] as const;

test("third Hacksaw provider-wide volatility wave preserves official meter values and provenance", () => {
  for (const [slug, volatility] of cases) {
    const direct = getCatalogVerifiedDetailsHacksawVolatilityProviderWide(slug);
    const merged = getVerifiedCatalogDetails(slug);

    expect(direct?.volatility, `${slug}: direct volatility`).toBe(volatility);
    expect(direct?.volatilitySource, `${slug}: provider-wide source`).toBe(volatilitySource);
    expect(direct?.verifiedAt, `${slug}: verification date`).toBe("2026-09-23");
    expect(merged?.volatility, `${slug}: merged volatility`).toBe(volatility);
  }
});

test("third Hacksaw volatility wave does not rewrite earlier verification dates", () => {
  expect(getCatalogVerifiedDetailsHacksawVolatilityProviderWide("hacksaw-gaming-aiko-and-the-wind-spirit")?.verifiedAt).toBe("2026-09-21");
});
