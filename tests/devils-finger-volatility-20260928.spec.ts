import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";

test("Devil's Finger keeps Microgaming's current Very High volatility", () => {
  const slot = getSlot("devils-finger");

  expect(slot).toBeTruthy();
  expect(slot?.provider).toBe("Shady Lady");
  expect(slot?.rtp).toBe("96,40%");
  expect(slot?.volatility).toBe("Очень высокая");
  expect(slot?.source).toBe("https://microgaming.io/game/devils-finger/");
  expect(slot?.note).toContain("очень высокая волатильность");
});

test("Devil's Finger dossier renders Very High volatility with its current source", async ({ page }) => {
  await page.goto("/slots/devils-finger");

  await expect(page.locator(".slot-intro")).toContainText("Очень высокая");
  await expect(page.locator("#facts")).toContainText("microgaming.io");
});