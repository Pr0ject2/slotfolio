import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotMetrics } from "../src/lib/dossier";

const releaseUrl = "https://bgaming.com/news/bgaming-introduces-a-wave-of-fresh-june-game-releases";
const playersHubUrl = "https://hub.bgaming.com/players-hub/games/gemhalla";

test("Gemhalla uses current BGaming Very-high volatility and preserves conflicting High", () => {
  const slot = getSlot("gemhalla");
  const verified = getVerifiedSlotMetrics("gemhalla");

  expect(slot).toBeTruthy();
  expect(slot?.source).toBe("https://bgaming.com/games/gemhalla");
  expect(slot?.rtp).toBe("97,17%");
  expect(slot?.volatility).toBe("Очень высокая");

  expect(verified?.source).toBe(slot?.source);
  expect(verified?.sourceLabel).toBe("текущая официальная страница BGaming");
  expect(verified?.maxWin).toBe("5 000x");
  expect(verified?.rtpVariants).toBeUndefined();
  expect(verified?.note).toContain("Very-high");
  expect(verified?.note).toContain("Очень высокая");
  expect(verified?.note).toContain("High");
  expect(verified?.additionalSources).toEqual([
    {
      label: "официальный обзор BGaming с формулировкой very high volatility",
      url: releaseUrl,
    },
    {
      label: "BGaming Players Hub с конфликтующей формулировкой Volatility: High",
      url: playersHubUrl,
    },
  ]);
});

test("Gemhalla dossier renders current volatility and the first-party wording conflict", async ({ page }) => {
  await page.goto("/slots/gemhalla");

  await expect(page.locator("#math-profile")).toContainText("5 000x");
  await expect(page.locator(".facts")).toContainText("Очень высокая");
  await expect(page.locator("#math-profile .metric-caveat")).toContainText("Very-high");
  await expect(page.locator("#math-profile .metric-caveat")).toContainText("Players Hub");
  await expect(page.locator("#facts")).toContainText("официальный обзор BGaming с формулировкой very high volatility");
  await expect(page.locator("#facts")).toContainText("BGaming Players Hub с конфликтующей формулировкой Volatility: High");
});
