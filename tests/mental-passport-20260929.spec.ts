import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotPassport } from "../src/lib/slot-passport";

const source = "https://nolimitcity.com/games/mental";

test("Mental keeps the Nolimit City release passport", () => {
  const slot = getSlot("mental");
  const passport = getVerifiedSlotPassport("mental");

  expect(slot).toBeTruthy();
  expect(slot?.provider).toBe("Nolimit City");
  expect(slot?.year).toBe(2021);
  expect(slot?.field).toBe("5 барабанов · 3–2–3–2–3");
  expect(slot?.source).toBe(source);
  expect(passport).toEqual({
    releaseDate: "31 августа 2021",
    gameType: "Slot",
    source,
    sourceLabel: "официальная страница Nolimit City",
  });
});

test("Mental renders the same-page release passport provenance", async ({ page }) => {
  await page.goto("/slots/mental");

  await expect(page.locator(".slot-summary .facts")).toContainText("Дата релиза");
  await expect(page.locator(".slot-summary .facts")).toContainText("31 августа 2021");
  await expect(page.locator(".slot-summary .facts")).toContainText("Тип игры");
  await expect(page.locator(".slot-summary .facts")).toContainText("Slot");

  const facts = page.locator("#facts");
  await expect(facts.locator(`a[href='${source}']`)).toHaveCount(1);
  await expect(facts).toContainText(
    "Дата релиза и тип игры сверены по той же официальной странице.",
  );
});
