import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getCatalogVerifiedDetailsHacksawVolatilityProviderWide } from "../src/lib/catalog-verified-details-hacksaw-volatility-provider-wide";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";

const volatilitySource = "https://www.hacksawgaming.com/games";
const cases = [
  ["hacksaw-gaming-2-wild-2-die", "5/5"],
  ["hacksaw-gaming-bouncy-bombs", "3/5"],
  ["hacksaw-gaming-bullets-and-bounty", "2/5"],
  ["hacksaw-gaming-cash-crew", "4/5"],
  ["hacksaw-gaming-cursed-crypt", "4/5"],
  ["hacksaw-gaming-dawn-of-kings", "3/5"],
  ["hacksaw-gaming-dusk-princess", "3/5"],
  ["hacksaw-gaming-dynasty-of-death", "4/5"],
  ["hacksaw-gaming-epic-bullets-and-bounty", "5/5"],
  ["hacksaw-gaming-eternal-duel", "4/5"],
  ["hacksaw-gaming-eye-of-medusa", "3/5"],
  ["hacksaw-gaming-feel-the-beat", "4/5"],
  ["hacksaw-gaming-fighter-pit", "4/5"],
  ["hacksaw-gaming-fist-of-destruction", "4/5"],
  ["hacksaw-gaming-le-digger", "3/5"],
  ["hacksaw-gaming-marlin-masters-the-big-haul", "3/5"],
  ["hacksaw-gaming-munchy-milo", "3/5"],
  ["hacksaw-gaming-rise-of-ymir", "4/5"],
  ["hacksaw-gaming-rusty-and-curly", "3/5"],
  ["hacksaw-gaming-shaolin-master", "3/5"],
  ["hacksaw-gaming-snow-slingers", "3/5"],
  ["hacksaw-gaming-tai-the-toad", "3/5"],
  ["hacksaw-gaming-the-luxe", "2/5"],
  ["hacksaw-gaming-wishbringer", "3/5"],
  ["hacksaw-gaming-ze-zeus", "3/5"],
  ["hacksaw-gaming-zeus-ze-zecond", "3/5"],
] as const;

test("fourth Hacksaw provider-wide volatility wave closes the exact residual", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  expect(cases).toHaveLength(26);

  for (const [slug, volatility] of cases) {
    const seed = selected.get(slug);
    const direct = getCatalogVerifiedDetailsHacksawVolatilityProviderWide(slug);
    const merged = getVerifiedCatalogDetails(slug);

    expect(seed, `${slug}: selected catalog seed`).toBeTruthy();
    expect(seed?.provider, `${slug}: provider`).toBe("Hacksaw Gaming");
    expect(direct?.volatility, `${slug}: direct volatility`).toBe(volatility);
    expect(direct?.volatilitySource, `${slug}: provider-wide source`).toBe(volatilitySource);
    expect(direct?.verifiedAt, `${slug}: verification date`).toBe("2026-09-23");
    expect(direct?.source, `${slug}: canonical game source`).toBe(seed?.source);
    expect(merged?.volatility, `${slug}: merged volatility`).toBe(volatility);
  }
});

test("fourth Hacksaw volatility wave leaves older provenance dates intact", () => {
  expect(getCatalogVerifiedDetailsHacksawVolatilityProviderWide("hacksaw-gaming-aiko-and-the-wind-spirit")?.verifiedAt).toBe("2026-09-21");
  expect(getCatalogVerifiedDetailsHacksawVolatilityProviderWide("hacksaw-gaming-bash-bros")?.verifiedAt).toBe("2026-09-23");
});

test("no selected Hacksaw catalog record remains without provider-wide volatility", () => {
  const residual = catalogSeeds
    .filter((seed) => seed.provider === "Hacksaw Gaming")
    .filter((seed) => !getVerifiedCatalogDetails(seed.slug)?.volatility)
    .map((seed) => seed.slug);

  expect(residual).toEqual([]);
});
