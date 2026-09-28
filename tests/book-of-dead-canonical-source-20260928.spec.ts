import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";

const canonicalSource = "https://www.playngo.com/games/rich-wilde-and-the-book-of-dead";
const legacyRedirect = "https://www.playngo.com/games/book-of-dead";

test("Book of Dead uses the current canonical Play'n GO source without changing its passport", () => {
  const slot = getSlot("book-of-dead");

  expect(slot).toBeTruthy();
  expect(slot?.provider).toBe("Play’n GO");
  expect(slot?.field).toBe("5 × 3");
  expect(slot?.rtp).toBe("96,21%");
  expect(slot?.volatility).toBe("Высокая");
  expect(slot?.source).toBe(canonicalSource);
  expect(slot?.source).not.toBe(legacyRedirect);
});

test("Book of Dead dossier links directly to the canonical Play'n GO page", async ({ page }) => {
  await page.goto("/slots/book-of-dead");

  await expect(page.locator(".facts")).toContainText("5 × 3");
  await expect(page.locator(".facts")).toContainText("96,21%");
  await expect(page.locator("#facts a[href='https://www.playngo.com/games/rich-wilde-and-the-book-of-dead']")).toHaveCount(1);
  await expect(page.locator("#facts a[href='https://www.playngo.com/games/book-of-dead']")).toHaveCount(0);
});
