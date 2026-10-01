import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotPassport } from "../src/lib/slot-passport";

const cases = [
  ["caramelo-jackpot", "21 марта 2024", "Video Slot"],
  ["hot-and-spicy-jackpot", "1 октября 2021", "Video Slots"],
  ["coin-flynn", "12 декабря 2024", "Video Slots"],
  ["fruit-train-express-hold-win", "6 мая 2025", "Video Slots"],
  ["power-of-zeus-mancala", "27 августа 2024", "Video Slot"],
] as const;

for (const [slug, date, gameType] of cases) {
  test(`${slug} exposes its first-party release passport`, async ({ page }) => {
    expect(getSlot(slug)).toBeTruthy();
    expect(getVerifiedSlotPassport(slug)).toEqual({
      releaseDate: date,
      gameType,
      source: expect.any(String),
      sourceLabel: expect.any(String),
    });
    await page.goto(`/slots/${slug}`);
    const summary = page.locator(".slot-summary .facts");
    await expect(summary).toContainText(date);
    await expect(summary).toContainText(gameType);
    await expect(page.locator("#facts")).toContainText("Дата релиза и тип игры сверены по");
  });
}
