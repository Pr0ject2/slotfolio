import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotMetrics } from "../src/lib/dossier";
import {
  getVerifiedSlotPassports,
  type VerifiedSlotPassport,
} from "../src/lib/slot-passport";

const passports = getVerifiedSlotPassports();

test("every verified passport belongs to a full dossier and has complete first-party provenance", () => {
  expect(passports.length).toBeGreaterThan(0);

  for (const [slug, passport] of passports) {
    expect(getSlot(slug), `${slug} must exist`).toBeTruthy();
    expect(
      getVerifiedSlotMetrics(slug),
      `${slug} must remain a full dossier, never catalog-only`,
    ).toBeTruthy();
    expect(passport.releaseDate, `${slug} release date`).toMatch(/^\d{1,2} .+ \d{4}$/);
    expect(passport.gameType, `${slug} game type`).toBeTruthy();
    expect(passport.source, `${slug} first-party URL`).toMatch(/^https:\/\//);
    expect(passport.sourceLabel, `${slug} source label`).toBeTruthy();
  }
});

for (const [slug, passport] of passports as Array<[string, VerifiedSlotPassport]>) {
  test(`${slug} renders the shared full-dossier passport template`, async ({ page }) => {
    await page.goto(`/slots/${slug}`);

    const facts = page.locator("#facts");
    await expect(facts).toContainText(passport.releaseDate);
    await expect(facts).toContainText(passport.gameType);
    await expect(
      facts.getByRole("link", { name: passport.sourceLabel }),
    ).toHaveCount(1);
  });
}
