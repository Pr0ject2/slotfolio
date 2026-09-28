import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotMetrics } from "../src/lib/dossier";

test("Power of Ten exposes the official 10 000x max win without inventing RTP variants", () => {
  const slot = getSlot("power-of-ten");
  const metrics = getVerifiedSlotMetrics("power-of-ten");

  expect(slot).toBeTruthy();
  expect(slot?.source).toBe("https://www.hacksawgaming.com/games/power-of-ten");
  expect(slot?.tags).toEqual(
    expect.arrayContaining(["Wild", "Свободные вращения", "Power Wheels", "FeatureSpins", "Мгновенные призы"]),
  );
  expect(metrics?.source).toBe("https://www.hacksawgaming.com/games/power-of-ten");
  expect(metrics?.maxWin).toBe("10 000x");
  expect(metrics?.rtpVariants).toBeUndefined();
});

test("Power of Ten dossier renders the verified max win and its first-party provenance", async ({ page }) => {
  await page.goto("/slots/power-of-ten");

  await expect(page.locator("#math-profile")).toContainText("10 000x");
  await expect(page.locator("#math-profile")).not.toContainText("Варианты RTP");
  await expect(page.locator("#facts")).toContainText("hacksawgaming.com");
});
