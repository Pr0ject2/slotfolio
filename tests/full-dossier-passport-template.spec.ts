import { expect, test } from "@playwright/test";
import { slots } from "../src/lib/data";
import { getVerifiedSlotPassport, getVerifiedSlotPassports } from "../src/lib/slot-passport";

const passports = getVerifiedSlotPassports();
const dossierSlugs = new Set(slots.map((slot) => slot.slug));

test("every verified passport belongs to a full dossier and has complete first-party provenance", () => {
  expect(passports.length).toBeGreaterThan(0);

  for (const [slug, passport] of passports) {
    expect(dossierSlugs.has(slug), `${slug} must remain a full dossier, never catalog-only`).toBe(true);
    expect(passport.releaseDate, `${slug} release date`).toMatch(/^\d{1,2} .+ \d{4}$/);
    expect(passport.gameType, `${slug} game type`).toBeTruthy();
    expect(passport.source, `${slug} first-party URL`).toMatch(/^https:\/\//);
    expect(passport.sourceLabel, `${slug} source label`).toBeTruthy();
  }
});

test("Gates of Olympus renders the shared full-dossier template", async ({ page }) => {
  const passport = getVerifiedSlotPassport("gates-of-olympus")!;

  await page.goto("/slots/gates-of-olympus");

  const summary = page.locator(".slot-summary .facts");
  await expect(summary).toContainText(passport.releaseDate);
  await expect(summary).toContainText(passport.gameType);
  await expect(
    page.locator("#facts").getByRole("link", { name: passport.sourceLabel }),
  ).toHaveCount(1);
});
