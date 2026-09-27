import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotMetrics } from "../src/lib/dossier";

test("Max Win Machine keeps only features stated on the current Hacksaw page", () => {
  const slot = getSlot("max-win-machine");

  expect(slot).toBeTruthy();
  expect(slot?.source).toBe("https://www.hacksawgaming.com/games/max-win-machine");
  expect(slot?.tags).not.toContain("FeatureSpins");
  expect(slot?.tags).not.toContain("Множители");
  expect(slot?.tags).not.toContain("Мгновенные призы");
  expect(slot?.feature).toContain("Lucky Seven");
  expect(slot?.feature).toContain("10 000x");
});

test("Max Win Machine exposes official max win and RTP configurations", () => {
  const metrics = getVerifiedSlotMetrics("max-win-machine");

  expect(metrics?.source).toBe("https://www.hacksawgaming.com/games/max-win-machine");
  expect(metrics?.maxWin).toBe("10 000x");
  expect(metrics?.rtpVariants).toEqual(["96,22%", "94,28%", "92,20%"]);
});

test("Max Win Machine dossier renders the corrected evidence-backed profile", async ({ page }) => {
  await page.goto("/slots/max-win-machine");

  await expect(page.locator(".facts")).not.toContainText("FeatureSpins");
  await expect(page.locator(".facts")).not.toContainText("Мгновенные призы");
  await expect(page.locator("#mechanic")).toContainText("Lucky Seven");
  await expect(page.locator("#math-profile")).toContainText("10 000x");
  await expect(page.locator("#math-profile")).toContainText("96,22% · 94,28% · 92,20%");
});
