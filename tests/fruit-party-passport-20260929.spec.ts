import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotPassport } from "../src/lib/slot-passport";

const gameSource = "https://www.pragmaticplay.com/en/games/fruit-party/";
const passportSource =
  "https://www.pragmaticplay.com/en/news/pragmatic-play-gets-summer-started-with-fruit-party/";

test("Fruit Party keeps the original Pragmatic Play release passport", () => {
  const slot = getSlot("fruit-party");
  const passport = getVerifiedSlotPassport("fruit-party");

  expect(slot).toBeTruthy();
  expect(slot?.provider).toBe("Pragmatic Play");
  expect(slot?.year).toBe(2020);
  expect(slot?.field).toBe("7 × 7");
  expect(slot?.source).toBe(gameSource);
  expect(passport).toEqual({
    releaseDate: "27 мая 2020",
    gameType: "Video Slot",
    source: passportSource,
    sourceLabel: "официальный релиз Pragmatic Play от 27.05.2020",
  });
});

test("Fruit Party renders verified release date, game type and first-party provenance", async ({ page }) => {
  await page.goto("/slots/fruit-party");

  await expect(page.locator(".slot-summary .facts")).toContainText("Дата релиза");
  await expect(page.locator(".slot-summary .facts")).toContainText("27 мая 2020");
  await expect(page.locator(".slot-summary .facts")).toContainText("Тип игры");
  await expect(page.locator(".slot-summary .facts")).toContainText("Video Slot");

  const facts = page.locator("#facts");
  await expect(facts.locator(`a[href='${gameSource}']`)).toHaveCount(1);
  await expect(
    facts.getByRole("link", {
      name: /официальный релиз Pragmatic Play от 27\.05\.2020/,
    }),
  ).toHaveCount(1);
  await expect(facts).toContainText("Дата релиза и тип игры сверены по");
});
