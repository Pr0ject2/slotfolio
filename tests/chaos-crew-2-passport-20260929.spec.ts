import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotPassport } from "../src/lib/slot-passport";

const gameSource = "https://www.hacksawgaming.com/games/chaos-crew-2";
const passportSource =
  "https://www.hacksawgaming.com/news/september-game-release-round-up";

test("Chaos Crew 2 keeps the Hacksaw Gaming release passport", () => {
  const slot = getSlot("chaos-crew-2");
  const passport = getVerifiedSlotPassport("chaos-crew-2");

  expect(slot).toBeTruthy();
  expect(slot?.provider).toBe("Hacksaw Gaming");
  expect(slot?.year).toBe(2023);
  expect(slot?.field).toBe("5 × 5");
  expect(slot?.source).toBe(gameSource);
  expect(passport).toEqual({
    releaseDate: "28 сентября 2023",
    gameType: "Slot",
    source: passportSource,
    sourceLabel: "официальный сентябрьский round-up Hacksaw Gaming от 04.10.2023",
  });
});

test("Chaos Crew 2 renders verified release date, game type and separate passport provenance", async ({ page }) => {
  await page.goto("/slots/chaos-crew-2");

  const summary = page.locator(".slot-summary .facts");
  await expect(summary).toContainText("Дата релиза");
  await expect(summary).toContainText("28 сентября 2023");
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
