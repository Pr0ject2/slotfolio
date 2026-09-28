import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotMetrics } from "../src/lib/dossier";

const relaxSource = "https://www.relax-gaming.com/products/casino/moneytrain2";

test("Money Train 2 preserves reference RTP while exposing the official German RTP caveat", () => {
  const slot = getSlot("money-train-2");
  const metrics = getVerifiedSlotMetrics("money-train-2");

  expect(slot).toBeTruthy();
  expect(slot?.provider).toBe("Relax Gaming");
  expect(slot?.field).toBe("5 × 4");
  expect(slot?.rtp).toBe("96,40%");
  expect(slot?.source).toBe(relaxSource);

  expect(metrics?.source).toBe(relaxSource);
  expect(metrics?.maxWin).toBe("50 000x");
  expect(metrics?.rtpVariants).toBeUndefined();
  expect(metrics?.note).toContain("German RTP 90%");
  expect(metrics?.note).toContain("96,40%");
  expect(metrics?.note).toContain("verified RTP-лестницу");
});

test("Money Train 2 dossier renders the German RTP caveat without inventing a verified ladder", async ({ page }) => {
  await page.goto("/slots/money-train-2");

  await expect(page.locator(".facts")).toContainText("96,40%");
  await expect(page.locator("#math-profile")).toContainText("50 000x");
  await expect(page.locator("#math-profile")).toContainText("German RTP 90%");
  await expect(page.locator("#math-profile")).toContainText("96,40%");
  await expect(page.locator("#math-profile")).not.toContainText("90,00%");
  await expect(page.locator("#math-profile")).not.toContainText("Варианты RTP");
});
