import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotMetrics } from "../src/lib/dossier";

const playersHubUrl = "https://hub.bgaming.com/players-hub/games/gemhalla";

test("Gemhalla keeps a coarse public volatility while preserving BGaming wording", () => {
  const slot = getSlot("gemhalla");
  const verified = getVerifiedSlotMetrics("gemhalla");

  expect(slot).toBeTruthy();
  expect(slot?.source).toBe("https://bgaming.com/games/gemhalla");
  expect(slot?.rtp).toBe("97,17%");
  expect(slot?.volatility).toBe("Высокая");

  expect(verified?.source).toBe(slot?.source);
  expect(verified?.sourceLabel).toBe("текущая официальная страница BGaming");
  expect(verified?.maxWin).toBe("5 000x");
  expect(verified?.rtpVariants).toBeUndefined();
  expect(verified?.note).toContain("Very-high");
  expect(verified?.note).toContain("High");
  expect(verified?.additionalSources).toEqual([
    {
      label: "BGaming Players Hub с формулировкой Volatility: High",
      url: playersHubUrl,
    },
  ]);
});

test("Gemhalla dossier exposes the verified max win and source wording conflict", async ({ page }) => {
  await page.goto("/slots/gemhalla");

  await expect(page.locator("#math-profile")).toContainText("5 000x");
  await expect(page.locator(".facts")).toContainText("Высокая");
  await expect(page.locator("#math-profile .metric-caveat")).toContainText("Very-high");
  await expect(page.locator("#math-profile .metric-caveat")).toContainText("Players Hub");
  await expect(page.locator("#facts")).toContainText("BGaming Players Hub с формулировкой Volatility: High");
});
