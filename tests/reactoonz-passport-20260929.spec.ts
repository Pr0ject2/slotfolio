import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotPassport } from "../src/lib/slot-passport";

const officialSource = "https://www.playngo.com/games/reactoonz";

test("Reactoonz keeps Play'n GO release passport", () => {
  const slot = getSlot("reactoonz");
  const passport = getVerifiedSlotPassport("reactoonz");

  expect(slot).toBeTruthy();
  expect(slot?.provider).toBe("Play’n GO");
  expect(slot?.year).toBe(2017);
  expect(slot?.source).toBe(officialSource);
  expect(passport).toEqual({
    releaseDate: "23 октября 2017",
    gameType: "Grid Slot",
    source: officialSource,
    sourceLabel: "официальная страница Play’n GO",
  });
});

test("Reactoonz renders verified release date, game type and provenance", async ({ page }) => {
  await page.goto("/slots/reactoonz");

  await expect(page.locator(".slot-summary .facts")).toContainText("Дата релиза");
  await expect(page.locator(".slot-summary .facts")).toContainText("23 октября 2017");
  await expect(page.locator(".slot-summary .facts")).toContainText("Тип игры");
  await expect(page.locator(".slot-summary .facts")).toContainText("Grid Slot");
  await expect(page.locator(`#facts a[href='${officialSource}']`)).toHaveCount(1);
  await expect(page.locator("#facts .source-note").first()).toContainText(
    "Дата релиза и тип игры сверены по той же официальной странице.",
  );
});
