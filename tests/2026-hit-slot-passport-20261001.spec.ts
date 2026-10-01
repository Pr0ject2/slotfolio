import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotPassport } from "../src/lib/slot-passport";

test("2026 Hit Slot keeps its first-party release passport", async ({ page }) => {
  const slot = getSlot("2026-hit-slot");
  expect(slot?.provider).toBe("Endorphina");
  expect(slot?.year).toBe(2026);
  expect(getVerifiedSlotPassport("2026-hit-slot")).toEqual({
    releaseDate: "3 марта 2026",
    gameType: "Slot",
    source: "https://endorphina.com/news/endorphinas-2026-hit-slot-show-is-here-and-youve-got-a-backstage-pass",
    sourceLabel: "официальный релиз Endorphina от 03.03.2026",
  });
  await page.goto("/slots/2026-hit-slot");
  await expect(page.locator(".slot-summary .facts")).toContainText("3 марта 2026");
  await expect(page.locator(".slot-summary .facts")).toContainText("Slot");
});
