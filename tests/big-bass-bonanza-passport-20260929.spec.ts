import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotPassport } from "../src/lib/slot-passport";

const gameSource = "https://www.pragmaticplay.com/en/games/big-bass-bonanza/";
const passportSource =
  "https://www.pragmaticplay.com/en/news/pragmatic-play-turns-fishing-to-spins-in-big-bass-bonanza/";

test("Big Bass Bonanza keeps the original Pragmatic Play release passport", () => {
  const slot = getSlot("big-bass-bonanza");
  const passport = getVerifiedSlotPassport("big-bass-bonanza");

  expect(slot).toBeTruthy();
  expect(slot?.provider).toBe("Pragmatic Play");
  expect(slot?.year).toBe(2020);
  expect(slot?.field).toBe("5 × 3");
  expect(slot?.source).toBe(gameSource);
  expect(passport).toEqual({
    releaseDate: "14 декабря 2020",
    gameType: "Slot",
    source: passportSource,
    sourceLabel: "официальный релиз Pragmatic Play от 14.12.2020",
  });
});

test("Big Bass Bonanza renders verified release date, game type and first-party provenance", async ({ page }) => {
  await page.goto("/slots/big-bass-bonanza");

  await expect(page.locator(".slot-summary .facts")).toContainText("Дата релиза");
  await expect(page.locator(".slot-summary .facts")).toContainText("14 декабря 2020");
  await expect(page.locator(".slot-summary .facts")).toContainText("Тип игры");
  await expect(page.locator(".slot-summary .facts")).toContainText("Slot");

  const facts = page.locator("#facts");
  await expect(facts.locator(`a[href='${gameSource}']`)).toHaveCount(1);
  await expect(
    facts.getByRole("link", {
      name: /официальный релиз Pragmatic Play от 14\.12\.2020/,
    }),
  ).toHaveCount(1);
  await expect(facts).toContainText("Дата релиза и тип игры сверены по");
});
