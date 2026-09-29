import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotPassport } from "../src/lib/slot-passport";

const officialSource = "https://www.playngo.com/games/rise-of-olympus";

test("Rise of Olympus keeps Play'n GO release passport", () => {
  const slot = getSlot("rise-of-olympus");
  const passport = getVerifiedSlotPassport("rise-of-olympus");

  expect(slot).toBeTruthy();
  expect(slot?.provider).toBe("Play’n GO");
  expect(slot?.year).toBe(2018);
  expect(slot?.field).toBe("5 × 5");
  expect(slot?.source).toBe(officialSource);
  expect(passport).toEqual({
    releaseDate: "22 августа 2018",
    gameType: "Grid Slot",
    source: officialSource,
    sourceLabel: "официальная страница Play’n GO",
  });
});

test("Rise of Olympus renders verified release date, game type and provenance", async ({ page }) => {
  await page.goto("/slots/rise-of-olympus");

  await expect(page.locator(".slot-summary .facts")).toContainText("Дата релиза");
  await expect(page.locator(".slot-summary .facts")).toContainText("22 августа 2018");
  await expect(page.locator(".slot-summary .facts")).toContainText("Тип игры");
  await expect(page.locator(".slot-summary .facts")).toContainText("Grid Slot");
  await expect(page.locator(`#facts a[href='${officialSource}']`)).toHaveCount(1);
  await expect(page.locator("#facts .source-note").first()).toContainText(
    "Дата релиза и тип игры сверены по той же официальной странице.",
  );
});
