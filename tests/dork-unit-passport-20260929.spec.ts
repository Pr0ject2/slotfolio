import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotPassport } from "../src/lib/slot-passport";

const source = "https://www.hacksawgaming.com/news/new-game-release-july-summary";

test("Dork Unit keeps Hacksaw Gaming release passport", () => {
  const slot = getSlot("dork-unit");
  const passport = getVerifiedSlotPassport("dork-unit");

  expect(slot).toBeTruthy();
  expect(slot?.provider).toBe("Hacksaw Gaming");
  expect(slot?.year).toBe(2022);
  expect(slot?.field).toBe("5 × 4");
  expect(slot?.source).toBe(source);
  expect(passport).toEqual({
    releaseDate: "26 июля 2022",
    gameType: "Slot",
    source,
    sourceLabel: "официальный релиз Hacksaw Gaming от 26.07.2022",
  });
});

test("Dork Unit renders verified release date, game type and same-page provenance", async ({ page }) => {
  await page.goto("/slots/dork-unit");

  const summary = page.locator(".slot-summary .facts");
  await expect(summary).toContainText("Дата релиза");
  await expect(summary).toContainText("26 июля 2022");
  await expect(summary).toContainText("Тип игры");
  await expect(summary).toContainText("Slot");

  const facts = page.locator("#facts");
  await expect(facts.locator(`a[href='${source}']`)).toHaveCount(1);
  await expect(facts).toContainText(
    "Дата релиза и тип игры сверены по той же официальной странице.",
  );
  await expect(facts).toContainText("Дополнительные числовые параметры взяты с той же официальной страницы.");
});
