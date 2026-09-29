import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotPassport } from "../src/lib/slot-passport";

const gameSource = "https://www.pushgaming.com/games/razor-shark.html";
const passportSource =
  "https://www.pushgaming.com/blog/push-gaming-release-deep-sea-themed-slot-razor-shark.html";

test("Razor Shark keeps the original Push Gaming release passport", () => {
  const slot = getSlot("razor-shark");
  const passport = getVerifiedSlotPassport("razor-shark");

  expect(slot).toBeTruthy();
  expect(slot?.provider).toBe("Push Gaming");
  expect(slot?.year).toBe(2019);
  expect(slot?.field).toBe("5 × 4");
  expect(slot?.source).toBe(gameSource);
  expect(passport).toEqual({
    releaseDate: "3 сентября 2019",
    gameType: "Slot",
    source: passportSource,
    sourceLabel: "официальный релиз Push Gaming от 03.09.2019",
  });
});

test("Razor Shark renders verified release date, game type and first-party provenance", async ({ page }) => {
  await page.goto("/slots/razor-shark");

  await expect(page.locator(".slot-summary .facts")).toContainText("Дата релиза");
  await expect(page.locator(".slot-summary .facts")).toContainText("3 сентября 2019");
  await expect(page.locator(".slot-summary .facts")).toContainText("Тип игры");
  await expect(page.locator(".slot-summary .facts")).toContainText("Slot");

  const facts = page.locator("#facts");
  await expect(facts.locator(`a[href='${gameSource}']`)).toHaveCount(1);
  await expect(
    facts.getByRole("link", {
      name: /официальный релиз Push Gaming от 03\.09\.2019/,
    }),
  ).toHaveCount(1);
  await expect(facts).toContainText("Дата релиза и тип игры сверены по");
});
