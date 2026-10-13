import { test, expect } from "@playwright/test";
import { getCatalogSeed } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
test.use({ baseURL: process.env.AUDIT_BASE_URL || "http://localhost:3000" });
test("catalog source records remain verified without outbound links", async ({ page }) => {
  for (const slug of ["push-gaming-razor-shark-jackpots","push-gaming-red-hot-multipliers","hacksaw-gaming-cloud-princess","wazdan-mayan-ritual"]) {
    expect(getCatalogSeed(slug)?.source).toMatch(/^https:\/\//);
    const details = getVerifiedCatalogDetails(slug);
    expect(details).toBeTruthy();
    await page.goto(`/slots/catalog/${slug}`);
    await expect(page.locator("#facts")).toContainText("RTP");
    await expect(page.locator("#facts a[href^='http']")).toHaveCount(0);
    await expect(page.locator("#facts")).not.toContainText("Базовый first-party источник");
  }
});
