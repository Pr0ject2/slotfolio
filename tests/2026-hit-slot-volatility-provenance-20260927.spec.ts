import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotMetrics } from "../src/lib/dossier";

const releaseUrl =
  "https://endorphina.com/news/endorphinas-2026-hit-slot-show-is-here-and-youve-got-a-backstage-pass";

test("2026 Hit Slot follows current Endorphina volatility while preserving the launch conflict", () => {
  const slot = getSlot("2026-hit-slot");
  const verified = getVerifiedSlotMetrics("2026-hit-slot");

  expect(slot).toBeTruthy();
  expect(slot?.volatility).toBe("Высокая");
  expect(slot?.rtp).toBe("96,05%");
  expect(slot?.source).toBe("https://endorphina.com/games/2026-hit-slot");

  expect(verified?.source).toBe(slot?.source);
  expect(verified?.sourceLabel).toBe("текущая официальная карточка Endorphina");
  expect(verified?.note).toContain("Volatility: High");
  expect(verified?.note).toContain("Ultra-High volatility");
  expect(verified?.additionalSources).toEqual([
    {
      label: "релиз Endorphina от 03.03.2026 с формулировкой Ultra-High volatility",
      url: releaseUrl,
    },
  ]);
});

test("2026 Hit Slot dossier exposes the official volatility conflict without changing the current rating", async ({ page }) => {
  await page.goto("/slots/2026-hit-slot");

  await expect(page.locator(".facts")).toContainText("Волатильность");
  await expect(page.locator(".facts")).toContainText("Высокая");
  await expect(page.locator("#math-profile .metric-caveat")).toContainText("Volatility: High");
  await expect(page.locator("#math-profile .metric-caveat")).toContainText("Ultra-High volatility");
  await expect(page.locator("#facts")).toContainText(
    "релиз Endorphina от 03.03.2026 с формулировкой Ultra-High volatility",
  );
});
