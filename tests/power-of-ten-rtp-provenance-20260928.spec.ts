import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotMetrics } from "../src/lib/dossier";

const sourceUrl = "https://www.hacksawgaming.com/games/power-of-ten";

test("Power of Ten keeps reference RTP separate from current verified provider math", () => {
  const slot = getSlot("power-of-ten");
  const metrics = getVerifiedSlotMetrics("power-of-ten");

  expect(slot).toBeTruthy();
  expect(slot?.provider).toBe("Hacksaw Gaming");
  expect(slot?.rtp).toBe("96,23%");
  expect(slot?.source).toBe(sourceUrl);
  expect(slot?.note).toContain("Справочный RTP карточки составляет 96,23%");
  expect(slot?.note).toContain("RTP-конфигурации на этой странице не опубликованы");
  expect(slot?.note).not.toContain("Верхняя опубликованная RTP-конфигурация");
  expect(slot?.note).not.toContain("существуют более низкие варианты");

  expect(metrics?.source).toBe(sourceUrl);
  expect(metrics?.maxWin).toBe("10 000x");
  expect(metrics?.rtpVariants).toBeUndefined();
  expect(metrics?.note).toContain("RTP-варианты не добавляются как verified-метрика");
});

test("Power of Ten dossier renders reference RTP without a verified RTP ladder", async ({ page }) => {
  await page.goto("/slots/power-of-ten");

  await expect(page.locator(".slot-intro")).toContainText("96,23%");
  await expect(page.locator("#editor-view")).toContainText("Справочный RTP карточки составляет 96,23%");
  await expect(page.locator("#editor-view")).toContainText("RTP-конфигурации на этой странице не опубликованы");
  await expect(page.locator("#math-profile")).toContainText("10 000x");
  await expect(page.locator("#math-profile")).toContainText("RTP-варианты не добавляются как verified-метрика");
  await expect(page.locator("#math-profile")).not.toContainText("Варианты RTP");
});