import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotPassport } from "../src/lib/slot-passport";

const gameSource = "https://www.pragmaticplay.com/en/games/starlight-princess/";
const passportSource =
  "https://www.pragmaticplay.com/en/news/pragmatic-play-delivers-regal-adventure-in-starlight-princess/";

test("Starlight Princess keeps the original Pragmatic Play release passport", () => {
  const slot = getSlot("starlight-princess");
  const passport = getVerifiedSlotPassport("starlight-princess");

  expect(slot).toBeTruthy();
  expect(slot?.provider).toBe("Pragmatic Play");
  expect(slot?.year).toBe(2021);
  expect(slot?.field).toBe("6 × 5");
  expect(slot?.source).toBe(gameSource);
  expect(passport).toEqual({
    releaseDate: "23 сентября 2021",
    gameType: "Video Slot",
    source: passportSource,
    sourceLabel: "официальный релиз Pragmatic Play от 23.09.2021",
  });
});

test("Starlight Princess renders verified release date, game type and first-party provenance", async ({ page }) => {
  await page.goto("/slots/starlight-princess");

  await expect(page.locator(".slot-summary .facts")).toContainText("Дата релиза");
  await expect(page.locator(".slot-summary .facts")).toContainText("23 сентября 2021");
  await expect(page.locator(".slot-summary .facts")).toContainText("Тип игры");
  await expect(page.locator(".slot-summary .facts")).toContainText("Video Slot");

  const facts = page.locator("#facts");
  await expect(facts.locator(`a[href='${gameSource}']`)).toHaveCount(1);
  await expect(
    facts.getByRole("link", {
      name: /официальный релиз Pragmatic Play от 23\.09\.2021/,
    }),
  ).toHaveCount(1);
  await expect(facts).toContainText("Дата релиза и тип игры сверены по");
});
