import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotMetrics } from "../src/lib/dossier";
import { getVerifiedSlotPassport } from "../src/lib/slot-passport";

const passportSource =
  "https://www.pragmaticplay.com/en/news/pragmatic-play-sweetens-an-all-time-classic-in-sweet-bonanza-super-scatter/";

test("Sweet Bonanza Super Scatter keeps its own Pragmatic Play release passport", () => {
  const slot = getSlot("sweet-bonanza-super-scatter");
  const passport = getVerifiedSlotPassport("sweet-bonanza-super-scatter");
  const metrics = getVerifiedSlotMetrics("sweet-bonanza-super-scatter");

  expect(slot?.provider).toBe("Pragmatic Play");
  expect(slot?.year).toBe(2025);
  expect(passport).toEqual({
    releaseDate: "31 июля 2025",
    gameType: "Slot",
    source: passportSource,
    sourceLabel: "официальный релиз Pragmatic Play от 31.07.2025",
  });
  expect(metrics?.maxWin).toBe("50 000x");
});

test("Sweet Bonanza Super Scatter renders its verified release passport", async ({ page }) => {
  await page.goto("/slots/sweet-bonanza-super-scatter");
  const summary = page.locator(".slot-summary .facts");
  await expect(summary).toContainText("31 июля 2025");
  await expect(summary).toContainText("Slot");
  await expect(summary).toContainText("50 000x");
  await expect(
    page.locator("#facts").getByRole("link", {
      name: /официальный релиз Pragmatic Play от 31\.07\.2025/,
    }),
  ).toHaveCount(1);
});
