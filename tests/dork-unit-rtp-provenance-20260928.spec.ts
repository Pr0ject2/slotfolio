import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotMetrics } from "../src/lib/dossier";

const releaseUrl = "https://www.hacksawgaming.com/news/new-game-release-july-summary";

test("Dork Unit keeps reference RTP separate from verified provider math", () => {
  const slot = getSlot("dork-unit");
  const metrics = getVerifiedSlotMetrics("dork-unit");

  expect(slot).toBeTruthy();
  expect(slot?.provider).toBe("Hacksaw Gaming");
  expect(slot?.rtp).toBe("96,28%");
  expect(slot?.volatility).toBe("Средняя");
  expect(slot?.source).toBe(releaseUrl);
  expect(slot?.note).toContain("Справочный RTP карточки составляет 96,28%");
  expect(slot?.note).toContain("RTP-конфигурации в этом релизе не опубликованы");
  expect(slot?.note).not.toContain("Верхняя опубликованная RTP-конфигурация");
  expect(slot?.note).not.toContain("более низкие операторские варианты");

  expect(metrics?.source).toBe(releaseUrl);
  expect(metrics?.maxWin).toBe("10 000x");
  expect(metrics?.rtpVariants).toBeUndefined();
  expect(metrics?.note).toContain("medium 3/5 volatility");
  expect(metrics?.note).toContain("RTP-конфигурации в этом релизе не опубликованы");
});

test("Dork Unit dossier renders reference RTP without presenting an RTP ladder as verified", async ({ page }) => {
  await page.goto("/slots/dork-unit");

  await expect(page.locator(".slot-intro")).toContainText("96,28%");
  await expect(page.locator(".slot-intro")).toContainText("Средняя");
  await expect(page.locator("#editor-view")).toContainText("Справочный RTP карточки составляет 96,28%");
  await expect(page.locator("#editor-view")).toContainText("RTP-конфигурации в этом релизе не опубликованы");
  await expect(page.locator("#math-profile")).toContainText("10 000x");
  await expect(page.locator("#math-profile")).toContainText("RTP-конфигурации в этом релизе не опубликованы");
  await expect(page.locator("#math-profile")).not.toContainText("Варианты RTP");
});