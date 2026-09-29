import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotPassport } from "../src/lib/slot-passport";

const gameSource = "https://www.pushgaming.com/games/retro-tapes.html";
const passportSource =
  "https://www.pushgaming.com/blog/push-gaming-rewinds-classic-gameplay-retro-tapes.html";

test("Retro Tapes keeps Push Gaming release passport without changing its math profile", () => {
  const slot = getSlot("retro-tapes");
  const passport = getVerifiedSlotPassport("retro-tapes");

  expect(slot).toBeTruthy();
  expect(slot?.provider).toBe("Push Gaming");
  expect(slot?.year).toBe(2022);
  expect(slot?.field).toBe("9 × 6");
  expect(slot?.rtp).toBe("96,47%");
  expect(slot?.source).toBe(gameSource);
  expect(passport).toEqual({
    releaseDate: "23 ноября 2022",
    gameType: "Cluster Paying Slot",
    source: passportSource,
    sourceLabel: "официальный релиз Push Gaming от 23.11.2022",
  });
});

test("Retro Tapes renders verified release date, game type and first-party provenance", async ({ page }) => {
  await page.goto("/slots/retro-tapes");

  await expect(page.locator(".slot-summary .facts")).toContainText("Дата релиза");
  await expect(page.locator(".slot-summary .facts")).toContainText("23 ноября 2022");
  await expect(page.locator(".slot-summary .facts")).toContainText("Тип игры");
  await expect(page.locator(".slot-summary .facts")).toContainText("Cluster Paying Slot");

  const facts = page.locator("#facts");
  await expect(facts.locator(`a[href='${gameSource}']`)).toHaveCount(1);
  await expect(
    facts.getByRole("link", {
      name: /официальный релиз Push Gaming от 23\.11\.2022/,
    }),
  ).toHaveCount(1);
  await expect(facts).toContainText("Дата релиза и тип игры сверены по");
});
