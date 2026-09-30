import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotMetrics } from "../src/lib/dossier";
import { getVerifiedSlotPassport } from "../src/lib/slot-passport";

const passportSource =
  "https://www.pragmaticplay.com/en/news/pragmatic-play-amps-up-win-potential-with-gates-of-olympus-super-scatter/";

test("Gates of Olympus Super Scatter keeps its own Pragmatic Play release passport", () => {
  const slot = getSlot("gates-of-olympus-super-scatter");
  const passport = getVerifiedSlotPassport("gates-of-olympus-super-scatter");
  const metrics = getVerifiedSlotMetrics("gates-of-olympus-super-scatter");

  expect(slot?.provider).toBe("Pragmatic Play");
  expect(slot?.year).toBe(2025);
  expect(passport).toEqual({
    releaseDate: "28 апреля 2025",
    gameType: "Slot",
    source: passportSource,
    sourceLabel: "официальный релиз Pragmatic Play от 28.04.2025",
  });
  expect(metrics?.maxWin).toBe("50 000x");
});

test("Gates of Olympus Super Scatter renders its verified release passport", async ({ page }) => {
  await page.goto("/slots/gates-of-olympus-super-scatter");
  const summary = page.locator(".slot-summary .facts");
  await expect(summary).toContainText("28 апреля 2025");
  await expect(summary).toContainText("Slot");
  await expect(summary).toContainText("50 000x");
  await expect(
    page.locator("#facts").getByRole("link", {
      name: /официальный релиз Pragmatic Play от 28\.04\.2025/,
    }),
  ).toHaveCount(1);
});
