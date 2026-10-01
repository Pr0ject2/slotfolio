import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotPassport } from "../src/lib/slot-passport";

test("R.I.P. City keeps its first-party release passport", async ({ page }) => {
  const slot = getSlot("rip-city");
  expect(slot?.provider).toBe("Hacksaw Gaming");
  expect(slot?.year).toBe(2023);
  expect(getVerifiedSlotPassport("rip-city")).toEqual({
    releaseDate: "5 января 2023",
    gameType: "Slot",
    source: "https://www.hacksawgaming.com/news/hacksaw-gaming-slot-r.i.p.-city-wins-januarys-slot-of-the-month-award",
    sourceLabel: "официальный материал Hacksaw Gaming с датой релиза 05.01.2023",
  });

  await page.goto("/slots/rip-city");
  await expect(page.locator(".slot-summary .facts")).toContainText("5 января 2023");
  await expect(page.locator(".slot-summary .facts")).toContainText("Slot");
});
