import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotPassport } from "../src/lib/slot-passport";

test("Legacy of Dead keeps Play'n GO release passport", () => {
  const slot = getSlot("legacy-of-dead");
  const passport = getVerifiedSlotPassport("legacy-of-dead");

  expect(slot).toBeTruthy();
  expect(slot?.provider).toBe("Play’n GO");
  expect(slot?.year).toBe(2020);
  expect(slot?.source).toBe("https://www.playngo.com/games/legacy-of-dead");
  expect(passport).toEqual({
    releaseDate: "2 января 2020",
    gameType: "Video Slot",
    source: "https://www.playngo.com/games/legacy-of-dead",
    sourceLabel: "официальная страница Play’n GO",
  });
});

test("Legacy of Dead renders verified release date, game type and provenance", async ({ page }) => {
  await page.goto("/slots/legacy-of-dead");

  await expect(page.locator(".slot-summary .facts")).toContainText("Дата релиза");
  await expect(page.locator(".slot-summary .facts")).toContainText("2 января 2020");
  await expect(page.locator(".slot-summary .facts")).toContainText("Тип игры");
  await expect(page.locator(".slot-summary .facts")).toContainText("Video Slot");
  await expect(page.locator("#facts .source-note").first()).toContainText(
    "Дата релиза и тип игры сверены по той же официальной странице.",
  );
});
