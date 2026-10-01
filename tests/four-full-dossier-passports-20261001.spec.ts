import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotPassport } from "../src/lib/slot-passport";

const cases = [
  {
    slug: "bear-crazy",
    provider: "Pragmatic Play",
    year: 2026,
    date: "11 июня 2026",
    gameType: "Slot",
    source: "https://www.pragmaticplay.fun/en/slots/bear-crazy/",
    label: "официальная страница Pragmatic Play от 11.06.2026",
  },
  {
    slug: "mummyland-treasures",
    provider: "Belatra Games",
    year: 2023,
    date: "28 февраля 2023",
    gameType: "Slot",
    source: "https://belatragames.com/en/news/article/mummyland-treasures-solve-the-riddle-of-an-ancient-mummy%21",
    label: "официальный релиз Belatra Games от 28.02.2023",
  },
  {
    slug: "troy-superways",
    provider: "Yggdrasil Gaming",
    year: 2026,
    date: "14 мая 2026",
    gameType: "Video Slot",
    source: "https://yggdrasilgaming.com/games/troy-superways",
    label: "официальная страница Yggdrasil Gaming от 14.05.2026",
  },
  {
    slug: "mighty-hot-amazonia",
    provider: "Wazdan",
    year: 2026,
    date: "30 июня 2026",
    gameType: "Slots",
    source: "https://wazdan.com/games/mighty-hot-amazonia",
    label: "официальная карточка Wazdan от 30.06.2026",
  },
] as const;

for (const item of cases) {
  test(`${item.slug} keeps its first-party release passport`, async ({ page }) => {
    const slot = getSlot(item.slug);
    expect(slot?.provider).toBe(item.provider);
    expect(slot?.year).toBe(item.year);

    const passport = getVerifiedSlotPassport(item.slug);
    expect(passport).toEqual({
      releaseDate: item.date,
      gameType: item.gameType,
      source: item.source,
      sourceLabel: item.label,
    });

    await page.goto(`/slots/${item.slug}`);
    const summary = page.locator(".slot-summary .facts");
    await expect(summary).toContainText(item.date);
    await expect(summary).toContainText(item.gameType);
    await expect(
      page.locator("#facts").getByRole("link", { name: item.label }),
    ).toHaveCount(1);
  });
}
