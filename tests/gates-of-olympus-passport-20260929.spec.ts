import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotPassport } from "../src/lib/slot-passport";

const gameSource = "https://www.pragmaticplay.com/en/games/gates-of-olympus/";
const passportSource =
  "https://www.pragmaticplay.com/en/news/pragmatic-play-aims-for-the-heavens-in-gates-of-olympus/";

test("Gates of Olympus keeps Pragmatic Play release passport", () => {
  const slot = getSlot("gates-of-olympus");
  const passport = getVerifiedSlotPassport("gates-of-olympus");

  expect(slot).toBeTruthy();
  expect(slot?.provider).toBe("Pragmatic Play");
  expect(slot?.year).toBe(2021);
  expect(slot?.field).toBe("6 × 5");
  expect(slot?.source).toBe(gameSource);
  expect(passport).toEqual({
    releaseDate: "24 февраля 2021",
    gameType: "Video Slot",
    source: passportSource,
    sourceLabel: "официальный релиз Pragmatic Play от 24.02.2021",
  });
});

test("Gates of Olympus renders verified release date, game type and separate passport provenance", async ({ page }) => {
  await page.goto("/slots/gates-of-olympus");

  await expect(page.locator(".slot-summary .facts")).toContainText("Дата релиза");
  await expect(page.locator(".slot-summary .facts")).toContainText("24 февраля 2021");
  await expect(page.locator(".slot-summary .facts")).toContainText("Тип игры");
  await expect(page.locator(".slot-summary .facts")).toContainText("Video Slot");
  await expect(page.locator(`#facts a[href='${gameSource}']`)).toHaveCount(1);
  await expect(page.locator(`#facts a[href='${passportSource}']`)).toHaveCount(1);
  await expect(page.locator("#facts")).toContainText("Дата релиза и тип игры сверены по");
  await expect(page.locator("#facts")).not.toContainText(
    "Дата релиза и тип игры сверены по той же официальной странице.",
  );
});
