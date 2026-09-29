import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotPassport } from "../src/lib/slot-passport";

const canonicalSource = "https://netent.com/games/starburst";

test("Starburst keeps the canonical NetEnt release passport", () => {
  const slot = getSlot("starburst");
  const passport = getVerifiedSlotPassport("starburst");

  expect(slot).toBeTruthy();
  expect(slot?.provider).toBe("NetEnt");
  expect(slot?.year).toBe(2012);
  expect(slot?.field).toBe("5 × 3");
  expect(slot?.source).toBe(canonicalSource);
  expect(passport).toEqual({
    releaseDate: "23 января 2012",
    gameType: "Video Slot",
    source: canonicalSource,
    sourceLabel: "каноническая официальная страница NetEnt",
  });
});

test("Starburst renders verified release date and game type from the canonical game page", async ({ page }) => {
  await page.goto("/slots/starburst");

  const summary = page.locator(".slot-summary .facts");
  await expect(summary).toContainText("Дата релиза");
  await expect(summary).toContainText("23 января 2012");
  await expect(summary).toContainText("Тип игры");
  await expect(summary).toContainText("Video Slot");

  const facts = page.locator("#facts");
  await expect(facts.locator(`a[href='${canonicalSource}']`)).toHaveCount(1);
  await expect(facts).toContainText(
    "Дата релиза и тип игры сверены по той же официальной странице.",
  );
});
