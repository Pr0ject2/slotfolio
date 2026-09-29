import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotMetrics } from "../src/lib/dossier";
import { getVerifiedSlotPassport } from "../src/lib/slot-passport";

const gameSource = "https://www.pragmaticplay.com/en/games/the-dog-house/";
const releaseSource =
  "https://www.pragmaticplay.com/en/news/pragmatic-play-launches-the-dog-house/";

test("The Dog House keeps Pragmatic Play release passport and payout provenance", () => {
  const slot = getSlot("the-dog-house");
  const passport = getVerifiedSlotPassport("the-dog-house");
  const metrics = getVerifiedSlotMetrics("the-dog-house");

  expect(slot).toBeTruthy();
  expect(slot?.provider).toBe("Pragmatic Play");
  expect(slot?.year).toBe(2019);
  expect(slot?.field).toBe("5 × 3");
  expect(slot?.source).toBe(gameSource);
  expect(passport).toEqual({
    releaseDate: "9 мая 2019",
    gameType: "Video Slot",
    source: releaseSource,
    sourceLabel: "официальный релиз Pragmatic Play от 09.05.2019",
  });
  expect(metrics?.source).toBe(releaseSource);
  expect(metrics?.maxWin).toBe("6 750x");
  expect(metrics?.maxWinLabel).toBe("Заявленный потенциал");
});

test("The Dog House renders passport and the shared first-party source in both provenance roles", async ({ page }) => {
  await page.goto("/slots/the-dog-house");

  await expect(page.locator(".slot-summary .facts")).toContainText("Дата релиза");
  await expect(page.locator(".slot-summary .facts")).toContainText("9 мая 2019");
  await expect(page.locator(".slot-summary .facts")).toContainText("Тип игры");
  await expect(page.locator(".slot-summary .facts")).toContainText("Video Slot");
  await expect(page.locator(".slot-summary .facts")).toContainText("6 750x");

  const primaryProvenance = page.locator("#facts .source-note").first();
  await expect(primaryProvenance.locator(`a[href='${gameSource}']`)).toHaveCount(1);
  await expect(primaryProvenance.locator(`a[href='${releaseSource}']`)).toHaveCount(2);
  await expect(primaryProvenance).toContainText("Дата релиза и тип игры сверены по");
  await expect(primaryProvenance).toContainText("Дополнительные числовые параметры сверены по");
});
