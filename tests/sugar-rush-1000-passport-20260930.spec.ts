import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotMetrics } from "../src/lib/dossier";
import { getVerifiedSlotPassport } from "../src/lib/slot-passport";

const gameSource = "https://www.pragmaticplay.com/en/games/sugar-rush-1000/";
const passportSource =
  "https://www.pragmaticplay.com/en/news/pragmatic-play-adds-to-sweet-sensation-in-sugar-rush-1000/";

test("Sugar Rush 1000 keeps its sequel-specific Pragmatic Play release passport", () => {
  const slot = getSlot("sugar-rush-1000");
  const passport = getVerifiedSlotPassport("sugar-rush-1000");
  const metrics = getVerifiedSlotMetrics("sugar-rush-1000");

  expect(slot?.provider).toBe("Pragmatic Play");
  expect(slot?.year).toBe(2024);
  expect(slot?.source).toBe(gameSource);
  expect(passport).toEqual({
    releaseDate: "18 марта 2024",
    gameType: "Slot",
    source: passportSource,
    sourceLabel: "официальный релиз Pragmatic Play от 18.03.2024",
  });
  expect(metrics?.maxWin).toBe("25 000x");
  expect(metrics?.source).toBe(passportSource);
});

test("Sugar Rush 1000 renders its own verified release passport", async ({ page }) => {
  await page.goto("/slots/sugar-rush-1000");
  const summary = page.locator(".slot-summary .facts");
  await expect(summary).toContainText("18 марта 2024");
  await expect(summary).toContainText("Slot");
  await expect(summary).toContainText("25 000x");
  await expect(
    page.locator("#facts").getByRole("link", {
      name: /официальный релиз Pragmatic Play от 18\.03\.2024/,
    }),
  ).toHaveCount(1);
});
