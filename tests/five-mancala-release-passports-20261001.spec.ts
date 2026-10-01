import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotPassport } from "../src/lib/slot-passport";

const cases = [
  ["coin-craze-jackpot", "13 мая 2025", "Slots"],
  ["caishen-gold-infinity-dragon", "3 июня 2025", "Slots"],
  ["money-booster", "17 июня 2025", "Slots"],
  ["midas-hand-of-fortune", "29 апреля 2025", "Slots"],
  ["mustang-rush", "11 марта 2025", "Slots"],
] as const;

for (const [slug, date, gameType] of cases) {
  test(`${slug} exposes its first-party release passport`, async ({ page }) => {
    expect(getSlot(slug)).toBeTruthy();
    expect(getVerifiedSlotPassport(slug)).toEqual({
      releaseDate: date,
      gameType,
      source: "https://mancalagaming.com/games/roadmap",
      sourceLabel: expect.any(String),
    });
    await page.goto(`/slots/${slug}`);
    const summary = page.locator(".slot-summary .facts");
    await expect(summary).toContainText(date);
    await expect(summary).toContainText(gameType);
    await expect(page.locator("#facts")).toContainText("Дата релиза и тип игры сверены по");
  });
}
