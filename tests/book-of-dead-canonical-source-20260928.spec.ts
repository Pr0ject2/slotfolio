import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotPassport } from "../src/lib/slot-passport";

const canonicalSource = "https://www.playngo.com/games/rich-wilde-and-the-book-of-dead";
const legacyRedirect = "https://www.playngo.com/games/book-of-dead";

test("Book of Dead uses the current canonical Play'n GO source and verified release passport", () => {
  const slot = getSlot("book-of-dead");
  const passport = getVerifiedSlotPassport("book-of-dead");

  expect(slot).toBeTruthy();
  expect(slot?.provider).toBe("Play’n GO");
  expect(slot?.year).toBe(2016);
  expect(slot?.field).toBe("5 × 3");
  expect(slot?.rtp).toBe("96,21%");
  expect(slot?.volatility).toBe("Высокая");
  expect(slot?.source).toBe(canonicalSource);
  expect(slot?.source).not.toBe(legacyRedirect);
  expect(passport).toEqual({
    releaseDate: "14 января 2016",
    gameType: "Video Slot",
    source: canonicalSource,
    sourceLabel: "официальная страница Play’n GO",
  });
});

test("Book of Dead dossier renders canonical source and verified passport", async ({ page }) => {
  await page.goto("/slots/book-of-dead");

  await expect(page.locator(".slot-summary .facts")).toContainText("5 × 3");
  await expect(page.locator(".slot-summary .facts")).toContainText("96,21%");
  await expect(page.locator(".slot-summary .facts")).toContainText("Дата релиза");
  await expect(page.locator(".slot-summary .facts")).toContainText("14 января 2016");
  await expect(page.locator(".slot-summary .facts")).toContainText("Тип игры");
  await expect(page.locator(".slot-summary .facts")).toContainText("Video Slot");
  await expect(page.locator("#facts a[href='https://www.playngo.com/games/rich-wilde-and-the-book-of-dead']")).toHaveCount(1);
  await expect(page.locator("#facts a[href='https://www.playngo.com/games/book-of-dead']")).toHaveCount(0);
  await expect(page.locator("#facts .source-note").first()).toContainText(
    "Дата релиза и тип игры сверены по той же официальной странице.",
  );
});
