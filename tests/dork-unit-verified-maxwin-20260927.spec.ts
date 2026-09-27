import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotMetrics } from "../src/lib/dossier";

test("Dork Unit keeps the official release max win and volatility", () => {
  const slot = getSlot("dork-unit");
  const metrics = getVerifiedSlotMetrics("dork-unit");

  expect(slot).toBeTruthy();
  expect(slot?.source).toBe("https://www.hacksawgaming.com/news/new-game-release-july-summary");
  expect(slot?.volatility).toBe("Средняя");
  expect(slot?.field).toBe("5 × 4");
  expect(metrics?.source).toBe("https://www.hacksawgaming.com/news/new-game-release-july-summary");
  expect(metrics?.maxWin).toBe("10 000x");
  expect(metrics?.rtpVariants).toBeUndefined();
});

test("Dork Unit dossier renders the verified max win without unsupported RTP variants", async ({ page }) => {
  await page.goto("/slots/dork-unit");

  await expect(page.locator("#math-profile")).toContainText("10 000x");
  await expect(
    page.locator("#math-profile .dossier-metric-grid > div").filter({ hasText: "RTP-конфигурации" }),
  ).toHaveCount(0);
  await expect(page.locator("#math-profile")).toContainText("Средняя");
  await expect(page.locator("#facts")).toContainText("hacksawgaming.com");
});
