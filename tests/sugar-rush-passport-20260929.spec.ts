import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotPassport } from "../src/lib/slot-passport";

const gameSource = "https://www.pragmaticplay.com/en/games/sugar-rush/";
const passportSource =
  "https://www.pragmaticplay.com/ru/news/pragmatic-play-%D0%B4%D0%B0%D1%80%D0%B8%D1%82-%D0%B8%D1%81%D1%82%D0%B8%D0%BD%D0%BD%D0%BE%D0%B5-%D1%83%D0%B4%D0%BE%D0%B2%D0%BE%D0%BB%D1%8C%D1%81%D1%82%D0%B2%D0%B8%D0%B5-%D0%B2-sugar-rush/";

test("Sugar Rush keeps the original Pragmatic Play release passport", () => {
  const slot = getSlot("sugar-rush");
  const passport = getVerifiedSlotPassport("sugar-rush");

  expect(slot).toBeTruthy();
  expect(slot?.provider).toBe("Pragmatic Play");
  expect(slot?.year).toBe(2022);
  expect(slot?.field).toBe("7 × 7");
  expect(slot?.source).toBe(gameSource);
  expect(passport).toEqual({
    releaseDate: "30 июня 2022",
    gameType: "Slot",
    source: passportSource,
    sourceLabel: "официальный релиз Pragmatic Play от 30.06.2022",
  });
});

test("Sugar Rush renders verified release date, game type and first-party provenance", async ({ page }) => {
  await page.goto("/slots/sugar-rush");

  await expect(page.locator(".slot-summary .facts")).toContainText("Дата релиза");
  await expect(page.locator(".slot-summary .facts")).toContainText("30 июня 2022");
  await expect(page.locator(".slot-summary .facts")).toContainText("Тип игры");
  await expect(page.locator(".slot-summary .facts")).toContainText("Slot");

  const facts = page.locator("#facts");
  await expect(facts.locator(`a[href='${gameSource}']`)).toHaveCount(1);
  await expect(
    facts.getByRole("link", {
      name: /официальный релиз Pragmatic Play от 30\.06\.2022/,
    }),
  ).toHaveCount(1);
  await expect(facts).toContainText("Дата релиза и тип игры сверены по");
});
