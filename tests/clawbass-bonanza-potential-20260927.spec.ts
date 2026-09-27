import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotMetrics } from "../src/lib/dossier";

test("ClawBass Bonanza keeps provider-stated potential and Very High volatility", () => {
  const slot = getSlot("clawbass-bonanza");
  const metrics = getVerifiedSlotMetrics("clawbass-bonanza");

  expect(slot).toBeTruthy();
  expect(slot?.provider).toBe("Clawbuster");
  expect(slot?.rtp).toBe("95,00%");
  expect(slot?.volatility).toBe("Очень высокая");
  expect(metrics?.source).toBe("https://clawbuster.com/games/clawbass-bonanza.html");
  expect(metrics?.maxWin).toBe("6 000x");
  expect(metrics?.maxWinLabel).toBe("Заявленный потенциал");
  expect(metrics?.rtpVariants).toEqual(["95,00%"]);
  expect(metrics?.note).toContain("Very High");
  expect(metrics?.note).toContain("не как отдельно объявленный fixed max-win cap");
});

test("ClawBass Bonanza dossier renders current volatility with first-party provenance", async ({ page }) => {
  await page.goto("/slots/clawbass-bonanza");

  await expect(page.locator("#math-profile")).toContainText("6 000x");
  await expect(page.locator("#math-profile")).toContainText("Заявленный потенциал");
  await expect(page.locator(".facts")).toContainText("Очень высокая");
  await expect(page.locator("#facts")).toContainText("clawbuster.com");
});
