import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotMetrics } from "../src/lib/dossier";
import { getVerifiedSlotPassport } from "../src/lib/slot-passport";

const gameSource = "https://www.pragmaticplay.com/en/games/gates-of-olympus-1000/";
const passportSource =
  "https://www.pragmaticplay.com/en/news/zeus-strikes-mighty-multipliers-in-pragmatic-plays-latest-release-gates-of-olympus-1000/";

test("Gates of Olympus 1000 keeps its sequel-specific Pragmatic Play release passport", () => {
  const slot = getSlot("gates-of-olympus-1000");
  const passport = getVerifiedSlotPassport("gates-of-olympus-1000");
  const metrics = getVerifiedSlotMetrics("gates-of-olympus-1000");

  expect(slot?.provider).toBe("Pragmatic Play");
  expect(slot?.year).toBe(2023);
  expect(slot?.field).toBe("6 × 5");
  expect(slot?.source).toBe(gameSource);
  expect(passport).toEqual({
    releaseDate: "14 декабря 2023",
    gameType: "Slot",
    source: passportSource,
    sourceLabel: "официальный релиз Pragmatic Play от 14.12.2023",
  });
  expect(metrics?.maxWin).toBe("15 000x");
  expect(metrics?.source).toBe(passportSource);
});

test("Gates of Olympus 1000 renders its own verified release passport", async ({ page }) => {
  await page.goto("/slots/gates-of-olympus-1000");
  const summary = page.locator(".slot-summary .facts");
  await expect(summary).toContainText("14 декабря 2023");
  await expect(summary).toContainText("Slot");
  await expect(summary).toContainText("15 000x");
  const facts = page.locator("#facts");
  await expect(facts.locator(`a[href='${gameSource}']`)).toHaveCount(1);
  await expect(
    facts.getByRole("link", { name: /официальный релиз Pragmatic Play от 14\.12\.2023/ }),
  ).toHaveCount(1);
});
