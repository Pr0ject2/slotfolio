import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotMetrics } from "../src/lib/dossier";

test("Panda Claw Jackpot separates overall win potential from jackpot value", () => {
  const slot = getSlot("panda-claw-jackpot");
  const metrics = getVerifiedSlotMetrics("panda-claw-jackpot");

  expect(slot).toBeTruthy();
  expect(slot?.provider).toBe("Clawbuster");
  expect(slot?.rtp).toBe("95,00%");
  expect(slot?.volatility).toBe("Средняя");
  expect(metrics?.maxWin).toBe("5 000x");
  expect(metrics?.maxWinLabel).toBe("Заявленный максимум");
  expect(metrics?.rtpVariants).toBeUndefined();
  expect(metrics?.source).toBe("https://panda-claw-jackpot-iframe-dev.clawbuster.com/");
  expect(metrics?.note).toContain("Extreme Jackpot 2 500x");
  expect(metrics?.additionalSources).toEqual([
    {
      label: "основная карточка Clawbuster с Extreme Jackpot 2 500x",
      url: "https://clawbuster.com/games/panda-claw-jackpot.html",
    },
  ]);
});

test("Panda Claw Jackpot dossier renders the overall maximum without turning the jackpot into max win", async ({ page }) => {
  await page.goto("/slots/panda-claw-jackpot");

  await expect(page.locator("#math-profile")).toContainText("5 000x");
  await expect(page.locator("#math-profile")).toContainText("Заявленный максимум");
  await expect(page.locator("#math-profile")).toContainText("Extreme Jackpot 2 500x");
  await expect(page.locator("#facts")).toContainText("clawbuster.com");
});
