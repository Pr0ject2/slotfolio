import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotPassport } from "../src/lib/slot-passport";

const gameSource = "https://www.pushgaming.com/games/fat-rabbit.html";
const passportSource =
  "https://www.pushgaming.com/blog/push-gaming-brings-further-entertainment-mobile-new-game-fat-rabbit.html";

test("Fat Rabbit keeps the Push Gaming release passport", () => {
  const slot = getSlot("fat-rabbit");
  const passport = getVerifiedSlotPassport("fat-rabbit");

  expect(slot).toBeTruthy();
  expect(slot?.provider).toBe("Push Gaming");
  expect(slot?.year).toBe(2018);
  expect(slot?.field).toBe("5 × 5");
  expect(slot?.source).toBe(gameSource);
  expect(passport).toEqual({
    releaseDate: "27 марта 2018",
    gameType: "Slot",
    source: passportSource,
    sourceLabel: "официальный релиз Push Gaming от 27.03.2018",
  });
});

test("Fat Rabbit renders verified release date, game type and separate passport provenance", async ({ page }) => {
  await page.goto("/slots/fat-rabbit");

  const summary = page.locator(".slot-summary .facts");
  await expect(summary).toContainText("Дата релиза");
  await expect(summary).toContainText("27 марта 2018");
  await expect(summary).toContainText("Тип игры");
  await expect(summary).toContainText("Slot");

  const facts = page.locator("#facts");
  await expect(facts.locator(`a[href='${gameSource}']`)).toHaveCount(1);
  await expect(facts.locator(`a[href='${passportSource}']`)).toHaveCount(1);
  await expect(facts).toContainText("Дата релиза и тип игры сверены по");
  await expect(facts).not.toContainText(
    "Дата релиза и тип игры сверены по той же официальной странице.",
  );
});
