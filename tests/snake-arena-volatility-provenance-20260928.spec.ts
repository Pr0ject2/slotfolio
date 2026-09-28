import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotMetrics } from "../src/lib/dossier";

const releaseUrl =
  "https://www.relax-gaming.com/news/2020/01/relax-gaming-launches-actionpacked-new-slot-snake-arena-across-network";

test("Snake Arena preserves Relax Gaming's conflicting volatility wording", () => {
  const slot = getSlot("snake-arena");
  const metrics = getVerifiedSlotMetrics("snake-arena");

  expect(slot).toBeTruthy();
  expect(slot?.provider).toBe("Relax Gaming");
  expect(slot?.rtp).toBe("96,25%");
  expect(slot?.volatility).toBe("Экстремальная");
  expect(slot?.source).toBe(releaseUrl);
  expect(slot?.note).toContain("maximum volatility");
  expect(slot?.note).toContain("high volatility");

  expect(metrics?.source).toBe("https://www.relax-gaming.com/products/casino/snakearena");
  expect(metrics?.maxWin).toBe("2 758,8x");
  expect(metrics?.rtpVariants).toEqual(["96,25%", "90,00%"]);
});

test("Snake Arena dossier exposes the wording conflict and current math source", async ({ page }) => {
  await page.goto("/slots/snake-arena");

  await expect(page.locator(".slot-intro")).toContainText("Экстремальная");
  await expect(page.locator("#editor-view")).toContainText("maximum volatility");
  await expect(page.locator("#editor-view")).toContainText("high volatility");
  await expect(page.locator("#math-profile")).toContainText("2 758,8x");
  await expect(page.locator("#facts")).toContainText("Дополнительные числовые параметры");
  await expect(page.locator("#facts")).toContainText("текущая официальная страница Relax Gaming");
});