import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotPassport } from "../src/lib/slot-passport";

const officialSource = "https://www.playngo.com/games/fire-joker";

test("Fire Joker keeps Play'n GO release passport", () => {
  const slot = getSlot("fire-joker");
  const passport = getVerifiedSlotPassport("fire-joker");

  expect(slot).toBeTruthy();
  expect(slot?.provider).toBe("Play’n GO");
  expect(slot?.year).toBe(2016);
  expect(slot?.field).toBe("3 × 3");
  expect(slot?.source).toBe(officialSource);
  expect(passport).toEqual({
    releaseDate: "13 июня 2016",
    gameType: "Video Slot",
    source: officialSource,
    sourceLabel: "официальная страница Play’n GO",
  });
});

test("Fire Joker renders verified release date, game type and provenance", async ({ page }) => {
  await page.goto("/slots/fire-joker");

  await expect(page.locator(".slot-summary .facts")).toContainText("Дата релиза");
  await expect(page.locator(".slot-summary .facts")).toContainText("13 июня 2016");
  await expect(page.locator(".slot-summary .facts")).toContainText("Тип игры");
  await expect(page.locator(".slot-summary .facts")).toContainText("Video Slot");
  await expect(page.locator(`#facts a[href='${officialSource}']`)).toHaveCount(1);
  await expect(page.locator("#facts .source-note").first()).toContainText(
    "Дата релиза и тип игры сверены по той же официальной странице.",
  );
});
