import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotMetrics } from "../src/lib/dossier";

test("Wolf Hunt keeps Clawbuster's published max-win profile", () => {
  const slot = getSlot("wolf-hunt-claw-and-win");
  const metrics = getVerifiedSlotMetrics("wolf-hunt-claw-and-win");

  expect(slot).toBeTruthy();
  expect(slot?.provider).toBe("Clawbuster");
  expect(slot?.rtp).toBe("95,00%");
  expect(slot?.volatility).toBe("Низкая");
  expect(metrics?.source).toBe("https://clawbuster.com/games/wolf-hunt-claw-and-win.html");
  expect(metrics?.maxWin).toBe("6 992x");
  expect(metrics?.maxWinLabel).toBe("Максимальная выплата");
  expect(metrics?.rtpVariants).toEqual(["95,00%"]);
});

test("Claw Bonanza Gold Rush keeps the explicit 10 000x max win", () => {
  const slot = getSlot("claw-bonanza-gold-rush");
  const metrics = getVerifiedSlotMetrics("claw-bonanza-gold-rush");

  expect(slot).toBeTruthy();
  expect(slot?.provider).toBe("Clawbuster");
  expect(slot?.rtp).toBe("95,00%");
  expect(slot?.volatility).toBe("Высокая");
  expect(metrics?.source).toBe("https://clawbuster.com/games/claw-bonanza-gold-rush.html");
  expect(metrics?.maxWin).toBe("10 000x");
  expect(metrics?.maxWinLabel).toBe("Максимальная выплата");
  expect(metrics?.rtpVariants).toEqual(["95,00%"]);
});

test("ClawBass Free Rush keeps 6 000x potential and Clawbuster's Very High volatility", () => {
  const slot = getSlot("clawbass-bonanza-free-rush");
  const metrics = getVerifiedSlotMetrics("clawbass-bonanza-free-rush");

  expect(slot).toBeTruthy();
  expect(slot?.provider).toBe("Clawbuster");
  expect(slot?.rtp).toBe("94,97%");
  expect(slot?.volatility).toBe("Очень высокая");
  expect(metrics?.source).toBe("https://clawbuster.com/games/clawbass-bonanza-free-rush.html");
  expect(metrics?.maxWin).toBe("6 000x");
  expect(metrics?.maxWinLabel).toBe("Заявленный потенциал");
  expect(metrics?.rtpVariants).toEqual(["94,97%"]);
  expect(metrics?.note).toContain("Very High");
  expect(metrics?.note).toContain("не как отдельно заявленный fixed cap");
});

test("Clawbuster math overlays render on their public dossiers with first-party provenance", async ({ page }) => {
  await page.goto("/slots/wolf-hunt-claw-and-win");
  await expect(page.locator("#math-profile")).toContainText("6 992x");
  await expect(page.locator("#facts")).toContainText("clawbuster.com");

  await page.goto("/slots/claw-bonanza-gold-rush");
  await expect(page.locator("#math-profile")).toContainText("10 000x");
  await expect(page.locator("#facts")).toContainText("clawbuster.com");

  await page.goto("/slots/clawbass-bonanza-free-rush");
  await expect(page.locator("#math-profile")).toContainText("6 000x");
  await expect(page.locator("#math-profile")).toContainText("Заявленный потенциал");
  await expect(page.locator(".facts")).toContainText("Очень высокая");
  await expect(page.locator("#facts")).toContainText("clawbuster.com");
});
