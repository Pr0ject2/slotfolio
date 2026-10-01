import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotPassport } from "../src/lib/slot-passport";

const cases = [
  ["joker-stoker", "22 июня 2021", "Fruit Slot", "https://endorphina.com/news/set-your-summer-on-fire"],
  ["le-bandit", "24 августа 2023", "Cluster Pays", "https://www.hacksawgaming.com/news/august-2023-game-release-wrap"],
] as const;

for (const [slug, date, gameType, source] of cases) {
  test(`${slug} exposes its first-party release passport`, async ({ page }) => {
    expect(getSlot(slug)).toBeTruthy();
    expect(getVerifiedSlotPassport(slug)).toEqual({
      releaseDate: date,
      gameType,
      source,
      sourceLabel: expect.any(String),
    });
    await page.goto(`/slots/${slug}`);
    await expect(page.locator(".slot-summary .facts")).toContainText(date);
    await expect(page.locator(".slot-summary .facts")).toContainText(gameType);
    await expect(page.locator("#facts")).toContainText("Дата релиза и тип игры сверены по");
  });
}
