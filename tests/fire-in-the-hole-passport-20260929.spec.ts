import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotPassport } from "../src/lib/slot-passport";

const source = "https://nolimitcity.com/games/fire-in-the-hole";

test("Fire in the Hole keeps the Nolimit City release passport", () => {
  const slot = getSlot("fire-in-the-hole");
  const passport = getVerifiedSlotPassport("fire-in-the-hole");

  expect(slot).toBeTruthy();
  expect(slot?.provider).toBe("Nolimit City");
  expect(slot?.year).toBe(2021);
  expect(slot?.source).toBe(source);
  expect(passport).toEqual({
    releaseDate: "2 марта 2021",
    gameType: "Slot",
    source,
    sourceLabel: "официальная страница Nolimit City",
  });
});

test("Fire in the Hole renders the same-page release passport provenance", async ({ page }) => {
  await page.goto("/slots/fire-in-the-hole");

  await expect(page.locator(".slot-summary .facts")).toContainText("Дата релиза");
  await expect(page.locator(".slot-summary .facts")).toContainText("2 марта 2021");
  await expect(page.locator(".slot-summary .facts")).toContainText("Тип игры");
  await expect(page.locator(".slot-summary .facts")).toContainText("Slot");

  const facts = page.locator("#facts");
  await expect(facts.locator(`a[href='${source}']`)).toHaveCount(1);
  await expect(facts).toContainText(
    "Дата релиза и тип игры сверены по той же официальной странице.",
  );
});
