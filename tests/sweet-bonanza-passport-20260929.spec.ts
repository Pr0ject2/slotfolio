import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotPassport } from "../src/lib/slot-passport";

const gameSource = "https://www.pragmaticplay.com/en/games/sweet-bonanza/";
const passportSource =
  "https://www.pragmaticplay.com/en/news/pragmatic-play-launches-sweet-bonanza/";

test("Sweet Bonanza keeps Pragmatic Play release passport", () => {
  const slot = getSlot("sweet-bonanza");
  const passport = getVerifiedSlotPassport("sweet-bonanza");

  expect(slot).toBeTruthy();
  expect(slot?.provider).toBe("Pragmatic Play");
  expect(slot?.year).toBe(2019);
  expect(slot?.field).toBe("6 × 5");
  expect(slot?.source).toBe(gameSource);
  expect(passport).toEqual({
    releaseDate: "25 июня 2019",
    gameType: "Video Slot",
    source: passportSource,
    sourceLabel: "официальный релиз Pragmatic Play от 25.06.2019",
  });
});

test("Sweet Bonanza renders verified release date, game type and separate passport provenance", async ({ page }) => {
  await page.goto("/slots/sweet-bonanza");

  await expect(page.locator(".slot-summary .facts")).toContainText("Дата релиза");
  await expect(page.locator(".slot-summary .facts")).toContainText("25 июня 2019");
  await expect(page.locator(".slot-summary .facts")).toContainText("Тип игры");
  await expect(page.locator(".slot-summary .facts")).toContainText("Video Slot");
  await expect(page.locator(`#facts a[href='${gameSource}']`)).toHaveCount(1);
  await expect(page.locator(`#facts a[href='${passportSource}']`)).toHaveCount(1);
  await expect(page.locator("#facts")).toContainText("Дата релиза и тип игры сверены по");
  await expect(page.locator("#facts")).not.toContainText(
    "Дата релиза и тип игры сверены по той же официальной странице.",
  );
});
