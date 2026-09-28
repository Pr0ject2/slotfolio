import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotMetrics } from "../src/lib/dossier";

const sourceUrl = "https://www.hacksawgaming.com/games/max-win-machine";

test("Max Win Machine maps Hacksaw's 5/5 volatility to the top public category", () => {
  const slot = getSlot("max-win-machine");
  const metrics = getVerifiedSlotMetrics("max-win-machine");

  expect(slot).toBeTruthy();
  expect(slot?.provider).toBe("Hacksaw Gaming");
  expect(slot?.rtp).toBe("96,22%");
  expect(slot?.volatility).toBe("Экстремальная");
  expect(slot?.source).toBe(sourceUrl);
  expect(slot?.note).toContain("максимальном уровне 5/5");
  expect(slot?.tags).not.toContain("FeatureSpins");
  expect(slot?.tags).not.toContain("Множители");
  expect(slot?.tags).not.toContain("Мгновенные призы");

  expect(metrics?.source).toBe(sourceUrl);
  expect(metrics?.maxWin).toBe("10 000x");
  expect(metrics?.rtpVariants).toEqual(["96,22%", "94,28%", "92,20%"]);
});

test("Max Win Machine dossier renders extreme volatility without regressing verified math", async ({ page }) => {
  await page.goto("/slots/max-win-machine");

  await expect(page.locator(".slot-intro")).toContainText("Экстремальная");
  await expect(page.locator(".slot-intro")).toContainText("96,22%");
  await expect(page.locator("#editor-view")).toContainText("максимальном уровне 5/5");
  await expect(page.locator("#math-profile")).toContainText("10 000x");
  await expect(page.locator("#math-profile")).toContainText("96,22% · 94,28% · 92,20%");
  await expect(page.locator("#facts")).toContainText("hacksawgaming.com");
});