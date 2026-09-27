import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotMetrics } from "../src/lib/dossier";

test("Nitro Nights keeps the current Hacksaw math profile", () => {
  const slot = getSlot("nitro-nights");
  const metrics = getVerifiedSlotMetrics("nitro-nights");

  expect(slot).toBeTruthy();
  expect(slot?.source).toBe("https://www.hacksawgaming.com/games/nitro-nights");
  expect(slot?.rtp).toBe("96,31%");
  expect(slot?.volatility).toBe("Высокая");
  expect(metrics?.source).toBe("https://www.hacksawgaming.com/games/nitro-nights");
  expect(metrics?.maxWin).toBe("15 000x");
  expect(metrics?.rtpVariants).toEqual(["96,31%", "94,34%", "92,22%", "86,26%"]);
});

test("Nitro Nights dossier renders the verified max win and RTP variants", async ({ page }) => {
  await page.goto("/slots/nitro-nights");

  await expect(page.locator("#math-profile")).toContainText("15 000x");
  await expect(page.locator("#math-profile")).toContainText("96,31% · 94,34% · 92,22% · 86,26%");
  await expect(page.locator("#facts")).toContainText("hacksawgaming.com");
});
